import React, { useState } from 'react'
import { Send } from 'lucide-react'

interface ChatAreaProps {
  currentChannel: string
}

const ChatArea: React.FC<ChatAreaProps> = ({ currentChannel }) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement sending message functionality
    console.log(`Sending message to ${currentChannel}: ${message}`)
    setMessage('')
  }

  return (
    <div className="flex-grow flex flex-col">
      <div className="bg-gray-700 p-4 shadow">
        <h2 className="text-xl font-semibold">#{currentChannel}</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {/* TODO: Implement chat messages */}
        <p className="text-gray-400">Welcome to #{currentChannel}!</p>
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${currentChannel}`}
            className="flex-grow bg-gray-600 text-white rounded-l-md py-2 px-4 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatArea