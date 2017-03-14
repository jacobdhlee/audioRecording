import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import Header from './Header';

class App extends Component {
  constructor() {
    super()
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.mainContainer}>
          <Text>Video recording</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 15,
      }
    })
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;