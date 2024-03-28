import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../utlis/helpers"
import useChatStore from "../../store/store";
import { useEffect } from "react";
import { privateApi } from "../../api/api";
import { usePresence } from "../../hooks/usePresence";
import { useChat } from "../../hooks/useChat";

export const Session = () => {
  const navigate = useNavigate()
  const singout = () => {
    deleteCookie();
    navigate('/login')
  }
  const { setFriends, sendNotification, friends } = useChatStore()


  useEffect(() => {
    const listFriends = async () => {
      try {
        const list = await privateApi('/get-friends-list')
        if (list.data?.length > 0) setFriends(list.data)
      } catch (error) {
        return []
      }
    }
    listFriends()
  }, [])

  useEffect(() => {
    if (friends.length > 0)
      sendNotification({ event: 'getConversations' });
  }, [friends])


  usePresence()
  useChat()
  return (

    <button onClick={singout} className="m-auto p-5 my-10 rounded-[20px] border self-end">Cerrar Sesión</button>

  )
}
