"use client"
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"

const Chat = () => {

    const [msg, setMsg] = useState<string>("")
    const [socket, setSocket] = useState<any>(null)


    const sendMsg = (e: React.FormEvent) => {
        e.preventDefault()
        if (socket) {
            socket.emit("chat msg", msg)
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
        <div>
            <form action="" className='flex justify-center mt-6 items-center h-[100vh]' onSubmit={sendMsg}>
                <input type="text" placeholder='type a message' className='h-10 p-4 rounded-lg text-black' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">Send</button>
            </form>
        </div>
    )
}

export default Chat