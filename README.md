# FreelanceHub - Freelancer Platform

A modern, responsive freelancer-client matching platform built with React, Vite, Tailwind CSS, and Firebase. Features a beautiful glassmorphism design with gradient backgrounds.

## 🚀 Features

- **User Authentication**: Firebase-powered signup/login with role-based access (freelancer/client)
- **Glassmorphism Design**: Modern UI with glass-like elements and gradient backgrounds
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Role-Based Dashboards**: Separate dashboards for freelancers and clients
- **Job Management**: Clients can post jobs, freelancers can browse and apply
- **Profile System**: Comprehensive user profiles with skills and portfolio
- **Search & Filter**: Advanced search functionality for jobs and freelancers
- **Real-time Updates**: Firebase Firestore for real-time data synchronization

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, JavaScript (JSX)
- **Styling**: Tailwind CSS with custom glassmorphism components
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd freelancer-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password provider
   - Create a Firestore database
   - Get your Firebase configuration

4. **Environment Variables**
   - Copy the `.env` file and update with your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment to Vercel

1. **Prepare for deployment**
   ```bash
   npm run build
   ```

2. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **Set Environment Variables in Vercel**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add all Firebase environment variables

## 🎨 Design System

### Glassmorphism Components
- `.glass` - Basic glass effect with backdrop blur
- `.glass-strong` - Stronger glass effect for headers
- `.card-glass` - Glass cards with hover effects
- `.btn-glass` - Glass-style buttons
- `.input-glass` - Glass-style form inputs

### Color Scheme
- Primary gradient: Purple to Blue (`#667eea` to `#764ba2`)
- Secondary gradients available for variety
- White text with opacity variations for hierarchy

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   └── LoadingSpinner.jsx
├── pages/              # Main application pages
│   ├── Landing.jsx     # Landing page
│   ├── Login.jsx       # Authentication pages
│   ├── Register.jsx
│   ├── FreelancerDashboard.jsx
│   ├── ClientDashboard.jsx
│   ├── BrowseFreelancers.jsx
│   ├── BrowseJobs.jsx
│   ├── Profile.jsx
│   ├── JobDetail.jsx
│   ├── FreelancerDetail.jsx
│   └── CreateJob.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── services/           # External services
│   └── firebase.js     # Firebase configuration
└── styles/
    └── index.css       # Global styles with Tailwind
```

## 🔐 Authentication Flow

1. **Registration**: Users choose between freelancer or client role
2. **Profile Creation**: Additional profile information based on role
3. **Dashboard Redirect**: Role-based dashboard routing
4. **Protected Routes**: Authentication required for sensitive pages

## 🎯 User Roles

### Freelancers
- Create and manage profile with skills and portfolio
- Browse and apply for jobs
- Track applications and projects
- Build reputation through ratings

### Clients
- Post job opportunities
- Browse freelancer profiles
- Manage job applications
- Track project progress

## 📱 Mobile Responsiveness

The platform is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized layouts for small screens
- Swipe gestures and mobile interactions

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
npm run format       # Format code
```

## 🚧 Future Enhancements

- Real-time messaging system
- File upload functionality
- Payment integration (Stripe)
- Review and rating system
- Email notifications
- Advanced search filters
- Project collaboration tools
- Video calling integration

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

---

Built with ❤️ using React, Vite, Tailwind CSS, and Firebase.
