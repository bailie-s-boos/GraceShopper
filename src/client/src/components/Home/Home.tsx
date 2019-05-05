import React from 'react'
import SideBar from './Sidebar'
import { ProductList } from './ProductList'

export default function Home() {
  return (
    <div className="d-flex justify-content-around">
      <SideBar />
      <ProductList />
    </div>
  )
}