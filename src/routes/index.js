import React, { Suspense, lazy } from "react";
import { HashRouter as Switch, Route } from "react-router-dom";
const Home = lazy(() => import("../pages/Home"));
const FindActivity = lazy(() => import("../pages/FindActivity"));
const Activity = lazy(() => import("../pages/Activity"));
const NewActivity = lazy(() => import("../pages/NewActivity"));
const Login = lazy(() => import("../pages/Login"));
const Profile = lazy(() => import("../pages/Profile"));

const Routes = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/find-activity" component={FindActivity} />
        <Route path="/activity/:id" component={Activity} />
        <Route path="/new-activity" component={NewActivity} />
        <Route path="/login-page" component={Login} />
        <Route path="/profile-page" component={Profile} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
