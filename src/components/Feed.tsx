import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db } from '../firebase'
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'

const Feed: React.FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    
    const fetchPosts = async () => {
      setLoading(true)
      if (isOnline) {
        const unsubscribe = onSnapshot(q, 
          (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            setLoading(false)
          },
          (error) => {
            console.error("Error fetching posts:", error)
            setLoading(false)
          }
        )
        return () => unsubscribe()
      } else {
        try {
          const querySnapshot = await getDocs(q)
          setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        } catch (error) {
          console.error("Error fetching posts:", error)
        }
        setLoading(false)
      }
    }

    fetchPosts()
  }, [isOnline])

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!isOnline && posts.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">You're offline</h2>
          <p className="text-gray-600">Connect to the internet to view posts</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-grow overflow-y-auto px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} isOnline={isOnline} />
        ))}
      </div>
    </div>
  )
}

export default Feed