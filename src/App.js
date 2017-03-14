import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
} from 'react-native';

import { AudioUtils, AudioRecorder, AudioPlayer } from 'react-native-audio';
import Sound from 'react-native-sound';
import moment from 'moment';
import Header from './Header';
import Button from './Button';
import Rows from './Rows';

class App extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      number: 0,
      files: [],
      dataSource: ds.cloneWithRows([]),
    }

    this.startRecording = this.startRecording.bind(this);
    this.pauseRecording = this.pauseRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.playRecording = this.playRecording.bind(this);
    this.saveRecording = this.saveRecording.bind(this);
    this.deleteAudio = this.deleteAudio.bind(this);
  }

  async startRecording() {
    this.audioPath = AudioUtils.DocumentDirectoryPath + '/test'+ this.state.number + '.aac';
    AudioRecorder.prepareRecordingAtPath(this.audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac"
    });

    await AudioRecorder.startRecording();
  }

  async pauseRecording() {
    await AudioRecorder.pauseRecording();
  }

  async stopRecording() {
    await AudioRecorder.stopRecording()
  }

  playRecording(path) {
    const audioPath = !path ? this.audioPath : path.audio
    setTimeout(() => {
        const sound = new Sound(audioPath, '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
          }
        });

        setTimeout(() => {
          sound.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }, 100);
      }, 100);
  }

  deleteAudio(value) {
    const newList = this.state.files.filter((audio) => {
      return value.name !== audio.name;
    })

    this.setState({
      files: newList,
      dataSource: this.state.dataSource.cloneWithRows(newList),
    })
  }

  saveRecording(name) {
    let number = this.state.number + 1
    let newFiles =  [ ...this.state.files, { name: name, audio: this.audioPath } ]
    this.setState({ 
      files: newFiles, 
      number,
      dataSource: this.state.dataSource.cloneWithRows(newFiles),
    })
  }

  render() {
    let name = moment().format()

    const listView = (
      <ListView 
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={ (value) => {
          console.log('value is ', value)
          return (
            <Rows 
              audio={value}
              onPlayPress={() => this.playRecording(value)}
              onDeletePress={() => this.deleteAudio(value)}
            />
          )
        }}
      />
    )
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.mainContainer}>
          <View style={styles.audioCreateContainer}>
            <Button text={'Record'} onPress={this.startRecording}/>
            <Button text={'Pause'} onPress={this.pauseRecording}/>
            <Button text={'Stop'} onPress={this.stopRecording}/>
            <Button text={'Play'} onPress={() => this.playRecording('') }/>
            <Button text={'Save'} onPress={() => this.saveRecording(name)}/>
          </View>
          <View style={styles.body}>
            {listView}
          </View>
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
  },
  body: {
    flex: 1,
    backgroundColor:'#f5f5f5',
  }
});

export default App;