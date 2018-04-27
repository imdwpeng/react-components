/**
 * Created by dwp on 17/9/15.
 */

import React, {Component} from 'react';

import Icon from '../icon/Icon';

class SelectInput extends Component {
    render() {

        const {name, defaultItem, defaultName, selectedName, selectedItem, isActive, onSlideToggle, placeholder} = this.props;
        const slideToggle = isActive ? 'up' : 'down';
        const showName = selectedName !== false ? selectedName : defaultName || placeholder;
        const showItem = selectedItem !== false ? selectedItem : defaultItem;

        return (
            <div
                className="cow__select-input"
                onClick={onSlideToggle}
            >
                <span className="cow__select-show">{showName}</span>
                <input
                    type="text"
                    name={name}
                    defaultValue={showItem}
                    style={{display: 'none'}}
                />
                <Icon className={`icon-slide icon-${slideToggle}`} link="down"/>
            </div>
        )
    }
}

export default SelectInput;