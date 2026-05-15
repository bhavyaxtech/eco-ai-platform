import React from 'react';

import {
  Navigate,
} from 'react-router-dom';

import {
  useAuthStore,
} from '../lib/store';

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({
  children,
}: Props) {

  const { user } =
    useAuthStore();

  // USER NOT LOGGED IN

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // USER LOGGED IN

  return <>{children}</>;
}

export default ProtectedRoute;