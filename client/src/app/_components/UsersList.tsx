import React, { useState } from 'react';
import { useUserStore } from '../zustand/useUserStore';
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';


interface User {
    _id: string;
    name: string;
    username: string;
}


const UsersList = () => {
    const { usersName } = useUserStore();
    const { updateChatReceiver } = useChatReceiverStore();
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);


    const handleClick = (user: User) => {
        updateChatReceiver(user);
        setSelectedUserId(user._id);
    };

    return (
        <div className='flex flex-col gap-3'>
            {
                usersName.map((user) => (
                    <div
                        key={user._id}
                        onClick={() => handleClick(user)}
                        className={`cursor-default rounded-md shadow-lg w-full h-14 ${selectedUserId === user._id ? 'bg-gray-200' : 'bg-white'
                            } text-black`}
                    >
                        <div className='w-fit p-3'>
                            {user.name}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default UsersList;
