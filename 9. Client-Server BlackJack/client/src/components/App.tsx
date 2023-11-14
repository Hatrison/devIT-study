import { lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from './Layout';

const Playground = lazy(() => import('pages/Playground/Playground'));
const Start = lazy(() => import('pages/Start/Start'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname !== '/') return;
    navigate('/start', { replace: true });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/start" element={<Start />} />
        <Route path="/playground" element={<Playground playersNum={1} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
