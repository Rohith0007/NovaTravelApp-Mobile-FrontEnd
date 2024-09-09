import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyEvents from '../screens/MyEvents'; // Adjust the path according to your project structure
import Calendar from '../screens/Calendar'; // Adjust the path according to your project structure
import Settings from '../screens/Settings'; // Adjust the path according to your project structure
import { Image } from 'react-native';

// Import icons for the tabs
import myTripsIcon from '../Images/myTrips.png';
import calendarIcon from '../Images/calander.png';
import settingsIcon from '../Images/settings.png';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false, // Hide labels below the icons
        headerShown: false, // Disable the top header for all screens
        tabBarStyle: {
          height: 60, // Adjust the height of the bottom tab bar
          paddingBottom: 10, // Adjust the padding to bring icons up a little
        },
        tabBarIcon: ({ size }) => {
          let iconSource;

          if (route.name === 'MyEvents') {
            iconSource = myTripsIcon;
          } else if (route.name === 'Calendar') {
            iconSource = calendarIcon;
          } else if (route.name === 'Settings') {
            iconSource = settingsIcon;
          }

          return (
            <Image source={iconSource} style={{ width: size, height: size }} />
          );
        },
      })}
    >
      <Tab.Screen
        name="MyEvents"
        component={MyEvents}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
