function Observer(data) {
    // 先把vm中data变量中的数据存储到劫持对象的data中(劫持对象的data指向和vm中data变量指向相同)
    this.data = data;
    // 开始劫持，并传入的是vm中的data变量
    this.walk(data);
}

Observer.prototype = {
    // 构造器
    constructor: Observer,
    // data----vm中的data变量
    walk: function(data) {
        // 先保存劫持对象
        var me = this;
        // 遍历vm中data变量中所有的属性,key--->'msg'属性
        Object.keys(data).forEach(function(key) {
            // 开始转换操作----->把vm中data里面的属性 添加到劫持对象的data属性中
            // key----->'msg'   data[key]------->data['msg']----->data.msg--->值
            me.convert(key, data[key]);
        });
    },
    // key----->'msg'   data[key]------->data['msg']----->data.msg--->值
    convert: function(key, val) {
        // this.data---->劫持对象中的data属性,key---->msg,val---->'飞哥真美'
        this.defineReactive(this.data, key, val);
    },
    // 1.创建dep对象,2.把vm中的data中的每个属性添加到劫持对象的data中,重写了get和set方法
    defineReactive: function(data, key, val) {
        // 创建dep对象---依赖关系对象
        var dep = new Dep();
        // 如果val---->值--->还是一个对象的情况,那么就再次的进行劫持操作(同上)
        var childObj = observe(val);
        // 把vm中的data中的每个属性添加到劫持对象的data中,重写了get和set方法
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            // 只要外部或者其他的地方,调用了vm.msg(vm['msg']),要读取msg的值 那么就会进来
            get: function() {
                // 判断Dep.target中存储的watcher对象是否存在
                if (Dep.target) {
                    // 调用dep的方法,用来添加watcher对象
                    dep.depend();
                }
                // 直接放回msg表达式的值
                return val;
            },
            // 只要外部或者其他的地方,调用了vm.msg(vm['msg']),赋值操作  msg的值 那么就会进来
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 如果修改的值是一个对象，那么就会重新劫持一下，目的:一个属性产生一个dep对象
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};
// 劫持数据的开始操作
function observe(value, vm) {
    // 如果value没有值或者不是对象,就会进入到if中,不会创建劫持对象
    if (!value || typeof value !== 'object') {
        return;
    }
    // value中存储的如果是一个对象的情况,那么就会创建劫持对象
    // 创建劫持对象

    return new Observer(value);
};


var uid = 0;

function Dep() {
    // 唯一的标识id值
    this.id = uid++;
    // 用来存储watcher对象的
    this.subs = [];
}

Dep.prototype = {
    // 把watcher添加到subs数组中
    addSub: function(sub) {
        this.subs.push(sub);
    },
    // 开始建立dep和watcher的关系
    depend: function() {
        // Dep.target---->watcher对象,this----->dep
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },
    // 当前的这个msg属性对应着一个dep对象,dep对象中的subs数组中有两个watcher
    // data中一个属性对应一个dep
    // html容器中一个表达式对应一个watcher
    // msg属性值要改了,那么对应的这个dep就会立刻通知对应的两个watcher对象
    notify: function() {
        // 遍历所有的watcher对象,更新数据操作
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;