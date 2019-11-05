import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const ImageTile = props => {

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Image source={{ uri: props.previewURL }} style={styles.image} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 130,
        height: 130
    },
    container: {
        elevation: 8,
        margin: 10,
        
    }
});

export default ImageTile    