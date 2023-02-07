import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarComp  from "./nav/NavbarComp";
import Home  from "./nav/Home";
import SecondView  from "./nav/SecondView";

function App() {
  useEffect(() => {

    // localStorage.setItem("mob",JSON.stringify(12345));

    // let hex = localStorage.getItem("mob");

    // console.log("++++++",hex);
  }, []);

  const router = createBrowserRouter([
    {
      element: <NavbarComp/>,
      children: [
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"sec",
          element:<SecondView/>
        },
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
