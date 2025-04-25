# Expense Tracker Application

A full-stack web application for tracking personal expenses with user authentication and real-time updates.

## Features

- 🔐 User Authentication (Register/Login)
- 💰 Add and track expenses
- 🗑️ Delete expenses
- 📊 View expense summary
- 💵 Real-time total expense calculation
- 📱 Responsive design for all devices
- 🔒 Secure API endpoints
- 🎨 Modern and clean UI

## Tech Stack

### Frontend
- HTML5
- CSS3 (with responsive design)
- JavaScript (ES6+)
- Font Awesome icons

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication

## Prerequisites

Before running this application, make sure you have installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=1d
```

4. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/logout` - Logout user

### Expenses
- `GET /api/v1/expenses` - Get all expenses for the logged-in user
- `POST /api/v1/expenses` - Add a new expense
- `DELETE /api/v1/expenses/:id` - Delete an expense

## Project Structure

```
expense-tracker/
├── public/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── main.css
│   ├── normalize.css
│   ├── index.js
│   ├── login.js
│   └── signup.js
├── routes/
│   ├── expenses.js
│   └── authRoutes.js
├── controller/
│   ├── expense.js
│   └── authController.js
├── models/
│   ├── expenseModel.js
│   └── User.js
├── middleware/
│   └── authenticateUser.js
├── utils/
│   ├── jwt.js
│   └── createTokenUser.js
├── app.js
├── package.json
└── README.md
```

## Features in Detail

### User Authentication
- Secure registration and login system
- JWT-based authentication
- Protected routes
- Automatic token refresh

### Expense Management
- Add new expenses with description, category, and amount
- Delete existing expenses
- View all expenses in a table format
- Real-time total expense calculation
- Category-based expense organization

### User Interface
- Clean and modern design
- Responsive layout for all devices
- Intuitive navigation
- Real-time feedback for user actions
- Loading states and error handling

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected API endpoints
- Input validation and sanitization
- Secure cookie handling
- CORS protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for the icons
- MongoDB for the database
- Express.js for the backend framework
- Node.js for the runtime environment

## Contact

Your Name - kustagipavan30@gmail.com
Project Link: https://github.com/yourusername/expense-tracker

---

## 🚀 Features

- 📊 **Track Expenses**: Log daily transactions with category, amount, and notes.
- ☁️ **Cloud Storage**: Securely stores your data in the cloud for seamless accessibility.
- 📈 **Real-Time Sync**: Keep your expenses updated across all your devices in real time.
- 🔒 **Safe & Secure**: Data encryption and user authentication for peace of mind.
- 📅 **View History**: Check past expenses, filter by date, category, or amount.
- 🌐 **Cross-Platform Ready**: Access your tracker from desktop, tablet, or mobile.

---

## 🛠️ Tech Stack

- **Frontend**: [HTML,CSS,JS]
- **Backend**: [Node.js / Express]
- **Database**: [MongoDB]
- **Cloud Hosting**: [Render]



## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/pavan-ak1/expense-tracker.git
  
