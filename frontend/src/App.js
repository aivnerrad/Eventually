import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage"
import SalePage from "./components/SalePage"
import Footer from "./components/Footer";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage"
import CreateSalePage from "./components/CreateSalePage";
import EditSalePage from "./components/EditSalePage"
import CreateEventNavBar from "./components/CreateEventNavBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user)
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
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/create-event">
            <CreateEventNavBar user={sessionUser}/>
            <CreateSalePage />
          </Route>
          <Route exact path="/sales/:id">
            <Navigation isLoaded={isLoaded} />
            <SalePage />
          </Route>
          <Route path="/sales/:id/edit">
            <CreateEventNavBar user={sessionUser}/>
            <EditSalePage />
          </Route>
        </Switch>
          <Footer />
      </>
      );
}

export default App;
