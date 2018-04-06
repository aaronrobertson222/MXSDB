import App from 'components/app/app';
import * as routerMap from '../routes/static.js';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: routerMap.LandingLayout,
      },
      {
        path: '/browse',
        component: routerMap.MainLayout,
      },
      {
        path: '/dashboard',
        component: routerMap.DashboardLayout,
        routes: [
          {
            path: '/upload',
            component: routerMap.UploadForm,
          },
        ],
      },
      {
        path: '/auth',
        component: routerMap.AuthLayout,
        routes: [
          {
            path: '/auth/login',
            component: routerMap.AuthFormWrapper,
            type: 'login',
          },
          {
            path: '/auth/signup',
            component: routerMap.AuthFormWrapper,
            type: 'signup',
          },
        ],
      },
      {
        path: '*',
        component: routerMap.NotFound,
        title: 'BIG DADDY',
      },
    ],
  },
];

export default routes;
