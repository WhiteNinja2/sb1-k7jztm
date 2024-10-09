import React, { useState } from 'react'
import { db, storage, auth } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { X, Image, Smile } from 'lucide-react'

interface CreatePostProps {
  onClose: () => void
}

const CreatePost: React.FC<CreatePostProps> = ({ onClose }) => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return

    try {
      const storageRef = ref(storage, `posts/${image.name}`)
      await uploadBytes(storageRef, image)
      const imageUrl = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'posts'), {
        user: auth.currentUser?.email,
        caption,
        image: imageUrl,
        likes: [],
        comments: [],
        createdAt: serverTimestamp()
      })

      setCaption('')
      setImage(null)
      onClose()
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Create New Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null)
                    setPreview(null)
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Image size={48} className="text-gray-400 mb-2" />
                  <span className="text-gray-500">Click to upload an image</span>
                </label>
              </div>
            )}
          </div>
          <div className="mb-4">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <Smile size={24} />
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!image}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost