import { useState } from "react";
import { useRouter } from "next/router";

export default function NewPost() {
  // track form fields
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // store any errors from the server
  const [errors, setErrors] = useState([]);

  // next.js router to redirect after form submits
  const router = useRouter();

  // handle the form submit
  const handleSubmit = async (e) => {
    // stop page from refreshing
    e.preventDefault();

    // clear any old errors
    setErrors([]);

    // send post request to api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    // if work go back home
    if (res.status === 201) {
      router.push("/");
    } else {
      // if error show on form
      const data = await res.json();
      setErrors(data.errors || ["something wrong"]);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>

      <h1>new post</h1>

      {/* show errors if any*/}
      {errors.length > 0 && (
        <ul>
          {errors.map((err, i) => (
            <li key={i} style={{ color: "red" }}>{err}</li>
          ))}
        </ul>
      )}

      {/* form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "300px", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="5"
            style={{ width: "300px", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          create post
        </button>
      </form>
    </div>
  );
}
