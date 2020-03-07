import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from "react-native";
import { WebView } from "react-native-webview";

import styles from "../styles/stylesheet";

export default class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  _priceRangesVerify(item) {
    try {
      return (
        <Text>
          {item.priceRanges[0].min} - {item.priceRanges[0].max}
        </Text>
      );
      throw new Error("Price TBA");
    } catch (e) {
      return <Text>Price TBA</Text>;
    }
  }

  render() {
    const { navigation } = this.props;
    const isLoading = this.state.isLoading;
    const item = navigation.getParam("item", {});

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#1D2D5C"></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              flex: 1
            }}
            source={{ uri: item.images[1].url }}
          />
          <View style={{ flex: 1.5 }}>
            <Text>{item.name}</Text>
            {this._priceRangesVerify(item)}
            <Text>{item._embedded.venues[0].address.line1}</Text>
            <Text>
              {item._embedded.venues[0].name} in{" "}
              {item._embedded.venues[0].city.name},{" "}
              {item._embedded.venues[0].state.stateCode}
            </Text>
            <Text>
              {item._embedded.venues[0].distance} km from your location
            </Text>
            <Text>
              Starting {item.dates.start.localDate} at{" "}
              {item.dates.start.localTime}
            </Text>
          </View>
        </View>
      );
    }
  }
}
