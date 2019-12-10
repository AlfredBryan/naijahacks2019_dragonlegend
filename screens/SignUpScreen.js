import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Picker
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
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.headerText}>JOIN CHATTEL</Text>
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
        <Text style={{ color: "white", paddingBottom: 2 }}>GENDER</Text>
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
        <Text style={{ color: "white", paddingBottom: 2 }}>STATUS</Text>
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
          onPress={() => this.props.navigation.navigate("signup")}
        >
          <Text style={{ textAlign: "center", color: "blue" }}>
            Don't have an account? Register
          </Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8734c7"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
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
    width: 150,
    borderRadius: 20
  },
  loginButton: {
    backgroundColor: "#6510b0",
    elevation: 10
  },
  loginText: {
    color: "white"
  },
  headerText: {
    marginBottom: 40,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20
  }
});

export default SignUpScreen;
