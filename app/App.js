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
    { key: 'home', title: 'Home', headerShown: false, focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'imagePicker', title: 'Scan', focusedIcon: 'camera-iris'},
    { key: 'history', title: 'History', focusedIcon: 'notebook-check', unfocusedIcon: 'notebook-check-outline' },
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