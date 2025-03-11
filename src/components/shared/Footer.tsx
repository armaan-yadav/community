import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Communion Connect</h2>
            <p className="text-muted-foreground mb-4">
              Building bridges across faith communities for a more connected
              world.
            </p>

            <div className="flex space-x-4">
              <Link
                to={"/"}
                className="text-primary hover:text-primary/80 transition"
              >
                <Facebook size={20} />
              </Link>
              <Link
                to={"/"}
                className="text-primary hover:text-primary/80 transition"
              >
                <Instagram size={20} />
              </Link>
              <Link
                to={"/"}
                className="text-primary hover:text-primary/80 transition"
              >
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <div className="space-y-3">
              <p className="flex items-start space-x-3">
                <MapPin size={20} />
                <span className="text-muted-foreground">
                  India, On Earth, Milky Way Galaxy, The Universe
                </span>
              </p>
              <p className="flex items-start space-x-3">
                <Mail size={20} />
                <span className="text-muted-foreground">
                  react.singh@swe.com
                </span>
              </p>
              <p className="flex items-start space-x-3">
                <Phone size={20} />
                <span className="text-muted-foreground">+91 1122334455</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Communion Connect. Building connections
            that matter.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition">
              Terms & Conditions
            </Link>
            <Link to="/" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-primary transition">
              Community Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
