import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MyEvents = ({ navigation }) => {
  // Sample data (replace with dynamic data as needed)
  const events = [
    {
      id: 1,
      title: 'Trip Masons',
      location: 'Paris, Italy',
      participants: 4,
      additionalPeople: '+4',
      imageUri: require('../Images/paris.png'),
    },
  ];
  const [searchText, setSearchText] = useState('');

  return (
    <View style={[styles.container, {marginTop:-30}]}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>My Trips</Text>  */}
        <TextInput
            style={styles.searchBar}
            placeholder="Search events..."
            onChangeText={(text) => {
                // Handle the search logic here
                console.log(text);
            }}
        />
        <View style={styles.headerIcons}>
        <TouchableOpacity>
            <Image source={require('../Images/filterIcon.png')} style={{ width: 20, height: 20, marginTop:5 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconSpacing}>
            <Image source={require('../Images/chatIcon.png')} style={{ width: 23, height: 23, marginTop:5 }} />
        </TouchableOpacity>
        </View>

      </View>

      {/* Event List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
          <View style={styles.eventInfo}>
            {/* Title and location */}
            <View style={styles.titleContainer}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.participantsContainer}>
                <Text style={styles.participantText}>{event.participants}</Text>
                <Image source={require('../Images/peopleIcon.png')} style={{ width: 18, height: 18}} />
              </View>
            </View>
        
            {/* Location below title */}
            <View style={styles.locationContainer}>
                <Image source={require('../Images/locationIcon.png')} style={{ width: 15, height: 15}} />
              <Text style={styles.eventLocationText}>
                {event.location} {event.additionalPeople}
              </Text>
            </View>
          </View>
            <Image
              source={event.imageUri}
              style={styles.eventImage}
            />
          </View>
        ))}
      </ScrollView>

      {/* Add Event Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log('Add event')}
      >
        <Image source={require('../Images/addNew.png')} style={{ width: 50, height: 50, top: 70}} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 100, // Add padding to avoid collision with the top
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    left:4,
    flexDirection: 'row',
  },
  iconSpacing: {
    marginLeft: 15,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  eventsContainer: {
    flex: 1,
    padding: 20,
  },

    eventCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    eventInfo: {
      flex: 1,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Push participants and icon to the right
      alignItems: 'center',
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    participantsContainer: {
      flexDirection: 'row', // Align 4 and icons horizontally
      alignItems: 'center',
    },
    participantText: {
      fontSize: 18,
      marginRight: 5, // Space between number and icon
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5, // Add some space between title and location
    },
    eventLocationText: {
      marginLeft: 5,
      fontSize: 14,
      color: '#555',
    },
  
  
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    elevation: 5,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,  // Ensures it takes up the available space between the icons
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,  // Adjusts spacing between search bar and icons
  }
  
});

export default MyEvents;
