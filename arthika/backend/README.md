# Arthika Backend API

A complete Node.js + Express backend for **Arthika**, a financial guidance web platform. This backend provides AI-powered financial advice, speech processing, and user management capabilities.

## 🚀 Features

- **AI Financial Queries**: GPT-4 powered financial advice with story-based responses
- **Speech Processing**: Speech-to-text and text-to-speech capabilities
- **User Roadmaps**: Personalized financial journey tracking
- **Trust Scoring**: User engagement and reliability scoring
- **Government Schemes**: Information about legal rights and entitlements
- **Feedback System**: User feedback collection and analytics
- **Multi-language Support**: Hindi, English, and other Indian languages

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── firebase.js          # Firebase configuration
│   ├── controllers/
│   │   ├── queryController.js    # Financial query handling
│   │   ├── speechController.js   # Speech processing
│   │   ├── roadmapController.js  # User roadmap management
│   │   ├── trustScoreController.js # Trust score operations
│   │   ├── legalController.js    # Government schemes & rights
│   │   └── feedbackController.js # User feedback handling
│   ├── middlewares/
│   │   └── errorHandler.js      # Error handling middleware
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   ├── queryRoutes.js       # Query endpoints
│   │   ├── speechRoutes.js      # Speech endpoints
│   │   ├── roadmapRoutes.js     # Roadmap endpoints
│   │   ├── trustScoreRoutes.js  # Trust score endpoints
│   │   ├── legalRoutes.js       # Legal info endpoints
│   │   └── feedbackRoutes.js    # Feedback endpoints
│   ├── services/
│   │   ├── openaiService.js     # OpenAI GPT-4 integration
│   │   ├── databaseService.js   # Database operations
│   │   └── speechService.js     # Speech processing service
│   ├── app.js                   # Express app configuration
│   └── index.js                 # Server entry point
├── package.json
├── env.example                  # Environment variables template
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Firebase Configuration (optional for development)
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_client_email@your_project.iam.gserviceaccount.com
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_client_email%40your_project.iam.gserviceaccount.com
   
   # CORS Origins
   FRONTEND_URL=http://localhost:5173
   PRODUCTION_URL=https://arthika.vercel.app
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Financial Queries
- `POST /api/query` - Submit financial query
- `GET /api/query/history/:userId` - Get query history

### Speech Processing
- `POST /api/speech-to-text` - Convert speech to text
- `POST /api/text-to-speech` - Convert text to speech
- `GET /api/speech-to-text/languages` - Get supported languages

### User Roadmap
- `GET /api/user/:userId/roadmap` - Get user roadmap
- `POST /api/user/:userId/roadmap` - Save user roadmap
- `PUT /api/user/:userId/roadmap` - Update roadmap progress
- `POST /api/user/:userId/roadmap/recommendations` - Generate recommendations

### Trust Score
- `GET /api/score/:userId` - Get trust score
- `PUT /api/score/:userId` - Update trust score
- `POST /api/score/:userId/recalculate` - Recalculate trust score

### Legal Information
- `GET /api/legal/schemes` - Get government schemes
- `GET /api/legal/rights` - Get legal rights
- `GET /api/legal/all` - Get all legal information

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/analytics` - Get feedback analytics
- `GET /api/feedback/user/:userId` - Get user feedback

## 🔧 Configuration

### Development Mode
The backend runs in development mode by default with:
- Mock database (no Firebase required)
- Simulated speech processing
- Detailed error logging
- CORS enabled for localhost

### Production Mode
For production deployment:
1. Set `NODE_ENV=production`
2. Configure Firebase credentials
3. Set up OpenAI API key
4. Configure proper CORS origins

## 🧪 Testing

### Using Postman or curl

**Test Financial Query:**
```bash
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What if I take a gold loan?",
    "language": "en",
    "userId": "user123"
  }'
```

**Test Speech-to-Text:**
```bash
curl -X POST http://localhost:5000/api/speech-to-text \
  -F "audio=@audio-file.wav" \
  -F "language=en"
```

**Test Trust Score:**
```bash
curl -X GET http://localhost:5000/api/score/user123
```

## 🔐 Security Features

- Input validation and sanitization
- CORS configuration for frontend domains
- Error handling without exposing sensitive information
- Rate limiting (can be added with express-rate-limit)
- Environment variable protection

## 📊 Database Schema

### Users Collection
```javascript
{
  id: "user123",
  createdAt: "2024-01-01T00:00:00.000Z",
  trustScore: 75,
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### Queries Collection
```javascript
{
  id: "query-uuid",
  userId: "user123",
  question: "What if I take a gold loan?",
  language: "en",
  response: { /* AI response object */ },
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

### Roadmaps Collection
```javascript
{
  userId: "user123",
  financialGoals: [],
  currentStatus: { savings: 0, investments: 0, loans: 0 },
  recommendations: [],
  progress: { completed: 0, total: 0 },
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Configure Firebase Admin SDK
- Set OpenAI API key
- Configure CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the API documentation at `http://localhost:5000/api`
- Review the error logs in the console
- Ensure all environment variables are properly set 