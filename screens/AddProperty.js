import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Platform
} from "react-native";
import axios from "axios";

const token = AsyncStorage.getItem("token");

export class AddProperty extends Component {
  state = {
    address: "",
    property_type: "",
    num_apartment: "",
    num_bathroom: "",
    rentage_amount: "",
    errMessage: null,
    loading: false
  };

  static navigationOptions = {
    title: "ADD PROPERTY",
    tabBarIcon: () => {
      return (
        <Image
          source={require("../assets/property.jpg")}
          style={{ width: 26, height: 26, borderRadius: 20 }}
        />
      );
    }
  };

  onAddProperty = e => {
    e.preventDefault();
    const {
      address,
      property_type,
      num_apartment,
      num_bathroom,
      rentage_amount,
      errMessage
    } = this.state;

    if (address.length < 10) {
      this.setState({ errMessage: "please enter address" });
    }
    if (property_type.length < 5) {
      this.setState({ errMessage: "please enter property type" });
    }
    if (num_apartment.length < 1) {
      this.setState({
        errMessage: "Apartment number field cannot be empty"
      });
    }
    if (num_bathroom.length < 1) {
      this.setState({
        errMessage: "enter number of bathrooms"
      });
    }
    if (rentage_amount.length < 4) {
      this.setState({
        errMessage: "please enter rent amount"
      });
    }
    if (errMessage === null) {
      axios
        .post(
          "https://chattel.herokuapp.com/api/v1/create-property",
          {
            address,
            property_type,
            num_apartment,
            num_bathroom,
            rentage_amount
          },
          {
            headers: {
              token: token._55
            }
          },
          this.setState({ loading: true })
        )
        .then(res => {
          this.setState({
            loading: false
          });
          if (res.status === 201) {
            this.props.navigation.navigate("home");
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            loading: false
          });
        });
    }
  };

  render() {
    const { errMessage, loading } = this.state;
    const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.subText}>ADD PROPERTY</Text>
            {/* <View style={styles.upload}>
              <Button title="+ Add Image" />
            </View> */}
            <Text style={{ color: "red" }}>{errMessage}</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Property Type"
                onChangeText={property_type => this.setState({ property_type })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                keyboardType="phone-pad"
                placeholder="Number of Apartment"
                onChangeText={num_apartment => this.setState({ num_apartment })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                keyboardType="phone-pad"
                placeholder="Number of Bathrooms"
                onChangeText={num_bathroom => this.setState({ num_bathroom })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Rentage Amount"
                keyboardType="phone-pad"
                onChangeText={rentage_amount =>
                  this.setState({ rentage_amount })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Address"
                onChangeText={address => this.setState({ address })}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.onAddProperty}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginText}>Create</Text>
              )}
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#F2F2F2",
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    color: "black",
    borderRadius: 5
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "black",
    flex: 1
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 5
  },
  loginButton: {
    backgroundColor: "#2F80ED",
    elevation: 10
  },
  loginText: {
    color: "white"
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25
  },
  subText: {
    marginBottom: 2,
    color: "black",
    fontSize: 18,
    marginTop: 120,
    paddingTop: 20
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: 35
  },
  spinnerTextStyle: {
    color: "#FFF"
  },
  upload: {
    width: 200,
    height: 150,
    backgroundColor: "#F2F2F2"
  }
});

export default AddProperty;
