// MVVM的构造函数
function MVVM(options) {
    // this是当前MVVM的实例对象
    // options中存储的是配置对象(el,data对象)
    // 把options配置对象给了$options属性
    // js是一门动态类型的语言,对象中没有这个属性,只要通过.的方式,那么该对象就有这个属性
    // this.$options就是添加的一个属性,内部存储了options对象
    this.$options = options || {};
    // 把data对象存储到了_data属性和data变量中(data变量和_data属性和options中的data对象指向是相同的)
    var data = this._data = this.$options.data;
    // 把MVVM的实例对象this存储到了me变量中
    var me = this;

    // 获取data变量(对象)中所有的属性---->此时是一个遍历操作(data中有很多的属性,那么就会遍历很多次)
    Object.keys(data).forEach(function(key) {
        // key---->msg属性
        // me----this---->MVVM实例对象
        // 通过该方法实现数据代理
        me._proxyData(key);
    });
    // 计算属性的
    this._initComputed();
    // 数据劫持操作------发生在模版解析之前，this----vm对象,data---->变量--->this._data
    observe(data, this);




    // 模版解析
    //  this---vm实例对象
    // 创建了一个编辑实例对象,并传入了选择器:#app,如果#app不存在,把body传入进去了,还传入了vm实例对象
    this.$compile = new Compile(options.el || document.body, this)
}
// MVVM的原型对象
MVVM.prototype = {
    // 构造器的指向重新设定为MVVM
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 真正实现数据代理的方法,key---->msg
    _proxyData: function(key, setter, getter) {
        // me--->this---->MVVM实例对象----->vm实例对象
        var me = this;

        setter = setter || 
        // me---->vm实例对象,key---->msg属性
        // 把data对象中每个属性一个一个添加到vm上,从而实现了,vm.msg---->可以直接获取data对象中的属性数据值
        Object.defineProperty(me, key, {
            configurable: false, // 不能够随意的删除该属性,操作
            enumerable: true, // 可以被枚举遍历
            // 重写了get方法
            get: function proxyGetter() {
                // 能够进入到get方法,说明外部(某个地方)肯定是书写了vm.msg这种代码,来获取该属性的值,
                // 说白了,只要是外部通过vm.msg来获取该(某个)属性值就会自动的进入到这个get方法内部
                // vm.msg----->vm['msg'] 一样,都会进来,console.log(vm.msg)

                // this._data['msg'] 把data对象中的msg属性值返回
                return me._data[key];
            },
            // 重写了set方法
            set: function proxySetter(newVal) {
                // 能够进入到set方法,说明外部(某个地方),肯定是书写了vm.msg=值这种代码,设置该属性的值
                // 说白了,只要是通过vm.msg来设置该(某个)属性值就会自动的进入到这个set方法内部
                // vm.msg----->vm['msg'] 一样,都会进来,mv.msg='值'
                me._data[key] = newVal;
            }
        });
    },



    // 计算属性的
    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};