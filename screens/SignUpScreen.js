import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Picker,
  Image,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Platform
} from "react-native";
import axios from "axios";

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      mobile: "",
      gender: "male",
      type: "property owner",
      loading: false,
      errMessage: null
    };
  }

  onSignUp = e => {
    e.preventDefault();
    const {
      fname,
      lname,
      email,
      password,
      mobile,
      gender,
      type,
      errMessage
    } = this.state;
    if (fname.length < 3) {
      this.setState({ errMessage: "please enter first name" });
    }
    if (lname.length < 3) {
      this.setState({ errMessage: "please enter last name" });
    }
    if (email.length < 5) {
      this.setState({
        errMessage: "email field cannot be empty"
      });
    }
    if (password.length < 6) {
      this.setState({
        errMessage: "password must be atleast 6 characters"
      });
    }
    if (mobile.length < 10) {
      this.setState({
        errMessage: "please enter phone number"
      });
    }
    if (errMessage === null) {
      this.setState({ loading: true });
      axios
        .post("https://chattel.herokuapp.com/api/v1/register", {
          fname,
          lname,
          email,
          password,
          mobile,
          gender,
          type
        })
        .then(res => {
          this.setState({ loading: false });
          if (res.status === 201) {
            AsyncStorage.setItem("token", res.data.data.token);
            this.props.navigation.navigate("main");
          }
        })
        .catch(error => {
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const { gender, type, loading, errMessage } = this.state;
    const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.headerText}>Chattel</Text>
            <Image
              style={styles.image}
              source={require("../assets/slide1.png")}
              alt="bg_img"
            />
            <Text style={{ color: "red" }}>{errMessage}</Text>
            <Text style={styles.subText}>SIGN UP</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="First Name"
                onChangeText={fname => this.setState({ fname })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Last Name"
                onChangeText={lname => this.setState({ lname })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Picker
                style={styles.inputs}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ gender: itemValue })
                }
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Picker
                style={styles.inputs}
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ type: itemValue })
                }
              >
                <Picker.Item label="Property Owner" value="property owner" />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                onChangeText={mobile => this.setState({ mobile })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.onSignUp}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginText}>Register</Text>
              )}
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate("login")}
            >
              <Text style={{ textAlign: "center" }}>
                Have an account?
                <Text style={{ textAlign: "center", color: "blue" }}>
                  Login instead
                </Text>
              </Text>
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
    fontSize: 18
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: 35
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

export default SignUpScreen;
