import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../utlis/helpers"
import { usePresence } from "../../hooks/usePresence";
import useChatStore from "../../store/store";
import { useEffect } from "react";
import { privateApi } from "../../api/api";
import { useChat } from "../../hooks/useChat";

export const Session = () => {
  const navigate = useNavigate()
  const singout = () => {
    deleteCookie();
    navigate('/login')
  }
  const { notification, setFriends } = useChatStore()
  usePresence()
  const { emitMessage } = useChat()


  useEffect(() => {
    if (!notification) return;
    emitMessage(notification.event!, notification.message!)
  }, [notification])

  useEffect(() => {
    const listFriends = async () => {
      try {
        const list = await privateApi('/get-friends-list')
        if (list.data?.length > 0) setFriends(list.data)
      } catch (error) {
        return []
      }
      emitMessage('getConversations');
    }
    listFriends()
  }, [])


  return (

    <button onClick={singout} className="m-auto p-5 my-10 rounded-[20px] border self-end">Cerrar Sesión</button>

  )
}
