# The Communion Hub

A modern platform for faith communities to connect, share resources, and build meaningful relationships across diverse backgrounds.

![The Communion Hub](https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80)

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

## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: Custom built components
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form
- **Routing**: React Router

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0 or later)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone [repository-url]
   cd assignment
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

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

## ✅ Features In Depth

### Event Management

Users can create, view, and manage community events. Each event includes:

- Title and description
- Date and time
- Location information
- Category classification
- Custom or AI-generated thumbnail image

### Authentication System

Secure user authentication with:

- Email/password registration and login
- Form validation with helpful error messages
- Protected routes to secure user data
- Session persistence

### Categories and Filtering

- Events are organized by categories
- Users can filter events by different categories
- New categories can be created on the fly

### Responsive Design

- Mobile-first approach ensures usability on all devices
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
