import { FormEvent, useEffect, useMemo, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import useChatStore from "../store/store"
import { IoMdSend } from "react-icons/io"


export const Chat = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [params] = useSearchParams()
    const { sendNotification, addMessages, chats, setCurrentChat, messages, loadMessages, currentChat, userId, updateLastMessage } = useChatStore()
    useEffect(() => {
        console.log(chats)
        if (chats?.length > 0) {
            setCurrentChat(chats.find(c => c._id === params?.get('id')!) || null)
            loadMessages(messages)
        }

    }, [chats])



    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const newMssg = {
            id: `${new Date().getTime()}`,
            sendId: userId!,
            friendId: +currentChat?.participants?.[0]?.id!,
            message: inputRef?.current?.value! || '',
            date: new Date(),
            conversationId: params?.get('id')!
        }
        addMessages(newMssg)
        updateLastMessage(params?.get('id')!, newMssg)
        sendNotification({
            event: 'new-message',
            message: newMssg
        })
        inputRef.current!.value = ''
    }

    return (
        <div className="flex flex-col grow justify-start">
            <section className="flex flex-row gap-10 py-3 px-10 items-center w-full shadow-md">
                <img className="rounded-full" src="https://picsum.photos/50/50" />
                <p>{currentChat?.participants?.[0]?.name}</p>
            </section>
            <section className="m-10 flex flex-col gap-10 p-10 grow">
                {
                    messages.map(msg => (<div
                        className={`relative rounded-[20px] p-3 ${msg.sendId !== userId ? 'self-start bg-slate-800 text-gray-300' : 'self-end  bg-blue-700 text-white'} `}
                        key={msg.id}>
                        {msg.message}
                        <span className={`absolute text-[12px] text-gray-400 -bottom-6 ${msg.sendId !== userId ? ' left-0' : 'right-0'}`}>{msg?.date?.toLocaleDateString()}</span>
                    </div>))
                }
            </section>
            <form className="w-full flex flex-row gap-5" onSubmit={handleSubmit}>

                <input className="w-full grow h-auto rounded-3xl " ref={inputRef} />
                <button className="px-3 py-3 hover:shadow-md rounded-full"><IoMdSend size={20} /></button>
            </form>

        </div>
    )
}
