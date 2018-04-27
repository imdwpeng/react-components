/**
 * Created by Eric on 2018/4/27.
 * @params{
 *  className
 *  type: loading icon
 *  content: loading msg
 * }
 */
import React, {Component} from 'react';
import Icon from '../icon/Icon';

import './Loading.scss';

class Loading extends Component {
    render() {
        const {className, type, content} = this.props;

        return (
            <div className={`cow__loading${className ? ' ' + className : ''}`}>
                <div className="cow__loading-box">
                    <Icon type={type ? type : 'loading'}/>
                    {
                        content &&
                        <p>{content}</p>
                    }
                </div>
            </div>
        )
    }
}

export default Loading;