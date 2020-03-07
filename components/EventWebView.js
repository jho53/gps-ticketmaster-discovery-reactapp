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

export default class EventWebView extends Component {
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

  static navigationOptions = ({ navigation }) => {
    const title = "Back to Events";

    return {
      title: title,
      headerStyle: {
        backgroundColor: "#019CDE"
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  render() {
    const { navigation } = this.props;
    const isLoading = this.state.isLoading;
    if (isLoading) {
      return (
        <View style={styles.globalLoading}>
          <ActivityIndicator size="large" color="#019CDE"></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <WebView
          startInLoadingState="true"
          renderLoading={() => {
            <ActivityIndicator />;
          }}
          source={{
            uri: navigation.getParam("eventUrl")
          }}
        />
      );
    }
  }
}
