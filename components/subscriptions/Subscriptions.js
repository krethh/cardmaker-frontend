import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PotentialSubscribtion from './PotentialSubscription'
import WS from '../../utils/WS';

const Subscriptions = props => {

    const [subscribableDecks, setSubscribableDecks] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

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

    return (
        <View>
            {subscribableDecks && (
                <View>
                    <FlatList 
                        data={subscribableDecks}
                        renderItem={ ({ item }) => <PotentialSubscribtion {...item} /> }
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
    }
});

export default Subscriptions