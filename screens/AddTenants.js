import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  TextInput,
  TouchableHighlight
} from "react-native";
import axios from "axios";

const token = AsyncStorage.getItem("token");

export class AddTenants extends Component {
  state = {
    fullname: "",
    mobile: "",
    email: "",
    address: "",
    last_payment_date: "",
    payment_expiry_date: "",
    num_years_paid_for: "",
    errMessage: null
  };

  onAddTenant = e => {
    e.preventDefault();
    const {
      fullname,
      mobile,
      address,
      last_payment_date,
      payment_expiry_date,
      num_years_paid_for,
      errMessage
    } = this.state;
    const {
      navigation: {
        state: {
          params: { property }
        }
      }
    } = this.props;
    if (address.length < 10) {
      this.setState({ errMessage: "please enter address" });
    }
    if (fullname.length < 5) {
      this.setState({ errMessage: "please enter fullname" });
    }
    if (mobile.length < 1) {
      this.setState({
        errMessage: "mobile number field cannot be empty"
      });
    }
    if (last_payment_date.length < 5) {
      this.setState({
        errMessage: "enter last payment date"
      });
    }
    if (payment_expiry_date.length < 5) {
      this.setState({
        errMessage: "please enter payment expiry date"
      });
    }
    if (num_years_paid_for.length < 1) {
      this.setState({
        errMessage: "please enter number of years paid for"
      });
    }
    if (errMessage === null) {
      axios
        .post(
          `https://chattel.herokuapp.com/api/v1/create-tenant/${property.id}`,
          {
            address,
            fullname,
            mobile,
            last_payment_date,
            payment_expiry_date,
            num_years_paid_for
          },
          {
            headers: {
              token: token._55
            }
          },
          this.setState({ loading: true })
        )
        .then(res => {
          console.log(res);
          this.setState({
            loading: false
          });
          if (res.status === 201) {
            this.props.navigation.navigate("view_property");
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
            <Text style={styles.subText}>ADD TENANT</Text>
            {/* <View style={styles.upload}>
                  <Button title="+ Add Image" />
                </View> */}
            <Text style={{ color: "red" }}>{errMessage}</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Full Name"
                onChangeText={fullname => this.setState({ fullname })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                keyboardType="phone-pad"
                placeholder="Mobile Number"
                onChangeText={mobile => this.setState({ mobile })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Address"
                onChangeText={address => this.setState({ address })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Last Payment Date"
                onChangeText={last_payment_date =>
                  this.setState({ last_payment_date })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Payment Expiry Date"
                onChangeText={payment_expiry_date =>
                  this.setState({ payment_expiry_date })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Number of Years Paid For"
                onChangeText={num_years_paid_for =>
                  this.setState({ num_years_paid_for })
                }
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.onAddTenant}
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

export default AddTenants;
