'use client'

import ProtectedRoute from "../provider/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import AccountPage from "./profile/page";
import LoginRegisterPage from "./login_signin/page";


const AccountPageWithProtection = () => {
  const { userAuthenticated } = useAuth()

  return (
    <>
      {
        userAuthenticated ?
          (
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          ) : (
            <LoginRegisterPage />
          )
      }
    </>
  )

}




export default AccountPageWithProtection;