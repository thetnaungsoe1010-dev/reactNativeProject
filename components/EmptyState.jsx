import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
const EmptyState = ({ title, subtitle }) => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={images.empty}
        style={{ width: 200, height: 200, resizeMode: "contain" }}
      />
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontFamily: "Poppins-SemiBold",
          marginTop: 2,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{ color: "gray", fontSize: 16, fontFamily: "Poppins-Medium" }}
      >
        {subtitle}
      </Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
