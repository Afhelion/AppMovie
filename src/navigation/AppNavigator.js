import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../login/container/Login';
import Menu from '../menu/container/Menu';

const Stack = createStackNavigator();

class AppNavigator extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Inicia Sesión'}}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default AppNavigator;
