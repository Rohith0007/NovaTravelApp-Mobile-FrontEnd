import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal';

// Import your image assets
import homeImage from '../Images/home.png'; // Assuming you want to keep the local background image

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('US'); // Default country code
  const [callingCode, setCallingCode] = useState('+1'); // Default calling code

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCallingCode('+' + country.callingCode[0]);
  };

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  return (
    <View style={styles.container}>
      <ImageBackground source={homeImage} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.title}>NOVA</Text>
        </View>
      </ImageBackground>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.signUpText}>Sign Up</Text>

        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="First Name"
            placeholderTextColor="#888"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            editable={true}
          />
          
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Last Name"
            placeholderTextColor="#888"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            editable={true}
          />
        </View>

        {firstNameError && <Text style={{ color: 'red' }}>First name is required</Text>}
        {lastNameError && <Text style={{ color: 'red' }}>Last name is required</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          onChangeText={(text) => setEmail(text)}
          value={email}
          editable={true}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()} // Focus next input
        />
        {emailError && <Text style={{ color: 'red' }}>Email is required</Text>}

        {/* Phone Number Section */}
      <View style={styles.phoneContainer}>
        {/* Country Code Picker */}
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCallingCode
          onSelect={onSelectCountry}
          containerButtonStyle={styles.countryPicker}
        />
        <Text style={styles.callingCode}>{callingCode}</Text>

        {/* Phone Number Input */}
        <TextInput
          ref={(input) => (this.phoneInput = input)}
          style={styles.phoneInput}
          placeholder="Phone Number"
          placeholderTextColor="#888"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          editable={true}
        />
      </View>


        <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
          editable={true}
          textContentType="oneTimeCode"  // Add this line to prevent strong password suggestion
        />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={{
                uri: showPassword
                  ? 'https://img.icons8.com/ios-glyphs/30/000000/visible.png' // Eye open icon URL
                  : 'https://img.icons8.com/ios-glyphs/30/000000/invisible.png', // Eye closed icon URL
              }}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {passwordError && <Text style={{ color: 'red' }}>Password is required</Text>}


        <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry={!showConfirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          editable={true}
          textContentType="oneTimeCode"  // Add this line here too
        />

          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Image
              source={{
                uri: showConfirmPassword
                  ? 'https://img.icons8.com/ios-glyphs/30/000000/visible.png' // Eye open icon URL
                  : 'https://img.icons8.com/ios-glyphs/30/000000/invisible.png', // Eye closed icon URL
              }}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {confirmPasswordError && <Text style={{ color: 'red' }}>Confirm password is required</Text>}
        {passwordMismatchError && <Text style={{ color: 'red' }}>Passwords do not match</Text>}


        <TouchableOpacity
          style={styles.signUpButton}
          onPress={async () => {
            // Reset errors
            setFirstNameError(!firstName);
            setLastNameError(!lastName);
            setEmailError(!email);
            setPasswordError(!password);
            setConfirmPasswordError(!confirmPassword);
            setPasswordMismatchError(password !== confirmPassword);
          
            if (!firstName || !lastName || !email || !password || !confirmPassword || password !== confirmPassword) {
              return;  // Prevent submission if validation fails
            }
          
            setLoading(true);  // Start spinner
            setError('');  // Clear previous errors
          
            try {
              console.log(JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                phone_number: phoneNumber,
                country_code: callingCode,
              }));
              
              const response = await fetch('https://novacontroller-5c275739d0b9.herokuapp.com/signup/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  first_name: firstName,
                  last_name: lastName,
                  email: email,
                  password: password,
                  phone_number: phoneNumber,      // <--- Add this
                  country_code: callingCode,      // <--- Add this
                }),
              });
          
              const data = await response.json();
          
              if (response.ok) {
                setLoading(false);  // Stop spinner
                navigation.navigate('SignIn');  // Go to SignIn screen
              } else {
                setLoading(false);  // Stop spinner
                setError(data.error || 'Failed to sign up');
              }
            } catch (err) {
              setLoading(false);  // Stop spinner
              setError('An error occurred, please try again.');
            }
          }}          
        >
          <Text style={styles.signUpButtonText}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>


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

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInLink}>SignIn</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
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
    color: '#3A4BE7',
  },
  formContainer: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    marginTop: -50,
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
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
  halfInput: {
    width: '48%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingTop: 20,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    borderColor: 'transparent',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    marginBottom: 20
  },
  signUpButton: {
    backgroundColor: '#3A4BE7',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    color: '#000',
  },
  signInLink: {
    color: '#3A4BE7',
    fontWeight: 'bold',
  },

  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
  },
  countryPicker: {
    marginRight: 10,
  },
  callingCode: {
    fontSize: 16,
    paddingRight: 10,
    paddingLeft: 5,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default SignUp;