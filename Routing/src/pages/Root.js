import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"

function Root() {
  return (
    <>
        <h1>Root Layout</h1>
        <MainNavigation/>
        <main >
         <Outlet/>
        </main>
    </>
  )
}

export default Root