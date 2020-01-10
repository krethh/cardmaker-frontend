import React, {useState} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import SelectableDeck from './SelectableDeck'
import WS from '../../utils/WS';

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
                <Text>{cardPostingMessage}</Text>
            )}
            <Button title="Send" color={Colors.Purple} onPress={sendCard}/>
            {backButtonVisible && (
                <Button title="Back" color={Colors.Purple} onPress={onPressBack}/>
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
    header: {
        fontSize: 24,
        fontWeight: "bold"
    }
});

export default AddToDeck