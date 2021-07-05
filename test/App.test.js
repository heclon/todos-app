import React from 'react';
import { shallow, mount } from 'enzyme';

import ReactTestUtils from 'react-dom/test-utils';
import App from '../src/App';

describe('App', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App/>);
  });

    afterEach(() => {

    });

    it('renders App without crashing', () => {
      ReactTestUtils.renderIntoDocument(<App />);
    });

    it('renders my name linking to my linkedin page ', () => {
      
      expect(wrapper).toBeDefined();

      const linkedinNode = wrapper.find('div.linkedin')
      expect(linkedinNode).to.have.lengthOf(1);
      expect(linkedinNode.text()).toEqual("Hector Longarte");   

    });
});