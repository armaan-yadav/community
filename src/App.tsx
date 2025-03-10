import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "./components/shared/Loading";
import { Toaster } from "./components/ui/sonner";
import EventDetails from "./_root/eventDetails/EventDetails";
import CreateEvent from "./_root/createEvent/CreateEvent";

// Lazy imports for layouts
const AuthLayout = lazy(() => import("./_auth/AuthLayout"));
const RootLayout = lazy(() => import("./_root/RootLayout"));

// Lazy imports for pages
const Home = lazy(() => import("./_root/homePage/HomePage"));
const LoginPage = lazy(() => import("./_auth/loginPage/LoginPage"));
const SignupPage = lazy(() => import("./_auth/signupPage/SignupPage"));
const AllEventsPage = lazy(() => import("./_root/allEventsPage/AllEventsPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* auth layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          {/* root layout */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/create" element={<CreateEvent />} />
          </Route>
        </Routes>
        <Toaster />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
