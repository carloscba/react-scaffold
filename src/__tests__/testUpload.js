import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Upload from '../components/Upload';

it('renders upload button', () => {

  const wrapper = shallow(<Upload accept="image" index="0">Upload</Upload>);
  const test = <button id="btnUpload" className="btn btn-primary btn-block">Upload</button>;
  
  expect(wrapper.contains(test)).toEqual(true);

});