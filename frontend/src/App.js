import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as saleActions from "./store/sale"
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage"
import SalePage from "./components/SalePage"
import Footer from "./components/AboutMeFooter";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
        <>
        <Switch>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <SplashPage />
          </Route>
          <Route exact path="/signin">
            <LoginFormPage />
          </Route>
          <Route path="/sales/:id">
            <Navigation isLoaded={isLoaded} />
            <SalePage />
          </Route>
        </Switch>
        <Footer />
      </>
      );
}

export default App;
