import { Main } from './NotFound.styled';
import { Button } from 'components/Button/Button';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const onGoBack = useCallback(() => {
    navigate('/start', { replace: true });
  }, []);

  return (
    <Main>
      <h1>404</h1>
      <p>Page not found</p>
      <Button
        style={{ width: '250px', height: '50px', fontSize: '20px' }}
        text={'Go back to start page'}
        onClick={onGoBack}
      />
    </Main>
  );
};

export default NotFound;
