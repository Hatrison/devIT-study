import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

export const Layout = () => {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
};