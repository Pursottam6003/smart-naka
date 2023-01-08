import { StyleSheet } from "react-native";

const Colors = {
  primary: '#748dff',
  bodyBg: '#e1e3e9'
}

const styles = StyleSheet.create({
  layout: {
    // flex: 1,
    // backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleBar: {
    // backgroundColor: Colors.primary,
  },

  logoWrapper: {
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain"
  }
});


export default styles;