import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ARPlaneScreen from '../screens/ar-plane-screen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ARPlaneScreen" component={ARPlaneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
