import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

const ValidationErrorContainer = (props) => {
  return (
    <View style={{ height: 25 }}>
      {props.error && props.touched ? (
        <View>
          <View style={styles.border}>
            <Text style={styles.errorMsg}>{props.error}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ValidationErrorContainer;

const styles = StyleSheet.create({
  border: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorMsg: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 6,
    color: 'red',
  },
});
