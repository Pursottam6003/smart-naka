import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Stylesheet";

export const Layout = ({ children }) => {
  return (
    <SafeAreaView>
      <View style={styles.layout}>
        {children}
      </View>
    </SafeAreaView>
  )
}