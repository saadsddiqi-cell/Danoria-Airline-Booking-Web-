-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2026 at 12:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `danoria`
--

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` int(11) NOT NULL,
  `from_code` varchar(5) NOT NULL,
  `to_code` varchar(5) NOT NULL,
  `from_country` varchar(60) NOT NULL,
  `to_country` varchar(60) NOT NULL,
  `flight_code` varchar(25) NOT NULL,
  `departure_time` varchar(10) NOT NULL,
  `economy_price` decimal(10,2) NOT NULL,
  `business_price` decimal(10,2) NOT NULL,
  `first_price` decimal(10,2) NOT NULL,
  `duration_hours` decimal(4,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `from_code`, `to_code`, `from_country`, `to_country`, `flight_code`, `departure_time`, `economy_price`, `business_price`, `first_price`, `duration_hours`) VALUES
(1, 'ISB', 'JFK', 'Pakistan', 'United States', 'DN-ISBJFK-100', '06:30', 1409.62, 1973.47, 2537.31, 13.3),
(2, 'ISB', 'YYZ', 'Pakistan', 'Canada', 'DN-ISBYYZ-101', '08:15', 1396.72, 1955.41, 2514.10, 13.2),
(3, 'ISB', 'BER', 'Pakistan', 'Germany', 'DN-ISBBER-102', '10:00', 692.37, 969.32, 1246.26, 6.7),
(4, 'ISB', 'IST', 'Pakistan', 'Turkey', 'DN-ISBIST-103', '12:45', 552.45, 773.44, 994.42, 5.4),
(5, 'ISB', 'BKK', 'Pakistan', 'Thailand', 'DN-ISBBKK-104', '14:30', 505.55, 707.78, 910.00, 4.9),
(6, 'ISB', 'KUL', 'Pakistan', 'Malaysia', 'DN-ISBKUL-105', '16:00', 621.45, 870.02, 1118.60, 6.0),
(7, 'ISB', 'CMB', 'Pakistan', 'Sri Lanka', 'DN-ISBCMB-106', '18:20', 446.87, 625.62, 804.37, 4.4),
(8, 'ISB', 'DXB', 'Pakistan', 'United Arab Emirates', 'DN-ISBDXB-107', '20:45', 314.96, 440.95, 566.93, 3.2),
(9, 'ISB', 'DPS', 'Pakistan', 'Indonesia', 'DN-ISBDPS-108', '22:00', 854.37, 1196.12, 1537.87, 8.2),
(10, 'ISB', 'TBS', 'Pakistan', 'Georgia', 'DN-ISBTBS-109', '23:30', 394.92, 552.88, 710.85, 3.9),
(11, 'ISB', 'KTM', 'Pakistan', 'Nepal', 'DN-ISBKTM-110', '06:30', 241.68, 338.36, 435.03, 2.5),
(12, 'ISB', 'MLE', 'Pakistan', 'Maldives', 'DN-ISBMLE-111', '08:15', 473.80, 663.33, 852.85, 4.6),
(13, 'ISB', 'HND', 'Pakistan', 'Japan', 'DN-ISBHND-112', '10:00', 796.80, 1115.51, 1434.23, 7.6),
(14, 'ISB', 'CAI', 'Pakistan', 'Egypt', 'DN-ISBCAI-113', '12:45', 553.12, 774.37, 995.62, 5.4),
(15, 'JFK', 'ISB', 'United States', 'Pakistan', 'DN-JFKISB-114', '14:30', 1409.62, 1973.47, 2537.31, 13.3),
(16, 'JFK', 'YYZ', 'United States', 'Canada', 'DN-JFKYYZ-115', '16:00', 146.07, 204.50, 262.93, 1.6),
(17, 'JFK', 'BER', 'United States', 'Germany', 'DN-JFKBER-116', '18:20', 846.15, 1184.60, 1523.06, 8.1),
(18, 'JFK', 'IST', 'United States', 'Turkey', 'DN-JFKIST-117', '20:45', 1048.36, 1467.70, 1887.05, 10.0),
(19, 'JFK', 'BKK', 'United States', 'Thailand', 'DN-JFKBKK-118', '22:00', 1751.95, 2452.73, 3153.51, 16.5),
(20, 'JFK', 'KUL', 'United States', 'Malaysia', 'DN-JFKKUL-119', '23:30', 1894.47, 2652.25, 3410.04, 17.8),
(21, 'JFK', 'CMB', 'United States', 'Sri Lanka', 'DN-JFKCMB-120', '06:30', 1769.96, 2477.95, 3185.94, 16.6),
(22, 'JFK', 'DXB', 'United States', 'United Arab Emirates', 'DN-JFKDXB-121', '08:15', 1401.00, 1961.40, 2521.80, 13.2),
(23, 'JFK', 'DPS', 'United States', 'Indonesia', 'DN-JFKDPS-122', '10:00', 2037.14, 2851.99, 3666.85, 19.1),
(24, 'JFK', 'TBS', 'United States', 'Georgia', 'DN-JFKTBS-123', '12:45', 1157.14, 1619.99, 2082.85, 11.0),
(25, 'JFK', 'KTM', 'United States', 'Nepal', 'DN-JFKKTM-124', '14:30', 1533.61, 2147.06, 2760.51, 14.5),
(26, 'JFK', 'MLE', 'United States', 'Maldives', 'DN-JFKMLE-125', '16:00', 1763.54, 2468.96, 3174.37, 16.6),
(27, 'JFK', 'HND', 'United States', 'Japan', 'DN-JFKHND-126', '18:20', 1382.35, 1935.28, 2488.22, 13.1),
(28, 'JFK', 'CAI', 'United States', 'Egypt', 'DN-JFKCAI-127', '20:45', 1162.60, 1627.64, 2092.68, 11.0),
(29, 'YYZ', 'ISB', 'Canada', 'Pakistan', 'DN-YYZISB-128', '22:00', 1396.72, 1955.41, 2514.10, 13.2),
(30, 'YYZ', 'JFK', 'Canada', 'United States', 'DN-YYZJFK-129', '23:30', 146.07, 204.50, 262.93, 1.6),
(31, 'YYZ', 'BER', 'Canada', 'Germany', 'DN-YYZBER-130', '06:30', 857.08, 1199.91, 1542.74, 8.2),
(32, 'YYZ', 'IST', 'Canada', 'Turkey', 'DN-YYZIST-131', '08:15', 1063.20, 1488.48, 1913.76, 10.1),
(33, 'YYZ', 'BKK', 'Canada', 'Thailand', 'DN-YYZBKK-132', '10:00', 1715.90, 2402.26, 3088.62, 16.1),
(34, 'YYZ', 'KUL', 'Canada', 'Malaysia', 'DN-YYZKUL-133', '12:45', 1857.48, 2600.47, 3343.46, 17.5),
(35, 'YYZ', 'CMB', 'Canada', 'Sri Lanka', 'DN-YYZCMB-134', '14:30', 1761.94, 2466.72, 3171.49, 16.6),
(36, 'YYZ', 'DXB', 'Canada', 'United Arab Emirates', 'DN-YYZDXB-135', '16:00', 1408.57, 1972.00, 2535.43, 13.3),
(37, 'YYZ', 'DPS', 'Canada', 'Indonesia', 'DN-YYZDPS-136', '18:20', 1981.81, 2774.53, 3567.26, 18.6),
(38, 'YYZ', 'TBS', 'Canada', 'Georgia', 'DN-YYZTBS-137', '20:45', 1161.42, 1625.99, 2090.56, 11.0),
(39, 'YYZ', 'KTM', 'Canada', 'Nepal', 'DN-YYZKTM-138', '22:00', 1511.38, 2115.93, 2720.48, 14.3),
(40, 'YYZ', 'MLE', 'Canada', 'Maldives', 'DN-YYZMLE-139', '23:30', 1765.37, 2471.52, 3177.67, 16.6),
(41, 'YYZ', 'HND', 'Canada', 'Japan', 'DN-YYZHND-140', '06:30', 1322.31, 1851.23, 2380.16, 12.5),
(42, 'YYZ', 'CAI', 'Canada', 'Egypt', 'DN-YYZCAI-141', '08:15', 1185.05, 1659.07, 2133.08, 11.2),
(43, 'BER', 'ISB', 'Germany', 'Pakistan', 'DN-BERISB-142', '10:00', 692.37, 969.32, 1246.26, 6.7),
(44, 'BER', 'JFK', 'Germany', 'United States', 'DN-BERJFK-143', '12:45', 846.15, 1184.60, 1523.06, 8.1),
(45, 'BER', 'YYZ', 'Germany', 'Canada', 'DN-BERYYZ-144', '14:30', 857.08, 1199.91, 1542.74, 8.2),
(46, 'BER', 'IST', 'Germany', 'Turkey', 'DN-BERIST-145', '16:00', 288.61, 404.05, 519.50, 2.9),
(47, 'BER', 'BKK', 'Germany', 'Thailand', 'DN-BERBKK-146', '18:20', 1112.48, 1557.47, 2002.47, 10.6),
(48, 'BER', 'KUL', 'Germany', 'Malaysia', 'DN-BERKUL-147', '20:45', 1233.81, 1727.33, 2220.85, 11.7),
(49, 'BER', 'CMB', 'Germany', 'Sri Lanka', 'DN-BERCMB-148', '22:00', 1018.23, 1425.52, 1832.81, 9.7),
(50, 'BER', 'DXB', 'Germany', 'United Arab Emirates', 'DN-BERDXB-149', '23:30', 635.00, 889.00, 1143.00, 6.1),
(51, 'BER', 'DPS', 'Germany', 'Indonesia', 'DN-BERDPS-150', '06:30', 1465.27, 2051.38, 2637.48, 13.8),
(52, 'BER', 'TBS', 'Germany', 'Georgia', 'DN-BERTBS-151', '08:15', 396.27, 554.77, 713.28, 3.9),
(53, 'BER', 'KTM', 'Germany', 'Nepal', 'DN-BERKTM-152', '10:00', 848.25, 1187.55, 1526.85, 8.1),
(54, 'BER', 'MLE', 'Germany', 'Maldives', 'DN-BERMLE-153', '12:45', 999.17, 1398.84, 1798.51, 9.5),
(55, 'BER', 'HND', 'Germany', 'Japan', 'DN-BERHND-154', '14:30', 1149.96, 1609.94, 2069.93, 10.9),
(56, 'BER', 'CAI', 'Germany', 'Egypt', 'DN-BERCAI-155', '16:00', 427.07, 597.90, 768.73, 4.2),
(57, 'IST', 'ISB', 'Turkey', 'Pakistan', 'DN-ISTISB-156', '18:20', 552.45, 773.44, 994.42, 5.4),
(58, 'IST', 'JFK', 'Turkey', 'United States', 'DN-ISTJFK-157', '20:45', 1048.36, 1467.70, 1887.05, 10.0),
(59, 'IST', 'YYZ', 'Turkey', 'Canada', 'DN-ISTYYZ-158', '22:00', 1063.20, 1488.48, 1913.76, 10.1),
(60, 'IST', 'BER', 'Turkey', 'Germany', 'DN-ISTBER-159', '23:30', 288.61, 404.05, 519.50, 2.9),
(61, 'IST', 'BKK', 'Turkey', 'Thailand', 'DN-ISTBKK-160', '06:30', 976.12, 1366.57, 1757.02, 9.3),
(62, 'IST', 'KUL', 'Turkey', 'Malaysia', 'DN-ISTKUL-161', '08:15', 1079.98, 1511.98, 1943.97, 10.3),
(63, 'IST', 'CMB', 'Turkey', 'Sri Lanka', 'DN-ISTCMB-162', '10:00', 834.16, 1167.82, 1501.49, 8.0),
(64, 'IST', 'DXB', 'Turkey', 'United Arab Emirates', 'DN-ISTDXB-163', '12:45', 439.39, 615.14, 790.90, 4.3),
(65, 'IST', 'DPS', 'Turkey', 'Indonesia', 'DN-ISTDPS-164', '14:30', 1316.46, 1843.04, 2369.63, 12.4),
(66, 'IST', 'TBS', 'Turkey', 'Georgia', 'DN-ISTTBS-165', '16:00', 238.81, 334.33, 429.86, 2.5),
(67, 'IST', 'KTM', 'Turkey', 'Nepal', 'DN-ISTKTM-166', '18:20', 714.11, 999.75, 1285.40, 6.9),
(68, 'IST', 'MLE', 'Turkey', 'Maldives', 'DN-ISTMLE-167', '20:45', 803.83, 1125.36, 1446.89, 7.7),
(69, 'IST', 'HND', 'Turkey', 'Japan', 'DN-ISTHND-168', '22:00', 1153.38, 1614.73, 2076.08, 10.9),
(70, 'IST', 'CAI', 'Turkey', 'Egypt', 'DN-ISTCAI-169', '23:30', 228.27, 319.58, 410.89, 2.4),
(71, 'BKK', 'ISB', 'Thailand', 'Pakistan', 'DN-BKKISB-170', '06:30', 505.55, 707.78, 910.00, 4.9),
(72, 'BKK', 'JFK', 'Thailand', 'United States', 'DN-BKKJFK-171', '08:15', 1751.95, 2452.73, 3153.51, 16.5),
(73, 'BKK', 'YYZ', 'Thailand', 'Canada', 'DN-BKKYYZ-172', '10:00', 1715.90, 2402.26, 3088.62, 16.1),
(74, 'BKK', 'BER', 'Thailand', 'Germany', 'DN-BKKBER-173', '12:45', 1112.48, 1557.47, 2002.47, 10.6),
(75, 'BKK', 'IST', 'Thailand', 'Turkey', 'DN-BKKIST-174', '14:30', 976.12, 1366.57, 1757.02, 9.3),
(76, 'BKK', 'KUL', 'Thailand', 'Malaysia', 'DN-BKKKUL-175', '16:00', 222.56, 311.58, 400.60, 2.3),
(77, 'BKK', 'CMB', 'Thailand', 'Sri Lanka', 'DN-BKKCMB-176', '18:20', 365.64, 511.90, 658.16, 3.6),
(78, 'BKK', 'DXB', 'Thailand', 'United Arab Emirates', 'DN-BKKDXB-177', '20:45', 666.19, 932.66, 1199.14, 6.4),
(79, 'BKK', 'DPS', 'Thailand', 'Indonesia', 'DN-BKKDPS-178', '22:00', 433.78, 607.29, 780.80, 4.3),
(80, 'BKK', 'TBS', 'Thailand', 'Georgia', 'DN-BKKTBS-179', '23:30', 820.02, 1148.03, 1476.04, 7.9),
(81, 'BKK', 'KTM', 'Thailand', 'Nepal', 'DN-BKKKTM-180', '06:30', 345.15, 483.21, 621.27, 3.5),
(82, 'BKK', 'MLE', 'Thailand', 'Maldives', 'DN-BKKMLE-181', '08:15', 457.64, 640.69, 823.75, 4.5),
(83, 'BKK', 'HND', 'Thailand', 'Japan', 'DN-BKKHND-182', '10:00', 631.91, 884.68, 1137.44, 6.1),
(84, 'BKK', 'CAI', 'Thailand', 'Egypt', 'DN-BKKCAI-183', '12:45', 952.37, 1333.32, 1714.26, 9.1),
(85, 'KUL', 'ISB', 'Malaysia', 'Pakistan', 'DN-KULISB-184', '14:30', 621.45, 870.02, 1118.60, 6.0),
(86, 'KUL', 'JFK', 'Malaysia', 'United States', 'DN-KULJFK-185', '16:00', 1894.47, 2652.25, 3410.04, 17.8),
(87, 'KUL', 'YYZ', 'Malaysia', 'Canada', 'DN-KULYYZ-186', '18:20', 1857.48, 2600.47, 3343.46, 17.5),
(88, 'KUL', 'BER', 'Malaysia', 'Germany', 'DN-KULBER-187', '20:45', 1233.81, 1727.33, 2220.85, 11.7),
(89, 'KUL', 'IST', 'Malaysia', 'Turkey', 'DN-KULIST-188', '22:00', 1079.98, 1511.98, 1943.97, 10.3),
(90, 'KUL', 'BKK', 'Malaysia', 'Thailand', 'DN-KULBKK-189', '23:30', 222.56, 311.58, 400.60, 2.3),
(91, 'KUL', 'CMB', 'Malaysia', 'Sri Lanka', 'DN-KULCMB-190', '06:30', 374.34, 524.08, 673.82, 3.7),
(92, 'KUL', 'DXB', 'Malaysia', 'United Arab Emirates', 'DN-KULDXB-191', '08:15', 743.77, 1041.28, 1338.78, 7.1),
(93, 'KUL', 'DPS', 'Malaysia', 'Indonesia', 'DN-KULDPS-192', '10:00', 316.52, 443.12, 569.73, 3.2),
(94, 'KUL', 'TBS', 'Malaysia', 'Georgia', 'DN-KULTBS-193', '12:45', 929.32, 1301.05, 1672.78, 8.9),
(95, 'KUL', 'KTM', 'Malaysia', 'Nepal', 'DN-KULKTM-194', '14:30', 468.58, 656.01, 843.44, 4.6),
(96, 'KUL', 'MLE', 'Malaysia', 'Maldives', 'DN-KULMLE-195', '16:00', 455.49, 637.69, 819.88, 4.5),
(97, 'KUL', 'HND', 'Malaysia', 'Japan', 'DN-KULHND-196', '18:20', 718.23, 1005.52, 1292.82, 6.9),
(98, 'KUL', 'CAI', 'Malaysia', 'Egypt', 'DN-KULCAI-197', '20:45', 1034.63, 1448.49, 1862.34, 9.8),
(99, 'CMB', 'ISB', 'Sri Lanka', 'Pakistan', 'DN-CMBISB-198', '22:00', 446.87, 625.62, 804.37, 4.4),
(100, 'CMB', 'JFK', 'Sri Lanka', 'United States', 'DN-CMBJFK-199', '23:30', 1769.96, 2477.95, 3185.94, 16.6),
(101, 'CMB', 'YYZ', 'Sri Lanka', 'Canada', 'DN-CMBYYZ-200', '06:30', 1761.94, 2466.72, 3171.49, 16.6),
(102, 'CMB', 'BER', 'Sri Lanka', 'Germany', 'DN-CMBBER-201', '08:15', 1018.23, 1425.52, 1832.81, 9.7),
(103, 'CMB', 'IST', 'Sri Lanka', 'Turkey', 'DN-CMBIST-202', '10:00', 834.16, 1167.82, 1501.49, 8.0),
(104, 'CMB', 'BKK', 'Sri Lanka', 'Thailand', 'DN-CMBBKK-203', '12:45', 365.64, 511.90, 658.16, 3.6),
(105, 'CMB', 'KUL', 'Sri Lanka', 'Malaysia', 'DN-CMBKUL-204', '14:30', 374.34, 524.08, 673.82, 3.7),
(106, 'CMB', 'DXB', 'Sri Lanka', 'United Arab Emirates', 'DN-CMBDXB-205', '16:00', 477.16, 668.02, 858.89, 4.7),
(107, 'CMB', 'DPS', 'Sri Lanka', 'Indonesia', 'DN-CMBDPS-206', '18:20', 592.38, 829.33, 1066.28, 5.7),
(108, 'CMB', 'TBS', 'Sri Lanka', 'Georgia', 'DN-CMBTBS-207', '20:45', 701.97, 982.76, 1263.54, 6.8),
(109, 'CMB', 'KTM', 'Sri Lanka', 'Nepal', 'DN-CMBKTM-208', '22:00', 365.87, 512.22, 658.57, 3.6),
(110, 'CMB', 'MLE', 'Sri Lanka', 'Maldives', 'DN-CMBMLE-209', '23:30', 172.08, 240.92, 309.75, 1.9),
(111, 'CMB', 'HND', 'Sri Lanka', 'Japan', 'DN-CMBHND-210', '06:30', 901.58, 1262.22, 1622.85, 8.6),
(112, 'CMB', 'CAI', 'Sri Lanka', 'Egypt', 'DN-CMBCAI-211', '08:15', 761.53, 1066.14, 1370.75, 7.3),
(113, 'DXB', 'ISB', 'United Arab Emirates', 'Pakistan', 'DN-DXBISB-212', '10:00', 314.96, 440.95, 566.93, 3.2),
(114, 'DXB', 'JFK', 'United Arab Emirates', 'United States', 'DN-DXBJFK-213', '12:45', 1401.00, 1961.40, 2521.80, 13.2),
(115, 'DXB', 'YYZ', 'United Arab Emirates', 'Canada', 'DN-DXBYYZ-214', '14:30', 1408.57, 1972.00, 2535.43, 13.3),
(116, 'DXB', 'BER', 'United Arab Emirates', 'Germany', 'DN-DXBBER-215', '16:00', 635.00, 889.00, 1143.00, 6.1),
(117, 'DXB', 'IST', 'United Arab Emirates', 'Turkey', 'DN-DXBIST-216', '18:20', 439.39, 615.14, 790.90, 4.3),
(118, 'DXB', 'BKK', 'United Arab Emirates', 'Thailand', 'DN-DXBBKK-217', '20:45', 666.19, 932.66, 1199.14, 6.4),
(119, 'DXB', 'KUL', 'United Arab Emirates', 'Malaysia', 'DN-DXBKUL-218', '22:00', 743.77, 1041.28, 1338.78, 7.1),
(120, 'DXB', 'CMB', 'United Arab Emirates', 'Sri Lanka', 'DN-DXBCMB-219', '23:30', 477.16, 668.02, 858.89, 4.7),
(121, 'DXB', 'DPS', 'United Arab Emirates', 'Indonesia', 'DN-DXBDPS-220', '06:30', 977.45, 1368.43, 1759.42, 9.3),
(122, 'DXB', 'TBS', 'United Arab Emirates', 'Georgia', 'DN-DXBTBS-221', '08:15', 328.67, 460.14, 591.61, 3.3),
(123, 'DXB', 'KTM', 'United Arab Emirates', 'Nepal', 'DN-DXBKTM-222', '10:00', 439.66, 615.52, 791.39, 4.3),
(124, 'DXB', 'MLE', 'United Arab Emirates', 'Maldives', 'DN-DXBMLE-223', '12:45', 445.14, 623.19, 801.25, 4.4),
(125, 'DXB', 'HND', 'United Arab Emirates', 'Japan', 'DN-DXBHND-224', '14:30', 1031.67, 1444.33, 1857.00, 9.8),
(126, 'DXB', 'CAI', 'United Arab Emirates', 'Egypt', 'DN-DXBCAI-225', '16:00', 370.87, 519.22, 667.57, 3.7),
(127, 'DPS', 'ISB', 'Indonesia', 'Pakistan', 'DN-DPSISB-226', '18:20', 854.37, 1196.12, 1537.87, 8.2),
(128, 'DPS', 'JFK', 'Indonesia', 'United States', 'DN-DPSJFK-227', '20:45', 2037.14, 2851.99, 3666.85, 19.1),
(129, 'DPS', 'YYZ', 'Indonesia', 'Canada', 'DN-DPSYYZ-228', '22:00', 1981.81, 2774.53, 3567.26, 18.6),
(130, 'DPS', 'BER', 'Indonesia', 'Germany', 'DN-DPSBER-229', '23:30', 1465.27, 2051.38, 2637.48, 13.8),
(131, 'DPS', 'IST', 'Indonesia', 'Turkey', 'DN-DPSIST-230', '06:30', 1316.46, 1843.04, 2369.63, 12.4),
(132, 'DPS', 'BKK', 'Indonesia', 'Thailand', 'DN-DPSBKK-231', '08:15', 433.78, 607.29, 780.80, 4.3),
(133, 'DPS', 'KUL', 'Indonesia', 'Malaysia', 'DN-DPSKUL-232', '10:00', 316.52, 443.12, 569.73, 3.2),
(134, 'DPS', 'CMB', 'Indonesia', 'Sri Lanka', 'DN-DPSCMB-233', '12:45', 592.38, 829.33, 1066.28, 5.7),
(135, 'DPS', 'DXB', 'Indonesia', 'United Arab Emirates', 'DN-DPSDXB-234', '14:30', 977.45, 1368.43, 1759.42, 9.3),
(136, 'DPS', 'TBS', 'Indonesia', 'Georgia', 'DN-DPSTBS-235', '16:00', 1165.00, 1631.00, 2097.00, 11.0),
(137, 'DPS', 'KTM', 'Indonesia', 'Nepal', 'DN-DPSKTM-236', '18:20', 697.02, 975.83, 1254.64, 6.7),
(138, 'DPS', 'MLE', 'Indonesia', 'Maldives', 'DN-DPSMLE-237', '20:45', 659.43, 923.20, 1186.98, 6.4),
(139, 'DPS', 'HND', 'Indonesia', 'Japan', 'DN-DPSHND-238', '22:00', 743.65, 1041.12, 1338.58, 7.1),
(140, 'DPS', 'CAI', 'Indonesia', 'Egypt', 'DN-DPSCAI-239', '23:30', 1267.81, 1774.93, 2282.05, 12.0),
(141, 'TBS', 'ISB', 'Georgia', 'Pakistan', 'DN-TBSISB-240', '06:30', 394.92, 552.88, 710.85, 3.9),
(142, 'TBS', 'JFK', 'Georgia', 'United States', 'DN-TBSJFK-241', '08:15', 1157.14, 1619.99, 2082.85, 11.0),
(143, 'TBS', 'YYZ', 'Georgia', 'Canada', 'DN-TBSYYZ-242', '10:00', 1161.42, 1625.99, 2090.56, 11.0),
(144, 'TBS', 'BER', 'Georgia', 'Germany', 'DN-TBSBER-243', '12:45', 396.27, 554.77, 713.28, 3.9),
(145, 'TBS', 'IST', 'Georgia', 'Turkey', 'DN-TBSIST-244', '14:30', 238.81, 334.33, 429.86, 2.5),
(146, 'TBS', 'BKK', 'Georgia', 'Thailand', 'DN-TBSBKK-245', '16:00', 820.02, 1148.03, 1476.04, 7.9),
(147, 'TBS', 'KUL', 'Georgia', 'Malaysia', 'DN-TBSKUL-246', '18:20', 929.32, 1301.05, 1672.78, 8.9),
(148, 'TBS', 'CMB', 'Georgia', 'Sri Lanka', 'DN-TBSCMB-247', '20:45', 701.97, 982.76, 1263.54, 6.8),
(149, 'TBS', 'DXB', 'Georgia', 'United Arab Emirates', 'DN-TBSDXB-248', '22:00', 328.67, 460.14, 591.61, 3.3),
(150, 'TBS', 'DPS', 'Georgia', 'Indonesia', 'DN-TBSDPS-249', '23:30', 1165.00, 1631.00, 2097.00, 11.0),
(151, 'TBS', 'KTM', 'Georgia', 'Nepal', 'DN-TBSKTM-250', '06:30', 556.54, 779.15, 1001.77, 5.4),
(152, 'TBS', 'MLE', 'Georgia', 'Maldives', 'DN-TBSMLE-251', '08:15', 686.40, 960.96, 1235.52, 6.6),
(153, 'TBS', 'HND', 'Georgia', 'Japan', 'DN-TBSHND-252', '10:00', 1018.18, 1425.46, 1832.73, 9.7),
(154, 'TBS', 'CAI', 'Georgia', 'Egypt', 'DN-TBSCAI-253', '12:45', 293.57, 410.99, 528.42, 3.0),
(155, 'KTM', 'ISB', 'Nepal', 'Pakistan', 'DN-KTMISB-254', '14:30', 241.68, 338.36, 435.03, 2.5),
(156, 'KTM', 'JFK', 'Nepal', 'United States', 'DN-KTMJFK-255', '16:00', 1533.61, 2147.06, 2760.51, 14.5),
(157, 'KTM', 'YYZ', 'Nepal', 'Canada', 'DN-KTMYYZ-256', '18:20', 1511.38, 2115.93, 2720.48, 14.3),
(158, 'KTM', 'BER', 'Nepal', 'Germany', 'DN-KTMBER-257', '20:45', 848.25, 1187.55, 1526.85, 8.1),
(159, 'KTM', 'IST', 'Nepal', 'Turkey', 'DN-KTMIST-258', '22:00', 714.11, 999.75, 1285.40, 6.9),
(160, 'KTM', 'BKK', 'Nepal', 'Thailand', 'DN-KTMBKK-259', '23:30', 345.15, 483.21, 621.27, 3.5),
(161, 'KTM', 'KUL', 'Nepal', 'Malaysia', 'DN-KTMKUL-260', '06:30', 468.58, 656.01, 843.44, 4.6),
(162, 'KTM', 'CMB', 'Nepal', 'Sri Lanka', 'DN-KTMCMB-261', '08:15', 365.87, 512.22, 658.57, 3.6),
(163, 'KTM', 'DXB', 'Nepal', 'United Arab Emirates', 'DN-KTMDXB-262', '10:00', 439.66, 615.52, 791.39, 4.3),
(164, 'KTM', 'DPS', 'Nepal', 'Indonesia', 'DN-KTMDPS-263', '12:45', 697.02, 975.83, 1254.64, 6.7),
(165, 'KTM', 'TBS', 'Nepal', 'Georgia', 'DN-KTMTBS-264', '14:30', 556.54, 779.15, 1001.77, 5.4),
(166, 'KTM', 'MLE', 'Nepal', 'Maldives', 'DN-KTMMLE-265', '16:00', 428.21, 599.49, 770.77, 4.2),
(167, 'KTM', 'HND', 'Nepal', 'Japan', 'DN-KTMHND-266', '18:20', 698.17, 977.43, 1256.70, 6.7),
(168, 'KTM', 'CAI', 'Nepal', 'Egypt', 'DN-KTMCAI-267', '20:45', 706.85, 989.58, 1272.32, 6.8),
(169, 'MLE', 'ISB', 'Maldives', 'Pakistan', 'DN-MLEISB-268', '22:00', 473.80, 663.33, 852.85, 4.6),
(170, 'MLE', 'JFK', 'Maldives', 'United States', 'DN-MLEJFK-269', '23:30', 1763.54, 2468.96, 3174.37, 16.6),
(171, 'MLE', 'YYZ', 'Maldives', 'Canada', 'DN-MLEYYZ-270', '06:30', 1765.37, 2471.52, 3177.67, 16.6),
(172, 'MLE', 'BER', 'Maldives', 'Germany', 'DN-MLEBER-271', '08:15', 999.17, 1398.84, 1798.51, 9.5),
(173, 'MLE', 'IST', 'Maldives', 'Turkey', 'DN-MLEIST-272', '10:00', 803.83, 1125.36, 1446.89, 7.7),
(174, 'MLE', 'BKK', 'Maldives', 'Thailand', 'DN-MLEBKK-273', '12:45', 457.64, 640.69, 823.75, 4.5),
(175, 'MLE', 'KUL', 'Maldives', 'Malaysia', 'DN-MLEKUL-274', '14:30', 455.49, 637.69, 819.88, 4.5),
(176, 'MLE', 'CMB', 'Maldives', 'Sri Lanka', 'DN-MLECMB-275', '16:00', 172.08, 240.92, 309.75, 1.9),
(177, 'MLE', 'DXB', 'Maldives', 'United Arab Emirates', 'DN-MLEDXB-276', '18:20', 445.14, 623.19, 801.25, 4.4),
(178, 'MLE', 'DPS', 'Maldives', 'Indonesia', 'DN-MLEDPS-277', '20:45', 659.43, 923.20, 1186.98, 6.4),
(179, 'MLE', 'TBS', 'Maldives', 'Georgia', 'DN-MLETBS-278', '22:00', 686.40, 960.96, 1235.52, 6.6),
(180, 'MLE', 'KTM', 'Maldives', 'Nepal', 'DN-MLEKTM-279', '23:30', 428.21, 599.49, 770.77, 4.2),
(181, 'MLE', 'HND', 'Maldives', 'Japan', 'DN-MLEHND-280', '06:30', 991.13, 1387.58, 1784.04, 9.4),
(182, 'MLE', 'CAI', 'Maldives', 'Egypt', 'DN-MLECAI-281', '08:15', 714.12, 999.77, 1285.42, 6.9),
(183, 'HND', 'ISB', 'Japan', 'Pakistan', 'DN-HNDISB-282', '10:00', 796.80, 1115.51, 1434.23, 7.6),
(184, 'HND', 'JFK', 'Japan', 'United States', 'DN-HNDJFK-283', '12:45', 1382.35, 1935.28, 2488.22, 13.1),
(185, 'HND', 'YYZ', 'Japan', 'Canada', 'DN-HNDYYZ-284', '14:30', 1322.31, 1851.23, 2380.16, 12.5),
(186, 'HND', 'BER', 'Japan', 'Germany', 'DN-HNDBER-285', '16:00', 1149.96, 1609.94, 2069.93, 10.9),
(187, 'HND', 'IST', 'Japan', 'Turkey', 'DN-HNDIST-286', '18:20', 1153.38, 1614.73, 2076.08, 10.9),
(188, 'HND', 'BKK', 'Japan', 'Thailand', 'DN-HNDBKK-287', '20:45', 631.91, 884.68, 1137.44, 6.1),
(189, 'HND', 'KUL', 'Japan', 'Malaysia', 'DN-HNDKUL-288', '22:00', 718.23, 1005.52, 1292.82, 6.9),
(190, 'HND', 'CMB', 'Japan', 'Sri Lanka', 'DN-HNDCMB-289', '23:30', 901.58, 1262.22, 1622.85, 8.6),
(191, 'HND', 'DXB', 'Japan', 'United Arab Emirates', 'DN-HNDDXB-290', '06:30', 1031.67, 1444.33, 1857.00, 9.8),
(192, 'HND', 'DPS', 'Japan', 'Indonesia', 'DN-HNDDPS-291', '08:15', 743.65, 1041.12, 1338.58, 7.1),
(193, 'HND', 'TBS', 'Japan', 'Georgia', 'DN-HNDTBS-292', '10:00', 1018.18, 1425.46, 1832.73, 9.7),
(194, 'HND', 'KTM', 'Japan', 'Nepal', 'DN-HNDKTM-293', '12:45', 698.17, 977.43, 1256.70, 6.7),
(195, 'HND', 'MLE', 'Japan', 'Maldives', 'DN-HNDMLE-294', '14:30', 991.13, 1387.58, 1784.04, 9.4),
(196, 'HND', 'CAI', 'Japan', 'Egypt', 'DN-HNDCAI-295', '16:00', 1227.58, 1718.61, 2209.65, 11.6),
(197, 'CAI', 'ISB', 'Egypt', 'Pakistan', 'DN-CAIISB-296', '18:20', 553.12, 774.37, 995.62, 5.4),
(198, 'CAI', 'JFK', 'Egypt', 'United States', 'DN-CAIJFK-297', '20:45', 1162.60, 1627.64, 2092.68, 11.0),
(199, 'CAI', 'YYZ', 'Egypt', 'Canada', 'DN-CAIYYZ-298', '22:00', 1185.05, 1659.07, 2133.08, 11.2),
(200, 'CAI', 'BER', 'Egypt', 'Germany', 'DN-CAIBER-299', '23:30', 427.07, 597.90, 768.73, 4.2),
(201, 'CAI', 'IST', 'Egypt', 'Turkey', 'DN-CAIIST-300', '06:30', 228.27, 319.58, 410.89, 2.4),
(202, 'CAI', 'BKK', 'Egypt', 'Thailand', 'DN-CAIBKK-301', '08:15', 952.37, 1333.32, 1714.26, 9.1),
(203, 'CAI', 'KUL', 'Egypt', 'Malaysia', 'DN-CAIKUL-302', '10:00', 1034.63, 1448.49, 1862.34, 9.8),
(204, 'CAI', 'CMB', 'Egypt', 'Sri Lanka', 'DN-CAICMB-303', '12:45', 761.53, 1066.14, 1370.75, 7.3),
(205, 'CAI', 'DXB', 'Egypt', 'United Arab Emirates', 'DN-CAIDXB-304', '14:30', 370.87, 519.22, 667.57, 3.7),
(206, 'CAI', 'DPS', 'Egypt', 'Indonesia', 'DN-CAIDPS-305', '16:00', 1267.81, 1774.93, 2282.05, 12.0),
(207, 'CAI', 'TBS', 'Egypt', 'Georgia', 'DN-CAITBS-306', '18:20', 293.57, 410.99, 528.42, 3.0),
(208, 'CAI', 'KTM', 'Egypt', 'Nepal', 'DN-CAIKTM-307', '20:45', 706.85, 989.58, 1272.32, 6.8),
(209, 'CAI', 'MLE', 'Egypt', 'Maldives', 'DN-CAIMLE-308', '22:00', 714.12, 999.77, 1285.42, 6.9),
(210, 'CAI', 'HND', 'Egypt', 'Japan', 'DN-CAIHND-309', '23:30', 1227.58, 1718.61, 2209.65, 11.6),
(211, 'ISB', 'DXB', '', '', 'DN101', '09:30', 499.00, 1197.00, 2046.00, 3.0),
(212, 'ISB', 'LHR', '', '', 'DN102', '14:00', 499.00, 1197.00, 2046.00, 8.0),
(213, 'ISB', 'JFK', '', '', 'DN103', '22:15', 499.00, 1197.00, 2046.00, 14.0),
(214, 'CMB', 'ISB', '', '', 'DN802', '17:00', 370.00, 888.00, 1517.00, 4.0),
(215, 'JFK', 'LHR', '', '', 'DN201', '08:30', 299.00, 717.00, 1226.00, 7.0),
(216, 'JFK', 'IST', '', '', 'DN202', '12:45', 299.00, 717.00, 1226.00, 10.0),
(217, 'JFK', 'NRT', '', '', 'DN203', '21:00', 299.00, 717.00, 1226.00, 14.0),
(218, 'DXB', 'JFK', '', '', 'DN901', '07:30', 460.00, 1104.00, 1886.00, 14.0),
(219, 'YYZ', 'FRA', '', '', 'DN301', '10:00', 350.00, 840.00, 1435.00, 8.0),
(220, 'YYZ', 'DXB', '', '', 'DN302', '20:30', 350.00, 840.00, 1435.00, 13.0),
(221, 'BER', 'DXB', '', '', 'DN401', '11:15', 420.00, 1008.00, 1722.00, 6.0),
(222, 'BER', 'CMB', '', '', 'DN402', '19:45', 420.00, 1008.00, 1722.00, 10.0),
(223, 'TBS', 'BER', '', '', 'DN122', '17:30', 480.00, 1152.00, 1968.00, 4.0),
(224, 'IST', 'ISB', '', '', 'DN501', '08:30', 450.00, 1080.00, 1845.00, 4.0),
(225, 'IST', 'MLE', '', '', 'DN502', '16:00', 450.00, 1080.00, 1845.00, 7.0),
(226, 'IST', 'JFK', '', '', 'DN503', '23:30', 450.00, 1080.00, 1845.00, 11.0),
(227, 'TBS', 'IST', '', '', 'DN121', '10:15', 480.00, 1152.00, 1968.00, 2.0),
(228, 'BKK', 'KUL', '', '', 'DN601', '10:45', 390.00, 936.00, 1599.00, 2.0),
(229, 'BKK', 'HND', '', '', 'DN602', '18:30', 390.00, 936.00, 1599.00, 6.0),
(230, 'KUL', 'SIN', '', '', 'DN701', '09:00', 380.00, 912.00, 1558.00, 1.0),
(231, 'KUL', 'CMB', '', '', 'DN702', '15:45', 380.00, 912.00, 1558.00, 4.0),
(232, 'CMB', 'MLE', '', '', 'DN801', '08:30', 370.00, 888.00, 1517.00, 2.0),
(233, 'DXB', 'ISB', '', '', 'DN902', '13:45', 460.00, 1104.00, 1886.00, 3.0),
(234, 'DXB', 'MLE', '', '', 'DN903', '22:00', 460.00, 1104.00, 1886.00, 4.0),
(235, 'DPS', 'SIN', '', '', 'DN111', '09:30', 410.00, 984.00, 1681.00, 3.0),
(236, 'DPS', 'HND', '', '', 'DN112', '21:00', 410.00, 984.00, 1681.00, 7.0),
(237, 'KTM', 'DEL', '', '', 'DN131', '08:00', 440.00, 1056.00, 1804.00, 1.0),
(238, 'KTM', 'DXB', '', '', 'DN132', '16:30', 440.00, 1056.00, 1804.00, 5.0),
(239, 'MLE', 'CMB', '', '', 'DN141', '09:30', 590.00, 1416.00, 2419.00, 2.0),
(240, 'MLE', 'DXB', '', '', 'DN142', '18:00', 590.00, 1416.00, 2419.00, 4.0),
(241, 'HND', 'JFK', '', '', 'DN151', '11:30', 550.00, 1320.00, 2255.00, 13.0),
(242, 'HND', 'BKK', '', '', 'DN152', '19:00', 550.00, 1320.00, 2255.00, 6.0),
(243, 'CAI', 'IST', '', '', 'DN161', '10:30', 470.00, 1128.00, 1927.00, 3.0),
(244, 'CAI', 'DXB', '', '', 'DN162', '22:00', 470.00, 1128.00, 1927.00, 4.0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_from_to` (`from_code`,`to_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
