/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//
//import SmsAndroid from 'react-native-get-sms-android';
//import CallLogs from 'react-native-call-log';
//
//
//
// const sendSMS = (phoneNumber, message) => {
//    SmsAndroid.autoSend(
//      phoneNumber,
//      message,
//      fail => {
//        console.log('Failed to send SMS', fail);
//      },
//      success => {
//        console.log('SMS sent successfully', success);
//      },
//    );
// };
//
//
//const sendMsg = async data => {
//  console.log('i am here', data);
//
//  CallLogs.load(1).then(c => {
//    sendSMS(c[0].phoneNumber, 'Auto Sent message');
//  });
//};
//
//AppRegistry.registerHeadlessTask('sendMsg', () => sendMsg);

AppRegistry.registerComponent(appName, () => App);
