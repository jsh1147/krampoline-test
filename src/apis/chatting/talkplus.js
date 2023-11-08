import { v5 as uuid } from "uuid";
import ERROR_CODE from "../../constants/chatting/ERROR";

// eslint-disable-next-line no-undef
export const client = new TalkPlus.Client({
  appId: import.meta.env.VITE_TALKPLUS_APP_ID,
});

export const login = async () => {
  try {
    const { user } = await client.loginAnonymous({
      userId: "Admin",
      username: "테스트 이름",
      profileImageUrl: "https://picsum.photos/id/24/40",
    });
    return user;
  } catch (error) {
    alert(JSON.stringify(error));
  }
};

export const getPublicChannels = async ({
  lastChannelId,
  searchValue,
  searchSubValue,
}) => {
  try {
    const body = { limit: 30 };
    if (lastChannelId) {
      body.lastChannelId = lastChannelId;
    }
    if (searchValue && searchValue.length > 0) {
      body.category = searchValue;
    }

    if (searchSubValue && searchSubValue.length > 0) {
      body.subcategory = searchSubValue;
    }

    const data = await client.getPublicChannels(body);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getChannelDetail = async (channelId) => {
  try {
    const { channel } = await client.getChannel({
      channelId,
    });
    return channel;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getJoinedChannels = async () => {
  try {
    const { channels } = await client.getChannels({ limit: 30 });
    return channels;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const joinChannel = async (channelId) => {
  try {
    const data = await client.joinChannel({
      channelId: channelId,
    });
    return data;
  } catch (error) {
    if (error.code !== ERROR_CODE.ALREADY_MEMBER) {
      return alert(JSON.stringify(error));
    }
  }
};

export const createChannel = async (data) => {
  const { name, imageUrl = "", content = "", category } = data;
  try {
    const data = await client.createChannel({
      channelId: uuid(name, uuid.DNS),
      name,
      type: "super_public",
      reuseChannel: true,
      hideMessagesBeforeJoin: true,
      imageUrl,
      category,
      data: {
        content,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const leaveChannel = async (channelId) => {
  try {
    const data = await client.leaveChannel({
      channelId: channelId,
      deleteChannelIfEmpty: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateChannel = async (channelId, data) => {
  const { name, imageUrl = "", content = "", category, subcategory } = data;
  try {
    const data = await client.updateChannel({
      channelId,
      name,
      imageUrl,
      category,
      subcategory,
      data: {
        content,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async ({ channelId, lastMessageId }) => {
  console.log("getMessages", channelId, lastMessageId);
  try {
    const body = {
      channelId,
      order: "latest",
      limit: 70,
    };
    if (lastMessageId) {
      body.lastMessageId = lastMessageId;
    }

    const data = await client.getMessages(body);
    return {
      messages: data.messages.reverse(),
      hasNext: data.hasNext,
    };
  } catch (error) {
    console.log(error);
  }
};

export const addMessageText = async (channelId, messageText) => {
  try {
    const data = await client.sendMessage({
      channelId: channelId,
      type: "text",
      text: messageText,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
