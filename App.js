import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const MainNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: {
    screen: createBottomTabNavigator({
      login: { screen: LoginScreen },
      signup: { screen: SignUpScreen }
    })
  },
  main: {
    screen: createBottomTabNavigator({
      home: { screen: HomeScreen },
      profile: { screen: ProfileScreen }
    })
  }
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
