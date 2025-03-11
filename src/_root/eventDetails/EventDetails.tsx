import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const EventDetails = () => {
  const location = useLocation();
  const event = location.state;

  const formattedDate =
    event.date instanceof Date
      ? format(event.date, "MMMM d, yyyy")
      : format(new Date(event.date), "MMMM d, yyyy");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mb-6"
      >
        <Link
          to="/events"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to events</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10"></div>

          <div className="absolute top-6 right-6 z-20">
            <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-1.5 text-xs rounded-full">
              {event.category.name}
            </Badge>
          </div>

          <div className="relative w-full h-80 sm:h-96 overflow-hidden">
            {event.thumbnail ? (
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary/40 to-secondary/40 flex items-center justify-center">
                <Calendar className="w-20 h-20 text-white/30" />
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="bg-card px-6 py-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Bookmark className="h-4 w-4 mr-1" />
              <span>Save</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Share2 className="h-4 w-4 mr-1" />
              <span>Share</span>
            </Button>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to={"/"}>Register Now</Link>
          </Button>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                About This Event
              </h2>
              <div className="prose max-w-none text-muted-foreground leading-relaxed">
                {event.description ? (
                  <p>{event.description}</p>
                ) : (
                  <p>No description provided for this event.</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Attendees
              </h3>
              <div className="flex -space-x-2 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <Avatar
                    key={i}
                    className="border-2 border-background w-10 h-10"
                  >
                    <AvatarImage
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {String.fromCharCode(65 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground text-xs font-medium border-2 border-background">
                  +12
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {["community", "featured", event.category.name.toLowerCase()].map(
                (tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 bg-secondary/50 text-secondary-foreground hover:bg-secondary/20"
                  >
                    #{tag}
                  </Badge>
                )
              )}
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 h-fit">
            <h3 className="font-medium text-lg mb-4">Event Details</h3>

            <div className="flex items-start mb-6">
              <div className="bg-background p-2 rounded-lg mr-4">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <div className="bg-background p-2 rounded-lg mr-4">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <div className="bg-background p-2 rounded-lg mr-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center mt-8 pt-6 border-t border-border">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="https://i.pravatar.cc/100?img=50" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  CH
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Organized by</p>
                <p className="font-medium text-md bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  The Communion Hub{" "}
                  <span className="text-sm">with Love {"<3"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-6 text-center text-sm text-muted-foreground border-t border-border">
          <p>Event ID: {event.$id}</p>
          <p className="mt-1">
            Created on {new Date(event.$createdAt).toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
