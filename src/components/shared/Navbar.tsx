import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logoutUser } from "@/redux/user/userSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || "?";
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    console.log("User logged out");
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                The Communion Hub
              </span>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to={"/"}
                  className="text-foreground hover:bg-opacity-10 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to={"/events"}
                  className="text-muted-foreground  hover:bg-opacity-10 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Events
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  {getInitial()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-white bg-primary cursor-pointer hover:text-white"
                >
                  <LogOut size={16} /> Logout
                </Button>
              </>
            ) : (
              <Button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                <Link to={"/login"}>Sign in</Link>
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md transition-colors text-primary"
              aria-expanded="false"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {!isMenuOpen ? <Menu /> : <X />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-b-md shadow-lg overflow-hidden"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              {[
                { name: "Home", active: true, link: "/" },
                { name: "Events", link: "/events" },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  className={`${
                    item.active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-primary"
                  } hover:bg-primary hover:bg-opacity-10 block px-3 py-2 rounded-md text-base font-medium`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: 0.1 + index * 0.05,
                  }}
                >
                  <Link to={`${item.link}`}> {item.name}</Link>
                </motion.div>
              ))}
              <motion.div
                className="pt-4 pb-2 border-t border-border flex flex-col space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        {getInitial()}
                      </div>
                      <span className="text-foreground">{user?.name}</span>
                    </div>
                    <motion.button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 bg-background border border-border hover:bg-destructive/10 hover:text-destructive text-foreground px-4 py-2 rounded-md text-sm font-medium w-full transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut size={16} /> Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium w-full transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to={"/login"}>Sign in</Link>
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
