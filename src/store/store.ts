import { create } from 'zustand';

interface Friend {
    id: number;
    name: string;
    email: string;
    status: boolean
}

export interface Message {
    _id: string,
    sendId: number
    message: string
    conversationId: string
    date?: Date

}

export interface Participant {
    id: number,
    name: string
}

export interface Chat {
    _id: string;
    participants: Participant[]
    lastMessage: Message
}

export interface CurrentChat {
    _id?: string;
    participants: (Friend | undefined)[]
    lastMessage?: Message
}


interface Notification {
    id?: number;
    event?: string;
    message?: Object | string;
}

interface ChatStoreState {
    userId: number | null;
    setUserId: (id: number | null) => void
    chats: Chat[]
    friends: Friend[];
    listChats: Chat[];
    currentChat: Chat | null;
    setCurrentChat: (chat: Chat | null) => void
    notification: Notification | null;
    notifications: Notification[];
    addFriend: (friend: Friend) => void;
    setFriends: (friend: Friend[]) => void;
    loadChats: (chats: Chat[]) => void;
    loadMessages: (messages: Message[]) => void;
    addMessages: (messages: Message) => void
    sendNotification: (notification: Notification | null) => void;
    setLoading: (loading: boolean) => void;
    setFriendStatus: (status: boolean, id: number) => void
    updateLastMessage: (id: string, mssg: Message) => void
    loading: boolean
    messages: Message[]
    socketIsReady: boolean
    setSocketIsReady: () => void
}

const useChatStore = create<ChatStoreState>((set) => ({
    friends: [],
    listChats: [],
    socketIsReady: false,
    setSocketIsReady: () => set(() => ({ socketIsReady: true })),
    currentChat: null,
    setCurrentChat: (currentChat) => set(() => ({ currentChat })),
    chats: [],
    loading: false,
    userId: null,
    setUserId: (userId) => set(() => ({ userId })),
    messages: [],
    notification: null,
    sendNotification: (notification) => set(() => ({ notification })),
    clearNotification: () => set(() => ({ notification: null })),
    notifications: [],
    addFriend: (friend) => set((state) => ({ friends: [...state.friends, friend] })),
    setFriends: (friends) => set(() => ({ friends })),
    loadChats: (chats: Chat[]) => set(() => ({ chats })),
    updateLastMessage: (id, message) => set((state) => ({ chats: [...state.chats.map(c => c._id === id ? { ...c, lastMessage: message } : c)] })),
    loadMessages: (messages) => set(() => ({ messages })),
    addMessages: (message) => set((state) => ({ currentChat: { ...state.currentChat!, lastMessage: message }, messages: [...state.messages, message] })),
    setLoading: (loading) => set(() => ({ loading })),
    //setMessageToChat: (message) => set((state) => ({ messages: [message, ...state.messages] })),
    setFriendStatus: (status, id) => set((state) => ({
        friends: state.friends.map(f => f.id === id ? { ...f, status } : f)
    })),

}));

export default useChatStore;
