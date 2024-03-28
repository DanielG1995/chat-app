import { useEffect, useMemo } from "react";
import SocketIOClient from "socket.io-client";

import { getTokenFromCookie } from "../utlis/helpers";
import useChatStore, { Message } from "../store/store";
import { Chat } from "../interfaces";

export const useChat = () => {

    const {
        loadChats,
        loadMessages,
        setSocketIsReady,
        addMessages,
        updateLastMessage,
        notification,
        sendNotification
    } = useChatStore()
    
    useEffect(() => {
        if (!notification) return;
        emitMessage(notification.event!, notification.message!)
        sendNotification(null)
    }, [notification])

    const socket = useMemo(() => SocketIOClient(import.meta.env.VITE_URL_SERVER_CHAT, {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: getTokenFromCookie(),
                },
            },
        },
    }), [])

    const emitMessage = (event: string, payload?: Object) => {

        try {
            socket?.id && socket.emit(event, payload)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        socket.on('getAllConversations', (conversations: Chat[]) => {

            loadChats(conversations.map(c => {
                if (c.lastMessage) {
                    return ({ ...c, lastMessage: { ...c.lastMessage, date: new Date(c?.lastMessage?.date!) } })
                }
                return c
            }));
            setSocketIsReady();

        })

        socket.on('message', (message) => {
            message.date = new Date(message?.date)
            addMessages(message)
            updateLastMessage(message.conversationId, message)

        })

        socket.on('get-messages', (messages) => {
            loadMessages(messages.map((mssg: Message) => ({ ...mssg, date: new Date(mssg?.date!) })))

        })

        return () => {
            socket.off('message');
        };
    }, [socket]); // 



    return {
        socket,
        emitMessage,
    }
}