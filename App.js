import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import EventComponent from "./components/EventComponent";
import EventDetails from "./components/EventDetails";

const EventStack = createStackNavigator(
  {
    EventsHome: {
      screen: EventComponent,
      navigationOptions: {
        headerShown: false
      }
    },
    EventDetails: {
      screen: EventDetails
    }
  },
  {
    initialRouteName: "EventsHome"
  }
);

const EventNavigation = createAppContainer(EventStack);

export default function App() {
  return <EventNavigation />;
}
