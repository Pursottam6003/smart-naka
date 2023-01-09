
import React, { useState } from 'react';
import {
  View,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import { recognizeText } from '../helpers/helpers';

import styles from '../Stylesheet';
import config from '../config/config'

import { Button, TextInput, Text, Appbar } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Layout } from '../components/Layout';

const ImagePicker = () => {
  const [filePath, setFilePath] = useState(null);
  const [text, setText] = useState(null)
  const [stolen, setStolen] = useState(null);

  const [vehicleImg, setVehicleImg] = useState(null);
  const [licensePlateMismatch, setLicensePlateMismatched] = useState(null);
  const [textScanned, setTextScanned] = useState(false);


  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const checkLicensePlate = () => {
    console.log('Checking License plate...');

    let body = new FormData();
    body.append('id', text);
    body.append('file', {
      uri: filePath.uri, name: filePath.type, filename: filePath.fileName, type: filePath.type
    })

    fetch(`${config.API_BASE_URL}/vehicle_type`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: text,
        file: filePath
      })
    })
      .then(result => result.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson) {
          setStolen(true)
          setLicensePlateMismatched(resJson.license_plate_mismatch);
        }
        else setStolen(false);
      })
      .catch(err => { console.error(err) });
  }

  const resetAll = () => {
    setFilePath(null);
    setStolen(null);
    setText(null);
    setVehicleImg(null);
    setTextScanned(false);
    setLicensePlateMismatched(null);
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

  const captureImage = async (type, stage) => {
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
        if (stage === 2) {
          setVehicleImg(response.assets[0]);
        } else {
          if (response.assets[0].uri) {
            recognizeText(response.assets[0].uri)
              .then(result => {
                setText(result);
              })
              .catch(err => { throw err })
          }
          setFilePath(response.assets[0]);
        }
      });
    }
  };

  const chooseFile = (type, stage) => {
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
        if (stage === 2) {
          setVehicleImg(response.assets[0]);
        } else {
          recognizeText(response.assets[0].uri)
            .then(result => {
              setText(result);
              setFilePath(response.assets[0]);
            })
            .catch(err => { throw err })
        }
      }
    });
  };

  return (
    <Layout pageTitle=''>
      {stolen === null ?
        (<View style={styles.container}>
          {!textScanned && (<>
            {filePath && (
              <Image
                source={{ uri: filePath.uri }}
                style={styles.imageStyle}
              />
            )}
            {text !== null && <>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{ flex: 1, marginBottom: 16 }}
                  mode='outlined'
                  label='Text recognized'
                  value={text}
                  onChangeText={setText}
                >
                </TextInput>
              </View>
            </>}

            <View style={styles.actions}>
              {!text && (
                <>
                  <Text variant='titleMedium' style={{ marginBottom: 16 }}>Pick an option to scan license plate</Text>
                  <Button
                    style={styles.actionBtn}
                    mode='outlined'
                    onPress={() => captureImage('photo', 1)}
                  >
                    Launch Camera
                  </Button>

                  <Button
                    style={styles.actionBtn}
                    mode='contained'
                    onPress={() => chooseFile('photo', 1)}
                  >
                    Choose image
                  </Button>
                </>
              )}

              {text && (<>
                <Button
                  style={styles.actionBtn}
                  mode='elevated' onPress={() => { setTextScanned(true) }}>
                  Next
                </Button>
              </>)}
            </View>

          </>)}

          {textScanned && (<>
            {vehicleImg && (
              <Image
                source={{ uri: vehicleImg.uri }}
                style={styles.imageStyle}
              />
            )}
            {!vehicleImg && (
              <>
                <Text variant='titleMedium' style={{ marginBottom: 16 }}>Pick an option to scan the vehicle</Text>
                <View style={styles.actions}>
                  <Button
                    style={styles.actionBtn}
                    mode='outlined'
                    onPress={() => captureImage('photo', 2)}
                  >
                    Launch Camera
                  </Button>

                  <Button
                    style={styles.actionBtn}
                    mode='contained'
                    onPress={() => chooseFile('photo', 2)}
                  >
                    Choose image
                  </Button>
                </View>
              </>
            )}
            {vehicleImg && (
              <Button
                style={styles.actionBtn}
                mode='elevated' onPress={() => { checkLicensePlate() }}>
                Check
              </Button>
            )}
          </>)}


        </View>) : (
          (<>
            {stolen === true && (<>
              <Text variant='displayMedium' style={{ color: 'red', marginBottom: 16 }}>This is a stolen vehicle!</Text>
              {licensePlateMismatch && (
                <Text variant='displayMedium' style={{ color: 'red', marginBottom: 16 }}>License plate is swapped!</Text>
              )}
            </>)}
            {stolen === false && (
              <Text variant='displaySmall' style={{ marginBottom: 16 }}>Not a stolen vehicle</Text>
            )}
            <Button mode='contained' onPress={() => { resetAll() }}>Check Next</Button>
          </>)
        )
      }
    </Layout>
  );
};

export default ImagePicker;
