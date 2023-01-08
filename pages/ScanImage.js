// import React from 'react'

// function Scanner() {
//   return (
//     <div>Scanner</div>
//   )
// }

// export default Scanner


import React, { useState,useEffect } from "react";
import { SafeAreaView,StatusBar,Text,View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import TextRecognition from "react-native-text-recognition";

function ScanImage()  {
  const [image,setImage] = useState(null);
  const [text,setText] = useState(null);
  
  useEffect(()=>{
    launchImageLibrary({},setImage)
  },[]);

  useEffect(()=>{
    if(image) {
      (async () => {
        const result = await TextRecognition.recognize(image.assets[0].uri)
        console.log(result);
        setText(result);
      })()
      console.log(image)
    }
  },[image])
  return (

    <SafeAreaView>
      <StatusBar/>
      <View>
        <Text>Text Regonition</Text>
        {text ? <Text>{text}</Text> : null}
      </View>
  
    </SafeAreaView>
  )
}
export default ScanImage;