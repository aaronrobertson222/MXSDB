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


  return (
    <Wrapper>
      <Navigation>
        <NavigationSection>
          Mxsdb Howdy
        </NavigationSection>
      </Navigation>
    </Wrapper>
  );
};

export default Navbar;
