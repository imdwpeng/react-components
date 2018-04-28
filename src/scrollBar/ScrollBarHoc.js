/**
 * Created by Eric on 2018/1/30.
 */
import React, {Component} from 'react';
import classname from "classnames";

const ScrollBarHoc = WrapperComponent => class extends Component {

    constructor() {
        super();
        this.state = {
            style: {},
            scroll: {
                status: false,
                iClient: ''
            }
        }
    }

    componentDidMount() {
        this._init(this.props);

        document.addEventListener('mousemove', (e) => {
            const {mainTotal, mainContent, scrollTotal, type} = this.props,
                ratio = scrollTotal / mainTotal,
                scrollContent = ratio * mainContent,
                {scroll, style} = this.state,
                {status, iClient} = scroll;

            if (!status) return;

            let client = '',
                iPosition = '',
                iDelta = '';

            if (type === 'xAxis') {
                client = e.clientX - iClient;
                iPosition = style.left + client;
            } else {
                client = e.clientY - iClient;
                iPosition = style.top + client;
            }

            // 控制滚动范围
            iPosition = iPosition <= 0
                ? 0
                : iPosition >= scrollTotal - scrollContent
                    ? scrollTotal - scrollContent
                    : iPosition;
            iDelta = iPosition / ratio;

            // 返回滚动类型和被卷去的距离
            this.props.onScroll && this.props.onScroll({type, iDelta, status: true});

            this.setState({
                scroll: {
                    status: true,
                    iClient: type === 'xAxis' ? e.clientX : e.clientY
                },
                style: {
                    ...style,
                    left: type === 'xAxis' && iPosition,
                    top: type === 'yAxis' && iPosition
                }
            });
        });

        document.addEventListener('mouseup', () => {
            const {scroll} = this.state;

            if (scroll.status) {
                scroll.status = false;

                this.props.onScroll && this.props.onScroll({status: false});

                this.setState({scroll})
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this._init(nextProps);
    }

    _init = (props) => {
        const {mainTotal, mainContent, delta, type} = props,
            scrollTotal = props.scrollTotal ? props.scrollTotal : mainContent,
            ratio = scrollTotal / mainTotal || 0,
            scrollContent = ratio * mainContent;

        let style = {};

        switch (type) {
            case 'yAxis':
                style = {
                    top: -ratio * delta,
                    height: scrollContent
                };
                break;
            case 'xAxis':
                style = {
                    left: -ratio * delta,
                    width: scrollContent
                };
                break;
            default:
                break;
        }

        this.setState({
            style: style
        })
    };

    // 开始拖动滚动条滚动
    startScroll = (e) => {
        const {type} = this.props;

        this.setState({
            scroll: {
                ...this.state.scroll,
                status: true,
                iClient: type === 'xAxis' ? e.clientX : e.clientY
            }
        })
    };

    render() {
        const {type, className} = this.props,
            wrapClass = classname(
                'cow__scroll-bar-wrap', className,
                {
                    'cow__scroll-bar--y': type === 'yAxis',
                    'cow__scroll-bar--x': type === 'xAxis'
                }
            );

        return (
            <WrapperComponent {...this.props} {...this.state} wrapClass={wrapClass} startScroll={this.startScroll}/>
        )
    }
};

export default ScrollBarHoc;