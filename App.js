import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { w, h } from './Styles';
import { groups } from './DATA';
import { Group, CreateGroup, Modal, ModalPhone } from './components';

const App = () => {
  const [groupsData, setGroupsData] = useState([...groups]);
  const [visible, setVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [oweStatus, setOweStatus] = useState(''); // 'get', 'give'
  const [selectedGroup, setSelectedGroup] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showPhoneModal = () => setPhoneModalVisible(true);
  const hidePhoneModal = () => setPhoneModalVisible(false);

  useEffect(() => {
    setGroupsData([...groups]);
  }, [onGroupAdd]);

  const onGroupAdd = (values) => {
    console.warn(values);
    let tempObj = {
      id: Math.random.toString(),
      name: values.name,
      type: selectedGroup,
      members: [...selectedContacts, { number: values.phone }],
      balance:
        oweStatus === 'get' ? Number(values.amount) : -Number(values.amount),
    };
    setGroupsData((groups) => [tempObj, ...groups]);
    setOweStatus('');
    setSelectedGroup('');
    setSelectedContacts([]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#98ffff', '#b3ffff', '#192f6a']}>
        <StatusBar style="auto" />
        <Text style={styles.recentText}>Recent Groups</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CreateGroup onPress={showModal} />
          {groupsData.map((group) => (
            <Group onPress={() => {}} key={group.id} group={group} />
          ))}
        </ScrollView>

        <Modal
          item={modalItem}
          visible={visible}
          showModal={showModal}
          hideModal={hideModal}
          oweStatus={oweStatus}
          setOweStatus={setOweStatus}
          addButtonHandler={onGroupAdd}
          phoneContacts={phoneContacts}
          selectedGroup={selectedGroup}
          onContactPress={showPhoneModal}
          selectedContacts={selectedContacts}
          setPhoneContacts={setPhoneContacts}
          setSelectedGroup={setSelectedGroup}
        />
        <ModalPhone
          item={modalItem}
          hideModal={hidePhoneModal}
          showModal={showPhoneModal}
          visible={phoneModalVisible}
          phoneContacts={phoneContacts}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#98ffff',
    justifyContent: 'center',
  },
  recentText: {
    marginTop: 20,
    textAlign: 'left',
    width: w,
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 20,
  },
});

export default App;
