
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  // Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import { recognizeText } from '../helpers/helpers';

import styles from '../Stylesheet';

import config from '../config/config'

import { Button, TextInput, Text } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import TextRecognition from "react-native-text-recognition";
import { Layout } from '../components/Layout';

const ImagePicker = () => {
  const [filePath, setFilePath] = useState(null);
  const [text, setText] = useState('')
  const [stolen, setStolen] = useState(null);

  const formData = new FormData();
  formData.append('file', filePath);
  

  const checkLicensePlate = () => {
    console.log('Checking License plate...');
    console.log(text);
    fetch(`${config.API_BASE_URL}/vehicles/${text}`)
      .then(result => result.json())
      .then(resJson => {
        if (resJson) setStolen(true);
        else setStolen(false);
      })
      .catch(err => { console.error(err) });
  }

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 400,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0]);

        if (response.assets[0].uri) {
          recognizeText(response.assets[0].uri)
          .then(result => {
            setText(result);
          })
          .catch(err => { throw err })
        }
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      if (response) {
        recognizeText(response.assets[0].uri)
        .then(result => {
          setText(result);
          setFilePath(response);
        })
        .catch(err => { throw err })
    }});
  };

  return (
    <Layout>
      <SafeAreaView>
        {
          !stolen ?
            (<View style={styles.container}>
              {filePath && (
                <Image
                  source={{ uri: filePath.uri }}
                  style={styles.imageStyle}
                />
              )}
              {text && <>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={{ flex: 1 }}
                    mode='outlined'
                    label='Text recognized'
                    value={text}
                    onChangeText={setText}
                  >
                  </TextInput>
                </View>
              </>}

              <View style={styles.actions}>
                <Button
                  style={styles.actionBtn}
                  mode='outlined'
                  onPress={() => captureImage('photo')}
                >
                  Launch Camera
                </Button>

                <Button
                  style={styles.actionBtn}
                  mode='contained'
                  onPress={() => chooseFile('photo')}
                >
                  Choose image
                </Button>

                <Button
                  style={styles.actionBtn}                 
                 mode='elevated' onPress={checkLicensePlate}>
                  Check
                </Button>
              </View>

            </View>) : (<>
              <Text variant='displayMedium' style={{ color: 'red' }}>This is a stolen vehicle</Text>
              <Button mode='contained' onPress={() => { setStolen(false) }}>Find more</Button>
            </>)
        }
      </SafeAreaView>
    </Layout>
  );
};

export default ImagePicker;
