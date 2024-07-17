import { render, waitFor, screen } from "@testing-library/react";
import { Suspense, use } from "react";

test("does not timeout", async () => {
  const initialPromise = Promise.resolve("test");
  console.time("executing component render");
  console.time("got past the `use` call");
  console.time("assertion succeeded");

  function Component() {
    console.timeLog("executing component render");
    const renderResult = use(initialPromise);
    console.timeLog("got past the `use` call", renderResult);
    return <div>{renderResult}</div>;
  }

  render(
    <Suspense fallback={<div>loading</div>}>
      <Component />
    </Suspense>
  );

  await waitFor(() => {
    screen.getByText("test");
    console.timeLog("assertion succeeded");
  });
}); //, 300
/** adding the 300ms timeout above would make this test fail */
