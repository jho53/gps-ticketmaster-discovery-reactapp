import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import EventComponent from "./components/EventComponent";
import EventWebView from "./components/EventWebView";
import EventDetails from "./components/EventDetails";

const EventStack = createStackNavigator(
  {
    EventHome: {
      screen: EventComponent,
      navigationOptions: {
        headerShown: false
      }
    },
    EventDetails: {
      screen: EventDetails,
      navigationOptions: {
        title: "Back to Events"
      }
    },
    EventWebView: {
      screen: EventWebView,
      navigationOptions:{
        title: "Back to Event Details"
      }
    }
  },
  {
    initialRouteName: "EventHome",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#019CDE"
      },
      headerTintColor: "white"
    }
  }
);

const EventNavigation = createAppContainer(EventStack);

export default function App() {
  return <EventNavigation />;
}
