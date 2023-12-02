import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

export default function CallOption(props) {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
            <Icon name={props.icon} size={48} color={props.color} />
            </View>

            <View style={styles.right}>
                <Text style={styles.title}>{props.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#427D9D",
        borderRadius: 15,

        marginTop: "10%",
        marginBottom: "10%",

        padding: "5%",
    },
    left: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    right: {
        flex: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#eee",
        fontSize: 28,
        fontWeight: "bold",
    },
});
