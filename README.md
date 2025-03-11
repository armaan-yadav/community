# The Communion Hub

A modern platform for faith communities to connect, share resources, and build meaningful relationships across diverse backgrounds.

## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: Shadcn
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form
- **Routing**: React Router

## 📁 Project Structure

```
src/
├── _auth/              # Authentication related pages
├── _root/              # Main application pages
├── components/         # Reusable components
│   ├── shared/         # Shared components across pages
│   ├── ui/             # UI components
│   └── shimmer/        # Loading state components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── redux/              # Redux store and slices
│   ├── events/         # Event management state
│   └── user/           # User authentication state
├── services/           # API service functions
└── types/              # TypeScript type definitions
```
## ✨ Features

### 🔐 Authentication

- Complete user authentication flow with signup and login
- Form validation with error handling
- Google authentication integration
- Protected routes for authenticated users

### 📅 Event Management

- Browse community events with filtering options
- View detailed event information
- Create and publish new events
- Categorize events for easy discovery

### 🧩 Categories

- Browse events by categories
- Filter events based on interest areas
- Create new categories on demand during event creation

### 🎨 Rich UI/UX

- Responsive design that works on all devices
- Smooth animations and transitions using Framer Motion
- Loading states with shimmer effects
- Beautiful gradients and visual design

### 🤖 AI Integration

- AI-powered image generation for events
- Automatically create event thumbnails based on event titles

### 📱 Modern Interface

- Intuitive navigation and user flow
- Clean and accessible design components
- Interactive UI elements with hover/focus states

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
