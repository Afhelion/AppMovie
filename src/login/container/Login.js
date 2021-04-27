import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';

import {setCache, baseURL} from '../../utils/Utils';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alertErrorCredentials = () =>
    Alert.alert('Error', 'Username o password incorrectos', [
      {text: 'OK', onPress: () => console.log('OK Presionado')},
    ]);

  const validAccess = async info => {
    await axios
      .post(`${baseURL}/api/auth/login`, info)
      .then(response => {
        const {data} = response;
        setCache(data);
        navigation.navigate('Menu');
      })
      .catch(error => {
        const {response} = error;
        const {data} = response;
        if (data.statusCode === 400) {
          alertErrorCredentials();
        }
      });
  };
  const userAuth = () => () => {
    const data = {
      username: email,
      password: password,
    };
    JSON.stringify(data);
    validAccess(data);
  };

  useEffect(() => {
    // if (email !== '' && password !== ''){
    //   // setEmail('');
    //   setPassword('');
    // }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://i.pinimg.com/originals/e0/ed/51/e0ed516b359e4144d5ad4e58350b4d45.png',
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Usuario"
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={userAuth()}>
          Ingresar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 100,
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#88F15A',
  },
});

export default Login;
