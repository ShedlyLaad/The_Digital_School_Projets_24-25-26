import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import MainNavigator from './navigation/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      {/* <Stack.Screen name="Main" component={MainNavigator} /> */}
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;