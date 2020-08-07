function Watcher(vm, expOrFn, cb) {
    // vm---vm对象
    // expOrFn---->msg
    // cb---回调函数
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
    // 用来存储dep的id及对应的dep对象----键值对的方式来存储
    this.depIds = {};
    // 判断msg表达式是不是一个函数
    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        // getter中保存了一个回调函数
        this.getter = this.parseGetter(expOrFn.trim());
    }
    // 获取某个数据的值 存储到value属性中
    // 就是在获取expOrFn属性中存储的表达式的值-----vm.msg值
    // value中存储的是msg属性值
    this.value = this.get();
}

Watcher.prototype = {
    constructor: Watcher,
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    // 真正的建立dep和watcher的关系
    addDep: function(dep) {
        // 判断watcher对象中的depIds对象中是否已经有了dep的id值(判断该键是否存在,判断当前的dep是否存在)
        if (!this.depIds.hasOwnProperty(dep.id)) {
            // 肯定是不存在

            // 把this----watcher,添加到dep的subs数组中
            dep.addSub(this);
            // 把depId及dep对象以键值对的方式存储到depIds对象中
            this.depIds[dep.id] = dep;

            // 建立了dep和watcher的关系
        }
    },
    // 获取vm中的msg属性值
    get: function() {
        // this----->watcher对象---监视对象
        // watcher对象存储到了Dep的target属性中
        Dep.target = this;
        // 在调用getter中存储的回调(parseGetter函数中的返回的函数)
        var value = this.getter.call(this.vm, this.vm);
        // 清空
        Dep.target = null;
        // 返回的是msg的值
        return value;
    },

    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return; 
        // exps是一个数组['msg']
        var exps = exp.split('.');

        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                // 如果是一个空的数据就返回了
                if (!obj) return;
                // obj----->vm对象
                // obj参数变量= vm[exps[0]]---->vm['msg']
                // obj = vm['msg'] 值---->vm.msg
                // 由于是要获取vm.msg的属性值,就会进入到mvvm的get方法,就会进入到observer中的get方法,就会建立dep和watcher关系
                obj = obj[exps[i]];
            }
            // 返回msg表达式的值
            return obj;
        }
    }
};