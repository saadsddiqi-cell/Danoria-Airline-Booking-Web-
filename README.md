# Danoria Airline Booking (Web)

A web-based airline booking platform with an interactive **3D globe**, country destination pages, a **PHP + MySQL** backend, and **e-mailed tickets** via PHPMailer.

## Features

- Interactive globe landing page (`globe.js`) for exploring destinations
- Destination pages for 17 countries: Canada, Egypt, Georgia, Germany, Indonesia, Japan, Malaysia, Maldives, Nepal, Pakistan, Sri Lanka, Thailand, Turkey, UAE, USA (plus a generic `country.html` template)
- User authentication (register / login)
- Flight price and route lookup by origin, destination and cabin class
- Booking flow with passenger details
- Ticket confirmation sent by e-mail (PHPMailer)
- SQL dumps for all tables

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | PHP (PDO) |
| Database | MySQL / MariaDB |
| Email | PHPMailer |
| Local server | XAMPP (Apache + MySQL) recommended |

## Project Structure

```
danoria/
├── index.html, booking.html, country.html, <country>.html
├── style.css, app.js, globe.js
├── api_auth.php          # Register / login
├── api_flights.php       # Flight price & route lookup
├── api_bookings.php      # Create and fetch bookings
├── send_ticket_email.php # Ticket e-mail via PHPMailer
├── db_connect.php        # PDO connection (creates DB if missing)
├── test_db.php           # Connection test
└── phpmailer/            # PHPMailer library
ALL_SQL_DATABASE/
├── users.sql
├── flights.sql
├── passengers.sql
└── bookings.sql
```

## Getting Started

1. Install [XAMPP](https://www.apachefriends.org/) and start **Apache** and **MySQL**.
2. Clone into the web root:
   ```bash
   cd C:\xampp\htdocs
   git clone https://github.com/saadsddiqi-cell/Danoria-Airline-Booking-Web-.git
   ```
3. Create a database named `danoria` in phpMyAdmin and import the files from `ALL_SQL_DATABASE/` (`users.sql`, `flights.sql`, `passengers.sql`, `bookings.sql`).
4. Check the credentials in `danoria/db_connect.php` (defaults: host `localhost`, user `root`, empty password, database `danoria`).
5. Configure SMTP settings in `send_ticket_email.php` (use an app password, never your real password).
6. Open `http://localhost/Danoria-Airline-Booking-Web-/danoria/index.html`.
7. Visit `danoria/test_db.php` to confirm the database connection works.

## API Overview

| Endpoint | Purpose |
|----------|---------|
| `api_auth.php` | User registration and login |
| `api_flights.php?action=get_price&from=XXX&to=YYY&class=economy` | Fare and route lookup |
| `api_bookings.php` | Booking creation and retrieval |
| `send_ticket_email.php` | Sends booking confirmation |

## Security Notes

- Do not commit real SMTP credentials; load them from environment variables or an untracked config file
- Confirm passwords are stored with `password_hash()`
- Use prepared statements for all queries and enable HTTPS in production

## Future Work

- Seat selection and payment integration
- Admin dashboard for flights
- Responsive and accessibility improvements

## Contributors

This project was developed collaboratively by:

- [Muhammad Saad Siddiqui](https://github.com/saadsddiqi-cell)
- [Syed Muhammad Zain Hassan](https://github.com/zainhassan5763-git/)
- [Muhammad Arqam](https://github.com/)
- [Shaheer Shahab](https://github.com/)
  
Developed as part of academic project work
at Sir Syed University of Engineering & Technology.
