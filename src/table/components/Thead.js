/**
 * Created by Eric on 2018/4/23.
 */
import React, {Component} from 'react';
import Icon from '../../icon/Icon';
import './Thead.scss';

class Thead extends Component {
    componentDidMount() {
        this.props.onGetHeight && this.props.onGetHeight(this.thead, 'thead');
    }

    render() {
        const {columns, dataType, sort, widthAuto, onStartStretch, onSort} = this.props;

        return (
            <thead className="cow__thead" ref={(thead) => this.thead = thead}>
            <tr>
                {
                    columns.map((list) => {
                        return (
                            <th
                                key={list.key}
                                className={list.className ? list.className : ''}
                                style={{opacity: `${!dataType && list.fixed && !widthAuto && 0}`}}
                            >
                                {
                                    typeof list.title === 'function' ? list.title() : list.title
                                }
                                {
                                    list.sort &&
                                    <div
                                        className={`cow__thead-sort${sort.key === list.key ? ' cow--active' : ''}`}
                                    >
                                        <Icon
                                            type="caret-up"
                                            className={`cow__sort-up${sort.key === list.key && sort.type === 'up' ? ' cow--active' : ''}`}
                                            onClick={() => onSort('up', list.key)}
                                        />
                                        <Icon
                                            type="caret-down"
                                            className={`cow__sort-down${sort.key === list.key && sort.type === 'down' ? ' cow--active' : ''}`}
                                            onClick={() => onSort('down', list.key)}
                                        />
                                    </div>
                                }
                                {
                                    list.stretch &&
                                    <div
                                        className="cow__thead-stretch"
                                        onMouseDown={(e) => onStartStretch(e, list.key)}
                                    ></div>
                                }
                            </th>
                        )
                    })
                }
            </tr>
            </thead>
        )
    }
}

export default Thead;