import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'

const Rows = () => {
  return (
    <View style={styles.rowContainer}>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    height: 60,
    flex: 1,
    justifyContent: 'center',
  }
})

export default Rows