/**
 * Created by Eric on 2018/4/24.
 */
import React, {Component} from 'react';
import classnames from 'classnames';
import './Icon.scss';

class Icon extends Component {
    render() {
        const {type, className, onClick} = this.props;
        const classname = classnames(
            'iconfont',
            `icon-${type}`,
            className
        )
        return (
            <i className={classname} onClick={onClick}></i>
        )
    }
}

export default Icon;