import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import AuthForm from './auth-form';

describe('Auth Form', () => {
  let submitting;
  let pristine;
  let touched;
  let handleSubmit;

  const initialState = {
    user: null,
  };

  beforeEach(() => {
    submitting = false;
    touched = false;
    pristine = true;
    handleSubmit = fn => fn;
    configure({ adapter: new Adapter() });
  });

  const buildComponent = () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const props = {
      submitting,
      pristine,
      touched,
      handleSubmit,
      store,
    };

    return shallow(<AuthForm {...props} />).dive();
  };

  it('Should fire the formSubmitHandler function', () => {
    const wrapper = buildComponent();
    wrapper.find('#submit').simulate('click');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
