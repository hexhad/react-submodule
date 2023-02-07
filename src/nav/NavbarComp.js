import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function NavbarComp() {
  return (
    <>
    <div><Link to={"/"}>Home</Link></div>
    <div><Link to={"/sec"}>SV</Link></div>
    <Outlet/>
    </>
  )
}
