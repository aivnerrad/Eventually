import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as saleActions from "./store/sale"
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage"
import SalePage from "./components/SalePage"
import Footer from "./components/AboutMeFooter";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
  }, [dispatch]);
  useEffect(() => {
    dispatch(saleActions.getAllSales()).then(() => setIsLoaded(true));
  }, [dispatch])
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <>
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/sales/:id">
            <SalePage />
          </Route>
        </Switch>
      </>
      )}
      <Footer />
    </>
  );
}

export default App;
