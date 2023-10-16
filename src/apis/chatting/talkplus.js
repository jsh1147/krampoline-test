import { TEST_CHANNEL_ID, avatarUser } from "../../constants/chatting/chatting";

// eslint-disable-next-line no-undef
export const client = new TalkPlus.Client({
  appId: import.meta.env.VITE_TALKPLUS_APP_ID,
});

export const login = async () => {
  try {
    const { user } = await client.loginAnonymous({
      userId: "Admin",
      username: "테스트 이름",
      profileImageUrl: "../images/user_0.png",
    });
    return user;
  } catch (error) {
    alert(JSON.stringify(error));
  }
};

export const getChannels = async () => {
  try {
    const { channels } = await client.getPublicChannels({ limit: 20 });
    return channels;
  } catch (error) {
    console.log(error);
  }
};

export const joinChannel = async () => {
  try {
    const data = await client.joinChannel({
      channelId: TEST_CHANNEL_ID,
    });
    return data;
  } catch (error) {
    if (error.code === "2003") {
      await client.createChannel({
        channelId: TEST_CHANNEL_ID,
        name: TEST_CHANNEL_ID,
        type: "super_public",
        members: [],
      });
    } else if (error.code !== "2008") {
      return alert(JSON.stringify(error));
    }
  }
};

export const createChannel = async (newChannelId) => {
  try {
    const data = await client.createChannel({
      channelId: newChannelId, // required
      name: newChannelId, // optional
      type: "super_public", // required
      reuseChannel: true, // default: false
      hideMessagesBeforeJoin: true, // if true, users cannot see messages older than their channel join date
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async () => {
  try {
    const { messages } = await client.getMessages({
      channelId: TEST_CHANNEL_ID,
    });
    return messages;
  } catch (error) {
    console.log(error);
  }
};

export const addMessageText = async (messageText) => {
  try {
    const data = await client.sendMessage({
      channelId: TEST_CHANNEL_ID,
      type: "text",
      text: messageText,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
