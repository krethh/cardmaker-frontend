import React, {useState} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import SelectableDeck from './SelectableDeck'

const AddToDeck = props => {

    const [checkedIndices, setCheckedIndices] = useState({})

    const toggleChecked = id => {
        if (!!checkedIndices[id]) {
            setCheckedIndices({
                ...checkedIndices,
                [id]: false
            })
        } else {
            setCheckedIndices({
                ...checkedIndices,
                [id]: true
            })
        }
    }

    const sendCard = () => {
        const apiRequest = {
            chosenCard: props.currentCard.chosenCard,
            exampleSentence: props.currentCard.exampleSentence,
            image: props.currentCard.image,
            targetDecks: Object.keys(checkedIndices).filter(key => !!checkedIndices[key]),
            translatedWord: props.currentCard.translatedWord
        }

        console.log(apiRequest)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Select target deck
            </Text>
            {props.userInfo.userDecks.map(deck => (
                <SelectableDeck {...deck} key={deck.id} checked={!!checkedIndices[deck.id]} onPress={() => toggleChecked(deck.id)} />
            ))}
            <Button title="Send" color={Colors.Purple} onPress={sendCard}/>
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
    }
});

export default AddToDeck