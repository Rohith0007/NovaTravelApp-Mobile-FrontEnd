import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn'; // Adjust the path according to your project structure
import SignUp from './screens/SignUp';
import MainTabs from './screens/MainTabs'; // Import the MainTabs component

// Import the local image
import homeImage from './Images/home.png'; // Adjust the path according to your project structure

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={homeImage} // Use the imported image
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>NOVA</Text>
        <Text style={styles.subtitle}>Discover Your Journey</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide header for home screen
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }} // Customize header options as needed
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs}  // Use MainTabs here
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3A4BE7', // Blue color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#000000', // Black color
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF', // White color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
