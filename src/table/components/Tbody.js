/**
 * Created by Eric on 2018/4/23.
 */
import React, {Component} from 'react';
import './Tbody.scss';

class Tbody extends Component {

    componentDidMount() {
        this.props.onGetHeight && this.props.onGetHeight(this.tbody, 'tbody');
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.ifRender || nextProps.trHeight ? true : false;
    }

    componentDidUpdate() {
        this.props.onGetHeight && this.props.onGetHeight(this.tbody, 'tbody');
    }

    render() {
        const {columns, dataSource, trHeight, dataType, widthAuto} = this.props;

        return (
            <tbody className="cow__tbody" ref={(tbody) => this.tbody = tbody}>
            {
                dataSource.length !== 0 &&
                dataSource.map((item, i) => {
                    return (
                        <tr key={item.key} style={{height: trHeight ? trHeight[i] : ''}}>
                            {
                                columns.map((list) => {
                                    return (
                                        <td
                                            key={list.key}
                                            className={list.className ? list.className : ''}
                                            style={{opacity: `${!dataType && list.fixed && !widthAuto && 0}`}}
                                        >
                                            {
                                                list.render
                                                    ? list.render(item)
                                                    : item[list.key]
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        )
    }
}

export default Tbody;