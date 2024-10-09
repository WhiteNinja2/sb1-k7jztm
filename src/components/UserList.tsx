import React from 'react'
import { User } from 'lucide-react'

const UserList: React.FC = () => {
  const users = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']

  return (
    <div className="w-64 bg-gray-700 p-4">
      <h2 className="text-xl font-semibold mb-4">Online Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user} className="flex items-center mb-2">
            <User className="mr-2" size={18} />
            <span>{user}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList