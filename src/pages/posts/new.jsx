import { useState } from "react";
import { useRouter } from "next/router";

export default function NewPostPage(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();
        setErrors([]);
        setSubmitting(true);

        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_SERVER_URL}/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description })
            });

            if (res.status === 201){
                // try to get slug from JSON, if not there, parse location header
                const data = await res.json().catch(() => ({}));
                let slug = data?.post?.slug;

                if (!slug){
                    const loc = res.headers.get("Location"); // "/posts/hello-world"
                    if (loc) slug = loc.split("/").pop();
                }

                if (!slug) return router.push("/posts");

                return router.push(`/posts/${slug}`);
            }

            if (res.status === 400) {
                const data = await res.json();
                setErrors(Array.isArray(data?.errors) ? data.errors : ["Validation failed."]);
                return;
            }

            setErrors([`Unexpected error: ${res.status}`]);
        } catch (err) {
            setErrors([`Network error. Is the API running?`])
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem", textAlign: "center" }}>
            <h1>Create a Post</h1>
            
            {errors.length > 0 && (
                <ul style={{ color: "crimson"}}>
                    {errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
            )}

            <form onSubmit={handleSubmit}>
                <label style={{ display: "block", margin: "0 auto" }}>
                    Title: 
                    <input 
                        name="title" 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder=" Enter Title here" 
                        style={{ margin: "1rem", border: "2px solid black", borderRadius: "6px" }}
                        required
                    />
                </label>

                <label style={{ display: "block", margin: "0 auto" }}>
                    Description: 
                    <input
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder=" Enter Description here"
                        rows={4}
                        style={{ margin: "1rem", border: "2px solid black", borderRadius: "6px" }}
                        required
                    />
                </label>

                <button type="submit" disabled={submitting} style={{ backgroundColor: "greenyellow", border: "2px solid gray", borderRadius: "6px", padding: "0.5rem" }}>
                    {submitting ? "Creating.." : "Create Post"}
                </button>
            </form>
        </main>
    );
}
