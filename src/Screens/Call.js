import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Home(props) {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>AutoReply</Text>
      </View>

      <View style={styles.mainContainer} />
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
  mainContainer: {
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
