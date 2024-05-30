import React from 'react'
import { useUserStore } from '../zustand/useUserStore'

const UsersList = () => {
    const { usersName } = useUserStore()
    console.log(usersName)
    return (
        <div>
            {
                usersName.map((user) => (
                    <div key={user._id}>{user.name}</div>
                ))
            }
        </div>
    )
}

export default UsersList