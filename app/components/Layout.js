import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Stylesheet";

export const Layout = ({ children }) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.layout} contentContainerStyle={'center'}>
        {children}
      </ScrollView>
      {/* <View >
      </View> */}
    </SafeAreaView>
  )
}
