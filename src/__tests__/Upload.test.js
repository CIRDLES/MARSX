import React from 'react';
import Upload from '../../components/Upload';
import renderer from 'react-test-renderer';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Upload />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Upload />);
    });

    it('should render correctly', () => {
        const tree = renderer.create(<Upload />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});