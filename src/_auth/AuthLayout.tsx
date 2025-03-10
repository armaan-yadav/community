import React from "react";
import { motion } from "framer-motion";
import { GalleryVerticalEnd } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-svh bg-gradient-to-br from-background via-background/90 to-secondary/20 overflow-hidden"
    >
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-3 sm:p-5 md:p-6 lg:p-8 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-2 md:mb-4"
        >
          <Link to="/" className="inline-flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20 text-primary-foreground transition-transform duration-200 group-hover:scale-105"
            >
              <GalleryVerticalEnd className="size-4" />
            </motion.div>
            <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              The Communion Hub
            </span>
          </Link>
        </motion.div>

        {/* Form Container - Outlet will render here */}
        <div className="flex items-center justify-center">
          <Outlet />
        </div>

        {/* Mobile Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:hidden mt-3 rounded-xl overflow-hidden shadow-xl relative max-w-md mx-auto w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-secondary/60 mix-blend-multiply z-10"></div>
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
            alt="Community connection"
            className="w-full h-32 sm:h-36 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-black/50 backdrop-blur-sm text-white z-20">
            <h2 className="text-sm font-bold">Join Our Growing Network</h2>
            <p className="text-xs opacity-90">
              Connect with like-minded individuals today
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Hero Image */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:block w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/50 mix-blend-multiply z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10"></div>
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{
            scale: 1,
            transition: { duration: 6 },
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 6 },
          }}
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
          alt="Community connection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Content overlay with feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-8 text-center z-20"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-white drop-shadow-lg">
            Join Our Community
          </h2>
          <p className="text-base text-white/90 max-w-md mx-auto mb-6 drop-shadow-md">
            Create your account and start connecting with people who share your
            interests
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, staggerChildren: 0.05 }}
          className="absolute bottom-6 left-4 right-4 z-20 grid grid-cols-3 gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 transition-all duration-200 hover:bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.2 }}
              className="size-8 bg-primary/20 rounded-full flex items-center justify-center mb-2 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-white"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </motion.div>
            <h3 className="text-sm font-semibold text-white text-center">
              Build Profile
            </h3>
            <p className="text-xs text-white/80 text-center mt-1">
              Create your personalized profile
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 transition-all duration-200 hover:bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.2 }}
              className="size-8 bg-primary/20 rounded-full flex items-center justify-center mb-2 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-white"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </motion.div>
            <h3 className="text-sm font-semibold text-white text-center">
              Connect
            </h3>
            <p className="text-xs text-white/80 text-center mt-1">
              Meet people with similar interests
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 transition-all duration-200 hover:bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.2 }}
              className="size-8 bg-primary/20 rounded-full flex items-center justify-center mb-2 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-white"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </motion.div>
            <h3 className="text-sm font-semibold text-white text-center">
              Attend Events
            </h3>
            <p className="text-xs text-white/80 text-center mt-1">
              Join events that match your interests
            </p>
          </motion.div>
        </motion.div>

        {/* User count/testimonial */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="absolute top-6 right-6 z-20 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 flex items-center gap-2"
        >
          <div className="flex -space-x-1.5">
            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.2 }}
              className="size-6 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/12.jpg"
              alt="User"
            />
            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.2 }}
              className="size-6 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
            />
            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.2 }}
              className="size-6 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/22.jpg"
              alt="User"
            />
          </div>
          <p className="text-xs text-white">5,000+ active members</p>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
        className="fixed top-[-10%] right-[-10%] w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-primary/20 rounded-full blur-[80px] pointer-events-none"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
        className="fixed bottom-[-10%] left-[-10%] w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-secondary/20 rounded-full blur-[80px] pointer-events-none"
      ></motion.div>
    </motion.div>
  );
};

export default AuthLayout;
