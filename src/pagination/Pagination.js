/**
 * Created by Eric on 2018/1/16.
 * @params:{
 *  current  当前页
 *  pageSize 每页数量
 *  total    列表总数
 *  onClick  分页点击回调事件
 *  showSelectPage  显示快速选择
 * }
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from '../select/Select';
import './Pagination.scss';

class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            current: 1,           //当前页
            pageSize: 20,         //每页数量
            total: 0             //总数
        }
    }

    componentDidMount() {
        this._initData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._initData(nextProps);
    }

    _initData = (props) => {
        const {current, pageSize, total} = props;
        this.setState({
            ...this.state, current, pageSize, total
        })
    };

    //加载页码
    renderPage = () => {
        const {current, pageSize, total} = this.state;
        //总页数
        const pageNo = Math.ceil(total / pageSize);
        const children = [];

        let startPage = pageNo <= 6 || current < 4
            ? 2
            : pageNo - (current - 2) < 4
                ? pageNo - 4
                : current - 2;

        let endPage = pageNo <= 6
            ? pageNo - 1
            : current < 4
                ? 5
                : current + 2;

        //首页
        pageNo !== 1 &&
        children.push(
            <li
                key="0"
                onClick={() => this.changePage(1)}
                className={current === 1 ? 'cow__page-first cow__page-active' : 'cow__page-first'}
            >1</li>
        );

        //前省略号
        startPage > 2 &&
        children.push(<li key="-1" className="cow__page-dot">...</li>);

        for (let i = startPage; i <= endPage; i++) {
            const className = current === i ? 'cow__page-li cow__page-active' : 'cow__page-li';
            i < pageNo &&
            children.push(<li key={i} onClick={() => this.changePage(i)} className={className}>{i}</li>);
        }

        //后省略号
        endPage < pageNo - 1 &&
        children.push(<li key="-2" className="cow__page-dot">...</li>);

        //尾页
        children.push(
            <li
                key={pageNo}
                onClick={() => this.changePage(pageNo)}
                className={current === pageNo ? 'cow__page-last cow__page-active' : 'cow__page-last'}
            >{pageNo}</li>
        );

        return children;
    };

    //加载快速跳转
    renderSelect = () => {
        const {pageSize, total} = this.state;
        const pageNo = Math.ceil(total / pageSize);
        let pageSelect = [];

        for (let i = 0; i < pageNo; i++) {
            pageSelect.push(<option key={i + 1} value={i + 1}>{i + 1}/{pageNo}</option>);
        }

        return (
            <Select onChange={this.changePage}>{pageSelect}</Select>
        );
    };

    //翻页
    changePage = (current) => {
        const {pageSize, total} = this.state;
        this.props.onClick && this.props.onClick({current, pageSize, total});
        this.setState({
            current: current
        })
    };

    //前一页
    prevPage = () => {
        const {current, pageSize, total} = this.state;

        this.props.onClick && this.props.onClick({current: current - 1, pageSize, total});
        this.setState({
            current: current - 1
        })
    };

    //后一页
    nextPage = () => {
        const {current, pageSize, total} = this.state;

        this.props.onClick && this.props.onClick({current: current + 1, pageSize, total});
        this.setState({
            current: current + 1
        })
    };

    render() {
        const {current, pageSize, total} = this.state;
        const {className, showSelectPage} = this.props;

        //总页数
        const pageNo = Math.ceil(total / pageSize);

        if (total === 0) {
            return null;
        }

        return (
            <ul className={`cow__page-ul${className ? ' ' + className : ''}`}>
                {
                    current !== 1 &&
                    <li className="cow__page--prev" onClick={this.prevPage}>&lt;</li>
                }
                {this.renderPage()}
                {
                    current !== pageNo &&
                    <li className="cow__page--next" onClick={this.nextPage}>&gt;</li>
                }
                {
                    showSelectPage &&
                    <li className="cow__page-change">
                        {this.renderSelect()}
                    </li>
                }
            </ul>
        );
    }
}

//类型检测
Pagination.propTypes = {
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    showSelectPage: PropTypes.bool
};

export default Pagination;
