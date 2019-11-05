import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Constants from '../../utils/Constants'
import Colors from '../../utils/Colors'
import ImageTile from './ImageTile'

const SelectImage = props => {

  const [currentImages, setCurrentImages] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)

  const url = `${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${props.currentCard.chosenCard.front}&page=${pageIndex}&per_page=4&lang=pl` 
  const alternativeUrl = `${Constants.PIXABAY_API}?key=${props.config.pixabaySecret}&q=${props.currentCard.chosenCard.front}&page=${pageIndex}&per_page=4&lang=pl` 
  
  const fetchImages = () => {
    fetch(url)
    .then(response => response.json())
    .then(response => setCurrentImages(response.hits))
  }

  const handleImagePress = index => {
    
  }

  const fetchNextImages = () => {
    setPageIndex(pageIndex + 1)
    fetchImages();
  }

  useEffect(() => {
     fetchImages();
  }, [])
 
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Images for query: {props.currentCard.chosenCard.front}</Text>
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
        <View style={{marginTop: 50}} >
          <Button title="Try again" color={Colors.Purple} onPress={fetchNextImages}/>
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
      flexDirection: "row"
    }
});

export default SelectImage