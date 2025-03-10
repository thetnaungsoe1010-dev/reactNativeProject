import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, StatusBar, Text, View } from "react-native";
import SearchInput from "../../components/SearchInput";
import { images } from "../../constants";
import Trending from "../../components/Trending";
// import useAppwrite from "../../lib/useAppwrite";
// import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { getAllPosts, getLatestPosts, searchPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import { useLocalSearchParams } from "expo-router";

const Bookmark = () => {

  // useEffect(() => {
  //   refetch();
  // }, []);
  // console.log("posts", posts);

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#161622", height: "100%" }}
    >
      <StatusBar backgroundColor="#161622" style="light" />
      <FlatList
        data={""}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            style={{
              marginVertical: 12,
              paddingHorizontal: 12,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontFamily: "Poppins-Bold", marginTop: 12 }}>
              Saved Videos
            </Text> 
            <View style={{  marginBottom: 12 }}>
              <SearchInput placeholder="Search your saved videos" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
