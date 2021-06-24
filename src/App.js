import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [createBlogVisible, setCreateBlogVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user);
    }
  }, []);

  const increaseLikes = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id);
    const changedBlog = {
      user: blogToUpdate.user.id,
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url,
    };
    console.log(changedBlog);
    try {
      const updatedBlog = await blogService.update(id, changedBlog);
      setBlogs(
        blogs.map((blog) =>
          blog.user.id !== blogToUpdate.user.id ? blog : updatedBlog
        )
      );
    } catch (exception) {
      setErrorMessage(
        `Blog '${blogToUpdate.title} was already removed from server`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlogPost = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
    ) {
      try {
        await blogService.deleteBlogPost(id);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      } catch (exception) {
        setErrorMessage(
          `Blog ${blogToDelete.title} was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification("wrong username or password");
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setNotification("");
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.removeToken();
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const handleAddBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setNotification(`a new blog ${blog.title}! by ${blog.author} added`);
      setCreateBlogVisible(false);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch (exception) {
      setErrorMessage("error adding a blog post");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  const blogsSortedByLikes = blogs.slice().sort((a, b) => {
    // assume descending order bc you want to see most liked on top
    return b.likes - a.likes;
  });

  return (
    <div>
      <h2>blogs</h2>
      {notification}
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      {!createBlogVisible && (
        <button onClick={() => setCreateBlogVisible(true)}>
          create new blog
        </button>
      )}
      <BlogForm
        createVisible={createBlogVisible}
        onAddBlog={handleAddBlog}
        onCancel={() => setCreateBlogVisible(false)}
      />
      {blogsSortedByLikes.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
          like={() => increaseLikes(blog.id)}
          onDelete={() => deleteBlogPost(blog.id)}
        />
      ))}
    </div>
  );
};

export default App;
