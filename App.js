import { Home, Profile } from './pages/Home'

import { BottomNavigation, Provider as PaperProvider, useTheme } from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Scan', headerShown: false, focusedIcon: 'camera-iris' },
    { key: 'profile', title: 'History', focusedIcon: 'history' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    profile: Profile
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