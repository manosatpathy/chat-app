"use client"
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import Image from 'next/image'
import { useAuthStore } from '../zustand/useAuthStore'
import { useUserStore } from '../zustand/useUserStore'
import axios from "axios"
import UsersList from '../_components/UsersList'


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


    const sendMsg = (e: React.FormEvent) => {
        e.preventDefault()
        const msgTobeSent = {
            txtMsg: msg,
            sender: authName,
            receiver: "b"
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
        <div className='h-[100vh] flex w-[100vw] flex-row bg-[#131313]'>
            <div className='h-full w-24'></div>
            <div className='h-full w-4/12 bg-[#2e333d] rounded-l-3xl '>
                <UsersList></UsersList>
            </div>
            <div className='h-full w-full bg-[#2e333d] flex flex-col justify-end rounded-r-3xl pr-7'>
                {msgs.map((msg, index) => {
                    return <div className={`flex flex-col ${msg.sentByCurrUser ? 'items-end' : 'items-start'} overflow-hidden`} key={index}>
                        <div className={`m-2 py-4 px-3 ${msg.sentByCurrUser ? 'bg-[#6b8afd]' : 'bg-gray-700'} rounded-l-2xl rounded-t-2xl w-fit`} >{msg.text}</div>
                    </div>
                })}
                <form action="" className='w-full h-16 px-3 mb-3 flex items-center gap-3' onSubmit={sendMsg}>
                    <input type="text" placeholder='Your message' className='h-10 w-full bg-transparent border border-white p-4 rounded-lg text-white' value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <button className="transition-colors duration-150 hover:bg-indigo-400"><Image src="/send-message.png" alt="Button logo" width={30} height={30} /></button>
                </form>
            </div>
        </div>
    )
}

export default Chat