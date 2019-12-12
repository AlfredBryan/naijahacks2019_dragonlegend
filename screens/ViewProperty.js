import React, { Component } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Image,
  ScrollView,
  Button
} from "react-native";

const token = AsyncStorage.getItem("token");

export class ViewProperty extends Component {
  state = {
    property: "",
    tenants: []
  };
  getProperty = () => {
    const {
      navigation: {
        state: {
          params: { property }
        }
      }
    } = this.props;
    axios
      .get(`https://chattel.herokuapp.com/api/v1/property/${property.id}`, {
        headers: {
          token: token._55
        }
      })
      .then(res => {
        console.log(res.data.data);
        if (res.status === 200) {
          this.setState({
            property: res.data.data.property
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getTenants = () => {
    const {
      navigation: {
        state: {
          params: { property }
        }
      }
    } = this.props;

    axios
      .get(`https://chattel.herokuapp.com/api/v1/tenants/${property.id}`, {
        headers: {
          token: token._55
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ tenants: res.data.data.tenants });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getProperty();
    this.getTenants();
  }

  render() {
    const { property, tenants } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.pCard}>
            <Image
              source={require("../assets/viewimg.png")}
              style={styles.image}
            />
            <Text style={{ textAlign: "center", textTransform: "capitalize" }}>
              {property.property_type}
            </Text>
          </View>
          <View>
            <Text style={styles.tenantHeader}>Manage Tenants</Text>
            <View
              style={{
                elevation: 7,
                height: 300,
                width: 320,
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  backgroundColor: "#F2F2F2",
                  padding: 5,
                  borderRadius: 5
                }}
              >
                Tenant Name
              </Text>
              {tenants.map(tenant => (
                <Text
                  style={{ padding: 5, textTransform: "uppercase" }}
                  key={tenant.id}
                >
                  {tenant.fullname}
                </Text>
              ))}
            </View>
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              onPress={() =>
                this.props.navigation.navigate("add_tenants", { property })
              }
              title="NEW TENANT"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  pCard: {
    width: 320,
    height: 280,
    marginTop: 50,
    backgroundColor: "white",
    elevation: 5
  },
  image: {
    width: 320,
    height: 250
  },
  tenantHeader: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "100",
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ViewProperty;
