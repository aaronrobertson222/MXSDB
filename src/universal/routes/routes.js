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
        // path uses regex to only allow 'login' or 'signup' as authType param.
        // I don't know if this is the best way to do it or not.
        path: '/auth/:authType(login|signup)/',
        component: routerMap.AuthLayout,
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
