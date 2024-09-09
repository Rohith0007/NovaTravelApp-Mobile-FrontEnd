import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons like profile, notification, etc.

const Settings = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Profile */}
      <TouchableOpacity style={styles.settingsItem} onPress={() => console.log('Profile clicked')}>
        <View style={styles.itemContainer}>
          {/* <Icon name="person-outline" size={25} color="#000" /> */}
          <Text style={styles.itemText}>Profile</Text>
        </View>
        {/* <Icon name="chevron-forward-outline" size={20} color="#000" /> */}
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity style={styles.settingsItem} onPress={() => console.log('Notifications clicked')}>
        <View style={styles.itemContainer}>
          {/* <Icon name="notifications-outline" size={25} color="#000" /> */}
          <Text style={styles.itemText}>Notifications</Text>
        </View>
        {/* <Icon name="chevron-forward-outline" size={20} color="#000" /> */}
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity style={styles.settingsItem} onPress={() => console.log('About clicked')}>
        <View style={styles.itemContainer}>
          {/* <Icon name="information-circle-outline" size={25} color="#000" /> */}
          <Text style={styles.itemText}>About</Text>
        </View>
        {/* <Icon name="chevron-forward-outline" size={20} color="#000" /> */}
      </TouchableOpacity>

      {/* Help & Support */}
      <TouchableOpacity style={styles.settingsItem} onPress={() => console.log('Help & Support clicked')}>
        <View style={styles.itemContainer}>
          {/* <Icon name="help-circle-outline" size={25} color="#000" /> */}
          <Text style={styles.itemText}>Help & Support</Text>
        </View>
        {/* <Icon name="chevron-forward-outline" size={20} color="#000" /> */}
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => navigation.replace('SignIn')}
      >
        <View style={styles.itemContainer}>
          {/* <Icon name="log-out-outline" size={25} color="#000" /> */}
          <Text style={styles.itemText}>Logout</Text>
        </View>
        {/* <Icon name="chevron-forward-outline" size={20} color="#000" /> */}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingTop: 30
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 1, // For the separator effect
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#000',
  },
});

export default Settings;
