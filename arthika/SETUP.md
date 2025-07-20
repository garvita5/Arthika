# Arthika Setup Guide

A comprehensive guide to set up and run the Arthika AI-powered financial guidance platform.

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Firebase Account** (for Firestore database)
- **OpenAI API Key** (for GPT-3.5 integration)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd arthika
```

### 2. Environment Setup

#### Backend Environment Variables

Create `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Fill in the following variables in `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email@your_project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_client_email%40your_project.iam.gserviceaccount.com

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:5173
PRODUCTION_URL=https://arthika.onrender.com
```

#### Frontend Environment Variables

Create `.env` file in the `frontend/` directory:

```bash
cd ../frontend
cp .env.example .env
```

Fill in the following variables in `frontend/.env`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000

# Firebase Configuration (if needed for frontend)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Install Dependencies

#### Backend Dependencies

```bash
cd backend
npm install
```

#### Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Firebase Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

2. **Generate Service Account Key**:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Use the values from this JSON in your backend `.env` file

3. **Firestore Rules** (optional for development):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // For development only
       }
     }
   }
   ```

### 5. OpenAI API Setup

1. **Get API Key**:
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Create an account or sign in
   - Go to API Keys section
   - Create a new API key
   - Add it to your backend `.env` file

2. **Verify API Key**:
   - Test the key with a simple API call
   - Ensure you have sufficient credits for GPT-3.5-turbo

## 🏃‍♂️ Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Production Server

```bash
cd backend
npm start
```

## 🧪 Testing the Setup

### 1. Backend Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Frontend Access

Open `http://localhost:5173` in your browser and verify:
- Homepage loads correctly
- Voice input works (requires HTTPS in production)
- Text input works
- Navigation between pages works

### 3. API Integration Test

Test a sample query:

```bash
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How to start investing?",
    "userEmail": "test@example.com"
  }'
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

#### 2. Firebase Connection Issues

**Error**: `Firebase App named '[DEFAULT]' already exists`

**Solution**: Ensure Firebase is initialized only once in your application.

#### 3. CORS Issues

**Error**: `Access to fetch at 'http://localhost:5000/api/query' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution**: Check that your backend CORS configuration includes the frontend URL.

#### 4. OpenAI API Errors

**Error**: `OpenAI API error: 401 Unauthorized`

**Solution**: Verify your OpenAI API key is correct and has sufficient credits.

#### 5. Environment Variables Not Loading

**Error**: `process.env.OPENAI_API_KEY is undefined`

**Solution**: Ensure your `.env` file is in the correct directory and properly formatted.

## 📁 Project Structure

```
arthika/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── middlewares/     # Express middlewares
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── app.js           # Express app setup
│   │   └── index.js         # Server entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── contexts/        # React contexts
│   │   ├── config/          # Configuration files
│   │   └── main.jsx         # App entry point
│   ├── public/              # Static assets
│   ├── package.json
│   └── .env
└── README.md
```

## 🚀 Deployment

### Backend Deployment (Render)

1. **Connect Repository**:
   - Sign up at [Render](https://render.com/)
   - Connect your GitHub repository

2. **Configure Service**:
   - Service Type: Web Service
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Add all backend `.env` variables

### Frontend Deployment (Vercel/Netlify)

1. **Vercel**:
   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```

2. **Netlify**:
   - Connect repository
   - Build Command: `cd frontend && npm run build`
   - Publish Directory: `frontend/dist`

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **API Keys**: Use environment variables for all sensitive data
3. **CORS**: Configure CORS properly for production
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Input Validation**: Validate all user inputs
6. **HTTPS**: Use HTTPS in production for Web Speech API

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section above
- Review the logs for error messages

---

**Happy Coding! 🚀** 