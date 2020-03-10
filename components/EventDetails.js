import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Divider } from "react-native-elements";
import { EvilIcons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
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
      var min = item.priceRanges[0].min;
      var max = item.priceRanges[0].max;

      if (min == max) {
        return (
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              size={20}
              color={"grey"}
              name="ticket"
              style={{ marginVertical: 2.5, marginHorizontal: 2 }}
            />
            <Text style={styles.iconText}>${min.toFixed(2)}</Text>
          </View>
        );
      } else {
        return (
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              size={20}
              color={"grey"}
              name="ticket"
              style={{ marginVertical: 2.5, marginHorizontal: 2 }}
            />
            <Text style={styles.iconText}>
              ${min.toFixed(2)} to ${max.toFixed(2)}
            </Text>
          </View>
        );
      }
    } catch (e) {
      return (
        <View style={{ flexDirection: "row" }}>
          <FontAwesome
            size={20}
            color={"grey"}
            name="ticket"
            style={{ marginVertical: 2.5, marginHorizontal: 2 }}
          />
          <Text style={styles.iconText}>Price TBA</Text>
        </View>
      );
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

  _createDivider() {
    return <Divider style={{ backgroundColor: "black", margin: 10 }} />;
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
              height: "auto",
              flex: 1
            }}
            source={{
              uri: this._findHighResPicture(item, this.state.qualityValue)
            }}
          />
          <View style={{ flex: 1.5 }}>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <EvilIcons
                size={25}
                color={"grey"}
                name="location"
                style={{ marginVertical: 2.5 }}
              />
              <Text style={styles.iconText}>
                {item._embedded.venues[0].address.line1} at{" "}
                {item._embedded.venues[0].name},{" "}
                {item._embedded.venues[0].city.name}{" "}
                {item._embedded.venues[0].state.stateCode}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                size={20}
                color={"grey"}
                name="gps-fixed"
                style={{ marginVertical: 2.5, marginHorizontal: 2 }}
              />
              <Text style={styles.iconText}>
                {item._embedded.venues[0].distance} km from your location
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <EvilIcons
                size={25}
                color={"grey"}
                name="calendar"
                style={{ marginVertical: 2.5 }}
              />
              <Text style={styles.iconText}>
                {item.dates.start.localDate}{" "}
                {item.dates.start.localTime
                  ? "at " + item.dates.start.localTime
                  : "| All Day Event"}
              </Text>
            </View>
            {this._priceRangesVerify(item)}

            {/** End of Essential Info */}
            {this._createDivider()}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 25
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("EventWebView", {
                    eventUrl: item.url
                  });
                }}
              >
                <View style={styles.buttonStyle}>
                  <Text style={{ fontSize: 15, color: "white" }}>
                    Purchase Tickets
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
