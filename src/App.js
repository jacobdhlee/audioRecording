import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import Header from './Header';
import Button from './Button';

class App extends Component {
  constructor() {
    super()
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.mainContainer}>
          <View style={styles.audioCreateContainer}>
            <Button text={'Record'}/>
            <Button text={'Pause'}/>
            <Button text={'Stop'}/>
            <Button text={'Play'}/>
          </View>
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
  },
  audioCreateContainer: {
    height: 100,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});

export default App;