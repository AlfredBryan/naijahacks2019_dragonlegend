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
  ScrollView
} from "react-native";

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      type: ""
    };
  }
  render() {
    const { gender, type } = this.state;
    return (
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.headerText}>Chattel</Text>

            <Image
              style={styles.image}
              source={require("../assets/slide1.png")}
              alt="bg_img"
            />
            <Text style={styles.subText}>Register</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="First Name"
                keyboardType="fname"
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
                <Picker.Item label="Tenant" value="tenant" />
                <Picker.Item label="Vendor" value="vendor" />
              </Picker>
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
              onPress={() => this.onClickListener("login")}
            >
              <Text style={styles.loginText}>Register</Text>
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
  }
});

export default SignUpScreen;
