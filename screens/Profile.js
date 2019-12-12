import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  AsyncStorage,
  Button
} from "react-native";
import axios from "axios";
import { Block, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const token = AsyncStorage.getItem("token");

export default class Profile extends React.Component {
  state = {
    profile: "",
    properties: []
  };
  static navigationOptions = {
    title: "PROFILE",
    tabBarIcon: () => {
      return (
        <Image
          source={require("../assets/profileicon.png")}
          style={{ width: 26, height: 26, borderRadius: 20 }}
        />
      );
    }
  };

  componentDidMount() {
    this.viewProfile();
    this.viewProperties();
  }
  viewProfile = () => {
    axios
      .get("https://chattel.herokuapp.com/api/v1/profile", {
        headers: {
          token: token._55
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ profile: res.data.data.profile });
        }
      })
      .then(error => {
        console.log(error);
      });
  };

  viewProperties = () => {
    axios
      .get("https://chattel.herokuapp.com/api/v1/properties", {
        headers: {
          token: token._55
        }
      })
      .then(res => {
        this.setState({ properties: res.data.data.properties });
      })
      .catch(error => {
        console.log(error);
      });
  };

  logOut = () => {
    AsyncStorage.clear("token");
    this.props.navigation.navigate("login");
  };

  render() {
    const { profile, properties } = this.state;
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={require("../assets/pimg.png")}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}
          >
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="black" size={28} style={{ paddingBottom: 8 }}>
                  {profile.fname} {profile.lname}
                </Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">
                        Typ
                      </Text>
                    </Block>
                    <Text color="black" size={16} muted style={styles.seller}>
                      {profile.type}
                    </Text>
                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                      Mobile
                    </Text>
                  </Block>
                  <Block>
                    <Text color={theme.COLORS.MUTED} size={16}>
                      <Icon
                        name="map-marker"
                        color={theme.COLORS.MUTED}
                        size={16}
                      />
                      {profile.mobile}
                    </Text>
                  </Block>
                </Block>
              </Block>
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                style={styles.gradient}
              />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE }}>
              <Block middle>
                <Button
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                  }}
                  onPress={() => this.props.navigation.navigate("add_property")}
                  title="ADD PROPERTY"
                />
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>
                  {properties.length}
                </Text>
                <Text muted size={12}>
                  Properties
                </Text>
              </Block>
              <Block middle>
                <Button
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                  }}
                  onPress={this.logOut}
                  title="LogOut"
                />
              </Block>
            </Block>
            <Block
              row
              space="between"
              style={{ paddingVertical: 16, alignItems: "baseline" }}
            >
              <Text size={16}>Properties</Text>
              <Text
                size={12}
                color={theme.COLORS.PRIMARY}
                onPress={() => this.props.navigation.navigate("home")}
              >
                View All
              </Text>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block row space="between" style={{ flexWrap: "wrap" }}>
                {properties.map((img, imgIndex) => (
                  <Image
                    source={require("../assets/pimage.png")}
                    resizeMode="cover"
                    key={img.id}
                    style={styles.thumb}
                  />
                ))}
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2
  },
  profileImage: {
    width: width * 1.1,
    height: "auto"
  },
  profileContainer: {
    width: width,
    height: height / 2
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative"
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute"
  }
});
