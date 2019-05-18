import React from 'react';
import HomePage from '../../components/HomePage';
import renderer from 'react-test-renderer';

describe('<HomePage />', () => {
    it('should render correctly', () => {
        const tree = renderer.create(<HomePage />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});