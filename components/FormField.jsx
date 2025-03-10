import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={{ marginBottom: 20, ...otherStyles }}>
      <Text
        style={{ color: "#fff", fontFamily: "Poppins-Medium", marginBottom: 5 }}
      >
        {title}
      </Text>
      <View
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          backgroundColor: "#21212b",
          paddingHorizontal: 10,
          justifyContent: "center",
          borderWidth: 1,
          alignSelf: "center",
          borderColor: isFocused ? "#FFA001" : "#21212b",
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: "#fff",
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
          }}
          placeholder={placeholder}
          value={value}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={{ width: 20, height: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
};

export default FormField;
