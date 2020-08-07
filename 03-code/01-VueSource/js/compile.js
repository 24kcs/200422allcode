// 构造函数,el--->#app或者body标签，vm----MVVM的实例对象
function Compile(el, vm) {
    // 把vm实例对象保存到$vm属性中
    this.$vm = vm;
    // 根据选择器来获取html模版中的html容器div(id为app的div)
    // $el---->div容器对下昂
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断div容器是否存在
    if (this.$el) {
        // 创建文档碎片对象(把div容器中所有的节点全都扔进到了文档碎片对象中)---可以理解为虚拟DOM
        this.$fragment = this.node2Fragment(this.$el);
        // 真真正正的解析模版的操作
        this.init();
        // 把内存中已经解析完毕后的文档碎片对象重新的添加到div容器中----模版解析结束了
        this.$el.appendChild(this.$fragment);
    }
}
// 编译对象的原型对象
Compile.prototype = {
    // 重新设置构造器的指向
    constructor: Compile,
    // 遍历div容器中的节点,并创建文档碎片对象,并把div中的节点全都扔进文档碎片对象中---内存中
    node2Fragment: function(el) {
        // el----div
        // 创建文档碎片对象
        var fragment = document.createDocumentFragment(),
            child;

        // 遍历div中的节点,并放在文档碎片对象中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 返回文档碎片对象(div中的所有子节点已经全都进到这里来了)
        return fragment;
    },
    // 编译解析文档碎片对象中所有的节点的操作的方法
    init: function() {
        // 这才是真正的解析模版操作的方法
        // this.$fragment----->文档碎片对象
        this.compileElement(this.$fragment);
    },
    // 解析模版的方法,el----->this.$fragment----->文档碎片对象
    compileElement: function(el) {
        // 把文档碎片对象中所有的节点一次性全部的拿出来给childNodes变量
        var childNodes = el.childNodes,
            me = this; // 保存了当前的编译实例对象
        // 遍历所有的子节点
        [].slice.call(childNodes).forEach(function(node) {
            // node---->每个子节点
            // text变量中存储的是每个节点中的文本内容
            var text = node.textContent;
            // 插值语法的正则表达式   . 除了\n以外任意的一个单个字符,  * 限定符,限定前面的这个表达式出现的次数(出现0次到多次)  {{msg}}    () ---->提升优先级或者叫分组,一个正则表达式中有几个小括号,就代表着有几组
            // reg----->msg表达式
            var reg = /\{\{(.*)\}\}/;
            // 判断当前的节点是不是标签节点
            if (me.isElementNode(node)) {
                // 如果是标签节点,开始解析
                // node----button
                // 普通的指令 v-text, node-->p标签
                me.compile(node);

                // 判断当前的节点是文本节点同时还要满足插值语法的正则
            } else if (me.isTextNode(node) && reg.test(text)) {
                // node----{{msg}} 文本节点  reg.test({{msg}})---->是否匹配 同时 提取出msg表达式
                // RegExp.$1.trim()-----msg
                // node----{{msg}}    
                me.compileText(node, RegExp.$1.trim());
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    // 解析标签中的指令的----node----button
    compile: function(node) {
        // 获取标签中所有的属性
        var nodeAttrs = node.attributes,
            me = this;// 保存当前编译对象
        // 遍历所有的属性,attr--->某个属性-----v-on:click="showName"
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 获取属性的名字, attrName----->v-on:click

            // 获取属性的名字  atrrName----->v-text  普通指令
            var attrName = attr.name;
            // 判断当前的这个属性是不是一个指令
            if (me.isDirective(attrName)) {
                // 此时说明当前的这个属性是一个指令
                var exp = attr.value;
                // 干掉了指令中的v- 
                // dir----->on:click
                // dir----->text----->v-text,v-干掉了
                var dir = attrName.substring(2);
                // 判断当前的指令是不是一个事件指令
                if (me.isEventDirective(dir)) {
                    // 事件指令,node----button,me.$vm---->vm, exp---->showName表达式,dir---->on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else { // 普通指令
                    // dir---->text   exp---->msg
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 删除了标签上所有的属性
                node.removeAttribute(attrName);
            }
        });
    },
    // node----{{msg}}   exp---->msg
    compileText: function(node, exp) {
        // this.$vm-----vm对象
        // node---->{{msg}}
        // exp------msg
        compileUtil.text(node, this.$vm, exp);
    },
    // 判断当前的属性是不是指令
    isDirective: function(attr) {
        // 该属性是不是以  v- 开头
        return attr.indexOf('v-') == 0;
    },
    // 判断当前的指令是不是一个事件指令
    isEventDirective: function(dir) {
        // 判断这个指令是不是以 on 开头的
        return dir.indexOf('on') === 0;
    },
    // 判断当前的节点是不是一个标签节点,如果是则返回true,否则返回的是false
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    // 判断当前的节点是不是文本节点,如果是则返回true,否则返回的是false
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    // 解析v-text或者解析{{msg}}插值语法的
    // node----->{{msg}},vm--->vm  exp---->msg
    // node----->p标签,vm--->vm,exp---->msg
    // 解析的是v-text及{{msg}}
    text: function(node, vm, exp) {
        // node----->{{msg}},vm--->vm  exp---->msg   'text'


        // node----->p标签,vm--->vm,exp---->msg
        this.bind(node, vm, exp, 'text');
    },
    // 解析的就是v-html指令的
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    // node----->{{msg}},vm--->vm  exp---->msg dir---->'text'
    // 无非就是把vm下面的msg属性值获取到,同时用msg属性值 替换'{{msg}}'这个文本节点内容
    bind: function(node, vm, exp, dir) {
        // updater----->对象
        // dir---->'text'
        // updater['textUpdater']
        // updater.textUpdater
        // updaterFn----->updater对象中的方法
        var updaterFn = updater[dir + 'Updater'];
        // 该方法存在不? 如果存在则调用
        // this._getVMVal(vm, exp)---->作用就是根据vm获取msg属性值
        // updaterFn('{{msg}}', msg表达式值);

        // 普通指令而言:v-text----》  node---->p标签 ,this._getVMVal(vm, exp) vm.msg的值
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 暂且不分析
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理  node----button按钮vm,exp--->showName表达式,dir---->on:click
    eventHandler: function(node, vm, exp, dir) {
        // eventType---->click事件类型
        var eventType = dir.split(':')[1],
        // 判断当前vm.$options.methods是否存在,如果存在那么就把methods对象中的showName属性值获取到--->showName函数
        // fn---showName回调函数
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断click事件 和 showName回调是否存在
        if (eventType && fn) {
            // 通过addEventListener为button绑定click事件,并且联系上showName回调函数,false----事件冒泡
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    // 作用:通过vm获取msg属性的值  :  今天中午吃什么
    _getVMVal: function(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    // 表达式的解析的代码
    // node---->'{{msg}}'-----文本节点
    // value---->msg属性的值

    // node----p标签  value---->真香
    // v-text和{{msg}}解析的时候最终的代码操作
    textUpdater: function(node, value) {
        // 把文本节点中的文本内容替换成msg属性值

        // p.textContent='真香'
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    // v-html最终解析的操作代码
    // node----p标签, value---->msg属性值
    htmlUpdater: function(node, value) {
        // p.innerHTML='<a href="http://www.baidu.com">百度</a>'
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    // v-class的指令解析
    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },
    // v-model指令的解析
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};