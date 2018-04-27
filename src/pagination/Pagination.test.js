/**
 * Created by Eric on 2018/4/26.
 */
import React from 'react';
import {mount} from 'enzyme';
import Pagination from './Pagination';

const setup = () => {
    const props = {
        current: 1,
        pageSize: 20,
        total: 100,
        onClick: jest.fn()
    };

    const wrapper = mount(<Pagination {...props}/>);

    return {
        props,
        wrapper
    }
};

describe('Pagination', () => {
    const {props, wrapper} = setup();

    it('Pagination Component should be render', () => {
        expect(wrapper.find('ul').exists());
    });

    it('click first page item', () => {
        wrapper.find('.cow__page-first').simulate('click');
        expect(props.onClick).toBeCalledWith({
            current: 1,
            pageSize: 20,
            total: 100
        });
    });

    it('click page item', () => {
        wrapper.mount();
        wrapper.find('.cow__page-li').at(0).simulate('click');
        expect(props.onClick).toBeCalledWith({
            current: 2,
            pageSize: 20,
            total: 100
        });
    });

    it('click last page item', () => {
        wrapper.mount();
        wrapper.find('.cow__page-last').simulate('click');
        expect(props.onClick).toBeCalledWith({
            current: 5,
            pageSize: 20,
            total: 100
        });
    });

    it('click prevPage or nextPage icon', () => {
        wrapper.mount();
        wrapper.find('.cow__page--next').simulate('click');
        expect(props.onClick).toBeCalledWith({
            current: 2,
            pageSize: 20,
            total: 100
        });

        wrapper.mount();
        wrapper.setProps({current: 2});
        wrapper.find('.cow__page--prev').simulate('click');
        expect(props.onClick).toBeCalledWith({
            current: 1,
            pageSize: 20,
            total: 100
        });
    });

    it('show dot', () => {
        // 前省略号
        wrapper.setProps({current: 5, total: 140});
        expect(wrapper.find('.cow__page-dot').length).toEqual(1);

        // 后省略号
        wrapper.setProps({current: 1, total: 140});
        expect(wrapper.find('.cow__page-dot').length).toEqual(1);
    });

    it('show select list', () => {
        wrapper.setProps({showSelectPage: true});
        expect(wrapper.find('.cow__page-change').length).toEqual(1);
    });
});