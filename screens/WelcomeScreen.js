import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  View,
  Image,
  Text,
  Alert,
  Button
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },
  text: {
    color: "black",
    fontSize: 18
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain"
  }
});

const slides = [
  {
    key: "k1",
    title: "Chattel",
    text: "Manage your properties right on your mobile phone",
    image: require("../assets/slide1.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: "white"
  },
  {
    key: "k2",
    title: "Chattel",
    text: "Manage your tenants and set auto reminder for rents",
    image: require("../assets/slide2.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: "white"
  },
  {
    key: "k3",
    title: "Chattel",
    text: "Start managing your properties now",
    image: require("../assets/slide3.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: "white"
  }
];

export default class WelcomeScreen extends Component {
  on_Done_all_slides = () => {
    this.props.navigation.navigate("signup");
  };

  on_Skip_slides = () => {
    this.props.navigation.navigate("signup");
  };

  onSkip = () => {
    return (
      <View>
        <Text
          style={{ color: "black", marginTop: 10, textAlign: "center" }}
          onPress={() => this.props.navigation.navigate("signup")}
        >
          Skip
        </Text>
      </View>
    );
  };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this.on_Done_all_slides}
        onSkip={this.on_Skip_slides}
        showSkipButton={true}
        bottomButton={true}
        activeDotStyle={{ backgroundColor: "#2F80ED" }}
        buttonStyle={{
          borderRadius: 25,
          marginLeft: 10,
          backgroundColor: "#2F80ED"
        }}
        doneLabel="Get Started"
        renderSkipButton={this.onSkip}
      />
    );
  }
}
