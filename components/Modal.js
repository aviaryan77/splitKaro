import * as Yup from 'yup';
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Modal, Portal, Text, Provider } from 'react-native-paper';
import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from './CustomTextInput';
import ValidationErrorContainer from './ValidationErrorContainer';
import { groupTypes } from '../DATA';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Contacts from 'expo-contacts';
var { width: w, height: h } = Dimensions.get('window');

const ModalComponent = ({
  item,
  visible,
  hideModal,
  oweStatus,
  setOweStatus,
  phoneContacts,
  selectedGroup,
  onContactPress,
  setPhoneContacts,
  addButtonHandler,
  selectedContacts,
  setSelectedGroup,
}) => {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setPhoneContacts(data.filter((item) => item.name !== 'null null'));
        }
      }
    })();
  }, []);

  const OweButton = ({ name, iconName, isSelected, onPress }) => {
    return (
      <Pressable
        style={{
          ...styles.oweButton,
          backgroundColor: isSelected ? '#7676ee' : 'white',
        }}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: isSelected ? 'white' : '#7676ee',
          }}
        >
          {name}
        </Text>
        <MaterialCommunityIcons
          name={iconName}
          size={40}
          color={isSelected ? 'white' : '#7676ee'}
        />
      </Pressable>
    );
  };
  const upSchema = Yup.object().shape({
    name: Yup.string()
      .required('name is required')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!'),
    number: Yup.number(),
    amount: Yup.number().required('initial amount is required'),
  });

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Formik
            validateOnChange
            initialValues={{
              name: item?.name,
              amount: item?.amount.toString(),
              phone: '',
            }}
            validationSchema={upSchema}
            onSubmit={(values) => {
              addButtonHandler(values);
              hideModal();
              //   alert(JSON.stringify(values));
            }}
          >
            {(
              {
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              } // props of formik
            ) => (
              <View style={styles.inputContainer}>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}
                >
                  Enter Group Name
                </Text>
                <CustomTextInput
                  containerStyle={{ width: w * 0.5, marginVertical: 5 }}
                  placeholder="Group Name"
                  autoComplete="name"
                  autoCapitalize="none"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={touched.name && errors.name}
                />
                <ValidationErrorContainer
                  touched={touched.name}
                  error={errors.name}
                />

                <Text
                  style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}
                >
                  Enter Amount
                </Text>
                <View style={styles.firstRow}>
                  <OweButton
                    iconName="hand-coin"
                    isSelected={oweStatus === 'get'}
                    onPress={() => setOweStatus('get')}
                    name="owes"
                  />
                  <OweButton
                    iconName="hand-extended"
                    name="owed"
                    isSelected={oweStatus === 'give'}
                    onPress={() => setOweStatus('give')}
                  />

                  <CustomTextInput
                    containerStyle={{ width: w * 0.3, marginVertical: 5 }}
                    placeholder="amount"
                    value={values.amount}
                    keyboardType="numeric"
                    onChangeText={(num) => {
                      setFieldValue('amount', parseInt(num));
                    }}
                    onBlur={handleBlur('amount')}
                    error={touched.amount && errors.amount}
                  />
                </View>
                <ValidationErrorContainer
                  touched={touched.amount}
                  error={errors.amount}
                />
                <Text
                  style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}
                >
                  Choose Group type
                </Text>
                <ScrollView horizontal style={{ width: w * 0.75 }}>
                  {groupTypes.map((group) => (
                    <Pressable
                      style={{
                        ...styles.groupType,
                        backgroundColor:
                          selectedGroup === group.name ? '#7676ee' : '#fff',
                      }}
                      onPress={() => setSelectedGroup(group.name)}
                      key={group.id}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color:
                            selectedGroup === group.name ? '#fff' : '#7676ee',
                        }}
                      >
                        {group.name}
                      </Text>
                      <Ionicons
                        name={group.iconName}
                        size={40}
                        color={
                          selectedGroup === group.name ? '#fff' : '#7676ee'
                        }
                      />
                    </Pressable>
                  ))}
                </ScrollView>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                  {selectedContacts?.map((item) => (
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#fff',
                      }}
                      key={(
                        Math.random() * selectedContacts?.length
                      ).toString()}
                    >
                      {item.name}
                    </Text>
                  ))}
                  <View style={styles.lastRow}>
                    <TouchableOpacity
                      style={{ ...styles.button, width: w / 3 }}
                      onPress={onContactPress}
                    >
                      <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                        Choose Contact
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#fff',
                      }}
                    >
                      Or
                    </Text>
                    <CustomTextInput
                      containerStyle={{
                        width: w * 0.3,
                        marginTop: 25,
                      }}
                      placeholder="Phone No."
                      value={values.phone}
                      keyboardType="numeric"
                      onChangeText={(num) => {
                        setFieldValue('phone', parseInt(num));
                      }}
                      onBlur={handleBlur('phone')}
                      error={touched.phone && errors.phone}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                      Create Group
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  containerStyle: {
    width: w * 0.8,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(27,27,27,.8)',
    marginLeft: w * 0.1,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    flexDirection: 'row',
    height: 25,
    width: 25,
  },
  inputContainer: {
    paddingVertical: 20,
    flexDirection: 'column',
    width: w * 0.85,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstRow: {
    flexDirection: 'row',
    width: w * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastRow: {
    flexDirection: 'row',
    width: w * 0.85,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#7878ff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 25,
    width: w * 0.5,
    height: w * 0.16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupType: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: w / 5,

    height: h / 10,
  },
  oweButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: w / 6,
    height: w * 0.16,
  },
});
