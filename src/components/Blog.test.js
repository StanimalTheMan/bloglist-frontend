import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author, but does not render url or number of likes of blog by default", () => {
  const blog = {
    title: "Mets win on 6.23.21",
    author: "Stanimal",
    url: "https://metsmerizedonline.com/2021/06/megill-mcneil-mccann-mets-take-series-finale-from-braves.html/",
    likes: 1,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("Mets win on 6.23.21");
  expect(component.container).toHaveTextContent("Stanimal");
  expect(component.container).not.toHaveTextContent(
    "https://metsmerizedonline.com/2021/06/megill-mcneil-mccann-mets-take-series-finale-from-braves.html/"
  );
  expect(component.container).not.toHaveTextContent("likes");
});

test('clicking the "view" button results in the blog\'s url and number of likes being shown', () => {
  const blog = {
    title: "Mets win on 6.23.21",
    author: "Stanimal",
    url: "https://metsmerizedonline.com/2021/06/megill-mcneil-mccann-mets-take-series-finale-from-braves.html/",
    likes: 1,
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent(
    "https://metsmerizedonline.com/2021/06/megill-mcneil-mccann-mets-take-series-finale-from-braves.html/"
  );
  expect(component.container).toHaveTextContent("likes");
});
