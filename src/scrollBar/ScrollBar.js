/**
 * Created by Eric on 2018/1/29.
 * @params:{
 *      mainTotal,       // 滚动区域总高度
 *      mainContent,     // 滚动可见区域高度
 *      scrollTotal,     // 滚动条总高度
 *      delta,           // 被卷去的高度
 *      type             // 类型 xAxis  yAxis
 * }
 */
import React, {Component} from 'react';
import ScrollBarHoc from './ScrollBarHoc';
import './ScrollBar.css';

class ScrollBar extends Component {
    render() {
        const {wrapClass, style, startScroll} = this.props;
        return (
            <div className={wrapClass}>
                <div
                    className="cow__scroll-bar"
                    style={{...style}}
                    onMouseDown={startScroll}
                ></div>
            </div>
        )
    }
}

export default ScrollBarHoc(ScrollBar);