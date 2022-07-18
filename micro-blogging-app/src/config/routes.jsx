import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Profile from "../components/Profile";
import Wrapper from "../components/Wrapper";

const routes = [
  {
    path: '/',
    component: <Wrapper />,
    label: 'Home',
    protected: true,
  },
  {
    path: '/profile',
    component: <Profile />,
    label: 'Profile',
    protected: true,
  },
  {
    path: '/login',
    component: <LoginPage />,
    label: 'Login',
    protected: false,
  },
  {
    path: '/signup',
    component: <SignupPage />,
    label: 'Signup',
    protected: false,
  }
]

export default routes;
