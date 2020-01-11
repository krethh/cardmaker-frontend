import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, Button, ActivityIndicator } from 'react-native';
import Colors from '../../utils/Colors';

const SubscriptionDetailsModal = props => {

    const [activityIndicatorActive, setActivityIndicatorActive] = useState(false)

    handleToggleSubscribe = () => {
        setActivityIndicatorActive(true)
        props.onToggleSubscribe()
        setActivityIndicatorActive(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.modalVisible} >
            <View style={styles.container}>
                <Text style={styles.header}>
                    Deck name
                    </Text>
                <Text style={styles.property}>
                    {props.deck.name}
                </Text>
                <Text style={styles.header}>
                    Description
                    </Text>
                <Text style={styles.property}>
                    {props.deck.description}
                </Text>
                <Text style={styles.header}>
                    Owner
                    </Text>
                <Text style={styles.property}>
                    {props.deck.creatorId}
                </Text>
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <Button
                            title={props.deck.subscribed ? "UNSUBSCRIBE" : "SUBSCRIBE"}
                            color={props.deck.subscribed ? Colors.Purple : Colors.Red}
                            onPress={handleToggleSubscribe}
                            disabled={activityIndicatorActive}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="BACK"
                            color={Colors.Purple}
                            onPress={props.onBackPress}
                        />
                    </View>
                </View>
                {props.errorMessage && (
                    <Text>{props.errorMessage}</Text>
                )}
                {activityIndicatorActive && (
                    <ActivityIndicator size="large" />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        padding: 30
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15
    },
    property: {
        fontSize: 16,
        marginBottom: 30
    },
    buttonsContainer: {
        marginTop: 50,
        flexDirection: "row"
    },
    button: {
        margin: 10
    },
    errorMessage: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.Red
    }
});

export default SubscriptionDetailsModal