import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import axios from "axios";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      errMessage: null
    };
  }

  onLogin = e => {
    e.preventDefault();
    const { email, password, errMessage } = this.state;
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
    if (errMessage === null) {
      this.setState({ loading: true });
      axios
        .post("https://chattel.herokuapp.com/api/v1/login", {
          email,
          password
        })
        .then(res => {
          this.setState({ loading: false });
          if (res.status === 200) {
            console.log(res.data.data.token);
            AsyncStorage.setItem("token", res.data.data.token);
            this.props.navigation.navigate("main");
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const { loading, errMessage } = this.state;
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
            <Text>{errMessage}</Text>
            <Text style={styles.subText}>LOGIN</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
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
              onPress={this.onLogin}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate("signup")}
            >
              <Text style={{ textAlign: "center" }}>
                Don't have an account?
                <Text style={{ textAlign: "center", color: "blue" }}>
                  Register instead
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
    marginBottom: 12,
    color: "black",
    fontSize: 18
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: 35
  }
});

export default LoginScreen;
