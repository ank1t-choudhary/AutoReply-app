import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, PermissionsAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home.js";
import CallScreen from "./src/screens/Call.js";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        let granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('READ_PHONE_STATE permission granted');

          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('READ_CALL_LOG permission granted');

            granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.SEND_SMS,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('SEND_SMS permission granted');
            } else {
              console.log('SEND_SMS permission denied');
            }
          } else {
            console.log('READ_CALL_LOG permission denied');
          }
        } else {
          console.log('READ_PHONE_STATE permission denied');
        }
      } catch (error) {
        console.log('error occurred in requestPermissions: ', error);
      }
    };

    requestPermissions();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{
              title: "AutoReply",
              headerStyle: {
                backgroundColor: "#164863",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 32,
                color: "#eee",
              },
              headerTitleAlign: "center",
            }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={({ route }) => ({
              title: route.params.screenTitle,
              headerStyle: {
                backgroundColor: "#164863",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 32,
                color: "#eee",
              },
              headerTitleAlign: "center",
            })}
            name="CallScreen"
            component={CallScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
