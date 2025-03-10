import { Client, Account, ID, Avatars, Databases,Query, Storage } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.exbrain.aora",
  projectId: "67c90f70001248ef2b61",
  databaseId: "67c932f1003e593acbf3",
  userCollectionId: "67c9334d000b7806ce06",
  videoCollectionId: "67c933920037653cb980",
  storageId: "67c93632000c8aa16c76",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);  
const databases = new Databases(client);
const storage = new Storage(client);

//Create User
export const createUser = async (email, password, username) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarURL,
      }
    );
    return newUser;
  } catch (error) {
    console.log('createUser error:', error);
    throw error;
  }
};

//Sign In
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log('signIn error:', error);
    throw error;
  }
}

//Get Account
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log('getAccount error:', error);
    throw error;
  }
};

//Get Current User
export const getCurrentUser = async () => {
  try {
    // Get current account
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    // Get current user
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      // Filter by accountId
      [Query.equal("accountId", currentAccount.$id) ]
    );
    if (!currentUser) throw Error;
    
    // Return first user
    return currentUser.documents[0];
  } catch (error) {
    console.log('getCurrentUser error:', error);
    return null;
  }
};

// Get all video Posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt')]

    );

    return posts.documents;
  } catch (error) {
    console.log('getAllPosts error:', error);
    throw error;
  }
}

//Get Trending Posts
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt',Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    console.log('getAllPosts error:', error);
    throw error;
  } 
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId, 
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    console.log('searchPosts error:', error);
    throw error;
  }
}

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId, 
      [Query.equal("creator", userId), Query.orderDesc('$createdAt')]
    );

    return posts.documents;
  } catch (error) {
    console.log('getUserPosts error:', error);
    throw error;
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    console.log('signOut error:', error);
    throw error;
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if(type === 'image') {
      fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100);
    } else if(type === 'video') {
      fileUrl = storage.getFileView(config.storageId, fileId);
    }else{
      throw new Error('Invalid file type');
    }

    if(!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const uploadFile = async (file, type) => {
  
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  try {
    const uploadedFile = await storage.createFile(config.storageId, ID.unique(), asset);

    const fileUrl = await getFilePreview(uploadedFile.$id,type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
     uploadFile(form.thumbnail, 'image'),
     uploadFile(form.video, 'video'),
    ]);  

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost; 
  }catch(error){
    throw new Error(error);
  }
}

export const saveVideo = async (video, userId) => {
  try {
    const videoDocument = await databases.getDocument(
      config.databaseId,
      config.videoCollectionId,
      video
    );

    const likedVideos = videoDocument.like || [];
    console.log("likedVideos", likedVideos);
    if (!likedVideos.includes(userId)) {
      likedVideos.push(userId);  
    }

    await databases.updateDocument(
      config.databaseId,
      config.videoCollectionId,
      video,
      { like: likedVideos }
    );

    return likedVideos;
  } catch (error) {
    throw new Error(error);
  }
}