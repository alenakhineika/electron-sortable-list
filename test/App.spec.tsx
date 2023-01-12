import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/App';

describe('App', () => {
  it('should display the title "Title"', () => {
    const wrapper = shallow(
      <App />
    );

    expect(wrapper.find('.title').text()).toEqual('Sorting Libraries');
  });
});
