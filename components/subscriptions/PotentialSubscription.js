import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const PotentialSubscription = props => {

    return (
        <View>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.owner}>{props.owner}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 18
    }, 
    owner: {
        margin: 10,
        fontSize: 12
    }
});

export default PotentialSubscription