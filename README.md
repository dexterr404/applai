# 🤖 ApplAi — Job Application Tracker with AI-Powered Interview Prep
![License](https://img.shields.io/badge/license-MIT-blue) ![Node](https://img.shields.io/badge/node-v18+-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)

![ApplAi Banner](https://raw.githubusercontent.com/dexterr404/applai/main/client/src/assets/applai-logo.svg)

> **ApplAi** is an intelligent job application management and AI-powered interview preparation assistant.  
> Built with **TypeScript**, **React**, **Node.js**, **Express**, and **PostgreSQL**, it streamlines your job search with smart organization, AI-generated interview insights, and secure resume management.

**🌐 [Live Application](https://applai.dexterr404.dev)** | **📂 [GitHub Repository](https://github.com/dexterr404/applai)**

---

## 🚀 Overview

ApplAi transforms the job application process by combining intelligent tracking with AI-powered preparation tools. Whether you're managing dozens of applications or preparing for your dream role interview, ApplAi provides the insights and organization you need to succeed.

The platform leverages **OpenAI's GPT** to generate tailored interview questions, role-specific preparation tips, and professional insights — all personalized to each job application you're pursuing.

---

## ✨ Key Features

### 📋 Job Application Management
- **Complete CRUD Operations**: Create, read, update, and delete job applications
- **Comprehensive Tracking**: Monitor company name, position, location, salary (with currency), and application dates
- **Smart Filtering**: Search and filter through your applications effortlessly
- **Application Links**: Store and access job posting URLs directly from your dashboard
- **Status Tracking**: Keep tabs on every stage of your application journey

### 📄 Resume Management
- **Secure Cloud Storage**: Upload resumes as PDFs to Cloudinary
- **Organized Storage**: All resumes stored in dedicated `resume/` directory
- **Easy Access**: Download or preview resumes directly from job cards
- **One-Click Updates**: Replace resumes for specific applications seamlessly

### 🧠 AI-Powered Interview Preparation
- **Custom Interview Questions**: Generate role-specific interview questions based on job descriptions
- **Intelligent Preparation Tips**: Receive AI-tailored advice for each position
- **Smart Insights**: Get professional recommendations aligned with job requirements
- **Efficient Caching**: AI content cached per job to optimize performance and reduce API costs
- **Persistent Storage**: Save and revisit AI-generated insights anytime

### 🔐 Secure Authentication
- **Google OAuth2 Integration**: Seamless one-tap login with Google
- **JWT-Based Security**: Industry-standard token authentication
- **Secure Sessions**: Protected API endpoints with bearer token validation
- **Automatic Logout**: Session management with token expiration handling

### 💼 User Experience
- **Modern Interface**: Built with React, Tailwind CSS, and TypeScript
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: Efficient API calls managed with React Query (TanStack)
- **Intuitive Navigation**: Smooth routing with React Router DOM
- **Clean Design**: Professional UI that keeps you focused on your job search

---

## 🛠️ Tech Stack

**Frontend**
- ⚛️ **React** (Vite + TypeScript) - Fast, modern UI framework
- 💨 **Tailwind CSS** - Utility-first styling
- 🔄 **React Query (TanStack Query)** - Powerful data synchronization
- 🧭 **React Router DOM** - Client-side routing

**Backend**
- 🧩 **Node.js + Express** - Robust server framework
- 📘 **TypeScript** - Type-safe development
- 🐘 **PostgreSQL (Neon)** - Reliable, scalable database
- 🔐 **JWT + Google OAuth2** - Secure authentication
- 🤖 **OpenAI API** - AI-powered insights

**Infrastructure & Services**
- ☁️ **Vercel** - Frontend hosting
- 🚀 **Railway** - Backend deployment
- 🧠 **Neon** - Serverless PostgreSQL
- 📂 **Cloudinary** - Resume file storage

---

## 🔐 Authentication Flow

ApplAi implements a secure, streamlined authentication system:

1. **User Login**: Users authenticate via **Google One Tap / OAuth2**
2. **Token Exchange**: Frontend sends Google token → `POST /api/auth/google`
3. **Verification**: Backend verifies Google token and generates a **JWT**
4. **Storage**: JWT stored securely in `localStorage`
5. **Authorization**: Subsequent requests include token in header:
   ```
   Authorization: Bearer <token>
   ```
6. **Session Management**: 
   - Expired tokens receive `401 Unauthorized`
   - Frontend automatically clears token and redirects to `/login`

---

## 🗄️ Database Schema

ApplAi uses a clean, relational database structure:

```
users
├── id (PK)              # Primary key
├── email               # User email from Google
├── name                # User's full name
├── picture             # Profile picture URL
└── created_at          # Account creation timestamp

jobs
├── id (PK)              # Primary key
├── user_id (FK)         # Foreign key → users.id
├── company             # Company name
├── position            # Job title/role
├── applied_date        # Application submission date
├── location            # Job location
├── salary              # Offered/expected salary
├── currency            # Currency code (USD, EUR, etc.)
├── resume_url          # Cloudinary URL for resume
├── link                # Original job posting URL
└── created_at          # Record creation timestamp

job_ai_insights
├── id (PK)              # Primary key
├── job_id (FK)          # Foreign key → jobs.id
├── content             # AI-generated insights (JSON)
└── created_at          # Generation timestamp
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **PostgreSQL** database (or Neon account)
- **npm** or **yarn**

You'll also need accounts/API keys for:
- Google Cloud Console (OAuth2 credentials)
- OpenAI API
- Cloudinary
- Neon Database (or local PostgreSQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dexterr404/applai.git
   cd applai
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**

   **Server `.env`** (in `server/` folder):
   ```properties
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   DATABASE_URL=your_postgres_connection_url

   # Authentication
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Cloudinary (Resume Storage)
   CLOUDINARY_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret

   # App URLs
   APP_BASE_URL=http://localhost:5173
   API_BASE_URL=http://localhost:5000
   ```

   **Client `.env`** (in `client/` folder):
   ```properties
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Set up the database**
   ```bash
   # Run migrations (if using migration tool)
   cd server
   npm run migrate

   # Or manually create tables using the schema above
   ```

5. **Run the application**

   Open two terminal windows:

   **Terminal 1 - Start the server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the client:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 🧾 API Endpoints

### Authentication
| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/google` | POST | Authenticate via Google OAuth2 | No |
| `/api/auth/me` | GET | Get current user profile | Yes |

### Job Management
| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/jobs/all` | GET | List all user's job applications | Yes |
| `/api/jobs/add-job` | POST | Create new job application | Yes |
| `/api/jobs/update-job` | PUT | Update existing job | Yes |
| `/api/jobs/:jobId` | DELETE | Delete job application | Yes |

### AI Features
| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/ai/job-prep-interview` | POST | Generate AI interview preparation | Yes |

### Resume Management
| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/resume/upload-resume` | POST | Upload resume to Cloudinary | Yes |
| `/api/resume/remove-resume` | POST | Remove resume from storage | Yes |

---

## 🤖 AI Integration

ApplAi leverages OpenAI's powerful language models to provide:

### Interview Preparation
- **Role-Specific Questions**: Generate questions tailored to the job title and description
- **Company Research**: Insights based on company information
- **Custom Scenarios**: Behavioral and technical questions relevant to the position

### Smart Insights
- **Job Description Analysis**: Extract key requirements and skills
- **Career Advice**: Professional tips for succeeding in specific roles
- **Application Strategy**: Recommendations for standing out

### Performance Optimization
- **Smart Caching**: AI responses cached per job to minimize API calls
- **Token Management**: Efficient prompt engineering to reduce costs
- **Async Processing**: Non-blocking AI generation for better UX

---

## 🏗️ Architecture

```
TypeScript + React + PostgreSQL Stack
│
├── Frontend: React + Vite + TypeScript + Tailwind CSS
│   ├── Components: Job Cards, Forms, Modals
│   ├── Pages: Dashboard, Login, Job Details
│   ├── State Management: React Query
│   └── Routing: React Router DOM
│
├── Backend: Node.js + Express + TypeScript
│   ├── Authentication: JWT + Google OAuth2
│   ├── Database: PostgreSQL (Neon)
│   ├── File Storage: Cloudinary
│   └── AI Integration: OpenAI API
│
├── Security
│   ├── JWT token validation
│   ├── Protected API routes
│   └── Secure file uploads
│
└── External Services
    ├── Google OAuth2 (Authentication)
    ├── OpenAI (AI Insights)
    ├── Cloudinary (Resume Storage)
    └── Neon (PostgreSQL Hosting)
```

---

## 🗺️ Roadmap

- [ ] **Refresh Token Support** - Automatic re-authentication without logout
- [ ] **Email Notifications** - Application deadline reminders and updates
- [ ] **Advanced Analytics** - Job search metrics and insights dashboard
- [ ] **Resume Parsing** - Auto-extract information from uploaded resumes
- [ ] **Keyword Matching** - Score resumes against job descriptions
- [ ] **Application Status Tracking** - Track interview stages and follow-ups
- [ ] **Multi-Resume Support** - Store multiple resume versions per user
- [ ] **Team Features** - Share applications with mentors or career coaches
- [ ] **Calendar Integration** - Sync interview dates with Google Calendar
- [ ] **Cover Letter Generator** - AI-powered cover letter creation

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'feat: add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing TypeScript code style
- Write meaningful commit messages (conventional commits preferred)
- Include relevant tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 🧾 License

This project is licensed under the [MIT License](https://github.com/dexterr404/applai/blob/main/LICENSE).

---

## 🌐 Connect With Me

👨‍💻 **Dexter Ian Javier**

🐙 [GitHub](https://github.com/dexterr404)  
💼 [LinkedIn](https://www.linkedin.com/in/dexter-ian-javier-09397637b/)  
📧 [Email Me](mailto:dexterr404.dev@gmail.com)

---

> _"ApplAi — Track smarter, land faster."_

⭐ **If you find this project useful, please consider giving it a star!**
