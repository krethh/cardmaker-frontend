import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeContainer from './HomeContainer'
import SettingsContainer from './components/SettingsContainer'
import EnterTranslatedWordContainer from './components/steps/EnterTranslatedWordScreenContainer'
import EnterExampleSentenceContainer from './components/steps/EnterExampleSentenceContainer'
import SelectImageContainer from './components/steps/SelectImageContainer'
import AddToDeckContainer from './components/steps/AddToDeckContainer'
import { Provider } from 'react-redux';
import Colors from './utils/Colors'
import store from './utils/Store'
import DiscoveryContainer from './components/discovery/DiscoveryContainer';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeContainer},
  Settings: {screen: SettingsContainer},
  EnterTranslatedWord: {screen: EnterTranslatedWordContainer},
  SelectImage: {screen: SelectImageContainer},
  EnterExampleSentence: {screen: EnterExampleSentenceContainer},
  Discover: {screen: DiscoveryContainer},
  AddToDeck: {screen: AddToDeckContainer}
},
{
   defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.Blue
      }
   },
   initialRouteName: 'Home'
});

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}