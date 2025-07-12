# Arthika - AI Financial Advisor Frontend

A voice-enabled financial advisory application built with React, featuring speech-to-text, AI analysis, and multilingual support.

## 🏗️ Component Structure

### Core Components
- **`Header.jsx`** - App header with language toggle
- **`VoiceInput.jsx`** - Microphone input with speech recognition
- **`FeatureCards.jsx`** - Feature showcase cards
- **`AIResponse.jsx`** - AI analysis display with text-to-speech
- **`TrustScore.jsx`** - Financial trust score with charts
- **`FinancialRoadmap.jsx`** - Investment growth visualization
- **`ActionButtons.jsx`** - Share and export buttons

### Hooks
- **`useSpeechRecognition.js`** - Custom hook for Web Speech API

### Services
- **`financialAI.js`** - AI response logic and data generation

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 🎯 Key Features

### Voice Input
- Click microphone button to start speaking
- Supports Hindi and English
- Real-time speech recognition

### AI Analysis
- Personalized financial advice
- Gold loan, home loan, and investment guidance
- Multilingual responses

### Visualizations
- Financial roadmap charts
- Trust score breakdown
- Investment growth tracking

### Export & Share
- Download financial plans
- Share analysis results
- Community access features

## 🛠️ Development

### Adding New Components
1. Create component in `src/components/`
2. Import in `App.jsx`
3. Pass required props

### Modifying AI Responses
Edit `src/services/financialAI.js` to add new response types.

### Styling
- Uses Tailwind CSS
- Custom classes in `src/index.css`
- Responsive design

## 📱 Features for Hackathon Demo

✅ **Voice-to-Text Input** - Web Speech API  
✅ **GPT-4 Financial Simulation** - AI responses  
✅ **Text-to-Speech Output** - Speech synthesis  
✅ **Financial Roadmap Generator** - Chart.js  
✅ **PWA Web App UI** - React + Tailwind  
✅ **Trust Score + Nudges** - Visual metrics  
✅ **Multilingual Toggle** - Hindi/English  
✅ **Export & Share** - Download functionality  

## 🎨 UI Components

- **Microphone Button** - Animated recording state
- **Language Toggle** - Hindi/English switch
- **Financial Charts** - Line and doughnut charts
- **Action Buttons** - Share and export options
- **Responsive Cards** - Feature and analysis cards

## 🔧 Easy Customization

Each component is self-contained and can be easily modified:
- **VoiceInput** - Change microphone behavior
- **AIResponse** - Modify response display
- **TrustScore** - Update scoring logic
- **FinancialRoadmap** - Adjust chart data
- **Header** - Update branding and navigation

The modular structure makes it easy to work on individual features without affecting others! 