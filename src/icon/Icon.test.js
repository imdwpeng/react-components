/**
 * Created by Eric on 2018/4/26.
 */
import React from 'react';
import {shallow} from 'enzyme';
import Icon from './Icon';

const setup = () => {
    const props = {
        type: 'test',
        onClick: jest.fn()
    };

    const wrapper = shallow(<Icon {...props}/>);

    return {
        props,
        wrapper
    }
};

describe('Icon', () => {
    const {props, wrapper} = setup();

    it('Icon Component should be render', () => {
        expect(wrapper.find('.icon-test').exists());
    });

    it('When click the Icon, onClick() should be called', () => {
        wrapper.find('i').simulate('click');
        expect(props.onClick).toBeCalled();
    });
});
