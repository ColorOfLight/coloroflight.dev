import { useEffect } from "react";

const Content = (): JSX.Element => {
  useEffect(() => {
    // TODO: Replace with the appropriate wasm module
    import("@/wasm/add.wasm").then((module) => {
      console.log(module.add_one(2));
    });
  }, []);

  return <></>;
};

export default Content;
