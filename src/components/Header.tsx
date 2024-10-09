import React, { useState } from 'react'
import { Search, LogOut, Bell, MessageCircle, Wifi, WifiOff } from 'lucide-react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

const Header: React.FC<{ user: any; isOnline: boolean }> = ({ user, isOnline }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Instaclone
        </h1>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="input pr-10 w-64"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="btn btn-primary flex items-center">
            <MessageCircle size={20} className="mr-2" />
            Messages
          </button>
          <button className="relative">
            <Bell size={24} className="text-gray-600 hover:text-primary-500 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          {isOnline ? (
            <Wifi size={24} className="text-green-500" />
          ) : (
            <WifiOff size={24} className="text-red-500" />
          )}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=random`}
                alt={user.email}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{user.email}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header