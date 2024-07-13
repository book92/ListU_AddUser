import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const users = [
  { id: '1', name: 'Chanh', email: 'chanh@gmail.com', password: 'password123', banned: false },
  { id: '2', name: 'Danh', email: 'danh@gmail.com', password: 'password123', banned: false },
];

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //kiểm tra email và password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      if (user.banned) {
        Alert.alert('Login Failed', 'You have been banned from logging in.');
      } else {
        navigation.navigate('UserList', { users });
      }
    } else {
      Alert.alert('Login Failed', 'Sai email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',  // Center the content vertically
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default Login;
