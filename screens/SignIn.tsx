import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import your image assets
import homeImage from '../Images/home.png';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 40, android: 0 })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground source={homeImage} style={styles.backgroundImage}>
            <View style={styles.overlay}>
              <Text style={styles.title}>NOVA</Text>
            </View>
          </ImageBackground>

          <View style={styles.formContainer}>
            <Text style={styles.signInText}>Sign In</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()} // Focus next input
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
                onChangeText={(text) => setPassword(text)}
                value={password}
                autoCapitalize="none"
                ref={(input) => (this.passwordInput = input)} // Reference for input focus
                returnKeyType="done"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={{
                    uri: showPassword
                      ? 'https://img.icons8.com/ios-glyphs/30/000000/visible.png'
                      : 'https://img.icons8.com/ios-glyphs/30/000000/invisible.png',
                  }}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}


            <TouchableOpacity
              style={styles.signInButton}
              onPress={async () => {
                setLoading(true);  // Start spinner
                setError('');  // Clear previous errors
                
                try {
                  const response = await fetch('https://novacontroller-5c275739d0b9.herokuapp.com/signin/', {  // Replace with your API URL
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: email,
                      password: password,
                    }),
                  });
                
                  const data = await response.json();
                
                  if (response.ok) {
                    setLoading(false);  // Stop spinner
                    navigation.navigate('MainTabs');  // Navigate to Home or Dashboard screen upon successful sign-in
                  } else {
                    setLoading(false);  // Stop spinner
                    setError(data.error || 'Failed to sign in. Please check your credentials.');
                  }
                } catch (err) {
                  setLoading(false);  // Stop spinner
                  setError('An error occurred. Please try again.');
                }
              }}
            >
              <Text style={styles.signInButtonText}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null} */}


            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password? </Text>
              <TouchableOpacity onPress={() => console.log('Reset Password')}>
                <Text style={styles.resetPasswordText}>Reset Password</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.socialIconsContainer}>
              <TouchableOpacity>
                <Image source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={{ uri: 'https://img.icons8.com/?size=512&id=95294&format=png' }} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don’t have an Account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0038FF',
  },
  formContainer: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    marginTop: -50,
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 10,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    color: '#000',
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  signInButton: {
    backgroundColor: '#3A4BE7',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#000',
  },
  resetPasswordText: {
    color: '#3A4BE7',
    fontWeight: 'bold',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#000',
  },
  signUpLink: {
    color: '#3A4BE7',
    fontWeight: 'bold',
  },
});

export default SignIn;