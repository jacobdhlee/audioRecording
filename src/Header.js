import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const Header = ({onPress, text}) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.leftContainer}>
      </View>

      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>Voice Recorder</Text>
      </View>

      <TouchableOpacity>
        <View style={styles.rightContainer}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  leftTextStyle: {
    fontSize: 15,
    fontWeight: '600',
  },
  mainContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 17,
    fontWeight: '600',
  }
});

export default Header
