import React from 'react';
import { StyleSheet, View, Image } from 'react-native';



export default class Footer extends React.Component {    
    render() {
      return (
        <View style={styles.container}>

          <View style={ styles.bottomView} >
          <Image
            style={styles.headerNimc}
            source={require("../assets/images/ibibio_poweredBy.png")}
            />
            </View>
           </View>

      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNimc: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    resizeMode: "center"
  },  
  bottomView:{
    width: '100%', 
    height: 50, 
    // backgroundColor: '#FF9800', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  }
});