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

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  const [refreshing, setRefreshing] = useState(false);

  console.log("query", query , posts);

  useEffect(() => {
    refetch();
  }, [query]);
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
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            style={{
              marginVertical: 12,
              paddingHorizontal: 12,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>
              Search Results
            </Text> 
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
              {query}
            </Text>
            <View style={{ marginTop: 12, marginBottom: 12 }}>
              <SearchInput initialQuery={query} />
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

export default Search;
