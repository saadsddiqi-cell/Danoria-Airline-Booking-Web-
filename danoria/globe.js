/* ═══════════════════════════════════════════
   DANORIA — 3D Globe Module (globe.js)
   ═══════════════════════════════════════════ */
let scene, camera, renderer, clock;
let earthMesh, cloudsMesh, atmosphereMesh, starField;
let markerGroup, arcGroup;
let raycaster, mouse;
let isNight = false, isLoaded = false;
let autoRotate = true, isDragging = false;
let prevMouse = { x: 0, y: 0 };
let hoveredMarker = null;
let targetCamPos = null;
let arcAnimations = [];
// Globals exposed to app.js
window.globeModule = {
    init: initThreeJS,
    drawRoute: drawFlightRoute,
    clearRoute: clearFlightRoutes,
    flyToCountry: flyCameraToCountry,
    pauseRotation: (paused) => { autoRotate = !paused; },
    toggleDayNight: setDayNightMode,
    zoom: zoomGlobe,
    highlight: highlightMarkerByKey,
    unhighlight: unhighlightMarkerByKey,
    setSelectionStates: updateSelectionMarkerColors
};
function initThreeJS(destinations, onMarkerClicked) {
    const canvas = document.getElementById('globeCanvas');
    if (!canvas) return;
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 3.8);
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.1 };
    mouse = new THREE.Vector2();
    createLights();
    createStarField();
    createEarth();
    createClouds();
    createAtmosphere();
    
    markerGroup = new THREE.Group();
    scene.add(markerGroup);
    createMarkers(destinations);
    arcGroup = new THREE.Group();
    scene.add(arcGroup);
    // Initial animations
    gsap.from(earthMesh.scale, {
        x: 0, y: 0, z: 0,
        duration: 2,
        ease: 'elastic.out(1, 0.5)'
    });
    gsap.from(camera.position, {
        z: 8,
        duration: 2.5,
        ease: 'power3.out',
        onComplete: () => { isLoaded = true; }
    });
    initGlobeEvents(canvas, onMarkerClicked);
    animate();
}
/* ─── LIGHTS ─────────────────────────────── */
function createLights() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    
    const sun = new THREE.DirectionalLight(0xffeedd, 1.2);
    sun.position.set(5, 3, 5);
    sun.name = 'sunLight';
    scene.add(sun);
    
    const fill = new THREE.DirectionalLight(0x4488ff, 0.25);
    fill.position.set(-5, -1, -5);
    scene.add(fill);
}
/* ─── STARS ──────────────────────────────── */
function createStarField() {
    const geo = new THREE.BufferGeometry();
    const pos = [], col = [];
    for (let i = 0; i < 2500; i++) {
        pos.push((Math.random() - .5) * 120, (Math.random() - .5) * 120, (Math.random() - .5) * 120);
        const c = new THREE.Color().setHSL(.55 + Math.random() * .15, .4, .7 + Math.random() * .3);
        col.push(c.r, c.g, c.b);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    starField = new THREE.Points(geo, new THREE.PointsMaterial({
        size: .06,
        vertexColors: true,
        transparent: true,
        opacity: .7
    }));
    starField.name = 'stars';
    scene.add(starField);
}
/* ─── EARTH ──────────────────────────────── */
function createEarth() {
    const texLoader = new THREE.TextureLoader();
    texLoader.crossOrigin = 'anonymous';
    // Elegant high-contrast placeholder texture
    const fallbackCanvas = document.createElement('canvas');
    fallbackCanvas.width = 2048;
    fallbackCanvas.height = 1024;
    const fctx = fallbackCanvas.getContext('2d');
    const grad = fctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#020617');
    grad.addColorStop(0.3, '#0f172a');
    grad.addColorStop(0.5, '#1e293b');
    grad.addColorStop(0.7, '#0f172a');
    grad.addColorStop(1, '#020617');
    fctx.fillStyle = grad;
    fctx.fillRect(0, 0, 2048, 1024);
    // Simple Vector Continents
    fctx.fillStyle = '#10b981'; // Green accent for land in fallback
    fctx.globalAlpha = 0.4;
    [
        [320, 240, 140, 100], [280, 280, 90, 60], [380, 320, 60, 80],
        [430, 480, 70, 60], [410, 550, 55, 80], [1060, 190, 80, 50],
        [1060, 370, 80, 60], [1040, 440, 70, 90], [1280, 200, 180, 100],
        [1200, 250, 100, 70], [1210, 360, 40, 60], [1580, 550, 80, 55]
    ].forEach(b => {
        fctx.beginPath();
        fctx.ellipse(b[0], b[1], b[2], b[3], 0, 0, Math.PI * 2);
        fctx.fill();
    });
    
    const fallbackTex = new THREE.CanvasTexture(fallbackCanvas);
    const earthTex = texLoader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
    const geo = new THREE.SphereGeometry(1, 72, 72);
    const mat = new THREE.MeshPhongMaterial({
        map: fallbackTex,
        bumpScale: 0.02,
        specular: new THREE.Color(0x0ea5e9),
        shininess: 12
    });
    earthMesh = new THREE.Mesh(geo, mat);
    earthMesh.name = 'globe';
    scene.add(earthMesh);
    earthTex.onload = function() {
        mat.map = earthTex;
        mat.needsUpdate = true;
    };
    // Fallback timer
    setTimeout(() => {
        if (earthTex.image && earthTex.image.width > 0) {
            mat.map = earthTex;
            mat.needsUpdate = true;
        }
    }, 3000);
}
/* ─── CLOUDS ─────────────────────────────── */
function createClouds() {
    const texLoader = new THREE.TextureLoader();
    texLoader.crossOrigin = 'anonymous';
    const cloudTex = texLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');
    const geo = new THREE.SphereGeometry(1.008, 64, 64);
    const mat = new THREE.MeshPhongMaterial({
        map: null,
        transparent: true,
        opacity: 0.3,
        depthWrite: false
    });
    cloudsMesh = new THREE.Mesh(geo, mat);
    scene.add(cloudsMesh);
    cloudTex.onload = function() {
        mat.map = cloudTex;
        mat.needsUpdate = true;
    };
    setTimeout(() => {
        if (!cloudTex.image || cloudTex.image.width === 0) {
            const c = document.createElement('canvas');
            c.width = 1024; c.height = 512;
            const ctx = c.getContext('2d');
            for (let i = 0; i < 120; i++) {
                ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.06})`;
                ctx.beginPath();
                ctx.ellipse(Math.random() * 1024, Math.random() * 512, 30 + Math.random() * 80, 10 + Math.random() * 30, Math.random() * Math.PI, 0, Math.PI * 2);
                ctx.fill();
            }
            mat.map = new THREE.CanvasTexture(c);
            mat.needsUpdate = true;
        }
    }, 3500);
}
/* ─── ATMOSPHERE ─────────────────────────── */
function createAtmosphere() {
    const geo = new THREE.SphereGeometry(1.14, 64, 64);
    const mat = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vN;
            void main() {
                vN = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vN;
            void main() {
                float i = pow(0.65 - dot(vN, vec3(0,0,1)), 2.5);
                vec3 c = mix(vec3(0.08, 0.65, 0.95), vec3(0.2, 0.8, 1.0), i);
                gl_FragColor = vec4(c, i * 0.85);
            }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false
    });
    atmosphereMesh = new THREE.Mesh(geo, mat);
    scene.add(atmosphereMesh);
}
/* ─── MARKERS ───────────────────────────── */
function createMarkers(destinations) {
    Object.entries(destinations).forEach(([key, d]) => {
        const pos = latLngToVec3(d.lat, d.lng, 1.02);
        const marker = new THREE.Group();
        marker.position.copy(pos);
        marker.userData = { key, ...d };
        const dotGeo = new THREE.SphereGeometry(0.018, 12, 12);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.name = 'dot';
        marker.add(dot);
        const ringGeo = new THREE.RingGeometry(0.025, 0.04, 24);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x0ea5e9,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.name = 'ring';
        ring.lookAt(0, 0, 0);
        marker.add(ring);
        const pulseGeo = new THREE.SphereGeometry(0.03, 12, 12);
        const pulseMat = new THREE.MeshBasicMaterial({
            color: 0x0ea5e9,
            transparent: true,
            opacity: 0.15
        });
        const pulse = new THREE.Mesh(pulseGeo, pulseMat);
        pulse.name = 'pulse';
        marker.add(pulse);
        const hitGeo = new THREE.SphereGeometry(0.065, 8, 8);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hit = new THREE.Mesh(hitGeo, hitMat);
        hit.name = 'hit';
        marker.add(hit);
        // Core continuous loops for pulsing markers
        gsap.to(ring.scale, {
            x: 1.6, y: 1.6, z: 1.6,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        gsap.to(pulseMat, {
            opacity: 0,
            duration: 1.8,
            repeat: -1,
            yoyo: true
        });
        gsap.to(pulse.scale, {
            x: 2.2, y: 2.2, z: 2.2,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        markerGroup.add(marker);
    });
}
/* Update marker colors depending on whether they are From, To, or normal */
function updateSelectionMarkerColors(fromKey, toKey) {
    if (!markerGroup) return;
    
    markerGroup.children.forEach(m => {
        const dot = m.getObjectByName('dot');
        const ring = m.getObjectByName('ring');
        const pulse = m.getObjectByName('pulse');
        if (!dot) return;
        let color = 0x0ea5e9; // default cyan
        if (m.userData.key === fromKey) {
            color = 0xf97316; // Orange for Origin
        } else if (m.userData.key === toKey) {
            color = 0x10b981; // Green for Destination
        }
        dot.material.color.setHex(color);
        if (ring) ring.material.color.setHex(color);
        if (pulse) pulse.material.color.setHex(color);
    });
}
/* ─── DYNAMIC FLIGHT ARCS ────────────────── */
function drawFlightRoute(fromKey, toKey) {
    clearFlightRoutes();
    const fromMarker = markerGroup.children.find(c => c.userData.key === fromKey);
    const toMarker = markerGroup.children.find(c => c.userData.key === toKey);
    if (!fromMarker || !toMarker) return;
    // Fetch live coordinates
    let start = new THREE.Vector3();
    let end = new THREE.Vector3();
    fromMarker.getWorldPosition(start);
    toMarker.getWorldPosition(end);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(1 + dist * 0.35); // Arcing factor
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(80);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    // Color gradient representing direction of route
    const colors = [];
    points.forEach((p, i) => {
        const t = i / points.length;
        const c = new THREE.Color().lerpColors(new THREE.Color(0xf97316), new THREE.Color(0x10b981), t);
        colors.push(c.r, c.g, c.b);
    });
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        linewidth: 2
    }));
    arcGroup.add(line);
    // The animated flying dot
    const dotGeo = new THREE.SphereGeometry(0.016, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const arcDot = new THREE.Mesh(dotGeo, dotMat);
    arcDot.name = 'arcDot';
    arcGroup.add(arcDot);
    arcAnimations.push({
        curve,
        dot: arcDot,
        t: 0
    });
    // Anchor pulsing spheres at both origin and destination ends of the arc
    [start, end].forEach((pos, idx) => {
        const g = new THREE.SphereGeometry(0.015, 8, 8);
        const m = new THREE.MeshBasicMaterial({
            color: idx === 0 ? 0xf97316 : 0x10b981,
            transparent: true,
            opacity: 0.9
        });
        const d = new THREE.Mesh(g, m);
        d.position.copy(pos);
        arcGroup.add(d);
        gsap.to(d.scale, {
            x: 1.6, y: 1.6, z: 1.6,
            duration: 1,
            repeat: -1,
            yoyo: true
        });
    });
}
function clearFlightRoutes() {
    while (arcGroup && arcGroup.children.length) {
        const c = arcGroup.children[0];
        if (c.geometry) c.geometry.dispose();
        if (c.material) c.material.dispose();
        arcGroup.remove(c);
    }
    arcAnimations = [];
}
/* ─── EVENT CONTROLS ─────────────────────── */
function initGlobeEvents(canvas, onMarkerClicked) {
    canvas.addEventListener('pointerdown', e => {
        isDragging = true;
        autoRotate = false;
        prevMouse = { x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener('pointermove', e => {
        if (isDragging) {
            const dx = e.clientX - prevMouse.x;
            const dy = e.clientY - prevMouse.y;
            earthMesh.rotation.y += dx * 0.004;
            earthMesh.rotation.x = Math.max(-1.2, Math.min(1.2, earthMesh.rotation.x + dy * 0.004));
            cloudsMesh.rotation.y = earthMesh.rotation.y;
            cloudsMesh.rotation.x = earthMesh.rotation.x;
            markerGroup.rotation.y = earthMesh.rotation.y;
            markerGroup.rotation.x = earthMesh.rotation.x;
            prevMouse = { x: e.clientX, y: e.clientY };
        } else {
            handleGlobeHover(e);
        }
    });
    canvas.addEventListener('pointerup', () => { isDragging = false; });
    canvas.addEventListener('pointerleave', () => { isDragging = false; });
    canvas.addEventListener('click', e => {
        const hit = getMarkerHit(e);
        if (hit && onMarkerClicked) {
            onMarkerClicked(hit.userData.key);
        }
    });
    canvas.addEventListener('wheel', e => {
        e.preventDefault();
        camera.position.z = Math.max(2.2, Math.min(6.0, camera.position.z + e.deltaY * 0.003));
    }, { passive: false });
    window.addEventListener('resize', () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
function handleGlobeHover(e) {
    const m = getMarkerHit(e);
    if (m) {
        if (hoveredMarker !== m) {
            if (hoveredMarker) unhighlightMarker(hoveredMarker);
            hoveredMarker = m;
            highlightMarker(m);
            // Dispatch dynamic hover label to app state
            const event = new CustomEvent('globe-hover', { detail: m.userData });
            window.dispatchEvent(event);
        }
        document.body.style.cursor = 'pointer';
    } else {
        if (hoveredMarker) {
            unhighlightMarker(hoveredMarker);
            hoveredMarker = null;
            window.dispatchEvent(new CustomEvent('globe-hover-clear'));
        }
        document.body.style.cursor = 'default';
    }
}
function highlightMarker(m) {
    const dot = m.getObjectByName('dot');
    if (dot) {
        gsap.to(dot.scale, { x: 2, y: 2, z: 2, duration: .3 });
        gsap.to(dot.material, { color: new THREE.Color(0xff6b35), duration: .3 });
    }
    gsap.to(m.scale, { x: 1.4, y: 1.4, z: 1.4, duration: .3 });
}
function unhighlightMarker(m) {
    const dot = m.getObjectByName('dot');
    if (dot) {
        gsap.to(dot.scale, { x: 1, y: 1, z: 1, duration: .3 });
        // Retrieve dynamic select color
        let normalColor = 0x0ea5e9;
        if (window.selectedFromCountry === m.userData.key) normalColor = 0xf97316;
        else if (window.selectedToCountry === m.userData.key) normalColor = 0x10b981;
        gsap.to(dot.material, { color: new THREE.Color(normalColor), duration: .3 });
    }
    gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: .3 });
}
function highlightMarkerByKey(key) {
    const m = markerGroup.children.find(c => c.userData.key === key);
    if (m) {
        hoveredMarker = m;
        highlightMarker(m);
    }
}
function unhighlightMarkerByKey(key) {
    const m = markerGroup.children.find(c => c.userData.key === key);
    if (m && hoveredMarker === m) {
        unhighlightMarker(m);
        hoveredMarker = null;
    }
}
function flyCameraToCountry(key) {
    const m = markerGroup.children.find(c => c.userData.key === key);
    if (!m) return;
    autoRotate = false; // Stop rotation on selection!
    const targetVec = new THREE.Vector3();
    m.getWorldPosition(targetVec);
    const currentDist = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    targetCamPos = targetVec.clone().normalize().multiplyScalar(currentDist);
}
function setDayNightMode(night) {
    isNight = night;
    gsap.to('#heroBg', {
        backgroundColor: isNight ? '#020408' : '#020617',
        duration: 1.2
    });
    
    const sun = scene.getObjectByName('sunLight');
    if (sun) {
        gsap.to(sun, {
            intensity: isNight ? 0.15 : 1.2,
            duration: 1.2
        });
    }
    
    if (starField) {
        gsap.to(starField.material, {
            opacity: isNight ? 1 : 0.6,
            duration: 1.2
        });
    }
    
    if (earthMesh) {
        gsap.to(earthMesh.material, {
            shininess: isNight ? 3 : 12,
            duration: 1.2
        });
    }
    
    if (cloudsMesh) {
        gsap.to(cloudsMesh.material, {
            opacity: isNight ? 0.15 : 0.3,
            duration: 1.2
        });
    }
}
function zoomGlobe(zoomDirection) {
    const delta = zoomDirection === 'in' ? -0.5 : 0.5;
    gsap.to(camera.position, {
        z: Math.max(2.2, Math.min(6.0, camera.position.z + delta)),
        duration: 0.5
    });
}
function getMarkerHit(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    const hits = raycaster.intersectObjects(markerGroup.children, true);
    for (let h = 0; h < hits.length; h++) {
        let obj = hits[h].object;
        while (obj.parent && !obj.userData.key) {
            obj = obj.parent;
        }
        if (obj.userData.key) return obj;
    }
    return null;
}
function latLngToVec3(lat, lng, r) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + 180) * Math.PI / 180;
    return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
    );
}
/* ─── ANIMATION LOOP ────────────────────── */
function animate() {
    requestAnimationFrame(animate);
    if (!scene) return;
    const dt = clock.getDelta();
    if (autoRotate && !isDragging) {
        earthMesh.rotation.y += 0.0015;
        cloudsMesh.rotation.y += 0.0012;
        markerGroup.rotation.y += 0.0015;
    }
    if (targetCamPos) {
        camera.position.lerp(targetCamPos, 0.04);
        camera.lookAt(0, 0, 0);
        if (camera.position.distanceTo(targetCamPos) < 0.02) {
            targetCamPos = null;
        }
    }
    arcAnimations.forEach(a => {
        a.t = (a.t + dt * 0.3) % 1;
        const pos = a.curve.getPoint(a.t);
        a.dot.position.copy(pos);
    });
    if (starField) starField.rotation.y += 0.00008;
    renderer.render(scene, camera);
}
