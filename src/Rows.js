import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'

import Button from './Button';

const Rows = ({audio, onPlayPress, onDeletePress}) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.textContainer}>
        <Text>{audio.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button text={'Play'} onPress={onPlayPress} addStyle={styles.button}/>
        <Button text={'Delete'} onPress={onDeletePress} addStyle={styles.button}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    height: 120,
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 80,
    height: 30
  }
})

export default Rows