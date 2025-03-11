import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import EventDetails from "./_root/eventDetails/EventDetails";
import { Toaster } from "./components/ui/sonner";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { getCurrentUser } from "./redux/user/userSlice";

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const AuthLayout = lazy(() => import("./_auth/AuthLayout"));
const RootLayout = lazy(() => import("./_root/RootLayout"));

const Home = lazy(() => import("./_root/homePage/HomePage"));
const LoginPage = lazy(() => import("./_auth/loginPage/LoginPage"));
const SignupPage = lazy(() => import("./_auth/signupPage/SignupPage"));
const AllEventsPage = lazy(() => import("./_root/allEventsPage/AllEventsPage"));

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
