import React from 'react';
import { Modal, Portal, Text, Provider } from 'react-native-paper';

import { View, StyleSheet, Dimensions, FlatList } from 'react-native';

import ListItem from './ListItem';
var { width: w, height: h } = Dimensions.get('window');

const ModalPhone = ({
  visible,
  hideModal,
  phoneContacts,
  setSelectedContacts,
}) => {
  const onContactSelect = (contact) => {
    hideModal();
    setSelectedContacts((selectedContacts) => [...selectedContacts, contact]);
  };
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          {phoneContacts?.length ? (
            <View style={{ height: h / 2 }}>
              <FlatList
                data={phoneContacts}
                contentContainerStyle={{ paddingBottom: 200 }}
                keyExtractor={(item) => item.lookupKey}
                renderItem={({ item }) => (
                  <ListItem
                    key={Math.random().toString()}
                    item={item}
                    onPressed={onContactSelect}
                  />
                )}
              />
            </View>
          ) : null}
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ModalPhone;

const styles = StyleSheet.create({
  containerStyle: {
    width: w * 0.8,
    borderRadius: 30,
    overflow: 'hidden',
    marginLeft: w * 0.1,
    alignItems: 'center',
    backgroundColor: 'rgba(27,27,27,.8)',
  },
  iconContainer: {
    position: 'relative',
    flexDirection: 'row',
    height: 25,
    width: 25,
  },
  inputContainer: {
    width: w * 0.85,
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  firstRow: {
    width: w * 0.85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  container: { alignItems: 'center', marginTop: 20 },
  card: {
    height: h * 0.1,
    flexDirection: 'column',
    width: w * 0.9,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 2,
    paddingHorizontal: 10,
  },
});
