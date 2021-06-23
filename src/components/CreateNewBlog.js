import { useState } from "react";

const CreateNewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(title, author, url);
    props.onAddBlog({ title, author, url });
  };

  const showWhenVisible = { display: props.createVisible ? "" : "none" };

  return (
    <div style={showWhenVisible}>
      <h2>create new</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      <div>
        <button onClick={props.onCancel}>cancel</button>
      </div>
    </div>
  );
};

export default CreateNewBlog;
