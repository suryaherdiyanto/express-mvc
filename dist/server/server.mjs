import { useSSRContext, mergeProps, onMounted } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full border-b border-gray-200 bg-white" }, _attrs))}><div class="w-3/4 mx-auto py-5"><h1 class="text-xl font-bold">Express MVC</h1></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/TheHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TheHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__file", "/Users/suryaherdiyanto/Documents/express-mvc/pages/components/TheHeader.vue"]]);
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      console.log("Mounted");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(TheHeader, null, null, _parent));
      _push(`<div class="container mx-auto flex flex-col justify-center h-3/4"><h1 class="text-2xl font-semibold text-center">Hello 2</h1></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/suryaherdiyanto/Documents/express-mvc/pages/Index.vue"]]);
const server = {
  "Index": Index
};
export {
  server as default
};
