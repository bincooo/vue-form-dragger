(function(e){function t(t){for(var l,o,c=t[0],r=t[1],s=t[2],u=0,p=[];u<c.length;u++)o=c[u],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&p.push(i[o][0]),i[o]=0;for(l in r)Object.prototype.hasOwnProperty.call(r,l)&&(e[l]=r[l]);d&&d(t);while(p.length)p.shift()();return n.push.apply(n,s||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],l=!0,c=1;c<a.length;c++){var r=a[c];0!==i[r]&&(l=!1)}l&&(n.splice(t--,1),e=o(o.s=a[0]))}return e}var l={},i={app:0},n=[];function o(t){if(l[t])return l[t].exports;var a=l[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=l,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)o.d(a,l,function(t){return e[t]}.bind(null,l));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/vue-form-dragger/main/static/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var d=r;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"2f93":function(e,t,a){},"359c":function(e,t,a){e.exports=a.p+"static/img/github.0c00801c.png"},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var l=a("a026"),i=a("5c96"),n=a.n(i),o=(a("0fae"),a("1487")),c=a.n(o),r=(a("36bb"),{install:function(e){e.directive("highlight",{inserted:function(e){console.log("inserted");for(var t=e.querySelectorAll("pre code"),a=0;a<t.length;a++)c.a.highlightBlock(t[a])},componentUpdated:function(e){console.log("updated");for(var t=e.querySelectorAll("pre code"),a=0;a<t.length;a++)c.a.highlightBlock(t[a])}})}}),s=r,d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[e._m(0),a("designer",{attrs:{data:e.data},on:{activeChange:e.activeChange},scopedSlots:e._u([{key:"default",fn:function(t){return[t.config?a("parameter",{attrs:{data:t.config}},["table"===t.config.type?a("div",[a("el-divider",{attrs:{"content-position":"left"}},[e._v("表格")]),a("el-form-item",{attrs:{label:"选择列"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:function(a){return e.change(t.config.column)}},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},e._l(t.config.column,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:t}})})),1)],1),a("div",{staticClass:"table_item_param"},[a("el-form-item",{attrs:{label:"固定"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.column.field,callback:function(t){e.$set(e.column,"field",t)},expression:"column.field"}},[a("el-option",{attrs:{label:"Left",value:"left"}}),a("el-option",{attrs:{label:"Right",value:"right"}})],1)],1),a("el-form-item",{attrs:{label:"列名"}},[a("el-input",{model:{value:e.column.label,callback:function(t){e.$set(e.column,"label",t)},expression:"column.label"}})],1),a("el-form-item",{attrs:{label:"宽度"}},[a("el-input",{model:{value:e.column.width,callback:function(t){e.$set(e.column,"width",t)},expression:"column.width"}})],1),a("el-form-item",{attrs:{label:"字段名"}},[a("el-input",{staticStyle:{width:"110px"},model:{value:e.column.prop,callback:function(t){e.$set(e.column,"prop",t)},expression:"column.prop"}}),""!==e.index?a("el-button",{attrs:{type:"info",size:"mini"},on:{click:function(a){return e.del(t.config.column)}}},[e._v("删除")]):e._e()],1)],1),""===e.index?a("el-form-item",{staticStyle:{float:"right"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.add(t.config.column)}}},[e._v("添加")])],1):e._e()],1):e._e()]):e._e()]}}])})],1)},u=[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("a",{attrs:{href:"https://github.com/bingco-zhan/vue-form-dragger",target:"_blank",id:"github-link"}},[l("img",{attrs:{alt:"",src:a("359c")}})])}],p=(a("a434"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticClass:"dr-designer",style:{width:e.width,height:e.height}},[a("el-aside",{staticClass:"dr-modeler",attrs:{width:"200px"}},[a("draggable",e._b({attrs:{list:e.modeler.list,move:e.moveCommand}},"draggable",{group:{name:"viewer",pull:"clone",put:!1},sort:!1},!1),e._l(e.modeler.list,(function(t,l){return a("div",{key:l,staticClass:"dr-module-item"},[e._v(e._s(t.name))])})),0)],1),a("el-main",{staticClass:"dr-viewer"},[a("el-form",[a("container",{staticStyle:{"min-height":"100%"},attrs:{map:e.data.viewer,root:"",selector:e.selector,data:e.list},on:{"update:selector":function(t){e.selector=t}}})],1)],1),a("el-aside",{staticClass:"dr-parameter"},[a("el-tabs",{attrs:{value:"setter"}},[a("el-tab-pane",{attrs:{label:"数据结构",name:"data"}},[a("el-container",[a("div",{staticStyle:{overflow:"auto",width:"100%"}},[a("pre",{staticStyle:{"font-family":"'Courier New', serif",padding:"5px"}},[e._v(e._s(e.json))])])])],1),a("el-tab-pane",{attrs:{label:"配置项",name:"setter"}},[e._t("default",[e.selector?a("parameter",{attrs:{data:e.selector},on:{"update:data":function(t){e.selector=t}}}):e._e()],{config:e.selector})],2),a("el-tab-pane",{attrs:{label:"其他",name:"other"}},[a("div",{staticStyle:{padding:"20px 20px 5px 20px"}},[a("el-row",{staticStyle:{"text-align":"center"},attrs:{gutter:20,justify:"space-between",type:"flex"}},[a("el-col",{attrs:{span:12}},[a("el-button",{staticStyle:{width:"100px"},attrs:{size:"mini"},on:{click:e.generator}},[e._v("生成代码")])],1),a("el-col",{attrs:{span:12}},[a("el-button",{staticStyle:{width:"100px"},attrs:{size:"mini"},on:{click:e.previewer}},[e._v("预览")])],1)],1)],1)])],1)],1),a("code-dialog",{attrs:{template:e.template,"code-visible":e.codeVisible},on:{"update:codeVisible":function(t){e.codeVisible=t},"update:code-visible":function(t){e.codeVisible=t}}}),a("el-dialog",{staticClass:"preview_dialog",attrs:{width:"1000px",id:"preview_dialog",title:"预览展示",visible:e.previewVisible},on:{"update:visible":function(t){e.previewVisible=t}}},[a("div",{attrs:{id:"preview"}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.previewVisible=!1}}},[e._v("关闭")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.metadata}},[e._v("获取数据")])],1)])],1)}),m=[],f=(a("99af"),a("4de4"),a("ac1f"),a("5319"),a("e579")),b=a.n(f),h=a("310e"),v=a.n(h),y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{class:{"dr-container":!0,"dr-empty":e.root&&0===e.data.length}},[a("draggable",{attrs:{tag:"div",ghostClass:"dr-placeholder",handle:".dr-mover",list:e.data,group:"viewer",animation:"300",move:e.moveCommand},on:{add:e.addCommand,start:e.startCommand,end:e.endCommand}},[e._l(e.data,(function(t,l){return["container"===t.type?a("div",{key:t.key,staticStyle:{margin:"2px",height:"calc(100% - 5px)"}},[a("div",{class:{"dr-area":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},staticStyle:{height:"100%"},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("el-container",{staticStyle:{height:"100%",padding:"4px"}},[a("container",{attrs:{map:e.map,selector:e.localSelector,data:t.drag},on:{"update:selector":function(t){e.localSelector=t}}})],1)],1)]):"layout"===t.type?a("el-container",{key:t.key},[a("el-row",{class:{"dr-area":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},staticStyle:{margin:"2px"},attrs:{gutter:t.gutter,type:"flex"},nativeOn:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),e._l(t.drag,(function(t,l){return a("el-col",{key:l,attrs:{span:t.span}},[a("container",{attrs:{map:e.map,selector:e.localSelector,data:t.list},on:{"update:selector":function(t){e.localSelector=t}}})],1)}))],2)],1):"input"===t.type?a("div",{key:t.key,staticStyle:{margin:"2px"}},[a("div",{class:{"dr-area mask":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},staticStyle:{height:"100%"},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("div",{staticStyle:{overflow:"auto"}},[a("el-form-item",{attrs:{"label-width":t.labelWidth,size:t.size,label:t.name}},[a("el-input",{style:{width:t.width},attrs:{disabled:t.disabled,placeholder:t.placeholder}})],1)],1)])]):"select"===t.type?a("div",{key:t.key,staticStyle:{margin:"2px"}},[a("div",{class:{"dr-area mask":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("div",{staticStyle:{overflow:"auto"}},[a("el-form-item",{attrs:{"label-width":t.labelWidth,label:t.name,size:t.size}},[a("el-select",{style:{width:t.width},attrs:{disabled:t.disabled,placeholder:t.placeholder,value:""}},e._l(t.option,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)])]):"date"===t.type?a("div",{key:t.key,staticStyle:{margin:"2px"}},[a("div",{class:{"dr-area mask":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("div",{staticStyle:{overflow:"auto"}},[a("el-form-item",{attrs:{"label-width":t.labelWidth,size:t.size,label:t.name}},[a("el-date-picker",{style:{width:t.width},attrs:{disabled:t.disabled,type:"date",placeholder:t.placeholder}})],1)],1)])]):"switch"===t.type?a("div",{key:t.key,staticStyle:{margin:"2px"}},[a("div",{class:{"dr-area mask":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("div",{staticStyle:{overflow:"auto"}},[a("el-form-item",{attrs:{"label-width":t.labelWidth,size:t.size,label:t.name}},[a("el-switch",{attrs:{disabled:t.disabled}})],1)],1)])]):"checkbox"===t.type?a("div",{key:t.key,staticStyle:{margin:"2px"}},[a("div",{class:{"dr-area mask":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("div",{staticStyle:{overflow:"auto"}},[a("el-form-item",{attrs:{"label-width":t.labelWidth,size:t.size,label:t.name}},[a("el-checkbox-group",{model:{value:e.local.checkbox,callback:function(t){e.$set(e.local,"checkbox",t)},expression:"local.checkbox"}},e._l(t.option,(function(e){return a("el-checkbox",{key:e.value,attrs:{disabled:e.disabled,label:e.label}})})),1)],1)],1)])]):"radio"===t.type?a("div",{key:t.key,staticStyle:{margin:"2px"}},[a("div",{class:{"dr-area mask":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("div",{staticStyle:{overflow:"auto"}},[a("el-form-item",{attrs:{"label-width":t.labelWidth,size:t.size,label:t.name}},[a("el-radio-group",{model:{value:e.local.radio,callback:function(t){e.$set(e.local,"radio",t)},expression:"local.radio"}},e._l(t.option,(function(e){return a("el-radio",{key:e.value,attrs:{disabled:e.disabled,label:e.label}})})),1)],1)],1)])]):"textarea"===t.type?a("div",{key:t.key,staticStyle:{margin:"2px"}},[a("div",{class:{"dr-area mask":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("div",{staticStyle:{overflow:"auto"}},[a("el-form-item",{attrs:{"label-width":t.labelWidth,size:t.size,label:t.name}},[a("el-input",{style:{width:t.Width},attrs:{resize:"none",disabled:t.disabled,type:"textarea",placeholder:t.placeholder}})],1)],1)])]):e.map[t.type]?a("div",{key:t.key,staticStyle:{margin:"2px"}},[a("div",{class:{"dr-area mask":!0,"dr-active":e.localSelector&&e.localSelector.key===t.key},on:{click:function(t){return t.stopPropagation(),e.selectCommand(l)}}},[a("i",{staticClass:"dr-mover el-icon-rank"}),a("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyCommand(l)}}}),a("i",{staticClass:"el-icon-close",on:{click:function(t){return e.closeCommand(l)}}}),a("div",{staticStyle:{overflow:"auto"}},[a(e.map[t.type],{tag:"component",attrs:{item:t}})],1)])]):e._e()]}))],2)],1)},g=[],k=(a("1276"),a("5530")),_=(a("d3b7"),a("4d63"),a("25f0"),a("3ca3"),a("ddb0"),a("2b3d"),a("53ca")),x=a("d4ec"),w=a("bee2"),C=function(){function e(){Object(x["a"])(this,e);for(var t=arguments.length,a=new Array(t),l=0;l<t;l++)a[l]=arguments[l];this.filters=a}return Object(w["a"])(e,[{key:"agn",value:function(e){if(null==e)return null;if("object"===Object(_["a"])(e)){if(Array.isArray(e)){var t=[];for(var a in e)t.push(this.agn(e[a]));return t}if(e.constructor===RegExp)return e;var l={};for(var i in e)for(var n in this.filters){"function"!==typeof this.filters[n]&&(l[i]=this.agn(e[i]));var o=this.filters[n](i,e[i],this.agn);l[i]="undefined"===typeof o?this.agn(e[i]):o}return l}return e}}]),e}();function S(e,t){var a=window.URL||window.webkitURL||window,l=new Blob([t]),i=document.createElementNS("http://www.w3.org/1999/xhtml","a");i.href=a.createObjectURL(l),i.download=e;var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),i.dispatchEvent(n)}var z={name:"container",components:{draggable:v.a},props:{data:{type:Array,required:!0},selector:Object,root:Boolean,map:{type:Object,default:function(){return{}}}},data:function(){return{localSelector:this.selector,outil:void 0,local:{checkbox:[],radio:[]}}},watch:{selector:function(e){this.localSelector=e},localSelector:{handler:function(e){this.$emit("update:selector",e)},deep:!0}},methods:{addCommand:function(e){var t=e.newIndex,a=this.data[t];this.$set(this.data,t,Object(k["a"])(Object(k["a"])({},a),{},{key:"".concat(a.type,"_").concat((new Date).getTime())})),"clone"===e.pullMode&&this.$set(this.data,t,Object(k["a"])({},this.outil.agn(this.data[t]))),this.localSelector=this.data[t]},selectCommand:function(e){this.localSelector=this.data[e]},copyCommand:function(e){this.data.splice(e,0,this.outil.agn(this.data[e]))},closeCommand:function(e){this.data.splice(e,1)},startCommand:function(e){console.log("移动中....",e)},moveCommand:function(e){return(!e.relatedContext.element||"container"!==e.relatedContext.element.type)&&(("container"!==e.draggedContext.element.type||!e.relatedContext.element)&&void 0)},endCommand:function(e){console.log("结束移动...",e)}},created:function(){this.outil=new C((function(e,t){if("key"===e)return"".concat(t.split("_")[0],"_").concat((new Date).getTime())}))}},O=z,$=a("2877"),j=Object($["a"])(O,y,g,!1,null,null,null),E=j.exports,P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticClass:"dr-param_item"},[a("el-form",{staticStyle:{width:"100%",padding:"0 10px"},attrs:{size:"mini",model:e.data,"label-width":"80px",inline:""}},[a("div",[a("el-divider",{attrs:{"content-position":"left"}},[e._v("通用")]),a("el-form-item",{attrs:{label:"类型"}},[a("el-input",{attrs:{disabled:""},model:{value:e.data.type,callback:function(t){e.$set(e.data,"type",t)},expression:"data.type"}})],1),a("el-form-item",{attrs:{label:"ID"}},[a("el-input",{model:{value:e.data.key,callback:function(t){e.$set(e.data,"key",t)},expression:"data.key"}})],1),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{model:{value:e.data.name,callback:function(t){e.$set(e.data,"name",t)},expression:"data.name"}})],1),Object.keys(e.data).indexOf("value")>=0?a("el-form-item",{attrs:{label:"数据键"}},[a("el-input",{model:{value:e.data.value,callback:function(t){e.$set(e.data,"value",t)},expression:"data.value"}})],1):e._e(),Object.keys(e.data).indexOf("size")>=0?a("el-form-item",{attrs:{label:"尺寸"}},[a("el-select",{attrs:{placeholder:"请选择尺寸"},model:{value:e.data.size,callback:function(t){e.$set(e.data,"size",t)},expression:"data.size"}},[a("el-option",{attrs:{label:"默认",value:""}}),a("el-option",{attrs:{label:"中等",value:"medium"}}),a("el-option",{attrs:{label:"小",value:"small"}}),a("el-option",{attrs:{label:"迷你",value:"mini"}})],1)],1):e._e(),Object.keys(e.data).indexOf("placeholder")>=0?a("el-form-item",{attrs:{label:"提示"}},[a("el-input",{model:{value:e.data.placeholder,callback:function(t){e.$set(e.data,"placeholder",t)},expression:"data.placeholder"}})],1):e._e(),Object.keys(e.data).indexOf("width")>=0?a("el-form-item",{attrs:{label:"宽度"}},[a("el-input",{model:{value:e.data.width,callback:function(t){e.$set(e.data,"width",t)},expression:"data.width"}})],1):e._e(),Object.keys(e.data).indexOf("labelWidth")>=0?a("el-form-item",{attrs:{label:"标签宽度"}},[a("el-input",{model:{value:e.data.labelWidth,callback:function(t){e.$set(e.data,"labelWidth",t)},expression:"data.labelWidth"}})],1):e._e(),Object.keys(e.data).indexOf("disabled")>=0?a("el-form-item",{attrs:{label:"禁用"}},[a("el-switch",{model:{value:e.data.disabled,callback:function(t){e.$set(e.data,"disabled",t)},expression:"data.disabled"}})],1):e._e()],1),"layout"===e.data.type?a("div",[a("el-divider",{attrs:{"content-position":"left"}},[e._v("布局")]),a("el-form-item",{attrs:{label:"间隔"}},[a("el-input",{staticClass:"dr-param_item_gutter",attrs:{type:"number"},model:{value:e.data.gutter,callback:function(t){e.$set(e.data,"gutter",e._n(t))},expression:"data.gutter"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.data.drag.splice(e.data.drag.length-1,0,{span:8,list:[]})}}},[e._v("添加列")])],1),e._l(e.data.drag,(function(t,l){return a("el-form-item",{key:l,attrs:{label:"列"+(l+1)}},[a("el-input",{staticClass:"dr-param_item_col",attrs:{type:"number"},model:{value:t.span,callback:function(a){e.$set(t,"span",e._n(a))},expression:"item.span"}}),a("el-button",{on:{click:function(t){return e.data.drag.splice(l,1)}}},[e._v("删除")])],1)}))],2):e._e(),Object.keys(e.data).indexOf("option")>=0?a("div",[a("el-divider",{attrs:{"content-position":"left"}},[e._v("选项")]),e._l(e.data.option,(function(t,l){return a("el-form-item",{key:l,staticStyle:{border:"1px solid #bcbbbb"},attrs:{label:"选项"+(l+1)}},[a("el-input",{staticClass:"dr-param_option-key",model:{value:t.label,callback:function(a){e.$set(t,"label",a)},expression:"item.label"}}),a("el-input",{staticClass:"dr-param_option-value",model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"item.value"}}),a("el-form-item",{staticStyle:{"padding-left":"8px"}},[a("el-button",{on:{click:function(t){return e.data.option.splice(l,1)}}},[e._v("删除")]),a("span",{staticStyle:{color:"#606266",padding:"0 8px 0 20px"}},[e._v("禁用")]),a("el-switch",{model:{value:t.disabled,callback:function(a){e.$set(t,"disabled",a)},expression:"item.disabled"}})],1)],1)})),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.data.option.splice(e.data.option.length+1,0,{label:"选项"+(e.data.option.length+1),value:""+(e.data.option.length+1)})}}},[e._v("添加元素")])],1)],2):e._e(),Object.keys(e.data).indexOf("rules")>=0?a("div",[a("el-divider",{attrs:{"content-position":"left"}},[e._v("校验")]),e._l(e.data.rules,(function(t,l){return a("div",{key:l,staticClass:"table_item_param"},[a("el-form-item",{attrs:{label:"必填"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.required,callback:function(a){e.$set(t,"required",a)},expression:"item.required"}})],1),a("el-form-item",{attrs:{label:"事件"}},[a("el-select",{attrs:{placeholder:"请选择事件类型"},model:{value:t.trigger,callback:function(a){e.$set(t,"trigger",a)},expression:"item.trigger"}},[a("el-option",{attrs:{label:"blur",value:"blur"}}),a("el-option",{attrs:{label:"change",value:"change"}})],1)],1),a("el-form-item",{attrs:{label:"类型"}},[a("el-select",{attrs:{placeholder:"请选择数据类型",clearable:""},model:{value:t.type,callback:function(a){e.$set(t,"type",a)},expression:"item.type"}},[a("el-option",{attrs:{label:"date",value:"date"}}),a("el-option",{attrs:{label:"array",value:"array"}})],1)],1),a("el-form-item",{attrs:{label:"提示"}},[a("el-input",{attrs:{placeholder:"请填写提示信息"},model:{value:t.message,callback:function(a){e.$set(t,"message",a)},expression:"item.message"}})],1),a("div",{staticStyle:{margin:"0 12px 5px","text-align":"right"}},[a("el-button",{attrs:{type:"info",size:"mini"},on:{click:function(t){return e.data.rules.splice(l,1)}}},[e._v("删除")])],1)],1)})),a("el-form-item",{staticStyle:{float:"right"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.data.rules.push({required:!0,message:"请输入...",trigger:"blur"})}}},[e._v("添加")])],1)],2):e._e(),e._t("default")],2)],1)},W=[],V={name:"parameter",props:{data:{validator:function(){return!0}}}},q=V,A=Object($["a"])(q,P,W,!1,null,null,null),M=A.exports,N=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"code_dialog",attrs:{width:"1000px",title:"代码展示",visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("div",{directives:[{name:"highlight",rawName:"v-highlight"}],staticStyle:{width:"100%",border:"1px solid gainsboro",overflow:"auto","max-height":"400px"}},[a("pre",{staticStyle:{"font-size":"12px",margin:"2px"}},[a("code",{staticClass:"html",staticStyle:{"font-family":"'Courier New', serif"},domProps:{textContent:e._s(e.template)}})])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.download}},[e._v("导 出")])],1)])},T=[],D={name:"code_dialog",props:["template","codeVisible"],data:function(){return{visible:!1}},watch:{codeVisible:function(e){this.visible=e},visible:{handler:function(e){this.$emit("update:codeVisible",e)},deep:!0}},methods:{download:function(){var e=this;this.$prompt("请输入名称","提示",{inputPattern:/.+/}).then((function(t){"confirm"===t.action&&(S(t.value+".vue",e.template),e.visible=!1)}))}}},J=D,L=Object($["a"])(J,N,T,!1,null,"055c82dc",null),R=L.exports,B=(a("c740"),a("4160"),a("159b"),a("c975"),a("b0c0"),a("498a"),{}),U="data.";function I(e,t,a,l){if(Array.isArray(e)){var i="";return e.forEach((function(e){i+=I(e,t,a,l)})),i}return B[e.type]?B[e.type](e,t,a,l):""}function H(e,t,a){if(e.value&&e.value.trim().length>0){if(e.rules&&(t.rules=t.rules||{},t.rules[e.value]=e.rules),e.value.indexOf(".")>0){var l=e.value.split("."),i=l.length,n=t.data;l.forEach((function(t,l){l+1!==i?(n[t]={},n=n[t]):n[t]="checkbox"===e.type?[]:a?a():""}))}else t[e.value]="checkbox"===e.type?[]:a?a():"";return!0}return!1}function F(e,t){var a=function(a){var l="";return a.forEach((function(a,i){l+="<el-col id='".concat(e.key,"_").concat(i,"' :span='").concat(a.span,"'>").concat(I(a.list,t,H,I),"</el-col>")})),l};return"<el-row id='".concat(e.key,"' :gutter='").concat(e.gutter,"'>").concat(a(e.drag),"</el-row>")}function G(e,t){var a=H(e,t);return"<el-form-item size='".concat(e.size,"' prop='").concat(e.value,"' label='").concat(e.name,"'><el-input ").concat(a?'v-model="'+U+e.value+'"':""," style='width: ").concat(e.width,"' id='").concat(e.key,"' ").concat(e.disabled?"disabled":""," placeholder='").concat(e.placeholder,"'/></el-form-item>")}function K(e,t){var a=function(e){var t="";return e.forEach((function(e){t+="<el-option label='".concat(e.label,"' ").concat(e.disabled?"disabled":""," value='").concat(e.value,"'/>")})),t},l=H(e,t);return"<el-form-item size='".concat(e.size,"' label='").concat(e.name,"'><el-select ").concat(l?'v-model="'+U+e.value+'"':""," style='width: ").concat(e.width,"' id='").concat(e.key,"' ").concat(e.disabled?"disabled":""," placeholder='").concat(e.placeholder,"' value=''>").concat(a(e.option),"</el-select></el-form-item>")}function Q(e,t){var a=H(e,t);return"<el-form-item size='".concat(e.size,"' label='").concat(e.name,"'><el-date-picker ").concat(a?'v-model="'+U+e.value+'"':""," style='width: ").concat(e.width,"' id='").concat(e.key,"' ").concat(e.disabled?"disabled":"",' type="date" placeholder=\'').concat(e.placeholder,"'/></el-form-item>")}function X(e,t){var a=H(e,t);return"<el-form-item  size='".concat(e.size,"' label='").concat(e.name,"'><el-switch id='").concat(e.key,"' ").concat(a?'v-model="'+U+e.value+'"':""," ").concat(e.disabled?"disabled":"","/></el-form-item>")}function Y(e,t){var a=function(t){var a="";return t.forEach((function(t,l){a+="<el-checkbox id='".concat(e.key,"_").concat(l,"' ").concat(e.disabled?"disabled":""," label='").concat(t.value,"'>").concat(t.label,"</el-checkbox>")})),a},l=H(e,t);return"<el-form-item  size='".concat(e.size,"' label='").concat(e.name,"'><el-checkbox-group id='").concat(e.key,"' ").concat(l?'v-model="'+U+e.value+'"':"",">").concat(a(e.option),"</el-checkbox-group></el-form-item>")}function Z(e,t){var a=function(t){var a="";return t.forEach((function(t,l){a+="<el-radio id='".concat(e.key,"_").concat(l,"' ").concat(e.disabled?"disabled":""," label='").concat(t.value,"'>").concat(t.label,"</el-radio>")})),a},l=H(e,t);return"<el-form-item  size='".concat(e.size,"' label='").concat(e.name,"'><el-radio-group id='").concat(e.key,"' ").concat(l?'v-model="'+U+e.value+'"':"",">").concat(a(e.option),"</el-radio-group></el-form-item>")}function ee(e,t){var a=H(e,t);return"<el-form-item size='".concat(e.size,"' label='").concat(e.name,"'><el-input resize='none' id='").concat(e.key,"' ").concat(a?'v-model="'+U+e.value+'"':""," style='width: ").concat(e.width,"' type=\"textarea\" placeholder='").concat(e.placeholder,"'/></el-form-item>")}B.layout=F,B.input=G,B.select=K,B.date=Q,B.switch=X,B.checkbox=Y,B.radio=Z,B.textarea=ee;var te=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var a in Object(x["a"])(this,e),this.__map__=B,t)this.put(a,t[a])}return Object(w["a"])(e,[{key:"put",value:function(e,t){this.__map__[e]=t}},{key:"del",value:function(e){delete this.__map__[e]}},{key:"build",value:function(e){if(e&&"object"===Object(_["a"])(e)){var t={data:{}};return{template:"<el-container><el-form ref='formData' :rules='rules' style='width: 100%' :model='".concat(U.substr(0,U.length-1),"' label-width='80px'>").concat(I(e,t,H,I),"</el-form></el-container>"),data:function(){return{data:t.data,rules:t.rules}}}}}}]),e}(),ae=te,le=[{type:"layout",name:"布局",gutter:10,drag:[{span:8,list:[]},{span:8,list:[]},{span:8,list:[]}]},{type:"input",name:"输入框",size:"mini",width:"200px",value:"",disabled:!1,labelWidth:"80px",placeholder:"请输入",rules:[{required:!0,message:"请输入活动名称",trigger:"blur"},{type:"date",required:!0,message:"请选择日期",trigger:"change"}]},{type:"textarea",name:"文本域",size:"mini",width:"200px",value:"",disabled:!1,labelWidth:"80px",placeholder:"请输入文本",rules:[]},{type:"select",name:"选择框",size:"mini",width:"200px",value:"",disabled:!1,labelWidth:"80px",placeholder:"请选择",option:[{label:"区域一",value:"1"},{label:"区域二",value:"2"}],rules:[]},{type:"date",name:"日期",size:"mini",width:"200px",value:"",disabled:!1,labelWidth:"80px",placeholder:"请选择日期",rules:[]},{type:"switch",name:"开关",size:"mini",value:"",disabled:!1,labelWidth:80,rules:[]},{type:"checkbox",name:"多选",size:"mini",value:"",disabled:!1,labelWidth:"80px",option:[{label:"选择一",value:"1",disabled:!1},{label:"选择二",value:"2",disabled:!1}],rules:[]},{type:"radio",name:"单选",size:"mini",value:"",disabled:!1,labelWidth:"80px",option:[{label:"选择一",value:"1",disabled:!1},{label:"选择二",value:"2",disabled:!1}],rules:[]}],ie=function(){function e(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(x["a"])(this,e),this.__config_list__=le,a.length>=0&&a.forEach((function(e){return t.put(e)})),this.__encoder__=new ae(l)}return Object(w["a"])(e,[{key:"put",value:function(e){var t=this.__fn_search__(e.type);t<0?this.__config_list__.push(e):this.__config_list__.splice(t,1,e)}},{key:"del",value:function(){for(var e=this,t=arguments.length,a=new Array(t),l=0;l<t;l++)a[l]=arguments[l];a.forEach((function(t){var a=e.__fn_search__(t);a>=0&&e.__config_list__.splice(a,1)}))}},{key:"build",value:function(e){return this.__encoder__.build(e)}},{key:"__fn_search__",value:function(e){return e?this.__config_list__.findIndex((function(t){return e===t.type})):-1}},{key:"list",get:function(){return this.__config_list__}}]),e}(),ne=ie,oe={name:"designer",data:function(){return{list:[],modeler:void 0,selector:void 0,codeVisible:!1,previewVisible:!1,template:void 0,preview:void 0}},props:{data:{type:Object,default:function(){return{}}},width:{type:String,default:function(){return"100%"}},height:{type:String,default:function(){return"100%"}}},components:{draggable:v.a,container:E,parameter:M,CodeDialog:R},watch:{selector:function(e){this.$emit("activeChange",e)}},computed:{json:function(){return JSON.stringify(this.list,null,2)}},created:function(){this.modeler=new ne(this.data.button,this.data.build)},methods:{moveCommand:function(e){return("container"!==e.draggedContext.element.type||!e.relatedContext.element)&&(e.relatedContext.list?!e.relatedContext.list.filter((function(e){return"container"===e.type})).length>0:void 0)},addCommand:function(e){console.log("addCommand",e)},handleCode:function(){var e=this.modeler.build(this.list),t=JSON.stringify(e.data()).replace(/"([^"]+)":/g,"$1:"),a="<template>".concat(e.template,"</template><script>export default { data() { return ").concat(t," }}","</","script><style></style>");return b()(a)},generator:function(){this.template=this.handleCode(),this.codeVisible=!0},previewer:function(){this.previewVisible=!0;var e=this;l["default"].nextTick((function(){var t=e.$el.querySelector("#preview_dialog"),a=t.querySelector("#preview");a||(t.querySelector(".el-dialog__body").innerHTML='<div id="preview"/>');var i=l["default"].extend(e.modeler.build(e.list));e.preview=(new i).$mount("#preview")}))},metadata:function(){var e=this;this.preview.$refs["formData"].validate((function(t){t?e.$alert(JSON.stringify(e.preview.data)||"{ }","数据获取"):e.$alert("校验不通过~")}))}}},ce=oe,re=(a("afe3"),Object($["a"])(ce,p,m,!1,null,null,null)),se=re.exports,de=(a("c7cd"),{button:[{type:"text",name:"文字",value:"",disabled:!1,data:""},{type:"table",name:"表格",size:"mini",width:"100%",height:"",value:"",column:[{fixed:"",label:"名称",width:"100px",prop:""},{fixed:"",label:"日期",width:"100px",prop:""}]}],viewer:{text:{template:'<el-link type="primary">{{item.name}}</el-link>',props:["item"]},table:{template:'<el-table :ref="item.key" :size="item.size" border :style="{width: (item.width === \'100%\' ? \'calc(\' + item.width + \' - 6px)\':item.width), margin: \'3px\'}">                             <el-table-column v-for="(col, index) in item.column" :fixed="col.fixed" :label="col.label" :width="col.width" :key="index" />                        </el-table>',props:["item"],created:function(){}}},build:{text:function(e,t,a,l){return console.log(e,t,a,l),'<el-link type="primary">'.concat(e.name,"</el-link>")},table:function(e,t,a){var l=function(e){var t="";return e.forEach((function(e){t+="<el-table-column ".concat(e.prop?":prop='"+e.prop+"'":"",' fixed="').concat(e.fixed,'" label="').concat(e.label,'" width="').concat(e.width,'" />')})),t},i=a(e,t,(function(){return[]}));return'<el-table size="'.concat(e.size,'" border ').concat(i?':data="data.'+e.value+'"':"",' style="width: ').concat(e.width,'">').concat(l(e.column),"</el-table>")}}}),ue={name:"App",components:{parameter:M,designer:se},data:function(){return{data:de,index:"",column:{}}},methods:{activeChange:function(){this.index="",this.column={}},change:function(e){""===this.index?this.column={}:this.column=e[this.index]},del:function(e){""!==this.index&&(e.splice(this.index,1),this.index="")},add:function(e){console.log(this.column,e[e.length-1]);var t={fixed:this.column.field||"",label:this.column.label||"",width:this.column.width||"",prop:this.column.prop||""};e.splice(e.length,0,t),this.column={}}}},pe=ue,me=(a("5c0b"),Object($["a"])(pe,d,u,!1,null,null,null)),fe=me.exports;l["default"].config.productionTip=!1,l["default"].use(n.a),l["default"].use(s),new l["default"]({render:function(e){return e(fe)}}).$mount("#app")},"5c0b":function(e,t,a){"use strict";var l=a("9c0c"),i=a.n(l);i.a},"9c0c":function(e,t,a){},afe3:function(e,t,a){"use strict";var l=a("2f93"),i=a.n(l);i.a}});
//# sourceMappingURL=app.37604cfa.js.map