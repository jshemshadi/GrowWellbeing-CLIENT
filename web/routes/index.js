import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Appointments from "../screens/appointments";
import GP_appointments from "../screens/GP_appointments";
import Dashboard from "../screens/dashboard";
import Messages from "../screens/messages";
import Notifications from "../screens/notifications";
import Profile from "../screens/profile";
import MyAccount from "../screens/myAccount";

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/myAccount" component={MyAccount} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/appointments" component={Appointments} />
      <Route exact path="/GPappointments" component={GP_appointments} />
      <Route exact path="/notifications" component={Notifications} />
      <Route exact path="/messages" component={Messages} />
    </Switch>
  </>
);

export default Routes;
