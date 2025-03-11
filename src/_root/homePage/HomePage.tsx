import { Button } from "@/components/ui/button";
import { authServices } from "@/services/authServices";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const fun = async () => {
    const userr = await authServices.getCurrentUser();
    console.log(userr);
  };

  useEffect(() => {
    fun();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl"
          animate={{
            x: ["-20%", "10%", "-20%"],
            y: ["-10%", "5%", "-10%"],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-secondary/3 blur-3xl"
          animate={{
            x: ["10%", "-5%", "10%"],
            y: ["5%", "-10%", "5%"],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="grid grid-cols-6 h-full w-full">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border-r border-foreground/5 h-full" />
            ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 py-32 md:py-40 relative z-10">
        {/* Tag cloud - decorative element */}
        <div className="absolute -left-10 top-20 opacity-40 hidden lg:block">
          {["Faith", "Unity", "Love", "Hope", "Peace", "Community"].map(
            (tag, i) => (
              <motion.div
                key={tag}
                className="absolute text-base font-medium rounded-full px-3 py-1.5 bg-muted/60"
                style={{
                  left: `${Math.random() * 120}px`,
                  top: `${i * 32}px`,
                  opacity: 0.8 - i * 0.1,
                }}
                animate={{ x: [0, 5, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                {tag}
              </motion.div>
            )
          )}
        </div>

        {/* Main hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Eyebrow text with pulsing dot */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center rounded-full bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex h-2 w-2 rounded-full bg-primary mr-2"
            ></motion.span>
            <span>Building connections that matter</span>
          </motion.div>

          {/* Main heading with gradient text */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight md:leading-tight mb-6"
          >
            Bringing communities
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary block"
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              together as one
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            A platform for faith communities to connect, share resources, and
            build meaningful relationships across diverse backgrounds.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to={"/signup"} className="">
                <Button
                  size="lg"
                  className="group cursor-pointer font-medium text-base px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  Join Now
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="font-medium text-base px-8 rounded-full border-primary text-primary hover:bg-primary/5"
              >
                <Link to={"/events"}>Explore Events</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main hero image with floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative rounded-2xl overflow-hidden mt-16 shadow-2xl shadow-primary/10"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0px 0px 0px rgba(93, 95, 239, 0.1)",
                "0px 0px 30px rgba(93, 95, 239, 0.3)",
                "0px 0px 0px rgba(93, 95, 239, 0.1)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-full aspect-video rounded-2xl overflow-hidden"
          >
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80"
              alt="Community gathering"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1523803326055-13c19aea69fd?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay"></div>
          </motion.div>

          {/* Main floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/90 dark:bg-black/80 rounded-lg shadow-lg p-4 backdrop-blur-sm max-w-xs"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5 }}
                className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold"
              >
                C
              </motion.div>
              <div>
                <p className="font-semibold text-lg">Communion Connect</p>
                <p className="text-sm text-muted-foreground">
                  Building bridges across communities
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
