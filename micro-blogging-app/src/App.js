import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Navigate,
  Routes as Switch, // in react-router-dom v6, Switch is now Routes
  Route,
} from "react-router-dom";
import './App.css';
import theme from './UIKit/Layouts/Theme/theme';
import Layout from './UIKit/Layouts/Layout/Layout';
import routes from './config/routes';
import useAuth from './hooks/useAuth';
import AuthContext from './Context/AuthContext';

function App() {
  const auth = useAuth(); // { ..., isLoggedIn }
  const { isLoggedIn } = auth;
  return (
    <Router>
      <AuthContext.Provider value={auth}>
        <ChakraProvider resetCSS theme={theme}>
          <Layout>
            <Switch>
              {isLoggedIn ? (
                <>
                  {routes.filter((r) => r.protected).map((route) => ( 
                    <Route key={route.path} path={route.path} element={route.component} />
                  ))}
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  {routes.filter((r) => !r.protected).map((route) => ( 
                    <Route key={route.path} path={route.path} element={route.component} />
                  ))}
                  <Route path="*" element={<Navigate to="/login" />} />
                </>
              )}
            </Switch>
          </Layout>
        </ChakraProvider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
