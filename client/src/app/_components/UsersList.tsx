import React from 'react'
import { useUserStore } from '../zustand/useUserStore'

const UsersList = () => {
    const { usersName } = useUserStore()
    console.log(usersName)
    return (
        <div className='flex flex-col gap-3'>
            {
                usersName.map((user) => (
                    <div key={user._id} className='rounded-xl shadow-xl bg-white text-black w-full h-14 '><div className='w-fit'>{user.name}</div></div>
                ))
            }
        </div>
    )
}

export default UsersList