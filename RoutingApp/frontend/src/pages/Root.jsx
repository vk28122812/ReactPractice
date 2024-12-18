import { Outlet, useNavigation  } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
function Root() {
  // const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
