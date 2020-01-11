import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Modal } from 'react-native';
import WS from '../../utils/WS'
import DiscoveryCard from './DiscoveryCard';
import SelectableDeck from '../steps/SelectableDeck'

const Discovery = props => {

    const [discoveryCards, setDiscoveryCards] = useState(null)
    const [currentCard, setCurrentCard] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [discoveryFinished, setDiscoveryFinished] = useState(false)
    const [chosenCards, setChosenCards] = useState([])
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

    useEffect(() => {
        fetchDiscoveryCards();
    }, [])

    fetchDiscoveryCards = () => {
        WS.getDiscoveryCards()
            .then(response => {
                setCurrentCard(0)
                setDiscoveryCards(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrorMessage("Could not fetch discovery cards.")
            })
    }

    onAddPress = () => {
        setChosenCards([
            ...chosenCards,
            {
                id: discoveryCards[currentCard].id,
                decks: Object.keys(checkedIndices).filter(key => checkedIndices[key])
            }
        ])

        incrementOrEnd()
    }

    onNextPress = () => {
        incrementOrEnd()
    }

    incrementOrEnd = () => {
        if (currentCard === discoveryCards.length - 1) {
            console.log(JSON.stringify(chosenCards))
            WS.postDiscoveryCards(chosenCards)
                .then(response => {
                    setDiscoveryFinished(true)
                    setDiscoveryCards(null);
                })
                .catch(error => {
                    setErrorMessage("Could not post discovered cards.")
                })

        } else {
            setCurrentCard(currentCard + 1)
        }
    }

    return (
        <View>
            {errorMessage && (
                <View style={styles.messageContainer}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <Button title="Back" onPress={() => { props.navigation.navigate('Home') }} />
                </View>
            )}
            {discoveryCards && discoveryCards.length == 0 && (
                <View style={styles.messageContainer}>
                    <Text style={styles.errorMessage}>No cards to review this time!</Text>
                    <Button title="Back" onPress={() => { props.navigation.navigate('Home') }} />
                </View>
            )}
            {discoveryCards && discoveryCards.length > 0 && !errorMessage && (
                <View>
                    <DiscoveryCard {...discoveryCards[currentCard]} />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <Button title="Add" color={Colors.Green} onPress={onAddPress} disabled={Object.keys(checkedIndices).filter(key => checkedIndices[key]).length == 0} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Next" color={Colors.Purple} onPress={onNextPress} />
                        </View>
                    </View>
                    <View style={styles.decksContainer}>
                        {props.userInfo.userDecks.map(deck => (
                            <SelectableDeck {...deck} key={deck.id} checked={!!checkedIndices[deck.id]} onPress={() => toggleChecked(deck.id)} />
                        ))}
                    </View>
                </View>
            )}
            {discoveryFinished && !errorMessage && (
                <View>
                    <Text style={styles.finishedMessage}>You have reviewed all the cards.</Text>
                    <Button title="Back" onPress={() => { props.navigation.navigate('Home') }} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    errorMessage: {
        color: "red",
        fontWeight: "bold",
        fontSize: 18
    },
    buttonContainer: {
        width: "45%",
        margin: 10,
        height: 50
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    decksContainer: {
        alignItems: "center"
    },
    finishedMessage: {
        fontWeight: "bold",
        fontSize: 30
    },
    messageContainer: {
        margin: 10
    }
});

export default Discovery