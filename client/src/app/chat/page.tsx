"use client"
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import Image from 'next/image'
import { useAuthStore } from '../zustand/useAuthStore'
import { useUserStore } from '../zustand/useUserStore'
import axios from "axios"
import UsersList from '../_components/UsersList'
import ChatHeader from '../_components/ChatHeader'
import { useChatReceiverStore } from '../zustand/useChatReceiverStore'
import SearchBar from '../_components/SearchBar'


const Chat = () => {

    interface Message {
        text: string,
        sentByCurrUser: Boolean
    }

    const [msg, setMsg] = useState<string>("")
    const [socket, setSocket] = useState<any>(null)
    const [msgs, setMsgs] = useState<Message[]>([])
    const { authName } = useAuthStore()
    const { updateUsersName } = useUserStore()
    const { chatReceiver } = useChatReceiverStore()


    const sendMsg = (e: React.FormEvent) => {
        e.preventDefault()
        const msgTobeSent = {
            txtMsg: msg,
            sender: authName,
            receiver: chatReceiver.username
        }
        if (socket && msg !== "") {
            socket.emit("chat msg", msgTobeSent)
            setMsgs((prevMsg) => [...prevMsg, { text: msg, sentByCurrUser: true }]);
            setMsg("")
            console.log(msgs)
        }
    }

    const getUsers = async () => {
        const res = await axios.get("http://localhost:8082/users", {
            withCredentials: true
        })
        updateUsersName(res.data.users)
    }

    useEffect(() => {
        const newSocket = io("http://localhost:8080", {
            query: {
                user: authName
            }
        })
        setSocket(newSocket);
        newSocket.on("chat msg", (receivedMsg) => {
            setMsgs((prvMsg) => [...prvMsg, { text: receivedMsg, sentByCurrUser: false }])
        })
        getUsers();
        return (): void => {
            newSocket.close()
        }
    }, [])

    return (
        <div className='h-[100vh] flex w-[100vw] flex-row bg-white'>
            <div className='h-full w-4/12 bg-purple-50 rounded-l-3xl px-10 border-green-500 border overflow-y-auto'>
                <SearchBar></SearchBar>
                <UsersList></UsersList>
            </div>
            <div className=' h-full w-full bg-violet-50 flex flex-col rounded-r-3xl pr-7'>
                <ChatHeader></ChatHeader>
                <div className='h-full flex flex-col justify-end'>
                    {msgs.map((msg, index) => {
                        return <div className={`flex flex-col ${msg.sentByCurrUser ? 'items-end' : 'items-start'} overflow-hidden`} key={index}>
                            <div className={` m-2 py-4 px-3 ${msg.sentByCurrUser ? 'bg-[#A46FFF] text-white' : 'bg-[#F3F4F6] text-black'} rounded-l-2xl rounded-t-2xl w-fit`} >{msg.text}</div>
                        </div>
                    })}
                </div>
                <form action="" className='w-full h-16 p-6 mt-3 flex items-center gap-3 border bg-white' onSubmit={sendMsg}>
                    <input type="text" placeholder='Your message' className='outline-none bg-gray-100 h-10 w-full bg-transparent p-4 rounded-2xl text-gray-800' value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <button className="h-12 w-12 flex justify-center items-center rounded-full bg-white"><Image src="/icons8-send-button-50.png" alt="Button logo" width={30} height={30} /></button>
                </form>
            </div>
        </div>
    )
}

export default Chat