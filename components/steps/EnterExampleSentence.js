import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import PotentialSentence from  './PotentialSentence'

const EnterExampleSentence = props => {

    handleOnPotentialSentencePress = sentence => {
        props.setExampleSentence(sentence);
    }

    handleContinuePress = () => {
        props.navigation.navigate('AddToDeck')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Enter example sentence:
            </Text>
            <TextInput
                style={styles.inputStyle}
                value={props.currentCard.exampleSentence}
                onChangeText={text => props.setExampleSentence(text)}
                multiline={true}
                placeholder="Example sentence"
            />
            <View style={styles.flatListContainer}>
                <FlatList 
                    data={props.currentCard.apiResponse.potentialSentences}
                    renderItem={item => <PotentialSentence onPress={() => handleOnPotentialSentencePress(item.item)} text={item.item} />}
                    keyExtractor={item => item}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Button title="Continue" color={Colors.Purple} onPress={handleContinuePress} />
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
    inputStyle: {
        width: "90%"
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: "row"
    },
    button: {
        margin: 10
    },
    flatListContainer: {
        marginTop: 10,
        maxHeight: "50%"
    }
});

export default EnterExampleSentence