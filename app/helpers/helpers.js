import TextRecognition from "react-native-text-recognition";

const recognizeText = (imgUri) => TextRecognition.recognize(imgUri)
    .then(result => result.join(' '))

export { recognizeText }
