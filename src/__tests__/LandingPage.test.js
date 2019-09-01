import React from 'react';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import LandingPage from '../components/LandingPage';

describe('<LandingPage />', () => {
  it('renders landing page without crashing', () => {
    shallow(<LandingPage />)
  });

  it('renders landing page as expected', () => {
    const wrapper = shallow(<LandingPage />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


});