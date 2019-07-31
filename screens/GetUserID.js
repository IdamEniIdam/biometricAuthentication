import React from 'react';
import { StyleSheet, Text, AsyncStorage, View, Button, KeyboardAvoidingView } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Header from "../components/header";
import Footer from "../components/footer";
import {Makiko } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font'


export default class GetUserID extends React.Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    header: null
  })
    constructor(props) {
      super(props);
      this.stat = false;
      this.state = { fontLoaded: false, 
        invalid: "none",
        error: '',
        userId: '',
        prevInputLength: 0
     };
    }
 
 
   
      handleUserIDChange = (text) => {
     let userID = text;
     if (userID.length === 6 && userID.length +1 > this.state.prevInputLength ){
        userID += "-";
     }
     this.setState({userId: userID, prevInputLength: userID.length});
   }

      saveValueFunction = () => {
        if(this.state.userId){
          AsyncStorage.setItem('UserId', this.state.userId);
          this.props.navigation.navigate("GetUserBiometrics");
        }else{
          this.dropdown.alertWithType(
            'error',
            'UserID empty!',
            'Please fill in UserId.'
          );
        }
        
      };
  

    async componentDidMount() {
      await Font.loadAsync({
        "lato-m": require("../assets/fonts/Lato-Medium.ttf")
      });
      this.setState({ fontLoaded: true });
    }
  
    
    render() {
      return (
        // <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={{ marginTop: 20}}>
          <Header />
          </View>

          <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
          Please enter you correct <Text style={{fontWeight: 'bold'}}>userID</Text> which is {"\n"} Alpha-Numeric for proper authentication below.
        </Text>
          </View>

        
          <Text>{"\n"}</Text>
          <Text>{"\n"}</Text>
          <Text>{"\n"}</Text>
             <View style={{alignSelf: 'center'}}>
             <View style={[styles.card2, { backgroundColor: '#d0efe0' }]}>
        <Text style={styles.title}>User-ID</Text>
        <Makiko
        label={'Enter USER-ID'}
        iconClass={FontAwesomeIcon}
        iconName={'heart'}
        iconColor={'white'}
        iconSize={35}
        inputStyle={{ color: '#db786d' }}
        maxLength={10}
        value={this.state.userId}
        autoCapitalize="characters"
        onChangeText={data => (this.handleUserIDChange(data))}
        />
        </View>

        <Text>{"\n"}</Text>
          <Text>{"\n"}</Text>
        <Button
       buttonStyle={styles.button}
       title="Continue"
       onPress={this.saveValueFunction}
     />
     <Text>{"\n"}</Text>

<Text style={{textAlign: 'center'}}>
Click on Continue above to proceed.
</Text>
            </View> 
       


            <DropdownAlert
ref={ref => (this.dropdown = ref)}
closeInterval={5000}
/> 
            <Footer/>
           </View>
          //  </KeyboardAvoidingView>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userID: {
    // flex: 1,
    alignItems: 'center',
   
  },
  headerNimc: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    resizeMode: "center"
  },
  card2: {
    padding: 16,
    width: 300,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  }
});