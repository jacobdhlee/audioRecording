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
      recording: false,
      pause: false,
      stop: false,
      path: AudioUtils.DocumentDirectoryPath + '/test' + moment().format() + '.aac',
      files: [],
      dataSource: ds.cloneWithRows([]),
    }

    this.prepareRecordingAtPath = this.prepareRecordingAtPath.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.pauseRecording = this.pauseRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.playRecording = this.playRecording.bind(this);
    this.saveRecording = this.saveRecording.bind(this);
    this.deleteAudio = this.deleteAudio.bind(this);
  }

  componentDidMount() {
    this.prepareRecordingAtPath()
  }

  prepareRecordingAtPath() {
    AudioRecorder.prepareRecordingAtPath(this.state.path, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac"
    });
  }

  async startRecording() {
    const { recording, pause, stop } = this.state;
    if(stop) {
      this.prepareRecordingAtPath()
      this.setState({stop: !this.state.stop})
    }

    this.setState({recording: !this.state.recording});
    await AudioRecorder.startRecording();
  }

  async pauseRecording() {
    const { recording, pause, stop } = this.state;
    this.setState({
      recording: !this.state.recording,
      pause: !this.state.pause,
    });

    await AudioRecorder.pauseRecording();
  }

  async stopRecording() {
    const { recording, pause, stop } = this.state;
    this.setState({
      recording: false,
      pause: false,
      stop: true
    })
    this.setState({recording: !this.state.recording});

    await AudioRecorder.stopRecording()
  }

  async playRecording(path) {    
    const audioPath = !path ? this.state.path : path.audio
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
    const { recording, pause, stop } = this.state;
    if( !stop ) { return; }
    else {
      let newMoment = moment().format()
      let newFiles =  [ ...this.state.files, { name: name, audio: this.state.path } ]
      this.setState({
        path: AudioUtils.DocumentDirectoryPath + '/test' + newMoment + '.aac',
        files: newFiles, 
        dataSource: this.state.dataSource.cloneWithRows(newFiles),
      })
    }
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