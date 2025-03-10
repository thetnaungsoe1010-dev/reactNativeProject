import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn, getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all the fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "Login successful");
      //set it to global state

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            position: "relative",
            top: "30%",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 150, height: 35, position: "relative", right: 15 }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "semibold",
              fontFamily: "Poppins-SemiBold",
              marginVertical: 20,
            }}
          >
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{
              marginTop: 10,
              justifyContent: "start",
              alignItems: "start",
            }}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 20 }}
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={{ marginTop: 20 }}
            isLoading={isSubmitting}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "Poppins-Regular",
                fontSize: 16,
              }}
            >
              Don't have an account?{" "}
            </Text>
            <Link
              href="/sign-up"
              style={{
                color: "#FFA001",
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
              }}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
