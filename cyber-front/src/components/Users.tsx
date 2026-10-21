import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/userService'
import type { User } from '../services/types'

interface userProps {
  userState : [User | null, React.Dispatch<React.SetStateAction<null>>] 
} 


const Users = ({
  userState,
}:userProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        const fetchedUsers = await getUsers()

        if (isMounted) {
          setUsers(fetchedUsers)
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Unable to load users.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()
    console.log("Testings")

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className='content'>
      <h1>Users</h1>
      {isLoading ? <p>Loading users...</p> : null}
      {error ? <p>{error}</p> : null}
      {!isLoading && !error ? (
        users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )
      ) : null}
    </div>
  )
}

export default Users