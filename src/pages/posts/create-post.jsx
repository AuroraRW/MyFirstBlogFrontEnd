import { useState } from 'react';
import { useRouter } from 'next/router';
import JSON_CLIENT from '@/api/axiosConfig';
import { Container } from '@/components/Container';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await JSON_CLIENT.post('http://localhost:5000/posts/create-post', { title, description });
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
        <Container className="mt-16 sm:mt-32">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
                Create New Post
            </h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-zinc-600">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full p-2 mt-1 border border-zinc-300 rounded-md shadow-sm"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-zinc-600">
                        Description
                    </label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full p-2 mt-1 border border-zinc-300 rounded-md shadow-sm"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 font-medium leading-6 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Create Post
                    </button>
                    {errors.form && <p className="text-red-500 text-sm mt-2">{errors.form}</p>}
                </div>
            </form>
        </Container>
    );
};

export default NewPost;
