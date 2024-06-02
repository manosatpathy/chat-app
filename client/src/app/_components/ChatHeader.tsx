
const ChatHeader = () => {
    return (
        <div className='flex gap-5 items-center pl-12 py-3 shadow-lg' >
            <div className='rounded-full h-10 w-10 border border-purple-600 flex justify-center items-center'>DP</div>
            <div>
                <h4 className='text-black'>Chat Receiver</h4>
                <p className='text-green-500'>Online</p>
            </div>
        </div >
    )
}

export default ChatHeader




