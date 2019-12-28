import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Button, Modal } from 'react-native';
import PotentialSubscribtion from './PotentialSubscription'
import WS from '../../utils/WS';
import SubscriptionDetailsModal from './SubscriptionDetailsModal';

const Subscriptions = props => {

    const [subscribableDecks, setSubscribableDecks] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [searchWord, setSearchWord] = useState("")
    const [selectedDeckId, setSelectedDeckId] = useState(null)

    useEffect(() => {
        WS.getSubscribableDecks()
            .then(response => {
                console.log(response.data)
                setSubscribableDecks(response.data)
            })
            .catch(response => {
                setErrorMessage("Could not fetch potential subscriptions")
            })
    }, [])

    handleSearch = () => {
        WS.getSubscribableDecksWithSearch(searchWord)
            .then(response => {
                setSubscribableDecks(response.data)
            })
            .catch(response => {
                setErrorMessage("Could not fetch potential subscriptions")
            })
    }

    handleOnDeckPress = id => {
        setSelectedDeckId(id)
    }

    toggleSubscribe = id => {
        WS.postDeckSubscription(id)
            .then(response => {
                const deckToChange = subscribableDecks.find(deck => deck.id === selectedDeckId)
                deckToChange.alreadySubscribed = !deckToChange.alreadySubscribed
                setSubscribableDecks([
                    ...subscribableDecks.filter(deck => deck.id !== selectedDeckId),
                    deckToChange
                ])
            })
            .catch(response => {
                setErrorMessage("Could not subscribe/unsubscribe for this deck")
            })
    }

    return ( 
        <View>
            <SubscriptionDetailsModal
                modalVisible={!!selectedDeckId}
                deck={!!selectedDeckId && subscribableDecks.find(deck => deck.id === selectedDeckId)}
                onToggleSubscribe={() => toggleSubscribe(selectedDeckId)}
                onBackPress={() => setSelectedDeckId(null)}
                errorMessage={errorMessage}
            />
            <Text style={styles.label}>Search decks</Text>
            <TextInput
                style={styles.inputStyle}
                value={searchWord}
                onChangeText={text => setSearchWord(text)}
                multiline={true}
                placeholder="Deck name"
            />
            <Button
                title="SEARCH"
                onPress={handleSearch}
            />
            {subscribableDecks && (
                <View>
                    <FlatList
                        data={subscribableDecks}
                        renderItem={({ item }) => <PotentialSubscribtion  {...item} onPress={() => handleOnDeckPress(item.id)} />}
                        keyExtractor={deck => deck.id}
                    />
                </View>
            )}
            {errorMessage && (
                <View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    flatListContainer: {
        marginTop: 10,
        marginBottom: 80,
        maxHeight: "60%"
    },
    errorMessage: {
        fontWeight: "bold",
        fontSize: 24
    },
    inputStyle: {
        width: "90%"
    }
});

export default Subscriptions