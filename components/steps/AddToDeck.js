import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import SelectableDeck from './SelectableDeck'
import WS from '../../utils/WS';
import Colors from '../../utils/Colors'

const AddToDeck = props => {

    const [checkedIndices, setCheckedIndices] = useState({})
    const [backButtonVisible, setBackButtonVisible] = useState(false)
    const [cardPostingMessage, setCardPostingMessage] = useState(null)

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

    const onPressBack = () => {
        props.navigation.navigate('Home')
    }

    const sendCard = () => {
        const apiRequest = {
            front: props.currentCard.chosenCard.front,
            back: props.currentCard.chosenCard.back,
            exampleSentence: props.currentCard.exampleSentence,
            image: props.currentCard.image.previewURL,
            targetDecks: Object.keys(checkedIndices).filter(key => !!checkedIndices[key])
        }

        WS.postCard(apiRequest)
            .then(response => {
                console.log(response.status)
                setBackButtonVisible(true)
                setCardPostingMessage("Card added successfully.")
            })
            .catch(error => {
                setBackButtonVisible(true)
                setCardPostingMessage("Could not add card!")
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Select target deck
            </Text>
            {props.userInfo.userDecks.map(deck => (
                <SelectableDeck {...deck} key={deck.deckId} checked={!!checkedIndices[deck.id]} onPress={() => toggleChecked(deck.id)} />
            ))}
            {cardPostingMessage && (
                <View style={styles.cardPostingMessageContainer}>
                    <Text style={styles.cardPostingMessage}>{cardPostingMessage}</Text>
                </View>
            )}
            {!backButtonVisible && (
                <View style={styles.buttonContainer}>
                    <Button title="Send" color={Colors.Purple} onPress={sendCard} />
                </View>
            )}
            {backButtonVisible && (
                <View style={styles.buttonContainer}>
                    <Button title="Back" color={Colors.Green} onPress={onPressBack} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    responseMessage: {
        fontWeight: "bold"
    },
    cardPostingMessage: {
        fontWeight: "bold",
        fontSize: 18
    },
    cardPostingMessageContainer: {
        margin: 10
    },
    buttonContainer: {
        width: "30%",
        height: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    }
});

export default AddToDeck