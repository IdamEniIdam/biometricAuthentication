
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  AsyncStorage,
  Image,
  Card
} from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';
import DropdownAlert from 'react-native-dropdownalert';
import Header from "../components/header";
import Footer from "../components/footer";
export default class Biometrics extends Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    }
})
  state = {
    allowFinger: '',
    compatible: false,
    fingerprints: false,
    getUserId: ''
  };

 async componentDidMount() {
    this.checkDeviceForHardware();
    this.getValueFunction()  
  }

  getValueFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('UserId').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ getUserId: value })
      //Setting the value in Text 
    );
  };

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
    if (!compatible) {
      this.showIncompatibleAlert();
    }
  };

  showIncompatibleAlert = () => {
    this.dropdown.alertWithType(
      'error',
      'Incompatible Device',
      'Current device does not have the necessary hardware to use this use this Biometries authentication.'
    );
  };

  checkForBiometrics = async () => {
    let biometricRecords = await Expo.Fingerprint.isEnrolledAsync();
    if (!biometricRecords) {
      this.dropdown.alertWithType(
        'warn',
        'No Biometrics Found',
        'Please ensure you have set up biometrics in your OS settings.'
      );
 
    } else {
      this.handleLoginPress();
    }
  };
  
  handleLoginPress = () => {
    if (Platform.OS === 'android') {
      this.showAndroidAlert();
    } else {
      this.scanBiometrics();
    }
  };

  showAndroidAlert = () => {
    this.dropdown.alertWithType(
      'message',
      'Fingerprint Scan!',
      'Place your finger over the touch sensor.'
    );
    this.scanBiometrics();
    AsyncStorage.setItem('fingerAllow', this.state.allowFinger);
      console.log(this.scanBiometrics())
      this.props.navigation.navigate("UserIDSetUp");
  };

  scanBiometrics = async () => {
    let result = await LocalAuthentication.authenticateAsync('Biometric Scan.');
    if (result.success) {
      this.dropdown.alertWithType(
        'success',
        'You are you!',
        'Bio-Authentication succeeded.'
      );
      console.log(result)
    } else {
      this.dropdown.alertWithType(
        'error',
        'Uh oh!',
        'Bio-Authentication failed or canceled.'
      );
    }
  };


// async _scanFinger() {
//   if (Platform.OS === 'ios') {
//       let result = await Expo.Fingerprint.authenticateAsync(I18n.t('fingerprintPromptTxt'));
//       if (result.success) {
//           await this._redirectOnAuthenticated();
//           return;
//       } else {
//           this.setState({fingerprintFailedMsg: result.error, showFingerBtn: true,})
//       }
//   } else {
//       let result = await Expo.Fingerprint.authenticateAsync();
//       if (result.success) {
//           await this._redirectOnAuthenticated();
//           return;
//       }

//       this.setState({
//           fingerprintAndroidFailed: true,
//           showFingerBtn: true,
//           fingerprintFailedMsg: I18n.t('fingerprintFailedMsg')
//       })
//   }
// }


// async componentDidMount() {
//   const fingerprint = await AsyncStorage.getItem('Fingerprint');
//   if (fingerprint === 'true') {
//       await this._scanFinger();
//   }
// }

// async componentWillMount() {
//   let fingerprintSupport = await checkFingerprintSupport();
//   this.setState({ fingerprintSupport });
// }

  render() {
    return (
      <View style={styles.container}>
      <View>
      <Header />

      </View>

          <View style={styles.subContainer}>

          <Text style={{fontSize: 25}}>
              Your UserID is: <Text style={{color: 'green'}}>{this.state.getUserId}</Text>
              </Text>

          <Text>{"\n"}</Text>
               <Text style={{textAlign: 'center', fontSize: 15}}>
              Please place your fingerprint over the touch sensor {"\n"}  for proper fingerprint scanning.
               </Text>
               <Text>{"\n"}</Text>
               <Text>{"\n"}</Text>

             

        <TouchableOpacity
          value={this.state.allowFinger}
          onValueChange={() => {
            this.setState(
              { allowFinger: !this.state.allowFinger },
              () => {
                AsyncStorage.setItem(
                  "fingerAllow",
                  this.state.allowFinger + ""
                );
              }
            );
          }}
          onPress={this.showAndroidAlert}
          style={styles.button}>
          <Image
            style={{borderRadius: 50}} source={require("../assets/images/fingerprintscanning.jpeg")}
          />
           
        </TouchableOpacity>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text style={{fontWeight: 'bold'}}>Fingerprint Scan</Text>
        </View>
      

        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          closeInterval={5000}
        />

<Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});



