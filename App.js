import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import GetUserID from './screens/GetUserID';
import GetUserBiometrics from './screens/GetUserBiometrics';
import UserIDSetUp from './screens/UserIDSetUp';
import VerifyUserID from './screens/VerifyUserID';
import BioSetupSteps from './screens/BioSetupSteps';
import DashBoard from './screens/DashBoard';
import Drawer from './screens/Drawer';

import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    BioSetupSteps: {
      screen: BioSetupSteps,
      navigationOptions: {
        header: null
      }
    },
    GetUserID: {
      screen: GetUserID,
      navigationOptions: {
        title: "User ID"
      }
    },
    GetUserBiometrics: {
      screen: GetUserBiometrics,
      navigationOptions: {
        title: "Fingerprint verification"
      }
    },
    UserIDSetUp: {
      screen: UserIDSetUp,
      navigationOptions: {
        title: "Authenticating User"
      }
    },
    VerifyUserID: {
      screen: VerifyUserID,
      navigationOptions: {
        title: "Verifying User"
      }
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: {
        header: null
      }
    },
    DashBoard: {
      screen: DashBoard,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "SplashScreen"
  }
);


const AppNavigatorAuth = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    BioSetupSteps: {
      screen: BioSetupSteps,
      navigationOptions: {
        header: null
      }
    },
    GetUserID: {
      screen: GetUserID,
      navigationOptions: {
        title: "User ID"
      }
    },
    GetUserBiometrics: {
      screen: GetUserBiometrics,
      navigationOptions: {
        header:null
      }
    },
    UserIDSetUp: {
      screen: UserIDSetUp,
      navigationOptions: {
        title: "Authenticating User....."
      }
    },
    VerifyUserID: {
      screen: VerifyUserID,
      navigationOptions: {
        title: "Verifying User....."
      }
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: {
        header: null
      }
    },
    DashBoard: {
      screen: DashBoard,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "GetUserID"
  }
);

let AppContainer = createAppContainer(AppNavigator);
let AppContainerAuth = createAppContainer(AppNavigatorAuth);

// export default function App() {
  export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.loged = false;
      this.AppContainer = null;
  
      this.state = {
        isLoggedIn: null
      };
    }
    async componentDidMount() {
    
      let logined = await AsyncStorage.getItem("userIDbank", null);   
      if (logined == null) {
        this.setState({ isLoggedIn: "notin" });
      } else {
        this.setState({ isLoggedIn: "in" });
      }
    }
  render(){
    let CheckAuth = props => {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn == null) {
        return <View></View>;
      } else if(isLoggedIn == "notin") {
        return <AppContainer />;
      }else if(isLoggedIn == "in") {
        return <AppContainerAuth />;
      }
    };
    return  <CheckAuth isLoggedIn={this.state.isLoggedIn} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
