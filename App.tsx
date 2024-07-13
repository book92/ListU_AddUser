import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from './screens/UserList';
import UserDetails from './screens/UserDetails';
import AddUser from './screens/AddUser';
import Login from './screens/Login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="UserList" component={UserList} options={{ title: 'Danh sách người dùng' }} />
        <Stack.Screen name="UserDetails" component={UserDetails} options={{ title: 'Chi tiết người dùng' }} />
        <Stack.Screen name="AddUser" component={AddUser} options={{ title: 'Thêm người dùng' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
