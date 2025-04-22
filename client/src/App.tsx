import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TrpcProvider } from './lib/trpc';
import AllIdeasPage from './pages/AllIdeasPage';
import ViewIdeaPage from './pages/ViewIdeaPage';
import { routes, viewRouteParams } from './lib/routes';
import Layout from './components/Layout';
import './styles/global.scss';
import NewIdeaPage from './pages/NewIdeaPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';

const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.signOutRoute} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route path={routes.signUpRoute} element={<SignUpPage />} />
            <Route path={routes.signInRoute} element={<SignInPage />} />
            <Route path={routes.allIdeasRoute} element={<AllIdeasPage />} />
            <Route path={routes.newIdeaRoute} element={<NewIdeaPage />} />
            <Route path={routes.viewIdeaRoute(viewRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};

export default App;
