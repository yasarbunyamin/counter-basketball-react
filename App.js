import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Game from "./game"
import Entry from "./entry"

const MainNavigator = createStackNavigator({
  Entry: {
    screen: Entry,
    navigationOptions: {
      header: null,
    },
  },
  Game: {
    screen: Game, 
    navigationOptions: {
      header: null,
    },
  }
},
  { headerMode: 'screen' }
);



const App = createAppContainer(MainNavigator);


export default App;


