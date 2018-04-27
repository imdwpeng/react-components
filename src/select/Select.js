/**
 * Created by dwp on 17/9/18.
 */

import React, {Component} from 'react';

import SelectInput from './SelectInput';
import SearchInput from './SearchInput';
import SelectList from './SelectList';

import './Select.css';

// 组件命名
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

// 组合HOC
const compose = (...funcs) => component => {
    if (funcs.lenght === 0) {
        return component;
    }
    const last = funcs[funcs.length - 1];
    //从右到左进行组合
    return funcs.reduceRight((res, cur) => cur(res), last(component));
};

// 获取SelectList列表并默认选中状态
const asyncSelectDecorator = WrappedComponent => {
    return class extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

        constructor() {
            super();
            this.state = {
                data: []
            }
        }

        componentDidMount() {
            let {data, url, defaultItem, children} = this.props;
            //设置默认选中状态
            let defaultName = '';

            //不设置则默认选中第一个
            if (!defaultItem) {
                defaultItem = children[0].props.value;
                defaultName = children[0].props.children;
            } else {
                children.map((list) => {
                    if (list.props.value !== defaultItem) return;
                    defaultName = list.props.children;
                });
            }

            this.setState({
                defaultItem: defaultItem,
                defaultName: defaultName
            });

            //获取列表数据  有url则根据url显示
            if (url !== undefined) {
                fetch(url)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        this.setState({
                            data
                        })
                    })
                    .catch(function (e) {
                        console.log("Error", e);
                    });
            } else {
                let dataList = [];
                data.map((list) => {
                    dataList.push({...list.props})
                });

                this.setState({
                    data: dataList
                })
            }
        }

        render() {
            return (
                <WrappedComponent {...this.props} {...this.state}/>
            )
        }
    }
};

// 完成 SearchInput 与 SelectList 的交互（模糊搜索）
const searchDecorator = WrappedComponent => {
    return class extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

        constructor() {
            super();

            this.state = {
                keyword: ''
            }
        }

        //搜索
        handleSearchItem = (e) => {
            const value = e.target.value;
            let ifShow = false;
            if (value === '') {
                ifShow = true;
            }

            this.props.data && this.props.data.map((list) => {
                ifShow === true || list.children.indexOf(value) !== -1
                    ? list.ifShow = true
                    : list.ifShow = false
            });

            this.setState({
                keyword: e.target.value
            })
        }

        //取消搜索
        handleCancelSearch = () => {
            this.props.data && this.props.data.map((list) => {
                list.ifShow = true
            });
            this.setState({
                keyword: ''
            })
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    onSearch={this.handleSearchItem}
                    onCancel={this.handleCancelSearch}
                    keyword={this.state.keyword}
                />
            )
        }
    }
};

// 完成 SelectInput 与 SelectList 的交互（展开收缩列表）
const slideToggleDecorator = WrappedComponent => {
    return class extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

        constructor() {
            super();
            this.state = {
                isActive: false
            }
        }

        componentDidMount() {
            const {isActive} = this.props;
            this.setState({
                isActive: isActive || this.state.isActive
            });
        }

        //显示隐藏列表
        slideToggle = () => {
            this.setState({
                isActive: !this.state.isActive
            })
        };

        render() {
            return (
                <WrappedComponent {...this.props} {...this.state} onSlideToggle={this.slideToggle}/>
            )
        }
    }
};

// 完成 SelectList 与 SelectInput 的交互（选择list，显示在SelectInput中）
const selectDecorator = WrappedComponent => {
    return class extends WrappedComponent {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

        constructor() {
            super();

            this.state = {
                selectedItem: false,
                selectedName: false
            }
        }

        handleSelectedItem = (e) => {
            this.setState({
                selectedItem: e.target.getAttribute('data-idx'),
                selectedName: e.target.innerHTML
            });
            this.props.onSlideToggle();
        }

        render() {

            return (
                <WrappedComponent {...this.props} {...this.state} onSelected={this.handleSelectedItem}/>
            )
        }
    }
};

class SelectorComponent extends Component {
    render() {
        return (
            <div className="cow__select">
                <SelectInput {...this.props}/>
                <div className="cow__select-list-box">
                    {
                        this.props.search && this.props.isActive &&
                        <SearchInput {...this.props}/>
                    }
                    {
                        this.props.isActive &&
                        <SelectList {...this.props}/>
                    }
                </div>
            </div>
        )
    }
}

const FinalSelect = compose(asyncSelectDecorator, searchDecorator, slideToggleDecorator, selectDecorator)(SelectorComponent);

class Select extends Component {
    render() {
        return (
            <FinalSelect {...this.props} data={this.props.children}></FinalSelect>
        )
    }
}

export default Select;