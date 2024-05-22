"use client"
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"

const Chat = () => {

    interface Message {
        text: string,
        sentByCurrUser: Boolean
    }

    const [msg, setMsg] = useState<string>("")
    const [socket, setSocket] = useState<any>(null)
    const [msgs, setMsgs] = useState<Message[]>([])


    const sendMsg = (e: React.FormEvent) => {
        e.preventDefault()
        if (socket && msg !== "") {
            socket.emit("chat msg", msg)
            setMsgs((prevMsg) => [...prevMsg, { text: msg, sentByCurrUser: true }]);
            setMsg("")
            console.log(msgs)
        }
    }

    useEffect(() => {
        const newSocket = io("http://localhost:8080")
        setSocket(newSocket);
        newSocket.on("chat msg", (receivedMsg) => {
            setMsgs((prvMsg) => [...prvMsg, { text: receivedMsg, sentByCurrUser: false }])
        })
        return (): void => {
            newSocket.close()
        }
    }, [])

    return (
        <div className='h-[100vh] flex w-[100vw] flex-col gap-3 justify-center items-center'>
            <div className='h-2/3 w-1/3 border border-whtie-50 flex flex-col justify-end rounded-xl'>
                {/* <div className='flex-grow overflow-y-auto flex flex-col'> */}
                {msgs.map((msg, index) => {
                    return <div className={`flex flex-col ${msg.sentByCurrUser ? 'items-end' : 'items-start'} overflow-hidden`} key={index}>
                        <div className={`m-2 py-4 px-3 ${msg.sentByCurrUser ? 'bg-green-800' : 'bg-gray-700'} rounded-xl w-fit`} >{msg.text}</div>
                    </div>
                })}
                {/* </div> */}
                <form action="" className='w-full h-16 px-3 mb-3 flex items-center gap-3' onSubmit={sendMsg}>
                    <input type="text" placeholder='type a message' className='h-10 w-full p-4 rounded-lg text-black' value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <button className="h-10 px-5 text-green-100 transition-colors duration-150 bg-indigo-600 rounded-lg focus:shadow-outline hover:bg-indigo-400">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat