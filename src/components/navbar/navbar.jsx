import React from 'react';
import glamorous from 'glamorous';

const Navbar = () => {
  const Wrapper = glamorous.div({
    width: '100%',
    height: '80px',
    backgroundColor: '#333333',
    display: 'flex',
    justifyContent: 'center',
  });

  const Navigation = glamorous.nav({
    width: '75%',
    padding: '10px',
    margin: 'auto',
    alignSelf: 'center',
    position: 'relative',
  });

  const NavigationSection = glamorous.div({
    display: 'inline-block',
  });

  const Logo = glamorous.img({
    width: '200px',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '100%',
  });

  return (
    <Wrapper>
      <Navigation>
        <NavigationSection>
          <Logo alt="MXSDB" src="../../assets/images/MXSDB.svg" />
        </NavigationSection>
      </Navigation>
    </Wrapper>
  );
};

export default Navbar;
