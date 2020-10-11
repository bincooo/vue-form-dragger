export default {
    /* 左侧拖拽按钮配置信息 */
    button: [
        {
            type: 'text',
            name: '文字',
            value: '',
            disabled: false
        }
    ],


    /* 视图模板 */
    viewer: {
        text: {
            template: '<el-link type="primary">{{item.name}}</el-link>',
            props: ['item']
        }
    },


    /*生成代码模板*/
    /**
     * function 有四个参数：
     *  data: 构建数据
     *  bind: 数据绑定
     *  _fn_bind_: 数据绑定工具(function)
     *  _fn_build_： 模板构建工具(function)
     */
    build: {
        text: function (data, bind, _fn_bind_, _fn_build_) {
            console.log(data, bind, _fn_bind_, _fn_build_)
            return `<el-link type="primary">${data.name}</el-link>`
        }
    }
}