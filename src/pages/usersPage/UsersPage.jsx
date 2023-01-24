import React from 'react'
import { useParams } from 'react-router-dom'

function UsersPage() {
    const {userName} = useParams() 
    console.log(userName)
  return (
    <div>UsersPage {userName}</div>
  )
}

export default UsersPage