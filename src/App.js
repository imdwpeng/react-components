import React, {Component} from 'react';
import Table from './table/Table';

const columns = [
    {key: 'groupName', title: '分组', className: 'cow_class', fixed: 'left', sort: true},
    {key: 'name', title: '任务名称', width: 150},
    {key: 'cron', title: 'cron', stretch: true, sort: true},
    {key: 'method', title: '执行方法', fixed: 'right', sort: true},
    {key: 'status', title: '执行状态'},
    {key: 'desc', title: '描述'},
    {
        key: 'operation', title: '操作',
        render: (record) => {
            return (
                <div>
                    <button>详情</button>
                    <br/>

                    {
                        record.key === 12 &&
                        <button>修改</button>

                    }
                </div>
            )
        }
    }
];

const dataSource = [
    {
        "cron": "1",
        "desc": "前端商品同步",
        "groupName": "itemCenter",
        "key": 12,
        "method": "syncFrontItemTask",
        "name": "com.ruhnn.ic.task.SyncFrontItemTaskService",
        "status": "运行中",
        "type": 2
    }, {
        "cron": "3",
        "desc": "同步前端商品到中间表",
        "groupName": "itemCenter",
        "key": 11,
        "method": "syncJdpMkeydleItemTask",
        "name": "com.ruhnn.ic.task.SyncFrontItemTaskService",
        "status": "运行中",
        "type": 2
    }, {
        "cron": "11",
        "desc": "旺店通包裹订单同步任务(1分钟)",
        "groupName": "consign",
        "key": 10,
        "method": "execute",
        "name": "com.ruhnn.consign.task.PackOrderSyncJob",
        "status": "暂停",
        "type": 3
    }, {
        "cron": "21",
        "desc": "每周一生成上新统计",
        "groupName": "dataCenter",
        "key": 9,
        "method": "genScheduleStatisticsReportWeekly",
        "name": "com.ruhnn.datacenter.service.impl.shop.SchedulingReportServiceImpl",
        "status": "运行中",
        "type": 2
    }, {
        "cron": "成绩 ",
        "desc": "每日生成上一天上新统计（每日5点执行.）",
        "groupName": "dataCenter",
        "key": 8,
        "method": "genShopScheduleDay",
        "name": "com.ruhnn.datacenter.service.impl.shop.SchedulingReportServiceImpl",
        "status": "运行中",
        "type": 2
    }, {
        "cron": "33",
        "desc": "配置文件同步",
        "groupName": "conf",
        "key": 5,
        "method": "execute",
        "name": "com.ruhnn.job.conf.PropInitConfExecuteJob",
        "status": "运行中",
        "type": 2
    }, {
        "cron": "10",
        "desc": "短信发送报告",
        "groupName": "inform",
        "key": 6,
        "method": "execute",
        "name": "com.ruhnn.job.inform.GetSmsReportExecutorJob",
        "status": "运行中",
        "type": 2
    }
];

class App extends Component {
    constructor() {
        super();
        this.state = {
            columns: [],
            dataSource: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                dataSource: dataSource
            })
        }, 2000);

        this.setState({
            columns: columns
        })
    }

    render() {
        const {columns, dataSource} = this.state;

        const checkbox = {
            disabled: (record) => {
                return record.cron > 10;
            },
            onChange: (selectedKeys) => {
                console.log(selectedKeys)
            }
        };

        const pagination = {
            current: 1,
            pageSize: 5,
            total: 100
        };

        return (
            <div style={{margin: 100, width: 600}}>
                <Table
                    loading
                    no
                    affix
                    border
                    checkbox={checkbox}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                />
            </div>
        );
    }
}

export default App;
