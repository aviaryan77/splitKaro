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

const Group = ({ group, onPress }) => {
  return (
    <>
      <Pressable
        onPress={() => onPress(group.id)}
        key={group.id}
        style={styles.container}
      >
        <Card style={styles.card}>
          <View style={styles.center}>
            <View>
              <Ionicons
                name={
                  groupTypes.find((type) => type.name === group?.type).iconName
                }
                size={32}
                color="#7676ee"
              />
            </View>
            <View>
              <Text>{group.name}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: +group.balance > 0 ? 'green' : 'red',
                }}
              >
                ₹ {group.balance}
              </Text>
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
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-between',

    margin: 2,
    paddingHorizontal: 10,
  },
});
