(function (Vue) {
    'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
        props: ['title'],
        methods: {
            buttonEnter(event) {
                console.log('buttonenter', this.title, event);
            },
            buttonLeave(event) {
                console.log('buttonleave', this.title, event);
            },
        },
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        let hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                const originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                const existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    const isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return (id, style) => addStyle(id, style);
    }
    let HEAD;
    const styles = {};
    function addStyle(id, css) {
        const group = isOldIE ? css.media || 'default' : id;
        const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            let code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    style.element.setAttribute('media', css.media);
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                const index = style.ids.size - 1;
                const textNode = document.createTextNode(code);
                const nodes = style.element.childNodes;
                if (nodes[index])
                    style.element.removeChild(nodes[index]);
                if (nodes.length)
                    style.element.insertBefore(textNode, nodes[index]);
                else
                    style.element.appendChild(textNode);
            }
        }
    }

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "a",
        {
          staticClass: "button",
          attrs: { href: "#" },
          on: {
            mouseover: _vm.buttonEnter,
            mouseout: _vm.buttonLeave,
            click: function($event) {
              return _vm.$emit("clickEvent")
            }
          }
        },
        [_c("span", [_vm._v(_vm._s(_vm.title))])]
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-a825e47c_0", { source: "\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"NiceButton.vue"}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = "data-v-a825e47c";
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$1 = {
      components: {
        nicebutton: __vue_component__
      },
      methods: {
        removeItem(index) {
          console.log('App.removeItem', index);
          this.$delete(this.items, index);
        },
        addItem() {
          console.log('App.addItem');
          let newItem = {};
          if (this.items.length === 0) {
            newItem.uid = 0;
            newItem.name = 'Item 0';
          } else {
            let lastItem = this.items[this.items.length - 1];
            newItem.uid = lastItem.uid + 1;
            newItem.name = 'Item ' + (lastItem.uid + 1);
          }      this.items.push(newItem);
        },
      },
      data() {
        return {
          name: 'Jane Doe',
          items: [{
            uid: 0,
            name: 'Item 0'
          }, {
            uid: 1,
            name: 'Item 1'
          }]
        }
      }
    };

    /* script */
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "full" }, [
        _c("h1", [_vm._v("Hello " + _vm._s(_vm.name))]),
        _vm._v(" "),
        _c("div", { staticClass: "flex two demo" }, [
          _c(
            "div",
            [
              _c("nicebutton", {
                attrs: { title: "Add item" },
                on: {
                  clickEvent: function($event) {
                    return _vm.addItem()
                  }
                }
              }),
              _vm._v(" "),
              _vm._l(_vm.items, function(item, index) {
                return _c("div", { key: index }, [
                  _c("article", { staticClass: "card" }, [
                    _c("header", [_c("h3", [_vm._v(_vm._s(item.name))])]),
                    _vm._v(" "),
                    _c(
                      "footer",
                      [
                        _c("nicebutton", {
                          attrs: { title: "Delete" },
                          on: {
                            clickEvent: function($event) {
                              return _vm.removeItem(index)
                            }
                          }
                        })
                      ],
                      1
                    )
                  ])
                ])
              })
            ],
            2
          ),
          _vm._v(" "),
          _c("div", [
            _c("pre", [_vm._v(_vm._s(JSON.stringify(_vm.items, null, 2)))])
          ])
        ])
      ])
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = function (inject) {
        if (!inject) return
        inject("data-v-740bb860_0", { source: "\n.card footer[data-v-740bb860] {\r\n  padding: .2em .8em;\n}\r\n", map: {"version":3,"sources":["C:\\code\\jsplayground\\vuecomp-rollup_01\\src\\App.vue"],"names":[],"mappings":";AAmEA;EACA,kBAAA;AACA","file":"App.vue","sourcesContent":["<template>\r\n  <div class=\"full\">\r\n    <h1>Hello {{ name }}</h1>\r\n    <div class=\"flex two demo\">\r\n      <div>\r\n        <nicebutton title=\"Add item\" v-on:clickEvent=\"addItem()\"></nicebutton>\r\n        <div v-for=\"(item, index) in items\" v-bind:key=\"index\">\r\n          <article class=\"card\">\r\n            <header>\r\n              <h3>{{item.name}}</h3>\r\n            </header>\r\n            <footer>\r\n              <nicebutton v-bind:title=\"'Delete'\" v-on:clickEvent=\"removeItem(index)\">\r\n              </nicebutton>\r\n            </footer>\r\n          </article>\r\n        </div>\r\n      </div>\r\n      <div>\r\n        <pre>{{JSON.stringify(items, null, 2)}}</pre>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport nicebutton from './NiceButton.vue'\r\n\r\nexport default {\r\n  components: {\r\n    nicebutton\r\n  },\r\n  methods: {\r\n    removeItem(index) {\r\n      console.log('App.removeItem', index);\r\n      this.$delete(this.items, index)\r\n    },\r\n    addItem() {\r\n      console.log('App.addItem');\r\n      let newItem = {};\r\n      if (this.items.length === 0) {\r\n        newItem.uid = 0;\r\n        newItem.name = 'Item 0';\r\n      } else {\r\n        let lastItem = this.items[this.items.length - 1];\r\n        newItem.uid = lastItem.uid + 1;\r\n        newItem.name = 'Item ' + (lastItem.uid + 1);\r\n      };\r\n      this.items.push(newItem);\r\n    },\r\n  },\r\n  data() {\r\n    return {\r\n      name: 'Jane Doe',\r\n      items: [{\r\n        uid: 0,\r\n        name: 'Item 0'\r\n      }, {\r\n        uid: 1,\r\n        name: 'Item 1'\r\n      }]\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.card footer {\r\n  padding: .2em .8em;\r\n}\r\n</style>"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$1 = "data-v-740bb860";
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        createInjector,
        undefined,
        undefined
      );

    new Vue({
      el: '#app',
    //   data() {
    //       return {
    //           items: [{
    //               uid: 0,
    //               name: 'Item 1'
    //           },{
    //             uid: 1,
    //             name: 'Item 2'
    //         },]
    //       }
    //   },
      render: h => h(__vue_component__$1),
    });

}(Vue));
