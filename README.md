# 🚀 Express + Prisma Starter Project

A simple and scalable backend project using **Express**, **Prisma ORM**, and **PostgreSQL** (or your database of choice).

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **MySQL** 

---

## ⚙️ Getting Started

### 1. Clone the project
```bash
git clone https://github.com/elephz/server.git
cd server
 ```

### 2. Configure environment variables
```bash
Create a .env file based on .env.example
 ```

### 3. Initialize Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
 ```

### 4.  Start the server
```bash
npm start
 ```