import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import MenuTile from './components/MenuTile';
import WarningModal from './components/WarningModal'
import { getConfigFromStorage, getSessionTokenFromStorage } from './actions/ConfigActions'
import { AsyncStorage, Modal } from 'react-native';
import ConfigKeys from './config/ConfigKeys'
import Languages from './config/Languages'
import {
  getDictionarySecretFromStorage,
  getDefaultTargetLanguageFromStorage,
  getPixabaySecretFromStorage,
  getBackendUrlFromStorage
} from './actions/ConfigActions'
import WS from './utils/WS'
import * as Google from 'expo-google-app-auth'
import Constants from './utils/Constants'
import { persistSessionToken } from './actions/ConfigActions'

const Home = props => {
  const { navigate } = props.navigation;

  let nextScreen = null;

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const onStartPress = () => {
    if (!props.config.dictionarySecret) {
      setIsSettingsModalOpen(true);
      return;
    }

    nextScreen = 'EnterTranslatedWord'

    if (!props.config.sessionToken) {
      setIsLoginModalOpen(true)
      return;
    }

    fetchDecksAndNavigateFurther();
  }

  const onSettingsPress = () => {
    navigate('Settings')
  }

  const onDiscoverPress = () => {
    nextScreen = 'Discover';

    if (!props.config.sessionToken) {
      setIsLoginModalOpen(true)
      return;
    }

    fetchDecksAndNavigateFurther()
  }
  
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: Constants.ANDROID_CLIENT_ID,
        scopes: ["email"]
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const navigateToSettings = () => {
    setIsSettingsModalOpen(false);
    navigate('Settings')
  }

  // initialize config from persistent storage
  if (props.config.dictionarySecret === undefined) {
    getDictionarySecretFromStorage()
      .then(value => {
        props.setDictionarySecret(value);
      });

    getDefaultTargetLanguageFromStorage()
      .then(value => {
        props.setDefaultTargetLanguage(value);

        if (value === null) {
          props.setDefaultTargetLanguage(Languages.POLISH_GERMAN)
        }
      })

    getPixabaySecretFromStorage()
      .then(value => {
        props.setPixabaySecret(value);
      })

    getBackendUrlFromStorage()
      .then(value => {
        props.setBackendUrl(value)
      })

    getSessionTokenFromStorage()
      .then(value => {
        props.setSessionToken(value)
      })
  }

  const handleLogin = () => {
    signInWithGoogleAsync().then(response => {
      WS.postLogin({ token: response })
        .then(response => {
          console.log(response.data.token)
          props.setSessionToken(response.data.token)
          persistSessionToken(response.data.token);
          setIsLoginModalOpen(false);
          fetchDecksAndNavigateFurther();
        })
    })
  }

  const fetchDecksAndNavigateFurther = () => {
    if (!props.userInfo.userDecks) {
      WS.getDecks().then(response => {
        props.setUserDecks(response.data);
      })
    }

    navigate(nextScreen)
  }

  const onSubscriptionsPress = () => {
    navigate("Subscriptions")
  }

  return (
    <View style={styles.container}>
      <WarningModal
        header="Are you sure?"
        text="No Dictionary API Secret is set in the settings. No dictionary queries will be possible. To go to Settings, press Continue."
        onContinue={navigateToSettings}
        onCancel={() => setIsSettingsModalOpen(false)}
        isModalOpen={isSettingsModalOpen}
      />
      <WarningModal
        header="Login"
        text="You need to login with Google before continuing."
        onContinue={handleLogin}
        onCancel={() => setIsLoginModalOpen(false)}
        isModalOpen={isLoginModalOpen}
      />
      <Text style={styles.headerStyle}>Anki Card Maker</Text>
      <View style={styles.tilesRowContainer}>
        <View style={styles.tilesContainer}>
          <MenuTile text="Start" onPress={onStartPress} />
          <MenuTile text="Settings" onPress={onSettingsPress} />
        </View>
        <View style={styles.tilesContainer}>
          <MenuTile text="Discover" onPress={onDiscoverPress} />
          <MenuTile text="Subscriptions" onPress={onSubscriptionsPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  headerStyle: {
    fontSize: 32,
    paddingTop: 20,
    fontWeight: "bold"
  },
  tilesContainer: {
    padding: 10,
    width: "100%",
    flexDirection: 'row'
  },
  tilesRowContainer: {
    width: "100%",
    height: "100%"
  }
});

export default Home;
