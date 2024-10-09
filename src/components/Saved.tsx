import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import Post from './Post'

const Saved: React.FC<{ user: any }> = ({ user }) => {
  const [savedPosts, setSavedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, 'posts'), where('savedBy', 'array-contains', user.uid))
        const querySnapshot = await getDocs(q)
        setSavedPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } catch (error) {
        console.error("Error fetching saved posts:", error)
      }
      setLoading(false)
    }

    fetchSavedPosts()
  }, [user])

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Saved Posts</h2>
      {savedPosts.length === 0 ? (
        <p className="text-center text-gray-500">You haven't saved any posts yet.</p>
      ) : (
        <div className="space-y-6">
          {savedPosts.map((post) => (
            <Post key={post.id} post={post} isOnline={true} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved