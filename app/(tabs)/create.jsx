import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Video, ResizeMode } from "expo-av";
import icons from "../../constants/icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",
  });

  const {user} = useGlobalContext();

  const openPicker = async (selectedType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectedType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos  ,
      aspect: [4,3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectedType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      } 
      if (selectedType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if(!form.prompt || !form.title || !form.video || !form.thumbnail) {
      Alert.alert("Please fill in all the fields");
    }
    setUploading(true);

    try{
      await createVideo(  
        {...form,
          userId: user.$id,
        }
      );

      Alert.alert("Success","Video uploaded successfully");
      router.push("/home");
    }catch(error){
      Alert.alert("Error",error.message);
    }
    finally{
      setForm({
        title: "",
        thumbnail: null,
        video: null,
        prompt: "",
      });
      setUploading(false);
    }
    
    
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView style={{ paddingHorizontal: 12, marginVertical: 12 }}>
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Upload Video
          </Text>
        </View>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Get your video a catchy title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={{ marginTop: 20 }}
        />
        <View style={{ marginTop: 12, gap: 4 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "Poppins-Medium",
            }}
          >
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video }}
                style={{ width: 100, height: 100 }}
                isLooping
                isMuted
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 150,
                  backgroundColor: "#222",
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: "#333",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#444",
                    borderStyle: "dashed",
                  }}
                >
                  <Image
                    source={icons.upload}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, gap: 4 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "Poppins-Medium",
            }}
          >
            Upload Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                style={{ width: 100, height: 100 }}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 100,
                  backgroundColor: "#222",
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#444",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Image
                    source={icons.upload}
                    style={{ width: 20, height: 20 }}
                />
                <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Poppins-Medium" }}>Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={{ marginTop: 20 }}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles={{ marginTop: 20 }}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
