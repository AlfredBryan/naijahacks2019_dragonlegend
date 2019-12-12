import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Image } from "react-native";

import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AddPropertyScreen from "./screens/AddProperty";
import ViewPropertyScreen from "./screens/ViewProperty";
import AddTenantsScreen from "./screens/AddTenants";

const SwitchTabs = createSwitchNavigator({
  add_property: { screen: AddPropertyScreen },
  view_property: { screen: ViewPropertyScreen },
  add_tenants: { screen: AddTenantsScreen }
});

const AuthTabs = createSwitchNavigator({
  login: { screen: LoginScreen },
  signup: { screen: SignUpScreen }
});

const MainNavigator = createBottomTabNavigator(
  {
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthTabs },
    main: {
      screen: createBottomTabNavigator(
        {
          home: { screen: HomeScreen },
          profile: { screen: ProfileScreen },
          property: {
            screen: SwitchTabs,
            navigationOptions: {
              tabBarLabel: "PROPERTY",
              tabBarIcon: () => {
                return (
                  <Image
                    source={require("./assets/property.jpg")}
                    style={{ width: 26, height: 26, borderRadius: 20 }}
                  />
                );
              }
            }
          }
        },
        {
          tabBarOptions: {
            activeTintColor: "white",
            inactiveTintColor: "white",
            activeBackgroundColor: "blue",
            style: {
              backgroundColor: "#2F80ED"
            },
            labelStyle: {
              fontSize: 13
            }
          }
        }
      )
    }
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false
    },
    lazy: true
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
