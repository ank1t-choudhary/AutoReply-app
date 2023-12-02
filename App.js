import React, {useEffect} from 'react';
import SmsAndroid from 'react-native-get-sms-android';

import {View, StyleSheet, PermissionsAndroid} from 'react-native';

import Home from './src/Screens/Home';

const App = () => {
  useEffect(() => {
    requestPermissions();
  });

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

  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
