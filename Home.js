import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import MenuTile from './components/MenuTile';
import WarningModal from './components/WarningModal'
import { getConfigFromStorage } from './actions/ConfigActions'
import { AsyncStorage, Modal } from 'react-native';
import ConfigKeys from './config/ConfigKeys'
import Languages from './config/Languages'
import {
  getDictionarySecretFromStorage,
  getDefaultTargetLanguageFromStorage,
  getPixabaySecretFromStorage
} from './actions/ConfigActions'

const Home = props => {
  const { navigate } = props.navigation;

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onStartPress = () => {
    if (!props.config.dictionarySecret) {
      setIsModalOpen(true);
      return;
    }

    navigate('EnterTranslatedWord')
  }

  const onSettingsPress = () => {
    navigate('Settings')
  }

  const onDiscoverPress = () => {

  }

  const onInfoPress = () => {

  }

  const navigateToSettings = () => {
    setIsModalOpen(false);
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
  }

  return (
    <View style={styles.container}>
      <WarningModal 
        header="Are you sure?"
        text="No Dictionary API Secret is set in the settings. No dictionary queries will be possible. To go to Settings, press Continue."
        onContinue={navigateToSettings}
        onCancel={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />
      <Text style={styles.headerStyle}>Anki Card Maker</Text>
      <View style={styles.tilesRowContainer}>
        <View style={styles.tilesContainer}>
          <MenuTile text="Start" onPress={onStartPress} />
          <MenuTile text="Settings" onPress={onSettingsPress} />
        </View>
        <View style={styles.tilesContainer}>
          <MenuTile text="Discover" onPress={onDiscoverPress} />
          <MenuTile text="Info" onPress={onInfoPress} />
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
