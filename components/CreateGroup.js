// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { w, h } from '../Styles';
// const Group = () => {
//   return <View style={styles.group}></View>;
// };

// export default Group;

// const styles = StyleSheet.create({
//   group: {
//     width: w / 4,
//     height: h / 8,
//     backgroundColor: 'red',
//     margin: 2,
//     borderRadius: 5,
//   },
// });

import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import Card from './Card';
import { Avatar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { groupTypes } from '../DATA';

var { width, height } = Dimensions.get('window');

const Group = ({ onPress }) => {
  return (
    <>
      <Pressable onPress={onPress} style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.center}>
            <View>
              <Ionicons name={'add-circle'} size={60} color="#ffffff" />
            </View>
          </View>
        </Card>
      </Pressable>
    </>
  );
};

export default Group;

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  card: {
    height: 100,
    flexDirection: 'column',
    width: width * 0.3,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    backgroundColor: '#7676ee',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-between',

    margin: 2,
    paddingHorizontal: 10,
  },
});
