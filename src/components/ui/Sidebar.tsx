import { FaUserCog, FaUserFriends } from "react-icons/fa"
import { IoMdChatboxes } from "react-icons/io"
import { useState } from "react"
import { ListFriends } from "../ListFriends"
import { ListChats } from "../ListChats"
import { Session } from "./Session"



export const Sidebar = () => {

    const [currentTab, setCurrentTab] = useState(0)

    const onChangeTab = (index: number) => {
        setCurrentTab(index)
    }

    return (
        <section className="min-w-[350px] flex flex-col justify-between shadow-2xl h-screen">
            <section>
                <div className="flex mt-3 flex-row justify-between px-10 py-2">
                    <div onClick={() => onChangeTab(0)} className={`${currentTab === 0 ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}  p-5  w-fit cursor-pointer rounded-full border`}>
                        <IoMdChatboxes size={20} title="Chats" />
                    </div>
                    <div onClick={() => onChangeTab(1)} className={`${currentTab === 1 ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}  p-5 cursor-pointer w-fit rounded-full border`}>
                        <FaUserFriends size={20} title="Friends" />
                    </div>
                    <div onClick={() => onChangeTab(2)} className={`${currentTab === 2 ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}  p-5 cursor-pointer w-fit rounded-full border`}>
                        <FaUserCog size={20} title="settings" />
                    </div>
                </div>
                <div className='mt-5'>
                    {
                        currentTab === 0 && <ListChats />
                    }
                    {
                        currentTab === 1 && <ListFriends />
                    }
                    {
                        currentTab === 2 && <>settings</>
                    }
                </div>
            </section>
            <Session />
        </section>
    )
}
