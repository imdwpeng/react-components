/**
 * Created by Eric on 2018/4/23.
 * @params:{
 *  widthAuto: 宽度自适应
 *  loading: 加载中
 *  no: 序号
 *  affix: thead置顶
 *  border: 边框
 *  checkbox={checkbox}  复选框
 *  dataSource={dataSource}  列表数据
 *  columns={columns}  表头数据
 *  pagination={pagination}  分页数据
<<<<<<< HEAD
 *  loading: 加载中
 *  message: dataSource为空时的提示信息
=======
>>>>>>> fac9bf3f133819a0b51eab963c14f9ecb03a69d0
 * }
 */
import React, {Component} from 'react';
import classnames from 'classnames';
import {closest, offset, getStyle} from '../common/Dom';
import Pagination from '../pagination/Pagination';
import Loading from '../loading/Loading';
import ScrollBar from '../scrollBar/ScrollBar';
import TableContent from './components/Table';
import './Table.scss';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            leftColumns: [],
            mainColumns: [],
            rightColumns: [],
            // 主表格各tr高度
            trHeight: {
                thead: [],
                tbody: []
            },
            // 外框大小
            outWidth: 0,
            outHeight: 0,
            // 主表格大小
            tableWidth: 0,
            tableHeight: 0,
            // 拉伸
            stretch: {
                ifStretch: false,
                key: '',
                iLeft: 0,
                thLeft: 0,
                iWidth: 0
            },
            // 滚动
            ifScroll: false,
            delta: {
                deltaX: 0,
                deltaY: 0
            },
            // 排序
            sort: {
                type: '',
                key: ''
            },
            // checkbox
            checkVO: {
                allCheck: false,
                checkedAttr: [],
                allKeysAttr: []
            },
            ifRender: true,
            // 分页
            pagination: {...props.pagination}
        }
    }

    componentDidMount() {
        this._initColumns(this.props);
        // 拉伸ing
        document.addEventListener('mousemove', this.handleStretchIng);

        // 结束拉伸
        document.addEventListener('mouseup', this.handleEndStretch);
    }

    // 当table高度变化时更新外框高度
    componentDidUpdate() {
        const {outHeight} = this.state;
        const newOutHeight = this.tableLayout.offsetHeight;
        outHeight !== newOutHeight &&
        this.setState({
            outHeight: newOutHeight
        })
    }

    componentWillReceiveProps(nextProps) {
        this._initColumns(nextProps);
    }

    // 卸载事件
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleStretchIng);
        document.removeEventListener('mouseup', this.handleEndStretch);
    }

    // 初始化列表（区分左右固定栏数据）
    _initColumns = (props) => {
        const {columns, dataSource, pageData, no, checkbox, widthAuto} = props;
        const {checkVO} = this.state;

        // 如分页则显示分页列表，否则显示完整数据
        const newData = pageData ? pageData : dataSource;

        let autoColumns = [],
            leftColumns = [],
            mainColumns = [],
            rightColumns = [],
            tableWidth = 0,
            allKeysAttr = [];

        // 编号
        if (no) {
            const noKey = {key: 'no', title: '编号', width: 56, fixed: 'left'};

            widthAuto ? autoColumns.push(noKey) : leftColumns.push(noKey);
            tableWidth += 56;
            newData.map((list, i) => {
                list.no = i + 1;
            })
        }

        // checkbox
        if (checkbox) {
            const checkKey = {
                key: 'checkbox',
                title: () => {
                    return (
                        <input type='checkbox' checked={this.state.checkVO.allCheck} onClick={this.handleAllCheck}/>
                    );
                },
                width: 44,
                fixed: 'left',
                render: (record) => {
                    return (
                        <input
                            type="checkbox"
                            checked={this.state.checkVO.checkedAttr.indexOf(record.key) !== -1}
                            disabled={record.disabled}
                            onClick={() => this.handleCheck(record.key)}
                        />
                    )
                }
            };

            widthAuto ? autoColumns.push(checkKey) : leftColumns.push(checkKey);

            tableWidth += 44;
            newData.map((list) => {
                if (checkbox.disabled) {
                    list.disabled = checkbox.disabled(list);
                    !checkbox.disabled(list) && allKeysAttr.push(list.key);
                } else {
                    list.disabled = false;
                    allKeysAttr.push(list.key);
                }
            });
            checkVO.allKeysAttr = allKeysAttr;
        }

        columns.map((list) => {
            tableWidth += list.width ? list.width : 100;

            switch (list.fixed) {
                case 'left':
                    leftColumns.push(list);
                    break;
                case 'right':
                    rightColumns.push(list);
                    break;
                default:
                    mainColumns.push(list);
            }
        });

        // 表格宽度自适应
        if (widthAuto) {
            leftColumns = [];
            mainColumns = autoColumns.concat(columns);
            rightColumns = [];
        }

        this.setState({
            checkVO,
            dataSource: newData,
            tableWidth,
            leftColumns,
            mainColumns,
            rightColumns,
            outWidth: this.tableLayout.offsetWidth,
            outHeight: this.tableLayout.offsetHeight
        })
    };

    // 全选
    handleAllCheck = () => {
        const {checkVO} = this.state;
        let allCheck = false, checkedAttr = [];

        if (!checkVO.allCheck) {
            allCheck = true;
            checkedAttr = [...checkVO.allKeysAttr];
        }

        this.props.checkbox.onChange && this.props.checkbox.onChange(checkedAttr);

        this.setState({
            checkVO: {
                ...checkVO,
                allCheck,
                checkedAttr
            }
        });
    };

    // 单选
    handleCheck = (key) => {
        const {checkVO} = this.state,
            index = checkVO.checkedAttr.indexOf(key);

        index !== -1 ? checkVO.checkedAttr.splice(index, 1) : checkVO.checkedAttr.push(key);
        checkVO.allCheck = checkVO.allKeysAttr.length === checkVO.checkedAttr.length ? true : false;

        this.props.checkbox.onChange && this.props.checkbox.onChange(checkVO.checkedAttr);

        this.setState({checkVO});
    };

    // 翻页
    handleChangePage = (pagination) => {
        this.setState({
            ifRender: true,
            pagination: {...pagination}
        });
    };

    /*
     * 获取tr的高度
     *  data:数据
     *  type:类型-->thead/tbody
     */
    handleGetHeight = (data, type) => {
        const {trHeight} = this.state,
            otherType = type === 'thead' ? 'tbody' : 'thead';

        let tableHeight = 0;

        trHeight[otherType].map((list) => {
            tableHeight += list;
        });

        data.map((list) => {
            tableHeight += list;
        });

        trHeight[type] = data;

        type === 'tbody' &&
        this.setState({ifRender: false});

        this.setState({tableHeight, trHeight});
    };

    // 开始拉伸
    handleStartStretch = (e, key) => {
        const thNode = closest(e.target, 'TH'),
            iLeft = e.clientX - offset(this.tableLayout).left,
            thLeft = offset(thNode).left - offset(this.tableLayout).left,
            iWidth = getStyle(thNode, 'width');

        this.setState({
            stretch: {
                ifStretch: true,
                key: key,
                iLeft,
                thLeft,
                iWidth
            }
        })
    };

    // 拉伸ing
    handleStretchIng = (e) => {
        const {stretch, delta} = this.state;
        if (!stretch.ifStretch) return;

        let iLeft = e.clientX - offset(this.tableLayout).left,
            iWidth = stretch.iWidth - (stretch.iLeft - iLeft);

        // th最小宽度为40
        if (iWidth <= 40) {
            iWidth = 40;
            iLeft = iWidth - stretch.iWidth + stretch.iLeft;
        }

        this.setState({
            stretch: {
                ...stretch,
                iLeft,
                iWidth
            }
        });
    };

    // 结束拉伸
    handleEndStretch = () => {
        const {stretch, leftColumns, mainColumns, rightColumns, delta} = this.state;

        if (!stretch.ifStretch) return;

        let tableWidth = 0;

        leftColumns.map((list) => {
            list.key === stretch.key && (list.width = stretch.iWidth);
            tableWidth += list.width ? list.width : 100;
        });

        mainColumns.map((list) => {
            list.key === stretch.key && (list.width = stretch.iWidth);
            tableWidth += list.width ? list.width : 100;
        });

        rightColumns.map((list) => {
            list.key === stretch.key && (list.width = stretch.iWidth);
            tableWidth += list.width ? list.width : 100;
        });

        // 拉伸后表格宽度小于外框宽度，则滚动条左对齐
        const iWidth = this.tableLayout.offsetWidth - tableWidth;

        if (iWidth >= 0) {
            delta.deltaX = 0;
            this.setState({
                delta
            })
        }

        this.setState({
            tableWidth,
            leftColumns,
            mainColumns,
            rightColumns,
            stretch: {
                ...stretch,
                ifStretch: false
            }
        });
    };

    // 滚动
    handleWheel = (e) => {
        const {widthAuto, dataSource} = this.props,
            {tableWidth, tableHeight, delta} = this.state,
            iWidth = this.tableLayout.offsetWidth - tableWidth,
            iHeight = this.tableLayout.offsetHeight - tableHeight;

        let iDeltaX = delta.deltaX - e.deltaX,
            iDeltaY = delta.deltaY - e.deltaY;

        // 没有数据时，不允许滚动
        if (dataSource.length === 0) return;

        // 禁止浏览器其他滚动
        if (iDeltaX < 0 && iDeltaX > iWidth) {
            e.preventDefault();
        }

        /*
         * 判断滚动边界
         *  自适应宽度时不允许左右滚动
         */
        iDeltaX = iDeltaX >= 0 || iWidth >= 0 || widthAuto
            ? 0
            : iDeltaX <= iWidth
                ? iWidth
                : iDeltaX;

        iDeltaY = iDeltaY >= 0 || iHeight >= 0
            ? 0
            : iDeltaY <= iHeight
                ? iHeight
                : iDeltaY;

        this.setState({
            delta: {
                deltaX: iDeltaX,
                deltaY: iDeltaY
            }
        })
    };

    //拖动滚动条滚动
    handleScroll = (data) => {
        const {delta} = this.state,
            {type, iDelta, status} = data;

        if (type === 'xAxis') {
            delta.deltaX = -iDelta;
        }
        if (type === 'yAxis') {
            delta.deltaY = -iDelta;
        }

        this.setState({delta, ifScroll: status})
    };

    /*
     * 排序
     *  type:类型-->up/down
     *  key:排序项
     */
    handleSort = (type, key) => {

        const {dataSource} = this.state;

        dataSource.sort((a, b) => {
            //检测是否是数值类型（包括带引号的数字，如"3"默认是数值类型）
            let aValue = a[key] - 0 ? a[key] - 0 : a[key],
                bValue = b[key] - 0 ? b[key] - 0 : b[key];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return type === 'up' ? aValue - bValue : bValue - aValue;
            } else {
                return type === 'up' ? (aValue + "").localeCompare((bValue + "")) : (bValue + "").localeCompare((aValue + ""));
            }
        });

        // 重新编写序号
        dataSource.map((list, i) => {
            list.no = i + 1;
        });

        this.setState({
            ifRender: true,
            dataSource,
            sort: {
                type,
                key
            }
        })
    };

    render() {
        const {ifRender, pagination, leftColumns, mainColumns, rightColumns, dataSource, ifScroll, trHeight, stretch, delta, sort, tableWidth, tableHeight, outWidth, outHeight} = this.state;
        const {height, affix, border, widthAuto, loading, message} = this.props;
        const columns = leftColumns.concat(mainColumns, rightColumns);
        const outClassName = classnames(
            'cow__table-layout',
            {
                'cow__table-border': border,
                'cow__table--no-select': stretch.ifStretch || ifScroll
            }
        );

        // 分页
        let newDataSource = [...dataSource];
        if (pagination && pagination.total !== 0) {
            const {current, pageSize, total} = pagination,
                startIndex = (current - 1) * pageSize,
                endIndex = current * pageSize < total ? current * pageSize : total;
            newDataSource = dataSource.slice(startIndex, endIndex);
        }

        return (
            <div style={{height: height || '100%'}}>
                <div
                    className={outClassName}
                    style={{height: pagination && pagination.total && trHeight.tbody.length ? `calc(100% - 60px)` : ''}}
                    ref={(tableLayout) => this.tableLayout = tableLayout}
                    onWheel={this.handleWheel}
                >
                    {/*主表*/}
                    <TableContent
                        ifRender={ifRender}
                        affix={affix}
                        columns={columns}
                        dataSource={newDataSource}
                        delta={delta}
                        sort={sort}
                        widthAuto={widthAuto}
                        onGetHeight={this.handleGetHeight}
                        onStartStretch={this.handleStartStretch}
                        onSort={this.handleSort}
                    />

                    {
                        // 左表
                        leftColumns.length !== 0 &&
                        <TableContent
                            ifRender={ifRender}
                            affix={affix}
                            columns={leftColumns}
                            dataSource={newDataSource}
                            dataType="left"
                            delta={delta}
                            sort={sort}
                            trHeight={trHeight}
                            onStartStretch={this.handleStartStretch}
                            onSort={this.handleSort}
                        />
                    }

                    {
                        // 右表
                        rightColumns.length !== 0 &&
                        <TableContent
                            ifRender={ifRender}
                            affix={affix}
                            columns={rightColumns}
                            dataSource={newDataSource}
                            dataType="right"
                            delta={delta}
                            sort={sort}
                            trHeight={trHeight}
                            onStartStretch={this.handleStartStretch}
                            onSort={this.handleSort}
                        />
                    }

                    {/*拉伸线*/}
                    <div
                        className="cow__table-line"
                        style={{display: stretch.ifStretch ? 'block' : 'none', left: stretch.iLeft}}
                    ></div>

                    {
                        // 底部滚动条
                        newDataSource.length !== 0 &&
                        outWidth - tableWidth < 0 &&
                        <ScrollBar
                            className="cow__table-scrollbar--x"
                            type="xAxis"
                            delta={delta.deltaX}
                            mainTotal={tableWidth}
                            mainContent={outWidth}
                            scrollTotal={outWidth}
                            onscroll={this.handleScroll}
                        />
                    }

                    {
                        // 右侧滚动条
                        newDataSource.length !== 0 &&
                        outHeight - tableHeight < 0 &&
                        <div
                            className="cow__table-scrollbar--y"
                            style={{
                                paddingTop: affix ? trHeight.thead[0] : 0,
                            }}
                        >
                            <ScrollBar
                                type="yAxis"
                                delta={delta.deltaY}
                                mainTotal={tableHeight}
                                mainContent={outHeight}
                                scrollTotal={affix ? outHeight - trHeight.thead[0] : outHeight}
                                onscroll={this.handleScroll}
                            />
                        </div>
                    }

                    {
                        // loading
                        loading &&
                        <Loading className="cow__table--loading"/>
                    }

                    {
                        // message
                        newDataSource.length === 0 &&
                        <div className="cow__table--message">{message}</div>
                    }
                </div>
                {
                    pagination &&
                    pagination.total !== 0 &&
                    <Pagination className="cow__table--pagination" {...pagination} onClick={this.handleChangePage}/>
                }
            </div>
        )
    }
}

export default Table;
