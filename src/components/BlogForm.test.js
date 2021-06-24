import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit with right details", () => {
  const onAddBlog = jest.fn();

  const component = render(<BlogForm onAddBlog={onAddBlog} />);

  const titleInput = component.container.querySelector("#title");
  const authorInput = component.container.querySelector("#author");
  const urlInput = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(titleInput, {
    target: {
      value: "Don't put off sleep",
    },
  });

  fireEvent.change(authorInput, {
    target: {
      value: "Eric",
    },
  });

  fireEvent.change(urlInput, {
    target: {
      value: "https://bettersleep.org/blog/revenge-bedtime-procrastination/",
    },
  });

  fireEvent.submit(form);

  expect(onAddBlog.mock.calls).toHaveLength(1);
  expect(onAddBlog.mock.calls[0][0].title).toBe("Don't put off sleep");
  expect(onAddBlog.mock.calls[0][0].author).toBe("Eric");
  expect(onAddBlog.mock.calls[0][0].url).toBe(
    "https://bettersleep.org/blog/revenge-bedtime-procrastination/"
  );
});
