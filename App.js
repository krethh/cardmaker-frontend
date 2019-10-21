import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui'

export default function App() {
  return (
    <View style={styles.container}>
        <Toolbar 
          leftElement="arrow-back"
        />
      <Text style={{
        fontWeight: "bold",
        fontSize: 24,
        
      }}>Anki CardMaker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
});
