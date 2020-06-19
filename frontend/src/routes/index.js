import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '~/pages/Login';
import Deliveries from '~/pages/Deliveries';
import Deliverymen from '~/pages/Deliverymen';
import Recipients from '~/pages/Recipients';
import Problems from '~/pages/Problems';

import DeliveryEdit from '~/pages/DeliveryEdit';
import DeliverymanEdit from '~/pages/DeliverymanEdit';
import RecipientForm from '~/pages/RecipientForm';

export default function Routes() {
  return (
    <Switch>
      <Route component={Login} path="/" exact />
      <Route component={Deliveries} path="/deliveries" exact isPrivate />
      <Route component={Deliverymen} path="/deliverymen" exact isPrivate />
      <Route component={Recipients} path="/recipients" exact isPrivate />
      <Route component={DeliveryEdit} path="/deliveries/create" isPrivate />
      <Route component={DeliveryEdit} path="/deliveries/:id/edit" isPrivate />
      <Route component={DeliverymanEdit} path="/deliverymen/create" isPrivate />
      <Route
        component={DeliverymanEdit}
        path="/deliverymen/:id/edit"
        isPrivate
      />
      <Route component={RecipientForm} path="/recipients/create" isPrivate />
      <Route component={RecipientForm} path="/recipients/:id/edit" isPrivate />
      <Route component={Problems} path="/problems" isPrivate />
    </Switch>
  );
}
