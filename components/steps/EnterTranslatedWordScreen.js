import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator, FlatList } from 'react-native';
import Colors from '../../utils/Colors'
import Constants from '../../utils/Constants'
import ApiUtils from '../../utils/ApiUtils'
import Translation from './Translation'

const EnterTranslatedWordScreen = props => {
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [customTranslationMode, setCustomTranslationMode] = useState(false)
  const [customTranslation, setCustomTranslation] = useState("")

  const handleContinue = () => {
    setIsIndicatorActive(true);
    setCustomTranslationMode(false);

    const url = `${Constants.PONS_API}?l=${props.config.defaultTargetLanguage.code}&in=${props.config.defaultTargetLanguage.source}&q=${props.currentCard.translatedWord}`

    fetch(url, {
      method: 'GET',
      headers: { 'X-Secret': props.config.dictionarySecret }
    }).then(response => response.json())
      .then(response => {
        props.setApiResponse(ApiUtils.processApiResponse(response))
        setIsIndicatorActive(false);
        setNoResults(false);
      })
      .catch(err => {
        props.setApiResponse(null);
        setNoResults(true);
        setIsIndicatorActive(false);
      })
  }

  const handleEnterCustomTranslation = () => {
    if (!customTranslationMode) {
      setCustomTranslationMode(true);
      return;
    }

    props.setChosenCard({
      front: props.currentCard.translatedWord,
      back: customTranslation
    });

    props.navigation.navigate('SelectImage')
  }

  const handleOnTranslationPress = translation => {
    props.setChosenCard(translation);
    props.navigation.navigate('SelectImage')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter translated word</Text>
      <TextInput
        style={styles.inputStyle}
        value={props.currentCard.translatedWord}
        onChangeText={text => props.setTranslatedWord(text)}
        multiline={true}
        placeholder="Word to translate"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="CONTINUE"
          disabled={!props.currentCard.translatedWord}
          onPress={handleContinue}
        />
      </View>
      {isIndicatorActive && (
        <ActivityIndicator size={60} color={Colors.Purple} />
      )}
      {(props.currentCard.apiResponse && props.currentCard.apiResponse.translations) && !customTranslationMode &&
        <View style={styles.flatListContainer}>
          <FlatList
            data={props.currentCard.apiResponse.translations}
            renderItem={({ item }) => <Translation key={item.front + item.back} translation={item} onPress={() => handleOnTranslationPress(item)} />}
            keyExtractor={translation => translation.front + translation.back}
          />
        </View>
      }
      {customTranslationMode && (
        <TextInput
          style={styles.inputStyle}
          value={customTranslation}
          onChangeText={text => setCustomTranslation(text)}
          multiline={false}
          placeholder="Custom translation"
        />
      )}
      {noResults &&
        <View style={styles.flatListContainer}>
          <Text style={styles.noResultsText}>No results or erroneous query</Text>
        </View>
      }
      <View style={styles.buttonContainer}>
        <Button
          title={customTranslationMode ? "CONTINUE" : "ENTER CUSTOM TRANSLATION"}
          onPress={handleEnterCustomTranslation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15
  },
  inputStyle: {
    width: "90%"
  },
  flatListContainer: {
    marginTop: 10,
    marginBottom: 50,
    maxHeight: "55%"
  },
  noResultsText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  buttonContainer: {
    marginBottom: 15
  }
});

export default EnterTranslatedWordScreen