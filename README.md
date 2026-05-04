# Teams Chatbot Microfrontend

A premium ReactJS microfrontend chatbot inspired by the Microsoft Teams user interface. This application connects directly to the DigitalOcean AI Agent platform to provide a powerful, context-aware conversational experience.

## 🚀 Features

- **MS Teams Interface**: Authentic look and feel with a minimalist sidebar and spacious chat area.
- **DigitalOcean Agent Integration**: Seamless connection to DO AI Agents using API keys.
- **Rich Text Support**: Full rendering of Markdown and HTML responses, including tables, code blocks, and lists.
- **Context Awareness**: Maintains conversation history (up to 30 messages) for natural dialogue.
- **Modern Tech Stack**: Built with Vite, React, MUI (Material UI), and Framer Motion for smooth animations.
- **Microfrontend Ready**: Structured for easy integration into larger platforms.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/amila-fc/ff-chatbot.git
cd teams-chatbot
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your DigitalOcean Agent credentials:
```env
VITE_AGENT_URL=your_agent_endpoint_url
VITE_AGENT_KEY=your_agent_access_key
```

## 💻 Development

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3002`.

## 📦 Build & Deployment

### Build for Production
To create a production-ready bundle:
```bash
npm run build
```
The optimized files will be generated in the `dist/` directory.

### Deployment Options

#### 1. DigitalOcean App Platform (Recommended)
- Connect your GitHub repository to the DO App Platform.
- Choose **Static Site** as the component type.
- Set the build command to `npm run build` and the output directory to `dist`.
- Add your environment variables in the DO Dashboard.

#### 2. Static Hosting (Netlify / Vercel / S3)
- Upload the contents of the `dist/` folder to any static hosting provider.
- Ensure the provider supports SPA routing if you add routes later.

## 📄 License
This project is for internal use at CodeMill.
