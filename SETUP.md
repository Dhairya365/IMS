# IMS Frontend Setup Guide

This guide will help you set up the IMS Frontend with Appwrite authentication and backend integration.

## Prerequisites

1. **Node.js 18+** installed
2. **Appwrite Account** - Sign up at [appwrite.io](https://appwrite.io)
3. **Backend running** - Make sure the Django backend is running on `http://localhost:8000`

## Setup Steps

### 1. Install Dependencies

```bash
cd /Users/palshah/Documents/mac_codes/projects/IMS/IMS_Frontend
npm install
```

### 2. Configure Appwrite

1. **Create Appwrite Project:**
   - Go to [Appwrite Console](https://cloud.appwrite.io)
   - Create a new project
   - Note down your Project ID

2. **Update Environment Variables:**
   - Open `.env.local` file
   - Replace `your_project_id_here` with your actual Appwrite Project ID

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_actual_project_id

# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

3. **Configure Appwrite Authentication:**
   - In Appwrite Console, go to Authentication
   - Enable Email/Password authentication
   - Set up your domain (for development: `localhost:3000`)

### 3. Configure Backend

1. **Update Backend Environment:**
   - Open `IMS_Backend/.env`
   - Update Appwrite configuration:

```env
# Appwrite Configuration
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_actual_project_id
APPWRITE_API_KEY=your_api_key
```

2. **Start Backend Server:**
```bash
cd /Users/palshah/Documents/mac_codes/projects/IMS/IMS_Backend
source venv/bin/activate
python manage.py runserver
```

### 4. Start Frontend Development Server

```bash
cd /Users/palshah/Documents/mac_codes/projects/IMS/IMS_Frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Authentication Flow

### How it Works

1. **User Registration/Login:**
   - Users register/login through Appwrite
   - JWT tokens are automatically managed
   - User data is synced with Django backend

2. **Protected Routes:**
   - All dashboard pages are protected
   - Unauthenticated users are redirected to login
   - JWT tokens are sent with API requests

3. **API Communication:**
   - Frontend sends JWT tokens to backend
   - Backend verifies tokens with Appwrite
   - User data is automatically synced

### Testing Authentication

1. **Register a New User:**
   - Go to `http://localhost:3000/auth/register`
   - Fill in the registration form
   - User will be automatically logged in

2. **Login with Existing User:**
   - Go to `http://localhost:3000/auth/login`
   - Use your Appwrite credentials
   - You'll be redirected to dashboard

3. **Test Protected Routes:**
   - Try accessing `/dashboard` without login (should redirect)
   - Login and access protected pages
   - Test logout functionality

## Features Implemented

### ✅ Authentication
- Appwrite integration
- JWT token management
- Automatic user sync
- Protected routes
- Logout functionality

### ✅ Backend Integration
- API service with JWT authentication
- Automatic token refresh
- Error handling
- CORS configuration

### ✅ UI Components
- Login/Register pages
- Protected route wrapper
- User context management
- Loading states
- Error handling

## Troubleshooting

### Common Issues

1. **"Appwrite not configured" error:**
   - Check your `.env.local` file
   - Ensure `NEXT_PUBLIC_APPWRITE_PROJECT_ID` is set correctly

2. **"Unauthorized" API errors:**
   - Check if backend is running
   - Verify Appwrite configuration in backend
   - Check CORS settings

3. **Login not working:**
   - Verify Appwrite project settings
   - Check if email/password auth is enabled
   - Check browser console for errors

4. **Backend connection issues:**
   - Ensure Django server is running on port 8000
   - Check if PostgreSQL is running
   - Verify database migrations are applied

### Debug Steps

1. **Check Frontend Logs:**
   - Open browser DevTools
   - Check Console tab for errors
   - Check Network tab for API calls

2. **Check Backend Logs:**
   - Look at Django server console
   - Check for authentication errors
   - Verify JWT token validation

3. **Test Appwrite Connection:**
   - Check Appwrite Console
   - Verify project settings
   - Test authentication manually

## Next Steps

1. **Add Role-Based Access:**
   - Implement user roles in Appwrite
   - Add role-based navigation
   - Restrict certain features

2. **Enhance API Integration:**
   - Connect real data to components
   - Implement CRUD operations
   - Add data validation

3. **Add Error Boundaries:**
   - Implement error handling
   - Add retry mechanisms
   - Improve user feedback

4. **Testing:**
   - Add unit tests
   - Add integration tests
   - Add E2E tests

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the console logs
3. Verify all configuration steps
4. Ensure both frontend and backend are running

The application is now ready for development with full authentication and backend integration!
