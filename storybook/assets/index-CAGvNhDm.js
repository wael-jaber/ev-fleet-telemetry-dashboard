function J(c,y){for(var l=0;l<y.length;l++){const a=y[l];if(typeof a!="string"&&!Array.isArray(a)){for(const _ in a)if(_!=="default"&&!(_ in c)){const R=Object.getOwnPropertyDescriptor(a,_);R&&Object.defineProperty(c,_,R.get?R:{enumerable:!0,get:()=>a[_]})}}}return Object.freeze(Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}))}var rt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function V(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}function nt(c){if(c.__esModule)return c;var y=c.default;if(typeof y=="function"){var l=function a(){return this instanceof a?Reflect.construct(y,arguments,this.constructor):y.apply(this,arguments)};l.prototype=y.prototype}else l={};return Object.defineProperty(l,"__esModule",{value:!0}),Object.keys(c).forEach(function(a){var _=Object.getOwnPropertyDescriptor(c,a);Object.defineProperty(l,a,_.get?_:{enumerable:!0,get:function(){return c[a]}})}),l}var h={exports:{}},o={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x;function F(){if(x)return o;x=1;var c=Symbol.for("react.transitional.element"),y=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),R=Symbol.for("react.consumer"),L=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),z=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),A=Symbol.iterator;function G(t){return t===null||typeof t!="object"?null:(t=A&&t[A]||t["@@iterator"],typeof t=="function"?t:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},P=Object.assign,b={};function v(t,e,r){this.props=t,this.context=e,this.refs=b,this.updater=r||S}v.prototype.isReactComponent={},v.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")},v.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function H(){}H.prototype=v.prototype;function T(t,e,r){this.props=t,this.context=e,this.refs=b,this.updater=r||S}var g=T.prototype=new H;g.constructor=T,P(g,v.prototype),g.isPureReactComponent=!0;var $=Array.isArray,f={H:null,A:null,T:null,S:null},N=Object.prototype.hasOwnProperty;function C(t,e,r,n,s,i){return r=i.ref,{$$typeof:c,type:t,key:e,ref:r!==void 0?r:null,props:i}}function K(t,e){return C(t.type,e,void 0,void 0,void 0,t.props)}function w(t){return typeof t=="object"&&t!==null&&t.$$typeof===c}function B(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(r){return e[r]})}var M=/\/+/g;function O(t,e){return typeof t=="object"&&t!==null&&t.key!=null?B(""+t.key):e.toString(36)}function Y(){}function W(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Y,Y):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function d(t,e,r,n,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var u=!1;if(t===null)u=!0;else switch(i){case"bigint":case"string":case"number":u=!0;break;case"object":switch(t.$$typeof){case c:case y:u=!0;break;case j:return u=t._init,d(u(t._payload),e,r,n,s)}}if(u)return s=s(t),u=n===""?"."+O(t,0):n,$(s)?(r="",u!=null&&(r=u.replace(M,"$&/")+"/"),d(s,e,r,"",function(Z){return Z})):s!=null&&(w(s)&&(s=K(s,r+(s.key==null||t&&t.key===s.key?"":(""+s.key).replace(M,"$&/")+"/")+u)),e.push(s)),1;u=0;var E=n===""?".":n+":";if($(t))for(var p=0;p<t.length;p++)n=t[p],i=E+O(n,p),u+=d(n,e,r,i,s);else if(p=G(t),typeof p=="function")for(t=p.call(t),p=0;!(n=t.next()).done;)n=n.value,i=E+O(n,p++),u+=d(n,e,r,i,s);else if(i==="object"){if(typeof t.then=="function")return d(W(t),e,r,n,s);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return u}function m(t,e,r){if(t==null)return t;var n=[],s=0;return d(t,n,"","",function(i){return e.call(r,i,s++)}),n}function Q(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(r){(t._status===0||t._status===-1)&&(t._status=1,t._result=r)},function(r){(t._status===0||t._status===-1)&&(t._status=2,t._result=r)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var k=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function X(){}return o.Children={map:m,forEach:function(t,e,r){m(t,function(){e.apply(this,arguments)},r)},count:function(t){var e=0;return m(t,function(){e++}),e},toArray:function(t){return m(t,function(e){return e})||[]},only:function(t){if(!w(t))throw Error("React.Children.only expected to receive a single React element child.");return t}},o.Component=v,o.Fragment=l,o.Profiler=_,o.PureComponent=T,o.StrictMode=a,o.Suspense=q,o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=f,o.act=function(){throw Error("act(...) is not supported in production builds of React.")},o.cache=function(t){return function(){return t.apply(null,arguments)}},o.cloneElement=function(t,e,r){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var n=P({},t.props),s=t.key,i=void 0;if(e!=null)for(u in e.ref!==void 0&&(i=void 0),e.key!==void 0&&(s=""+e.key),e)!N.call(e,u)||u==="key"||u==="__self"||u==="__source"||u==="ref"&&e.ref===void 0||(n[u]=e[u]);var u=arguments.length-2;if(u===1)n.children=r;else if(1<u){for(var E=Array(u),p=0;p<u;p++)E[p]=arguments[p+2];n.children=E}return C(t.type,s,void 0,void 0,i,n)},o.createContext=function(t){return t={$$typeof:L,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:R,_context:t},t},o.createElement=function(t,e,r){var n,s={},i=null;if(e!=null)for(n in e.key!==void 0&&(i=""+e.key),e)N.call(e,n)&&n!=="key"&&n!=="__self"&&n!=="__source"&&(s[n]=e[n]);var u=arguments.length-2;if(u===1)s.children=r;else if(1<u){for(var E=Array(u),p=0;p<u;p++)E[p]=arguments[p+2];s.children=E}if(t&&t.defaultProps)for(n in u=t.defaultProps,u)s[n]===void 0&&(s[n]=u[n]);return C(t,i,void 0,void 0,null,s)},o.createRef=function(){return{current:null}},o.forwardRef=function(t){return{$$typeof:U,render:t}},o.isValidElement=w,o.lazy=function(t){return{$$typeof:j,_payload:{_status:-1,_result:t},_init:Q}},o.memo=function(t,e){return{$$typeof:z,type:t,compare:e===void 0?null:e}},o.startTransition=function(t){var e=f.T,r={};f.T=r;try{var n=t(),s=f.S;s!==null&&s(r,n),typeof n=="object"&&n!==null&&typeof n.then=="function"&&n.then(X,k)}catch(i){k(i)}finally{f.T=e}},o.unstable_useCacheRefresh=function(){return f.H.useCacheRefresh()},o.use=function(t){return f.H.use(t)},o.useActionState=function(t,e,r){return f.H.useActionState(t,e,r)},o.useCallback=function(t,e){return f.H.useCallback(t,e)},o.useContext=function(t){return f.H.useContext(t)},o.useDebugValue=function(){},o.useDeferredValue=function(t,e){return f.H.useDeferredValue(t,e)},o.useEffect=function(t,e){return f.H.useEffect(t,e)},o.useId=function(){return f.H.useId()},o.useImperativeHandle=function(t,e,r){return f.H.useImperativeHandle(t,e,r)},o.useInsertionEffect=function(t,e){return f.H.useInsertionEffect(t,e)},o.useLayoutEffect=function(t,e){return f.H.useLayoutEffect(t,e)},o.useMemo=function(t,e){return f.H.useMemo(t,e)},o.useOptimistic=function(t,e){return f.H.useOptimistic(t,e)},o.useReducer=function(t,e,r){return f.H.useReducer(t,e,r)},o.useRef=function(t){return f.H.useRef(t)},o.useState=function(t){return f.H.useState(t)},o.useSyncExternalStore=function(t,e,r){return f.H.useSyncExternalStore(t,e,r)},o.useTransition=function(){return f.H.useTransition()},o.version="19.0.0",o}var D;function tt(){return D||(D=1,h.exports=F()),h.exports}var I=tt();const et=V(I),ot=J({__proto__:null,default:et},[I]);export{et as R,I as a,ot as b,nt as c,rt as d,V as g,tt as r};
