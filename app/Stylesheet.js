import { StyleSheet } from "react-native";

const Colors = {
  primary: '#748dff',
  bodyBg: '#e1e3e9'
}

const styles = StyleSheet.create({
  layout: {
    fontFamily: 'Roboto',
  },

  bodyLayout: {
    margin: 16,
    paddingBottom: 64
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
    resizeMode: "contain",
    margin: 8
  },
  
  actions: {
    margin: 1
  },

  actionBtn: {
    margin: 4
  },

  // imagepicker
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    margin: 5,
    marginBottom: 16
  },
});


export default styles;