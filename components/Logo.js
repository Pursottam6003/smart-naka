import { View, Image } from 'react-native'
import styles from '../Stylesheet'
import LOGO from '../media/apsn.png'

export const Logo = () => (
    <View style={styles.logoWrapper}>
        <Image source={LOGO} style={styles.logo} />
    </View>
)