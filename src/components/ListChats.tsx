import { useNavigate } from "react-router-dom"
import useChatStore from "../store/store"

export const ListChats = () => {
  const { chats } = useChatStore()
  const navigate = useNavigate()
  return (
    <ul>
      {chats.filter(c => c?.lastMessage).map(chat => (<li onClick={() => navigate(`/chat?id=${chat._id}`)}
        className=" rounded-[20px] flex cursor-pointer items-start border-b py-2 hover:shadow-md px-2 mx-10 flex-row gap-5 "
        key={chat._id}>
        <img className="rounded-full" src="https://picsum.photos/50/50" />
        <div className="flex flex-col items-start ">
          <div className="flex flex-row gap-5 items-center">
            <span className="text-[20px]">{chat.participants?.[0].name}</span>
            <p className="text-gray-400">{chat.lastMessage.date?.toLocaleDateString()}</p>
          </div>
          <p className="text-gray-400 truncate max-w-[150px]">{chat.lastMessage.message}</p>
        </div>

      </li>))}
    </ul>
  )
}
