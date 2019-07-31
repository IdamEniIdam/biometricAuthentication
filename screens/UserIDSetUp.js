
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import Header from "../components/header";



export default class UserIDSetUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step1: "#cfd8dc",
      step2: "#cfd8dc",
      step3: "#cfd8dc",
      step4: "#cfd8dc",
    };
    this.DoFourSteps = this.DoFourSteps.bind(this);
  }

 
  static navigationOptions = ({ navigate, navigation }) => ({
    header: null
  })

  DoFourSteps(){
  this.generateKeys()
    .then(response => {
      if(!response.error){
        
        AsyncStorage.setItem(
          "userIDbank",
          JSON.stringify(response)
        );
       
        this.connectNIMC()
          .then(this.verifyData)
          .then(this.waitFeedback)
          .then(() => {
            this.props.navigation.navigate("VerifyUserID", {status: 0});
          });
      }else if (response.error){
        this.props.navigation.navigate("VerifyUserID", {status: -1, note:response.error});
        }
      })
    .catch(
      (err) => {
        console.log(err)
        this.props.navigation.navigate("VerifyUserID", {status: -2})
      });
}

generateKeys = async () => {
  let n = await AsyncStorage.getItem("UserId", null);
  let m = await AsyncStorage.getItem('fingerAllow', null);
  // let url = "https://ws1.ibib.io:7071/prov?n="+ n + "&m=" + m;


return new Promise(async (resolve, reject) => {

  try{
    const provApiCall = await fetch(url);
    const provCall = await provApiCall.json();
    resolve(provCall);
  }catch(err){
    AsyncStorage.removeItem("UserId")
  AsyncStorage.removeItem("fingerAllow")
    reject(false);
  }

setTimeout(() => {
  this.setState({step1: "green"});
  resolve(true);
}, 200);
});
};



connectNIMC = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      this.setState({step2: "green"});
      resolve(true);
    }, 500)
  });
};

verifyData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      this.setState({step3: "green"});
      resolve(true);
    }, 1000)
  });
};

waitFeedback = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      this.setState({step4: "green"});
      resolve(true);
    }, 1000)
  });
};


  async componentDidMount() {
  this.DoFourSteps();
}

  render() {
    return (
      <View style={styles.container}>
          <View>
      <Header />

      </View>
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      
	
        <View style={styles.fence}>
          <View style={styles.stepContainer}>
            <Text style={[styles.otherText, { color: this.state.step1 }]}>
              Checking for User Information...
            </Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={[styles.otherText, { color: this.state.step2 }]}>
              Establishing secure connection...
            </Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={[styles.otherText, { color: this.state.step3 }]}>
              Authenticating User Biometric...
            </Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={[styles.otherText, { color: this.state.step4 }]}>
              Awaiting Feedback...
            </Text>
          </View>

          <View style={styles.stepContainerLast}>
            <Text style={{marginTop: 20}}>Please wait</Text>
            <Text>{"\n"}</Text>
            <ActivityIndicator size="large" color="#15745C" />
            <Text>{"\n"}</Text>
          </View>

          <View style={styles.stepContainer} />
          <View style={styles.stepContainer} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1,
     margin: 16 
    },
  otherText: {
    fontSize: 20
  },
  touchCont: {
    padding: 8,
    borderColor: "#f5f5f5",
    borderWidth: 0.7,
    borderRadius: 10
  },
  touchText: {
    textAlign: "center"
  },
  fence: {
    flex: 1,
    marginTop: 30
  },
  stepContainer: {
    flex: 1,
    flexDirection: "row"
  },
  stepContainerLast: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

