import { Home, Profile,Scanner } from './pages/Home'
import ImagePicker from './pages/ImagePicker'

import { BottomNavigation, Provider as PaperProvider, useTheme } from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', headerShown: false, focusedIcon: 'camera-iris' },
    { key: 'scanner', title: 'Scanner', headerShown: false, focusedIcon: 'camera-iris' },
    { key: 'imagePicker', title:'ImagePicker', headerShown:false,focusedIcon:'camera'},
    { key: 'profile', title: 'History', focusedIcon: 'history' },

  ])

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    scanner: Scanner,
    profile: Profile,
    imagePicker : ImagePicker,
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