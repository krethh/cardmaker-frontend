import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, StatusBar } from 'react-native';
import Constants from '../../utils/Constants'
import Colors from '../../utils/Colors'
import ImageTile from './ImageTile'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from 'react-navigation-stack';

let alternativeUrlUsed = false;
const KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + StatusBar.currentHeight;

const SelectImage = props => {

  const [currentImages, setCurrentImages] = useState(null)
  const [customSearchWordUrl, setCustomSearchWordUrl] = useState(null)
  const [customSearchWord, setCustomSearchWord] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)

  const url = `${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${props.currentCard.chosenCard.front}&page=${pageIndex}&per_page=4&lang=${props.config.defaultTargetLanguage.source}`
  const alternativeUrl = `${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${props.currentCard.chosenCard.back}&page=${pageIndex}&per_page=4&lang=${props.config.defaultTargetLanguage.target}`

  const fetchImages = () => {
    const chosenUrl = customSearchWordUrl ? customSearchWordUrl : (alternativeUrlUsed ? alternativeUrl : url)

    console.log(chosenUrl)

    fetch(chosenUrl)
      .then(response => response.json())
      .then(response => setCurrentImages(response.hits))
  }

  const handleImagePress = index => {
    props.setImage(currentImages[index])
    props.navigation.navigate("EnterExampleSentence")
  }

  const fetchNextImages = () => {
    setPageIndex(pageIndex + 1);

    if (customSearchWordUrl) {
      setCustomSearchWordUrl(`${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${customSearchWord}&page=${pageIndex}&per_page=4&lang=${props.config.defaultTargetLanguage.source}`)
    } else {
      fetchImages()
    }
  }

  useEffect(() => {
    if (customSearchWordUrl) {
      setCustomSearchWordUrl(`${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${customSearchWord}&page=${pageIndex}&per_page=4&lang=${props.config.defaultTargetLanguage.source}`)
    } else {
      fetchImages()
    }
  }, [pageIndex])

  const handleSwitchLanguage = () => {
    alternativeUrlUsed = !alternativeUrlUsed;
    fetchImages()
  }

  const handleSetCustomSearchWord = () => {
    setCustomSearchWordUrl(`${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${customSearchWord}&page=${pageIndex}&per_page=4&lang=${props.config.defaultTargetLanguage.source}`)
    setPageIndex(1)
  }

  useEffect(() => {
    fetchImages();
  }, [customSearchWordUrl])

  useEffect(() => {
    fetchImages();
  }, [])

  return (
    <KeyboardAwareScrollView enableAutomaticScroll extraHeight={KEYBOARD_VERTICAL_OFFSET} extraScrollHeight={120} enableOnAndroid >
      <View style={styles.container}>
        <Text style={styles.header}>Images for query: {customSearchWordUrl ? customSearchWord : (alternativeUrlUsed ? props.currentCard.chosenCard.back : props.currentCard.chosenCard.front)}</Text>
        <View style={styles.imageRow}>
          {currentImages && currentImages[0] &&
            (<ImageTile previewURL={currentImages[0].previewURL} onPress={() => handleImagePress(0)} />)
          }
          {currentImages && currentImages[1] &&
            (<ImageTile previewURL={currentImages[1].previewURL} onPress={() => handleImagePress(1)} />)
          }
        </View>
        <View style={styles.imageRow}>
          {currentImages && currentImages[2] &&
            (<ImageTile previewURL={currentImages[2].previewURL} onPress={() => handleImagePress(2)} />)
          }
          {currentImages && currentImages[3] &&
            (<ImageTile previewURL={currentImages[3].previewURL} onPress={() => handleImagePress(3)} />)
          }
        </View>
        <View style={styles.buttonsContainer} >
          <View style={styles.button}>
            <Button title="Try again" color={Colors.Purple} onPress={fetchNextImages} />
          </View>
          <View style={styles.button}>
            <Button title="Switch language" color={Colors.Purple} onPress={handleSwitchLanguage} disabled={!!customSearchWordUrl} />
          </View>
        </View>
        <View style={styles.customWordContainer} >
          <TextInput
            style={styles.inputStyle}
            value={customSearchWord}
            onChangeText={text => {
              setCustomSearchWord(text)
            }}
            multiline={false}
            placeholder="Custom search word"
          />
          <Button
            title="SET CUSTOM SEARCH WORD"
            onPress={handleSetCustomSearchWord}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold"
  },
  imageRow: {
    flexDirection: "row",
    textAlign: "center"
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: "row"
  },
  button: {
    margin: 10
  },
  inputStyle: {
    width: "90%"
  }
});

export default SelectImage