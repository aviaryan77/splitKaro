// Theme TextInput Components
// style props: containerStyle={{}} style={{}} error={} secureTextEntry endIcon=""
// placeholder="" value={} onChangeText={} onBlur={} keyboardType=""

import React, { useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
var { width, height } = Dimensions.get('window');

//------------CustomTextInput----------------//
const CustomTextInput = (props) => {
  return (
    <View
      style={[
        { ...styles.inputContainer, ...props.containerStyle },
        props.error ? { borderWidth: 1, borderColor: 'red' } : null,
      ]}
    >
      {props.fieldText && (
        <Text style={[styles.fieldText, { color: Colors.text.disabled }]}>
          {props.fieldText}
        </Text>
      )}
      <View style={styles.action}>
        <TextInput
          {...props}
          id={props.id}
          name={props.name}
          value={props.value}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          editable={props.editable}
          autoFocus={props.autoFocus}
          placeholder={props.placeholder}
          autoCorrect={props.autoCorrect}
          autoComplete={props.autoComplete}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          onEndEditing={props.onEndEditing}
          autoCapitalize={props.autoCapitalize}
          secureTextEntry={props.secureTextEntry}
          style={{ ...styles.input, ...props.style }}
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 30,
    width: width * 0.85,
    height: width * 0.16,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    // borderWidth: 1,
  },
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    color: '#333',
    marginLeft: 10,
    width: width * 0.65,
    height: width * 0.1,
  },
  fieldText: {
    fontSize: 12,
    color: '#333',
    paddingTop: 5,
    paddingLeft: 12,
    // borderWidth: 1,
  },
});

export default CustomTextInput;
