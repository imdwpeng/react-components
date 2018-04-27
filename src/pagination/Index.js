/**
 * Created by Eric on 2018/1/16.
 */
import React, {Component} from 'react';
import Pagination from './Pagination';

class Index extends Component {
    render() {
        const params = {
            current: 1,
            pageSize: 10,
            total: 100
        };

        return (
            <Pagination {...params} showSelectPage/>
        );
    }
}

export default Index;