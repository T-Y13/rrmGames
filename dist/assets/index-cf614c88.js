var VS=Object.defineProperty;var LS=(t,e,n)=>e in t?VS(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Qy=(t,e,n)=>(LS(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function Ox(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var jx={exports:{}},md={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var US=Symbol.for("react.transitional.element"),BS=Symbol.for("react.fragment");function Px(t,e,n){var s=null;if(n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:US,type:t,key:s,ref:e!==void 0?e:null,props:n}}md.Fragment=BS;md.jsx=Px;md.jsxs=Px;jx.exports=md;var u=jx.exports,Vx={exports:{}},Le={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yp=Symbol.for("react.transitional.element"),zS=Symbol.for("react.portal"),$S=Symbol.for("react.fragment"),FS=Symbol.for("react.strict_mode"),HS=Symbol.for("react.profiler"),qS=Symbol.for("react.consumer"),GS=Symbol.for("react.context"),YS=Symbol.for("react.forward_ref"),KS=Symbol.for("react.suspense"),QS=Symbol.for("react.memo"),Lx=Symbol.for("react.lazy"),XS=Symbol.for("react.activity"),Xy=Symbol.iterator;function WS(t){return t===null||typeof t!="object"?null:(t=Xy&&t[Xy]||t["@@iterator"],typeof t=="function"?t:null)}var Ux={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Bx=Object.assign,zx={};function Ul(t,e,n){this.props=t,this.context=e,this.refs=zx,this.updater=n||Ux}Ul.prototype.isReactComponent={};Ul.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ul.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function $x(){}$x.prototype=Ul.prototype;function Kp(t,e,n){this.props=t,this.context=e,this.refs=zx,this.updater=n||Ux}var Qp=Kp.prototype=new $x;Qp.constructor=Kp;Bx(Qp,Ul.prototype);Qp.isPureReactComponent=!0;var Wy=Array.isArray;function y0(){}var Gt={H:null,A:null,T:null,S:null},Fx=Object.prototype.hasOwnProperty;function Xp(t,e,n){var s=n.ref;return{$$typeof:Yp,type:t,key:e,ref:s!==void 0?s:null,props:n}}function JS(t,e){return Xp(t.type,e,t.props)}function Wp(t){return typeof t=="object"&&t!==null&&t.$$typeof===Yp}function ZS(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Jy=/\/+/g;function lm(t,e){return typeof t=="object"&&t!==null&&t.key!=null?ZS(""+t.key):e.toString(36)}function eA(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(y0,y0):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Uo(t,e,n,s,a){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(i){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Yp:case zS:r=!0;break;case Lx:return r=t._init,Uo(r(t._payload),e,n,s,a)}}if(r)return a=a(t),r=s===""?"."+lm(t,0):s,Wy(a)?(n="",r!=null&&(n=r.replace(Jy,"$&/")+"/"),Uo(a,e,n,"",function(h){return h})):a!=null&&(Wp(a)&&(a=JS(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(Jy,"$&/")+"/")+r)),e.push(a)),1;r=0;var l=s===""?".":s+":";if(Wy(t))for(var c=0;c<t.length;c++)s=t[c],i=l+lm(s,c),r+=Uo(s,e,n,i,a);else if(c=WS(t),typeof c=="function")for(t=c.call(t),c=0;!(s=t.next()).done;)s=s.value,i=l+lm(s,c++),r+=Uo(s,e,n,i,a);else if(i==="object"){if(typeof t.then=="function")return Uo(eA(t),e,n,s,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function fh(t,e,n){if(t==null)return t;var s=[],a=0;return Uo(t,s,"","",function(i){return e.call(n,i,a++)}),s}function tA(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Zy=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},nA={map:fh,forEach:function(t,e,n){fh(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return fh(t,function(){e++}),e},toArray:function(t){return fh(t,function(e){return e})||[]},only:function(t){if(!Wp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Le.Activity=XS;Le.Children=nA;Le.Component=Ul;Le.Fragment=$S;Le.Profiler=HS;Le.PureComponent=Kp;Le.StrictMode=FS;Le.Suspense=KS;Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Gt;Le.__COMPILER_RUNTIME={__proto__:null,c:function(t){return Gt.H.useMemoCache(t)}};Le.cache=function(t){return function(){return t.apply(null,arguments)}};Le.cacheSignal=function(){return null};Le.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var s=Bx({},t.props),a=t.key;if(e!=null)for(i in e.key!==void 0&&(a=""+e.key),e)!Fx.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(s[i]=e[i]);var i=arguments.length-2;if(i===1)s.children=n;else if(1<i){for(var r=Array(i),l=0;l<i;l++)r[l]=arguments[l+2];s.children=r}return Xp(t.type,a,s)};Le.createContext=function(t){return t={$$typeof:GS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:qS,_context:t},t};Le.createElement=function(t,e,n){var s,a={},i=null;if(e!=null)for(s in e.key!==void 0&&(i=""+e.key),e)Fx.call(e,s)&&s!=="key"&&s!=="__self"&&s!=="__source"&&(a[s]=e[s]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var l=Array(r),c=0;c<r;c++)l[c]=arguments[c+2];a.children=l}if(t&&t.defaultProps)for(s in r=t.defaultProps,r)a[s]===void 0&&(a[s]=r[s]);return Xp(t,i,a)};Le.createRef=function(){return{current:null}};Le.forwardRef=function(t){return{$$typeof:YS,render:t}};Le.isValidElement=Wp;Le.lazy=function(t){return{$$typeof:Lx,_payload:{_status:-1,_result:t},_init:tA}};Le.memo=function(t,e){return{$$typeof:QS,type:t,compare:e===void 0?null:e}};Le.startTransition=function(t){var e=Gt.T,n={};Gt.T=n;try{var s=t(),a=Gt.S;a!==null&&a(n,s),typeof s=="object"&&s!==null&&typeof s.then=="function"&&s.then(y0,Zy)}catch(i){Zy(i)}finally{e!==null&&n.types!==null&&(e.types=n.types),Gt.T=e}};Le.unstable_useCacheRefresh=function(){return Gt.H.useCacheRefresh()};Le.use=function(t){return Gt.H.use(t)};Le.useActionState=function(t,e,n){return Gt.H.useActionState(t,e,n)};Le.useCallback=function(t,e){return Gt.H.useCallback(t,e)};Le.useContext=function(t){return Gt.H.useContext(t)};Le.useDebugValue=function(){};Le.useDeferredValue=function(t,e){return Gt.H.useDeferredValue(t,e)};Le.useEffect=function(t,e){return Gt.H.useEffect(t,e)};Le.useEffectEvent=function(t){return Gt.H.useEffectEvent(t)};Le.useId=function(){return Gt.H.useId()};Le.useImperativeHandle=function(t,e,n){return Gt.H.useImperativeHandle(t,e,n)};Le.useInsertionEffect=function(t,e){return Gt.H.useInsertionEffect(t,e)};Le.useLayoutEffect=function(t,e){return Gt.H.useLayoutEffect(t,e)};Le.useMemo=function(t,e){return Gt.H.useMemo(t,e)};Le.useOptimistic=function(t,e){return Gt.H.useOptimistic(t,e)};Le.useReducer=function(t,e,n){return Gt.H.useReducer(t,e,n)};Le.useRef=function(t){return Gt.H.useRef(t)};Le.useState=function(t){return Gt.H.useState(t)};Le.useSyncExternalStore=function(t,e,n){return Gt.H.useSyncExternalStore(t,e,n)};Le.useTransition=function(){return Gt.H.useTransition()};Le.version="19.2.5";Vx.exports=Le;var N=Vx.exports;const Jp=Ox(N);var Hx={exports:{}},pd={},qx={exports:{}},Gx={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(K,te){var ne=K.length;K.push(te);e:for(;0<ne;){var pe=ne-1>>>1,Pe=K[pe];if(0<a(Pe,te))K[pe]=te,K[ne]=Pe,ne=pe;else break e}}function n(K){return K.length===0?null:K[0]}function s(K){if(K.length===0)return null;var te=K[0],ne=K.pop();if(ne!==te){K[0]=ne;e:for(var pe=0,Pe=K.length,_t=Pe>>>1;pe<_t;){var $e=2*(pe+1)-1,Ot=K[$e],mt=$e+1,nt=K[mt];if(0>a(Ot,ne))mt<Pe&&0>a(nt,Ot)?(K[pe]=nt,K[mt]=ne,pe=mt):(K[pe]=Ot,K[$e]=ne,pe=$e);else if(mt<Pe&&0>a(nt,ne))K[pe]=nt,K[mt]=ne,pe=mt;else break e}}return te}function a(K,te){var ne=K.sortIndex-te.sortIndex;return ne!==0?ne:K.id-te.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var r=Date,l=r.now();t.unstable_now=function(){return r.now()-l}}var c=[],h=[],d=1,p=null,g=3,y=!1,C=!1,I=!1,O=!1,_=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,S=typeof setImmediate<"u"?setImmediate:null;function L(K){for(var te=n(h);te!==null;){if(te.callback===null)s(h);else if(te.startTime<=K)s(h),te.sortIndex=te.expirationTime,e(c,te);else break;te=n(h)}}function j(K){if(I=!1,L(K),!C)if(n(c)!==null)C=!0,H||(H=!0,D());else{var te=n(h);te!==null&&_e(j,te.startTime-K)}}var H=!1,T=-1,x=5,E=-1;function k(){return O?!0:!(t.unstable_now()-E<x)}function R(){if(O=!1,H){var K=t.unstable_now();E=K;var te=!0;try{e:{C=!1,I&&(I=!1,v(T),T=-1),y=!0;var ne=g;try{t:{for(L(K),p=n(c);p!==null&&!(p.expirationTime>K&&k());){var pe=p.callback;if(typeof pe=="function"){p.callback=null,g=p.priorityLevel;var Pe=pe(p.expirationTime<=K);if(K=t.unstable_now(),typeof Pe=="function"){p.callback=Pe,L(K),te=!0;break t}p===n(c)&&s(c),L(K)}else s(c);p=n(c)}if(p!==null)te=!0;else{var _t=n(h);_t!==null&&_e(j,_t.startTime-K),te=!1}}break e}finally{p=null,g=ne,y=!1}te=void 0}}finally{te?D():H=!1}}}var D;if(typeof S=="function")D=function(){S(R)};else if(typeof MessageChannel<"u"){var w=new MessageChannel,ae=w.port2;w.port1.onmessage=R,D=function(){ae.postMessage(null)}}else D=function(){_(R,0)};function _e(K,te){T=_(function(){K(t.unstable_now())},te)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(K){K.callback=null},t.unstable_forceFrameRate=function(K){0>K||125<K?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<K?Math.floor(1e3/K):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_next=function(K){switch(g){case 1:case 2:case 3:var te=3;break;default:te=g}var ne=g;g=te;try{return K()}finally{g=ne}},t.unstable_requestPaint=function(){O=!0},t.unstable_runWithPriority=function(K,te){switch(K){case 1:case 2:case 3:case 4:case 5:break;default:K=3}var ne=g;g=K;try{return te()}finally{g=ne}},t.unstable_scheduleCallback=function(K,te,ne){var pe=t.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?pe+ne:pe):ne=pe,K){case 1:var Pe=-1;break;case 2:Pe=250;break;case 5:Pe=1073741823;break;case 4:Pe=1e4;break;default:Pe=5e3}return Pe=ne+Pe,K={id:d++,callback:te,priorityLevel:K,startTime:ne,expirationTime:Pe,sortIndex:-1},ne>pe?(K.sortIndex=ne,e(h,K),n(c)===null&&K===n(h)&&(I?(v(T),T=-1):I=!0,_e(j,ne-pe))):(K.sortIndex=Pe,e(c,K),C||y||(C=!0,H||(H=!0,D()))),K},t.unstable_shouldYield=k,t.unstable_wrapCallback=function(K){var te=g;return function(){var ne=g;g=te;try{return K.apply(this,arguments)}finally{g=ne}}}})(Gx);qx.exports=Gx;var sA=qx.exports,Yx={exports:{}},us={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var aA=N;function Kx(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ji(){}var cs={d:{f:ji,r:function(){throw Error(Kx(522))},D:ji,C:ji,L:ji,m:ji,X:ji,S:ji,M:ji},p:0,findDOMNode:null},iA=Symbol.for("react.portal");function rA(t,e,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:iA,key:s==null?null:""+s,children:t,containerInfo:e,implementation:n}}var Ic=aA.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function gd(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}us.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=cs;us.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Kx(299));return rA(t,e,null,n)};us.flushSync=function(t){var e=Ic.T,n=cs.p;try{if(Ic.T=null,cs.p=2,t)return t()}finally{Ic.T=e,cs.p=n,cs.d.f()}};us.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,cs.d.C(t,e))};us.prefetchDNS=function(t){typeof t=="string"&&cs.d.D(t)};us.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,s=gd(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?cs.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:s,integrity:a,fetchPriority:i}):n==="script"&&cs.d.X(t,{crossOrigin:s,integrity:a,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};us.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=gd(e.as,e.crossOrigin);cs.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&cs.d.M(t)};us.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,s=gd(n,e.crossOrigin);cs.d.L(t,n,{crossOrigin:s,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};us.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=gd(e.as,e.crossOrigin);cs.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else cs.d.m(t)};us.requestFormReset=function(t){cs.d.r(t)};us.unstable_batchedUpdates=function(t,e){return t(e)};us.useFormState=function(t,e,n){return Ic.H.useFormState(t,e,n)};us.useFormStatus=function(){return Ic.H.useHostTransitionStatus()};us.version="19.2.5";function Qx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Qx)}catch(t){console.error(t)}}Qx(),Yx.exports=us;var oA=Yx.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kn=sA,Xx=N,lA=oA;function Y(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Wx(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Au(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Jx(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Zx(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function eb(t){if(Au(t)!==t)throw Error(Y(188))}function cA(t){var e=t.alternate;if(!e){if(e=Au(t),e===null)throw Error(Y(188));return e!==t?null:t}for(var n=t,s=e;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(s=a.return,s!==null){n=s;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return eb(a),t;if(i===s)return eb(a),e;i=i.sibling}throw Error(Y(188))}if(n.return!==s.return)n=a,s=i;else{for(var r=!1,l=a.child;l;){if(l===n){r=!0,n=a,s=i;break}if(l===s){r=!0,s=a,n=i;break}l=l.sibling}if(!r){for(l=i.child;l;){if(l===n){r=!0,n=i,s=a;break}if(l===s){r=!0,s=i,n=a;break}l=l.sibling}if(!r)throw Error(Y(189))}}if(n.alternate!==s)throw Error(Y(190))}if(n.tag!==3)throw Error(Y(188));return n.stateNode.current===n?t:e}function e_(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=e_(t),e!==null)return e;t=t.sibling}return null}var Yt=Object.assign,uA=Symbol.for("react.element"),dh=Symbol.for("react.transitional.element"),xc=Symbol.for("react.portal"),Go=Symbol.for("react.fragment"),t_=Symbol.for("react.strict_mode"),b0=Symbol.for("react.profiler"),n_=Symbol.for("react.consumer"),ai=Symbol.for("react.context"),Zp=Symbol.for("react.forward_ref"),v0=Symbol.for("react.suspense"),x0=Symbol.for("react.suspense_list"),eg=Symbol.for("react.memo"),Vi=Symbol.for("react.lazy"),_0=Symbol.for("react.activity"),hA=Symbol.for("react.memo_cache_sentinel"),tb=Symbol.iterator;function uc(t){return t===null||typeof t!="object"?null:(t=tb&&t[tb]||t["@@iterator"],typeof t=="function"?t:null)}var fA=Symbol.for("react.client.reference");function T0(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===fA?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Go:return"Fragment";case b0:return"Profiler";case t_:return"StrictMode";case v0:return"Suspense";case x0:return"SuspenseList";case _0:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case xc:return"Portal";case ai:return t.displayName||"Context";case n_:return(t._context.displayName||"Context")+".Consumer";case Zp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case eg:return e=t.displayName||null,e!==null?e:T0(t.type)||"Memo";case Vi:e=t._payload,t=t._init;try{return T0(t(e))}catch{}}return null}var _c=Array.isArray,Ce=Xx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,bt=lA.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,eo={pending:!1,data:null,method:null,action:null},E0=[],Yo=-1;function Ha(t){return{current:t}}function jn(t){0>Yo||(t.current=E0[Yo],E0[Yo]=null,Yo--)}function Vt(t,e){Yo++,E0[Yo]=t.current,t.current=e}var Pa=Ha(null),tu=Ha(null),tr=Ha(null),pf=Ha(null);function gf(t,e){switch(Vt(tr,e),Vt(tu,t),Vt(Pa,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?ov(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=ov(e),t=T2(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}jn(Pa),Vt(Pa,t)}function vl(){jn(Pa),jn(tu),jn(tr)}function w0(t){t.memoizedState!==null&&Vt(pf,t);var e=Pa.current,n=T2(e,t.type);e!==n&&(Vt(tu,t),Vt(Pa,n))}function yf(t){tu.current===t&&(jn(Pa),jn(tu)),pf.current===t&&(jn(pf),fu._currentValue=eo)}var cm,nb;function Gr(t){if(cm===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);cm=e&&e[1]||"",nb=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+cm+t+nb}var um=!1;function hm(t,e){if(!t||um)return"";um=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(e){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(y){var g=y}Reflect.construct(t,[],p)}else{try{p.call()}catch(y){g=y}t.call(p.prototype)}}else{try{throw Error()}catch(y){g=y}(p=t())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(y){if(y&&g&&typeof y.stack=="string")return[y.stack,g.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=s.DetermineComponentFrameRoot(),r=i[0],l=i[1];if(r&&l){var c=r.split(`
`),h=l.split(`
`);for(a=s=0;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;for(;a<h.length&&!h[a].includes("DetermineComponentFrameRoot");)a++;if(s===c.length||a===h.length)for(s=c.length-1,a=h.length-1;1<=s&&0<=a&&c[s]!==h[a];)a--;for(;1<=s&&0<=a;s--,a--)if(c[s]!==h[a]){if(s!==1||a!==1)do if(s--,a--,0>a||c[s]!==h[a]){var d=`
`+c[s].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=s&&0<=a);break}}}finally{um=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Gr(n):""}function dA(t,e){switch(t.tag){case 26:case 27:case 5:return Gr(t.type);case 16:return Gr("Lazy");case 13:return t.child!==e&&e!==null?Gr("Suspense Fallback"):Gr("Suspense");case 19:return Gr("SuspenseList");case 0:case 15:return hm(t.type,!1);case 11:return hm(t.type.render,!1);case 1:return hm(t.type,!0);case 31:return Gr("Activity");default:return""}}function sb(t){try{var e="",n=null;do e+=dA(t,n),n=t,t=t.return;while(t);return e}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var S0=Object.prototype.hasOwnProperty,tg=kn.unstable_scheduleCallback,fm=kn.unstable_cancelCallback,mA=kn.unstable_shouldYield,pA=kn.unstable_requestPaint,Ds=kn.unstable_now,gA=kn.unstable_getCurrentPriorityLevel,s_=kn.unstable_ImmediatePriority,a_=kn.unstable_UserBlockingPriority,bf=kn.unstable_NormalPriority,yA=kn.unstable_LowPriority,i_=kn.unstable_IdlePriority,bA=kn.log,vA=kn.unstable_setDisableYieldValue,Nu=null,Os=null;function Ki(t){if(typeof bA=="function"&&vA(t),Os&&typeof Os.setStrictMode=="function")try{Os.setStrictMode(Nu,t)}catch{}}var js=Math.clz32?Math.clz32:TA,xA=Math.log,_A=Math.LN2;function TA(t){return t>>>=0,t===0?32:31-(xA(t)/_A|0)|0}var mh=256,ph=262144,gh=4194304;function Yr(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function yd(t,e,n){var s=t.pendingLanes;if(s===0)return 0;var a=0,i=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var l=s&134217727;return l!==0?(s=l&~i,s!==0?a=Yr(s):(r&=l,r!==0?a=Yr(r):n||(n=l&~t,n!==0&&(a=Yr(n))))):(l=s&~i,l!==0?a=Yr(l):r!==0?a=Yr(r):n||(n=s&~t,n!==0&&(a=Yr(n)))),a===0?0:e!==0&&e!==a&&!(e&i)&&(i=a&-a,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:a}function Ru(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function EA(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function r_(){var t=gh;return gh<<=1,!(gh&62914560)&&(gh=4194304),t}function dm(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ku(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function wA(t,e,n,s,a,i){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var l=t.entanglements,c=t.expirationTimes,h=t.hiddenUpdates;for(n=r&~n;0<n;){var d=31-js(n),p=1<<d;l[d]=0,c[d]=-1;var g=h[d];if(g!==null)for(h[d]=null,d=0;d<g.length;d++){var y=g[d];y!==null&&(y.lane&=-536870913)}n&=~p}s!==0&&o_(t,s,0),i!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=i&~(r&~e))}function o_(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var s=31-js(e);t.entangledLanes|=e,t.entanglements[s]=t.entanglements[s]|1073741824|n&261930}function l_(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var s=31-js(n),a=1<<s;a&e|t[s]&e&&(t[s]|=e),n&=~a}}function c_(t,e){var n=e&-e;return n=n&42?1:ng(n),n&(t.suspendedLanes|e)?0:n}function ng(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function sg(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function u_(){var t=bt.p;return t!==0?t:(t=window.event,t===void 0?32:D2(t.type))}function ab(t,e){var n=bt.p;try{return bt.p=t,e()}finally{bt.p=n}}var Rr=Math.random().toString(36).slice(2),Fn="__reactFiber$"+Rr,Es="__reactProps$"+Rr,Bl="__reactContainer$"+Rr,A0="__reactEvents$"+Rr,SA="__reactListeners$"+Rr,AA="__reactHandles$"+Rr,ib="__reactResources$"+Rr,Cu="__reactMarker$"+Rr;function ag(t){delete t[Fn],delete t[Es],delete t[A0],delete t[SA],delete t[AA]}function Ko(t){var e=t[Fn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Bl]||n[Fn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=fv(t);t!==null;){if(n=t[Fn])return n;t=fv(t)}return e}t=n,n=t.parentNode}return null}function zl(t){if(t=t[Fn]||t[Bl]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Tc(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(Y(33))}function ol(t){var e=t[ib];return e||(e=t[ib]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function On(t){t[Cu]=!0}var h_=new Set,f_={};function bo(t,e){xl(t,e),xl(t+"Capture",e)}function xl(t,e){for(f_[t]=e,t=0;t<e.length;t++)h_.add(e[t])}var NA=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),rb={},ob={};function RA(t){return S0.call(ob,t)?!0:S0.call(rb,t)?!1:NA.test(t)?ob[t]=!0:(rb[t]=!0,!1)}function Uh(t,e,n){if(RA(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var s=e.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function yh(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function Wa(t,e,n,s){if(s===null)t.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+s)}}function Xs(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function d_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function kA(t,e,n){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var a=s.get,i=s.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,i.call(this,r)}}),Object.defineProperty(t,e,{enumerable:s.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function N0(t){if(!t._valueTracker){var e=d_(t)?"checked":"value";t._valueTracker=kA(t,e,""+t[e])}}function m_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),s="";return t&&(s=d_(t)?t.checked?"true":"false":t.value),t=s,t!==n?(e.setValue(t),!0):!1}function vf(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var CA=/[\n"\\]/g;function Zs(t){return t.replace(CA,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function R0(t,e,n,s,a,i,r,l){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Xs(e)):t.value!==""+Xs(e)&&(t.value=""+Xs(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?k0(t,r,Xs(e)):n!=null?k0(t,r,Xs(n)):s!=null&&t.removeAttribute("value"),a==null&&i!=null&&(t.defaultChecked=!!i),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?t.name=""+Xs(l):t.removeAttribute("name")}function p_(t,e,n,s,a,i,r,l){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){N0(t);return}n=n!=null?""+Xs(n):"",e=e!=null?""+Xs(e):n,l||e===t.value||(t.value=e),t.defaultValue=e}s=s??a,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=l?t.checked:!!s,t.defaultChecked=!!s,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),N0(t)}function k0(t,e,n){e==="number"&&vf(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function ll(t,e,n,s){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&s&&(t[n].defaultSelected=!0)}else{for(n=""+Xs(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,s&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function g_(t,e,n){if(e!=null&&(e=""+Xs(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+Xs(n):""}function y_(t,e,n,s){if(e==null){if(s!=null){if(n!=null)throw Error(Y(92));if(_c(s)){if(1<s.length)throw Error(Y(93));s=s[0]}n=s}n==null&&(n=""),e=n}n=Xs(e),t.defaultValue=n,s=t.textContent,s===n&&s!==""&&s!==null&&(t.value=s),N0(t)}function _l(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var IA=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function lb(t,e,n){var s=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?s?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":s?t.setProperty(e,n):typeof n!="number"||n===0||IA.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function b_(t,e,n){if(e!=null&&typeof e!="object")throw Error(Y(62));if(t=t.style,n!=null){for(var s in n)!n.hasOwnProperty(s)||e!=null&&e.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="");for(var a in e)s=e[a],e.hasOwnProperty(a)&&n[a]!==s&&lb(t,a,s)}else for(var i in e)e.hasOwnProperty(i)&&lb(t,i,e[i])}function ig(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var MA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),DA=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Bh(t){return DA.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ii(){}var C0=null;function rg(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Qo=null,cl=null;function cb(t){var e=zl(t);if(e&&(t=e.stateNode)){var n=t[Es]||null;e:switch(t=e.stateNode,e.type){case"input":if(R0(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Zs(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var s=n[e];if(s!==t&&s.form===t.form){var a=s[Es]||null;if(!a)throw Error(Y(90));R0(s,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)s=n[e],s.form===t.form&&m_(s)}break e;case"textarea":g_(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&ll(t,!!n.multiple,e,!1)}}}var mm=!1;function v_(t,e,n){if(mm)return t(e,n);mm=!0;try{var s=t(e);return s}finally{if(mm=!1,(Qo!==null||cl!==null)&&(kd(),Qo&&(e=Qo,t=cl,cl=Qo=null,cb(e),t)))for(e=0;e<t.length;e++)cb(t[e])}}function nu(t,e){var n=t.stateNode;if(n===null)return null;var s=n[Es]||null;if(s===null)return null;n=s[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(Y(231,e,typeof n));return n}var pi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),I0=!1;if(pi)try{var hc={};Object.defineProperty(hc,"passive",{get:function(){I0=!0}}),window.addEventListener("test",hc,hc),window.removeEventListener("test",hc,hc)}catch{I0=!1}var Qi=null,og=null,zh=null;function x_(){if(zh)return zh;var t,e=og,n=e.length,s,a="value"in Qi?Qi.value:Qi.textContent,i=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(s=1;s<=r&&e[n-s]===a[i-s];s++);return zh=a.slice(t,1<s?1-s:void 0)}function $h(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function bh(){return!0}function ub(){return!1}function ws(t){function e(n,s,a,i,r){this._reactName=n,this._targetInst=a,this.type=s,this.nativeEvent=i,this.target=r,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?bh:ub,this.isPropagationStopped=ub,this}return Yt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=bh)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=bh)},persist:function(){},isPersistent:bh}),e}var vo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bd=ws(vo),Iu=Yt({},vo,{view:0,detail:0}),OA=ws(Iu),pm,gm,fc,vd=Yt({},Iu,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:lg,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==fc&&(fc&&t.type==="mousemove"?(pm=t.screenX-fc.screenX,gm=t.screenY-fc.screenY):gm=pm=0,fc=t),pm)},movementY:function(t){return"movementY"in t?t.movementY:gm}}),hb=ws(vd),jA=Yt({},vd,{dataTransfer:0}),PA=ws(jA),VA=Yt({},Iu,{relatedTarget:0}),ym=ws(VA),LA=Yt({},vo,{animationName:0,elapsedTime:0,pseudoElement:0}),UA=ws(LA),BA=Yt({},vo,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),zA=ws(BA),$A=Yt({},vo,{data:0}),fb=ws($A),FA={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},HA={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},qA={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function GA(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=qA[t])?!!e[t]:!1}function lg(){return GA}var YA=Yt({},Iu,{key:function(t){if(t.key){var e=FA[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=$h(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?HA[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:lg,charCode:function(t){return t.type==="keypress"?$h(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?$h(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),KA=ws(YA),QA=Yt({},vd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),db=ws(QA),XA=Yt({},Iu,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:lg}),WA=ws(XA),JA=Yt({},vo,{propertyName:0,elapsedTime:0,pseudoElement:0}),ZA=ws(JA),eN=Yt({},vd,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),tN=ws(eN),nN=Yt({},vo,{newState:0,oldState:0}),sN=ws(nN),aN=[9,13,27,32],cg=pi&&"CompositionEvent"in window,Mc=null;pi&&"documentMode"in document&&(Mc=document.documentMode);var iN=pi&&"TextEvent"in window&&!Mc,__=pi&&(!cg||Mc&&8<Mc&&11>=Mc),mb=String.fromCharCode(32),pb=!1;function T_(t,e){switch(t){case"keyup":return aN.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function E_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Xo=!1;function rN(t,e){switch(t){case"compositionend":return E_(e);case"keypress":return e.which!==32?null:(pb=!0,mb);case"textInput":return t=e.data,t===mb&&pb?null:t;default:return null}}function oN(t,e){if(Xo)return t==="compositionend"||!cg&&T_(t,e)?(t=x_(),zh=og=Qi=null,Xo=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return __&&e.locale!=="ko"?null:e.data;default:return null}}var lN={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gb(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!lN[t.type]:e==="textarea"}function w_(t,e,n,s){Qo?cl?cl.push(s):cl=[s]:Qo=s,e=Vf(e,"onChange"),0<e.length&&(n=new bd("onChange","change",null,n,s),t.push({event:n,listeners:e}))}var Dc=null,su=null;function cN(t){v2(t,0)}function xd(t){var e=Tc(t);if(m_(e))return t}function yb(t,e){if(t==="change")return e}var S_=!1;if(pi){var bm;if(pi){var vm="oninput"in document;if(!vm){var bb=document.createElement("div");bb.setAttribute("oninput","return;"),vm=typeof bb.oninput=="function"}bm=vm}else bm=!1;S_=bm&&(!document.documentMode||9<document.documentMode)}function vb(){Dc&&(Dc.detachEvent("onpropertychange",A_),su=Dc=null)}function A_(t){if(t.propertyName==="value"&&xd(su)){var e=[];w_(e,su,t,rg(t)),v_(cN,e)}}function uN(t,e,n){t==="focusin"?(vb(),Dc=e,su=n,Dc.attachEvent("onpropertychange",A_)):t==="focusout"&&vb()}function hN(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return xd(su)}function fN(t,e){if(t==="click")return xd(e)}function dN(t,e){if(t==="input"||t==="change")return xd(e)}function mN(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Vs=typeof Object.is=="function"?Object.is:mN;function au(t,e){if(Vs(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),s=Object.keys(e);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var a=n[s];if(!S0.call(e,a)||!Vs(t[a],e[a]))return!1}return!0}function xb(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function _b(t,e){var n=xb(t);t=0;for(var s;n;){if(n.nodeType===3){if(s=t+n.textContent.length,t<=e&&s>=e)return{node:n,offset:e-t};t=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=xb(n)}}function N_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?N_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function R_(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=vf(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=vf(t.document)}return e}function ug(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var pN=pi&&"documentMode"in document&&11>=document.documentMode,Wo=null,M0=null,Oc=null,D0=!1;function Tb(t,e,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;D0||Wo==null||Wo!==vf(s)||(s=Wo,"selectionStart"in s&&ug(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Oc&&au(Oc,s)||(Oc=s,s=Vf(M0,"onSelect"),0<s.length&&(e=new bd("onSelect","select",null,e,n),t.push({event:e,listeners:s}),e.target=Wo)))}function Hr(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Jo={animationend:Hr("Animation","AnimationEnd"),animationiteration:Hr("Animation","AnimationIteration"),animationstart:Hr("Animation","AnimationStart"),transitionrun:Hr("Transition","TransitionRun"),transitionstart:Hr("Transition","TransitionStart"),transitioncancel:Hr("Transition","TransitionCancel"),transitionend:Hr("Transition","TransitionEnd")},xm={},k_={};pi&&(k_=document.createElement("div").style,"AnimationEvent"in window||(delete Jo.animationend.animation,delete Jo.animationiteration.animation,delete Jo.animationstart.animation),"TransitionEvent"in window||delete Jo.transitionend.transition);function xo(t){if(xm[t])return xm[t];if(!Jo[t])return t;var e=Jo[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in k_)return xm[t]=e[n];return t}var C_=xo("animationend"),I_=xo("animationiteration"),M_=xo("animationstart"),gN=xo("transitionrun"),yN=xo("transitionstart"),bN=xo("transitioncancel"),D_=xo("transitionend"),O_=new Map,O0="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");O0.push("scrollEnd");function xa(t,e){O_.set(t,e),bo(e,[t])}var xf=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Qs=[],Zo=0,hg=0;function _d(){for(var t=Zo,e=hg=Zo=0;e<t;){var n=Qs[e];Qs[e++]=null;var s=Qs[e];Qs[e++]=null;var a=Qs[e];Qs[e++]=null;var i=Qs[e];if(Qs[e++]=null,s!==null&&a!==null){var r=s.pending;r===null?a.next=a:(a.next=r.next,r.next=a),s.pending=a}i!==0&&j_(n,a,i)}}function Td(t,e,n,s){Qs[Zo++]=t,Qs[Zo++]=e,Qs[Zo++]=n,Qs[Zo++]=s,hg|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function fg(t,e,n,s){return Td(t,e,n,s),_f(t)}function _o(t,e){return Td(t,null,null,e),_f(t)}function j_(t,e,n){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n);for(var a=!1,i=t.return;i!==null;)i.childLanes|=n,s=i.alternate,s!==null&&(s.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(a=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,a&&e!==null&&(a=31-js(n),t=i.hiddenUpdates,s=t[a],s===null?t[a]=[e]:s.push(e),e.lane=n|536870912),i):null}function _f(t){if(50<Fc)throw Fc=0,tp=null,Error(Y(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var el={};function vN(t,e,n,s){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Cs(t,e,n,s){return new vN(t,e,n,s)}function dg(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ci(t,e){var n=t.alternate;return n===null?(n=Cs(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function P_(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Fh(t,e,n,s,a,i){var r=0;if(s=t,typeof t=="function")dg(t)&&(r=1);else if(typeof t=="string")r=wR(t,n,Pa.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case _0:return t=Cs(31,n,e,a),t.elementType=_0,t.lanes=i,t;case Go:return to(n.children,a,i,e);case t_:r=8,a|=24;break;case b0:return t=Cs(12,n,e,a|2),t.elementType=b0,t.lanes=i,t;case v0:return t=Cs(13,n,e,a),t.elementType=v0,t.lanes=i,t;case x0:return t=Cs(19,n,e,a),t.elementType=x0,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case ai:r=10;break e;case n_:r=9;break e;case Zp:r=11;break e;case eg:r=14;break e;case Vi:r=16,s=null;break e}r=29,n=Error(Y(130,t===null?"null":typeof t,"")),s=null}return e=Cs(r,n,e,a),e.elementType=t,e.type=s,e.lanes=i,e}function to(t,e,n,s){return t=Cs(7,t,s,e),t.lanes=n,t}function _m(t,e,n){return t=Cs(6,t,null,e),t.lanes=n,t}function V_(t){var e=Cs(18,null,null,0);return e.stateNode=t,e}function Tm(t,e,n){return e=Cs(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Eb=new WeakMap;function ea(t,e){if(typeof t=="object"&&t!==null){var n=Eb.get(t);return n!==void 0?n:(e={value:t,source:e,stack:sb(e)},Eb.set(t,e),e)}return{value:t,source:e,stack:sb(e)}}var tl=[],nl=0,Tf=null,iu=0,Ws=[],Js=0,pr=null,Da=1,Oa="";function ni(t,e){tl[nl++]=iu,tl[nl++]=Tf,Tf=t,iu=e}function L_(t,e,n){Ws[Js++]=Da,Ws[Js++]=Oa,Ws[Js++]=pr,pr=t;var s=Da;t=Oa;var a=32-js(s)-1;s&=~(1<<a),n+=1;var i=32-js(e)+a;if(30<i){var r=a-a%5;i=(s&(1<<r)-1).toString(32),s>>=r,a-=r,Da=1<<32-js(e)+a|n<<a|s,Oa=i+t}else Da=1<<i|n<<a|s,Oa=t}function mg(t){t.return!==null&&(ni(t,1),L_(t,1,0))}function pg(t){for(;t===Tf;)Tf=tl[--nl],tl[nl]=null,iu=tl[--nl],tl[nl]=null;for(;t===pr;)pr=Ws[--Js],Ws[Js]=null,Oa=Ws[--Js],Ws[Js]=null,Da=Ws[--Js],Ws[Js]=null}function U_(t,e){Ws[Js++]=Da,Ws[Js++]=Oa,Ws[Js++]=pr,Da=e.id,Oa=e.overflow,pr=t}var Hn=null,Ht=null,ot=!1,nr=null,ta=!1,j0=Error(Y(519));function gr(t){var e=Error(Y(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ru(ea(e,t)),j0}function wb(t){var e=t.stateNode,n=t.type,s=t.memoizedProps;switch(e[Fn]=t,e[Es]=s,n){case"dialog":Xe("cancel",e),Xe("close",e);break;case"iframe":case"object":case"embed":Xe("load",e);break;case"video":case"audio":for(n=0;n<uu.length;n++)Xe(uu[n],e);break;case"source":Xe("error",e);break;case"img":case"image":case"link":Xe("error",e),Xe("load",e);break;case"details":Xe("toggle",e);break;case"input":Xe("invalid",e),p_(e,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":Xe("invalid",e);break;case"textarea":Xe("invalid",e),y_(e,s.value,s.defaultValue,s.children)}n=s.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||s.suppressHydrationWarning===!0||_2(e.textContent,n)?(s.popover!=null&&(Xe("beforetoggle",e),Xe("toggle",e)),s.onScroll!=null&&Xe("scroll",e),s.onScrollEnd!=null&&Xe("scrollend",e),s.onClick!=null&&(e.onclick=ii),e=!0):e=!1,e||gr(t,!0)}function Sb(t){for(Hn=t.return;Hn;)switch(Hn.tag){case 5:case 31:case 13:ta=!1;return;case 27:case 3:ta=!0;return;default:Hn=Hn.return}}function Po(t){if(t!==Hn)return!1;if(!ot)return Sb(t),ot=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||rp(t.type,t.memoizedProps)),n=!n),n&&Ht&&gr(t),Sb(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(Y(317));Ht=hv(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(Y(317));Ht=hv(t)}else e===27?(e=Ht,kr(t.type)?(t=up,up=null,Ht=t):Ht=e):Ht=Hn?aa(t.stateNode.nextSibling):null;return!0}function oo(){Ht=Hn=null,ot=!1}function Em(){var t=nr;return t!==null&&(bs===null?bs=t:bs.push.apply(bs,t),nr=null),t}function ru(t){nr===null?nr=[t]:nr.push(t)}var P0=Ha(null),To=null,ri=null;function Ui(t,e,n){Vt(P0,e._currentValue),e._currentValue=n}function ui(t){t._currentValue=P0.current,jn(P0)}function V0(t,e,n){for(;t!==null;){var s=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,s!==null&&(s.childLanes|=e)):s!==null&&(s.childLanes&e)!==e&&(s.childLanes|=e),t===n)break;t=t.return}}function L0(t,e,n,s){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var i=a.dependencies;if(i!==null){var r=a.child;i=i.firstContext;e:for(;i!==null;){var l=i;i=a;for(var c=0;c<e.length;c++)if(l.context===e[c]){i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),V0(i.return,n,t),s||(r=null);break e}i=l.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(Y(341));r.lanes|=n,i=r.alternate,i!==null&&(i.lanes|=n),V0(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function $l(t,e,n,s){t=null;for(var a=e,i=!1;a!==null;){if(!i){if(a.flags&524288)i=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(Y(387));if(r=r.memoizedProps,r!==null){var l=a.type;Vs(a.pendingProps.value,r.value)||(t!==null?t.push(l):t=[l])}}else if(a===pf.current){if(r=a.alternate,r===null)throw Error(Y(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(fu):t=[fu])}a=a.return}t!==null&&L0(e,t,n,s),e.flags|=262144}function Ef(t){for(t=t.firstContext;t!==null;){if(!Vs(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function lo(t){To=t,ri=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Gn(t){return B_(To,t)}function vh(t,e){return To===null&&lo(t),B_(t,e)}function B_(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},ri===null){if(t===null)throw Error(Y(308));ri=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else ri=ri.next=e;return n}var xN=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,s){t.push(s)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},_N=kn.unstable_scheduleCallback,TN=kn.unstable_NormalPriority,vn={$$typeof:ai,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function gg(){return{controller:new xN,data:new Map,refCount:0}}function Mu(t){t.refCount--,t.refCount===0&&_N(TN,function(){t.controller.abort()})}var jc=null,U0=0,Tl=0,ul=null;function EN(t,e){if(jc===null){var n=jc=[];U0=0,Tl=zg(),ul={status:"pending",value:void 0,then:function(s){n.push(s)}}}return U0++,e.then(Ab,Ab),e}function Ab(){if(--U0===0&&jc!==null){ul!==null&&(ul.status="fulfilled");var t=jc;jc=null,Tl=0,ul=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function wN(t,e){var n=[],s={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){s.status="fulfilled",s.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(s.status="rejected",s.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),s}var Nb=Ce.S;Ce.S=function(t,e){e2=Ds(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&EN(t,e),Nb!==null&&Nb(t,e)};var no=Ha(null);function yg(){var t=no.current;return t!==null?t:Dt.pooledCache}function Hh(t,e){e===null?Vt(no,no.current):Vt(no,e.pool)}function z_(){var t=yg();return t===null?null:{parent:vn._currentValue,pool:t}}var Fl=Error(Y(460)),bg=Error(Y(474)),Ed=Error(Y(542)),wf={then:function(){}};function Rb(t){return t=t.status,t==="fulfilled"||t==="rejected"}function $_(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(ii,ii),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Cb(t),t;default:if(typeof e.status=="string")e.then(ii,ii);else{if(t=Dt,t!==null&&100<t.shellSuspendCounter)throw Error(Y(482));t=e,t.status="pending",t.then(function(s){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=s}},function(s){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=s}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Cb(t),t}throw so=e,Fl}}function Kr(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(so=n,Fl):n}}var so=null;function kb(){if(so===null)throw Error(Y(459));var t=so;return so=null,t}function Cb(t){if(t===Fl||t===Ed)throw Error(Y(483))}var hl=null,ou=0;function xh(t){var e=ou;return ou+=1,hl===null&&(hl=[]),$_(hl,t,e)}function dc(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function _h(t,e){throw e.$$typeof===uA?Error(Y(525)):(t=Object.prototype.toString.call(e),Error(Y(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function F_(t){function e(_,v){if(t){var S=_.deletions;S===null?(_.deletions=[v],_.flags|=16):S.push(v)}}function n(_,v){if(!t)return null;for(;v!==null;)e(_,v),v=v.sibling;return null}function s(_){for(var v=new Map;_!==null;)_.key!==null?v.set(_.key,_):v.set(_.index,_),_=_.sibling;return v}function a(_,v){return _=ci(_,v),_.index=0,_.sibling=null,_}function i(_,v,S){return _.index=S,t?(S=_.alternate,S!==null?(S=S.index,S<v?(_.flags|=67108866,v):S):(_.flags|=67108866,v)):(_.flags|=1048576,v)}function r(_){return t&&_.alternate===null&&(_.flags|=67108866),_}function l(_,v,S,L){return v===null||v.tag!==6?(v=_m(S,_.mode,L),v.return=_,v):(v=a(v,S),v.return=_,v)}function c(_,v,S,L){var j=S.type;return j===Go?d(_,v,S.props.children,L,S.key):v!==null&&(v.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Vi&&Kr(j)===v.type)?(v=a(v,S.props),dc(v,S),v.return=_,v):(v=Fh(S.type,S.key,S.props,null,_.mode,L),dc(v,S),v.return=_,v)}function h(_,v,S,L){return v===null||v.tag!==4||v.stateNode.containerInfo!==S.containerInfo||v.stateNode.implementation!==S.implementation?(v=Tm(S,_.mode,L),v.return=_,v):(v=a(v,S.children||[]),v.return=_,v)}function d(_,v,S,L,j){return v===null||v.tag!==7?(v=to(S,_.mode,L,j),v.return=_,v):(v=a(v,S),v.return=_,v)}function p(_,v,S){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=_m(""+v,_.mode,S),v.return=_,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case dh:return S=Fh(v.type,v.key,v.props,null,_.mode,S),dc(S,v),S.return=_,S;case xc:return v=Tm(v,_.mode,S),v.return=_,v;case Vi:return v=Kr(v),p(_,v,S)}if(_c(v)||uc(v))return v=to(v,_.mode,S,null),v.return=_,v;if(typeof v.then=="function")return p(_,xh(v),S);if(v.$$typeof===ai)return p(_,vh(_,v),S);_h(_,v)}return null}function g(_,v,S,L){var j=v!==null?v.key:null;if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return j!==null?null:l(_,v,""+S,L);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case dh:return S.key===j?c(_,v,S,L):null;case xc:return S.key===j?h(_,v,S,L):null;case Vi:return S=Kr(S),g(_,v,S,L)}if(_c(S)||uc(S))return j!==null?null:d(_,v,S,L,null);if(typeof S.then=="function")return g(_,v,xh(S),L);if(S.$$typeof===ai)return g(_,v,vh(_,S),L);_h(_,S)}return null}function y(_,v,S,L,j){if(typeof L=="string"&&L!==""||typeof L=="number"||typeof L=="bigint")return _=_.get(S)||null,l(v,_,""+L,j);if(typeof L=="object"&&L!==null){switch(L.$$typeof){case dh:return _=_.get(L.key===null?S:L.key)||null,c(v,_,L,j);case xc:return _=_.get(L.key===null?S:L.key)||null,h(v,_,L,j);case Vi:return L=Kr(L),y(_,v,S,L,j)}if(_c(L)||uc(L))return _=_.get(S)||null,d(v,_,L,j,null);if(typeof L.then=="function")return y(_,v,S,xh(L),j);if(L.$$typeof===ai)return y(_,v,S,vh(v,L),j);_h(v,L)}return null}function C(_,v,S,L){for(var j=null,H=null,T=v,x=v=0,E=null;T!==null&&x<S.length;x++){T.index>x?(E=T,T=null):E=T.sibling;var k=g(_,T,S[x],L);if(k===null){T===null&&(T=E);break}t&&T&&k.alternate===null&&e(_,T),v=i(k,v,x),H===null?j=k:H.sibling=k,H=k,T=E}if(x===S.length)return n(_,T),ot&&ni(_,x),j;if(T===null){for(;x<S.length;x++)T=p(_,S[x],L),T!==null&&(v=i(T,v,x),H===null?j=T:H.sibling=T,H=T);return ot&&ni(_,x),j}for(T=s(T);x<S.length;x++)E=y(T,_,x,S[x],L),E!==null&&(t&&E.alternate!==null&&T.delete(E.key===null?x:E.key),v=i(E,v,x),H===null?j=E:H.sibling=E,H=E);return t&&T.forEach(function(R){return e(_,R)}),ot&&ni(_,x),j}function I(_,v,S,L){if(S==null)throw Error(Y(151));for(var j=null,H=null,T=v,x=v=0,E=null,k=S.next();T!==null&&!k.done;x++,k=S.next()){T.index>x?(E=T,T=null):E=T.sibling;var R=g(_,T,k.value,L);if(R===null){T===null&&(T=E);break}t&&T&&R.alternate===null&&e(_,T),v=i(R,v,x),H===null?j=R:H.sibling=R,H=R,T=E}if(k.done)return n(_,T),ot&&ni(_,x),j;if(T===null){for(;!k.done;x++,k=S.next())k=p(_,k.value,L),k!==null&&(v=i(k,v,x),H===null?j=k:H.sibling=k,H=k);return ot&&ni(_,x),j}for(T=s(T);!k.done;x++,k=S.next())k=y(T,_,x,k.value,L),k!==null&&(t&&k.alternate!==null&&T.delete(k.key===null?x:k.key),v=i(k,v,x),H===null?j=k:H.sibling=k,H=k);return t&&T.forEach(function(D){return e(_,D)}),ot&&ni(_,x),j}function O(_,v,S,L){if(typeof S=="object"&&S!==null&&S.type===Go&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case dh:e:{for(var j=S.key;v!==null;){if(v.key===j){if(j=S.type,j===Go){if(v.tag===7){n(_,v.sibling),L=a(v,S.props.children),L.return=_,_=L;break e}}else if(v.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Vi&&Kr(j)===v.type){n(_,v.sibling),L=a(v,S.props),dc(L,S),L.return=_,_=L;break e}n(_,v);break}else e(_,v);v=v.sibling}S.type===Go?(L=to(S.props.children,_.mode,L,S.key),L.return=_,_=L):(L=Fh(S.type,S.key,S.props,null,_.mode,L),dc(L,S),L.return=_,_=L)}return r(_);case xc:e:{for(j=S.key;v!==null;){if(v.key===j)if(v.tag===4&&v.stateNode.containerInfo===S.containerInfo&&v.stateNode.implementation===S.implementation){n(_,v.sibling),L=a(v,S.children||[]),L.return=_,_=L;break e}else{n(_,v);break}else e(_,v);v=v.sibling}L=Tm(S,_.mode,L),L.return=_,_=L}return r(_);case Vi:return S=Kr(S),O(_,v,S,L)}if(_c(S))return C(_,v,S,L);if(uc(S)){if(j=uc(S),typeof j!="function")throw Error(Y(150));return S=j.call(S),I(_,v,S,L)}if(typeof S.then=="function")return O(_,v,xh(S),L);if(S.$$typeof===ai)return O(_,v,vh(_,S),L);_h(_,S)}return typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint"?(S=""+S,v!==null&&v.tag===6?(n(_,v.sibling),L=a(v,S),L.return=_,_=L):(n(_,v),L=_m(S,_.mode,L),L.return=_,_=L),r(_)):n(_,v)}return function(_,v,S,L){try{ou=0;var j=O(_,v,S,L);return hl=null,j}catch(T){if(T===Fl||T===Ed)throw T;var H=Cs(29,T,null,_.mode);return H.lanes=L,H.return=_,H}finally{}}}var co=F_(!0),H_=F_(!1),Li=!1;function vg(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function B0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function sr(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ar(t,e,n){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,yt&2){var a=s.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),s.pending=e,e=_f(t),j_(t,null,n),e}return Td(t,s,e,n),_f(t)}function Pc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,l_(t,n)}}function wm(t,e){var n=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?a=i=r:i=i.next=r,n=n.next}while(n!==null);i===null?a=i=e:i=i.next=e}else a=i=e;n={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:s.shared,callbacks:s.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var z0=!1;function Vc(){if(z0){var t=ul;if(t!==null)throw t}}function Lc(t,e,n,s){z0=!1;var a=t.updateQueue;Li=!1;var i=a.firstBaseUpdate,r=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var c=l,h=c.next;c.next=null,r===null?i=h:r.next=h,r=c;var d=t.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==r&&(l===null?d.firstBaseUpdate=h:l.next=h,d.lastBaseUpdate=c))}if(i!==null){var p=a.baseState;r=0,d=h=c=null,l=i;do{var g=l.lane&-536870913,y=g!==l.lane;if(y?(tt&g)===g:(s&g)===g){g!==0&&g===Tl&&(z0=!0),d!==null&&(d=d.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});e:{var C=t,I=l;g=e;var O=n;switch(I.tag){case 1:if(C=I.payload,typeof C=="function"){p=C.call(O,p,g);break e}p=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=I.payload,g=typeof C=="function"?C.call(O,p,g):C,g==null)break e;p=Yt({},p,g);break e;case 2:Li=!0}}g=l.callback,g!==null&&(t.flags|=64,y&&(t.flags|=8192),y=a.callbacks,y===null?a.callbacks=[g]:y.push(g))}else y={lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(h=d=y,c=p):d=d.next=y,r|=g;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;y=l,l=y.next,y.next=null,a.lastBaseUpdate=y,a.shared.pending=null}}while(1);d===null&&(c=p),a.baseState=c,a.firstBaseUpdate=h,a.lastBaseUpdate=d,i===null&&(a.shared.lanes=0),br|=r,t.lanes=r,t.memoizedState=p}}function q_(t,e){if(typeof t!="function")throw Error(Y(191,t));t.call(e)}function G_(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)q_(n[t],e)}var El=Ha(null),Sf=Ha(0);function Ib(t,e){t=vi,Vt(Sf,t),Vt(El,e),vi=t|e.baseLanes}function $0(){Vt(Sf,vi),Vt(El,El.current)}function xg(){vi=Sf.current,jn(El),jn(Sf)}var Ls=Ha(null),sa=null;function Bi(t){var e=t.alternate;Vt(hn,hn.current&1),Vt(Ls,t),sa===null&&(e===null||El.current!==null||e.memoizedState!==null)&&(sa=t)}function F0(t){Vt(hn,hn.current),Vt(Ls,t),sa===null&&(sa=t)}function Y_(t){t.tag===22?(Vt(hn,hn.current),Vt(Ls,t),sa===null&&(sa=t)):zi()}function zi(){Vt(hn,hn.current),Vt(Ls,Ls.current)}function Rs(t){jn(Ls),sa===t&&(sa=null),jn(hn)}var hn=Ha(0);function Af(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||lp(n)||cp(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var gi=0,Be=null,kt=null,yn=null,Nf=!1,fl=!1,uo=!1,Rf=0,lu=0,dl=null,SN=0;function an(){throw Error(Y(321))}function _g(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Vs(t[n],e[n]))return!1;return!0}function Tg(t,e,n,s,a,i){return gi=i,Be=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ce.H=t===null||t.memoizedState===null?wT:Dg,uo=!1,i=n(s,a),uo=!1,fl&&(i=Q_(e,n,s,a)),K_(t),i}function K_(t){Ce.H=cu;var e=kt!==null&&kt.next!==null;if(gi=0,yn=kt=Be=null,Nf=!1,lu=0,dl=null,e)throw Error(Y(300));t===null||_n||(t=t.dependencies,t!==null&&Ef(t)&&(_n=!0))}function Q_(t,e,n,s){Be=t;var a=0;do{if(fl&&(dl=null),lu=0,fl=!1,25<=a)throw Error(Y(301));if(a+=1,yn=kt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}Ce.H=ST,i=e(n,s)}while(fl);return i}function AN(){var t=Ce.H,e=t.useState()[0];return e=typeof e.then=="function"?Du(e):e,t=t.useState()[0],(kt!==null?kt.memoizedState:null)!==t&&(Be.flags|=1024),e}function Eg(){var t=Rf!==0;return Rf=0,t}function wg(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function Sg(t){if(Nf){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Nf=!1}gi=0,yn=kt=Be=null,fl=!1,lu=Rf=0,dl=null}function ls(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return yn===null?Be.memoizedState=yn=t:yn=yn.next=t,yn}function fn(){if(kt===null){var t=Be.alternate;t=t!==null?t.memoizedState:null}else t=kt.next;var e=yn===null?Be.memoizedState:yn.next;if(e!==null)yn=e,kt=t;else{if(t===null)throw Be.alternate===null?Error(Y(467)):Error(Y(310));kt=t,t={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null},yn===null?Be.memoizedState=yn=t:yn=yn.next=t}return yn}function wd(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Du(t){var e=lu;return lu+=1,dl===null&&(dl=[]),t=$_(dl,t,e),e=Be,(yn===null?e.memoizedState:yn.next)===null&&(e=e.alternate,Ce.H=e===null||e.memoizedState===null?wT:Dg),t}function Sd(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Du(t);if(t.$$typeof===ai)return Gn(t)}throw Error(Y(438,String(t)))}function Ag(t){var e=null,n=Be.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var s=Be.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(e={data:s.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=wd(),Be.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),s=0;s<t;s++)n[s]=hA;return e.index++,n}function yi(t,e){return typeof e=="function"?e(t):e}function qh(t){var e=fn();return Ng(e,kt,t)}function Ng(t,e,n){var s=t.queue;if(s===null)throw Error(Y(311));s.lastRenderedReducer=n;var a=t.baseQueue,i=s.pending;if(i!==null){if(a!==null){var r=a.next;a.next=i.next,i.next=r}e.baseQueue=a=i,s.pending=null}if(i=t.baseState,a===null)t.memoizedState=i;else{e=a.next;var l=r=null,c=null,h=e,d=!1;do{var p=h.lane&-536870913;if(p!==h.lane?(tt&p)===p:(gi&p)===p){var g=h.revertLane;if(g===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),p===Tl&&(d=!0);else if((gi&g)===g){h=h.next,g===Tl&&(d=!0);continue}else p={lane:0,revertLane:h.revertLane,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},c===null?(l=c=p,r=i):c=c.next=p,Be.lanes|=g,br|=g;p=h.action,uo&&n(i,p),i=h.hasEagerState?h.eagerState:n(i,p)}else g={lane:p,revertLane:h.revertLane,gesture:h.gesture,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},c===null?(l=c=g,r=i):c=c.next=g,Be.lanes|=p,br|=p;h=h.next}while(h!==null&&h!==e);if(c===null?r=i:c.next=l,!Vs(i,t.memoizedState)&&(_n=!0,d&&(n=ul,n!==null)))throw n;t.memoizedState=i,t.baseState=r,t.baseQueue=c,s.lastRenderedState=i}return a===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function Sm(t){var e=fn(),n=e.queue;if(n===null)throw Error(Y(311));n.lastRenderedReducer=t;var s=n.dispatch,a=n.pending,i=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do i=t(i,r.action),r=r.next;while(r!==a);Vs(i,e.memoizedState)||(_n=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,s]}function X_(t,e,n){var s=Be,a=fn(),i=ot;if(i){if(n===void 0)throw Error(Y(407));n=n()}else n=e();var r=!Vs((kt||a).memoizedState,n);if(r&&(a.memoizedState=n,_n=!0),a=a.queue,Rg(Z_.bind(null,s,a,t),[t]),a.getSnapshot!==e||r||yn!==null&&yn.memoizedState.tag&1){if(s.flags|=2048,wl(9,{destroy:void 0},J_.bind(null,s,a,n,e),null),Dt===null)throw Error(Y(349));i||gi&127||W_(s,e,n)}return n}function W_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Be.updateQueue,e===null?(e=wd(),Be.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function J_(t,e,n,s){e.value=n,e.getSnapshot=s,eT(e)&&tT(t)}function Z_(t,e,n){return n(function(){eT(e)&&tT(t)})}function eT(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Vs(t,n)}catch{return!0}}function tT(t){var e=_o(t,2);e!==null&&Ts(e,t,2)}function H0(t){var e=ls();if(typeof t=="function"){var n=t;if(t=n(),uo){Ki(!0);try{n()}finally{Ki(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:yi,lastRenderedState:t},e}function nT(t,e,n,s){return t.baseState=n,Ng(t,kt,typeof s=="function"?s:yi)}function NN(t,e,n,s,a){if(Nd(t))throw Error(Y(485));if(t=e.action,t!==null){var i={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){i.listeners.push(r)}};Ce.T!==null?n(!0):i.isTransition=!1,s(i),n=e.pending,n===null?(i.next=e.pending=i,sT(e,i)):(i.next=n.next,e.pending=n.next=i)}}function sT(t,e){var n=e.action,s=e.payload,a=t.state;if(e.isTransition){var i=Ce.T,r={};Ce.T=r;try{var l=n(a,s),c=Ce.S;c!==null&&c(r,l),Mb(t,e,l)}catch(h){q0(t,e,h)}finally{i!==null&&r.types!==null&&(i.types=r.types),Ce.T=i}}else try{i=n(a,s),Mb(t,e,i)}catch(h){q0(t,e,h)}}function Mb(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(s){Db(t,e,s)},function(s){return q0(t,e,s)}):Db(t,e,n)}function Db(t,e,n){e.status="fulfilled",e.value=n,aT(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,sT(t,n)))}function q0(t,e,n){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do e.status="rejected",e.reason=n,aT(e),e=e.next;while(e!==s)}t.action=null}function aT(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function iT(t,e){return e}function Ob(t,e){if(ot){var n=Dt.formState;if(n!==null){e:{var s=Be;if(ot){if(Ht){t:{for(var a=Ht,i=ta;a.nodeType!==8;){if(!i){a=null;break t}if(a=aa(a.nextSibling),a===null){a=null;break t}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){Ht=aa(a.nextSibling),s=a.data==="F!";break e}}gr(s)}s=!1}s&&(e=n[0])}}return n=ls(),n.memoizedState=n.baseState=e,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:iT,lastRenderedState:e},n.queue=s,n=_T.bind(null,Be,s),s.dispatch=n,s=H0(!1),i=Mg.bind(null,Be,!1,s.queue),s=ls(),a={state:e,dispatch:null,action:t,pending:null},s.queue=a,n=NN.bind(null,Be,a,i,n),a.dispatch=n,s.memoizedState=t,[e,n,!1]}function jb(t){var e=fn();return rT(e,kt,t)}function rT(t,e,n){if(e=Ng(t,e,iT)[0],t=qh(yi)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var s=Du(e)}catch(r){throw r===Fl?Ed:r}else s=e;e=fn();var a=e.queue,i=a.dispatch;return n!==e.memoizedState&&(Be.flags|=2048,wl(9,{destroy:void 0},RN.bind(null,a,n),null)),[s,i,t]}function RN(t,e){t.action=e}function Pb(t){var e=fn(),n=kt;if(n!==null)return rT(e,n,t);fn(),e=e.memoizedState,n=fn();var s=n.queue.dispatch;return n.memoizedState=t,[e,s,!1]}function wl(t,e,n,s){return t={tag:t,create:n,deps:s,inst:e,next:null},e=Be.updateQueue,e===null&&(e=wd(),Be.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(s=n.next,n.next=t,t.next=s,e.lastEffect=t),t}function oT(){return fn().memoizedState}function Gh(t,e,n,s){var a=ls();Be.flags|=t,a.memoizedState=wl(1|e,{destroy:void 0},n,s===void 0?null:s)}function Ad(t,e,n,s){var a=fn();s=s===void 0?null:s;var i=a.memoizedState.inst;kt!==null&&s!==null&&_g(s,kt.memoizedState.deps)?a.memoizedState=wl(e,i,n,s):(Be.flags|=t,a.memoizedState=wl(1|e,i,n,s))}function Vb(t,e){Gh(8390656,8,t,e)}function Rg(t,e){Ad(2048,8,t,e)}function kN(t){Be.flags|=4;var e=Be.updateQueue;if(e===null)e=wd(),Be.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function lT(t){var e=fn().memoizedState;return kN({ref:e,nextImpl:t}),function(){if(yt&2)throw Error(Y(440));return e.impl.apply(void 0,arguments)}}function cT(t,e){return Ad(4,2,t,e)}function uT(t,e){return Ad(4,4,t,e)}function hT(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function fT(t,e,n){n=n!=null?n.concat([t]):null,Ad(4,4,hT.bind(null,e,t),n)}function kg(){}function dT(t,e){var n=fn();e=e===void 0?null:e;var s=n.memoizedState;return e!==null&&_g(e,s[1])?s[0]:(n.memoizedState=[t,e],t)}function mT(t,e){var n=fn();e=e===void 0?null:e;var s=n.memoizedState;if(e!==null&&_g(e,s[1]))return s[0];if(s=t(),uo){Ki(!0);try{t()}finally{Ki(!1)}}return n.memoizedState=[s,e],s}function Cg(t,e,n){return n===void 0||gi&1073741824&&!(tt&261930)?t.memoizedState=e:(t.memoizedState=n,t=n2(),Be.lanes|=t,br|=t,n)}function pT(t,e,n,s){return Vs(n,e)?n:El.current!==null?(t=Cg(t,n,s),Vs(t,e)||(_n=!0),t):!(gi&42)||gi&1073741824&&!(tt&261930)?(_n=!0,t.memoizedState=n):(t=n2(),Be.lanes|=t,br|=t,e)}function gT(t,e,n,s,a){var i=bt.p;bt.p=i!==0&&8>i?i:8;var r=Ce.T,l={};Ce.T=l,Mg(t,!1,e,n);try{var c=a(),h=Ce.S;if(h!==null&&h(l,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=wN(c,s);Uc(t,e,d,Ps(t))}else Uc(t,e,s,Ps(t))}catch(p){Uc(t,e,{then:function(){},status:"rejected",reason:p},Ps())}finally{bt.p=i,r!==null&&l.types!==null&&(r.types=l.types),Ce.T=r}}function CN(){}function G0(t,e,n,s){if(t.tag!==5)throw Error(Y(476));var a=yT(t).queue;gT(t,a,e,eo,n===null?CN:function(){return bT(t),n(s)})}function yT(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:eo,baseState:eo,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:yi,lastRenderedState:eo},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:yi,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function bT(t){var e=yT(t);e.next===null&&(e=t.alternate.memoizedState),Uc(t,e.next.queue,{},Ps())}function Ig(){return Gn(fu)}function vT(){return fn().memoizedState}function xT(){return fn().memoizedState}function IN(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=Ps();t=sr(n);var s=ar(e,t,n);s!==null&&(Ts(s,e,n),Pc(s,e,n)),e={cache:gg()},t.payload=e;return}e=e.return}}function MN(t,e,n){var s=Ps();n={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Nd(t)?TT(e,n):(n=fg(t,e,n,s),n!==null&&(Ts(n,t,s),ET(n,e,s)))}function _T(t,e,n){var s=Ps();Uc(t,e,n,s)}function Uc(t,e,n,s){var a={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Nd(t))TT(e,a);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var r=e.lastRenderedState,l=i(r,n);if(a.hasEagerState=!0,a.eagerState=l,Vs(l,r))return Td(t,e,a,0),Dt===null&&_d(),!1}catch{}finally{}if(n=fg(t,e,a,s),n!==null)return Ts(n,t,s),ET(n,e,s),!0}return!1}function Mg(t,e,n,s){if(s={lane:2,revertLane:zg(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Nd(t)){if(e)throw Error(Y(479))}else e=fg(t,n,s,2),e!==null&&Ts(e,t,2)}function Nd(t){var e=t.alternate;return t===Be||e!==null&&e===Be}function TT(t,e){fl=Nf=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ET(t,e,n){if(n&4194048){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,l_(t,n)}}var cu={readContext:Gn,use:Sd,useCallback:an,useContext:an,useEffect:an,useImperativeHandle:an,useLayoutEffect:an,useInsertionEffect:an,useMemo:an,useReducer:an,useRef:an,useState:an,useDebugValue:an,useDeferredValue:an,useTransition:an,useSyncExternalStore:an,useId:an,useHostTransitionStatus:an,useFormState:an,useActionState:an,useOptimistic:an,useMemoCache:an,useCacheRefresh:an};cu.useEffectEvent=an;var wT={readContext:Gn,use:Sd,useCallback:function(t,e){return ls().memoizedState=[t,e===void 0?null:e],t},useContext:Gn,useEffect:Vb,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Gh(4194308,4,hT.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Gh(4194308,4,t,e)},useInsertionEffect:function(t,e){Gh(4,2,t,e)},useMemo:function(t,e){var n=ls();e=e===void 0?null:e;var s=t();if(uo){Ki(!0);try{t()}finally{Ki(!1)}}return n.memoizedState=[s,e],s},useReducer:function(t,e,n){var s=ls();if(n!==void 0){var a=n(e);if(uo){Ki(!0);try{n(e)}finally{Ki(!1)}}}else a=e;return s.memoizedState=s.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},s.queue=t,t=t.dispatch=MN.bind(null,Be,t),[s.memoizedState,t]},useRef:function(t){var e=ls();return t={current:t},e.memoizedState=t},useState:function(t){t=H0(t);var e=t.queue,n=_T.bind(null,Be,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:kg,useDeferredValue:function(t,e){var n=ls();return Cg(n,t,e)},useTransition:function(){var t=H0(!1);return t=gT.bind(null,Be,t.queue,!0,!1),ls().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var s=Be,a=ls();if(ot){if(n===void 0)throw Error(Y(407));n=n()}else{if(n=e(),Dt===null)throw Error(Y(349));tt&127||W_(s,e,n)}a.memoizedState=n;var i={value:n,getSnapshot:e};return a.queue=i,Vb(Z_.bind(null,s,i,t),[t]),s.flags|=2048,wl(9,{destroy:void 0},J_.bind(null,s,i,n,e),null),n},useId:function(){var t=ls(),e=Dt.identifierPrefix;if(ot){var n=Oa,s=Da;n=(s&~(1<<32-js(s)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Rf++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=SN++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Ig,useFormState:Ob,useActionState:Ob,useOptimistic:function(t){var e=ls();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Mg.bind(null,Be,!0,n),n.dispatch=e,[t,e]},useMemoCache:Ag,useCacheRefresh:function(){return ls().memoizedState=IN.bind(null,Be)},useEffectEvent:function(t){var e=ls(),n={impl:t};return e.memoizedState=n,function(){if(yt&2)throw Error(Y(440));return n.impl.apply(void 0,arguments)}}},Dg={readContext:Gn,use:Sd,useCallback:dT,useContext:Gn,useEffect:Rg,useImperativeHandle:fT,useInsertionEffect:cT,useLayoutEffect:uT,useMemo:mT,useReducer:qh,useRef:oT,useState:function(){return qh(yi)},useDebugValue:kg,useDeferredValue:function(t,e){var n=fn();return pT(n,kt.memoizedState,t,e)},useTransition:function(){var t=qh(yi)[0],e=fn().memoizedState;return[typeof t=="boolean"?t:Du(t),e]},useSyncExternalStore:X_,useId:vT,useHostTransitionStatus:Ig,useFormState:jb,useActionState:jb,useOptimistic:function(t,e){var n=fn();return nT(n,kt,t,e)},useMemoCache:Ag,useCacheRefresh:xT};Dg.useEffectEvent=lT;var ST={readContext:Gn,use:Sd,useCallback:dT,useContext:Gn,useEffect:Rg,useImperativeHandle:fT,useInsertionEffect:cT,useLayoutEffect:uT,useMemo:mT,useReducer:Sm,useRef:oT,useState:function(){return Sm(yi)},useDebugValue:kg,useDeferredValue:function(t,e){var n=fn();return kt===null?Cg(n,t,e):pT(n,kt.memoizedState,t,e)},useTransition:function(){var t=Sm(yi)[0],e=fn().memoizedState;return[typeof t=="boolean"?t:Du(t),e]},useSyncExternalStore:X_,useId:vT,useHostTransitionStatus:Ig,useFormState:Pb,useActionState:Pb,useOptimistic:function(t,e){var n=fn();return kt!==null?nT(n,kt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:Ag,useCacheRefresh:xT};ST.useEffectEvent=lT;function Am(t,e,n,s){e=t.memoizedState,n=n(s,e),n=n==null?e:Yt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Y0={enqueueSetState:function(t,e,n){t=t._reactInternals;var s=Ps(),a=sr(s);a.payload=e,n!=null&&(a.callback=n),e=ar(t,a,s),e!==null&&(Ts(e,t,s),Pc(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var s=Ps(),a=sr(s);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=ar(t,a,s),e!==null&&(Ts(e,t,s),Pc(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Ps(),s=sr(n);s.tag=2,e!=null&&(s.callback=e),e=ar(t,s,n),e!==null&&(Ts(e,t,n),Pc(e,t,n))}};function Lb(t,e,n,s,a,i,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,i,r):e.prototype&&e.prototype.isPureReactComponent?!au(n,s)||!au(a,i):!0}function Ub(t,e,n,s){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,s),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,s),e.state!==t&&Y0.enqueueReplaceState(e,e.state,null)}function ho(t,e){var n=e;if("ref"in e){n={};for(var s in e)s!=="ref"&&(n[s]=e[s])}if(t=t.defaultProps){n===e&&(n=Yt({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function AT(t){xf(t)}function NT(t){console.error(t)}function RT(t){xf(t)}function kf(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(s){setTimeout(function(){throw s})}}function Bb(t,e,n){try{var s=t.onCaughtError;s(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function K0(t,e,n){return n=sr(n),n.tag=3,n.payload={element:null},n.callback=function(){kf(t,e)},n}function kT(t){return t=sr(t),t.tag=3,t}function CT(t,e,n,s){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=s.value;t.payload=function(){return a(i)},t.callback=function(){Bb(e,n,s)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){Bb(e,n,s),typeof a!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var l=s.stack;this.componentDidCatch(s.value,{componentStack:l!==null?l:""})})}function DN(t,e,n,s,a){if(n.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(e=n.alternate,e!==null&&$l(e,n,a,!0),n=Ls.current,n!==null){switch(n.tag){case 31:case 13:return sa===null?Of():n.alternate===null&&rn===0&&(rn=3),n.flags&=-257,n.flags|=65536,n.lanes=a,s===wf?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([s]):e.add(s),Vm(t,s,a)),!1;case 22:return n.flags|=65536,s===wf?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([s])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([s]):n.add(s)),Vm(t,s,a)),!1}throw Error(Y(435,n.tag))}return Vm(t,s,a),Of(),!1}if(ot)return e=Ls.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,s!==j0&&(t=Error(Y(422),{cause:s}),ru(ea(t,n)))):(s!==j0&&(e=Error(Y(423),{cause:s}),ru(ea(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,s=ea(s,n),a=K0(t.stateNode,s,a),wm(t,a),rn!==4&&(rn=2)),!1;var i=Error(Y(520),{cause:s});if(i=ea(i,n),$c===null?$c=[i]:$c.push(i),rn!==4&&(rn=2),e===null)return!0;s=ea(s,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=K0(n.stateNode,s,t),wm(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(ir===null||!ir.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,a=kT(a),CT(a,t,n,s),wm(n,a),!1}n=n.return}while(n!==null);return!1}var Og=Error(Y(461)),_n=!1;function zn(t,e,n,s){e.child=t===null?H_(e,null,n,s):co(e,t.child,n,s)}function zb(t,e,n,s,a){n=n.render;var i=e.ref;if("ref"in s){var r={};for(var l in s)l!=="ref"&&(r[l]=s[l])}else r=s;return lo(e),s=Tg(t,e,n,r,i,a),l=Eg(),t!==null&&!_n?(wg(t,e,a),bi(t,e,a)):(ot&&l&&mg(e),e.flags|=1,zn(t,e,s,a),e.child)}function $b(t,e,n,s,a){if(t===null){var i=n.type;return typeof i=="function"&&!dg(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,IT(t,e,i,s,a)):(t=Fh(n.type,null,s,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!jg(t,a)){var r=i.memoizedProps;if(n=n.compare,n=n!==null?n:au,n(r,s)&&t.ref===e.ref)return bi(t,e,a)}return e.flags|=1,t=ci(i,s),t.ref=e.ref,t.return=e,e.child=t}function IT(t,e,n,s,a){if(t!==null){var i=t.memoizedProps;if(au(i,s)&&t.ref===e.ref)if(_n=!1,e.pendingProps=s=i,jg(t,a))t.flags&131072&&(_n=!0);else return e.lanes=t.lanes,bi(t,e,a)}return Q0(t,e,n,s,a)}function MT(t,e,n,s){var a=s.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if(e.flags&128){if(i=i!==null?i.baseLanes|n:n,t!==null){for(s=e.child=t.child,a=0;s!==null;)a=a|s.lanes|s.childLanes,s=s.sibling;s=a&~i}else s=0,e.child=null;return Fb(t,e,i,n,s)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Hh(e,i!==null?i.cachePool:null),i!==null?Ib(e,i):$0(),Y_(e);else return s=e.lanes=536870912,Fb(t,e,i!==null?i.baseLanes|n:n,n,s)}else i!==null?(Hh(e,i.cachePool),Ib(e,i),zi(),e.memoizedState=null):(t!==null&&Hh(e,null),$0(),zi());return zn(t,e,a,n),e.child}function Ec(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Fb(t,e,n,s,a){var i=yg();return i=i===null?null:{parent:vn._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&Hh(e,null),$0(),Y_(e),t!==null&&$l(t,e,s,!0),e.childLanes=a,null}function Yh(t,e){return e=Cf({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Hb(t,e,n){return co(e,t.child,null,n),t=Yh(e,e.pendingProps),t.flags|=2,Rs(e),e.memoizedState=null,t}function ON(t,e,n){var s=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(ot){if(s.mode==="hidden")return t=Yh(e,s),e.lanes=536870912,Ec(null,t);if(F0(e),(t=Ht)?(t=w2(t,ta),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:pr!==null?{id:Da,overflow:Oa}:null,retryLane:536870912,hydrationErrors:null},n=V_(t),n.return=e,e.child=n,Hn=e,Ht=null)):t=null,t===null)throw gr(e);return e.lanes=536870912,null}return Yh(e,s)}var i=t.memoizedState;if(i!==null){var r=i.dehydrated;if(F0(e),a)if(e.flags&256)e.flags&=-257,e=Hb(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(Y(558));else if(_n||$l(t,e,n,!1),a=(n&t.childLanes)!==0,_n||a){if(s=Dt,s!==null&&(r=c_(s,n),r!==0&&r!==i.retryLane))throw i.retryLane=r,_o(t,r),Ts(s,t,r),Og;Of(),e=Hb(t,e,n)}else t=i.treeContext,Ht=aa(r.nextSibling),Hn=e,ot=!0,nr=null,ta=!1,t!==null&&U_(e,t),e=Yh(e,s),e.flags|=4096;return e}return t=ci(t.child,{mode:s.mode,children:s.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Kh(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(Y(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Q0(t,e,n,s,a){return lo(e),n=Tg(t,e,n,s,void 0,a),s=Eg(),t!==null&&!_n?(wg(t,e,a),bi(t,e,a)):(ot&&s&&mg(e),e.flags|=1,zn(t,e,n,a),e.child)}function qb(t,e,n,s,a,i){return lo(e),e.updateQueue=null,n=Q_(e,s,n,a),K_(t),s=Eg(),t!==null&&!_n?(wg(t,e,i),bi(t,e,i)):(ot&&s&&mg(e),e.flags|=1,zn(t,e,n,i),e.child)}function Gb(t,e,n,s,a){if(lo(e),e.stateNode===null){var i=el,r=n.contextType;typeof r=="object"&&r!==null&&(i=Gn(r)),i=new n(s,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Y0,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=s,i.state=e.memoizedState,i.refs={},vg(e),r=n.contextType,i.context=typeof r=="object"&&r!==null?Gn(r):el,i.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Am(e,n,r,s),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(r=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),r!==i.state&&Y0.enqueueReplaceState(i,i.state,null),Lc(e,s,i,a),Vc(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),s=!0}else if(t===null){i=e.stateNode;var l=e.memoizedProps,c=ho(n,l);i.props=c;var h=i.context,d=n.contextType;r=el,typeof d=="object"&&d!==null&&(r=Gn(d));var p=n.getDerivedStateFromProps;d=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function",l=e.pendingProps!==l,d||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l||h!==r)&&Ub(e,i,s,r),Li=!1;var g=e.memoizedState;i.state=g,Lc(e,s,i,a),Vc(),h=e.memoizedState,l||g!==h||Li?(typeof p=="function"&&(Am(e,n,p,s),h=e.memoizedState),(c=Li||Lb(e,n,c,s,g,h,r))?(d||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=s,e.memoizedState=h),i.props=s,i.state=h,i.context=r,s=c):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),s=!1)}else{i=e.stateNode,B0(t,e),r=e.memoizedProps,d=ho(n,r),i.props=d,p=e.pendingProps,g=i.context,h=n.contextType,c=el,typeof h=="object"&&h!==null&&(c=Gn(h)),l=n.getDerivedStateFromProps,(h=typeof l=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r!==p||g!==c)&&Ub(e,i,s,c),Li=!1,g=e.memoizedState,i.state=g,Lc(e,s,i,a),Vc();var y=e.memoizedState;r!==p||g!==y||Li||t!==null&&t.dependencies!==null&&Ef(t.dependencies)?(typeof l=="function"&&(Am(e,n,l,s),y=e.memoizedState),(d=Li||Lb(e,n,d,s,g,y,c)||t!==null&&t.dependencies!==null&&Ef(t.dependencies))?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(s,y,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(s,y,c)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=s,e.memoizedState=y),i.props=s,i.state=y,i.context=c,s=d):(typeof i.componentDidUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),s=!1)}return i=s,Kh(t,e),s=(e.flags&128)!==0,i||s?(i=e.stateNode,n=s&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&s?(e.child=co(e,t.child,null,a),e.child=co(e,null,n,a)):zn(t,e,n,a),e.memoizedState=i.state,t=e.child):t=bi(t,e,a),t}function Yb(t,e,n,s){return oo(),e.flags|=256,zn(t,e,n,s),e.child}var Nm={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Rm(t){return{baseLanes:t,cachePool:z_()}}function km(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=Is),t}function DT(t,e,n){var s=e.pendingProps,a=!1,i=(e.flags&128)!==0,r;if((r=i)||(r=t!==null&&t.memoizedState===null?!1:(hn.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(ot){if(a?Bi(e):zi(),(t=Ht)?(t=w2(t,ta),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:pr!==null?{id:Da,overflow:Oa}:null,retryLane:536870912,hydrationErrors:null},n=V_(t),n.return=e,e.child=n,Hn=e,Ht=null)):t=null,t===null)throw gr(e);return cp(t)?e.lanes=32:e.lanes=536870912,null}var l=s.children;return s=s.fallback,a?(zi(),a=e.mode,l=Cf({mode:"hidden",children:l},a),s=to(s,a,n,null),l.return=e,s.return=e,l.sibling=s,e.child=l,s=e.child,s.memoizedState=Rm(n),s.childLanes=km(t,r,n),e.memoizedState=Nm,Ec(null,s)):(Bi(e),X0(e,l))}var c=t.memoizedState;if(c!==null&&(l=c.dehydrated,l!==null)){if(i)e.flags&256?(Bi(e),e.flags&=-257,e=Cm(t,e,n)):e.memoizedState!==null?(zi(),e.child=t.child,e.flags|=128,e=null):(zi(),l=s.fallback,a=e.mode,s=Cf({mode:"visible",children:s.children},a),l=to(l,a,n,null),l.flags|=2,s.return=e,l.return=e,s.sibling=l,e.child=s,co(e,t.child,null,n),s=e.child,s.memoizedState=Rm(n),s.childLanes=km(t,r,n),e.memoizedState=Nm,e=Ec(null,s));else if(Bi(e),cp(l)){if(r=l.nextSibling&&l.nextSibling.dataset,r)var h=r.dgst;r=h,s=Error(Y(419)),s.stack="",s.digest=r,ru({value:s,source:null,stack:null}),e=Cm(t,e,n)}else if(_n||$l(t,e,n,!1),r=(n&t.childLanes)!==0,_n||r){if(r=Dt,r!==null&&(s=c_(r,n),s!==0&&s!==c.retryLane))throw c.retryLane=s,_o(t,s),Ts(r,t,s),Og;lp(l)||Of(),e=Cm(t,e,n)}else lp(l)?(e.flags|=192,e.child=t.child,e=null):(t=c.treeContext,Ht=aa(l.nextSibling),Hn=e,ot=!0,nr=null,ta=!1,t!==null&&U_(e,t),e=X0(e,s.children),e.flags|=4096);return e}return a?(zi(),l=s.fallback,a=e.mode,c=t.child,h=c.sibling,s=ci(c,{mode:"hidden",children:s.children}),s.subtreeFlags=c.subtreeFlags&65011712,h!==null?l=ci(h,l):(l=to(l,a,n,null),l.flags|=2),l.return=e,s.return=e,s.sibling=l,e.child=s,Ec(null,s),s=e.child,l=t.child.memoizedState,l===null?l=Rm(n):(a=l.cachePool,a!==null?(c=vn._currentValue,a=a.parent!==c?{parent:c,pool:c}:a):a=z_(),l={baseLanes:l.baseLanes|n,cachePool:a}),s.memoizedState=l,s.childLanes=km(t,r,n),e.memoizedState=Nm,Ec(t.child,s)):(Bi(e),n=t.child,t=n.sibling,n=ci(n,{mode:"visible",children:s.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function X0(t,e){return e=Cf({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Cf(t,e){return t=Cs(22,t,null,e),t.lanes=0,t}function Cm(t,e,n){return co(e,t.child,null,n),t=X0(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Kb(t,e,n){t.lanes|=e;var s=t.alternate;s!==null&&(s.lanes|=e),V0(t.return,e,n)}function Im(t,e,n,s,a,i){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:a,treeForkCount:i}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=s,r.tail=n,r.tailMode=a,r.treeForkCount=i)}function OT(t,e,n){var s=e.pendingProps,a=s.revealOrder,i=s.tail;s=s.children;var r=hn.current,l=(r&2)!==0;if(l?(r=r&1|2,e.flags|=128):r&=1,Vt(hn,r),zn(t,e,s,n),s=ot?iu:0,!l&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Kb(t,n,e);else if(t.tag===19)Kb(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&Af(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Im(e,!1,a,n,i,s);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Af(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Im(e,!0,n,null,i,s);break;case"together":Im(e,!1,null,null,void 0,s);break;default:e.memoizedState=null}return e.child}function bi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),br|=e.lanes,!(n&e.childLanes))if(t!==null){if($l(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(Y(153));if(e.child!==null){for(t=e.child,n=ci(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ci(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function jg(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Ef(t)))}function jN(t,e,n){switch(e.tag){case 3:gf(e,e.stateNode.containerInfo),Ui(e,vn,t.memoizedState.cache),oo();break;case 27:case 5:w0(e);break;case 4:gf(e,e.stateNode.containerInfo);break;case 10:Ui(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,F0(e),null;break;case 13:var s=e.memoizedState;if(s!==null)return s.dehydrated!==null?(Bi(e),e.flags|=128,null):n&e.child.childLanes?DT(t,e,n):(Bi(e),t=bi(t,e,n),t!==null?t.sibling:null);Bi(e);break;case 19:var a=(t.flags&128)!==0;if(s=(n&e.childLanes)!==0,s||($l(t,e,n,!1),s=(n&e.childLanes)!==0),a){if(s)return OT(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Vt(hn,hn.current),s)break;return null;case 22:return e.lanes=0,MT(t,e,n,e.pendingProps);case 24:Ui(e,vn,t.memoizedState.cache)}return bi(t,e,n)}function jT(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)_n=!0;else{if(!jg(t,n)&&!(e.flags&128))return _n=!1,jN(t,e,n);_n=!!(t.flags&131072)}else _n=!1,ot&&e.flags&1048576&&L_(e,iu,e.index);switch(e.lanes=0,e.tag){case 16:e:{var s=e.pendingProps;if(t=Kr(e.elementType),e.type=t,typeof t=="function")dg(t)?(s=ho(t,s),e.tag=1,e=Gb(null,e,t,s,n)):(e.tag=0,e=Q0(null,e,t,s,n));else{if(t!=null){var a=t.$$typeof;if(a===Zp){e.tag=11,e=zb(null,e,t,s,n);break e}else if(a===eg){e.tag=14,e=$b(null,e,t,s,n);break e}}throw e=T0(t)||t,Error(Y(306,e,""))}}return e;case 0:return Q0(t,e,e.type,e.pendingProps,n);case 1:return s=e.type,a=ho(s,e.pendingProps),Gb(t,e,s,a,n);case 3:e:{if(gf(e,e.stateNode.containerInfo),t===null)throw Error(Y(387));s=e.pendingProps;var i=e.memoizedState;a=i.element,B0(t,e),Lc(e,s,null,n);var r=e.memoizedState;if(s=r.cache,Ui(e,vn,s),s!==i.cache&&L0(e,[vn],n,!0),Vc(),s=r.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Yb(t,e,s,n);break e}else if(s!==a){a=ea(Error(Y(424)),e),ru(a),e=Yb(t,e,s,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Ht=aa(t.firstChild),Hn=e,ot=!0,nr=null,ta=!0,n=H_(e,null,s,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(oo(),s===a){e=bi(t,e,n);break e}zn(t,e,s,n)}e=e.child}return e;case 26:return Kh(t,e),t===null?(n=mv(e.type,null,e.pendingProps,null))?e.memoizedState=n:ot||(n=e.type,t=e.pendingProps,s=Lf(tr.current).createElement(n),s[Fn]=e,s[Es]=t,Yn(s,n,t),On(s),e.stateNode=s):e.memoizedState=mv(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return w0(e),t===null&&ot&&(s=e.stateNode=S2(e.type,e.pendingProps,tr.current),Hn=e,ta=!0,a=Ht,kr(e.type)?(up=a,Ht=aa(s.firstChild)):Ht=a),zn(t,e,e.pendingProps.children,n),Kh(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&ot&&((a=s=Ht)&&(s=hR(s,e.type,e.pendingProps,ta),s!==null?(e.stateNode=s,Hn=e,Ht=aa(s.firstChild),ta=!1,a=!0):a=!1),a||gr(e)),w0(e),a=e.type,i=e.pendingProps,r=t!==null?t.memoizedProps:null,s=i.children,rp(a,i)?s=null:r!==null&&rp(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=Tg(t,e,AN,null,null,n),fu._currentValue=a),Kh(t,e),zn(t,e,s,n),e.child;case 6:return t===null&&ot&&((t=n=Ht)&&(n=fR(n,e.pendingProps,ta),n!==null?(e.stateNode=n,Hn=e,Ht=null,t=!0):t=!1),t||gr(e)),null;case 13:return DT(t,e,n);case 4:return gf(e,e.stateNode.containerInfo),s=e.pendingProps,t===null?e.child=co(e,null,s,n):zn(t,e,s,n),e.child;case 11:return zb(t,e,e.type,e.pendingProps,n);case 7:return zn(t,e,e.pendingProps,n),e.child;case 8:return zn(t,e,e.pendingProps.children,n),e.child;case 12:return zn(t,e,e.pendingProps.children,n),e.child;case 10:return s=e.pendingProps,Ui(e,e.type,s.value),zn(t,e,s.children,n),e.child;case 9:return a=e.type._context,s=e.pendingProps.children,lo(e),a=Gn(a),s=s(a),e.flags|=1,zn(t,e,s,n),e.child;case 14:return $b(t,e,e.type,e.pendingProps,n);case 15:return IT(t,e,e.type,e.pendingProps,n);case 19:return OT(t,e,n);case 31:return ON(t,e,n);case 22:return MT(t,e,n,e.pendingProps);case 24:return lo(e),s=Gn(vn),t===null?(a=yg(),a===null&&(a=Dt,i=gg(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=n),a=i),e.memoizedState={parent:s,cache:a},vg(e),Ui(e,vn,a)):(t.lanes&n&&(B0(t,e),Lc(e,null,null,n),Vc()),a=t.memoizedState,i=e.memoizedState,a.parent!==s?(a={parent:s,cache:s},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),Ui(e,vn,s)):(s=i.cache,Ui(e,vn,s),s!==a.cache&&L0(e,[vn],n,!0))),zn(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(Y(156,e.tag))}function Ja(t){t.flags|=4}function Mm(t,e,n,s,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(i2())t.flags|=8192;else throw so=wf,bg}else t.flags&=-16777217}function Qb(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!R2(e))if(i2())t.flags|=8192;else throw so=wf,bg}function Th(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?r_():536870912,t.lanes|=e,Sl|=e)}function mc(t,e){if(!ot)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null}}function $t(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,s=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags&65011712,s|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=s,t.childLanes=n,e}function PN(t,e,n){var s=e.pendingProps;switch(pg(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $t(e),null;case 1:return $t(e),null;case 3:return n=e.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),e.memoizedState.cache!==s&&(e.flags|=2048),ui(vn),vl(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Po(e)?Ja(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Em())),$t(e),null;case 26:var a=e.type,i=e.memoizedState;return t===null?(Ja(e),i!==null?($t(e),Qb(e,i)):($t(e),Mm(e,a,null,s,n))):i?i!==t.memoizedState?(Ja(e),$t(e),Qb(e,i)):($t(e),e.flags&=-16777217):(t=t.memoizedProps,t!==s&&Ja(e),$t(e),Mm(e,a,t,s,n)),null;case 27:if(yf(e),n=tr.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&Ja(e);else{if(!s){if(e.stateNode===null)throw Error(Y(166));return $t(e),null}t=Pa.current,Po(e)?wb(e):(t=S2(a,s,n),e.stateNode=t,Ja(e))}return $t(e),null;case 5:if(yf(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&Ja(e);else{if(!s){if(e.stateNode===null)throw Error(Y(166));return $t(e),null}if(i=Pa.current,Po(e))wb(e);else{var r=Lf(tr.current);switch(i){case 1:i=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=r.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof s.is=="string"?r.createElement("select",{is:s.is}):r.createElement("select"),s.multiple?i.multiple=!0:s.size&&(i.size=s.size);break;default:i=typeof s.is=="string"?r.createElement(a,{is:s.is}):r.createElement(a)}}i[Fn]=e,i[Es]=s;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)i.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=i;e:switch(Yn(i,a,s),a){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}s&&Ja(e)}}return $t(e),Mm(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==s&&Ja(e);else{if(typeof s!="string"&&e.stateNode===null)throw Error(Y(166));if(t=tr.current,Po(e)){if(t=e.stateNode,n=e.memoizedProps,s=null,a=Hn,a!==null)switch(a.tag){case 27:case 5:s=a.memoizedProps}t[Fn]=e,t=!!(t.nodeValue===n||s!==null&&s.suppressHydrationWarning===!0||_2(t.nodeValue,n)),t||gr(e,!0)}else t=Lf(t).createTextNode(s),t[Fn]=e,e.stateNode=t}return $t(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(s=Po(e),n!==null){if(t===null){if(!s)throw Error(Y(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(Y(557));t[Fn]=e}else oo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;$t(e),t=!1}else n=Em(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Rs(e),e):(Rs(e),null);if(e.flags&128)throw Error(Y(558))}return $t(e),null;case 13:if(s=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=Po(e),s!==null&&s.dehydrated!==null){if(t===null){if(!a)throw Error(Y(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(Y(317));a[Fn]=e}else oo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;$t(e),a=!1}else a=Em(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(Rs(e),e):(Rs(e),null)}return Rs(e),e.flags&128?(e.lanes=n,e):(n=s!==null,t=t!==null&&t.memoizedState!==null,n&&(s=e.child,a=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(a=s.alternate.memoizedState.cachePool.pool),i=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(i=s.memoizedState.cachePool.pool),i!==a&&(s.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Th(e,e.updateQueue),$t(e),null);case 4:return vl(),t===null&&$g(e.stateNode.containerInfo),$t(e),null;case 10:return ui(e.type),$t(e),null;case 19:if(jn(hn),s=e.memoizedState,s===null)return $t(e),null;if(a=(e.flags&128)!==0,i=s.rendering,i===null)if(a)mc(s,!1);else{if(rn!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(i=Af(t),i!==null){for(e.flags|=128,mc(s,!1),t=i.updateQueue,e.updateQueue=t,Th(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)P_(n,t),n=n.sibling;return Vt(hn,hn.current&1|2),ot&&ni(e,s.treeForkCount),e.child}t=t.sibling}s.tail!==null&&Ds()>Mf&&(e.flags|=128,a=!0,mc(s,!1),e.lanes=4194304)}else{if(!a)if(t=Af(i),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,Th(e,t),mc(s,!0),s.tail===null&&s.tailMode==="hidden"&&!i.alternate&&!ot)return $t(e),null}else 2*Ds()-s.renderingStartTime>Mf&&n!==536870912&&(e.flags|=128,a=!0,mc(s,!1),e.lanes=4194304);s.isBackwards?(i.sibling=e.child,e.child=i):(t=s.last,t!==null?t.sibling=i:e.child=i,s.last=i)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Ds(),t.sibling=null,n=hn.current,Vt(hn,a?n&1|2:n&1),ot&&ni(e,s.treeForkCount),t):($t(e),null);case 22:case 23:return Rs(e),xg(),s=e.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(e.flags|=8192):s&&(e.flags|=8192),s?n&536870912&&!(e.flags&128)&&($t(e),e.subtreeFlags&6&&(e.flags|=8192)):$t(e),n=e.updateQueue,n!==null&&Th(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),s=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),s!==n&&(e.flags|=2048),t!==null&&jn(no),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),ui(vn),$t(e),null;case 25:return null;case 30:return null}throw Error(Y(156,e.tag))}function VN(t,e){switch(pg(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ui(vn),vl(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return yf(e),null;case 31:if(e.memoizedState!==null){if(Rs(e),e.alternate===null)throw Error(Y(340));oo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Rs(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(Y(340));oo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return jn(hn),null;case 4:return vl(),null;case 10:return ui(e.type),null;case 22:case 23:return Rs(e),xg(),t!==null&&jn(no),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return ui(vn),null;case 25:return null;default:return null}}function PT(t,e){switch(pg(e),e.tag){case 3:ui(vn),vl();break;case 26:case 27:case 5:yf(e);break;case 4:vl();break;case 31:e.memoizedState!==null&&Rs(e);break;case 13:Rs(e);break;case 19:jn(hn);break;case 10:ui(e.type);break;case 22:case 23:Rs(e),xg(),t!==null&&jn(no);break;case 24:ui(vn)}}function Ou(t,e){try{var n=e.updateQueue,s=n!==null?n.lastEffect:null;if(s!==null){var a=s.next;n=a;do{if((n.tag&t)===t){s=void 0;var i=n.create,r=n.inst;s=i(),r.destroy=s}n=n.next}while(n!==a)}}catch(l){wt(e,e.return,l)}}function yr(t,e,n){try{var s=e.updateQueue,a=s!==null?s.lastEffect:null;if(a!==null){var i=a.next;s=i;do{if((s.tag&t)===t){var r=s.inst,l=r.destroy;if(l!==void 0){r.destroy=void 0,a=e;var c=n,h=l;try{h()}catch(d){wt(a,c,d)}}}s=s.next}while(s!==i)}}catch(d){wt(e,e.return,d)}}function VT(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{G_(e,n)}catch(s){wt(t,t.return,s)}}}function LT(t,e,n){n.props=ho(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(s){wt(t,e,s)}}function Bc(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:s=t.stateNode;break;default:s=t.stateNode}typeof n=="function"?t.refCleanup=n(s):n.current=s}}catch(a){wt(t,e,a)}}function ja(t,e){var n=t.ref,s=t.refCleanup;if(n!==null)if(typeof s=="function")try{s()}catch(a){wt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){wt(t,e,a)}else n.current=null}function UT(t){var e=t.type,n=t.memoizedProps,s=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&s.focus();break e;case"img":n.src?s.src=n.src:n.srcSet&&(s.srcset=n.srcSet)}}catch(a){wt(t,t.return,a)}}function Dm(t,e,n){try{var s=t.stateNode;iR(s,t.type,n,e),s[Es]=e}catch(a){wt(t,t.return,a)}}function BT(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&kr(t.type)||t.tag===4}function Om(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||BT(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&kr(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function W0(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ii));else if(s!==4&&(s===27&&kr(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(W0(t,e,n),t=t.sibling;t!==null;)W0(t,e,n),t=t.sibling}function If(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(s!==4&&(s===27&&kr(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(If(t,e,n),t=t.sibling;t!==null;)If(t,e,n),t=t.sibling}function zT(t){var e=t.stateNode,n=t.memoizedProps;try{for(var s=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Yn(e,s,n),e[Fn]=t,e[Es]=n}catch(i){wt(t,t.return,i)}}var si=!1,bn=!1,jm=!1,Xb=typeof WeakSet=="function"?WeakSet:Set,Dn=null;function LN(t,e){if(t=t.containerInfo,ap=$f,t=R_(t),ug(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var a=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var r=0,l=-1,c=-1,h=0,d=0,p=t,g=null;t:for(;;){for(var y;p!==n||a!==0&&p.nodeType!==3||(l=r+a),p!==i||s!==0&&p.nodeType!==3||(c=r+s),p.nodeType===3&&(r+=p.nodeValue.length),(y=p.firstChild)!==null;)g=p,p=y;for(;;){if(p===t)break t;if(g===n&&++h===a&&(l=r),g===i&&++d===s&&(c=r),(y=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=y}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ip={focusedElem:t,selectionRange:n},$f=!1,Dn=e;Dn!==null;)if(e=Dn,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Dn=t;else for(;Dn!==null;){switch(e=Dn,i=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&i!==null){t=void 0,n=e,a=i.memoizedProps,i=i.memoizedState,s=n.stateNode;try{var C=ho(n.type,a);t=s.getSnapshotBeforeUpdate(C,i),s.__reactInternalSnapshotBeforeUpdate=t}catch(I){wt(n,n.return,I)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)op(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":op(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(Y(163))}if(t=e.sibling,t!==null){t.return=e.return,Dn=t;break}Dn=e.return}}function $T(t,e,n){var s=n.flags;switch(n.tag){case 0:case 11:case 15:ei(t,n),s&4&&Ou(5,n);break;case 1:if(ei(t,n),s&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){wt(n,n.return,r)}else{var a=ho(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){wt(n,n.return,r)}}s&64&&VT(n),s&512&&Bc(n,n.return);break;case 3:if(ei(t,n),s&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{G_(t,e)}catch(r){wt(n,n.return,r)}}break;case 27:e===null&&s&4&&zT(n);case 26:case 5:ei(t,n),e===null&&s&4&&UT(n),s&512&&Bc(n,n.return);break;case 12:ei(t,n);break;case 31:ei(t,n),s&4&&qT(t,n);break;case 13:ei(t,n),s&4&&GT(t,n),s&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=YN.bind(null,n),dR(t,n))));break;case 22:if(s=n.memoizedState!==null||si,!s){e=e!==null&&e.memoizedState!==null||bn,a=si;var i=bn;si=s,(bn=e)&&!i?ti(t,n,(n.subtreeFlags&8772)!==0):ei(t,n),si=a,bn=i}break;case 30:break;default:ei(t,n)}}function FT(t){var e=t.alternate;e!==null&&(t.alternate=null,FT(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ag(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Xt=null,ys=!1;function Za(t,e,n){for(n=n.child;n!==null;)HT(t,e,n),n=n.sibling}function HT(t,e,n){if(Os&&typeof Os.onCommitFiberUnmount=="function")try{Os.onCommitFiberUnmount(Nu,n)}catch{}switch(n.tag){case 26:bn||ja(n,e),Za(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:bn||ja(n,e);var s=Xt,a=ys;kr(n.type)&&(Xt=n.stateNode,ys=!1),Za(t,e,n),Hc(n.stateNode),Xt=s,ys=a;break;case 5:bn||ja(n,e);case 6:if(s=Xt,a=ys,Xt=null,Za(t,e,n),Xt=s,ys=a,Xt!==null)if(ys)try{(Xt.nodeType===9?Xt.body:Xt.nodeName==="HTML"?Xt.ownerDocument.body:Xt).removeChild(n.stateNode)}catch(i){wt(n,e,i)}else try{Xt.removeChild(n.stateNode)}catch(i){wt(n,e,i)}break;case 18:Xt!==null&&(ys?(t=Xt,cv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),kl(t)):cv(Xt,n.stateNode));break;case 4:s=Xt,a=ys,Xt=n.stateNode.containerInfo,ys=!0,Za(t,e,n),Xt=s,ys=a;break;case 0:case 11:case 14:case 15:yr(2,n,e),bn||yr(4,n,e),Za(t,e,n);break;case 1:bn||(ja(n,e),s=n.stateNode,typeof s.componentWillUnmount=="function"&&LT(n,e,s)),Za(t,e,n);break;case 21:Za(t,e,n);break;case 22:bn=(s=bn)||n.memoizedState!==null,Za(t,e,n),bn=s;break;default:Za(t,e,n)}}function qT(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{kl(t)}catch(n){wt(e,e.return,n)}}}function GT(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{kl(t)}catch(n){wt(e,e.return,n)}}function UN(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Xb),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Xb),e;default:throw Error(Y(435,t.tag))}}function Eh(t,e){var n=UN(t);e.forEach(function(s){if(!n.has(s)){n.add(s);var a=KN.bind(null,t,s);s.then(a,a)}})}function ps(t,e){var n=e.deletions;if(n!==null)for(var s=0;s<n.length;s++){var a=n[s],i=t,r=e,l=r;e:for(;l!==null;){switch(l.tag){case 27:if(kr(l.type)){Xt=l.stateNode,ys=!1;break e}break;case 5:Xt=l.stateNode,ys=!1;break e;case 3:case 4:Xt=l.stateNode.containerInfo,ys=!0;break e}l=l.return}if(Xt===null)throw Error(Y(160));HT(i,r,a),Xt=null,ys=!1,i=a.alternate,i!==null&&(i.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)YT(e,t),e=e.sibling}var pa=null;function YT(t,e){var n=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:ps(e,t),gs(t),s&4&&(yr(3,t,t.return),Ou(3,t),yr(5,t,t.return));break;case 1:ps(e,t),gs(t),s&512&&(bn||n===null||ja(n,n.return)),s&64&&si&&(t=t.updateQueue,t!==null&&(s=t.callbacks,s!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?s:n.concat(s))));break;case 26:var a=pa;if(ps(e,t),gs(t),s&512&&(bn||n===null||ja(n,n.return)),s&4){var i=n!==null?n.memoizedState:null;if(s=t.memoizedState,n===null)if(s===null)if(t.stateNode===null){e:{s=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(s){case"title":i=a.getElementsByTagName("title")[0],(!i||i[Cu]||i[Fn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(s),a.head.insertBefore(i,a.querySelector("head > title"))),Yn(i,s,n),i[Fn]=t,On(i),s=i;break e;case"link":var r=gv("link","href",a).get(s+(n.href||""));if(r){for(var l=0;l<r.length;l++)if(i=r[l],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(l,1);break t}}i=a.createElement(s),Yn(i,s,n),a.head.appendChild(i);break;case"meta":if(r=gv("meta","content",a).get(s+(n.content||""))){for(l=0;l<r.length;l++)if(i=r[l],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(l,1);break t}}i=a.createElement(s),Yn(i,s,n),a.head.appendChild(i);break;default:throw Error(Y(468,s))}i[Fn]=t,On(i),s=i}t.stateNode=s}else yv(a,t.type,t.stateNode);else t.stateNode=pv(a,s,t.memoizedProps);else i!==s?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,s===null?yv(a,t.type,t.stateNode):pv(a,s,t.memoizedProps)):s===null&&t.stateNode!==null&&Dm(t,t.memoizedProps,n.memoizedProps)}break;case 27:ps(e,t),gs(t),s&512&&(bn||n===null||ja(n,n.return)),n!==null&&s&4&&Dm(t,t.memoizedProps,n.memoizedProps);break;case 5:if(ps(e,t),gs(t),s&512&&(bn||n===null||ja(n,n.return)),t.flags&32){a=t.stateNode;try{_l(a,"")}catch(C){wt(t,t.return,C)}}s&4&&t.stateNode!=null&&(a=t.memoizedProps,Dm(t,a,n!==null?n.memoizedProps:a)),s&1024&&(jm=!0);break;case 6:if(ps(e,t),gs(t),s&4){if(t.stateNode===null)throw Error(Y(162));s=t.memoizedProps,n=t.stateNode;try{n.nodeValue=s}catch(C){wt(t,t.return,C)}}break;case 3:if(Wh=null,a=pa,pa=Uf(e.containerInfo),ps(e,t),pa=a,gs(t),s&4&&n!==null&&n.memoizedState.isDehydrated)try{kl(e.containerInfo)}catch(C){wt(t,t.return,C)}jm&&(jm=!1,KT(t));break;case 4:s=pa,pa=Uf(t.stateNode.containerInfo),ps(e,t),gs(t),pa=s;break;case 12:ps(e,t),gs(t);break;case 31:ps(e,t),gs(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Eh(t,s)));break;case 13:ps(e,t),gs(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Rd=Ds()),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Eh(t,s)));break;case 22:a=t.memoizedState!==null;var c=n!==null&&n.memoizedState!==null,h=si,d=bn;if(si=h||a,bn=d||c,ps(e,t),bn=d,si=h,gs(t),s&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||c||si||bn||Qr(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){c=n=e;try{if(i=c.stateNode,a)r=i.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{l=c.stateNode;var p=c.memoizedProps.style,g=p!=null&&p.hasOwnProperty("display")?p.display:null;l.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(C){wt(c,c.return,C)}}}else if(e.tag===6){if(n===null){c=e;try{c.stateNode.nodeValue=a?"":c.memoizedProps}catch(C){wt(c,c.return,C)}}}else if(e.tag===18){if(n===null){c=e;try{var y=c.stateNode;a?uv(y,!0):uv(c.stateNode,!1)}catch(C){wt(c,c.return,C)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}s&4&&(s=t.updateQueue,s!==null&&(n=s.retryQueue,n!==null&&(s.retryQueue=null,Eh(t,n))));break;case 19:ps(e,t),gs(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Eh(t,s)));break;case 30:break;case 21:break;default:ps(e,t),gs(t)}}function gs(t){var e=t.flags;if(e&2){try{for(var n,s=t.return;s!==null;){if(BT(s)){n=s;break}s=s.return}if(n==null)throw Error(Y(160));switch(n.tag){case 27:var a=n.stateNode,i=Om(t);If(t,i,a);break;case 5:var r=n.stateNode;n.flags&32&&(_l(r,""),n.flags&=-33);var l=Om(t);If(t,l,r);break;case 3:case 4:var c=n.stateNode.containerInfo,h=Om(t);W0(t,h,c);break;default:throw Error(Y(161))}}catch(d){wt(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function KT(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;KT(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function ei(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)$T(t,e.alternate,e),e=e.sibling}function Qr(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:yr(4,e,e.return),Qr(e);break;case 1:ja(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&LT(e,e.return,n),Qr(e);break;case 27:Hc(e.stateNode);case 26:case 5:ja(e,e.return),Qr(e);break;case 22:e.memoizedState===null&&Qr(e);break;case 30:Qr(e);break;default:Qr(e)}t=t.sibling}}function ti(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var s=e.alternate,a=t,i=e,r=i.flags;switch(i.tag){case 0:case 11:case 15:ti(a,i,n),Ou(4,i);break;case 1:if(ti(a,i,n),s=i,a=s.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(h){wt(s,s.return,h)}if(s=i,a=s.updateQueue,a!==null){var l=s.stateNode;try{var c=a.shared.hiddenCallbacks;if(c!==null)for(a.shared.hiddenCallbacks=null,a=0;a<c.length;a++)q_(c[a],l)}catch(h){wt(s,s.return,h)}}n&&r&64&&VT(i),Bc(i,i.return);break;case 27:zT(i);case 26:case 5:ti(a,i,n),n&&s===null&&r&4&&UT(i),Bc(i,i.return);break;case 12:ti(a,i,n);break;case 31:ti(a,i,n),n&&r&4&&qT(a,i);break;case 13:ti(a,i,n),n&&r&4&&GT(a,i);break;case 22:i.memoizedState===null&&ti(a,i,n),Bc(i,i.return);break;case 30:break;default:ti(a,i,n)}e=e.sibling}}function Pg(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Mu(n))}function Vg(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Mu(t))}function ma(t,e,n,s){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)QT(t,e,n,s),e=e.sibling}function QT(t,e,n,s){var a=e.flags;switch(e.tag){case 0:case 11:case 15:ma(t,e,n,s),a&2048&&Ou(9,e);break;case 1:ma(t,e,n,s);break;case 3:ma(t,e,n,s),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Mu(t)));break;case 12:if(a&2048){ma(t,e,n,s),t=e.stateNode;try{var i=e.memoizedProps,r=i.id,l=i.onPostCommit;typeof l=="function"&&l(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(c){wt(e,e.return,c)}}else ma(t,e,n,s);break;case 31:ma(t,e,n,s);break;case 13:ma(t,e,n,s);break;case 23:break;case 22:i=e.stateNode,r=e.alternate,e.memoizedState!==null?i._visibility&2?ma(t,e,n,s):zc(t,e):i._visibility&2?ma(t,e,n,s):(i._visibility|=2,Bo(t,e,n,s,(e.subtreeFlags&10256)!==0||!1)),a&2048&&Pg(r,e);break;case 24:ma(t,e,n,s),a&2048&&Vg(e.alternate,e);break;default:ma(t,e,n,s)}}function Bo(t,e,n,s,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,r=e,l=n,c=s,h=r.flags;switch(r.tag){case 0:case 11:case 15:Bo(i,r,l,c,a),Ou(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?Bo(i,r,l,c,a):zc(i,r):(d._visibility|=2,Bo(i,r,l,c,a)),a&&h&2048&&Pg(r.alternate,r);break;case 24:Bo(i,r,l,c,a),a&&h&2048&&Vg(r.alternate,r);break;default:Bo(i,r,l,c,a)}e=e.sibling}}function zc(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,s=e,a=s.flags;switch(s.tag){case 22:zc(n,s),a&2048&&Pg(s.alternate,s);break;case 24:zc(n,s),a&2048&&Vg(s.alternate,s);break;default:zc(n,s)}e=e.sibling}}var wc=8192;function Vo(t,e,n){if(t.subtreeFlags&wc)for(t=t.child;t!==null;)XT(t,e,n),t=t.sibling}function XT(t,e,n){switch(t.tag){case 26:Vo(t,e,n),t.flags&wc&&t.memoizedState!==null&&SR(n,pa,t.memoizedState,t.memoizedProps);break;case 5:Vo(t,e,n);break;case 3:case 4:var s=pa;pa=Uf(t.stateNode.containerInfo),Vo(t,e,n),pa=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=wc,wc=16777216,Vo(t,e,n),wc=s):Vo(t,e,n));break;default:Vo(t,e,n)}}function WT(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function pc(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];Dn=s,ZT(s,t)}WT(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)JT(t),t=t.sibling}function JT(t){switch(t.tag){case 0:case 11:case 15:pc(t),t.flags&2048&&yr(9,t,t.return);break;case 3:pc(t);break;case 12:pc(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Qh(t)):pc(t);break;default:pc(t)}}function Qh(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];Dn=s,ZT(s,t)}WT(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:yr(8,e,e.return),Qh(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Qh(e));break;default:Qh(e)}t=t.sibling}}function ZT(t,e){for(;Dn!==null;){var n=Dn;switch(n.tag){case 0:case 11:case 15:yr(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var s=n.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:Mu(n.memoizedState.cache)}if(s=n.child,s!==null)s.return=n,Dn=s;else e:for(n=t;Dn!==null;){s=Dn;var a=s.sibling,i=s.return;if(FT(s),s===n){Dn=null;break e}if(a!==null){a.return=i,Dn=a;break e}Dn=i}}}var BN={getCacheForType:function(t){var e=Gn(vn),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Gn(vn).controller.signal}},zN=typeof WeakMap=="function"?WeakMap:Map,yt=0,Dt=null,We=null,tt=0,Et=0,Ns=null,Xi=!1,Hl=!1,Lg=!1,vi=0,rn=0,br=0,ao=0,Ug=0,Is=0,Sl=0,$c=null,bs=null,J0=!1,Rd=0,e2=0,Mf=1/0,Df=null,ir=null,An=0,rr=null,Al=null,hi=0,Z0=0,ep=null,t2=null,Fc=0,tp=null;function Ps(){return yt&2&&tt!==0?tt&-tt:Ce.T!==null?zg():u_()}function n2(){if(Is===0)if(!(tt&536870912)||ot){var t=ph;ph<<=1,!(ph&3932160)&&(ph=262144),Is=t}else Is=536870912;return t=Ls.current,t!==null&&(t.flags|=32),Is}function Ts(t,e,n){(t===Dt&&(Et===2||Et===9)||t.cancelPendingCommit!==null)&&(Nl(t,0),Wi(t,tt,Is,!1)),ku(t,n),(!(yt&2)||t!==Dt)&&(t===Dt&&(!(yt&2)&&(ao|=n),rn===4&&Wi(t,tt,Is,!1)),qa(t))}function s2(t,e,n){if(yt&6)throw Error(Y(327));var s=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Ru(t,e),a=s?HN(t,e):Pm(t,e,!0),i=s;do{if(a===0){Hl&&!s&&Wi(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!$N(n)){a=Pm(t,e,!1),i=!1;continue}if(a===2){if(i=e,t.errorRecoveryDisabledLanes&i)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var l=t;a=$c;var c=l.current.memoizedState.isDehydrated;if(c&&(Nl(l,r).flags|=256),r=Pm(l,r,!1),r!==2){if(Lg&&!c){l.errorRecoveryDisabledLanes|=i,ao|=i,a=4;break e}i=bs,bs=a,i!==null&&(bs===null?bs=i:bs.push.apply(bs,i))}a=r}if(i=!1,a!==2)continue}}if(a===1){Nl(t,0),Wi(t,e,0,!0);break}e:{switch(s=t,i=a,i){case 0:case 1:throw Error(Y(345));case 4:if((e&4194048)!==e)break;case 6:Wi(s,e,Is,!Xi);break e;case 2:bs=null;break;case 3:case 5:break;default:throw Error(Y(329))}if((e&62914560)===e&&(a=Rd+300-Ds(),10<a)){if(Wi(s,e,Is,!Xi),yd(s,0,!0)!==0)break e;hi=e,s.timeoutHandle=E2(Wb.bind(null,s,n,bs,Df,J0,e,Is,ao,Sl,Xi,i,"Throttled",-0,0),a);break e}Wb(s,n,bs,Df,J0,e,Is,ao,Sl,Xi,i,null,-0,0)}}break}while(1);qa(t)}function Wb(t,e,n,s,a,i,r,l,c,h,d,p,g,y){if(t.timeoutHandle=-1,p=e.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ii},XT(e,i,p);var C=(i&62914560)===i?Rd-Ds():(i&4194048)===i?e2-Ds():0;if(C=AR(p,C),C!==null){hi=i,t.cancelPendingCommit=C(Zb.bind(null,t,e,i,n,s,a,r,l,c,d,p,null,g,y)),Wi(t,i,r,!h);return}}Zb(t,e,i,n,s,a,r,l,c)}function $N(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var s=0;s<n.length;s++){var a=n[s],i=a.getSnapshot;a=a.value;try{if(!Vs(i(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Wi(t,e,n,s){e&=~Ug,e&=~ao,t.suspendedLanes|=e,t.pingedLanes&=~e,s&&(t.warmLanes|=e),s=t.expirationTimes;for(var a=e;0<a;){var i=31-js(a),r=1<<i;s[i]=-1,a&=~r}n!==0&&o_(t,n,e)}function kd(){return yt&6?!0:(ju(0,!1),!1)}function Bg(){if(We!==null){if(Et===0)var t=We.return;else t=We,ri=To=null,Sg(t),hl=null,ou=0,t=We;for(;t!==null;)PT(t.alternate,t),t=t.return;We=null}}function Nl(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,lR(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),hi=0,Bg(),Dt=t,We=n=ci(t.current,null),tt=e,Et=0,Ns=null,Xi=!1,Hl=Ru(t,e),Lg=!1,Sl=Is=Ug=ao=br=rn=0,bs=$c=null,J0=!1,e&8&&(e|=e&32);var s=t.entangledLanes;if(s!==0)for(t=t.entanglements,s&=e;0<s;){var a=31-js(s),i=1<<a;e|=t[a],s&=~i}return vi=e,_d(),n}function a2(t,e){Be=null,Ce.H=cu,e===Fl||e===Ed?(e=kb(),Et=3):e===bg?(e=kb(),Et=4):Et=e===Og?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Ns=e,We===null&&(rn=1,kf(t,ea(e,t.current)))}function i2(){var t=Ls.current;return t===null?!0:(tt&4194048)===tt?sa===null:(tt&62914560)===tt||tt&536870912?t===sa:!1}function r2(){var t=Ce.H;return Ce.H=cu,t===null?cu:t}function o2(){var t=Ce.A;return Ce.A=BN,t}function Of(){rn=4,Xi||(tt&4194048)!==tt&&Ls.current!==null||(Hl=!0),!(br&134217727)&&!(ao&134217727)||Dt===null||Wi(Dt,tt,Is,!1)}function Pm(t,e,n){var s=yt;yt|=2;var a=r2(),i=o2();(Dt!==t||tt!==e)&&(Df=null,Nl(t,e)),e=!1;var r=rn;e:do try{if(Et!==0&&We!==null){var l=We,c=Ns;switch(Et){case 8:Bg(),r=6;break e;case 3:case 2:case 9:case 6:Ls.current===null&&(e=!0);var h=Et;if(Et=0,Ns=null,sl(t,l,c,h),n&&Hl){r=0;break e}break;default:h=Et,Et=0,Ns=null,sl(t,l,c,h)}}FN(),r=rn;break}catch(d){a2(t,d)}while(1);return e&&t.shellSuspendCounter++,ri=To=null,yt=s,Ce.H=a,Ce.A=i,We===null&&(Dt=null,tt=0,_d()),r}function FN(){for(;We!==null;)l2(We)}function HN(t,e){var n=yt;yt|=2;var s=r2(),a=o2();Dt!==t||tt!==e?(Df=null,Mf=Ds()+500,Nl(t,e)):Hl=Ru(t,e);e:do try{if(Et!==0&&We!==null){e=We;var i=Ns;t:switch(Et){case 1:Et=0,Ns=null,sl(t,e,i,1);break;case 2:case 9:if(Rb(i)){Et=0,Ns=null,Jb(e);break}e=function(){Et!==2&&Et!==9||Dt!==t||(Et=7),qa(t)},i.then(e,e);break e;case 3:Et=7;break e;case 4:Et=5;break e;case 7:Rb(i)?(Et=0,Ns=null,Jb(e)):(Et=0,Ns=null,sl(t,e,i,7));break;case 5:var r=null;switch(We.tag){case 26:r=We.memoizedState;case 5:case 27:var l=We;if(r?R2(r):l.stateNode.complete){Et=0,Ns=null;var c=l.sibling;if(c!==null)We=c;else{var h=l.return;h!==null?(We=h,Cd(h)):We=null}break t}}Et=0,Ns=null,sl(t,e,i,5);break;case 6:Et=0,Ns=null,sl(t,e,i,6);break;case 8:Bg(),rn=6;break e;default:throw Error(Y(462))}}qN();break}catch(d){a2(t,d)}while(1);return ri=To=null,Ce.H=s,Ce.A=a,yt=n,We!==null?0:(Dt=null,tt=0,_d(),rn)}function qN(){for(;We!==null&&!mA();)l2(We)}function l2(t){var e=jT(t.alternate,t,vi);t.memoizedProps=t.pendingProps,e===null?Cd(t):We=e}function Jb(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=qb(n,e,e.pendingProps,e.type,void 0,tt);break;case 11:e=qb(n,e,e.pendingProps,e.type.render,e.ref,tt);break;case 5:Sg(e);default:PT(n,e),e=We=P_(e,vi),e=jT(n,e,vi)}t.memoizedProps=t.pendingProps,e===null?Cd(t):We=e}function sl(t,e,n,s){ri=To=null,Sg(e),hl=null,ou=0;var a=e.return;try{if(DN(t,a,e,n,tt)){rn=1,kf(t,ea(n,t.current)),We=null;return}}catch(i){if(a!==null)throw We=a,i;rn=1,kf(t,ea(n,t.current)),We=null;return}e.flags&32768?(ot||s===1?t=!0:Hl||tt&536870912?t=!1:(Xi=t=!0,(s===2||s===9||s===3||s===6)&&(s=Ls.current,s!==null&&s.tag===13&&(s.flags|=16384))),c2(e,t)):Cd(e)}function Cd(t){var e=t;do{if(e.flags&32768){c2(e,Xi);return}t=e.return;var n=PN(e.alternate,e,vi);if(n!==null){We=n;return}if(e=e.sibling,e!==null){We=e;return}We=e=t}while(e!==null);rn===0&&(rn=5)}function c2(t,e){do{var n=VN(t.alternate,t);if(n!==null){n.flags&=32767,We=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){We=t;return}We=t=n}while(t!==null);rn=6,We=null}function Zb(t,e,n,s,a,i,r,l,c){t.cancelPendingCommit=null;do Id();while(An!==0);if(yt&6)throw Error(Y(327));if(e!==null){if(e===t.current)throw Error(Y(177));if(i=e.lanes|e.childLanes,i|=hg,wA(t,n,i,r,l,c),t===Dt&&(We=Dt=null,tt=0),Al=e,rr=t,hi=n,Z0=i,ep=a,t2=s,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,QN(bf,function(){return m2(),null})):(t.callbackNode=null,t.callbackPriority=0),s=(e.flags&13878)!==0,e.subtreeFlags&13878||s){s=Ce.T,Ce.T=null,a=bt.p,bt.p=2,r=yt,yt|=4;try{LN(t,e,n)}finally{yt=r,bt.p=a,Ce.T=s}}An=1,u2(),h2(),f2()}}function u2(){if(An===1){An=0;var t=rr,e=Al,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=Ce.T,Ce.T=null;var s=bt.p;bt.p=2;var a=yt;yt|=4;try{YT(e,t);var i=ip,r=R_(t.containerInfo),l=i.focusedElem,c=i.selectionRange;if(r!==l&&l&&l.ownerDocument&&N_(l.ownerDocument.documentElement,l)){if(c!==null&&ug(l)){var h=c.start,d=c.end;if(d===void 0&&(d=h),"selectionStart"in l)l.selectionStart=h,l.selectionEnd=Math.min(d,l.value.length);else{var p=l.ownerDocument||document,g=p&&p.defaultView||window;if(g.getSelection){var y=g.getSelection(),C=l.textContent.length,I=Math.min(c.start,C),O=c.end===void 0?I:Math.min(c.end,C);!y.extend&&I>O&&(r=O,O=I,I=r);var _=_b(l,I),v=_b(l,O);if(_&&v&&(y.rangeCount!==1||y.anchorNode!==_.node||y.anchorOffset!==_.offset||y.focusNode!==v.node||y.focusOffset!==v.offset)){var S=p.createRange();S.setStart(_.node,_.offset),y.removeAllRanges(),I>O?(y.addRange(S),y.extend(v.node,v.offset)):(S.setEnd(v.node,v.offset),y.addRange(S))}}}}for(p=[],y=l;y=y.parentNode;)y.nodeType===1&&p.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<p.length;l++){var L=p[l];L.element.scrollLeft=L.left,L.element.scrollTop=L.top}}$f=!!ap,ip=ap=null}finally{yt=a,bt.p=s,Ce.T=n}}t.current=e,An=2}}function h2(){if(An===2){An=0;var t=rr,e=Al,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=Ce.T,Ce.T=null;var s=bt.p;bt.p=2;var a=yt;yt|=4;try{$T(t,e.alternate,e)}finally{yt=a,bt.p=s,Ce.T=n}}An=3}}function f2(){if(An===4||An===3){An=0,pA();var t=rr,e=Al,n=hi,s=t2;e.subtreeFlags&10256||e.flags&10256?An=5:(An=0,Al=rr=null,d2(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(ir=null),sg(n),e=e.stateNode,Os&&typeof Os.onCommitFiberRoot=="function")try{Os.onCommitFiberRoot(Nu,e,void 0,(e.current.flags&128)===128)}catch{}if(s!==null){e=Ce.T,a=bt.p,bt.p=2,Ce.T=null;try{for(var i=t.onRecoverableError,r=0;r<s.length;r++){var l=s[r];i(l.value,{componentStack:l.stack})}}finally{Ce.T=e,bt.p=a}}hi&3&&Id(),qa(t),a=t.pendingLanes,n&261930&&a&42?t===tp?Fc++:(Fc=0,tp=t):Fc=0,ju(0,!1)}}function d2(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Mu(e)))}function Id(){return u2(),h2(),f2(),m2()}function m2(){if(An!==5)return!1;var t=rr,e=Z0;Z0=0;var n=sg(hi),s=Ce.T,a=bt.p;try{bt.p=32>n?32:n,Ce.T=null,n=ep,ep=null;var i=rr,r=hi;if(An=0,Al=rr=null,hi=0,yt&6)throw Error(Y(331));var l=yt;if(yt|=4,JT(i.current),QT(i,i.current,r,n),yt=l,ju(0,!1),Os&&typeof Os.onPostCommitFiberRoot=="function")try{Os.onPostCommitFiberRoot(Nu,i)}catch{}return!0}finally{bt.p=a,Ce.T=s,d2(t,e)}}function ev(t,e,n){e=ea(n,e),e=K0(t.stateNode,e,2),t=ar(t,e,2),t!==null&&(ku(t,2),qa(t))}function wt(t,e,n){if(t.tag===3)ev(t,t,n);else for(;e!==null;){if(e.tag===3){ev(e,t,n);break}else if(e.tag===1){var s=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(ir===null||!ir.has(s))){t=ea(n,t),n=kT(2),s=ar(e,n,2),s!==null&&(CT(n,s,e,t),ku(s,2),qa(s));break}}e=e.return}}function Vm(t,e,n){var s=t.pingCache;if(s===null){s=t.pingCache=new zN;var a=new Set;s.set(e,a)}else a=s.get(e),a===void 0&&(a=new Set,s.set(e,a));a.has(n)||(Lg=!0,a.add(n),t=GN.bind(null,t,e,n),e.then(t,t))}function GN(t,e,n){var s=t.pingCache;s!==null&&s.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Dt===t&&(tt&n)===n&&(rn===4||rn===3&&(tt&62914560)===tt&&300>Ds()-Rd?!(yt&2)&&Nl(t,0):Ug|=n,Sl===tt&&(Sl=0)),qa(t)}function p2(t,e){e===0&&(e=r_()),t=_o(t,e),t!==null&&(ku(t,e),qa(t))}function YN(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),p2(t,n)}function KN(t,e){var n=0;switch(t.tag){case 31:case 13:var s=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(Y(314))}s!==null&&s.delete(e),p2(t,n)}function QN(t,e){return tg(t,e)}var jf=null,zo=null,np=!1,Pf=!1,Lm=!1,Ji=0;function qa(t){t!==zo&&t.next===null&&(zo===null?jf=zo=t:zo=zo.next=t),Pf=!0,np||(np=!0,WN())}function ju(t,e){if(!Lm&&Pf){Lm=!0;do for(var n=!1,s=jf;s!==null;){if(!e)if(t!==0){var a=s.pendingLanes;if(a===0)var i=0;else{var r=s.suspendedLanes,l=s.pingedLanes;i=(1<<31-js(42|t)+1)-1,i&=a&~(r&~l),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,tv(s,i))}else i=tt,i=yd(s,s===Dt?i:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),!(i&3)||Ru(s,i)||(n=!0,tv(s,i));s=s.next}while(n);Lm=!1}}function XN(){g2()}function g2(){Pf=np=!1;var t=0;Ji!==0&&oR()&&(t=Ji);for(var e=Ds(),n=null,s=jf;s!==null;){var a=s.next,i=y2(s,e);i===0?(s.next=null,n===null?jf=a:n.next=a,a===null&&(zo=n)):(n=s,(t!==0||i&3)&&(Pf=!0)),s=a}An!==0&&An!==5||ju(t,!1),Ji!==0&&(Ji=0)}function y2(t,e){for(var n=t.suspendedLanes,s=t.pingedLanes,a=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var r=31-js(i),l=1<<r,c=a[r];c===-1?(!(l&n)||l&s)&&(a[r]=EA(l,e)):c<=e&&(t.expiredLanes|=l),i&=~l}if(e=Dt,n=tt,n=yd(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,n===0||t===e&&(Et===2||Et===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&fm(s),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Ru(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(s!==null&&fm(s),sg(n)){case 2:case 8:n=a_;break;case 32:n=bf;break;case 268435456:n=i_;break;default:n=bf}return s=b2.bind(null,t),n=tg(n,s),t.callbackPriority=e,t.callbackNode=n,e}return s!==null&&s!==null&&fm(s),t.callbackPriority=2,t.callbackNode=null,2}function b2(t,e){if(An!==0&&An!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Id()&&t.callbackNode!==n)return null;var s=tt;return s=yd(t,t===Dt?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(s2(t,s,e),y2(t,Ds()),t.callbackNode!=null&&t.callbackNode===n?b2.bind(null,t):null)}function tv(t,e){if(Id())return null;s2(t,e,!0)}function WN(){cR(function(){yt&6?tg(s_,XN):g2()})}function zg(){if(Ji===0){var t=Tl;t===0&&(t=mh,mh<<=1,!(mh&261888)&&(mh=256)),Ji=t}return Ji}function nv(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Bh(""+t)}function sv(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function JN(t,e,n,s,a){if(e==="submit"&&n&&n.stateNode===a){var i=nv((a[Es]||null).action),r=s.submitter;r&&(e=(e=r[Es]||null)?nv(e.formAction):r.getAttribute("formAction"),e!==null&&(i=e,r=null));var l=new bd("action","action",null,s,a);t.push({event:l,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(Ji!==0){var c=r?sv(a,r):new FormData(a);G0(n,{pending:!0,data:c,method:a.method,action:i},null,c)}}else typeof i=="function"&&(l.preventDefault(),c=r?sv(a,r):new FormData(a),G0(n,{pending:!0,data:c,method:a.method,action:i},i,c))},currentTarget:a}]})}}for(var Um=0;Um<O0.length;Um++){var Bm=O0[Um],ZN=Bm.toLowerCase(),eR=Bm[0].toUpperCase()+Bm.slice(1);xa(ZN,"on"+eR)}xa(C_,"onAnimationEnd");xa(I_,"onAnimationIteration");xa(M_,"onAnimationStart");xa("dblclick","onDoubleClick");xa("focusin","onFocus");xa("focusout","onBlur");xa(gN,"onTransitionRun");xa(yN,"onTransitionStart");xa(bN,"onTransitionCancel");xa(D_,"onTransitionEnd");xl("onMouseEnter",["mouseout","mouseover"]);xl("onMouseLeave",["mouseout","mouseover"]);xl("onPointerEnter",["pointerout","pointerover"]);xl("onPointerLeave",["pointerout","pointerover"]);bo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));bo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));bo("onBeforeInput",["compositionend","keypress","textInput","paste"]);bo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));bo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));bo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var uu="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tR=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(uu));function v2(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var s=t[n],a=s.event;s=s.listeners;e:{var i=void 0;if(e)for(var r=s.length-1;0<=r;r--){var l=s[r],c=l.instance,h=l.currentTarget;if(l=l.listener,c!==i&&a.isPropagationStopped())break e;i=l,a.currentTarget=h;try{i(a)}catch(d){xf(d)}a.currentTarget=null,i=c}else for(r=0;r<s.length;r++){if(l=s[r],c=l.instance,h=l.currentTarget,l=l.listener,c!==i&&a.isPropagationStopped())break e;i=l,a.currentTarget=h;try{i(a)}catch(d){xf(d)}a.currentTarget=null,i=c}}}}function Xe(t,e){var n=e[A0];n===void 0&&(n=e[A0]=new Set);var s=t+"__bubble";n.has(s)||(x2(e,t,2,!1),n.add(s))}function zm(t,e,n){var s=0;e&&(s|=4),x2(n,t,s,e)}var wh="_reactListening"+Math.random().toString(36).slice(2);function $g(t){if(!t[wh]){t[wh]=!0,h_.forEach(function(n){n!=="selectionchange"&&(tR.has(n)||zm(n,!1,t),zm(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[wh]||(e[wh]=!0,zm("selectionchange",!1,e))}}function x2(t,e,n,s){switch(D2(e)){case 2:var a=kR;break;case 8:a=CR;break;default:a=Gg}n=a.bind(null,e,n,t),a=void 0,!I0||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),s?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function $m(t,e,n,s,a){var i=s;if(!(e&1)&&!(e&2)&&s!==null)e:for(;;){if(s===null)return;var r=s.tag;if(r===3||r===4){var l=s.stateNode.containerInfo;if(l===a)break;if(r===4)for(r=s.return;r!==null;){var c=r.tag;if((c===3||c===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;l!==null;){if(r=Ko(l),r===null)return;if(c=r.tag,c===5||c===6||c===26||c===27){s=i=r;continue e}l=l.parentNode}}s=s.return}v_(function(){var h=i,d=rg(n),p=[];e:{var g=O_.get(t);if(g!==void 0){var y=bd,C=t;switch(t){case"keypress":if($h(n)===0)break e;case"keydown":case"keyup":y=KA;break;case"focusin":C="focus",y=ym;break;case"focusout":C="blur",y=ym;break;case"beforeblur":case"afterblur":y=ym;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=hb;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=PA;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=WA;break;case C_:case I_:case M_:y=UA;break;case D_:y=ZA;break;case"scroll":case"scrollend":y=OA;break;case"wheel":y=tN;break;case"copy":case"cut":case"paste":y=zA;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=db;break;case"toggle":case"beforetoggle":y=sN}var I=(e&4)!==0,O=!I&&(t==="scroll"||t==="scrollend"),_=I?g!==null?g+"Capture":null:g;I=[];for(var v=h,S;v!==null;){var L=v;if(S=L.stateNode,L=L.tag,L!==5&&L!==26&&L!==27||S===null||_===null||(L=nu(v,_),L!=null&&I.push(hu(v,L,S))),O)break;v=v.return}0<I.length&&(g=new y(g,C,null,n,d),p.push({event:g,listeners:I}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",y=t==="mouseout"||t==="pointerout",g&&n!==C0&&(C=n.relatedTarget||n.fromElement)&&(Ko(C)||C[Bl]))break e;if((y||g)&&(g=d.window===d?d:(g=d.ownerDocument)?g.defaultView||g.parentWindow:window,y?(C=n.relatedTarget||n.toElement,y=h,C=C?Ko(C):null,C!==null&&(O=Au(C),I=C.tag,C!==O||I!==5&&I!==27&&I!==6)&&(C=null)):(y=null,C=h),y!==C)){if(I=hb,L="onMouseLeave",_="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(I=db,L="onPointerLeave",_="onPointerEnter",v="pointer"),O=y==null?g:Tc(y),S=C==null?g:Tc(C),g=new I(L,v+"leave",y,n,d),g.target=O,g.relatedTarget=S,L=null,Ko(d)===h&&(I=new I(_,v+"enter",C,n,d),I.target=S,I.relatedTarget=O,L=I),O=L,y&&C)t:{for(I=nR,_=y,v=C,S=0,L=_;L;L=I(L))S++;L=0;for(var j=v;j;j=I(j))L++;for(;0<S-L;)_=I(_),S--;for(;0<L-S;)v=I(v),L--;for(;S--;){if(_===v||v!==null&&_===v.alternate){I=_;break t}_=I(_),v=I(v)}I=null}else I=null;y!==null&&av(p,g,y,I,!1),C!==null&&O!==null&&av(p,O,C,I,!0)}}e:{if(g=h?Tc(h):window,y=g.nodeName&&g.nodeName.toLowerCase(),y==="select"||y==="input"&&g.type==="file")var H=yb;else if(gb(g))if(S_)H=dN;else{H=hN;var T=uN}else y=g.nodeName,!y||y.toLowerCase()!=="input"||g.type!=="checkbox"&&g.type!=="radio"?h&&ig(h.elementType)&&(H=yb):H=fN;if(H&&(H=H(t,h))){w_(p,H,n,d);break e}T&&T(t,g,h),t==="focusout"&&h&&g.type==="number"&&h.memoizedProps.value!=null&&k0(g,"number",g.value)}switch(T=h?Tc(h):window,t){case"focusin":(gb(T)||T.contentEditable==="true")&&(Wo=T,M0=h,Oc=null);break;case"focusout":Oc=M0=Wo=null;break;case"mousedown":D0=!0;break;case"contextmenu":case"mouseup":case"dragend":D0=!1,Tb(p,n,d);break;case"selectionchange":if(pN)break;case"keydown":case"keyup":Tb(p,n,d)}var x;if(cg)e:{switch(t){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else Xo?T_(t,n)&&(E="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(__&&n.locale!=="ko"&&(Xo||E!=="onCompositionStart"?E==="onCompositionEnd"&&Xo&&(x=x_()):(Qi=d,og="value"in Qi?Qi.value:Qi.textContent,Xo=!0)),T=Vf(h,E),0<T.length&&(E=new fb(E,t,null,n,d),p.push({event:E,listeners:T}),x?E.data=x:(x=E_(n),x!==null&&(E.data=x)))),(x=iN?rN(t,n):oN(t,n))&&(E=Vf(h,"onBeforeInput"),0<E.length&&(T=new fb("onBeforeInput","beforeinput",null,n,d),p.push({event:T,listeners:E}),T.data=x)),JN(p,t,h,n,d)}v2(p,e)})}function hu(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Vf(t,e){for(var n=e+"Capture",s=[];t!==null;){var a=t,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=nu(t,n),a!=null&&s.unshift(hu(t,a,i)),a=nu(t,e),a!=null&&s.push(hu(t,a,i))),t.tag===3)return s;t=t.return}return[]}function nR(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function av(t,e,n,s,a){for(var i=e._reactName,r=[];n!==null&&n!==s;){var l=n,c=l.alternate,h=l.stateNode;if(l=l.tag,c!==null&&c===s)break;l!==5&&l!==26&&l!==27||h===null||(c=h,a?(h=nu(n,i),h!=null&&r.unshift(hu(n,h,c))):a||(h=nu(n,i),h!=null&&r.push(hu(n,h,c)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var sR=/\r\n?/g,aR=/\u0000|\uFFFD/g;function iv(t){return(typeof t=="string"?t:""+t).replace(sR,`
`).replace(aR,"")}function _2(t,e){return e=iv(e),iv(t)===e}function Rt(t,e,n,s,a,i){switch(n){case"children":typeof s=="string"?e==="body"||e==="textarea"&&s===""||_l(t,s):(typeof s=="number"||typeof s=="bigint")&&e!=="body"&&_l(t,""+s);break;case"className":yh(t,"class",s);break;case"tabIndex":yh(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":yh(t,n,s);break;case"style":b_(t,s,i);break;case"data":if(e!=="object"){yh(t,"data",s);break}case"src":case"href":if(s===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=Bh(""+s),t.setAttribute(n,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&Rt(t,e,"name",a.name,a,null),Rt(t,e,"formEncType",a.formEncType,a,null),Rt(t,e,"formMethod",a.formMethod,a,null),Rt(t,e,"formTarget",a.formTarget,a,null)):(Rt(t,e,"encType",a.encType,a,null),Rt(t,e,"method",a.method,a,null),Rt(t,e,"target",a.target,a,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=Bh(""+s),t.setAttribute(n,s);break;case"onClick":s!=null&&(t.onclick=ii);break;case"onScroll":s!=null&&Xe("scroll",t);break;case"onScrollEnd":s!=null&&Xe("scrollend",t);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(Y(61));if(n=s.__html,n!=null){if(a.children!=null)throw Error(Y(60));t.innerHTML=n}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}n=Bh(""+s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""+s):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":s===!0?t.setAttribute(n,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,s):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(n,s):t.removeAttribute(n);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(n):t.setAttribute(n,s);break;case"popover":Xe("beforetoggle",t),Xe("toggle",t),Uh(t,"popover",s);break;case"xlinkActuate":Wa(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":Wa(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":Wa(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":Wa(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":Wa(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":Wa(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":Wa(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":Wa(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":Wa(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":Uh(t,"is",s);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=MA.get(n)||n,Uh(t,n,s))}}function sp(t,e,n,s,a,i){switch(n){case"style":b_(t,s,i);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(Y(61));if(n=s.__html,n!=null){if(a.children!=null)throw Error(Y(60));t.innerHTML=n}}break;case"children":typeof s=="string"?_l(t,s):(typeof s=="number"||typeof s=="bigint")&&_l(t,""+s);break;case"onScroll":s!=null&&Xe("scroll",t);break;case"onScrollEnd":s!=null&&Xe("scrollend",t);break;case"onClick":s!=null&&(t.onclick=ii);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!f_.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),i=t[Es]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,a),typeof s=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,s,a);break e}n in t?t[n]=s:s===!0?t.setAttribute(n,""):Uh(t,n,s)}}}function Yn(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Xe("error",t),Xe("load",t);var s=!1,a=!1,i;for(i in n)if(n.hasOwnProperty(i)){var r=n[i];if(r!=null)switch(i){case"src":s=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(Y(137,e));default:Rt(t,e,i,r,n,null)}}a&&Rt(t,e,"srcSet",n.srcSet,n,null),s&&Rt(t,e,"src",n.src,n,null);return;case"input":Xe("invalid",t);var l=i=r=a=null,c=null,h=null;for(s in n)if(n.hasOwnProperty(s)){var d=n[s];if(d!=null)switch(s){case"name":a=d;break;case"type":r=d;break;case"checked":c=d;break;case"defaultChecked":h=d;break;case"value":i=d;break;case"defaultValue":l=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(Y(137,e));break;default:Rt(t,e,s,d,n,null)}}p_(t,i,l,c,h,r,a,!1);return;case"select":Xe("invalid",t),s=r=i=null;for(a in n)if(n.hasOwnProperty(a)&&(l=n[a],l!=null))switch(a){case"value":i=l;break;case"defaultValue":r=l;break;case"multiple":s=l;default:Rt(t,e,a,l,n,null)}e=i,n=r,t.multiple=!!s,e!=null?ll(t,!!s,e,!1):n!=null&&ll(t,!!s,n,!0);return;case"textarea":Xe("invalid",t),i=a=s=null;for(r in n)if(n.hasOwnProperty(r)&&(l=n[r],l!=null))switch(r){case"value":s=l;break;case"defaultValue":a=l;break;case"children":i=l;break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(Y(91));break;default:Rt(t,e,r,l,n,null)}y_(t,s,a,i);return;case"option":for(c in n)if(n.hasOwnProperty(c)&&(s=n[c],s!=null))switch(c){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Rt(t,e,c,s,n,null)}return;case"dialog":Xe("beforetoggle",t),Xe("toggle",t),Xe("cancel",t),Xe("close",t);break;case"iframe":case"object":Xe("load",t);break;case"video":case"audio":for(s=0;s<uu.length;s++)Xe(uu[s],t);break;case"image":Xe("error",t),Xe("load",t);break;case"details":Xe("toggle",t);break;case"embed":case"source":case"link":Xe("error",t),Xe("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(h in n)if(n.hasOwnProperty(h)&&(s=n[h],s!=null))switch(h){case"children":case"dangerouslySetInnerHTML":throw Error(Y(137,e));default:Rt(t,e,h,s,n,null)}return;default:if(ig(e)){for(d in n)n.hasOwnProperty(d)&&(s=n[d],s!==void 0&&sp(t,e,d,s,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(s=n[l],s!=null&&Rt(t,e,l,s,n,null))}function iR(t,e,n,s){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,r=null,l=null,c=null,h=null,d=null;for(y in n){var p=n[y];if(n.hasOwnProperty(y)&&p!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":c=p;default:s.hasOwnProperty(y)||Rt(t,e,y,null,s,p)}}for(var g in s){var y=s[g];if(p=n[g],s.hasOwnProperty(g)&&(y!=null||p!=null))switch(g){case"type":i=y;break;case"name":a=y;break;case"checked":h=y;break;case"defaultChecked":d=y;break;case"value":r=y;break;case"defaultValue":l=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(Y(137,e));break;default:y!==p&&Rt(t,e,g,y,s,p)}}R0(t,r,l,c,h,d,i,a);return;case"select":y=r=l=g=null;for(i in n)if(c=n[i],n.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":y=c;default:s.hasOwnProperty(i)||Rt(t,e,i,null,s,c)}for(a in s)if(i=s[a],c=n[a],s.hasOwnProperty(a)&&(i!=null||c!=null))switch(a){case"value":g=i;break;case"defaultValue":l=i;break;case"multiple":r=i;default:i!==c&&Rt(t,e,a,i,s,c)}e=l,n=r,s=y,g!=null?ll(t,!!n,g,!1):!!s!=!!n&&(e!=null?ll(t,!!n,e,!0):ll(t,!!n,n?[]:"",!1));return;case"textarea":y=g=null;for(l in n)if(a=n[l],n.hasOwnProperty(l)&&a!=null&&!s.hasOwnProperty(l))switch(l){case"value":break;case"children":break;default:Rt(t,e,l,null,s,a)}for(r in s)if(a=s[r],i=n[r],s.hasOwnProperty(r)&&(a!=null||i!=null))switch(r){case"value":g=a;break;case"defaultValue":y=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(Y(91));break;default:a!==i&&Rt(t,e,r,a,s,i)}g_(t,g,y);return;case"option":for(var C in n)if(g=n[C],n.hasOwnProperty(C)&&g!=null&&!s.hasOwnProperty(C))switch(C){case"selected":t.selected=!1;break;default:Rt(t,e,C,null,s,g)}for(c in s)if(g=s[c],y=n[c],s.hasOwnProperty(c)&&g!==y&&(g!=null||y!=null))switch(c){case"selected":t.selected=g&&typeof g!="function"&&typeof g!="symbol";break;default:Rt(t,e,c,g,s,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var I in n)g=n[I],n.hasOwnProperty(I)&&g!=null&&!s.hasOwnProperty(I)&&Rt(t,e,I,null,s,g);for(h in s)if(g=s[h],y=n[h],s.hasOwnProperty(h)&&g!==y&&(g!=null||y!=null))switch(h){case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(Y(137,e));break;default:Rt(t,e,h,g,s,y)}return;default:if(ig(e)){for(var O in n)g=n[O],n.hasOwnProperty(O)&&g!==void 0&&!s.hasOwnProperty(O)&&sp(t,e,O,void 0,s,g);for(d in s)g=s[d],y=n[d],!s.hasOwnProperty(d)||g===y||g===void 0&&y===void 0||sp(t,e,d,g,s,y);return}}for(var _ in n)g=n[_],n.hasOwnProperty(_)&&g!=null&&!s.hasOwnProperty(_)&&Rt(t,e,_,null,s,g);for(p in s)g=s[p],y=n[p],!s.hasOwnProperty(p)||g===y||g==null&&y==null||Rt(t,e,p,g,s,y)}function rv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function rR(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),s=0;s<n.length;s++){var a=n[s],i=a.transferSize,r=a.initiatorType,l=a.duration;if(i&&l&&rv(r)){for(r=0,l=a.responseEnd,s+=1;s<n.length;s++){var c=n[s],h=c.startTime;if(h>l)break;var d=c.transferSize,p=c.initiatorType;d&&rv(p)&&(c=c.responseEnd,r+=d*(c<l?1:(l-h)/(c-h)))}if(--s,e+=8*(i+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var ap=null,ip=null;function Lf(t){return t.nodeType===9?t:t.ownerDocument}function ov(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function T2(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function rp(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Fm=null;function oR(){var t=window.event;return t&&t.type==="popstate"?t===Fm?!1:(Fm=t,!0):(Fm=null,!1)}var E2=typeof setTimeout=="function"?setTimeout:void 0,lR=typeof clearTimeout=="function"?clearTimeout:void 0,lv=typeof Promise=="function"?Promise:void 0,cR=typeof queueMicrotask=="function"?queueMicrotask:typeof lv<"u"?function(t){return lv.resolve(null).then(t).catch(uR)}:E2;function uR(t){setTimeout(function(){throw t})}function kr(t){return t==="head"}function cv(t,e){var n=e,s=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(s===0){t.removeChild(a),kl(e);return}s--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")s++;else if(n==="html")Hc(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Hc(n);for(var i=n.firstChild;i;){var r=i.nextSibling,l=i.nodeName;i[Cu]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=r}}else n==="body"&&Hc(t.ownerDocument.body);n=a}while(n);kl(e)}function uv(t,e){var n=t;t=0;do{var s=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=s}while(n)}function op(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":op(n),ag(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function hR(t,e,n,s){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[Cu])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=aa(t.nextSibling),t===null)break}return null}function fR(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=aa(t.nextSibling),t===null))return null;return t}function w2(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=aa(t.nextSibling),t===null))return null;return t}function lp(t){return t.data==="$?"||t.data==="$~"}function cp(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function dR(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var s=function(){e(),n.removeEventListener("DOMContentLoaded",s)};n.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function aa(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var up=null;function hv(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return aa(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function fv(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function S2(t,e,n){switch(e=Lf(n),t){case"html":if(t=e.documentElement,!t)throw Error(Y(452));return t;case"head":if(t=e.head,!t)throw Error(Y(453));return t;case"body":if(t=e.body,!t)throw Error(Y(454));return t;default:throw Error(Y(451))}}function Hc(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ag(t)}var ra=new Map,dv=new Set;function Uf(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ai=bt.d;bt.d={f:mR,r:pR,D:gR,C:yR,L:bR,m:vR,X:_R,S:xR,M:TR};function mR(){var t=Ai.f(),e=kd();return t||e}function pR(t){var e=zl(t);e!==null&&e.tag===5&&e.type==="form"?bT(e):Ai.r(t)}var ql=typeof document>"u"?null:document;function A2(t,e,n){var s=ql;if(s&&typeof e=="string"&&e){var a=Zs(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),dv.has(a)||(dv.add(a),t={rel:t,crossOrigin:n,href:e},s.querySelector(a)===null&&(e=s.createElement("link"),Yn(e,"link",t),On(e),s.head.appendChild(e)))}}function gR(t){Ai.D(t),A2("dns-prefetch",t,null)}function yR(t,e){Ai.C(t,e),A2("preconnect",t,e)}function bR(t,e,n){Ai.L(t,e,n);var s=ql;if(s&&t&&e){var a='link[rel="preload"][as="'+Zs(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Zs(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Zs(n.imageSizes)+'"]')):a+='[href="'+Zs(t)+'"]';var i=a;switch(e){case"style":i=Rl(t);break;case"script":i=Gl(t)}ra.has(i)||(t=Yt({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),ra.set(i,t),s.querySelector(a)!==null||e==="style"&&s.querySelector(Pu(i))||e==="script"&&s.querySelector(Vu(i))||(e=s.createElement("link"),Yn(e,"link",t),On(e),s.head.appendChild(e)))}}function vR(t,e){Ai.m(t,e);var n=ql;if(n&&t){var s=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Zs(s)+'"][href="'+Zs(t)+'"]',i=a;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Gl(t)}if(!ra.has(i)&&(t=Yt({rel:"modulepreload",href:t},e),ra.set(i,t),n.querySelector(a)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Vu(i)))return}s=n.createElement("link"),Yn(s,"link",t),On(s),n.head.appendChild(s)}}}function xR(t,e,n){Ai.S(t,e,n);var s=ql;if(s&&t){var a=ol(s).hoistableStyles,i=Rl(t);e=e||"default";var r=a.get(i);if(!r){var l={loading:0,preload:null};if(r=s.querySelector(Pu(i)))l.loading=5;else{t=Yt({rel:"stylesheet",href:t,"data-precedence":e},n),(n=ra.get(i))&&Fg(t,n);var c=r=s.createElement("link");On(c),Yn(c,"link",t),c._p=new Promise(function(h,d){c.onload=h,c.onerror=d}),c.addEventListener("load",function(){l.loading|=1}),c.addEventListener("error",function(){l.loading|=2}),l.loading|=4,Xh(r,e,s)}r={type:"stylesheet",instance:r,count:1,state:l},a.set(i,r)}}}function _R(t,e){Ai.X(t,e);var n=ql;if(n&&t){var s=ol(n).hoistableScripts,a=Gl(t),i=s.get(a);i||(i=n.querySelector(Vu(a)),i||(t=Yt({src:t,async:!0},e),(e=ra.get(a))&&Hg(t,e),i=n.createElement("script"),On(i),Yn(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},s.set(a,i))}}function TR(t,e){Ai.M(t,e);var n=ql;if(n&&t){var s=ol(n).hoistableScripts,a=Gl(t),i=s.get(a);i||(i=n.querySelector(Vu(a)),i||(t=Yt({src:t,async:!0,type:"module"},e),(e=ra.get(a))&&Hg(t,e),i=n.createElement("script"),On(i),Yn(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},s.set(a,i))}}function mv(t,e,n,s){var a=(a=tr.current)?Uf(a):null;if(!a)throw Error(Y(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Rl(n.href),n=ol(a).hoistableStyles,s=n.get(e),s||(s={type:"style",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Rl(n.href);var i=ol(a).hoistableStyles,r=i.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,r),(i=a.querySelector(Pu(t)))&&!i._p&&(r.instance=i,r.state.loading=5),ra.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ra.set(t,n),i||ER(a,t,n,r.state))),e&&s===null)throw Error(Y(528,""));return r}if(e&&s!==null)throw Error(Y(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Gl(n),n=ol(a).hoistableScripts,s=n.get(e),s||(s={type:"script",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(Y(444,t))}}function Rl(t){return'href="'+Zs(t)+'"'}function Pu(t){return'link[rel="stylesheet"]['+t+"]"}function N2(t){return Yt({},t,{"data-precedence":t.precedence,precedence:null})}function ER(t,e,n,s){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?s.loading=1:(e=t.createElement("link"),s.preload=e,e.addEventListener("load",function(){return s.loading|=1}),e.addEventListener("error",function(){return s.loading|=2}),Yn(e,"link",n),On(e),t.head.appendChild(e))}function Gl(t){return'[src="'+Zs(t)+'"]'}function Vu(t){return"script[async]"+t}function pv(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var s=t.querySelector('style[data-href~="'+Zs(n.href)+'"]');if(s)return e.instance=s,On(s),s;var a=Yt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),On(s),Yn(s,"style",a),Xh(s,n.precedence,t),e.instance=s;case"stylesheet":a=Rl(n.href);var i=t.querySelector(Pu(a));if(i)return e.state.loading|=4,e.instance=i,On(i),i;s=N2(n),(a=ra.get(a))&&Fg(s,a),i=(t.ownerDocument||t).createElement("link"),On(i);var r=i;return r._p=new Promise(function(l,c){r.onload=l,r.onerror=c}),Yn(i,"link",s),e.state.loading|=4,Xh(i,n.precedence,t),e.instance=i;case"script":return i=Gl(n.src),(a=t.querySelector(Vu(i)))?(e.instance=a,On(a),a):(s=n,(a=ra.get(i))&&(s=Yt({},n),Hg(s,a)),t=t.ownerDocument||t,a=t.createElement("script"),On(a),Yn(a,"link",s),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(Y(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(s=e.instance,e.state.loading|=4,Xh(s,n.precedence,t));return e.instance}function Xh(t,e,n){for(var s=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=s.length?s[s.length-1]:null,i=a,r=0;r<s.length;r++){var l=s[r];if(l.dataset.precedence===e)i=l;else if(i!==a)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Fg(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Hg(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Wh=null;function gv(t,e,n){if(Wh===null){var s=new Map,a=Wh=new Map;a.set(n,s)}else a=Wh,s=a.get(n),s||(s=new Map,a.set(n,s));if(s.has(t))return s;for(s.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var i=n[a];if(!(i[Cu]||i[Fn]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var r=i.getAttribute(e)||"";r=t+r;var l=s.get(r);l?l.push(i):s.set(r,[i])}}return s}function yv(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function wR(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function R2(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function SR(t,e,n,s){if(n.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=Rl(s.href),i=e.querySelector(Pu(a));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Bf.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,On(i);return}i=e.ownerDocument||e,s=N2(s),(a=ra.get(a))&&Fg(s,a),i=i.createElement("link"),On(i);var r=i;r._p=new Promise(function(l,c){r.onload=l,r.onerror=c}),Yn(i,"link",s),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Bf.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var Hm=0;function AR(t,e){return t.stylesheets&&t.count===0&&Jh(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var s=setTimeout(function(){if(t.stylesheets&&Jh(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&Hm===0&&(Hm=62500*rR());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Jh(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>Hm?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(a)}}:null}function Bf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Jh(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var zf=null;function Jh(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,zf=new Map,e.forEach(NR,t),zf=null,Bf.call(t))}function NR(t,e){if(!(e.state.loading&4)){var n=zf.get(t);if(n)var s=n.get(null);else{n=new Map,zf.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var r=a[i];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),s=r)}s&&n.set(null,s)}a=e.instance,r=a.getAttribute("data-precedence"),i=n.get(r)||s,i===s&&n.set(null,a),n.set(r,a),this.count++,s=Bf.bind(this),a.addEventListener("load",s),a.addEventListener("error",s),i?i.parentNode.insertBefore(a,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var fu={$$typeof:ai,Provider:null,Consumer:null,_currentValue:eo,_currentValue2:eo,_threadCount:0};function RR(t,e,n,s,a,i,r,l,c){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=dm(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dm(0),this.hiddenUpdates=dm(null),this.identifierPrefix=s,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function k2(t,e,n,s,a,i,r,l,c,h,d,p){return t=new RR(t,e,n,r,c,h,d,p,l),e=1,i===!0&&(e|=24),i=Cs(3,null,null,e),t.current=i,i.stateNode=t,e=gg(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:s,isDehydrated:n,cache:e},vg(i),t}function C2(t){return t?(t=el,t):el}function I2(t,e,n,s,a,i){a=C2(a),s.context===null?s.context=a:s.pendingContext=a,s=sr(e),s.payload={element:n},i=i===void 0?null:i,i!==null&&(s.callback=i),n=ar(t,s,e),n!==null&&(Ts(n,t,e),Pc(n,t,e))}function bv(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function qg(t,e){bv(t,e),(t=t.alternate)&&bv(t,e)}function M2(t){if(t.tag===13||t.tag===31){var e=_o(t,67108864);e!==null&&Ts(e,t,67108864),qg(t,67108864)}}function vv(t){if(t.tag===13||t.tag===31){var e=Ps();e=ng(e);var n=_o(t,e);n!==null&&Ts(n,t,e),qg(t,e)}}var $f=!0;function kR(t,e,n,s){var a=Ce.T;Ce.T=null;var i=bt.p;try{bt.p=2,Gg(t,e,n,s)}finally{bt.p=i,Ce.T=a}}function CR(t,e,n,s){var a=Ce.T;Ce.T=null;var i=bt.p;try{bt.p=8,Gg(t,e,n,s)}finally{bt.p=i,Ce.T=a}}function Gg(t,e,n,s){if($f){var a=hp(s);if(a===null)$m(t,e,s,Ff,n),xv(t,s);else if(MR(a,t,e,n,s))s.stopPropagation();else if(xv(t,s),e&4&&-1<IR.indexOf(t)){for(;a!==null;){var i=zl(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var r=Yr(i.pendingLanes);if(r!==0){var l=i;for(l.pendingLanes|=2,l.entangledLanes|=2;r;){var c=1<<31-js(r);l.entanglements[1]|=c,r&=~c}qa(i),!(yt&6)&&(Mf=Ds()+500,ju(0,!1))}}break;case 31:case 13:l=_o(i,2),l!==null&&Ts(l,i,2),kd(),qg(i,2)}if(i=hp(s),i===null&&$m(t,e,s,Ff,n),i===a)break;a=i}a!==null&&s.stopPropagation()}else $m(t,e,s,null,n)}}function hp(t){return t=rg(t),Yg(t)}var Ff=null;function Yg(t){if(Ff=null,t=Ko(t),t!==null){var e=Au(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=Jx(e),t!==null)return t;t=null}else if(n===31){if(t=Zx(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ff=t,null}function D2(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(gA()){case s_:return 2;case a_:return 8;case bf:case yA:return 32;case i_:return 268435456;default:return 32}default:return 32}}var fp=!1,or=null,lr=null,cr=null,du=new Map,mu=new Map,$i=[],IR="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function xv(t,e){switch(t){case"focusin":case"focusout":or=null;break;case"dragenter":case"dragleave":lr=null;break;case"mouseover":case"mouseout":cr=null;break;case"pointerover":case"pointerout":du.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":mu.delete(e.pointerId)}}function gc(t,e,n,s,a,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:s,nativeEvent:i,targetContainers:[a]},e!==null&&(e=zl(e),e!==null&&M2(e)),t):(t.eventSystemFlags|=s,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function MR(t,e,n,s,a){switch(e){case"focusin":return or=gc(or,t,e,n,s,a),!0;case"dragenter":return lr=gc(lr,t,e,n,s,a),!0;case"mouseover":return cr=gc(cr,t,e,n,s,a),!0;case"pointerover":var i=a.pointerId;return du.set(i,gc(du.get(i)||null,t,e,n,s,a)),!0;case"gotpointercapture":return i=a.pointerId,mu.set(i,gc(mu.get(i)||null,t,e,n,s,a)),!0}return!1}function O2(t){var e=Ko(t.target);if(e!==null){var n=Au(e);if(n!==null){if(e=n.tag,e===13){if(e=Jx(n),e!==null){t.blockedOn=e,ab(t.priority,function(){vv(n)});return}}else if(e===31){if(e=Zx(n),e!==null){t.blockedOn=e,ab(t.priority,function(){vv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Zh(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=hp(t.nativeEvent);if(n===null){n=t.nativeEvent;var s=new n.constructor(n.type,n);C0=s,n.target.dispatchEvent(s),C0=null}else return e=zl(n),e!==null&&M2(e),t.blockedOn=n,!1;e.shift()}return!0}function _v(t,e,n){Zh(t)&&n.delete(e)}function DR(){fp=!1,or!==null&&Zh(or)&&(or=null),lr!==null&&Zh(lr)&&(lr=null),cr!==null&&Zh(cr)&&(cr=null),du.forEach(_v),mu.forEach(_v)}function Sh(t,e){t.blockedOn===e&&(t.blockedOn=null,fp||(fp=!0,kn.unstable_scheduleCallback(kn.unstable_NormalPriority,DR)))}var Ah=null;function Tv(t){Ah!==t&&(Ah=t,kn.unstable_scheduleCallback(kn.unstable_NormalPriority,function(){Ah===t&&(Ah=null);for(var e=0;e<t.length;e+=3){var n=t[e],s=t[e+1],a=t[e+2];if(typeof s!="function"){if(Yg(s||n)===null)continue;break}var i=zl(n);i!==null&&(t.splice(e,3),e-=3,G0(i,{pending:!0,data:a,method:n.method,action:s},s,a))}}))}function kl(t){function e(c){return Sh(c,t)}or!==null&&Sh(or,t),lr!==null&&Sh(lr,t),cr!==null&&Sh(cr,t),du.forEach(e),mu.forEach(e);for(var n=0;n<$i.length;n++){var s=$i[n];s.blockedOn===t&&(s.blockedOn=null)}for(;0<$i.length&&(n=$i[0],n.blockedOn===null);)O2(n),n.blockedOn===null&&$i.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(s=0;s<n.length;s+=3){var a=n[s],i=n[s+1],r=a[Es]||null;if(typeof i=="function")r||Tv(n);else if(r){var l=null;if(i&&i.hasAttribute("formAction")){if(a=i,r=i[Es]||null)l=r.formAction;else if(Yg(a)!==null)continue}else l=r.action;typeof l=="function"?n[s+1]=l:(n.splice(s,3),s-=3),Tv(n)}}}function j2(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),s||setTimeout(n,20)}function n(){if(!s&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Kg(t){this._internalRoot=t}Md.prototype.render=Kg.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(Y(409));var n=e.current,s=Ps();I2(n,s,t,e,null,null)};Md.prototype.unmount=Kg.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;I2(t.current,2,null,t,null,null),kd(),e[Bl]=null}};function Md(t){this._internalRoot=t}Md.prototype.unstable_scheduleHydration=function(t){if(t){var e=u_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<$i.length&&e!==0&&e<$i[n].priority;n++);$i.splice(n,0,t),n===0&&O2(t)}};var Ev=Xx.version;if(Ev!=="19.2.5")throw Error(Y(527,Ev,"19.2.5"));bt.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(Y(188)):(t=Object.keys(t).join(","),Error(Y(268,t)));return t=cA(e),t=t!==null?e_(t):null,t=t===null?null:t.stateNode,t};var OR={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:Ce,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Nh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Nh.isDisabled&&Nh.supportsFiber)try{Nu=Nh.inject(OR),Os=Nh}catch{}}pd.createRoot=function(t,e){if(!Wx(t))throw Error(Y(299));var n=!1,s="",a=AT,i=NT,r=RT;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=k2(t,1,!1,null,null,n,s,null,a,i,r,j2),t[Bl]=e.current,$g(t),new Kg(e)};pd.hydrateRoot=function(t,e,n){if(!Wx(t))throw Error(Y(299));var s=!1,a="",i=AT,r=NT,l=RT,c=null;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(l=n.onRecoverableError),n.formState!==void 0&&(c=n.formState)),e=k2(t,1,!0,e,n??null,s,a,c,i,r,l,j2),e.context=C2(null),n=e.current,s=Ps(),s=ng(s),a=sr(s),a.callback=null,ar(n,a,s),n=s,e.current.lanes=n,ku(e,n),qa(e),t[Bl]=e.current,$g(t),new Md(e)};pd.version="19.2.5";function P2(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(P2)}catch(t){console.error(t)}}P2(),Hx.exports=pd;var jR=Hx.exports;const PR=Ox(jR),VR=()=>{};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V2=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let a=t.charCodeAt(s);a<128?e[n++]=a:a<2048?(e[n++]=a>>6|192,e[n++]=a&63|128):(a&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(a=65536+((a&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=a>>18|240,e[n++]=a>>12&63|128,e[n++]=a>>6&63|128,e[n++]=a&63|128):(e[n++]=a>>12|224,e[n++]=a>>6&63|128,e[n++]=a&63|128)}return e},LR=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const a=t[n++];if(a<128)e[s++]=String.fromCharCode(a);else if(a>191&&a<224){const i=t[n++];e[s++]=String.fromCharCode((a&31)<<6|i&63)}else if(a>239&&a<365){const i=t[n++],r=t[n++],l=t[n++],c=((a&7)<<18|(i&63)<<12|(r&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],r=t[n++];e[s++]=String.fromCharCode((a&15)<<12|(i&63)<<6|r&63)}}return e.join("")},Qg={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let a=0;a<t.length;a+=3){const i=t[a],r=a+1<t.length,l=r?t[a+1]:0,c=a+2<t.length,h=c?t[a+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let g=(l&15)<<2|h>>6,y=h&63;c||(y=64,r||(g=64)),s.push(n[d],n[p],n[g],n[y])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(V2(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):LR(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let a=0;a<t.length;){const i=n[t.charAt(a++)],l=a<t.length?n[t.charAt(a)]:0;++a;const h=a<t.length?n[t.charAt(a)]:64;++a;const p=a<t.length?n[t.charAt(a)]:64;if(++a,i==null||l==null||h==null||p==null)throw new UR;const g=i<<2|l>>4;if(s.push(g),h!==64){const y=l<<4&240|h>>2;if(s.push(y),p!==64){const C=h<<6&192|p;s.push(C)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class UR extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const BR=function(t){const e=V2(t);return Qg.encodeByteArray(e,!0)},Hf=function(t){return BR(t).replace(/\./g,"")},L2=function(t){try{return Qg.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U2(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zR=()=>U2().__FIREBASE_DEFAULTS__,$R=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},FR=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&L2(t[1]);return e&&JSON.parse(e)},Dd=()=>{try{return VR()||zR()||$R()||FR()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},B2=t=>{var e,n;return(n=(e=Dd())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},HR=t=>{const e=B2(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},z2=()=>{var t;return(t=Dd())==null?void 0:t.config},$2=t=>{var e;return(e=Dd())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qR(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",a=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r={iss:`https://securetoken.google.com/${s}`,aud:s,iat:a,exp:a+3600,auth_time:a,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t},l="";return[Hf(JSON.stringify(n)),Hf(JSON.stringify(r)),l].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function as(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function GR(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(as())}function YR(){var e;const t=(e=Dd())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function KR(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function QR(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function XR(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function WR(){const t=as();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function JR(){return!YR()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Xg(){try{return typeof indexedDB=="object"}catch{return!1}}function ZR(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(s);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var i;e(((i=a.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e5="FirebaseError";class Ni extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=e5,Object.setPrototypeOf(this,Ni.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yl.prototype.create)}}class Yl{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},a=`${this.service}/${e}`,i=this.errors[e],r=i?t5(i,s):"Error",l=`${this.serviceName}: ${r} (${a}).`;return new Ni(a,l,s)}}function t5(t,e){return t.replace(n5,(n,s)=>{const a=e[s];return a!=null?String(a):`<${s}?>`})}const n5=/\{\$([^}]+)}/g;function s5(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function vr(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const a of n){if(!s.includes(a))return!1;const i=t[a],r=e[a];if(wv(i)&&wv(r)){if(!vr(i,r))return!1}else if(i!==r)return!1}for(const a of s)if(!n.includes(a))return!1;return!0}function wv(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(a=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(a))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function a5(t,e){const n=new i5(t,e);return n.subscribe.bind(n)}class i5{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let a;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");r5(e,["next","error","complete"])?a=e:a={next:e,error:n,complete:s},a.next===void 0&&(a.next=qm),a.error===void 0&&(a.error=qm),a.complete===void 0&&(a.complete=qm);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function r5(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function qm(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o5=1e3,l5=2,c5=4*60*60*1e3,u5=.5;function h5(t,e=o5,n=l5){const s=e*Math.pow(n,t),a=Math.round(u5*s*(Math.random()-.5)*2);return Math.min(c5,s+a)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uu(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function F2(t){return(await fetch(t,{credentials:"include"})).ok}class xi{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f5{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new pu;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:n});a&&s.resolve(a)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(m5(e))try{this.getOrInitializeService({instanceIdentifier:Xr})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:a});s.resolve(i)}catch{}}}}clearInstance(e=Xr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xr){return this.instances.has(e)}getOptions(e=Xr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,r]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);s===l&&r.resolve(a)}return a}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),a=this.onInitCallbacks.get(s)??new Set;a.add(e),this.onInitCallbacks.set(s,a);const i=this.instances.get(s);return i&&e(i,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const a of s)try{a(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:d5(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Xr){return this.component?this.component.multipleInstances?e:Xr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function d5(t){return t===Xr?void 0:t}function m5(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p5{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new f5(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Je||(Je={}));const g5={debug:Je.DEBUG,verbose:Je.VERBOSE,info:Je.INFO,warn:Je.WARN,error:Je.ERROR,silent:Je.SILENT},y5=Je.INFO,b5={[Je.DEBUG]:"log",[Je.VERBOSE]:"log",[Je.INFO]:"info",[Je.WARN]:"warn",[Je.ERROR]:"error"},v5=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),a=b5[e];if(a)console[a](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Od{constructor(e){this.name=e,this._logLevel=y5,this._logHandler=v5,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Je))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?g5[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Je.DEBUG,...e),this._logHandler(this,Je.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Je.VERBOSE,...e),this._logHandler(this,Je.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Je.INFO,...e),this._logHandler(this,Je.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Je.WARN,...e),this._logHandler(this,Je.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Je.ERROR,...e),this._logHandler(this,Je.ERROR,...e)}}const x5=(t,e)=>e.some(n=>t instanceof n);let Sv,Av;function _5(){return Sv||(Sv=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function T5(){return Av||(Av=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const H2=new WeakMap,dp=new WeakMap,q2=new WeakMap,Gm=new WeakMap,Wg=new WeakMap;function E5(t){const e=new Promise((n,s)=>{const a=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{n(ur(t.result)),a()},r=()=>{s(t.error),a()};t.addEventListener("success",i),t.addEventListener("error",r)});return e.then(n=>{n instanceof IDBCursor&&H2.set(n,t)}).catch(()=>{}),Wg.set(e,t),e}function w5(t){if(dp.has(t))return;const e=new Promise((n,s)=>{const a=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{n(),a()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),a()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)});dp.set(t,e)}let mp={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return dp.get(t);if(e==="objectStoreNames")return t.objectStoreNames||q2.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ur(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function S5(t){mp=t(mp)}function A5(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Ym(this),e,...n);return q2.set(s,e.sort?e.sort():[e]),ur(s)}:T5().includes(t)?function(...e){return t.apply(Ym(this),e),ur(H2.get(this))}:function(...e){return ur(t.apply(Ym(this),e))}}function N5(t){return typeof t=="function"?A5(t):(t instanceof IDBTransaction&&w5(t),x5(t,_5())?new Proxy(t,mp):t)}function ur(t){if(t instanceof IDBRequest)return E5(t);if(Gm.has(t))return Gm.get(t);const e=N5(t);return e!==t&&(Gm.set(t,e),Wg.set(e,t)),e}const Ym=t=>Wg.get(t);function R5(t,e,{blocked:n,upgrade:s,blocking:a,terminated:i}={}){const r=indexedDB.open(t,e),l=ur(r);return s&&r.addEventListener("upgradeneeded",c=>{s(ur(r.result),c.oldVersion,c.newVersion,ur(r.transaction),c)}),n&&r.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),a&&c.addEventListener("versionchange",h=>a(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const k5=["get","getKey","getAll","getAllKeys","count"],C5=["put","add","delete","clear"],Km=new Map;function Nv(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Km.get(e))return Km.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,a=C5.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(a||k5.includes(n)))return;const i=async function(r,...l){const c=this.transaction(r,a?"readwrite":"readonly");let h=c.store;return s&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),a&&c.done]))[0]};return Km.set(e,i),i}S5(t=>({...t,get:(e,n,s)=>Nv(e,n)||t.get(e,n,s),has:(e,n)=>!!Nv(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I5{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(M5(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function M5(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const pp="@firebase/app",Rv="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=new Od("@firebase/app"),D5="@firebase/app-compat",O5="@firebase/analytics-compat",j5="@firebase/analytics",P5="@firebase/app-check-compat",V5="@firebase/app-check",L5="@firebase/auth",U5="@firebase/auth-compat",B5="@firebase/database",z5="@firebase/data-connect",$5="@firebase/database-compat",F5="@firebase/functions",H5="@firebase/functions-compat",q5="@firebase/installations",G5="@firebase/installations-compat",Y5="@firebase/messaging",K5="@firebase/messaging-compat",Q5="@firebase/performance",X5="@firebase/performance-compat",W5="@firebase/remote-config",J5="@firebase/remote-config-compat",Z5="@firebase/storage",ek="@firebase/storage-compat",tk="@firebase/firestore",nk="@firebase/ai",sk="@firebase/firestore-compat",ak="firebase",ik="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp="[DEFAULT]",rk={[pp]:"fire-core",[D5]:"fire-core-compat",[j5]:"fire-analytics",[O5]:"fire-analytics-compat",[V5]:"fire-app-check",[P5]:"fire-app-check-compat",[L5]:"fire-auth",[U5]:"fire-auth-compat",[B5]:"fire-rtdb",[z5]:"fire-data-connect",[$5]:"fire-rtdb-compat",[F5]:"fire-fn",[H5]:"fire-fn-compat",[q5]:"fire-iid",[G5]:"fire-iid-compat",[Y5]:"fire-fcm",[K5]:"fire-fcm-compat",[Q5]:"fire-perf",[X5]:"fire-perf-compat",[W5]:"fire-rc",[J5]:"fire-rc-compat",[Z5]:"fire-gcs",[ek]:"fire-gcs-compat",[tk]:"fire-fst",[sk]:"fire-fst-compat",[nk]:"fire-vertex","fire-js":"fire-js",[ak]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf=new Map,ok=new Map,yp=new Map;function kv(t,e){try{t.container.addComponent(e)}catch(n){_i.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function xr(t){const e=t.name;if(yp.has(e))return _i.debug(`There were multiple attempts to register component ${e}.`),!1;yp.set(e,t);for(const n of qf.values())kv(n,t);for(const n of ok.values())kv(n,t);return!0}function Bu(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ga(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lk={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},hr=new Yl("app","Firebase",lk);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ck{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new xi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw hr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kl=ik;function G2(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:gp,automaticDataCollectionEnabled:!0,...e},a=s.name;if(typeof a!="string"||!a)throw hr.create("bad-app-name",{appName:String(a)});if(n||(n=z2()),!n)throw hr.create("no-options");const i=qf.get(a);if(i){if(vr(n,i.options)&&vr(s,i.config))return i;throw hr.create("duplicate-app",{appName:a})}const r=new p5(a);for(const c of yp.values())r.addComponent(c);const l=new ck(n,s,r);return qf.set(a,l),l}function Jg(t=gp){const e=qf.get(t);if(!e&&t===gp&&z2())return G2();if(!e)throw hr.create("no-app",{appName:t});return e}function fi(t,e,n){let s=rk[t]??t;n&&(s+=`-${n}`);const a=s.match(/\s|\//),i=e.match(/\s|\//);if(a||i){const r=[`Unable to register library "${s}" with version "${e}":`];a&&r.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&i&&r.push("and"),i&&r.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_i.warn(r.join(" "));return}xr(new xi(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uk="firebase-heartbeat-database",hk=1,gu="firebase-heartbeat-store";let Qm=null;function Y2(){return Qm||(Qm=R5(uk,hk,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(gu)}catch(n){console.warn(n)}}}}).catch(t=>{throw hr.create("idb-open",{originalErrorMessage:t.message})})),Qm}async function fk(t){try{const n=(await Y2()).transaction(gu),s=await n.objectStore(gu).get(K2(t));return await n.done,s}catch(e){if(e instanceof Ni)_i.warn(e.message);else{const n=hr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});_i.warn(n.message)}}}async function Cv(t,e){try{const s=(await Y2()).transaction(gu,"readwrite");await s.objectStore(gu).put(e,K2(t)),await s.done}catch(n){if(n instanceof Ni)_i.warn(n.message);else{const s=hr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});_i.warn(s.message)}}}function K2(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dk=1024,mk=30;class pk{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new yk(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Iv();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(r=>r.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:a}),this._heartbeatsCache.heartbeats.length>mk){const r=bk(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){_i.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Iv(),{heartbeatsToSend:s,unsentEntries:a}=gk(this._heartbeatsCache.heartbeats),i=Hf(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return _i.warn(n),""}}}function Iv(){return new Date().toISOString().substring(0,10)}function gk(t,e=dk){const n=[];let s=t.slice();for(const a of t){const i=n.find(r=>r.agent===a.agent);if(i){if(i.dates.push(a.date),Mv(n)>e){i.dates.pop();break}}else if(n.push({agent:a.agent,dates:[a.date]}),Mv(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class yk{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Xg()?ZR().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await fk(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Cv(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Cv(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Mv(t){return Hf(JSON.stringify({version:2,heartbeats:t})).length}function bk(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vk(t){xr(new xi("platform-logger",e=>new I5(e),"PRIVATE")),xr(new xi("heartbeat",e=>new pk(e),"PRIVATE")),fi(pp,Rv,t),fi(pp,Rv,"esm2020"),fi("fire-js","")}vk("");var xk="firebase",_k="12.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fi(xk,_k,"app");var Dv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fr,Q2;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,x){function E(){}E.prototype=x.prototype,T.F=x.prototype,T.prototype=new E,T.prototype.constructor=T,T.D=function(k,R,D){for(var w=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)w[ae-2]=arguments[ae];return x.prototype[R].apply(k,w)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,n),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function a(T,x,E){E||(E=0);const k=Array(16);if(typeof x=="string")for(var R=0;R<16;++R)k[R]=x.charCodeAt(E++)|x.charCodeAt(E++)<<8|x.charCodeAt(E++)<<16|x.charCodeAt(E++)<<24;else for(R=0;R<16;++R)k[R]=x[E++]|x[E++]<<8|x[E++]<<16|x[E++]<<24;x=T.g[0],E=T.g[1],R=T.g[2];let D=T.g[3],w;w=x+(D^E&(R^D))+k[0]+3614090360&4294967295,x=E+(w<<7&4294967295|w>>>25),w=D+(R^x&(E^R))+k[1]+3905402710&4294967295,D=x+(w<<12&4294967295|w>>>20),w=R+(E^D&(x^E))+k[2]+606105819&4294967295,R=D+(w<<17&4294967295|w>>>15),w=E+(x^R&(D^x))+k[3]+3250441966&4294967295,E=R+(w<<22&4294967295|w>>>10),w=x+(D^E&(R^D))+k[4]+4118548399&4294967295,x=E+(w<<7&4294967295|w>>>25),w=D+(R^x&(E^R))+k[5]+1200080426&4294967295,D=x+(w<<12&4294967295|w>>>20),w=R+(E^D&(x^E))+k[6]+2821735955&4294967295,R=D+(w<<17&4294967295|w>>>15),w=E+(x^R&(D^x))+k[7]+4249261313&4294967295,E=R+(w<<22&4294967295|w>>>10),w=x+(D^E&(R^D))+k[8]+1770035416&4294967295,x=E+(w<<7&4294967295|w>>>25),w=D+(R^x&(E^R))+k[9]+2336552879&4294967295,D=x+(w<<12&4294967295|w>>>20),w=R+(E^D&(x^E))+k[10]+4294925233&4294967295,R=D+(w<<17&4294967295|w>>>15),w=E+(x^R&(D^x))+k[11]+2304563134&4294967295,E=R+(w<<22&4294967295|w>>>10),w=x+(D^E&(R^D))+k[12]+1804603682&4294967295,x=E+(w<<7&4294967295|w>>>25),w=D+(R^x&(E^R))+k[13]+4254626195&4294967295,D=x+(w<<12&4294967295|w>>>20),w=R+(E^D&(x^E))+k[14]+2792965006&4294967295,R=D+(w<<17&4294967295|w>>>15),w=E+(x^R&(D^x))+k[15]+1236535329&4294967295,E=R+(w<<22&4294967295|w>>>10),w=x+(R^D&(E^R))+k[1]+4129170786&4294967295,x=E+(w<<5&4294967295|w>>>27),w=D+(E^R&(x^E))+k[6]+3225465664&4294967295,D=x+(w<<9&4294967295|w>>>23),w=R+(x^E&(D^x))+k[11]+643717713&4294967295,R=D+(w<<14&4294967295|w>>>18),w=E+(D^x&(R^D))+k[0]+3921069994&4294967295,E=R+(w<<20&4294967295|w>>>12),w=x+(R^D&(E^R))+k[5]+3593408605&4294967295,x=E+(w<<5&4294967295|w>>>27),w=D+(E^R&(x^E))+k[10]+38016083&4294967295,D=x+(w<<9&4294967295|w>>>23),w=R+(x^E&(D^x))+k[15]+3634488961&4294967295,R=D+(w<<14&4294967295|w>>>18),w=E+(D^x&(R^D))+k[4]+3889429448&4294967295,E=R+(w<<20&4294967295|w>>>12),w=x+(R^D&(E^R))+k[9]+568446438&4294967295,x=E+(w<<5&4294967295|w>>>27),w=D+(E^R&(x^E))+k[14]+3275163606&4294967295,D=x+(w<<9&4294967295|w>>>23),w=R+(x^E&(D^x))+k[3]+4107603335&4294967295,R=D+(w<<14&4294967295|w>>>18),w=E+(D^x&(R^D))+k[8]+1163531501&4294967295,E=R+(w<<20&4294967295|w>>>12),w=x+(R^D&(E^R))+k[13]+2850285829&4294967295,x=E+(w<<5&4294967295|w>>>27),w=D+(E^R&(x^E))+k[2]+4243563512&4294967295,D=x+(w<<9&4294967295|w>>>23),w=R+(x^E&(D^x))+k[7]+1735328473&4294967295,R=D+(w<<14&4294967295|w>>>18),w=E+(D^x&(R^D))+k[12]+2368359562&4294967295,E=R+(w<<20&4294967295|w>>>12),w=x+(E^R^D)+k[5]+4294588738&4294967295,x=E+(w<<4&4294967295|w>>>28),w=D+(x^E^R)+k[8]+2272392833&4294967295,D=x+(w<<11&4294967295|w>>>21),w=R+(D^x^E)+k[11]+1839030562&4294967295,R=D+(w<<16&4294967295|w>>>16),w=E+(R^D^x)+k[14]+4259657740&4294967295,E=R+(w<<23&4294967295|w>>>9),w=x+(E^R^D)+k[1]+2763975236&4294967295,x=E+(w<<4&4294967295|w>>>28),w=D+(x^E^R)+k[4]+1272893353&4294967295,D=x+(w<<11&4294967295|w>>>21),w=R+(D^x^E)+k[7]+4139469664&4294967295,R=D+(w<<16&4294967295|w>>>16),w=E+(R^D^x)+k[10]+3200236656&4294967295,E=R+(w<<23&4294967295|w>>>9),w=x+(E^R^D)+k[13]+681279174&4294967295,x=E+(w<<4&4294967295|w>>>28),w=D+(x^E^R)+k[0]+3936430074&4294967295,D=x+(w<<11&4294967295|w>>>21),w=R+(D^x^E)+k[3]+3572445317&4294967295,R=D+(w<<16&4294967295|w>>>16),w=E+(R^D^x)+k[6]+76029189&4294967295,E=R+(w<<23&4294967295|w>>>9),w=x+(E^R^D)+k[9]+3654602809&4294967295,x=E+(w<<4&4294967295|w>>>28),w=D+(x^E^R)+k[12]+3873151461&4294967295,D=x+(w<<11&4294967295|w>>>21),w=R+(D^x^E)+k[15]+530742520&4294967295,R=D+(w<<16&4294967295|w>>>16),w=E+(R^D^x)+k[2]+3299628645&4294967295,E=R+(w<<23&4294967295|w>>>9),w=x+(R^(E|~D))+k[0]+4096336452&4294967295,x=E+(w<<6&4294967295|w>>>26),w=D+(E^(x|~R))+k[7]+1126891415&4294967295,D=x+(w<<10&4294967295|w>>>22),w=R+(x^(D|~E))+k[14]+2878612391&4294967295,R=D+(w<<15&4294967295|w>>>17),w=E+(D^(R|~x))+k[5]+4237533241&4294967295,E=R+(w<<21&4294967295|w>>>11),w=x+(R^(E|~D))+k[12]+1700485571&4294967295,x=E+(w<<6&4294967295|w>>>26),w=D+(E^(x|~R))+k[3]+2399980690&4294967295,D=x+(w<<10&4294967295|w>>>22),w=R+(x^(D|~E))+k[10]+4293915773&4294967295,R=D+(w<<15&4294967295|w>>>17),w=E+(D^(R|~x))+k[1]+2240044497&4294967295,E=R+(w<<21&4294967295|w>>>11),w=x+(R^(E|~D))+k[8]+1873313359&4294967295,x=E+(w<<6&4294967295|w>>>26),w=D+(E^(x|~R))+k[15]+4264355552&4294967295,D=x+(w<<10&4294967295|w>>>22),w=R+(x^(D|~E))+k[6]+2734768916&4294967295,R=D+(w<<15&4294967295|w>>>17),w=E+(D^(R|~x))+k[13]+1309151649&4294967295,E=R+(w<<21&4294967295|w>>>11),w=x+(R^(E|~D))+k[4]+4149444226&4294967295,x=E+(w<<6&4294967295|w>>>26),w=D+(E^(x|~R))+k[11]+3174756917&4294967295,D=x+(w<<10&4294967295|w>>>22),w=R+(x^(D|~E))+k[2]+718787259&4294967295,R=D+(w<<15&4294967295|w>>>17),w=E+(D^(R|~x))+k[9]+3951481745&4294967295,T.g[0]=T.g[0]+x&4294967295,T.g[1]=T.g[1]+(R+(w<<21&4294967295|w>>>11))&4294967295,T.g[2]=T.g[2]+R&4294967295,T.g[3]=T.g[3]+D&4294967295}s.prototype.v=function(T,x){x===void 0&&(x=T.length);const E=x-this.blockSize,k=this.C;let R=this.h,D=0;for(;D<x;){if(R==0)for(;D<=E;)a(this,T,D),D+=this.blockSize;if(typeof T=="string"){for(;D<x;)if(k[R++]=T.charCodeAt(D++),R==this.blockSize){a(this,k),R=0;break}}else for(;D<x;)if(k[R++]=T[D++],R==this.blockSize){a(this,k),R=0;break}}this.h=R,this.o+=x},s.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var x=1;x<T.length-8;++x)T[x]=0;x=this.o*8;for(var E=T.length-8;E<T.length;++E)T[E]=x&255,x/=256;for(this.v(T),T=Array(16),x=0,E=0;E<4;++E)for(let k=0;k<32;k+=8)T[x++]=this.g[E]>>>k&255;return T};function i(T,x){var E=l;return Object.prototype.hasOwnProperty.call(E,T)?E[T]:E[T]=x(T)}function r(T,x){this.h=x;const E=[];let k=!0;for(let R=T.length-1;R>=0;R--){const D=T[R]|0;k&&D==x||(E[R]=D,k=!1)}this.g=E}var l={};function c(T){return-128<=T&&T<128?i(T,function(x){return new r([x|0],x<0?-1:0)}):new r([T|0],T<0?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return p;if(T<0)return O(h(-T));const x=[];let E=1;for(let k=0;T>=E;k++)x[k]=T/E|0,E*=4294967296;return new r(x,0)}function d(T,x){if(T.length==0)throw Error("number format error: empty string");if(x=x||10,x<2||36<x)throw Error("radix out of range: "+x);if(T.charAt(0)=="-")return O(d(T.substring(1),x));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const E=h(Math.pow(x,8));let k=p;for(let D=0;D<T.length;D+=8){var R=Math.min(8,T.length-D);const w=parseInt(T.substring(D,D+R),x);R<8?(R=h(Math.pow(x,R)),k=k.j(R).add(h(w))):(k=k.j(E),k=k.add(h(w)))}return k}var p=c(0),g=c(1),y=c(16777216);t=r.prototype,t.m=function(){if(I(this))return-O(this).m();let T=0,x=1;for(let E=0;E<this.g.length;E++){const k=this.i(E);T+=(k>=0?k:4294967296+k)*x,x*=4294967296}return T},t.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(I(this))return"-"+O(this).toString(T);const x=h(Math.pow(T,6));var E=this;let k="";for(;;){const R=L(E,x).g;E=_(E,R.j(x));let D=((E.g.length>0?E.g[0]:E.h)>>>0).toString(T);if(E=R,C(E))return D+k;for(;D.length<6;)D="0"+D;k=D+k}},t.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(let x=0;x<T.g.length;x++)if(T.g[x]!=0)return!1;return!0}function I(T){return T.h==-1}t.l=function(T){return T=_(this,T),I(T)?-1:C(T)?0:1};function O(T){const x=T.g.length,E=[];for(let k=0;k<x;k++)E[k]=~T.g[k];return new r(E,~T.h).add(g)}t.abs=function(){return I(this)?O(this):this},t.add=function(T){const x=Math.max(this.g.length,T.g.length),E=[];let k=0;for(let R=0;R<=x;R++){let D=k+(this.i(R)&65535)+(T.i(R)&65535),w=(D>>>16)+(this.i(R)>>>16)+(T.i(R)>>>16);k=w>>>16,D&=65535,w&=65535,E[R]=w<<16|D}return new r(E,E[E.length-1]&-2147483648?-1:0)};function _(T,x){return T.add(O(x))}t.j=function(T){if(C(this)||C(T))return p;if(I(this))return I(T)?O(this).j(O(T)):O(O(this).j(T));if(I(T))return O(this.j(O(T)));if(this.l(y)<0&&T.l(y)<0)return h(this.m()*T.m());const x=this.g.length+T.g.length,E=[];for(var k=0;k<2*x;k++)E[k]=0;for(k=0;k<this.g.length;k++)for(let R=0;R<T.g.length;R++){const D=this.i(k)>>>16,w=this.i(k)&65535,ae=T.i(R)>>>16,_e=T.i(R)&65535;E[2*k+2*R]+=w*_e,v(E,2*k+2*R),E[2*k+2*R+1]+=D*_e,v(E,2*k+2*R+1),E[2*k+2*R+1]+=w*ae,v(E,2*k+2*R+1),E[2*k+2*R+2]+=D*ae,v(E,2*k+2*R+2)}for(T=0;T<x;T++)E[T]=E[2*T+1]<<16|E[2*T];for(T=x;T<2*x;T++)E[T]=0;return new r(E,0)};function v(T,x){for(;(T[x]&65535)!=T[x];)T[x+1]+=T[x]>>>16,T[x]&=65535,x++}function S(T,x){this.g=T,this.h=x}function L(T,x){if(C(x))throw Error("division by zero");if(C(T))return new S(p,p);if(I(T))return x=L(O(T),x),new S(O(x.g),O(x.h));if(I(x))return x=L(T,O(x)),new S(O(x.g),x.h);if(T.g.length>30){if(I(T)||I(x))throw Error("slowDivide_ only works with positive integers.");for(var E=g,k=x;k.l(T)<=0;)E=j(E),k=j(k);var R=H(E,1),D=H(k,1);for(k=H(k,2),E=H(E,2);!C(k);){var w=D.add(k);w.l(T)<=0&&(R=R.add(E),D=w),k=H(k,1),E=H(E,1)}return x=_(T,R.j(x)),new S(R,x)}for(R=p;T.l(x)>=0;){for(E=Math.max(1,Math.floor(T.m()/x.m())),k=Math.ceil(Math.log(E)/Math.LN2),k=k<=48?1:Math.pow(2,k-48),D=h(E),w=D.j(x);I(w)||w.l(T)>0;)E-=k,D=h(E),w=D.j(x);C(D)&&(D=g),R=R.add(D),T=_(T,w)}return new S(R,T)}t.B=function(T){return L(this,T).h},t.and=function(T){const x=Math.max(this.g.length,T.g.length),E=[];for(let k=0;k<x;k++)E[k]=this.i(k)&T.i(k);return new r(E,this.h&T.h)},t.or=function(T){const x=Math.max(this.g.length,T.g.length),E=[];for(let k=0;k<x;k++)E[k]=this.i(k)|T.i(k);return new r(E,this.h|T.h)},t.xor=function(T){const x=Math.max(this.g.length,T.g.length),E=[];for(let k=0;k<x;k++)E[k]=this.i(k)^T.i(k);return new r(E,this.h^T.h)};function j(T){const x=T.g.length+1,E=[];for(let k=0;k<x;k++)E[k]=T.i(k)<<1|T.i(k-1)>>>31;return new r(E,T.h)}function H(T,x){const E=x>>5;x%=32;const k=T.g.length-E,R=[];for(let D=0;D<k;D++)R[D]=x>0?T.i(D+E)>>>x|T.i(D+E+1)<<32-x:T.i(D+E);return new r(R,T.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,Q2=s,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=h,r.fromString=d,fr=r}).apply(typeof Dv<"u"?Dv:typeof self<"u"?self:typeof window<"u"?window:{});var Rh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var X2,Sc,W2,ef,bp,J2,Z2,eE;(function(){var t,e=Object.defineProperty;function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Rh=="object"&&Rh];for(var f=0;f<o.length;++f){var m=o[f];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var s=n(this);function a(o,f){if(f)e:{var m=s;o=o.split(".");for(var b=0;b<o.length-1;b++){var M=o[b];if(!(M in m))break e;m=m[M]}o=o[o.length-1],b=m[o],f=f(b),f!=b&&f!=null&&e(m,o,{configurable:!0,writable:!0,value:f})}}a("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),a("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),a("Object.entries",function(o){return o||function(f){var m=[],b;for(b in f)Object.prototype.hasOwnProperty.call(f,b)&&m.push([b,f[b]]);return m}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},r=this||self;function l(o){var f=typeof o;return f=="object"&&o!=null||f=="function"}function c(o,f,m){return o.call.apply(o.bind,arguments)}function h(o,f,m){return h=c,h.apply(null,arguments)}function d(o,f){var m=Array.prototype.slice.call(arguments,1);return function(){var b=m.slice();return b.push.apply(b,arguments),o.apply(this,b)}}function p(o,f){function m(){}m.prototype=f.prototype,o.Z=f.prototype,o.prototype=new m,o.prototype.constructor=o,o.Ob=function(b,M,U){for(var X=Array(arguments.length-2),be=2;be<arguments.length;be++)X[be-2]=arguments[be];return f.prototype[M].apply(b,X)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function y(o){const f=o.length;if(f>0){const m=Array(f);for(let b=0;b<f;b++)m[b]=o[b];return m}return[]}function C(o,f){for(let b=1;b<arguments.length;b++){const M=arguments[b];var m=typeof M;if(m=m!="object"?m:M?Array.isArray(M)?"array":m:"null",m=="array"||m=="object"&&typeof M.length=="number"){m=o.length||0;const U=M.length||0;o.length=m+U;for(let X=0;X<U;X++)o[m+X]=M[X]}else o.push(M)}}class I{constructor(f,m){this.i=f,this.j=m,this.h=0,this.g=null}get(){let f;return this.h>0?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function O(o){r.setTimeout(()=>{throw o},0)}function _(){var o=T;let f=null;return o.g&&(f=o.g,o.g=o.g.next,o.g||(o.h=null),f.next=null),f}class v{constructor(){this.h=this.g=null}add(f,m){const b=S.get();b.set(f,m),this.h?this.h.next=b:this.g=b,this.h=b}}var S=new I(()=>new L,o=>o.reset());class L{constructor(){this.next=this.g=this.h=null}set(f,m){this.h=f,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let j,H=!1,T=new v,x=()=>{const o=Promise.resolve(void 0);j=()=>{o.then(E)}};function E(){for(var o;o=_();){try{o.h.call(o.g)}catch(m){O(m)}var f=S;f.j(o),f.h<100&&(f.h++,o.next=f.g,f.g=o)}H=!1}function k(){this.u=this.u,this.C=this.C}k.prototype.u=!1,k.prototype.dispose=function(){this.u||(this.u=!0,this.N())},k.prototype[Symbol.dispose]=function(){this.dispose()},k.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function R(o,f){this.type=o,this.g=this.target=f,this.defaultPrevented=!1}R.prototype.h=function(){this.defaultPrevented=!0};var D=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var o=!1,f=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const m=()=>{};r.addEventListener("test",m,f),r.removeEventListener("test",m,f)}catch{}return o}();function w(o){return/^[\s\xa0]*$/.test(o)}function ae(o,f){R.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,f)}p(ae,R),ae.prototype.init=function(o,f){const m=this.type=o.type,b=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=f,f=o.relatedTarget,f||(m=="mouseover"?f=o.fromElement:m=="mouseout"&&(f=o.toElement)),this.relatedTarget=f,b?(this.clientX=b.clientX!==void 0?b.clientX:b.pageX,this.clientY=b.clientY!==void 0?b.clientY:b.pageY,this.screenX=b.screenX||0,this.screenY=b.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&ae.Z.h.call(this)},ae.prototype.h=function(){ae.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var _e="closure_listenable_"+(Math.random()*1e6|0),K=0;function te(o,f,m,b,M){this.listener=o,this.proxy=null,this.src=f,this.type=m,this.capture=!!b,this.ha=M,this.key=++K,this.da=this.fa=!1}function ne(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function pe(o,f,m){for(const b in o)f.call(m,o[b],b,o)}function Pe(o,f){for(const m in o)f.call(void 0,o[m],m,o)}function _t(o){const f={};for(const m in o)f[m]=o[m];return f}const $e="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ot(o,f){let m,b;for(let M=1;M<arguments.length;M++){b=arguments[M];for(m in b)o[m]=b[m];for(let U=0;U<$e.length;U++)m=$e[U],Object.prototype.hasOwnProperty.call(b,m)&&(o[m]=b[m])}}function mt(o){this.src=o,this.g={},this.h=0}mt.prototype.add=function(o,f,m,b,M){const U=o.toString();o=this.g[U],o||(o=this.g[U]=[],this.h++);const X=F(o,f,b,M);return X>-1?(f=o[X],m||(f.fa=!1)):(f=new te(f,this.src,U,!!b,M),f.fa=m,o.push(f)),f};function nt(o,f){const m=f.type;if(m in o.g){var b=o.g[m],M=Array.prototype.indexOf.call(b,f,void 0),U;(U=M>=0)&&Array.prototype.splice.call(b,M,1),U&&(ne(f),o.g[m].length==0&&(delete o.g[m],o.h--))}}function F(o,f,m,b){for(let M=0;M<o.length;++M){const U=o[M];if(!U.da&&U.listener==f&&U.capture==!!m&&U.ha==b)return M}return-1}var ie="closure_lm_"+(Math.random()*1e6|0),se={};function Ne(o,f,m,b,M){if(b&&b.once)return ke(o,f,m,b,M);if(Array.isArray(f)){for(let U=0;U<f.length;U++)Ne(o,f[U],m,b,M);return null}return m=tn(m),o&&o[_e]?o.J(f,m,l(b)?!!b.capture:!!b,M):re(o,f,m,!1,b,M)}function re(o,f,m,b,M,U){if(!f)throw Error("Invalid event type");const X=l(M)?!!M.capture:!!M;let be=Vn(o);if(be||(o[ie]=be=new mt(o)),m=be.add(f,m,b,X,U),m.proxy)return m;if(b=ve(),m.proxy=b,b.src=o,b.listener=m,o.addEventListener)D||(M=X),M===void 0&&(M=!1),o.addEventListener(f.toString(),b,M);else if(o.attachEvent)o.attachEvent(Ye(f.toString()),b);else if(o.addListener&&o.removeListener)o.addListener(b);else throw Error("addEventListener and attachEvent are unavailable.");return m}function ve(){function o(m){return f.call(o.src,o.listener,m)}const f=Cn;return o}function ke(o,f,m,b,M){if(Array.isArray(f)){for(let U=0;U<f.length;U++)ke(o,f[U],m,b,M);return null}return m=tn(m),o&&o[_e]?o.K(f,m,l(b)?!!b.capture:!!b,M):re(o,f,m,!0,b,M)}function Ge(o,f,m,b,M){if(Array.isArray(f))for(var U=0;U<f.length;U++)Ge(o,f[U],m,b,M);else b=l(b)?!!b.capture:!!b,m=tn(m),o&&o[_e]?(o=o.i,U=String(f).toString(),U in o.g&&(f=o.g[U],m=F(f,m,b,M),m>-1&&(ne(f[m]),Array.prototype.splice.call(f,m,1),f.length==0&&(delete o.g[U],o.h--)))):o&&(o=Vn(o))&&(f=o.g[f.toString()],o=-1,f&&(o=F(f,m,b,M)),(m=o>-1?f[o]:null)&&ze(m))}function ze(o){if(typeof o!="number"&&o&&!o.da){var f=o.src;if(f&&f[_e])nt(f.i,o);else{var m=o.type,b=o.proxy;f.removeEventListener?f.removeEventListener(m,b,o.capture):f.detachEvent?f.detachEvent(Ye(m),b):f.addListener&&f.removeListener&&f.removeListener(b),(m=Vn(f))?(nt(m,o),m.h==0&&(m.src=null,f[ie]=null)):ne(o)}}}function Ye(o){return o in se?se[o]:se[o]="on"+o}function Cn(o,f){if(o.da)o=!0;else{f=new ae(f,this);const m=o.listener,b=o.ha||o.src;o.fa&&ze(o),o=m.call(b,f)}return o}function Vn(o){return o=o[ie],o instanceof mt?o:null}var is="__closure_events_fn_"+(Math.random()*1e9>>>0);function tn(o){return typeof o=="function"?o:(o[is]||(o[is]=function(f){return o.handleEvent(f)}),o[is])}function he(){k.call(this),this.i=new mt(this),this.M=this,this.G=null}p(he,k),he.prototype[_e]=!0,he.prototype.removeEventListener=function(o,f,m,b){Ge(this,o,f,m,b)};function Se(o,f){var m,b=o.G;if(b)for(m=[];b;b=b.G)m.push(b);if(o=o.M,b=f.type||f,typeof f=="string")f=new R(f,o);else if(f instanceof R)f.target=f.target||o;else{var M=f;f=new R(b,o),Ot(f,M)}M=!0;let U,X;if(m)for(X=m.length-1;X>=0;X--)U=f.g=m[X],M=we(U,b,!0,f)&&M;if(U=f.g=o,M=we(U,b,!0,f)&&M,M=we(U,b,!1,f)&&M,m)for(X=0;X<m.length;X++)U=f.g=m[X],M=we(U,b,!1,f)&&M}he.prototype.N=function(){if(he.Z.N.call(this),this.i){var o=this.i;for(const f in o.g){const m=o.g[f];for(let b=0;b<m.length;b++)ne(m[b]);delete o.g[f],o.h--}}this.G=null},he.prototype.J=function(o,f,m,b){return this.i.add(String(o),f,!1,m,b)},he.prototype.K=function(o,f,m,b){return this.i.add(String(o),f,!0,m,b)};function we(o,f,m,b){if(f=o.i.g[String(f)],!f)return!0;f=f.concat();let M=!0;for(let U=0;U<f.length;++U){const X=f[U];if(X&&!X.da&&X.capture==m){const be=X.listener,ct=X.ha||X.src;X.fa&&nt(o.i,X),M=be.call(ct,b)!==!1&&M}}return M&&!b.defaultPrevented}function Ke(o,f){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(f)>2147483647?-1:r.setTimeout(o,f||0)}function St(o){o.g=Ke(()=>{o.g=null,o.i&&(o.i=!1,St(o))},o.l);const f=o.h;o.h=null,o.m.apply(null,f)}class oe extends k{constructor(f,m){super(),this.m=f,this.l=m,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:St(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(o){k.call(this),this.h=o,this.g={}}p(ee,k);var ge=[];function le(o){pe(o.g,function(f,m){this.g.hasOwnProperty(m)&&ze(f)},o),o.g={}}ee.prototype.N=function(){ee.Z.N.call(this),le(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ae=r.JSON.stringify,me=r.JSON.parse,Te=class{stringify(o){return r.JSON.stringify(o,void 0)}parse(o){return r.JSON.parse(o,void 0)}};function st(){}function at(){}var At={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function it(){R.call(this,"d")}p(it,R);function Ln(){R.call(this,"c")}p(Ln,R);var Ve={},xe=null;function ue(){return xe=xe||new he}Ve.Ia="serverreachability";function Xn(o){R.call(this,Ve.Ia,o)}p(Xn,R);function Wt(o){const f=ue();Se(f,new Xn(f))}Ve.STAT_EVENT="statevent";function En(o,f){R.call(this,Ve.STAT_EVENT,o),this.stat=f}p(En,R);function Nt(o){const f=ue();Se(f,new En(f,o))}Ve.Ja="timingevent";function lt(o,f){R.call(this,Ve.Ja,o),this.size=f}p(lt,R);function vt(o,f){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){o()},f)}function Un(){this.g=!0}Un.prototype.ua=function(){this.g=!1};function Oe(o,f,m,b,M,U){o.info(function(){if(o.g)if(U){var X="",be=U.split("&");for(let rt=0;rt<be.length;rt++){var ct=be[rt].split("=");if(ct.length>1){const ut=ct[0];ct=ct[1];const Qt=ut.split("_");X=Qt.length>=2&&Qt[1]=="type"?X+(ut+"="+ct+"&"):X+(ut+"=redacted&")}}}else X=null;else X=U;return"XMLHTTP REQ ("+b+") [attempt "+M+"]: "+f+`
`+m+`
`+X})}function ft(o,f,m,b,M,U,X){o.info(function(){return"XMLHTTP RESP ("+b+") [ attempt "+M+"]: "+f+`
`+m+`
`+U+" "+X})}function Ct(o,f,m,b){o.info(function(){return"XMLHTTP TEXT ("+f+"): "+pt(o,m)+(b?" "+b:"")})}function Kt(o,f){o.info(function(){return"TIMEOUT: "+f})}Un.prototype.info=function(){};function pt(o,f){if(!o.g)return f;if(!f)return null;try{const U=JSON.parse(f);if(U){for(o=0;o<U.length;o++)if(Array.isArray(U[o])){var m=U[o];if(!(m.length<2)){var b=m[1];if(Array.isArray(b)&&!(b.length<1)){var M=b[0];if(M!="noop"&&M!="stop"&&M!="close")for(let X=1;X<b.length;X++)b[X]=""}}}}return Ae(U)}catch{return f}}var nn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Lt={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ut;function Ri(){}p(Ri,st),Ri.prototype.g=function(){return new XMLHttpRequest},Ut=new Ri;function Wn(o){return encodeURIComponent(String(o))}function oa(o){var f=1;o=o.split(":");const m=[];for(;f>0&&o.length;)m.push(o.shift()),f--;return o.length&&m.push(o.join(":")),m}function Bs(o,f,m,b){this.j=o,this.i=f,this.l=m,this.S=b||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new la}function la(){this.i=null,this.g="",this.h=!1}var zs={},Bt={};function $s(o,f,m){o.M=1,o.A=ha(Ss(f)),o.u=m,o.R=!0,rs(o,null)}function rs(o,f){o.F=Date.now(),Or(o),o.B=Ss(o.A);var m=o.B,b=o.S;Array.isArray(b)||(b=[String(b)]),J(m.i,"t",b),o.C=0,m=o.j.L,o.h=new la,o.g=A(o.j,m?f:null,!o.u),o.P>0&&(o.O=new oe(h(o.Y,o,o.g),o.P)),f=o.V,m=o.g,b=o.ba;var M="readystatechange";Array.isArray(M)||(M&&(ge[0]=M.toString()),M=ge);for(let U=0;U<M.length;U++){const X=Ne(m,M[U],b||f.handleEvent,!1,f.h||f);if(!X)break;f.g[X.key]=X}f=o.J?_t(o.J):{},o.u?(o.v||(o.v="POST"),f["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,f)):(o.v="GET",o.g.ea(o.B,o.v,null,f)),Wt(),Oe(o.i,o.v,o.B,o.l,o.S,o.u)}Bs.prototype.ba=function(o){o=o.target;const f=this.O;f&&Sa(o)==3?f.j():this.Y(o)},Bs.prototype.Y=function(o){try{if(o==this.g)e:{const be=Sa(this.g),ct=this.g.ya(),rt=this.g.ca();if(!(be<3)&&(be!=3||this.g&&(this.h.h||this.g.la()||rh(this.g)))){this.K||be!=4||ct==7||(ct==8||rt<=0?Wt(3):Wt(2)),hs(this);var f=this.g.ca();this.X=f;var m=Dr(this);if(this.o=f==200,ft(this.i,this.v,this.B,this.l,this.S,be,f),this.o){if(this.U&&!this.L){t:{if(this.g){var b,M=this.g;if((b=M.g?M.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(b)){var U=b;break t}}U=null}if(o=U)Ct(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ta(this,o);else{this.o=!1,this.m=3,Nt(12),ln(this),ca(this);break e}}if(this.R){o=!0;let ut;for(;!this.K&&this.C<m.length;)if(ut=ki(this,m),ut==Bt){be==4&&(this.m=4,Nt(14),o=!1),Ct(this.i,this.l,null,"[Incomplete Response]");break}else if(ut==zs){this.m=4,Nt(15),Ct(this.i,this.l,m,"[Invalid Chunk]"),o=!1;break}else Ct(this.i,this.l,ut,null),Ta(this,ut);if(Ga(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),be!=4||m.length!=0||this.h.h||(this.m=1,Nt(16),o=!1),this.o=this.o&&o,!o)Ct(this.i,this.l,m,"[Invalid Chunked Response]"),ln(this),ca(this);else if(m.length>0&&!this.W){this.W=!0;var X=this.j;X.g==this&&X.aa&&!X.P&&(X.j.info("Great, no buffering proxy detected. Bytes received: "+m.length),Io(X),X.P=!0,Nt(11))}}else Ct(this.i,this.l,m,null),Ta(this,m);be==4&&ln(this),this.o&&!this.K&&(be==4?uh(this.j,this):(this.o=!1,Or(this)))}else sc(this.g),f==400&&m.indexOf("Unknown SID")>0?(this.m=3,Nt(12)):(this.m=0,Nt(13)),ln(this),ca(this)}}}catch{}finally{}};function Dr(o){if(!Ga(o))return o.g.la();const f=rh(o.g);if(f==="")return"";let m="";const b=f.length,M=Sa(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return ln(o),ca(o),"";o.h.i=new r.TextDecoder}for(let U=0;U<b;U++)o.h.h=!0,m+=o.h.i.decode(f[U],{stream:!(M&&U==b-1)});return f.length=0,o.h.g+=m,o.C=0,o.h.g}function Ga(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function ki(o,f){var m=o.C,b=f.indexOf(`
`,m);return b==-1?Bt:(m=Number(f.substring(m,b)),isNaN(m)?zs:(b+=1,b+m>f.length?Bt:(f=f.slice(b,b+m),o.C=b+m,f)))}Bs.prototype.cancel=function(){this.K=!0,ln(this)};function Or(o){o.T=Date.now()+o.H,_a(o,o.H)}function _a(o,f){if(o.D!=null)throw Error("WatchDog timer not null");o.D=vt(h(o.aa,o),f)}function hs(o){o.D&&(r.clearTimeout(o.D),o.D=null)}Bs.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Kt(this.i,this.B),this.M!=2&&(Wt(),Nt(17)),ln(this),this.m=2,ca(this)):_a(this,this.T-o)};function ca(o){o.j.I==0||o.K||uh(o.j,o)}function ln(o){hs(o);var f=o.O;f&&typeof f.dispose=="function"&&f.dispose(),o.O=null,le(o.V),o.g&&(f=o.g,o.g=null,f.abort(),f.dispose())}function Ta(o,f){try{var m=o.j;if(m.I!=0&&(m.g==o||os(m.h,o))){if(!o.L&&os(m.h,o)&&m.I==3){try{var b=m.Ba.g.parse(f)}catch{b=null}if(Array.isArray(b)&&b.length==3){var M=b;if(M[0]==0){e:if(!m.v){if(m.g)if(m.g.F+3e3<o.F)Mo(m),Na(m);else break e;Co(m),Nt(18)}}else m.xa=M[1],0<m.xa-m.K&&M[2]<37500&&m.F&&m.A==0&&!m.C&&(m.C=vt(h(m.Va,m),6e3));jr(m.h)<=1&&m.ta&&(m.ta=void 0)}else Ra(m,11)}else if((o.L||m.g==o)&&Mo(m),!w(f))for(M=m.Ba.g.parse(f),f=0;f<M.length;f++){let rt=M[f];const ut=rt[0];if(!(ut<=m.K))if(m.K=ut,rt=rt[1],m.I==2)if(rt[0]=="c"){m.M=rt[1],m.ba=rt[2];const Qt=rt[3];Qt!=null&&(m.ka=Qt,m.j.info("VER="+m.ka));const Zn=rt[4];Zn!=null&&(m.za=Zn,m.j.info("SVER="+m.za));const cn=rt[5];cn!=null&&typeof cn=="number"&&cn>0&&(b=1.5*cn,m.O=b,m.j.info("backChannelRequestTimeoutMs_="+b)),b=m;const mn=o.g;if(mn){const Ks=mn.g?mn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ks){var U=b.h;U.g||Ks.indexOf("spdy")==-1&&Ks.indexOf("quic")==-1&&Ks.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&(fs(U,U.h),U.h=null))}if(b.G){const Fe=mn.g?mn.g.getResponseHeader("X-HTTP-Session-Id"):null;Fe&&(b.wa=Fe,dt(b.J,b.G,Fe))}}m.I=3,m.l&&m.l.ra(),m.aa&&(m.T=Date.now()-o.F,m.j.info("Handshake RTT: "+m.T+"ms")),b=m;var X=o;if(b.na=lc(b,b.L?b.ba:null,b.W),X.L){Hs(b.h,X);var be=X,ct=b.O;ct&&(be.H=ct),be.D&&(hs(be),Or(be)),b.g=X}else rc(b);m.i.length>0&&ko(m)}else rt[0]!="stop"&&rt[0]!="close"||Ra(m,7);else m.I==3&&(rt[0]=="stop"||rt[0]=="close"?rt[0]=="stop"?Ra(m,7):ac(m):rt[0]!="noop"&&m.l&&m.l.qa(rt),m.A=0)}}Wt(4)}catch{}}var Wu=class{constructor(o,f){this.g=o,this.map=f}};function Ea(o){this.l=o||10,r.PerformanceNavigationTiming?(o=r.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Fs(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function jr(o){return o.h?1:o.g?o.g.size:0}function os(o,f){return o.h?o.h==f:o.g?o.g.has(f):!1}function fs(o,f){o.g?o.g.add(f):o.h=f}function Hs(o,f){o.h&&o.h==f?o.h=null:o.g&&o.g.has(f)&&o.g.delete(f)}Ea.prototype.cancel=function(){if(this.i=Pr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Pr(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let f=o.i;for(const m of o.g.values())f=f.concat(m.G);return f}return y(o.i)}var ds=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ua(o,f){if(o){o=o.split("&");for(let m=0;m<o.length;m++){const b=o[m].indexOf("=");let M,U=null;b>=0?(M=o[m].substring(0,b),U=o[m].substring(b+1)):M=o[m],f(M,U?decodeURIComponent(U.replace(/\+/g," ")):"")}}}function qs(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let f;o instanceof qs?(this.l=o.l,wa(this,o.j),this.o=o.o,this.g=o.g,Ya(this,o.u),this.h=o.h,Vr(this,tc(o.i)),this.m=o.m):o&&(f=String(o).match(ds))?(this.l=!1,wa(this,f[1]||"",!0),this.o=Ka(f[2]||""),this.g=Ka(f[3]||"",!0),Ya(this,f[4]),this.h=Ka(f[5]||"",!0),Vr(this,f[6]||"",!0),this.m=Ka(f[7]||"")):(this.l=!1,this.i=new V(null,this.l))}qs.prototype.toString=function(){const o=[];var f=this.j;f&&o.push(Ci(f,Ii,!0),":");var m=this.g;return(m||f=="file")&&(o.push("//"),(f=this.o)&&o.push(Ci(f,Ii,!0),"@"),o.push(Wn(m).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.u,m!=null&&o.push(":",String(m))),(m=this.h)&&(this.g&&m.charAt(0)!="/"&&o.push("/"),o.push(Ci(m,m.charAt(0)=="/"?im:So,!0))),(m=this.i.toString())&&o.push("?",m),(m=this.m)&&o.push("#",Ci(m,ye)),o.join("")},qs.prototype.resolve=function(o){const f=Ss(this);let m=!!o.j;m?wa(f,o.j):m=!!o.o,m?f.o=o.o:m=!!o.g,m?f.g=o.g:m=o.u!=null;var b=o.h;if(m)Ya(f,o.u);else if(m=!!o.h){if(b.charAt(0)!="/")if(this.g&&!this.h)b="/"+b;else{var M=f.h.lastIndexOf("/");M!=-1&&(b=f.h.slice(0,M+1)+b)}if(M=b,M==".."||M==".")b="";else if(M.indexOf("./")!=-1||M.indexOf("/.")!=-1){b=M.lastIndexOf("/",0)==0,M=M.split("/");const U=[];for(let X=0;X<M.length;){const be=M[X++];be=="."?b&&X==M.length&&U.push(""):be==".."?((U.length>1||U.length==1&&U[0]!="")&&U.pop(),b&&X==M.length&&U.push("")):(U.push(be),b=!0)}b=U.join("/")}else b=M}return m?f.h=b:m=o.i.toString()!=="",m?Vr(f,tc(o.i)):m=!!o.m,m&&(f.m=o.m),f};function Ss(o){return new qs(o)}function wa(o,f,m){o.j=m?Ka(f,!0):f,o.j&&(o.j=o.j.replace(/:$/,""))}function Ya(o,f){if(f){if(f=Number(f),isNaN(f)||f<0)throw Error("Bad port number "+f);o.u=f}else o.u=null}function Vr(o,f,m){f instanceof V?(o.i=f,Ao(o.i,o.l)):(m||(f=Ci(f,Gs)),o.i=new V(f,o.l))}function dt(o,f,m){o.i.set(f,m)}function ha(o){return dt(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Ka(o,f){return o?f?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ci(o,f,m){return typeof o=="string"?(o=encodeURI(o).replace(f,Qa),m&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Qa(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ii=/[#\/\?@]/g,So=/[#\?:]/g,im=/[#\?]/g,Gs=/[#\?@]/g,ye=/#/g;function V(o,f){this.h=this.g=null,this.i=o||null,this.j=!!f}function wn(o){o.g||(o.g=new Map,o.h=0,o.i&&ua(o.i,function(f,m){o.add(decodeURIComponent(f.replace(/\+/g," ")),m)}))}t=V.prototype,t.add=function(o,f){wn(this),this.i=null,o=Mi(this,o);let m=this.g.get(o);return m||this.g.set(o,m=[]),m.push(f),this.h+=1,this};function Lr(o,f){wn(o),f=Mi(o,f),o.g.has(f)&&(o.i=null,o.h-=o.g.get(f).length,o.g.delete(f))}function Ju(o,f){return wn(o),f=Mi(o,f),o.g.has(f)}t.forEach=function(o,f){wn(this),this.g.forEach(function(m,b){m.forEach(function(M){o.call(f,M,b,this)},this)},this)};function dn(o,f){wn(o);let m=[];if(typeof f=="string")Ju(o,f)&&(m=m.concat(o.g.get(Mi(o,f))));else for(o=Array.from(o.g.values()),f=0;f<o.length;f++)m=m.concat(o[f]);return m}t.set=function(o,f){return wn(this),this.i=null,o=Mi(this,o),Ju(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[f]),this.h+=1,this},t.get=function(o,f){return o?(o=dn(this,o),o.length>0?String(o[0]):f):f};function J(o,f,m){Lr(o,f),m.length>0&&(o.i=null,o.g.set(Mi(o,f),y(m)),o.h+=m.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],f=Array.from(this.g.keys());for(let b=0;b<f.length;b++){var m=f[b];const M=Wn(m);m=dn(this,m);for(let U=0;U<m.length;U++){let X=M;m[U]!==""&&(X+="="+Wn(m[U])),o.push(X)}}return this.i=o.join("&")};function tc(o){const f=new V;return f.i=o.i,o.g&&(f.g=new Map(o.g),f.h=o.h),f}function Mi(o,f){return f=String(f),o.j&&(f=f.toLowerCase()),f}function Ao(o,f){f&&!o.j&&(wn(o),o.i=null,o.g.forEach(function(m,b){const M=b.toLowerCase();b!=M&&(Lr(this,b),J(this,M,m))},o)),o.j=f}function Zu(o,f){const m=new Un;if(r.Image){const b=new Image;b.onload=d(Ys,m,"TestLoadImage: loaded",!0,f,b),b.onerror=d(Ys,m,"TestLoadImage: error",!1,f,b),b.onabort=d(Ys,m,"TestLoadImage: abort",!1,f,b),b.ontimeout=d(Ys,m,"TestLoadImage: timeout",!1,f,b),r.setTimeout(function(){b.ontimeout&&b.ontimeout()},1e4),b.src=o}else f(!1)}function Ur(o,f){const m=new Un,b=new AbortController,M=setTimeout(()=>{b.abort(),Ys(m,"TestPingServer: timeout",!1,f)},1e4);fetch(o,{signal:b.signal}).then(U=>{clearTimeout(M),U.ok?Ys(m,"TestPingServer: ok",!0,f):Ys(m,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(M),Ys(m,"TestPingServer: error",!1,f)})}function Ys(o,f,m,b,M){try{M&&(M.onload=null,M.onerror=null,M.onabort=null,M.ontimeout=null),b(m)}catch{}}function eh(){this.g=new Te}function nc(o){this.i=o.Sb||null,this.h=o.ab||!1}p(nc,st),nc.prototype.g=function(){return new Di(this.i,this.h)};function Di(o,f){he.call(this),this.H=o,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Di,he),t=Di.prototype,t.open=function(o,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=f,this.readyState=1,fa(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const f={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(f.body=o),(this.H||r).fetch(new Request(this.D,f)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Xa(this)),this.readyState=0},t.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,fa(this)),this.g&&(this.readyState=3,fa(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof r.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;th(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function th(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}t.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var f=o.value?o.value:new Uint8Array(0);(f=this.B.decode(f,{stream:!o.done}))&&(this.response=this.responseText+=f)}o.done?Xa(this):fa(this),this.readyState==3&&th(this)}},t.Oa=function(o){this.g&&(this.response=this.responseText=o,Xa(this))},t.Na=function(o){this.g&&(this.response=o,Xa(this))},t.ga=function(){this.g&&Xa(this)};function Xa(o){o.readyState=4,o.l=null,o.j=null,o.B=null,fa(o)}t.setRequestHeader=function(o,f){this.A.append(o,f)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],f=this.h.entries();for(var m=f.next();!m.done;)m=m.value,o.push(m[0]+": "+m[1]),m=f.next();return o.join(`\r
`)};function fa(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Di.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Oi(o){let f="";return pe(o,function(m,b){f+=b,f+=":",f+=m,f+=`\r
`}),f}function No(o,f,m){e:{for(b in m){var b=!1;break e}b=!0}b||(m=Oi(m),typeof o=="string"?m!=null&&Wn(m):dt(o,f,m))}function zt(o){he.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(zt,he);var nh=/^https?$/i,Jn=["POST","PUT"];t=zt.prototype,t.Fa=function(o){this.H=o},t.ea=function(o,f,m,b){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);f=f?f.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ut.g(),this.g.onreadystatechange=g(h(this.Ca,this));try{this.B=!0,this.g.open(f,String(o),!0),this.B=!1}catch(U){sh(this,U);return}if(o=m||"",m=new Map(this.headers),b)if(Object.getPrototypeOf(b)===Object.prototype)for(var M in b)m.set(M,b[M]);else if(typeof b.keys=="function"&&typeof b.get=="function")for(const U of b.keys())m.set(U,b.get(U));else throw Error("Unknown input type for opt_headers: "+String(b));b=Array.from(m.keys()).find(U=>U.toLowerCase()=="content-type"),M=r.FormData&&o instanceof r.FormData,!(Array.prototype.indexOf.call(Jn,f,void 0)>=0)||b||M||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,X]of m)this.g.setRequestHeader(U,X);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(U){sh(this,U)}};function sh(o,f){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=f,o.o=5,ah(o),Ro(o)}function ah(o){o.A||(o.A=!0,Se(o,"complete"),Se(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Se(this,"complete"),Se(this,"abort"),Ro(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ro(this,!0)),zt.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?ih(this):this.Xa())},t.Xa=function(){ih(this)};function ih(o){if(o.h&&typeof i<"u"){if(o.v&&Sa(o)==4)setTimeout(o.Ca.bind(o),0);else if(Se(o,"readystatechange"),Sa(o)==4){o.h=!1;try{const U=o.ca();e:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var m;if(!(m=f)){var b;if(b=U===0){let X=String(o.D).match(ds)[1]||null;!X&&r.self&&r.self.location&&(X=r.self.location.protocol.slice(0,-1)),b=!nh.test(X?X.toLowerCase():"")}m=b}if(m)Se(o,"complete"),Se(o,"success");else{o.o=6;try{var M=Sa(o)>2?o.g.statusText:""}catch{M=""}o.l=M+" ["+o.ca()+"]",ah(o)}}finally{Ro(o)}}}}function Ro(o,f){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const m=o.g;o.g=null,f||Se(o,"ready");try{m.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function Sa(o){return o.g?o.g.readyState:0}t.ca=function(){try{return Sa(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(o){if(this.g){var f=this.g.responseText;return o&&f.indexOf(o)==0&&(f=f.substring(o.length)),me(f)}};function rh(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function sc(o){const f={};o=(o.g&&Sa(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let b=0;b<o.length;b++){if(w(o[b]))continue;var m=oa(o[b]);const M=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const U=f[M]||[];f[M]=U,U.push(m)}Pe(f,function(b){return b.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Aa(o,f,m){return m&&m.internalChannelParams&&m.internalChannelParams[o]||f}function oh(o){this.za=0,this.i=[],this.j=new Un,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Aa("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Aa("baseRetryDelayMs",5e3,o),this.Za=Aa("retryDelaySeedMs",1e4,o),this.Ta=Aa("forwardChannelMaxRetries",2,o),this.va=Aa("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Ea(o&&o.concurrentRequestLimit),this.Ba=new eh,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=oh.prototype,t.ka=8,t.I=1,t.connect=function(o,f,m,b){Nt(0),this.W=o,this.H=f||{},m&&b!==void 0&&(this.H.OSID=m,this.H.OAID=b),this.F=this.X,this.J=lc(this,null,this.W),ko(this)};function ac(o){if(ic(o),o.I==3){var f=o.V++,m=Ss(o.J);if(dt(m,"SID",o.M),dt(m,"RID",f),dt(m,"TYPE","terminate"),Br(o,m),f=new Bs(o,o.j,f),f.M=2,f.A=ha(Ss(m)),m=!1,r.navigator&&r.navigator.sendBeacon)try{m=r.navigator.sendBeacon(f.A.toString(),"")}catch{}!m&&r.Image&&(new Image().src=f.A,m=!0),m||(f.g=A(f.j,null),f.g.ea(f.A)),f.F=Date.now(),Or(f)}oc(o)}function Na(o){o.g&&(Io(o),o.g.cancel(),o.g=null)}function ic(o){Na(o),o.v&&(r.clearTimeout(o.v),o.v=null),Mo(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&r.clearTimeout(o.m),o.m=null)}function ko(o){if(!Fs(o.h)&&!o.m){o.m=!0;var f=o.Ea;j||x(),H||(j(),H=!0),T.add(f,o),o.D=0}}function rm(o,f){return jr(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=f.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=vt(h(o.Ea,o,f),hh(o,o.D)),o.D++,!0)}t.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const M=new Bs(this,this.j,o);let U=this.o;if(this.U&&(U?(U=_t(U),Ot(U,this.U)):U=this.U),this.u!==null||this.R||(M.J=U,U=null),this.S)e:{for(var f=0,m=0;m<this.i.length;m++){t:{var b=this.i[m];if("__data__"in b.map&&(b=b.map.__data__,typeof b=="string")){b=b.length;break t}b=void 0}if(b===void 0)break;if(f+=b,f>4096){f=m;break e}if(f===4096||m===this.i.length-1){f=m+1;break e}}f=1e3}else f=1e3;f=zr(this,M,f),m=Ss(this.J),dt(m,"RID",o),dt(m,"CVER",22),this.G&&dt(m,"X-HTTP-Session-Id",this.G),Br(this,m),U&&(this.R?f="headers="+Wn(Oi(U))+"&"+f:this.u&&No(m,this.u,U)),fs(this.h,M),this.Ra&&dt(m,"TYPE","init"),this.S?(dt(m,"$req",f),dt(m,"SID","null"),M.U=!0,$s(M,m,null)):$s(M,m,f),this.I=2}}else this.I==3&&(o?lh(this,o):this.i.length==0||Fs(this.h)||lh(this))};function lh(o,f){var m;f?m=f.l:m=o.V++;const b=Ss(o.J);dt(b,"SID",o.M),dt(b,"RID",m),dt(b,"AID",o.K),Br(o,b),o.u&&o.o&&No(b,o.u,o.o),m=new Bs(o,o.j,m,o.D+1),o.u===null&&(m.J=o.o),f&&(o.i=f.G.concat(o.i)),f=zr(o,m,1e3),m.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),fs(o.h,m),$s(m,b,f)}function Br(o,f){o.H&&pe(o.H,function(m,b){dt(f,b,m)}),o.l&&pe({},function(m,b){dt(f,b,m)})}function zr(o,f,m){m=Math.min(o.i.length,m);const b=o.l?h(o.l.Ka,o.l,o):null;e:{var M=o.i;let be=-1;for(;;){const ct=["count="+m];be==-1?m>0?(be=M[0].g,ct.push("ofs="+be)):be=0:ct.push("ofs="+be);let rt=!0;for(let ut=0;ut<m;ut++){var U=M[ut].g;const Qt=M[ut].map;if(U-=be,U<0)be=Math.max(0,M[ut].g-100),rt=!1;else try{U="req"+U+"_"||"";try{var X=Qt instanceof Map?Qt:Object.entries(Qt);for(const[Zn,cn]of X){let mn=cn;l(cn)&&(mn=Ae(cn)),ct.push(U+Zn+"="+encodeURIComponent(mn))}}catch(Zn){throw ct.push(U+"type="+encodeURIComponent("_badmap")),Zn}}catch{b&&b(Qt)}}if(rt){X=ct.join("&");break e}}X=void 0}return o=o.i.splice(0,m),f.G=o,X}function rc(o){if(!o.g&&!o.v){o.Y=1;var f=o.Da;j||x(),H||(j(),H=!0),T.add(f,o),o.A=0}}function Co(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=vt(h(o.Da,o),hh(o,o.A)),o.A++,!0)}t.Da=function(){if(this.v=null,ch(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=vt(h(this.Wa,this),o)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Nt(10),Na(this),ch(this))};function Io(o){o.B!=null&&(r.clearTimeout(o.B),o.B=null)}function ch(o){o.g=new Bs(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var f=Ss(o.na);dt(f,"RID","rpc"),dt(f,"SID",o.M),dt(f,"AID",o.K),dt(f,"CI",o.F?"0":"1"),!o.F&&o.ia&&dt(f,"TO",o.ia),dt(f,"TYPE","xmlhttp"),Br(o,f),o.u&&o.o&&No(f,o.u,o.o),o.O&&(o.g.H=o.O);var m=o.g;o=o.ba,m.M=1,m.A=ha(Ss(f)),m.u=null,m.R=!0,rs(m,o)}t.Va=function(){this.C!=null&&(this.C=null,Na(this),Co(this),Nt(19))};function Mo(o){o.C!=null&&(r.clearTimeout(o.C),o.C=null)}function uh(o,f){var m=null;if(o.g==f){Mo(o),Io(o),o.g=null;var b=2}else if(os(o.h,f))m=f.G,Hs(o.h,f),b=1;else return;if(o.I!=0){if(f.o)if(b==1){m=f.u?f.u.length:0,f=Date.now()-f.F;var M=o.D;b=ue(),Se(b,new lt(b,m)),ko(o)}else rc(o);else if(M=f.m,M==3||M==0&&f.X>0||!(b==1&&rm(o,f)||b==2&&Co(o)))switch(m&&m.length>0&&(f=o.h,f.i=f.i.concat(m)),M){case 1:Ra(o,5);break;case 4:Ra(o,10);break;case 3:Ra(o,6);break;default:Ra(o,2)}}}function hh(o,f){let m=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(m*=2),m*f}function Ra(o,f){if(o.j.info("Error code "+f),f==2){var m=h(o.bb,o),b=o.Ua;const M=!b;b=new qs(b||"//www.google.com/images/cleardot.gif"),r.location&&r.location.protocol=="http"||wa(b,"https"),ha(b),M?Zu(b.toString(),m):Ur(b.toString(),m)}else Nt(2);o.I=0,o.l&&o.l.pa(f),oc(o),ic(o)}t.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Nt(2)):(this.j.info("Failed to ping google.com"),Nt(1))};function oc(o){if(o.I=0,o.ja=[],o.l){const f=Pr(o.h);(f.length!=0||o.i.length!=0)&&(C(o.ja,f),C(o.ja,o.i),o.h.i.length=0,y(o.i),o.i.length=0),o.l.oa()}}function lc(o,f,m){var b=m instanceof qs?Ss(m):new qs(m);if(b.g!="")f&&(b.g=f+"."+b.g),Ya(b,b.u);else{var M=r.location;b=M.protocol,f=f?f+"."+M.hostname:M.hostname,M=+M.port;const U=new qs(null);b&&wa(U,b),f&&(U.g=f),M&&Ya(U,M),m&&(U.h=m),b=U}return m=o.G,f=o.wa,m&&f&&dt(b,m,f),dt(b,"VER",o.ka),Br(o,b),b}function A(o,f,m){if(f&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return f=o.Aa&&!o.ma?new zt(new nc({ab:m})):new zt(o.ma),f.Fa(o.L),f}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function z(){}t=z.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function $(){}$.prototype.g=function(o,f){return new Z(o,f)};function Z(o,f){he.call(this),this.g=new oh(f),this.l=o,this.h=f&&f.messageUrlParams||null,o=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(o?o["X-WebChannel-Content-Type"]=f.messageContentType:o={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.sa&&(o?o["X-WebChannel-Client-Profile"]=f.sa:o={"X-WebChannel-Client-Profile":f.sa}),this.g.U=o,(o=f&&f.Qb)&&!w(o)&&(this.g.u=o),this.A=f&&f.supportsCrossDomainXhr||!1,this.v=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!w(f)&&(this.g.G=f,o=this.h,o!==null&&f in o&&(o=this.h,f in o&&delete o[f])),this.j=new de(this)}p(Z,he),Z.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Z.prototype.close=function(){ac(this.g)},Z.prototype.o=function(o){var f=this.g;if(typeof o=="string"){var m={};m.__data__=o,o=m}else this.v&&(m={},m.__data__=Ae(o),o=m);f.i.push(new Wu(f.Ya++,o)),f.I==3&&ko(f)},Z.prototype.N=function(){this.g.l=null,delete this.j,ac(this.g),delete this.g,Z.Z.N.call(this)};function B(o){it.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var f=o.__sm__;if(f){e:{for(const m in f){o=m;break e}o=void 0}(this.i=o)&&(o=this.i,f=f!==null&&o in f?f[o]:void 0),this.data=f}else this.data=o}p(B,it);function q(){Ln.call(this),this.status=1}p(q,Ln);function de(o){this.g=o}p(de,z),de.prototype.ra=function(){Se(this.g,"a")},de.prototype.qa=function(o){Se(this.g,new B(o))},de.prototype.pa=function(o){Se(this.g,new q)},de.prototype.oa=function(){Se(this.g,"b")},$.prototype.createWebChannel=$.prototype.g,Z.prototype.send=Z.prototype.o,Z.prototype.open=Z.prototype.m,Z.prototype.close=Z.prototype.close,eE=function(){return new $},Z2=function(){return ue()},J2=Ve,bp={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},nn.NO_ERROR=0,nn.TIMEOUT=8,nn.HTTP_ERROR=6,ef=nn,Lt.COMPLETE="complete",W2=Lt,at.EventType=At,At.OPEN="a",At.CLOSE="b",At.ERROR="c",At.MESSAGE="d",he.prototype.listen=he.prototype.J,Sc=at,zt.prototype.listenOnce=zt.prototype.K,zt.prototype.getLastError=zt.prototype.Ha,zt.prototype.getLastErrorCode=zt.prototype.ya,zt.prototype.getStatus=zt.prototype.ca,zt.prototype.getResponseJson=zt.prototype.La,zt.prototype.getResponseText=zt.prototype.la,zt.prototype.send=zt.prototype.ea,zt.prototype.setWithCredentials=zt.prototype.Fa,X2=zt}).apply(typeof Rh<"u"?Rh:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ns.UNAUTHENTICATED=new ns(null),ns.GOOGLE_CREDENTIALS=new ns("google-credentials-uid"),ns.FIRST_PARTY=new ns("first-party-uid"),ns.MOCK_USER=new ns("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ql="12.12.0";function Tk(t){Ql=t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=new Od("@firebase/firestore");function $o(){return fo.logLevel}function fe(t,...e){if(fo.logLevel<=Je.DEBUG){const n=e.map(Zg);fo.debug(`Firestore (${Ql}): ${t}`,...n)}}function Ti(t,...e){if(fo.logLevel<=Je.ERROR){const n=e.map(Zg);fo.error(`Firestore (${Ql}): ${t}`,...n)}}function mo(t,...e){if(fo.logLevel<=Je.WARN){const n=e.map(Zg);fo.warn(`Firestore (${Ql}): ${t}`,...n)}}function Zg(t){if(typeof t=="string")return t;try{return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,tE(t,s,n)}function tE(t,e,n){let s=`FIRESTORE (${Ql}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{s+=" CONTEXT: "+JSON.stringify(n)}catch{s+=" CONTEXT: "+n}throw Ti(s),new Error(s)}function xt(t,e,n,s){let a="Unexpected state";typeof n=="string"?a=n:s=n,t||tE(e,a,s)}function je(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ce extends Ni{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nE{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ek{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ns.UNAUTHENTICATED))}shutdown(){}}class wk{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class Sk{constructor(e){this.t=e,this.currentUser=ns.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){xt(this.o===void 0,42304);let s=this.i;const a=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new di;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new di,e.enqueueRetryable(()=>a(this.currentUser))};const r=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await a(this.currentUser)})},l=c=>{fe("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),r())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(fe("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new di)}},0),r()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(fe("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(xt(typeof s.accessToken=="string",31837,{l:s}),new nE(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return xt(e===null||typeof e=="string",2055,{h:e}),new ns(e)}}class Ak{constructor(e,n,s){this.P=e,this.T=n,this.I=s,this.type="FirstParty",this.user=ns.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Nk{constructor(e,n,s){this.P=e,this.T=n,this.I=s}getToken(){return Promise.resolve(new Ak(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(ns.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ov{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Rk{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ga(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){xt(this.o===void 0,3512);const s=i=>{i.error!=null&&fe("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const r=i.token!==this.m;return this.m=i.token,fe("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const a=i=>{fe("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>a(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?a(i):fe("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ov(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(xt(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Ov(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kk(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const a=kk(40);for(let i=0;i<a.length;++i)s.length<20&&a[i]<n&&(s+=e.charAt(a[i]%62))}return s}}function Ze(t,e){return t<e?-1:t>e?1:0}function vp(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const a=t.charAt(s),i=e.charAt(s);if(a!==i)return Xm(a)===Xm(i)?Ze(a,i):Xm(a)?1:-1}return Ze(t.length,e.length)}const Ck=55296,Ik=57343;function Xm(t){const e=t.charCodeAt(0);return e>=Ck&&e<=Ik}function Cl(t,e,n){return t.length===e.length&&t.every((s,a)=>n(s,e[a]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jv="__name__";class Ca{constructor(e,n,s){n===void 0?n=0:n>e.length&&Re(637,{offset:n,range:e.length}),s===void 0?s=e.length-n:s>e.length-n&&Re(1746,{length:s,range:e.length-n}),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return Ca.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ca?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let a=0;a<s;a++){const i=Ca.compareSegments(e.get(a),n.get(a));if(i!==0)return i}return Ze(e.length,n.length)}static compareSegments(e,n){const s=Ca.isNumericId(e),a=Ca.isNumericId(n);return s&&!a?-1:!s&&a?1:s&&a?Ca.extractNumericId(e).compare(Ca.extractNumericId(n)):vp(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return fr.fromString(e.substring(4,e.length-2))}}class Pt extends Ca{construct(e,n,s){return new Pt(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new ce(G.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(a=>a.length>0))}return new Pt(n)}static emptyPath(){return new Pt([])}}const Mk=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class qn extends Ca{construct(e,n,s){return new qn(e,n,s)}static isValidIdentifier(e){return Mk.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),qn.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===jv}static keyField(){return new qn([jv])}static fromServerFormat(e){const n=[];let s="",a=0;const i=()=>{if(s.length===0)throw new ce(G.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let r=!1;for(;a<e.length;){const l=e[a];if(l==="\\"){if(a+1===e.length)throw new ce(G.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[a+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new ce(G.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,a+=2}else l==="`"?(r=!r,a++):l!=="."||r?(s+=l,a++):(i(),a++)}if(i(),r)throw new ce(G.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new qn(n)}static emptyPath(){return new qn([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.path=e}static fromPath(e){return new Ee(Pt.fromString(e))}static fromName(e){return new Ee(Pt.fromString(e).popFirst(5))}static empty(){return new Ee(Pt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Pt.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Pt.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Ee(new Pt(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sE(t,e,n){if(!n)throw new ce(G.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Dk(t,e,n,s){if(e===!0&&s===!0)throw new ce(G.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Pv(t){if(!Ee.isDocumentKey(t))throw new ce(G.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Vv(t){if(Ee.isDocumentKey(t))throw new ce(G.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function aE(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function jd(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Re(12329,{type:typeof t})}function ia(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new ce(G.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=jd(t);throw new ce(G.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function Ok(t,e){if(e<=0)throw new ce(G.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(t,e){const n={typeString:t};return e&&(n.value=e),n}function zu(t,e){if(!aE(t))throw new ce(G.INVALID_ARGUMENT,"JSON must be an object");let n;for(const s in e)if(e[s]){const a=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in t)){n=`JSON missing required field: '${s}'`;break}const r=t[s];if(a&&typeof r!==a){n=`JSON field '${s}' must be a ${a}.`;break}if(i!==void 0&&r!==i.value){n=`Expected '${s}' field to equal '${i.value}'`;break}}if(n)throw new ce(G.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lv=-62135596800,Uv=1e6;class qt{static now(){return qt.fromMillis(Date.now())}static fromDate(e){return qt.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor((e-1e3*n)*Uv);return new qt(n,s)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new ce(G.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new ce(G.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Lv)throw new ce(G.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ce(G.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Uv}_compareTo(e){return this.seconds===e.seconds?Ze(this.nanoseconds,e.nanoseconds):Ze(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:qt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(zu(e,qt._jsonSchema))return new qt(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Lv;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}qt._jsonSchemaVersion="firestore/timestamp/1.0",qt._jsonSchema={type:Tn("string",qt._jsonSchemaVersion),seconds:Tn("number"),nanoseconds:Tn("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{static fromTimestamp(e){return new De(e)}static min(){return new De(new qt(0,0))}static max(){return new De(new qt(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu=-1;function jk(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,a=De.fromTimestamp(s===1e9?new qt(n+1,0):new qt(n,s));return new _r(a,Ee.empty(),e)}function Pk(t){return new _r(t.readTime,t.key,yu)}class _r{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new _r(De.min(),Ee.empty(),yu)}static max(){return new _r(De.max(),Ee.empty(),yu)}}function Vk(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Ee.comparator(t.documentKey,e.documentKey),n!==0?n:Ze(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lk="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Uk{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xl(t){if(t.code!==G.FAILED_PRECONDITION||t.message!==Lk)throw t;fe("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&Re(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new Q((s,a)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,a)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,a)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof Q?n:Q.resolve(n)}catch(n){return Q.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):Q.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):Q.reject(n)}static resolve(e){return new Q((n,s)=>{n(e)})}static reject(e){return new Q((n,s)=>{s(e)})}static waitFor(e){return new Q((n,s)=>{let a=0,i=0,r=!1;e.forEach(l=>{++a,l.next(()=>{++i,r&&i===a&&n()},c=>s(c))}),r=!0,i===a&&n()})}static or(e){let n=Q.resolve(!1);for(const s of e)n=n.next(a=>a?Q.resolve(a):s());return n}static forEach(e,n){const s=[];return e.forEach((a,i)=>{s.push(n.call(this,a,i))}),this.waitFor(s)}static mapArray(e,n){return new Q((s,a)=>{const i=e.length,r=new Array(i);let l=0;for(let c=0;c<i;c++){const h=c;n(e[h]).next(d=>{r[h]=d,++l,l===i&&s(r)},d=>a(d))}})}static doWhile(e,n){return new Q((s,a)=>{const i=()=>{e()===!0?n().next(()=>{i()},a):s()};i()})}}function Bk(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Wl(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>n.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Pd.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty=-1;function Vd(t){return t==null}function Gf(t){return t===0&&1/t==-1/0}function zk(t){return typeof t=="number"&&Number.isInteger(t)&&!Gf(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iE="";function $k(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Bv(e)),e=Fk(t.get(n),e);return Bv(e)}function Fk(t,e){let n=e;const s=t.length;for(let a=0;a<s;a++){const i=t.charAt(a);switch(i){case"\0":n+="";break;case iE:n+="";break;default:n+=i}}return n}function Bv(t){return t+iE+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zv(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Cr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function rE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,n){this.comparator=e,this.root=n||$n.EMPTY}insert(e,n){return new en(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,$n.BLACK,null,null))}remove(e){return new en(this.comparator,this.root.remove(e,this.comparator).copy(null,null,$n.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const a=this.comparator(e,s.key);if(a===0)return n+s.left.size;a<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new kh(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new kh(this.root,e,this.comparator,!1)}getReverseIterator(){return new kh(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new kh(this.root,e,this.comparator,!0)}}class kh{constructor(e,n,s,a){this.isReverse=a,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&a&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class $n{constructor(e,n,s,a,i){this.key=e,this.value=n,this.color=s??$n.RED,this.left=a??$n.EMPTY,this.right=i??$n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,a,i){return new $n(e??this.key,n??this.value,s??this.color,a??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let a=this;const i=s(e,a.key);return a=i<0?a.copy(null,null,null,a.left.insert(e,n,s),null):i===0?a.copy(null,n,null,null,null):a.copy(null,null,null,null,a.right.insert(e,n,s)),a.fixUp()}removeMin(){if(this.left.isEmpty())return $n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,a=this;if(n(e,a.key)<0)a.left.isEmpty()||a.left.isRed()||a.left.left.isRed()||(a=a.moveRedLeft()),a=a.copy(null,null,null,a.left.remove(e,n),null);else{if(a.left.isRed()&&(a=a.rotateRight()),a.right.isEmpty()||a.right.isRed()||a.right.left.isRed()||(a=a.moveRedRight()),n(e,a.key)===0){if(a.right.isEmpty())return $n.EMPTY;s=a.right.min(),a=a.copy(s.key,s.value,null,null,a.right.removeMin())}a=a.copy(null,null,null,null,a.right.remove(e,n))}return a.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,$n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,$n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Re(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Re(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Re(27949);return e+(this.isRed()?0:1)}}$n.EMPTY=null,$n.RED=!0,$n.BLACK=!1;$n.EMPTY=new class{constructor(){this.size=0}get key(){throw Re(57766)}get value(){throw Re(16141)}get color(){throw Re(16727)}get left(){throw Re(29726)}get right(){throw Re(36894)}copy(e,n,s,a,i){return this}insert(e,n,s){return new $n(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.comparator=e,this.data=new en(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const a=s.getNext();if(this.comparator(a.key,e[1])>=0)return;n(a.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new $v(this.data.getIterator())}getIteratorFrom(e){return new $v(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof Nn)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const a=n.getNext().key,i=s.getNext().key;if(this.comparator(a,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Nn(this.comparator);return n.data=e,n}}class $v{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e){this.fields=e,e.sort(qn.comparator)}static empty(){return new Ms([])}unionWith(e){let n=new Nn(qn.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new Ms(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Cl(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(a){try{return atob(a)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new oE("Invalid base64 string: "+i):i}}(e);return new Kn(n)}static fromUint8Array(e){const n=function(a){let i="";for(let r=0;r<a.length;++r)i+=String.fromCharCode(a[r]);return i}(e);return new Kn(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const s=new Uint8Array(n.length);for(let a=0;a<n.length;a++)s[a]=n.charCodeAt(a);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ze(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Kn.EMPTY_BYTE_STRING=new Kn("");const Hk=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Tr(t){if(xt(!!t,39018),typeof t=="string"){let e=0;const n=Hk.exec(t);if(xt(!!n,46558,{timestamp:t}),n[1]){let a=n[1];a=(a+"000000000").substr(0,9),e=Number(a)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:un(t.seconds),nanos:un(t.nanos)}}function un(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Er(t){return typeof t=="string"?Kn.fromBase64String(t):Kn.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lE="server_timestamp",cE="__type__",uE="__previous_value__",hE="__local_write_time__";function ny(t){var n,s;return((s=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[cE])==null?void 0:s.stringValue)===lE}function Ld(t){const e=t.mapValue.fields[uE];return ny(e)?Ld(e):e}function bu(t){const e=Tr(t.mapValue.fields[hE].timestampValue);return new qt(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qk{constructor(e,n,s,a,i,r,l,c,h,d,p){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=a,this.ssl=i,this.forceLongPolling=r,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=d,this.apiKey=p}}const Yf="(default)";class vu{constructor(e,n){this.projectId=e,this.database=n||Yf}static empty(){return new vu("","")}get isDefaultDatabase(){return this.database===Yf}isEqual(e){return e instanceof vu&&e.projectId===this.projectId&&e.database===this.database}}function Gk(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new ce(G.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vu(t.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fE="__type__",dE="__max__",Ch={mapValue:{fields:{__type__:{stringValue:dE}}}},mE="__vector__",Kf="value";function wr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?ny(t)?4:Kk(t)?9007199254740991:Yk(t)?10:11:Re(28295,{value:t})}function Fa(t,e){if(t===e)return!0;const n=wr(t);if(n!==wr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return bu(t).isEqual(bu(e));case 3:return function(a,i){if(typeof a.timestampValue=="string"&&typeof i.timestampValue=="string"&&a.timestampValue.length===i.timestampValue.length)return a.timestampValue===i.timestampValue;const r=Tr(a.timestampValue),l=Tr(i.timestampValue);return r.seconds===l.seconds&&r.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(a,i){return Er(a.bytesValue).isEqual(Er(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(a,i){return un(a.geoPointValue.latitude)===un(i.geoPointValue.latitude)&&un(a.geoPointValue.longitude)===un(i.geoPointValue.longitude)}(t,e);case 2:return function(a,i){if("integerValue"in a&&"integerValue"in i)return un(a.integerValue)===un(i.integerValue);if("doubleValue"in a&&"doubleValue"in i){const r=un(a.doubleValue),l=un(i.doubleValue);return r===l?Gf(r)===Gf(l):isNaN(r)&&isNaN(l)}return!1}(t,e);case 9:return Cl(t.arrayValue.values||[],e.arrayValue.values||[],Fa);case 10:case 11:return function(a,i){const r=a.mapValue.fields||{},l=i.mapValue.fields||{};if(zv(r)!==zv(l))return!1;for(const c in r)if(r.hasOwnProperty(c)&&(l[c]===void 0||!Fa(r[c],l[c])))return!1;return!0}(t,e);default:return Re(52216,{left:t})}}function xu(t,e){return(t.values||[]).find(n=>Fa(n,e))!==void 0}function Il(t,e){if(t===e)return 0;const n=wr(t),s=wr(e);if(n!==s)return Ze(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ze(t.booleanValue,e.booleanValue);case 2:return function(i,r){const l=un(i.integerValue||i.doubleValue),c=un(r.integerValue||r.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return Fv(t.timestampValue,e.timestampValue);case 4:return Fv(bu(t),bu(e));case 5:return vp(t.stringValue,e.stringValue);case 6:return function(i,r){const l=Er(i),c=Er(r);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,r){const l=i.split("/"),c=r.split("/");for(let h=0;h<l.length&&h<c.length;h++){const d=Ze(l[h],c[h]);if(d!==0)return d}return Ze(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,r){const l=Ze(un(i.latitude),un(r.latitude));return l!==0?l:Ze(un(i.longitude),un(r.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Hv(t.arrayValue,e.arrayValue);case 10:return function(i,r){var g,y,C,I;const l=i.fields||{},c=r.fields||{},h=(g=l[Kf])==null?void 0:g.arrayValue,d=(y=c[Kf])==null?void 0:y.arrayValue,p=Ze(((C=h==null?void 0:h.values)==null?void 0:C.length)||0,((I=d==null?void 0:d.values)==null?void 0:I.length)||0);return p!==0?p:Hv(h,d)}(t.mapValue,e.mapValue);case 11:return function(i,r){if(i===Ch.mapValue&&r===Ch.mapValue)return 0;if(i===Ch.mapValue)return 1;if(r===Ch.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),h=r.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const g=vp(c[p],d[p]);if(g!==0)return g;const y=Il(l[c[p]],h[d[p]]);if(y!==0)return y}return Ze(c.length,d.length)}(t.mapValue,e.mapValue);default:throw Re(23264,{he:n})}}function Fv(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ze(t,e);const n=Tr(t),s=Tr(e),a=Ze(n.seconds,s.seconds);return a!==0?a:Ze(n.nanos,s.nanos)}function Hv(t,e){const n=t.values||[],s=e.values||[];for(let a=0;a<n.length&&a<s.length;++a){const i=Il(n[a],s[a]);if(i)return i}return Ze(n.length,s.length)}function Ml(t){return xp(t)}function xp(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const s=Tr(n);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Er(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return Ee.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let s="[",a=!0;for(const i of n.values||[])a?a=!1:s+=",",s+=xp(i);return s+"]"}(t.arrayValue):"mapValue"in t?function(n){const s=Object.keys(n.fields||{}).sort();let a="{",i=!0;for(const r of s)i?i=!1:a+=",",a+=`${r}:${xp(n.fields[r])}`;return a+"}"}(t.mapValue):Re(61005,{value:t})}function tf(t){switch(wr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ld(t);return e?16+tf(e):16;case 5:return 2*t.stringValue.length;case 6:return Er(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((a,i)=>a+tf(i),0)}(t.arrayValue);case 10:case 11:return function(s){let a=0;return Cr(s.fields,(i,r)=>{a+=i.length+tf(r)}),a}(t.mapValue);default:throw Re(13486,{value:t})}}function qv(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function _p(t){return!!t&&"integerValue"in t}function sy(t){return!!t&&"arrayValue"in t}function Gv(t){return!!t&&"nullValue"in t}function Yv(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function nf(t){return!!t&&"mapValue"in t}function Yk(t){var n,s;return((s=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[fE])==null?void 0:s.stringValue)===mE}function qc(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Cr(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=qc(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=qc(t.arrayValue.values[n]);return e}return{...t}}function Kk(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===dE}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e){this.value=e}static empty(){return new xs({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!nf(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=qc(n)}setAll(e){let n=qn.emptyPath(),s={},a=[];e.forEach((r,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,s,a),s={},a=[],n=l.popLast()}r?s[l.lastSegment()]=qc(r):a.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,a)}delete(e){const n=this.field(e.popLast());nf(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Fa(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let a=n.mapValue.fields[e.get(s)];nf(a)&&a.mapValue.fields||(a={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=a),n=a}return n.mapValue.fields}applyChanges(e,n,s){Cr(n,(a,i)=>e[a]=i);for(const a of s)delete e[a]}clone(){return new xs(qc(this.value))}}function pE(t){const e=[];return Cr(t.fields,(n,s)=>{const a=new qn([n]);if(nf(s)){const i=pE(s.mapValue).fields;if(i.length===0)e.push(a);else for(const r of i)e.push(a.child(r))}else e.push(a)}),new Ms(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e,n,s,a,i,r,l){this.key=e,this.documentType=n,this.version=s,this.readTime=a,this.createTime=i,this.data=r,this.documentState=l}static newInvalidDocument(e){return new ss(e,0,De.min(),De.min(),De.min(),xs.empty(),0)}static newFoundDocument(e,n,s,a){return new ss(e,1,n,De.min(),s,a,0)}static newNoDocument(e,n){return new ss(e,2,n,De.min(),De.min(),xs.empty(),0)}static newUnknownDocument(e,n){return new ss(e,3,n,De.min(),De.min(),xs.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(De.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xs.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xs.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=De.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ss&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ss(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e,n){this.position=e,this.inclusive=n}}function Kv(t,e,n){let s=0;for(let a=0;a<t.position.length;a++){const i=e[a],r=t.position[a];if(i.field.isKeyField()?s=Ee.comparator(Ee.fromName(r.referenceValue),n.key):s=Il(r,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function Qv(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Fa(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(e,n="asc"){this.field=e,this.dir=n}}function Qk(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{}class xn extends gE{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new Wk(e,n,s):n==="array-contains"?new eC(e,s):n==="in"?new tC(e,s):n==="not-in"?new nC(e,s):n==="array-contains-any"?new sC(e,s):new xn(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new Jk(e,s):new Zk(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Il(n,this.value)):n!==null&&wr(this.value)===wr(n)&&this.matchesComparison(Il(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Re(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class va extends gE{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new va(e,n)}matches(e){return yE(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function yE(t){return t.op==="and"}function bE(t){return Xk(t)&&yE(t)}function Xk(t){for(const e of t.filters)if(e instanceof va)return!1;return!0}function Tp(t){if(t instanceof xn)return t.field.canonicalString()+t.op.toString()+Ml(t.value);if(bE(t))return t.filters.map(e=>Tp(e)).join(",");{const e=t.filters.map(n=>Tp(n)).join(",");return`${t.op}(${e})`}}function vE(t,e){return t instanceof xn?function(s,a){return a instanceof xn&&s.op===a.op&&s.field.isEqual(a.field)&&Fa(s.value,a.value)}(t,e):t instanceof va?function(s,a){return a instanceof va&&s.op===a.op&&s.filters.length===a.filters.length?s.filters.reduce((i,r,l)=>i&&vE(r,a.filters[l]),!0):!1}(t,e):void Re(19439)}function xE(t){return t instanceof xn?function(n){return`${n.field.canonicalString()} ${n.op} ${Ml(n.value)}`}(t):t instanceof va?function(n){return n.op.toString()+" {"+n.getFilters().map(xE).join(" ,")+"}"}(t):"Filter"}class Wk extends xn{constructor(e,n,s){super(e,n,s),this.key=Ee.fromName(s.referenceValue)}matches(e){const n=Ee.comparator(e.key,this.key);return this.matchesComparison(n)}}class Jk extends xn{constructor(e,n){super(e,"in",n),this.keys=_E("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Zk extends xn{constructor(e,n){super(e,"not-in",n),this.keys=_E("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function _E(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(s=>Ee.fromName(s.referenceValue))}class eC extends xn{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return sy(n)&&xu(n.arrayValue,this.value)}}class tC extends xn{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&xu(this.value.arrayValue,n)}}class nC extends xn{constructor(e,n){super(e,"not-in",n)}matches(e){if(xu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!xu(this.value.arrayValue,n)}}class sC extends xn{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!sy(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>xu(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aC{constructor(e,n=null,s=[],a=[],i=null,r=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=a,this.limit=i,this.startAt=r,this.endAt=l,this.Te=null}}function Xv(t,e=null,n=[],s=[],a=null,i=null,r=null){return new aC(t,e,n,s,a,i,r)}function ay(t){const e=je(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>Tp(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),Vd(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Ml(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Ml(s)).join(",")),e.Te=n}return e.Te}function iy(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Qk(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!vE(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Qv(t.startAt,e.startAt)&&Qv(t.endAt,e.endAt)}function Ep(t){return Ee.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e,n=null,s=[],a=[],i=null,r="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=a,this.limit=i,this.limitType=r,this.startAt=l,this.endAt=c,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function iC(t,e,n,s,a,i,r,l){return new $u(t,e,n,s,a,i,r,l)}function Ud(t){return new $u(t)}function Wv(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function rC(t){return Ee.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function TE(t){return t.collectionGroup!==null}function Gc(t){const e=je(t);if(e.Ee===null){e.Ee=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),n.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(r){let l=new Nn(qn.comparator);return r.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Xf(i,s))}),n.has(qn.keyField().canonicalString())||e.Ee.push(new Xf(qn.keyField(),s))}return e.Ee}function Va(t){const e=je(t);return e.Ie||(e.Ie=oC(e,Gc(t))),e.Ie}function oC(t,e){if(t.limitType==="F")return Xv(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(a=>{const i=a.dir==="desc"?"asc":"desc";return new Xf(a.field,i)});const n=t.endAt?new Qf(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new Qf(t.startAt.position,t.startAt.inclusive):null;return Xv(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}function wp(t,e){const n=t.filters.concat([e]);return new $u(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Wf(t,e,n){return new $u(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Bd(t,e){return iy(Va(t),Va(e))&&t.limitType===e.limitType}function EE(t){return`${ay(Va(t))}|lt:${t.limitType}`}function Fo(t){return`Query(target=${function(n){let s=n.path.canonicalString();return n.collectionGroup!==null&&(s+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(s+=`, filters: [${n.filters.map(a=>xE(a)).join(", ")}]`),Vd(n.limit)||(s+=", limit: "+n.limit),n.orderBy.length>0&&(s+=`, orderBy: [${n.orderBy.map(a=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(a)).join(", ")}]`),n.startAt&&(s+=", startAt: ",s+=n.startAt.inclusive?"b:":"a:",s+=n.startAt.position.map(a=>Ml(a)).join(",")),n.endAt&&(s+=", endAt: ",s+=n.endAt.inclusive?"a:":"b:",s+=n.endAt.position.map(a=>Ml(a)).join(",")),`Target(${s})`}(Va(t))}; limitType=${t.limitType})`}function zd(t,e){return e.isFoundDocument()&&function(s,a){const i=a.key.path;return s.collectionGroup!==null?a.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):Ee.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(t,e)&&function(s,a){for(const i of Gc(s))if(!i.field.isKeyField()&&a.data.field(i.field)===null)return!1;return!0}(t,e)&&function(s,a){for(const i of s.filters)if(!i.matches(a))return!1;return!0}(t,e)&&function(s,a){return!(s.startAt&&!function(r,l,c){const h=Kv(r,l,c);return r.inclusive?h<=0:h<0}(s.startAt,Gc(s),a)||s.endAt&&!function(r,l,c){const h=Kv(r,l,c);return r.inclusive?h>=0:h>0}(s.endAt,Gc(s),a))}(t,e)}function lC(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function wE(t){return(e,n)=>{let s=!1;for(const a of Gc(t)){const i=cC(a,e,n);if(i!==0)return i;s=s||a.field.isKeyField()}return 0}}function cC(t,e,n){const s=t.field.isKeyField()?Ee.comparator(e.key,n.key):function(i,r,l){const c=r.data.field(i),h=l.data.field(i);return c!==null&&h!==null?Il(c,h):Re(42886)}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return Re(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[a,i]of s)if(this.equalsFn(a,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),a=this.inner[s];if(a===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<a.length;i++)if(this.equalsFn(a[i][0],e))return void(a[i]=[e,n]);a.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let a=0;a<s.length;a++)if(this.equalsFn(s[a][0],e))return s.length===1?delete this.inner[n]:s.splice(a,1),this.innerSize--,!0;return!1}forEach(e){Cr(this.inner,(n,s)=>{for(const[a,i]of s)e(a,i)})}isEmpty(){return rE(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uC=new en(Ee.comparator);function Ei(){return uC}const SE=new en(Ee.comparator);function Ac(...t){let e=SE;for(const n of t)e=e.insert(n.key,n);return e}function AE(t){let e=SE;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function Zr(){return Yc()}function NE(){return Yc()}function Yc(){return new Eo(t=>t.toString(),(t,e)=>t.isEqual(e))}const hC=new en(Ee.comparator),fC=new Nn(Ee.comparator);function et(...t){let e=fC;for(const n of t)e=e.add(n);return e}const dC=new Nn(Ze);function mC(){return dC}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ry(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Gf(e)?"-0":e}}function RE(t){return{integerValue:""+t}}function pC(t,e){return zk(e)?RE(e):ry(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(){this._=void 0}}function gC(t,e,n){return t instanceof Jf?function(a,i){const r={fields:{[cE]:{stringValue:lE},[hE]:{timestampValue:{seconds:a.seconds,nanos:a.nanoseconds}}}};return i&&ny(i)&&(i=Ld(i)),i&&(r.fields[uE]=i),{mapValue:r}}(n,e):t instanceof Dl?CE(t,e):t instanceof _u?IE(t,e):function(a,i){const r=kE(a,i),l=Jv(r)+Jv(a.Ae);return _p(r)&&_p(a.Ae)?RE(l):ry(a.serializer,l)}(t,e)}function yC(t,e,n){return t instanceof Dl?CE(t,e):t instanceof _u?IE(t,e):n}function kE(t,e){return t instanceof Zf?function(s){return _p(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class Jf extends $d{}class Dl extends $d{constructor(e){super(),this.elements=e}}function CE(t,e){const n=ME(e);for(const s of t.elements)n.some(a=>Fa(a,s))||n.push(s);return{arrayValue:{values:n}}}class _u extends $d{constructor(e){super(),this.elements=e}}function IE(t,e){let n=ME(e);for(const s of t.elements)n=n.filter(a=>!Fa(a,s));return{arrayValue:{values:n}}}class Zf extends $d{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function Jv(t){return un(t.integerValue||t.doubleValue)}function ME(t){return sy(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bC{constructor(e,n){this.field=e,this.transform=n}}function vC(t,e){return t.field.isEqual(e.field)&&function(s,a){return s instanceof Dl&&a instanceof Dl||s instanceof _u&&a instanceof _u?Cl(s.elements,a.elements,Fa):s instanceof Zf&&a instanceof Zf?Fa(s.Ae,a.Ae):s instanceof Jf&&a instanceof Jf}(t.transform,e.transform)}class xC{constructor(e,n){this.version=e,this.transformResults=n}}class La{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new La}static exists(e){return new La(void 0,e)}static updateTime(e){return new La(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function sf(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Fd{}function DE(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new jE(t.key,La.none()):new Fu(t.key,t.data,La.none());{const n=t.data,s=xs.empty();let a=new Nn(qn.comparator);for(let i of e.fields)if(!a.has(i)){let r=n.field(i);r===null&&i.length>1&&(i=i.popLast(),r=n.field(i)),r===null?s.delete(i):s.set(i,r),a=a.add(i)}return new Ir(t.key,s,new Ms(a.toArray()),La.none())}}function _C(t,e,n){t instanceof Fu?function(a,i,r){const l=a.value.clone(),c=e1(a.fieldTransforms,i,r.transformResults);l.setAll(c),i.convertToFoundDocument(r.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Ir?function(a,i,r){if(!sf(a.precondition,i))return void i.convertToUnknownDocument(r.version);const l=e1(a.fieldTransforms,i,r.transformResults),c=i.data;c.setAll(OE(a)),c.setAll(l),i.convertToFoundDocument(r.version,c).setHasCommittedMutations()}(t,e,n):function(a,i,r){i.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}function Kc(t,e,n,s){return t instanceof Fu?function(i,r,l,c){if(!sf(i.precondition,r))return l;const h=i.value.clone(),d=t1(i.fieldTransforms,c,r);return h.setAll(d),r.convertToFoundDocument(r.version,h).setHasLocalMutations(),null}(t,e,n,s):t instanceof Ir?function(i,r,l,c){if(!sf(i.precondition,r))return l;const h=t1(i.fieldTransforms,c,r),d=r.data;return d.setAll(OE(i)),d.setAll(h),r.convertToFoundDocument(r.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,s):function(i,r,l){return sf(i.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):l}(t,e,n)}function TC(t,e){let n=null;for(const s of t.fieldTransforms){const a=e.data.field(s.field),i=kE(s.transform,a||null);i!=null&&(n===null&&(n=xs.empty()),n.set(s.field,i))}return n||null}function Zv(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(s,a){return s===void 0&&a===void 0||!(!s||!a)&&Cl(s,a,(i,r)=>vC(i,r))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Fu extends Fd{constructor(e,n,s,a=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=a,this.type=0}getFieldMask(){return null}}class Ir extends Fd{constructor(e,n,s,a,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=a,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function OE(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function e1(t,e,n){const s=new Map;xt(t.length===n.length,32656,{Ve:n.length,de:t.length});for(let a=0;a<n.length;a++){const i=t[a],r=i.transform,l=e.data.field(i.field);s.set(i.field,yC(r,l,n[a]))}return s}function t1(t,e,n){const s=new Map;for(const a of t){const i=a.transform,r=n.data.field(a.field);s.set(a.field,gC(i,r,e))}return s}class jE extends Fd{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class EC extends Fd{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wC{constructor(e,n,s,a){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=a}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let a=0;a<this.mutations.length;a++){const i=this.mutations[a];i.key.isEqual(e.key)&&_C(i,e,s[a])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=Kc(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=Kc(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=NE();return this.mutations.forEach(a=>{const i=e.get(a.key),r=i.overlayedDocument;let l=this.applyToLocalView(r,i.mutatedFields);l=n.has(a.key)?null:l;const c=DE(r,l);c!==null&&s.set(a.key,c),r.isValidDocument()||r.convertToNoDocument(De.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),et())}isEqual(e){return this.batchId===e.batchId&&Cl(this.mutations,e.mutations,(n,s)=>Zv(n,s))&&Cl(this.baseMutations,e.baseMutations,(n,s)=>Zv(n,s))}}class oy{constructor(e,n,s,a){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=a}static from(e,n,s){xt(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let a=function(){return hC}();const i=e.mutations;for(let r=0;r<i.length;r++)a=a.insert(i[r].key,s[r].version);return new oy(e,n,s,a)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SC{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AC{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pn,ht;function NC(t){switch(t){case G.OK:return Re(64938);case G.CANCELLED:case G.UNKNOWN:case G.DEADLINE_EXCEEDED:case G.RESOURCE_EXHAUSTED:case G.INTERNAL:case G.UNAVAILABLE:case G.UNAUTHENTICATED:return!1;case G.INVALID_ARGUMENT:case G.NOT_FOUND:case G.ALREADY_EXISTS:case G.PERMISSION_DENIED:case G.FAILED_PRECONDITION:case G.ABORTED:case G.OUT_OF_RANGE:case G.UNIMPLEMENTED:case G.DATA_LOSS:return!0;default:return Re(15467,{code:t})}}function PE(t){if(t===void 0)return Ti("GRPC error has no .code"),G.UNKNOWN;switch(t){case pn.OK:return G.OK;case pn.CANCELLED:return G.CANCELLED;case pn.UNKNOWN:return G.UNKNOWN;case pn.DEADLINE_EXCEEDED:return G.DEADLINE_EXCEEDED;case pn.RESOURCE_EXHAUSTED:return G.RESOURCE_EXHAUSTED;case pn.INTERNAL:return G.INTERNAL;case pn.UNAVAILABLE:return G.UNAVAILABLE;case pn.UNAUTHENTICATED:return G.UNAUTHENTICATED;case pn.INVALID_ARGUMENT:return G.INVALID_ARGUMENT;case pn.NOT_FOUND:return G.NOT_FOUND;case pn.ALREADY_EXISTS:return G.ALREADY_EXISTS;case pn.PERMISSION_DENIED:return G.PERMISSION_DENIED;case pn.FAILED_PRECONDITION:return G.FAILED_PRECONDITION;case pn.ABORTED:return G.ABORTED;case pn.OUT_OF_RANGE:return G.OUT_OF_RANGE;case pn.UNIMPLEMENTED:return G.UNIMPLEMENTED;case pn.DATA_LOSS:return G.DATA_LOSS;default:return Re(39323,{code:t})}}(ht=pn||(pn={}))[ht.OK=0]="OK",ht[ht.CANCELLED=1]="CANCELLED",ht[ht.UNKNOWN=2]="UNKNOWN",ht[ht.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ht[ht.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ht[ht.NOT_FOUND=5]="NOT_FOUND",ht[ht.ALREADY_EXISTS=6]="ALREADY_EXISTS",ht[ht.PERMISSION_DENIED=7]="PERMISSION_DENIED",ht[ht.UNAUTHENTICATED=16]="UNAUTHENTICATED",ht[ht.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ht[ht.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ht[ht.ABORTED=10]="ABORTED",ht[ht.OUT_OF_RANGE=11]="OUT_OF_RANGE",ht[ht.UNIMPLEMENTED=12]="UNIMPLEMENTED",ht[ht.INTERNAL=13]="INTERNAL",ht[ht.UNAVAILABLE=14]="UNAVAILABLE",ht[ht.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RC(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kC=new fr([4294967295,4294967295],0);function n1(t){const e=RC().encode(t),n=new Q2;return n.update(e),new Uint8Array(n.digest())}function s1(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),a=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new fr([n,s],0),new fr([a,i],0)]}class ly{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new Nc(`Invalid padding: ${n}`);if(s<0)throw new Nc(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Nc(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new Nc(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=fr.fromNumber(this.ge)}ye(e,n,s){let a=e.add(n.multiply(fr.fromNumber(s)));return a.compare(kC)===1&&(a=new fr([a.getBits(0),a.getBits(1)],0)),a.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=n1(e),[s,a]=s1(n);for(let i=0;i<this.hashCount;i++){const r=this.ye(s,a,i);if(!this.we(r))return!1}return!0}static create(e,n,s){const a=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),r=new ly(i,a,n);return s.forEach(l=>r.insert(l)),r}insert(e){if(this.ge===0)return;const n=n1(e),[s,a]=s1(n);for(let i=0;i<this.hashCount;i++){const r=this.ye(s,a,i);this.Se(r)}}Se(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class Nc extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e,n,s,a,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=a,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const a=new Map;return a.set(e,Hu.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new Hd(De.min(),a,new en(Ze),Ei(),et())}}class Hu{constructor(e,n,s,a,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=a,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new Hu(s,n,et(),et(),et())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(e,n,s,a){this.be=e,this.removedTargetIds=n,this.key=s,this.De=a}}class VE{constructor(e,n){this.targetId=e,this.Ce=n}}class LE{constructor(e,n,s=Kn.EMPTY_BYTE_STRING,a=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=a}}class a1{constructor(){this.ve=0,this.Fe=i1(),this.Me=Kn.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=et(),n=et(),s=et();return this.Fe.forEach((a,i)=>{switch(i){case 0:e=e.add(a);break;case 2:n=n.add(a);break;case 1:s=s.add(a);break;default:Re(38017,{changeType:i})}}),new Hu(this.Me,this.xe,e,n,s)}qe(){this.Oe=!1,this.Fe=i1()}Ke(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,xt(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class CC{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ei(),this.Je=Ih(),this.He=Ih(),this.Ze=new en(Ze)}Xe(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Ye(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const s=this.nt(n);switch(e.state){case 0:this.rt(n)&&s.Le(e.resumeToken);break;case 1:s.We(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.We(),s.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(s.Qe(),s.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),s.Le(e.resumeToken));break;default:Re(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((s,a)=>{this.rt(a)&&n(a)})}st(e){const n=e.targetId,s=e.Ce.count,a=this.ot(n);if(a){const i=a.target;if(Ep(i))if(s===0){const r=new Ee(i.path);this.et(n,r,ss.newNoDocument(r,De.min()))}else xt(s===1,20013,{expectedCount:s});else{const r=this._t(n);if(r!==s){const l=this.ut(e),c=l?this.ct(l,e,r):1;if(c!==0){this.it(n);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(n,h)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:s="",padding:a=0},hashCount:i=0}=n;let r,l;try{r=Er(s).toUint8Array()}catch(c){if(c instanceof oE)return mo("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new ly(r,a,i)}catch(c){return mo(c instanceof Nc?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,n,s){return n.Ce.count===s-this.Pt(e,n.targetId)?0:2}Pt(e,n){const s=this.Ge.getRemoteKeysForTarget(n);let a=0;return s.forEach(i=>{const r=this.Ge.ht(),l=`projects/${r.projectId}/databases/${r.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(n,i,null),a++)}),a}Tt(e){const n=new Map;this.ze.forEach((i,r)=>{const l=this.ot(r);if(l){if(i.current&&Ep(l.target)){const c=new Ee(l.target.path);this.Et(c).has(r)||this.It(r,c)||this.et(r,c,ss.newNoDocument(c,e))}i.Be&&(n.set(r,i.ke()),i.qe())}});let s=et();this.He.forEach((i,r)=>{let l=!0;r.forEachWhile(c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(s=s.add(i))}),this.je.forEach((i,r)=>r.setReadTime(e));const a=new Hd(e,n,this.Ze,this.je,s);return this.je=Ei(),this.Je=Ih(),this.He=Ih(),this.Ze=new en(Ze),a}Ye(e,n){if(!this.rt(e))return;const s=this.It(e,n.key)?2:0;this.nt(e).Ke(n.key,s),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.Et(n.key).add(e)),this.He=this.He.insert(n.key,this.Rt(n.key).add(e))}et(e,n,s){if(!this.rt(e))return;const a=this.nt(e);this.It(e,n)?a.Ke(n,1):a.Ue(n),this.He=this.He.insert(n,this.Rt(n).delete(e)),this.He=this.He.insert(n,this.Rt(n).add(e)),s&&(this.je=this.je.insert(n,s))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let n=this.ze.get(e);return n||(n=new a1,this.ze.set(e,n)),n}Rt(e){let n=this.He.get(e);return n||(n=new Nn(Ze),this.He=this.He.insert(e,n)),n}Et(e){let n=this.Je.get(e);return n||(n=new Nn(Ze),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||fe("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new a1),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}It(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function Ih(){return new en(Ee.comparator)}function i1(){return new en(Ee.comparator)}const IC=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),MC=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),DC=(()=>({and:"AND",or:"OR"}))();class OC{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Sp(t,e){return t.useProto3Json||Vd(e)?e:{value:e}}function ed(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function UE(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function jC(t,e){return ed(t,e.toTimestamp())}function Ua(t){return xt(!!t,49232),De.fromTimestamp(function(n){const s=Tr(n);return new qt(s.seconds,s.nanos)}(t))}function cy(t,e){return Ap(t,e).canonicalString()}function Ap(t,e){const n=function(a){return new Pt(["projects",a.projectId,"databases",a.database])}(t).child("documents");return e===void 0?n:n.child(e)}function BE(t){const e=Pt.fromString(t);return xt(qE(e),10190,{key:e.toString()}),e}function Np(t,e){return cy(t.databaseId,e.path)}function Wm(t,e){const n=BE(e);if(n.get(1)!==t.databaseId.projectId)throw new ce(G.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new ce(G.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Ee($E(n))}function zE(t,e){return cy(t.databaseId,e)}function PC(t){const e=BE(t);return e.length===4?Pt.emptyPath():$E(e)}function Rp(t){return new Pt(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function $E(t){return xt(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function r1(t,e,n){return{name:Np(t,e),fields:n.value.mapValue.fields}}function VC(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:Re(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),a=e.targetChange.targetIds||[],i=function(h,d){return h.useProto3Json?(xt(d===void 0||typeof d=="string",58123),Kn.fromBase64String(d||"")):(xt(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Kn.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),r=e.targetChange.cause,l=r&&function(h){const d=h.code===void 0?G.UNKNOWN:PE(h.code);return new ce(d,h.message||"")}(r);n=new LE(s,a,i,l||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const a=Wm(t,s.document.name),i=Ua(s.document.updateTime),r=s.document.createTime?Ua(s.document.createTime):De.min(),l=new xs({mapValue:{fields:s.document.fields}}),c=ss.newFoundDocument(a,i,r,l),h=s.targetIds||[],d=s.removedTargetIds||[];n=new af(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const a=Wm(t,s.document),i=s.readTime?Ua(s.readTime):De.min(),r=ss.newNoDocument(a,i),l=s.removedTargetIds||[];n=new af([],l,r.key,r)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const a=Wm(t,s.document),i=s.removedTargetIds||[];n=new af([],i,a,null)}else{if(!("filter"in e))return Re(11601,{Vt:e});{e.filter;const s=e.filter;s.targetId;const{count:a=0,unchangedNames:i}=s,r=new AC(a,i),l=s.targetId;n=new VE(l,r)}}return n}function LC(t,e){let n;if(e instanceof Fu)n={update:r1(t,e.key,e.value)};else if(e instanceof jE)n={delete:Np(t,e.key)};else if(e instanceof Ir)n={update:r1(t,e.key,e.data),updateMask:YC(e.fieldMask)};else{if(!(e instanceof EC))return Re(16599,{dt:e.type});n={verify:Np(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(i,r){const l=r.transform;if(l instanceof Jf)return{fieldPath:r.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Dl)return{fieldPath:r.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof _u)return{fieldPath:r.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Zf)return{fieldPath:r.field.canonicalString(),increment:l.Ae};throw Re(20930,{transform:r.transform})}(0,s))),e.precondition.isNone||(n.currentDocument=function(a,i){return i.updateTime!==void 0?{updateTime:jC(a,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Re(27497)}(t,e.precondition)),n}function UC(t,e){return t&&t.length>0?(xt(e!==void 0,14353),t.map(n=>function(a,i){let r=a.updateTime?Ua(a.updateTime):Ua(i);return r.isEqual(De.min())&&(r=Ua(i)),new xC(r,a.transformResults||[])}(n,e))):[]}function BC(t,e){return{documents:[zE(t,e.path)]}}function zC(t,e){const n={structuredQuery:{}},s=e.path;let a;e.collectionGroup!==null?(a=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(a=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=zE(t,a);const i=function(h){if(h.length!==0)return HE(va.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const r=function(h){if(h.length!==0)return h.map(d=>function(g){return{field:Ho(g.field),direction:HC(g.dir)}}(d))}(e.orderBy);r&&(n.structuredQuery.orderBy=r);const l=Sp(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:n,parent:a}}function $C(t){let e=PC(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let a=null;if(s>0){xt(s===1,65062);const d=n.from[0];d.allDescendants?a=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const g=FE(p);return g instanceof va&&bE(g)?g.getFilters():[g]}(n.where));let r=[];n.orderBy&&(r=function(p){return p.map(g=>function(C){return new Xf(qo(C.field),function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(p){let g;return g=typeof p=="object"?p.value:p,Vd(g)?null:g}(n.limit));let c=null;n.startAt&&(c=function(p){const g=!!p.before,y=p.values||[];return new Qf(y,g)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const g=!p.before,y=p.values||[];return new Qf(y,g)}(n.endAt)),iC(e,a,r,i,l,"F",c,h)}function FC(t,e){const n=function(a){switch(a){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Re(28987,{purpose:a})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function FE(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const s=qo(n.unaryFilter.field);return xn.create(s,"==",{doubleValue:NaN});case"IS_NULL":const a=qo(n.unaryFilter.field);return xn.create(a,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=qo(n.unaryFilter.field);return xn.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=qo(n.unaryFilter.field);return xn.create(r,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Re(61313);default:return Re(60726)}}(t):t.fieldFilter!==void 0?function(n){return xn.create(qo(n.fieldFilter.field),function(a){switch(a){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Re(58110);default:return Re(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return va.create(n.compositeFilter.filters.map(s=>FE(s)),function(a){switch(a){case"AND":return"and";case"OR":return"or";default:return Re(1026)}}(n.compositeFilter.op))}(t):Re(30097,{filter:t})}function HC(t){return IC[t]}function qC(t){return MC[t]}function GC(t){return DC[t]}function Ho(t){return{fieldPath:t.canonicalString()}}function qo(t){return qn.fromServerFormat(t.fieldPath)}function HE(t){return t instanceof xn?function(n){if(n.op==="=="){if(Yv(n.value))return{unaryFilter:{field:Ho(n.field),op:"IS_NAN"}};if(Gv(n.value))return{unaryFilter:{field:Ho(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Yv(n.value))return{unaryFilter:{field:Ho(n.field),op:"IS_NOT_NAN"}};if(Gv(n.value))return{unaryFilter:{field:Ho(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ho(n.field),op:qC(n.op),value:n.value}}}(t):t instanceof va?function(n){const s=n.getFilters().map(a=>HE(a));return s.length===1?s[0]:{compositeFilter:{op:GC(n.op),filters:s}}}(t):Re(54877,{filter:t})}function YC(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function qE(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}function GE(t){return!!t&&typeof t._toProto=="function"&&t._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e,n,s,a,i=De.min(),r=De.min(),l=Kn.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=a,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Zi(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Zi(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Zi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Zi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KC{constructor(e){this.yt=e}}function QC(t){const e=$C({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Wf(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XC{constructor(){this.bn=new WC}addToCollectionParentIndex(e,n){return this.bn.add(n),Q.resolve()}getCollectionParents(e,n){return Q.resolve(this.bn.getEntries(n))}addFieldIndex(e,n){return Q.resolve()}deleteFieldIndex(e,n){return Q.resolve()}deleteAllFieldIndexes(e){return Q.resolve()}createTargetIndexes(e,n){return Q.resolve()}getDocumentsMatchingTarget(e,n){return Q.resolve(null)}getIndexType(e,n){return Q.resolve(0)}getFieldIndexes(e,n){return Q.resolve([])}getNextCollectionGroupToUpdate(e){return Q.resolve(null)}getMinOffset(e,n){return Q.resolve(_r.min())}getMinOffsetFromCollectionGroup(e,n){return Q.resolve(_r.min())}updateCollectionGroup(e,n,s){return Q.resolve()}updateIndexEntries(e,n){return Q.resolve()}}class WC{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),a=this.index[n]||new Nn(Pt.comparator),i=!a.has(s);return this.index[n]=a.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),a=this.index[n];return a&&a.has(s)}getEntries(e){return(this.index[e]||new Nn(Pt.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o1={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},YE=41943040;class vs{static withCacheSize(e){return new vs(e,vs.DEFAULT_COLLECTION_PERCENTILE,vs.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vs.DEFAULT_COLLECTION_PERCENTILE=10,vs.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vs.DEFAULT=new vs(YE,vs.DEFAULT_COLLECTION_PERCENTILE,vs.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vs.DISABLED=new vs(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Ol(0)}static ar(){return new Ol(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l1="LruGarbageCollector",JC=1048576;function c1([t,e],[n,s]){const a=Ze(t,n);return a===0?Ze(e,s):a}class ZC{constructor(e){this.Pr=e,this.buffer=new Nn(c1),this.Tr=0}Er(){return++this.Tr}Ir(e){const n=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(n);else{const s=this.buffer.last();c1(n,s)<0&&(this.buffer=this.buffer.delete(s).add(n))}}get maxValue(){return this.buffer.last()[0]}}class eI{constructor(e,n,s){this.garbageCollector=e,this.asyncQueue=n,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){fe(l1,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Wl(n)?fe(l1,"Ignoring IndexedDB error during garbage collection: ",n):await Xl(n)}await this.Ar(3e5)})}}class tI{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.dr(e).next(s=>Math.floor(n/100*s))}nthSequenceNumber(e,n){if(n===0)return Q.resolve(Pd.ce);const s=new ZC(n);return this.Vr.forEachTarget(e,a=>s.Ir(a.sequenceNumber)).next(()=>this.Vr.mr(e,a=>s.Ir(a))).next(()=>s.maxValue)}removeTargets(e,n,s){return this.Vr.removeTargets(e,n,s)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(fe("LruGarbageCollector","Garbage collection skipped; disabled"),Q.resolve(o1)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?(fe("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),o1):this.gr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,n){let s,a,i,r,l,c,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(fe("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),a=this.params.maximumSequenceNumbersToCollect):a=p,r=Date.now(),this.nthSequenceNumber(e,a))).next(p=>(s=p,l=Date.now(),this.removeTargets(e,s,n))).next(p=>(i=p,c=Date.now(),this.removeOrphanedDocuments(e,s))).next(p=>(h=Date.now(),$o()<=Je.DEBUG&&fe("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${r-d}ms
	Determined least recently used ${a} in `+(l-r)+`ms
	Removed ${i} targets in `+(c-l)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-d}ms`),Q.resolve({didRun:!0,sequenceNumbersCollected:a,targetsRemoved:i,documentsRemoved:p})))}}function nI(t,e){return new tI(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(){this.changes=new Eo(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ss.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?Q.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e,n,s,a){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=a}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(a=>(s=a,this.remoteDocumentCache.getEntry(e,n))).next(a=>(s!==null&&Kc(s.mutation,a,Ms.empty(),qt.now()),a))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,et()).next(()=>s))}getLocalViewOfDocuments(e,n,s=et()){const a=Zr();return this.populateOverlays(e,a,n).next(()=>this.computeViews(e,n,a,s).next(i=>{let r=Ac();return i.forEach((l,c)=>{r=r.insert(l,c.overlayedDocument)}),r}))}getOverlayedDocuments(e,n){const s=Zr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,et()))}populateOverlays(e,n,s){const a=[];return s.forEach(i=>{n.has(i)||a.push(i)}),this.documentOverlayCache.getOverlays(e,a).next(i=>{i.forEach((r,l)=>{n.set(r,l)})})}computeViews(e,n,s,a){let i=Ei();const r=Yc(),l=function(){return Yc()}();return n.forEach((c,h)=>{const d=s.get(h.key);a.has(h.key)&&(d===void 0||d.mutation instanceof Ir)?i=i.insert(h.key,h):d!==void 0?(r.set(h.key,d.mutation.getFieldMask()),Kc(d.mutation,h,d.mutation.getFieldMask(),qt.now())):r.set(h.key,Ms.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,d)=>r.set(h,d)),n.forEach((h,d)=>l.set(h,new aI(d,r.get(h)??null))),l))}recalculateAndSaveOverlays(e,n){const s=Yc();let a=new en((r,l)=>r-l),i=et();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(r=>{for(const l of r)l.keys().forEach(c=>{const h=n.get(c);if(h===null)return;let d=s.get(c)||Ms.empty();d=l.applyToLocalView(h,d),s.set(c,d);const p=(a.get(l.batchId)||et()).add(c);a=a.insert(l.batchId,p)})}).next(()=>{const r=[],l=a.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,d=c.value,p=NE();d.forEach(g=>{if(!i.has(g)){const y=DE(n.get(g),s.get(g));y!==null&&p.set(g,y),i=i.add(g)}}),r.push(this.documentOverlayCache.saveOverlays(e,h,p))}return Q.waitFor(r)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s,a){return rC(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):TE(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s,a):this.getDocumentsMatchingCollectionQuery(e,n,s,a)}getNextDocuments(e,n,s,a){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,a).next(i=>{const r=a-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,a-i.size):Q.resolve(Zr());let l=yu,c=i;return r.next(h=>Q.forEach(h,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?Q.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{c=c.insert(d,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,et())).next(d=>({batchId:l,changes:AE(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Ee(n)).next(s=>{let a=Ac();return s.isFoundDocument()&&(a=a.insert(s.key,s)),a})}getDocumentsMatchingCollectionGroupQuery(e,n,s,a){const i=n.collectionGroup;let r=Ac();return this.indexManager.getCollectionParents(e,i).next(l=>Q.forEach(l,c=>{const h=function(p,g){return new $u(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,s,a).next(d=>{d.forEach((p,g)=>{r=r.insert(p,g)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(e,n,s,a){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(r=>(i=r,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,i,a))).next(r=>{i.forEach((c,h)=>{const d=h.getKey();r.get(d)===null&&(r=r.insert(d,ss.newInvalidDocument(d)))});let l=Ac();return r.forEach((c,h)=>{const d=i.get(c);d!==void 0&&Kc(d.mutation,h,Ms.empty(),qt.now()),zd(n,h)&&(l=l.insert(c,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,n){return Q.resolve(this.Nr.get(n))}saveBundleMetadata(e,n){return this.Nr.set(n.id,function(a){return{id:a.id,version:a.version,createTime:Ua(a.createTime)}}(n)),Q.resolve()}getNamedQuery(e,n){return Q.resolve(this.Br.get(n))}saveNamedQuery(e,n){return this.Br.set(n.name,function(a){return{name:a.name,query:QC(a.bundledQuery),readTime:Ua(a.readTime)}}(n)),Q.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(){this.overlays=new en(Ee.comparator),this.Lr=new Map}getOverlay(e,n){return Q.resolve(this.overlays.get(n))}getOverlays(e,n){const s=Zr();return Q.forEach(n,a=>this.getOverlay(e,a).next(i=>{i!==null&&s.set(a,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((a,i)=>{this.St(e,n,i)}),Q.resolve()}removeOverlaysForBatchId(e,n,s){const a=this.Lr.get(s);return a!==void 0&&(a.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(s)),Q.resolve()}getOverlaysForCollection(e,n,s){const a=Zr(),i=n.length+1,r=new Ee(n.child("")),l=this.overlays.getIteratorFrom(r);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>s&&a.set(c.getKey(),c)}return Q.resolve(a)}getOverlaysForCollectionGroup(e,n,s,a){let i=new en((h,d)=>h-d);const r=this.overlays.getIterator();for(;r.hasNext();){const h=r.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>s){let d=i.get(h.largestBatchId);d===null&&(d=Zr(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const l=Zr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,d)=>l.set(h,d)),!(l.size()>=a)););return Q.resolve(l)}St(e,n,s){const a=this.overlays.get(s.key);if(a!==null){const r=this.Lr.get(a.largestBatchId).delete(s.key);this.Lr.set(a.largestBatchId,r)}this.overlays=this.overlays.insert(s.key,new SC(n,s));let i=this.Lr.get(n);i===void 0&&(i=et(),this.Lr.set(n,i)),this.Lr.set(n,i.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(){this.sessionToken=Kn.EMPTY_BYTE_STRING}getSessionToken(e){return Q.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,Q.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{constructor(){this.kr=new Nn(Mn.qr),this.Kr=new Nn(Mn.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,n){const s=new Mn(e,n);this.kr=this.kr.add(s),this.Kr=this.Kr.add(s)}$r(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.Wr(new Mn(e,n))}Qr(e,n){e.forEach(s=>this.removeReference(s,n))}Gr(e){const n=new Ee(new Pt([])),s=new Mn(n,e),a=new Mn(n,e+1),i=[];return this.Kr.forEachInRange([s,a],r=>{this.Wr(r),i.push(r.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const n=new Ee(new Pt([])),s=new Mn(n,e),a=new Mn(n,e+1);let i=et();return this.Kr.forEachInRange([s,a],r=>{i=i.add(r.key)}),i}containsKey(e){const n=new Mn(e,0),s=this.kr.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class Mn{constructor(e,n){this.key=e,this.Jr=n}static qr(e,n){return Ee.comparator(e.key,n.key)||Ze(e.Jr,n.Jr)}static Ur(e,n){return Ze(e.Jr,n.Jr)||Ee.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Yn=1,this.Hr=new Nn(Mn.qr)}checkEmpty(e){return Q.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,a){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new wC(i,n,s,a);this.mutationQueue.push(r);for(const l of a)this.Hr=this.Hr.add(new Mn(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return Q.resolve(r)}lookupMutationBatch(e,n){return Q.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,a=this.Xr(s),i=a<0?0:a;return Q.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return Q.resolve(this.mutationQueue.length===0?ty:this.Yn-1)}getAllMutationBatches(e){return Q.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new Mn(n,0),a=new Mn(n,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([s,a],r=>{const l=this.Zr(r.Jr);i.push(l)}),Q.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new Nn(Ze);return n.forEach(a=>{const i=new Mn(a,0),r=new Mn(a,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,r],l=>{s=s.add(l.Jr)})}),Q.resolve(this.Yr(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,a=s.length+1;let i=s;Ee.isDocumentKey(i)||(i=i.child(""));const r=new Mn(new Ee(i),0);let l=new Nn(Ze);return this.Hr.forEachWhile(c=>{const h=c.key.path;return!!s.isPrefixOf(h)&&(h.length===a&&(l=l.add(c.Jr)),!0)},r),Q.resolve(this.Yr(l))}Yr(e){const n=[];return e.forEach(s=>{const a=this.Zr(s);a!==null&&n.push(a)}),n}removeMutationBatch(e,n){xt(this.ei(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Hr;return Q.forEach(n.mutations,a=>{const i=new Mn(a.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,a.key)}).next(()=>{this.Hr=s})}nr(e){}containsKey(e,n){const s=new Mn(n,0),a=this.Hr.firstAfterOrEqual(s);return Q.resolve(n.isEqual(a&&a.key))}performConsistencyCheck(e){return this.mutationQueue.length,Q.resolve()}ei(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(e){this.ti=e,this.docs=function(){return new en(Ee.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,a=this.docs.get(s),i=a?a.size:0,r=this.ti(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:r}),this.size+=r-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return Q.resolve(s?s.document.mutableCopy():ss.newInvalidDocument(n))}getEntries(e,n){let s=Ei();return n.forEach(a=>{const i=this.docs.get(a);s=s.insert(a,i?i.document.mutableCopy():ss.newInvalidDocument(a))}),Q.resolve(s)}getDocumentsMatchingQuery(e,n,s,a){let i=Ei();const r=n.path,l=new Ee(r.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!r.isPrefixOf(h.path))break;h.path.length>r.length+1||Vk(Pk(d),s)<=0||(a.has(d.key)||zd(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return Q.resolve(i)}getAllFromCollectionGroup(e,n,s,a){Re(9500)}ni(e,n){return Q.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new hI(this)}getSize(e){return Q.resolve(this.size)}}class hI extends sI{constructor(e){super(),this.Mr=e}applyChanges(e){const n=[];return this.changes.forEach((s,a)=>{a.isValidDocument()?n.push(this.Mr.addEntry(e,a)):this.Mr.removeEntry(s)}),Q.waitFor(n)}getFromCache(e,n){return this.Mr.getEntry(e,n)}getAllFromCache(e,n){return this.Mr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(e){this.persistence=e,this.ri=new Eo(n=>ay(n),iy),this.lastRemoteSnapshotVersion=De.min(),this.highestTargetId=0,this.ii=0,this.si=new uy,this.targetCount=0,this.oi=Ol._r()}forEachTarget(e,n){return this.ri.forEach((s,a)=>n(a)),Q.resolve()}getLastRemoteSnapshotVersion(e){return Q.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Q.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),Q.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.ii&&(this.ii=n),Q.resolve()}lr(e){this.ri.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.oi=new Ol(n),this.highestTargetId=n),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,n){return this.lr(n),this.targetCount+=1,Q.resolve()}updateTargetData(e,n){return this.lr(n),Q.resolve()}removeTargetData(e,n){return this.ri.delete(n.target),this.si.Gr(n.targetId),this.targetCount-=1,Q.resolve()}removeTargets(e,n,s){let a=0;const i=[];return this.ri.forEach((r,l)=>{l.sequenceNumber<=n&&s.get(l.targetId)===null&&(this.ri.delete(r),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),a++)}),Q.waitFor(i).next(()=>a)}getTargetCount(e){return Q.resolve(this.targetCount)}getTargetData(e,n){const s=this.ri.get(n)||null;return Q.resolve(s)}addMatchingKeys(e,n,s){return this.si.$r(n,s),Q.resolve()}removeMatchingKeys(e,n,s){this.si.Qr(n,s);const a=this.persistence.referenceDelegate,i=[];return a&&n.forEach(r=>{i.push(a.markPotentiallyOrphaned(e,r))}),Q.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.si.Gr(n),Q.resolve()}getMatchingKeysForTargetId(e,n){const s=this.si.jr(n);return Q.resolve(s)}containsKey(e,n){return Q.resolve(this.si.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(e,n){this._i={},this.overlays={},this.ai=new Pd(0),this.ui=!1,this.ui=!0,this.ci=new lI,this.referenceDelegate=e(this),this.li=new fI(this),this.indexManager=new XC,this.remoteDocumentCache=function(a){return new uI(a)}(s=>this.referenceDelegate.hi(s)),this.serializer=new KC(n),this.Pi=new rI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new oI,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this._i[e.toKey()];return s||(s=new cI(n,this.referenceDelegate),this._i[e.toKey()]=s),s}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,n,s){fe("MemoryPersistence","Starting transaction:",e);const a=new dI(this.ai.next());return this.referenceDelegate.Ti(),s(a).next(i=>this.referenceDelegate.Ei(a).next(()=>i)).toPromise().then(i=>(a.raiseOnCommittedEvent(),i))}Ii(e,n){return Q.or(Object.values(this._i).map(s=>()=>s.containsKey(e,n)))}}class dI extends Uk{constructor(e){super(),this.currentSequenceNumber=e}}class hy{constructor(e){this.persistence=e,this.Ri=new uy,this.Ai=null}static Vi(e){return new hy(e)}get di(){if(this.Ai)return this.Ai;throw Re(60996)}addReference(e,n,s){return this.Ri.addReference(s,n),this.di.delete(s.toString()),Q.resolve()}removeReference(e,n,s){return this.Ri.removeReference(s,n),this.di.add(s.toString()),Q.resolve()}markPotentiallyOrphaned(e,n){return this.di.add(n.toString()),Q.resolve()}removeTarget(e,n){this.Ri.Gr(n.targetId).forEach(a=>this.di.add(a.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(a=>{a.forEach(i=>this.di.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}Ti(){this.Ai=new Set}Ei(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Q.forEach(this.di,s=>{const a=Ee.fromPath(s);return this.mi(e,a).next(i=>{i||n.removeEntry(a,De.min())})}).next(()=>(this.Ai=null,n.apply(e)))}updateLimboDocument(e,n){return this.mi(e,n).next(s=>{s?this.di.delete(n.toString()):this.di.add(n.toString())})}hi(e){return 0}mi(e,n){return Q.or([()=>Q.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ii(e,n)])}}class td{constructor(e,n){this.persistence=e,this.fi=new Eo(s=>$k(s.path),(s,a)=>s.isEqual(a)),this.garbageCollector=nI(this,n)}static Vi(e,n){return new td(e,n)}Ti(){}Ei(e){return Q.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}dr(e){const n=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>n.next(a=>s+a))}pr(e){let n=0;return this.mr(e,s=>{n++}).next(()=>n)}mr(e,n){return Q.forEach(this.fi,(s,a)=>this.wr(e,s,a).next(i=>i?Q.resolve():n(a)))}removeTargets(e,n,s){return this.persistence.getTargetCache().removeTargets(e,n,s)}removeOrphanedDocuments(e,n){let s=0;const a=this.persistence.getRemoteDocumentCache(),i=a.newChangeBuffer();return a.ni(e,r=>this.wr(e,r,n).next(l=>{l||(s++,i.removeEntry(r,De.min()))})).next(()=>i.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,n){return this.fi.set(n,e.currentSequenceNumber),Q.resolve()}removeTarget(e,n){const s=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,n,s){return this.fi.set(s,e.currentSequenceNumber),Q.resolve()}removeReference(e,n,s){return this.fi.set(s,e.currentSequenceNumber),Q.resolve()}updateLimboDocument(e,n){return this.fi.set(n,e.currentSequenceNumber),Q.resolve()}hi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=tf(e.data.value)),n}wr(e,n,s){return Q.or([()=>this.persistence.Ii(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const a=this.fi.get(n);return Q.resolve(a!==void 0&&a>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,n,s,a){this.targetId=e,this.fromCache=n,this.Ts=s,this.Es=a}static Is(e,n){let s=et(),a=et();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:a=a.add(i.doc.key)}return new fy(e,n.fromCache,s,a)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return JR()?8:Bk(as())>0?6:4}()}initialize(e,n){this.fs=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,s,a){const i={result:null};return this.gs(e,n).next(r=>{i.result=r}).next(()=>{if(!i.result)return this.ps(e,n,a,s).next(r=>{i.result=r})}).next(()=>{if(i.result)return;const r=new mI;return this.ys(e,n,r).next(l=>{if(i.result=l,this.As)return this.ws(e,n,r,l.size)})}).next(()=>i.result)}ws(e,n,s,a){return s.documentReadCount<this.Vs?($o()<=Je.DEBUG&&fe("QueryEngine","SDK will not create cache indexes for query:",Fo(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),Q.resolve()):($o()<=Je.DEBUG&&fe("QueryEngine","Query:",Fo(n),"scans",s.documentReadCount,"local documents and returns",a,"documents as results."),s.documentReadCount>this.ds*a?($o()<=Je.DEBUG&&fe("QueryEngine","The SDK decides to create cache indexes for query:",Fo(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Va(n))):Q.resolve())}gs(e,n){if(Wv(n))return Q.resolve(null);let s=Va(n);return this.indexManager.getIndexType(e,s).next(a=>a===0?null:(n.limit!==null&&a===1&&(n=Wf(n,null,"F"),s=Va(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const r=et(...i);return this.fs.getDocuments(e,r).next(l=>this.indexManager.getMinOffset(e,s).next(c=>{const h=this.Ss(n,l);return this.bs(n,h,r,c.readTime)?this.gs(e,Wf(n,null,"F")):this.Ds(e,h,n,c)}))})))}ps(e,n,s,a){return Wv(n)||a.isEqual(De.min())?Q.resolve(null):this.fs.getDocuments(e,s).next(i=>{const r=this.Ss(n,i);return this.bs(n,r,s,a)?Q.resolve(null):($o()<=Je.DEBUG&&fe("QueryEngine","Re-using previous result from %s to execute query: %s",a.toString(),Fo(n)),this.Ds(e,r,n,jk(a,yu)).next(l=>l))})}Ss(e,n){let s=new Nn(wE(e));return n.forEach((a,i)=>{zd(e,i)&&(s=s.add(i))}),s}bs(e,n,s,a){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(a)>0)}ys(e,n,s){return $o()<=Je.DEBUG&&fe("QueryEngine","Using full collection scan to execute query:",Fo(n)),this.fs.getDocumentsMatchingQuery(e,n,_r.min(),s)}Ds(e,n,s,a){return this.fs.getDocumentsMatchingQuery(e,s,a).next(i=>(n.forEach(r=>{i=i.insert(r.key,r)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy="LocalStore",gI=3e8;class yI{constructor(e,n,s,a){this.persistence=e,this.Cs=n,this.serializer=a,this.vs=new en(Ze),this.Fs=new Eo(i=>ay(i),iy),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(s)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new iI(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.vs))}}function bI(t,e,n,s){return new yI(t,e,n,s)}async function QE(t,e){const n=je(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let a;return n.mutationQueue.getAllMutationBatches(s).next(i=>(a=i,n.Os(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const r=[],l=[];let c=et();for(const h of a){r.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){l.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(s,c).next(h=>({Ns:h,removedBatchIds:r,addedBatchIds:l}))})})}function vI(t,e){const n=je(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const a=e.batch.keys(),i=n.xs.newChangeBuffer({trackRemovals:!0});return function(l,c,h,d){const p=h.batch,g=p.keys();let y=Q.resolve();return g.forEach(C=>{y=y.next(()=>d.getEntry(c,C)).next(I=>{const O=h.docVersions.get(C);xt(O!==null,48541),I.version.compareTo(O)<0&&(p.applyToRemoteDocument(I,h),I.isValidDocument()&&(I.setReadTime(h.commitVersion),d.addEntry(I)))})}),y.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,a,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(l){let c=et();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>n.localDocuments.getDocuments(s,a))})}function XE(t){const e=je(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.li.getLastRemoteSnapshotVersion(n))}function xI(t,e){const n=je(t),s=e.snapshotVersion;let a=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const r=n.xs.newChangeBuffer({trackRemovals:!0});a=n.vs;const l=[];e.targetChanges.forEach((d,p)=>{const g=a.get(p);if(!g)return;l.push(n.li.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.li.addMatchingKeys(i,d.addedDocuments,p)));let y=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?y=y.withResumeToken(Kn.EMPTY_BYTE_STRING,De.min()).withLastLimboFreeSnapshotVersion(De.min()):d.resumeToken.approximateByteSize()>0&&(y=y.withResumeToken(d.resumeToken,s)),a=a.insert(p,y),function(I,O,_){return I.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-I.snapshotVersion.toMicroseconds()>=gI?!0:_.addedDocuments.size+_.modifiedDocuments.size+_.removedDocuments.size>0}(g,y,d)&&l.push(n.li.updateTargetData(i,y))});let c=Ei(),h=et();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),l.push(_I(i,r,e.documentUpdates).next(d=>{c=d.Bs,h=d.Ls})),!s.isEqual(De.min())){const d=n.li.getLastRemoteSnapshotVersion(i).next(p=>n.li.setTargetsMetadata(i,i.currentSequenceNumber,s));l.push(d)}return Q.waitFor(l).next(()=>r.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(n.vs=a,i))}function _I(t,e,n){let s=et(),a=et();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let r=Ei();return n.forEach((l,c)=>{const h=i.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(a=a.add(l)),c.isNoDocument()&&c.version.isEqual(De.min())?(e.removeEntry(l,c.readTime),r=r.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),r=r.insert(l,c)):fe(dy,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Bs:r,Ls:a}})}function TI(t,e){const n=je(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=ty),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function EI(t,e){const n=je(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let a;return n.li.getTargetData(s,e).next(i=>i?(a=i,Q.resolve(a)):n.li.allocateTargetId(s).next(r=>(a=new Zi(e,r,"TargetPurposeListen",s.currentSequenceNumber),n.li.addTargetData(s,a).next(()=>a))))}).then(s=>{const a=n.vs.get(s.targetId);return(a===null||s.snapshotVersion.compareTo(a.snapshotVersion)>0)&&(n.vs=n.vs.insert(s.targetId,s),n.Fs.set(e,s.targetId)),s})}async function kp(t,e,n){const s=je(t),a=s.vs.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,r=>s.persistence.referenceDelegate.removeTarget(r,a))}catch(r){if(!Wl(r))throw r;fe(dy,`Failed to update sequence numbers for target ${e}: ${r}`)}s.vs=s.vs.remove(e),s.Fs.delete(a.target)}function u1(t,e,n){const s=je(t);let a=De.min(),i=et();return s.persistence.runTransaction("Execute query","readwrite",r=>function(c,h,d){const p=je(c),g=p.Fs.get(d);return g!==void 0?Q.resolve(p.vs.get(g)):p.li.getTargetData(h,d)}(s,r,Va(e)).next(l=>{if(l)return a=l.lastLimboFreeSnapshotVersion,s.li.getMatchingKeysForTargetId(r,l.targetId).next(c=>{i=c})}).next(()=>s.Cs.getDocumentsMatchingQuery(r,e,n?a:De.min(),n?i:et())).next(l=>(wI(s,lC(e),l),{documents:l,ks:i})))}function wI(t,e,n){let s=t.Ms.get(e)||De.min();n.forEach((a,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Ms.set(e,s)}class h1{constructor(){this.activeTargetIds=mC()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class SI{constructor(){this.vo=new h1,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e,n=!0){return n&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,n,s){this.Fo[e]=n}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new h1,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f1="ConnectivityMonitor";class d1{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){fe(f1,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){fe(f1,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mh=null;function Cp(){return Mh===null?Mh=function(){return 268435456+Math.round(2147483648*Math.random())}():Mh++,"0x"+Mh.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jm="RestConnection",NI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class RI{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),a=encodeURIComponent(this.databaseId.database);this.Ko=n+"://"+e.host,this.Uo=`projects/${s}/databases/${a}`,this.$o=this.databaseId.database===Yf?`project_id=${s}`:`project_id=${s}&database_id=${a}`}Wo(e,n,s,a,i){const r=Cp(),l=this.Qo(e,n.toUriEncodedString());fe(Jm,`Sending RPC '${e}' ${r}:`,l,s);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(c,a,i);const{host:h}=new URL(l),d=Uu(h);return this.zo(e,l,c,s,d).then(p=>(fe(Jm,`Received RPC '${e}' ${r}: `,p),p),p=>{throw mo(Jm,`RPC '${e}' ${r} failed with error: `,p,"url: ",l,"request:",s),p})}jo(e,n,s,a,i,r){return this.Wo(e,n,s,a,i)}Go(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ql}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((a,i)=>e[i]=a),s&&s.headers.forEach((a,i)=>e[i]=a)}Qo(e,n){const s=NI[e];let a=`${this.Ko}/v1/${n}:${s}`;return this.databaseInfo.apiKey&&(a=`${a}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),a}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kI{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es="WebChannelConnection",yc=(t,e,n)=>{t.listen(e,s=>{try{n(s)}catch(a){setTimeout(()=>{throw a},0)}})};class ml extends RI{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!ml.c_){const e=Z2();yc(e,J2.STAT_EVENT,n=>{n.stat===bp.PROXY?fe(es,"STAT_EVENT: detected buffering proxy"):n.stat===bp.NOPROXY&&fe(es,"STAT_EVENT: detected no buffering proxy")}),ml.c_=!0}}zo(e,n,s,a,i){const r=Cp();return new Promise((l,c)=>{const h=new X2;h.setWithCredentials(!0),h.listenOnce(W2.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case ef.NO_ERROR:const p=h.getResponseJson();fe(es,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(p)),l(p);break;case ef.TIMEOUT:fe(es,`RPC '${e}' ${r} timed out`),c(new ce(G.DEADLINE_EXCEEDED,"Request time out"));break;case ef.HTTP_ERROR:const g=h.getStatus();if(fe(es,`RPC '${e}' ${r} failed with status:`,g,"response text:",h.getResponseText()),g>0){let y=h.getResponseJson();Array.isArray(y)&&(y=y[0]);const C=y==null?void 0:y.error;if(C&&C.status&&C.message){const I=function(_){const v=_.toLowerCase().replace(/_/g,"-");return Object.values(G).indexOf(v)>=0?v:G.UNKNOWN}(C.status);c(new ce(I,C.message))}else c(new ce(G.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new ce(G.UNAVAILABLE,"Connection failed."));break;default:Re(9055,{l_:e,streamId:r,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{fe(es,`RPC '${e}' ${r} completed.`)}});const d=JSON.stringify(a);fe(es,`RPC '${e}' ${r} sending request:`,a),h.send(n,"POST",d,s,15)})}T_(e,n,s){const a=Cp(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],r=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,n,s),l.encodeInitMessageHeaders=!0;const h=i.join("");fe(es,`Creating RPC '${e}' stream ${a}: ${h}`,l);const d=r.createWebChannel(h,l);this.E_(d);let p=!1,g=!1;const y=new kI({Jo:C=>{g?fe(es,`Not sending because RPC '${e}' stream ${a} is closed:`,C):(p||(fe(es,`Opening RPC '${e}' stream ${a} transport.`),d.open(),p=!0),fe(es,`RPC '${e}' stream ${a} sending:`,C),d.send(C))},Ho:()=>d.close()});return yc(d,Sc.EventType.OPEN,()=>{g||(fe(es,`RPC '${e}' stream ${a} transport opened.`),y.i_())}),yc(d,Sc.EventType.CLOSE,()=>{g||(g=!0,fe(es,`RPC '${e}' stream ${a} transport closed`),y.o_(),this.I_(d))}),yc(d,Sc.EventType.ERROR,C=>{g||(g=!0,mo(es,`RPC '${e}' stream ${a} transport errored. Name:`,C.name,"Message:",C.message),y.o_(new ce(G.UNAVAILABLE,"The operation could not be completed")))}),yc(d,Sc.EventType.MESSAGE,C=>{var I;if(!g){const O=C.data[0];xt(!!O,16349);const _=O,v=(_==null?void 0:_.error)||((I=_[0])==null?void 0:I.error);if(v){fe(es,`RPC '${e}' stream ${a} received error:`,v);const S=v.status;let L=function(T){const x=pn[T];if(x!==void 0)return PE(x)}(S),j=v.message;S==="NOT_FOUND"&&j.includes("database")&&j.includes("does not exist")&&j.includes(this.databaseId.database)&&mo(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),L===void 0&&(L=G.INTERNAL,j="Unknown error status: "+S+" with message "+v.message),g=!0,y.o_(new ce(L,j)),d.close()}else fe(es,`RPC '${e}' stream ${a} received:`,O),y.__(O)}}),ml.u_(),setTimeout(()=>{y.s_()},0),y}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(n=>n===e)}Go(e,n,s){super.Go(e,n,s),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return eE()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CI(t){return new ml(t)}function Zm(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd(t){return new OC(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ml.c_=!1;class WE{constructor(e,n,s=1e3,a=1.5,i=6e4){this.Ci=e,this.timerId=n,this.R_=s,this.A_=a,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const n=Math.floor(this.d_+this.y_()),s=Math.max(0,Date.now()-this.f_),a=Math.max(0,n-s);a>0&&fe("ExponentialBackoff",`Backing off for ${a} ms (base delay: ${this.d_} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,a,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m1="PersistentStream";class JE{constructor(e,n,s,a,i,r,l,c){this.Ci=e,this.S_=s,this.b_=a,this.connection=i,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new WE(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===G.RESOURCE_EXHAUSTED?(Ti(n.toString()),Ti("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===G.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(n)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,a])=>{this.D_===n&&this.G_(s,a)},s=>{e(()=>{const a=new ce(G.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(a)})})}G_(e,n){const s=this.Q_(this.D_);this.stream=this.j_(e,n),this.stream.Zo(()=>{s(()=>this.listener.Zo())}),this.stream.Yo(()=>{s(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(a=>{s(()=>this.z_(a))}),this.stream.onMessage(a=>{s(()=>++this.F_==1?this.J_(a):this.onNext(a))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return fe(m1,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return n=>{this.Ci.enqueueAndForget(()=>this.D_===e?n():(fe(m1,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class II extends JE{constructor(e,n,s,a,i,r){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,a,r),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=VC(this.serializer,e),s=function(i){if(!("targetChange"in i))return De.min();const r=i.targetChange;return r.targetIds&&r.targetIds.length?De.min():r.readTime?Ua(r.readTime):De.min()}(e);return this.listener.H_(n,s)}Z_(e){const n={};n.database=Rp(this.serializer),n.addTarget=function(i,r){let l;const c=r.target;if(l=Ep(c)?{documents:BC(i,c)}:{query:zC(i,c).ft},l.targetId=r.targetId,r.resumeToken.approximateByteSize()>0){l.resumeToken=UE(i,r.resumeToken);const h=Sp(i,r.expectedCount);h!==null&&(l.expectedCount=h)}else if(r.snapshotVersion.compareTo(De.min())>0){l.readTime=ed(i,r.snapshotVersion.toTimestamp());const h=Sp(i,r.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const s=FC(this.serializer,e);s&&(n.labels=s),this.q_(n)}X_(e){const n={};n.database=Rp(this.serializer),n.removeTarget=e,this.q_(n)}}class MI extends JE{constructor(e,n,s,a,i,r){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,a,r),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return xt(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,xt(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){xt(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=UC(e.writeResults,e.commitTime),s=Ua(e.commitTime);return this.listener.na(s,n)}ra(){const e={};e.database=Rp(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>LC(this.serializer,s))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{}class OI extends DI{constructor(e,n,s,a){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=a,this.ia=!1}sa(){if(this.ia)throw new ce(G.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,s,a){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,r])=>this.connection.Wo(e,Ap(n,s),a,i,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===G.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new ce(G.UNKNOWN,i.toString())})}jo(e,n,s,a,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,l])=>this.connection.jo(e,Ap(n,s),a,r,l,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===G.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new ce(G.UNKNOWN,r.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function jI(t,e,n,s){return new OI(t,e,n,s)}class PI{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ti(n),this.aa=!1):fe("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const po="RemoteStore";class VI{constructor(e,n,s,a,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(r=>{s.enqueueAndForget(async()=>{wo(this)&&(fe(po,"Restarting streams for network reachability change."),await async function(c){const h=je(c);h.Ia.add(4),await qu(h),h.Va.set("Unknown"),h.Ia.delete(4),await Gd(h)}(this))})}),this.Va=new PI(s,a)}}async function Gd(t){if(wo(t))for(const e of t.Ra)await e(!0)}async function qu(t){for(const e of t.Ra)await e(!1)}function ZE(t,e){const n=je(t);n.Ea.has(e.targetId)||(n.Ea.set(e.targetId,e),yy(n)?gy(n):Jl(n).O_()&&py(n,e))}function my(t,e){const n=je(t),s=Jl(n);n.Ea.delete(e),s.O_()&&ew(n,e),n.Ea.size===0&&(s.O_()?s.L_():wo(n)&&n.Va.set("Unknown"))}function py(t,e){if(t.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(De.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Jl(t).Z_(e)}function ew(t,e){t.da.$e(e),Jl(t).X_(e)}function gy(t){t.da=new CC({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ea.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Jl(t).start(),t.Va.ua()}function yy(t){return wo(t)&&!Jl(t).x_()&&t.Ea.size>0}function wo(t){return je(t).Ia.size===0}function tw(t){t.da=void 0}async function LI(t){t.Va.set("Online")}async function UI(t){t.Ea.forEach((e,n)=>{py(t,e)})}async function BI(t,e){tw(t),yy(t)?(t.Va.ha(e),gy(t)):t.Va.set("Unknown")}async function zI(t,e,n){if(t.Va.set("Online"),e instanceof LE&&e.state===2&&e.cause)try{await async function(a,i){const r=i.cause;for(const l of i.targetIds)a.Ea.has(l)&&(await a.remoteSyncer.rejectListen(l,r),a.Ea.delete(l),a.da.removeTarget(l))}(t,e)}catch(s){fe(po,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await nd(t,s)}else if(e instanceof af?t.da.Xe(e):e instanceof VE?t.da.st(e):t.da.tt(e),!n.isEqual(De.min()))try{const s=await XE(t.localStore);n.compareTo(s)>=0&&await function(i,r){const l=i.da.Tt(r);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.Ea.get(h);d&&i.Ea.set(h,d.withResumeToken(c.resumeToken,r))}}),l.targetMismatches.forEach((c,h)=>{const d=i.Ea.get(c);if(!d)return;i.Ea.set(c,d.withResumeToken(Kn.EMPTY_BYTE_STRING,d.snapshotVersion)),ew(i,c);const p=new Zi(d.target,c,h,d.sequenceNumber);py(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(s){fe(po,"Failed to raise snapshot:",s),await nd(t,s)}}async function nd(t,e,n){if(!Wl(e))throw e;t.Ia.add(1),await qu(t),t.Va.set("Offline"),n||(n=()=>XE(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{fe(po,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await Gd(t)})}function nw(t,e){return e().catch(n=>nd(t,n,e))}async function Yd(t){const e=je(t),n=Sr(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ty;for(;$I(e);)try{const a=await TI(e.localStore,s);if(a===null){e.Ta.length===0&&n.L_();break}s=a.batchId,FI(e,a)}catch(a){await nd(e,a)}sw(e)&&aw(e)}function $I(t){return wo(t)&&t.Ta.length<10}function FI(t,e){t.Ta.push(e);const n=Sr(t);n.O_()&&n.Y_&&n.ea(e.mutations)}function sw(t){return wo(t)&&!Sr(t).x_()&&t.Ta.length>0}function aw(t){Sr(t).start()}async function HI(t){Sr(t).ra()}async function qI(t){const e=Sr(t);for(const n of t.Ta)e.ea(n.mutations)}async function GI(t,e,n){const s=t.Ta.shift(),a=oy.from(s,e,n);await nw(t,()=>t.remoteSyncer.applySuccessfulWrite(a)),await Yd(t)}async function YI(t,e){e&&Sr(t).Y_&&await async function(s,a){if(function(r){return NC(r)&&r!==G.ABORTED}(a.code)){const i=s.Ta.shift();Sr(s).B_(),await nw(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,a)),await Yd(s)}}(t,e),sw(t)&&aw(t)}async function p1(t,e){const n=je(t);n.asyncQueue.verifyOperationInProgress(),fe(po,"RemoteStore received new credentials");const s=wo(n);n.Ia.add(3),await qu(n),s&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await Gd(n)}async function KI(t,e){const n=je(t);e?(n.Ia.delete(2),await Gd(n)):e||(n.Ia.add(2),await qu(n),n.Va.set("Unknown"))}function Jl(t){return t.ma||(t.ma=function(n,s,a){const i=je(n);return i.sa(),new II(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,a)}(t.datastore,t.asyncQueue,{Zo:LI.bind(null,t),Yo:UI.bind(null,t),t_:BI.bind(null,t),H_:zI.bind(null,t)}),t.Ra.push(async e=>{e?(t.ma.B_(),yy(t)?gy(t):t.Va.set("Unknown")):(await t.ma.stop(),tw(t))})),t.ma}function Sr(t){return t.fa||(t.fa=function(n,s,a){const i=je(n);return i.sa(),new MI(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,a)}(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),Yo:HI.bind(null,t),t_:YI.bind(null,t),ta:qI.bind(null,t),na:GI.bind(null,t)}),t.Ra.push(async e=>{e?(t.fa.B_(),await Yd(t)):(await t.fa.stop(),t.Ta.length>0&&(fe(po,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class by{constructor(e,n,s,a,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=a,this.removalCallback=i,this.deferred=new di,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(r=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,a,i){const r=Date.now()+s,l=new by(e,n,r,a,i);return l.start(s),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ce(G.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function vy(t,e){if(Ti("AsyncQueue",`${e}: ${t}`),Wl(t))return new ce(G.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{static emptySet(e){return new pl(e.comparator)}constructor(e){this.comparator=e?(n,s)=>e(n,s)||Ee.comparator(n.key,s.key):(n,s)=>Ee.comparator(n.key,s.key),this.keyedMap=Ac(),this.sortedSet=new en(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof pl)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const a=n.getNext().key,i=s.getNext().key;if(!a.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new pl;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g1{constructor(){this.ga=new en(Ee.comparator)}track(e){const n=e.doc.key,s=this.ga.get(n);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(n,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(n):e.type===1&&s.type===2?this.ga=this.ga.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):Re(63341,{Vt:e,pa:s}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,s)=>{e.push(s)}),e}}class jl{constructor(e,n,s,a,i,r,l,c,h){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=a,this.mutatedKeys=i,this.fromCache=r,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,n,s,a,i){const r=[];return n.forEach(l=>{r.push({type:0,doc:l})}),new jl(e,n,pl.emptySet(n),r,s,a,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bd(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let a=0;a<n.length;a++)if(n[a].type!==s[a].type||!n[a].doc.isEqual(s[a].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QI{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class XI{constructor(){this.queries=y1(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,s){const a=je(n),i=a.queries;a.queries=y1(),i.forEach((r,l)=>{for(const c of l.Sa)c.onError(s)})})(this,new ce(G.ABORTED,"Firestore shutting down"))}}function y1(){return new Eo(t=>EE(t),Bd)}async function xy(t,e){const n=je(t);let s=3;const a=e.query;let i=n.queries.get(a);i?!i.ba()&&e.Da()&&(s=2):(i=new QI,s=e.Da()?0:1);try{switch(s){case 0:i.wa=await n.onListen(a,!0);break;case 1:i.wa=await n.onListen(a,!1);break;case 2:await n.onFirstRemoteStoreListen(a)}}catch(r){const l=vy(r,`Initialization of query '${Fo(e.query)}' failed`);return void e.onError(l)}n.queries.set(a,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&Ty(n)}async function _y(t,e){const n=je(t),s=e.query;let a=3;const i=n.queries.get(s);if(i){const r=i.Sa.indexOf(e);r>=0&&(i.Sa.splice(r,1),i.Sa.length===0?a=e.Da()?0:1:!i.ba()&&e.Da()&&(a=2))}switch(a){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}function WI(t,e){const n=je(t);let s=!1;for(const a of e){const i=a.query,r=n.queries.get(i);if(r){for(const l of r.Sa)l.Fa(a)&&(s=!0);r.wa=a}}s&&Ty(n)}function JI(t,e,n){const s=je(t),a=s.queries.get(e);if(a)for(const i of a.Sa)i.onError(n);s.queries.delete(e)}function Ty(t){t.Ca.forEach(e=>{e.next()})}var Ip,b1;(b1=Ip||(Ip={})).Ma="default",b1.Cache="cache";class Ey{constructor(e,n,s){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const a of e.docChanges)a.type!==3&&s.push(a);e=new jl(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const s=n!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=jl.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ip.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iw{constructor(e){this.key=e}}class rw{constructor(e){this.key=e}}class ZI{constructor(e,n){this.query=e,this.Za=n,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=et(),this.mutatedKeys=et(),this.eu=wE(e),this.tu=new pl(this.eu)}get nu(){return this.Za}ru(e,n){const s=n?n.iu:new g1,a=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,r=a,l=!1;const c=this.query.limitType==="F"&&a.size===this.query.limit?a.last():null,h=this.query.limitType==="L"&&a.size===this.query.limit?a.first():null;if(e.inorderTraversal((d,p)=>{const g=a.get(d),y=zd(this.query,p)?p:null,C=!!g&&this.mutatedKeys.has(g.key),I=!!y&&(y.hasLocalMutations||this.mutatedKeys.has(y.key)&&y.hasCommittedMutations);let O=!1;g&&y?g.data.isEqual(y.data)?C!==I&&(s.track({type:3,doc:y}),O=!0):this.su(g,y)||(s.track({type:2,doc:y}),O=!0,(c&&this.eu(y,c)>0||h&&this.eu(y,h)<0)&&(l=!0)):!g&&y?(s.track({type:0,doc:y}),O=!0):g&&!y&&(s.track({type:1,doc:g}),O=!0,(c||h)&&(l=!0)),O&&(y?(r=r.add(y),i=I?i.add(d):i.delete(d)):(r=r.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;r.size>this.query.limit;){const d=this.query.limitType==="F"?r.last():r.first();r=r.delete(d.key),i=i.delete(d.key),s.track({type:1,doc:d})}return{tu:r,iu:s,bs:l,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s,a){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const r=e.iu.ya();r.sort((d,p)=>function(y,C){const I=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Re(20277,{Vt:O})}};return I(y)-I(C)}(d.type,p.type)||this.eu(d.doc,p.doc)),this.ou(s),a=a??!1;const l=n&&!a?this._u():[],c=this.Ya.size===0&&this.current&&!a?1:0,h=c!==this.Xa;return this.Xa=c,r.length!==0||h?{snapshot:new jl(this.query,e.tu,i,r,e.mutatedKeys,c===0,h,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new g1,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Za=this.Za.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Za=this.Za.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=et(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Ya=this.Ya.add(s.key))});const n=[];return e.forEach(s=>{this.Ya.has(s)||n.push(new rw(s))}),this.Ya.forEach(s=>{e.has(s)||n.push(new iw(s))}),n}cu(e){this.Za=e.ks,this.Ya=et();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return jl.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const wy="SyncEngine";class e4{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class t4{constructor(e){this.key=e,this.hu=!1}}class n4{constructor(e,n,s,a,i,r){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=a,this.currentUser=i,this.maxConcurrentLimboResolutions=r,this.Pu={},this.Tu=new Eo(l=>EE(l),Bd),this.Eu=new Map,this.Iu=new Set,this.Ru=new en(Ee.comparator),this.Au=new Map,this.Vu=new uy,this.du={},this.mu=new Map,this.fu=Ol.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function s4(t,e,n=!0){const s=fw(t);let a;const i=s.Tu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),a=i.view.lu()):a=await ow(s,e,n,!0),a}async function a4(t,e){const n=fw(t);await ow(n,e,!0,!1)}async function ow(t,e,n,s){const a=await EI(t.localStore,Va(e)),i=a.targetId,r=t.sharedClientState.addLocalQueryTarget(i,n);let l;return s&&(l=await i4(t,e,i,r==="current",a.resumeToken)),t.isPrimaryClient&&n&&ZE(t.remoteStore,a),l}async function i4(t,e,n,s,a){t.pu=(p,g,y)=>async function(I,O,_,v){let S=O.view.ru(_);S.bs&&(S=await u1(I.localStore,O.query,!1).then(({documents:T})=>O.view.ru(T,S)));const L=v&&v.targetChanges.get(O.targetId),j=v&&v.targetMismatches.get(O.targetId)!=null,H=O.view.applyChanges(S,I.isPrimaryClient,L,j);return x1(I,O.targetId,H.au),H.snapshot}(t,p,g,y);const i=await u1(t.localStore,e,!0),r=new ZI(e,i.ks),l=r.ru(i.documents),c=Hu.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",a),h=r.applyChanges(l,t.isPrimaryClient,c);x1(t,n,h.au);const d=new e4(e,n,r);return t.Tu.set(e,d),t.Eu.has(n)?t.Eu.get(n).push(e):t.Eu.set(n,[e]),h.snapshot}async function r4(t,e,n){const s=je(t),a=s.Tu.get(e),i=s.Eu.get(a.targetId);if(i.length>1)return s.Eu.set(a.targetId,i.filter(r=>!Bd(r,e))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(a.targetId),s.sharedClientState.isActiveQueryTarget(a.targetId)||await kp(s.localStore,a.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(a.targetId),n&&my(s.remoteStore,a.targetId),Mp(s,a.targetId)}).catch(Xl)):(Mp(s,a.targetId),await kp(s.localStore,a.targetId,!0))}async function o4(t,e){const n=je(t),s=n.Tu.get(e),a=n.Eu.get(s.targetId);n.isPrimaryClient&&a.length===1&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),my(n.remoteStore,s.targetId))}async function l4(t,e,n){const s=p4(t);try{const a=await function(r,l){const c=je(r),h=qt.now(),d=l.reduce((y,C)=>y.add(C.key),et());let p,g;return c.persistence.runTransaction("Locally write mutations","readwrite",y=>{let C=Ei(),I=et();return c.xs.getEntries(y,d).next(O=>{C=O,C.forEach((_,v)=>{v.isValidDocument()||(I=I.add(_))})}).next(()=>c.localDocuments.getOverlayedDocuments(y,C)).next(O=>{p=O;const _=[];for(const v of l){const S=TC(v,p.get(v.key).overlayedDocument);S!=null&&_.push(new Ir(v.key,S,pE(S.value.mapValue),La.exists(!0)))}return c.mutationQueue.addMutationBatch(y,h,_,l)}).next(O=>{g=O;const _=O.applyToLocalDocumentSet(p,I);return c.documentOverlayCache.saveOverlays(y,O.batchId,_)})}).then(()=>({batchId:g.batchId,changes:AE(p)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(a.batchId),function(r,l,c){let h=r.du[r.currentUser.toKey()];h||(h=new en(Ze)),h=h.insert(l,c),r.du[r.currentUser.toKey()]=h}(s,a.batchId,n),await Gu(s,a.changes),await Yd(s.remoteStore)}catch(a){const i=vy(a,"Failed to persist write");n.reject(i)}}async function lw(t,e){const n=je(t);try{const s=await xI(n.localStore,e);e.targetChanges.forEach((a,i)=>{const r=n.Au.get(i);r&&(xt(a.addedDocuments.size+a.modifiedDocuments.size+a.removedDocuments.size<=1,22616),a.addedDocuments.size>0?r.hu=!0:a.modifiedDocuments.size>0?xt(r.hu,14607):a.removedDocuments.size>0&&(xt(r.hu,42227),r.hu=!1))}),await Gu(n,s,e)}catch(s){await Xl(s)}}function v1(t,e,n){const s=je(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const a=[];s.Tu.forEach((i,r)=>{const l=r.view.va(e);l.snapshot&&a.push(l.snapshot)}),function(r,l){const c=je(r);c.onlineState=l;let h=!1;c.queries.forEach((d,p)=>{for(const g of p.Sa)g.va(l)&&(h=!0)}),h&&Ty(c)}(s.eventManager,e),a.length&&s.Pu.H_(a),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function c4(t,e,n){const s=je(t);s.sharedClientState.updateQueryState(e,"rejected",n);const a=s.Au.get(e),i=a&&a.key;if(i){let r=new en(Ee.comparator);r=r.insert(i,ss.newNoDocument(i,De.min()));const l=et().add(i),c=new Hd(De.min(),new Map,new en(Ze),r,l);await lw(s,c),s.Ru=s.Ru.remove(i),s.Au.delete(e),Sy(s)}else await kp(s.localStore,e,!1).then(()=>Mp(s,e,n)).catch(Xl)}async function u4(t,e){const n=je(t),s=e.batch.batchId;try{const a=await vI(n.localStore,e);uw(n,s,null),cw(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Gu(n,a)}catch(a){await Xl(a)}}async function h4(t,e,n){const s=je(t);try{const a=await function(r,l){const c=je(r);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let d;return c.mutationQueue.lookupMutationBatch(h,l).next(p=>(xt(p!==null,37113),d=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,d,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d)).next(()=>c.localDocuments.getDocuments(h,d))})}(s.localStore,e);uw(s,e,n),cw(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Gu(s,a)}catch(a){await Xl(a)}}function cw(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function uw(t,e,n){const s=je(t);let a=s.du[s.currentUser.toKey()];if(a){const i=a.get(e);i&&(n?i.reject(n):i.resolve(),a=a.remove(e)),s.du[s.currentUser.toKey()]=a}}function Mp(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.Eu.get(e))t.Tu.delete(s),n&&t.Pu.yu(s,n);t.Eu.delete(e),t.isPrimaryClient&&t.Vu.Gr(e).forEach(s=>{t.Vu.containsKey(s)||hw(t,s)})}function hw(t,e){t.Iu.delete(e.path.canonicalString());const n=t.Ru.get(e);n!==null&&(my(t.remoteStore,n),t.Ru=t.Ru.remove(e),t.Au.delete(n),Sy(t))}function x1(t,e,n){for(const s of n)s instanceof iw?(t.Vu.addReference(s.key,e),f4(t,s)):s instanceof rw?(fe(wy,"Document no longer in limbo: "+s.key),t.Vu.removeReference(s.key,e),t.Vu.containsKey(s.key)||hw(t,s.key)):Re(19791,{wu:s})}function f4(t,e){const n=e.key,s=n.path.canonicalString();t.Ru.get(n)||t.Iu.has(s)||(fe(wy,"New document in limbo: "+n),t.Iu.add(s),Sy(t))}function Sy(t){for(;t.Iu.size>0&&t.Ru.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new Ee(Pt.fromString(e)),s=t.fu.next();t.Au.set(s,new t4(n)),t.Ru=t.Ru.insert(n,s),ZE(t.remoteStore,new Zi(Va(Ud(n.path)),s,"TargetPurposeLimboResolution",Pd.ce))}}async function Gu(t,e,n){const s=je(t),a=[],i=[],r=[];s.Tu.isEmpty()||(s.Tu.forEach((l,c)=>{r.push(s.pu(c,e,n).then(h=>{var d;if((h||n)&&s.isPrimaryClient){const p=h?!h.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))==null?void 0:d.current;s.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){a.push(h);const p=fy.Is(c.targetId,h);i.push(p)}}))}),await Promise.all(r),s.Pu.H_(a),await async function(c,h){const d=je(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>Q.forEach(h,g=>Q.forEach(g.Ts,y=>d.persistence.referenceDelegate.addReference(p,g.targetId,y)).next(()=>Q.forEach(g.Es,y=>d.persistence.referenceDelegate.removeReference(p,g.targetId,y)))))}catch(p){if(!Wl(p))throw p;fe(dy,"Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const y=d.vs.get(g),C=y.snapshotVersion,I=y.withLastLimboFreeSnapshotVersion(C);d.vs=d.vs.insert(g,I)}}}(s.localStore,i))}async function d4(t,e){const n=je(t);if(!n.currentUser.isEqual(e)){fe(wy,"User change. New user:",e.toKey());const s=await QE(n.localStore,e);n.currentUser=e,function(i,r){i.mu.forEach(l=>{l.forEach(c=>{c.reject(new ce(G.CANCELLED,r))})}),i.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Gu(n,s.Ns)}}function m4(t,e){const n=je(t),s=n.Au.get(e);if(s&&s.hu)return et().add(s.key);{let a=et();const i=n.Eu.get(e);if(!i)return a;for(const r of i){const l=n.Tu.get(r);a=a.unionWith(l.view.nu)}return a}}function fw(t){const e=je(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=lw.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=m4.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=c4.bind(null,e),e.Pu.H_=WI.bind(null,e.eventManager),e.Pu.yu=JI.bind(null,e.eventManager),e}function p4(t){const e=je(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=u4.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=h4.bind(null,e),e}class sd{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=qd(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return bI(this.persistence,new pI,e.initialUser,this.serializer)}Cu(e){return new KE(hy.Vi,this.serializer)}Du(e){return new SI}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}sd.provider={build:()=>new sd};class g4 extends sd{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){xt(this.persistence.referenceDelegate instanceof td,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new eI(s,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?vs.withCacheSize(this.cacheSizeBytes):vs.DEFAULT;return new KE(s=>td.Vi(s,n),this.serializer)}}class Dp{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>v1(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=d4.bind(null,this.syncEngine),await KI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new XI}()}createDatastore(e){const n=qd(e.databaseInfo.databaseId),s=CI(e.databaseInfo);return jI(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return function(s,a,i,r,l){return new VI(s,a,i,r,l)}(this.localStore,this.datastore,e.asyncQueue,n=>v1(this.syncEngine,n,0),function(){return d1.v()?new d1:new AI}())}createSyncEngine(e,n){return function(a,i,r,l,c,h,d){const p=new n4(a,i,r,l,c,h);return d&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(a){const i=je(a);fe(po,"RemoteStore shutting down."),i.Ia.add(5),await qu(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}Dp.provider={build:()=>new Dp};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ay{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ti("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar="FirestoreClient";class y4{constructor(e,n,s,a,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this._databaseInfo=a,this.user=ns.UNAUTHENTICATED,this.clientId=ey.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async r=>{fe(Ar,"Received user=",r.uid),await this.authCredentialListener(r),this.user=r}),this.appCheckCredentials.start(s,r=>(fe(Ar,"Received new app check token=",r),this.appCheckCredentialListener(r,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new di;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=vy(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function e0(t,e){t.asyncQueue.verifyOperationInProgress(),fe(Ar,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async a=>{s.isEqual(a)||(await QE(e.localStore,a),s=a)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function _1(t,e){t.asyncQueue.verifyOperationInProgress();const n=await b4(t);fe(Ar,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(s=>p1(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,a)=>p1(e.remoteStore,a)),t._onlineComponents=e}async function b4(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){fe(Ar,"Using user provided OfflineComponentProvider");try{await e0(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(a){return a.name==="FirebaseError"?a.code===G.FAILED_PRECONDITION||a.code===G.UNIMPLEMENTED:!(typeof DOMException<"u"&&a instanceof DOMException)||a.code===22||a.code===20||a.code===11}(n))throw n;mo("Error using user provided cache. Falling back to memory cache: "+n),await e0(t,new sd)}}else fe(Ar,"Using default OfflineComponentProvider"),await e0(t,new g4(void 0));return t._offlineComponents}async function dw(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(fe(Ar,"Using user provided OnlineComponentProvider"),await _1(t,t._uninitializedComponentsProvider._online)):(fe(Ar,"Using default OnlineComponentProvider"),await _1(t,new Dp))),t._onlineComponents}function v4(t){return dw(t).then(e=>e.syncEngine)}async function ad(t){const e=await dw(t),n=e.eventManager;return n.onListen=s4.bind(null,e.syncEngine),n.onUnlisten=r4.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=a4.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=o4.bind(null,e.syncEngine),n}function x4(t,e,n,s){const a=new Ay(s),i=new Ey(e,a,n);return t.asyncQueue.enqueueAndForget(async()=>xy(await ad(t),i)),()=>{a.Nu(),t.asyncQueue.enqueueAndForget(async()=>_y(await ad(t),i))}}function _4(t,e,n={}){const s=new di;return t.asyncQueue.enqueueAndForget(async()=>function(i,r,l,c,h){const d=new Ay({next:g=>{d.Nu(),r.enqueueAndForget(()=>_y(i,p));const y=g.docs.has(l);!y&&g.fromCache?h.reject(new ce(G.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&g.fromCache&&c&&c.source==="server"?h.reject(new ce(G.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new Ey(Ud(l.path),d,{includeMetadataChanges:!0,qa:!0});return xy(i,p)}(await ad(t),t.asyncQueue,e,n,s)),s.promise}function T4(t,e,n={}){const s=new di;return t.asyncQueue.enqueueAndForget(async()=>function(i,r,l,c,h){const d=new Ay({next:g=>{d.Nu(),r.enqueueAndForget(()=>_y(i,p)),g.fromCache&&c.source==="server"?h.reject(new ce(G.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new Ey(l,d,{includeMetadataChanges:!0,qa:!0});return xy(i,p)}(await ad(t),t.asyncQueue,e,n,s)),s.promise}function E4(t,e){const n=new di;return t.asyncQueue.enqueueAndForget(async()=>l4(await v4(t),e,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mw(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w4="ComponentProvider",T1=new Map;function S4(t,e,n,s,a){return new qk(t,e,n,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,mw(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw="firestore.googleapis.com",E1=!0;class w1{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new ce(G.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=pw,this.ssl=E1}else this.host=e.host,this.ssl=e.ssl??E1;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=YE;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<JC)throw new ce(G.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Dk("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=mw(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new ce(G.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new ce(G.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new ce(G.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,a){return s.timeoutSeconds===a.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Kd{constructor(e,n,s,a){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=a,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new w1({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ce(G.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ce(G.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new w1(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new Ek;switch(s.type){case"firstParty":return new Nk(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new ce(G.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const s=T1.get(n);s&&(fe(w4,"Removing Datastore"),T1.delete(n),s.terminate())}(this),Promise.resolve()}}function A4(t,e,n,s={}){var h;t=ia(t,Kd);const a=Uu(e),i=t._getSettings(),r={...i,emulatorOptions:t._getEmulatorOptions()},l=`${e}:${n}`;a&&F2(`https://${l}`),i.host!==pw&&i.host!==l&&mo("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:l,ssl:a,emulatorOptions:s};if(!vr(c,r)&&(t._setSettings(c),s.mockUserToken)){let d,p;if(typeof s.mockUserToken=="string")d=s.mockUserToken,p=ns.MOCK_USER;else{d=qR(s.mockUserToken,(h=t._app)==null?void 0:h.options.projectId);const g=s.mockUserToken.sub||s.mockUserToken.user_id;if(!g)throw new ce(G.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new ns(g)}t._authCredentials=new wk(new nE(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Mr(this.firestore,e,this._query)}}class on{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new dr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new on(this.firestore,e,this._key)}toJSON(){return{type:on._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,s){if(zu(n,on._jsonSchema))return new on(e,s||null,new Ee(Pt.fromString(n.referencePath)))}}on._jsonSchemaVersion="firestore/documentReference/1.0",on._jsonSchema={type:Tn("string",on._jsonSchemaVersion),referencePath:Tn("string")};class dr extends Mr{constructor(e,n,s){super(e,n,Ud(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new on(this.firestore,null,new Ee(e))}withConverter(e){return new dr(this.firestore,e,this._path)}}function S1(t,e,...n){if(t=Pn(t),sE("collection","path",e),t instanceof Kd){const s=Pt.fromString(e,...n);return Vv(s),new dr(t,null,s)}{if(!(t instanceof on||t instanceof dr))throw new ce(G.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Pt.fromString(e,...n));return Vv(s),new dr(t.firestore,null,s)}}function bc(t,e,...n){if(t=Pn(t),arguments.length===1&&(e=ey.newId()),sE("doc","path",e),t instanceof Kd){const s=Pt.fromString(e,...n);return Pv(s),new on(t,null,new Ee(s))}{if(!(t instanceof on||t instanceof dr))throw new ce(G.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Pt.fromString(e,...n));return Pv(s),new on(t.firestore,t instanceof dr?t.converter:null,new Ee(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A1="AsyncQueue";class N1{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new WE(this,"async_queue_retry"),this._c=()=>{const s=Zm();s&&fe(A1,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const n=Zm();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=Zm();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new di;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Wl(e))throw e;fe(A1,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,Ti("INTERNAL UNHANDLED ERROR: ",R1(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=n,n}enqueueAfterDelay(e,n,s){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const a=by.createAndSchedule(this,e,n,s,i=>this.hc(i));return this.tc.push(a),a}uc(){this.nc&&Re(47125,{Pc:R1(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function R1(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class go extends Kd{constructor(e,n,s,a){super(e,n,s,a),this.type="firestore",this._queue=new N1,this._persistenceKey=(a==null?void 0:a.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new N1(e),this._firestoreClient=void 0,await e}}}function N4(t,e){const n=typeof t=="object"?t:Jg(),s=typeof t=="string"?t:e||Yf,a=Bu(n,"firestore").getImmediate({identifier:s});if(!a._initialized){const i=HR("firestore");i&&A4(a,...i)}return a}function Qd(t){if(t._terminated)throw new ce(G.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||R4(t),t._firestoreClient}function R4(t){var s,a,i,r;const e=t._freezeSettings(),n=S4(t._databaseId,((s=t._app)==null?void 0:s.options.appId)||"",t._persistenceKey,(a=t._app)==null?void 0:a.options.apiKey,e);t._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((r=e.localCache)!=null&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new y4(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this._byteString=e}static fromBase64String(e){try{return new na(Kn.fromBase64String(e))}catch(n){throw new ce(G.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new na(Kn.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:na._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(zu(e,na._jsonSchema))return na.fromBase64String(e.bytes)}}na._jsonSchemaVersion="firestore/bytes/1.0",na._jsonSchema={type:Tn("string",na._jsonSchemaVersion),bytes:Tn("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ny{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new ce(G.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new qn(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new ce(G.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new ce(G.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ze(this._lat,e._lat)||Ze(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ba._jsonSchemaVersion}}static fromJSON(e){if(zu(e,Ba._jsonSchema))return new Ba(e.latitude,e.longitude)}}Ba._jsonSchemaVersion="firestore/geoPoint/1.0",Ba._jsonSchema={type:Tn("string",Ba._jsonSchemaVersion),latitude:Tn("number"),longitude:Tn("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,a){if(s.length!==a.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==a[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ba._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(zu(e,ba._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new ba(e.vectorValues);throw new ce(G.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ba._jsonSchemaVersion="firestore/vectorValue/1.0",ba._jsonSchema={type:Tn("string",ba._jsonSchemaVersion),vectorValues:Tn("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k4=/^__.*__$/;class C4{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new Ir(e,this.data,this.fieldMask,n,this.fieldTransforms):new Fu(e,this.data,n,this.fieldTransforms)}}class gw{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new Ir(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function yw(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Re(40011,{dataSource:t})}}class Wd{constructor(e,n,s,a,i,r){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=a,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=r||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Wd({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var a;const n=(a=this.path)==null?void 0:a.child(e),s=this.i({path:n,arrayElement:!1});return s.mc(e),s}fc(e){var a;const n=(a=this.path)==null?void 0:a.child(e),s=this.i({path:n,arrayElement:!1});return s.Ac(),s}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return id(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(yw(this.dataSource)&&k4.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class I4{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||qd(e)}I(e,n,s,a=!1){return new Wd({dataSource:e,methodName:n,targetDoc:s,path:qn.emptyPath(),arrayElement:!1,hasConverter:a},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ry(t){const e=t._freezeSettings(),n=qd(t._databaseId);return new I4(t._databaseId,!!e.ignoreUndefinedProperties,n)}function M4(t,e,n,s,a,i={}){const r=t.I(i.merge||i.mergeFields?2:0,e,n,a);Cy("Data must be an object, but it was:",r,s);const l=bw(s,r);let c,h;if(i.merge)c=new Ms(r.fieldMask),h=r.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=Pl(e,p,n);if(!r.contains(g))throw new ce(G.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);_w(d,g)||d.push(g)}c=new Ms(d),h=r.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=r.fieldTransforms;return new C4(new xs(l),c,h)}class Jd extends Xd{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Jd}}function D4(t,e,n){return new Wd({dataSource:3,targetDoc:e.settings.targetDoc,methodName:t._methodName,arrayElement:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class ky extends Xd{constructor(e,n){super(e),this.Sc=n}_toFieldTransform(e){const n=D4(this,e,!0),s=this.Sc.map(i=>Zl(i,n)),a=new Dl(s);return new bC(e.path,a)}isEqual(e){return e instanceof ky&&vr(this.Sc,e.Sc)}}function O4(t,e,n,s){const a=t.I(1,e,n);Cy("Data must be an object, but it was:",a,s);const i=[],r=xs.empty();Cr(s,(c,h)=>{const d=xw(e,c,n);h=Pn(h);const p=a.fc(d);if(h instanceof Jd)i.push(d);else{const g=Zl(h,p);g!=null&&(i.push(d),r.set(d,g))}});const l=new Ms(i);return new gw(r,l,a.fieldTransforms)}function j4(t,e,n,s,a,i){const r=t.I(1,e,n),l=[Pl(e,s,n)],c=[a];if(i.length%2!=0)throw new ce(G.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(Pl(e,i[g])),c.push(i[g+1]);const h=[],d=xs.empty();for(let g=l.length-1;g>=0;--g)if(!_w(h,l[g])){const y=l[g];let C=c[g];C=Pn(C);const I=r.fc(y);if(C instanceof Jd)h.push(y);else{const O=Zl(C,I);O!=null&&(h.push(y),d.set(y,O))}}const p=new Ms(h);return new gw(d,p,r.fieldTransforms)}function P4(t,e,n,s=!1){return Zl(n,t.I(s?4:3,e))}function Zl(t,e){if(vw(t=Pn(t)))return Cy("Unsupported field value:",e,t),bw(t,e);if(t instanceof Xd)return function(s,a){if(!yw(a.dataSource))throw a.yc(`${s._methodName}() can only be used with update() and set()`);if(!a.path)throw a.yc(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(a);i&&a.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(s,a){const i=[];let r=0;for(const l of s){let c=Zl(l,a.gc(r));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),r++}return{arrayValue:{values:i}}}(t,e)}return function(s,a){if((s=Pn(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return pC(a.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=qt.fromDate(s);return{timestampValue:ed(a.serializer,i)}}if(s instanceof qt){const i=new qt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:ed(a.serializer,i)}}if(s instanceof Ba)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof na)return{bytesValue:UE(a.serializer,s._byteString)};if(s instanceof on){const i=a.databaseId,r=s.firestore._databaseId;if(!r.isEqual(i))throw a.yc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:cy(s.firestore._databaseId||a.databaseId,s._key.path)}}if(s instanceof ba)return function(r,l){const c=r instanceof ba?r.toArray():r;return{mapValue:{fields:{[fE]:{stringValue:mE},[Kf]:{arrayValue:{values:c.map(d=>{if(typeof d!="number")throw l.yc("VectorValues must only contain numeric values.");return ry(l.serializer,d)})}}}}}}(s,a);if(GE(s))return s._toProto(a.serializer);throw a.yc(`Unsupported field value: ${jd(s)}`)}(t,e)}function bw(t,e){const n={};return rE(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Cr(t,(s,a)=>{const i=Zl(a,e.dc(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function vw(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof qt||t instanceof Ba||t instanceof na||t instanceof on||t instanceof Xd||t instanceof ba||GE(t))}function Cy(t,e,n){if(!vw(n)||!aE(n)){const s=jd(n);throw s==="an object"?e.yc(t+" a custom object"):e.yc(t+" "+s)}}function Pl(t,e,n){if((e=Pn(e))instanceof Ny)return e._internalPath;if(typeof e=="string")return xw(t,e);throw id("Field path arguments must be of type string or ",t,!1,void 0,n)}const V4=new RegExp("[~\\*/\\[\\]]");function xw(t,e,n){if(e.search(V4)>=0)throw id(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ny(...e.split("."))._internalPath}catch{throw id(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function id(t,e,n,s,a){const i=s&&!s.isEmpty(),r=a!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||r)&&(c+=" (found",i&&(c+=` in field ${s}`),r&&(c+=` in document ${a}`),c+=")"),new ce(G.INVALID_ARGUMENT,l+t+c)}function _w(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L4{convertValue(e,n="none"){switch(wr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return un(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Er(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw Re(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return Cr(e,(a,i)=>{s[a]=this.convertValue(i,n)}),s}convertVectorValue(e){var s,a,i;const n=(i=(a=(s=e.fields)==null?void 0:s[Kf].arrayValue)==null?void 0:a.values)==null?void 0:i.map(r=>un(r.doubleValue));return new ba(n)}convertGeoPoint(e){return new Ba(un(e.latitude),un(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=Ld(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(bu(e));default:return null}}convertTimestamp(e){const n=Tr(e);return new qt(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=Pt.fromString(e);xt(qE(s),9688,{name:e});const a=new vu(s.get(1),s.get(3)),i=new Ee(s.popFirst(5));return a.isEqual(n)||Ti(`Document ${i} contains a document reference within a different database (${a.projectId}/${a.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy extends L4{constructor(e){super(),this.firestore=e}convertBytes(e){return new na(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new on(this.firestore,null,n)}}function qr(...t){return new ky("arrayUnion",t)}const k1="@firebase/firestore",C1="4.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I1(t){return function(n,s){if(typeof n!="object"||n===null)return!1;const a=n;for(const i of s)if(i in a&&typeof a[i]=="function")return!0;return!1}(t,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(e,n,s,a,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=a,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new on(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new U4(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const n=this._document.data.field(Pl("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class U4 extends Tw{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ew(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new ce(G.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class My{}class ww extends My{}function M1(t,e,...n){let s=[];e instanceof My&&s.push(e),s=s.concat(n),function(i){const r=i.filter(c=>c instanceof Dy).length,l=i.filter(c=>c instanceof Zd).length;if(r>1||r>0&&l>0)throw new ce(G.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const a of s)t=a._apply(t);return t}class Zd extends ww{constructor(e,n,s){super(),this._field=e,this._op=n,this._value=s,this.type="where"}static _create(e,n,s){return new Zd(e,n,s)}_apply(e){const n=this._parse(e);return Sw(e._query,n),new Mr(e.firestore,e.converter,wp(e._query,n))}_parse(e){const n=Ry(e.firestore);return function(i,r,l,c,h,d,p){let g;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new ce(G.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){j1(p,d);const C=[];for(const I of p)C.push(O1(c,i,I));g={arrayValue:{values:C}}}else g=O1(c,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||j1(p,d),g=P4(l,r,p,d==="in"||d==="not-in");return xn.create(h,d,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function t0(t,e,n){const s=e,a=Pl("where",t);return Zd._create(a,s,n)}class Dy extends My{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Dy(e,n)}_parse(e){const n=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return n.length===1?n[0]:va.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(a,i){let r=a;const l=i.getFlattenedFilters();for(const c of l)Sw(r,c),r=wp(r,c)}(e._query,n),new Mr(e.firestore,e.converter,wp(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Oy extends ww{constructor(e,n,s){super(),this.type=e,this._limit=n,this._limitType=s}static _create(e,n,s){return new Oy(e,n,s)}_apply(e){return new Mr(e.firestore,e.converter,Wf(e._query,this._limit,this._limitType))}}function D1(t){return Ok("limit",t),Oy._create("limit",t,"F")}function O1(t,e,n){if(typeof(n=Pn(n))=="string"){if(n==="")throw new ce(G.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!TE(e)&&n.indexOf("/")!==-1)throw new ce(G.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const s=e.path.child(Pt.fromString(n));if(!Ee.isDocumentKey(s))throw new ce(G.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return qv(t,new Ee(s))}if(n instanceof on)return qv(t,n._key);throw new ce(G.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${jd(n)}.`)}function j1(t,e){if(!Array.isArray(t)||t.length===0)throw new ce(G.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Sw(t,e){const n=function(a,i){for(const r of a)for(const l of r.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(a){switch(a){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new ce(G.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new ce(G.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function B4(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}class Rc{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class io extends Tw{constructor(e,n,s,a,i,r){super(e,n,s,a,r),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new rf(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(Pl("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new ce(G.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=io._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}io._jsonSchemaVersion="firestore/documentSnapshot/1.0",io._jsonSchema={type:Tn("string",io._jsonSchemaVersion),bundleSource:Tn("string","DocumentSnapshot"),bundleName:Tn("string"),bundle:Tn("string")};class rf extends io{data(e={}){return super.data(e)}}class ro{constructor(e,n,s,a){this._firestore=e,this._userDataWriter=n,this._snapshot=a,this.metadata=new Rc(a.hasPendingWrites,a.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new rf(this._firestore,this._userDataWriter,s.key,s,new Rc(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new ce(G.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(a,i){if(a._snapshot.oldDocs.isEmpty()){let r=0;return a._snapshot.docChanges.map(l=>{const c=new rf(a._firestore,a._userDataWriter,l.doc.key,l.doc,new Rc(a._snapshot.mutatedKeys.has(l.doc.key),a._snapshot.fromCache),a.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:r++}})}{let r=a._snapshot.oldDocs;return a._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new rf(a._firestore,a._userDataWriter,l.doc.key,l.doc,new Rc(a._snapshot.mutatedKeys.has(l.doc.key),a._snapshot.fromCache),a.query.converter);let h=-1,d=-1;return l.type!==0&&(h=r.indexOf(l.doc.key),r=r.delete(l.doc.key)),l.type!==1&&(r=r.add(l.doc),d=r.indexOf(l.doc.key)),{type:z4(l.type),doc:c,oldIndex:h,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new ce(G.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ro._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ey.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],s=[],a=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),a.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function z4(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Re(61501,{type:t})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ro._jsonSchemaVersion="firestore/querySnapshot/1.0",ro._jsonSchema={type:Tn("string",ro._jsonSchemaVersion),bundleSource:Tn("string","QuerySnapshot"),bundleName:Tn("string"),bundle:Tn("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $4(t){t=ia(t,on);const e=ia(t.firestore,go),n=Qd(e);return _4(n,t._key).then(s=>Nw(e,t,s))}function P1(t){t=ia(t,Mr);const e=ia(t.firestore,go),n=Qd(e),s=new Iy(e);return Ew(t._query),T4(n,t._query).then(a=>new ro(e,s,t,a))}function F4(t,e,n){t=ia(t,on);const s=ia(t.firestore,go),a=B4(t.converter,e,n),i=Ry(s);return Aw(s,[M4(i,"setDoc",t._key,a,t.converter!==null,n).toMutation(t._key,La.none())])}function V1(t,e,n,...s){t=ia(t,on);const a=ia(t.firestore,go),i=Ry(a);let r;return r=typeof(e=Pn(e))=="string"||e instanceof Ny?j4(i,"updateDoc",t._key,e,n,s):O4(i,"updateDoc",t._key,e),Aw(a,[r.toMutation(t._key,La.exists(!0))])}function H4(t,...e){var h,d,p;t=Pn(t);let n={includeMetadataChanges:!1,source:"default"},s=0;typeof e[s]!="object"||I1(e[s])||(n=e[s++]);const a={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(I1(e[s])){const g=e[s];e[s]=(h=g.next)==null?void 0:h.bind(g),e[s+1]=(d=g.error)==null?void 0:d.bind(g),e[s+2]=(p=g.complete)==null?void 0:p.bind(g)}let i,r,l;if(t instanceof on)r=ia(t.firestore,go),l=Ud(t._key.path),i={next:g=>{e[s]&&e[s](Nw(r,t,g))},error:e[s+1],complete:e[s+2]};else{const g=ia(t,Mr);r=ia(g.firestore,go),l=g._query;const y=new Iy(r);i={next:C=>{e[s]&&e[s](new ro(r,y,g,C))},error:e[s+1],complete:e[s+2]},Ew(t._query)}const c=Qd(r);return x4(c,l,a,i)}function Aw(t,e){const n=Qd(t);return E4(n,e)}function Nw(t,e,n){const s=n.docs.get(e._key),a=new Iy(t);return new io(t,a,e._key,s,new Rc(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){Tk(Kl),xr(new xi("firestore",(s,{instanceIdentifier:a,options:i})=>{const r=s.getProvider("app").getImmediate(),l=new go(new Sk(s.getProvider("auth-internal")),new Rk(r,s.getProvider("app-check-internal")),Gk(r,a),r);return i={useFetchStreams:n,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),fi(k1,C1,e),fi(k1,C1,"esm2020")})();function Rw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const q4=Rw,kw=new Yl("auth","Firebase",Rw());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd=new Od("@firebase/auth");function G4(t,...e){rd.logLevel<=Je.WARN&&rd.warn(`Auth (${Kl}): ${t}`,...e)}function of(t,...e){rd.logLevel<=Je.ERROR&&rd.error(`Auth (${Kl}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(t,...e){throw jy(t,...e)}function za(t,...e){return jy(t,...e)}function Cw(t,e,n){const s={...q4(),[e]:n};return new Yl("auth","Firebase",s).create(e,{appName:t.name})}function mr(t){return Cw(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function jy(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return kw.create(t,...e)}function Ie(t,e,...n){if(!t)throw jy(e,...n)}function oi(t){const e="INTERNAL ASSERTION FAILED: "+t;throw of(e),new Error(e)}function Si(t,e){t||oi(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Op(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function Y4(){return L1()==="http:"||L1()==="https:"}function L1(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K4(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Y4()||QR()||"connection"in navigator)?navigator.onLine:!0}function Q4(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(e,n){this.shortDelay=e,this.longDelay=n,Si(n>e,"Short delay should be less than long delay!"),this.isMobile=GR()||XR()}get(){return K4()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Py(t,e){Si(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;oi("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;oi("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;oi("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X4={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W4=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],J4=new Yu(3e4,6e4);function em(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function ec(t,e,n,s,a={}){return Mw(t,a,async()=>{let i={},r={};s&&(e==="GET"?r=s:i={body:JSON.stringify(s)});const l=Lu({key:t.config.apiKey,...r}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const h={method:e,headers:c,...i};return KR()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&Uu(t.emulatorConfig.host)&&(h.credentials="include"),Iw.fetch()(await Ow(t,t.config.apiHost,n,l),h)})}async function Mw(t,e,n){t._canInitEmulator=!1;const s={...X4,...e};try{const a=new Z4(t),i=await Promise.race([n(),a.promise]);a.clearNetworkTimeout();const r=await i.json();if("needConfirmation"in r)throw Dh(t,"account-exists-with-different-credential",r);if(i.ok&&!("errorMessage"in r))return r;{const l=i.ok?r.errorMessage:r.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Dh(t,"credential-already-in-use",r);if(c==="EMAIL_EXISTS")throw Dh(t,"email-already-in-use",r);if(c==="USER_DISABLED")throw Dh(t,"user-disabled",r);const d=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Cw(t,d,h);wi(t,d)}}catch(a){if(a instanceof Ni)throw a;wi(t,"network-request-failed",{message:String(a)})}}async function Dw(t,e,n,s,a={}){const i=await ec(t,e,n,s,a);return"mfaPendingCredential"in i&&wi(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function Ow(t,e,n,s){const a=`${e}${n}?${s}`,i=t,r=i.config.emulator?Py(t.config,a):`${t.config.apiScheme}://${a}`;return W4.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(r).toString():r}class Z4{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(za(this.auth,"network-request-failed")),J4.get())})}}function Dh(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const a=za(t,e,s);return a.customData._tokenResponse=n,a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eM(t,e){return ec(t,"POST","/v1/accounts:delete",e)}async function od(t,e){return ec(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function tM(t,e=!1){const n=Pn(t),s=await n.getIdToken(e),a=Vy(s);Ie(a&&a.exp&&a.auth_time&&a.iat,n.auth,"internal-error");const i=typeof a.firebase=="object"?a.firebase:void 0,r=i==null?void 0:i.sign_in_provider;return{claims:a,token:s,authTime:Qc(n0(a.auth_time)),issuedAtTime:Qc(n0(a.iat)),expirationTime:Qc(n0(a.exp)),signInProvider:r||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function n0(t){return Number(t)*1e3}function Vy(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return of("JWT malformed, contained fewer than 3 sections"),null;try{const a=L2(n);return a?JSON.parse(a):(of("Failed to decode base64 JWT payload"),null)}catch(a){return of("Caught error parsing JWT payload as JSON",a==null?void 0:a.toString()),null}}function U1(t){const e=Vy(t);return Ie(e,"internal-error"),Ie(typeof e.exp<"u","internal-error"),Ie(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tu(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Ni&&nM(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function nM({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sM{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qc(this.lastLoginAt),this.creationTime=Qc(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ld(t){var p;const e=t.auth,n=await t.getIdToken(),s=await Tu(t,od(e,{idToken:n}));Ie(s==null?void 0:s.users.length,e,"internal-error");const a=s.users[0];t._notifyReloadListener(a);const i=(p=a.providerUserInfo)!=null&&p.length?jw(a.providerUserInfo):[],r=iM(t.providerData,i),l=t.isAnonymous,c=!(t.email&&a.passwordHash)&&!(r!=null&&r.length),h=l?c:!1,d={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:r,metadata:new jp(a.createdAt,a.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function aM(t){const e=Pn(t);await ld(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function iM(t,e){return[...t.filter(s=>!e.some(a=>a.providerId===s.providerId)),...e]}function jw(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rM(t,e){const n=await Mw(t,{},async()=>{const s=Lu({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:a,apiKey:i}=t.config,r=await Ow(t,a,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:s};return t.emulatorConfig&&Uu(t.emulatorConfig.host)&&(c.credentials="include"),Iw.fetch()(r,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function oM(t,e){return ec(t,"POST","/v2/accounts:revokeToken",em(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Ie(e.idToken,"internal-error"),Ie(typeof e.idToken<"u","internal-error"),Ie(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):U1(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Ie(e.length!==0,"internal-error");const n=U1(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Ie(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:a,expiresIn:i}=await rM(e,n);this.updateTokensAndExpiration(s,a,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:a,expirationTime:i}=n,r=new gl;return s&&(Ie(typeof s=="string","internal-error",{appName:e}),r.refreshToken=s),a&&(Ie(typeof a=="string","internal-error",{appName:e}),r.accessToken=a),i&&(Ie(typeof i=="number","internal-error",{appName:e}),r.expirationTime=i),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new gl,this.toJSON())}_performRefresh(){return oi("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(t,e){Ie(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ya{constructor({uid:e,auth:n,stsTokenManager:s,...a}){this.providerId="firebase",this.proactiveRefresh=new sM(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new jp(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const n=await Tu(this,this.stsTokenManager.getToken(this.auth,e));return Ie(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return tM(this,e)}reload(){return aM(this)}_assign(e){this!==e&&(Ie(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ya({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){Ie(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await ld(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ga(this.auth.app))return Promise.reject(mr(this.auth));const e=await this.getIdToken();return await Tu(this,eM(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,a=n.email??void 0,i=n.phoneNumber??void 0,r=n.photoURL??void 0,l=n.tenantId??void 0,c=n._redirectEventId??void 0,h=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:y,providerData:C,stsTokenManager:I}=n;Ie(p&&I,e,"internal-error");const O=gl.fromJSON(this.name,I);Ie(typeof p=="string",e,"internal-error"),Pi(s,e.name),Pi(a,e.name),Ie(typeof g=="boolean",e,"internal-error"),Ie(typeof y=="boolean",e,"internal-error"),Pi(i,e.name),Pi(r,e.name),Pi(l,e.name),Pi(c,e.name),Pi(h,e.name),Pi(d,e.name);const _=new ya({uid:p,auth:e,email:a,emailVerified:g,displayName:s,isAnonymous:y,photoURL:r,phoneNumber:i,tenantId:l,stsTokenManager:O,createdAt:h,lastLoginAt:d});return C&&Array.isArray(C)&&(_.providerData=C.map(v=>({...v}))),c&&(_._redirectEventId=c),_}static async _fromIdTokenResponse(e,n,s=!1){const a=new gl;a.updateFromServerResponse(n);const i=new ya({uid:n.localId,auth:e,stsTokenManager:a,isAnonymous:s});return await ld(i),i}static async _fromGetAccountInfoResponse(e,n,s){const a=n.users[0];Ie(a.localId!==void 0,"internal-error");const i=a.providerUserInfo!==void 0?jw(a.providerUserInfo):[],r=!(a.email&&a.passwordHash)&&!(i!=null&&i.length),l=new gl;l.updateFromIdToken(s);const c=new ya({uid:a.localId,auth:e,stsTokenManager:l,isAnonymous:r}),h={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:i,metadata:new jp(a.createdAt,a.lastLoginAt),isAnonymous:!(a.email&&a.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B1=new Map;function li(t){Si(t instanceof Function,"Expected a class definition");let e=B1.get(t);return e?(Si(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,B1.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Pw.type="NONE";const z1=Pw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lf(t,e,n){return`firebase:${t}:${e}:${n}`}class yl{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:a,name:i}=this.auth;this.fullUserKey=lf(this.userKey,a.apiKey,i),this.fullPersistenceKey=lf("persistence",a.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await od(this.auth,{idToken:e}).catch(()=>{});return n?ya._fromGetAccountInfoResponse(this.auth,n,e):null}return ya._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new yl(li(z1),e,s);const a=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=a[0]||li(z1);const r=lf(s,e.config.apiKey,e.name);let l=null;for(const h of n)try{const d=await h._get(r);if(d){let p;if(typeof d=="string"){const g=await od(e,{idToken:d}).catch(()=>{});if(!g)break;p=await ya._fromGetAccountInfoResponse(e,g,d)}else p=ya._fromJSON(e,d);h!==i&&(l=p),i=h;break}}catch{}const c=a.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new yl(i,e,s):(i=c[0],l&&await i._set(r,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(r)}catch{}})),new yl(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $1(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Bw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Vw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if($w(e))return"Blackberry";if(Fw(e))return"Webos";if(Lw(e))return"Safari";if((e.includes("chrome/")||Uw(e))&&!e.includes("edge/"))return"Chrome";if(zw(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Vw(t=as()){return/firefox\//i.test(t)}function Lw(t=as()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Uw(t=as()){return/crios\//i.test(t)}function Bw(t=as()){return/iemobile/i.test(t)}function zw(t=as()){return/android/i.test(t)}function $w(t=as()){return/blackberry/i.test(t)}function Fw(t=as()){return/webos/i.test(t)}function Ly(t=as()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function lM(t=as()){var e;return Ly(t)&&!!((e=window.navigator)!=null&&e.standalone)}function cM(){return WR()&&document.documentMode===10}function Hw(t=as()){return Ly(t)||zw(t)||Fw(t)||$w(t)||/windows phone/i.test(t)||Bw(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qw(t,e=[]){let n;switch(t){case"Browser":n=$1(as());break;case"Worker":n=`${$1(as())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Kl}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uM{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((r,l)=>{try{const c=e(i);r(c)}catch(c){l(c)}});s.onAbort=n,this.queue.push(s);const a=this.queue.length-1;return()=>{this.queue[a]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const a of n)try{a()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hM(t,e={}){return ec(t,"GET","/v2/passwordPolicy",em(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fM=6;class dM{constructor(e){var s;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??fM,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,a=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),a&&(n.meetsMaxPasswordLength=e.length<=a)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let a=0;a<e.length;a++)s=e.charAt(a),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,a,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=a)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mM{constructor(e,n,s,a){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=a,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new F1(this),this.idTokenSubscription=new F1(this),this.beforeStateQueue=new uM(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=kw,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=a.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=li(n)),this._initializationPromise=this.queue(async()=>{var s,a,i;if(!this._deleted&&(this.persistenceManager=await yl.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((a=this._popupRedirectResolver)!=null&&a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await od(this,{idToken:e}),s=await ya._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(ga(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!r||r===l)&&(c!=null&&c.user)&&(s=c.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(r){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Ie(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ld(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Q4()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ga(this.app))return Promise.reject(mr(this));const n=e?Pn(e):null;return n&&Ie(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Ie(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ga(this.app)?Promise.reject(mr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ga(this.app)?Promise.reject(mr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(li(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hM(this),n=new dM(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Yl("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await oM(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&li(e)||this._popupRedirectResolver;Ie(n,this,"argument-error"),this.redirectPersistenceManager=await yl.create(this,[li(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,a){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let r=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Ie(l,this,"internal-error"),l.then(()=>{r||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,a);return()=>{r=!0,c()}}else{const c=e.addObserver(n);return()=>{r=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Ie(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var a;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((a=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:a.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var n;if(ga(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&G4(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function tm(t){return Pn(t)}class F1{constructor(e){this.auth=e,this.observer=null,this.addObserver=a5(n=>this.observer=n)}get next(){return Ie(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Uy={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function pM(t){Uy=t}function gM(t){return Uy.loadJS(t)}function yM(){return Uy.gapiScript}function bM(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vM(t,e){const n=Bu(t,"auth");if(n.isInitialized()){const a=n.getImmediate(),i=n.getOptions();if(vr(i,e??{}))return a;wi(a,"already-initialized")}return n.initialize({options:e})}function xM(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(li);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function _M(t,e,n){const s=tm(t);Ie(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const a=!!(n!=null&&n.disableWarnings),i=Gw(e),{host:r,port:l}=TM(e),c=l===null?"":`:${l}`,h={url:`${i}//${r}${c}/`},d=Object.freeze({host:r,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:a})});if(!s._canInitEmulator){Ie(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),Ie(vr(h,s.config.emulator)&&vr(d,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=h,s.emulatorConfig=d,s.settings.appVerificationDisabledForTesting=!0,Uu(r)?F2(`${i}//${r}${c}`):a||EM()}function Gw(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function TM(t){const e=Gw(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",a=/^(\[[^\]]+\])(:|$)/.exec(s);if(a){const i=a[1];return{host:i,port:H1(s.substr(i.length+1))}}else{const[i,r]=s.split(":");return{host:i,port:H1(r)}}}function H1(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function EM(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return oi("not implemented")}_getIdTokenResponse(e){return oi("not implemented")}_linkToIdToken(e,n){return oi("not implemented")}_getReauthenticationResolver(e){return oi("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bl(t,e){return Dw(t,"POST","/v1/accounts:signInWithIdp",em(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wM="http://localhost";class yo extends Yw{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new yo(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):wi("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:a,...i}=n;if(!s||!a)return null;const r=new yo(s,a);return r.idToken=i.idToken||void 0,r.accessToken=i.accessToken||void 0,r.secret=i.secret,r.nonce=i.nonce,r.pendingToken=i.pendingToken||null,r}_getIdTokenResponse(e){const n=this.buildRequest();return bl(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,bl(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,bl(e,n)}buildRequest(){const e={requestUri:wM,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Lu(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku extends Kw{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi extends Ku{constructor(){super("facebook.com")}static credential(e){return yo._fromParams({providerId:Fi.PROVIDER_ID,signInMethod:Fi.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Fi.credentialFromTaggedObject(e)}static credentialFromError(e){return Fi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Fi.credential(e.oauthAccessToken)}catch{return null}}}Fi.FACEBOOK_SIGN_IN_METHOD="facebook.com";Fi.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi extends Ku{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return yo._fromParams({providerId:Hi.PROVIDER_ID,signInMethod:Hi.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Hi.credentialFromTaggedObject(e)}static credentialFromError(e){return Hi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Hi.credential(n,s)}catch{return null}}}Hi.GOOGLE_SIGN_IN_METHOD="google.com";Hi.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi extends Ku{constructor(){super("github.com")}static credential(e){return yo._fromParams({providerId:qi.PROVIDER_ID,signInMethod:qi.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qi.credentialFromTaggedObject(e)}static credentialFromError(e){return qi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qi.credential(e.oauthAccessToken)}catch{return null}}}qi.GITHUB_SIGN_IN_METHOD="github.com";qi.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi extends Ku{constructor(){super("twitter.com")}static credential(e,n){return yo._fromParams({providerId:Gi.PROVIDER_ID,signInMethod:Gi.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Gi.credentialFromTaggedObject(e)}static credentialFromError(e){return Gi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Gi.credential(n,s)}catch{return null}}}Gi.TWITTER_SIGN_IN_METHOD="twitter.com";Gi.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SM(t,e){return Dw(t,"POST","/v1/accounts:signUp",em(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,a=!1){const i=await ya._fromIdTokenResponse(e,s,a),r=q1(s);return new Nr({user:i,providerId:r,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const a=q1(s);return new Nr({user:e,providerId:a,_tokenResponse:s,operationType:n})}}function q1(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AM(t){var a;if(ga(t.app))return Promise.reject(mr(t));const e=tm(t);if(await e._initializationPromise,(a=e.currentUser)!=null&&a.isAnonymous)return new Nr({user:e.currentUser,providerId:null,operationType:"signIn"});const n=await SM(e,{returnSecureToken:!0}),s=await Nr._fromIdTokenResponse(e,"signIn",n,!0);return await e._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd extends Ni{constructor(e,n,s,a){super(n.code,n.message),this.operationType=s,this.user=a,Object.setPrototypeOf(this,cd.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,a){return new cd(e,n,s,a)}}function Qw(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?cd._fromErrorAndOperation(t,i,e,s):i})}async function NM(t,e,n=!1){const s=await Tu(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Nr._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RM(t,e,n=!1){const{auth:s}=t;if(ga(s.app))return Promise.reject(mr(s));const a="reauthenticate";try{const i=await Tu(t,Qw(s,a,e,t),n);Ie(i.idToken,s,"internal-error");const r=Vy(i.idToken);Ie(r,s,"internal-error");const{sub:l}=r;return Ie(t.uid===l,s,"user-mismatch"),Nr._forOperation(t,a,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&wi(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kM(t,e,n=!1){if(ga(t.app))return Promise.reject(mr(t));const s="signIn",a=await Qw(t,s,e),i=await Nr._fromIdTokenResponse(t,s,a);return n||await t._updateCurrentUser(i.user),i}function CM(t,e,n,s){return Pn(t).onIdTokenChanged(e,n,s)}function IM(t,e,n){return Pn(t).beforeAuthStateChanged(e,n)}function MM(t,e,n,s){return Pn(t).onAuthStateChanged(e,n,s)}const ud="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ud,"1"),this.storage.removeItem(ud),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DM=1e3,OM=10;class Ww extends Xw{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Hw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),a=this.localCache[n];s!==a&&e(n,a,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((r,l,c)=>{this.notifyListeners(r,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const a=()=>{const r=this.storage.getItem(s);!n&&this.localCache[s]===r||this.notifyListeners(s,r)},i=this.storage.getItem(s);cM()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(a,OM):a()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},DM)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ww.type="LOCAL";const jM=Ww;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw extends Xw{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Jw.type="SESSION";const Zw=Jw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PM(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(a=>a.isListeningto(e));if(n)return n;const s=new nm(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:a,data:i}=n.data,r=this.handlersMap[a];if(!(r!=null&&r.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:a});const l=Array.from(r).map(async h=>h(n.origin,i)),c=await PM(l);n.ports[0].postMessage({status:"done",eventId:s,eventType:a,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}nm.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function By(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VM{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const a=typeof MessageChannel<"u"?new MessageChannel:null;if(!a)throw new Error("connection_unavailable");let i,r;return new Promise((l,c)=>{const h=By("",20);a.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},s);r={messageChannel:a,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(r),a.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[a.port2])}).finally(()=>{r&&this.removeMessageHandler(r)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(){return window}function LM(t){$a().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eS(){return typeof $a().WorkerGlobalScope<"u"&&typeof $a().importScripts=="function"}async function UM(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function BM(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function zM(){return eS()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tS="firebaseLocalStorageDb",$M=1,hd="firebaseLocalStorage",nS="fbase_key";class Qu{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function sm(t,e){return t.transaction([hd],e?"readwrite":"readonly").objectStore(hd)}function FM(){const t=indexedDB.deleteDatabase(tS);return new Qu(t).toPromise()}function Pp(){const t=indexedDB.open(tS,$M);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(hd,{keyPath:nS})}catch(a){n(a)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(hd)?e(s):(s.close(),await FM(),e(await Pp()))})})}async function G1(t,e,n){const s=sm(t,!0).put({[nS]:e,value:n});return new Qu(s).toPromise()}async function HM(t,e){const n=sm(t,!1).get(e),s=await new Qu(n).toPromise();return s===void 0?null:s.value}function Y1(t,e){const n=sm(t,!0).delete(e);return new Qu(n).toPromise()}const qM=800,GM=3;class sS{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Pp(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>GM)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return eS()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=nm._getInstance(zM()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,s;if(this.activeServiceWorker=await UM(),!this.activeServiceWorker)return;this.sender=new VM(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||BM()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Pp();return await G1(e,ud,"1"),await Y1(e,ud),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>G1(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>HM(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Y1(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(a=>{const i=sm(a,!1).getAll();return new Qu(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:a,value:i}of e)s.add(a),JSON.stringify(this.localCache[a])!==JSON.stringify(i)&&(this.notifyListeners(a,i),n.push(a));for(const a of Object.keys(this.localCache))this.localCache[a]&&!s.has(a)&&(this.notifyListeners(a,null),n.push(a));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),qM)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}sS.type="LOCAL";const YM=sS;new Yu(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KM(t,e){return e?li(e):(Ie(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy extends Yw{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return bl(e,this._buildIdpRequest())}_linkToIdToken(e,n){return bl(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return bl(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function QM(t){return kM(t.auth,new zy(t),t.bypassAuthState)}function XM(t){const{auth:e,user:n}=t;return Ie(n,e,"internal-error"),RM(n,new zy(t),t.bypassAuthState)}async function WM(t){const{auth:e,user:n}=t;return Ie(n,e,"internal-error"),NM(n,new zy(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aS{constructor(e,n,s,a,i=!1){this.auth=e,this.resolver=s,this.user=a,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:a,tenantId:i,error:r,type:l}=e;if(r){this.reject(r);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:a||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return QM;case"linkViaPopup":case"linkViaRedirect":return WM;case"reauthViaPopup":case"reauthViaRedirect":return XM;default:wi(this.auth,"internal-error")}}resolve(e){Si(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Si(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JM=new Yu(2e3,1e4);class al extends aS{constructor(e,n,s,a,i){super(e,n,a,i),this.provider=s,this.authWindow=null,this.pollId=null,al.currentPopupAction&&al.currentPopupAction.cancel(),al.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Ie(e,this.auth,"internal-error"),e}async onExecution(){Si(this.filter.length===1,"Popup operations only handle one event");const e=By();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(za(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(za(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,al.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if((s=(n=this.authWindow)==null?void 0:n.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(za(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,JM.get())};e()}}al.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZM="pendingRedirect",cf=new Map;class e3 extends aS{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=cf.get(this.auth._key());if(!e){try{const s=await t3(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}cf.set(this.auth._key(),e)}return this.bypassAuthState||cf.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function t3(t,e){const n=a3(e),s=s3(t);if(!await s._isAvailable())return!1;const a=await s._get(n)==="true";return await s._remove(n),a}function n3(t,e){cf.set(t._key(),e)}function s3(t){return li(t._redirectPersistence)}function a3(t){return lf(ZM,t.config.apiKey,t.name)}async function i3(t,e,n=!1){if(ga(t.app))return Promise.reject(mr(t));const s=tm(t),a=KM(s,e),r=await new e3(s,a,n).execute();return r&&!n&&(delete r.user._redirectEventId,await s._persistUserIfCurrent(r.user),await s._setRedirectUser(null,e)),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r3=10*60*1e3;class o3{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!l3(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!iS(e)){const a=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";n.onError(za(this.auth,a))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=r3&&this.cachedEventUids.clear(),this.cachedEventUids.has(K1(e))}saveEventToCache(e){this.cachedEventUids.add(K1(e)),this.lastProcessedEventTime=Date.now()}}function K1(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function iS({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function l3(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return iS(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function c3(t,e={}){return ec(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u3=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,h3=/^https?/;async function f3(t){if(t.config.emulator)return;const{authorizedDomains:e}=await c3(t);for(const n of e)try{if(d3(n))return}catch{}wi(t,"unauthorized-domain")}function d3(t){const e=Op(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const r=new URL(t);return r.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&r.hostname===s}if(!h3.test(n))return!1;if(u3.test(t))return s===t;const a=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+a+"|"+a+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m3=new Yu(3e4,6e4);function Q1(){const t=$a().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function p3(t){return new Promise((e,n)=>{var a,i,r;function s(){Q1(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Q1(),n(za(t,"network-request-failed"))},timeout:m3.get()})}if((i=(a=$a().gapi)==null?void 0:a.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((r=$a().gapi)!=null&&r.load)s();else{const l=bM("iframefcb");return $a()[l]=()=>{gapi.load?s():n(za(t,"network-request-failed"))},gM(`${yM()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw uf=null,e})}let uf=null;function g3(t){return uf=uf||p3(t),uf}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y3=new Yu(5e3,15e3),b3="__/auth/iframe",v3="emulator/auth/iframe",x3={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},_3=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function T3(t){const e=t.config;Ie(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Py(e,v3):`https://${t.config.authDomain}/${b3}`,s={apiKey:e.apiKey,appName:t.name,v:Kl},a=_3.get(t.config.apiHost);a&&(s.eid=a);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Lu(s).slice(1)}`}async function E3(t){const e=await g3(t),n=$a().gapi;return Ie(n,t,"internal-error"),e.open({where:document.body,url:T3(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:x3,dontclear:!0},s=>new Promise(async(a,i)=>{await s.restyle({setHideOnLeave:!1});const r=za(t,"network-request-failed"),l=$a().setTimeout(()=>{i(r)},y3.get());function c(){$a().clearTimeout(l),a(s)}s.ping(c).then(c,()=>{i(r)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w3={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},S3=500,A3=600,N3="_blank",R3="http://localhost";class X1{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function k3(t,e,n,s=S3,a=A3){const i=Math.max((window.screen.availHeight-a)/2,0).toString(),r=Math.max((window.screen.availWidth-s)/2,0).toString();let l="";const c={...w3,width:s.toString(),height:a.toString(),top:i,left:r},h=as().toLowerCase();n&&(l=Uw(h)?N3:n),Vw(h)&&(e=e||R3,c.scrollbars="yes");const d=Object.entries(c).reduce((g,[y,C])=>`${g}${y}=${C},`,"");if(lM(h)&&l!=="_self")return C3(e||"",l),new X1(null);const p=window.open(e||"",l,d);Ie(p,t,"popup-blocked");try{p.focus()}catch{}return new X1(p)}function C3(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I3="__/auth/handler",M3="emulator/auth/handler",D3=encodeURIComponent("fac");async function W1(t,e,n,s,a,i){Ie(t.config.authDomain,t,"auth-domain-config-required"),Ie(t.config.apiKey,t,"invalid-api-key");const r={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Kl,eventId:a};if(e instanceof Kw){e.setDefaultLanguage(t.languageCode),r.providerId=e.providerId||"",s5(e.getCustomParameters())||(r.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries(i||{}))r[d]=p}if(e instanceof Ku){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(r.scopes=d.join(","))}t.tenantId&&(r.tid=t.tenantId);const l=r;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await t._getAppCheckToken(),h=c?`#${D3}=${encodeURIComponent(c)}`:"";return`${O3(t)}?${Lu(l).slice(1)}${h}`}function O3({config:t}){return t.emulator?Py(t,M3):`https://${t.authDomain}/${I3}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s0="webStorageSupport";class j3{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zw,this._completeRedirectFn=i3,this._overrideRedirectResult=n3}async _openPopup(e,n,s,a){var r;Si((r=this.eventManagers[e._key()])==null?void 0:r.manager,"_initialize() not called before _openPopup()");const i=await W1(e,n,s,Op(),a);return k3(e,i,By())}async _openRedirect(e,n,s,a){await this._originValidation(e);const i=await W1(e,n,s,Op(),a);return LM(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:a,promise:i}=this.eventManagers[n];return a?Promise.resolve(a):(Si(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await E3(e),s=new o3(e);return n.register("authEvent",a=>(Ie(a==null?void 0:a.authEvent,e,"invalid-auth-event"),{status:s.onEvent(a.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(s0,{type:s0},a=>{var r;const i=(r=a==null?void 0:a[0])==null?void 0:r[s0];i!==void 0&&n(!!i),wi(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=f3(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Hw()||Lw()||Ly()}}const P3=j3;var J1="@firebase/auth",Z1="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V3{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Ie(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L3(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function U3(t){xr(new xi("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),a=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:r,authDomain:l}=s.options;Ie(r&&!r.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:r,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qw(t)},h=new mM(s,a,i,c);return xM(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),xr(new xi("auth-internal",e=>{const n=tm(e.getProvider("auth").getImmediate());return(s=>new V3(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),fi(J1,Z1,L3(t)),fi(J1,Z1,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B3=5*60,z3=$2("authIdTokenMaxAge")||B3;let ex=null;const $3=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>z3)return;const a=n==null?void 0:n.token;ex!==a&&(ex=a,await fetch(t,{method:a?"POST":"DELETE",headers:a?{Authorization:`Bearer ${a}`}:{}}))};function F3(t=Jg()){const e=Bu(t,"auth");if(e.isInitialized())return e.getImmediate();const n=vM(t,{popupRedirectResolver:P3,persistence:[YM,jM,Zw]}),s=$2("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const r=$3(i.toString());IM(n,r,()=>r(n.currentUser)),CM(n,l=>r(l))}}const a=B2("auth");return a&&_M(n,`http://${a}`),n}function H3(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}pM({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=a=>{const i=za("internal-error");i.customData=a,n(i)},s.type="text/javascript",s.charset="UTF-8",H3().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});U3("Browser");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vp=new Map,rS={activated:!1,tokenObservers:[]},q3={initialized:!1,enabled:!1};function Rn(t){return Vp.get(t)||{...rS}}function G3(t,e){return Vp.set(t,e),Vp.get(t)}function am(){return q3}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oS="https://content-firebaseappcheck.googleapis.com/v1",Y3="exchangeRecaptchaV3Token",K3="exchangeDebugToken",tx={OFFSET_DURATION:5*60*1e3,RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},Q3=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X3{constructor(e,n,s,a,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=a,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=a,a>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new pu,this.pending.promise.catch(n=>{}),await W3(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new pu,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function W3(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J3={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},_s=new Yl("appCheck","AppCheck",J3);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nx(t=!1){var e;return t?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function $y(t){if(!Rn(t).activated)throw _s.create("use-before-activation",{appName:t.name})}function lS(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),a=Math.floor((e-n*3600*24-s*3600)/60),i=e-n*3600*24-s*3600-a*60;let r="";return n&&(r+=Oh(n)+"d:"),s&&(r+=Oh(s)+"h:"),r+=Oh(a)+"m:"+Oh(i)+"s",r}function Oh(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fy({url:t,body:e},n){const s={"Content-Type":"application/json"},a=n.getImmediate({optional:!0});if(a){const p=await a.getHeartbeatsHeader();p&&(s["X-Firebase-Client"]=p)}const i={method:"POST",body:JSON.stringify(e),headers:s};let r;try{r=await fetch(t,i)}catch(p){throw _s.create("fetch-network-error",{originalErrorMessage:p==null?void 0:p.message})}if(r.status!==200)throw _s.create("fetch-status-error",{httpStatus:r.status});let l;try{l=await r.json()}catch(p){throw _s.create("fetch-parse-error",{originalErrorMessage:p==null?void 0:p.message})}const c=l.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw _s.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${l.ttl}`});const h=Number(c[1])*1e3,d=Date.now();return{token:l.token,expireTimeMillis:d+h,issuedAtTimeMillis:d}}function Z3(t,e){const{projectId:n,appId:s,apiKey:a}=t.options;return{url:`${oS}/projects/${n}/apps/${s}:${Y3}?key=${a}`,body:{recaptcha_v3_token:e}}}function cS(t,e){const{projectId:n,appId:s,apiKey:a}=t.options;return{url:`${oS}/projects/${n}/apps/${s}:${K3}?key=${a}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eD="firebase-app-check-database",tD=1,Eu="firebase-app-check-store",uS="debug-token";let jh=null;function hS(){return jh||(jh=new Promise((t,e)=>{try{const n=indexedDB.open(eD,tD);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{var a;e(_s.create("storage-open",{originalErrorMessage:(a=s.target.error)==null?void 0:a.message}))},n.onupgradeneeded=s=>{const a=s.target.result;switch(s.oldVersion){case 0:a.createObjectStore(Eu,{keyPath:"compositeKey"})}}}catch(n){e(_s.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),jh)}function nD(t){return dS(mS(t))}function sD(t,e){return fS(mS(t),e)}function aD(t){return fS(uS,t)}function iD(){return dS(uS)}async function fS(t,e){const s=(await hS()).transaction(Eu,"readwrite"),i=s.objectStore(Eu).put({compositeKey:t,value:e});return new Promise((r,l)=>{i.onsuccess=c=>{r()},s.onerror=c=>{var h;l(_s.create("storage-set",{originalErrorMessage:(h=c.target.error)==null?void 0:h.message}))}})}async function dS(t){const n=(await hS()).transaction(Eu,"readonly"),a=n.objectStore(Eu).get(t);return new Promise((i,r)=>{a.onsuccess=l=>{const c=l.target.result;i(c?c.value:void 0)},n.onerror=l=>{var c;r(_s.create("storage-get",{originalErrorMessage:(c=l.target.error)==null?void 0:c.message}))}})}function mS(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=new Od("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rD(t){if(Xg()){let e;try{e=await nD(t)}catch(n){er.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function a0(t,e){return Xg()?sD(t,e).catch(n=>{er.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function oD(){let t;try{t=await iD()}catch{}if(t)return t;{const e=crypto.randomUUID();return aD(e).catch(n=>er.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hy(){return am().enabled}async function qy(){const t=am();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function lD(){const t=U2(),e=am();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new pu;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(oD())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cD={error:"UNKNOWN_ERROR"};function uD(t){return Qg.encodeString(JSON.stringify(t),!1)}async function Lp(t,e=!1,n=!1){const s=t.app;$y(s);const a=Rn(s);let i=a.token,r;if(i&&!il(i)&&(a.token=void 0,i=void 0),!i){const h=await a.cachedTokenPromise;h&&(il(h)?i=h:await a0(s,void 0))}if(!e&&i&&il(i))return{token:i.token};let l=!1;if(Hy())try{const h=await qy();a.exchangeTokenPromise||(a.exchangeTokenPromise=Fy(cS(s,h),t.heartbeatServiceProvider).finally(()=>{a.exchangeTokenPromise=void 0}),l=!0);const d=await a.exchangeTokenPromise;return await a0(s,d),a.token=d,{token:d.token}}catch(h){return h.code==="appCheck/throttled"||h.code==="appCheck/initial-throttle"?er.warn(h.message):n&&er.error(h),i0(h)}try{a.exchangeTokenPromise||(a.exchangeTokenPromise=a.provider.getToken().finally(()=>{a.exchangeTokenPromise=void 0}),l=!0),i=await Rn(s).exchangeTokenPromise}catch(h){h.code==="appCheck/throttled"||h.code==="appCheck/initial-throttle"?er.warn(h.message):n&&er.error(h),r=h}let c;return i?r?il(i)?c={token:i.token,internalError:r}:c=i0(r):(c={token:i.token},a.token=i,await a0(s,i)):c=i0(r),l&&yS(s,c),c}async function hD(t){const e=t.app;$y(e);const{provider:n}=Rn(e);if(Hy()){const s=await qy(),{token:a}=await Fy(cS(e,s),t.heartbeatServiceProvider);return{token:a}}else{const{token:s}=await n.getToken();return{token:s}}}function pS(t,e,n,s){const{app:a}=t,i=Rn(a),r={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,r],i.token&&il(i.token)){const l=i.token;Promise.resolve().then(()=>{n({token:l.token}),sx(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>sx(t))}function gS(t,e){const n=Rn(t),s=n.tokenObservers.filter(a=>a.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function sx(t){const{app:e}=t,n=Rn(e);let s=n.tokenRefresher;s||(s=fD(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function fD(t){const{app:e}=t;return new X3(async()=>{const n=Rn(e);let s;if(n.token?s=await Lp(t,!0):s=await Lp(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=Rn(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const a=n.token.expireTimeMillis-5*60*1e3;return s=Math.min(s,a),Math.max(0,s-Date.now())}else return 0},tx.RETRIAL_MIN_WAIT,tx.RETRIAL_MAX_WAIT)}function yS(t,e){const n=Rn(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function il(t){return t.expireTimeMillis-Date.now()>0}function i0(t){return{token:uD(cD),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dD{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=Rn(this.app);for(const n of e)gS(this.app,n.next);return Promise.resolve()}}function mD(t,e){return new dD(t,e)}function pD(t){return{getToken:e=>Lp(t,e),getLimitedUseToken:()=>hD(t),addTokenListener:e=>pS(t,"INTERNAL",e),removeTokenListener:e=>gS(t.app,e)}}const gD="@firebase/app-check",yD="0.11.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bD="https://www.google.com/recaptcha/api.js";function vD(t,e){const n=new pu,s=Rn(t);s.reCAPTCHAState={initialized:n};const a=xD(t),i=nx(!1);return i?ax(t,e,i,a,n):ED(()=>{const r=nx(!1);if(!r)throw new Error("no recaptcha");ax(t,e,r,a,n)}),n.promise}function ax(t,e,n,s,a){n.ready(()=>{TD(t,e,n,s),a.resolve(n)})}function xD(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function _D(t){$y(t);const n=await Rn(t).reCAPTCHAState.initialized.promise;return new Promise((s,a)=>{const i=Rn(t).reCAPTCHAState;n.ready(()=>{s(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function TD(t,e,n,s){const a=n.render(s,{sitekey:e,size:"invisible",callback:()=>{Rn(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Rn(t).reCAPTCHAState.succeeded=!1}}),i=Rn(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:a}}function ED(t){const e=document.createElement("script");e.src=bD,e.onload=t,document.head.appendChild(e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var s,a,i;SD(this._throttleData);const e=await _D(this._app).catch(r=>{throw _s.create("recaptcha-error")});if(!((s=Rn(this._app).reCAPTCHAState)!=null&&s.succeeded))throw _s.create("recaptcha-error");let n;try{n=await Fy(Z3(this._app,e),this._heartbeatServiceProvider)}catch(r){throw(a=r.code)!=null&&a.includes("fetch-status-error")?(this._throttleData=wD(Number((i=r.customData)==null?void 0:i.httpStatus),this._throttleData),_s.create("initial-throttle",{time:lS(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):r}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Bu(e,"heartbeat"),vD(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Gy?this._siteKey===e._siteKey:!1}}function wD(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+Q3,httpStatus:t};{const n=e?e.backoffCount:0,s=h5(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function SD(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw _s.create("throttled",{time:lS(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AD(t=Jg(),e){t=Pn(t);const n=Bu(t,"app-check");if(am().initialized||lD(),Hy()&&qy().then(a=>console.log(`App Check debug token: ${a}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const a=n.getImmediate(),i=n.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return a;throw _s.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return ND(t,e.provider,e.isTokenAutoRefreshEnabled),Rn(t).isTokenAutoRefreshEnabled&&pS(s,"INTERNAL",()=>{}),s}function ND(t,e,n=!1){const s=G3(t,{...rS});s.activated=!0,s.provider=e,s.cachedTokenPromise=rD(t).then(a=>(a&&il(a)&&(s.token=a,yS(t,{token:a.token})),a)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&er.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}const RD="app-check",ix="app-check-internal";function kD(){xr(new xi(RD,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return mD(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(ix).initialize()})),xr(new xi(ix,t=>{const e=t.getProvider("app-check").getImmediate();return pD(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),fi(gD,yD)}kD();const CD={apiKey:"AIzaSyAWUXxzuVCzJXlpz7NfRtVSgF9HvylLQX0",authDomain:"rrmgame-7df52.firebaseapp.com",projectId:"rrmgame-7df52",storageBucket:"rrmgame-7df52.firebasestorage.app",messagingSenderId:"975432671213",appId:"1:975432671213:web:7495a65b68a80559f811e4",measurementId:"G-JNBJM2HTP5"},Yy=G2(CD),Wr=N4(Yy),rx=F3(Yy),ox="6LesZd0sAAAAAHe8Xy29W_Dsu8TS9_WbcBhJILOi";typeof window<"u"&&ox&&AD(Yy,{provider:new Gy(ox),isTokenAutoRefreshEnabled:!0});/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ID=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),MD=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,s)=>s?s.toUpperCase():n.toLowerCase()),lx=t=>{const e=MD(t);return e.charAt(0).toUpperCase()+e.slice(1)},bS=(...t)=>t.filter((e,n,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===n).join(" ").trim(),DD=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var OD={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jD=N.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:s,className:a="",children:i,iconNode:r,...l},c)=>N.createElement("svg",{ref:c,...OD,width:e,height:e,stroke:t,strokeWidth:s?Number(n)*24/Number(e):n,className:bS("lucide",a),...!i&&!DD(l)&&{"aria-hidden":"true"},...l},[...r.map(([h,d])=>N.createElement(h,d)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qn=(t,e)=>{const n=N.forwardRef(({className:s,...a},i)=>N.createElement(jD,{ref:i,iconNode:e,className:bS(`lucide-${ID(lx(t))}`,`lucide-${t}`,s),...a}));return n.displayName=lx(t),n};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PD=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],VD=Qn("arrow-right",PD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LD=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],UD=Qn("briefcase",LD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BD=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Up=Qn("chevron-right",BD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zD=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],wu=Qn("coins",zD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $D=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M16 8h.01",key:"cr5u4v"}],["path",{d:"M8 8h.01",key:"1e4136"}],["path",{d:"M8 16h.01",key:"18s6g9"}],["path",{d:"M16 16h.01",key:"1f9h7w"}],["path",{d:"M12 12h.01",key:"1mp3jc"}]],Xu=Qn("dice-5",$D);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FD=[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]],HD=Qn("flame",FD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qD=[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",key:"geh8rc"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"1fto5m"}],["path",{d:"m2 16 6 6",key:"1pfhp9"}],["circle",{cx:"16",cy:"9",r:"2.9",key:"1n0dlu"}],["circle",{cx:"6",cy:"5",r:"3",key:"151irh"}]],GD=Qn("hand-coins",qD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YD=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Yi=Qn("loader-circle",YD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KD=[["path",{d:"m12.5 17-.5-1-.5 1h1z",key:"3me087"}],["path",{d:"M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",key:"1o5pge"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}]],QD=Qn("skull",KD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XD=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],WD=Qn("trending-down",XD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JD=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],ZD=Qn("trending-up",JD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eO=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],tO=Qn("trophy",eO);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nO=[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]],sO=Qn("tv",nO);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aO=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],iO=Qn("users",aO);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rO=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],oO=Qn("volume-2",rO);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lO=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],cO=Qn("volume-x",lO);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uO=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],vS=Qn("x",uO),cx=["ゲーマー","配信者","ギャンブラー","リリム","社畜","無職","お祈り中","底辺","億り人","錬金術師"],Ft=50,qe=Object.freeze({NEUTRAL:"NEUTRAL",MOVE_FORWARD:"MOVE_FORWARD",MOVE_BACKWARD:"MOVE_BACKWARD",GAIN_MONEY:"GAIN_MONEY",LOSE_MONEY:"LOSE_MONEY",INCREASE_PON:"INCREASE_PON",DEBT_TRAP:"DEBT_TRAP"}),Ma=7,Bp=8,Vl=1500,hO=2600,fO=280,dO=Vl+fO,mO=Vl+hO,pO=15,fd=100,gO=[100,300,500,1e3],P={startingMoney:600,pon:{startMin:10,startMax:20,dailyGain:5,fireThreshold:30,deathThreshold:80,deathChance:.5,stream:{moneyMin:300,moneyMax:800,skillLoss:20},work:{penaltyMin:200,penaltyMax:500}},stream:{baseFailRate:.6,combinedStatNoFailThreshold:150,successMin:400,successMax:1800,chat:{virtueGainMin:5,virtueGainMax:15},game:{skillGainMin:15,skillGainMax:35}},work:{reward:1300,skillGain:0,virtueGain:3},living:{dailyCost:500},rimiru:{interestPercent:10,dailyGracesBefore:2,day8TurnsBefore:3},dice:{maxTurns:pO,slotsPerSugorokuTurn:3,shopCost:150,helpChance:.3,helpVirtueMin:22,helpVirtueMax:38,taxiChance:.25,taxiMenuAlwaysVisible:!0,taxiCost:450,taxiMoveMin:12,taxiMoveMax:18,taxiBaseTurns:1,taxiCongestThresh:70,taxiCongestChance:.3,taxiCongestPon:10,virtueWaveThresh:100,virtueWavePonDelta:-5,splashRadius:3},slot:{skillBaseline:50,skillBlockSize:10,skillMissReducePerBlock:.015,skillToMid:.3,skillToAtari:.35,skillToSmall:.35,luckBaseline:50,luckRefSpan:50,luckAtariDrainAtLuck100:.02,luckSmallDrainAtLuck100:.03,luckToJp:.3,luckToBig:.7,heatTransferPerSpin:.01,heatWeightJp:1/15,heatWeightBig:3/15,heatWeightMid:5/15,heatWeightAtari:6/15,nearMissReachChance:.12,slipSymbolChance:.1},shrine:{cost:300,luckGain:20,virtueGain:2,ponReduce:10,amuletBaseRate:.2},sugorokuTiles:{neutralRatio:.2,goodRatio:.35,badRatio:.35,debtTrapRatio:.1,moveForwardMin:1,moveForwardMax:3,moveBackwardMin:1,moveBackwardMax:2,gainMoneyMin:200,gainMoneyMax:500,loseMoneyMin:100,loseMoneyMax:300,ponIncreaseMin:10,ponIncreaseMax:25,maxChainSteps:8},dailySlot:{spinBet:300,spins:2,skillGainEverySpin:10,skillGainOnRole:10}},Ia={standard:{key:"standard",label:"スタンダード",emoji:"🎰",desc:"バランス型。まずはここから。",color:"text-amber-300",border:"border-amber-500/50 bg-amber-500/10",symbols:["7","BAR","🍒","⭐","🔔","💎"],baseRates:{jp:.005,big:.02,mid:.05,atari:.08,small:.195},basePayout:{miss:0,small:80,atari:150,mid:300,big:1e3,jackpot:3e3}}},Zt={salaryman:{key:"salaryman",label:"ギャンブラーサラリーマン",emoji:"💼",desc:"技量+20でスタート。仕事の報酬+200G。配信報酬は0.8倍だが安定感がある。",color:"text-sky-300",border:"border-sky-500/60 bg-sky-500/10",skillBonus:20,workRewardBonus:200,streamMultiplier:.8,ponMultiplier:1,dailyLivingCost:500},student:{key:"student",label:"ギャンブル初心者な大学生",emoji:"🎓",desc:"運+20・技量-10。ビギナーズラックでスロットが有利。生活費は低めで初期資金も多い。仕事収入は0.65倍と控えめだが、PON発火時の資金ペナルティは軽め。配信は通常どおり。",color:"text-emerald-300",border:"border-emerald-500/55 bg-emerald-500/10",luckBonus:20,skillBonus:-10,streamMultiplier:1,ponMultiplier:1,workRewardMultiplier:.65,ponFireMoneyPenaltyMultiplier:.5,dailyLivingCost:300,startingMoney:800},vtuber:{key:"vtuber",label:"リリム",emoji:"🎭",desc:"技量-10・運+10・生活費300Gでスタート。PON上昇1.2倍。失言がバズるたびに配信報酬倍率が+0.5される。",color:"text-violet-300",border:"border-violet-500/60 bg-violet-500/10",skillBonus:-10,luckBonus:10,streamMultiplier:1,ponMultiplier:1.2,dailyLivingCost:300}},xS="闇月リリム",Xc="vtuber";function Wc(t){return typeof t=="string"&&t.trim()===xS}const yO=[{key:"luck",label:"運",color:"text-amber-400"},{key:"skill",label:"技量",color:"text-sky-400"},{key:"pon",label:"PON",color:"text-fuchsia-400"},{key:"virtue",label:"善行",color:"text-emerald-400"},{key:"livingCost",label:"生活費",color:"text-orange-300"},{key:"money",label:"資金",color:"text-yellow-300"}],ux=["/images/icon_rrm.png","/images/icon_rrm.webp","/images/icon_rrm.jpg","/images/icon_rrm.jpeg"],bO=["/images/icon_gambling_salaryman.png","/images/icon_gambling_salaryman.webp","/images/icon_gambling_salaryman.jpg","/images/icon_gambling_salaryman.jpeg"],vO=["/images/gambling_salaryman_noback.png","/images/gambling_salaryman_noback.webp","/images/gambling_salaryman_noback.jpg","/images/gambling_salaryman_noback.jpeg"],xO=["/images/icon_beginner_university_student.png","/images/icon_beginner_university_student.webp","/images/icon_beginner_university_student.jpg","/images/icon_beginner_university_student.jpeg"],_O=["/images/beginner_university_student_noback.png","/images/beginner_university_student_noback.webp","/images/beginner_university_student_noback.jpg","/images/beginner_university_student_noback.jpeg"],hx={normal:["/images/rrm_noback.png"],fallen:["/images/fell_down_rrm.png","/images/fell_down_rrm.webp"],stumble:["/images/stumble_rrm.png","/images/stumble_rrm.webp"],fell_down:["/images/fell_down_rrm.png","/images/fell_down_rrm.webp"]},TO={salaryman:bO,student:xO,vtuber:ux,ririm:ux},fx={salaryman:{normal:vO,fallen:[],stumble:["/images/stumble_gambling_salaryman.png","/images/stumble_gambling_salaryman.webp"],fell_down:["/images/fell_down_gambling_salaryman.png","/images/fell_down_gambling_salaryman.webp"]},student:{normal:_O,fallen:[],stumble:["/images/stumble_beginner_university_student.png","/images/stumble_beginner_university_student.webp"],fell_down:["/images/fell_down_beginner_university_student.png","/images/fell_down_beginner_university_student.webp"]},vtuber:hx,ririm:hx},dx=["/images/city_seamless.png","/images/city_seamless.webp"],mx={pc:dx,sp:dx},zp="/images/taxi.png",EO={taxi_congestion:["/images/traffic_jam.png","/images/traffic_jam.webp","/images/traffic_jam.jpg","/images/traffic_jam.jpeg"],taxi_ride_clear:[zp]};function wO(t){const e=TO[t];return Array.isArray(e)?e:[]}function _S(t,e="normal"){const n=fx[t]??fx.salaryman,s=Array.isArray(n.normal)?n.normal:[],a=Array.isArray(n.fallen)?n.fallen:[];return e==="normal"?[...s]:e==="fallen"?[...a,...s]:e==="stumble"?[...Array.isArray(n.stumble)?n.stumble:[],...s]:e==="fell_down"?[...Array.isArray(n.fell_down)?n.fell_down:[],...a,...s]:[...s]}function Us(t){if(t==null||typeof t!="string")return t;const e=t.trim();if(/^https?:\/\//i.test(e)||e.startsWith("data:")||e.startsWith("blob:")||!e.startsWith("/images/"))return e;const n="/".replace(/\/?$/,"/");let s=e.replace(/^\//,"");return s=s.replace(/(\.)([^./\\]+)$/,(a,i,r)=>i+r.toLowerCase()),`${n}${s}`}function Ll({characterType:t,imgClassName:e="",spanClassName:n="",imgStyle:s,spanStyle:a}){const i=Zt[t]??Zt.salaryman,r=wO(t),[l,c]=N.useState(0);return N.useEffect(()=>{c(0)},[t]),!r.length||l>=r.length?u.jsx("span",{className:n,style:a,children:i.emoji??"🙂"}):u.jsx("img",{src:Us(r[l]),alt:"",draggable:!1,className:`select-none ${e}`,style:s,onError:()=>c(h=>h+1)})}function hf({characterType:t,pose:e="normal",imgClassName:n="",spanClassName:s="",imgStyle:a,spanStyle:i}){const r=Zt[t]??Zt.salaryman,l=_S(t,e),[c,h]=N.useState(0);return N.useEffect(()=>{h(0)},[t,e]),!l.length||c>=l.length?u.jsx("span",{className:s,style:i,children:r.emoji??"🙂"}):u.jsx("img",{src:Us(l[c]),alt:"",draggable:!1,className:`select-none ${n}`,style:a,onError:()=>h(d=>d+1)})}function Su({imgClassName:t="",imgStyle:e,emojiFallback:n="🚕"}){const[s,a]=N.useState(!1),i={}.VITE_TAXI_SRC_RAW==="1",r=i?zp:Us(zp);N.useEffect(()=>{a(!1)},[i]);const l={minWidth:48,minHeight:48,objectFit:"contain",boxSizing:"border-box",opacity:1,filter:"brightness(1)",...e};return s?u.jsx("span",{className:`inline-flex min-h-[48px] min-w-[48px] select-none items-center justify-center opacity-100 brightness-100 ${t}`,style:e,title:"taxi image failed — check Network tab for 404 URL",children:n}):u.jsx("img",{src:r,alt:"",draggable:!1,className:`select-none opacity-100 brightness-100 ${t}`,style:l,onError:()=>{a(!0)}})}function TS(t){if(t==null||t==="")return NaN;if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="object"){if(typeof t.toMillis=="function")return t.toMillis();const n=t.seconds??t._seconds;if(typeof n=="number")return n*1e3+Math.floor((t.nanoseconds??t._nanoseconds??0)/1e6)}const e=Number(t);return Number.isFinite(e)?e:NaN}const Tt=(t,e=0,n=999999)=>Math.max(e,Math.min(n,t)),gn=t=>Math.round(Math.max(-999999999,Math.min(999999999,t))),Ue=(t,e)=>Math.floor(Math.random()*(e-t+1))+t,ks=(t,e=[])=>[...t.slice().reverse(),...e].slice(0,30),r0=()=>{const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return Array.from({length:6},()=>t[Ue(0,t.length-1)]).join("")},vc=()=>cx[Math.floor(Math.random()*cx.length)]+Math.floor(10+Math.random()*89);function ES(t){return(Zt[t]??Zt.salaryman).dailyLivingCost??P.living.dailyCost}function kc(t){var n;const e=(n=t==null?void 0:t.stats)==null?void 0:n.livingCost;return typeof e=="number"&&Number.isFinite(e)&&e>=0?e:ES(t==null?void 0:t.characterType)}function $p(t){const e=Zt[t]??Zt.salaryman,n=e.luckBonus??0,s=e.skillBonus??0,a=e.virtueBonus??0,i=e.ponBonus??0,r=(e.dailyLivingCost??P.living.dailyCost)-300;return{luck:{min:n,max:10+n},skill:{min:30+s,max:55+s},virtue:{min:30+a,max:70+a},pon:{min:i,max:50+i},livingCost:{min:200+r,max:450+r}}}const SO=[10,18,26,34,42,50];function ff(){return{luck:Math.floor(Math.random()*6),skill:Math.floor(Math.random()*6),virtue:Math.floor(Math.random()*6),pon:Math.floor(Math.random()*6)}}function wS(t){return Math.floor((t.luck+t.skill+t.virtue)/3)}function Ky(t,e){const n=Zt[e]??Zt.salaryman,s=t.luck,a=t.skill,i=t.virtue,r=t.pon,l=s*2,c=30+a*5,h=20+SO[i],d=r*10,g=200+wS(t)*50,y=Tt(l+(n.luckBonus??0),0,999999),C=Tt(c+(n.skillBonus??0),0,2e3),I=Tt(h+(n.virtueBonus??0),0,999999),O=Tt(d+(n.ponBonus??0),0,999999),_=Math.max(50,g+((n.dailyLivingCost??P.living.dailyCost)-300));return{luck:y,skill:C,virtue:I,pon:O,livingCost:_}}function AO(t){return Ky(ff(),t??"salaryman")}function mi(t){if(!t||typeof t!="object")return null;const e=r=>{const l=Number(r);if(!Number.isFinite(l))return null;const c=Math.round(l);return c<0||c>5?null:c},n=e(t.luck),s=e(t.skill),a=e(t.virtue),i=e(t.pon);return n==null||s==null||a==null||i==null?null:{luck:n,skill:s,virtue:a,pon:i}}function NO(t){if(!t||typeof t!="object")return null;const e=Number(t.luck),n=Number(t.skill),s=Number(t.virtue),a=Number(t.pon),i=Number(t.livingCost);return[e,n,s,a,i].every(r=>Number.isFinite(r))?{luck:e,skill:n,virtue:s,pon:a,livingCost:i}:null}function SS(t){return t>=100?4:t>=70?3:t>=50?2:1}function RO(t){const e=SS(t.virtue),n=t.luck>=80,s=Ue(e,6);if(n){const a=Ue(e,6);return{value:s+a,rolls:[s,a],advantage:!0}}return{value:s,rolls:[s],advantage:!1}}const o0={jp:.02,big:.03,small:.03};function AS(t,e,n=0,s=null){const{baseRates:a}=e,i=P.slot;let r=a.jp,l=a.big,c=a.mid,h=a.atari,d=a.small,p=1-(r+l+c+h+d);const g=Math.max(0,t.skill-i.skillBaseline),y=g>=i.skillBlockSize?Math.floor(g/i.skillBlockSize):0,I=Math.max(0,t.luck-i.luckBaseline)/i.luckRefSpan;let O=0;const _=y*i.skillMissReducePerBlock;_>0&&p>0&&(O=Math.min(_,p),p-=O,c+=O*i.skillToMid,h+=O*i.skillToAtari,d+=O*i.skillToSmall);let v=0,S=0,L=0;if(I>0){const x=i.luckAtariDrainAtLuck100*I,E=i.luckSmallDrainAtLuck100*I;S=Math.min(x,h),L=Math.min(E,d),v=S+L,v>0&&(h-=S,d-=L,r+=v*i.luckToJp,l+=v*i.luckToBig)}let j=0;const H=n*i.heatTransferPerSpin;H>0&&p>0&&(j=Math.min(H,p),p-=j,r+=j*i.heatWeightJp,l+=j*i.heatWeightBig,c+=j*i.heatWeightMid,h+=j*i.heatWeightAtari);const T=r+l+c+h+d;if(p=Math.max(0,1-T),s==="student"){r+=o0.jp,l+=o0.big,d+=o0.small;const x=r+l+c+h+d;p=Math.max(0,1-x)}return{jp:r,big:l,mid:c,atari:h,small:d,miss:p,skillMissReduced:O,luckConverted:v,luckDrainAtari:S,luckDrainSmall:L,heatMissReduced:j,heat:n}}function kO(t){const e=Number(t)||0;return Math.max(10,15-Math.floor(e/20))}function Jc(t){return 1+(Number(t)||0)*.2/100}function l0(t,e){return Math.round(Number(t)*Jc(e))}function CO(t,e){const n=Number(e);return n>0?Math.min(1,n*(1+(Number(t)||0)/100)):0}function IO(t,e){const n=t.jp+t.big+t.mid+t.atari+t.small;if(!(n>0))return"small";let s=e*n;return s<t.jp?"jackpot":(s-=t.jp,s<t.big?"big":(s-=t.big,s<t.mid?"mid":(s-=t.mid,s<t.atari?"atari":"small")))}function MO(t,e){const{machine:n,bp:s,sym:a,r:i,bet:r,machineKey:l,pay:c,pityCounterAfter:h,pityForced:d,maxPity:p}=e,g={r:i,bet:r,machineKey:l,pityCounterAfter:h,pityForced:d,maxPity:p};switch(t){case"miss":return{tier:"miss",payout:0,message:"ハズレ…",reels:DO(n),...g};case"jackpot":return{tier:"jackpot",payout:c(s.jackpot),message:"🎰 777 JACKPOT!! 超大当たり！",reels:[a[0],a[0],a[0]],...g};case"big":return{tier:"big",payout:c(s.big),message:"💎 大当たり！！",reels:["💎","💎","💎"],...g};case"mid":return{tier:"mid",payout:c(s.mid),message:"⭐ 中当たり！",reels:["⭐","⭐","⭐"],...g};case"atari":return{tier:"atari",payout:c(s.atari),message:"🔔 当たり！",reels:["🔔","🔔","🔔"],...g};default:return{tier:"small",payout:c(s.small),message:"🍒 小当たり",reels:["🍒","🍒","🍒"],...g}}}function DO(t){const e=(t==null?void 0:t.symbols)??[];if(!e.length)return["?","?","?"];if(e.length===1)return[e[0],e[0],e[0]];for(let r=0;r<64;r++){const l=e[Ue(0,e.length-1)],c=e[Ue(0,e.length-1)],h=e[Ue(0,e.length-1)];if(!(l===c&&c===h))return[l,c,h]}const n=e[Ue(0,e.length-1)],s=e.filter(r=>r!==n),a=s[Ue(0,s.length-1)],i=e[Ue(0,e.length-1)];return[n,i,a]}function NS(t,e=fd,n="standard",s=0,a=null,i=null){const r=Ia[n]??Ia.standard,{basePayout:l,symbols:c}=r,h=AS(t,r,s,a),d=(i==null?void 0:i.pityCounter)??0,p=kO(t==null?void 0:t.virtue),g=d>=p;let y=h;if(g&&h.miss>0){const v=h.jp+h.big+h.mid+h.atari+h.small;if(v>0){const S=h.miss;y={...h,miss:0,jp:h.jp+S*(h.jp/v),big:h.big+S*(h.big/v),mid:h.mid+S*(h.mid/v),atari:h.atari+S*(h.atari/v),small:h.small+S*(h.small/v)}}else y={...h,miss:0,small:1}}const C=e/fd,I=v=>Math.round(v*C);let O;if(g)O=IO(y,Math.random());else{const v=Math.random();let S=y.miss;v<S?O="miss":(S+=y.jp,v<S?O="jackpot":(S+=y.big,v<S?O="big":(S+=y.mid,v<S?O="mid":(S+=y.atari,O=v<S?"atari":"small"))))}const _=g?0:d+1;return MO(O,{machine:r,bp:l,sym:c,r:y,bet:e,machineKey:n,pay:I,pityCounterAfter:_,pityForced:g,maxPity:p})}function OO(t,e){if(!Array.isArray(t)||t.length!==3)return{reachPossible:!1};const n=t[0],s=t[1],a=t[2];return n!==s?{reachPossible:!1}:{reachPossible:["jackpot","big","mid"].includes(e)||e==="miss"&&n!==a}}function jO(){return Math.random()<.5}function Fp(t,e,n){const s=e.symbols;if(!s.length)return[t,t,t];let a=s.indexOf(t);a<0&&(a=0);const i=s.length,r=s[(a-1+i)%i],l=s[(a+1)%i],c=s[(a-2+i)%i],h=s[(a+2)%i],d=s[a],p=(n%3+3)%3;return p===0?[r,d,l]:p===1?[l,d,r]:[c,d,h]}function RS(t){const e=t.symbols;return[e[Ue(0,e.length-1)],e[Ue(0,e.length-1)],e[Ue(0,e.length-1)]]}function kS(t,e){const n=e.symbols.filter(s=>s!==t);return n.length?n[Ue(0,n.length-1)]:t}function PO(t,e,n,s=null){const a=Zt[n]??Zt.salaryman,i=gn(a.startingMoney??P.startingMoney);return s&&typeof s=="object"?{id:e,name:t,characterType:n,streamMultiplier:a.streamMultiplier,stats:{luck:Tt(s.luck,0,999999),skill:Tt(s.skill,0,2e3),pon:Tt(s.pon,0,999999),virtue:Tt(s.virtue,0,999999),livingCost:Math.max(50,Math.floor(Number(s.livingCost)||0)),money:i},position:0,moveTurns:0,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0,spinCount:0,slotNet:0,lastMoveEvent:"",lastSpinResult:null,alive:!0,skipTurns:0,amulets:0,slotHeat:0,slotPityCounter:0,debtStreakDaily:0,debtStreakDay8:0,pendingTaxiSteps:0}:{id:e,name:t,characterType:n,streamMultiplier:a.streamMultiplier,stats:{luck:Tt(0+(a.luckBonus??0),0,999999),skill:Tt(50+a.skillBonus,0,2e3),pon:Ue(P.pon.startMin,P.pon.startMax),virtue:50,livingCost:ES(n),money:i},position:0,moveTurns:0,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0,spinCount:0,slotNet:0,lastMoveEvent:"",lastSpinResult:null,alive:!0,skipTurns:0,amulets:0,slotHeat:0,slotPityCounter:0,debtStreakDaily:0,debtStreakDay8:0,pendingTaxiSteps:0}}function px(t,e){var r;const n=((r=t.stats)==null?void 0:r.money)??0;if(n>=0)return{...t,debtStreakDaily:0};let s=(t.debtStreakDaily??0)+1;const a=P.rimiru.dailyGracesBefore;let i=n;if(s>=a){const l=i,c=1+P.rimiru.interestPercent/100;i=Math.floor(l*c),s=0;const h=Math.round(Math.abs(l)*(P.rimiru.interestPercent/100));e.push(`🩸 闇金リリムからの督促：（連続赤字が${a}ターン）高利子+${P.rimiru.interestPercent}%——${l}G → ${i}G（増額+${h}G）`)}return{...t,stats:{...t.stats,money:gn(i)},debtStreakDaily:s}}function VO(t,e,n){return e.map((s,a)=>{var h;if(a!==t)return s;const i=((h=s.stats)==null?void 0:h.money)??0;if(i>=0)return{...s,debtStreakDay8:0};let r=(s.debtStreakDay8??0)+1;const l=P.rimiru.day8TurnsBefore;let c=i;if(r>=l){const d=c,p=1+P.rimiru.interestPercent/100;c=Math.floor(d*p),r=0;const g=Math.round(Math.abs(d)*(P.rimiru.interestPercent/100));n.push(`🩸 闇金リリム：『それが増えるんで』連続赤字${l}回の手終わりや—— ${s.name}の借金 ${d}G → ${c}G (+${g}G / +${P.rimiru.interestPercent}%)`)}return{...s,stats:{...s.stats,money:gn(c)},debtStreakDay8:r}})}function gx(t){return t.alive?t.movePhase==="moving"||t.movePhase==="goalLanding"?!1:t.movePhase==="waitingSlot"?(t.reservedSlotTurns??0)<=0:t.movePhase==="missed"?!0:t.movePhase==="arrived"?t.slotTurnsLeft<=0:!0:!0}function Zc(t){return t>=3e4?"SS":t>=15e3?"S":t>=8e3?"A":t>=4e3?"B":"C"}function CS(t,e){const n=e??t.players,s=[...n.filter(i=>i.alive).map(i=>`${i.name}: 最終資金 ${i.stats.money}G / ランク ${Zc(i.stats.money)}`),"━━━ 8日目終了！全員完了 ━━━","━━━ 最終結果 ───"],a={...t,players:n,gamePhase:"results",subPhase:"daily",log:ks(s,t.log)};return delete a.finalBattleStartedAt,delete a.finalBattleEntry,a}function LO(t){const e=t.slice();for(let n=e.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1)),a=e[n];e[n]=e[s],e[s]=a}return e}function UO(){const t=P.sugorokuTiles,e=Array.from({length:Ft+1},()=>({kind:qe.NEUTRAL})),n=Ft-1,s=t.neutralRatio,a=t.goodRatio,i=t.badRatio,r=t.debtTrapRatio;let l=Math.round(n*s),c=Math.round(n*a),h=Math.round(n*i),d=Math.round(n*r),p=l+c+h+d;for(;p>n;)h>0?h-=1:c>0?c-=1:d>0?d-=1:l>0&&(l-=1),p=l+c+h+d;for(;p<n;)h+=1,p=l+c+h+d;const g=[];for(let j=0;j<l;j++)g.push(qe.NEUTRAL);for(let j=0;j<d;j++)g.push(qe.DEBT_TRAP);const y=Math.floor(c/2),C=c-y;for(let j=0;j<y;j++)g.push(qe.GAIN_MONEY);for(let j=0;j<C;j++)g.push(qe.MOVE_FORWARD);const I=Math.round(h*.4),O=Math.round(h*.5),_=Math.max(0,h-I-O);for(let j=0;j<I;j++)g.push(qe.LOSE_MONEY);for(let j=0;j<O;j++)g.push(qe.MOVE_BACKWARD);for(let j=0;j<_;j++)g.push(qe.INCREASE_PON);for(;g.length<n;)g.push(qe.NEUTRAL);for(;g.length>n;)g.pop();const v=LO(g),S=j=>{switch(j){case qe.MOVE_FORWARD:return Ue(t.moveForwardMin,t.moveForwardMax);case qe.MOVE_BACKWARD:return Ue(t.moveBackwardMin,t.moveBackwardMax);case qe.GAIN_MONEY:return Ue(t.gainMoneyMin,t.gainMoneyMax);case qe.LOSE_MONEY:return Ue(t.loseMoneyMin,t.loseMoneyMax);case qe.INCREASE_PON:return Ue(t.ponIncreaseMin,t.ponIncreaseMax);default:return 0}};let L=0;for(let j=1;j<=Ft-1;j++){const H=v[L++];H===qe.NEUTRAL||H===qe.DEBT_TRAP?e[j]={kind:H}:e[j]={kind:H,value:S(H)}}return e}function IS(t){const e=Ft+1,n=t==null?void 0:t.sugorokuTileEffects;return Array.isArray(n)&&n.length===e?t:{...t,sugorokuTileEffects:UO()}}function BO(t){const n=`${t.players[0].name}の移動ターン（T1 / ${Ft}マス先へ！）`,s="━━━ 8日目！全員で交互に移動＆スロット ━━━",a={...IS(t),gamePhase:"playing",subPhase:"day8",aidAvailable:Math.random()<P.dice.helpChance,taxiAvailable:Math.random()<P.dice.taxiChance,lastDiceRolls:[],recentPonEvent:null,showSpinResult:!1,displayReels:["?","?","?"]};return delete a.finalBattleStartedAt,delete a.finalBattleEntry,a.log=ks([n,s],t.log),a}function zO(t){const e=t.map(s=>{const a=s.character??"salaryman",i=mi(s.initialRolls),r=NO(s.initialStats);let l=null;return i?l=Ky(i,a):r?l=r:l=AO(a),PO(s.name,s.id,a,l)}),n=[`${e[0].name}のターン（1日目）`,`━━━ ゲーム開始！${e.length===1?"ソロ":`${e.length}人`}プレイ ━━━`,...e.map(s=>{const a=Zt[s.characterType],i=kc(s);return`${s.name}(${(a==null?void 0:a.emoji)??""}${(a==null?void 0:a.label)??""}): PON=${s.stats.pon} 運=${s.stats.luck} 技量=${s.stats.skill} 善行=${s.stats.virtue} 生活費=${i}G`})];return{players:e,currentDay:1,currentPlayerIdx:0,subPhase:"daily",gamePhase:"playing",log:n,aidAvailable:!1,taxiAvailable:!1,recentPonEvent:null,gameOverMsg:"",showSpinResult:!1,lastDiceRolls:[],displayReels:["?","?","?"]}}function yx(t,e,n){const s=e.length,a=t.currentPlayerIdx+1;let i=[],r={};if(a>=s){const l=t.currentDay+1;if(l>Ma){const c=Date.now();i=["育成フェーズ、終幕――いま、参道の向こうに決戦が待つ。","── 【決戦の日】 ──"],r={currentDay:l,currentPlayerIdx:0,subPhase:"finalBattle",gamePhase:"finalBattle",finalBattleStartedAt:c,finalBattleEntry:"preDay8"}}else i=[`${e[0].name}のターン`,`━━━ ${l}日目 開始 ━━━`],r={currentDay:l,currentPlayerIdx:0}}else i=[`${e[a].name}のターン（${t.currentDay}日目）`],r={currentPlayerIdx:a};return{...t,...r,players:e,log:ks([...n,...i],t.log)}}function Jr(t,e,n){const s=Math.max(1,P.dice.slotsPerSugorokuTurn),a=t.currentPlayerIdx,i=e[a],r=(i==null?void 0:i.slotTurnsLeft)??0,l=(i==null?void 0:i.slotPullsThisSeat)??0;if((i==null?void 0:i.movePhase)==="arrived"&&r>0&&l<s)return{...t,players:e,showSpinResult:!1,displayReels:["?","?","?"],log:ks(n,t.log)};let c=e;(i==null?void 0:i.movePhase)==="arrived"&&(c=e.map((O,_)=>_!==a?O:{...O,moveTurns:(O.moveTurns??0)+1}));const h=[];let d=VO(t.currentPlayerIdx,c,h);const p=[...n,...h];if(d=d.map((O,_)=>_!==t.currentPlayerIdx?O:{...O,slotPullsThisSeat:0}),d.every(gx)){const O={...t,players:d,log:ks(p,t.log)};return CS(O,d)}const g=d.length;let y=(t.currentPlayerIdx+1)%g;for(let O=0;O<g&&gx(d[y]);O++)y=(y+1)%g;const C=d[y];let I;return C.movePhase==="arrived"?I=`${C.name}のスロットターン（残り${C.slotTurnsLeft}回 / 資金${C.stats.money}G）`:C.movePhase==="waitingSlot"?I=`${C.name}のターン（ゴール到着済み・スロット${C.reservedSlotTurns??0}ターンブンを開始できます）`:I=`${C.name}の移動ターン（T${C.moveTurns+1} / ${C.position}/${Ft}マス）`,{...t,players:d,currentPlayerIdx:y,aidAvailable:Math.random()<P.dice.helpChance,taxiAvailable:Math.random()<P.dice.taxiChance,lastDiceRolls:[],showSpinResult:!1,displayReels:["?","?","?"],log:ks([...p,I],t.log)}}function Ph(t,e,n,s,a){const i=P.dice.virtueWaveThresh;if(e<i&&n>=i){const r=P.dice.virtueWavePonDelta,l=s.map(c=>({...c,stats:{...c.stats,pon:Tt(c.stats.pon+r,0)}}));return a.push(`🌟 ${t.name}の徳が高すぎて全員の心が洗われた！全員PON${r}`),l}return s}function Hp(t,e,n){const s=e[t],a=P.dice.splashRadius;return e.map((i,r)=>r===t||!i.alive||i.movePhase!=="moving"||Math.abs(i.position-s.position)>a?i:(n.push(`💥 巻き添え！${i.name}（${i.position}マス付近）→ 次ターン1回休み`),{...i,skipTurns:(i.skipTurns||0)+1}))}function $O(t,e,n,s,a){const i=P.sugorokuTiles;let r=Math.max(0,Math.min(Ft,e));const l={...n},c=[],h=(y,C)=>{a.push(y),C&&c.push(C)};if(r<=0||r>=Ft)return{finalPos:r,stats:l,popupTitles:c,debtTrapTriggered:!1};const d=t[r],p=(d==null?void 0:d.kind)??qe.NEUTRAL;if(p===qe.NEUTRAL)return{finalPos:r,stats:l,popupTitles:c,debtTrapTriggered:!1};const g=typeof(d==null?void 0:d.value)=="number"&&Number.isFinite(d.value)?d.value:null;switch(p){case qe.MOVE_FORWARD:{const y=g??Ue(i.moveForwardMin,i.moveForwardMax);h(`  🔰 マス効果 (${r})：進行マスで +${y} 進む`,`Forward +${y} steps (+${y}マス)`),r=Math.min(Ft,r+y);break}case qe.MOVE_BACKWARD:{const y=g??Ue(i.moveBackwardMin,i.moveBackwardMax);h(`  🔰 マス効果 (${r})：転がり坂で −${y} 戻る`,`Back −${y} steps (−${y}マス)`),r=Math.max(0,r-y);break}case qe.GAIN_MONEY:{const y=g??Ue(i.gainMoneyMin,i.gainMoneyMax);l.money=gn(l.money+y),h(`  🔰 マス効果 (${r})：ひろい金で +${y}G→${l.money}G`,`+${y}G`);break}case qe.LOSE_MONEY:{const y=g??Ue(i.loseMoneyMin,i.loseMoneyMax);l.money=gn(l.money-y),h(`  🔰 マス効果 (${r})：落とし穴で −${y}G→${l.money}G`,`−${y}G`);break}case qe.INCREASE_PON:{const y=g??Ue(i.ponIncreaseMin,i.ponIncreaseMax);l.pon=Tt(l.pon+y),h(`  🔰 マス効果 (${r})：炎上予約で +PON ${y}%→${l.pon}`,`Fire +${y} PON`);break}case qe.DEBT_TRAP:{if((l.money??0)<0)return h("  ☠ 借金トラップ発動！借金中で破産…","Debt Trap: GAME OVER"),{finalPos:r,stats:l,popupTitles:c,debtTrapTriggered:!0};h("  ☠ 借金トラップだったが、借金していなかったから何もなかった...","借金していなかったから何もなかった...");break}}return{finalPos:r,stats:l,popupTitles:c,debtTrapTriggered:!1}}function bx(t,e,n,s,a,i={}){const r=!!i.ponSplashDamage,l=!!i.skipTileEffects,c=IS(t),h=c.sugorokuTileEffects,d=t.players.map((O,_)=>_===e?{...O,stats:{...s},position:n}:{...O}),p=r?Hp(e,d,a):d,g=p[e],y=l?{finalPos:n,stats:{...g.stats},popupTitles:[],debtTrapTriggered:!1}:$O(h,n,{...g.stats},g.name,a),C=p.map((O,_)=>_===e?{...O,stats:y.stats,position:y.finalPos}:O),I=y.popupTitles.length>0?{title:"Tile effect / マス効果",lines:y.popupTitles}:null;return{gsWithTiles:c,players:C,tileToast:I,gameOverByDebt:y.debtTrapTriggered?{triggered:!0,message:`${g.name} は借金トラップを踏み、破産してゲームオーバー…`}:null}}function FO(t){const e=Math.min(1,Math.max(0,t));return e<.5?4*e*e*e:1-(-2*e+2)**3/2}function Cc(t){const n=2e3+Math.abs(t)*55;return Math.round(Math.min(3200,Math.max(2200,n)))}const HO=20,qO=300;function c0(t,e){const n=e-t,s=Math.abs(n),a=Math.min(s,HO),r=s>6?110:360;return a*r+qO}function GO(t,e){return t+e/2}function YO(t,e,n,s){const a=e-t,i=Math.max(0,s);if(Math.abs(a)<1e-9)return{jamMid:t,firstLegMs:i,secondLegMs:0};const r=GO(t,n);let l=r;a>0?l=Math.min(e,Math.max(t,r)):l=Math.max(e,Math.min(t,r));const c=(l-t)/a,h=Math.max(120,Math.round(i*c)),d=Math.round(i*(1-c));return{jamMid:l,firstLegMs:h,secondLegMs:Math.max(0,d)}}function KO(t,e,n=!1){return n&&t>=e?{icon:"⛩️",bg:"bg-indigo-950/95",border:"border-violet-300/70",text:"text-violet-100",shadow:"0 5px 0 #1e1b4b, 0 8px 16px rgba(0,0,0,0.65)",glow:"0 0 28px rgba(167,139,250,0.55)"}:t<=0?{icon:"🚀",bg:"bg-emerald-800/90",border:"border-emerald-400/70",text:"text-emerald-200",shadow:"0 5px 0 #064e3b, 0 7px 10px rgba(0,0,0,0.5)",glow:"0 0 14px rgba(52,211,153,0.35)"}:t>=e?{icon:"🏆",bg:"bg-amber-700/90",border:"border-amber-300/80",text:"text-amber-100",shadow:"0 5px 0 #78350f, 0 7px 10px rgba(0,0,0,0.5)",glow:"0 0 18px rgba(251,191,36,0.5)"}:t%10===0?{icon:"⭐",bg:"bg-sky-800/80",border:"border-sky-400/60",text:"text-sky-200",shadow:"0 4px 0 #0c4a6e, 0 6px 8px rgba(0,0,0,0.45)",glow:"0 0 12px rgba(56,189,248,0.3)"}:t%7===0?{icon:"🎲",bg:"bg-violet-900/80",border:"border-violet-400/55",text:"text-violet-300",shadow:"0 4px 0 #3b0764, 0 6px 8px rgba(0,0,0,0.4)",glow:null}:t%5===0?{icon:"✦",bg:"bg-slate-700/90",border:"border-slate-400/40",text:"text-slate-300",shadow:"0 3px 0 #1e293b, 0 5px 7px rgba(0,0,0,0.35)",glow:null}:{icon:null,bg:"bg-slate-800/95",border:"border-slate-600/50",text:"text-slate-400",shadow:"0 3px 0 #0f172a, 0 4px 6px rgba(0,0,0,0.3)",glow:null}}const vx="(min-width: 768px)";function QO(t){return`url('${String(t).replace(/\\/g,"/").replace(/'/g,"\\'")}')`}function XO({className:t,scrollPx:e=0,scrollMultiplier:n=1,traveling:s=!1}){const[a,i]=N.useState(()=>typeof window<"u"&&window.matchMedia(vx).matches);N.useEffect(()=>{const C=window.matchMedia(vx),I=()=>i(C.matches);return I(),C.addEventListener("change",I),()=>C.removeEventListener("change",I)},[]);const r=N.useMemo(()=>{const C=mx.pc??[],I=mx.sp??[];return a?[...C,...I]:[...I,...C]},[a]),[l,c]=N.useState(0);N.useEffect(()=>{c(0)},[a]);const h=t??"pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl";if(!r.length||l>=r.length)return u.jsx("div",{className:h,"aria-hidden":!0});const d=Us(r[l]),p=QO(d),g=Number.isFinite(n)?n:1,y=e*g;return u.jsxs("div",{className:h,"aria-hidden":!0,children:[u.jsx("img",{src:d,alt:"",className:"pointer-events-none absolute h-0 w-0 opacity-0",onError:()=>c(C=>C+1)}),u.jsx("div",{className:"pointer-events-none absolute inset-0 sugoroku-seamless-bg",style:{backgroundImage:p,backgroundRepeat:"repeat-y",backgroundSize:"100% auto",backgroundPosition:`center ${y}px`,filter:"none",transition:"filter 0.35s ease-out",willChange:s?"background-position, filter":"auto"}})]})}function WO({effect:t,sizePx:e=13}){if(!t||t.kind===qe.NEUTRAL)return null;const n=Math.max(8,e),s="anim-tile-effect-float pointer-events-none";switch(t.kind){case qe.MOVE_FORWARD:case qe.MOVE_BACKWARD:return u.jsx("span",{className:s,title:"移動マス",children:u.jsx(Xu,{className:"text-sky-300","aria-hidden":!0,strokeWidth:2.35,size:n})});case qe.GAIN_MONEY:return u.jsx("span",{className:s,title:"増資マス",children:u.jsx(wu,{className:"text-amber-300","aria-hidden":!0,strokeWidth:2.35,size:n})});case qe.LOSE_MONEY:return u.jsx("span",{className:s,title:"出費マス",children:u.jsx(wu,{className:"text-slate-500 opacity-95","aria-hidden":!0,strokeWidth:2.35,size:n})});case qe.INCREASE_PON:return u.jsx("span",{className:s,title:"燃えマス",children:u.jsx(HD,{className:"text-orange-400","aria-hidden":!0,strokeWidth:2.35,size:n})});case qe.DEBT_TRAP:return u.jsx("span",{className:s,title:"借金トラップ",children:u.jsx(QD,{className:"text-rose-400","aria-hidden":!0,strokeWidth:2.35,size:n})});default:return null}}function xx({player:t}){const e=(t==null?void 0:t.pendingTaxiSteps)??0;return e<=0||!t?null:u.jsx("span",{className:"pointer-events-none absolute bottom-full left-1/2 z-[38] mb-0.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-orange-400/90 bg-orange-950/95 px-[5px] py-[2px] text-[9px] font-black leading-none text-orange-100 animate-pulse",title:`タクシー渋滞：残り${e}マス`,children:"🚗渋滞中…"})}const JO=new Set(["ride","trafficJam","drive","driveBeforeJam","driveAfterJam"]);function ZO({characterType:t,taxiPhase:e}){if(!t||e!=="arrive")return null;const n="pointer-events-none relative shrink-0 flex w-[min(216px,56vw)] max-w-[240px] flex-col items-center",s=u.jsxs("div",{className:"relative w-full",children:[u.jsx(Su,{imgClassName:"relative z-0 block w-full object-contain opacity-100"}),null]});return u.jsx("div",{className:`${n} anim-taxi-arrive-exit-wrapper`,children:u.jsx("div",{className:"relative w-full anim-taxi-arrive-park-inner",children:u.jsx("div",{className:"relative w-full",children:s})})})}const ej=10,tj=-100;function nj({deco:t,iconPx:e,tileW:n}){const[s,a]=N.useState(!1),i=n*ej;return s?u.jsx("span",{style:{fontSize:`${e}px`},className:`leading-none ${t.text}`,children:t.icon}):u.jsx("div",{className:"absolute left-1/2 top-full z-[5] pointer-events-none opacity-100",style:{width:i,height:i,transform:`translate(-50%, ${tj}px)`},children:u.jsx("img",{src:Us("/images/slotRirimu.png"),alt:"",draggable:!1,className:"h-full w-full object-contain select-none opacity-100",onError:()=>a(!0)})})}function sj({tileW:t}){const e=Math.min(300,Math.max(Math.round(t*1.65),t+36));return u.jsx("div",{className:"pointer-events-none mb-1.5 shrink-0 z-[4] mx-auto rounded-md border-2 border-amber-950/50 shadow-[0_0_18px_rgba(250,204,21,0.4)]",style:{width:e,height:14,backgroundImage:"repeating-linear-gradient(90deg, #171717 0px, #171717 7px, #fafaf9 7px, #fafaf9 14px)"},"aria-hidden":!0})}const aj=300,ij=52,rj=72,u0=12,oj=.38,lj=.015;function _x(t){return!t||typeof t!="string"?t:t.replace(/\/(\d{2,3})\b/g,"")}function cj(t,e,n,s){const a=n+s;return e>=0?(t-Math.floor(t+1e-9))*a:-(Math.ceil(t-1e-9)-t)*a}function qp({players:t,viewPos:e,boardGoal:n,isDiceRolling:s,taxiPhase:a,pieceHopping:i,currentPlayer:r,visualTheme:l="default",tileEffects:c=null,reportHopAnimationComplete:h=!1,onHopAnimationComplete:d,taxiDriveCongested:p=!1,taxiDriveEndPos:g=null,taxiDriveSegmentMs:y=null,taxiJamMidPos:C=null,taxiDriveDurationMs:I=2600}){const _=l==="nightShrine",[v,S]=N.useState(e),[L,j]=N.useState({forward:!0,msPerStep:360,fast:!1}),H=N.useRef(null),[T,x]=N.useState(480),[E,k]=N.useState(58),R=N.useRef(e),D=N.useRef(1),w=N.useRef(null),ae=N.useRef(null),_e=N.useRef(null),K=N.useRef(d);K.current=d,N.useLayoutEffect(()=>{const he=H.current;if(!he)return;const Se=()=>{const Ke=he.clientHeight||480,St=he.clientWidth||360;x(Ke),k(Math.min(rj,Math.max(ij,Math.round(St*.22))))};Se();const we=new ResizeObserver(Se);return we.observe(he),()=>we.disconnect()},[]),N.useEffect(()=>{if(e===R.current||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")return;const he=R.current,Se=e,we=Se-he;if(a&&(a==="taxiHail"||a==="enter"||a==="boarding"||a==="ride"||a==="trafficJam"||a==="arrive")){w.current&&(cancelAnimationFrame(w.current),w.current=null),_e.current&&(clearTimeout(_e.current),_e.current=null),D.current=we>=0?1:-1,R.current=e,S(e),j({forward:we>=0,msPerStep:360,fast:!1});return}const St=Math.min(Math.abs(we),20),oe=we>0?1:-1;if(D.current=oe,R.current=e,w.current&&(cancelAnimationFrame(w.current),w.current=null),_e.current&&(clearTimeout(_e.current),_e.current=null),St===0){S(Se);return}const ee=Math.abs(we)>6,ge=ee?110:360,le=St*ge;j({forward:oe>0,msPerStep:ge,fast:ee});const Ae=performance.now(),me=Te=>{const st=Math.min(1,Math.max(0,(Te-Ae)/le)),at=he+we*st;S(at),st<1?w.current=requestAnimationFrame(me):(w.current=null,S(Se),h&&St>0&&(_e.current=setTimeout(()=>{var At;(At=K.current)==null||At.call(K)},aj)))};return w.current=requestAnimationFrame(me),()=>{w.current&&cancelAnimationFrame(w.current),_e.current&&clearTimeout(_e.current)}},[e,h,a]),N.useEffect(()=>{if(!(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")||g==null)return;w.current&&(cancelAnimationFrame(w.current),w.current=null),_e.current&&(clearTimeout(_e.current),_e.current=null);const Se=R.current,we=g,Ke=y??I,St=Ke>0?Ke:Cc(Math.abs(we-Se));let oe=we;a==="driveBeforeJam"&&C!=null?oe=C:a==="driveAfterJam"&&(oe=we),D.current=we>=Se?1:-1;const ee=a==="driveBeforeJam"||(a==="drive"||a==="driveAfterJam")&&!p;if(j({forward:we>=Se,msPerStep:110,fast:ee}),Math.abs(oe-Se)<1e-9){S(oe),R.current=oe;return}S(Se);const ge=performance.now(),le=Ae=>{const me=Math.min(1,Math.max(0,(Ae-ge)/St)),Te=Se+(oe-Se)*FO(me);S(Te),me<1?ae.current=requestAnimationFrame(le):(ae.current=null,S(oe),R.current=oe)};return ae.current=requestAnimationFrame(le),()=>{ae.current&&(cancelAnimationFrame(ae.current),ae.current=null)}},[a,g,I,y,C,p]);const te=E,ne=te+u0,pe=Math.abs(e-v)>lj,Pe=pe?cj(v,D.current,te,u0):0,_t=Math.floor(v+1e-9),$e=Math.min(n,_t+6),Ot=[];for(let he=0;he<=$e;he++)Ot.push({pos:he});const mt={};t.forEach(he=>{he.alive&&he.id!==(r==null?void 0:r.id)&&(mt[he.position]||(mt[he.position]=[]),mt[he.position].push(he))});const nt=Math.round(te*.48),F=Math.max(10,Math.round(te*.26)),ie=v*ne+te/2,se=T*oj-ie,Ne=-v*ne;let re=1;(a==="enter"||a==="boarding")&&(re=1.15),a==="ride"&&(re=2),a==="trafficJam"&&(re=.06),(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||a==="arrive")&&(re=1);const ve=((r==null?void 0:r.pendingTaxiSteps)??0)>0&&a==null,ke=a!=null&&JO.has(a)||ve,Ge=(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")&&!p,ze=a==="enter"||a==="boarding",Ye=a==="ride"||a==="trafficJam"||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||ve,Cn=a==="arrive",Vn=_?"linear-gradient(to bottom, #010118 0%, #09092e 42%, #0e0e46 100%)":"linear-gradient(to bottom, #020617 0%, #0f172a 55%, #1e293b 100%)",is=pe||i,tn=Math.ceil(Math.abs(e-v)-1e-9);return u.jsxs("div",{className:`relative flex min-h-0 w-full flex-col overflow-visible rounded-xl ${_?"final-battle-night":""}`,style:{background:Vn,height:"100%",filter:a==="arrive"?"brightness(0.9) saturate(0.95)":void 0,transition:"filter 0.35s ease-out"},children:[u.jsx(XO,{scrollPx:Ne,scrollMultiplier:re,traveling:pe||Ge,fast:!!(L.fast&&pe)||Ge}),u.jsx("div",{className:`absolute top-0 left-1/2 -translate-x-1/2 w-52 h-16 rounded-full pointer-events-none z-[1]
        ${_?"":"opacity-[0.35]"}`,style:{background:_?"radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 72%)":"radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)"}}),_&&u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light opacity-90",style:{background:"radial-gradient(ellipse 120% 80% at 50% 18%, rgba(79,70,229,0.25) 0%, transparent 55%)"}}),u.jsx("div",{className:"pointer-events-none absolute inset-0 z-[2] opacity-[0.35]",style:{background:"repeating-linear-gradient(100deg, transparent, transparent 5px, rgba(148,163,184,0.06) 5px, rgba(148,163,184,0.06) 10px)",maskImage:"linear-gradient(to bottom, transparent, black 35%)"}}),u.jsx("div",{className:"pointer-events-none absolute inset-x-0 bottom-0 h-[55%] z-[3] opacity-50",style:{background:"linear-gradient(to top, rgba(2,6,23,0.92), transparent)"}}),Array.from({length:22},(he,Se)=>u.jsx("span",{className:"pointer-events-none absolute rounded-full anim-cold-spark z-[4]",style:{left:`${Se*47%100}%`,bottom:"-4%",width:2+Se%4,height:2+Se%4,background:Se%3===0?"rgba(199,210,254,0.95)":"rgba(165,243,252,0.85)",boxShadow:"0 0 6px rgba(191,219,254,0.9)",animationDuration:`${4.2+Se%7*.35}s`,animationDelay:`${Se%11*.28}s`}},Se))]}),pe&&tn>0&&!a&&u.jsxs("div",{className:"absolute top-2 right-3 z-10 text-[11px] font-bold text-cyan-300/80 bg-slate-900/60 px-2 py-0.5 rounded-full pointer-events-none",children:["残り",tn,"マス..."]}),u.jsx("div",{ref:H,className:`relative z-10 flex min-h-0 flex-1 flex-col overflow-visible w-full pt-2 pb-3 ${s&&a!=="taxiHail"&&!pe&&!i?"opacity-75":""}`,children:u.jsx("div",{className:"relative mx-auto flex w-full max-w-[92vw] flex-col items-center overflow-visible px-3",style:{transform:`translateY(${se}px)`,transition:pe?"none":"transform 0.4s linear",willChange:pe?"transform":"auto"},children:Ot.map(({pos:he},Se)=>{const we=KO(he,n,_),Ke=he===_t,St=he<_t,oe=mt[he]??[],ee=Array.isArray(c)?c[he]:null,ge=ee&&ee.kind!==qe.NEUTRAL&&he>0&&he<n,le=ge&&(ee.kind===qe.MOVE_BACKWARD||ee.kind===qe.LOSE_MONEY||ee.kind===qe.INCREASE_PON||ee.kind===qe.DEBT_TRAP),Ae=ge&&(ee.kind===qe.MOVE_FORWARD||ee.kind===qe.GAIN_MONEY),me=_x(we.bg),Te=_x(we.border),at=Se===Ot.length-1?0:u0,At=St&&!le&&he!==n?"brightness-[0.88] saturate-[0.92]":"",it=ke&&!ze?-Math.round(te*.22):0,Ln=oe.length>0||Ke&&r&&(!Ye||Cn||ke||ze);return u.jsxs("div",{className:"flex flex-col items-center select-none opacity-100",style:{marginBottom:at,transition:"opacity 0.25s ease"},children:[he===n&&u.jsx(sj,{tileW:te}),u.jsxs("div",{className:"relative flex flex-col items-center",style:{width:te},children:[Ln?u.jsxs("div",{className:`pointer-events-none absolute left-1/2 bottom-full flex flex-row items-end justify-center gap-1 ${a==="taxiHail"||a==="enter"||a==="boarding"||a==="ride"||a==="trafficJam"||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||a==="arrive"?"z-[28]":"z-20"}`,style:{transform:`translate(-50%, ${Math.max(10,Math.round(te*.52))}px)`},children:[oe.map(Ve=>{const xe=Ke?28:Math.max(12,nt-6);return u.jsxs("div",{className:"relative flex flex-col items-center justify-end",children:[u.jsx(xx,{player:Ve}),u.jsx("span",{className:"anim-breathe leading-none inline-flex items-end justify-center",children:u.jsx(hf,{characterType:Ve.characterType,pose:(Ve.skipTurns??0)>0?"fallen":"normal",imgClassName:"object-contain object-bottom",spanClassName:"leading-none",imgStyle:{maxHeight:Math.max(72,Math.min(118,xe*5.5)),width:"auto",maxWidth:Math.max(58,xe*6.25)},spanStyle:{fontSize:xe}})})]},Ve.id)}),Ke&&Cn&&u.jsx(ZO,{characterType:r.characterType,taxiPhase:a}),Ke&&r&&(!Ye||ke||ze)&&u.jsxs("div",{className:"relative flex flex-col items-center justify-end",children:[u.jsx(xx,{player:r}),ze?u.jsxs("div",{className:"flex max-w-[min(340px,calc(100vw-40px))] flex-row flex-nowrap items-end justify-center gap-1 pr-0.5 origin-bottom scale-[0.88] sm:scale-95 md:scale-100",children:[u.jsx("div",{className:`order-1 shrink-0 self-end ${a==="enter"?"anim-taxi-from-above-left-of-tile":"taxi-approach-parked"} relative z-[24]`,children:u.jsx(Su,{imgClassName:"relative z-[1] max-h-[118px] w-auto min-w-[48px] max-w-[min(165px,46vw)] object-contain object-bottom opacity-100"})}),u.jsx("div",{className:`order-2 shrink-0 relative z-[20] flex flex-col items-center justify-end self-end ${a==="boarding"?"taxi-boarding-char-to-cab":""}`,children:u.jsx("span",{className:`inline-flex items-end justify-center leading-none ${a==="boarding"?"":s?"animate-bounce":"anim-float"}`,children:u.jsx(hf,{characterType:r.characterType,pose:(r.skipTurns??0)>0?"fallen":"normal",imgClassName:"max-h-[130px] w-auto max-w-[min(180px,55vw)] object-contain object-bottom",spanClassName:"text-4xl leading-none"})})})]}):u.jsxs("div",{className:`relative flex items-end justify-center ${ke?"z-[26]":""} ${a==="arrive"?"taxi-piece-arrive-fadein":""}`,style:{zIndex:ke?26:i||is?20:5,position:"relative"},children:[u.jsx("span",{className:`inline-flex items-end justify-center leading-none ${a==="arrive"||pe?"":i?"anim-hop":s?"animate-bounce":"anim-float"}`,children:u.jsx("span",{className:"inline-flex items-end justify-center leading-none",style:{transform:`translate3d(${it}px, ${Pe}px, 0)`,transition:pe?"none":"transform 0.4s linear",willChange:pe?"transform":"auto"},children:u.jsx("span",{className:`standee-piece relative inline-flex items-end justify-center leading-none ${pe&&!ke?"anim-standee-walk":""} ${ke?"z-[26] anim-pulse-taxi-ride":""} ${ke&&a==="trafficJam"?"anim-taxi-stutter":""} ${a==="arrive"?"taxi-piece-arrive-fadein-target":""}`,style:pe&&!ke?{"--standee-walk-ms":`${L.msPerStep*1.35}ms`}:void 0,children:ke?u.jsx(Su,{imgClassName:"relative z-[1] max-h-[130px] w-auto min-w-[48px] max-w-[min(180px,55vw)] object-contain object-bottom opacity-100"}):u.jsx(hf,{characterType:r.characterType,pose:(r.skipTurns??0)>0?"fallen":"normal",imgClassName:"max-h-[130px] w-auto max-w-[min(180px,55vw)] object-contain object-bottom",spanClassName:"text-4xl leading-none"})})})}),!ke&&r.stats.luck>=80&&[{cls:"anim-sparkle-0",t:"-10px",l:"-12px"},{cls:"anim-sparkle-1",t:"-8px",r:"-12px"},{cls:"anim-sparkle-2",b:"-8px",l:"-10px"},{cls:"anim-sparkle-3",b:"-6px",r:"-10px"}].map((Ve,xe)=>u.jsx("span",{className:`absolute text-yellow-300 font-black text-[11px] pointer-events-none ${Ve.cls}`,style:{top:Ve.t,left:Ve.l,bottom:Ve.b,right:Ve.r},children:"✦"},xe))]})]})]}):null,u.jsxs("div",{className:`relative z-0 flex items-center justify-center overflow-visible rounded-xl border-[3px] ${At}
                    ${he===n?"bg-yellow-400 border-yellow-600 text-amber-950":le?"border-rose-500 bg-gradient-to-br from-red-950 to-red-900 text-rose-50":Ae?"border-sky-400 bg-gradient-to-br from-sky-900 to-blue-900 text-sky-100":`${me} ${Te}`}
                    ${Ke?le?"ring-2 ring-rose-300/95":he===n?"ring-2 ring-amber-700/90":"ring-2 ring-cyan-400/90":""}`,style:{width:`${te}px`,height:`${te}px`,boxShadow:"none",transition:"width 0.28s ease, height 0.28s ease, filter 0.28s ease"},children:[u.jsx("div",{className:`absolute top-0 left-0 right-0 h-1 rounded-t-xl pointer-events-none ${le?"bg-rose-400/50":Ae?"bg-sky-300/45":he===n?"bg-yellow-500/80":"bg-white/25"}`}),St&&he>0&&u.jsx("span",{className:"pointer-events-none absolute left-1 top-1 z-[3] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/95 text-sm leading-none text-emerald-200 ring-2 ring-emerald-400/80","aria-hidden":!0,children:"✓"}),he===n?u.jsx(nj,{deco:we,iconPx:nt,tileW:te}):ge?u.jsx(WO,{effect:ee,sizePx:Math.max(16,Math.round(nt*1.05))}):he>0&&he<n?null:we.icon?u.jsx("span",{style:{fontSize:`${nt}px`},className:`leading-none ${we.text}`,children:we.icon}):u.jsx("span",{style:{fontSize:`${F}px`},className:`font-bold ${we.text}`,children:he}),he===n&&u.jsx("span",{className:"pointer-events-none absolute bottom-1 left-1/2 z-[6] -translate-x-1/2 text-[10px] font-black leading-none tracking-wide text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]",children:"GOAL!"})]})]}),Ke&&we.icon&&(he===0||he>=n)&&u.jsx("span",{className:`text-[9px] mt-0.5 font-medium ${we.text}`,children:he===0?"スタート":"GOAL!"})]},he)})})}),u.jsx("div",{className:"absolute bottom-0 left-0 right-0 z-[15] h-5 rounded-b-xl pointer-events-none",style:{background:"linear-gradient(to top, rgba(15,23,42,0.88), transparent)"}}),u.jsxs("div",{className:"pointer-events-none absolute right-2 top-1/2 z-[16] -translate-y-1/2 rounded-lg border border-cyan-400/50 bg-slate-900/85 px-2 py-1 text-right shadow-[0_4px_18px_rgba(0,0,0,0.45)]",children:[u.jsx("div",{className:"text-[10px] font-semibold tracking-wide text-cyan-300/90",children:"現在マス"}),u.jsxs("div",{className:"text-sm font-black tabular-nums text-cyan-100 leading-tight",children:[Math.max(0,_t),u.jsx("span",{className:"text-slate-500 font-semibold",children:" / "}),n]})]})]})}function uj({gs:t,cpGs:e,boardViewPos:n=null,onSugorokuHopComplete:s,reportSugorokuHopComplete:a=!1,isMyTurn:i,cpIsGoalLanding:r,cpIsWaitingSlot:l,isDay8Moving:c,isDiceRolling:h,localDice:d,diceShuffleValues:p,diceConfirmed:g,isLuckyRoll:y,showDiceTotal:C,displayDice:I,taxiPhase:O,taxiDriveCongested:_=!1,taxiDriveEndPos:v=null,taxiDriveSegmentMs:S=null,taxiJamMidPos:L=null,taxiDriveDurationMs:j=2600,pieceHopping:H,interactionLocked:T=!1,onMoveAction:x,onGoalLandingConfirm:E}){if(!e)return null;const k=e.pendingTaxiSteps??0,R=k>0,D=typeof n=="number"?n:e.position;return u.jsxs(u.Fragment,{children:[i&&t.subPhase==="day8"&&r&&u.jsxs("div",{className:"space-y-4",children:[u.jsxs("div",{className:"rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-500/20 to-yellow-900/30 p-5 text-center space-y-3",children:[u.jsx("p",{className:"text-4xl animate-bounce",children:"🏁"}),u.jsx("p",{className:"text-lg font-bold text-amber-100",children:e.name}),u.jsx("h2",{className:"text-2xl font-black text-amber-200 tracking-wide",children:"GOAL!"})]}),u.jsx("div",{style:{height:"min(720px, 80vh)",minHeight:"min(560px, 72vh)",overflow:"hidden",borderRadius:"12px"},children:u.jsx(qp,{players:t.players,viewPos:D,boardGoal:Ft,isDiceRolling:!1,taxiPhase:null,pieceHopping:!1,currentPlayer:e,tileEffects:t==null?void 0:t.sugorokuTileEffects})}),e.lastMoveEvent&&u.jsx("p",{className:"rounded-lg bg-slate-800/60 px-3 py-2 text-xs text-slate-300 text-center",children:e.lastMoveEvent}),u.jsx("button",{type:"button",onClick:E,className:"w-full rounded-xl bg-amber-500 py-4 font-black text-slate-950 hover:bg-amber-400 shadow-lg animate-pulse",children:"スロットを始める →"})]}),c&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"flex items-center justify-between gap-2",children:[u.jsxs("h2",{className:"font-semibold text-sm text-slate-300 shrink-0",children:[e.name," — T",e.moveTurns+1]}),u.jsxs("div",{className:"flex-1 flex flex-col items-center",children:[u.jsx("span",{className:"text-[10px] text-yellow-400/60 font-medium tracking-widest uppercase",children:"GOAL"}),u.jsxs("div",{className:"flex items-baseline gap-1",children:[u.jsx("span",{className:"text-2xl font-black text-yellow-300 tabular-nums leading-none",children:Math.max(0,Ft-e.position)}),u.jsx("span",{className:"text-xs text-yellow-400/70",children:"マス先"})]})]}),u.jsxs("span",{className:"text-xs text-slate-500 shrink-0",children:["残",Math.max(0,P.dice.maxTurns-e.moveTurns),"T"]})]}),u.jsx("div",{style:{height:"min(720px, 80vh)",minHeight:"min(560px, 72vh)",overflow:"hidden",borderRadius:"12px"},children:u.jsx(qp,{players:t.players,viewPos:D,boardGoal:Ft,isDiceRolling:h,taxiPhase:O,taxiDriveCongested:_,taxiDriveEndPos:v,taxiDriveSegmentMs:S,taxiJamMidPos:L,taxiDriveDurationMs:j,pieceHopping:H,currentPlayer:e,tileEffects:t==null?void 0:t.sugorokuTileEffects,reportHopAnimationComplete:a,onHopAnimationComplete:s})}),(()=>{if(R)return null;const w=h,ae=w?d.map((te,ne)=>({value:(g[ne]?te:p[ne])??"?",confirmed:g[ne]??!1})):I.map(te=>({value:te,confirmed:!0}));if(ae.length===0)return null;const _e=w?C:!0,K=ae.reduce((te,{value:ne})=>te+(Number(ne)||0),0);return u.jsxs("div",{className:"flex flex-col items-center gap-2",children:[u.jsx("div",{className:"flex gap-3 justify-center flex-wrap",children:ae.map(({value:te,confirmed:ne},pe)=>{const Pe=w&&y&&pe===1;return u.jsxs("div",{className:`relative flex items-center gap-1.5 rounded-xl border-2 px-4 py-2.5 min-w-[66px] justify-center font-black text-xl transition-all duration-300
                              ${Pe&&ne?"border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.55)]":Pe?"border-amber-500/60 bg-amber-900/30 text-amber-300 animate-pulse":ne?"border-cyan-400/70 bg-cyan-500/10 text-cyan-100 anim-dice-pop":"border-slate-600/60 bg-slate-800/80 text-slate-400 animate-pulse"}`,children:[u.jsx("span",{className:"text-base leading-none select-none",children:"🎲"}),u.jsx("span",{children:te}),Pe&&u.jsx("span",{className:"absolute -top-2.5 -right-2 text-[11px] text-amber-300 font-black leading-none select-none",children:"★"})]},`day8-dice-${pe}-${te}-${ne?"c":"u"}`)})}),_e&&ae.length>1&&u.jsxs("div",{className:"flex items-baseline gap-1.5 anim-fadein",children:[u.jsx("span",{className:"text-sm text-slate-400",children:"合計"}),u.jsx("span",{className:"text-2xl font-black text-white",children:K}),u.jsx("span",{className:"text-sm text-slate-400",children:"マス進む！"})]})]})})(),R&&u.jsx("div",{className:"rounded-lg border border-amber-600/45 bg-amber-950/50 px-3 py-2 text-center",children:u.jsxs("p",{className:"text-xs font-semibold text-amber-100",children:["タクシー渋滞中 — 駒に「渋滞中…」表示。あと",u.jsx("strong",{className:"tabular-nums text-white",children:k}),"マスが残っています。"]})}),u.jsx("div",{className:"flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500 justify-center",children:!R&&u.jsxs(u.Fragment,{children:[u.jsxs("span",{children:["最低出目: ",SS(e.stats.virtue),"（善行",e.stats.virtue,"）"]}),u.jsx("span",{children:e.stats.luck>=80?"アドバンテージ🎲🎲":"通常🎲"}),e.stats.pon>=P.pon.fireThreshold&&u.jsxs("span",{className:e.stats.pon>=P.pon.deathThreshold?"text-rose-300":"text-orange-300",children:["PON",e.stats.pon," ⚡転倒リスク"]})]})}),i&&u.jsxs(u.Fragment,{children:[e.skipTurns>0&&u.jsxs("div",{className:"rounded-xl border border-orange-400/40 bg-orange-400/10 p-3 text-sm text-orange-200 flex items-center gap-2 justify-center",children:["💤 巻き添えで",e.skipTurns,"回休み…自動スキップ中"]}),R?u.jsxs("button",{type:"button",onClick:()=>x("taxiTrafficWait"),disabled:T||h||!!O||e.skipTurns>0,className:"mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border-2 border-amber-200/70 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 px-6 py-5 font-black text-slate-950 shadow-[0_0_36px_rgba(251,191,36,0.45)] transition-[filter] hover:brightness-[1.05] disabled:cursor-not-allowed disabled:opacity-40",children:[u.jsx("span",{className:"flex items-center gap-2 text-2xl leading-tight tracking-tight",children:"🚧 渋滞を待つ"}),u.jsx("span",{className:"mt-1 text-sm font-bold opacity-95",children:"Wait in Traffic"}),u.jsxs("span",{className:"mt-2 text-[11px] font-semibold opacity-85 tabular-nums",children:["あと ",k," マスでタクシー行程完了"]})]}):u.jsxs("div",{className:"flex flex-wrap gap-2 justify-center",children:[u.jsxs("button",{type:"button",onClick:()=>x("normal"),disabled:T||h||!!O||e.skipTurns>0,className:"inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40 shadow-lg",children:[u.jsx(VD,{size:18}),"進む"]}),u.jsxs("div",{className:"relative group",children:[u.jsxs("button",{type:"button",onClick:()=>x("shop"),disabled:T||h||!!O||e.stats.money<P.dice.shopCost||e.skipTurns>0,className:"inline-flex items-center gap-2 rounded-xl bg-lime-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-lime-400 transition-colors disabled:opacity-40 shadow-lg",children:[u.jsx(wu,{size:18}),"コンビニ ",u.jsxs("span",{className:"text-xs opacity-70",children:["-",P.dice.shopCost,"G"]})]}),u.jsx("div",{className:"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none",children:u.jsxs("div",{className:"bg-slate-800 border border-lime-500/40 text-slate-100 text-xs rounded-xl px-3 py-2 whitespace-nowrap shadow-xl",children:["🍰 コンビニスイーツでエネルギー補給！（ダイスを1個追加）",u.jsx("div",{className:"absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"})]})})]}),u.jsxs("div",{className:"relative group",children:[u.jsxs("button",{type:"button",onClick:()=>x("taxi"),disabled:T||h||!!O||e.stats.money<P.dice.taxiCost||e.skipTurns>0,className:"inline-flex items-center gap-1.5 rounded-xl bg-yellow-400 px-5 py-2.5 font-semibold text-slate-950 hover:bg-yellow-300 transition-colors disabled:opacity-40 shadow-lg",children:[u.jsx(Su,{imgClassName:"h-[2.25rem] w-[2.25rem] object-contain shrink-0 opacity-100"}),"タクシー",u.jsxs("span",{className:"text-xs opacity-70",children:["-",P.dice.taxiCost,"G / ",P.dice.taxiMoveMin,"〜",P.dice.taxiMoveMax,"マス"]}),e.stats.virtue<=P.dice.taxiCongestThresh&&u.jsx("span",{className:"text-[10px] opacity-60",children:"渋滞リスク"})]}),u.jsx("div",{className:"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none",children:u.jsxs("div",{className:"w-64 bg-slate-800 border border-yellow-400/40 text-slate-100 text-xs rounded-xl px-3 py-2 whitespace-normal text-left leading-relaxed shadow-xl",children:["🚕 タクシーで ",P.dice.taxiMoveMin,"〜",P.dice.taxiMoveMax,"マス進む（-",P.dice.taxiCost,"G）。",u.jsx("span",{className:"block mt-1 font-semibold text-yellow-300",children:"⛔ 止まったマスのマス効果は受けません。"}),u.jsx("span",{className:"block mt-1 text-slate-300",children:"善行が低いと一定確率で渋滞（2ターン化／前半→次の自分ターンで残り進行・渋滞時+PON、そのターンは他操作不可）。"}),u.jsx("div",{className:"absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"})]})})]}),t.aidAvailable&&u.jsxs("button",{type:"button",onClick:()=>x("help"),disabled:T||h||!!O||e.skipTurns>0,className:`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-colors disabled:opacity-40 shadow-lg ${e.stats.pon>=P.pon.deathThreshold?"bg-rose-600 text-white hover:bg-rose-500":"bg-emerald-500 text-slate-950 hover:bg-emerald-400"}`,children:[u.jsx(GD,{size:18}),"人助け ",e.stats.pon>=P.pon.deathThreshold?"⚠️即死50%":""]})]}),!R&&u.jsxs("p",{className:"text-center text-[10px] text-slate-600",children:["人助け ",(P.dice.helpChance*100).toFixed(0),"% / タクシー"," メニュー常時（確率のみに戻す: taxiMenuAlwaysVisible を false、taxiChance で割合）"]})]})]})]})}const Gp=1600,hj=900,fj=1600,dj=Gp+fj;function mj(){try{const t=new(window.AudioContext||window.webkitAudioContext);t.state==="suspended"&&t.resume().catch(()=>{});const e=t.currentTime,n=t.createOscillator(),s=t.createGain();n.connect(s),s.connect(t.destination),n.type="sine",n.frequency.setValueAtTime(420,e),n.frequency.exponentialRampToValueAtTime(760,e+.07),s.gain.setValueAtTime(.22,e),s.gain.exponentialRampToValueAtTime(.001,e+.14),n.start(e),n.stop(e+.15)}catch{}}function pj(){try{const t=new(window.AudioContext||window.webkitAudioContext);t.state==="suspended"&&t.resume().catch(()=>{});const e=t.currentTime,n=.24,s=Math.floor(t.sampleRate*n),a=t.createBuffer(1,s,t.sampleRate),i=a.getChannelData(0);for(let p=0;p<s;p++){const g=Math.pow(1-p/s,2.1);i[p]=(Math.random()*2-1)*g}const r=t.createBufferSource();r.buffer=a;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=380;const c=t.createGain();c.gain.setValueAtTime(.34,e),c.gain.exponentialRampToValueAtTime(.001,e+n),r.connect(l),l.connect(c),c.connect(t.destination),r.start(e),r.stop(e+n);const h=t.createOscillator(),d=t.createGain();h.connect(d),d.connect(t.destination),h.type="triangle",h.frequency.setValueAtTime(98,e),h.frequency.exponentialRampToValueAtTime(42,e+n),d.gain.setValueAtTime(.36,e),d.gain.exponentialRampToValueAtTime(.001,e+n*1.05),h.start(e),h.stop(e+n+.02)}catch{}}function Tx({characterType:t,pose:e}){const n=_S(t,e),[s,a]=N.useState(0),i=Zt[t]??Zt.salaryman;return N.useEffect(()=>{a(0)},[t,e]),!n.length||s>=n.length?u.jsx("span",{className:"select-none text-[clamp(4.5rem,20vw,9rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]",children:i.emoji??"🙂"}):u.jsx("img",{src:Us(n[s]),alt:"",draggable:!1,className:"max-h-[min(52vh,520px)] w-auto max-w-[min(92vw,560px)] select-none object-contain object-bottom drop-shadow-[0_12px_40px_rgba(0,0,0,0.75)]",onError:()=>a(r=>r+1)})}function gj({active:t,characterType:e,onComplete:n,onFallLand:s}){const[a,i]=N.useState(!0),[r,l]=N.useState(!1),[c,h]=N.useState(!1),[d,p]=N.useState(!1),g=N.useRef(n),y=N.useRef(s);if(g.current=n,y.current=s,N.useEffect(()=>{if(!t){i(!0),l(!1),h(!1),p(!1);return}i(!0),l(!1),h(!1),p(!1),mj();const O=setTimeout(()=>i(!1),hj),_=setTimeout(()=>{var S;l(!0),pj(),(S=y.current)==null||S.call(y),h(!0),p(!0)},Gp),v=setTimeout(()=>{var S;(S=g.current)==null||S.call(g)},dj);return()=>{clearTimeout(O),clearTimeout(_),clearTimeout(v)}},[t]),!t)return null;const C=e??"salaryman",I=Gp/1e3;return u.jsxs("div",{className:`fixed inset-0 z-[220] flex cursor-default flex-col items-center justify-center gap-4 bg-black/75 pointer-events-auto px-4 ${a?"anim-pon-cutin-shake":""}`,"aria-hidden":!0,children:[u.jsx("div",{className:`pon-cutin-scene relative mx-auto w-[min(92vw,560px)] h-[min(52vh,520px)] transition-transform duration-500 ease-out ${d?"translate-y-2 scale-[0.99]":""}`,children:r?u.jsx("div",{className:"pon-cutin-spin-host anim-fadein",children:u.jsx(Tx,{characterType:C,pose:"fell_down"})}):u.jsx("div",{className:"pon-cutin-spin-host anim-pon-stumble-spin",style:{"--pon-spin-duration":`${I}s`},children:u.jsx(Tx,{characterType:C,pose:"stumble"})})}),c&&u.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:u.jsxs("div",{className:"relative anim-pon-burst-impact font-black tracking-tight text-white",children:[u.jsx("span",{className:"anim-pon-spark-impact pointer-events-none absolute -inset-12 rounded-full bg-rose-500/35 blur-3xl -z-10"}),u.jsx("span",{className:"relative inline-block drop-shadow-[0_0_40px_rgba(251,113,133,0.9)]",style:{fontSize:"clamp(2.8rem, 11vw, 5rem)",textShadow:"0 0 32px rgba(244,63,94,1), 0 0 64px rgba(251,113,133,0.65), 0 8px 0 #881337, 0 14px 28px rgba(0,0,0,0.8)"},children:"PON!!"})]})})]})}function yj(){const[t,e]=N.useState(!1),n=EO.taxi_congestion??[];N.useEffect(()=>{e(!1)},[]);const s=n.length>0&&!t?Us(n[0]):null;return u.jsx("div",{className:"fixed inset-0 z-[218] flex flex-col items-center justify-center pointer-events-none px-4 anim-traffic-jam-overlay-fade bg-black/88 backdrop-blur-[4px]","aria-hidden":!0,children:u.jsxs("div",{className:"relative w-full max-w-[min(92vw,1160px)] rounded-2xl border border-amber-500/25 shadow-[0_28px_80px_rgba(0,0,0,0.92)] overflow-hidden bg-slate-950",children:[u.jsx("div",{className:"absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/20 to-black/70 pointer-events-none"}),s?u.jsx("img",{src:s,alt:"",className:"relative z-0 w-full max-h-[min(112vh,1040px)] object-cover object-center",draggable:!1,onError:()=>e(!0)}):u.jsxs("div",{className:"relative z-0 flex min-h-[min(88vh,720px)] w-full items-center justify-center gap-3 bg-slate-900 px-4 text-[clamp(2.5rem,12vw,3.5rem)] leading-none opacity-95",children:[u.jsx("span",{"aria-hidden":!0,children:"🚧"}),u.jsx(Su,{imgClassName:"max-h-[min(56vh,400px)] w-auto max-w-[72%] object-contain opacity-100 drop-shadow-lg"}),u.jsx("span",{"aria-hidden":!0,children:"🚧"})]}),u.jsxs("div",{className:"absolute inset-0 z-[2] flex flex-col items-center justify-end pb-6 pt-16 px-4 pointer-events-none",children:[u.jsxs("p",{className:"text-center font-black anim-traffic-jam-neon text-[clamp(1.25rem,4.5vw,1.85rem)] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]",children:[u.jsx("span",{className:"text-amber-100",children:"渋滞発生！"}),u.jsx("span",{className:"text-slate-200 text-[0.82em] ml-2 tracking-tight font-bold normal-case",children:"(Traffic Jam!)"})]}),u.jsx("p",{className:"mt-2 text-center text-xs font-semibold text-amber-200/85 max-w-md",children:"運転手もため息… メーターだけが無情に刻みます。"})]})]})})}const h0=80;function bj({gs:t,cpGs:e,onDailyAction:n,onOpenDailySlot:s,interactionLocked:a=!1}){if(!e)return null;const i=P.dailySlot.spinBet*P.dailySlot.spins,r=Zt[e.characterType]??Zt.salaryman,l=r.ponMultiplier??1,c=Math.ceil(P.pon.dailyGain*l);e.stats.pon+c;const h=r.workRewardMultiplier??1,d=r.workRewardBonus??0,p=Math.round(Math.floor((P.work.reward+d)*h)*Jc(e.stats.virtue)),g=e.stats.skill+e.stats.luck,y=g>P.stream.combinedStatNoFailThreshold?0:Math.max(0,P.stream.baseFailRate-g/P.stream.combinedStatNoFailThreshold*P.stream.baseFailRate),C=[],I=[];e.stats.luck>=h0&&(C.push("drop-shadow(0 0 10px rgba(250, 204, 21, 0.9))","drop-shadow(0 0 24px rgba(250, 204, 21, 0.72))"),I.push("0 0 14px rgba(250, 204, 21, 0.9)")),e.stats.skill>=h0&&(C.push("drop-shadow(0 0 10px rgba(56, 189, 248, 0.9))","drop-shadow(0 0 24px rgba(56, 189, 248, 0.72))"),I.push("0 0 14px rgba(56, 189, 248, 0.9)")),e.stats.virtue>=h0&&(C.push("drop-shadow(0 0 10px rgba(74, 222, 128, 0.9))","drop-shadow(0 0 24px rgba(74, 222, 128, 0.72))"),I.push("0 0 14px rgba(74, 222, 128, 0.9)"));const O=C.length>0?{filter:`${C.join(" ")} saturate(1.08)`}:void 0,_=I.length>0?{textShadow:I.join(", ")}:void 0;return u.jsxs(u.Fragment,{children:[u.jsxs("h2",{className:"font-semibold",children:[t.currentDay,"日目 行動選択 — ",e.name]}),u.jsxs("div",{className:"rounded-xl border border-cyan-600/45 bg-gradient-to-br from-cyan-950/50 to-slate-900/90 px-3 py-2.5 space-y-2",children:[u.jsxs("div",{className:"flex flex-wrap items-center gap-x-2 gap-y-1",children:[u.jsxs("span",{className:"inline-flex items-center rounded-md border border-cyan-600/50 bg-cyan-950/70 px-2 py-1 text-[11px] font-semibold leading-tight text-cyan-100 shadow-sm",children:["決戦の",Bp,"日目まで",u.jsxs("strong",{className:"mx-1 tabular-nums text-white text-xs",children:["あと ",Bp-t.currentDay," 日"]})]}),u.jsxs("span",{className:"text-[11px] text-slate-500 tabular-nums",children:["育成 ",t.currentDay," / ",Ma," 日"]})]}),u.jsx("div",{className:"flex gap-1 w-full","aria-hidden":"true",children:Array.from({length:Ma},(v,S)=>{const L=S<t.currentDay-1,j=S===t.currentDay-1;return u.jsx("span",{title:`${S+1}日目${j?"（今ここ）":L?"（終了）":""}`,className:"h-2 min-w-[8px] flex-1 rounded-full transition-colors "+(L?"bg-cyan-700/85":j?"bg-cyan-300 ring-1 ring-cyan-100/75 shadow-[0_0_10px_rgba(34,211,238,0.55)]":"bg-slate-700/90")},`daily-progress-${S}`)})})]}),u.jsxs("div",{className:"flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-3",children:[u.jsxs("button",{type:"button",onClick:()=>n("work"),disabled:a,className:"inline-flex items-center gap-2 self-start rounded-xl bg-emerald-500/90 px-5 py-2.5 font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40",children:[u.jsx(UD,{size:18}),"仕事（+",p,"G 目安・善行反映 / 善行+",P.work.virtueGain,"）"]}),u.jsxs("button",{type:"button",onClick:()=>n("stream"),disabled:a,className:"inline-flex w-fit max-w-full flex-col items-start gap-1 self-start rounded-xl bg-violet-500/90 px-5 py-2.5 font-medium text-white text-left transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40",children:[u.jsxs("span",{className:"inline-flex items-center gap-2",children:[u.jsx(sO,{size:18,"aria-hidden":!0}),"配信（内容はランダム）"]}),u.jsxs("span",{className:"text-[11px] font-normal leading-snug text-violet-50/95 pl-[26px] space-y-1 flex flex-col",children:[u.jsxs("span",{children:["失敗；",(y*100).toFixed(0),"% ＋",P.stream.successMin,"Gのみ、ステータス増加なし"]}),u.jsxs("span",{children:["成功；＋",P.stream.successMin,"〜",P.stream.successMax,"G（善行で増加）"]}),u.jsx("span",{className:"pt-0.5",children:"配信タイプ"}),u.jsxs("span",{children:["・雑談；善行＋",P.stream.chat.virtueGainMin,"〜",P.stream.chat.virtueGainMax]}),u.jsxs("span",{children:["・ゲーム；技量 ＋",P.stream.game.skillGainMin,"〜",P.stream.game.skillGainMax]})]})]}),u.jsxs("button",{type:"button",onClick:()=>s==null?void 0:s(),disabled:a||e.stats.money<i,title:a?"演出中は選択できません":e.stats.money<i?`資金から${i}G必要（現在${e.stats.money}G）`:`所持資金から計${i}Gを支払い。スピンごとに技量+${P.dailySlot.skillGainEverySpin}（毎回確定）、役が揃えばさらに+${P.dailySlot.skillGainOnRole}。${P.dailySlot.spinBet}G×${P.dailySlot.spins}回（筐体演出）`,className:"inline-flex w-fit max-w-full flex-col items-start gap-1 self-start rounded-xl bg-fuchsia-600/90 px-5 py-2.5 font-medium text-white text-left hover:bg-fuchsia-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",children:[u.jsxs("span",{className:"inline-flex items-center gap-2",children:[u.jsx(Xu,{size:18,"aria-hidden":!0}),"デイリースロット（資金から-",i,"G／",P.dailySlot.spinBet,"G×",P.dailySlot.spins,"）"]}),u.jsxs("span",{className:"text-[11px] font-normal leading-snug text-fuchsia-50/95 pl-[26px]",children:["技量；スピンごと+",P.dailySlot.skillGainEverySpin,"（ハズレでも）／役成立でさらに+",P.dailySlot.skillGainOnRole]})]}),u.jsxs("button",{type:"button",onClick:()=>n("shrine"),disabled:a,className:"inline-flex items-center gap-2 self-start rounded-xl bg-amber-600/90 px-5 py-2.5 font-medium text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40",children:[u.jsx("span",{className:"text-base leading-none",children:"⛩"}),"神社（-",P.shrine.cost,"G / 運+",P.shrine.luckGain,"）"]})]}),u.jsx("div",{className:"hidden sm:flex min-w-[220px] items-center justify-center self-stretch",children:u.jsx(hf,{characterType:e.characterType,pose:"normal",imgClassName:"h-[330px] w-[210px] object-contain object-center opacity-100 -translate-x-40",spanClassName:"text-8xl leading-none opacity-100",imgStyle:O,spanStyle:_})})]})]})}const MS="/assets/slot-machine-8fe98381.png";function vj({open:t,statsForSpin:e,characterType:n,playerName:s,initialSlotPityCounter:a=0,soundRef:i,onClose:r,onFinished:l}){const[c,h]=N.useState(!1),[d,p]=N.useState(0),[g,y]=N.useState(e),[C,I]=N.useState([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),[O,_]=N.useState([!1,!1,!1]),[v,S]=N.useState(-1),[L,j]=N.useState(!1),[H,T]=N.useState(null),[x,E]=N.useState("idle"),[k,R]=N.useState(!1),[D,w]=N.useState(!1),[ae,_e]=N.useState(!1),[K,te]=N.useState(null),ne=N.useRef(null),pe=N.useRef([!1,!1,!1]),Pe=N.useRef(!1),_t=N.useRef(null),$e=N.useRef([]),Ot=N.useRef(null),mt=N.useRef(0),nt="standard",F=Ia[nt],ie=P.dailySlot.spinBet,se=P.dailySlot.spins,Ne=ie*se;N.useEffect(()=>{t&&(Pe.current=!1,_t.current=e?{...e}:null,$e.current=[],_e(!1),h(!1),p(0),w(!1),te(null),T(null),E("idle"),j(!1),S(-1),_([!1,!1,!1]),pe.current=[!1,!1,!1],I([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),ne.current&&(clearInterval(ne.current),ne.current=null),y(e??null),Ot.current=null,mt.current=a??0)},[t,e,a]),N.useEffect(()=>()=>{ne.current&&clearInterval(ne.current)},[]);const re=Jp.useCallback((ge,le,Ae)=>new Promise(me=>{let Te=[...le.reels];if(le.tier==="miss"){const lt=F.symbols,vt=P.slot.nearMissReachChance,Un=P.slot.slipSymbolChance,Oe=Math.random();if(lt.length>=2&&Oe<vt){const ft=lt[Ue(0,lt.length-1)],Ct=lt.filter(pt=>pt!==ft),Kt=Ct[Ue(0,Ct.length-1)];Te=[ft,ft,Kt]}else if(Oe<vt+Un){const ft=Ue(0,2);Te[ft]=lt[1]}}const st=["jackpot","big","mid"].includes(le.tier)&&Te[0]===Te[1],at=le.tier==="miss"&&Te[0]===Te[1]&&Te[0]!==Te[2],At=st||at,it=Math.max(0,ge.luck-P.slot.luckBaseline),Ln=Math.max(0,ge.skill-P.slot.skillBaseline),Ve=le.tier!=="miss"&&(it>=10||Ln>=10),xe=Te.map((lt,vt)=>Fp(lt,F,vt));R(!0),setTimeout(()=>R(!1),340),h(!0),j(!1),T(null),E("spinning"),pe.current=[!1,!1,!1],_([!1,!1,!1]),I([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),S(-1);const ue=i==null?void 0:i.current;ue==null||ue.playStart(),setTimeout(()=>ue==null?void 0:ue.startSpin(),200),ne.current&&clearInterval(ne.current),ne.current=setInterval(()=>{const lt=pe.current;I(vt=>vt.map((Un,Oe)=>lt[Oe]?Un:RS(F)))},80);const Xn=(lt,vt,Un)=>{if(Un&&Ve&&Math.random()<.5){const ft=kS(vt[1],F),Ct=[vt[0],ft,vt[2]];pe.current[lt]=!0,I(Kt=>{const pt=[...Kt];return pt[lt]=Ct,pt}),S(lt),ue==null||ue.playStop(lt),setTimeout(()=>S(-1),430),setTimeout(()=>{I(Kt=>{const pt=[...Kt];return pt[lt]=vt,pt}),_(Kt=>{const pt=[...Kt];return pt[lt]=!0,pt}),setTimeout(()=>{_(Kt=>{const pt=[...Kt];return pt[lt]=!1,pt})},560)},380)}else pe.current[lt]=!0,I(ft=>{const Ct=[...ft];return Ct[lt]=vt,Ct}),S(lt),ue==null||ue.playStop(lt),setTimeout(()=>S(-1),430)},Wt=1200,En=1700,Nt=At?En+2400:En+550;setTimeout(()=>Xn(0,xe[0],!0),Wt),setTimeout(()=>Xn(1,xe[1],!0),En),At&&setTimeout(()=>{j(!0),E("reach"),setTimeout(()=>ue==null?void 0:ue.playReach(),150)},En+400),setTimeout(()=>{ne.current&&(clearInterval(ne.current),ne.current=null),ue==null||ue.stopSpin(),Xn(2,xe[2],!0),j(!1),I(xe);const lt=le.tier!=="miss";lt?(T(le.tier),E("win"),setTimeout(()=>ue==null?void 0:ue.playWin(le.tier),200),setTimeout(()=>T(null),4e3)):E("miss");const vt=le.payout-le.bet;te({won:lt,title:`${Ae}　${lt?"当たり！":"ハズレ"}`,detail:`${le.message??""}／収支 ${vt>=0?"+":""}${vt}G`}),h(!1),me()},Nt)}),[F,nt,i]),ve=async()=>{if(!t||!e||D||ae||Pe.current||$e.current.length>=se)return;Pe.current=!0;const ge=$e.current.length,le=_t.current??{...e};p(ge+1),y({...le});const Ae=NS(le,ie,nt,0,n,{pityCounter:mt.current});mt.current=Ae.pityCounterAfter??0;try{await re(le,Ae,`第 ${ge+1} / ${se} 回`)}catch(Te){console.error(Te),Pe.current=!1,p(ge);return}$e.current=[...$e.current,Ae];const me=P.dailySlot.skillGainEverySpin+(Ae!=null&&Ae.tier&&Ae.tier!=="miss"?P.dailySlot.skillGainOnRole:0);if(_t.current={...le,money:gn(le.money-Ae.bet+Ae.payout),skill:Tt(le.skill+me)},$e.current.length>=se){const Te=$e.current,st=Te.reduce((At,it)=>At+(it.payout-it.bet),0),at=Te.filter(At=>At.tier!=="miss").length;te({won:st>0,title:st>=0?`合計プラス収支 ${st}G！`:`合計収支 ${st}G`,detail:`${at} / ${Te.length} 回役成立（スピンごと技量 +${P.dailySlot.skillGainEverySpin}／役ごと追加 +${P.dailySlot.skillGainOnRole}）・次へでターン終了`}),Ot.current=Te,w(!0)}Pe.current=!1},ke=async()=>{if(!t||ae||!D)return;const ge=Ot.current;if(!(!Array.isArray(ge)||ge.length!==se)){_e(!0);try{await l(ge),r()}finally{_e(!1)}}};if(!t||!e)return null;const Ge=Math.max(0,(g??e).luck-P.slot.luckBaseline),ze=Math.max(0,(g??e).skill-P.slot.skillBaseline),Ye=Ge>=50?3:Ge>=30?2:Ge>=10?1:0,Cn=ze>=30?2:ze>=10?1:0,Vn=Ye>=1&&Cn>=1,is=c&&(Ye>0||Cn>0);let tn="";is&&(Vn?tn="slot-cabinet-stage--aura-combo":Ye>=3?tn="slot-cabinet-stage--aura-luck3":Ye===2?tn="slot-cabinet-stage--aura-luck2":Ye===1?tn="slot-cabinet-stage--aura-luck1":Cn>=2?tn="slot-cabinet-stage--aura-skill2":Cn===1&&(tn="slot-cabinet-stage--aura-skill1"));const he=n??"salaryman",Se=x==="win"?"anim-char-bounce":x==="reach"?"anim-char-pray":x==="spinning"?"anim-char-wobble":x==="miss"?"anim-char-sad":"",we=!!H,Ke={top:"var(--slot-window-top)",left:"var(--slot-window-left)",width:"var(--slot-window-width)",height:"var(--slot-window-height)"},St=Math.min(se,d+1),oe=ae?"締め処理中…":D?"次へ":c?`回転中… (${d}/${se})`:`${St}回目を回す（${ie}G）`,ee=ae||D||c||d>0;return u.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]",role:"dialog","aria-modal":"true","aria-labelledby":"daily-slot-title",children:u.jsxs("div",{className:"relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-amber-500/40 bg-slate-950 shadow-[0_0_60px_rgba(251,191,36,0.15)]",children:[u.jsx("button",{type:"button",disabled:ee,onClick:r,title:ee&&!ae&&!D?"1回開始したあとは「次へ」で確定するまで閉じられません":void 0,className:"absolute right-3 top-3 z-[110] rounded-lg border border-slate-600 bg-slate-800 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300","aria-label":ee?"閉じる（この段階では使用できません）":"閉じる",children:u.jsx(vS,{size:18})}),u.jsxs("div",{className:"space-y-3 p-4 pt-12",children:[u.jsx("h2",{id:"daily-slot-title",className:"text-lg font-bold text-amber-100",children:"デイリースロット（技能練習）"}),u.jsxs("p",{className:"text-xs text-slate-400 leading-relaxed",children:[s," /",u.jsx("span",{className:"text-slate-500",children:"所持資金から"})," ",u.jsxs("span",{className:"text-amber-200 font-semibold tabular-nums",children:[ie,"G×",se,"回ベット（計",Ne,"G）"]})," · ","8日目スロットと同じ",u.jsx("strong",{className:"text-slate-200",children:"役ごとの配当"}),"・倍率／スピンごと技量+",u.jsx("span",{className:"text-sky-300",children:P.dailySlot.skillGainEverySpin}),"、役成立でさらに+",u.jsx("span",{className:"text-sky-300",children:P.dailySlot.skillGainOnRole})]}),K&&u.jsxs("div",{className:`rounded-xl border px-3 py-3 text-center text-sm font-bold ${K.won?"border-emerald-500/60 bg-emerald-500/15 text-emerald-100":"border-rose-500/55 bg-rose-500/12 text-rose-100"}`,children:[u.jsx("p",{className:"text-base",children:K.title}),u.jsx("p",{className:"mt-1 text-xs font-normal opacity-95",children:K.detail})]}),u.jsxs("div",{className:`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${H==="jackpot"?"anim-jp-rainbow":""}`,children:[H&&H!=="miss"&&u.jsx("div",{className:"absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl",children:Array.from({length:H==="jackpot"?28:H==="big"?16:8},(ge,le)=>u.jsx("span",{style:{position:"absolute",left:`${(le*97+11)%100}%`,top:"-30px",fontSize:H==="jackpot"?"1.6rem":"1.2rem",animation:`coinDrop ${1.4+le*.11%1.2}s ${le*.07%1.1}s ease-in forwards`},children:H==="jackpot"?["🪙","⭐","💎","✨"][le%4]:"🪙"},le))}),u.jsxs("div",{className:"relative z-[8] flex flex-col items-center gap-3 w-full",children:[u.jsxs("div",{className:["slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",k?"slot-cabinet-recoiling":"",tn].filter(Boolean).join(" "),children:[L&&u.jsx("p",{className:"pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse",children:"🎯 REACH!!"}),u.jsxs("div",{className:"slot-machine-stack relative w-full min-h-[200px]",children:[u.jsx("div",{className:"absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none",style:Ke,"aria-hidden":!0}),u.jsx("div",{className:"slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none",style:Ke,children:u.jsx("div",{className:"slot-grid-3x3 flex h-full w-full flex-row",style:{gap:"var(--slot-reel-gap)",padding:"var(--slot-reel-pad-y) var(--slot-reel-pad-x)"},children:C.map((ge,le)=>u.jsx("div",{className:["slot-reel-col relative flex min-h-0 h-full min-w-0 flex-1 flex-col overflow-hidden rounded-sm",v===le?"anim-reel-bounce":"",L&&le===2?"ring-2 ring-amber-400/70 ring-offset-0 rounded-sm":""].filter(Boolean).join(" "),children:u.jsx("div",{className:["slot-reel-strip w-full transition-transform duration-500 ease-out",O[le]?"slot-reel-strip--slip":""].filter(Boolean).join(" "),children:ge.map((Ae,me)=>{const Te=me===1,st=Te&&!pe.current[le]&&c;return u.jsx("div",{className:["slot-cell flex min-h-0 min-w-0 items-center justify-center border border-slate-600/50 text-slate-100",Te?"slot-cell--payline":"slot-cell--edge",Te&&we?"slot-cell--win-pulse":"",me===1?"bg-[color-mix(in_srgb,var(--slot-reel-face)_75%,#272e3d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]":"bg-[color-mix(in_srgb,var(--slot-reel-face)_55%,#0f141c)]",st?"slot-cell--spinning":""].filter(Boolean).join(" "),children:Ae},`${le}-${me}-daily`)})})},le))})}),u.jsx("div",{className:"relative z-[5] w-full pointer-events-none select-none",children:u.jsx("img",{src:MS,alt:"",className:"relative z-[6] block w-full max-w-[440px] mx-auto pointer-events-none",draggable:!1,onError:ge=>{const le=ge.currentTarget,Ae="/";le.src=`${Ae}images/slot-machine.png`}})}),u.jsx("button",{type:"button",title:`${St}回目を回す（${ie}G・全${se}回）`,"aria-label":"スロットを回す",disabled:c||D||ae,className:"absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",style:{top:"var(--slot-spin-top)",left:"var(--slot-spin-left)",width:"var(--slot-spin-w)",height:"var(--slot-spin-h)"},onClick:()=>void ve()})]})]}),u.jsx("div",{className:"relative z-[12] flex justify-center pointer-events-none mt-2",children:u.jsx(Ll,{characterType:he,imgClassName:`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${Se}`,spanClassName:`text-5xl leading-none inline-block ${Se}`})}),H==="jackpot"&&u.jsx("p",{className:"relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse",style:{textShadow:"0 0 20px #fbbf24, 0 0 40px #f59e0b"},children:"🎰 777 JACKPOT!! 🎰"})]})]}),u.jsxs("button",{type:"button","aria-label":ae?"締め処理中":D?"次のプレイヤーへ（ターン終了）":`${St}回目を回す`,disabled:c||ae,onClick:()=>D?void ke():void ve(),className:"flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-40 transition-colors",children:[D?u.jsx(Up,{size:20}):u.jsx(Xu,{size:20}),oe]}),u.jsxs("p",{className:"text-[10px] text-slate-500 text-center",children:["1回ごとにボタンを押して回します（全",se,"回）。最終回のあと「次へ」で結果を送信し、翌手番（または翌日開始）まで進みます。1回目を回したあとは結果確認まで閉じることはできません。"]})]})]})})}function xj({gameState:t,soundRef:e}){const[n,s]=N.useState(()=>Date.now()),a=N.useRef(!1);N.useEffect(()=>{const _=setInterval(()=>s(Date.now()),50);return()=>clearInterval(_)},[]);const i=(t==null?void 0:t.finalBattleStartedAt)!=null?JSON.stringify(t.finalBattleStartedAt):"";N.useEffect(()=>{a.current=!1},[i]);const r=(t==null?void 0:t.players)??[],l=TS(t==null?void 0:t.finalBattleStartedAt),[c]=N.useState(()=>Date.now()),h=Number.isFinite(l)?l:c,d=Math.max(0,n-h),p=d<Vl,g=d>=Vl,y=(t==null?void 0:t.finalBattleEntry)==="preDay8";N.useEffect(()=>{const _=e==null?void 0:e.current;!_||!p||a.current||(a.current=!0,_.tryPlayWarHornIfLoaded())},[p,e]),N.useEffect(()=>{const _=e==null?void 0:e.current;_&&g&&_.stopWarHorn()},[g,e]),N.useEffect(()=>()=>{var _,v;(v=(_=e==null?void 0:e.current)==null?void 0:_.stopWarHorn)==null||v.call(_)},[e]);const C=y?null:r.filter(_=>_.alive)[0]??r[0]??null,I=y?0:C?Math.min(Ft,Math.max(0,C.position)):Math.floor(Ft*.62);N.useEffect(()=>{var _;if(!(!g||y))try{typeof document<"u"&&((_=document.fonts)!=null&&_.ready)&&document.fonts.ready.then(()=>{}).catch(()=>{})}catch{}},[g,y]);const O=N.useMemo(()=>Array.from({length:20},(_,v)=>({id:v,leftPct:5+v*47%90,bottomPct:22+v%7*4,delayMs:v*67%900,durSec:.75+v%6*.13})),[]);return u.jsxs("div",{className:"relative min-h-screen w-full bg-slate-950",children:[!y&&u.jsxs("div",{className:g?"relative z-10 w-full mx-auto px-3 py-4 space-y-3":"fixed inset-0 z-[5] w-full mx-auto px-3 py-4 space-y-3 opacity-0 pointer-events-none overflow-hidden","aria-hidden":!g,children:[g&&u.jsxs("div",{className:"text-center space-y-1",children:[u.jsxs("h2",{className:"text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-violet-100 to-indigo-300 tracking-[0.08em]",style:{fontFamily:"'Zen Old Mincho',serif"},children:["決戦の地",u.jsx("span",{className:"text-slate-400 text-xs md:text-sm ml-2 font-normal tracking-normal",children:"／ 夜ノ神社へ"})]}),u.jsx("p",{className:"text-xs text-indigo-200/65",children:"参道には霧。青く冷たい火屑だけが漂う——"})]}),u.jsx("div",{className:"h-[min(720px,80vh)] min-h-[min(560px,72vh)] overflow-hidden rounded-2xl border border-indigo-800/65 shadow-[0_0_72px_rgba(79,70,229,0.2)] bg-black/40 mx-auto max-w-4xl",children:u.jsx(qp,{players:r,viewPos:I,boardGoal:Ft,isDiceRolling:!1,taxiPhase:null,pieceHopping:!1,currentPlayer:C,visualTheme:"nightShrine",tileEffects:(t==null?void 0:t.sugorokuTileEffects)??null})})]}),p&&y&&u.jsx("div",{className:"fixed inset-0 z-50 flex min-h-[100dvh] w-full items-center justify-center bg-neutral-950 px-5 pointer-events-none",children:u.jsx("h2",{className:"fb-preday8-burn-title text-center px-3 max-w-[min(94vw,40rem)]",children:"決戦の日"})},i),p&&!y&&u.jsxs("div",{className:"fixed inset-0 z-50 overflow-hidden pointer-events-none anim-fb-shake-once isolate",children:[u.jsx("div",{className:"absolute inset-0 bg-neutral-950","aria-hidden":!0}),u.jsx("div",{className:"absolute inset-0 anim-fb-heat-wave","aria-hidden":!0}),u.jsx("div",{className:"absolute inset-0 anim-fb-heat-bg","aria-hidden":!0}),u.jsx("div",{"aria-hidden":!0,className:"anim-fb-flame-sheet anim-fb-flame-sheet-delay pointer-events-none absolute left-1/2 bottom-[14%] w-[118%] max-w-none -translate-x-1/2 h-[72%]",style:{borderRadius:"45% 45% 50% 50%",background:"linear-gradient(to top,#7f1d1d 0%,#b91c1c 28%,#ea580c 58%,rgba(251,191,36,0.5) 88%,transparent 100%)"}}),u.jsx("div",{"aria-hidden":!0,className:"anim-fb-flame-sheet pointer-events-none absolute left-1/2 bottom-[17%] w-[94%] max-w-none -translate-x-1/2 h-[62%]",style:{borderRadius:"48% 48% 50% 50%",mixBlendMode:"screen",background:"linear-gradient(to top,#451a03 0%,#dc2626 35%,#fb923c 65%,rgba(254,249,195,0.55) 95%,transparent 100%)"}}),u.jsx("div",{className:"absolute inset-0 z-[1]","aria-hidden":!0,children:O.map(_=>u.jsx("span",{className:"anim-fb-ember-dot",style:{left:`${_.leftPct}%`,bottom:`${_.bottomPct}%`,"--delay":`${_.delayMs}ms`,"--dur":`${_.durSec}s`}},_.id))}),u.jsx("div",{className:"relative z-10 flex h-full min-h-[100dvh] w-full items-center justify-center px-5",children:u.jsx("h2",{className:"fb-decisive-title text-center px-3 max-w-[min(94vw,40rem)]",children:"決戦の日"})})]},i)]})}const dd="POTENTIAL OVER NEXT SPIN (PONS)",_j=!0,Tj="現在はソロプレイ体験版です。オンラインで仲間と遊ぶ「Next Spin」（マルチプレイ）は開発中です。次のアップデートで解放予定です。",f0="POTENTIAL OVER NEXT SPIN",df="PONS",DS="/images/title_logo.png",Ej="/images/casual_chat_stream.png",wj="/images/game_streaming.png",Sj="/images/work.png";function eu({myFullId:t,copied:e,onCopy:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r}){const[l,c]=N.useState(!1),h=N.useRef(null);if(N.useEffect(()=>{if(!l)return;const g=y=>{h.current&&!h.current.contains(y.target)&&c(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[l]),!t)return null;const d=Math.round(Math.max(0,Math.min(1,s))*100),p=Math.round(Math.max(0,Math.min(1,a))*100);return u.jsxs("div",{ref:h,className:"fixed top-3 right-3 z-[200] flex flex-col items-end gap-1 select-none",children:[u.jsxs("div",{className:"flex max-w-[min(calc(100vw-5.5rem),18rem)] items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-slate-800/95 px-3 py-1.5 shadow-md",children:[u.jsx("span",{className:"truncate font-mono text-xs font-bold text-cyan-300",title:t,children:t}),u.jsx("button",{type:"button",onClick:n,className:`shrink-0 text-sm transition-all ${e?"text-emerald-400":"text-slate-400 hover:text-white"}`,title:"コピー",children:e?"✓":"📋"})]}),u.jsx("div",{className:"flex w-full justify-end pr-0.5",children:u.jsx("button",{type:"button",onClick:()=>c(g=>!g),className:"rounded-lg border border-slate-600 bg-slate-800/90 px-2 py-1 text-base leading-none text-slate-300 hover:bg-slate-700 hover:text-white","aria-expanded":l,"aria-label":"音量設定",title:"音量設定",children:"⚙"})}),l&&u.jsxs("div",{className:"w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-slate-600 bg-slate-950/98 p-3 text-xs text-slate-200 shadow-xl backdrop-blur-sm",children:[u.jsx("p",{className:"mb-2.5 font-semibold text-slate-400",children:"サウンド"}),u.jsxs("label",{className:"mb-3 flex flex-col gap-1.5",children:[u.jsxs("span",{className:"flex justify-between font-medium text-slate-300",children:[u.jsx("span",{children:"効果音"}),u.jsxs("span",{className:"tabular-nums text-cyan-300/90",children:[d,"%"]})]}),u.jsx("input",{type:"range",min:0,max:100,value:d,onChange:g=>i(Number(g.target.value)/100),className:"w-full accent-cyan-500"})]}),u.jsxs("label",{className:"flex flex-col gap-1.5",children:[u.jsxs("span",{className:"flex justify-between font-medium text-slate-300",children:[u.jsx("span",{children:"BGM（タイトル〜待機・育成・8日目）"}),u.jsxs("span",{className:"tabular-nums text-violet-300/90",children:[p,"%"]})]}),u.jsx("input",{type:"range",min:0,max:100,value:p,onChange:g=>r(Number(g.target.value)/100),className:"w-full accent-violet-500"})]})]})]})}function Aj({myFullId:t,copied:e,onCopyMyId:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r,loading:l,onSoloPlay:c,multiOpen:h,onToggleMultiOpen:d,multiAction:p,onSetMultiAction:g,onQuickMatch:y,isPrivateRoom:C,onSetPrivateRoom:I,allowQuickMatch:O,onSetAllowQuickMatch:_,onCreateRoom:v,joinInput:S,onJoinInputChange:L,onJoinRoom:j,onCheckInvites:H,uiError:T,onClearUiError:x}){const E=_j,k=h&&!E;return u.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[u.jsx(eu,{myFullId:t,copied:e,onCopy:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r}),u.jsxs("div",{className:"w-full max-w-md space-y-5 pt-10",children:[u.jsxs("div",{className:"flex flex-col items-center gap-4 text-center",children:[u.jsx("img",{src:Us(DS),alt:dd,className:"mx-auto w-full max-w-[min(92vw,440px)] h-auto object-contain select-none drop-shadow-[0_0_28px_rgba(34,211,238,0.14)]"}),u.jsx("h2",{className:"font-[Rajdhani] text-lg sm:text-xl font-bold tracking-tight text-slate-50 leading-tight px-1",children:dd}),u.jsxs("div",{className:"w-full rounded-xl border border-cyan-500/25 bg-slate-900/80 px-3 py-2.5 text-left",children:[u.jsx("p",{className:"text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400",children:"News · ひとこと"}),u.jsx("p",{className:"mt-1.5 text-xs text-slate-400 leading-relaxed",children:Tj})]})]}),u.jsxs("div",{className:"text-center space-y-1 pt-1",children:[u.jsx("p",{className:"text-xs text-slate-500",children:"ようこそ"}),u.jsx("p",{className:"text-2xl font-bold",children:t||"プレイヤー"}),u.jsx("p",{className:"text-sm text-slate-400",children:"どのように遊びますか？"})]}),u.jsx("button",{type:"button",onClick:c,disabled:l,className:"w-full rounded-2xl bg-gradient-to-br from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 active:scale-[0.98] py-5 font-bold text-white text-xl transition-all disabled:opacity-50 shadow-lg shadow-violet-900/30 flex items-center justify-center gap-3",children:l?u.jsx(Yi,{size:24,className:"animate-spin"}):u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"text-2xl",children:"🎮"}),u.jsx("span",{children:"一人で遊ぶ"})]})}),u.jsxs("div",{className:"relative",children:[u.jsxs("button",{type:"button",disabled:E,"aria-disabled":E,tabIndex:-1,title:"マルチプレイは開発中です",className:["w-full rounded-2xl py-5 font-bold text-xl shadow-lg flex items-center justify-center gap-3 transition-all","pointer-events-none cursor-not-allowed border border-slate-700/90 bg-slate-900/60 text-slate-500 grayscale opacity-[0.52]"].join(" "),children:[u.jsx("span",{className:"text-2xl grayscale",children:"👥"}),u.jsx("span",{className:"opacity-90",children:"みんなで遊ぶ（オンライン）"}),!E]}),u.jsx("div",{className:"pointer-events-none absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-0 px-2","aria-hidden":"true",children:u.jsxs("span",{className:"inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-950/92 px-2.5 py-1 shadow-[0_8px_28px_rgba(0,0,0,0.45)] ring-1 ring-cyan-500/15 backdrop-blur-sm",children:[u.jsx("span",{className:"rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-amber-950 shadow-sm",children:"Coming Soon"}),u.jsx("span",{className:"pr-1 text-[10px] font-bold tracking-wide text-cyan-100/95",children:"準備中"})]})})]}),k&&u.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900 p-4 space-y-3",children:[u.jsxs("button",{type:"button",onClick:y,disabled:l,className:"w-full rounded-xl bg-violet-700 hover:bg-violet-600 active:scale-[0.98] py-3.5 font-semibold text-white transition-all disabled:opacity-50 flex flex-col items-center gap-0.5",children:[u.jsx("span",{className:"text-base font-bold",children:"⚡ クイックマッチ"}),u.jsx("span",{className:"text-xs text-violet-300 opacity-80",children:"空きルームにランダム参加"})]}),u.jsxs("button",{type:"button",onClick:()=>g(R=>R==="create"?null:"create"),className:`w-full rounded-xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 ${p==="create"?"bg-cyan-600 text-white":"bg-slate-800 hover:bg-slate-700 text-slate-200"}`,children:[u.jsx("span",{className:"text-base font-bold",children:"🏠 新しいルームを作成"}),u.jsx("span",{className:"text-xs opacity-60",children:p==="create"?"▲ 閉じる":"ホストとしてルームを立てる ▼"})]}),p==="create"&&u.jsxs("div",{className:"rounded-xl bg-slate-800 border border-slate-700 p-3 space-y-3",children:[u.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[u.jsx("button",{type:"button",onClick:()=>I(!1),className:`rounded-xl py-2.5 text-sm font-semibold transition-all ${C?"bg-slate-700 text-slate-300 hover:bg-slate-600":"bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/60"}`,children:"🌐 公開ルーム"}),u.jsx("button",{type:"button",onClick:()=>I(!0),className:`rounded-xl py-2.5 text-sm font-semibold transition-all ${C?"bg-rose-500 text-white ring-2 ring-rose-400/60":"bg-slate-700 text-slate-300 hover:bg-slate-600"}`,children:"🔒 招待制"})]}),u.jsx("p",{className:"text-xs text-slate-400 text-center",children:C?"招待したIDのみ参加可":"ルームIDを知っていれば誰でも参加可"}),!C&&u.jsxs("div",{className:"flex items-center justify-between rounded-lg bg-slate-700 px-3 py-2.5",children:[u.jsxs("div",{children:[u.jsx("p",{className:"text-sm font-medium",children:"⚡ クイックマッチを受け入れる"}),u.jsx("p",{className:"text-xs text-slate-400",children:"OFFにすると自動マッチングから除外"})]}),u.jsx("button",{type:"button",onClick:()=>_(R=>!R),className:`relative shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${O?"bg-cyan-500":"bg-slate-600"}`,children:u.jsx("div",{className:`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${O?"translate-x-5":"translate-x-0.5"}`})})]}),u.jsx("button",{type:"button",onClick:v,disabled:l,className:"w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 py-2.5 font-bold text-slate-950 transition-colors disabled:opacity-50",children:l?"作成中…":"ルームを作成"})]}),u.jsxs("button",{type:"button",onClick:()=>g(R=>R==="join"?null:"join"),className:`w-full rounded-xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 ${p==="join"?"bg-cyan-600 text-white":"bg-slate-800 hover:bg-slate-700 text-slate-200"}`,children:[u.jsx("span",{className:"text-base font-bold",children:"🔑 ルームIDで参加"}),u.jsx("span",{className:"text-xs opacity-60",children:p==="join"?"▲ 閉じる":"6桁のルーム番号で入室 ▼"})]}),p==="join"&&u.jsx("div",{className:"rounded-xl bg-slate-800 border border-slate-700 p-3 space-y-2",children:u.jsxs("div",{className:"flex gap-2",children:[u.jsx("input",{value:S,onChange:R=>L(R.target.value.toUpperCase()),maxLength:8,onKeyDown:R=>R.key==="Enter"&&j(),className:"flex-1 rounded-lg border border-slate-700 bg-slate-700 px-3 py-2 text-sm text-center font-mono tracking-widest focus:border-cyan-500 focus:outline-none",placeholder:"ルームID",autoFocus:!0}),u.jsx("button",{type:"button",onClick:j,disabled:l,className:"rounded-xl bg-slate-600 hover:bg-slate-500 px-5 py-2 font-medium transition-colors disabled:opacity-50",children:"参加"})]})}),u.jsxs("button",{type:"button",onClick:H,disabled:l,className:"w-full rounded-xl bg-rose-700 hover:bg-rose-600 active:scale-[0.98] py-3.5 font-semibold text-white transition-all disabled:opacity-50 flex flex-col items-center gap-0.5",children:[u.jsx("span",{className:"text-base font-bold",children:"🔔 招待を確認"}),u.jsx("span",{className:"text-xs text-rose-300 opacity-80",children:"自分宛ての招待ルームを探す"})]})]}),T&&u.jsx("div",{className:"rounded-xl border border-rose-500/40 bg-rose-950/35 px-3 py-3 text-left shadow-lg shadow-black/25",role:"alert",children:u.jsxs("div",{className:"flex items-start gap-3",children:[u.jsx("span",{className:"text-base leading-none shrink-0 pt-0.5 opacity-95","aria-hidden":!0,children:"⚠️"}),u.jsx("p",{className:"flex-1 min-w-0 text-sm text-rose-100/95 leading-relaxed",children:T}),typeof x=="function"&&u.jsx("button",{type:"button",onClick:x,className:"shrink-0 rounded-lg p-1.5 text-rose-200/85 hover:bg-rose-500/15 hover:text-rose-50 transition-colors","aria-label":"エラーを閉じる",children:u.jsx(vS,{size:18})})]})}),u.jsxs("div",{className:"rounded-xl bg-slate-800/50 border border-slate-800 p-3 text-xs leading-relaxed text-slate-400 space-y-2.5",children:[u.jsxs("p",{className:"flex items-center gap-2 font-semibold text-slate-300",children:[u.jsx("span",{children:"ゲーム概要"}),u.jsxs("span",{className:"inline-flex items-center gap-1 text-yellow-300 font-bold",children:[u.jsx(wu,{size:14,"aria-hidden":!0}),"お金をたくさん稼いだら勝ち！",u.jsx(wu,{size:14,"aria-hidden":!0})]})]}),u.jsxs("p",{children:[u.jsxs("strong",{className:"text-slate-300",children:["1〜",Ma,"日目は育成パート。"]}),"毎ターン、仕事・配信・神社・デイリースロットのどれかを選び、資金や運・技量・善行などを育てていきます。キャラごとに生活費が異なり、行動後に毎回かかるので、お金の持ちぐあいが勝負の土台になります。"]}),u.jsxs("p",{children:[u.jsx("strong",{className:"text-slate-300",children:"PON"})," は行動のたびに少しずつ溜まり、高めになるとイベントが発生しやすくなります（内容は行動種別によって違うことも）。 配信は運要素が強く、技量や善行が結果に効いてきます。"]}),u.jsxs("p",{children:[u.jsxs("strong",{className:"text-slate-300",children:[Bp,"日目は決戦。"]}),"すごろくでゴールを目指し、素早くゴールするとスロットを長く行えます。"]}),u.jsx("p",{className:"text-[11px] text-slate-500 pt-1 border-t border-slate-700/60 leading-snug",children:"具体的な金額・割合・各ステータスの効き方は、プレイ画面の説明やログで確認できます。"})]})]})]})}function Nj(){const t=N.useMemo(()=>Array.from({length:40},(e,n)=>({id:n,left:(n*97+13)%100,delay:n*37%30/10,dur:2.2+n*17%20/10,sym:n%4===0?"¥":n%4===1?"★":n%4===2?"¥":"◆",size:13+n%5*4,color:n%3===0?"#fbbf24":n%3===1?"#fde68a":"#f59e0b"})),[]);return u.jsx("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-20",children:t.map(e=>u.jsx("span",{className:"absolute anim-particle font-black select-none",style:{left:`${e.left}%`,top:"-40px",fontSize:`${e.size}px`,color:e.color,animationDelay:`${e.delay}s`,animationDuration:`${e.dur}s`},children:e.sym},e.id))})}function Rj(t,e,n){const s=t==="ririm"?"vtuber":t??"salaryman";return e&&n?s==="vtuber"?"Jackpot! My fans are gonna love this clip! ✨":s==="student"?"Whoa, it actually worked! Beginner's luck is real! 🎓":null:e&&!n?s==="vtuber"?"Whaat?! It looked so hot! This game is rigged! 💢":s==="student"?"Wait, that was a miss? But the effect was so flashy...":null:!e&&n?s==="salaryman"?"Calculated. Visual flair isn't everything. 💼":s==="student"?"Huh? I wasn't even watching and I won!":null:null}const Ex=0,kj=2e3,Cj=600,Ij=1e3,Mj=new Set(["vtuber","ririm"]);function Dj({gs:t,cpGs:e,isMyTurn:n,writeGS:s,commitPendingGameState:a,soundRef:i,roomId:r,interactionLocked:l=!1}){var Ke,St;const[c,h]=N.useState(!1),[d,p]=N.useState(["?","?","?"]),[g,y]=N.useState(!1),[C,I]=N.useState(5),[O,_]=N.useState("standard"),[v,S]=N.useState([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),[L,j]=N.useState([!1,!1,!1]),[H,T]=N.useState(-1),[x,E]=N.useState(!1),[k,R]=N.useState(!1),[D,w]=N.useState(!1),[ae,_e]=N.useState(!1),[K,te]=N.useState(null),[ne,pe]=N.useState("idle"),[Pe,_t]=N.useState(!1),[$e,Ot]=N.useState(!1),[mt,nt]=N.useState(0),[F,ie]=N.useState(!1),se=N.useRef(null),Ne=N.useRef([!1,!1,!1]),re=N.useRef(null),ve=N.useRef(null),ke=N.useRef(0),Ge=(t==null?void 0:t.gamePhase)==="playing"&&(t==null?void 0:t.subPhase)==="day8"&&(e==null?void 0:e.movePhase)==="arrived",ze=((St=(Ke=t==null?void 0:t.displayReels)==null?void 0:Ke.join)==null?void 0:St.call(Ke,","))??"",Ye=(t==null?void 0:t.gamePhase)==="playing"&&n&&Ge&&(e==null?void 0:e.slotTurnsLeft)>0&&!l&&!c&&!g;N.useEffect(()=>{if(!Ge||c)return;const oe=t==null?void 0:t.displayReels;if(!Array.isArray(oe)||oe.length!==3)return;const ee=Ia[O]??Ia.standard;S(oe.map((ge,le)=>Fp(ge,ee,le)))},[Ge,c,ze,O,t==null?void 0:t.displayReels]),N.useEffect(()=>{if(!g)return;if(C<=0){const ee=re.current;re.current=null,y(!1),I(5),ee&&r&&a(ee);return}const oe=setTimeout(()=>I(ee=>ee-1),1e3);return()=>clearTimeout(oe)},[g,C,r,a]);const Cn=async()=>{if(l)return;const oe=re.current;re.current=null,y(!1),I(5),oe&&await s(oe)},Vn=async()=>{if(!t||!n||c||l)return;const oe=t.currentPlayerIdx,ee=t.players[oe],ge=[`${ee.name} スロット終了 / 資金${ee.stats.money}G / ランク${Zc(ee.stats.money)}`],le=t.players.map((Ae,me)=>me!==oe?Ae:{...Ae,slotTurnsLeft:0,slotPullsGranted:0,slotPullsThisSeat:0});await s(Jr(t,le,ge))},is=async(oe=fd)=>{if(c||!n||!t||l)return;const ee=t.players[t.currentPlayerIdx];if(ee.slotTurnsLeft<=0)return;const ge=Ia[O]??Ia.standard,le=ee.slotHeat??0,Ae=ee.slotPityCounter??0,me=NS(ee.stats,oe,O,le,ee.characterType,{pityCounter:Ae});let Te=[...me.reels];if(me.tier==="miss"){const Oe=ge.symbols,ft=P.slot.nearMissReachChance,Ct=P.slot.slipSymbolChance,Kt=Math.random();if(Oe.length>=2&&Kt<ft){const pt=Oe[Ue(0,Oe.length-1)],nn=Oe.filter(Ut=>Ut!==pt),Lt=nn[Ue(0,nn.length-1)];Te=[pt,pt,Lt]}else if(Kt<ft+Ct){const pt=Ue(0,2);Te[pt]=Oe[1]}}const{reachPossible:st}=OO(Te,me.tier),at=st&&jO(),At=Math.max(0,ee.stats.luck-P.slot.luckBaseline),it=Math.max(0,ee.stats.skill-P.slot.skillBaseline),Ln=me.tier!=="miss"&&(At>=10||it>=10),Ve=Te.map((Oe,ft)=>Fp(Oe,ge,ft));_t(!0),setTimeout(()=>_t(!1),340),h(!0),E(!1),R(!1),w(!1),_e(!1),ke.current=0,ve.current&&(clearTimeout(ve.current),ve.current=null),te(null),ie(!1),nt(0),pe("spinning"),Ne.current=[!1,!1,!1],j([!1,!1,!1]),S([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),T(-1),p(Te);const xe=i.current;xe==null||xe.playStart(),setTimeout(()=>xe==null?void 0:xe.startSpin(),200),se.current&&clearInterval(se.current),se.current=setInterval(()=>{if(performance.now()<ke.current)return;const Oe=Ne.current;S(ft=>ft.map((Ct,Kt)=>Oe[Kt]?Ct:RS(ge)))},80);const ue=(Oe,ft,Ct)=>{if(Ct&&Ln&&Math.random()<.5){const pt=kS(ft[1],ge),nn=[ft[0],pt,ft[2]];Ne.current[Oe]=!0,S(Lt=>{const Ut=[...Lt];return Ut[Oe]=nn,Ut}),T(Oe),xe==null||xe.playStop(Oe),setTimeout(()=>T(-1),430),setTimeout(()=>{S(Lt=>{const Ut=[...Lt];return Ut[Oe]=ft,Ut}),j(Lt=>{const Ut=[...Lt];return Ut[Oe]=!0,Ut}),setTimeout(()=>{j(Lt=>{const Ut=[...Lt];return Ut[Oe]=!1,Ut})},560)},380)}else Ne.current[Oe]=!0,S(pt=>{const nn=[...pt];return nn[Oe]=ft,nn}),T(Oe),xe==null||xe.playStop(Oe),setTimeout(()=>T(-1),430)},Xn=800,Wt=1e3,En=Wt+Xn,Nt=st?En+2400:En+Xn,lt=at?Math.max(En+480,Nt+Ex):1/0,vt=at?Math.max(Nt+Ex,Math.round(lt+kj)):Nt;setTimeout(()=>ue(0,Ve[0],!0),Wt),setTimeout(()=>ue(1,Ve[1],!0),En),st&&setTimeout(()=>{E(!0),pe("reach"),setTimeout(()=>xe==null?void 0:xe.playReach(),150)},En+400),at&&lt<vt&&(ve.current=setTimeout(()=>{ve.current=null,ke.current=performance.now()+Cj,_e(!0),setTimeout(()=>_e(!1),110),R(!0)},lt));const Un=()=>new Promise(Oe=>{if(!at){R(!1),w(!1),Oe();return}if(me.tier==="miss"){w(!0),xe==null||xe.playReachGaseSting(),setTimeout(()=>{R(!1),w(!1),Oe()},720);return}setTimeout(()=>{R(!1),w(!1),Oe()},200)});setTimeout(async()=>{ve.current&&(clearTimeout(ve.current),ve.current=null),at&&(await Un(),await new Promise(Bt=>setTimeout(Bt,Ij))),clearInterval(se.current),xe==null||xe.stopSpin(),ue(2,Ve[2],!0),E(!1),S(Ve),me.tier!=="miss"?(nt(me.payout),ie(!0),te(me.tier),pe("win"),setTimeout(()=>xe==null?void 0:xe.playWin(me.tier),200),setTimeout(()=>te(null),4e3)):pe("miss");const Oe=me.payout-oe,ft=gn(ee.stats.money-oe+me.payout),Ct=ee.slotTurnsLeft-1,Kt=(ee.slotPullsThisSeat??0)+1,pt=ee.spinCount+1,nn=ee.slotNet+Oe,Lt=le+1,Ut=t.players.map((Bt,$s)=>$s!==t.currentPlayerIdx?Bt:{...Bt,stats:{...Bt.stats,money:ft},slotTurnsLeft:Ct,slotPullsThisSeat:Kt,spinCount:pt,slotNet:nn,slotHeat:Lt,slotPityCounter:me.pityCounterAfter,lastSpinResult:{...me,net:Oe,spin:pt}}),Ri=(Lt*1.5).toFixed(1),Wn=Lt>=10?"🔥 BURNING!!":Lt>=6?"🌡️ 熱くなってきた！":"🌀 台が温まってきた！",oa=Rj(ee.characterType,at,me.tier!=="miss"),Bs=me.pityForced?`  🎯 善行ピティ: 連続ハズレ${me.maxPity}回で今回は役確定（カウンタリセット）`:`  🎯 善行ピティ: ${me.pityCounterAfter}/${me.maxPity}（善行が高いほど天井までの回数が減ります）`,la=[`${ee.name} スロット${pt}回[${ge.emoji}${ge.label}|${oe}G]: ${me.message} / 収支${Oe>=0?"+":""}${Oe}G / 合計${nn>=0?"+":""}${nn}G | JP ${(me.r.jp*100).toFixed(1)}% ハズレ ${(me.r.miss*100).toFixed(1)}%`,Bs,`  技量によりハズレを${(me.r.skillMissReduced*100).toFixed(2)}%削減 / 運：当−${(me.r.luckDrainAtari*100).toFixed(2)}%・小−${(me.r.luckDrainSmall*100).toFixed(2)}%→上位 / 熟成でハズレ${(me.r.heatMissReduced*100).toFixed(2)}%削減`,`  ${Wn} ハズレ確率が${Ri}%ダウン（熟成Lv${Lt}）`];oa&&la.push(`💬 ${ee.name}: 「${oa}」`);const zs={...t,players:Ut,displayReels:Te,showSpinResult:!0,log:ks(la,t.log)};re.current=Jr(zs,Ut,[]),y(!0),I(5),await s(zs),p(me.reels),h(!1)},vt)};if(!e||!Ge)return null;const tn=Math.max(1,P.dice.slotsPerSugorokuTurn),he=e.slotPullsThisSeat??0,Se=Math.min(e.slotTurnsLeft??0,Math.max(0,tn-he)),we="/".replace(/\/?$/,"/");return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:k?"anim-slot-reach-machine-shake":"",children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("h2",{className:"font-semibold",children:["8日目 スロットターン — ",e.name]}),u.jsxs("button",{type:"button",onClick:()=>{var ee;const oe=!$e;Ot(oe),(ee=i.current)==null||ee.setMuted(oe)},title:$e?"ミュート解除":"ミュート",className:`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${$e?"border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500":"border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"}`,children:[$e?u.jsx(cO,{size:14}):u.jsx(oO,{size:14}),$e?"OFF":"ON"]})]}),e.slotTurnsLeft>0||g?u.jsxs("div",{className:"space-y-4",children:[(()=>{const oe=Ia[O]??Ia.standard,ee=e.slotHeat??0,ge=AS(e.stats,oe,ee,e.characterType),le=(ge.heatMissReduced*100).toFixed(1),Ae=ee>=10,me=ee>=6,Te=Ae?"text-red-400":me?"text-orange-400":ee>=3?"text-yellow-400":"text-slate-400",st=Ae?"🔥 BURNING!!":me?"🌡️ 熱い！":ee>=3?"🌀 温まってきた":"❄️ 冷",at=Math.min(100,ee/15*100),At=Ae?"bg-red-500":me?"bg-orange-500":ee>=3?"bg-yellow-500":"bg-slate-600";return u.jsxs("div",{className:"rounded-lg bg-slate-800/50 p-3 text-xs space-y-2",children:[n&&!g&&u.jsx("div",{className:"flex gap-2 flex-wrap pb-1 border-b border-slate-700",children:Object.values(Ia).map(it=>u.jsxs("button",{type:"button",onClick:()=>_(it.key),className:`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors border ${O===it.key?`${it.border} ${it.color}`:"border-slate-700 text-slate-400 hover:border-slate-500"}`,children:[it.emoji," ",it.label]},it.key))}),u.jsxs("div",{className:`rounded-lg border px-3 py-2 space-y-1.5 ${Ae?"border-red-500/60 bg-red-500/10":me?"border-orange-500/50 bg-orange-500/8":"border-slate-700 bg-slate-900/40"}`,children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("span",{className:`font-black text-sm tracking-wide ${Te}`,children:["LUCKY LEVEL ",ee]}),u.jsx("span",{className:`text-xs font-bold ${Te}`,children:st})]}),u.jsx("div",{className:"h-2.5 rounded-full bg-slate-700 overflow-hidden",children:u.jsx("div",{className:`h-full rounded-full transition-all duration-500 ${At} ${Ae?"animate-pulse":""}`,style:{width:`${at}%`}})}),u.jsxs("div",{className:"flex justify-between text-slate-500",style:{fontSize:"10px"},children:[u.jsxs("span",{children:["熟成でハズレから ",le,"% を上位4役へ配分（内訳は右）"]}),u.jsxs("span",{children:["JP+",(ee*.1).toFixed(1),"% / 大当+",(ee*.3).toFixed(1),"% / 中当+",(ee*.5).toFixed(1),"% / 当+",(ee*.6).toFixed(1),"%"]})]})]}),u.jsxs("p",{className:"text-slate-300",children:["現資金 ",u.jsx("span",{className:"font-bold text-white text-base",children:e.stats.money}),"G",e.spinCount>0&&u.jsxs("span",{className:`ml-2 font-semibold ${e.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:["スロット収支: ",e.slotNet>=0?"+":"",e.slotNet,"G"]})]}),(()=>{const it=Math.max(0,e.stats.luck-P.slot.luckBaseline),Ln=Math.max(0,e.stats.skill-P.slot.skillBaseline),Ve=Ln>=P.slot.skillBlockSize?Math.floor(Ln/P.slot.skillBlockSize):0,xe=it>0,ue=Ve>0;return xe||ue?u.jsxs("div",{className:"flex gap-1.5 flex-wrap",children:[xe&&u.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 px-2 py-0.5 text-[10px] font-bold text-yellow-300",children:["✨ 運：運100で当−2%・小−3%→JP・大（現在+",it,"点 → 当最大−",(P.slot.luckAtariDrainAtLuck100*100*it/P.slot.luckRefSpan).toFixed(1),"%・小最大−",(P.slot.luckSmallDrainAtLuck100*100*it/P.slot.luckRefSpan).toFixed(1),"%）"]}),ue&&u.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-[10px] font-bold text-sky-300",children:["⚙️ 技量：満",P.slot.skillBlockSize,"点ごとハズレ",(P.slot.skillMissReducePerBlock*100).toFixed(1),"%→中",(P.slot.skillToMid*100).toFixed(0),"%・当",(P.slot.skillToAtari*100).toFixed(0),"%・小",(P.slot.skillToSmall*100).toFixed(0),"%（",Ve,"段 × ",(P.slot.skillMissReducePerBlock*100).toFixed(1),"%＝最大",(Ve*P.slot.skillMissReducePerBlock*100).toFixed(1),"%）"]})]}):null})(),u.jsxs("p",{className:"text-slate-500",style:{fontSize:"10px"},children:["[",oe.emoji,oe.label,"] JP ",u.jsxs("span",{className:"text-yellow-400 font-semibold",children:[(ge.jp*100).toFixed(2),"%"]}),"  /  ","大当 ",u.jsxs("span",{className:"text-amber-400 font-semibold",children:[(ge.big*100).toFixed(2),"%"]}),"  /  ","中当 ",u.jsxs("span",{className:"text-emerald-400 font-semibold",children:[(ge.mid*100).toFixed(2),"%"]}),"  /  ","当 ",u.jsxs("span",{className:"text-cyan-400 font-semibold",children:[(ge.atari*100).toFixed(2),"%"]}),"  /  ","小当 ",u.jsxs("span",{className:"text-slate-300 font-semibold",children:[(ge.small*100).toFixed(2),"%"]}),"  /  ","ハズレ ",u.jsxs("span",{className:"text-rose-400 font-semibold",children:[(ge.miss*100).toFixed(1),"%"]})]}),u.jsxs("p",{className:"text-slate-500 border-t border-slate-700/80 pt-1.5 mt-1",style:{fontSize:"10px"},children:["再配分内訳：技量でハズレ ",u.jsxs("span",{className:"text-sky-400 font-semibold",children:["−",(ge.skillMissReduced*100).toFixed(2),"%"]})," · ","運で小役→上位 ",u.jsxs("span",{className:"text-yellow-400 font-semibold",children:[(ge.luckConverted*100).toFixed(2),"%"]})," · ","熟成でハズレ ",u.jsxs("span",{className:"text-orange-400 font-semibold",children:["−",(ge.heatMissReduced*100).toFixed(2),"%"]})]})]})})(),(()=>{const oe=e.slotHeat??0,ee=oe>=10?"anim-heat-burning":oe>=6?"anim-heat-warm":"",ge=e.characterType??"salaryman",le=ne==="win"?"anim-char-bounce":ne==="reach"?"anim-char-pray":ne==="spinning"?"anim-char-wobble":ne==="miss"?"anim-char-sad":"",Ae=Math.max(0,e.stats.luck-P.slot.luckBaseline),me=Math.max(0,e.stats.skill-P.slot.skillBaseline),Te=Ae>=50?3:Ae>=30?2:Ae>=10?1:0,st=me>=30?2:me>=10?1:0,at=Te>=1&&st>=1,At=c&&(Te>0||st>0);let it="";At&&(at?it="slot-cabinet-stage--aura-combo":Te>=3?it="slot-cabinet-stage--aura-luck3":Te===2?it="slot-cabinet-stage--aura-luck2":Te===1?it="slot-cabinet-stage--aura-luck1":st>=2?it="slot-cabinet-stage--aura-skill2":st===1&&(it="slot-cabinet-stage--aura-skill1"));const Ln=!!K,Ve={top:"var(--slot-window-top)",left:"var(--slot-window-left)",width:"var(--slot-window-width)",height:"var(--slot-window-height)"};return u.jsxs("div",{className:`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${ee} ${K==="jackpot"?"anim-jp-rainbow":""}`,children:[K&&K!=="miss"&&u.jsx("div",{className:"absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl",children:Array.from({length:K==="jackpot"?28:K==="big"?16:8},(xe,ue)=>u.jsx("span",{style:{position:"absolute",left:`${(ue*97+11)%100}%`,top:"-30px",fontSize:K==="jackpot"?"1.6rem":"1.2rem",animation:`coinDrop ${1.4+ue*.11%1.2}s ${ue*.07%1.1}s ease-in forwards`},children:K==="jackpot"?["🪙","⭐","💎","✨"][ue%4]:"🪙"},ue))}),u.jsx("div",{className:"relative z-[8] flex flex-col items-center gap-3 w-full",children:u.jsxs("div",{className:["slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",Pe?"slot-cabinet-recoiling":"",it].filter(Boolean).join(" "),children:[F&&mt>0&&u.jsx("div",{className:"pointer-events-none absolute top-1/2 z-[42] flex -translate-y-1/2 items-center pl-2 sm:pl-3",style:{left:"100%"},"aria-live":"polite","aria-atomic":"true",children:u.jsxs("span",{role:"presentation",className:"anim-slot-payout-popup font-black tabular-nums leading-none tracking-tight text-[#ffe566]",style:{fontSize:"clamp(2.5rem, min(14vw, 5rem), 5rem)",WebkitTextStroke:"2px rgba(120,53,15,0.85)",paintOrder:"stroke fill",textShadow:"0 0 2px #000, 0 2px 0 #854d0e, 0 4px 12px rgba(0,0,0,0.75), 0 0 28px rgba(250,204,21,0.75), 0 0 48px rgba(234,179,8,0.45)"},onAnimationEnd:()=>{ie(!1),nt(0)},children:["+",mt,"G"]})}),x&&u.jsx("p",{className:"pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse",children:"🎯 REACH!!"}),u.jsxs("div",{className:"slot-machine-stack relative w-full min-h-[200px]",children:[u.jsx("div",{className:"absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none",style:Ve,"aria-hidden":!0}),u.jsxs("div",{className:"slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none",style:Ve,children:[u.jsx("div",{className:"slot-grid-3x3 flex h-full w-full flex-row",style:{gap:"var(--slot-reel-gap)",padding:"var(--slot-reel-pad-y) var(--slot-reel-pad-x)"},children:v.map((xe,ue)=>u.jsx("div",{className:["slot-reel-col relative flex min-h-0 h-full min-w-0 flex-1 flex-col overflow-hidden rounded-sm",H===ue?"anim-reel-bounce":"",x&&ue===2?"ring-2 ring-amber-400/70 ring-offset-0 rounded-sm":""].filter(Boolean).join(" "),children:u.jsx("div",{className:["slot-reel-strip w-full transition-transform duration-500 ease-out",L[ue]?"slot-reel-strip--slip":""].filter(Boolean).join(" "),children:xe.map((Xn,Wt)=>{const En=Wt===1,Nt=En&&!Ne.current[ue]&&c;return u.jsx("div",{className:["slot-cell flex min-h-0 min-w-0 items-center justify-center border border-slate-600/50 text-slate-100",En?"slot-cell--payline":"slot-cell--edge",En&&Ln?"slot-cell--win-pulse":"",Wt===1?"bg-[color-mix(in_srgb,var(--slot-reel-face)_75%,#272e3d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]":"bg-[color-mix(in_srgb,var(--slot-reel-face)_55%,#0f141c)]",Nt?"slot-cell--spinning":""].filter(Boolean).join(" "),children:Xn},`${ue}-${Wt}`)})})},ue))}),u.jsx("div",{className:"slot-win-line","aria-hidden":!0}),u.jsx("span",{className:"slot-payline-marker slot-payline-marker--l","aria-hidden":!0,children:"▶"}),u.jsx("span",{className:"slot-payline-marker slot-payline-marker--r","aria-hidden":!0,children:"◀"}),u.jsx("div",{className:"slot-reel-vignette","aria-hidden":!0})]}),At&&u.jsxs("div",{className:"pointer-events-none absolute z-[2] mix-blend-screen overflow-hidden rounded-sm",style:Ve,"aria-hidden":!0,children:[(Te>=2||at)&&Array.from({length:at?14:10},(xe,ue)=>u.jsx("span",{className:"absolute text-[11px]",style:{left:`${(ue*71+13)%94}%`,top:`${(ue*47+11)%88}%`,opacity:at?.5:.45,animation:`sparkle ${.42+ue%3*.08}s ease-in-out ${ue%6*.06}s infinite`,filter:at?"drop-shadow(0 0 4px #fde047)":"drop-shadow(0 0 3px rgba(253,224,71,0.8))"},children:at&&ue%3===0?"✨":"✦"},`cab-spark-${ue}`)),st>=1&&!at&&Te===0&&Array.from({length:8},(xe,ue)=>u.jsx("span",{className:"absolute text-[10px] text-emerald-200/90",style:{left:`${(ue*83+19)%92}%`,top:`${ue*59%86}%`,opacity:.4,animation:`auraSparkFloat ${2+ue%4*.15}s linear ${ue*.12}s infinite`},children:"✦"},`cab-sk-${ue}`))]}),u.jsx("div",{className:"slot-cabinet-img-wrap relative z-[10] mx-auto w-full max-w-full pointer-events-none",children:u.jsx("img",{src:MS,alt:"",decoding:"async",draggable:!1,className:"slot-cabinet-img mx-auto block h-auto w-full max-w-full select-none pointer-events-none",onError:xe=>{const ue=xe.currentTarget,Xn="/".replace(/\/?$/,"/"),Wt=ue.dataset.cabinetImgTry??"0";Wt==="0"?(ue.dataset.cabinetImgTry="1",ue.src=`${Xn}assets/images/slot-machine.png`):Wt==="1"&&(ue.dataset.cabinetImgTry="2",ue.src=`${Xn}images/slot-machine.png`)}})}),u.jsx("button",{type:"button",title:"SPIN（100G・筐体）","aria-label":"スロットを回す（100G）",disabled:!Ye,className:"absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",style:{top:"var(--slot-spin-top)",left:"var(--slot-spin-left)",width:"var(--slot-spin-w)",height:"var(--slot-spin-h)"},onClick:()=>is(fd)})]})]})}),u.jsx("div",{className:"relative z-[12] flex justify-center pointer-events-none mt-2",children:u.jsx(Ll,{characterType:ge,imgClassName:`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${le}`,spanClassName:`text-5xl leading-none inline-block ${le}`})}),K==="jackpot"&&u.jsx("p",{className:"relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse",style:{textShadow:"0 0 20px #fbbf24, 0 0 40px #f59e0b"},children:"🎰 777 JACKPOT!! 🎰"})]})})(),t.showSpinResult&&e.lastSpinResult&&u.jsxs("div",{className:`rounded-xl border p-3 text-sm ${e.lastSpinResult.tier==="jackpot"?"border-amber-400/60 bg-amber-400/10 text-amber-200":e.lastSpinResult.tier==="miss"?"border-slate-700 bg-slate-800/50 text-slate-400":"border-emerald-400/40 bg-emerald-400/10 text-emerald-200"}`,children:[u.jsx("p",{className:"font-semibold",children:e.lastSpinResult.message}),u.jsxs("p",{className:"text-xs mt-1",children:[e.lastSpinResult.spin,"回目 / 収支",e.lastSpinResult.net>=0?"+":"",e.lastSpinResult.net,"G / JP率 ",(e.lastSpinResult.r.jp*100).toFixed(1),"% / ハズレ率"," ",(e.lastSpinResult.r.miss*100).toFixed(1),"%"]}),u.jsxs("p",{className:"text-[10px] mt-1 text-slate-500 leading-snug",children:["技量でハズレ −",((e.lastSpinResult.r.skillMissReduced??0)*100).toFixed(2),"% / 運で小役→上位"," ",((e.lastSpinResult.r.luckConverted??0)*100).toFixed(2),"% / 熟成でハズレ −",((e.lastSpinResult.r.heatMissReduced??0)*100).toFixed(2),"%"]})]}),u.jsxs("div",{className:"flex flex-col gap-1.5",children:[(e.slotTurnsLeft>0||g)&&u.jsx("div",{className:"w-full rounded-lg bg-amber-500/15 border border-amber-400/35 px-3 py-1.5 text-center",children:u.jsxs("span",{className:"text-lg font-black tabular-nums text-amber-100",children:["残り ",Se,"/",tn]})}),u.jsx("div",{className:"flex gap-3 flex-wrap",children:g?u.jsxs("button",{type:"button",onClick:Cn,disabled:l,className:"inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 animate-pulse",children:[u.jsx(Up,{size:18}),"確認（",C,"秒で自動進行）"]}):u.jsxs(u.Fragment,{children:[gO.map(oe=>{const ee=!Ye,ge=oe===100?"bg-cyan-600 hover:bg-cyan-500":oe===300?"bg-violet-600 hover:bg-violet-500":oe===500?"bg-amber-500 hover:bg-amber-400":"bg-rose-600 hover:bg-rose-500";return u.jsxs("button",{type:"button",onClick:()=>is(oe),disabled:ee,className:`inline-flex items-center gap-1.5 rounded-xl ${ge} px-4 py-2.5 font-semibold text-white transition-colors disabled:opacity-40`,children:[u.jsx(Xu,{size:16}),c?"…":u.jsxs("span",{className:"flex flex-col items-start leading-tight",children:[u.jsxs("span",{children:[oe,"G"]}),e.stats.money<oe&&u.jsx("span",{className:"text-[9px] font-normal opacity-80",children:"←借金プレイ"})]})]},oe)}),u.jsxs("button",{type:"button",onClick:Vn,disabled:c||l,className:"inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600 transition-colors disabled:opacity-40",children:[u.jsx(Up,{size:16}),"終了・次へ"]})]})})]})]}):u.jsx("p",{className:"text-sm text-slate-400",children:"スロット回数を全て使いました。"})]}),k&&u.jsxs("div",{className:["slot-reach-cutin-full",D?"slot-reach-cutin-full--gase":""].filter(Boolean).join(" "),"aria-hidden":!0,children:[u.jsx("div",{className:"slot-reach-cutin-full-speed"}),u.jsx("div",{className:"slot-reach-cutin-full-dim"}),u.jsx("div",{className:"slot-reach-cutin-full-vignette"}),u.jsx("div",{className:"slot-reach-cutin-full-scan slot-reach-cutin-full-scan--top"}),u.jsx("div",{className:"slot-reach-cutin-full-scan slot-reach-cutin-full-scan--bottom"}),u.jsx("div",{className:"slot-reach-cutin-full-frame"}),u.jsxs("div",{className:"slot-reach-cutin-full-center",children:[u.jsxs("div",{className:"slot-reach-cutin-hero",children:[u.jsx("div",{className:"slot-reach-cutin-hero-bar","aria-hidden":!0}),Mj.has(e==null?void 0:e.characterType)?u.jsx("img",{alt:"",decoding:"async",draggable:!1,src:`${we}images/chance_rrm.png`,className:"select-none",onError:oe=>{const ee=oe.currentTarget;(ee.dataset.chanceCutinTry??"0")==="0"&&(ee.dataset.chanceCutinTry="1",ee.src=`${we}assets/images/chance_rrm.png`)}}):u.jsx(Ll,{characterType:(e==null?void 0:e.characterType)??"salaryman",imgClassName:"",spanClassName:"select-none block mx-auto text-[clamp(4rem,18vw,8rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]"}),u.jsx("div",{className:"slot-reach-cutin-hero-bar slot-reach-cutin-hero-bar--bottom","aria-hidden":!0})]}),u.jsx("p",{className:"slot-reach-cutin-full-chance-tag font-black",children:"チャンス！！"})]})]}),ae&&u.jsx("div",{className:"fixed inset-0 z-[10060] pointer-events-none anim-slot-reach-cutin-white-flash","aria-hidden":!0})]})}const Oj="#EFFF42";function wx(t){return Number.isFinite(t)?Math.max(0,Math.min(1,t)):0}function jj({label:t,value:e,min:n,max:s,suffix:a="",hideNumeric:i=!1,barFillPercent:r=null,barShuffle:l=!1,showMaxRollGlow:c=!1,showScaleRange:h=!1,scaleRangeLabel:d="",overviewHint:p="",className:g=""}){const y=s>n?s-n:1,C=wx((Number(e)-n)/y),I=r!=null&&Number.isFinite(Number(r))?wx(Number(r)/100)*100:C*100,O=d||`${Math.round(n)}${a}〜${Math.round(s)}${a}`,_=u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx("span",{className:"w-10 shrink-0 text-right text-[13px] font-bold tracking-tight text-slate-100",children:t}),u.jsxs("div",{className:`relative h-[26px] min-w-0 flex-1 overflow-hidden border-[2px] border-black bg-white shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.06)] transition-[box-shadow] duration-300 ${c?"lobby-gauge-max-ring":""}`,children:[u.jsx("div",{className:`absolute left-0 top-0 z-[1] h-full origin-left ${l?"lobby-gauge-fill-shuffle":"transition-[width] duration-500 ease-in-out"}`,style:{width:`${I}%`,backgroundColor:Oj}}),u.jsx("div",{className:"pointer-events-none absolute bottom-[3px] left-[6px] right-[6px] z-[2] h-px bg-black"}),[20,40,60,80].map((v,S)=>{const L=S===0||S===3;return u.jsx("div",{className:"pointer-events-none absolute bottom-[3px] z-[2] w-px bg-black",style:{left:`${v}%`,height:L?"70%":"42%",transform:"translateX(-50%)"}},v)})]}),u.jsx("span",{className:"w-[52px] shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-slate-200",children:i?`—${a}`:`${Math.round(Number(e))}${a}`})]}),h?u.jsxs("div",{className:"flex items-start gap-2",children:[u.jsx("span",{className:"w-10 shrink-0","aria-hidden":!0}),u.jsx("p",{className:"min-w-0 flex-1 text-center text-[9px] tabular-nums leading-tight text-slate-500",children:O}),u.jsx("span",{className:"w-[52px] shrink-0","aria-hidden":!0})]}):null]});return p?u.jsxs("div",{className:`group/stat-hint relative flex flex-col gap-0.5 ${g}`,children:[u.jsx("div",{className:"cursor-help rounded-md px-0.5 py-0.5 outline-none ring-offset-2 ring-offset-slate-900 transition-colors hover:bg-slate-800/40 focus-visible:ring-2 focus-visible:ring-cyan-500/50",tabIndex:0,children:_}),u.jsx("div",{role:"tooltip",className:"pointer-events-none absolute left-1/2 top-full z-[100] mt-1 w-max max-w-[min(288px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-left text-[11px] leading-snug text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-0 transition-opacity duration-150 delay-75 invisible group-hover/stat-hint:opacity-100 group-hover/stat-hint:visible group-hover/stat-hint:delay-0 group-focus-within/stat-hint:opacity-100 group-focus-within/stat-hint:visible group-focus-within/stat-hint:delay-0",children:p})]}):u.jsx("div",{className:`flex flex-col gap-0.5 ${g}`,children:_})}const Sx="salaryman",mf=3,d0=mf+1,rl=[{id:"luck",label:"運",valueKey:"luck",rollKey:"luckRoll",suffix:"",rangeKey:"luck",overview:"運気の強さです。伸びるとすごろくのダイスなどで追い風になりやすくなります。一定値を超えるとダイスが増える！？"},{id:"skill",label:"技量",valueKey:"skill",rollKey:"skillRoll",suffix:"",rangeKey:"skill",overview:"腕前やコツのイメージです。スロットでは当たりやすさなどに効いてきます。"},{id:"virtue",label:"善行",valueKey:"virtue",rollKey:"virtueRoll",suffix:"",rangeKey:"virtue",overview:"善行の蓄えです。ダイスや日常イベントで「最低限ここまで」が変わるなど、行動の土台に効きます。"},{id:"pon",label:"PON",valueKey:"pon",rollKey:"ponRoll",suffix:"",rangeKey:"pon",overview:"ストレスや無謀さの目安です。高まると荒れた展開に振れやすくなります。"},{id:"livingCost",label:"生活費",valueKey:"livingCost",rollKey:"livingRoll",suffix:"G",rangeKey:"livingCost",overview:"暮らしの固定費です。日が進むたびにこの負担がのしかかり、資金との攻防になります。"}];function Pj(t){const e=$p(t);return{luck:e.luck.min,skill:e.skill.min,virtue:e.virtue.min,pon:e.pon.min,livingCost:e.livingCost.min}}function Vj(t,e){const n=Pj(e),s={...n};if(!t||typeof t!="object")return s;for(const a of Object.keys(n)){const i=t[a];Number.isFinite(Number(i))&&(s[a]=Number(i))}return{...t,...s}}function Ax(t,e){const n=Ky(t,e);return{luck:n.luck,skill:n.skill,virtue:n.virtue,pon:n.pon,livingCost:n.livingCost,luckRoll:t.luck,skillRoll:t.skill,virtueRoll:t.virtue,ponRoll:t.pon,livingRoll:wS(t)}}const OS=148,jS=72,Lj=jS+OS*(rl.length-1);function Lo(t){return`${Math.max(0,Math.min(100,t)).toFixed(3)}%`}function Uj(t,e){const n=e>0?t/e*100:100;return`
@keyframes dice-roll-sync {
  0% {
    transform: translate(-110px, -55px) rotate(0deg) scale(0.82);
    filter: drop-shadow(12px 18px 8px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.35));
  }
  ${Lo(n*.38)} {
    transform: translate(-52px, 14px) rotate(210deg) scale(1);
    filter: drop-shadow(10px 14px 10px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  ${Lo(n*.72)} {
    transform: translate(10px, -24px) rotate(460deg) scale(1.08);
    filter: drop-shadow(8px 12px 12px rgba(0, 0, 0, 0.42)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.22));
  }
  ${Lo(n*.94)} {
    transform: translate(0, 0) rotate(660deg) scale(1);
    filter: drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.25));
  }
  ${Lo(n)} {
    transform: translate(0, 0) rotate(720deg) scale(1);
    filter: drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.48)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  ${Lo(n+(100-n)*.42)} {
    transform: translate(0, -12px) rotate(738deg) scale(1.05);
    filter: drop-shadow(12px 22px 18px rgba(0, 0, 0, 0.32)) drop-shadow(0 0 18px rgba(255, 255, 255, 0.32));
  }
  ${Lo(n+(100-n)*.78)} {
    transform: translate(0, 3px) rotate(720deg) scale(1);
    filter: drop-shadow(8px 12px 14px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  100% {
    transform: translate(0, 0) rotate(720deg) scale(1);
    filter: drop-shadow(8px 14px 16px rgba(0, 0, 0, 0.48)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
  }
}
.dice-roll-sync {
  animation-name: dice-roll-sync;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.25, 0.82, 0.38, 1);
  will-change: transform, filter;
}
@media (prefers-reduced-motion: reduce) {
  .dice-roll-sync {
    animation: none !important;
    transform: none !important;
    filter: drop-shadow(8px 14px 14px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.25)) !important;
  }
}
`}function Nx(t){const e=(s,a)=>s+Math.random()*(a-s),n=()=>Math.floor(Math.random()*6);return{luck:e(t.luck.min,t.luck.max),skill:e(t.skill.min,t.skill.max),virtue:e(t.virtue.min,t.virtue.max),pon:e(t.pon.min,t.pon.max),livingCost:e(t.livingCost.min,t.livingCost.max),luckRoll:n(),skillRoll:n(),virtueRoll:n(),ponRoll:n(),livingRoll:n()}}function Bj(t,e,n){const s={...t};for(let a=0;a<=n;a++){const{valueKey:i,rollKey:r}=rl[a];s[i]=e[i],s[r]=e[r]}return s}const zj=`
@keyframes lobby-gauge-fill-shuffle {
  0%, 100% { transform: translateX(0) scaleX(1); }
  20% { transform: translateX(6%) scaleX(1.04); }
  45% { transform: translateX(-10%) scaleX(0.92); }
  70% { transform: translateX(8%) scaleX(1.06); }
}
.lobby-gauge-fill-shuffle {
  animation: lobby-gauge-fill-shuffle 0.09s linear infinite;
}
@keyframes lobby-gauge-max-ring {
  0% { box-shadow: inset 0 0 0 1px rgba(239,255,66,0.95), 0 0 6px 2px rgba(239,255,66,0.65); }
  40% { box-shadow: inset 0 0 10px 4px rgba(239,255,66,0.85), 0 0 18px 6px rgba(239,255,66,0.95); }
  100% { box-shadow: inset 0 0 0 0 transparent, 0 0 0 0 transparent; }
}
.lobby-gauge-max-ring {
  animation: lobby-gauge-max-ring 0.65s ease-out 1;
}
@keyframes ririm-secret-shimmer {
  0%, 100% {
    border-color: rgba(167, 139, 250, 0.55);
    box-shadow:
      inset 0 0 28px rgba(139, 92, 246, 0.22),
      0 0 18px rgba(244, 114, 182, 0.25);
    filter: saturate(1.05);
  }
  50% {
    border-color: rgba(244, 114, 182, 0.75);
    box-shadow:
      inset 0 0 38px rgba(244, 114, 182, 0.28),
      0 0 28px rgba(250, 204, 21, 0.35);
    filter: saturate(1.14);
  }
}
.ririm-secret-card {
  animation: ririm-secret-shimmer 1.65s ease-in-out infinite;
}
@keyframes ririm-secret-glitter {
  0% { transform: translateY(8px) scale(0.82); opacity: 0; }
  24% { opacity: 0.95; }
  62% { transform: translateY(-10px) scale(1.08); opacity: 0.8; }
  100% { transform: translateY(-24px) scale(1.22); opacity: 0; }
}
.ririm-secret-glitter {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.ririm-secret-glitter span {
  position: absolute;
  color: rgba(253, 224, 71, 0.95);
  text-shadow: 0 0 10px rgba(250, 204, 21, 0.72);
  animation: ririm-secret-glitter 1.8s ease-in-out infinite;
}
.ririm-secret-glitter span:nth-child(1) { left: 10%; bottom: 8%; animation-delay: 0s; }
.ririm-secret-glitter span:nth-child(2) { left: 36%; bottom: 12%; animation-delay: 0.35s; }
.ririm-secret-glitter span:nth-child(3) { left: 62%; bottom: 10%; animation-delay: 0.75s; }
.ririm-secret-glitter span:nth-child(4) { left: 84%; bottom: 14%; animation-delay: 1.1s; }
@media (prefers-reduced-motion: reduce) {
  .ririm-secret-card {
    animation: none;
  }
  .ririm-secret-glitter span {
    animation: none;
    opacity: 0.6;
  }
}
`;function Rx({playerSlots:t,myId:e,onSelectCharacter:n,onCommitInitialRolls:s,soundRef:a,waitingSessionKey:i,unlockPlayerNameForSecret:r,onSecretCharacterSelected:l}){const c=t.find(re=>re.id===e),h=(c==null?void 0:c.character)??null,d=N.useMemo(()=>{const re=(c==null?void 0:c.name)??"",ve=r??"";return Wc(re)||Wc(ve)},[c==null?void 0:c.name,r]),p=N.useMemo(()=>Object.values(Zt).filter(re=>re.key!==Xc||d),[d]),[g,y]=N.useState(null),[C,I]=N.useState(0),[O,_]=N.useState(()=>ff()),[v,S]=N.useState(!1),[L,j]=N.useState(!1),[H,T]=N.useState(null),[x,E]=N.useState(()=>new Set),[k,R]=N.useState(920),[D,w]=N.useState(""),[ae,_e]=N.useState(!1),K=N.useRef([]),te=N.useRef(null);N.useEffect(()=>()=>{K.current.forEach(re=>{clearInterval(re),clearTimeout(re)}),K.current=[]},[]);const ne=Math.max(0,mf-Math.max(0,C-1)),pe=C<d0&&!v,Pe=h??Sx,_t=$p(Pe);N.useLayoutEffect(()=>{v||(y(null),I(0),_(ff()),T(null),j(!1),_e(!1),w(""),E(new Set))},[i]);const $e=mi(c==null?void 0:c.initialRolls),Ot=$e?`${$e.luck}-${$e.skill}-${$e.virtue}-${$e.pon}`:"";N.useEffect(()=>{v||$e&&(y($e),_($e),I(re=>Math.max(re,1)))},[Ot,v]);const mt=Ax(g??O,Pe),nt=H??Vj(mt,Pe),F=(nt==null?void 0:nt.roll)!=null?nt.roll:null,ie=re=>new Promise(ve=>{const ke=setTimeout(ve,re);K.current.push(ke)}),se=async re=>{if(v)return;if(re===Xc&&(l==null||l()),!(mi(c==null?void 0:c.initialRolls)!=null)){const ke=g??O,Ge=mi({luck:ke.luck,skill:ke.skill,virtue:ke.virtue,pon:ke.pon});if(Ge){await n(re,Ge),y(Ge),_(Ge),I(ze=>Math.max(ze,1));return}}await n(re)},Ne=async()=>{var Cn,Vn,is,tn,he;if(!pe||v)return;const re=h??Sx,ve=ff(),ke=Ax(ve,re),Ge=$p(re),ze=a==null?void 0:a.current;let Ye=null;try{const Se=Math.round(800+Math.random()*200),we=Se+Lj;w(Uj(Se,we)),R(we),_e(!0),S(!0),j(!0),E(new Set),Ye=((Cn=ze==null?void 0:ze.startDiceRoll)==null?void 0:Cn.call(ze))??null;let Ke=Nx(Ge);T(Ke),await new Promise(ee=>{let ge=!1,le;const Ae=setInterval(()=>{Ke=Nx(Ge),T({...Ke})},46);K.current.push(Ae),le=setTimeout(()=>{ge||(ge=!0,clearInterval(Ae),clearTimeout(le),ee())},Se),K.current.push(le)}),te.current&&clearTimeout(te.current),te.current=setTimeout(()=>{te.current=null,_e(!1)},we+200),K.current.push(te.current),(Vn=Ye==null?void 0:Ye.stop)==null||Vn.call(Ye),Ye=null,j(!1);let St=Ke;T({...St});for(let ee=0;ee<rl.length;ee++){await ie(ee===0?jS:OS),St=Bj(St,ke,ee),T({...St});const ge=rl[ee].rollKey,le=ke[ge];if((is=ze==null?void 0:ze.playDiceTick)==null||is.call(ze),le===5){(tn=ze==null?void 0:ze.playDiceMaxSpark)==null||tn.call(ze);const Ae=rl[ee].id;E(Te=>new Set(Te).add(Ae));const me=setTimeout(()=>{E(Te=>{const st=new Set(Te);return st.delete(Ae),st})},720);K.current.push(me)}}if(!await s({luck:ve.luck,skill:ve.skill,virtue:ve.virtue,pon:ve.pon}))return;y(ve),I(ee=>ee+1)}finally{(he=Ye==null?void 0:Ye.stop)==null||he.call(Ye),te.current&&(clearTimeout(te.current),te.current=null),_e(!1),w(""),S(!1),j(!1),T(null)}};return u.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3",children:[u.jsxs("style",{children:[zj,D]}),u.jsxs("div",{className:"rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-3 space-y-3",children:[u.jsx("p",{className:"text-xs font-bold text-cyan-400",children:"ステータス・ゲージ（プレビュー）"}),u.jsxs("p",{className:"text-[11px] text-slate-400 leading-snug",children:[u.jsx("strong",{className:"text-slate-200",children:"①キャラ選択"}),"すると、ダイス（raw）がまだサーバーに無い場合は",u.jsx("strong",{className:"text-slate-200",children:"いま画面上の値がそのまま確定して同期"}),"します（試行1回相当）。必要なら下の",u.jsx("strong",{className:"text-slate-200",children:"ダイス演出付きで再抽選"}),"。 ゲージは",u.jsx("strong",{className:"text-slate-200",children:"いま選んでいるキャラ"}),"換算のプレビューです。",u.jsxs("strong",{className:"text-slate-200",children:["再抽選は最大",mf,"回"]}),"（キャラで初回同期を含め計",d0,"試行まで）。"]}),u.jsx("div",{className:"space-y-2",children:rl.map(re=>{const ve=_t[re.rangeKey],ke=re.valueKey,Ge=re.rollKey,ze=nt[ke]??ve.min,Ye=nt[Ge],Cn=Ye!=null&&Number.isFinite(Number(Ye))?Number(Ye):F!=null&&Number.isFinite(Number(F))?Number(F):null,Vn=Ye!=null&&Number.isFinite(Number(Ye))?Number(Ye)/5*100:0;return u.jsx(jj,{label:re.label,value:ze,min:ve.min,max:ve.max,barFillPercent:Vn,hideNumeric:!1,suffix:re.suffix,barShuffle:L,showMaxRollGlow:x.has(re.id)&&Cn===5,overviewHint:re.overview},`${i}-${re.id}`)})}),u.jsxs("div",{className:"relative pt-1",children:[ae&&u.jsx("div",{role:"presentation","aria-hidden":!0,className:"pointer-events-none absolute left-1 top-1/2 z-30 flex h-[80px] w-[80px] -translate-y-1/2 items-center justify-center dice-roll-sync sm:left-2 sm:h-[88px] sm:w-[88px]",style:{animationDuration:`${k}ms`},onAnimationEnd:re=>{String(re.animationName||"").includes("dice-roll-sync")&&(te.current&&(clearTimeout(te.current),te.current=null),_e(!1))},children:u.jsx("div",{className:"flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border-[3px] border-neutral-900 bg-gradient-to-b from-white via-neutral-50 to-neutral-200 shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_2px_0_rgba(255,255,255,0.95)] sm:h-[80px] sm:w-[80px]",children:u.jsx(Xu,{className:"h-[52px] w-[52px] text-neutral-950 sm:h-14 sm:w-14",strokeWidth:2.35})})}),u.jsxs("div",{className:"space-y-1.5",children:[u.jsx("button",{type:"button",onClick:()=>void Ne(),disabled:!pe||v,className:`w-full rounded-lg border-2 border-black bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-400 py-2.5 text-center text-[13px] font-black leading-tight text-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-[filter,padding] hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 ${ae?"pl-[4.25rem] sm:pl-24":""}`,children:v?"抽選中…":C===0?"ステータス抽選を試す（ダイス演出付き）":"再抽選"}),u.jsxs("p",{className:"text-center text-[11px] text-slate-400",children:["再抽選できる回数：",u.jsx("span",{className:"tabular-nums font-semibold text-slate-200",children:ne}),"／",mf,"回（初回はキャラまたは上の抽選で確定。合計の確定回数は上限",d0,"回）"]})]})]})]}),u.jsx("p",{className:"text-xs font-semibold text-slate-400",children:"キャラクターを選択"}),u.jsx("div",{className:"grid grid-cols-2 gap-3",children:p.map(re=>{const ve=h===re.key,ke=h===re.key,Ge=re.key===Xc&&d;return u.jsxs("button",{type:"button",onClick:()=>void se(re.key),disabled:v,className:`relative overflow-hidden rounded-xl border p-3 text-left transition-all disabled:opacity-50 ${Ge?"ririm-secret-card border-fuchsia-400/50 bg-violet-950/40":""} ${ke?`${re.border} ring-2 ring-offset-1 ring-offset-slate-900 ring-cyan-500`:"border-slate-700 bg-slate-800/50 hover:border-slate-600"}`,children:[Ge&&u.jsx("span",{className:"absolute right-2 top-2 z-[1] rounded-full bg-gradient-to-r from-fuchsia-600 to-amber-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-md",children:"Secret"}),Ge&&u.jsxs("span",{className:"ririm-secret-glitter","aria-hidden":!0,children:[u.jsx("span",{children:"✦"}),u.jsx("span",{children:"✧"}),u.jsx("span",{children:"✦"}),u.jsx("span",{children:"✧"})]}),u.jsx("div",{className:"mb-1 flex min-h-[2.5rem] items-center justify-center",children:u.jsx(Ll,{characterType:re.key,imgClassName:"h-10 w-10 object-contain",spanClassName:"text-2xl"})}),u.jsx("div",{className:`text-sm font-semibold ${ve?re.color:"text-slate-300"}`,children:re.label}),u.jsx("div",{className:"text-xs text-slate-400 mt-1 leading-relaxed",children:re.desc})]},re.key)})})]})}function $j({waitingSessionKey:t=0,myFullId:e,copied:n,onCopyMyId:s,roomData:a,roomId:i,playerSlots:r,myId:l,isHost:c,onReturnToLobby:h,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,onStartGame:y,loading:C,uiError:I,inviteInput:O,onInviteInputChange:_,inviteError:v,onInvitePlayer:S,seVolume:L,bgmVolume:j,onSeVolumeChange:H,onBgmVolumeChange:T,unlockPlayerNameForSecret:x,onSecretCharacterSelected:E}){var w;const k=r.find(ae=>ae.id===l),R=!!mi(k==null?void 0:k.initialRolls),D=r.length>0&&r.every(ae=>mi(ae.initialRolls));return u.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[u.jsx(eu,{myFullId:e,copied:n,onCopy:s,seVolume:L,bgmVolume:j,onSeVolumeChange:H,onBgmVolumeChange:T}),a!=null&&a.isSolo?u.jsxs("div",{className:"w-full max-w-md space-y-6",children:[u.jsxs("div",{className:"relative text-center",children:[u.jsx("button",{type:"button",onClick:h,className:"absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors",children:"← 戻る"}),u.jsx("h2",{className:"text-2xl font-bold",children:"🎮 一人で遊ぶ"})]}),u.jsx(Rx,{waitingSessionKey:t,playerSlots:r,myId:l,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,unlockPlayerNameForSecret:x,onSecretCharacterSelected:E}),u.jsx("button",{type:"button",onClick:y,disabled:C||!(k!=null&&k.character)||!R,className:"w-full rounded-xl bg-cyan-500 py-4 font-bold text-slate-950 text-lg hover:bg-cyan-400 transition-colors disabled:opacity-40",children:C?"開始中…":"準備完了 · ゲームスタート"}),I&&u.jsx("p",{className:"text-sm text-rose-400 text-center",children:I})]}):u.jsxs("div",{className:"w-full max-w-md space-y-5 pt-10",children:[u.jsxs("div",{className:"relative text-center",children:[u.jsx("button",{type:"button",onClick:h,className:"absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors",children:"← 戻る"}),u.jsx("h2",{className:"text-2xl font-bold",children:"ルーム待機中"}),u.jsx("p",{className:"text-sm text-slate-400 mt-1",children:"ルームIDを友達に共有してください"})]}),u.jsxs("div",{className:"rounded-2xl border border-cyan-500/40 bg-cyan-500/5 p-5 text-center space-y-2",children:[u.jsx("p",{className:"text-xs text-slate-400",children:"ルームID"}),u.jsx("p",{className:"text-4xl font-bold tracking-[0.3em] text-cyan-400 font-mono",children:i}),u.jsx("span",{className:`inline-block text-xs font-semibold rounded-full px-3 py-0.5 ${a!=null&&a.isPrivate?"bg-rose-500/20 text-rose-300 border border-rose-500/40":"bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"}`,children:a!=null&&a.isPrivate?"🔒 プライベート（招待制）":"🌐 公開"})]}),u.jsxs("div",{className:"rounded-xl border border-cyan-500/40 bg-cyan-500/8 px-4 py-3 space-y-1.5",children:[u.jsx("p",{className:"text-xs text-cyan-400 font-semibold",children:"🪪 あなたの招待ID（ホストへ共有してください）"}),u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx("span",{className:"flex-1 font-mono text-base font-bold text-white truncate select-all",children:e}),u.jsx("button",{type:"button",onClick:s,className:`shrink-0 rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${n?"bg-emerald-500 text-white scale-95":"bg-cyan-600 hover:bg-cyan-500 text-white"}`,children:n?"コピーしました！✓":"📋 コピー"})]}),u.jsx("p",{className:"text-xs text-slate-500",children:"このIDをホストの「招待するプレイヤー」欄に入力してもらってください"})]}),u.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-2",children:[u.jsxs("p",{className:"text-xs text-slate-400 mb-2",children:["参加済みプレイヤー (",r.length,"/4)"]}),r.map((ae,_e)=>u.jsxs("div",{className:"flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2",children:[u.jsxs("span",{className:"text-sm font-medium",children:[_e+1,". ",ae.name]}),ae.fullId&&u.jsxs("span",{className:"text-xs text-slate-500 font-mono",children:["#",ae.fullId.split("#")[1]]}),ae.id===(a==null?void 0:a.hostId)&&u.jsx("span",{className:"text-xs text-amber-400 ml-auto",children:"ホスト"}),ae.id===l&&u.jsx("span",{className:"text-xs text-cyan-400 ml-auto border border-cyan-400/40 rounded px-1",children:"YOU"})]},ae.id)),r.length<2&&u.jsxs("p",{className:"text-xs text-slate-500 text-center pt-1 flex items-center justify-center gap-2",children:[u.jsx(Yi,{size:12,className:"animate-spin"}),"他のプレイヤーを待っています… (1人でも開始できます)"]})]}),u.jsx(Rx,{waitingSessionKey:t,playerSlots:r,myId:l,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,unlockPlayerNameForSecret:x,onSecretCharacterSelected:E}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2",children:[u.jsx("p",{className:"text-[11px] font-semibold text-slate-500 mb-1.5",children:"全員のキャラ選択状況"}),u.jsx("div",{className:"space-y-1",children:r.map(ae=>{const _e=ae.character,K=_e?Zt[_e]:null;return u.jsxs("div",{className:"flex items-center gap-2 text-xs text-slate-400",children:[u.jsxs("span",{children:[ae.name,ae.id===l?" (YOU)":""]}),u.jsx("span",{className:"ml-auto flex items-center gap-1",children:_e?u.jsxs(u.Fragment,{children:[u.jsx(Ll,{characterType:_e,imgClassName:"h-4 w-4 object-contain shrink-0",spanClassName:"text-sm leading-none"}),u.jsx("span",{className:K.color,children:K.label})]}):u.jsx("span",{className:"text-amber-400/90 font-medium",children:"未選択"})})]},ae.id)})})]}),c&&(a==null?void 0:a.isPrivate)&&u.jsxs("div",{className:"rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-3",children:[u.jsx("p",{className:"text-xs font-semibold text-rose-300",children:"🔒 招待管理（ホスト専用）"}),u.jsxs("div",{children:[u.jsx("label",{className:"text-xs text-slate-300 font-medium block mb-1.5",children:"招待するプレイヤー（Name#ID）"}),u.jsxs("div",{className:"flex gap-2",children:[u.jsx("input",{value:O,onChange:ae=>_(ae.target.value),onKeyDown:ae=>ae.key==="Enter"&&S(),className:"flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-mono focus:border-rose-400 focus:outline-none",placeholder:"例: 闇月リリム#1234"}),u.jsx("button",{type:"button",onClick:S,className:"rounded-xl bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 text-sm font-bold transition-colors",children:"招待"})]}),u.jsx("p",{className:"text-xs text-slate-500 mt-1.5",children:"※ 相手の画面に表示されている「Name#ID」を全文コピーして入力してください"}),v&&u.jsx("p",{className:"text-xs text-rose-400 mt-1",children:v})]}),((w=a.allowedPlayers)==null?void 0:w.length)>0&&u.jsxs("div",{className:"space-y-1",children:[u.jsxs("p",{className:"text-xs text-slate-500",children:["招待済み (",a.allowedPlayers.length,"名)"]}),a.allowedPlayers.map(ae=>u.jsxs("div",{className:"flex items-center gap-2 rounded bg-slate-800 px-2 py-1 text-xs font-mono text-slate-300",children:[u.jsx("span",{className:"text-emerald-400",children:"✓"})," ",ae]},ae))]})]}),c?u.jsx("button",{type:"button",onClick:y,disabled:r.length<1||C||r.some(ae=>!ae.character)||!D,className:"w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40",children:C?"開始中…":`準備完了 · ゲームスタート（${r.length}人）`}):u.jsxs("p",{className:"text-center text-sm text-slate-400 flex items-center justify-center gap-2",children:[u.jsx(Yi,{size:14,className:"animate-spin"}),"ホストがゲームを開始するのを待っています…"]}),I&&u.jsx("p",{className:"text-sm text-rose-400 text-center",children:I})]})]})}function Fj({mode:t,gold:e,stat:n}){if(t!=="chat"&&t!=="game")return null;const s=Us(t==="chat"?Ej:wj),a=t==="game"?"ゲーム配信":"雑談配信";return u.jsx("div",{className:"fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-slate-950 pointer-events-auto","aria-hidden":!0,role:"presentation",children:u.jsxs("div",{className:"relative z-[2] flex flex-col items-center justify-center px-5",children:[u.jsxs("div",{className:"relative rounded-2xl border-2 border-cyan-400 bg-slate-900 p-4 sm:p-5",children:[u.jsx("p",{className:"absolute left-1/2 top-2 z-[3] -translate-x-1/2 rounded-full border border-cyan-300/70 bg-slate-950/75 px-3 py-1 text-xs font-black tracking-wide text-cyan-100 sm:text-sm",children:a}),u.jsx("img",{src:s,alt:"",className:"max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_32px_rgba(34,211,238,0.55)] opacity-100",draggable:!1})]}),u.jsxs("div",{className:"mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]",children:[u.jsxs("p",{className:"text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums",children:["＋",e,"ゴールド"]}),n?u.jsxs("p",{className:"mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-cyan-200 tabular-nums",children:[n.label," ＋",n.delta]}):null]})]})})}function Hj({gold:t,stat:e,characterType:n}){const a=Us(n==="vtuber"||n==="ririm"?"/images/work_ririmu.png":Sj);return u.jsx("div",{className:"fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-slate-950 pointer-events-auto","aria-hidden":!0,role:"presentation",children:u.jsxs("div",{className:"relative z-[2] flex flex-col items-center justify-center px-5",children:[u.jsx("div",{className:"rounded-2xl border-2 border-amber-400 bg-slate-900 p-4 sm:p-5",children:u.jsx("img",{src:a,alt:"",className:"max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_28px_rgba(251,191,36,0.45)] opacity-100",draggable:!1})}),u.jsxs("div",{className:"mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]",children:[u.jsxs("p",{className:"text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums",children:["＋",t,"ゴールド"]}),e?u.jsxs("p",{className:"mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-amber-200 tabular-nums",children:[e.label," ＋",e.delta]}):null]})]})})}const kx=`
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes hop {
    0%   { transform: translateY(0px)   scaleX(1)    scaleY(1); }
    20%  { transform: translateY(-16px) scaleX(0.88) scaleY(1.12); }
    50%  { transform: translateY(-26px) scaleX(0.85) scaleY(1.15); }
    72%  { transform: translateY(0px)   scaleX(1.25) scaleY(0.75); }
    84%  { transform: translateY(-7px)  scaleX(0.95) scaleY(1.07); }
    93%  { transform: translateY(0px)   scaleX(1.06) scaleY(0.96); }
    100% { transform: translateY(0px)   scaleX(1)    scaleY(1); }
  }
  /* 低振幅・高周波の振動（画面をガクッとさせない） */
  @keyframes screenShake {
    0%,100% { transform: translate3d(0, 0, 0); }
    25% { transform: translate3d(1.2px, -0.9px, 0); }
    50% { transform: translate3d(-1px, 1.1px, 0); }
    75% { transform: translate3d(0.9px, 0.8px, 0); }
  }
  @keyframes breathe {
    0%,100% { transform: translateY(0px) scale(1); }
    50%      { transform: translateY(-5px) scale(1.08); }
  }
  @keyframes roadScroll {
    from { transform: translateY(-44px) scale(0.96); filter: blur(1.5px); opacity: 0.55; }
    to   { transform: translateY(0)     scale(1);    filter: blur(0);     opacity: 1;    }
  }
  .anim-road-scroll { animation: roadScroll 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
  @keyframes taxiSlideIn {
    from { transform: translateY(100%) scale(0.25); opacity: 0; }
    to   { transform: translateY(0%)   scale(1);    opacity: 1; }
  }
  @keyframes taxiDrive {
    from { transform: translateY(0%)    scale(1);    opacity: 1; }
    to   { transform: translateY(-220%) scale(0.04); opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse-scale {
    0%,100% { transform: scale(1); }
    50%     { transform: scale(1.15); }
  }
  @keyframes countTick {
    0%   { transform: scale(1.4); color: #facc15; }
    100% { transform: scale(1);   color: inherit; }
  }
  .anim-float   { animation: float   1.8s ease-in-out infinite; }
  .anim-hop     { animation: hop     0.65s cubic-bezier(0.36,0.07,0.19,0.97) forwards; }

  /* ── すごろく：駒移動中の背景スクロール・カメラ追従・高速ブラー ── */
  @keyframes sugorokuBgTravelForward {
    0% {
      transform: scale(1.05) translate3d(-1.25%, 10px, 0);
      filter: blur(0px);
    }
    100% {
      transform: scale(1.05) translate3d(1.25%, -16px, 0);
      filter: blur(0px);
    }
  }
  @keyframes sugorokuBgTravelBack {
    0% {
      transform: scale(1.05) translate3d(1.25%, -12px, 0);
      filter: blur(0px);
    }
    100% {
      transform: scale(1.05) translate3d(-1.25%, 14px, 0);
      filter: blur(0px);
    }
  }
  @keyframes sugorokuBgTravelForwardFast {
    0% {
      transform: scale(1.08) translate3d(-2.5%, 16px, 0);
      filter: blur(2.4px);
    }
    100% {
      transform: scale(1.08) translate3d(2.5%, -24px, 0);
      filter: blur(1px);
    }
  }
  @keyframes sugorokuBgTravelBackFast {
    0% {
      transform: scale(1.08) translate3d(2.5%, -20px, 0);
      filter: blur(2.2px);
    }
    100% {
      transform: scale(1.08) translate3d(-2.5%, 20px, 0);
      filter: blur(1px);
    }
  }
  .sugoroku-bg-motion-img--active.sugoroku-bg-motion-img--fwd:not(.sugoroku-bg-motion-img--fast) {
    animation: sugorokuBgTravelForward var(--sugoroku-step-ms, 360ms) linear infinite;
    will-change: transform, filter;
  }
  .sugoroku-bg-motion-img--active.sugoroku-bg-motion-img--back:not(.sugoroku-bg-motion-img--fast) {
    animation: sugorokuBgTravelBack var(--sugoroku-step-ms, 360ms) linear infinite;
    will-change: transform, filter;
  }
  .sugoroku-bg-motion-img--active.sugoroku-bg-motion-img--fwd.sugoroku-bg-motion-img--fast {
    animation: sugorokuBgTravelForwardFast var(--sugoroku-step-ms, 110ms) linear infinite;
    will-change: transform, filter;
  }
  .sugoroku-bg-motion-img--active.sugoroku-bg-motion-img--back.sugoroku-bg-motion-img--fast {
    animation: sugorokuBgTravelBackFast var(--sugoroku-step-ms, 110ms) linear infinite;
    will-change: transform, filter;
  }

  .sugoroku-seamless-bg {
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  @keyframes sugorokuSpeedLinesShift {
    0% { transform: translate3d(0, 0, 0); opacity: 0.38; }
    50% { transform: translate3d(-14px, 1px, 0); opacity: 0.5; }
    100% { transform: translate3d(-28px, 0, 0); opacity: 0.38; }
  }
  .sugoroku-speed-lines-overlay {
    animation: sugorokuSpeedLinesShift 1.15s linear infinite;
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 6;
    border-radius: inherit;
    overflow: hidden;
    background: repeating-linear-gradient(
      102deg,
      transparent 0,
      transparent 20px,
      rgba(255, 255, 255, 0.075) 20px,
      rgba(255, 255, 255, 0.075) 24px
    );
    mix-blend-mode: overlay;
    opacity: 0.38;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 12%,
      black 88%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 12%,
      black 88%,
      transparent 100%
    );
  }

  @keyframes standeeWalkRhythm {
    0%, 100% { transform: translateY(0) scaleY(1); }
    33% { transform: translateY(-5px) scaleY(1.02); }
    66% { transform: translateY(-2px) scaleY(0.98); }
  }
  .standee-piece.anim-standee-walk {
    animation: standeeWalkRhythm var(--standee-walk-ms, 420ms) ease-in-out infinite;
    will-change: transform;
  }

  @keyframes engineVibrate {
    0%, 100% { transform: translate3d(0, 0, 0); }
    33% { transform: translate3d(0.42px, -0.34px, 0); }
    66% { transform: translate3d(-0.4px, 0.3px, 0); }
  }
  .anim-engine-vibrate {
    animation: engineVibrate 0.068s linear infinite;
    will-change: transform;
  }
  .anim-vibrate {
    animation: engineVibrate 0.068s linear infinite;
    will-change: transform;
  }

  @keyframes tileEffectFloatBob {
    0%, 100% { transform: translateY(0); opacity: 0.94; }
    50%      { transform: translateY(-3px); opacity: 1; }
  }
  .anim-tile-effect-float {
    animation: tileEffectFloatBob 1.6s ease-in-out infinite;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .anim-shake   { animation: screenShake 0.48s ease-out forwards; }
  .anim-breathe { animation: breathe 2.8s ease-in-out infinite; }
  .anim-taxi-in { animation: taxiSlideIn 0.55s ease-out forwards; }
  .anim-taxi-go { animation: taxiDrive   0.65s ease-in  forwards; }

  /* タクシー：画面左上から進入してカーブ側に停車 */
  @keyframes taxiApproachNW {
    0% { transform: translate3d(-125%, -100%, 0) rotate(-11deg) scale(0.48); opacity: 0.5; }
    100% { transform: translate3d(0, 0, 0) rotate(0) scale(1); opacity: 1; }
  }
  .anim-taxi-approach-nw {
    animation: taxiApproachNW 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    transform-origin: 50% 80%;
  }
  /* タイル上：キャラのすぐ左から進入 */
  @keyframes taxiApproachFromLeftOfTile {
    0% { transform: translate3d(-130%, 0, 0) scale(0.55); opacity: 0.45; }
    100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
  }
  .anim-taxi-approach-tile-left {
    animation: taxiApproachFromLeftOfTile 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    transform-origin: 80% 100%;
  }
  /* タクシー：エンジン微振動後、画面下へ加速 */
  @keyframes taxiAccelerateDown {
    0% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
    10% { transform: translate3d(-2px, 3px, 0) scale(1.04); }
    18% { transform: translate3d(2px, -2px, 0) scale(1.03); }
    26% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(0, 125vh, 0) scale(0.86); opacity: 0.2; }
  }
  .anim-taxi-accelerate-down {
    animation: taxiAccelerateDown 1.1s cubic-bezier(0.22, 0.1, 0.12, 1) forwards;
    transform-origin: 50% 50%;
  }
  /* 到着タイル：停車 →（駒フェード後）退場（計 1.8s — App.jsx TIMING.arrive と同期） */
  @keyframes taxiArriveParkOnly {
    from { transform: translate3d(-12%, 36%, 0) scale(0.8); opacity: 0; }
    to { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
  }
  @keyframes taxiExitFromPark {
    from { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
    to { transform: translate3d(0, 118vh, 0) scale(0.9); opacity: 0; }
  }
  /* 到着：内側＝停車、外側＝退場（transform を分離して競合回避） */
  .anim-taxi-arrive-park-inner {
    animation: taxiArriveParkOnly 0.4s cubic-bezier(0.33, 0.12, 0.24, 1) forwards;
    transform-origin: 80% 100%;
  }
  .anim-taxi-arrive-exit-wrapper {
    animation: taxiExitFromPark 0.9s cubic-bezier(0.22, 0.1, 0.12, 1) 0.9s forwards;
    transform-origin: 80% 100%;
  }
  /* タイル左：上からタクシーが降りてくる（乗車.enter） */
  @keyframes taxiFromAboveLeftOfTile {
    0% {
      transform: translate3d(0, -115%, 0) scale(0.68);
      opacity: 0;
    }
    35% {
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
  }
  .anim-taxi-from-above-left-of-tile {
    animation: taxiFromAboveLeftOfTile 0.82s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    transform-origin: 70% 100%;
  }
  /* enter 終了後・boarding：進入キーフレームの最終フレームを固定 */
  .taxi-approach-parked {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
    transform-origin: 70% 100%;
  }
  /* キャラ：タクシー方向（左）へ寄りながらフェード（乗車.boarding） */
  @keyframes taxiCharBoardIntoCab {
    from {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
    to {
      transform: translate3d(-38px, -14px, 0) scale(0.88);
      opacity: 0;
    }
  }
  .taxi-boarding-char-to-cab {
    animation: taxiCharBoardIntoCab 0.4s ease-in 0.08s forwards;
  }
  /* 駒：搭乗時フェードのみ */
  @keyframes taxiPieceBoardingFade {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  .taxi-piece-boarding-fade .taxi-piece-boarding-fade-target {
    animation: taxiPieceBoardingFade 0.5s ease-out forwards;
  }
  /* 駒：到着タイルで不透明化（停車 0.4s 後から 0.55s、やや長めに判読しやすく） */
  @keyframes taxiPieceArriveFadeIn {
    from { opacity: 0; transform: translate3d(0, 6px, 0) scale(0.96); }
    to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  }
  .taxi-piece-arrive-fadein .taxi-piece-arrive-fadein-target {
    opacity: 0;
    animation: taxiPieceArriveFadeIn 0.55s ease-out 0.42s forwards;
  }
  @keyframes taxiStutter {
    0% { transform: translate3d(0, 0, 0); }
    12% { transform: translate3d(-3px, 0, 0); }
    24% { transform: translate3d(2px, 1px, 0); }
    35% { transform: translate3d(0, 0, 0); }
    48% { transform: translate3d(-4px, -1px, 0); }
    60% { transform: translate3d(3px, 0, 0); }
    72% { transform: translate3d(-2px, 0, 0); }
    85% { transform: translate3d(1px, 0, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  .anim-taxi-stutter {
    animation: taxiStutter 0.85s ease-in-out infinite;
    will-change: transform;
  }
  @keyframes pulseRideshare {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.04); opacity: 0.92; }
  }
  .anim-pulse-taxi-ride {
    animation: pulseRideshare 1.2s ease-in-out infinite;
  }
  .anim-fadein  { animation: fadeIn      0.5s  ease-out forwards; }
  .anim-tick    { animation: countTick   0.35s ease-out; }
  .taxi-dark    { background: rgba(0,0,0,0.88); }

  /* ── ダイス確定ポップ ── */
  @keyframes dicePop {
    0%   { transform: scale(1.5); }
    50%  { transform: scale(0.92); }
    100% { transform: scale(1); }
  }
  .anim-dice-pop { animation: dicePop 0.35s cubic-bezier(0.36,0.07,0.19,0.97) both; }

  /* ── 運80以上 ゴールデングロー ── */
  @keyframes goldenGlow {
    0%,100% { filter: drop-shadow(0 0 5px #fbbf24) drop-shadow(0 0 14px rgba(251,191,36,0.65)) drop-shadow(0 4px 8px rgba(0,0,0,0.9)); }
    50%     { filter: drop-shadow(0 0 10px #fde68a) drop-shadow(0 0 24px rgba(251,191,36,0.95)) drop-shadow(0 4px 8px rgba(0,0,0,0.9)); }
  }
  @keyframes sparkle {
    0%,100% { opacity: 0; transform: scale(0.2) rotate(0deg); }
    45%,55% { opacity: 1; transform: scale(1.3) rotate(180deg); }
  }
  .anim-golden-glow { animation: goldenGlow 1.2s ease-in-out infinite; }
  .anim-sparkle-0 { animation: sparkle 1.8s ease-in-out 0.0s infinite; }
  .anim-sparkle-1 { animation: sparkle 1.8s ease-in-out 0.45s infinite; }
  .anim-sparkle-2 { animation: sparkle 1.8s ease-in-out 0.9s infinite; }
  .anim-sparkle-3 { animation: sparkle 1.8s ease-in-out 1.35s infinite; }

  /* ── 神社カットイン ── */
  @keyframes shrineReveal {
    0%   { opacity: 0; transform: scale(0.4) translateY(40px); }
    60%  { opacity: 1; transform: scale(1.08) translateY(0); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes shrineFade {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(1.5) translateY(-20px); }
  }
  .anim-shrine-in  { animation: shrineReveal 0.75s ease-out forwards; }
  .anim-shrine-out { animation: shrineFade   0.9s  ease-out forwards; }

  /* ── 配信 PON 発火・炎のベール ── */
  @keyframes streamPonBurnVeil {
    0%, 100% { opacity: 0.9; filter: hue-rotate(-6deg); }
    33%      { opacity: 1;   filter: hue-rotate(10deg); }
    66%      { opacity: 0.85; filter: hue-rotate(-14deg); }
  }
  @keyframes streamPonFlameLoom {
    0%, 100% { transform: translateY(6%) scale(1.04, 0.98); opacity: 0.55; }
    50%      { transform: translateY(-4%) scale(1.14, 1.1); opacity: 0.9; }
  }
  @keyframes streamPonTextPulse {
    0%, 100% { filter: brightness(1); }
    50%      { filter: brightness(1.18); }
  }
  .anim-stream-pon-burn-veil { animation: streamPonBurnVeil 0.3s ease-in-out infinite, fadeIn 0.4s ease-out forwards; }
  .anim-stream-pon-flame    { animation: streamPonFlameLoom 0.45s ease-in-out infinite alternate; }
  .anim-stream-pon-text     { animation: streamPonTextPulse 0.35s ease-in-out infinite; }

  /* ── 配信タイプカットイン（雑談／ゲーム）スピード感 ── */
  @keyframes streamCutinVignette {
    0% { opacity: 0; backdrop-filter: blur(0); }
    8% { opacity: 1; backdrop-filter: blur(2px); }
    88% { opacity: 1; backdrop-filter: blur(2px); }
    100% { opacity: 0; backdrop-filter: blur(0); }
  }
  @keyframes streamCutinSweep {
    0% { transform: translateX(-130%) skewX(-12deg); opacity: 0; }
    18% { opacity: 1; }
    100% { transform: translateX(130%) skewX(-5deg); opacity: 0; }
  }
  @keyframes streamCutinImgPop {
    0% {
      opacity: 0;
      transform: scale(2.05) translate3d(16%, -4%, 0) rotate(-3deg);
      filter: blur(10px);
    }
    28% {
      opacity: 1;
      transform: scale(0.94) translate3d(-1%, 0, 0) rotate(0.6deg);
      filter: blur(0);
    }
    52% {
      transform: scale(1.04) translate3d(0.5%, 0, 0) rotate(-0.3deg);
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate3d(0, 0, 0) rotate(0deg);
      filter: blur(0);
    }
  }
  @keyframes streamCutinImgBurst {
    0% {
      opacity: 0;
      clip-path: inset(0 100% 0 0);
    }
    10% {
      opacity: 1;
      clip-path: inset(0 0 0 0);
    }
    78% {
      opacity: 1;
      clip-path: inset(0 0 0 0);
    }
    100% {
      opacity: 0;
      clip-path: inset(0 0 100% 0);
    }
  }
  @keyframes streamCutinRingPulse {
    0%,100% {
      opacity: 0.35;
      transform: scale(0.94);
      box-shadow:
        0 0 0 0 rgba(34, 211, 238, 0.45),
        0 0 60px rgba(56, 189, 248, 0.25);
    }
    40% {
      opacity: 0.95;
      transform: scale(1.02);
      box-shadow:
        0 0 0 4px rgba(34, 211, 238, 0.35),
        0 0 80px rgba(96, 165, 250, 0.45),
        inset 0 0 40px rgba(255,255,255,0.06);
    }
  }
  @keyframes streamCutinSpeedHue {
    0% { filter: hue-rotate(0deg) saturate(1.05); }
    50% { filter: hue-rotate(-8deg) saturate(1.12); }
    100% { filter: hue-rotate(6deg) saturate(1.08); }
  }
  .anim-stream-cutin-veil {
    animation: streamCutinVignette 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .anim-stream-cutin-sweep {
    animation: streamCutinSweep 0.62s cubic-bezier(0.2, 0.85, 0.36, 1) forwards;
  }
  .anim-stream-cutin-img-wrap {
    animation: streamCutinImgBurst 2s cubic-bezier(0.2, 0.9, 0.36, 1) forwards,
               streamCutinSpeedHue 0.75s linear infinite alternate;
  }
  .anim-stream-cutin-img {
    animation: streamCutinImgPop 0.62s cubic-bezier(0.12, 0.85, 0.22, 1) both;
  }
  .anim-stream-cutin-ring {
    animation: streamCutinRingPulse 0.5s cubic-bezier(0.25, 0.9, 0.38, 1) 0.06s 6 alternate;
  }
  @keyframes streamCutinLinesShift {
    from { transform: translate3d(28px, -4px, 0); }
    to { transform: translate3d(-40px, 10px, 0); }
  }
  .anim-stream-cutin-lines {
    animation: streamCutinLinesShift 0.145s linear infinite;
    background: repeating-linear-gradient(
      -22deg,
      transparent 0,
      transparent 22px,
      rgba(255,255,255,0.11) 22px,
      rgba(255,255,255,0.11) 25px
    );
    pointer-events: none;
    position: absolute;
    inset: -8%;
  }

  /* ── 幸運のダイスフラッシュ ── */
  @keyframes luckyPop {
    0%   { opacity: 0; transform: scale(0.4) translateY(20px); }
    20%  { opacity: 1; transform: scale(1.2) translateY(0); }
    75%  { opacity: 1; transform: scale(1)   translateY(0); }
    100% { opacity: 0; transform: scale(0.8) translateY(-15px); }
  }
  .anim-lucky-pop { animation: luckyPop 1.8s ease-out forwards; }

  /* ── スロット熟成エフェクト ── */
  @keyframes heatPulse {
    0%,100% { box-shadow: 0 0 10px rgba(239,68,68,0.55), 0 0 22px rgba(239,68,68,0.3), inset 0 0 8px rgba(239,68,68,0.15); }
    50%     { box-shadow: 0 0 20px rgba(239,68,68,0.85), 0 0 40px rgba(239,68,68,0.55), inset 0 0 14px rgba(239,68,68,0.25); }
  }
  @keyframes heatWarm {
    0%,100% { box-shadow: 0 0 8px rgba(251,146,60,0.4), 0 0 16px rgba(251,146,60,0.2); }
    50%     { box-shadow: 0 0 14px rgba(251,146,60,0.7), 0 0 28px rgba(251,146,60,0.4); }
  }
  @keyframes sparkFly {
    0%   { opacity: 1; transform: translate(0,0) scale(1); }
    100% { opacity: 0; transform: translate(var(--sx),var(--sy)) scale(0.3); }
  }
  .anim-heat-burning { animation: heatPulse 1.1s ease-in-out infinite; border-color: rgba(239,68,68,0.8) !important; }
  .anim-heat-warm    { animation: heatWarm  1.4s ease-in-out infinite; }
  .anim-spark        { animation: sparkFly 0.8s ease-out forwards; }

  /* ── SSランクパーティクル ── */
  @keyframes particleFall {
    from { transform: translateY(-60px) rotate(0deg);   opacity: 1; }
    to   { transform: translateY(110vh) rotate(540deg); opacity: 0.2; }
  }
  .anim-particle { animation: particleFall linear infinite; }

  /* ── スロット豪華演出 ── */
  @keyframes reelBounce {
    0%   { transform: translateY(0) scaleY(1); }
    25%  { transform: translateY(10px) scaleY(0.92); }
    55%  { transform: translateY(-5px) scaleY(1.04); }
    75%  { transform: translateY(2px) scaleY(0.98); }
    100% { transform: translateY(0) scaleY(1); }
  }
  @keyframes reachGlow {
    0%,100% { box-shadow: 0 0 14px rgba(239,68,68,0.75), 0 0 32px rgba(239,68,68,0.45); border-color: rgba(239,68,68,0.95) !important; }
    50%     { box-shadow: 0 0 28px rgba(248,113,113,1.0), 0 0 64px rgba(239,68,68,0.7); border-color: rgba(252,165,165,1.0) !important; }
  }
  /* ── スロット ステータスオーラ（screen blend・ネオン背景と馴染ませる） ── */
  @keyframes auraLuckSoft {
    0%,100% { opacity: 0.75; filter: blur(0px); }
    50%     { opacity: 1;    filter: blur(0.5px); }
  }
  @keyframes auraLuckGold {
    0%,100% { opacity: 0.88; transform: scale(1); }
    50%     { opacity: 1;    transform: scale(1.02); }
  }
  @keyframes auraLuckEpic {
    0%,100% { opacity: 0.8; transform: rotate(0deg) scale(1); }
    12%     { opacity: 1;   transform: rotate(3deg) scale(1.04); }
    25%     { opacity: 0.85; transform: rotate(-3deg) scale(1.01); }
    50%     { opacity: 1;   transform: rotate(2deg) scale(1.05); }
    75%     { opacity: 0.9; transform: rotate(-2deg) scale(1.02); }
  }
  @keyframes auraSkillSoft {
    0%,100% { opacity: 0.7; }
    50%     { opacity: 0.95; }
  }
  @keyframes auraSkillStrong {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.16), inset 0 0 18px rgba(34,197,94,0.06); }
    50%     { box-shadow: 0 0 16px 2px rgba(34,197,94,0.25), inset 0 0 26px rgba(34,197,94,0.09); }
  }
  @keyframes auraComboGold {
    0%,100% { opacity: 0.45; }
    50%     { opacity: 0.92; }
  }
  @keyframes auraComboGreen {
    0%,100% { opacity: 0.92; }
    50%     { opacity: 0.45; }
  }
  @keyframes auraSparkFloat {
    0%   { transform: translate(0,0) scale(0.5); opacity: 0; }
    25%  { opacity: 0.75; }
    100% { transform: translate(var(--dx), var(--dy)) scale(1.1); opacity: 0; }
  }
  .anim-luck-soft   { animation: auraLuckSoft 1.8s ease-in-out infinite; }
  .anim-luck-gold   { animation: auraLuckGold 1.2s ease-in-out infinite; }
  .anim-luck-epic   { animation: auraLuckEpic 0.42s ease-in-out infinite; }
  .anim-skill-soft  { animation: auraSkillSoft 2.1s ease-in-out infinite; }
  .anim-skill-strong{ animation: auraSkillStrong 1.5s ease-in-out infinite; }
  .anim-combo-gold  { animation: auraComboGold 1.1s ease-in-out infinite; }
  .anim-combo-green { animation: auraComboGreen 1.1s ease-in-out infinite; }
  /* ── スロット 払い戻し額ポップ ── */
  @keyframes slotPayoutPopup {
    0% {
      opacity: 1;
      transform: translateY(0) scale(0);
    }
    12.28% {
      opacity: 1;
      transform: translateY(0) scale(1.2);
    }
    14.04% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    82.46% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px) scale(1);
    }
  }
  .anim-slot-payout-popup {
    animation: slotPayoutPopup 2.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    will-change: transform, opacity;
  }

  @keyframes coinDrop {
    0%   { transform: translateY(-50px) rotate(0deg) scale(1); opacity: 1; }
    100% { transform: translateY(105vh) rotate(720deg) scale(0.4); opacity: 0; }
  }
  @keyframes rainbowShift {
    0%   { filter: hue-rotate(0deg) brightness(1.2); }
    50%  { filter: hue-rotate(180deg) brightness(1.5); }
    100% { filter: hue-rotate(360deg) brightness(1.2); }
  }
  @keyframes jpFlash {
    0%,100% { background: rgba(251,191,36,0.15); box-shadow: 0 0 40px rgba(251,191,36,0.5); }
    25%     { background: rgba(167,139,250,0.15); box-shadow: 0 0 60px rgba(167,139,250,0.6); }
    50%     { background: rgba(52,211,153,0.15);  box-shadow: 0 0 60px rgba(52,211,153,0.6); }
    75%     { background: rgba(251,113,133,0.15); box-shadow: 0 0 60px rgba(251,113,133,0.6); }
  }
  @keyframes charBounce {
    0%,100% { transform: translateY(0) scale(1); }
    30%     { transform: translateY(-14px) scale(1.12); }
    60%     { transform: translateY(-6px) scale(1.06); }
  }
  @keyframes charPray {
    0%,100% { transform: rotate(0deg) scale(1); }
    30%     { transform: rotate(-7deg) scale(0.94); }
    70%     { transform: rotate(7deg) scale(0.94); }
  }
  @keyframes charWobble {
    0%,100% { transform: rotate(-4deg); }
    50%     { transform: rotate(4deg); }
  }
  @keyframes charSad {
    0%,100% { transform: translateY(0) rotate(0deg); opacity: 1; }
    50%     { transform: translateY(4px) rotate(-5deg); opacity: 0.7; }
  }
  .anim-reel-bounce { animation: reelBounce 0.42s cubic-bezier(0.36,0.07,0.19,0.97); }
  .anim-reach-glow  { animation: reachGlow 0.65s ease-in-out infinite; }
  .anim-jp-rainbow  { animation: jpFlash 0.5s ease-in-out infinite, rainbowShift 1s linear infinite; }
  .anim-char-bounce { animation: charBounce 0.55s ease-out infinite; }
  .anim-char-pray   { animation: charPray 0.7s ease-in-out infinite; }
  .anim-char-wobble { animation: charWobble 0.18s ease-in-out infinite; }
  .anim-char-sad    { animation: charSad 1.2s ease-in-out infinite; }
  @keyframes coldSpark {
    0%   { transform: translateY(0) scale(0.5); opacity: 0; }
    12%  { opacity: 0.9; }
    100% { transform: translateY(-85vh) scale(1.1); opacity: 0; }
  }
  .anim-cold-spark { animation-name: coldSpark; animation-timing-function: linear; animation-iteration-count: infinite; }

  /* ── 「決戦の日」炎・熱気オーバーレイ ── */
  @keyframes fbHeatPulse {
    0%,100% { opacity: 0.55; filter: brightness(1); }
    50%     { opacity: 0.88; filter: brightness(1.12); }
  }
  @keyframes fbHeatExpand {
    0%   { transform: scale(0.35); opacity: 0.95; }
    100% { transform: scale(1.65); opacity: 0.05; }
  }
  @keyframes fbShakeImpact {
    0%   { transform: translate(0,0) rotate(0deg); }
    10%  { transform: translate(-10px, 6px) rotate(-1deg); }
    22%  { transform: translate(12px, -5px) rotate(0.8deg); }
    35%  { transform: translate(-6px, 4px) rotate(-0.4deg); }
    50%,100% { transform: translate(0,0) rotate(0deg); }
  }
  @keyframes fbFlameRise {
    0%,100% { transform: translateY(0) scaleY(1) skewX(0deg); opacity: 0.85; }
    25%     { transform: translateY(-3%) scaleY(1.08) skewX(2deg); opacity: 1; }
    60%     { transform: translateY(2%) scaleY(0.96) skewX(-1.5deg); opacity: 0.9; }
  }
  @keyframes fbEmberRise {
    0%   { transform: translateY(0) scale(1); opacity: 0; }
    10%  { opacity: 0.95; }
    100% { transform: translateY(-132px) scale(0.2); opacity: 0; }
  }
  .anim-fb-heat-bg {
    pointer-events: none;
    background:
      radial-gradient(ellipse 90% 70% at 50% 48%, rgba(248,113,113,0.5) 0%, rgba(185,28,28,0.22) 45%, transparent 68%),
      radial-gradient(ellipse 120% 90% at 50% 108%, rgba(153,27,27,0.45) 0%, rgba(69,10,10,0.2) 50%, transparent 62%),
      radial-gradient(ellipse 55% 45% at 50% 50%, rgba(220,38,38,0.35) 0%, transparent 70%);
    animation: fbHeatPulse 0.85s ease-in-out infinite;
  }
  .anim-fb-heat-wave {
    position: absolute;
    pointer-events: none;
    inset: -5%;
    background: radial-gradient(ellipse closest-side at 50% 50%, rgba(254,202,202,0.55) 0%, rgba(220,38,38,0.18) 50%, transparent 72%);
    animation: fbHeatExpand 2s ease-out 1 forwards;
  }
  .anim-fb-shake-once {
    animation: fbShakeImpact 0.52s cubic-bezier(0.36, 0.02, 0.16, 0.97) both;
  }
  .anim-fb-flame-sheet {
    filter: blur(14px);
    opacity: 0.9;
    animation: fbFlameRise 0.42s ease-in-out infinite;
  }
  .anim-fb-flame-sheet-delay {
    animation-delay: -0.18s;
    opacity: 0.72;
    filter: blur(20px);
  }
  .anim-fb-ember-dot {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 9999px;
    background: radial-gradient(circle at 30% 30%, #fff7ed, #fb923c 45%, #dc2626 75%, transparent);
    box-shadow: 0 0 8px rgba(251,146,60,0.95), 0 0 2px rgba(127,29,29,0.9);
    animation: fbEmberRise var(--dur, 1.1s) ease-out infinite;
    animation-delay: var(--delay, 0s);
    pointer-events: none;
  }

  /* 「決戦の日」見出し：黒塗りベタ */

  .fb-decisive-title {
    font-family: "Yuji Syuku", "Noto Sans JP", sans-serif;
    font-weight: 900;
    line-height: 1.06;
    letter-spacing: 0.04em;
    position: relative;
    z-index: 2;
    color: #000000;
    -webkit-text-fill-color: #000000;
    font-size: clamp(3rem, 13vw, 6rem);
  }

  @keyframes ponBurst {
    0%   { transform: scale(0.45) rotate(-6deg); opacity: 0; filter: blur(12px); }
    28%  { transform: scale(1.12) rotate(2deg); opacity: 1; filter: blur(0); }
    55%  { transform: scale(1) rotate(0deg); }
    100% { transform: scale(1.02); opacity: 1; }
  }
  @keyframes ponBurstImpact {
    0%   { transform: scale(0.35) rotate(-10deg); opacity: 0; filter: blur(16px) brightness(2); }
    22%  { transform: scale(1.22) rotate(4deg); opacity: 1; filter: blur(0) brightness(1.25); }
    45%  { transform: scale(0.96) rotate(-2deg); filter: brightness(1.1); }
    70%  { transform: scale(1.06) rotate(1deg); }
    100% { transform: scale(1.03) rotate(0deg); opacity: 1; filter: brightness(1); }
  }
  @keyframes ponSpark {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.08); }
  }
  @keyframes ponSparkImpact {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.22); }
  }
  .anim-pon-burst {
    animation: ponBurst 0.55s cubic-bezier(0.34, 1.45, 0.64, 1) both;
  }
  .anim-pon-burst-impact {
    animation: ponBurstImpact 0.72s cubic-bezier(0.34, 1.55, 0.52, 1) both;
  }
  .anim-pon-spark {
    animation: ponSpark 0.45s ease-in-out infinite;
  }
  .anim-pon-spark-impact {
    animation: ponSparkImpact 0.38s ease-in-out infinite;
  }

  /* PONカットイン：第1相シェイク（強め・0.6s向け） */
  @keyframes ponCutinShake {
    0%, 100% { transform: translate(0, 0); }
    8%  { transform: translate(-5px, -14px) rotate(-0.8deg); }
    16% { transform: translate(6px, 12px) rotate(0.9deg); }
    24% { transform: translate(-6px, 10px) rotate(-0.6deg); }
    32% { transform: translate(5px, -11px) rotate(0.7deg); }
    40% { transform: translate(-4px, -9px) rotate(-0.5deg); }
    48% { transform: translate(5px, 8px) rotate(0.5deg); }
    56% { transform: translate(-5px, 6px); }
    64% { transform: translate(4px, -7px); }
    72% { transform: translate(-3px, 5px); }
    80% { transform: translate(3px, -4px); }
    88% { transform: translate(-2px, 3px); }
    96% { transform: translate(1px, -2px); }
  }
  .anim-pon-cutin-shake {
    animation: ponCutinShake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
  }

  /* Y軸に躓き画像を2回転（720°）させてから転倒画像へ切替 */
  @keyframes ponStumbleSpinY {
    from { transform: rotateY(0deg); }
    to   { transform: rotateY(720deg); }
  }
  .pon-cutin-scene {
    perspective: 1000px;
    perspective-origin: 50% 55%;
  }
  .pon-cutin-spin-host {
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    will-change: transform;
  }
  .anim-pon-stumble-spin {
    animation: ponStumbleSpinY var(--pon-spin-duration, 1.6s) cubic-bezier(0.42, 0.02, 0.28, 1) forwards;
  }

  /* ═══════════════════════════════════════════════════════════════════════
   * Reach チャンスカットイン（パチスロ級・全画面）— SlotMachine.jsx
   * 画像パスは常に chance_rrm.png（小文字 .png）
   * ═══════════════════════════════════════════════════════════════════════ */
  @keyframes slotReachMachineShakeHeavy {
    0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
    8% { transform: translate3d(-10px,-7px,0) rotate(-1deg); }
    16%{ transform: translate3d(9px,9px,0) rotate(0.9deg); }
    24%{ transform: translate3d(-7px,8px,0) rotate(-0.7deg); }
    32%{ transform: translate3d(8px,-8px,0) rotate(0.8deg); }
    40%{ transform: translate3d(-6px,-7px,0) rotate(-0.5deg); }
    48%{ transform: translate3d(7px,6px,0) rotate(0.45deg); }
    56%{ transform: translate3d(-5px,5px,0) rotate(-0.35deg); }
    64%{ transform: translate3d(5px,-5px,0) rotate(0.3deg); }
    72%{ transform: translate3d(-4px,4px,0) rotate(-0.25deg); }
    80%{ transform: translate3d(4px,-3px,0) rotate(0.2deg); }
    88%{ transform: translate3d(-3px,2px,0); }
    96%{ transform: translate3d(2px,-1px,0); }
  }
  .anim-slot-reach-machine-shake {
    animation: slotReachMachineShakeHeavy 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    will-change: transform;
  }

  @keyframes slotReachCutinWhiteBurst {
    0% { opacity: 0; }
    20% { opacity: 1; }
    100%{ opacity: 0; }
  }
  .anim-slot-reach-cutin-white-flash {
    background: rgba(255,252,248,1);
    animation: slotReachCutinWhiteBurst 0.1s linear forwards;
    will-change: opacity;
  }

  @keyframes slotReachCutinRevealPop {
    0% { opacity: 0; transform: scale(0.92); filter: brightness(2); }
    58%{ opacity: 1; transform: scale(1.02); filter: brightness(1.05); }
    100%{ opacity: 1; transform: scale(1); filter: brightness(1); }
  }

  @keyframes slotReachCutinSpeedDrift {
    0%{ transform: translate(-50%,-50%) rotate(0deg) scale(1.12); }
    100%{ transform: translate(-50%,-50%) rotate(6deg) scale(1.2); }
  }

  @keyframes slotReachNeonPulse {
    0%,100%{
      filter: brightness(1.05) drop-shadow(0 0 14px rgba(255,20,147,0.95)) drop-shadow(0 0 28px rgba(244,114,182,0.75));
      opacity: 0.95;
    }
    50%{
      filter: brightness(1.25) drop-shadow(0 0 22px rgba(253,164,238,1)) drop-shadow(0 0 40px rgba(236,72,153,0.9));
      opacity: 1;
    }
  }

  /* 全画面ルート（z-index は SlotMachine 内カットイン専用） */
  .slot-reach-cutin-full {
    position: fixed;
    inset: 0;
    z-index: 10050;
    pointer-events: none;
    isolation: isolate;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    contain: layout style paint;
  }

  /* 集中線レイヤー */
  .slot-reach-cutin-full-speed {
    position: absolute;
    width: 160vmax;
    height: 160vmax;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    opacity: 0.88;
    background: repeating-conic-gradient(
      from 12deg at 50% 50%,
      transparent 0deg 3.8deg,
      rgba(255,255,255,0.06) 3.8deg 4.4deg,
      transparent 4.4deg 9deg,
      rgba(251,182,226,0.16) 9deg 9.9deg,
      transparent 9.9deg 15deg,
      transparent 360deg
    );
    animation: slotReachCutinSpeedDrift 2.8s linear infinite alternate;
    mix-blend-mode: screen;
  }

  .slot-reach-cutin-full-speed::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-conic-gradient(
      from -20deg at 50% 50%,
      transparent 0deg 5deg,
      rgba(255,255,255,0.055) 5deg 5.6deg,
      transparent 5.6deg 14deg,
      rgba(244,114,182,0.12) 14deg 14.8deg,
      transparent 14.8deg 360deg
    );
    animation: slotReachCutinSpeedDrift 3.4s linear infinite alternate-reverse;
    mix-blend-mode: overlay;
  }

  .slot-reach-cutin-full-vignette {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 90% 70% at 50% 42%, transparent 46%, rgba(2,6,23,0.88) 100%),
      linear-gradient(to bottom, rgba(2,6,23,0.35) 0%, transparent 18%, transparent 82%, rgba(2,6,23,0.45) 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* 画面上端〜下端の太いピンク斜めバンド */
  .slot-reach-cutin-full-scan {
    position: absolute;
    left: -8%;
    right: -8%;
    height: 14vmin;
    z-index: 2;
    transform: skewY(-11deg);
    background: linear-gradient(
      90deg,
      rgba(131,24,67,0) 0%,
      rgba(236,72,153,0.75) 18%,
      rgba(253,164,238,1) 50%,
      rgba(236,72,153,0.75) 82%,
      rgba(131,24,67,0) 100%
    );
    box-shadow:
      0 0 32px rgba(255,20,147,0.85),
      0 0 80px rgba(244,114,182,0.55),
      inset 0 0 24px rgba(255,255,255,0.35);
    animation: slotReachNeonPulse 0.55s ease-in-out infinite;
    pointer-events: none;
  }
  .slot-reach-cutin-full-scan--top { top: 5%; }
  .slot-reach-cutin-full-scan--bottom {
    bottom: 6%;
    transform: skewY(11deg);
    background: linear-gradient(
      90deg,
      rgba(131,24,67,0) 0%,
      rgba(219,39,119,0.78) 18%,
      rgba(251,207,232,1) 50%,
      rgba(219,39,119,0.78) 82%,
      rgba(131,24,67,0) 100%
    );
  }

  .slot-reach-cutin-full-dim {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(2,6,23,0.72);
    pointer-events: none;
  }

  /* 画面周辺のネオンピンク枠 */
  .slot-reach-cutin-full-frame {
    position: absolute;
    inset: 2.5%;
    border-radius: 16px;
    border: 4px solid rgba(251,113,180,0.82);
    box-shadow:
      inset 0 0 40px rgba(236,72,153,0.35),
      0 0 28px rgba(244,114,182,0.65),
      0 0 120px rgba(236,72,153,0.35);
    z-index: 3;
    pointer-events: none;
    animation: slotReachNeonPulse 0.62s ease-in-out infinite;
  }

  .slot-reach-cutin-full-center {
    position: relative;
    z-index: 4;
    width: min(96vw, 1040px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: min(7vw, 2.5rem) min(4vw, 1.25rem);
  }

  .slot-reach-cutin-hero {
    position: relative;
    width: 100%;
    max-width: 840px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .slot-reach-cutin-hero-bar {
    width: calc(100% + 48px);
    max-width: none;
    height: clamp(10px, 2.8vmin, 18px);
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
    transform: skewX(-18deg);
    background: linear-gradient(
      90deg,
      rgba(253,242,248,0) 0%,
      rgba(244,114,182,1) 22%,
      rgba(255,255,255,0.95) 48%,
      rgba(236,72,153,1) 78%,
      rgba(253,242,248,0) 100%
    );
    box-shadow:
      0 0 26px rgba(255,105,180,1),
      0 0 48px rgba(236,72,153,0.55),
      0 0 4px rgba(255,255,255,0.9);
    animation: slotReachNeonPulse 0.52s ease-in-out infinite alternate;
    pointer-events: none;
    z-index: 2;
  }
  .slot-reach-cutin-hero-bar--bottom {
    transform: skewX(18deg);
    margin-top: -2px;
  }

  .slot-reach-cutin-hero img {
    display: block;
    width: 100%;
    height: auto;
    max-height: min(62vh, 1040px);
    object-fit: contain;
    filter: drop-shadow(0 0 20px rgba(244,114,182,0.75)) drop-shadow(0 8px 32px rgba(0,0,0,0.75));
    animation: slotReachCutinRevealPop 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
    position: relative;
    z-index: 1;
  }

  .slot-reach-cutin-full-chance-tag {
    position: relative;
    z-index: 5;
    margin-top: clamp(0.75rem, 3vw, 1.35rem);
    font-size: clamp(1.15rem, 4.8vw, 1.85rem);
    font-weight: 900;
    letter-spacing: 0.26em;
    text-indent: 0.26em;
    color: #fdf4ff;
    text-shadow:
      0 0 12px #db2777,
      0 0 28px rgba(236,72,153,1),
      0 2px 0 #831843;
    pointer-events: none;
    animation: slotReachCutinRevealPop 0.5s 0.05s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── ガセ（カットイン後ハズレ） ── */
  @keyframes slotReachCutinGaseFrame {
    0% {
      opacity: 1;
      border-color: rgba(251,113,180,0.82);
      filter: grayscale(0);
      box-shadow:
        inset 0 0 40px rgba(236,72,153,0.35),
        0 0 28px rgba(244,114,182,0.65),
        0 0 120px rgba(236,72,153,0.35);
    }
    45% {
      border-color: rgba(148,163,184,0.75);
      filter: grayscale(0.7) brightness(0.88);
      box-shadow:
        inset 0 0 28px rgba(71,85,105,0.4),
        0 0 20px rgba(100,116,139,0.45);
    }
    100% {
      opacity: 0;
      border-color: transparent;
      filter: grayscale(1) brightness(0.5);
      box-shadow: none;
    }
  }

  @keyframes slotReachCutinGaseShatterGlow {
    0% { opacity: 0.72; }
    40%{
      opacity: 0.94;
      background:
        repeating-linear-gradient(
          -18deg,
          transparent 0 3px,
          rgba(226,232,240,0.14) 3px 4px,
          transparent 4px 7px,
          transparent 100%
        ),
        rgba(15,23,42,0.68);
    }
    100%{ opacity: 0; background-color: rgba(15,23,42,0.85); }
  }

  @keyframes slotReachCutinGaseImg {
    0% { opacity: 1; filter: drop-shadow(0 0 20px rgba(244,114,182,0.75)) grayscale(0) brightness(1); transform: scale(1); }
    45%{
      opacity: 0.88;
      filter: drop-shadow(0 0 4px rgba(148,163,184,0.4)) grayscale(1) brightness(0.82);
      transform: scale(0.97);
    }
    100%{ opacity: 0; filter: grayscale(1) brightness(0.52); transform: scale(0.9); }
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-speed,
  .slot-reach-cutin-full--gase .slot-reach-cutin-full-speed::after {
    animation-play-state: paused !important;
    opacity: 0.22;
    transition: opacity 0.35s ease;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-frame,
  .slot-reach-cutin-full--gase .slot-reach-cutin-full-scan,
  .slot-reach-cutin-full--gase .slot-reach-cutin-hero-bar {
    animation: none !important;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-dim {
    animation: slotReachCutinGaseShatterGlow 0.72s forwards ease-out;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-frame {
    animation: slotReachCutinGaseFrame 0.74s forwards ease-in !important;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-hero img {
    animation: slotReachCutinGaseImg 0.7s forwards ease-in both !important;
  }

  .slot-reach-cutin-full--gase .slot-reach-cutin-full-chance-tag {
    animation: none !important;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* ── タクシー渋滞カットイン（PON のシャープな shake とは別：アイドル振動） ── */
  @keyframes trafficJamIdleShake {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    20%      { transform: translate(0.8px, -1.1px) rotate(-0.04deg); }
    40%      { transform: translate(-1px, 0.6px) rotate(0.05deg); }
    60%      { transform: translate(0.5px, 0.9px) rotate(-0.03deg); }
    80%      { transform: translate(-0.7px, -0.4px) rotate(0.02deg); }
  }
  .anim-traffic-jam-vibrate {
    animation: trafficJamIdleShake 0.26s ease-in-out infinite;
  }
  @keyframes trafficJamNeonFlicker {
    0%, 100% { opacity: 0.92; filter: brightness(1.05) drop-shadow(0 0 14px rgba(251,191,36,0.5)); }
    13%      { opacity: 0.42; filter: brightness(0.72) drop-shadow(0 0 4px rgba(251,191,36,0.18)); }
    19%      { opacity: 0.9; filter: brightness(1.12) drop-shadow(0 0 18px rgba(252,211,77,0.58)); }
    34%      { opacity: 0.52; filter: brightness(0.82); }
    43%      { opacity: 0.96; filter: brightness(1.06) drop-shadow(0 0 12px rgba(251,191,36,0.45)); }
    59%      { opacity: 0.35; filter: brightness(0.68) drop-shadow(0 0 3px rgba(251,191,36,0.12)); }
    68%      { opacity: 0.91; filter: brightness(1.02); }
  }
  .anim-traffic-jam-neon {
    animation: trafficJamNeonFlicker 1.85s ease-in-out infinite;
  }
  @keyframes trafficJamOverlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .anim-traffic-jam-overlay-fade {
    animation: trafficJamOverlayIn 0.38s ease-out both;
  }

`;function ts(t,e){const n=e??"エラーが発生しました。しばらくしてから再度お試しいただくか、画面を再読み込みしてください。";if(t==null)return n;const s=t.code;if(s==="permission-denied")return"権限または接続の問題で処理できませんでした。ログイン状態とネットワークをご確認ください。";if(s==="unavailable"||s==="deadline-exceeded")return"サーバーに接続できませんでした。しばらくしてから再度お試しください。";const a=t.message;if(typeof a=="string"){const i=a.trim();if(i.length>0&&i.length<=280)return i}return n}function qj(t){const e=N.useCallback(C=>{if(typeof t!="function"||C==null)return;const I=typeof C=="string"?C:ts(C,"接続またはデータの読み込みで問題が発生しました。");t(I)},[t]),[n,s]=N.useState(null),[a,i]=N.useState(!1),[r,l]=N.useState(null),[c,h]=N.useState(null);N.useEffect(()=>(AM(rx).catch(I=>e(I)),MM(rx,I=>{I&&(s(I.uid),i(!0))})),[e]),N.useEffect(()=>{if(!r){h(null);return}return H4(bc(Wr,"rooms",r),I=>{if(!I.exists()){e("ルームが存在しません");return}h(I.data())},I=>e(I))},[r,e]);const d=N.useCallback(async C=>{if(!r)throw new Error("roomId missing");await V1(bc(Wr,"rooms",r),C)},[r]),p=N.useCallback(async(C,I)=>{await V1(bc(Wr,"rooms",C),I)},[]),g=N.useCallback(async(C,I)=>{await F4(bc(Wr,"rooms",C),I)},[]),y=N.useCallback(async C=>$4(bc(Wr,"rooms",C)),[]);return{myId:n,authReady:a,roomId:r,setRoomId:l,roomData:c,updateRoom:d,updateRoomById:p,createRoom:g,fetchRoom:y}}function Gj(t){if(t==null||typeof t!="string")return t;const e=t.replace(/^\/+/,"").replace(/\\/g,"/");return`${"/".replace(/\/?$/,"/")}sounds/${e}`}function Yj(){let t=null,e=!1,n=null,s=null,a=.82,i=.08,r=!1,l=!1,c=!1,h=!1,d=!1,p=!1,g=!1,y=!1,C=!1,I=!1,O=!1,_=!1;const v={};function S(F){const ie=Number(F);return Number.isFinite(ie)?Math.max(0,Math.min(1,ie)):1}function L(){return t||(t=new(window.AudioContext||window.webkitAudioContext)),t.state==="suspended"&&t.resume().catch(()=>{}),t}function j({freq:F=440,dur:ie=.15,type:se="triangle",vol:Ne=.28,ramp:re=!0}={}){if(!e)try{const ve=L(),ke=ve.createOscillator(),Ge=ve.createGain();ke.connect(Ge),Ge.connect(ve.destination),ke.type=se,ke.frequency.setValueAtTime(F,ve.currentTime);const ze=Ne*a;Ge.gain.setValueAtTime(ze,ve.currentTime),re&&Ge.gain.exponentialRampToValueAtTime(.001,ve.currentTime+ie),ke.start(ve.currentTime),ke.stop(ve.currentTime+ie+.01)}catch{}}function H(F,ie=.07,se=.12,Ne="triangle"){F.forEach((re,ve)=>setTimeout(()=>j({freq:re,dur:se,type:Ne,vol:.22}),ve*ie*1e3))}function T(){if(n){try{n.osc.stop(),n.lfo.stop()}catch{}n=null}w("spin")}async function x(F,ie){try{const se=Gj(ie),Ne=await fetch(se,{method:"GET",cache:"force-cache"});if(!Ne.ok){v[F]=null;return}const re=await Ne.blob(),ve=URL.createObjectURL(re),ke=new Audio(ve);ke.preload="auto",await new Promise((Ge,ze)=>{ke.addEventListener("canplaythrough",Ge,{once:!0}),ke.addEventListener("error",ze,{once:!0}),setTimeout(ze,4e3)}),v[F]=ke}catch{v[F]=null}}function E(){w("war_horn")}function k(){if(s){if(s.type==="synth")try{s.osc.stop(),s.osc2.stop()}catch{}s=null}w("final_battle")}function R(F){return F==="daily_bgm"||F==="day8_bgm"||F==="menu_bgm"?i:a}function D(F,ie=!1){if(e)return!1;const se=v[F];if(!se)return!1;try{return se.loop=ie,se.volume=R(F),se.currentTime=0,se.play().catch(()=>{}),!0}catch{return!1}}function w(F){const ie=v[F];if(ie)try{ie.pause(),ie.currentTime=0}catch{}}function ae(){if(h||!l||e)return;h=!0;const F=()=>{h=!1,document.removeEventListener("pointerdown",F,!0),_e()};document.addEventListener("pointerdown",F,{capture:!0,once:!0})}function _e(){if(ne(),$e(),e||!l||c||r)return;const F=v.daily_bgm;if(F){F.loop=!0,F.volume=i,c=!0;try{F.currentTime=0,F.play().then(()=>{r=!0,c=!1}).catch(()=>{c=!1,r=!1,ae()})}catch{c=!1,ae()}}}function K(){c=!1,w("daily_bgm"),r=!1}function te(){l=!1,K()}function ne(){g=!1,w("day8_bgm"),d=!1}function pe(){p=!1,ne()}function Pe(){if(_||!I||e)return;_=!0;const F=()=>{_=!1,document.removeEventListener("pointerdown",F,!0),_t()};document.addEventListener("pointerdown",F,{capture:!0,once:!0})}function _t(){if(K(),ne(),e||!I||O||C)return;const F=v.menu_bgm;if(F){F.loop=!0,F.volume=i,O=!0;try{F.currentTime=0,F.play().then(()=>{C=!0,O=!1}).catch(()=>{O=!1,C=!1,Pe()})}catch{O=!1,Pe()}}}function $e(){O=!1,w("menu_bgm"),C=!1}function Ot(){I=!1,$e()}function mt(){if(y||!p||e)return;y=!0;const F=()=>{y=!1,document.removeEventListener("pointerdown",F,!0),nt()};document.addEventListener("pointerdown",F,{capture:!0,once:!0})}function nt(){if(K(),$e(),e||!p||g||d)return;const F=v.day8_bgm;if(F){F.loop=!0,F.volume=i,g=!0;try{F.currentTime=0,F.play().then(()=>{d=!0,g=!1}).catch(()=>{g=!1,d=!1,mt()})}catch{g=!1,mt()}}}return{async init(){await Promise.allSettled([x("daily_bgm","View_from_the_Fifth_Floor.mp3"),x("day8_bgm","Morning_of_the_Stand.mp3"),x("menu_bgm","Velvet_Current.mp3")]),p&&v.day8_bgm&&!e?nt():l&&v.daily_bgm&&!e?_e():I&&v.menu_bgm&&!e&&_t()},setSeVolume(F){a=S(F)},setBgmVolume(F){i=S(F);for(const ie of["daily_bgm","day8_bgm","menu_bgm"]){const se=v[ie];se&&(se.volume=i)}},startDailyBgm(){Ot(),pe(),l=!0,!e&&_e()},stopDailyBgm(){te()},startDay8Bgm(){Ot(),te(),p=!0,!e&&nt()},stopDay8Bgm(){pe()},startMenuBgm(){te(),pe(),I=!0,!e&&_t()},stopMenuBgm(){Ot()},setMuted(F){e=F,F?(this.stopSpin(),this.stopFinalBattleAmbient(),K(),ne(),$e()):p&&v.day8_bgm?nt():l&&v.daily_bgm?_e():I&&v.menu_bgm&&_t()},getMuted(){return e},playStart(){D("start")||H([523,659,784],.06,.1,"square")},startSpin(){if(!(e||n)&&!D("spin",!0))try{const F=L(),ie=F.createOscillator(),se=F.createOscillator(),Ne=F.createGain(),re=F.createGain();se.frequency.value=14,Ne.gain.value=20,se.connect(Ne),Ne.connect(ie.frequency),ie.connect(re),re.connect(F.destination),ie.type="sawtooth",ie.frequency.value=160,re.gain.value=.07*a,se.start(),ie.start(),n={osc:ie,lfo:se}}catch{}},stopSpin(){T()},playStop(F=0){D("stop")||j({freq:220-F*35,dur:.09,type:"square",vol:.18})},playReach(){D("reach")||H([392,523,659,784,1047],.075,.16)},playStreamFailGaan(){if(!e){j({freq:155,dur:.06,type:"square",vol:.22,ramp:!0}),setTimeout(()=>{j({freq:85,dur:.08,type:"square",vol:.2,ramp:!0})},40);try{const F=L(),ie=F.currentTime,se=F.createOscillator(),Ne=F.createGain();se.connect(Ne),Ne.connect(F.destination),se.type="triangle",se.frequency.setValueAtTime(295,ie),se.frequency.exponentialRampToValueAtTime(72,ie+.95),Ne.gain.setValueAtTime(.32*a,ie),Ne.gain.exponentialRampToValueAtTime(.002,ie+1.05),se.start(ie),se.stop(ie+1.08)}catch{}setTimeout(()=>j({freq:98,dur:.2,type:"sine",vol:.08,ramp:!0}),720)}},playStreamPonBurn(){if(!e){setTimeout(()=>j({freq:1750,dur:.055,type:"square",vol:.16,ramp:!0}),40),setTimeout(()=>j({freq:2200,dur:.045,type:"square",vol:.12,ramp:!0}),110);for(let F=0;F<16;F++)setTimeout(()=>{j({freq:320+Math.random()*750,dur:.035,type:Math.random()>.5?"square":"sawtooth",vol:.1+Math.random()*.09,ramp:!0})},F*26);setTimeout(()=>{j({freq:520,dur:.07,type:"triangle",vol:.22,ramp:!0}),j({freq:380,dur:.09,type:"square",vol:.18,ramp:!0})},380);try{const F=L(),ie=F.currentTime+.42,se=F.createOscillator(),Ne=F.createGain();se.connect(Ne),Ne.connect(F.destination),se.type="sawtooth",se.frequency.setValueAtTime(260,ie),se.frequency.exponentialRampToValueAtTime(38,ie+.58),Ne.gain.setValueAtTime(.36*a,ie),Ne.gain.exponentialRampToValueAtTime(.002,ie+.65),se.start(ie),se.stop(ie+.68)}catch{}setTimeout(()=>j({freq:120,dur:.35,type:"triangle",vol:.14,ramp:!0}),520)}},playWorkPonPlateBreak(){if(!e){for(let F=0;F<9;F++)setTimeout(()=>{j({freq:2100+Math.random()*2600,dur:.022,type:"square",vol:.11+Math.random()*.07,ramp:!0})},F*34);setTimeout(()=>j({freq:440,dur:.045,type:"triangle",vol:.18,ramp:!0}),300),setTimeout(()=>{j({freq:165,dur:.26,type:"sawtooth",vol:.34,ramp:!0}),j({freq:92,dur:.3,type:"square",vol:.24,ramp:!0})},332),setTimeout(()=>j({freq:68,dur:.4,type:"triangle",vol:.2,ramp:!0}),420),setTimeout(()=>j({freq:52,dur:.18,type:"sine",vol:.09,ramp:!0}),460)}},playReachGaseSting(){if(!e){j({freq:310,dur:.1,type:"sawtooth",vol:.2,ramp:!0}),setTimeout(()=>{j({freq:195,dur:.16,type:"square",vol:.14,ramp:!0})},70),setTimeout(()=>{j({freq:142,dur:.24,type:"triangle",vol:.12,ramp:!0})},180);try{const F=L(),ie=F.currentTime,se=F.createOscillator(),Ne=F.createGain();se.connect(Ne),Ne.connect(F.destination),se.type="sine",se.frequency.setValueAtTime(198,ie),se.frequency.exponentialRampToValueAtTime(128,ie+.42),Ne.gain.setValueAtTime(.065*a,ie),Ne.gain.exponentialRampToValueAtTime(.0015,ie+.52),se.start(ie),se.stop(ie+.54)}catch{}}},startDiceRoll(){if(e)return{stop(){}};const F=setInterval(()=>{j({freq:90+Math.random()*150,dur:.036,type:Math.random()>.45?"square":"triangle",vol:.14,ramp:!0})},56);return{stop:()=>clearInterval(F)}},playDiceTick(){e||j({freq:1047,dur:.052,type:"square",vol:.2})},playDiceMaxSpark(){e||H([784,1175,1568],.042,.09,"square")},playWin(F="small"){if(D(F==="jackpot"?"jackpot":"win"))return;const se={small:[523,659],atari:[523,659,784],mid:[523,659,784,1047],big:[523,659,784,1047,1319],jackpot:[523,659,784,1047,1319,1568,2093]};H(se[F]??se.small,.065,.14)},stopWarHorn(){E()},tryPlayWarHornIfLoaded(){if(e)return!1;const F=v.war_horn;if(!F)return!1;try{T(),F.volume=a,F.currentTime=0,F.play()}catch{return!1}return!0},stopFinalBattleAmbient(){k(),E()},startFinalBattleAmbient(){if(!e&&(T(),!(s||D("final_battle",!0))))try{const F=L(),ie=F.createOscillator(),se=F.createOscillator(),Ne=F.createGain();ie.type="sine",se.type="sine",ie.frequency.value=52,se.frequency.value=78,ie.connect(Ne),se.connect(Ne),Ne.connect(F.destination),Ne.gain.value=.055*a,ie.start(),se.start(),s={type:"synth",osc:ie,osc2:se,gain:Ne,ac:F}}catch{}}}}const Cx=["/images/title_logo.png","/images/taxi.png","/images/slot-machine.png","/images/traffic_jam.png","/images/sugoroku_bg_pc.png","/images/sugoroku_bg_sp.png","/images/city_seamless.png","/images/icon_rrm.png","/images/icon_beginner_university_student.png","/images/icon_gambling_salaryman.png","/images/work.png","/images/work_ririmu.png","/images/game_streaming.png","/images/casual_chat_stream.png","/images/stumble_rrm.png","/images/stumble_beginner_university_student.png","/images/stumble_gambling_salaryman.png","/images/fell_down_rrm.png","/images/fell_down_beginner_university_student.png","/images/fell_down_gambling_salaryman.png","/images/chance_rrm.png","/images/rrm_noback.png"];function Kj(t,e){if(!Array.isArray(t)||t.length===0)return Promise.resolve([]);let n=0;const s=t.length,a=t.map(i=>new Promise(r=>{const l=new Image,c=h=>{n+=1,typeof e=="function"&&e({loaded:n,total:s,ratio:s>0?n/s:1}),r({path:i,status:h})};l.onload=()=>c("loaded"),l.onerror=()=>c("error"),l.src=Us(i)}));return Promise.all(a)}const m0="pons_se_vol",p0="pons_bgm_vol",Ix=.82,Mx=.08,g0=["/sounds/ohayo.mp3","/sounds/yumemitano.mp3","/sounds/full_name.mp3"],Qj="/sounds/start_rrm.mp3",Xj={money:"行動やスロットで増減する所持金です。マイナスになっても続行できますが、借金状態になります。",luck:"運気の強さです。伸びるとすごろくのダイスなどで追い風になりやすくなります。一定値を超えるとダイスが増える！？",skill:"腕前やコツのイメージです。スロットでは当たりやすさなどに効いてきます。",virtue:"善行の蓄えです。ダイスや日常イベントで「最低限ここまで」が変わるなど、行動の土台に効きます。",pon:"ストレスや無謀さの目安です。高まると荒れた展開に振れやすくなります。",livingCost:"暮らしの固定費です。日が進むたびにこの負担がのしかかり、資金との攻防になります。"};function Vh(t,e){try{const n=localStorage.getItem(t);if(n==null)return e;const s=parseFloat(n);return Number.isFinite(s)?Math.max(0,Math.min(1,s)):e}catch{return e}}function Lh(t,e,n){return t.map((s,a)=>a!==e?s:{...s,position:n,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0})}function Dx(t,e,n){if(!n)return t;const s={...t};return delete s.finalBattleStartedAt,delete s.finalBattleEntry,{...s,gamePhase:"playing",subPhase:"daily",currentDay:Ma,currentPlayerIdx:e.currentPlayerIdx}}function Wj(){var Ra,oc,lc;const[t,e]=N.useState(""),{myId:n,authReady:s,roomId:a,setRoomId:i,roomData:r,updateRoom:l,updateRoomById:c,createRoom:h,fetchRoom:d}=qj(e),[p,g]=N.useState(""),[y]=N.useState(()=>String(Math.floor(1e3+Math.random()*9e3))),[C,I]=N.useState(""),[O,_]=N.useState("entry"),[v,S]=N.useState(0),[L,j]=N.useState(!1),H=N.useRef(!1),T=N.useRef(0),[x,E]=N.useState(!1),[k,R]=N.useState(""),[D,w]=N.useState(""),[ae,_e]=N.useState(!1),[K,te]=N.useState(()=>Vh(m0,Ix)),[ne,pe]=N.useState(()=>Vh(p0,Mx)),[Pe,_t]=N.useState(!1),[$e,Ot]=N.useState(null),[mt,nt]=N.useState(!0),[F,ie]=N.useState(!1),[se,Ne]=N.useState({loaded:0,total:Cx.length});N.useEffect(()=>{let A=!1;return Kj(Cx,({loaded:z,total:$})=>{A||Ne({loaded:z,total:$})}).finally(()=>{A||ie(!0)}),()=>{A=!0}},[]);const[re,ve]=N.useState(!1),[ke,Ge]=N.useState([]),[ze,Ye]=N.useState([]),[Cn,Vn]=N.useState([]),[is,tn]=N.useState(!1),[he,Se]=N.useState(!1),we=N.useRef(null),Ke=N.useRef({unlock:null,select:null}),St=N.useRef(!1),[oe,ee]=N.useState(null),[ge,le]=N.useState(!1),[Ae,me]=N.useState(!1),[Te,st]=N.useState(!1),[at,At]=N.useState(null),[it,Ln]=N.useState(!1),Ve=N.useRef(null),xe=N.useRef(null),ue=N.useRef(2600),[Xn,Wt]=N.useState(null),[En,Nt]=N.useState(2600),[lt,vt]=N.useState(null),[Un,Oe]=N.useState(2600),ft=N.useRef(0),Ct=N.useRef(!1),Kt=N.useRef(null),pt=N.useRef(async()=>{}),[nn,Lt]=N.useState(null),[Ut,Ri]=N.useState(null),[Wn,oa]=N.useState(null),[Bs,la]=N.useState(!1),zs=N.useRef(!1),Bt=N.useRef(null),$s=N.useRef(null),rs=N.useRef(null),[Dr,Ga]=N.useState(null),[ki,Or]=N.useState(!1),_a=N.useRef(null),[hs,ca]=N.useState(null),ln=N.useRef(null),[Ta,Wu]=N.useState(!1),Ea=N.useRef(null),[Fs,jr]=N.useState(null),os=N.useRef(null),fs=N.useRef([]),[Hs,Pr]=N.useState(null),ds=N.useRef(null),ua=N.useRef([]),[qs,Ss]=N.useState(null),[wa,Ya]=N.useState(null),Vr=N.useRef(null),dt=N.useRef(null),ha=N.useRef(null),[Ka,Ci]=N.useState(null),Qa=N.useRef(null),Ii=N.useCallback(A=>{const z=Ke.current[A];z&&(z.pause(),z.currentTime=0,Ke.current[A]=null)},[]),So=N.useCallback((A,z)=>{Ii(A);const $=new Audio(Us(z));$.preload="auto",$.volume=Math.max(0,Math.min(1,K)),$.onended=()=>{Ke.current[A]===$&&(Ke.current[A]=null)},$.onerror=()=>{Ke.current[A]===$&&(Ke.current[A]=null)},Ke.current[A]=$,$.play().catch(()=>{Ke.current[A]===$&&(Ke.current[A]=null)})},[K,Ii]),im=N.useCallback(()=>{So("select",Qj)},[So]);N.useEffect(()=>{if(!Wc(p)||St.current)return;const z=Math.floor(Math.random()*g0.length),$=g0[z]??g0[0];St.current=!0,So("unlock",$)},[p,So]),N.useEffect(()=>()=>{Ii("unlock"),Ii("select")},[Ii]);const Gs=p.trim()?`${p.trim()}#${y}`:"",ye=(r==null?void 0:r.gameState)??null,V=Dr??ye,wn=(r==null?void 0:r.playerSlots)??[],Lr=(r==null?void 0:r.hostId)===n,Ju=Dr!=null,dn=!!ye&&((Ra=ye.players[ye.currentPlayerIdx])==null?void 0:Ra.id)===n&&!Ju,J=(V==null?void 0:V.players[V==null?void 0:V.currentPlayerIdx])??null,tc=N.useRef(ye);tc.current=ye;const Mi=re?ke:(V==null?void 0:V.lastDiceRolls)??[],Ao=(V==null?void 0:V.gamePhase)==="playing",Zu=(V==null?void 0:V.gamePhase)==="finalBattle"||(V==null?void 0:V.subPhase)==="finalBattle",Ur=Ao&&(V==null?void 0:V.subPhase)==="day8"&&(J==null?void 0:J.movePhase)==="waitingSlot",Ys=Ao&&(V==null?void 0:V.subPhase)==="day8"&&(J==null?void 0:J.movePhase)==="goalLanding",eh=Ao&&(V==null?void 0:V.subPhase)==="day8"&&(J==null?void 0:J.movePhase)==="arrived",nc=Ao&&(V==null?void 0:V.subPhase)==="day8"&&(J==null?void 0:J.movePhase)==="moving";J&&Math.min(100,J.position/Ft*100),Array.isArray(V==null?void 0:V.lastDiceRolls)&&V.lastDiceRolls.length;const Di=re||oe!=null||Te||!!Ut||!!Wn||qs!=null||wa!=null,th=500,Xa=()=>{const A=Date.now();return A-T.current<th?!1:(T.current=A,!0)};N.useEffect(()=>{if(!V||V.gamePhase!=="playing"||V.subPhase!=="day8"||!Array.isArray(V.players)){Vr.current=null,Ya(null);return}const A=V.currentPlayerIdx;if(!Number.isInteger(A)||A<0||A>=V.players.length)return;const z=V.players[A],$=`${A}:${(z==null?void 0:z.id)??""}:${(z==null?void 0:z.moveTurns)??-1}`,Z=Vr.current;if(Vr.current=$,Z==null||Z===$)return;const[B,,q]=String(Z).split(":"),de=Number(B),o=Number(q),f=Number((z==null?void 0:z.moveTurns)??0),m=V.players.length>1&&Number.isFinite(de)&&de!==A,b=V.players.length===1&&Number.isFinite(o)&&f>o;if(!m&&!b)return;const M=Math.max(0,P.dice.maxTurns-Number((z==null?void 0:z.moveTurns)??0));Ya(M)},[V==null?void 0:V.gamePhase,V==null?void 0:V.subPhase,V==null?void 0:V.currentPlayerIdx,V==null?void 0:V.players]),N.useEffect(()=>{if(wa==null)return;const A=J==null?void 0:J.movePhase;if(!((V==null?void 0:V.gamePhase)==="playing"&&(V==null?void 0:V.subPhase)==="day8"&&(A==="moving"||A==="arrived"||A==="waitingSlot"))||!(!re&&oe==null&&!Te&&!Ut&&!Wn&&at==null&&!ki&&!Ta&&!Fs&&!Hs&&!hs))return;const Z=()=>{Ss(wa),Ya(null),dt.current&&clearTimeout(dt.current),dt.current=setTimeout(()=>{Ss(null),dt.current=null},2e3)},B=Number((J==null?void 0:J.position)??-1),q=Array.isArray(V==null?void 0:V.sugorokuTileEffects)&&B>=0&&B<=Ft?V.sugorokuTileEffects[B]:null,de=!q||q.kind===qe.NEUTRAL,o=B>0&&B<Ft;if(de&&o){if(ha.current)return;ha.current=setTimeout(()=>{ha.current=null,Z()},1e3);return}Z()},[wa,V==null?void 0:V.gamePhase,V==null?void 0:V.subPhase,J==null?void 0:J.movePhase,re,oe,Te,Ut,Wn,at,ki,Ta,Fs,Hs,hs,J==null?void 0:J.position,V==null?void 0:V.sugorokuTileEffects]),N.useEffect(()=>()=>{dt.current&&(clearTimeout(dt.current),dt.current=null),ha.current&&(clearTimeout(ha.current),ha.current=null)},[]);const fa=N.useCallback(A=>{var $,Z;const z=Math.max(0,Math.min(1,Number(A)));te(z);try{localStorage.setItem(m0,String(z))}catch{}(Z=($=we.current)==null?void 0:$.setSeVolume)==null||Z.call($,z)},[]),Oi=N.useCallback(A=>{var $,Z;const z=Math.max(0,Math.min(1,Number(A)));pe(z);try{localStorage.setItem(p0,String(z))}catch{}(Z=($=we.current)==null?void 0:$.setBgmVolume)==null||Z.call($,z)},[]),No=N.useMemo(()=>{if(O!=="playing"||!V||V.gamePhase!=="playing")return!1;const A=Number(V.currentDay);return V.subPhase==="daily"&&A>=1&&A<=Ma},[O,V==null?void 0:V.gamePhase,V==null?void 0:V.subPhase,V==null?void 0:V.currentDay]),zt=N.useMemo(()=>O!=="playing"||!V||V.gamePhase!=="playing"?!1:V.subPhase==="day8",[O,V==null?void 0:V.gamePhase,V==null?void 0:V.subPhase]),nh=N.useMemo(()=>s&&(O==="entry"||O==="lobby"||O==="waiting"),[s,O]);N.useEffect(()=>{const A=Yj();we.current=A,A.setSeVolume(Vh(m0,Ix)),A.setBgmVolume(Vh(p0,Mx)),A.init()},[]),N.useEffect(()=>{document.title=`${df} — ${f0}`},[]),N.useEffect(()=>{r&&(r.status==="playing"||r.status==="FINAL_BATTLE")&&O==="waiting"&&_("playing")},[r==null?void 0:r.status]),N.useEffect(()=>{ye!=null&&ye.gamePhase&&(ye.gamePhase==="results"&&O!=="results"&&_("results"),ye.gamePhase==="gameOver"&&O!=="gameover"&&!Ka&&(Ci(ye.gameOverMsg??"ゲームオーバー"),Qa.current&&clearTimeout(Qa.current),Qa.current=setTimeout(()=>{Ci(null),_("gameover"),Qa.current=null},1800)))},[ye==null?void 0:ye.gamePhase]),N.useEffect(()=>{const A=we.current;if(!A||!(ye!=null&&ye.gamePhase))return;if(!(ye.gamePhase==="finalBattle"||ye.subPhase==="finalBattle")){A.stopFinalBattleAmbient();return}ye.finalBattleEntry!=="preDay8"&&A.startFinalBattleAmbient()},[ye==null?void 0:ye.gamePhase,ye==null?void 0:ye.subPhase,ye==null?void 0:ye.finalBattleEntry]),N.useEffect(()=>{var z,$;const A=we.current;A&&(No?(z=A.startDailyBgm)==null||z.call(A):($=A.stopDailyBgm)==null||$.call(A))},[No]),N.useEffect(()=>{var z,$;const A=we.current;A&&(zt?(z=A.startDay8Bgm)==null||z.call(A):($=A.stopDay8Bgm)==null||$.call(A))},[zt]),N.useEffect(()=>{var z,$;const A=we.current;A&&(nh?(z=A.startMenuBgm)==null||z.call(A):($=A.stopMenuBgm)==null||$.call(A))},[nh]),N.useEffect(()=>{if(!Lr||!a||!ye||ye.gamePhase!=="finalBattle")return;const A=TS(ye.finalBattleStartedAt);if(!Number.isFinite(A))return;const z=ye.finalBattleEntry==="preDay8"?dO+200:mO+350,$=A+z,Z=Math.max(0,$-Date.now()),B=setTimeout(async()=>{var q;try{const o=(q=(await d(a)).data())==null?void 0:q.gameState;if(!o||o.gamePhase!=="finalBattle")return;if(o.finalBattleEntry==="preDay8"){const f=BO(o);await l({gameState:f,status:"playing"})}else{const f=CS(o,o.players);await l({gameState:f,status:"completed"})}}catch(de){e(ts(de,"処理に失敗しました。しばらくしてから再度お試しください。"))}},Z);return()=>clearTimeout(B)},[Lr,a,ye==null?void 0:ye.gamePhase,ye==null?void 0:ye.finalBattleStartedAt,ye==null?void 0:ye.finalBattleEntry]),N.useEffect(()=>{var A;!Dr||!((A=ye==null?void 0:ye.log)!=null&&A.length)||ye.log[0]===Dr.log[0]&&Ga(null)},[ye,Dr]),N.useEffect(()=>()=>{_a.current&&(clearTimeout(_a.current),_a.current=null),ln.current&&(clearTimeout(ln.current),ln.current=null),Ea.current&&(clearTimeout(Ea.current),Ea.current=null),os.current&&(clearTimeout(os.current),os.current=null),fs.current.forEach(clearTimeout),fs.current=[],ua.current.forEach(clearTimeout),ua.current=[],ds.current&&(clearTimeout(ds.current),ds.current=null),Qa.current&&(clearTimeout(Qa.current),Qa.current=null),jr(null),Pr(null),ca(null)},[]),N.useEffect(()=>()=>{Bt.current&&(clearTimeout(Bt.current),Bt.current=null)},[]),N.useEffect(()=>{ye||Ga(null)},[ye]),N.useEffect(()=>{if(!oe||oe==="taxiHail")return;const A=Ct.current,$=oe==="drive"||oe==="driveBeforeJam"||oe==="driveAfterJam"?Un:{enter:900,boarding:500,ride:450,trafficJam:2600,arrive:1800}[oe];if($==null)return;const Z=q=>q==="enter"?"boarding":q==="boarding"?"ride":q==="ride"?A?"driveBeforeJam":"drive":q==="driveBeforeJam"?"trafficJam":q==="trafficJam"?ft.current<=0?"arrive":"driveAfterJam":q==="driveAfterJam"||q==="drive"?"arrive":null,B=setTimeout(async()=>{const q=Z(oe),de=(oe==="drive"||oe==="driveAfterJam"||oe==="trafficJam"&&q==="arrive")&&Ve.current&&a;let o=!1;if(de&&Ve.current){const m=Ve.current,b=m.players[m.currentPlayerIdx];o=((b==null?void 0:b.pendingTaxiSteps)??0)>0}if(de){const m=xe.current;let b=!1;try{await l({gameState:Ve.current}),b=!0}catch(M){e(ts(M,"処理に失敗しました。しばらくしてから再度お試しください。"))}if(Ve.current=null,xe.current=null,b){const M=U=>{var X;(X=U==null?void 0:U.lines)!=null&&X.length&&(rs.current&&clearTimeout(rs.current),oa(U),rs.current=setTimeout(()=>{oa(null),rs.current=null},2800))};if(m){const U=c0(m.fromPos,m.toPos);setTimeout(async()=>{try{await l({gameState:m.finalGS});const X=$s.current;$s.current=null,M(X)}catch(X){e(ts(X,"処理に失敗しました。しばらくしてから再度お試しください。"))}},U)}else{const U=$s.current;$s.current=null,M(U)}}me(!0),setTimeout(()=>me(!1),500)}let f=q;q==="arrive"&&o&&(f=null),f==="driveAfterJam"?(Oe(ft.current),le(!0)):(f==="drive"||f==="driveBeforeJam"||oe==="trafficJam"&&f!=="driveAfterJam")&&le(!1),f==="arrive"&&le(!1),f===null&&(Ct.current=!1,le(!1),Wt(null),vt(null)),ee(f)},$);return()=>clearTimeout(B)},[oe,a,Un]),N.useEffect(()=>{if(!dn||!V||V.subPhase!=="day8"||V.gamePhase!=="playing")return;const A=J;if(!A||A.skipTurns<=0||A.movePhase!=="moving"||(A.pendingTaxiSteps??0)>0)return;const z=V.players.map((Z,B)=>B===V.currentPlayerIdx?{...Z,skipTurns:Z.skipTurns-1}:Z),$=[`💤 ${A.name} 1回休み（炎上の巻き添え）`];Jn(Jr(V,z,$))},[dn,V==null?void 0:V.currentPlayerIdx]),N.useEffect(()=>{if(typeof nn!="number"||!ye||!n)return;const A=ye.players.find(z=>z.id===n);A&&A.position===nn&&Lt(null)},[ye,nn,n]);const Jn=async A=>{try{const z={gameState:A};return A.gamePhase==="finalBattle"&&(z.status="FINAL_BATTLE"),A.gamePhase==="results"&&(z.status="completed"),await l(z),!0}catch(z){return e(ts(z,"処理に失敗しました。しばらくしてから再度お試しください。")),!1}};pt.current=async()=>{var $;const A=Kt.current;Kt.current=null,zs.current=!1,la(!1),Ri(null);const z=(A==null?void 0:A.tileFxToast)??null;if(A!=null&&A.nextGS)try{if(A.intermediateGS&&A.tileSlideToPos!=null){const q=A.intermediateGS,de={gameState:q};q.gamePhase==="finalBattle"&&(de.status="FINAL_BATTLE"),q.gamePhase==="results"&&(de.status="completed"),await l(de),Lt(A.tileSlideToPos),await new Promise(o=>setTimeout(o,c0(A.tileSlideFromPos??A.tileSlideToPos,A.tileSlideToPos)))}const Z=A.nextGS,B={gameState:Z};Z.gamePhase==="finalBattle"&&(B.status="FINAL_BATTLE"),Z.gamePhase==="results"&&(B.status="completed"),await l(B),($=z==null?void 0:z.lines)!=null&&$.length&&(rs.current&&clearTimeout(rs.current),oa(z),rs.current=setTimeout(()=>{oa(null),rs.current=null},2800))}catch(Z){e(ts(Z,"処理に失敗しました。しばらくしてから再度お試しください。")),Lt(null),ve(!1),Bt.current&&(clearTimeout(Bt.current),Bt.current=null);return}ve(!1)};const sh=N.useCallback(()=>{if(!zs.current)return;zs.current=!1,la(!1);const A=Kt.current;A!=null&&A.nextGS&&Ri({characterType:A.characterType??"salaryman"})},[]),ah=N.useCallback(async A=>{try{const z={gameState:A};A.gamePhase==="finalBattle"&&(z.status="FINAL_BATTLE"),A.gamePhase==="results"&&(z.status="completed"),await l(z)}catch(z){e(ts(z,"処理に失敗しました。しばらくしてから再度お試しください。"))}},[l]),ih=async()=>{if(H.current)return;const A=p.trim()||vc();p.trim()||g(A);const z=`${A}#${y}`;H.current=!0,j(!0),e("");try{const $=r0();await h($,{hostId:n,status:"lobby",playerSlots:[{id:n,name:A,fullId:z}],playerIds:[n],gameState:null,isPrivate:x,allowedPlayers:x?[z]:[],acceptQuickMatch:!x&&mt,createdAt:new Date().toISOString()}),i($),S(Z=>Z+1),_("waiting")}catch($){e(ts($,"処理に失敗しました。しばらくしてから再度お試しください。"))}H.current=!1,j(!1)},Ro=async()=>{var $;if(H.current)return;if(!C.trim()){e("ルームIDを入力してください");return}const A=p.trim()||vc();p.trim()||g(A);const z=`${A}#${y}`;H.current=!0,j(!0),e("");try{const Z=C.trim().toUpperCase(),B=await d(Z);if(!B.exists()){e("ルームが見つかりません"),H.current=!1,j(!1);return}const q=B.data();if(q.status!=="lobby"){e("このルームはすでに開始されています"),H.current=!1,j(!1);return}if(q.playerSlots.length>=4){e("ルームが満員です"),H.current=!1,j(!1);return}if(q.isPrivate&&!(($=q.allowedPlayers)!=null&&$.includes(z))){e(`招待されていません。ホストに「${z}」を共有して招待してもらってください`),H.current=!1,j(!1);return}q.playerSlots.find(de=>de.id===n)||await c(Z,{playerSlots:qr({id:n,name:A,fullId:z}),playerIds:qr(n)}),i(Z),S(de=>de+1),_("waiting")}catch(Z){e(ts(Z,"処理に失敗しました。しばらくしてから再度お試しください。"))}H.current=!1,j(!1)},Sa=async()=>{if(H.current||!Lr||wn.length<1)return;if(wn.some($=>!$.character)){e("全員がキャラクターを選択してから開始してください");return}if(wn.some($=>!mi($.initialRolls))){e("全員がステータス抽選を確定（同期）してから開始してください");return}H.current=!0,j(!0);try{const $=zO(wn);await l({status:"playing",gameState:$})}catch($){e(ts($,"処理に失敗しました。しばらくしてから再度お試しください。"))}H.current=!1,j(!1)},rh=N.useCallback(async({luck:A,skill:z,virtue:$,pon:Z})=>{if(!a||!n)return!1;try{const B=mi({luck:A,skill:z,virtue:$,pon:Z});if(!B)throw new Error("ダイス値が不正です");const q=wn.map(de=>{if(de.id!==n)return de;const o={...de,initialRolls:B};return delete o.initialStats,o});return await l({playerSlots:q}),!0}catch(B){return e(ts(B,"ステータス抽選の保存に失敗しました。しばらくしてから再度お試しください。")),!1}},[a,n,wn,l]),sc=N.useCallback(async(A,z=null)=>{if(!a||!n)return;if(A===Xc&&!Wc(p)){e(`シークレットキャラは、プレイヤー名が「${xS}」と一致するときのみ選べます（前後の空白は無視）。`);return}const $=wn.map(Z=>{if(Z.id!==n)return Z;let B={...Z,character:A};if(z!=null&&typeof z=="object"){const q=mi(z);q&&(B={...B,initialRolls:q},delete B.initialStats)}return B});try{await l({playerSlots:$})}catch(Z){e(ts(Z,"処理に失敗しました。しばらくしてから再度お試しください。"))}},[a,n,p,wn,l]);N.useEffect(()=>{if(O!=="waiting"||!a||!n||Wc(p))return;const A=wn.find(z=>z.id===n);!A||A.character!==Xc||sc("salaryman")},[O,p,wn,n,a,sc]);const Aa=()=>{_("lobby"),i(null),e("")},oh=async()=>{if(H.current)return;H.current=!0,j(!0),e("");const A=p.trim()||vc();p.trim()||g(A);const z=`${A}#${y}`;try{const $=M1(S1(Wr,"rooms"),t0("status","==","lobby"),D1(10)),B=(await P1($)).docs.find(q=>{var o;const de=q.data();return!de.isPrivate&&de.acceptQuickMatch!==!1&&(((o=de.playerSlots)==null?void 0:o.length)??0)<4});if(B){const q=B.id;B.data().playerSlots.find(o=>o.id===n)||await c(q,{playerSlots:qr({id:n,name:A,fullId:z}),playerIds:qr(n)}),i(q),S(o=>o+1),_("waiting")}else{const q=r0();await h(q,{hostId:n,status:"lobby",playerSlots:[{id:n,name:A,fullId:z}],playerIds:[n],gameState:null,isPrivate:!1,allowedPlayers:[],createdAt:new Date().toISOString()}),i(q),S(de=>de+1),_("waiting")}}catch($){e(ts($,"処理に失敗しました。しばらくしてから再度お試しください。"))}H.current=!1,j(!1)},ac=async()=>{var z;const A=k.trim();if(!A||!A.match(/^.+#\d{4}$/)){w("「Name#ID」の形式（例: 闇月リリム#1234）で入力してください。# を含めた全文を入力してください");return}if((z=r==null?void 0:r.allowedPlayers)!=null&&z.includes(A)){w("すでに招待済みです");return}try{await l({allowedPlayers:qr(A)}),R(""),w("")}catch($){w(ts($,"招待の追加に失敗しました。しばらくしてから再度お試しください。"))}},Na=()=>{Gs&&navigator.clipboard.writeText(Gs).then(()=>{_e(!0),setTimeout(()=>_e(!1),2e3)})},ic=()=>{const A=p.trim()||vc();p.trim()||g(A),_t(!1),Ot(null),e(""),_("lobby")},ko=async()=>{if(H.current)return;const A=p.trim()||vc();p.trim()||g(A);const z=`${A}#${y}`;H.current=!0,j(!0),e("");try{const $=r0();await h($,{hostId:n,status:"lobby",playerSlots:[{id:n,name:A,fullId:z}],playerIds:[n],gameState:null,isPrivate:!0,isSolo:!0,allowedPlayers:[z],acceptQuickMatch:!1,createdAt:new Date().toISOString()}),i($),S(Z=>Z+1),_("waiting")}catch($){e(ts($,"一人プレイ用のルームを作成できませんでした。ネットワークを確認のうえ、再度お試しください。"))}H.current=!1,j(!1)},rm=async()=>{if(!H.current&&Gs){H.current=!0,j(!0),e("");try{const A=M1(S1(Wr,"rooms"),t0("status","==","lobby"),t0("allowedPlayers","array-contains",Gs),D1(5)),$=(await P1(A)).docs.find(q=>{var o,f;const de=q.data();return(((o=de.playerSlots)==null?void 0:o.length)??0)<4&&!((f=de.playerSlots)!=null&&f.find(m=>m.id===n))});if(!$){e("招待されているルームが見つかりませんでした"),H.current=!1,j(!1);return}const Z=$.id,B=p.trim();await c(Z,{playerSlots:qr({id:n,name:B,fullId:Gs}),playerIds:qr(n)}),i(Z),S(q=>q+1),_("waiting")}catch(A){e(ts(A,"処理に失敗しました。しばらくしてから再度お試しください。"))}H.current=!1,j(!1)}},lh=async()=>{if(!V||!dn)return;const A=V.players[V.currentPlayerIdx];if(A.movePhase!=="goalLanding"||!Xa())return;const z=A.reservedSlotTurns??0;let $;if(z<=0){const q=[`${A.name}: ゴール済み／スロット権利0回でラウンド不参加`];$=V.players.map((de,o)=>o!==V.currentPlayerIdx?de:{...de,movePhase:"arrived",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}),await Jn(Jr(V,$,q));return}const Z=z*P.dice.slotsPerSugorokuTurn,B=[`${A.name}: ゴール到着ターン終了　→ スロット${z}ターンブン（計最大${Z}回）は次の自分のターンで開始できます`];$=V.players.map((q,de)=>de!==V.currentPlayerIdx?q:{...q,movePhase:"waitingSlot"}),await Jn(Jr(V,$,B))},Br=async()=>{if(!V||!dn)return;const A=V.players[V.currentPlayerIdx];if(A.movePhase!=="waitingSlot")return;const z=A.reservedSlotTurns??0;if(z<=0)return;const $=Math.max(0,z*P.dice.slotsPerSugorokuTurn),Z=[`${A.name}: スロット開始（${z}ターンブン・計${$}回）`],B=V.players.map((q,de)=>de!==V.currentPlayerIdx?q:{...q,movePhase:"arrived",slotTurnsLeft:$,reservedSlotTurns:0,slotPullsGranted:$,slotPullsThisSeat:0});await Jn({...V,players:B,log:ks(Z,V.log)})},zr=N.useRef(!1);N.useEffect(()=>{if(!dn||!Ur){zr.current=!1;return}zr.current||(zr.current=!0,Br().finally(()=>{zr.current=!1}))},[dn,Ur,V]);const rc=N.useMemo(()=>{if(!J)return null;const A={...J.stats},z=J.amulets??0;return z>0&&(A.luck=Tt(A.luck+z*2)),A},[J]),[Co,Io]=N.useState(!1),ch=()=>{if(!dn||!ye||ye.subPhase!=="daily"||Hs!=null||Fs!=null||at!=null||Ta||hs!=null||ki)return;const A=ye.players[ye.currentPlayerIdx];!A||A.stats.money<P.dailySlot.spinBet*P.dailySlot.spins||Io(!0)},Mo=N.useCallback(async A=>{var sn;const z=tc.current;if(!z||z.subPhase!=="daily")return;const $=z.currentPlayerIdx,Z=z.players[$];let B={...Z.stats};const q=[],de=B.virtue,o=Zt[Z.characterType]??Zt.salaryman,f=o.ponMultiplier;let m=Z.streamMultiplier??o.streamMultiplier,b=Z.amulets??0;if(b>0){const W=b*2;B.luck=Tt(B.luck+W),q.push(`🧿 お守り効果（${b}個）: 運+${W}→${B.luck}`)}const M=P.dailySlot;if(!Array.isArray(A)||A.length!==M.spins){e("デイリースロットの結果データが不正です");return}q.push(`${Z.name} ${z.currentDay}日目【デイリースロット・技能練習】${A.length}回（各${M.spinBet}Gベット／8日目スロットと同じ役配当テーブル）`);const U=typeof((sn=A[A.length-1])==null?void 0:sn.pityCounterAfter)=="number"?A[A.length-1].pityCounterAfter:Z.slotPityCounter??0;let X=0;A.forEach((W,Me)=>{const He=Number((W==null?void 0:W.bet)??M.spinBet),jt=Number((W==null?void 0:W.payout)??0),It=jt-He;X+=It,B.money=gn(B.money-He+jt);const Qe=M.skillGainEverySpin,Jt=W!=null&&W.tier&&W.tier!=="miss"?M.skillGainOnRole:0;B.skill=Tt(B.skill+Qe+Jt),q.push(`  ${Me+1}回目 [${He}G]: ${(W==null?void 0:W.message)??"？"} / 収支${It>=0?"+":""}${It}G → 資金${B.money}G・技量${B.skill}（本回練習+${Qe}${Jt?`・役ボ+${Jt}`:""}）`)}),q.push(`  デイリースロット収支計 ${X>=0?"+":""}${X}G`);const be="dailySlot";if(z.subPhase==="daily"){const W=kc(Z);B.money=gn(B.money-W),q.push(`  生活費 -${W}G → 資金 ${B.money}G${B.money<0?" 【借金中】":""}`)}const ct=Math.ceil(P.pon.dailyGain*f),rt=B.pon;B.pon=Tt(B.pon+ct),q.push(`  PON: ${rt} +${ct}${f!==1?`(×${f})`:""} → ${B.pon}`);let ut=null,Qt=m;const Zn=o.ponFireMoneyPenaltyMultiplier??1;if(B.pon>=P.pon.fireThreshold&&Math.random()<B.pon/100){const W=B.pon;{const Me=Math.max(1,Math.round(Ue(P.pon.work.penaltyMin,P.pon.work.penaltyMax)*Zn));B.money=gn(B.money-Me),ut=`⚠️ 弁償！資金-${Me}G`}B.pon=Math.floor(W/2),q.push(`  [PON発火 ${W}%] ${ut} / PON→半減→${B.pon}`)}else q.push(`  PON発火なし（${B.pon>=P.pon.fireThreshold?`${B.pon}%判定ハズレ`:`閾値${P.pon.fireThreshold}まであと${P.pon.fireThreshold-B.pon}`}）`);let cn=z.players.map((W,Me)=>Me===$?{...W,stats:B,streamMultiplier:Qt,amulets:b,slotPityCounter:U}:W);cn=Ph(Z,de,B.virtue,cn,q),ut&&be==="stream"&&z.subPhase==="day8"&&(cn=Hp($,cn,q)),z.subPhase==="daily"&&(cn=cn.map((W,Me)=>Me!==$?W:px(W,q))),ut&&be==="stream"&&(me(!0),setTimeout(()=>me(!1),500));const mn={...z,recentPonEvent:ut?{player:Z.name,msg:ut}:null},Ks=yx(mn,cn,q),Fe=z.currentDay===Ma&&$===z.players.length-1;z.currentDay===Ma&&z.subPhase==="daily"&&Ga(Dx(Ks,z,Fe)),Fe&&await new Promise(W=>setTimeout(W,Vl)),await Jn(Ks)||Ga(null)},[Jn]),uh=async A=>{if(!dn||!ye||Hs!=null||Fs!=null||at!=null||Ta||hs!=null||ki||!Xa())return;A!=="stream"&&(fs.current.forEach(clearTimeout),fs.current=[],os.current&&(clearTimeout(os.current),os.current=null),jr(null)),A!=="work"&&(ua.current.forEach(clearTimeout),ua.current=[],ds.current&&(clearTimeout(ds.current),ds.current=null),ln.current&&(clearTimeout(ln.current),ln.current=null),Pr(null),ca(null));const z=ye,$=z.players[z.currentPlayerIdx],Z=$.stats.money;let B={...$.stats};const q=[];let de=!1,o=!1,f=!1,m=0,b=0;const M=B.virtue,U=Zt[$.characterType]??Zt.salaryman,X=U.ponMultiplier;let be=$.streamMultiplier??U.streamMultiplier,ct=$.amulets??0;if(ct>0){const W=ct*2;B.luck=Tt(B.luck+W),q.push(`🧿 お守り効果（${ct}個）: 運+${W}→${B.luck}`)}if(A==="shrine"){const W=P.shrine,Me=B.virtue;B.money=gn(B.money-W.cost),B.luck=Tt(B.luck+W.luckGain),B.virtue=Tt(B.virtue+W.virtueGain),B.pon=Math.max(0,B.pon-W.ponReduce),q.push(`${$.name} ${z.currentDay}日目【神社】二礼二拍手一礼。運気が上がった気がする！ -${W.cost}G / 運+${W.luckGain}→${B.luck} / 善行+${W.virtueGain}→${B.virtue} / PON-${W.ponReduce}→${B.pon}`);const He=CO(Me,W.amuletBaseRate);Math.random()<He&&(ct++,q.push(`  🧿 お守りを入手した！（計${ct}個／善行${Me}・抽選${(He*100).toFixed(0)}%）`)),At("in"),setTimeout(()=>At("out"),1700),setTimeout(()=>At(null),2700)}else if(A==="work"){ua.current.forEach(clearTimeout),ua.current=[],ds.current&&(clearTimeout(ds.current),ds.current=null),ln.current&&(clearTimeout(ln.current),ln.current=null),ca(null);const W=U.workRewardBonus??0,Me=U.workRewardMultiplier??1,He=Math.floor((P.work.reward+W)*Me),jt=Jc(B.virtue),It=l0(He,B.virtue),Qe=P.work.virtueGain;B.money=gn(B.money+It),B.virtue=Tt(B.virtue+Qe),Pr({gold:It,stat:{label:"善行",delta:Qe},characterType:$.characterType}),ds.current=window.setTimeout(()=>{Pr(null),ds.current=null},2e3),q.push(`${$.name} ${z.currentDay}日目【仕事】資金+${It}G${W?`（査定+${W}G込み・×${Me}）`:Me!==1?`（×${Me}）`:""}・善行収入×${jt.toFixed(2)}（ベース${He}G） / 善行+${Qe}→${B.virtue}`),m=It}else if(A==="stream"){fs.current.forEach(clearTimeout),fs.current=[];const W=Math.random()<.5?"chat":"game",Me=W==="chat"?"雑談配信":"ゲーム配信";os.current&&(clearTimeout(os.current),os.current=null);const He=B.skill+B.luck,jt=He>P.stream.combinedStatNoFailThreshold?0:Math.max(0,P.stream.baseFailRate-He/P.stream.combinedStatNoFailThreshold*P.stream.baseFailRate),It=Math.random()<jt;de=It;let Qe=0,Jt=null;if(It){const ms=P.stream.successMin,As=Math.round(ms*be),ka=Jc(B.virtue),In=l0(As,B.virtue);Qe=In,B.money=gn(B.money+In),q.push(`${$.name} ${z.currentDay}日目【${Me}】💥失敗（最低収入） 資金+${In}G（成功時下限${P.stream.successMin}G×配信×${be.toFixed(1)}・善行収入×${ka.toFixed(2)}・基準${As}G）/ 善行・技量ボーナスなし (失敗率${(jt*100).toFixed(0)}%)`)}else{const ms=Ue(P.stream.successMin,P.stream.successMax),As=Math.round(ms*be),ka=Jc(B.virtue),In=l0(As,B.virtue);if(Qe=In,B.money=gn(B.money+In),W==="chat"){const Sn=Ue(P.stream.chat.virtueGainMin,P.stream.chat.virtueGainMax);B.virtue=Tt(B.virtue+Sn),Jt=Sn?{label:"善行",delta:Sn}:null,q.push(`${$.name} ${z.currentDay}日目【${Me}】✨成功 資金+${In}G（配信×${be.toFixed(1)}・善行収入×${ka.toFixed(2)}・基準${As}G） / 善行+${Sn}→${B.virtue} (失敗率${(jt*100).toFixed(0)}%)`)}else{const Sn=Ue(P.stream.game.skillGainMin,P.stream.game.skillGainMax);B.skill=Tt(B.skill+Sn),Jt=Sn?{label:"技量",delta:Sn}:null,q.push(`${$.name} ${z.currentDay}日目【${Me}】✨成功 資金+${In}G（配信×${be.toFixed(1)}・善行収入×${ka.toFixed(2)}・基準${As}G） / 技量+${Sn}→${B.skill} (失敗率${(jt*100).toFixed(0)}%)`)}}jr({mode:W,gold:Qe,stat:Jt}),os.current=setTimeout(()=>{jr(null),os.current=null},2e3)}else return;if(z.subPhase==="daily"){const W=kc($);B.money=gn(B.money-W),q.push(`  生活費 -${W}G → 資金 ${B.money}G${B.money<0?" 【借金中】":""}`)}const rt=Math.ceil(P.pon.dailyGain*X),ut=B.pon;B.pon=Tt(B.pon+rt),q.push(`  PON: ${ut} +${rt}${X!==1?`(×${X})`:""} → ${B.pon}`);let Qt=null,Zn=be;const cn=U.ponFireMoneyPenaltyMultiplier??1;if(B.pon>=P.pon.fireThreshold&&Math.random()<B.pon/100){const W=B.pon;if(A==="stream"){const Me=Ue(P.pon.stream.moneyMin,P.pon.stream.moneyMax);B.money=gn(B.money+Me),B.skill=Tt(B.skill-P.pon.stream.skillLoss,0),Qt=`🔥 失言がバズった！資金+${Me}G / 技量-${P.pon.stream.skillLoss}`,$.characterType==="vtuber"&&(Zn=+(be+.5).toFixed(1),Qt+=` / 🎭リリム効果：配信倍率 ×${be.toFixed(1)}→×${Zn.toFixed(1)}（永続UP！）`),o=!0}else if(A==="shrine"){const Me=Math.max(1,Math.round(Ue(50,150)*cn));B.money=gn(B.money-Me),Qt=`⚠️ ご神域で粗相をしてしまった！資金-${Me}G`}else{const Me=Math.max(1,Math.round(Ue(P.pon.work.penaltyMin,P.pon.work.penaltyMax)*cn));B.money=gn(B.money-Me),Qt=`⚠️ 弁償！資金-${Me}G`,A==="work"&&(f=!0,b=Me)}B.pon=Math.floor(W/2),q.push(`  [PON発火 ${W}%] ${Qt} / PON→半減→${B.pon}`)}else q.push(`  PON発火なし（${B.pon>=P.pon.fireThreshold?`${B.pon}%判定ハズレ`:`閾値${P.pon.fireThreshold}まであと${P.pon.fireThreshold-B.pon}`}）`);if(A==="stream"){fs.current.forEach(clearTimeout),fs.current=[];let jt=2e3;if(o){const It=window.setTimeout(()=>{var Qe,Jt;Wu(!0),me(!0),window.setTimeout(()=>me(!1),500);try{(Jt=(Qe=we.current)==null?void 0:Qe.playStreamPonBurn)==null||Jt.call(Qe)}catch{}Ea.current&&clearTimeout(Ea.current),Ea.current=window.setTimeout(()=>{Wu(!1),Ea.current=null},3300)},jt);fs.current.push(It),jt+=3300}if(de){const It=window.setTimeout(()=>{var Qe,Jt;Or(!0);try{(Jt=(Qe=we.current)==null?void 0:Qe.playStreamFailGaan)==null||Jt.call(Qe)}catch{}_a.current&&clearTimeout(_a.current),_a.current=window.setTimeout(()=>{Or(!1),_a.current=null},3200)},jt);fs.current.push(It)}}if(A==="work"&&(ua.current.forEach(clearTimeout),ua.current=[],f)){const He=m-b,jt={penalty:b,workIncome:m,balanceAfter:B.money,turnDelta:He,moneyBefore:Z},It=window.setTimeout(()=>{var Qe,Jt;ca(jt);try{(Jt=(Qe=we.current)==null?void 0:Qe.playWorkPonPlateBreak)==null||Jt.call(Qe)}catch{}ln.current&&clearTimeout(ln.current),ln.current=window.setTimeout(()=>{ca(null),ln.current=null},3100)},2e3);ua.current.push(It)}let mn=z.players.map((W,Me)=>Me===z.currentPlayerIdx?{...W,stats:B,streamMultiplier:Zn,amulets:ct}:W);if(mn=Ph($,M,B.virtue,mn,q),Qt&&A==="stream"&&z.subPhase==="day8"&&(mn=Hp(z.currentPlayerIdx,mn,q)),z.subPhase==="daily"){const W=z.currentPlayerIdx;mn=mn.map((Me,He)=>He!==W?Me:px(Me,q))}const Ks={...z,recentPonEvent:Qt?{player:$.name,msg:Qt}:null},Fe=yx(Ks,mn,q),gt=z.currentDay===Ma&&z.currentPlayerIdx===z.players.length-1;z.currentDay===Ma&&z.subPhase==="daily"&&Ga(Dx(Fe,z,gt)),gt&&await new Promise(W=>setTimeout(W,Vl)),await Jn(Fe)||Ga(null)},hh=async A=>{var Ks;if(!dn||!V||Di)return;const z=V.currentPlayerIdx,$=V.players[z];if($.movePhase!=="moving"||!Xa())return;const Z=$.pendingTaxiSteps??0;if(Z>0){if(re||A!=="taxiTrafficWait")return;Bt.current&&(clearTimeout(Bt.current),Bt.current=null),zs.current=!1,la(!1),Lt(null),xe.current=null;const Fe={...$.stats},gt=Fe.pon,sn=Fe.virtue;Fe.pon=Tt(Fe.pon+Z);const W=Math.min(Ft,$.position+Z),Me=$.moveTurns+1,He=[];$.characterType==="vtuber"&&He.push(`🎭 ${$.name}: "Ugh, this traffic is the worst! My stream is going to be late!"`);const jt=bx(V,z,W,Fe,He,{ponSplashDamage:!1,skipTileEffects:!0});if((Ks=jt.gameOverByDebt)!=null&&Ks.triggered){await Jn({...V,gamePhase:"gameOver",gameOverMsg:jt.gameOverByDebt.message,log:ks([`💀 GAME OVER: ${jt.gameOverByDebt.message}`],V.log)});return}const It=jt.players[z],Qe=It.position,Jt=It.stats,ms=Qe>=Ft,As=!ms&&Me>=P.dice.maxTurns,ka=ms?Math.max(0,P.dice.maxTurns-Me):0;let In=`🚗 渋滞を待つ（Wait in Traffic）⋯ 残り${Z}マス進行 → ${Qe}/${Ft}マス / PON${gt}+${Z}→${Jt.pon}`;if(Qe!==W&&(In+=`（マス効果:${W}→${Qe}）`),He.push(`${$.name} T${Me}: ${In}`),ms){const jo=ka*P.dice.slotsPerSugorokuTurn;He.push(`🎯 ${$.name} がゴールへ到着！獲得スロット ${ka}ターンブン（開始時までに計${jo}回）（確認後ターン終了 → 次の自分のターンでスロット開始）`)}As&&He.push(`⏰ ${$.name} タイムアップ（${P.dice.maxTurns}ターン消費）`);let Sn=Ph($,sn,Jt.virtue,jt.players,He).map((jo,PS)=>{if(PS!==z)return jo;const om={...jo,moveTurns:Me,lastMoveEvent:In,pendingTaxiSteps:0};return ms?{...om,movePhase:"goalLanding",slotTurnsLeft:0,reservedSlotTurns:ka,slotPullsGranted:0,slotPullsThisSeat:0}:As?{...om,movePhase:"missed",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}:{...om,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}});const da={...jt.gsWithTiles,lastDiceRolls:[]},$r=ms?{...da,players:Sn,log:ks(He,da.log)}:Jr(da,Sn,He),Do=Qe!==W,cc=Do?Lh(Sn,z,W):null,Mt=cc?{...da,players:cc}:null,Bn=Do?W:Qe;st(!0),setTimeout(()=>st(!1),700);const Oo=Cc(Math.abs(Bn-$.position))*2;ue.current=Oo,Nt(Oo),Wt(Bn),vt(null),ft.current=0,Oe(Oo),Ve.current=Do&&Mt?Mt:$r,xe.current=Do&&Mt?{finalGS:$r,fromPos:W,toPos:Qe}:null,Ct.current=!1,$s.current=jt.tileToast,le(!0),ee("drive");return}if(re)return;if(Bt.current&&(clearTimeout(Bt.current),Bt.current=null),zs.current=!1,la(!1),Lt(null),xe.current=null,A==="help"&&$.stats.pon>=P.pon.deathThreshold&&Math.random()<P.pon.deathChance){const Fe=V.players.map((gt,sn)=>sn===V.currentPlayerIdx?{...gt,alive:!1}:gt);await Jn({...V,players:Fe,gamePhase:"gameOver",gameOverMsg:`${$.name} はPON${$.stats.pon}の状態で人助けに失敗し、社会的に抹殺された…`,log:ks([`💀 GAME OVER: ${$.name} / PON${$.stats.pon}で人助け失敗！`],V.log)});return}let B=0,q=[],de="",o=!1,f=0,m=!1,b=0,M={...$.stats};const U=[],X=M.virtue;if(A==="help"){B=1;const Fe=Ue(P.dice.helpVirtueMin,P.dice.helpVirtueMax);M.virtue=Tt(M.virtue+Fe),de=`人助け！1マス前進 / 善行+${Fe}（→${M.virtue}）`,q=[1]}else if(A==="taxi"){if(M.money<P.dice.taxiCost)return;M.money=gn(M.money-P.dice.taxiCost);const Fe=Ue(P.dice.taxiMoveMin,P.dice.taxiMoveMax);f=P.dice.taxiBaseTurns-1,q=[Fe],B=Fe,de=`タクシー！${Fe}マス予定 / 資金-${P.dice.taxiCost}G`;const gt=Math.max(0,Math.min(1,P.dice.taxiCongestChance)),sn=M.virtue>=P.dice.taxiCongestThresh?0:gt*((P.dice.taxiCongestThresh-M.virtue)/P.dice.taxiCongestThresh);if(Math.random()<sn){const W=Math.ceil(Fe/2);$.position+W>=Ft||(b=Fe-W,B=W,m=!0,M.pon=Tt(M.pon+P.dice.taxiCongestPon),de+=` / 🚗渋滞！まず ${W} マスのみ進行／残り ${b} マスは次の自分ターンで完了（試行+PON+${P.dice.taxiCongestPon}）`)}}else{const Fe=RO($.stats);B=Fe.value,q=[...Fe.rolls],o=Fe.advantage;const gt=Fe.advantage?`（運アドバンテージ：合計${Fe.value}マス）`:"";if(A==="shop"){if(M.money<P.dice.shopCost)return;const sn=Ue(1,4);B+=sn,q=[...Fe.rolls,sn],M.money=gn(M.money-P.dice.shopCost),de=`コンビニ！🎲${Fe.rolls.join(", ")}${gt} + 店舗🎲${sn} = ${B}マス / -${P.dice.shopCost}G`}else de=`🎲 ダイスの出目: ${Fe.rolls.join(", ")}${gt} (合計${B}マス)`}let be=!1;const ct=B;A!=="taxi"&&M.pon>=P.pon.fireThreshold&&Math.random()<M.pon/100&&(be=!0,B=Math.ceil(B/2));const rt=M.pon;M.pon=Tt(M.pon+B),be&&(M.pon=Math.floor(M.pon/2));const ut=q.length,Qt=400,Zn=520,cn=Qt+(ut-1)*Zn+2e3;ve(!0),Ge(Array(ut).fill(null)),Vn(Array(ut).fill(!1)),Ye(Array.from({length:ut},()=>Ue(1,6))),tn(o),Se(!1),A==="taxi"&&ee("taxiHail"),o&&(Ln(!0),setTimeout(()=>Ln(!1),1900));const mn=setInterval(()=>{Ye(Array.from({length:ut},()=>Ue(1,6)))},80);setTimeout(()=>{clearInterval(mn),q.forEach((Fe,gt)=>{setTimeout(()=>{Ge(sn=>{const W=[...sn];return W[gt]=Fe,W}),Vn(sn=>{const W=[...sn];return W[gt]=!0,W}),gt===ut-1&&setTimeout(()=>Se(!0),200)},gt*Zn)})},Qt),setTimeout(async()=>{var cc;const Fe=be?Math.ceil(ct/2):B,gt=Math.min(Ft,$.position+Fe),sn=$.moveTurns+1+f,W=bx(V,z,gt,M,U,{ponSplashDamage:be,skipTileEffects:A==="taxi"});if((cc=W.gameOverByDebt)!=null&&cc.triggered){await Jn({...V,gamePhase:"gameOver",gameOverMsg:W.gameOverByDebt.message,log:ks([`💀 GAME OVER: ${W.gameOverByDebt.message}`],V.log)}),ve(!1);return}const Me=W.players[z],He=Me.position,jt=Me.stats,It=He>=Ft,Qe=!It&&sn>=P.dice.maxTurns,Jt=It?Math.max(0,P.dice.maxTurns-sn):0,ms=be?` ⚡転倒(${rt}%) ${ct}→${B}マス / PON→半減→${jt.pon}`:` / PON${rt}+${B}→${jt.pon}`;let As=`${de} → ${He}/${Ft}マス${ms}`;if(He!==gt&&(As+=`（マス効果:${gt}→${He}）`),q.length>1&&U.push(`  ダイスの出目: ${q.join(", ")} (合計${ct}${be?`→転倒で${B}`:""}マス)`),be&&U.push(`  ⚡転倒！${ct}マス→${B}マス / PON半減`),It){const Mt=Jt*P.dice.slotsPerSugorokuTurn;U.push(`🎯 ${$.name} がゴールへ到着！獲得スロット ${Jt}ターンブン（開始時までに計${Mt}回）（確認後ターン終了 → 次の自分のターンでスロット開始）`)}Qe&&U.push(`⏰ ${$.name} タイムアップ（${P.dice.maxTurns}ターン消費）`),U.push(`${$.name} T${sn}: ${As}`);const ka=!Qe&&!It&&m?b:0;let In=Ph($,X,W.players[z].stats.virtue,W.players,U).map((Mt,Bn)=>{if(Bn!==V.currentPlayerIdx)return Mt;const Fr={...Mt,moveTurns:sn,lastMoveEvent:As,pendingTaxiSteps:ka};return It?{...Fr,movePhase:"goalLanding",slotTurnsLeft:0,reservedSlotTurns:Jt,slotPullsGranted:0,slotPullsThisSeat:0}:Qe?{...Fr,movePhase:"missed",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}:{...Fr,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}});const Sn={...W.gsWithTiles,lastDiceRolls:q},da=It?{...Sn,players:In,log:ks(U,W.gsWithTiles.log)}:Jr(Sn,In,U),$r=He!==gt,Do=()=>{var Mt,Bn;(Bn=(Mt=W.tileToast)==null?void 0:Mt.lines)!=null&&Bn.length&&(rs.current&&clearTimeout(rs.current),oa(W.tileToast),rs.current=setTimeout(()=>{oa(null),rs.current=null},2800))};if(st(!0),setTimeout(()=>st(!1),700),A==="taxi"){if(Ct.current=m,$s.current=W.tileToast,m){Ve.current=da,xe.current=null;const Mt=Cc(Math.abs(He-$.position));ue.current=Mt,Nt(Mt),Wt(He);const{jamMid:Bn,firstLegMs:Fr,secondLegMs:Oo}=YO($.position,He,q[0],Mt);vt(Bn),ft.current=Oo,Oe(Fr)}else if($r){const Mt=Lh(In,z,gt);Ve.current={...Sn,players:Mt},xe.current={finalGS:da,fromPos:gt,toPos:He};const Bn=Cc(Math.abs(gt-$.position));ue.current=Bn,Nt(Bn),Wt(gt),vt(null),ft.current=0,Oe(Bn)}else{Ve.current=da,xe.current=null;const Mt=Cc(Math.abs(He-$.position));ue.current=Mt,Nt(Mt),Wt(He),vt(null),ft.current=0,Oe(Mt)}ee("enter"),le(!1),ve(!1)}else if(be){const Mt=$r?Lh(In,z,gt):null,Bn=Mt?{...Sn,players:Mt}:null;Kt.current={nextGS:da,characterType:$.characterType??"salaryman",tileFxToast:W.tileToast,intermediateGS:Bn,tileSlideFromPos:gt,tileSlideToPos:$r?He:null},zs.current=!0,Bt.current&&(clearTimeout(Bt.current),Bt.current=null),Lt(gt),la(!0),ve(!1)}else{if($r){const Mt=Lh(In,z,gt),Bn={...Sn,players:Mt};if(!await Jn(Bn)){ve(!1);return}if(await new Promise(jo=>setTimeout(jo,c0($.position,gt))),!await Jn(da)){ve(!1);return}}else if(!await Jn(da)){ve(!1);return}ve(!1),Do()}},cn)};if(!F)return u.jsxs("div",{className:"min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-300 px-6",children:[u.jsx(Yi,{size:32,className:"animate-spin text-cyan-400"}),u.jsx("p",{className:"text-sm font-semibold",children:"Loading Assets..."}),u.jsx("div",{className:"w-full max-w-sm rounded-full bg-slate-800 h-2 overflow-hidden",children:u.jsx("div",{className:"h-full bg-cyan-400 transition-all duration-200",style:{width:`${se.total>0?se.loaded/se.total*100:0}%`}})}),u.jsxs("p",{className:"text-xs text-slate-400 tabular-nums",children:[se.loaded," / ",se.total]})]});if(!s)return u.jsxs("div",{className:"min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400",children:[u.jsx(Yi,{size:32,className:"animate-spin text-cyan-400"}),u.jsx("p",{className:"text-sm",children:"接続中…"})]});if(Ka)return u.jsxs("div",{className:"min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center anim-fadein",children:[u.jsx("p",{className:"text-[min(18vw,7rem)] font-black tracking-tight text-rose-200 drop-shadow-[0_0_30px_rgba(244,63,94,0.65)]",children:"ゲームオーバー"}),u.jsx("p",{className:"mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed",children:Ka})]});if(O==="entry")return u.jsx("div",{className:"min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 pb-12 text-slate-100",children:u.jsxs("div",{className:"w-full max-w-6xl flex flex-col items-center text-center space-y-10",children:[u.jsxs("div",{className:"flex flex-col items-center gap-5 w-full",children:[u.jsx("img",{src:Us(DS),alt:dd,className:"w-full max-w-[min(100%,1020px)] h-auto object-contain select-none drop-shadow-[0_0_40px_rgba(34,211,238,0.12)]"}),u.jsxs("div",{className:"space-y-3 px-1 max-w-3xl",children:[u.jsx("h1",{className:"text-xl sm:text-2xl md:text-[1.65rem] font-bold text-slate-50 leading-snug tracking-tight font-[Rajdhani]",children:dd}),u.jsxs("p",{className:"text-[11px] font-semibold tracking-[0.32em] text-cyan-400/90 uppercase",children:[df," · ",f0]}),u.jsxs("div",{className:"rounded-xl border border-slate-700/80 bg-slate-900/50 px-3 py-2.5 text-left",children:[u.jsx("p",{className:"text-[11px] font-bold text-amber-200/95 mb-1",children:"ソロ先行プレイ版"}),u.jsx("p",{className:"text-xs text-slate-400 leading-relaxed",children:"マルチプレイ（オンライン）はロック中です。まず一人でゲームシステムをお楽しみください。"})]})]})]}),u.jsxs("div",{className:"w-full max-w-md space-y-4",children:[u.jsxs("div",{className:"space-y-2 text-left",children:[u.jsx("label",{className:"text-sm text-slate-300 font-semibold block",children:"プレイヤー名"}),u.jsx("input",{value:p,onChange:A=>g(A.target.value),onKeyDown:A=>A.key==="Enter"&&ic(),maxLength:12,className:"w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-base text-center focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-colors",placeholder:"デモ版のため、STARTで始められます"}),u.jsx("p",{className:"text-xs text-slate-500 text-center",children:"空欄の場合はランダムな名前が割り当てられます"})]}),u.jsxs("button",{type:"button",onClick:ic,className:"w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] py-4 font-bold text-slate-950 transition-all shadow-lg shadow-cyan-900/35 border border-cyan-400/30",children:[u.jsx("span",{className:"block text-xl tracking-[0.2em] font-black",children:"START"}),u.jsx("span",{className:"block text-xs font-semibold text-slate-900/75 mt-1",children:"遊ぶ"})]})]})]})});if(O==="lobby")return u.jsx(Aj,{myFullId:Gs,copied:ae,onCopyMyId:Na,loading:L,onSoloPlay:ko,multiOpen:Pe,onToggleMultiOpen:()=>{_t(A=>!A),Ot(null),e("")},multiAction:$e,onSetMultiAction:Ot,onQuickMatch:oh,isPrivateRoom:x,onSetPrivateRoom:E,allowQuickMatch:mt,onSetAllowQuickMatch:nt,onCreateRoom:ih,joinInput:C,onJoinInputChange:I,onJoinRoom:Ro,onCheckInvites:rm,uiError:t,onClearUiError:()=>e(""),seVolume:K,bgmVolume:ne,onSeVolumeChange:fa,onBgmVolumeChange:Oi});if(O==="waiting")return u.jsx($j,{waitingSessionKey:v,myFullId:Gs,copied:ae,onCopyMyId:Na,roomData:r,roomId:a,playerSlots:wn,myId:n,isHost:Lr,onReturnToLobby:Aa,onSelectCharacter:sc,onCommitInitialRolls:rh,soundRef:we,onStartGame:Sa,loading:L,uiError:t,inviteInput:k,onInviteInputChange:R,inviteError:D,onInvitePlayer:ac,seVolume:K,bgmVolume:ne,onSeVolumeChange:fa,onBgmVolumeChange:Oi,unlockPlayerNameForSecret:p,onSecretCharacterSelected:im});if(O==="gameover")return u.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[u.jsx(eu,{myFullId:Gs,copied:ae,onCopy:Na,seVolume:K,bgmVolume:ne,onSeVolumeChange:fa,onBgmVolumeChange:Oi}),u.jsxs("div",{className:"w-full max-w-md space-y-6 text-center",children:[u.jsx("div",{className:"text-7xl",children:"💀"}),u.jsx("h2",{className:"text-3xl font-bold text-rose-400",children:"GAME OVER"}),u.jsx("p",{className:"text-slate-300 text-sm leading-relaxed",children:V==null?void 0:V.gameOverMsg}),((oc=V==null?void 0:V.players)==null?void 0:oc.some(A=>A.alive))&&u.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left space-y-2",children:[u.jsx("p",{className:"text-xs text-slate-400 mb-2",children:"生き残ったプレイヤー"}),(V.players??[]).filter(A=>A.alive).map(A=>u.jsxs("div",{className:"flex justify-between text-sm",children:[u.jsxs("span",{children:[A.name,A.id===n&&" (YOU)"]}),u.jsxs("span",{className:"text-yellow-300",children:[A.stats.money,"G / ",Zc(A.stats.money),"ランク"]})]},A.id))]}),u.jsx("button",{onClick:Aa,className:"rounded-xl bg-cyan-500 px-8 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ロビーへ戻る"})]})]});if(O==="results"){const A=[...(V==null?void 0:V.players)??[]].sort((q,de)=>de.stats.money-q.stats.money),z=["🥇","🥈","🥉",""],$=A.length>0?A[0]:null,Z=$!=null&&Zc($.stats.money)==="SS",B=Z?$.characterType==="vtuber"?"✦ 伝説のリリム ✦":"✦ 伝説のスター ✦":"最終結果";return u.jsxs("div",{className:"relative min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8 overflow-hidden",children:[u.jsx("style",{children:kx}),u.jsx(eu,{myFullId:Gs,copied:ae,onCopy:Na,seVolume:K,bgmVolume:ne,onSeVolumeChange:fa,onBgmVolumeChange:Oi}),Z&&u.jsx(Nj,{}),u.jsxs("div",{className:"mx-auto max-w-lg space-y-5 relative z-10",children:[u.jsxs("div",{className:"text-center space-y-2",children:[Z?u.jsx("div",{className:"text-5xl leading-none select-none anim-fadein",children:"👑"}):u.jsx(tO,{size:52,className:"mx-auto text-amber-400"}),u.jsx("h2",{className:`text-3xl font-bold ${Z?"text-yellow-300":""}`,children:B}),Z&&u.jsx("p",{className:"text-amber-300/80 text-sm tracking-wider",children:"スーパースター達成！おめでとう！"})]}),u.jsx("div",{className:"space-y-3",children:A.map((q,de)=>{const o=Zc(q.stats.money),f=o==="SS";return u.jsx("div",{className:`rounded-xl border p-4 ${de===0&&f?"border-yellow-400/80 bg-yellow-400/10 shadow-[0_0_24px_rgba(251,191,36,0.25)]":de===0?"border-amber-400/60 bg-amber-400/10":"border-slate-800 bg-slate-900"}`,children:u.jsxs("div",{className:"flex items-center gap-3",children:[u.jsx("span",{className:"text-2xl",children:f&&de===0?"👑":z[de]??""}),u.jsxs("div",{className:"flex-1",children:[u.jsxs("div",{className:"font-semibold flex items-center gap-2 flex-wrap",children:[u.jsx("span",{className:f?"text-yellow-200":"",children:q.name}),q.id===n&&u.jsx("span",{className:"text-xs text-cyan-400 border border-cyan-400/40 rounded px-1",children:"YOU"}),(q.amulets??0)>0&&u.jsxs("span",{className:"text-xs text-amber-400",children:["🧿×",q.amulets]})]}),u.jsxs("div",{className:"text-xs text-slate-400",children:["スロット",q.spinCount,"回 / 移動",q.moveTurns,"T / 技量",q.stats.skill," / 善行",q.stats.virtue]})]}),u.jsxs("div",{className:"text-right",children:[u.jsxs("div",{className:"text-xl font-bold text-yellow-300",children:[q.stats.money,"G"]}),u.jsxs("div",{className:"text-xs text-slate-400",children:["スロット収支: ",u.jsxs("span",{className:q.slotNet>=0?"text-emerald-400":"text-rose-400",children:[q.slotNet>=0?"+":"",q.slotNet,"G"]})]}),u.jsxs("div",{className:`text-sm font-black ${f?"text-yellow-300":o==="S"?"text-amber-400":"text-slate-400"}`,children:[f&&"✦ ","ランク ",o,f&&" ✦"]})]})]})},q.id)})}),u.jsx("button",{onClick:Aa,className:"w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ロビーへ戻る"}),u.jsxs("div",{className:"space-y-2",children:[u.jsx("button",{onClick:()=>{_("entry"),i(null),e("")},className:"w-full rounded-xl border border-slate-600 bg-slate-800 py-3 font-bold text-slate-200 hover:bg-slate-700 transition-colors",children:"トップに戻る"}),u.jsx("p",{className:"text-center text-xs text-slate-500",children:"プレイヤー名を変更したい方はこちら"})]})]})]})}return V?u.jsxs("div",{className:`min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8 ${Ae?"anim-shake":""}`,children:[u.jsx("style",{children:kx}),u.jsx(eu,{myFullId:Gs,copied:ae,onCopy:Na,seVolume:K,bgmVolume:ne,onSeVolumeChange:fa,onBgmVolumeChange:Oi}),Ae&&u.jsx("div",{className:"fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none",children:u.jsx("span",{className:"bg-rose-600/90 text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg anim-fadein tracking-wide",children:"⚡ 転倒 / 炎上！"})}),Ut&&u.jsx(gj,{active:!0,characterType:Ut.characterType,onFallLand:()=>{me(!0),setTimeout(()=>me(!1),420)},onComplete:()=>{pt.current()}}),oe==="trafficJam"&&u.jsx(yj,{}),((lc=Wn==null?void 0:Wn.lines)==null?void 0:lc.length)>0&&u.jsxs("div",{className:"fixed bottom-[min(132px,22vh)] left-1/2 z-[228] flex w-[min(92vw,360px)] -translate-x-1/2 flex-col gap-1.5 rounded-2xl border border-cyan-500/55 bg-slate-950/95 px-5 py-3.5 shadow-[0_14px_50px_rgba(0,0,0,0.75)] pointer-events-none text-center anim-fadein",role:"status","aria-live":"polite",children:[u.jsx("p",{className:"text-[11px] font-bold uppercase tracking-widest text-cyan-300/85",children:Wn.title??"マス効果"}),u.jsx("ul",{className:"space-y-1 text-sm font-bold text-amber-100 leading-snug",children:Wn.lines.map((A,z)=>u.jsx("li",{children:A},z))})]}),Fs&&u.jsx(Fj,{mode:Fs.mode,gold:Fs.gold,stat:Fs.stat}),Hs&&u.jsx(Hj,{gold:Hs.gold,stat:Hs.stat,characterType:Hs.characterType}),qs!=null&&u.jsxs("div",{className:"fixed inset-0 z-[260] flex items-center justify-center pointer-events-none bg-black/55 anim-fadein overflow-hidden",role:"status","aria-live":"polite",children:[u.jsx("div",{className:"absolute inset-0 anim-stream-cutin-lines opacity-40","aria-hidden":!0}),u.jsx("div",{className:"pointer-events-none absolute inset-y-[-15%] left-[-45%] w-[190%] bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent opacity-90 anim-stream-cutin-sweep","aria-hidden":!0}),u.jsxs("div",{className:"relative rounded-2xl border-2 border-cyan-300/80 bg-slate-950/95 px-12 py-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.78)] anim-pon-burst-impact",children:[u.jsx("p",{className:"text-cyan-200 text-2xl sm:text-3xl font-black tracking-wide",children:"ーーーーーーーーー"}),u.jsxs("p",{className:"mt-3 text-white text-4xl sm:text-5xl font-black tracking-tight tabular-nums drop-shadow-[0_0_18px_rgba(125,211,252,0.6)] anim-stream-pon-text",children:["残り",qs,"ターン"]}),u.jsx("p",{className:"mt-3 text-cyan-200 text-2xl sm:text-3xl font-black tracking-wide",children:"ーーーーーーーーー"})]})]}),Ta&&u.jsxs("div",{className:"fixed inset-0 z-[230] cursor-default overflow-hidden bg-black/0 anim-fadein pointer-events-auto",role:"status","aria-live":"assertive",children:[u.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black via-red-950/85 to-orange-950/75 anim-stream-pon-burn-veil","aria-hidden":!0}),u.jsx("div",{className:"absolute -bottom-[18%] left-[-20%] right-[-20%] h-[72%] rounded-[50%] bg-gradient-to-t from-orange-500/60 via-red-600/40 to-transparent blur-[90px] anim-stream-pon-flame","aria-hidden":!0}),u.jsx("div",{className:"absolute bottom-0 left-[12%] w-[76%] h-[48%] rounded-full bg-amber-300/25 blur-[80px] anim-stream-pon-flame opacity-95",style:{animationDelay:"0.12s"},"aria-hidden":!0}),u.jsx("div",{className:"absolute top-[28%] left-[8%] h-40 w-40 rounded-full bg-orange-400/35 blur-[48px] anim-stream-pon-flame","aria-hidden":!0}),u.jsx("div",{className:"absolute top-[32%] right-[10%] h-48 w-48 rounded-full bg-red-500/30 blur-[56px] anim-stream-pon-flame",style:{animationDelay:"0.2s"},"aria-hidden":!0}),u.jsx("div",{className:"relative z-[1] flex min-h-full flex-col items-center justify-center px-5 pt-8",children:u.jsx("p",{className:"text-[min(20vw,7rem)] sm:text-[min(16vw,7.5rem)] font-black tracking-tight leading-none anim-stream-pon-text text-amber-100",style:{textShadow:"0 0 52px rgba(251,146,60,1), 0 0 100px rgba(239,68,68,0.85), 0 6px 0 rgb(124,45,18), 0 -4px 28px rgba(254,243,199,0.65)",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"PON！！"})})]}),hs&&u.jsxs("div",{className:"fixed inset-0 z-[230] flex cursor-default flex-col items-center justify-center px-5 bg-black/70 pointer-events-auto anim-fadein",role:"status","aria-live":"assertive",children:[u.jsx("p",{className:"text-[min(20vw,7rem)] sm:text-[min(16vw,7.5rem)] font-black tracking-tight text-fuchsia-100 leading-none",style:{textShadow:"0 0 56px rgba(232,121,249,0.65), 0 5px 0 rgb(109,40,217), 0 0 2px #fff",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"PON！！"}),u.jsxs("div",{className:"mt-6 max-w-lg space-y-4 text-center text-sm sm:text-base text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]",children:[u.jsxs("p",{children:["PONでの弁償"," ",u.jsxs("span",{className:"font-bold tabular-nums text-rose-300",children:["-",hs.penalty,"G"]})]}),u.jsxs("p",{children:["このターンの収支（仕事 − 弁償）"," ",u.jsxs("span",{className:`font-bold tabular-nums ${hs.turnDelta>=0?"text-cyan-300":"text-rose-300"}`,children:[hs.turnDelta>=0?"+":"",hs.turnDelta,"G"]})]})]})]}),ki&&u.jsxs("div",{className:"fixed inset-0 z-[230] flex cursor-default flex-col items-center justify-center px-5 bg-black/75 pointer-events-auto anim-fadein",role:"status","aria-live":"assertive",children:[u.jsx("p",{className:"text-[min(22vw,7.5rem)] sm:text-[min(18vw,8rem)] font-black tracking-tighter text-white leading-none mb-6",style:{textShadow:"0 0 48px rgba(248,113,113,0.55), 0 4px 0 rgb(127,29,29)",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"失敗"}),u.jsx("p",{className:"max-w-lg text-center text-base sm:text-lg font-semibold text-slate-200 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",children:"OBSトラブルで少ししか配信ができなかった"})]}),at&&u.jsxs("div",{className:`fixed inset-0 z-[210] flex cursor-default flex-col items-center justify-center bg-black/65 pointer-events-auto ${at==="in"?"anim-shrine-in":"anim-shrine-out"}`,children:[u.jsx("span",{className:"text-[100px] leading-none select-none",style:{filter:"drop-shadow(0 0 30px rgba(251,191,36,0.7))"},children:"⛩"}),u.jsx("p",{className:"mt-4 text-xl font-semibold text-amber-200 tracking-[0.25em]",children:"二礼二拍手一礼"}),u.jsx("p",{className:"text-sm text-amber-300/70 mt-1",children:"運気が上がった気がする…"})]}),it&&u.jsx("div",{className:"fixed inset-0 z-40 flex items-center justify-center pointer-events-none",children:u.jsx("span",{className:"text-3xl font-black text-amber-300 tracking-wide anim-lucky-pop",style:{textShadow:"0 0 24px rgba(251,191,36,0.9), 0 0 8px rgba(251,191,36,0.7)"},children:"幸運のダイス！🎲🎲"})}),Zu&&u.jsx(xj,{gameState:V,soundRef:we}),Zu?null:u.jsxs("div",{className:"mx-auto w-full max-w-4xl space-y-5",children:[u.jsx("header",{className:"rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4",children:u.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2",children:[u.jsxs("div",{children:[u.jsx("h1",{className:"text-lg font-bold md:text-xl font-[Rajdhani] tracking-wide text-white",children:df}),u.jsx("p",{className:"text-[10px] text-slate-500 mt-0.5 leading-tight uppercase tracking-wide max-w-md",children:f0}),u.jsxs("p",{className:"text-xs text-slate-400 mt-1.5 leading-relaxed space-y-0.5",children:[V.subPhase==="daily"&&`${V.currentDay}日目 / ${J==null?void 0:J.name}のターン`,V.subPhase==="day8"&&J&&u.jsxs(u.Fragment,{children:[u.jsxs("span",{className:"block",children:[J.movePhase==="missed"&&`【8日目・決戦】タイムアウト／${J.name}`,Ys&&`【8日目・決戦】ゴール到着処理中／${J.name}`,Ur&&`【8日目・決戦】ゴール済／${J.name}（次の自分ターンからスロット）`,eh&&`【8日目・決戦】スロット／${J.name}`]}),u.jsxs("span",{className:"block tabular-nums font-semibold text-amber-200/90 mt-1 sm:mt-0.5",children:["残りターンバースト"," ",u.jsx("strong",{children:Math.max(0,P.dice.maxTurns-J.moveTurns)})," / ",P.dice.maxTurns,"ターン"," ",u.jsx("span",{className:"font-normal text-slate-500",children:"（すごろく／スロット共通）"})]})]})]})]}),u.jsxs("div",{className:"flex items-center gap-2 flex-wrap justify-end",children:[V.subPhase==="day8"&&J&&u.jsxs("div",{className:"flex flex-col items-end gap-0.5",children:[u.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wide text-amber-400/90 leading-none",children:"8日目 HUD"}),u.jsx("span",{className:"text-xs font-bold text-slate-200 tabular-nums leading-none",children:J.movePhase==="goalLanding"||J.movePhase==="waitingSlot"?u.jsx(u.Fragment,{children:"ゴール済・スロット待ち"}):J.movePhase==="arrived"?u.jsx(u.Fragment,{children:"🎰 スロット"}):J.movePhase==="moving"?u.jsxs(u.Fragment,{children:["移動手番 ",u.jsx("strong",{children:J.moveTurns}),u.jsx("span",{className:"text-slate-600",children:"/"}),u.jsx("strong",{children:P.dice.maxTurns})]}):u.jsx(u.Fragment,{children:J.movePhase==="missed"?"すごろくタイムアウト済":"—"})})]}),u.jsx("span",{className:"text-xs text-slate-600 font-mono border border-slate-700 rounded px-2 py-0.5",children:a}),u.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[u.jsx(iO,{size:12,className:"text-cyan-400"}),u.jsx("span",{children:V.players.map(A=>A.name).join(" · ")})]}),!dn&&u.jsxs("span",{className:"flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400",children:[u.jsx(Yi,{size:10,className:"animate-spin"}),J==null?void 0:J.name,"のターン待ち"]})]})]})}),J&&u.jsxs("section",{className:"rounded-2xl border border-cyan-800/50 bg-slate-900 p-4",children:[u.jsxs("div",{className:"flex items-center gap-2 mb-3 flex-wrap",children:[u.jsxs("span",{className:"font-semibold text-cyan-400 text-sm",children:[J.name,"のステータス"]}),J.id===n&&u.jsx("span",{className:"text-xs text-cyan-400 border border-cyan-400/40 rounded px-1.5 py-0.5",children:"YOU"}),J.stats.pon>=P.pon.deathThreshold&&u.jsxs("span",{className:"animate-pulse rounded-full border border-rose-500/60 bg-rose-500/15 px-2 py-0.5 text-xs text-rose-300",children:["💀 PON危険域 (",J.stats.pon,")"]}),J.stats.pon>=P.pon.fireThreshold&&J.stats.pon<P.pon.deathThreshold&&u.jsxs("span",{className:"rounded-full border border-orange-500/50 bg-orange-500/15 px-2 py-0.5 text-xs text-orange-300",children:["🔥 PON発火域 (",J.stats.pon,")"]})]}),u.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6",children:yO.map(({key:A,label:z,color:$})=>{const Z=kc(J),B=A==="livingCost",q=B?Z:J.stats[A],de=A==="money"&&J.stats.money<0,o=A==="money"?"text-lg":"text-2xl";return u.jsxs("div",{className:"group/status-hint relative rounded-lg bg-slate-800 p-2.5 text-center",children:[u.jsxs("div",{className:"text-xs text-slate-400 leading-tight",children:[z,B&&u.jsxs("span",{className:"text-slate-500 text-[10px]",children:["／日",u.jsx("span",{className:"sr-only",children:"（1〜7日目の行動後）"})]})]}),u.jsxs("div",{className:`mt-0.5 font-bold tabular-nums inline-flex items-baseline justify-center gap-0.5 ${de?"text-rose-400":$} ${o}`,children:[u.jsx("span",{children:q}),B&&u.jsx("span",{className:"text-xs font-semibold opacity-75",children:"G"})]}),u.jsx("div",{role:"tooltip",className:"pointer-events-none absolute left-1/2 top-full z-[120] mt-1 w-max max-w-[min(288px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-left text-[11px] leading-snug text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-0 transition-opacity duration-150 delay-75 invisible group-hover/status-hint:opacity-100 group-hover/status-hint:visible group-hover/status-hint:delay-0",children:Xj[A]??""})]},A)})}),(J.amulets??0)>0&&u.jsxs("div",{className:"flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-sm",children:[u.jsx("span",{className:"text-base leading-none",children:"🧿"}),u.jsxs("span",{className:"text-amber-300 font-semibold",children:["お守り ×",J.amulets]}),u.jsxs("span",{className:"text-amber-400/60 text-xs ml-auto",children:["毎ターン 運+",J.amulets*2]})]}),V.subPhase==="day8"&&J.spinCount>0&&u.jsxs("div",{className:"mt-2 flex items-center justify-end gap-2",children:[J.slotNet>=0?u.jsx(ZD,{size:14,className:"text-emerald-400"}):u.jsx(WD,{size:14,className:"text-rose-400"}),u.jsx("span",{className:"text-xs text-slate-400",children:"スロット収支:"}),u.jsxs("span",{className:`text-sm font-bold ${J.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:[J.slotNet>=0?"+":"",J.slotNet,"G"]}),u.jsxs("span",{className:"text-xs text-slate-500",children:["（",J.spinCount,"回）"]})]}),J.stats.money<0&&u.jsxs("div",{className:"mt-2 rounded-lg border border-violet-500/45 bg-gradient-to-r from-violet-950/50 to-slate-900/80 px-3 py-2 space-y-0.5",children:[u.jsxs("span",{className:"text-violet-200 text-xs font-bold tracking-wide flex items-center gap-1.5",children:[u.jsx("span",{children:"🩻"})," 闇金リリムから高利子で借金中"]}),u.jsxs("span",{className:"block text-[11px] text-rose-300/90",children:["現在の赤字: ",J.stats.money,"G（連続赤字が",P.rimiru.dailyGracesBefore,"ターン／",P.rimiru.day8TurnsBefore,"手番ごとに+",P.rimiru.interestPercent,"%）"]})]}),V.recentPonEvent&&u.jsxs("div",{className:"mt-3 rounded-lg border border-orange-500/40 bg-orange-500/10 p-2.5 text-sm text-orange-200",children:["【PONイベント / ",V.recentPonEvent.player,"】",V.recentPonEvent.msg]})]}),u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4",children:[!dn&&u.jsxs("div",{className:"rounded-xl border border-slate-700 bg-slate-800/40 p-5 text-center space-y-2",children:[u.jsx(Yi,{size:24,className:"animate-spin text-slate-500 mx-auto"}),u.jsx("p",{className:"text-slate-400 text-sm",children:Ys?`${J==null?void 0:J.name} がゴール到着！終了確認を待っています…`:Ur?`${J==null?void 0:J.name} のゴール後ターン／スロット開始を待っています…`:`${J==null?void 0:J.name} のターン操作を待っています…`})]}),dn&&V.subPhase==="daily"&&J&&u.jsx(bj,{gs:V,cpGs:J,onDailyAction:uh,onOpenDailySlot:ch,interactionLocked:Hs!=null||Fs!=null||at!=null||Ta||hs!=null||ki}),Co&&rc&&J&&u.jsx(vj,{open:Co,statsForSpin:rc,characterType:J.characterType,playerName:J.name,initialSlotPityCounter:J.slotPityCounter??0,soundRef:we,onClose:()=>Io(!1),onFinished:Mo}),u.jsx(uj,{gs:V,cpGs:J,boardViewPos:dn&&typeof nn=="number"?nn:null,reportSugorokuHopComplete:dn&&Bs,onSugorokuHopComplete:sh,isMyTurn:dn,cpIsGoalLanding:Ys,cpIsWaitingSlot:Ur,isDay8Moving:nc,isDiceRolling:re,localDice:ke,diceShuffleValues:ze,diceConfirmed:Cn,isLuckyRoll:is,showDiceTotal:he,displayDice:Mi,taxiPhase:oe,taxiDriveCongested:ge,taxiDriveEndPos:Xn,taxiDriveDurationMs:En,taxiDriveSegmentMs:Un,taxiJamMidPos:lt,pieceHopping:Te,interactionLocked:Di,onMoveAction:hh,onGoalLandingConfirm:lh}),dn&&eh&&J&&u.jsx(Dj,{gs:V,cpGs:J,isMyTurn:dn,writeGS:Jn,commitPendingGameState:ah,soundRef:we,roomId:a,interactionLocked:Di})]}),u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4",children:[u.jsx("h2",{className:"mb-3 text-xs font-semibold text-slate-400",children:"全プレイヤー"}),u.jsx("div",{className:"grid grid-cols-1 gap-2 sm:grid-cols-2",children:V.players.map((A,z)=>u.jsxs("div",{className:`rounded-xl border p-3 ${z===V.currentPlayerIdx?"border-cyan-500/60 bg-cyan-500/5":"border-slate-800 bg-slate-800/30"}`,children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("span",{className:"text-sm font-medium flex items-center gap-1.5",children:[z===V.currentPlayerIdx?"▶ ":"",V.subPhase!=="day8"&&u.jsx(Ll,{characterType:A.characterType,imgClassName:"h-5 w-5 shrink-0 object-contain",spanClassName:"text-base leading-none"}),A.name,A.id===n&&u.jsx("span",{className:`text-xs border rounded px-1 ${V.subPhase==="day8"&&A.stats.luck>=80?"text-amber-300 border-amber-400/40":"text-cyan-400 border-cyan-400/40"}`,children:V.subPhase==="day8"&&A.stats.luck>=80?"✦YOU":"YOU"})]}),u.jsxs("div",{className:"flex items-center gap-2",children:[V.subPhase==="day8"&&A.spinCount>0&&u.jsxs("span",{className:`text-xs font-semibold ${A.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:["S:",A.slotNet>=0?"+":"",A.slotNet]}),u.jsxs("span",{className:"text-xs font-semibold text-yellow-300",children:[A.stats.money,"G"]})]})]}),u.jsx("div",{className:"mt-2 grid grid-cols-5 gap-1 text-center text-xs",children:[["生活費","text-orange-300",kc(A)],["技量","text-sky-400",A.stats.skill],["運","text-amber-400",A.stats.luck],["善行","text-emerald-400",A.stats.virtue],["PON",A.stats.pon>=P.pon.deathThreshold?"text-rose-400":A.stats.pon>=P.pon.fireThreshold?"text-orange-400":"text-fuchsia-400",A.stats.pon]].map(([$,Z,B])=>u.jsxs("div",{className:"rounded bg-slate-900/60 py-1",children:[u.jsx("div",{className:"text-slate-500",style:{fontSize:"10px"},children:$}),u.jsx("div",{className:`font-bold ${Z}`,children:B})]},$))}),V.subPhase==="day8"&&u.jsxs("div",{className:"mt-1.5 text-xs",children:[A.movePhase==="moving"&&u.jsxs("span",{className:"text-slate-400",children:["スタートから",A.position,"マス目（T",A.moveTurns,"）"]}),A.movePhase==="goalLanding"&&u.jsx("span",{className:"text-yellow-300",children:"🏁 ゴール到着・確認待ち"}),A.movePhase==="waitingSlot"&&u.jsx("span",{className:"text-teal-300",children:"🎰 ゴール済／次の自分ターンでスロット"}),A.movePhase==="arrived"&&A.slotTurnsLeft>0?u.jsxs("span",{className:"text-amber-300",children:["ゴール・スロット中",A.stats.money<0?"（借金可）":""]}):A.movePhase==="arrived"&&u.jsx("span",{className:"text-slate-500",children:"✅ スロット完了"}),A.movePhase==="missed"&&u.jsx("span",{className:"text-rose-400",children:"⏰ タイムアウト"})]})]},A.id))})]}),u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4",children:[u.jsx("h2",{className:"mb-2 text-xs font-semibold text-slate-400",children:"ゲームログ（全員共有）"}),u.jsx("div",{className:"max-h-64 space-y-1 overflow-y-auto font-mono text-xs text-slate-300",children:(V.log??[]).map((A,z)=>u.jsx("p",{className:"border-b border-slate-800/50 pb-1 last:border-0",children:A},z))})]}),u.jsx("button",{onClick:Aa,className:"text-xs text-slate-600 underline hover:text-slate-400",children:"ロビーへ戻る（ゲームは続行中）"})]})]}):u.jsx("div",{className:"min-h-screen bg-slate-950 flex items-center justify-center",children:u.jsx(Yi,{size:32,className:"animate-spin text-cyan-400"})})}class Jj extends Jp.Component{constructor(n){super(n);Qy(this,"handleReload",()=>{window.location.reload()});this.state={hasError:!1,error:null}}static getDerivedStateFromError(n){return{hasError:!0,error:n}}componentDidCatch(n,s){}render(){return this.state.hasError?u.jsx("div",{className:"min-h-screen bg-slate-950 p-6 text-slate-100 flex items-center justify-center",children:u.jsxs("div",{className:"w-full max-w-md space-y-6 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-8 text-center shadow-xl",role:"alert",children:[u.jsx("p",{className:"text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/90",children:df}),u.jsx("h1",{className:"text-xl font-bold text-slate-50",children:"表示中に問題が発生しました"}),u.jsx("p",{className:"text-sm text-slate-400 leading-relaxed",children:"データの読み込みや画面の描画中に予期しないエラーが起きました。再読み込みで改善することがあります。"}),u.jsx("div",{className:"flex flex-col gap-3 sm:flex-row sm:justify-center",children:u.jsx("button",{type:"button",onClick:this.handleReload,className:"rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ページを再読み込み"})})]})}):this.props.children}}PR.createRoot(document.getElementById("root")).render(u.jsx(Jp.StrictMode,{children:u.jsx(Jj,{children:u.jsx(Wj,{})})}));
