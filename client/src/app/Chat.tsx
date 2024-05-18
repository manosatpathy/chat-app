"use client"
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"

const Chat = () => {

    const [msg, setMsg] = useState<string>("")
    const [socket, setSocket] = useState<any>(null)
    const [msgs, setMsgs] = useState<string[]>([]) 


    const sendMsg = (e: React.FormEvent) => {
        e.preventDefault()
        if (socket && msg !== "") {
            socket.emit("chat msg", msg)
            setMsgs([...msgs, msg])
            setMsg("")
        }
    }

    useEffect(() => {
        const newSocket = io("http://localhost:8080")
        setSocket(newSocket);
        return (): void => {
            newSocket.close()
        }
    }, [])

    return (
        <div className='h-[100vh] flex w-[100vw] border border-green-300 flex-col gap-3 justify-center items-center'>
            <div className='border border-purple-500 w-80 min-h-10 p-5 rounded-lg'>
                {msgs.map((msg, index) => {
                    return <div key={index}>{msg}</div>
                })}
            </div>
            <form action="" className='w-80 h-16 flex justify-between items-center' onSubmit={sendMsg}>
                <input type="text" placeholder='type a message' className='h-10 p-4 rounded-lg text-black' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-purple-500 rounded-lg focus:shadow-outline hover:bg-green-800">Send</button>
            </form>
        </div>
    )
}

export default Chat