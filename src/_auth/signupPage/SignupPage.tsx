import GoogleSVG from "@/components/shared/GoogleSVG";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "@/lib/utils";
import { authServices } from "@/services/authServices";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name.trim()) {
      setError("Name is required!");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid Email!");
      setIsLoading(false);
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      setIsLoading(false);
      return;
    }

    try {
      await authServices.createAccount({ name, email, password });
      // Redirect handled by authServices
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.01, transition: { duration: 0.1 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="w-full max-w-md backdrop-blur-xl bg-background/80 p-3 sm:p-5 md:p-6 rounded-2xl shadow-xl border border-border/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <motion.form
        className="space-y-3 md:space-y-4"
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="text-center space-y-0.5 md:space-y-1"
          variants={itemVariants}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Create Account
          </h1>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Sign up to access all features and personalized content
          </p>
        </motion.div>

        {/* Form Fields */}
        <div className="space-y-2.5 md:space-y-3">
          {" "}
          {/* Name Field */}
          <motion.div className="space-y-0.5" variants={itemVariants}>
            <Label
              htmlFor="name"
              className="text-xs md:text-sm font-semibold px-1 flex items-center gap-2"
            >
              Full Name
              <span className="h-1 w-1 rounded-full bg-primary/70 inline-block"></span>
            </Label>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Input
                id="name"
                placeholder="React Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 md:h-10 rounded-lg bg-secondary/10 border border-border/50 px-4 transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:scale-[1.005] placeholder:text-muted-foreground/70" // Reduced height
              />
            </motion.div>
          </motion.div>
          {/* Email Field */}
          <motion.div className="space-y-0.5" variants={itemVariants}>
            <Label
              htmlFor="email"
              className="text-xs md:text-sm font-semibold px-1 flex items-center gap-2"
            >
              Email
              <span className="h-1 w-1 rounded-full bg-primary/70 inline-block"></span>
            </Label>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Input
                id="email"
                placeholder="react.singh@swe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 md:h-10 rounded-lg bg-secondary/10 border border-border/50 px-4 transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:scale-[1.005] placeholder:text-muted-foreground/70" // Reduced height
              />
            </motion.div>
          </motion.div>
          {/* Password Field */}
          <motion.div className="space-y-0.5" variants={itemVariants}>
            <Label
              htmlFor="password"
              className="text-xs md:text-sm font-semibold px-1 flex items-center gap-2"
            >
              Password
              <span className="h-1 w-1 rounded-full bg-primary/70 inline-block"></span>
            </Label>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Input
                id="password"
                type="password"
                placeholder="* * * * * *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 md:h-10 rounded-lg bg-secondary/10 border border-border/50 px-4 transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:scale-[1.005] placeholder:text-muted-foreground/70" // Reduced height
              />
            </motion.div>
          </motion.div>
          {/* Confirm Password Field */}
          <motion.div className="space-y-0.5" variants={itemVariants}>
            <Label
              htmlFor="confirmPassword"
              className="text-xs md:text-sm font-semibold px-1 flex items-center gap-2"
            >
              Confirm Password
              <span className="h-1 w-1 rounded-full bg-primary/70 inline-block"></span>
            </Label>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Input
                id="confirmPassword"
                type="password"
                placeholder="* * * * * *"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-9 md:h-10 rounded-lg bg-secondary/10 border border-border/50 px-4 transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:scale-[1.005] placeholder:text-muted-foreground/70" // Reduced height
              />
            </motion.div>
          </motion.div>
          {/* Error Message */}
          <div className="h-4 text-center">
            {" "}
            {/* Reduced height */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-medium text-destructive animate-pulse"
              >
                {error}
              </motion.p>
            )}
          </div>
          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              className="w-full h-9 md:h-10 rounded-lg font-semibold text-xs md:text-sm shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-primary/30 hover:scale-[1.01] disabled:opacity-70 bg-primary text-primary-foreground" // Reduced height
              disabled={isLoading}
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </motion.div>
          {/* Divider */}
          <motion.div
            className="relative my-1.5 md:my-2"
            variants={itemVariants}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background/90 px-2 text-xs text-muted-foreground backdrop-blur-sm">
                Or continue with
              </span>
            </div>
          </motion.div>
          {/* Social Login */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="button"
              className="w-full h-9 md:h-10 rounded-lg font-medium text-xs md:text-sm border border-border/50 bg-secondary/5 transition-all duration-200 hover:bg-secondary/20 hover:scale-[1.01] flex-c"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
            >
              <GoogleSVG />
              Continue with Google
            </motion.button>
          </motion.div>
        </div>

        {/* Login Link */}
        <motion.div className="text-center text-xs" variants={itemVariants}>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 transition-colors font-semibold underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default SignupPage;
