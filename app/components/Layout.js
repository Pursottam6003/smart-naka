import React from "react";
import { ScrollView, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Stylesheet";

export const Layout = ({ children, pageTitle }) => {
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title={pageTitle} />
      </Appbar.Header>
      <ScrollView style={styles.bodyLayout} contentContainerStyle={'center'}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}
