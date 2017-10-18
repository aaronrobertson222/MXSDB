import React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

const Header = glamorous.header({
  width: '100%',
});

const Nav = glamorous.nav({
  width: '100%',
});

const Div = glamorous.div({
  width: '100%',
});

const H1 = glamorous.h1({
  color: 'red',
});

const Navbar = () => (
  <Header>
    <Nav>
      <Div>
        <Link href="/" to="/">
          <H1>MXSDB</H1>
        </Link>
      </Div>
    </Nav>
  </Header>
);

export default Navbar;
