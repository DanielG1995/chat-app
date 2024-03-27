import { Message } from "../store/store"

export interface Friend {
    name: string,
    isActive: boolean,
    email: string
    id: number
}

export interface FriendRequest {
    id: number
    creator: Friend
    receiver: Friend
}

export interface Chat {
    _id: string;
    participants: number[]
    lastMessage: Message
}