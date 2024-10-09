import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar'
import Auth from './components/Auth'
import Settings from './components/Settings'
import Saved from './components/Saved'
import { auth, db } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { enableNetwork, disableNetwork } from 'firebase/firestore'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    const handleOnline = () => {
      setIsOnline(true)
      enableNetwork(db)
    }

    const handleOffline = () => {
      setIsOnline(false)
      disableNetwork(db)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      unsubscribe()
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!user) {
    return <Auth />
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header user={user} isOnline={isOnline} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-grow overflow-y-auto">
          {currentPage === 'home' && <Feed isOnline={isOnline} />}
          {currentPage === 'settings' && <Settings user={user} />}
          {currentPage === 'saved' && <Saved user={user} />}
        </main>
      </div>
    </div>
  )
}

export default App