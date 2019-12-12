import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { Card, ListItem, Button, Icon } from "react-native-elements";

const token = AsyncStorage.getItem("token");

export default class Home extends React.Component {
  state = {
    properties: []
  };
  static navigationOptions = {
    title: "HOME",
    tabBarIcon: () => {
      return (
        <Image
          source={require("../assets/homeicon.jpg")}
          style={{ width: 26, height: 26, borderRadius: 20 }}
        />
      );
    }
  };

  componentDidMount() {
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
  }

  render() {
    const { properties } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          {properties.length < 1 ? (
            <View style={{ marginTop: 100 }}>
              <Card
                title="PROPERTIES PAGE"
                image={require("../assets/property.jpg")}
              >
                <Text style={{ marginBottom: 10, textAlign: "center" }}>
                  No properties added yet please go to add properties
                </Text>
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
              </Card>
            </View>
          ) : (
            properties.map(property => (
              <View key={property.id}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("view_property", {
                      property
                    })
                  }
                  style={styles.pCard}
                >
                  <Image
                    style={styles.image}
                    source={require("../assets/pimage.png")}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 22,
                      fontWeight: "bold"
                    }}
                  >
                    {property.property_type}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "200",
                      overflow: "scroll"
                    }}
                  >
                    {property.address}
                  </Text>
                </TouchableOpacity>

                {/* <Button
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                  }}
                  onPress={() => this.props.navigation.navigate("message")}
                  title="MESSAGE"
                /> */}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  pCard: {
    width: 300,
    height: 220,
    marginTop: 50,
    backgroundColor: "white",
    elevation: 10
  },
  image: {
    width: 300,
    height: 170
  }
});
