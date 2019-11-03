import React from 'react'
import { Modal, View, StyleSheet, Text, Button } from 'react-native'

const WarningModal = props => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.isModalOpen}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    {props.header}
                </Text>
                <Text style={styles.text}>
                    {props.text}
                </Text>
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Continue"
                        color="blue"
                        onPress={props.onContinue}
                    />
                    <Button
                        title="Cancel"
                        color="red"
                        onPress={props.onCancel}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        padding: 30
    },
    header: {
        fontSize: 36,
        fontWeight: "bold"
    },
    text: {
        fontSize: 18
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15
    }
})

export default WarningModal;