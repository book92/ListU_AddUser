import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Alert, StyleSheet } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';

const UserList = ({ route, navigation }) => {
  const { users: initialUsers } = route.params || { users: [] }; // Thêm giá trị mặc định nếu không có users
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const banUser = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, banned: !user.banned } : user));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { user: item })}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </TouchableOpacity>
      <Button title={item.banned ? "Unban" : "Ban"} onPress={() => banUser(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('AddUser', { setUsers })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  searchbar: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default UserList;
