import React from 'react';
import { JwtService } from '../services/jwt.service';
import { redirectToLogin } from '../services/redirect.service';

function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const auth = JwtService.fromNext(ctx);
    let authProps = {};

    if (ctx.pathname !== '/login') {
      if (auth.isExpired()) {
        await redirectToLogin(ctx);
      } else {
        authProps = {
          username: auth.decodedToken.username,
          id: auth.decodedToken.id
        };
      }
    }

    const pageProps = WrappedComponent.getInitialProps
      ? await WrappedComponent.getInitialProps(authProps)
      : {};

    return { ...authProps, ...pageProps };
  };

  Wrapper.layout = WrappedComponent.layout;

  return Wrapper;
}

export default withAuth;
