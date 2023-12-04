import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
export default function CallOption(props) {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("CallScreen", {
            callType: props.callType,
            screenTitle: props.name,
        });
    };
    return (
        <TouchableOpacity onPress={handlePress} style={styles.btnContainer}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <Icon name={props.icon} size={48} color={props.color} />
                </View>

                <View style={styles.right}>
                    <Text style={styles.title}>{props.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#427D9D",
        // backgroundColor: "white",
        borderRadius: 15,

        marginTop: "10%",
        marginBottom: "10%",

        padding: "5%",
    },
    btnContainer: {
        height: "40%",
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
