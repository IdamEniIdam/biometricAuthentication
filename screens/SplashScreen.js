
import React from 'react';
import { StyleSheet, Text, AsyncStorage, View, TextInput, Button, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Header from "../components/header";
import Footer from "../components/footer";


export default class SplashScreen extends React.Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    header: null
  })
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("BioSetupSteps");
      // this.props.navigation.navigate("DashBoard");
    }, 3000);
  } 
  
    
    render() {
      return (
        <View style={styles.container}>
          <View style={{ marginTop: 20}}>
          <Header />
          </View>
               <View style={styles.userID}>
             <Text>{"\n"}</Text>
        <Text style={styles.welcome}>Welcome!{"\n"}</Text>
        <Text style={styles.otherText}>
          To your Biometric App Setup
        </Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <View style={styles.imageView}>
          <Image
            style={styles.NimcPRINT}
            source={require("../assets/images/idfingerprint.jpg")}
          />
        </View>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text style={styles.otherText}>
           {"\n"}
           {"\n"}Presented by Common Identity
         </Text>
         <Text>{"\n"}</Text>
    
               
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
  userID: {
    // backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
   
  },
  inputTextStyle: {
    alignSelf: 'center'
  },
  headerNimc: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    resizeMode: "center"
  },
  NimcPRINT: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    resizeMode: "center",
    borderRadius: 50
  },
    welcome: {
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
    color: 'green'
  },
  otherText: {
    textAlign: "center",
    fontSize: 20
  },
  imageView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});