import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ImageTile from '../steps/ImageTile'

const DiscoveryCard = props => {

    return (
        <View style={styles.container}>
            <Text style={styles.front}>{props.front}</Text>
            <ImageTile previewURL={props.image} />
            <View style={styles.divider} />
            <Text style={styles.back}>{props.back}</Text>
            <Text style={styles.exampleSentence}>{props.exampleSentence}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    front: {
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 30,
        margin: 10
    },
    divider: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        alignSelf: "stretch",
        marginVertical: 10
    },
    back: {
        fontSize: 18
    },
    exampleSentence: {
        margin: 10,
        fontStyle: "italic"
    }
});

export default DiscoveryCard