import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Timer, FlipNumber } from 'react-native-flip-timer';
import RNFS from 'react-native-fs'
// import FileSystem from 'react-native-filesystem';


export default class Game extends Component {
  componentDidMount() {
    var path = RNFS.ExternalDirectoryPath + '/test.txt';

    RNFS.writeFile(path, "BasketBall Analysis", 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
     });
  }
  
  state = {
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
    isSubstution: false
  }

  timer = {
    restTimeHours: 0,
    restTimeMinutes: 0,
    restTimeSeconds: 7,
    activiTimeHours: 0,
    activeTimeMinutes: 0,
    activeTimeSeconds: 8,
    sets: 7,
  };

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
    this.setState({ homeScore: this.state.homeScore + plusScore, plusScore })
    this.setState({ isSubstution: false })
    let data = '11:11,' + this.state.scoredPlayer + ',' + plusScore +"\n"
    // const fileContents = 'This is a my content.';
    // await FileSystem.writeToFile('/Users/bunyaminyasar/Desktop/amcik.txt', fileContents);
    // console.log('file is written');
    // create a path you want to write to
    

    // write the file
    this.writeToFile(data);
       
  }
  setScoreAway = (plusScore) => {
    this.setState({ awayScore: this.state.awayScore + plusScore, plusScore })
    this.setState({ isSubstution: false })
    let data = '11:11,' + this.state.scoredPlayer + ',' + plusScore +"\n"

    this.writeToFile(data);

  }
  setPlayer = (scoredPlayer) => {
    this.setState({ scoredPlayer })
    this.setState({ isSubstution: false })
  }
  setSubstutionPlayer = (substutionPlayer) => {
    this.setState({ substutionPlayer })
    this.setState({ isSubstution: false })
  }
  substutionFunc = () => {
    if (this.state.homeActivePlayer.includes(this.state.scoredPlayer) && this.state.homeSubstition.includes(this.state.substutionPlayer)) {
      this.state.homeActivePlayer.splice(this.state.homeActivePlayer.indexOf(this.state.scoredPlayer), 1);
      this.state.homeActivePlayer.push(this.state.substutionPlayer)

      this.state.homeSubstition.splice(this.state.homeSubstition.indexOf(this.state.substutionPlayer), 1);
      this.state.homeSubstition.push(this.state.scoredPlayer)
      this.setState({ isSubstution: true })
    } else if (this.state.awayActivePlayer.includes(this.state.scoredPlayer) && this.state.awaySubstition.includes(this.state.substutionPlayer)) {
      this.state.awayActivePlayer.splice(this.state.awayActivePlayer.indexOf(this.state.scoredPlayer), 1);
      this.state.awayActivePlayer.push(this.state.substutionPlayer)

      this.state.awaySubstition.splice(this.state.awaySubstition.indexOf(this.state.substutionPlayer), 1);
      this.state.awaySubstition.push(this.state.scoredPlayer)
      this.setState({ isSubstution: true })
    }
    let data = '11:11,' + this.state.scoredPlayer + '-' + this.state.substutionPlayer +"\n"
    this.writeToFile(data);

    this.forceUpdate()
  }

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
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ fontSize: 30 }}>Zks</Text>
              <Text style={{ fontSize: 30 }}>{this.state.homeScore} pt</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 30 }}>USA Olympic</Text>
              <Text style={{ fontSize: 30 }}>{this.state.awayScore} pt</Text>
            </View>
            {!this.state.isSubstution ? <View style={{ flex: 4, alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>{this.state.plusScore} pt</Text>
              <Text style={{ fontSize: 20 }}>{this.state.scoredPlayer}</Text>
              <Text style={{ fontSize: 20 }}>12.22</Text>
              {/* <Timer time={500} play={play} /> */}
              {/* <TouchableOpacity style={styles.button} onPress={this.play}>
            <Text style={styles.text}>{play ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity> */}
            </View>
              :
              <View style={{ flex: 4, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Substution</Text>
                <Text style={{ fontSize: 20 }}>{this.state.scoredPlayer} - {this.state.substutionPlayer}</Text>
                <Text style={{ fontSize: 20 }}>12.22</Text>
              </View>}

          </View>
          <View style={{ flex: 1, backgroundColor: "#d6e5fa" }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>def</Text>
                <Text>reb</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>off</Text>
                <Text>reb</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>to</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>stl</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>asst</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>blk</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.substutionFunc()} style={{ width: 60, height: 30, borderRadius: 30, backgroundColor: 'white', borderColor: 'red', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>sub</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 60, height: 30, borderRadius: 30, backgroundColor: 'white', borderColor: 'purple', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
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
