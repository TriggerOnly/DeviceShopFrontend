import { BrowserRouter } from "react-router-dom";
import AppRouter from "./component/AppRouter";
import Navbar from './component/Navbar/Navbar'
import { Container } from "@mui/material";
import { useEffect, useContext } from "react";
import { authMe } from "./http/userAPI";
import { Context } from "./index";

function App() {
  const { user } = useContext(Context); 

  useEffect(() => {
    const checkAuth = async () => {
      const token = window.localStorage.getItem('token');
  
      if (token) {
        try {
          const userData = await authMe();
  
          if (userData) {
            user.setUser(userData);
            user.setIsAuth(true);
          }
        } catch (error) {
          console.warn("Ошибка авторизации:", error);
          user.setIsAuth(false);
        }
      }
    };
  
    checkAuth();
  }, [user]);
  

  return (
    <div>
      <Container className={{maxWidth: "2000px"}}>
        <BrowserRouter>
          <Navbar/>
          <AppRouter/>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
