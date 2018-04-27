/**
 * Created by Eric on 2018/4/24.
 */
import React, {Component} from 'react';
import {getStyle} from '../../common/Dom';

const GetTrHeight = WrapperComponent => class extends Component {

    constructor() {
        super();
    }

    handleGetHeight = (node, type) => {
        let iHeight = [];
        for (let i in node.children) {
            const child = node.children[i];

            if (child && child.nodeName === 'TR') {
                iHeight.push(getStyle(child, 'height'))
            }
        }
        this.props.onGetHeight && this.props.onGetHeight(iHeight, type);
    };

    render() {
        return (
            <WrapperComponent
                {...this.props}
                onGetHeight={this.handleGetHeight}
            />
        )
    }
}

export default GetTrHeight;