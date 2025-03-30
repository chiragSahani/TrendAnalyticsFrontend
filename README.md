# TrendAnalyticsFrontend

## 🚀 Overview
TrendAnalyticsFrontend is a TypeScript and React-based single-page application designed to provide powerful analytics insights. The application features a dynamic and responsive interface for entering queries, visualizing results, and managing user settings.

## 🎯 Features
- **Natural language query input with AI-powered suggestions**
- **Query processing simulation with loading & error states**
- **Dynamic results visualization using Recharts/Chart.js**
- **Query history tracking for user reference**
- **Profile Management:** Manage user details & settings
- **Settings Management:** Toggle themes, animations, and preferences
- **Active Navigation:** Smooth transitions with animations
- **Responsive Design:** Works seamlessly on all devices
- **Bright UI:** Visually engaging UI with GIF support

## 🛠 Tech Stack
- **Frontend:** React.js (Hooks & Functional Components)
- **State Management:** Redux (Redux Toolkit)
- **Styling:** Tailwind CSS / Material-UI
- **Charts & Data Visualization:** Recharts / Chart.js
- **Animations:** Framer Motion / GSAP
- **Icons & Assets:** Lucide React / LottieFiles

## 📸 Screenshots & Demo
[🔗 Live Demo](https://chiragtrend.vercel.app/)

## 📦 Installation & Setup

1. **Clone the Repository**
    ```bash
    git clone https://github.com/chiragSahani/TrendAnalyticsFrontend.git
    cd TrendAnalyticsFrontend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the Application**
    ```bash
    npm run dev
    ```

4. **Build for Production**
    ```bash
    npm run build
    ```

## 🚀 Deployment
Deploy the project using Netlify or Vercel:
```bash
vercel deploy
```
or
```bash
netlify deploy
```

## 🏗 Project Structure
```
📂 TrendAnalyticsFrontend
├── 📁 app
│   ├── 📂 profile
│   │   └── page.tsx
│   ├── 📂 settings
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   └── 📂 components
│       └── 📂 ui
│           ├── dashboard-content.tsx
│           ├── dashboard-sidebar.tsx
│           └── dashboard.tsx
├── 📁 hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── 📁 lib
│   ├── 📂 features
│   │   ├── hooks.ts
│   │   ├── store.ts
│   │   └── utils.ts
│   ├── 📂 public
│   │   ├── placeholder-logo.png
│   │   ├── placeholder-logo.svg
│   │   ├── placeholder-user.jpg
│   │   ├── placeholder.jpg
│   │   └── placeholder.svg
│   └── 📂 styles
│       ├── globals.css
│       ├── components.json
│       ├── next.config.mjs
│       ├── package.json
│       └── pnpm-lock.yaml
└── README.md
```

## 🎯 To-Do / Future Enhancements
- **Integrate real AI query processing via an API**
- **Allow users to export query results**
- **Add dark mode & more theme customization options**

## 🤝 Contributing
Pull requests are welcome! Feel free to fork the repository and submit PRs.

## 📜 License
This project is licensed under the MIT License.

