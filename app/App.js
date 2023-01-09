/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// ----------------------------

// pages
import { Home, History, ImagePicker } from './pages'

import { BottomNavigation, Provider as PaperProvider, useTheme } from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Scan', headerShown: false, focusedIcon: 'camera-iris' },
    { key: 'imagePicker', title: 'Image Picker', focusedIcon: 'animation-outline' },
    { key: 'history', title: 'History', focusedIcon: 'notebook-check-outline', unfocusedIcon: 'notebook-check' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    imagePicker: ImagePicker,
    history: History,
  })

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
  )
}