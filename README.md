# 📝 Blogging Website

A full-stack blogging platform where users can create, read, and manage blog posts. Admins have special access to manage user-generated content, while users enjoy a clean and easy writing experience.

## 🚀 Features

- ✍️ Create, update, and delete blog posts
- 👤 User authentication (Login/Register)
- 🧑‍💼 Admin dashboard for managing users and posts

## 🛠️ Tech Stack

### Frontend:
- React.js  
### Backend:
- Spring Boot (Java)  
- RESTful APIs
### Database:
- MySQL
### Authentication:
- JWT (JSON Web Token) based authentication  
- Role-based access (User / Admin)

---
## 📁 Folder Structure
blogging-website/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── entities/
│   │   └── config/
│   └── application.properties
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
└── README.md

## ⚙️ Getting Started

### 🧾 Prerequisites

- Node.js and npm  
- Java 17 or above  
- Maven    
- MySQL Workbench (optional)

---

### 🖥️ Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/student-shrestarai/Blogging__Website.git
   cd Quiz-Master/backend
   ```

2.Create a MySQL Database
CREATE DATABASE quizdb;

3.Configure your application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/quizdb
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

⚠️ Note: Replace your-username and your-password with your actual MySQL credentials. Do not commit real passwords to GitHub.

4.Run the Backend
mvn spring-boot:run


### 🌐 Frontend Setup
1.Open a new terminal and go to the frontend folder:
cd ../frontend
2.Install dependencies:
npm install
3.Start the development server:
npm start


🌟 Future Enhancements
📈 Blog Analytics
Track views, likes, and comments for each post.
❤️ Like & Bookmark Feature
Users can like or bookmark blogs for future reading.
🌐 Social Sharing
Share blog posts to platforms like Twitter, LinkedIn, Instagram, etc.


🙋‍♀️ Author
Shresta Rai
MCA Student | Full Stack Developer
GitHub: student-shrestarai

