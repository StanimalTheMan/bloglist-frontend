import React, { useState } from "react";

const Blog = ({ blog, like, user, onDelete }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const toggleViewDetails = () => {
    setViewDetails(!viewDetails);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  let details = (
    <div>
      {blog.title} {blog.author}{" "}
      {!viewDetails && <button onClick={toggleViewDetails}>view</button>}
    </div>
  );

  if (viewDetails) {
    details = (
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleViewDetails}>hide</button> <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={like}>like</button>
        <br />
        {blog.author}
        <br />
        {user.username === blog.user.username && (
          <button onClick={() => onDelete(blog.id)}>remove</button>
        )}
      </div>
    );
  }

  return <div style={blogStyle}>{details}</div>;
};

export default Blog;
