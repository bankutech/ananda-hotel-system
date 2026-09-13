# ananda hotel system

## Overview
<div align="center">
  <img src="https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=1200&auto=format&fit=crop" alt="Ananda Hotel Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />

  # Ananda Hotel Management System

  *Where heritage meets modern hospitality. A premium, full-stack solution for boutique hotels and luxury resorts.*

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot" alt="Spring Boot" />
    <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white" alt="Java 17" />
  </p>
</div>

---

## The Ananda Experience (Features)

Ananda isn't just software; it's a digital concierge. Designed with a stunning **Midnight & Brass** visual identity, it brings the following capabilities to your fingertips:

- **Executive Dashboard**: A bird's-eye view of your property. Real-time occupancy gauges, RevPAR (Revenue Per Available Room) hero metrics, and beautiful financial charts.
- **Room Directory**: Manage your inventory with grace. View high-quality imagery of your Singles, Doubles, Deluxes, and Suites.
- **Guest Relations**: A secure vault for your VIPs. Track loyalty points, contact information, and stay history.
- **Reservation Engine**: Seamlessly book dates and assign rooms without double-booking friction.
- **Housekeeping & Maintenance**: Ensure the physical perfection of your property by tracking cleaning statuses and maintenance requests.
- **Fort Knox Security**: All data modifications are strictly protected behind a robust JWT (JSON Web Token) authorization wall.

---

## The Architecture

Ananda operates on a split-stack architecture, ensuring snappy user interfaces and rock-solid data integrity.

### Frontend (React/Vite)
- A highly responsive, modern SPA using `React` and `Vite`.
- **Lucide Icons** and **Recharts** power the sleek visual analytics.
- **Glassmorphism** and a custom color palette defined in vanilla CSS.

### Backend (Spring Boot/Java)
- **Spring Data JPA**: Translates Java models into our embedded **H2 Database** tables (`hoteldb.mv.db`).
- **Spring Security & JJWT**: Stateless authentication ensuring only authorized staff can modify the hotel's data.
- **Validation**: Strict `@Valid` constraints stop bad requests (like negative pricing or invalid dates) from ever touching the database.

---

## The API Cartography (Backend)

All endpoints prefixed with `/api` are the lifeblood of the frontend UI. 
> **Security Notice:** While read-operations (`GET`) are public for dashboard rendering, all mutative operations (`POST`, `PUT`, `DELETE`) require a valid JWT token passed in the `Authorization: Bearer <token>` header.

- `POST /api/auth/login` - Exchange credentials for a signed JWT token.
- `GET /api/rooms` - Fetch the complete room directory.
- `GET /api/rooms/paged` - Fetch a slice of the directory (infinite scroll ready).
- `POST /api/rooms` - **[Protected]** Commission a new room.
*(Identical architectural patterns exist for `/api/guests`, `/api/bookings`, and `/api/staff`)*

---

## Awakening the System

To bring Ananda online locally, you'll need two terminal windows to awaken both the backend and frontend spirits.

### Prerequisites
- Node.js (v18+)
- Java 17 (JDK) & Maven

### Step 1: Ignite the Backend API
The backend handles our H2 database and JWT security.
```bash
cd backend
mvn spring-boot:run
```
*(The server breathes to life on `http://localhost:8080`)*

### Step 2: Render the Frontend UI
Open a fresh terminal in the project root.
```bash
npm install     # First time only
npm run dev
```
*(The dashboard materializes at `http://localhost:5173`)*

### The Master Keys (Login)
To bypass the security perimeter locally, use the master credentials:
- **Username:** `admin`
- **Password:** `admin123`

---

<div align="center">
  <i>Crafted with care for the hospitality industry.</i>
</div>

## Getting Started
Please refer to the source files for specific installation and usage instructions. Ensure that your local environment meets the standard requirements for the associated technologies.

## Project Structure
This project is organized into standard directories. Key configuration files and primary source code are located in the root directory.
