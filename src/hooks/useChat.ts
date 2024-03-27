import { useEffect, useMemo } from "react";
import SocketIOClient from "socket.io-client";

import { getTokenFromCookie } from "../utlis/helpers";
import useChatStore from "../store/store";
import { Chat } from "../interfaces";

export const useChat = () => {
    const baseUrl = import.meta.env.VITE_URL_SERVER_CHAT
    const { loadChats, friends, addMessages, updateLastMessage } = useChatStore()

    const emitMessage = (event: string, payload?: Object) => {
        socket.emit(event, payload)
    }


    useEffect(() => {
        if (friends.length === 0) return;

        socket.on('getAllConversations', (conversations: Chat[]) => {
            loadChats(conversations.map(c => ({ ...c, participants: [...(c.participants || []).map((p) => friends.find(f => f.id === p)!)] })));

        })

        socket.on('message', (message) => {
          console.log(message)
          message.date=new Date(message?.date)  
          addMessages(message)
          updateLastMessage(message.conversationId, message)

        })
        return () => {
            socket.off('message');
            socket.disconnect()
        };
    }, [friends]); // 
    const socket = useMemo(
        () =>
            SocketIOClient(baseUrl, {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            Authorization: getTokenFromCookie(),
                        },
                    },
                },
            }),
        [baseUrl],
    );


    return {
        socket,
        emitMessage,
    }
}