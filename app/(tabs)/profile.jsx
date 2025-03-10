import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { getUserPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";
const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));

  const [refreshing, setRefreshing] = useState(false);

  const logout = async () => {
    try {
      await signOut();
      setUser(null);  
      setIsLoggedIn(false);

      router.replace("/sign-in");
    } catch (error) {
      console.log("logout error:", error);
    }
  };

  //  console.log("userId", user.$id , posts);

  // useEffect(() => {
  //   refetch();
  // }, [userId]);
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
              marginTop: 12,
              marginBottom: 12,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 12,
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 12,
              }}
              onPress={logout}
            >
              <Image
                source={icons.logout}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>

            <View
              style={{
                width: 50,
                height: 50,
                borderWidth: 2,
                borderColor: "#ffa001",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              <Image
                source={{ uri: user?.avatar }}
                style={{ width: "90%", height: "90%", resizeMode: "cover", borderRadius:10}}
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyle={{ marginTop: 20 }}
              titleStyle={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}
            />

            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <InfoBox
                title={posts?.length || 0}
                subtitle={"Posts"}
                containerStyles={{ marginRight: 30 }}
                titleStyles={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              />
              <InfoBox
                title="1.2K"
                subtitle={"Followers"}
                titleStyles={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              />
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

export default Profile;
