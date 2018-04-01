import React from 'React';

function asyncRoute(getComponent) {
  return class AsyncComponent extends React.Component {
    state = {
      Component: null,
    };

    componentDidMount() {
      if (this.state.component === null) {
        getComponent().then((Component) => {
          this.setState({ Component });
        });
      }
    }

    render() {
      const Component = this.state;

      if (Component) {
        return <Component {...this.props} />;
      }

      return <div>Loading...</div>;
    }
  };
}

export const LandingLayout = asyncRoute(() => System.import('layouts/landing-layout/landing.layout'));

export const MainLayout = asyncRoute(() => System.import('layouts/main-layout/main.layout'));

export const AuthLayout = asyncRoute(() => System.import('layouts/auth-layout/auth.layout'));

export const DashboardLayout = asyncRoute(() => System.import('layouts/dashboard-layout/dashboard.layout'));
