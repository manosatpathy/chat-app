import React from 'react'
import { useUserStore } from '../zustand/useUserStore'
import { useChatReceiverStore } from '../zustand/useChatReceiverStore'


const UsersList = () => {
    const { usersName } = useUserStore()
    const { updateChatReceiver } = useChatReceiverStore()
    return (
        <div className='flex flex-col gap-3'>
            {
                usersName.map((user) => (
                    <div key={user._id} onClick={() => (updateChatReceiver(user))} className='cursor-default rounded-xl shadow-xl bg-white text-black w-full h-14 '><div className='w-fit p-3'>{user.name}</div></div>
                ))
            }
        </div>
    )
}

export default UsersList