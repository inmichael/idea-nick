import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TrpcProvider } from './lib/trpc';
import { editIdeaRouteParams, routes, viewRouteParams } from './lib/routes';
import Layout from './components/Layout';
import './styles/global.scss';
import { AppContextProvider } from './lib/ctx';
import { EditProfilePage, SignInPage, SignOutPage, SignUpPage } from './pages/auth';
import { AllIdeasPage, EditIdeaPage, NewIdeaPage, ViewIdeaPage } from './pages/ideas';
import { NotFoundPage } from './pages/other';

const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.signOutRoute} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.signUpRoute} element={<SignUpPage />} />
              <Route path={routes.signInRoute} element={<SignInPage />} />
              <Route path={routes.allIdeasRoute} element={<AllIdeasPage />} />
              <Route path={routes.newIdeaRoute} element={<NewIdeaPage />} />
              <Route path={routes.editProfileRoute} element={<EditProfilePage />} />
              <Route path={routes.viewIdeaRoute(viewRouteParams)} element={<ViewIdeaPage />} />
              <Route path={routes.editIdeaRoute(editIdeaRouteParams)} element={<EditIdeaPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};

export default App;
