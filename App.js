import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeContainer from './HomeContainer'
import SettingsContainer from './components/SettingsContainer'
import EnterTranslatedWordContainer from './components/steps/EnterTranslatedWordScreenContainer'
import EnterExampleSentenceContainer from './components/steps/EnterExampleSentenceContainer'
import SelectImageContainer from './components/steps/SelectImageContainer'
import AddToDeckContainer from './components/steps/AddToDeckContainer'
import { createStore, combineReducers } from 'redux'
import ConfigReducer from './reducers/ConfigReducer'
import CurrentCardReducer from './reducers/CurrentCardReducer'
import UserInfoReducer from './reducers/UserInfoReducer'
import { Provider } from 'react-redux';
import Colors from './utils/Colors'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeContainer},
  Settings: {screen: SettingsContainer},
  EnterTranslatedWord: {screen: EnterTranslatedWordContainer},
  SelectImage: {screen: SelectImageContainer},
  EnterExampleSentence: {screen: EnterExampleSentenceContainer},
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

const store = createStore(
  combineReducers({
    config: ConfigReducer,
    currentCard: CurrentCardReducer,
    userInfo: UserInfoReducer
  })
)

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}