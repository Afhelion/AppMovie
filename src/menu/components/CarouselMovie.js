import React, {useRef} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {StyleSheet, View, Dimensions, Platform} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const CarouseMovie = ({entries}) => {
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        {/* <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text> */}
      </View>
    );
  };

  return (
    <View style={styles.container_carousel}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
      {/* <TouchableOpacity onPress={goForward}>
      <Text>go to next slide</Text>
    </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container_carousel: {
    flex: 1,
    marginTop: '-70%',
    padding: 0,
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

export default CarouseMovie;
