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
  Picker,
  Button
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
      eventArr: [],
      searchTerm: "",
      radiusValue: "50",
      qualityValue: 1000
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

  getData(currentGeoHash, radius = 50, keyword = "") {
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?" +
      `geoPoint=${currentGeoHash}` +
      "&size=25" +
      "&unit=km" +
      "&includeTBA=no" +
      `&radius=${radius}` +
      `&keyword=${keyword}` +
      "&apikey=OC8LnDmVffkD5P1otAUbYqxGhOu5e6V7"
    )
      .then(response => response.json())
      .then(responseJson => {
        let eventList = [];
        let eventPrices = [];

        for (let i = 0; i < responseJson._embedded.events.length; i++) {
          eventList.push(responseJson._embedded.events[i]);
          eventPrices.push(responseJson._embedded.events[i].priceRanges);
        }
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
    var isLoading = this.state.isLoading;

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
            <TextInput
              style={styles.textInputBox}
              placeholder=" Search..."
              onSubmitEditing={event => {
                try {
                  this.setState({ searchTerm: event.nativeEvent.text })
                  this.getData(this.state.geohashLocation, this.state.radiusValue, event.nativeEvent.text)
                } catch (error) {
                  console.log(error)
                }
              }}
            ></TextInput>
            <View style={styles.optionStyle}>
              <Picker
                style={{ height: 20 }}
                selectedValue={this.state.radiusValue}
                onValueChange={itemValue => {
                  this.setState({ radiusValue: itemValue });
                  this.getData(this.state.geohashLocation, itemValue, this.state.searchTerm);
                }}
              >
                <Picker.Item label="50 KM" value="50" />
                <Picker.Item label="25 KM" value="25" />
                <Picker.Item label="10 KM" value="10" />
                <Picker.Item label="5 KM" value="5" />
              </Picker>
            </View>

          </View>
          <FlatList
            data={this.state.eventArr}
            extraData={this.state.eventArr}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("EventDetails", {
                    eventUrl: item.url,
                    item: item
                  });
                }}
              >
                <Card
                  image={{ uri: this._findHighResPicture(item, this.state.qualityValue) }}
                  imageStyle={{
                    width: 200,
                    height: 200
                  }}
                  title={item.name}
                >
                  <View>
                    {this._priceRangesVerify(item)}
                    <Text>
                      {item._embedded.venues[0].address.line1},{" "}
                      {item._embedded.venues[0].name} in{" "}
                      {item._embedded.venues[0].city.name},{" "}
                      {item._embedded.venues[0].state.stateCode}
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
        </View >
      );
    }
  }
}
