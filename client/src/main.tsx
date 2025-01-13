import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import { AppointmentProvider } from './components/AppointmentContext.tsx';
import AvailabilityPage from './pages/availabilityPage.tsx';
import ErrorPage from './pages/errorPage.tsx';
import ParticipantPage from './pages/participantPage.tsx';
import LoginPage from './pages/loginPage.tsx';
import PropertyPage from './pages/propertyPage.tsx';
import ServiceSelectionPage from './pages/serviceSelectionPage.tsx';
import SummaryPage from './pages/summaryPage.tsx';
import AdminPage from './pages/adminPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/ServiceSelection',
        element: <ServiceSelectionPage />,
      }, 
      {
        path: '/PropertyDetails',
        element: <PropertyPage />,
      }, 
      {
        path: '/AppointmentAvailability',
        element: <AvailabilityPage />,
      }, 
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/PersonalInformation',
        element: <ParticipantPage />,
      }, 
      {
        path: '/Summary',
        element: <SummaryPage />,
      }, 
      {
        path: '/Controller',
        element: <AdminPage />,
      }, 
    ],
  },
], 
{future: {
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_partialHydration: true,
  v7_relativeSplatPath: true,
  v7_skipActionErrorRevalidation: true,
  // v7_startTransition: true,
  }
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<AppointmentProvider>
    <RouterProvider router={router} />
    </AppointmentProvider>);
}
