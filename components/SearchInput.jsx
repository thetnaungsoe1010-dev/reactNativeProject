import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();   
  const [query, setQuery] = useState(initialQuery || "");
  return (
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
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          color: "#fff",
          fontFamily: "Poppins-Regular",
          fontSize: 16,
          padding: 0,
          margin: 0,
          border: "none",
          outline: "none",
        }}
        placeholder={placeholder}
        value={query}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        // secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity
        onPress={() => {
            if(!query){
                return Alert.alert("Missing Query", "Please enter a query to search for");
            }

            if(pathname === "/search"){
                router.setParams({ query });
            }else{
                router.push(`/search/${query}`);
            }
        }}
      >
        <Image
          source={icons.search}
          style={{ width: 20, height: 20, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
