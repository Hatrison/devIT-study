import { lazy, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './Layout';

const Playground = lazy(() => import('pages/Playground/Playground'));
const Start = lazy(() => import('pages/Start/Start'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/start', { replace: true });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/start" element={<Start />} />
        <Route path="/playground" element={<Playground />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
