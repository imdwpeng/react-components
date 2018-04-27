/**
 * Created by Eric on 2018/4/23.
 */
import React, {Component} from 'react';
import classnames from 'classnames';
import Thead from './Thead';
import TheadMain from '../hoc/TheadHoc';
import TbodyMain from '../hoc/TbodyHoc';
import './Table.scss';

class TableMain extends Component {
    render() {
        const {columns, dataSource, dataType, trHeight, delta, sort, affix, widthAuto, onGetHeight, onStartStretch, onSort} = this.props;

        const className = classnames({
            'cow__table--left': dataType === 'left',
            'cow__table--right': dataType === 'right',
            'cow__table': !dataType,
            'cow__table--auto': widthAuto,
            'cow__table--shadow': delta.deltaX
        });

        const fixedClassName = classnames(
            'cow__table--fixed',
            {
                'cow__table--shadow': delta.deltaY
            }
        );

        return (
            <div className={className}>
                {
                    affix &&
                    <table
                        cellSpacing="0"
                        className={fixedClassName}
                        style={{transform: `translate(${!dataType ? delta.deltaX : 0}px)`}}
                    >
                        <colgroup>
                            {
                                columns.map((list) => {
                                    return (
                                        <col key={list.key} width={list.width ? list.width : !widthAuto ? 100 : ''}/>
                                    )
                                })
                            }
                        </colgroup>
                        <Thead
                            columns={columns}
                            dataType={dataType}
                            sort={sort}
                            widthAuto={widthAuto}
                            onStartStretch={onStartStretch}
                            onSort={onSort}
                        />
                    </table>
                }
                <table
                    cellSpacing="0"
                    className="cow__table-main"
                    style={{transform: `translate(${!dataType ? delta.deltaX : 0}px,${delta.deltaY}px)`}}
                >
                    <colgroup>
                        {
                            columns.map((list) => {
                                return (
                                    <col key={list.key} width={list.width ? list.width : !widthAuto ? 100 : ''}/>
                                )
                            })
                        }
                    </colgroup>
                    {
                        columns.length !== 0 &&
                        <TheadMain
                            columns={columns}
                            dataType={dataType}
                            sort={sort}
                            widthAuto={widthAuto}
                            onStartStretch={onStartStretch}
                            onGetHeight={onGetHeight}
                            onSort={onSort}
                        />
                    }
                    {
                        dataSource.length !== 0 &&
                        <TbodyMain
                            dataSource={dataSource}
                            columns={columns}
                            dataType={dataType}
                            widthAuto={widthAuto}
                            trHeight={trHeight && trHeight.tbody}
                            onGetHeight={onGetHeight}
                        />
                    }
                </table>
            </div>
        )
    }
}

export default TableMain;