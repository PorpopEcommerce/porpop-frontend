'use client'

import { useAuth } from '../../context/AuthContext';

const AccountPage = () => {
  const { activeUser } = useAuth();

  if (!activeUser) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {activeUser.username}!</h1>
      <p>Here are your account details:</p>
      {/* Render additional account details if needed */}
    </div>
  );
};

export default AccountPage;
