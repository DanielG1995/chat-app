import { useNavigate } from "react-router-dom"
import useChatStore from "../store/store"
import { FriendStatus } from "./ui/FriendStatus"

export const ListFriends = () => {
  const { friends, chats, setCurrentChat } = useChatStore()
  const navigate = useNavigate()
  const redirectTo = (id: number) => {
    const chat = chats.find(c => c.participants?.[0]?.id === id)
    if (chat) {
      setCurrentChat(chat)
      navigate(`/chat?id=${chat._id}`)
    }
  }
  return (
    <ul>
      {friends.map(friend => (<li onClick={() => redirectTo(friend.id)} className=" rounded-[20px] flex cursor-pointer border-b py-2 hover:shadow-md px-2 mx-10 flex-row gap-5 justify-between items-center " key={friend.email}>
        <div className="flex flex-row items-center gap-10">
          <img className="rounded-full" src="https://picsum.photos/50/50" />
          <span className="text-[24px]">{friend.name}</span>
        </div>
        <FriendStatus status={friend.status} />
      </li>))}
    </ul>
  )
}
