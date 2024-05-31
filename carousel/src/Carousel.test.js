import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="Test Title" />);
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="Test Title" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { getByText, queryByText } = render(
    <Carousel photos={TEST_IMAGES} title="Test Title" />
  );

  // Move forward to the second image
  const rightArrow = document.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show
  expect(getByText("Image 2 of 3.")).toBeInTheDocument();

  // move backward to the first image
  const leftArrow = document.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show
  expect(getByText("Image 1 of 3.")).toBeInTheDocument();
  expect(queryByText("Image 2 of 3.")).not.toBeInTheDocument();
});

// Test arrow visibility
it("hides the left arrow on the first image and the right arrow on the last image", () => {
  const { queryByTestId } = render(
    <Carousel photos={TEST_IMAGES} title="Test Title" />
  );

  // Check that the left arrow is not visible on the first image
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();

  // Move to the last image
  const rightArrow = document.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Check that the right arrow is not visible on the last image
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});
