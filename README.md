# Arthika - AI-Powered Financial Guidance Platform

## Overview

Arthika is your intelligent financial companion that understands your money questions and guides you toward better financial decisions. Whether you're planning to invest, save, or need help with debt, Arthika provides personalized advice in simple language.

**Live Demo:** [https://arthika.onrender.com](https://arthika.onrender.com)

> **Note:** Since we're using Render's free hosting, the site might take a few moments to load. If you see "not found," try refreshing the page or opening it in an incognito/private browser window.

## What Arthika Does

### Your Financial Questions, Answered
- Ask anything about money - investments, loans, savings, or financial planning
- Get personalized advice based on your situation
- Receive step-by-step roadmaps to reach your financial goals
- Access government schemes and opportunities you might be missing

### Smart Features That Make Life Easier
- **Voice Commands** - Just speak your financial questions
- **Multiple Languages** - Get advice in your preferred language
- **Smart Alerts** - Get warnings about risky financial decisions
- **Query History** - Track all your past questions and advice
- **Export Reports** - Download your financial plans as PDF

## Current Features

### Core Functionality
✅ **AI-Powered Financial Advice** - Ask questions in natural language
✅ **Personalized Roadmaps** - Step-by-step financial planning
✅ **Voice Interaction** - Speak your questions, hear the answers
✅ **Multilingual Support** - Available in multiple Indian languages
✅ **Query History** - Keep track of all your financial conversations
✅ **Government Schemes** - Access to relevant financial opportunities
✅ **Responsive Design** - Works perfectly on phone, tablet, and computer
✅ **Smart Sidebar** - Easy navigation with collapsible menu
✅ **Feedback System** - Share your experience and suggestions
✅ **Export Capabilities** - Download your financial reports

### User Experience
✅ **Real-time Processing** - See live updates while getting advice
✅ **Interactive Interface** - Beautiful, modern design that's easy to use
✅ **Smart Notifications** - Get alerts for important financial decisions
✅ **Mobile-Friendly** - Optimized for all screen sizes
✅ **Fast Loading** - Quick responses to your queries

## Upcoming Features (Coming Soon!)

### Enhanced AI Capabilities
🚀 **Follow-up Questions** - AI will ask clarifying questions for better advice
🚀 **Context Awareness** - Remember your previous conversations
🚀 **Risk Assessment** - Automatic evaluation of financial risks
🚀 **Exit Planning** - Special guidance when you mention debt or financial danger

### Communication Channels
🚀 **WhatsApp Integration** - Get financial advice directly on WhatsApp
🚀 **IVR System** - Call a number and get voice-based financial guidance
🚀 **SMS Alerts** - Receive important financial reminders via text
🚀 **Email Notifications** - Get detailed reports and updates via email

### Advanced Features
🚀 **Trust Score System** - Build your financial credibility score
🚀 **Visual Roadmaps** - Interactive charts and graphs for your financial journey
�� **NGO Partnerships** - Connect with financial literacy organizations
🚀 **Updated Government Schemes** - Real-time access to latest schemes
�� **Financial Health Dashboard** - Track your overall financial wellness
🚀 **Goal Tracking** - Set financial goals and track your progress
🚀 **Portfolio Management** - Monitor your investments in one place

### Smart Alerts & Safety
�� **Danger Detection** - Automatic warnings for risky financial decisions
🚀 **Debt Alerts** - Get help when you're heading toward debt
🚀 **Investment Warnings** - Alerts for potentially risky investments
🚀 **Emergency Fund Reminders** - Stay prepared for financial emergencies

## Tech Stack

### Frontend (What Users See)
- **React 18** - Modern, fast user interface
- **Tailwind CSS** - Beautiful, responsive design
- **Vite** - Lightning-fast loading times
- **Chart.js** - Interactive charts and graphs
- **Firebase** - Secure user data and authentication
- **Voice Recognition** - Speak to get financial advice

### Backend (Behind the Scenes)
- **Node.js & Express** - Powerful server that handles your requests
- **OpenAI GPT-3.5** - Intelligent AI that understands your questions
- **Firebase Firestore** - Secure database for your financial data
- **CORS & Security** - Keep your data safe and secure

## How to Set Up Arthika

### What You Need
- Node.js (version 16 or newer)
- npm (comes with Node.js)
- Firebase account (free)
- OpenAI API key (for AI features)

### Step-by-Step Installation

1. **Get the Code**
   ```bash
   git clone <repository-url>
   cd arthika
   ```

2. **Set Up Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set Up Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   Create a file called `.env` in the backend folder:
   ```
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key_here
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   ```

   Create another `.env` file in the frontend folder:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

5. **Start the Application**

   **Start Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Start Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open Arthika**
   - Go to: http://localhost:5173
   - Start asking your financial questions!

## How to Use Arthika

### Getting Started
1. **Ask a Question** - Type or speak your financial question
2. **Get Advice** - Receive personalized financial guidance
3. **Follow the Roadmap** - Get step-by-step instructions
4. **Track Progress** - Monitor your financial journey
5. **Export Reports** - Download your financial plans

### Example Questions You Can Ask
- "How should I invest ₹50,000?"
- "What's the best way to save for my child's education?"
- "Should I take a personal loan for home renovation?"
- "How can I build an emergency fund?"
- "What government schemes are available for small businesses?"

### Voice Commands
- Click the microphone button
- Speak your financial question clearly
- Listen to the AI's response
- Ask follow-up questions if needed

## Project Structure
arthika/
├── backend/ # Server-side code
│ ├── src/
│ │ ├── controllers/ # Handles your requests
│ │ ├── services/ # AI and database logic
│ │ ├── routes/ # API endpoints
│ │ └── middlewares/ # Security and validation
│ └── package.json
├── frontend/ # User interface
│ ├── src/
│ │ ├── components/ # Reusable UI parts
│ │ ├── pages/ # Different screens
│ │ ├── hooks/ # Custom functionality
│ │ ├── services/ # API connections
│ │ └── contexts/ # Data sharing
│ └── package.json
└── README.md


## API Endpoints

### For Users
- `POST /api/query` - Ask a financial question
- `GET /api/queries/:email` - See your question history
- `POST /api/feedback` - Share your experience

### For Developers
- `GET /api/status` - Check if the system is working
- `GET /api/queries` - View all questions (admin only)

## Important Notes

### About the Live Demo
- **Website:** [arthika.onrender.com](https://arthika.onrender.com)
- **Loading Time:** May take 30-60 seconds to start (free hosting)
- **If Page Doesn't Load:** Try refreshing or use incognito mode
- **Best Experience:** Use Chrome, Firefox, or Safari

### Security & Privacy
- Your financial data is encrypted and secure
- We don't store sensitive banking information
- All communications are protected
- You can delete your data anytime

### Browser Compatibility
- **Recommended:** Chrome, Firefox, Safari, Edge
- **Voice Features:** Work best in Chrome and Edge
- **Mobile:** Optimized for all smartphones

## Future Roadmap

### Phase 1 (Next 3 Months)
- [ ] WhatsApp bot integration
- [ ] IVR system for phone calls
- [ ] Trust score calculation
- [ ] Visual roadmap charts

### Phase 2 (Next 6 Months)
- [ ] NGO partnership platform
- [ ] Real-time government scheme updates
- [ ] Advanced risk assessment
- [ ] Portfolio tracking

### Phase 3 (Next 12 Months)
- [ ] Mobile app development
- [ ] Banking API integration
- [ ] Advanced analytics dashboard
- [ ] Community features

## Support & Help

### Getting Help
- **Email:** support@arthika.com
- **Documentation:** [Link to detailed docs]
- **Issues:** Report bugs on GitHub
- **Feedback:** Use the feedback form in the app

### Common Issues
- **Site not loading:** Wait 30-60 seconds, then refresh
- **Voice not working:** Check microphone permissions
- **Slow responses:** Check your internet connection
- **Login issues:** Clear browser cache and try again

## Contributing

Want to help make Arthika better?

1. **Fork the project** - Make your own copy
2. **Create a branch** - Work on a new feature
3. **Make changes** - Add your improvements
4. **Test everything** - Make sure it works
5. **Submit a pull request** - Share your work

## License

This project uses the ISC License - you're free to use and modify it.

## About the Team

Arthika is built by a team passionate about making financial advice accessible to everyone. We believe everyone deserves personalized financial guidance, regardless of their background or experience.

---

**Arthika** - Stories That Think. Advice That Fits.

*Your journey to financial wisdom starts here.*
