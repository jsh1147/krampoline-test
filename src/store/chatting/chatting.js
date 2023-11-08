import { atom } from "jotai";
import { CHANNEL_TYPES } from "../../constants/chatting/CHAT";

export const chattingRoomIdAtom = atom("");
export const channelIdAtom = atom("");
export const userIdAtom = atom("");
export const userProfileImageUrlAtom = atom("");
export const userNameAtom = atom("");

export const currentChannelTypeAtom = atom(CHANNEL_TYPES.PUBLIC.tabName);
