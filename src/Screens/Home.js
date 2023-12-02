import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import CallOption from '../components/CallOption';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>AutoReply</Text>
      </View>

      <View style={styles.options}>
        <CallOption
          color="darkgreen"
          icon="phone-outgoing"
          name="Dialled Call"
        />
        <CallOption color="blue" icon="phone-incoming" name="Received Call" />
        <CallOption color="red" icon="phone-missed" name="Missed Call" />
      </View>
      <View style={styles.bottomPadding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDF2FD',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  navbar: {
    flex: 1,
    backgroundColor: '#164863',
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomPadding: {
    flex: 1,
    width: '100%',
  },
  options: {
    flex: 9,
    justifyContent: 'space-between',
    paddingTop: '15%',
    paddingBottom: '15%',
    width: '80%',
  },
  navbarText: {
    color: '#eee',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
