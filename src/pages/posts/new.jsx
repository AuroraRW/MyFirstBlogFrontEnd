import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Container } from '@/components/Container'
import axios from '@/api/axiosConfig'

export default function CreatePostPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    // Custom client-side validation
    if (!title.trim()) {
      setErrors(['Title cannot be blank'])
      return
    }

    try {
      const response = await axios.post('/posts', { title, description })
      const { post } = response.data
      router.push(`/posts/${post.slug}`)
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors(['Something went wrong. Please try again.'])
      }
    }
  }

  return (
    <>
      <Head>
        <title>Create Post - MyFirstBlog</title>
        <meta name="description" content="Create a new blog post." />
      </Head>

      <SimpleLayout
        title="Create a new post"
        intro="Fill out the form below to create a new blog post."
      >
        <Container>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            {errors.length > 0 && (
              <div className="rounded-md bg-red-100 p-4 text-red-700">
                <ul className="list-disc list-inside">
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows="5"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
            >
              Create Post
            </button>
          </form>
        </Container>
      </SimpleLayout>
    </>
  )
}








// import { useState } from 'react'
// import { useRouter } from 'next/router'
// import Head from 'next/head'
// import { SimpleLayout } from '@/components/SimpleLayout'
// import { Container } from '@/components/Container'
// import axios from '@/api/axiosConfig'

// export default function CreatePostPage() {
//   const router = useRouter()

//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [errors, setErrors] = useState([])

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await axios.post('/posts', { title, description })
//       const { post } = response.data
//       router.push(`/posts/${post.slug}`)
//     } catch (error) {
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors)
//       } else {
//         setErrors(['Something went wrong. Please try again.'])
//       }
//     }
//   }

//   return (
//     <>
//       <Head>
//         <title>Create Post - MyFirstBlog</title>
//         <meta name="description" content="Create a new blog post." />
//       </Head>

//       <SimpleLayout
//         title="Create a new post"
//         intro="Fill out the form below to create a new blog post."
//       >
//         <Container>
//           <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
//             {errors.length > 0 && (
//               <div className="rounded-md bg-red-100 p-4 text-red-700">
//                 <ul className="list-disc list-inside">
//                   {errors.map((err, idx) => (
//                     <li key={idx}>{err}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-zinc-800">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-zinc-800">
//                 Description
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 rows="5"
//               />
//             </div>

//             <button
//               type="submit"
//               className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
//             >
//               Create Post
//             </button>
//           </form>
//         </Container>
//       </SimpleLayout>
//     </>
//   )
// }
