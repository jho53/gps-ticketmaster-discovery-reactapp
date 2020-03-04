import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image, FlatList, ActivityIndicator } from "react-native";
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

  _getLocationPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({ locationPermission: false });
    } else {
      this.setState({ locationPermission: true });
    }
  };

  getData(currentGeoHash) {
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?" +
        `geoPoint=${currentGeoHash}` +
        "&size=5" +
        "&apikey=OC8LnDmVffkD5P1otAUbYqxGhOu5e6V7"
    )
      .then(response => response.json())
      .then(responseJson => {
        let eventList = [];

        for (let i = 0; i < responseJson._embedded.events.length; i++) {
          eventList.push(responseJson._embedded.events[i].name);
        }
        console.log(eventList)
        return eventList;
      })
      .catch(error => {
        console.error(error);
      });
  }

  UNSAFE_componentWillMount() {
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

        this.setState({
          position: coordinates,
          geohashLocation: geohash,
          isLoading: false,
          eventArr: this.getData(geohash)
        });
      },
      error => alert(JSON.stringify(error))
    );
  }

  render() {
    var isLoading = this.state.isLoading;
    var geohash = this.state.geohashLocation;
    console.log(this.state.eventArr);

    if (isLoading) {
      return (
        <View style={styles.container}>
          <Image
            source={require("../assets/ticketmaster-splash.jpg")}
            style={styles.logo}
          />
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
          <FlatList style={{ borderWidth: 5, borderColor: "red" }} />
        </View>
      );
    }
  }
}
