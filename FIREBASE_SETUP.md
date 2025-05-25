# Firebase Setup Guide for FreelanceHub

This guide will walk you through setting up Firebase for the FreelanceHub platform.

## 🔥 Create Firebase Project

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click "Create a project"
   - Enter project name: `freelance-hub` (or your preferred name)
   - Choose whether to enable Google Analytics (optional)
   - Click "Create project"

## 🔐 Setup Authentication

1. **Navigate to Authentication**
   - In the Firebase console, click on "Authentication" in the left sidebar
   - Click "Get started"

2. **Enable Email/Password Provider**
   - Go to the "Sign-in method" tab
   - Click on "Email/Password"
   - Enable both "Email/Password" and "Email link (passwordless sign-in)" if desired
   - Click "Save"

3. **Optional: Add Demo Users**
   - Go to the "Users" tab
   - Click "Add user" to create test accounts:
     - Freelancer: `freelancer@demo.com` / `password123`
     - Client: `client@demo.com` / `password123`

## 🗄️ Setup Firestore Database

1. **Navigate to Firestore Database**
   - Click "Firestore Database" in the left sidebar
   - Click "Create database"

2. **Choose Security Rules**
   - Select "Start in test mode" for development (we'll secure it later)
   - Choose your preferred location (closest to your users)
   - Click "Done"

3. **Create Collections (Optional)**
   The app will automatically create these collections when users interact with it:
   - `users` - User profiles and data
   - `jobs` - Job postings
   - `applications` - Job applications
   - `messages` - Direct messages (future feature)

## 🔑 Get Firebase Configuration

1. **Go to Project Settings**
   - Click the gear icon next to "Project Overview"
   - Select "Project settings"

2. **Register Web App**
   - Scroll down to "Your apps" section
   - Click the web icon `</>`
   - Enter app nickname: `FreelanceHub Web`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

3. **Copy Configuration**
   - Copy the firebaseConfig object
   - It should look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef123456"
   };
   ```

## 📝 Update Environment Variables

1. **Open your `.env` file** in the project root
2. **Replace the placeholder values** with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

## 🔒 Security Rules (Production)

When you're ready for production, update your Firestore security rules:

1. **Go to Firestore Database**
2. **Click "Rules" tab**
3. **Replace the rules** with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Jobs can be read by anyone, written by authenticated clients
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if request.auth != null &&
        (request.auth.uid == resource.data.clientId ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'client');
    }

    // Applications can be read by job owner and applicant
    match /applications/{applicationId} {
      allow read, write: if request.auth != null &&
        (request.auth.uid == resource.data.freelancerId ||
         request.auth.uid == resource.data.clientId);
    }
  }
}
```

## 🧪 Test Your Setup

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Test Registration**
   - Go to `/register`
   - Create a test account
   - Verify the user appears in Firebase Authentication

3. **Test Data Storage**
   - Complete the profile setup
   - Check if user data appears in Firestore

## 🚨 Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Double-check your environment variables
   - Ensure the `.env` file is in the project root
   - Restart your development server after changing `.env`

2. **"Missing or insufficient permissions"**
   - Check your Firestore security rules
   - Ensure you're authenticated before making requests

3. **"Network request failed"**
   - Check your internet connection
   - Verify your Firebase project is active
   - Check browser console for specific error messages

### Debug Steps:

1. **Check Environment Variables**
   ```javascript
   console.log('Firebase Config:', {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
   });
   ```

2. **Test Firebase Connection**
   - Open browser dev tools
   - Check Network tab for Firebase requests
   - Look for any 4xx or 5xx errors

## 📈 Monitoring & Analytics

1. **Enable Performance Monitoring** (Optional)
   - Go to "Performance" in Firebase console
   - Click "Get started"
   - Follow the setup instructions

2. **Enable Crashlytics** (Optional)
   - Go to "Crashlytics" in Firebase console
   - Follow the setup guide

## 🚀 Production Deployment

When deploying to production:

1. **Update Security Rules** (as shown above)
2. **Set Environment Variables** in your hosting platform (Vercel, Netlify, etc.)
3. **Enable Firebase Hosting** (optional alternative to Vercel)
4. **Monitor Usage** in Firebase console

---

## 🆘 Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)

Your Firebase setup is now complete! 🎉
