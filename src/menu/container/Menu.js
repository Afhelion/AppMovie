import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {baseURL} from '../../utils/Utils';
import CarouseMovie from '../components/CarouselMovie';
import ListMovie from '../components/ListMovie';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
];

const {width: screenWidth} = Dimensions.get('window');

const Menu = () => {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState(0);

  const reBuildData = (data, url) => {
    let array = [];
    let obj;
    for (const prop in data) {
      obj = {
        id: data[prop].id,
        tittle: data[prop].title,
        illustration: `${url}${data[prop].backdrop_path}`,
      };
      if (array.length <= data.length) {
        array.push(obj);
      }
    }
    console.log('array >>>', array);
    return setEntries(array);
  };

  const postPremieres = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${baseURL}/api/movies/now_playing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(resp => {
        const {data} = resp;
        reBuildData(data.data, data.imageBaseUrl);
      })
      .catch(error => {
        console.log('error >>>', error.response);
      });
  };

  const postRefreshSesion = async () => {
    const data = {
      refresh_token: await AsyncStorage.getItem('refresh'),
    };
    JSON.stringify(data);
    await axios
      .post(`${baseURL}/api/auth/refresh`, data)
      .then(resp => {
        const {data, status} = resp;
        setStatus(status);
        AsyncStorage.setItem('token', data.data.payload.token);
        postPremieres();
      })
      .catch(error => {
        console.log('error >>>', error.response);
      });
  };

  useEffect(() => {
    postRefreshSesion();
  }, [entries]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.TextInput}>
        <Text>Peliculas en estreno</Text>
      </View>
      <CarouseMovie entries={entries} />
      <Text style={styles.TextSubtittle}>Películas más populares </Text>
      <ListMovie />
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
  container_carousel: {
    flex: 1,
    marginTop: '-70%',
    padding: 0,
  },
  container_list: {
    flex: 1,
    marginTop: '-70%',
    padding: 0,
    marginLeft: -110,
    width: -60,
  },
  title: {
    marginTop: '-17%',
    margin: 30,
  },
  TextInput: {
    height: '9%',
    flex: 1,
    padding: 0,
    marginLeft: 15,
    marginTop: '8%',
    width: '95%',
  },
  TextSubtittle: {
    height: 0,
    flex: 1,
    padding: 0,
    marginLeft: 15,
    marginTop: '-5%',
    width: '95%',
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: '20%', android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

export default Menu;
