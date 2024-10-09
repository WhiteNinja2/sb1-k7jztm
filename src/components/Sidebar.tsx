import React from 'react'
import { Home, Search, PlusSquare, Heart, User, Bookmark, Settings } from 'lucide-react'
import CreatePost from './CreatePost'

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const [showCreatePost, setShowCreatePost] = React.useState(false)

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Search, label: 'Explore', id: 'explore' },
    { icon: PlusSquare, label: 'Create', id: 'create' },
    { icon: Heart, label: 'Notifications', id: 'notifications' },
    { icon: User, label: 'Profile', id: 'profile' },
    { icon: Bookmark, label: 'Saved', id: 'saved' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ]

  return (
    <nav className="w-64 bg-white border-r border-gray-200 p-6">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                if (item.id === 'create') {
                  setShowCreatePost(true)
                } else {
                  setCurrentPage(item.id)
                }
              }}
            >
              <item.icon className="mr-4" size={24} />
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      {showCreatePost && <CreatePost onClose={() => setShowCreatePost(false)} />}
    </nav>
  )
}

export default Sidebar