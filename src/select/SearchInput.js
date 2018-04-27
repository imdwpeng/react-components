/**
 * Created by dwp on 17/9/15.
 */

import React, {Component} from 'react';
import classnames from 'classnames';

import Icon from '../icon/Icon';

class SearchInput extends Component {

    render() {

        const {onSearch, onCancel, isActive, keyword} = this.props;
        const className = classnames({
            hidden: !isActive
        });

        return (
            <div className={`cow__search-input ${className}`}>
                <Icon className="icon-search" link="search"/>
                <input
                    type="text"
                    value={keyword}
                    placeholder="请输入关键词"
                    onChange={onSearch}
                />
                <Icon
                    className="icon-delete"
                    link="delete-circle"
                    onClick={onCancel}
                />
            </div>
        )
    }
}

export default SearchInput;