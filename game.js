import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,TextInput,TouchableHighlight
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Timer, FlipNumber } from 'react-native-flip-timer';
import RNFS from 'react-native-fs'
import CountDown from 'react-native-countdown-component';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import BackgroundTimer from 'react-native-background-timer';
import Mailer from 'react-native-mail'



const timer = {
  restTimeHours: 0,
  restTimeMinutes: 0,
  restTimeSeconds: 7,
  activeTimeHours: 0,
  activeTimeMinutes: 0,
  activeTimeSeconds: 8,
  sets: 7,
 };

export default class Game extends Component {
   currentTimeAlways ;
   currentTime;
   runAlways= false;
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      homeScore: 0,
      awayScore: 0,
      homeActivePlayer: ['A1', 'B1', 'C1', 'D1', 'E1'],
      awayActivePlayer: ['A2', 'B2', 'C2', 'D2', 'E2'],
      homeSubstition: ['Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7'],
      awaySubstition: ['Y11', 'Y22', 'Y33', 'Y44', 'Y55', 'Y66', 'Y77'],
      scoredPlayer: '',
      substutionPlayer: '',
      plusScore: 0,
      homeName:"",
      awayName:"",
      actionType:"score",
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
      notShowFunc: false,
      firsttime: true
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }
  componentDidMount() {
    var path = RNFS.ExternalDirectoryPath + '/test.txt';

    RNFS.writeFile(path,  '\n')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
     });
  }

  writeToFile = (data) => {
        // write the file
        var path = RNFS.ExternalDirectoryPath + '/test.txt';

        RNFS.appendFile(path,data).then((success) => {
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
         });
  }

  setScoreHome = (plusScore) => {
    if(this.state.firsttime){
      let initialdata= this.state.homeName+this.state.awayName
      this.writeToFile(initialdata)
      this.setState({firsttime : false})
    }
    if(this.state.stopwatchStart){
      this.setState({ homeScore: this.state.homeScore + plusScore, plusScore })
    }
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + "," + plusScore + "pt," + this.state.scoredPlayer + ','  + (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) + "\n"
    this.setState({actionType:"score"})

    // write the file
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    } 
  }
  setScoreAway = (plusScore) => {
    if(this.state.firsttime){
      let initialdata= this.state.homeName+this.state.awayName
      this.writeToFile(initialdata)
      this.setState({firsttime : false})
    }

    if(this.state.stopwatchStart){
      this.setState({ awayScore: this.state.awayScore + plusScore, plusScore })
    }
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() +","+ plusScore + "pt," + this.state.scoredPlayer + ','  + (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) + "\n"
    this.setState({actionType:"score"})

    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }
  }
  setPlayer = (scoredPlayer) => {
    this.setState({ scoredPlayer })
  }
  setSubstutionPlayer = (substutionPlayer) => {
    this.setState({ substutionPlayer })
  }
  substutionFunc = () => {
    if (this.state.homeActivePlayer.includes(this.state.scoredPlayer) && this.state.homeSubstition.includes(this.state.substutionPlayer)) {
      this.state.homeActivePlayer.splice(this.state.homeActivePlayer.indexOf(this.state.scoredPlayer), 1);
      this.state.homeActivePlayer.push(this.state.substutionPlayer)

      this.state.homeSubstition.splice(this.state.homeSubstition.indexOf(this.state.substutionPlayer), 1);
      this.state.homeSubstition.push(this.state.scoredPlayer) 
    } else if (this.state.awayActivePlayer.includes(this.state.scoredPlayer) && this.state.awaySubstition.includes(this.state.substutionPlayer)) {
      this.state.awayActivePlayer.splice(this.state.awayActivePlayer.indexOf(this.state.scoredPlayer), 1);
      this.state.awayActivePlayer.push(this.state.substutionPlayer)

      this.state.awaySubstition.splice(this.state.awaySubstition.indexOf(this.state.substutionPlayer), 1);
      this.state.awaySubstition.push(this.state.scoredPlayer)
    }
    this.setState({actionType:"substution"})
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + ",sub," + this.state.scoredPlayer + ',' + this.state.substutionPlayer + "," + (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) + "\n" 
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }
    this.forceUpdate()
  }

  splitSecond = () => {
    second = currentTimeAlways.split(":")[2];
    return second;
  }
  splitMinute = () => {
    minute = currentTimeAlways.split(":")[1];
    return minute;
  }

  foulAction = () => {
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + "," + "foul," + this.state.scoredPlayer + "," +  (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) +"\n"
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }    this.setState({actionType:"foul"})

  }

  asstAction = () => {
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + "," + "asst," + this.state.scoredPlayer + "," +  (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) +"\n"
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }    this.setState({actionType:"asst"})

  }

  blkAction = () => {
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + "," + "blk," + this.state.scoredPlayer + ',' +  (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) +"\n"
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }    this.setState({actionType:"blk"})

  }
  toAction = () => {
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + "," + "to," + this.state.scoredPlayer + ',' +  (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) +"\n"
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }    this.setState({actionType:"to"})

  }

  stlAction = () => {
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + "," + "stl," + this.state.scoredPlayer + ',' +  (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) +"\n"
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }    this.setState({actionType:"stl"})

  }

  defAction = () => {
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + "," + "defreb," + this.state.scoredPlayer + ',' +  (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) +"\n"
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }    this.setState({actionType:"def"})

  }

  offAction = () => {
    let data = "00:" + this.splitMinute() + ":" + this.splitSecond() + "," + "offreb," + this.state.scoredPlayer + ',' +  (this.state.homeActivePlayer.includes(this.state.scoredPlayer) ? this.state.homeName : this.state.awayName) +"\n"
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }    this.setState({actionType:"off"})

  }

  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }
 
  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }
 
  toggleStopwatch() {
    let data="00:"+this.splitMinute()+":"+this.splitSecond()+","+"pause"+"\n"
    if (this.state.stopwatchStart){
      this.writeToFile(data);
    } // buradan emin degilim bi sorrrrrr
    this.runAlways = true;
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }
 
  resetStopwatch() {
    let data="00:"+this.splitMinute()+":"+this.splitSecond()+","+"end"+"\n"
    if(this.state.stopwatchStart){
      this.writeToFile(data);
    }    this.setState({actionType:"end"})
    
    RNFS.readDir(RNFS.ExternalDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    console.log('GOT RESULT', result);
    console.log('result.path: ', result.path);
    Mailer.mail({
      subject: 'Basketball Analysis',
      recipients: ['yasarbunyamin20@gmail.com'],
      body: '<b>A Bold Body</b>',
      isHTML: true,
      attachment: {
        path:  "/storage/emulated/0/Android/data/com.reactpro/files/test.txt",  // The absolute path of the file from which to read data.
        type: 'txt',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
    // stat the first file
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {
    if (statResult[0].isFile()) {
      // if we have a file, read it
      return RNFS.readFile(statResult[1], 'utf8');
    }
 
    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.log(contents);




    // const to = ['yasarbunyamin20@gmail.com'] // string or array of email addresses
    // email(to, {
    //     // Optional additional arguments
    //     // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
    //     // bcc: 'mee@mee.com', // string or array of email addresses
    //     subject: 'Show how to use',
    //     body: contents,
    //     attachment: {
    //       path : RNFS.ExternalDirectoryPath + "test.txt",
    //       type : "txt"
    //     }
    // }).catch(console.error)
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  
  getFormattedTime(time) {
      this.currentTime = time;

  };
  getFormattedTimeAlways(time) {
    this.currentTimeAlways = time + "";
    
};
  play = () => {
    this.setState({ play: !this.state.play });
  }
  render() {
    const { play } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: "#d6e5fa" }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.setScoreHome(1)} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', borderColor: 'green', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>1pt</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setScoreAway(1)} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', borderColor: 'red', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>1pt</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <TouchableOpacity onPress={() => this.setScoreHome(2)} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', borderColor: 'green', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>2pt</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setScoreAway(2)} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', borderColor: 'red', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>2pt</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.setScoreHome(3)} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', borderColor: 'green', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>3pt</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setScoreAway(3)} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', borderColor: 'red', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>3pt</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
                <Entypo size={50} name='menu' />
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
              <Ionicons size={50} name='md-arrow-round-back' />
              </TouchableOpacity>
            </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 12 }}>Home Players</Text>
                {this.state.homeActivePlayer.map(item => (
                  <TouchableOpacity onPress={() => { this.setPlayer(item) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 12 }}>Away Players</Text>
                {this.state.awayActivePlayer.map(item => (
                  <TouchableOpacity onPress={() => { this.setPlayer(item) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>
          <View style={{ flex: 1, backgroundColor: "#bae8e8", borderLeftWidth: 1, borderLeftColor: 'gray', borderRightWidth: 1, borderRightColor: 'gray' }}>
            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TextInput style={{ fontSize: 20 }} placeholder="Enter Team Name" value={this.state.homeName} onChangeText = {(text)=>this.setState({homeName:text})}></TextInput>
              <Text style={{ fontSize: 20,paddingTop:15 }}>{this.state.homeScore} pt</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextInput style={{ fontSize: 20 }} placeholder="Enter Team Name" value={this.state.awayName} onChangeText = {(text)=>this.setState({awayName:text})}></TextInput>

              <Text style={{ fontSize: 20,paddingTop:15 }}>{this.state.awayScore} pt</Text>
            </View>
            
            { this.state.stopwatchStart && this.state.actionType === "score" ? 
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>{this.state.plusScore} pt</Text>
              <Text style={{ fontSize: 20 }}>{this.state.scoredPlayer}</Text>
            </View>
              : 
              this.state.stopwatchStart && this.state.actionType === "substution" ? 
              <View style={{ flex: 2, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Substution</Text>
                <Text style={{ fontSize: 20 }}>{this.state.scoredPlayer} - {this.state.substutionPlayer}</Text>
              </View> 
              :              
              this.state.stopwatchStart && <View style={{ flex: 2, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{this.state.actionType}</Text>
                <Text style={{ fontSize: 20 }}>{this.state.scoredPlayer} </Text>
              </View>
              }
              <View style={{flex:4,alignItems: 'center'}}>
              <Stopwatch laps msecs start={this.state.stopwatchStart}
                reset={this.state.stopwatchReset}
                options={options}
                getTime={this.getFormattedTime}

                />
              <TouchableHighlight onPress={this.toggleStopwatch}>
                <Text style={{fontSize: 30}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.resetStopwatch}>
                <Text style={{fontSize: 30}}>Reset</Text>
              </TouchableHighlight>
              </View>
              <View style={{position:"absolute",marginTop:12312312}}>
              <Stopwatch laps msecs start={this.runAlways}
                reset={this.state.stopwatchReset}
                options={options}
                getTime={this.getFormattedTimeAlways} 
                />
                </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#d6e5fa" }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.defAction()} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>def</Text>
                <Text>reb</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.offAction()} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>off</Text>
                <Text>reb</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.toAction()} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>to</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.stlAction()} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>stl</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.asstAction()} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>asst</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.blkAction()} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>blk</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.substutionFunc()} style={{ width: 60, height: 30, borderRadius: 30, backgroundColor: 'white', borderColor: 'red', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>sub</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.foulAction()} style={{ width: 60, height: 30, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>foul</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 12 }}>Home Substution</Text>
                {this.state.homeSubstition.map(item => (
                  <TouchableOpacity onPress={() => { this.setSubstutionPlayer(item) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 12 }}>Away Substution</Text>
                {this.state.awaySubstition.map(item => (
                  <TouchableOpacity onPress={() => { this.setSubstutionPlayer(item) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    backgroundColor: '#333333',
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cccccc',
  },
})
