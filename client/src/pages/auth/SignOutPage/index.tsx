import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../../../lib/trpc';
import { useEffect } from 'react';
import { routes } from '../../../lib/routes';
import Loader from '../../../components/Loader';

const SignOutPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  useEffect(() => {
    Cookies.remove('token');
    trpcUtils.invalidate().then(() => {
      navigate(routes.signInRoute, { replace: true });
    });
  }, []);

  return <Loader type="page" />;
};

export default SignOutPage;
