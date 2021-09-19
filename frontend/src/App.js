import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as saleActions from "./store/sale"
import Navigation from "./components/Navigation/Navigation";
import SalesList from "./components/SalesList/SalesList";
import SalePage from "./components/SalePage/SalePage"
import SplashImage from "./components/SplashPageDisplayImage";

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
            <SplashImage />
            <SalesList />
          </Route>
          <Route path="/api/sales/:id">
            <SalePage />
          </Route>
        </Switch>
      </>
      )}
    </>
  );
}

export default App;
