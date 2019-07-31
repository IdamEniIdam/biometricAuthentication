import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";

export default class VerifyUserID extends React.Component {
  constructor(props) {
    super(props);
    this.stat = false
    this.state = {
      note: "",
      status: "",
      backshow: "none",
      nextshow: "none",
      loginshow: "none",
    };
  }
  static navigationOptions = {
    headerLeft: null,
    header: null,
    cardStack: {
      gesturesEnabled: false
    },
    gesturesEnabled: false,      
    headerBackTitle: "Back"

  };

  componentDidMount() {
    stat = this.props.navigation.getParam("status", false);
    not = this.props.navigation.getParam("note", "");

    if (stat == 0) {
      this.setState({
        status: "AUTHENTICATED",
        note:
          "The Validation was a complete success!\n\nPlease click on 'Next to complete your setup'",
        nextshow: "flex"
      });
    } else if(stat == -1) {
      this.setState({
        status: "Oops!",
        note:
          not+ " Kindly validate your entry and try agin.)",
        backshow: "flex"
      });
    }else if(stat == -2) {
      this.setState({
        status: "Oops!",
        note:
          "Your submission returned an error. Kindly try again later.",
          backshow: "flex"
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <ProxHeader /> */}
        <Text>{"\n"}</Text>
        <Text style={styles.welcome}>
          {this.state.status}
          
        </Text>
        <Text>{"\n"}</Text>
        <Text style={styles.otherText}>
          {this.state.note}
          {"\n"}
        </Text>
        <View style={styles.stepContainer}>
          <TouchableHighlight
            style={[{ display: this.state.backshow }, styles.touchCont]}
            onPress={() => {
              this.props.navigation.navigate("GetUserID");
            }}
          >
            <Text style={styles.touchText}>Go Back</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[{ display: this.state.nextshow }, styles.touchCont]}
            onPress={() => {
              this.props.navigation.navigate("securityPin");
            }}
          >
            <Text style={styles.touchText}>Next</Text>
          </TouchableHighlight>   
          <TouchableHighlight
            style={[{ display: this.state.loginshow }, styles.touchCont]}
            onPress={() => {
              this.props.navigation.navigate("LoginPin");
            }}
          >
            <Text style={styles.touchText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { margin: 16 },
  welcome: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },
  otherText: {
    fontSize: 20
  },
  imageView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  headerNimc: {
    aspectRatio: 1.5,
    height: 135,
    resizeMode: "center"
  },
  continueBtnb: { backgroundColor: "black" },
  touchCont: {
    padding: 8,
    borderColor: "#f5f5f5",
    borderWidth: 0.7,
    borderRadius: 10
  },
  touchText: {
    textAlign: "center"
  }
});