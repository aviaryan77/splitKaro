// Hello there!

// Splitkaro is a group expense management app where you can split, track & settle with friends, expenses done in groups. We are different from others in the market (How? You can download the app & check for yourself or visit our Instagram/LinkedIn profile & check the post on our differentiators)

// Problem Statement
// Now, a challenge people face is → “We are already using another app. How do we start using yours if all our balances are maintained there?”
// Our answer to this - “Just like how we change our bank passbook, when the all the pages are filled. We start the new passbook with the last balance record.”

// Assignment
// Assuming a group needs to start recording their expenses on Splitkaro now after using some other app/way to record their group expenditure/
// We would love to see how you do it in React Native (Expo or even standalone)

// Requirements

// An entry point “Add Existing Group Balance” (You can choose any other way/page to show this)
// On click, opens “Create a group” page/overlay
// Enter group name
// Group Type → Home/Trip/Office, etc
// Add members from Contact & using phone numbers
// Add Existing Balances (explained in detail below)
// Create Group button
// Add Existing Balance → A person can either owe or be owed an amount in a group. So, his/her balance could be +ve or -ve. So you must have a way to enter +/- balances.
// +ve → Is owed (Will get money)
// -ve → owes (will give money)
// Create Group Button takes the user to the Group Page that displays the balances of the group members.

// We expect you to complete this assignment & submit it within 5 days with the link to working sample or a github code.
// Happy Coding :)
// In case of any query or concern please write to avinash@splitkaro.com
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
