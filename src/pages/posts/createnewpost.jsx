import { useState } from 'react';
import { useRouter } from 'next/router';
import Api_Client from '@/api/axiosConfig';
import { Container } from '@/components/Container';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState(''); 
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await Api_Client.post('http://localhost:5000/posts/createnewpost', { title, description, body });
            router.push(`/posts/${response.data.slug}`);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ form: 'An unexpected error has occurred' });
            }
        }
    };

    return (
        <Container className="mt-16 sm:mt-32 max-w-4xl mx-auto">
            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
                Create New Post
            </h1>
            <form onSubmit={handleSubmit} className="mt-12 space-y-8">
                <div className="space-y-1">
                    <label htmlFor="title" className="block text-lg font-semibold text-zinc-700">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full p-4 mt-1 text-zinc-800 border border-zinc-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                </div>
                <div className="space-y-1">
                    <label htmlFor="description" className="block text-lg font-semibold text-zinc-700">
                        Description
                    </label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full p-4 mt-1 text-zinc-800 border border-zinc-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                </div>
                <div className="space-y-1">
                    <label htmlFor="body" className="block text-lg font-semibold text-zinc-700">
                        Body
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        type="text"
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="block w-full p-4 mt-1 text-zinc-800 border border-zinc-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="6"
                    />
                    {errors.body && <p className="text-red-500 text-sm mt-2">{errors.body}</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 border border-transparent rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Create Post
                    </button>
                    {errors.form && <p className="text-red-500 text-sm mt-4">{errors.form}</p>}
                </div>
            </form>
        </Container>
    );
};

export default NewPost;
