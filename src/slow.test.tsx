import { renderHook, waitFor } from "@testing-library/react";
import { Suspense, use } from "react";

test("does not timeout", async () => {
  const initialPromise = Promise.resolve("test");
  console.time("executing hook");
  console.time("asserting");
  const { result } = renderHook(
    () => {
      console.timeLog("executing hook");
      const result = use(initialPromise);
      console.log("got result in render", result);
      return result;
    },
    {
      wrapper: ({ children }) => {
        return <Suspense fallback={<div>loading</div>}>{children}</Suspense>;
      },
    }
  );

  await waitFor(() => {
    console.timeLog("asserting");
    console.log(result);
    expect(result.current).toEqual("test");
  });
}); //, 300
/** adding the 300ms timeout above would make this test fail */
