import { useEffect, useMemo } from "react";
import SocketIOClient from "socket.io-client";

import { getTokenFromCookie } from "../utlis/helpers";
import { Friend } from "../interfaces";
import useChatStore from "../store/store";

export const usePresence = () => {
    const baseUrl = import.meta.env.VITE_URL_PRESENCE
    const { setFriendStatus } = useChatStore()

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
        [],
    );
    useEffect(() => {
        socket.on('friendActive', (friend: Friend) => {
            setFriendStatus(friend.isActive, friend.id)
        })
        return () => {
            socket.emit('updateActiveStatus', false);
            socket.off('friendActive');
        };
    }, [socket]); // 


    return {
        socket
    }
}