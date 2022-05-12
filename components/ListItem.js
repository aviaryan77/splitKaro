import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import Card from './Card';
import { Ionicons } from '@expo/vector-icons';
var { width, height } = Dimensions.get('window');

const ListItem = ({ item, onPressed }) => {
  return (
    <Pressable
      onPress={() => onPressed(item)}
      key={Math.random().toString()}
      style={styles.container}
    >
      <Card style={styles.card}>
        <View style={styles.row}>
          <View>
            <Ionicons name="person-circle" size={40} color="black" />
          </View>
          <View style={styles.column}>
            <Text
              style={{ color: '#000000', fontWeight: 'bold', fontSize: 18 }}
            >
              {item?.name.slice(0, 25)}
            </Text>

            {item?.phoneNumbers?.map((item) => (
              <Text style={{ color: '#000000' }}>{item?.number}</Text>
            ))}
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  card: {
    // height: height * 0.1,
    flexDirection: 'column',
    width: width * 0.9,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  row: {
    alignItems: 'center',

    flexDirection: 'row',
    margin: 2,
    paddingHorizontal: 20,
  },
  column: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 2,
    paddingHorizontal: 10,
  },
});
