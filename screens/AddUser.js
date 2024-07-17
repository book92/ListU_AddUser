import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const AddUser = ({ route, navigation }) => {
  const { setUsers } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qrData, setQRData] = useState(null);

  const handleAddUser = () => {
    if (name && email && password) {
      const newUser = { id: Date.now().toString(), name, email, password, banned: false };
      setUsers(prevUsers => [...prevUsers, newUser]);
      Alert.alert('User Added', `Name: ${name}, Email: ${email}`);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'All fields are required');
    }
  };

  const handleGenerateQR = () => {
    if (name && email && password) {
      const userInfoURL = `https://example.com/userinfo?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
      setQRData(userInfoURL);
    } else {
      Alert.alert('Error', 'All fields are required to generate QR code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Add User" onPress={handleAddUser} />
      <Button title="Generate QR Code" onPress={handleGenerateQR} />
      {qrData && (
        <View style={styles.qrContainer}>
          <Text>Scan this QR code:</Text>
          <QRCode value={qrData} size={200} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  qrContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddUser;
