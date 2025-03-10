import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
const Welcome = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#161622' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ width: '100%', justifyContent: "center", alignItems: "center", minHeight: "100%", paddingHorizontal: 4, paddingVertical: 20 }}>
          <Image
            source={images.logo}
            style={{ width: 130, height: 84 }}
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            style={{ maxWidth: 380, width: '100%', height: 300 }}
            resizeMode="contain"
          />
          <View style={{ position: "relative", marginTop: 10 }}>
            <Text style={{ fontSize: 30, fontFamily: "Poppins-Bold", color: "#fff", textAlign: "center" }}>Discover Endless Possibilities with {'  '}<Text style={{ color: "#FFA001" }}>Aora</Text></Text>
          </View>
          <Image
            source={images.path}
            style={{ width: 136, height: 15, position: "absolute", bottom: 237, right: -8 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", color: "#CDCDE0", textAlign: "center", marginTop: 20 }}>
            Where Creativity Meets Innovation : Embark on a Journey of Limitless Exploration with Aora
          </Text>
          <CustomButton 
            title="Continue With Email"
            handlePress={() => {
              router.push("/sign-in")
            }}
            containerStyle={{ width: '90%', marginTop: 20 }}
          />
          
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "rgb(100, 100, 100)",
  },
});
