import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const EnterTranslatedWordScreen = props => {

  console.log(props);

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
  }
});

export default EnterTranslatedWordScreen