import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Picker
} from "react-native";
import { ListItem, Card } from "react-native-elements";
import * as Permissions from "expo";
import Geohash from "latlon-geohash";

import styles from "../styles/stylesheet";

export default class EventComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationPermission: "unknown",
      position: "unknown",
      geohashLocation: "unknown",
      isLoading: true,
      eventArr: []
    };
  }

  static navigationOption = {
    title: "Event Home"
  };

  _getLocationPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({ locationPermission: false });
    } else {
      this.setState({ locationPermission: true });
    }
  };

  getData(currentGeoHash, radius = 100) {
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?" +
        `geoPoint=${currentGeoHash}` +
        "&size=10" +
        "&unit=km" +
        `&radius=${radius}` +
        "&apikey=OC8LnDmVffkD5P1otAUbYqxGhOu5e6V7"
    )
      .then(response => response.json())
      .then(responseJson => {
        let eventList = [];

        for (let i = 0; i < responseJson._embedded.events.length; i++) {
          eventList.push(responseJson._embedded.events[i]);
        }

        console.log(eventList[0]);

        this.setState({ eventArr: eventList });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this._getLocationPermissions();
    navigator.geolocation.getCurrentPosition(
      position => {
        var geohash = "";
        let coordinates = `${position.coords.latitude}, ${position.coords.longitude}`;
        geohash = Geohash.encode(
          position.coords.latitude,
          position.coords.longitude,
          9
        );

        this.getData(geohash);

        this.setState({
          position: coordinates,
          geohashLocation: geohash,
          isLoading: false
        });
      },
      error => alert(JSON.stringify(error))
    );
  }

  render() {
    var isLoading = this.state.isLoading;
    var geohash = this.state.geohashLocation;

    if (isLoading) {
      return (
        <View
          style={{ justifyContent: "center", alignContent: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="#1D2D5C"></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image
            source={require("../assets/ticketmaster-splash.jpg")}
            style={styles.logo}
          />
          <View style={styles.searchNav}>
            <TextInput style={styles.textInputBox}></TextInput>
            <Picker style={styles.optionStyle}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
          <FlatList
            data={this.state.eventArr}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("EventDetails", {
                    eventUrl: item.url
                  });
                }}
              >
                <Card
                  image={{ uri: item.images[0].url }}
                  imageStyle={{
                    width: 200,
                    height: 200,
                    resizeMode: "cover"
                  }}
                >
                  <View>
                    <Text>{item.name}</Text>
                    <Text>
                      {item.priceRanges[0].min} - {item.priceRanges[0].max}
                    </Text>
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
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
  }
}
