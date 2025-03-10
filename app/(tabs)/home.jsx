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
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const Home = () => {
  const { user } = useGlobalContext();

  const { data: posts, isLoading, refetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  // console.log("posts", posts);

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161622", height: "100%" }}>
      <StatusBar backgroundColor="#161622" style="light" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} saveIcon={true} />}
        ListHeaderComponent={() => (
          <View
            style={{
              marginTop: 12,
              marginBottom: 12,
              marginLeft: 12,
              marginRight: 12,
              padding: 12,
              backgroundColor: "#16161f",
              borderRadius: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
                >
                  Welcome Back
                </Text>
                <Text
                  style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}
                >
                  {user?.username}
                </Text>
              </View>

              <View style={{ marginTop: 12 }}>
                <Image
                  source={images.logoSmall}
                  style={{ width: 36, height: 36 }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput placeholder="Search videos" />

            <View
              style={{
                width: "100%",
                flex: 1,
                paddingTop: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 12,
                  marginLeft: 12,
                }}
              >
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
