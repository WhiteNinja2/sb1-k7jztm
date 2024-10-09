import React, { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import { db, auth } from '../firebase'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

interface PostProps {
  post: {
    id: string
    user: string
    avatar: string
    image: string
    caption: string
    likes: string[]
    comments: number
  }
  isOnline: boolean
}

const Post: React.FC<PostProps> = ({ post, isOnline }) => {
  const [comment, setComment] = useState('')
  const isLiked = post.likes.includes(auth.currentUser?.uid || '')

  const handleLike = async () => {
    if (!isOnline) {
      alert("You're offline. Please connect to the internet to like posts.")
      return
    }
    const postRef = doc(db, 'posts', post.id)
    if (isLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(auth.currentUser?.uid)
      })
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(auth.currentUser?.uid)
      })
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isOnline) {
      alert("You're offline. Please connect to the internet to comment on posts.")
      return
    }
    if (comment.trim()) {
      const postRef = doc(db, 'posts', post.id)
      await updateDoc(postRef, {
        comments: arrayUnion({
          user: auth.currentUser?.email,
          text: comment.trim()
        })
      })
      setComment('')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold text-gray-800">{post.user}</span>
        </div>
        <MoreHorizontal className="text-gray-500 cursor-pointer" />
      </div>
      <img src={post.image} alt="Post" className="w-full object-cover max-h-96" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="focus:outline-none" disabled={!isOnline}>
              <Heart
                className={`${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'} transition-colors duration-200`}
                size={24}
              />
            </button>
            <button className="focus:outline-none">
              <MessageCircle className="text-gray-600 hover:text-gray-800 transition-colors duration-200" size={24} />
            </button>
            <button className="focus:outline-none">
              <Send className="text-gray-600 hover:text-gray-800 transition-colors duration-200" size={24} />
            </button>
          </div>
          <button className="focus:outline-none">
            <Bookmark className="text-gray-600 hover:text-gray-800 transition-colors duration-200" size={24} />
          </button>
        </div>
        <p className="font-semibold mb-2">{post.likes.length} likes</p>
        <p className="mb-2">
          <span className="font-semibold mr-2">{post.user}</span>
          {post.caption}
        </p>
        <p className="text-gray-500 mb-3 cursor-pointer hover:underline">
          View all {post.comments} comments
        </p>
        <form onSubmit={handleComment} className="flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={!isOnline}
          />
          <button
            type="submit"
            className="ml-2 text-primary-500 font-semibold focus:outline-none"
            disabled={!isOnline}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default Post