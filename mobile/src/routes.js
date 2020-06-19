import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Sign from './pages/Sign';
import Dashboard from './pages/Dashboard';
import DeliveryDetails from './pages/DeliveryDetails';
import ReportProblem from './pages/ReportProblem';
import ListProblems from './pages/ListProblems';
import ConfirmDelivery from './pages/ConfirmDelivery';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const deliveryStackScreenOptions = {
  title: 'Detalhes da Encomenda',
  headerTintColor: '#fff',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#7D40E7',
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 16,
  },
};

function DeliveryStack() {
  return (
    <Stack.Navigator screenOptions={deliveryStackScreenOptions}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{ title: 'Detalhes da encomenda' }}
      />
      <Stack.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={{ title: 'Informar problema' }}
      />
      <Stack.Screen
        name="ListProblems"
        component={ListProblems}
        options={{ title: 'Visualizar problemas' }}
      />
      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={{ title: 'Confirmar entrega' }}
      />
    </Stack.Navigator>
  );
}

export default function Routes({ signed }) {
  return (
    <NavigationContainer>
      {!signed ? (
        <>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="SignIn" component={Sign} />
          </Stack.Navigator>
        </>
      ) : (
        <Tabs.Navigator
          headerMode="none"
          tabBarOptions={{
            activeTintColor: '#7D40E7',
            inactiveTintColor: '#999999',
            labelStyle: {
              fontSize: 14,
            },
          }}
        >
          <Tabs.Screen
            name="Entregas"
            component={DeliveryStack}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="menu" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Meu perfil"
            component={Profile}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="account-circle" size={24} color={color} />
              ),
            }}
          />
        </Tabs.Navigator>
      )}
    </NavigationContainer>
  );
}
