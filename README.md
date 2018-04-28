# react 组件库
## Icon
图标来自于 [iconfont阿里巴巴矢量图标库](http://www.iconfont.cn/)
### 代码演示
```javascript
<Icon 
    type="caret-up" 
    className="custom-class" 
    onClick={()=>{console.log('click')}}
/>
```
### API

参数|说明|类型|默认值
--|--|--|--
type|图标类型|string|-
className|自定义class属性|string|-
onClick|图标点击事件|function|-

## Pagination
### 代码演示
```javascript
<Pagination 
    current={1}
    pageSize={10}
    total={100}
    showSelectPage
    onClick={({current, pageSize, total})=>{console.log({current, pageSize, total})}}
/>
```
### API

参数|说明|类型|默认值
--|--|--|--
current|当前页|number|-
pageSize|每页显示数量|number|-
total|总数量|number|-
showSelectPage|是否显示快速选择框|boolean|false
onClick|翻页时回调函数|function({current, pageSize, total}){}|-

## Loading
### 代码演示
```javascript
<Loading 
    type="load"
    content="加载中。。。"
/>
```
### API

参数|说明|类型|默认值
--|--|--|--
type|图标类型|string|'loading'
content|提示的内容|string|-

## Select
select选择框
### 代码演示
```javascript
<Select name="test" search>
    <option value="-1">--请选择--</option>
    <option value="1">北京</option>
    <option value="2">上海</option>
    <option value="3">浙江</option>
    <option value="4">江苏</option>
</Select>
```

### API

参数|说明|类型|默认值
--|--|--|--
url|异步请求数据，设置该属性时则根据该接口返回的参数进行渲染|string|-
search|模糊搜索|boolean|false
defaultItem|初始化时默认选中|string|-
name|form表单提交时对应的属性|string|-
onChange|选择item后回调函数|function({value,name}){}|-

## ScrollBar
滚动条
### 代码演示
```javascript
<ScrollBar 
    type="xAxis" 
    mainTotal="100" 
    mainContent="20" 
    scrollTotal="20" 
    delta="5"
/>
```

### API

参数|说明|类型|默认值
--|--|--|--
type|滚动条类型|string: xAxis/yAxis|-
mainTotal|滚动区域总高度|string|-
mainContent|滚动可见区域高度|string|-
scrollTotal|滚动条总高度（不设置时则以mainContent为准）|string|-
delta|被卷去的高度|string|-
onScroll|拖动滚动条回调函数，回调参数: {type:滚动类型,iDelta:卷去的距离,status:滚动状态}|function(type, iDelta, status){}|-

## Table
表格
### 代码演示
```javascript
const columns = [
    {key: 'name', title: '姓名'},
    {key: 'age', title: '年龄'},
    {key: 'sex', title: '性别'},
    {key: 'mobile', title: '联系方式'},
    {key: 'email', title: '邮箱'},
    {key: 'address', title: '地址'},
    {
        key: 'operation', title: '操作',
        render: (record) => {
            return (
                <button>详情</button>
            )
        }
    }
];

const dataSource = [
    {
        "key": "0",
        "name": "张三",
        "age": "11",
        "mobile": "15788888888",
        "email": "15788888888@qq.com",
        "address": "浙江省杭州市江干区幸福小区1栋1单元1101室",
        "sex": "男"
    }, {
        "key": "1",
        "name": "张三",
        "age": "11",
        "mobile": "15788888888",
        "email": "15788888888@qq.com",
        "address": "浙江省杭州市江干区幸福小区1栋1单元1101室",
        "sex": "男"
    }, {
        "key": "2",
        "name": "张三",
        "age": "11",
        "mobile": "15788888888",
        "email": "15788888888@qq.com",
        "address": "浙江省杭州市江干区幸福小区1栋1单元1101室",
        "sex": "男"
    }, {
        "key": "3",
        "name": "张三",
        "age": "11",
        "mobile": "15788888888",
        "email": "15788888888@qq.com",
        "address": "浙江省杭州市江干区幸福小区1栋1单元1101室",
        "sex": "男"
    }, {
        "key": "4",
        "name": "张三",
        "age": "11",
        "mobile": "15788888888",
        "email": "15788888888@qq.com",
        "address": "浙江省杭州市江干区幸福小区1栋1单元1101室",
        "sex": "男"
    }, {
        "key": "5",
        "name": "张三",
        "age": "11",
        "mobile": "15788888888",
        "email": "15788888888@qq.com",
        "address": "浙江省杭州市江干区幸福小区1栋1单元1101室",
        "sex": "男"
    }, {
        "key": "6",
        "name": "张三",
        "age": "11",
        "mobile": "15788888888",
        "email": "15788888888@qq.com",
        "address": "浙江省杭州市江干区幸福小区1栋1单元1101室",
        "sex": "男"
    }
];
<Table
    columns={columns}
    dataSource={dataSource}
/>
```

### 宽度自适应
设置 `widthAuto` 属性来设置宽度自适应
注：宽度自适应时不能设置左右固定栏

### 边框
设置 `border` 属性来显示边框

### 序号
设置 `no` 属性来显示序号

### 选择框
设置 `checkbox` 属性来显示选择框
```javascript
const checkbox = {
    disabled: (record) => {
        return record.age > 10;
    },
    onChange: (selectedKeys) => {
        console.log(selectedKeys)
    }
};
<Table
    columns={columns}
    dataSource={dataSource}
    checkbox={checkbox}
/>
```

### 提示信息
设置 `message` 属性来设置无数据时显示的提示信息

### 分页
设置 `pagination` 属性来设置分页
```javascript
const pagination = {
    current: 1,
    pageSize: 5,
    total: 100,
    onClick:(page)=>{
        console.log(page)
    }
};
<Table
    columns={columns}
    dataSource={dataSource}
    pagination={pagination}
/>
```

### 表头固定
设置 `affix` 属性来设置表头固定在顶部

### 加载中
设置 `loading` 属性来显示加载中

### API

**Table**

参数|说明|类型|默认值
--|--|--|--
columns|表头列表|attr|[]
dataSource|表内容|attr|[]
widthAuto|宽度自适应|boolean|false
no|序号|boolean|false
affix|表头置顶|boolean|false
border|边框|boolean|false
checkbox|选择框|Object|-
pagination|分页，参数同 `Pagination` |Object|-
loading|加载中，可设置 `type` 属性自定义加载图标样式|object/boolean|false
message|内容为空时提示的信息|string|-

**columns**

参数|说明|类型|默认值
--|--|--|--
key|React需要的key，必须设置|string|-
className|列的className属性|string|-
title|表头文字|string|-
stretch|列是否可拉伸|boolean|false
fixed|列是否左右固定，可选参数：`'left'` `'right'` |string|-
sort|排序|boolean|false
width|列宽度|number|-
render|自定义数据渲染，参数为当前行数据|function(record){return()}|-

**checkbox**

参数|说明|类型|默认值
--|--|--|--
disabled|是否禁止选择，参数为当前行数据|function(record){return()}|-
onChange|点击选择框时的回调函数|function(selectedKeys){}|-
