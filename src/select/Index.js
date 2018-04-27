/*
 * Created by Eric on 2018/1/17.
 * @params{
 *      url: 'www.xxx.com/search...'       //异步获取列表
 *      search                             //模糊搜索
 *      defaultItem                        //初始化默认选中
 *      name                               //form表单用
 *      ...other props
 * }
 */

import React, {Component} from 'react';
import Select from './Select';

class App extends Component {
    render() {
        return (
            <div style={{margin:'100px auto',width:200}}>
                <Select name="test" search>
                    <option data-name="123" value="-1">--请选择--</option>
                    <option value="1">北京</option>
                    <option value="2">上海</option>
                    <option value="3">浙江</option>
                    <option value="4">江苏</option>
                </Select>
            </div>
        );
    }
}

export default App;
