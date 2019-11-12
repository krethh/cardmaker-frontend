import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Constants from '../../utils/Constants'
import Colors from '../../utils/Colors'
import ImageTile from './ImageTile'

let pageIndex = 1;
let alternativeUrlUsed = false;

const SelectImage = props => {

  const [currentImages, setCurrentImages] = useState(null)

  const url = `${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${props.currentCard.chosenCard.front}&page=${pageIndex}&per_page=4&lang=${props.config.defaultTargetLanguage.source}`
  const alternativeUrl = `${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${props.currentCard.chosenCard.back}&page=${pageIndex}&per_page=4&lang=${props.config.defaultTargetLanguage.target}`

  const fetchImages = () => {
    fetch(alternativeUrlUsed ? alternativeUrl : url)
      .then(response => response.json())
      .then(response => setCurrentImages(response.hits))
  }

  const handleImagePress = index => {
    props.setImage(currentImages[index])
    props.navigation.navigate("EnterExampleSentence")
  }

  const fetchNextImages = () => {
    pageIndex = pageIndex + 1;
    fetchImages();
  }

  const handleSwitchLanguage = () => {
    alternativeUrlUsed = !alternativeUrlUsed;
    fetchImages()
  }

  useEffect(() => {
    fetchImages();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Images for query: {alternativeUrlUsed ? props.currentCard.chosenCard.back : props.currentCard.chosenCard.front}</Text>
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
          <Button title="Switch language" color={Colors.Purple} onPress={handleSwitchLanguage} />
        </View>
      </View>
    </View>
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
    marginTop: 50,
    flexDirection: "row"
  },
  button: {
    margin: 10
  }
});

export default SelectImage