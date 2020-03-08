import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import styles from "../styles/stylesheet";

export default class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      qualityValue: 1500
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  _priceRangesVerify(item) {
    try {
      var min = item.priceRanges[0].min
      var max = item.priceRanges[0].max

      if (min == max) {
        return (
          <Text>
            ${min.toFixed(2)}
          </Text>
        )
      }
      else {
        return (
          <Text>
            ${min.toFixed(2)} - ${max.toFixed(2)}
          </Text>
        );
      }
    } catch (e) {
      return <Text>Price TBA</Text>;
    }
  }

  _findHighResPicture(item, qualityValue) {
    let url = "";
    for (var i in item.images) {
      if (item.images[i].width > qualityValue) {
        return item.images[i].url;
      }
    }
    return url;
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
            source={{ uri: this._findHighResPicture(item, this.state.qualityValue) }}
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
          <View style={{ alignItems: "center", borderColor: "red", borderWidth: 2, bottom: 40 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EventWebView", {
                  eventUrl: item.url
                })
              }}
            >
              <View style={styles.buttonStyle}>
                <Text style={{ fontSize: 16, color: "white" }}>Purchase Tickets</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View >
      );
    }
  }
}
