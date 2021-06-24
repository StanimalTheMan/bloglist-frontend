import { useState } from "react";

const BlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(title, author, url);
    props.onAddBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const showWhenVisible = { display: props.createVisible ? "" : "none" };

  return (
    <div className="formDiv" style={showWhenVisible}>
      <h2>create new</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          title:
          <input
            type="text"
            id="title"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="url"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button id="create" type="submit">
            create
          </button>
        </div>
      </form>
      <div>
        <button onClick={props.onCancel}>cancel</button>
      </div>
    </div>
  );
};

export default BlogForm;
