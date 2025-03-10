import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import icons from '../constants/icons'
import { Video, ResizeMode } from 'expo-av'

const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};
const zoomOut = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.8 }],
  },
};

const TrendingItem = ({activeItem, item})=>{
  const [play, setPlay] = useState(false);

  // console.log(activeItem.$id, item.$id)
  return(
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      // iterationCount={1}
      duration={500}
      easing="ease-in-out"
      style={{
        marginRight: 12,
      }}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 200,
            height: 300,
            borderRadius: 30,
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={status => {
            if(status.didJustFinish){
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setPlay(true)}
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{
              width: 200,
              height: 300,
              borderRadius: 30,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
              elevation: 10,
              resizeMode: 'cover',
              borderWidth: 1,
              borderColor: '#fff',
            }}
          ></ImageBackground>
          <Image
            source={icons.play}
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
              zIndex: 1,
              resizeMode: 'contain',
              borderRadius: 50,
            }}
          ></Image>
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}
const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  console.log("activeItem", activeItem)
  const viewableItemsChanged = ({viewableItems})=>{
    if(viewableItems.length > 0){
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => 
            <TrendingItem 
              activeItem={activeItem}   
              item={item} /> 
        }
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170 }}
        horizontal
    />
  );
};

export default Trending