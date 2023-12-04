import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CallOption from "../components/CallOption";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <CallOption
          color="#FF7F50"
          icon="phone-outgoing"
          name="Dialled Call"
          callType="dialed"
        />
        <CallOption
          color="#87CEEB"
          icon="phone-incoming"
          name="Received Call"
          callType="Received Call"
        />
        <CallOption
          color="#FF4500"
          icon="phone-missed"
          name="Missed Call"
          callType="Missed Calls"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },

  options: {
    flex: 1,
    justifyContent: "space-around",
    width: "80%",
  },
});
