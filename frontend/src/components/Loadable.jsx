import { Suspense } from "react";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
