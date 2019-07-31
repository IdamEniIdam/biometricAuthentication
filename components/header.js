import React from "react";
import { View, Image, StyleSheet } from "react-native";
export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View>
          <Image
            style={styles.headerProg}
            source={require("../assets/images/proximity-logo.png")}
          />
        </View>
        <View>
          <Image
            style={styles.headerNimc}
            source={require("../assets/images/NIMC_logo_trans.png")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerProg: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: "center"
  },
  headerNimc: {
    flex: 1,
    aspectRatio: 1.3,
    height: 30,
    width: 80,
    resizeMode: "center"
  },

  headerContainer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
