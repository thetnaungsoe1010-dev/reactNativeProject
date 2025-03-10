import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
    prompt,
    saveIcon,
  },
}) => {
  const [play, setPlay] = useState(false);
  const [save, setSave] = useState(saveIcon);

  const handleSave = () => {
    
    setSave(!save);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 12,
        paddingHorizontal: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "start", gap: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                resizeMode: "cover",
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              marginLeft: 2,
              gapVertical: 12,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "semibold",
                maxWidth: 200,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{
                color: "#f5f5f5",
                fontSize: 12,
                fontFamily: "Poppins-Regular",
              }}
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
          <TouchableOpacity
            style={{
              paddingTop: 35,
              marginRight: 20,
            }}
            onPress={handleSave}
          >
            <Image
              source={icons.bookmark}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
      </View>
      {play ? (
        <Video
        source={{ uri: video }}
        style={{
          width: "90%",
          height: 200,
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
            width: "90%",
            height: 200,
            borderRadius: 12,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12,
              marginTop: 12,
              resizeMode: "cover",
            }}
          ></Image>
          <Image
            source={icons.play}
            style={{ width: 50, height: 50,
              position: "absolute",
              resizeMode: "contain",
              zIndex: 1,
            }}
          ></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
