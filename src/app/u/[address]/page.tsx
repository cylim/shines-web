"use client"
import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import UserContainer from '@/components/user/UserContainer';

const App: React.FC = () => {

  return (
    <AppLayout>
      <UserContainer />
    </AppLayout>
  )
}

export default App;
