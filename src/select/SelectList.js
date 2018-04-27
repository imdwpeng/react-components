/**
 * Created by dwp on 17/9/15.
 */

import React, {Component} from 'react';
import classnames from 'classnames';

class SelectList extends Component {

    render() {
        const {data, isActive, selectedItem, defaultItem, onSelected, onSlideToggle} = this.props;
        const showItem = selectedItem || defaultItem;
        const className = classnames({
            hidden: !isActive
        });

        return (
            <div className={`cow__select-list ${className}`}>
                {/*遮罩层，点击空白隐藏*/}
                <div className="cow__select-shade" onClick={onSlideToggle}></div>
                <ul>
                    {
                        data && data.map((list) => {
                            const className = showItem - "" === list.value - "" ? 'cow__select-li-active' : '';
                            let ifShow = list.ifShow,
                                newList = delete list.ifShow;

                            return (
                                ifShow || ifShow === undefined
                                    ? <li
                                        className={className}
                                        key={list.value}
                                        data-idx={list.value}
                                        {...newList}
                                        onClick={onSelected}
                                    >
                                        {list.children}
                                    </li>
                                    : null
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default SelectList;