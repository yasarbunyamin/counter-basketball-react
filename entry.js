import React, { Component } from 'react'
import {View,Button,TextInput} from "react-native"

export default class Entry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homePlayer1:"",
            homePlayer2:"",
            homePlayer3:"",
            homePlayer4:"",
            homePlayer5:"",
            awayPlayer1:"",
            awayPlayer2:"",
            awayPlayer3:"",
            awayPlayer4:"",
            awayPlayer5:"",
            homeSubstution1:"",
            homeSubstution2:"",
            homeSubstution3:"",
            homeSubstution4:"",
            homeSubstution5:"",
            homeSubstution6:"",
            homeSubstution7:"",
            awaySubstution1:"",
            awaySubstution2:"",
            awaySubstution3:"",
            awaySubstution4:"",
            awaySubstution5:"",
            awaySubstution6:"",
            awaySubstution7:"",
            homeActivePlayer:[],
            awayActivePlayer:[],
            homeSubstition:[],
            awaySubstition:[]
        }
    }
    handleGotoGamePage = () => {
        const { homeActivePlayer,awayActivePlayer,homeSubstition,awaySubstition,
            homePlayer1,homePlayer2,homePlayer3,homePlayer4,homePlayer5,
            awayPlayer1,awayPlayer2,awayPlayer3,awayPlayer4,awayPlayer5,
            homeSubstution1,homeSubstution2,homeSubstution3,homeSubstution4,homeSubstution5,homeSubstution6,homeSubstution7,
            awaySubstution1,awaySubstution2,awaySubstution3,awaySubstution4,awaySubstution5,awaySubstution6,awaySubstution7} = this.state;
        const {navigate} = this.props.navigation;
        homeActivePlayer.push(homePlayer1,homePlayer2,homePlayer3,homePlayer4,homePlayer5)
        awayActivePlayer.push(awayPlayer1,awayPlayer2,awayPlayer3,awayPlayer4,awayPlayer5)
        homeSubstition.push(homeSubstution1,homeSubstution2,homeSubstution3,homeSubstution4,homeSubstution5,homeSubstution6,homeSubstution7)
        awaySubstition.push(awaySubstution1,awaySubstution2,awaySubstution3,awaySubstution4,awaySubstution5,awaySubstution6,awaySubstution7)
        // if(homePlayer1 && homePlayer2 && homePlayer3 && homePlayer4 && homePlayer5 && awayPlayer1 && awayPlayer2 && awayPlayer3 && awayPlayer4 && awayPlayer5){
            navigate('Game', {homeActivePlayer: homeActivePlayer, awayActivePlayer: awayActivePlayer, homeSubstition: homeSubstition, awaySubstition: awaySubstition})
        // }
    }
    static navigationOptions = {
        header: {
          visible: false,
        }
      };
    render() {
    return (
    <View>
        <View style={{flexDirection:"row"}}> 
        <View>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Player 1 Name" value={this.state.homePlayer1} onChangeText = {(text)=>this.setState({homePlayer1:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Player 2 Name" value={this.state.homePlayer2} onChangeText = {(text)=>this.setState({homePlayer2:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Player 3 Name" value={this.state.homePlayer3} onChangeText = {(text)=>this.setState({homePlayer3:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Player 4 Name" value={this.state.homePlayer4} onChangeText = {(text)=>this.setState({homePlayer4:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Player 5 Name" value={this.state.homePlayer5} onChangeText = {(text)=>this.setState({homePlayer5:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Substituon 1 Name" value={this.state.homeSubstution1} onChangeText = {(text)=>this.setState({homeSubstution1:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Substituon 2 Name" value={this.state.homeSubstution2} onChangeText = {(text)=>this.setState({homeSubstution2:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Substituon 3 Name" value={this.state.homeSubstution3} onChangeText = {(text)=>this.setState({homeSubstution3:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Substituon 4 Name" value={this.state.homeSubstution4} onChangeText = {(text)=>this.setState({homeSubstution4:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Substituon 5 Name" value={this.state.homeSubstution5} onChangeText = {(text)=>this.setState({homeSubstution5:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Substituon 6 Name" value={this.state.homeSubstution6} onChangeText = {(text)=>this.setState({homeSubstution6:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder=" Home Substituon 7 Name" value={this.state.homeSubstution7} onChangeText = {(text)=>this.setState({homeSubstution7:text})}></TextInput>
        </View>

        <View>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Player 1 Name" value={this.state.awayPlayer1} onChangeText = {(text)=>this.setState({awayPlayer1:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Player 2 Name" value={this.state.awayPlayer2} onChangeText = {(text)=>this.setState({awayPlayer2:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Player 3 Name" value={this.state.awayPlayer3} onChangeText = {(text)=>this.setState({awayPlayer3:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Player 4 Name" value={this.state.awayPlayer4} onChangeText = {(text)=>this.setState({awayPlayer4:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Player 5 Name" value={this.state.awayPlayer5} onChangeText = {(text)=>this.setState({awayPlayer5:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Substituon 1 Name" value={this.state.awaySubstution1} onChangeText = {(text)=>this.setState({awaySubstution1:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Substituon 2 Name" value={this.state.awaySubstution2} onChangeText = {(text)=>this.setState({awaySubstution2:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Substituon 3 Name" value={this.state.awaySubstution3} onChangeText = {(text)=>this.setState({awaySubstution3:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Substituon 4 Name" value={this.state.awaySubstution4} onChangeText = {(text)=>this.setState({awaySubstution4:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Substituon 5 Name" value={this.state.awaySubstution5} onChangeText = {(text)=>this.setState({awaySubstution5:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Substituon 6 Name" value={this.state.awaySubstution6} onChangeText = {(text)=>this.setState({awaySubstution6:text})}></TextInput>
        <TextInput style={{ fontSize: 13 }} placeholder="Away Substituon 7 Name" value={this.state.awaySubstution7} onChangeText = {(text)=>this.setState({awaySubstution7:text})}></TextInput>
        </View>
        </View>
        <Button
        title="Go to Game Screen"
        onPress={this.handleGotoGamePage}
        />

    </View>
    );
    }
}
