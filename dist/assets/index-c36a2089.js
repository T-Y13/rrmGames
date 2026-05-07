var ES=Object.defineProperty;var wS=(t,e,n)=>e in t?ES(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var jy=(t,e,n)=>(wS(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function bx(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var xx={exports:{}},Xf={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var SS=Symbol.for("react.transitional.element"),AS=Symbol.for("react.fragment");function _x(t,e,n){var s=null;if(n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:SS,type:t,key:s,ref:e!==void 0?e:null,props:n}}Xf.Fragment=AS;Xf.jsx=_x;Xf.jsxs=_x;xx.exports=Xf;var u=xx.exports,Tx={exports:{}},Be={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dp=Symbol.for("react.transitional.element"),NS=Symbol.for("react.portal"),RS=Symbol.for("react.fragment"),kS=Symbol.for("react.strict_mode"),CS=Symbol.for("react.profiler"),IS=Symbol.for("react.consumer"),MS=Symbol.for("react.context"),DS=Symbol.for("react.forward_ref"),OS=Symbol.for("react.suspense"),jS=Symbol.for("react.memo"),Ex=Symbol.for("react.lazy"),PS=Symbol.for("react.activity"),Py=Symbol.iterator;function VS(t){return t===null||typeof t!="object"?null:(t=Py&&t[Py]||t["@@iterator"],typeof t=="function"?t:null)}var wx={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Sx=Object.assign,Ax={};function wl(t,e,n){this.props=t,this.context=e,this.refs=Ax,this.updater=n||wx}wl.prototype.isReactComponent={};wl.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};wl.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Nx(){}Nx.prototype=wl.prototype;function Op(t,e,n){this.props=t,this.context=e,this.refs=Ax,this.updater=n||wx}var jp=Op.prototype=new Nx;jp.constructor=Op;Sx(jp,wl.prototype);jp.isPureReactComponent=!0;var Vy=Array.isArray;function n0(){}var Ht={H:null,A:null,T:null,S:null},Rx=Object.prototype.hasOwnProperty;function Pp(t,e,n){var s=n.ref;return{$$typeof:Dp,type:t,key:e,ref:s!==void 0?s:null,props:n}}function LS(t,e){return Pp(t.type,e,t.props)}function Vp(t){return typeof t=="object"&&t!==null&&t.$$typeof===Dp}function US(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Ly=/\/+/g;function Yd(t,e){return typeof t=="object"&&t!==null&&t.key!=null?US(""+t.key):e.toString(36)}function zS(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(n0,n0):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function wo(t,e,n,s,a){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(i){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Dp:case NS:r=!0;break;case Ex:return r=t._init,wo(r(t._payload),e,n,s,a)}}if(r)return a=a(t),r=s===""?"."+Yd(t,0):s,Vy(a)?(n="",r!=null&&(n=r.replace(Ly,"$&/")+"/"),wo(a,e,n,"",function(h){return h})):a!=null&&(Vp(a)&&(a=LS(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(Ly,"$&/")+"/")+r)),e.push(a)),1;r=0;var l=s===""?".":s+":";if(Vy(t))for(var c=0;c<t.length;c++)s=t[c],i=l+Yd(s,c),r+=wo(s,e,n,i,a);else if(c=VS(t),typeof c=="function")for(t=c.call(t),c=0;!(s=t.next()).done;)s=s.value,i=l+Yd(s,c++),r+=wo(s,e,n,i,a);else if(i==="object"){if(typeof t.then=="function")return wo(zS(t),e,n,s,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function Ku(t,e,n){if(t==null)return t;var s=[],a=0;return wo(t,s,"","",function(i){return e.call(n,i,a++)}),s}function BS(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Uy=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},$S={map:Ku,forEach:function(t,e,n){Ku(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ku(t,function(){e++}),e},toArray:function(t){return Ku(t,function(e){return e})||[]},only:function(t){if(!Vp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Be.Activity=PS;Be.Children=$S;Be.Component=wl;Be.Fragment=RS;Be.Profiler=CS;Be.PureComponent=Op;Be.StrictMode=kS;Be.Suspense=OS;Be.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ht;Be.__COMPILER_RUNTIME={__proto__:null,c:function(t){return Ht.H.useMemoCache(t)}};Be.cache=function(t){return function(){return t.apply(null,arguments)}};Be.cacheSignal=function(){return null};Be.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var s=Sx({},t.props),a=t.key;if(e!=null)for(i in e.key!==void 0&&(a=""+e.key),e)!Rx.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(s[i]=e[i]);var i=arguments.length-2;if(i===1)s.children=n;else if(1<i){for(var r=Array(i),l=0;l<i;l++)r[l]=arguments[l+2];s.children=r}return Pp(t.type,a,s)};Be.createContext=function(t){return t={$$typeof:MS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:IS,_context:t},t};Be.createElement=function(t,e,n){var s,a={},i=null;if(e!=null)for(s in e.key!==void 0&&(i=""+e.key),e)Rx.call(e,s)&&s!=="key"&&s!=="__self"&&s!=="__source"&&(a[s]=e[s]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var l=Array(r),c=0;c<r;c++)l[c]=arguments[c+2];a.children=l}if(t&&t.defaultProps)for(s in r=t.defaultProps,r)a[s]===void 0&&(a[s]=r[s]);return Pp(t,i,a)};Be.createRef=function(){return{current:null}};Be.forwardRef=function(t){return{$$typeof:DS,render:t}};Be.isValidElement=Vp;Be.lazy=function(t){return{$$typeof:Ex,_payload:{_status:-1,_result:t},_init:BS}};Be.memo=function(t,e){return{$$typeof:jS,type:t,compare:e===void 0?null:e}};Be.startTransition=function(t){var e=Ht.T,n={};Ht.T=n;try{var s=t(),a=Ht.S;a!==null&&a(n,s),typeof s=="object"&&s!==null&&typeof s.then=="function"&&s.then(n0,Uy)}catch(i){Uy(i)}finally{e!==null&&n.types!==null&&(e.types=n.types),Ht.T=e}};Be.unstable_useCacheRefresh=function(){return Ht.H.useCacheRefresh()};Be.use=function(t){return Ht.H.use(t)};Be.useActionState=function(t,e,n){return Ht.H.useActionState(t,e,n)};Be.useCallback=function(t,e){return Ht.H.useCallback(t,e)};Be.useContext=function(t){return Ht.H.useContext(t)};Be.useDebugValue=function(){};Be.useDeferredValue=function(t,e){return Ht.H.useDeferredValue(t,e)};Be.useEffect=function(t,e){return Ht.H.useEffect(t,e)};Be.useEffectEvent=function(t){return Ht.H.useEffectEvent(t)};Be.useId=function(){return Ht.H.useId()};Be.useImperativeHandle=function(t,e,n){return Ht.H.useImperativeHandle(t,e,n)};Be.useInsertionEffect=function(t,e){return Ht.H.useInsertionEffect(t,e)};Be.useLayoutEffect=function(t,e){return Ht.H.useLayoutEffect(t,e)};Be.useMemo=function(t,e){return Ht.H.useMemo(t,e)};Be.useOptimistic=function(t,e){return Ht.H.useOptimistic(t,e)};Be.useReducer=function(t,e,n){return Ht.H.useReducer(t,e,n)};Be.useRef=function(t){return Ht.H.useRef(t)};Be.useState=function(t){return Ht.H.useState(t)};Be.useSyncExternalStore=function(t,e,n){return Ht.H.useSyncExternalStore(t,e,n)};Be.useTransition=function(){return Ht.H.useTransition()};Be.version="19.2.5";Tx.exports=Be;var R=Tx.exports;const Lp=bx(R);var kx={exports:{}},Wf={},Cx={exports:{}},Ix={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(W,ee){var ae=W.length;W.push(ee);e:for(;0<ae;){var ue=ae-1>>>1,Le=W[ue];if(0<a(Le,ee))W[ue]=ee,W[ae]=Le,ae=ue;else break e}}function n(W){return W.length===0?null:W[0]}function s(W){if(W.length===0)return null;var ee=W[0],ae=W.pop();if(ae!==ee){W[0]=ae;e:for(var ue=0,Le=W.length,Ze=Le>>>1;ue<Ze;){var ut=2*(ue+1)-1,Mt=W[ut],qe=ut+1,He=W[qe];if(0>a(Mt,ae))qe<Le&&0>a(He,Mt)?(W[ue]=He,W[qe]=ae,ue=qe):(W[ue]=Mt,W[ut]=ae,ue=ut);else if(qe<Le&&0>a(He,ae))W[ue]=He,W[qe]=ae,ue=qe;else break e}}return ee}function a(W,ee){var ae=W.sortIndex-ee.sortIndex;return ae!==0?ae:W.id-ee.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var r=Date,l=r.now();t.unstable_now=function(){return r.now()-l}}var c=[],h=[],d=1,p=null,g=3,v=!1,C=!1,I=!1,j=!1,_=typeof setTimeout=="function"?setTimeout:null,b=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function P(W){for(var ee=n(h);ee!==null;){if(ee.callback===null)s(h);else if(ee.startTime<=W)s(h),ee.sortIndex=ee.expirationTime,e(c,ee);else break;ee=n(h)}}function $(W){if(I=!1,P(W),!C)if(n(c)!==null)C=!0,J||(J=!0,M());else{var ee=n(h);ee!==null&&pe($,ee.startTime-W)}}var J=!1,T=-1,x=5,E=-1;function A(){return j?!0:!(t.unstable_now()-E<x)}function k(){if(j=!1,J){var W=t.unstable_now();E=W;var ee=!0;try{e:{C=!1,I&&(I=!1,b(T),T=-1),v=!0;var ae=g;try{t:{for(P(W),p=n(c);p!==null&&!(p.expirationTime>W&&A());){var ue=p.callback;if(typeof ue=="function"){p.callback=null,g=p.priorityLevel;var Le=ue(p.expirationTime<=W);if(W=t.unstable_now(),typeof Le=="function"){p.callback=Le,P(W),ee=!0;break t}p===n(c)&&s(c),P(W)}else s(c);p=n(c)}if(p!==null)ee=!0;else{var Ze=n(h);Ze!==null&&pe($,Ze.startTime-W),ee=!1}}break e}finally{p=null,g=ae,v=!1}ee=void 0}}finally{ee?M():J=!1}}}var M;if(typeof N=="function")M=function(){N(k)};else if(typeof MessageChannel<"u"){var w=new MessageChannel,te=w.port2;w.port1.onmessage=k,M=function(){te.postMessage(null)}}else M=function(){_(k,0)};function pe(W,ee){T=_(function(){W(t.unstable_now())},ee)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(W){W.callback=null},t.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<W?Math.floor(1e3/W):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_next=function(W){switch(g){case 1:case 2:case 3:var ee=3;break;default:ee=g}var ae=g;g=ee;try{return W()}finally{g=ae}},t.unstable_requestPaint=function(){j=!0},t.unstable_runWithPriority=function(W,ee){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var ae=g;g=W;try{return ee()}finally{g=ae}},t.unstable_scheduleCallback=function(W,ee,ae){var ue=t.unstable_now();switch(typeof ae=="object"&&ae!==null?(ae=ae.delay,ae=typeof ae=="number"&&0<ae?ue+ae:ue):ae=ue,W){case 1:var Le=-1;break;case 2:Le=250;break;case 5:Le=1073741823;break;case 4:Le=1e4;break;default:Le=5e3}return Le=ae+Le,W={id:d++,callback:ee,priorityLevel:W,startTime:ae,expirationTime:Le,sortIndex:-1},ae>ue?(W.sortIndex=ae,e(h,W),n(c)===null&&W===n(h)&&(I?(b(T),T=-1):I=!0,pe($,ae-ue))):(W.sortIndex=Le,e(c,W),C||v||(C=!0,J||(J=!0,M()))),W},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(W){var ee=g;return function(){var ae=g;g=ee;try{return W.apply(this,arguments)}finally{g=ae}}}})(Ix);Cx.exports=Ix;var FS=Cx.exports,Mx={exports:{}},ds={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var HS=R;function Dx(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Si(){}var fs={d:{f:Si,r:function(){throw Error(Dx(522))},D:Si,C:Si,L:Si,m:Si,X:Si,S:Si,M:Si},p:0,findDOMNode:null},qS=Symbol.for("react.portal");function GS(t,e,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:qS,key:s==null?null:""+s,children:t,containerInfo:e,implementation:n}}var pc=HS.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Jf(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}ds.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=fs;ds.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Dx(299));return GS(t,e,null,n)};ds.flushSync=function(t){var e=pc.T,n=fs.p;try{if(pc.T=null,fs.p=2,t)return t()}finally{pc.T=e,fs.p=n,fs.d.f()}};ds.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,fs.d.C(t,e))};ds.prefetchDNS=function(t){typeof t=="string"&&fs.d.D(t)};ds.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,s=Jf(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?fs.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:s,integrity:a,fetchPriority:i}):n==="script"&&fs.d.X(t,{crossOrigin:s,integrity:a,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};ds.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=Jf(e.as,e.crossOrigin);fs.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&fs.d.M(t)};ds.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,s=Jf(n,e.crossOrigin);fs.d.L(t,n,{crossOrigin:s,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};ds.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=Jf(e.as,e.crossOrigin);fs.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else fs.d.m(t)};ds.requestFormReset=function(t){fs.d.r(t)};ds.unstable_batchedUpdates=function(t,e){return t(e)};ds.useFormState=function(t,e,n){return pc.H.useFormState(t,e,n)};ds.useFormStatus=function(){return pc.H.useHostTransitionStatus()};ds.version="19.2.5";function Ox(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ox)}catch(t){console.error(t)}}Ox(),Mx.exports=ds;var YS=Mx.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mn=FS,jx=R,KS=YS;function G(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Px(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function cu(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Vx(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Lx(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function zy(t){if(cu(t)!==t)throw Error(G(188))}function QS(t){var e=t.alternate;if(!e){if(e=cu(t),e===null)throw Error(G(188));return e!==t?null:t}for(var n=t,s=e;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(s=a.return,s!==null){n=s;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return zy(a),t;if(i===s)return zy(a),e;i=i.sibling}throw Error(G(188))}if(n.return!==s.return)n=a,s=i;else{for(var r=!1,l=a.child;l;){if(l===n){r=!0,n=a,s=i;break}if(l===s){r=!0,s=a,n=i;break}l=l.sibling}if(!r){for(l=i.child;l;){if(l===n){r=!0,n=i,s=a;break}if(l===s){r=!0,s=i,n=a;break}l=l.sibling}if(!r)throw Error(G(189))}}if(n.alternate!==s)throw Error(G(190))}if(n.tag!==3)throw Error(G(188));return n.stateNode.current===n?t:e}function Ux(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=Ux(t),e!==null)return e;t=t.sibling}return null}var qt=Object.assign,XS=Symbol.for("react.element"),Qu=Symbol.for("react.transitional.element"),ac=Symbol.for("react.portal"),Io=Symbol.for("react.fragment"),zx=Symbol.for("react.strict_mode"),s0=Symbol.for("react.profiler"),Bx=Symbol.for("react.consumer"),Ja=Symbol.for("react.context"),Up=Symbol.for("react.forward_ref"),a0=Symbol.for("react.suspense"),i0=Symbol.for("react.suspense_list"),zp=Symbol.for("react.memo"),Ni=Symbol.for("react.lazy"),r0=Symbol.for("react.activity"),WS=Symbol.for("react.memo_cache_sentinel"),By=Symbol.iterator;function Kl(t){return t===null||typeof t!="object"?null:(t=By&&t[By]||t["@@iterator"],typeof t=="function"?t:null)}var JS=Symbol.for("react.client.reference");function o0(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===JS?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Io:return"Fragment";case s0:return"Profiler";case zx:return"StrictMode";case a0:return"Suspense";case i0:return"SuspenseList";case r0:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case ac:return"Portal";case Ja:return t.displayName||"Context";case Bx:return(t._context.displayName||"Context")+".Consumer";case Up:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case zp:return e=t.displayName||null,e!==null?e:o0(t.type)||"Memo";case Ni:e=t._payload,t=t._init;try{return o0(t(e))}catch{}}return null}var ic=Array.isArray,Ce=jx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,gt=KS.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,zr={pending:!1,data:null,method:null,action:null},l0=[],Mo=-1;function Va(t){return{current:t}}function Un(t){0>Mo||(t.current=l0[Mo],l0[Mo]=null,Mo--)}function Lt(t,e){Mo++,l0[Mo]=t.current,t.current=e}var ka=Va(null),Uc=Va(null),Hi=Va(null),Xh=Va(null);function Wh(t,e){switch(Lt(Hi,e),Lt(Uc,t),Lt(ka,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Yv(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Yv(e),t=o2(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Un(ka),Lt(ka,t)}function al(){Un(ka),Un(Uc),Un(Hi)}function c0(t){t.memoizedState!==null&&Lt(Xh,t);var e=ka.current,n=o2(e,t.type);e!==n&&(Lt(Uc,t),Lt(ka,n))}function Jh(t){Uc.current===t&&(Un(ka),Un(Uc)),Xh.current===t&&(Un(Xh),Xc._currentValue=zr)}var Kd,$y;function Ir(t){if(Kd===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Kd=e&&e[1]||"",$y=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Kd+t+$y}var Qd=!1;function Xd(t,e){if(!t||Qd)return"";Qd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(e){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(v){var g=v}Reflect.construct(t,[],p)}else{try{p.call()}catch(v){g=v}t.call(p.prototype)}}else{try{throw Error()}catch(v){g=v}(p=t())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(v){if(v&&g&&typeof v.stack=="string")return[v.stack,g.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=s.DetermineComponentFrameRoot(),r=i[0],l=i[1];if(r&&l){var c=r.split(`
`),h=l.split(`
`);for(a=s=0;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;for(;a<h.length&&!h[a].includes("DetermineComponentFrameRoot");)a++;if(s===c.length||a===h.length)for(s=c.length-1,a=h.length-1;1<=s&&0<=a&&c[s]!==h[a];)a--;for(;1<=s&&0<=a;s--,a--)if(c[s]!==h[a]){if(s!==1||a!==1)do if(s--,a--,0>a||c[s]!==h[a]){var d=`
`+c[s].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=s&&0<=a);break}}}finally{Qd=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Ir(n):""}function ZS(t,e){switch(t.tag){case 26:case 27:case 5:return Ir(t.type);case 16:return Ir("Lazy");case 13:return t.child!==e&&e!==null?Ir("Suspense Fallback"):Ir("Suspense");case 19:return Ir("SuspenseList");case 0:case 15:return Xd(t.type,!1);case 11:return Xd(t.type.render,!1);case 1:return Xd(t.type,!0);case 31:return Ir("Activity");default:return""}}function Fy(t){try{var e="",n=null;do e+=ZS(t,n),n=t,t=t.return;while(t);return e}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var u0=Object.prototype.hasOwnProperty,Bp=Mn.unstable_scheduleCallback,Wd=Mn.unstable_cancelCallback,eA=Mn.unstable_shouldYield,tA=Mn.unstable_requestPaint,Ps=Mn.unstable_now,nA=Mn.unstable_getCurrentPriorityLevel,$x=Mn.unstable_ImmediatePriority,Fx=Mn.unstable_UserBlockingPriority,Zh=Mn.unstable_NormalPriority,sA=Mn.unstable_LowPriority,Hx=Mn.unstable_IdlePriority,aA=Mn.log,iA=Mn.unstable_setDisableYieldValue,uu=null,Vs=null;function Vi(t){if(typeof aA=="function"&&iA(t),Vs&&typeof Vs.setStrictMode=="function")try{Vs.setStrictMode(uu,t)}catch{}}var Ls=Math.clz32?Math.clz32:lA,rA=Math.log,oA=Math.LN2;function lA(t){return t>>>=0,t===0?32:31-(rA(t)/oA|0)|0}var Xu=256,Wu=262144,Ju=4194304;function Mr(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Zf(t,e,n){var s=t.pendingLanes;if(s===0)return 0;var a=0,i=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var l=s&134217727;return l!==0?(s=l&~i,s!==0?a=Mr(s):(r&=l,r!==0?a=Mr(r):n||(n=l&~t,n!==0&&(a=Mr(n))))):(l=s&~i,l!==0?a=Mr(l):r!==0?a=Mr(r):n||(n=s&~t,n!==0&&(a=Mr(n)))),a===0?0:e!==0&&e!==a&&!(e&i)&&(i=a&-a,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:a}function hu(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function cA(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qx(){var t=Ju;return Ju<<=1,!(Ju&62914560)&&(Ju=4194304),t}function Jd(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function fu(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function uA(t,e,n,s,a,i){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var l=t.entanglements,c=t.expirationTimes,h=t.hiddenUpdates;for(n=r&~n;0<n;){var d=31-Ls(n),p=1<<d;l[d]=0,c[d]=-1;var g=h[d];if(g!==null)for(h[d]=null,d=0;d<g.length;d++){var v=g[d];v!==null&&(v.lane&=-536870913)}n&=~p}s!==0&&Gx(t,s,0),i!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=i&~(r&~e))}function Gx(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var s=31-Ls(e);t.entangledLanes|=e,t.entanglements[s]=t.entanglements[s]|1073741824|n&261930}function Yx(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var s=31-Ls(n),a=1<<s;a&e|t[s]&e&&(t[s]|=e),n&=~a}}function Kx(t,e){var n=e&-e;return n=n&42?1:$p(n),n&(t.suspendedLanes|e)?0:n}function $p(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Fp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function Qx(){var t=gt.p;return t!==0?t:(t=window.event,t===void 0?32:v2(t.type))}function Hy(t,e){var n=gt.p;try{return gt.p=t,e()}finally{gt.p=n}}var yr=Math.random().toString(36).slice(2),Gn="__reactFiber$"+yr,Ns="__reactProps$"+yr,Sl="__reactContainer$"+yr,h0="__reactEvents$"+yr,hA="__reactListeners$"+yr,fA="__reactHandles$"+yr,qy="__reactResources$"+yr,du="__reactMarker$"+yr;function Hp(t){delete t[Gn],delete t[Ns],delete t[h0],delete t[hA],delete t[fA]}function Do(t){var e=t[Gn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Sl]||n[Gn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Jv(t);t!==null;){if(n=t[Gn])return n;t=Jv(t)}return e}t=n,n=t.parentNode}return null}function Al(t){if(t=t[Gn]||t[Sl]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function rc(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(G(33))}function Go(t){var e=t[qy];return e||(e=t[qy]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Ln(t){t[du]=!0}var Xx=new Set,Wx={};function so(t,e){il(t,e),il(t+"Capture",e)}function il(t,e){for(Wx[t]=e,t=0;t<e.length;t++)Xx.add(e[t])}var dA=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Gy={},Yy={};function mA(t){return u0.call(Yy,t)?!0:u0.call(Gy,t)?!1:dA.test(t)?Yy[t]=!0:(Gy[t]=!0,!1)}function _h(t,e,n){if(mA(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var s=e.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Zu(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function qa(t,e,n,s){if(s===null)t.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+s)}}function Hs(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Jx(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function pA(t,e,n){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var a=s.get,i=s.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,i.call(this,r)}}),Object.defineProperty(t,e,{enumerable:s.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function f0(t){if(!t._valueTracker){var e=Jx(t)?"checked":"value";t._valueTracker=pA(t,e,""+t[e])}}function Zx(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),s="";return t&&(s=Jx(t)?t.checked?"true":"false":t.value),t=s,t!==n?(e.setValue(t),!0):!1}function ef(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var gA=/[\n"\\]/g;function Ys(t){return t.replace(gA,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function d0(t,e,n,s,a,i,r,l){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Hs(e)):t.value!==""+Hs(e)&&(t.value=""+Hs(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?m0(t,r,Hs(e)):n!=null?m0(t,r,Hs(n)):s!=null&&t.removeAttribute("value"),a==null&&i!=null&&(t.defaultChecked=!!i),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?t.name=""+Hs(l):t.removeAttribute("name")}function e_(t,e,n,s,a,i,r,l){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){f0(t);return}n=n!=null?""+Hs(n):"",e=e!=null?""+Hs(e):n,l||e===t.value||(t.value=e),t.defaultValue=e}s=s??a,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=l?t.checked:!!s,t.defaultChecked=!!s,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),f0(t)}function m0(t,e,n){e==="number"&&ef(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Yo(t,e,n,s){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&s&&(t[n].defaultSelected=!0)}else{for(n=""+Hs(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,s&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function t_(t,e,n){if(e!=null&&(e=""+Hs(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+Hs(n):""}function n_(t,e,n,s){if(e==null){if(s!=null){if(n!=null)throw Error(G(92));if(ic(s)){if(1<s.length)throw Error(G(93));s=s[0]}n=s}n==null&&(n=""),e=n}n=Hs(e),t.defaultValue=n,s=t.textContent,s===n&&s!==""&&s!==null&&(t.value=s),f0(t)}function rl(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var yA=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ky(t,e,n){var s=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?s?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":s?t.setProperty(e,n):typeof n!="number"||n===0||yA.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function s_(t,e,n){if(e!=null&&typeof e!="object")throw Error(G(62));if(t=t.style,n!=null){for(var s in n)!n.hasOwnProperty(s)||e!=null&&e.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="");for(var a in e)s=e[a],e.hasOwnProperty(a)&&n[a]!==s&&Ky(t,a,s)}else for(var i in e)e.hasOwnProperty(i)&&Ky(t,i,e[i])}function qp(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var vA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),bA=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Th(t){return bA.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Za(){}var p0=null;function Gp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Oo=null,Ko=null;function Qy(t){var e=Al(t);if(e&&(t=e.stateNode)){var n=t[Ns]||null;e:switch(t=e.stateNode,e.type){case"input":if(d0(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ys(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var s=n[e];if(s!==t&&s.form===t.form){var a=s[Ns]||null;if(!a)throw Error(G(90));d0(s,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)s=n[e],s.form===t.form&&Zx(s)}break e;case"textarea":t_(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&Yo(t,!!n.multiple,e,!1)}}}var Zd=!1;function a_(t,e,n){if(Zd)return t(e,n);Zd=!0;try{var s=t(e);return s}finally{if(Zd=!1,(Oo!==null||Ko!==null)&&(hd(),Oo&&(e=Oo,t=Ko,Ko=Oo=null,Qy(e),t)))for(e=0;e<t.length;e++)Qy(t[e])}}function zc(t,e){var n=t.stateNode;if(n===null)return null;var s=n[Ns]||null;if(s===null)return null;n=s[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(G(231,e,typeof n));return n}var ci=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g0=!1;if(ci)try{var Ql={};Object.defineProperty(Ql,"passive",{get:function(){g0=!0}}),window.addEventListener("test",Ql,Ql),window.removeEventListener("test",Ql,Ql)}catch{g0=!1}var Li=null,Yp=null,Eh=null;function i_(){if(Eh)return Eh;var t,e=Yp,n=e.length,s,a="value"in Li?Li.value:Li.textContent,i=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(s=1;s<=r&&e[n-s]===a[i-s];s++);return Eh=a.slice(t,1<s?1-s:void 0)}function wh(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function eh(){return!0}function Xy(){return!1}function Rs(t){function e(n,s,a,i,r){this._reactName=n,this._targetInst=a,this.type=s,this.nativeEvent=i,this.target=r,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?eh:Xy,this.isPropagationStopped=Xy,this}return qt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=eh)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=eh)},persist:function(){},isPersistent:eh}),e}var ao={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ed=Rs(ao),mu=qt({},ao,{view:0,detail:0}),xA=Rs(mu),em,tm,Xl,td=qt({},mu,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Xl&&(Xl&&t.type==="mousemove"?(em=t.screenX-Xl.screenX,tm=t.screenY-Xl.screenY):tm=em=0,Xl=t),em)},movementY:function(t){return"movementY"in t?t.movementY:tm}}),Wy=Rs(td),_A=qt({},td,{dataTransfer:0}),TA=Rs(_A),EA=qt({},mu,{relatedTarget:0}),nm=Rs(EA),wA=qt({},ao,{animationName:0,elapsedTime:0,pseudoElement:0}),SA=Rs(wA),AA=qt({},ao,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),NA=Rs(AA),RA=qt({},ao,{data:0}),Jy=Rs(RA),kA={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},CA={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},IA={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function MA(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=IA[t])?!!e[t]:!1}function Kp(){return MA}var DA=qt({},mu,{key:function(t){if(t.key){var e=kA[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=wh(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?CA[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kp,charCode:function(t){return t.type==="keypress"?wh(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?wh(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),OA=Rs(DA),jA=qt({},td,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zy=Rs(jA),PA=qt({},mu,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kp}),VA=Rs(PA),LA=qt({},ao,{propertyName:0,elapsedTime:0,pseudoElement:0}),UA=Rs(LA),zA=qt({},td,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),BA=Rs(zA),$A=qt({},ao,{newState:0,oldState:0}),FA=Rs($A),HA=[9,13,27,32],Qp=ci&&"CompositionEvent"in window,gc=null;ci&&"documentMode"in document&&(gc=document.documentMode);var qA=ci&&"TextEvent"in window&&!gc,r_=ci&&(!Qp||gc&&8<gc&&11>=gc),ev=String.fromCharCode(32),tv=!1;function o_(t,e){switch(t){case"keyup":return HA.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function l_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var jo=!1;function GA(t,e){switch(t){case"compositionend":return l_(e);case"keypress":return e.which!==32?null:(tv=!0,ev);case"textInput":return t=e.data,t===ev&&tv?null:t;default:return null}}function YA(t,e){if(jo)return t==="compositionend"||!Qp&&o_(t,e)?(t=i_(),Eh=Yp=Li=null,jo=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return r_&&e.locale!=="ko"?null:e.data;default:return null}}var KA={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nv(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!KA[t.type]:e==="textarea"}function c_(t,e,n,s){Oo?Ko?Ko.push(s):Ko=[s]:Oo=s,e=bf(e,"onChange"),0<e.length&&(n=new ed("onChange","change",null,n,s),t.push({event:n,listeners:e}))}var yc=null,Bc=null;function QA(t){a2(t,0)}function nd(t){var e=rc(t);if(Zx(e))return t}function sv(t,e){if(t==="change")return e}var u_=!1;if(ci){var sm;if(ci){var am="oninput"in document;if(!am){var av=document.createElement("div");av.setAttribute("oninput","return;"),am=typeof av.oninput=="function"}sm=am}else sm=!1;u_=sm&&(!document.documentMode||9<document.documentMode)}function iv(){yc&&(yc.detachEvent("onpropertychange",h_),Bc=yc=null)}function h_(t){if(t.propertyName==="value"&&nd(Bc)){var e=[];c_(e,Bc,t,Gp(t)),a_(QA,e)}}function XA(t,e,n){t==="focusin"?(iv(),yc=e,Bc=n,yc.attachEvent("onpropertychange",h_)):t==="focusout"&&iv()}function WA(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return nd(Bc)}function JA(t,e){if(t==="click")return nd(e)}function ZA(t,e){if(t==="input"||t==="change")return nd(e)}function eN(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var zs=typeof Object.is=="function"?Object.is:eN;function $c(t,e){if(zs(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),s=Object.keys(e);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var a=n[s];if(!u0.call(e,a)||!zs(t[a],e[a]))return!1}return!0}function rv(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ov(t,e){var n=rv(t);t=0;for(var s;n;){if(n.nodeType===3){if(s=t+n.textContent.length,t<=e&&s>=e)return{node:n,offset:e-t};t=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=rv(n)}}function f_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?f_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function d_(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=ef(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ef(t.document)}return e}function Xp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var tN=ci&&"documentMode"in document&&11>=document.documentMode,Po=null,y0=null,vc=null,v0=!1;function lv(t,e,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;v0||Po==null||Po!==ef(s)||(s=Po,"selectionStart"in s&&Xp(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),vc&&$c(vc,s)||(vc=s,s=bf(y0,"onSelect"),0<s.length&&(e=new ed("onSelect","select",null,e,n),t.push({event:e,listeners:s}),e.target=Po)))}function kr(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Vo={animationend:kr("Animation","AnimationEnd"),animationiteration:kr("Animation","AnimationIteration"),animationstart:kr("Animation","AnimationStart"),transitionrun:kr("Transition","TransitionRun"),transitionstart:kr("Transition","TransitionStart"),transitioncancel:kr("Transition","TransitionCancel"),transitionend:kr("Transition","TransitionEnd")},im={},m_={};ci&&(m_=document.createElement("div").style,"AnimationEvent"in window||(delete Vo.animationend.animation,delete Vo.animationiteration.animation,delete Vo.animationstart.animation),"TransitionEvent"in window||delete Vo.transitionend.transition);function io(t){if(im[t])return im[t];if(!Vo[t])return t;var e=Vo[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in m_)return im[t]=e[n];return t}var p_=io("animationend"),g_=io("animationiteration"),y_=io("animationstart"),nN=io("transitionrun"),sN=io("transitionstart"),aN=io("transitioncancel"),v_=io("transitionend"),b_=new Map,b0="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");b0.push("scrollEnd");function ga(t,e){b_.set(t,e),so(e,[t])}var tf=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Fs=[],Lo=0,Wp=0;function sd(){for(var t=Lo,e=Wp=Lo=0;e<t;){var n=Fs[e];Fs[e++]=null;var s=Fs[e];Fs[e++]=null;var a=Fs[e];Fs[e++]=null;var i=Fs[e];if(Fs[e++]=null,s!==null&&a!==null){var r=s.pending;r===null?a.next=a:(a.next=r.next,r.next=a),s.pending=a}i!==0&&x_(n,a,i)}}function ad(t,e,n,s){Fs[Lo++]=t,Fs[Lo++]=e,Fs[Lo++]=n,Fs[Lo++]=s,Wp|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function Jp(t,e,n,s){return ad(t,e,n,s),nf(t)}function ro(t,e){return ad(t,null,null,e),nf(t)}function x_(t,e,n){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n);for(var a=!1,i=t.return;i!==null;)i.childLanes|=n,s=i.alternate,s!==null&&(s.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(a=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,a&&e!==null&&(a=31-Ls(n),t=i.hiddenUpdates,s=t[a],s===null?t[a]=[e]:s.push(e),e.lane=n|536870912),i):null}function nf(t){if(50<Nc)throw Nc=0,z0=null,Error(G(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Uo={};function iN(t,e,n,s){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ds(t,e,n,s){return new iN(t,e,n,s)}function Zp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function si(t,e){var n=t.alternate;return n===null?(n=Ds(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function __(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Sh(t,e,n,s,a,i){var r=0;if(s=t,typeof t=="function")Zp(t)&&(r=1);else if(typeof t=="string")r=u5(t,n,ka.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case r0:return t=Ds(31,n,e,a),t.elementType=r0,t.lanes=i,t;case Io:return Br(n.children,a,i,e);case zx:r=8,a|=24;break;case s0:return t=Ds(12,n,e,a|2),t.elementType=s0,t.lanes=i,t;case a0:return t=Ds(13,n,e,a),t.elementType=a0,t.lanes=i,t;case i0:return t=Ds(19,n,e,a),t.elementType=i0,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ja:r=10;break e;case Bx:r=9;break e;case Up:r=11;break e;case zp:r=14;break e;case Ni:r=16,s=null;break e}r=29,n=Error(G(130,t===null?"null":typeof t,"")),s=null}return e=Ds(r,n,e,a),e.elementType=t,e.type=s,e.lanes=i,e}function Br(t,e,n,s){return t=Ds(7,t,s,e),t.lanes=n,t}function rm(t,e,n){return t=Ds(6,t,null,e),t.lanes=n,t}function T_(t){var e=Ds(18,null,null,0);return e.stateNode=t,e}function om(t,e,n){return e=Ds(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var cv=new WeakMap;function Ks(t,e){if(typeof t=="object"&&t!==null){var n=cv.get(t);return n!==void 0?n:(e={value:t,source:e,stack:Fy(e)},cv.set(t,e),e)}return{value:t,source:e,stack:Fy(e)}}var zo=[],Bo=0,sf=null,Fc=0,qs=[],Gs=0,ar=null,Aa=1,Na="";function Xa(t,e){zo[Bo++]=Fc,zo[Bo++]=sf,sf=t,Fc=e}function E_(t,e,n){qs[Gs++]=Aa,qs[Gs++]=Na,qs[Gs++]=ar,ar=t;var s=Aa;t=Na;var a=32-Ls(s)-1;s&=~(1<<a),n+=1;var i=32-Ls(e)+a;if(30<i){var r=a-a%5;i=(s&(1<<r)-1).toString(32),s>>=r,a-=r,Aa=1<<32-Ls(e)+a|n<<a|s,Na=i+t}else Aa=1<<i|n<<a|s,Na=t}function eg(t){t.return!==null&&(Xa(t,1),E_(t,1,0))}function tg(t){for(;t===sf;)sf=zo[--Bo],zo[Bo]=null,Fc=zo[--Bo],zo[Bo]=null;for(;t===ar;)ar=qs[--Gs],qs[Gs]=null,Na=qs[--Gs],qs[Gs]=null,Aa=qs[--Gs],qs[Gs]=null}function w_(t,e){qs[Gs++]=Aa,qs[Gs++]=Na,qs[Gs++]=ar,Aa=e.id,Na=e.overflow,ar=t}var Yn=null,$t=null,rt=!1,qi=null,Qs=!1,x0=Error(G(519));function ir(t){var e=Error(G(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Hc(Ks(e,t)),x0}function uv(t){var e=t.stateNode,n=t.type,s=t.memoizedProps;switch(e[Gn]=t,e[Ns]=s,n){case"dialog":We("cancel",e),We("close",e);break;case"iframe":case"object":case"embed":We("load",e);break;case"video":case"audio":for(n=0;n<Kc.length;n++)We(Kc[n],e);break;case"source":We("error",e);break;case"img":case"image":case"link":We("error",e),We("load",e);break;case"details":We("toggle",e);break;case"input":We("invalid",e),e_(e,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":We("invalid",e);break;case"textarea":We("invalid",e),n_(e,s.value,s.defaultValue,s.children)}n=s.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||s.suppressHydrationWarning===!0||r2(e.textContent,n)?(s.popover!=null&&(We("beforetoggle",e),We("toggle",e)),s.onScroll!=null&&We("scroll",e),s.onScrollEnd!=null&&We("scrollend",e),s.onClick!=null&&(e.onclick=Za),e=!0):e=!1,e||ir(t,!0)}function hv(t){for(Yn=t.return;Yn;)switch(Yn.tag){case 5:case 31:case 13:Qs=!1;return;case 27:case 3:Qs=!0;return;default:Yn=Yn.return}}function _o(t){if(t!==Yn)return!1;if(!rt)return hv(t),rt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||q0(t.type,t.memoizedProps)),n=!n),n&&$t&&ir(t),hv(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(G(317));$t=Wv(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(G(317));$t=Wv(t)}else e===27?(e=$t,vr(t.type)?(t=Q0,Q0=null,$t=t):$t=e):$t=Yn?Js(t.stateNode.nextSibling):null;return!0}function Yr(){$t=Yn=null,rt=!1}function lm(){var t=qi;return t!==null&&(Ts===null?Ts=t:Ts.push.apply(Ts,t),qi=null),t}function Hc(t){qi===null?qi=[t]:qi.push(t)}var _0=Va(null),oo=null,ei=null;function ki(t,e,n){Lt(_0,e._currentValue),e._currentValue=n}function ai(t){t._currentValue=_0.current,Un(_0)}function T0(t,e,n){for(;t!==null;){var s=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,s!==null&&(s.childLanes|=e)):s!==null&&(s.childLanes&e)!==e&&(s.childLanes|=e),t===n)break;t=t.return}}function E0(t,e,n,s){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var i=a.dependencies;if(i!==null){var r=a.child;i=i.firstContext;e:for(;i!==null;){var l=i;i=a;for(var c=0;c<e.length;c++)if(l.context===e[c]){i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),T0(i.return,n,t),s||(r=null);break e}i=l.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(G(341));r.lanes|=n,i=r.alternate,i!==null&&(i.lanes|=n),T0(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Nl(t,e,n,s){t=null;for(var a=e,i=!1;a!==null;){if(!i){if(a.flags&524288)i=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(G(387));if(r=r.memoizedProps,r!==null){var l=a.type;zs(a.pendingProps.value,r.value)||(t!==null?t.push(l):t=[l])}}else if(a===Xh.current){if(r=a.alternate,r===null)throw Error(G(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Xc):t=[Xc])}a=a.return}t!==null&&E0(e,t,n,s),e.flags|=262144}function af(t){for(t=t.firstContext;t!==null;){if(!zs(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Kr(t){oo=t,ei=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Qn(t){return S_(oo,t)}function th(t,e){return oo===null&&Kr(t),S_(t,e)}function S_(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},ei===null){if(t===null)throw Error(G(308));ei=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else ei=ei.next=e;return n}var rN=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,s){t.push(s)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},oN=Mn.unstable_scheduleCallback,lN=Mn.unstable_NormalPriority,_n={$$typeof:Ja,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ng(){return{controller:new rN,data:new Map,refCount:0}}function pu(t){t.refCount--,t.refCount===0&&oN(lN,function(){t.controller.abort()})}var bc=null,w0=0,ol=0,Qo=null;function cN(t,e){if(bc===null){var n=bc=[];w0=0,ol=Ng(),Qo={status:"pending",value:void 0,then:function(s){n.push(s)}}}return w0++,e.then(fv,fv),e}function fv(){if(--w0===0&&bc!==null){Qo!==null&&(Qo.status="fulfilled");var t=bc;bc=null,ol=0,Qo=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function uN(t,e){var n=[],s={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){s.status="fulfilled",s.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(s.status="rejected",s.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),s}var dv=Ce.S;Ce.S=function(t,e){UT=Ps(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&cN(t,e),dv!==null&&dv(t,e)};var $r=Va(null);function sg(){var t=$r.current;return t!==null?t:It.pooledCache}function Ah(t,e){e===null?Lt($r,$r.current):Lt($r,e.pool)}function A_(){var t=sg();return t===null?null:{parent:_n._currentValue,pool:t}}var Rl=Error(G(460)),ag=Error(G(474)),id=Error(G(542)),rf={then:function(){}};function mv(t){return t=t.status,t==="fulfilled"||t==="rejected"}function N_(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Za,Za),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,gv(t),t;default:if(typeof e.status=="string")e.then(Za,Za);else{if(t=It,t!==null&&100<t.shellSuspendCounter)throw Error(G(482));t=e,t.status="pending",t.then(function(s){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=s}},function(s){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=s}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,gv(t),t}throw Fr=e,Rl}}function Dr(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Fr=n,Rl):n}}var Fr=null;function pv(){if(Fr===null)throw Error(G(459));var t=Fr;return Fr=null,t}function gv(t){if(t===Rl||t===id)throw Error(G(483))}var Xo=null,qc=0;function nh(t){var e=qc;return qc+=1,Xo===null&&(Xo=[]),N_(Xo,t,e)}function Wl(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function sh(t,e){throw e.$$typeof===XS?Error(G(525)):(t=Object.prototype.toString.call(e),Error(G(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function R_(t){function e(_,b){if(t){var N=_.deletions;N===null?(_.deletions=[b],_.flags|=16):N.push(b)}}function n(_,b){if(!t)return null;for(;b!==null;)e(_,b),b=b.sibling;return null}function s(_){for(var b=new Map;_!==null;)_.key!==null?b.set(_.key,_):b.set(_.index,_),_=_.sibling;return b}function a(_,b){return _=si(_,b),_.index=0,_.sibling=null,_}function i(_,b,N){return _.index=N,t?(N=_.alternate,N!==null?(N=N.index,N<b?(_.flags|=67108866,b):N):(_.flags|=67108866,b)):(_.flags|=1048576,b)}function r(_){return t&&_.alternate===null&&(_.flags|=67108866),_}function l(_,b,N,P){return b===null||b.tag!==6?(b=rm(N,_.mode,P),b.return=_,b):(b=a(b,N),b.return=_,b)}function c(_,b,N,P){var $=N.type;return $===Io?d(_,b,N.props.children,P,N.key):b!==null&&(b.elementType===$||typeof $=="object"&&$!==null&&$.$$typeof===Ni&&Dr($)===b.type)?(b=a(b,N.props),Wl(b,N),b.return=_,b):(b=Sh(N.type,N.key,N.props,null,_.mode,P),Wl(b,N),b.return=_,b)}function h(_,b,N,P){return b===null||b.tag!==4||b.stateNode.containerInfo!==N.containerInfo||b.stateNode.implementation!==N.implementation?(b=om(N,_.mode,P),b.return=_,b):(b=a(b,N.children||[]),b.return=_,b)}function d(_,b,N,P,$){return b===null||b.tag!==7?(b=Br(N,_.mode,P,$),b.return=_,b):(b=a(b,N),b.return=_,b)}function p(_,b,N){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return b=rm(""+b,_.mode,N),b.return=_,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Qu:return N=Sh(b.type,b.key,b.props,null,_.mode,N),Wl(N,b),N.return=_,N;case ac:return b=om(b,_.mode,N),b.return=_,b;case Ni:return b=Dr(b),p(_,b,N)}if(ic(b)||Kl(b))return b=Br(b,_.mode,N,null),b.return=_,b;if(typeof b.then=="function")return p(_,nh(b),N);if(b.$$typeof===Ja)return p(_,th(_,b),N);sh(_,b)}return null}function g(_,b,N,P){var $=b!==null?b.key:null;if(typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint")return $!==null?null:l(_,b,""+N,P);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case Qu:return N.key===$?c(_,b,N,P):null;case ac:return N.key===$?h(_,b,N,P):null;case Ni:return N=Dr(N),g(_,b,N,P)}if(ic(N)||Kl(N))return $!==null?null:d(_,b,N,P,null);if(typeof N.then=="function")return g(_,b,nh(N),P);if(N.$$typeof===Ja)return g(_,b,th(_,N),P);sh(_,N)}return null}function v(_,b,N,P,$){if(typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint")return _=_.get(N)||null,l(b,_,""+P,$);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case Qu:return _=_.get(P.key===null?N:P.key)||null,c(b,_,P,$);case ac:return _=_.get(P.key===null?N:P.key)||null,h(b,_,P,$);case Ni:return P=Dr(P),v(_,b,N,P,$)}if(ic(P)||Kl(P))return _=_.get(N)||null,d(b,_,P,$,null);if(typeof P.then=="function")return v(_,b,N,nh(P),$);if(P.$$typeof===Ja)return v(_,b,N,th(b,P),$);sh(b,P)}return null}function C(_,b,N,P){for(var $=null,J=null,T=b,x=b=0,E=null;T!==null&&x<N.length;x++){T.index>x?(E=T,T=null):E=T.sibling;var A=g(_,T,N[x],P);if(A===null){T===null&&(T=E);break}t&&T&&A.alternate===null&&e(_,T),b=i(A,b,x),J===null?$=A:J.sibling=A,J=A,T=E}if(x===N.length)return n(_,T),rt&&Xa(_,x),$;if(T===null){for(;x<N.length;x++)T=p(_,N[x],P),T!==null&&(b=i(T,b,x),J===null?$=T:J.sibling=T,J=T);return rt&&Xa(_,x),$}for(T=s(T);x<N.length;x++)E=v(T,_,x,N[x],P),E!==null&&(t&&E.alternate!==null&&T.delete(E.key===null?x:E.key),b=i(E,b,x),J===null?$=E:J.sibling=E,J=E);return t&&T.forEach(function(k){return e(_,k)}),rt&&Xa(_,x),$}function I(_,b,N,P){if(N==null)throw Error(G(151));for(var $=null,J=null,T=b,x=b=0,E=null,A=N.next();T!==null&&!A.done;x++,A=N.next()){T.index>x?(E=T,T=null):E=T.sibling;var k=g(_,T,A.value,P);if(k===null){T===null&&(T=E);break}t&&T&&k.alternate===null&&e(_,T),b=i(k,b,x),J===null?$=k:J.sibling=k,J=k,T=E}if(A.done)return n(_,T),rt&&Xa(_,x),$;if(T===null){for(;!A.done;x++,A=N.next())A=p(_,A.value,P),A!==null&&(b=i(A,b,x),J===null?$=A:J.sibling=A,J=A);return rt&&Xa(_,x),$}for(T=s(T);!A.done;x++,A=N.next())A=v(T,_,x,A.value,P),A!==null&&(t&&A.alternate!==null&&T.delete(A.key===null?x:A.key),b=i(A,b,x),J===null?$=A:J.sibling=A,J=A);return t&&T.forEach(function(M){return e(_,M)}),rt&&Xa(_,x),$}function j(_,b,N,P){if(typeof N=="object"&&N!==null&&N.type===Io&&N.key===null&&(N=N.props.children),typeof N=="object"&&N!==null){switch(N.$$typeof){case Qu:e:{for(var $=N.key;b!==null;){if(b.key===$){if($=N.type,$===Io){if(b.tag===7){n(_,b.sibling),P=a(b,N.props.children),P.return=_,_=P;break e}}else if(b.elementType===$||typeof $=="object"&&$!==null&&$.$$typeof===Ni&&Dr($)===b.type){n(_,b.sibling),P=a(b,N.props),Wl(P,N),P.return=_,_=P;break e}n(_,b);break}else e(_,b);b=b.sibling}N.type===Io?(P=Br(N.props.children,_.mode,P,N.key),P.return=_,_=P):(P=Sh(N.type,N.key,N.props,null,_.mode,P),Wl(P,N),P.return=_,_=P)}return r(_);case ac:e:{for($=N.key;b!==null;){if(b.key===$)if(b.tag===4&&b.stateNode.containerInfo===N.containerInfo&&b.stateNode.implementation===N.implementation){n(_,b.sibling),P=a(b,N.children||[]),P.return=_,_=P;break e}else{n(_,b);break}else e(_,b);b=b.sibling}P=om(N,_.mode,P),P.return=_,_=P}return r(_);case Ni:return N=Dr(N),j(_,b,N,P)}if(ic(N))return C(_,b,N,P);if(Kl(N)){if($=Kl(N),typeof $!="function")throw Error(G(150));return N=$.call(N),I(_,b,N,P)}if(typeof N.then=="function")return j(_,b,nh(N),P);if(N.$$typeof===Ja)return j(_,b,th(_,N),P);sh(_,N)}return typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint"?(N=""+N,b!==null&&b.tag===6?(n(_,b.sibling),P=a(b,N),P.return=_,_=P):(n(_,b),P=rm(N,_.mode,P),P.return=_,_=P),r(_)):n(_,b)}return function(_,b,N,P){try{qc=0;var $=j(_,b,N,P);return Xo=null,$}catch(T){if(T===Rl||T===id)throw T;var J=Ds(29,T,null,_.mode);return J.lanes=P,J.return=_,J}finally{}}}var Qr=R_(!0),k_=R_(!1),Ri=!1;function ig(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function S0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Gi(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Yi(t,e,n){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,pt&2){var a=s.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),s.pending=e,e=nf(t),x_(t,null,n),e}return ad(t,s,e,n),nf(t)}function xc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,Yx(t,n)}}function cm(t,e){var n=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?a=i=r:i=i.next=r,n=n.next}while(n!==null);i===null?a=i=e:i=i.next=e}else a=i=e;n={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:s.shared,callbacks:s.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var A0=!1;function _c(){if(A0){var t=Qo;if(t!==null)throw t}}function Tc(t,e,n,s){A0=!1;var a=t.updateQueue;Ri=!1;var i=a.firstBaseUpdate,r=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var c=l,h=c.next;c.next=null,r===null?i=h:r.next=h,r=c;var d=t.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==r&&(l===null?d.firstBaseUpdate=h:l.next=h,d.lastBaseUpdate=c))}if(i!==null){var p=a.baseState;r=0,d=h=c=null,l=i;do{var g=l.lane&-536870913,v=g!==l.lane;if(v?(at&g)===g:(s&g)===g){g!==0&&g===ol&&(A0=!0),d!==null&&(d=d.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});e:{var C=t,I=l;g=e;var j=n;switch(I.tag){case 1:if(C=I.payload,typeof C=="function"){p=C.call(j,p,g);break e}p=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=I.payload,g=typeof C=="function"?C.call(j,p,g):C,g==null)break e;p=qt({},p,g);break e;case 2:Ri=!0}}g=l.callback,g!==null&&(t.flags|=64,v&&(t.flags|=8192),v=a.callbacks,v===null?a.callbacks=[g]:v.push(g))}else v={lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(h=d=v,c=p):d=d.next=v,r|=g;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;v=l,l=v.next,v.next=null,a.lastBaseUpdate=v,a.shared.pending=null}}while(1);d===null&&(c=p),a.baseState=c,a.firstBaseUpdate=h,a.lastBaseUpdate=d,i===null&&(a.shared.lanes=0),or|=r,t.lanes=r,t.memoizedState=p}}function C_(t,e){if(typeof t!="function")throw Error(G(191,t));t.call(e)}function I_(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)C_(n[t],e)}var ll=Va(null),of=Va(0);function yv(t,e){t=di,Lt(of,t),Lt(ll,e),di=t|e.baseLanes}function N0(){Lt(of,di),Lt(ll,ll.current)}function rg(){di=of.current,Un(ll),Un(of)}var Bs=Va(null),Ws=null;function Ci(t){var e=t.alternate;Lt(fn,fn.current&1),Lt(Bs,t),Ws===null&&(e===null||ll.current!==null||e.memoizedState!==null)&&(Ws=t)}function R0(t){Lt(fn,fn.current),Lt(Bs,t),Ws===null&&(Ws=t)}function M_(t){t.tag===22?(Lt(fn,fn.current),Lt(Bs,t),Ws===null&&(Ws=t)):Ii()}function Ii(){Lt(fn,fn.current),Lt(Bs,Bs.current)}function Ms(t){Un(Bs),Ws===t&&(Ws=null),Un(fn)}var fn=Va(0);function lf(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Y0(n)||K0(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ui=0,Fe=null,kt=null,bn=null,cf=!1,Wo=!1,Xr=!1,uf=0,Gc=0,Jo=null,hN=0;function sn(){throw Error(G(321))}function og(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!zs(t[n],e[n]))return!1;return!0}function lg(t,e,n,s,a,i){return ui=i,Fe=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ce.H=t===null||t.memoizedState===null?cT:bg,Xr=!1,i=n(s,a),Xr=!1,Wo&&(i=O_(e,n,s,a)),D_(t),i}function D_(t){Ce.H=Yc;var e=kt!==null&&kt.next!==null;if(ui=0,bn=kt=Fe=null,cf=!1,Gc=0,Jo=null,e)throw Error(G(300));t===null||En||(t=t.dependencies,t!==null&&af(t)&&(En=!0))}function O_(t,e,n,s){Fe=t;var a=0;do{if(Wo&&(Jo=null),Gc=0,Wo=!1,25<=a)throw Error(G(301));if(a+=1,bn=kt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}Ce.H=uT,i=e(n,s)}while(Wo);return i}function fN(){var t=Ce.H,e=t.useState()[0];return e=typeof e.then=="function"?gu(e):e,t=t.useState()[0],(kt!==null?kt.memoizedState:null)!==t&&(Fe.flags|=1024),e}function cg(){var t=uf!==0;return uf=0,t}function ug(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function hg(t){if(cf){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}cf=!1}ui=0,bn=kt=Fe=null,Wo=!1,Gc=uf=0,Jo=null}function hs(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return bn===null?Fe.memoizedState=bn=t:bn=bn.next=t,bn}function dn(){if(kt===null){var t=Fe.alternate;t=t!==null?t.memoizedState:null}else t=kt.next;var e=bn===null?Fe.memoizedState:bn.next;if(e!==null)bn=e,kt=t;else{if(t===null)throw Fe.alternate===null?Error(G(467)):Error(G(310));kt=t,t={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null},bn===null?Fe.memoizedState=bn=t:bn=bn.next=t}return bn}function rd(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function gu(t){var e=Gc;return Gc+=1,Jo===null&&(Jo=[]),t=N_(Jo,t,e),e=Fe,(bn===null?e.memoizedState:bn.next)===null&&(e=e.alternate,Ce.H=e===null||e.memoizedState===null?cT:bg),t}function od(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return gu(t);if(t.$$typeof===Ja)return Qn(t)}throw Error(G(438,String(t)))}function fg(t){var e=null,n=Fe.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var s=Fe.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(e={data:s.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=rd(),Fe.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),s=0;s<t;s++)n[s]=WS;return e.index++,n}function hi(t,e){return typeof e=="function"?e(t):e}function Nh(t){var e=dn();return dg(e,kt,t)}function dg(t,e,n){var s=t.queue;if(s===null)throw Error(G(311));s.lastRenderedReducer=n;var a=t.baseQueue,i=s.pending;if(i!==null){if(a!==null){var r=a.next;a.next=i.next,i.next=r}e.baseQueue=a=i,s.pending=null}if(i=t.baseState,a===null)t.memoizedState=i;else{e=a.next;var l=r=null,c=null,h=e,d=!1;do{var p=h.lane&-536870913;if(p!==h.lane?(at&p)===p:(ui&p)===p){var g=h.revertLane;if(g===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),p===ol&&(d=!0);else if((ui&g)===g){h=h.next,g===ol&&(d=!0);continue}else p={lane:0,revertLane:h.revertLane,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},c===null?(l=c=p,r=i):c=c.next=p,Fe.lanes|=g,or|=g;p=h.action,Xr&&n(i,p),i=h.hasEagerState?h.eagerState:n(i,p)}else g={lane:p,revertLane:h.revertLane,gesture:h.gesture,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},c===null?(l=c=g,r=i):c=c.next=g,Fe.lanes|=p,or|=p;h=h.next}while(h!==null&&h!==e);if(c===null?r=i:c.next=l,!zs(i,t.memoizedState)&&(En=!0,d&&(n=Qo,n!==null)))throw n;t.memoizedState=i,t.baseState=r,t.baseQueue=c,s.lastRenderedState=i}return a===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function um(t){var e=dn(),n=e.queue;if(n===null)throw Error(G(311));n.lastRenderedReducer=t;var s=n.dispatch,a=n.pending,i=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do i=t(i,r.action),r=r.next;while(r!==a);zs(i,e.memoizedState)||(En=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,s]}function j_(t,e,n){var s=Fe,a=dn(),i=rt;if(i){if(n===void 0)throw Error(G(407));n=n()}else n=e();var r=!zs((kt||a).memoizedState,n);if(r&&(a.memoizedState=n,En=!0),a=a.queue,mg(L_.bind(null,s,a,t),[t]),a.getSnapshot!==e||r||bn!==null&&bn.memoizedState.tag&1){if(s.flags|=2048,cl(9,{destroy:void 0},V_.bind(null,s,a,n,e),null),It===null)throw Error(G(349));i||ui&127||P_(s,e,n)}return n}function P_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Fe.updateQueue,e===null?(e=rd(),Fe.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function V_(t,e,n,s){e.value=n,e.getSnapshot=s,U_(e)&&z_(t)}function L_(t,e,n){return n(function(){U_(e)&&z_(t)})}function U_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!zs(t,n)}catch{return!0}}function z_(t){var e=ro(t,2);e!==null&&As(e,t,2)}function k0(t){var e=hs();if(typeof t=="function"){var n=t;if(t=n(),Xr){Vi(!0);try{n()}finally{Vi(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hi,lastRenderedState:t},e}function B_(t,e,n,s){return t.baseState=n,dg(t,kt,typeof s=="function"?s:hi)}function dN(t,e,n,s,a){if(cd(t))throw Error(G(485));if(t=e.action,t!==null){var i={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){i.listeners.push(r)}};Ce.T!==null?n(!0):i.isTransition=!1,s(i),n=e.pending,n===null?(i.next=e.pending=i,$_(e,i)):(i.next=n.next,e.pending=n.next=i)}}function $_(t,e){var n=e.action,s=e.payload,a=t.state;if(e.isTransition){var i=Ce.T,r={};Ce.T=r;try{var l=n(a,s),c=Ce.S;c!==null&&c(r,l),vv(t,e,l)}catch(h){C0(t,e,h)}finally{i!==null&&r.types!==null&&(i.types=r.types),Ce.T=i}}else try{i=n(a,s),vv(t,e,i)}catch(h){C0(t,e,h)}}function vv(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(s){bv(t,e,s)},function(s){return C0(t,e,s)}):bv(t,e,n)}function bv(t,e,n){e.status="fulfilled",e.value=n,F_(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,$_(t,n)))}function C0(t,e,n){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do e.status="rejected",e.reason=n,F_(e),e=e.next;while(e!==s)}t.action=null}function F_(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function H_(t,e){return e}function xv(t,e){if(rt){var n=It.formState;if(n!==null){e:{var s=Fe;if(rt){if($t){t:{for(var a=$t,i=Qs;a.nodeType!==8;){if(!i){a=null;break t}if(a=Js(a.nextSibling),a===null){a=null;break t}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){$t=Js(a.nextSibling),s=a.data==="F!";break e}}ir(s)}s=!1}s&&(e=n[0])}}return n=hs(),n.memoizedState=n.baseState=e,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:H_,lastRenderedState:e},n.queue=s,n=rT.bind(null,Fe,s),s.dispatch=n,s=k0(!1),i=vg.bind(null,Fe,!1,s.queue),s=hs(),a={state:e,dispatch:null,action:t,pending:null},s.queue=a,n=dN.bind(null,Fe,a,i,n),a.dispatch=n,s.memoizedState=t,[e,n,!1]}function _v(t){var e=dn();return q_(e,kt,t)}function q_(t,e,n){if(e=dg(t,e,H_)[0],t=Nh(hi)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var s=gu(e)}catch(r){throw r===Rl?id:r}else s=e;e=dn();var a=e.queue,i=a.dispatch;return n!==e.memoizedState&&(Fe.flags|=2048,cl(9,{destroy:void 0},mN.bind(null,a,n),null)),[s,i,t]}function mN(t,e){t.action=e}function Tv(t){var e=dn(),n=kt;if(n!==null)return q_(e,n,t);dn(),e=e.memoizedState,n=dn();var s=n.queue.dispatch;return n.memoizedState=t,[e,s,!1]}function cl(t,e,n,s){return t={tag:t,create:n,deps:s,inst:e,next:null},e=Fe.updateQueue,e===null&&(e=rd(),Fe.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(s=n.next,n.next=t,t.next=s,e.lastEffect=t),t}function G_(){return dn().memoizedState}function Rh(t,e,n,s){var a=hs();Fe.flags|=t,a.memoizedState=cl(1|e,{destroy:void 0},n,s===void 0?null:s)}function ld(t,e,n,s){var a=dn();s=s===void 0?null:s;var i=a.memoizedState.inst;kt!==null&&s!==null&&og(s,kt.memoizedState.deps)?a.memoizedState=cl(e,i,n,s):(Fe.flags|=t,a.memoizedState=cl(1|e,i,n,s))}function Ev(t,e){Rh(8390656,8,t,e)}function mg(t,e){ld(2048,8,t,e)}function pN(t){Fe.flags|=4;var e=Fe.updateQueue;if(e===null)e=rd(),Fe.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Y_(t){var e=dn().memoizedState;return pN({ref:e,nextImpl:t}),function(){if(pt&2)throw Error(G(440));return e.impl.apply(void 0,arguments)}}function K_(t,e){return ld(4,2,t,e)}function Q_(t,e){return ld(4,4,t,e)}function X_(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function W_(t,e,n){n=n!=null?n.concat([t]):null,ld(4,4,X_.bind(null,e,t),n)}function pg(){}function J_(t,e){var n=dn();e=e===void 0?null:e;var s=n.memoizedState;return e!==null&&og(e,s[1])?s[0]:(n.memoizedState=[t,e],t)}function Z_(t,e){var n=dn();e=e===void 0?null:e;var s=n.memoizedState;if(e!==null&&og(e,s[1]))return s[0];if(s=t(),Xr){Vi(!0);try{t()}finally{Vi(!1)}}return n.memoizedState=[s,e],s}function gg(t,e,n){return n===void 0||ui&1073741824&&!(at&261930)?t.memoizedState=e:(t.memoizedState=n,t=BT(),Fe.lanes|=t,or|=t,n)}function eT(t,e,n,s){return zs(n,e)?n:ll.current!==null?(t=gg(t,n,s),zs(t,e)||(En=!0),t):!(ui&42)||ui&1073741824&&!(at&261930)?(En=!0,t.memoizedState=n):(t=BT(),Fe.lanes|=t,or|=t,e)}function tT(t,e,n,s,a){var i=gt.p;gt.p=i!==0&&8>i?i:8;var r=Ce.T,l={};Ce.T=l,vg(t,!1,e,n);try{var c=a(),h=Ce.S;if(h!==null&&h(l,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=uN(c,s);Ec(t,e,d,Us(t))}else Ec(t,e,s,Us(t))}catch(p){Ec(t,e,{then:function(){},status:"rejected",reason:p},Us())}finally{gt.p=i,r!==null&&l.types!==null&&(r.types=l.types),Ce.T=r}}function gN(){}function I0(t,e,n,s){if(t.tag!==5)throw Error(G(476));var a=nT(t).queue;tT(t,a,e,zr,n===null?gN:function(){return sT(t),n(s)})}function nT(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:zr,baseState:zr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hi,lastRenderedState:zr},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hi,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function sT(t){var e=nT(t);e.next===null&&(e=t.alternate.memoizedState),Ec(t,e.next.queue,{},Us())}function yg(){return Qn(Xc)}function aT(){return dn().memoizedState}function iT(){return dn().memoizedState}function yN(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=Us();t=Gi(n);var s=Yi(e,t,n);s!==null&&(As(s,e,n),xc(s,e,n)),e={cache:ng()},t.payload=e;return}e=e.return}}function vN(t,e,n){var s=Us();n={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},cd(t)?oT(e,n):(n=Jp(t,e,n,s),n!==null&&(As(n,t,s),lT(n,e,s)))}function rT(t,e,n){var s=Us();Ec(t,e,n,s)}function Ec(t,e,n,s){var a={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(cd(t))oT(e,a);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var r=e.lastRenderedState,l=i(r,n);if(a.hasEagerState=!0,a.eagerState=l,zs(l,r))return ad(t,e,a,0),It===null&&sd(),!1}catch{}finally{}if(n=Jp(t,e,a,s),n!==null)return As(n,t,s),lT(n,e,s),!0}return!1}function vg(t,e,n,s){if(s={lane:2,revertLane:Ng(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},cd(t)){if(e)throw Error(G(479))}else e=Jp(t,n,s,2),e!==null&&As(e,t,2)}function cd(t){var e=t.alternate;return t===Fe||e!==null&&e===Fe}function oT(t,e){Wo=cf=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function lT(t,e,n){if(n&4194048){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,Yx(t,n)}}var Yc={readContext:Qn,use:od,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useLayoutEffect:sn,useInsertionEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useSyncExternalStore:sn,useId:sn,useHostTransitionStatus:sn,useFormState:sn,useActionState:sn,useOptimistic:sn,useMemoCache:sn,useCacheRefresh:sn};Yc.useEffectEvent=sn;var cT={readContext:Qn,use:od,useCallback:function(t,e){return hs().memoizedState=[t,e===void 0?null:e],t},useContext:Qn,useEffect:Ev,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Rh(4194308,4,X_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Rh(4194308,4,t,e)},useInsertionEffect:function(t,e){Rh(4,2,t,e)},useMemo:function(t,e){var n=hs();e=e===void 0?null:e;var s=t();if(Xr){Vi(!0);try{t()}finally{Vi(!1)}}return n.memoizedState=[s,e],s},useReducer:function(t,e,n){var s=hs();if(n!==void 0){var a=n(e);if(Xr){Vi(!0);try{n(e)}finally{Vi(!1)}}}else a=e;return s.memoizedState=s.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},s.queue=t,t=t.dispatch=vN.bind(null,Fe,t),[s.memoizedState,t]},useRef:function(t){var e=hs();return t={current:t},e.memoizedState=t},useState:function(t){t=k0(t);var e=t.queue,n=rT.bind(null,Fe,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:pg,useDeferredValue:function(t,e){var n=hs();return gg(n,t,e)},useTransition:function(){var t=k0(!1);return t=tT.bind(null,Fe,t.queue,!0,!1),hs().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var s=Fe,a=hs();if(rt){if(n===void 0)throw Error(G(407));n=n()}else{if(n=e(),It===null)throw Error(G(349));at&127||P_(s,e,n)}a.memoizedState=n;var i={value:n,getSnapshot:e};return a.queue=i,Ev(L_.bind(null,s,i,t),[t]),s.flags|=2048,cl(9,{destroy:void 0},V_.bind(null,s,i,n,e),null),n},useId:function(){var t=hs(),e=It.identifierPrefix;if(rt){var n=Na,s=Aa;n=(s&~(1<<32-Ls(s)-1)).toString(32)+n,e="_"+e+"R_"+n,n=uf++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=hN++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:yg,useFormState:xv,useActionState:xv,useOptimistic:function(t){var e=hs();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=vg.bind(null,Fe,!0,n),n.dispatch=e,[t,e]},useMemoCache:fg,useCacheRefresh:function(){return hs().memoizedState=yN.bind(null,Fe)},useEffectEvent:function(t){var e=hs(),n={impl:t};return e.memoizedState=n,function(){if(pt&2)throw Error(G(440));return n.impl.apply(void 0,arguments)}}},bg={readContext:Qn,use:od,useCallback:J_,useContext:Qn,useEffect:mg,useImperativeHandle:W_,useInsertionEffect:K_,useLayoutEffect:Q_,useMemo:Z_,useReducer:Nh,useRef:G_,useState:function(){return Nh(hi)},useDebugValue:pg,useDeferredValue:function(t,e){var n=dn();return eT(n,kt.memoizedState,t,e)},useTransition:function(){var t=Nh(hi)[0],e=dn().memoizedState;return[typeof t=="boolean"?t:gu(t),e]},useSyncExternalStore:j_,useId:aT,useHostTransitionStatus:yg,useFormState:_v,useActionState:_v,useOptimistic:function(t,e){var n=dn();return B_(n,kt,t,e)},useMemoCache:fg,useCacheRefresh:iT};bg.useEffectEvent=Y_;var uT={readContext:Qn,use:od,useCallback:J_,useContext:Qn,useEffect:mg,useImperativeHandle:W_,useInsertionEffect:K_,useLayoutEffect:Q_,useMemo:Z_,useReducer:um,useRef:G_,useState:function(){return um(hi)},useDebugValue:pg,useDeferredValue:function(t,e){var n=dn();return kt===null?gg(n,t,e):eT(n,kt.memoizedState,t,e)},useTransition:function(){var t=um(hi)[0],e=dn().memoizedState;return[typeof t=="boolean"?t:gu(t),e]},useSyncExternalStore:j_,useId:aT,useHostTransitionStatus:yg,useFormState:Tv,useActionState:Tv,useOptimistic:function(t,e){var n=dn();return kt!==null?B_(n,kt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:fg,useCacheRefresh:iT};uT.useEffectEvent=Y_;function hm(t,e,n,s){e=t.memoizedState,n=n(s,e),n=n==null?e:qt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var M0={enqueueSetState:function(t,e,n){t=t._reactInternals;var s=Us(),a=Gi(s);a.payload=e,n!=null&&(a.callback=n),e=Yi(t,a,s),e!==null&&(As(e,t,s),xc(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var s=Us(),a=Gi(s);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=Yi(t,a,s),e!==null&&(As(e,t,s),xc(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Us(),s=Gi(n);s.tag=2,e!=null&&(s.callback=e),e=Yi(t,s,n),e!==null&&(As(e,t,n),xc(e,t,n))}};function wv(t,e,n,s,a,i,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,i,r):e.prototype&&e.prototype.isPureReactComponent?!$c(n,s)||!$c(a,i):!0}function Sv(t,e,n,s){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,s),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,s),e.state!==t&&M0.enqueueReplaceState(e,e.state,null)}function Wr(t,e){var n=e;if("ref"in e){n={};for(var s in e)s!=="ref"&&(n[s]=e[s])}if(t=t.defaultProps){n===e&&(n=qt({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function hT(t){tf(t)}function fT(t){console.error(t)}function dT(t){tf(t)}function hf(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(s){setTimeout(function(){throw s})}}function Av(t,e,n){try{var s=t.onCaughtError;s(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function D0(t,e,n){return n=Gi(n),n.tag=3,n.payload={element:null},n.callback=function(){hf(t,e)},n}function mT(t){return t=Gi(t),t.tag=3,t}function pT(t,e,n,s){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=s.value;t.payload=function(){return a(i)},t.callback=function(){Av(e,n,s)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){Av(e,n,s),typeof a!="function"&&(Ki===null?Ki=new Set([this]):Ki.add(this));var l=s.stack;this.componentDidCatch(s.value,{componentStack:l!==null?l:""})})}function bN(t,e,n,s,a){if(n.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(e=n.alternate,e!==null&&Nl(e,n,a,!0),n=Bs.current,n!==null){switch(n.tag){case 31:case 13:return Ws===null?gf():n.alternate===null&&an===0&&(an=3),n.flags&=-257,n.flags|=65536,n.lanes=a,s===rf?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([s]):e.add(s),Tm(t,s,a)),!1;case 22:return n.flags|=65536,s===rf?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([s])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([s]):n.add(s)),Tm(t,s,a)),!1}throw Error(G(435,n.tag))}return Tm(t,s,a),gf(),!1}if(rt)return e=Bs.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,s!==x0&&(t=Error(G(422),{cause:s}),Hc(Ks(t,n)))):(s!==x0&&(e=Error(G(423),{cause:s}),Hc(Ks(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,s=Ks(s,n),a=D0(t.stateNode,s,a),cm(t,a),an!==4&&(an=2)),!1;var i=Error(G(520),{cause:s});if(i=Ks(i,n),Ac===null?Ac=[i]:Ac.push(i),an!==4&&(an=2),e===null)return!0;s=Ks(s,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=D0(n.stateNode,s,t),cm(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Ki===null||!Ki.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,a=mT(a),pT(a,t,n,s),cm(n,a),!1}n=n.return}while(n!==null);return!1}var xg=Error(G(461)),En=!1;function Hn(t,e,n,s){e.child=t===null?k_(e,null,n,s):Qr(e,t.child,n,s)}function Nv(t,e,n,s,a){n=n.render;var i=e.ref;if("ref"in s){var r={};for(var l in s)l!=="ref"&&(r[l]=s[l])}else r=s;return Kr(e),s=lg(t,e,n,r,i,a),l=cg(),t!==null&&!En?(ug(t,e,a),fi(t,e,a)):(rt&&l&&eg(e),e.flags|=1,Hn(t,e,s,a),e.child)}function Rv(t,e,n,s,a){if(t===null){var i=n.type;return typeof i=="function"&&!Zp(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,gT(t,e,i,s,a)):(t=Sh(n.type,null,s,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!_g(t,a)){var r=i.memoizedProps;if(n=n.compare,n=n!==null?n:$c,n(r,s)&&t.ref===e.ref)return fi(t,e,a)}return e.flags|=1,t=si(i,s),t.ref=e.ref,t.return=e,e.child=t}function gT(t,e,n,s,a){if(t!==null){var i=t.memoizedProps;if($c(i,s)&&t.ref===e.ref)if(En=!1,e.pendingProps=s=i,_g(t,a))t.flags&131072&&(En=!0);else return e.lanes=t.lanes,fi(t,e,a)}return O0(t,e,n,s,a)}function yT(t,e,n,s){var a=s.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if(e.flags&128){if(i=i!==null?i.baseLanes|n:n,t!==null){for(s=e.child=t.child,a=0;s!==null;)a=a|s.lanes|s.childLanes,s=s.sibling;s=a&~i}else s=0,e.child=null;return kv(t,e,i,n,s)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ah(e,i!==null?i.cachePool:null),i!==null?yv(e,i):N0(),M_(e);else return s=e.lanes=536870912,kv(t,e,i!==null?i.baseLanes|n:n,n,s)}else i!==null?(Ah(e,i.cachePool),yv(e,i),Ii(),e.memoizedState=null):(t!==null&&Ah(e,null),N0(),Ii());return Hn(t,e,a,n),e.child}function oc(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function kv(t,e,n,s,a){var i=sg();return i=i===null?null:{parent:_n._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&Ah(e,null),N0(),M_(e),t!==null&&Nl(t,e,s,!0),e.childLanes=a,null}function kh(t,e){return e=ff({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Cv(t,e,n){return Qr(e,t.child,null,n),t=kh(e,e.pendingProps),t.flags|=2,Ms(e),e.memoizedState=null,t}function xN(t,e,n){var s=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(rt){if(s.mode==="hidden")return t=kh(e,s),e.lanes=536870912,oc(null,t);if(R0(e),(t=$t)?(t=c2(t,Qs),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:ar!==null?{id:Aa,overflow:Na}:null,retryLane:536870912,hydrationErrors:null},n=T_(t),n.return=e,e.child=n,Yn=e,$t=null)):t=null,t===null)throw ir(e);return e.lanes=536870912,null}return kh(e,s)}var i=t.memoizedState;if(i!==null){var r=i.dehydrated;if(R0(e),a)if(e.flags&256)e.flags&=-257,e=Cv(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(G(558));else if(En||Nl(t,e,n,!1),a=(n&t.childLanes)!==0,En||a){if(s=It,s!==null&&(r=Kx(s,n),r!==0&&r!==i.retryLane))throw i.retryLane=r,ro(t,r),As(s,t,r),xg;gf(),e=Cv(t,e,n)}else t=i.treeContext,$t=Js(r.nextSibling),Yn=e,rt=!0,qi=null,Qs=!1,t!==null&&w_(e,t),e=kh(e,s),e.flags|=4096;return e}return t=si(t.child,{mode:s.mode,children:s.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ch(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(G(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function O0(t,e,n,s,a){return Kr(e),n=lg(t,e,n,s,void 0,a),s=cg(),t!==null&&!En?(ug(t,e,a),fi(t,e,a)):(rt&&s&&eg(e),e.flags|=1,Hn(t,e,n,a),e.child)}function Iv(t,e,n,s,a,i){return Kr(e),e.updateQueue=null,n=O_(e,s,n,a),D_(t),s=cg(),t!==null&&!En?(ug(t,e,i),fi(t,e,i)):(rt&&s&&eg(e),e.flags|=1,Hn(t,e,n,i),e.child)}function Mv(t,e,n,s,a){if(Kr(e),e.stateNode===null){var i=Uo,r=n.contextType;typeof r=="object"&&r!==null&&(i=Qn(r)),i=new n(s,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=M0,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=s,i.state=e.memoizedState,i.refs={},ig(e),r=n.contextType,i.context=typeof r=="object"&&r!==null?Qn(r):Uo,i.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(hm(e,n,r,s),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(r=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),r!==i.state&&M0.enqueueReplaceState(i,i.state,null),Tc(e,s,i,a),_c(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),s=!0}else if(t===null){i=e.stateNode;var l=e.memoizedProps,c=Wr(n,l);i.props=c;var h=i.context,d=n.contextType;r=Uo,typeof d=="object"&&d!==null&&(r=Qn(d));var p=n.getDerivedStateFromProps;d=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function",l=e.pendingProps!==l,d||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l||h!==r)&&Sv(e,i,s,r),Ri=!1;var g=e.memoizedState;i.state=g,Tc(e,s,i,a),_c(),h=e.memoizedState,l||g!==h||Ri?(typeof p=="function"&&(hm(e,n,p,s),h=e.memoizedState),(c=Ri||wv(e,n,c,s,g,h,r))?(d||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=s,e.memoizedState=h),i.props=s,i.state=h,i.context=r,s=c):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),s=!1)}else{i=e.stateNode,S0(t,e),r=e.memoizedProps,d=Wr(n,r),i.props=d,p=e.pendingProps,g=i.context,h=n.contextType,c=Uo,typeof h=="object"&&h!==null&&(c=Qn(h)),l=n.getDerivedStateFromProps,(h=typeof l=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r!==p||g!==c)&&Sv(e,i,s,c),Ri=!1,g=e.memoizedState,i.state=g,Tc(e,s,i,a),_c();var v=e.memoizedState;r!==p||g!==v||Ri||t!==null&&t.dependencies!==null&&af(t.dependencies)?(typeof l=="function"&&(hm(e,n,l,s),v=e.memoizedState),(d=Ri||wv(e,n,d,s,g,v,c)||t!==null&&t.dependencies!==null&&af(t.dependencies))?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(s,v,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(s,v,c)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=s,e.memoizedState=v),i.props=s,i.state=v,i.context=c,s=d):(typeof i.componentDidUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),s=!1)}return i=s,Ch(t,e),s=(e.flags&128)!==0,i||s?(i=e.stateNode,n=s&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&s?(e.child=Qr(e,t.child,null,a),e.child=Qr(e,null,n,a)):Hn(t,e,n,a),e.memoizedState=i.state,t=e.child):t=fi(t,e,a),t}function Dv(t,e,n,s){return Yr(),e.flags|=256,Hn(t,e,n,s),e.child}var fm={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function dm(t){return{baseLanes:t,cachePool:A_()}}function mm(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=Os),t}function vT(t,e,n){var s=e.pendingProps,a=!1,i=(e.flags&128)!==0,r;if((r=i)||(r=t!==null&&t.memoizedState===null?!1:(fn.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(rt){if(a?Ci(e):Ii(),(t=$t)?(t=c2(t,Qs),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:ar!==null?{id:Aa,overflow:Na}:null,retryLane:536870912,hydrationErrors:null},n=T_(t),n.return=e,e.child=n,Yn=e,$t=null)):t=null,t===null)throw ir(e);return K0(t)?e.lanes=32:e.lanes=536870912,null}var l=s.children;return s=s.fallback,a?(Ii(),a=e.mode,l=ff({mode:"hidden",children:l},a),s=Br(s,a,n,null),l.return=e,s.return=e,l.sibling=s,e.child=l,s=e.child,s.memoizedState=dm(n),s.childLanes=mm(t,r,n),e.memoizedState=fm,oc(null,s)):(Ci(e),j0(e,l))}var c=t.memoizedState;if(c!==null&&(l=c.dehydrated,l!==null)){if(i)e.flags&256?(Ci(e),e.flags&=-257,e=pm(t,e,n)):e.memoizedState!==null?(Ii(),e.child=t.child,e.flags|=128,e=null):(Ii(),l=s.fallback,a=e.mode,s=ff({mode:"visible",children:s.children},a),l=Br(l,a,n,null),l.flags|=2,s.return=e,l.return=e,s.sibling=l,e.child=s,Qr(e,t.child,null,n),s=e.child,s.memoizedState=dm(n),s.childLanes=mm(t,r,n),e.memoizedState=fm,e=oc(null,s));else if(Ci(e),K0(l)){if(r=l.nextSibling&&l.nextSibling.dataset,r)var h=r.dgst;r=h,s=Error(G(419)),s.stack="",s.digest=r,Hc({value:s,source:null,stack:null}),e=pm(t,e,n)}else if(En||Nl(t,e,n,!1),r=(n&t.childLanes)!==0,En||r){if(r=It,r!==null&&(s=Kx(r,n),s!==0&&s!==c.retryLane))throw c.retryLane=s,ro(t,s),As(r,t,s),xg;Y0(l)||gf(),e=pm(t,e,n)}else Y0(l)?(e.flags|=192,e.child=t.child,e=null):(t=c.treeContext,$t=Js(l.nextSibling),Yn=e,rt=!0,qi=null,Qs=!1,t!==null&&w_(e,t),e=j0(e,s.children),e.flags|=4096);return e}return a?(Ii(),l=s.fallback,a=e.mode,c=t.child,h=c.sibling,s=si(c,{mode:"hidden",children:s.children}),s.subtreeFlags=c.subtreeFlags&65011712,h!==null?l=si(h,l):(l=Br(l,a,n,null),l.flags|=2),l.return=e,s.return=e,s.sibling=l,e.child=s,oc(null,s),s=e.child,l=t.child.memoizedState,l===null?l=dm(n):(a=l.cachePool,a!==null?(c=_n._currentValue,a=a.parent!==c?{parent:c,pool:c}:a):a=A_(),l={baseLanes:l.baseLanes|n,cachePool:a}),s.memoizedState=l,s.childLanes=mm(t,r,n),e.memoizedState=fm,oc(t.child,s)):(Ci(e),n=t.child,t=n.sibling,n=si(n,{mode:"visible",children:s.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function j0(t,e){return e=ff({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function ff(t,e){return t=Ds(22,t,null,e),t.lanes=0,t}function pm(t,e,n){return Qr(e,t.child,null,n),t=j0(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Ov(t,e,n){t.lanes|=e;var s=t.alternate;s!==null&&(s.lanes|=e),T0(t.return,e,n)}function gm(t,e,n,s,a,i){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:a,treeForkCount:i}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=s,r.tail=n,r.tailMode=a,r.treeForkCount=i)}function bT(t,e,n){var s=e.pendingProps,a=s.revealOrder,i=s.tail;s=s.children;var r=fn.current,l=(r&2)!==0;if(l?(r=r&1|2,e.flags|=128):r&=1,Lt(fn,r),Hn(t,e,s,n),s=rt?Fc:0,!l&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ov(t,n,e);else if(t.tag===19)Ov(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&lf(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),gm(e,!1,a,n,i,s);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&lf(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}gm(e,!0,n,null,i,s);break;case"together":gm(e,!1,null,null,void 0,s);break;default:e.memoizedState=null}return e.child}function fi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),or|=e.lanes,!(n&e.childLanes))if(t!==null){if(Nl(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(G(153));if(e.child!==null){for(t=e.child,n=si(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=si(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function _g(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&af(t)))}function _N(t,e,n){switch(e.tag){case 3:Wh(e,e.stateNode.containerInfo),ki(e,_n,t.memoizedState.cache),Yr();break;case 27:case 5:c0(e);break;case 4:Wh(e,e.stateNode.containerInfo);break;case 10:ki(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,R0(e),null;break;case 13:var s=e.memoizedState;if(s!==null)return s.dehydrated!==null?(Ci(e),e.flags|=128,null):n&e.child.childLanes?vT(t,e,n):(Ci(e),t=fi(t,e,n),t!==null?t.sibling:null);Ci(e);break;case 19:var a=(t.flags&128)!==0;if(s=(n&e.childLanes)!==0,s||(Nl(t,e,n,!1),s=(n&e.childLanes)!==0),a){if(s)return bT(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Lt(fn,fn.current),s)break;return null;case 22:return e.lanes=0,yT(t,e,n,e.pendingProps);case 24:ki(e,_n,t.memoizedState.cache)}return fi(t,e,n)}function xT(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)En=!0;else{if(!_g(t,n)&&!(e.flags&128))return En=!1,_N(t,e,n);En=!!(t.flags&131072)}else En=!1,rt&&e.flags&1048576&&E_(e,Fc,e.index);switch(e.lanes=0,e.tag){case 16:e:{var s=e.pendingProps;if(t=Dr(e.elementType),e.type=t,typeof t=="function")Zp(t)?(s=Wr(t,s),e.tag=1,e=Mv(null,e,t,s,n)):(e.tag=0,e=O0(null,e,t,s,n));else{if(t!=null){var a=t.$$typeof;if(a===Up){e.tag=11,e=Nv(null,e,t,s,n);break e}else if(a===zp){e.tag=14,e=Rv(null,e,t,s,n);break e}}throw e=o0(t)||t,Error(G(306,e,""))}}return e;case 0:return O0(t,e,e.type,e.pendingProps,n);case 1:return s=e.type,a=Wr(s,e.pendingProps),Mv(t,e,s,a,n);case 3:e:{if(Wh(e,e.stateNode.containerInfo),t===null)throw Error(G(387));s=e.pendingProps;var i=e.memoizedState;a=i.element,S0(t,e),Tc(e,s,null,n);var r=e.memoizedState;if(s=r.cache,ki(e,_n,s),s!==i.cache&&E0(e,[_n],n,!0),_c(),s=r.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Dv(t,e,s,n);break e}else if(s!==a){a=Ks(Error(G(424)),e),Hc(a),e=Dv(t,e,s,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for($t=Js(t.firstChild),Yn=e,rt=!0,qi=null,Qs=!0,n=k_(e,null,s,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Yr(),s===a){e=fi(t,e,n);break e}Hn(t,e,s,n)}e=e.child}return e;case 26:return Ch(t,e),t===null?(n=e1(e.type,null,e.pendingProps,null))?e.memoizedState=n:rt||(n=e.type,t=e.pendingProps,s=xf(Hi.current).createElement(n),s[Gn]=e,s[Ns]=t,Xn(s,n,t),Ln(s),e.stateNode=s):e.memoizedState=e1(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return c0(e),t===null&&rt&&(s=e.stateNode=u2(e.type,e.pendingProps,Hi.current),Yn=e,Qs=!0,a=$t,vr(e.type)?(Q0=a,$t=Js(s.firstChild)):$t=a),Hn(t,e,e.pendingProps.children,n),Ch(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&rt&&((a=s=$t)&&(s=WN(s,e.type,e.pendingProps,Qs),s!==null?(e.stateNode=s,Yn=e,$t=Js(s.firstChild),Qs=!1,a=!0):a=!1),a||ir(e)),c0(e),a=e.type,i=e.pendingProps,r=t!==null?t.memoizedProps:null,s=i.children,q0(a,i)?s=null:r!==null&&q0(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=lg(t,e,fN,null,null,n),Xc._currentValue=a),Ch(t,e),Hn(t,e,s,n),e.child;case 6:return t===null&&rt&&((t=n=$t)&&(n=JN(n,e.pendingProps,Qs),n!==null?(e.stateNode=n,Yn=e,$t=null,t=!0):t=!1),t||ir(e)),null;case 13:return vT(t,e,n);case 4:return Wh(e,e.stateNode.containerInfo),s=e.pendingProps,t===null?e.child=Qr(e,null,s,n):Hn(t,e,s,n),e.child;case 11:return Nv(t,e,e.type,e.pendingProps,n);case 7:return Hn(t,e,e.pendingProps,n),e.child;case 8:return Hn(t,e,e.pendingProps.children,n),e.child;case 12:return Hn(t,e,e.pendingProps.children,n),e.child;case 10:return s=e.pendingProps,ki(e,e.type,s.value),Hn(t,e,s.children,n),e.child;case 9:return a=e.type._context,s=e.pendingProps.children,Kr(e),a=Qn(a),s=s(a),e.flags|=1,Hn(t,e,s,n),e.child;case 14:return Rv(t,e,e.type,e.pendingProps,n);case 15:return gT(t,e,e.type,e.pendingProps,n);case 19:return bT(t,e,n);case 31:return xN(t,e,n);case 22:return yT(t,e,n,e.pendingProps);case 24:return Kr(e),s=Qn(_n),t===null?(a=sg(),a===null&&(a=It,i=ng(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=n),a=i),e.memoizedState={parent:s,cache:a},ig(e),ki(e,_n,a)):(t.lanes&n&&(S0(t,e),Tc(e,null,null,n),_c()),a=t.memoizedState,i=e.memoizedState,a.parent!==s?(a={parent:s,cache:s},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),ki(e,_n,s)):(s=i.cache,ki(e,_n,s),s!==a.cache&&E0(e,[_n],n,!0))),Hn(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(G(156,e.tag))}function Ga(t){t.flags|=4}function ym(t,e,n,s,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(HT())t.flags|=8192;else throw Fr=rf,ag}else t.flags&=-16777217}function jv(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!d2(e))if(HT())t.flags|=8192;else throw Fr=rf,ag}function ah(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?qx():536870912,t.lanes|=e,ul|=e)}function Jl(t,e){if(!rt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null}}function Bt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,s=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags&65011712,s|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=s,t.childLanes=n,e}function TN(t,e,n){var s=e.pendingProps;switch(tg(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Bt(e),null;case 1:return Bt(e),null;case 3:return n=e.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),e.memoizedState.cache!==s&&(e.flags|=2048),ai(_n),al(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(_o(e)?Ga(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,lm())),Bt(e),null;case 26:var a=e.type,i=e.memoizedState;return t===null?(Ga(e),i!==null?(Bt(e),jv(e,i)):(Bt(e),ym(e,a,null,s,n))):i?i!==t.memoizedState?(Ga(e),Bt(e),jv(e,i)):(Bt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==s&&Ga(e),Bt(e),ym(e,a,t,s,n)),null;case 27:if(Jh(e),n=Hi.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&Ga(e);else{if(!s){if(e.stateNode===null)throw Error(G(166));return Bt(e),null}t=ka.current,_o(e)?uv(e):(t=u2(a,s,n),e.stateNode=t,Ga(e))}return Bt(e),null;case 5:if(Jh(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&Ga(e);else{if(!s){if(e.stateNode===null)throw Error(G(166));return Bt(e),null}if(i=ka.current,_o(e))uv(e);else{var r=xf(Hi.current);switch(i){case 1:i=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=r.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof s.is=="string"?r.createElement("select",{is:s.is}):r.createElement("select"),s.multiple?i.multiple=!0:s.size&&(i.size=s.size);break;default:i=typeof s.is=="string"?r.createElement(a,{is:s.is}):r.createElement(a)}}i[Gn]=e,i[Ns]=s;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)i.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=i;e:switch(Xn(i,a,s),a){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}s&&Ga(e)}}return Bt(e),ym(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==s&&Ga(e);else{if(typeof s!="string"&&e.stateNode===null)throw Error(G(166));if(t=Hi.current,_o(e)){if(t=e.stateNode,n=e.memoizedProps,s=null,a=Yn,a!==null)switch(a.tag){case 27:case 5:s=a.memoizedProps}t[Gn]=e,t=!!(t.nodeValue===n||s!==null&&s.suppressHydrationWarning===!0||r2(t.nodeValue,n)),t||ir(e,!0)}else t=xf(t).createTextNode(s),t[Gn]=e,e.stateNode=t}return Bt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(s=_o(e),n!==null){if(t===null){if(!s)throw Error(G(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(G(557));t[Gn]=e}else Yr(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Bt(e),t=!1}else n=lm(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Ms(e),e):(Ms(e),null);if(e.flags&128)throw Error(G(558))}return Bt(e),null;case 13:if(s=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=_o(e),s!==null&&s.dehydrated!==null){if(t===null){if(!a)throw Error(G(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(G(317));a[Gn]=e}else Yr(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Bt(e),a=!1}else a=lm(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(Ms(e),e):(Ms(e),null)}return Ms(e),e.flags&128?(e.lanes=n,e):(n=s!==null,t=t!==null&&t.memoizedState!==null,n&&(s=e.child,a=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(a=s.alternate.memoizedState.cachePool.pool),i=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(i=s.memoizedState.cachePool.pool),i!==a&&(s.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),ah(e,e.updateQueue),Bt(e),null);case 4:return al(),t===null&&Rg(e.stateNode.containerInfo),Bt(e),null;case 10:return ai(e.type),Bt(e),null;case 19:if(Un(fn),s=e.memoizedState,s===null)return Bt(e),null;if(a=(e.flags&128)!==0,i=s.rendering,i===null)if(a)Jl(s,!1);else{if(an!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(i=lf(t),i!==null){for(e.flags|=128,Jl(s,!1),t=i.updateQueue,e.updateQueue=t,ah(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)__(n,t),n=n.sibling;return Lt(fn,fn.current&1|2),rt&&Xa(e,s.treeForkCount),e.child}t=t.sibling}s.tail!==null&&Ps()>mf&&(e.flags|=128,a=!0,Jl(s,!1),e.lanes=4194304)}else{if(!a)if(t=lf(i),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,ah(e,t),Jl(s,!0),s.tail===null&&s.tailMode==="hidden"&&!i.alternate&&!rt)return Bt(e),null}else 2*Ps()-s.renderingStartTime>mf&&n!==536870912&&(e.flags|=128,a=!0,Jl(s,!1),e.lanes=4194304);s.isBackwards?(i.sibling=e.child,e.child=i):(t=s.last,t!==null?t.sibling=i:e.child=i,s.last=i)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Ps(),t.sibling=null,n=fn.current,Lt(fn,a?n&1|2:n&1),rt&&Xa(e,s.treeForkCount),t):(Bt(e),null);case 22:case 23:return Ms(e),rg(),s=e.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(e.flags|=8192):s&&(e.flags|=8192),s?n&536870912&&!(e.flags&128)&&(Bt(e),e.subtreeFlags&6&&(e.flags|=8192)):Bt(e),n=e.updateQueue,n!==null&&ah(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),s=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),s!==n&&(e.flags|=2048),t!==null&&Un($r),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),ai(_n),Bt(e),null;case 25:return null;case 30:return null}throw Error(G(156,e.tag))}function EN(t,e){switch(tg(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ai(_n),al(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Jh(e),null;case 31:if(e.memoizedState!==null){if(Ms(e),e.alternate===null)throw Error(G(340));Yr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Ms(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(G(340));Yr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Un(fn),null;case 4:return al(),null;case 10:return ai(e.type),null;case 22:case 23:return Ms(e),rg(),t!==null&&Un($r),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return ai(_n),null;case 25:return null;default:return null}}function _T(t,e){switch(tg(e),e.tag){case 3:ai(_n),al();break;case 26:case 27:case 5:Jh(e);break;case 4:al();break;case 31:e.memoizedState!==null&&Ms(e);break;case 13:Ms(e);break;case 19:Un(fn);break;case 10:ai(e.type);break;case 22:case 23:Ms(e),rg(),t!==null&&Un($r);break;case 24:ai(_n)}}function yu(t,e){try{var n=e.updateQueue,s=n!==null?n.lastEffect:null;if(s!==null){var a=s.next;n=a;do{if((n.tag&t)===t){s=void 0;var i=n.create,r=n.inst;s=i(),r.destroy=s}n=n.next}while(n!==a)}}catch(l){Et(e,e.return,l)}}function rr(t,e,n){try{var s=e.updateQueue,a=s!==null?s.lastEffect:null;if(a!==null){var i=a.next;s=i;do{if((s.tag&t)===t){var r=s.inst,l=r.destroy;if(l!==void 0){r.destroy=void 0,a=e;var c=n,h=l;try{h()}catch(d){Et(a,c,d)}}}s=s.next}while(s!==i)}}catch(d){Et(e,e.return,d)}}function TT(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{I_(e,n)}catch(s){Et(t,t.return,s)}}}function ET(t,e,n){n.props=Wr(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(s){Et(t,e,s)}}function wc(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:s=t.stateNode;break;default:s=t.stateNode}typeof n=="function"?t.refCleanup=n(s):n.current=s}}catch(a){Et(t,e,a)}}function Ra(t,e){var n=t.ref,s=t.refCleanup;if(n!==null)if(typeof s=="function")try{s()}catch(a){Et(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){Et(t,e,a)}else n.current=null}function wT(t){var e=t.type,n=t.memoizedProps,s=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&s.focus();break e;case"img":n.src?s.src=n.src:n.srcSet&&(s.srcset=n.srcSet)}}catch(a){Et(t,t.return,a)}}function vm(t,e,n){try{var s=t.stateNode;qN(s,t.type,n,e),s[Ns]=e}catch(a){Et(t,t.return,a)}}function ST(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&vr(t.type)||t.tag===4}function bm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||ST(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&vr(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function P0(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Za));else if(s!==4&&(s===27&&vr(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(P0(t,e,n),t=t.sibling;t!==null;)P0(t,e,n),t=t.sibling}function df(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(s!==4&&(s===27&&vr(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(df(t,e,n),t=t.sibling;t!==null;)df(t,e,n),t=t.sibling}function AT(t){var e=t.stateNode,n=t.memoizedProps;try{for(var s=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Xn(e,s,n),e[Gn]=t,e[Ns]=n}catch(i){Et(t,t.return,i)}}var Wa=!1,xn=!1,xm=!1,Pv=typeof WeakSet=="function"?WeakSet:Set,Vn=null;function wN(t,e){if(t=t.containerInfo,F0=wf,t=d_(t),Xp(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var a=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var r=0,l=-1,c=-1,h=0,d=0,p=t,g=null;t:for(;;){for(var v;p!==n||a!==0&&p.nodeType!==3||(l=r+a),p!==i||s!==0&&p.nodeType!==3||(c=r+s),p.nodeType===3&&(r+=p.nodeValue.length),(v=p.firstChild)!==null;)g=p,p=v;for(;;){if(p===t)break t;if(g===n&&++h===a&&(l=r),g===i&&++d===s&&(c=r),(v=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=v}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(H0={focusedElem:t,selectionRange:n},wf=!1,Vn=e;Vn!==null;)if(e=Vn,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Vn=t;else for(;Vn!==null;){switch(e=Vn,i=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&i!==null){t=void 0,n=e,a=i.memoizedProps,i=i.memoizedState,s=n.stateNode;try{var C=Wr(n.type,a);t=s.getSnapshotBeforeUpdate(C,i),s.__reactInternalSnapshotBeforeUpdate=t}catch(I){Et(n,n.return,I)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)G0(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":G0(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(G(163))}if(t=e.sibling,t!==null){t.return=e.return,Vn=t;break}Vn=e.return}}function NT(t,e,n){var s=n.flags;switch(n.tag){case 0:case 11:case 15:Ka(t,n),s&4&&yu(5,n);break;case 1:if(Ka(t,n),s&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){Et(n,n.return,r)}else{var a=Wr(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){Et(n,n.return,r)}}s&64&&TT(n),s&512&&wc(n,n.return);break;case 3:if(Ka(t,n),s&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{I_(t,e)}catch(r){Et(n,n.return,r)}}break;case 27:e===null&&s&4&&AT(n);case 26:case 5:Ka(t,n),e===null&&s&4&&wT(n),s&512&&wc(n,n.return);break;case 12:Ka(t,n);break;case 31:Ka(t,n),s&4&&CT(t,n);break;case 13:Ka(t,n),s&4&&IT(t,n),s&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=DN.bind(null,n),ZN(t,n))));break;case 22:if(s=n.memoizedState!==null||Wa,!s){e=e!==null&&e.memoizedState!==null||xn,a=Wa;var i=xn;Wa=s,(xn=e)&&!i?Qa(t,n,(n.subtreeFlags&8772)!==0):Ka(t,n),Wa=a,xn=i}break;case 30:break;default:Ka(t,n)}}function RT(t){var e=t.alternate;e!==null&&(t.alternate=null,RT(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Hp(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Kt=null,_s=!1;function Ya(t,e,n){for(n=n.child;n!==null;)kT(t,e,n),n=n.sibling}function kT(t,e,n){if(Vs&&typeof Vs.onCommitFiberUnmount=="function")try{Vs.onCommitFiberUnmount(uu,n)}catch{}switch(n.tag){case 26:xn||Ra(n,e),Ya(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:xn||Ra(n,e);var s=Kt,a=_s;vr(n.type)&&(Kt=n.stateNode,_s=!1),Ya(t,e,n),Rc(n.stateNode),Kt=s,_s=a;break;case 5:xn||Ra(n,e);case 6:if(s=Kt,a=_s,Kt=null,Ya(t,e,n),Kt=s,_s=a,Kt!==null)if(_s)try{(Kt.nodeType===9?Kt.body:Kt.nodeName==="HTML"?Kt.ownerDocument.body:Kt).removeChild(n.stateNode)}catch(i){Et(n,e,i)}else try{Kt.removeChild(n.stateNode)}catch(i){Et(n,e,i)}break;case 18:Kt!==null&&(_s?(t=Kt,Qv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ml(t)):Qv(Kt,n.stateNode));break;case 4:s=Kt,a=_s,Kt=n.stateNode.containerInfo,_s=!0,Ya(t,e,n),Kt=s,_s=a;break;case 0:case 11:case 14:case 15:rr(2,n,e),xn||rr(4,n,e),Ya(t,e,n);break;case 1:xn||(Ra(n,e),s=n.stateNode,typeof s.componentWillUnmount=="function"&&ET(n,e,s)),Ya(t,e,n);break;case 21:Ya(t,e,n);break;case 22:xn=(s=xn)||n.memoizedState!==null,Ya(t,e,n),xn=s;break;default:Ya(t,e,n)}}function CT(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ml(t)}catch(n){Et(e,e.return,n)}}}function IT(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ml(t)}catch(n){Et(e,e.return,n)}}function SN(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Pv),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Pv),e;default:throw Error(G(435,t.tag))}}function ih(t,e){var n=SN(t);e.forEach(function(s){if(!n.has(s)){n.add(s);var a=ON.bind(null,t,s);s.then(a,a)}})}function bs(t,e){var n=e.deletions;if(n!==null)for(var s=0;s<n.length;s++){var a=n[s],i=t,r=e,l=r;e:for(;l!==null;){switch(l.tag){case 27:if(vr(l.type)){Kt=l.stateNode,_s=!1;break e}break;case 5:Kt=l.stateNode,_s=!1;break e;case 3:case 4:Kt=l.stateNode.containerInfo,_s=!0;break e}l=l.return}if(Kt===null)throw Error(G(160));kT(i,r,a),Kt=null,_s=!1,i=a.alternate,i!==null&&(i.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)MT(e,t),e=e.sibling}var ua=null;function MT(t,e){var n=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:bs(e,t),xs(t),s&4&&(rr(3,t,t.return),yu(3,t),rr(5,t,t.return));break;case 1:bs(e,t),xs(t),s&512&&(xn||n===null||Ra(n,n.return)),s&64&&Wa&&(t=t.updateQueue,t!==null&&(s=t.callbacks,s!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?s:n.concat(s))));break;case 26:var a=ua;if(bs(e,t),xs(t),s&512&&(xn||n===null||Ra(n,n.return)),s&4){var i=n!==null?n.memoizedState:null;if(s=t.memoizedState,n===null)if(s===null)if(t.stateNode===null){e:{s=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(s){case"title":i=a.getElementsByTagName("title")[0],(!i||i[du]||i[Gn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(s),a.head.insertBefore(i,a.querySelector("head > title"))),Xn(i,s,n),i[Gn]=t,Ln(i),s=i;break e;case"link":var r=n1("link","href",a).get(s+(n.href||""));if(r){for(var l=0;l<r.length;l++)if(i=r[l],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(l,1);break t}}i=a.createElement(s),Xn(i,s,n),a.head.appendChild(i);break;case"meta":if(r=n1("meta","content",a).get(s+(n.content||""))){for(l=0;l<r.length;l++)if(i=r[l],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(l,1);break t}}i=a.createElement(s),Xn(i,s,n),a.head.appendChild(i);break;default:throw Error(G(468,s))}i[Gn]=t,Ln(i),s=i}t.stateNode=s}else s1(a,t.type,t.stateNode);else t.stateNode=t1(a,s,t.memoizedProps);else i!==s?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,s===null?s1(a,t.type,t.stateNode):t1(a,s,t.memoizedProps)):s===null&&t.stateNode!==null&&vm(t,t.memoizedProps,n.memoizedProps)}break;case 27:bs(e,t),xs(t),s&512&&(xn||n===null||Ra(n,n.return)),n!==null&&s&4&&vm(t,t.memoizedProps,n.memoizedProps);break;case 5:if(bs(e,t),xs(t),s&512&&(xn||n===null||Ra(n,n.return)),t.flags&32){a=t.stateNode;try{rl(a,"")}catch(C){Et(t,t.return,C)}}s&4&&t.stateNode!=null&&(a=t.memoizedProps,vm(t,a,n!==null?n.memoizedProps:a)),s&1024&&(xm=!0);break;case 6:if(bs(e,t),xs(t),s&4){if(t.stateNode===null)throw Error(G(162));s=t.memoizedProps,n=t.stateNode;try{n.nodeValue=s}catch(C){Et(t,t.return,C)}}break;case 3:if(Dh=null,a=ua,ua=_f(e.containerInfo),bs(e,t),ua=a,xs(t),s&4&&n!==null&&n.memoizedState.isDehydrated)try{ml(e.containerInfo)}catch(C){Et(t,t.return,C)}xm&&(xm=!1,DT(t));break;case 4:s=ua,ua=_f(t.stateNode.containerInfo),bs(e,t),xs(t),ua=s;break;case 12:bs(e,t),xs(t);break;case 31:bs(e,t),xs(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,ih(t,s)));break;case 13:bs(e,t),xs(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(ud=Ps()),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,ih(t,s)));break;case 22:a=t.memoizedState!==null;var c=n!==null&&n.memoizedState!==null,h=Wa,d=xn;if(Wa=h||a,xn=d||c,bs(e,t),xn=d,Wa=h,xs(t),s&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||c||Wa||xn||Or(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){c=n=e;try{if(i=c.stateNode,a)r=i.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{l=c.stateNode;var p=c.memoizedProps.style,g=p!=null&&p.hasOwnProperty("display")?p.display:null;l.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(C){Et(c,c.return,C)}}}else if(e.tag===6){if(n===null){c=e;try{c.stateNode.nodeValue=a?"":c.memoizedProps}catch(C){Et(c,c.return,C)}}}else if(e.tag===18){if(n===null){c=e;try{var v=c.stateNode;a?Xv(v,!0):Xv(c.stateNode,!1)}catch(C){Et(c,c.return,C)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}s&4&&(s=t.updateQueue,s!==null&&(n=s.retryQueue,n!==null&&(s.retryQueue=null,ih(t,n))));break;case 19:bs(e,t),xs(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,ih(t,s)));break;case 30:break;case 21:break;default:bs(e,t),xs(t)}}function xs(t){var e=t.flags;if(e&2){try{for(var n,s=t.return;s!==null;){if(ST(s)){n=s;break}s=s.return}if(n==null)throw Error(G(160));switch(n.tag){case 27:var a=n.stateNode,i=bm(t);df(t,i,a);break;case 5:var r=n.stateNode;n.flags&32&&(rl(r,""),n.flags&=-33);var l=bm(t);df(t,l,r);break;case 3:case 4:var c=n.stateNode.containerInfo,h=bm(t);P0(t,h,c);break;default:throw Error(G(161))}}catch(d){Et(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function DT(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;DT(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ka(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)NT(t,e.alternate,e),e=e.sibling}function Or(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:rr(4,e,e.return),Or(e);break;case 1:Ra(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&ET(e,e.return,n),Or(e);break;case 27:Rc(e.stateNode);case 26:case 5:Ra(e,e.return),Or(e);break;case 22:e.memoizedState===null&&Or(e);break;case 30:Or(e);break;default:Or(e)}t=t.sibling}}function Qa(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var s=e.alternate,a=t,i=e,r=i.flags;switch(i.tag){case 0:case 11:case 15:Qa(a,i,n),yu(4,i);break;case 1:if(Qa(a,i,n),s=i,a=s.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(h){Et(s,s.return,h)}if(s=i,a=s.updateQueue,a!==null){var l=s.stateNode;try{var c=a.shared.hiddenCallbacks;if(c!==null)for(a.shared.hiddenCallbacks=null,a=0;a<c.length;a++)C_(c[a],l)}catch(h){Et(s,s.return,h)}}n&&r&64&&TT(i),wc(i,i.return);break;case 27:AT(i);case 26:case 5:Qa(a,i,n),n&&s===null&&r&4&&wT(i),wc(i,i.return);break;case 12:Qa(a,i,n);break;case 31:Qa(a,i,n),n&&r&4&&CT(a,i);break;case 13:Qa(a,i,n),n&&r&4&&IT(a,i);break;case 22:i.memoizedState===null&&Qa(a,i,n),wc(i,i.return);break;case 30:break;default:Qa(a,i,n)}e=e.sibling}}function Tg(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&pu(n))}function Eg(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&pu(t))}function ca(t,e,n,s){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)OT(t,e,n,s),e=e.sibling}function OT(t,e,n,s){var a=e.flags;switch(e.tag){case 0:case 11:case 15:ca(t,e,n,s),a&2048&&yu(9,e);break;case 1:ca(t,e,n,s);break;case 3:ca(t,e,n,s),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&pu(t)));break;case 12:if(a&2048){ca(t,e,n,s),t=e.stateNode;try{var i=e.memoizedProps,r=i.id,l=i.onPostCommit;typeof l=="function"&&l(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(c){Et(e,e.return,c)}}else ca(t,e,n,s);break;case 31:ca(t,e,n,s);break;case 13:ca(t,e,n,s);break;case 23:break;case 22:i=e.stateNode,r=e.alternate,e.memoizedState!==null?i._visibility&2?ca(t,e,n,s):Sc(t,e):i._visibility&2?ca(t,e,n,s):(i._visibility|=2,So(t,e,n,s,(e.subtreeFlags&10256)!==0||!1)),a&2048&&Tg(r,e);break;case 24:ca(t,e,n,s),a&2048&&Eg(e.alternate,e);break;default:ca(t,e,n,s)}}function So(t,e,n,s,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,r=e,l=n,c=s,h=r.flags;switch(r.tag){case 0:case 11:case 15:So(i,r,l,c,a),yu(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?So(i,r,l,c,a):Sc(i,r):(d._visibility|=2,So(i,r,l,c,a)),a&&h&2048&&Tg(r.alternate,r);break;case 24:So(i,r,l,c,a),a&&h&2048&&Eg(r.alternate,r);break;default:So(i,r,l,c,a)}e=e.sibling}}function Sc(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,s=e,a=s.flags;switch(s.tag){case 22:Sc(n,s),a&2048&&Tg(s.alternate,s);break;case 24:Sc(n,s),a&2048&&Eg(s.alternate,s);break;default:Sc(n,s)}e=e.sibling}}var lc=8192;function To(t,e,n){if(t.subtreeFlags&lc)for(t=t.child;t!==null;)jT(t,e,n),t=t.sibling}function jT(t,e,n){switch(t.tag){case 26:To(t,e,n),t.flags&lc&&t.memoizedState!==null&&h5(n,ua,t.memoizedState,t.memoizedProps);break;case 5:To(t,e,n);break;case 3:case 4:var s=ua;ua=_f(t.stateNode.containerInfo),To(t,e,n),ua=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=lc,lc=16777216,To(t,e,n),lc=s):To(t,e,n));break;default:To(t,e,n)}}function PT(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Zl(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];Vn=s,LT(s,t)}PT(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)VT(t),t=t.sibling}function VT(t){switch(t.tag){case 0:case 11:case 15:Zl(t),t.flags&2048&&rr(9,t,t.return);break;case 3:Zl(t);break;case 12:Zl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ih(t)):Zl(t);break;default:Zl(t)}}function Ih(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];Vn=s,LT(s,t)}PT(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:rr(8,e,e.return),Ih(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ih(e));break;default:Ih(e)}t=t.sibling}}function LT(t,e){for(;Vn!==null;){var n=Vn;switch(n.tag){case 0:case 11:case 15:rr(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var s=n.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:pu(n.memoizedState.cache)}if(s=n.child,s!==null)s.return=n,Vn=s;else e:for(n=t;Vn!==null;){s=Vn;var a=s.sibling,i=s.return;if(RT(s),s===n){Vn=null;break e}if(a!==null){a.return=i,Vn=a;break e}Vn=i}}}var AN={getCacheForType:function(t){var e=Qn(_n),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Qn(_n).controller.signal}},NN=typeof WeakMap=="function"?WeakMap:Map,pt=0,It=null,Je=null,at=0,Tt=0,Is=null,Ui=!1,kl=!1,wg=!1,di=0,an=0,or=0,Hr=0,Sg=0,Os=0,ul=0,Ac=null,Ts=null,V0=!1,ud=0,UT=0,mf=1/0,pf=null,Ki=null,kn=0,Qi=null,hl=null,ii=0,L0=0,U0=null,zT=null,Nc=0,z0=null;function Us(){return pt&2&&at!==0?at&-at:Ce.T!==null?Ng():Qx()}function BT(){if(Os===0)if(!(at&536870912)||rt){var t=Wu;Wu<<=1,!(Wu&3932160)&&(Wu=262144),Os=t}else Os=536870912;return t=Bs.current,t!==null&&(t.flags|=32),Os}function As(t,e,n){(t===It&&(Tt===2||Tt===9)||t.cancelPendingCommit!==null)&&(fl(t,0),zi(t,at,Os,!1)),fu(t,n),(!(pt&2)||t!==It)&&(t===It&&(!(pt&2)&&(Hr|=n),an===4&&zi(t,at,Os,!1)),La(t))}function $T(t,e,n){if(pt&6)throw Error(G(327));var s=!n&&(e&127)===0&&(e&t.expiredLanes)===0||hu(t,e),a=s?CN(t,e):_m(t,e,!0),i=s;do{if(a===0){kl&&!s&&zi(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!RN(n)){a=_m(t,e,!1),i=!1;continue}if(a===2){if(i=e,t.errorRecoveryDisabledLanes&i)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var l=t;a=Ac;var c=l.current.memoizedState.isDehydrated;if(c&&(fl(l,r).flags|=256),r=_m(l,r,!1),r!==2){if(wg&&!c){l.errorRecoveryDisabledLanes|=i,Hr|=i,a=4;break e}i=Ts,Ts=a,i!==null&&(Ts===null?Ts=i:Ts.push.apply(Ts,i))}a=r}if(i=!1,a!==2)continue}}if(a===1){fl(t,0),zi(t,e,0,!0);break}e:{switch(s=t,i=a,i){case 0:case 1:throw Error(G(345));case 4:if((e&4194048)!==e)break;case 6:zi(s,e,Os,!Ui);break e;case 2:Ts=null;break;case 3:case 5:break;default:throw Error(G(329))}if((e&62914560)===e&&(a=ud+300-Ps(),10<a)){if(zi(s,e,Os,!Ui),Zf(s,0,!0)!==0)break e;ii=e,s.timeoutHandle=l2(Vv.bind(null,s,n,Ts,pf,V0,e,Os,Hr,ul,Ui,i,"Throttled",-0,0),a);break e}Vv(s,n,Ts,pf,V0,e,Os,Hr,ul,Ui,i,null,-0,0)}}break}while(1);La(t)}function Vv(t,e,n,s,a,i,r,l,c,h,d,p,g,v){if(t.timeoutHandle=-1,p=e.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Za},jT(e,i,p);var C=(i&62914560)===i?ud-Ps():(i&4194048)===i?UT-Ps():0;if(C=f5(p,C),C!==null){ii=i,t.cancelPendingCommit=C(Uv.bind(null,t,e,i,n,s,a,r,l,c,d,p,null,g,v)),zi(t,i,r,!h);return}}Uv(t,e,i,n,s,a,r,l,c)}function RN(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var s=0;s<n.length;s++){var a=n[s],i=a.getSnapshot;a=a.value;try{if(!zs(i(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function zi(t,e,n,s){e&=~Sg,e&=~Hr,t.suspendedLanes|=e,t.pingedLanes&=~e,s&&(t.warmLanes|=e),s=t.expirationTimes;for(var a=e;0<a;){var i=31-Ls(a),r=1<<i;s[i]=-1,a&=~r}n!==0&&Gx(t,n,e)}function hd(){return pt&6?!0:(vu(0,!1),!1)}function Ag(){if(Je!==null){if(Tt===0)var t=Je.return;else t=Je,ei=oo=null,hg(t),Xo=null,qc=0,t=Je;for(;t!==null;)_T(t.alternate,t),t=t.return;Je=null}}function fl(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,KN(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),ii=0,Ag(),It=t,Je=n=si(t.current,null),at=e,Tt=0,Is=null,Ui=!1,kl=hu(t,e),wg=!1,ul=Os=Sg=Hr=or=an=0,Ts=Ac=null,V0=!1,e&8&&(e|=e&32);var s=t.entangledLanes;if(s!==0)for(t=t.entanglements,s&=e;0<s;){var a=31-Ls(s),i=1<<a;e|=t[a],s&=~i}return di=e,sd(),n}function FT(t,e){Fe=null,Ce.H=Yc,e===Rl||e===id?(e=pv(),Tt=3):e===ag?(e=pv(),Tt=4):Tt=e===xg?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Is=e,Je===null&&(an=1,hf(t,Ks(e,t.current)))}function HT(){var t=Bs.current;return t===null?!0:(at&4194048)===at?Ws===null:(at&62914560)===at||at&536870912?t===Ws:!1}function qT(){var t=Ce.H;return Ce.H=Yc,t===null?Yc:t}function GT(){var t=Ce.A;return Ce.A=AN,t}function gf(){an=4,Ui||(at&4194048)!==at&&Bs.current!==null||(kl=!0),!(or&134217727)&&!(Hr&134217727)||It===null||zi(It,at,Os,!1)}function _m(t,e,n){var s=pt;pt|=2;var a=qT(),i=GT();(It!==t||at!==e)&&(pf=null,fl(t,e)),e=!1;var r=an;e:do try{if(Tt!==0&&Je!==null){var l=Je,c=Is;switch(Tt){case 8:Ag(),r=6;break e;case 3:case 2:case 9:case 6:Bs.current===null&&(e=!0);var h=Tt;if(Tt=0,Is=null,$o(t,l,c,h),n&&kl){r=0;break e}break;default:h=Tt,Tt=0,Is=null,$o(t,l,c,h)}}kN(),r=an;break}catch(d){FT(t,d)}while(1);return e&&t.shellSuspendCounter++,ei=oo=null,pt=s,Ce.H=a,Ce.A=i,Je===null&&(It=null,at=0,sd()),r}function kN(){for(;Je!==null;)YT(Je)}function CN(t,e){var n=pt;pt|=2;var s=qT(),a=GT();It!==t||at!==e?(pf=null,mf=Ps()+500,fl(t,e)):kl=hu(t,e);e:do try{if(Tt!==0&&Je!==null){e=Je;var i=Is;t:switch(Tt){case 1:Tt=0,Is=null,$o(t,e,i,1);break;case 2:case 9:if(mv(i)){Tt=0,Is=null,Lv(e);break}e=function(){Tt!==2&&Tt!==9||It!==t||(Tt=7),La(t)},i.then(e,e);break e;case 3:Tt=7;break e;case 4:Tt=5;break e;case 7:mv(i)?(Tt=0,Is=null,Lv(e)):(Tt=0,Is=null,$o(t,e,i,7));break;case 5:var r=null;switch(Je.tag){case 26:r=Je.memoizedState;case 5:case 27:var l=Je;if(r?d2(r):l.stateNode.complete){Tt=0,Is=null;var c=l.sibling;if(c!==null)Je=c;else{var h=l.return;h!==null?(Je=h,fd(h)):Je=null}break t}}Tt=0,Is=null,$o(t,e,i,5);break;case 6:Tt=0,Is=null,$o(t,e,i,6);break;case 8:Ag(),an=6;break e;default:throw Error(G(462))}}IN();break}catch(d){FT(t,d)}while(1);return ei=oo=null,Ce.H=s,Ce.A=a,pt=n,Je!==null?0:(It=null,at=0,sd(),an)}function IN(){for(;Je!==null&&!eA();)YT(Je)}function YT(t){var e=xT(t.alternate,t,di);t.memoizedProps=t.pendingProps,e===null?fd(t):Je=e}function Lv(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Iv(n,e,e.pendingProps,e.type,void 0,at);break;case 11:e=Iv(n,e,e.pendingProps,e.type.render,e.ref,at);break;case 5:hg(e);default:_T(n,e),e=Je=__(e,di),e=xT(n,e,di)}t.memoizedProps=t.pendingProps,e===null?fd(t):Je=e}function $o(t,e,n,s){ei=oo=null,hg(e),Xo=null,qc=0;var a=e.return;try{if(bN(t,a,e,n,at)){an=1,hf(t,Ks(n,t.current)),Je=null;return}}catch(i){if(a!==null)throw Je=a,i;an=1,hf(t,Ks(n,t.current)),Je=null;return}e.flags&32768?(rt||s===1?t=!0:kl||at&536870912?t=!1:(Ui=t=!0,(s===2||s===9||s===3||s===6)&&(s=Bs.current,s!==null&&s.tag===13&&(s.flags|=16384))),KT(e,t)):fd(e)}function fd(t){var e=t;do{if(e.flags&32768){KT(e,Ui);return}t=e.return;var n=TN(e.alternate,e,di);if(n!==null){Je=n;return}if(e=e.sibling,e!==null){Je=e;return}Je=e=t}while(e!==null);an===0&&(an=5)}function KT(t,e){do{var n=EN(t.alternate,t);if(n!==null){n.flags&=32767,Je=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){Je=t;return}Je=t=n}while(t!==null);an=6,Je=null}function Uv(t,e,n,s,a,i,r,l,c){t.cancelPendingCommit=null;do dd();while(kn!==0);if(pt&6)throw Error(G(327));if(e!==null){if(e===t.current)throw Error(G(177));if(i=e.lanes|e.childLanes,i|=Wp,uA(t,n,i,r,l,c),t===It&&(Je=It=null,at=0),hl=e,Qi=t,ii=n,L0=i,U0=a,zT=s,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,jN(Zh,function(){return ZT(),null})):(t.callbackNode=null,t.callbackPriority=0),s=(e.flags&13878)!==0,e.subtreeFlags&13878||s){s=Ce.T,Ce.T=null,a=gt.p,gt.p=2,r=pt,pt|=4;try{wN(t,e,n)}finally{pt=r,gt.p=a,Ce.T=s}}kn=1,QT(),XT(),WT()}}function QT(){if(kn===1){kn=0;var t=Qi,e=hl,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=Ce.T,Ce.T=null;var s=gt.p;gt.p=2;var a=pt;pt|=4;try{MT(e,t);var i=H0,r=d_(t.containerInfo),l=i.focusedElem,c=i.selectionRange;if(r!==l&&l&&l.ownerDocument&&f_(l.ownerDocument.documentElement,l)){if(c!==null&&Xp(l)){var h=c.start,d=c.end;if(d===void 0&&(d=h),"selectionStart"in l)l.selectionStart=h,l.selectionEnd=Math.min(d,l.value.length);else{var p=l.ownerDocument||document,g=p&&p.defaultView||window;if(g.getSelection){var v=g.getSelection(),C=l.textContent.length,I=Math.min(c.start,C),j=c.end===void 0?I:Math.min(c.end,C);!v.extend&&I>j&&(r=j,j=I,I=r);var _=ov(l,I),b=ov(l,j);if(_&&b&&(v.rangeCount!==1||v.anchorNode!==_.node||v.anchorOffset!==_.offset||v.focusNode!==b.node||v.focusOffset!==b.offset)){var N=p.createRange();N.setStart(_.node,_.offset),v.removeAllRanges(),I>j?(v.addRange(N),v.extend(b.node,b.offset)):(N.setEnd(b.node,b.offset),v.addRange(N))}}}}for(p=[],v=l;v=v.parentNode;)v.nodeType===1&&p.push({element:v,left:v.scrollLeft,top:v.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<p.length;l++){var P=p[l];P.element.scrollLeft=P.left,P.element.scrollTop=P.top}}wf=!!F0,H0=F0=null}finally{pt=a,gt.p=s,Ce.T=n}}t.current=e,kn=2}}function XT(){if(kn===2){kn=0;var t=Qi,e=hl,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=Ce.T,Ce.T=null;var s=gt.p;gt.p=2;var a=pt;pt|=4;try{NT(t,e.alternate,e)}finally{pt=a,gt.p=s,Ce.T=n}}kn=3}}function WT(){if(kn===4||kn===3){kn=0,tA();var t=Qi,e=hl,n=ii,s=zT;e.subtreeFlags&10256||e.flags&10256?kn=5:(kn=0,hl=Qi=null,JT(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(Ki=null),Fp(n),e=e.stateNode,Vs&&typeof Vs.onCommitFiberRoot=="function")try{Vs.onCommitFiberRoot(uu,e,void 0,(e.current.flags&128)===128)}catch{}if(s!==null){e=Ce.T,a=gt.p,gt.p=2,Ce.T=null;try{for(var i=t.onRecoverableError,r=0;r<s.length;r++){var l=s[r];i(l.value,{componentStack:l.stack})}}finally{Ce.T=e,gt.p=a}}ii&3&&dd(),La(t),a=t.pendingLanes,n&261930&&a&42?t===z0?Nc++:(Nc=0,z0=t):Nc=0,vu(0,!1)}}function JT(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,pu(e)))}function dd(){return QT(),XT(),WT(),ZT()}function ZT(){if(kn!==5)return!1;var t=Qi,e=L0;L0=0;var n=Fp(ii),s=Ce.T,a=gt.p;try{gt.p=32>n?32:n,Ce.T=null,n=U0,U0=null;var i=Qi,r=ii;if(kn=0,hl=Qi=null,ii=0,pt&6)throw Error(G(331));var l=pt;if(pt|=4,VT(i.current),OT(i,i.current,r,n),pt=l,vu(0,!1),Vs&&typeof Vs.onPostCommitFiberRoot=="function")try{Vs.onPostCommitFiberRoot(uu,i)}catch{}return!0}finally{gt.p=a,Ce.T=s,JT(t,e)}}function zv(t,e,n){e=Ks(n,e),e=D0(t.stateNode,e,2),t=Yi(t,e,2),t!==null&&(fu(t,2),La(t))}function Et(t,e,n){if(t.tag===3)zv(t,t,n);else for(;e!==null;){if(e.tag===3){zv(e,t,n);break}else if(e.tag===1){var s=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Ki===null||!Ki.has(s))){t=Ks(n,t),n=mT(2),s=Yi(e,n,2),s!==null&&(pT(n,s,e,t),fu(s,2),La(s));break}}e=e.return}}function Tm(t,e,n){var s=t.pingCache;if(s===null){s=t.pingCache=new NN;var a=new Set;s.set(e,a)}else a=s.get(e),a===void 0&&(a=new Set,s.set(e,a));a.has(n)||(wg=!0,a.add(n),t=MN.bind(null,t,e,n),e.then(t,t))}function MN(t,e,n){var s=t.pingCache;s!==null&&s.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,It===t&&(at&n)===n&&(an===4||an===3&&(at&62914560)===at&&300>Ps()-ud?!(pt&2)&&fl(t,0):Sg|=n,ul===at&&(ul=0)),La(t)}function e2(t,e){e===0&&(e=qx()),t=ro(t,e),t!==null&&(fu(t,e),La(t))}function DN(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),e2(t,n)}function ON(t,e){var n=0;switch(t.tag){case 31:case 13:var s=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(G(314))}s!==null&&s.delete(e),e2(t,n)}function jN(t,e){return Bp(t,e)}var yf=null,Ao=null,B0=!1,vf=!1,Em=!1,Bi=0;function La(t){t!==Ao&&t.next===null&&(Ao===null?yf=Ao=t:Ao=Ao.next=t),vf=!0,B0||(B0=!0,VN())}function vu(t,e){if(!Em&&vf){Em=!0;do for(var n=!1,s=yf;s!==null;){if(!e)if(t!==0){var a=s.pendingLanes;if(a===0)var i=0;else{var r=s.suspendedLanes,l=s.pingedLanes;i=(1<<31-Ls(42|t)+1)-1,i&=a&~(r&~l),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Bv(s,i))}else i=at,i=Zf(s,s===It?i:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),!(i&3)||hu(s,i)||(n=!0,Bv(s,i));s=s.next}while(n);Em=!1}}function PN(){t2()}function t2(){vf=B0=!1;var t=0;Bi!==0&&YN()&&(t=Bi);for(var e=Ps(),n=null,s=yf;s!==null;){var a=s.next,i=n2(s,e);i===0?(s.next=null,n===null?yf=a:n.next=a,a===null&&(Ao=n)):(n=s,(t!==0||i&3)&&(vf=!0)),s=a}kn!==0&&kn!==5||vu(t,!1),Bi!==0&&(Bi=0)}function n2(t,e){for(var n=t.suspendedLanes,s=t.pingedLanes,a=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var r=31-Ls(i),l=1<<r,c=a[r];c===-1?(!(l&n)||l&s)&&(a[r]=cA(l,e)):c<=e&&(t.expiredLanes|=l),i&=~l}if(e=It,n=at,n=Zf(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,n===0||t===e&&(Tt===2||Tt===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&Wd(s),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||hu(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(s!==null&&Wd(s),Fp(n)){case 2:case 8:n=Fx;break;case 32:n=Zh;break;case 268435456:n=Hx;break;default:n=Zh}return s=s2.bind(null,t),n=Bp(n,s),t.callbackPriority=e,t.callbackNode=n,e}return s!==null&&s!==null&&Wd(s),t.callbackPriority=2,t.callbackNode=null,2}function s2(t,e){if(kn!==0&&kn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(dd()&&t.callbackNode!==n)return null;var s=at;return s=Zf(t,t===It?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:($T(t,s,e),n2(t,Ps()),t.callbackNode!=null&&t.callbackNode===n?s2.bind(null,t):null)}function Bv(t,e){if(dd())return null;$T(t,e,!0)}function VN(){QN(function(){pt&6?Bp($x,PN):t2()})}function Ng(){if(Bi===0){var t=ol;t===0&&(t=Xu,Xu<<=1,!(Xu&261888)&&(Xu=256)),Bi=t}return Bi}function $v(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Th(""+t)}function Fv(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function LN(t,e,n,s,a){if(e==="submit"&&n&&n.stateNode===a){var i=$v((a[Ns]||null).action),r=s.submitter;r&&(e=(e=r[Ns]||null)?$v(e.formAction):r.getAttribute("formAction"),e!==null&&(i=e,r=null));var l=new ed("action","action",null,s,a);t.push({event:l,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(Bi!==0){var c=r?Fv(a,r):new FormData(a);I0(n,{pending:!0,data:c,method:a.method,action:i},null,c)}}else typeof i=="function"&&(l.preventDefault(),c=r?Fv(a,r):new FormData(a),I0(n,{pending:!0,data:c,method:a.method,action:i},i,c))},currentTarget:a}]})}}for(var wm=0;wm<b0.length;wm++){var Sm=b0[wm],UN=Sm.toLowerCase(),zN=Sm[0].toUpperCase()+Sm.slice(1);ga(UN,"on"+zN)}ga(p_,"onAnimationEnd");ga(g_,"onAnimationIteration");ga(y_,"onAnimationStart");ga("dblclick","onDoubleClick");ga("focusin","onFocus");ga("focusout","onBlur");ga(nN,"onTransitionRun");ga(sN,"onTransitionStart");ga(aN,"onTransitionCancel");ga(v_,"onTransitionEnd");il("onMouseEnter",["mouseout","mouseover"]);il("onMouseLeave",["mouseout","mouseover"]);il("onPointerEnter",["pointerout","pointerover"]);il("onPointerLeave",["pointerout","pointerover"]);so("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));so("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));so("onBeforeInput",["compositionend","keypress","textInput","paste"]);so("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));so("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));so("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Kc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),BN=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Kc));function a2(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var s=t[n],a=s.event;s=s.listeners;e:{var i=void 0;if(e)for(var r=s.length-1;0<=r;r--){var l=s[r],c=l.instance,h=l.currentTarget;if(l=l.listener,c!==i&&a.isPropagationStopped())break e;i=l,a.currentTarget=h;try{i(a)}catch(d){tf(d)}a.currentTarget=null,i=c}else for(r=0;r<s.length;r++){if(l=s[r],c=l.instance,h=l.currentTarget,l=l.listener,c!==i&&a.isPropagationStopped())break e;i=l,a.currentTarget=h;try{i(a)}catch(d){tf(d)}a.currentTarget=null,i=c}}}}function We(t,e){var n=e[h0];n===void 0&&(n=e[h0]=new Set);var s=t+"__bubble";n.has(s)||(i2(e,t,2,!1),n.add(s))}function Am(t,e,n){var s=0;e&&(s|=4),i2(n,t,s,e)}var rh="_reactListening"+Math.random().toString(36).slice(2);function Rg(t){if(!t[rh]){t[rh]=!0,Xx.forEach(function(n){n!=="selectionchange"&&(BN.has(n)||Am(n,!1,t),Am(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[rh]||(e[rh]=!0,Am("selectionchange",!1,e))}}function i2(t,e,n,s){switch(v2(e)){case 2:var a=p5;break;case 8:a=g5;break;default:a=Mg}n=a.bind(null,e,n,t),a=void 0,!g0||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),s?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function Nm(t,e,n,s,a){var i=s;if(!(e&1)&&!(e&2)&&s!==null)e:for(;;){if(s===null)return;var r=s.tag;if(r===3||r===4){var l=s.stateNode.containerInfo;if(l===a)break;if(r===4)for(r=s.return;r!==null;){var c=r.tag;if((c===3||c===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;l!==null;){if(r=Do(l),r===null)return;if(c=r.tag,c===5||c===6||c===26||c===27){s=i=r;continue e}l=l.parentNode}}s=s.return}a_(function(){var h=i,d=Gp(n),p=[];e:{var g=b_.get(t);if(g!==void 0){var v=ed,C=t;switch(t){case"keypress":if(wh(n)===0)break e;case"keydown":case"keyup":v=OA;break;case"focusin":C="focus",v=nm;break;case"focusout":C="blur",v=nm;break;case"beforeblur":case"afterblur":v=nm;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Wy;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=TA;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=VA;break;case p_:case g_:case y_:v=SA;break;case v_:v=UA;break;case"scroll":case"scrollend":v=xA;break;case"wheel":v=BA;break;case"copy":case"cut":case"paste":v=NA;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Zy;break;case"toggle":case"beforetoggle":v=FA}var I=(e&4)!==0,j=!I&&(t==="scroll"||t==="scrollend"),_=I?g!==null?g+"Capture":null:g;I=[];for(var b=h,N;b!==null;){var P=b;if(N=P.stateNode,P=P.tag,P!==5&&P!==26&&P!==27||N===null||_===null||(P=zc(b,_),P!=null&&I.push(Qc(b,P,N))),j)break;b=b.return}0<I.length&&(g=new v(g,C,null,n,d),p.push({event:g,listeners:I}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",v=t==="mouseout"||t==="pointerout",g&&n!==p0&&(C=n.relatedTarget||n.fromElement)&&(Do(C)||C[Sl]))break e;if((v||g)&&(g=d.window===d?d:(g=d.ownerDocument)?g.defaultView||g.parentWindow:window,v?(C=n.relatedTarget||n.toElement,v=h,C=C?Do(C):null,C!==null&&(j=cu(C),I=C.tag,C!==j||I!==5&&I!==27&&I!==6)&&(C=null)):(v=null,C=h),v!==C)){if(I=Wy,P="onMouseLeave",_="onMouseEnter",b="mouse",(t==="pointerout"||t==="pointerover")&&(I=Zy,P="onPointerLeave",_="onPointerEnter",b="pointer"),j=v==null?g:rc(v),N=C==null?g:rc(C),g=new I(P,b+"leave",v,n,d),g.target=j,g.relatedTarget=N,P=null,Do(d)===h&&(I=new I(_,b+"enter",C,n,d),I.target=N,I.relatedTarget=j,P=I),j=P,v&&C)t:{for(I=$N,_=v,b=C,N=0,P=_;P;P=I(P))N++;P=0;for(var $=b;$;$=I($))P++;for(;0<N-P;)_=I(_),N--;for(;0<P-N;)b=I(b),P--;for(;N--;){if(_===b||b!==null&&_===b.alternate){I=_;break t}_=I(_),b=I(b)}I=null}else I=null;v!==null&&Hv(p,g,v,I,!1),C!==null&&j!==null&&Hv(p,j,C,I,!0)}}e:{if(g=h?rc(h):window,v=g.nodeName&&g.nodeName.toLowerCase(),v==="select"||v==="input"&&g.type==="file")var J=sv;else if(nv(g))if(u_)J=ZA;else{J=WA;var T=XA}else v=g.nodeName,!v||v.toLowerCase()!=="input"||g.type!=="checkbox"&&g.type!=="radio"?h&&qp(h.elementType)&&(J=sv):J=JA;if(J&&(J=J(t,h))){c_(p,J,n,d);break e}T&&T(t,g,h),t==="focusout"&&h&&g.type==="number"&&h.memoizedProps.value!=null&&m0(g,"number",g.value)}switch(T=h?rc(h):window,t){case"focusin":(nv(T)||T.contentEditable==="true")&&(Po=T,y0=h,vc=null);break;case"focusout":vc=y0=Po=null;break;case"mousedown":v0=!0;break;case"contextmenu":case"mouseup":case"dragend":v0=!1,lv(p,n,d);break;case"selectionchange":if(tN)break;case"keydown":case"keyup":lv(p,n,d)}var x;if(Qp)e:{switch(t){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else jo?o_(t,n)&&(E="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(r_&&n.locale!=="ko"&&(jo||E!=="onCompositionStart"?E==="onCompositionEnd"&&jo&&(x=i_()):(Li=d,Yp="value"in Li?Li.value:Li.textContent,jo=!0)),T=bf(h,E),0<T.length&&(E=new Jy(E,t,null,n,d),p.push({event:E,listeners:T}),x?E.data=x:(x=l_(n),x!==null&&(E.data=x)))),(x=qA?GA(t,n):YA(t,n))&&(E=bf(h,"onBeforeInput"),0<E.length&&(T=new Jy("onBeforeInput","beforeinput",null,n,d),p.push({event:T,listeners:E}),T.data=x)),LN(p,t,h,n,d)}a2(p,e)})}function Qc(t,e,n){return{instance:t,listener:e,currentTarget:n}}function bf(t,e){for(var n=e+"Capture",s=[];t!==null;){var a=t,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=zc(t,n),a!=null&&s.unshift(Qc(t,a,i)),a=zc(t,e),a!=null&&s.push(Qc(t,a,i))),t.tag===3)return s;t=t.return}return[]}function $N(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Hv(t,e,n,s,a){for(var i=e._reactName,r=[];n!==null&&n!==s;){var l=n,c=l.alternate,h=l.stateNode;if(l=l.tag,c!==null&&c===s)break;l!==5&&l!==26&&l!==27||h===null||(c=h,a?(h=zc(n,i),h!=null&&r.unshift(Qc(n,h,c))):a||(h=zc(n,i),h!=null&&r.push(Qc(n,h,c)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var FN=/\r\n?/g,HN=/\u0000|\uFFFD/g;function qv(t){return(typeof t=="string"?t:""+t).replace(FN,`
`).replace(HN,"")}function r2(t,e){return e=qv(e),qv(t)===e}function Rt(t,e,n,s,a,i){switch(n){case"children":typeof s=="string"?e==="body"||e==="textarea"&&s===""||rl(t,s):(typeof s=="number"||typeof s=="bigint")&&e!=="body"&&rl(t,""+s);break;case"className":Zu(t,"class",s);break;case"tabIndex":Zu(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":Zu(t,n,s);break;case"style":s_(t,s,i);break;case"data":if(e!=="object"){Zu(t,"data",s);break}case"src":case"href":if(s===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=Th(""+s),t.setAttribute(n,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&Rt(t,e,"name",a.name,a,null),Rt(t,e,"formEncType",a.formEncType,a,null),Rt(t,e,"formMethod",a.formMethod,a,null),Rt(t,e,"formTarget",a.formTarget,a,null)):(Rt(t,e,"encType",a.encType,a,null),Rt(t,e,"method",a.method,a,null),Rt(t,e,"target",a.target,a,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=Th(""+s),t.setAttribute(n,s);break;case"onClick":s!=null&&(t.onclick=Za);break;case"onScroll":s!=null&&We("scroll",t);break;case"onScrollEnd":s!=null&&We("scrollend",t);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(G(61));if(n=s.__html,n!=null){if(a.children!=null)throw Error(G(60));t.innerHTML=n}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}n=Th(""+s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""+s):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":s===!0?t.setAttribute(n,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,s):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(n,s):t.removeAttribute(n);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(n):t.setAttribute(n,s);break;case"popover":We("beforetoggle",t),We("toggle",t),_h(t,"popover",s);break;case"xlinkActuate":qa(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":qa(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":qa(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":qa(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":qa(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":qa(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":qa(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":qa(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":qa(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":_h(t,"is",s);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=vA.get(n)||n,_h(t,n,s))}}function $0(t,e,n,s,a,i){switch(n){case"style":s_(t,s,i);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(G(61));if(n=s.__html,n!=null){if(a.children!=null)throw Error(G(60));t.innerHTML=n}}break;case"children":typeof s=="string"?rl(t,s):(typeof s=="number"||typeof s=="bigint")&&rl(t,""+s);break;case"onScroll":s!=null&&We("scroll",t);break;case"onScrollEnd":s!=null&&We("scrollend",t);break;case"onClick":s!=null&&(t.onclick=Za);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Wx.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),i=t[Ns]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,a),typeof s=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,s,a);break e}n in t?t[n]=s:s===!0?t.setAttribute(n,""):_h(t,n,s)}}}function Xn(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":We("error",t),We("load",t);var s=!1,a=!1,i;for(i in n)if(n.hasOwnProperty(i)){var r=n[i];if(r!=null)switch(i){case"src":s=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(G(137,e));default:Rt(t,e,i,r,n,null)}}a&&Rt(t,e,"srcSet",n.srcSet,n,null),s&&Rt(t,e,"src",n.src,n,null);return;case"input":We("invalid",t);var l=i=r=a=null,c=null,h=null;for(s in n)if(n.hasOwnProperty(s)){var d=n[s];if(d!=null)switch(s){case"name":a=d;break;case"type":r=d;break;case"checked":c=d;break;case"defaultChecked":h=d;break;case"value":i=d;break;case"defaultValue":l=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(G(137,e));break;default:Rt(t,e,s,d,n,null)}}e_(t,i,l,c,h,r,a,!1);return;case"select":We("invalid",t),s=r=i=null;for(a in n)if(n.hasOwnProperty(a)&&(l=n[a],l!=null))switch(a){case"value":i=l;break;case"defaultValue":r=l;break;case"multiple":s=l;default:Rt(t,e,a,l,n,null)}e=i,n=r,t.multiple=!!s,e!=null?Yo(t,!!s,e,!1):n!=null&&Yo(t,!!s,n,!0);return;case"textarea":We("invalid",t),i=a=s=null;for(r in n)if(n.hasOwnProperty(r)&&(l=n[r],l!=null))switch(r){case"value":s=l;break;case"defaultValue":a=l;break;case"children":i=l;break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(G(91));break;default:Rt(t,e,r,l,n,null)}n_(t,s,a,i);return;case"option":for(c in n)if(n.hasOwnProperty(c)&&(s=n[c],s!=null))switch(c){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Rt(t,e,c,s,n,null)}return;case"dialog":We("beforetoggle",t),We("toggle",t),We("cancel",t),We("close",t);break;case"iframe":case"object":We("load",t);break;case"video":case"audio":for(s=0;s<Kc.length;s++)We(Kc[s],t);break;case"image":We("error",t),We("load",t);break;case"details":We("toggle",t);break;case"embed":case"source":case"link":We("error",t),We("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(h in n)if(n.hasOwnProperty(h)&&(s=n[h],s!=null))switch(h){case"children":case"dangerouslySetInnerHTML":throw Error(G(137,e));default:Rt(t,e,h,s,n,null)}return;default:if(qp(e)){for(d in n)n.hasOwnProperty(d)&&(s=n[d],s!==void 0&&$0(t,e,d,s,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(s=n[l],s!=null&&Rt(t,e,l,s,n,null))}function qN(t,e,n,s){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,r=null,l=null,c=null,h=null,d=null;for(v in n){var p=n[v];if(n.hasOwnProperty(v)&&p!=null)switch(v){case"checked":break;case"value":break;case"defaultValue":c=p;default:s.hasOwnProperty(v)||Rt(t,e,v,null,s,p)}}for(var g in s){var v=s[g];if(p=n[g],s.hasOwnProperty(g)&&(v!=null||p!=null))switch(g){case"type":i=v;break;case"name":a=v;break;case"checked":h=v;break;case"defaultChecked":d=v;break;case"value":r=v;break;case"defaultValue":l=v;break;case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(G(137,e));break;default:v!==p&&Rt(t,e,g,v,s,p)}}d0(t,r,l,c,h,d,i,a);return;case"select":v=r=l=g=null;for(i in n)if(c=n[i],n.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":v=c;default:s.hasOwnProperty(i)||Rt(t,e,i,null,s,c)}for(a in s)if(i=s[a],c=n[a],s.hasOwnProperty(a)&&(i!=null||c!=null))switch(a){case"value":g=i;break;case"defaultValue":l=i;break;case"multiple":r=i;default:i!==c&&Rt(t,e,a,i,s,c)}e=l,n=r,s=v,g!=null?Yo(t,!!n,g,!1):!!s!=!!n&&(e!=null?Yo(t,!!n,e,!0):Yo(t,!!n,n?[]:"",!1));return;case"textarea":v=g=null;for(l in n)if(a=n[l],n.hasOwnProperty(l)&&a!=null&&!s.hasOwnProperty(l))switch(l){case"value":break;case"children":break;default:Rt(t,e,l,null,s,a)}for(r in s)if(a=s[r],i=n[r],s.hasOwnProperty(r)&&(a!=null||i!=null))switch(r){case"value":g=a;break;case"defaultValue":v=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(G(91));break;default:a!==i&&Rt(t,e,r,a,s,i)}t_(t,g,v);return;case"option":for(var C in n)if(g=n[C],n.hasOwnProperty(C)&&g!=null&&!s.hasOwnProperty(C))switch(C){case"selected":t.selected=!1;break;default:Rt(t,e,C,null,s,g)}for(c in s)if(g=s[c],v=n[c],s.hasOwnProperty(c)&&g!==v&&(g!=null||v!=null))switch(c){case"selected":t.selected=g&&typeof g!="function"&&typeof g!="symbol";break;default:Rt(t,e,c,g,s,v)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var I in n)g=n[I],n.hasOwnProperty(I)&&g!=null&&!s.hasOwnProperty(I)&&Rt(t,e,I,null,s,g);for(h in s)if(g=s[h],v=n[h],s.hasOwnProperty(h)&&g!==v&&(g!=null||v!=null))switch(h){case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(G(137,e));break;default:Rt(t,e,h,g,s,v)}return;default:if(qp(e)){for(var j in n)g=n[j],n.hasOwnProperty(j)&&g!==void 0&&!s.hasOwnProperty(j)&&$0(t,e,j,void 0,s,g);for(d in s)g=s[d],v=n[d],!s.hasOwnProperty(d)||g===v||g===void 0&&v===void 0||$0(t,e,d,g,s,v);return}}for(var _ in n)g=n[_],n.hasOwnProperty(_)&&g!=null&&!s.hasOwnProperty(_)&&Rt(t,e,_,null,s,g);for(p in s)g=s[p],v=n[p],!s.hasOwnProperty(p)||g===v||g==null&&v==null||Rt(t,e,p,g,s,v)}function Gv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function GN(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),s=0;s<n.length;s++){var a=n[s],i=a.transferSize,r=a.initiatorType,l=a.duration;if(i&&l&&Gv(r)){for(r=0,l=a.responseEnd,s+=1;s<n.length;s++){var c=n[s],h=c.startTime;if(h>l)break;var d=c.transferSize,p=c.initiatorType;d&&Gv(p)&&(c=c.responseEnd,r+=d*(c<l?1:(l-h)/(c-h)))}if(--s,e+=8*(i+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var F0=null,H0=null;function xf(t){return t.nodeType===9?t:t.ownerDocument}function Yv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function o2(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function q0(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Rm=null;function YN(){var t=window.event;return t&&t.type==="popstate"?t===Rm?!1:(Rm=t,!0):(Rm=null,!1)}var l2=typeof setTimeout=="function"?setTimeout:void 0,KN=typeof clearTimeout=="function"?clearTimeout:void 0,Kv=typeof Promise=="function"?Promise:void 0,QN=typeof queueMicrotask=="function"?queueMicrotask:typeof Kv<"u"?function(t){return Kv.resolve(null).then(t).catch(XN)}:l2;function XN(t){setTimeout(function(){throw t})}function vr(t){return t==="head"}function Qv(t,e){var n=e,s=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(s===0){t.removeChild(a),ml(e);return}s--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")s++;else if(n==="html")Rc(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Rc(n);for(var i=n.firstChild;i;){var r=i.nextSibling,l=i.nodeName;i[du]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=r}}else n==="body"&&Rc(t.ownerDocument.body);n=a}while(n);ml(e)}function Xv(t,e){var n=t;t=0;do{var s=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=s}while(n)}function G0(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":G0(n),Hp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function WN(t,e,n,s){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[du])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Js(t.nextSibling),t===null)break}return null}function JN(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Js(t.nextSibling),t===null))return null;return t}function c2(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Js(t.nextSibling),t===null))return null;return t}function Y0(t){return t.data==="$?"||t.data==="$~"}function K0(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function ZN(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var s=function(){e(),n.removeEventListener("DOMContentLoaded",s)};n.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function Js(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Q0=null;function Wv(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Js(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Jv(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function u2(t,e,n){switch(e=xf(n),t){case"html":if(t=e.documentElement,!t)throw Error(G(452));return t;case"head":if(t=e.head,!t)throw Error(G(453));return t;case"body":if(t=e.body,!t)throw Error(G(454));return t;default:throw Error(G(451))}}function Rc(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Hp(t)}var ea=new Map,Zv=new Set;function _f(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var xi=gt.d;gt.d={f:e5,r:t5,D:n5,C:s5,L:a5,m:i5,X:o5,S:r5,M:l5};function e5(){var t=xi.f(),e=hd();return t||e}function t5(t){var e=Al(t);e!==null&&e.tag===5&&e.type==="form"?sT(e):xi.r(t)}var Cl=typeof document>"u"?null:document;function h2(t,e,n){var s=Cl;if(s&&typeof e=="string"&&e){var a=Ys(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),Zv.has(a)||(Zv.add(a),t={rel:t,crossOrigin:n,href:e},s.querySelector(a)===null&&(e=s.createElement("link"),Xn(e,"link",t),Ln(e),s.head.appendChild(e)))}}function n5(t){xi.D(t),h2("dns-prefetch",t,null)}function s5(t,e){xi.C(t,e),h2("preconnect",t,e)}function a5(t,e,n){xi.L(t,e,n);var s=Cl;if(s&&t&&e){var a='link[rel="preload"][as="'+Ys(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Ys(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Ys(n.imageSizes)+'"]')):a+='[href="'+Ys(t)+'"]';var i=a;switch(e){case"style":i=dl(t);break;case"script":i=Il(t)}ea.has(i)||(t=qt({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),ea.set(i,t),s.querySelector(a)!==null||e==="style"&&s.querySelector(bu(i))||e==="script"&&s.querySelector(xu(i))||(e=s.createElement("link"),Xn(e,"link",t),Ln(e),s.head.appendChild(e)))}}function i5(t,e){xi.m(t,e);var n=Cl;if(n&&t){var s=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Ys(s)+'"][href="'+Ys(t)+'"]',i=a;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Il(t)}if(!ea.has(i)&&(t=qt({rel:"modulepreload",href:t},e),ea.set(i,t),n.querySelector(a)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(xu(i)))return}s=n.createElement("link"),Xn(s,"link",t),Ln(s),n.head.appendChild(s)}}}function r5(t,e,n){xi.S(t,e,n);var s=Cl;if(s&&t){var a=Go(s).hoistableStyles,i=dl(t);e=e||"default";var r=a.get(i);if(!r){var l={loading:0,preload:null};if(r=s.querySelector(bu(i)))l.loading=5;else{t=qt({rel:"stylesheet",href:t,"data-precedence":e},n),(n=ea.get(i))&&kg(t,n);var c=r=s.createElement("link");Ln(c),Xn(c,"link",t),c._p=new Promise(function(h,d){c.onload=h,c.onerror=d}),c.addEventListener("load",function(){l.loading|=1}),c.addEventListener("error",function(){l.loading|=2}),l.loading|=4,Mh(r,e,s)}r={type:"stylesheet",instance:r,count:1,state:l},a.set(i,r)}}}function o5(t,e){xi.X(t,e);var n=Cl;if(n&&t){var s=Go(n).hoistableScripts,a=Il(t),i=s.get(a);i||(i=n.querySelector(xu(a)),i||(t=qt({src:t,async:!0},e),(e=ea.get(a))&&Cg(t,e),i=n.createElement("script"),Ln(i),Xn(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},s.set(a,i))}}function l5(t,e){xi.M(t,e);var n=Cl;if(n&&t){var s=Go(n).hoistableScripts,a=Il(t),i=s.get(a);i||(i=n.querySelector(xu(a)),i||(t=qt({src:t,async:!0,type:"module"},e),(e=ea.get(a))&&Cg(t,e),i=n.createElement("script"),Ln(i),Xn(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},s.set(a,i))}}function e1(t,e,n,s){var a=(a=Hi.current)?_f(a):null;if(!a)throw Error(G(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=dl(n.href),n=Go(a).hoistableStyles,s=n.get(e),s||(s={type:"style",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=dl(n.href);var i=Go(a).hoistableStyles,r=i.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,r),(i=a.querySelector(bu(t)))&&!i._p&&(r.instance=i,r.state.loading=5),ea.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ea.set(t,n),i||c5(a,t,n,r.state))),e&&s===null)throw Error(G(528,""));return r}if(e&&s!==null)throw Error(G(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Il(n),n=Go(a).hoistableScripts,s=n.get(e),s||(s={type:"script",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(G(444,t))}}function dl(t){return'href="'+Ys(t)+'"'}function bu(t){return'link[rel="stylesheet"]['+t+"]"}function f2(t){return qt({},t,{"data-precedence":t.precedence,precedence:null})}function c5(t,e,n,s){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?s.loading=1:(e=t.createElement("link"),s.preload=e,e.addEventListener("load",function(){return s.loading|=1}),e.addEventListener("error",function(){return s.loading|=2}),Xn(e,"link",n),Ln(e),t.head.appendChild(e))}function Il(t){return'[src="'+Ys(t)+'"]'}function xu(t){return"script[async]"+t}function t1(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var s=t.querySelector('style[data-href~="'+Ys(n.href)+'"]');if(s)return e.instance=s,Ln(s),s;var a=qt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),Ln(s),Xn(s,"style",a),Mh(s,n.precedence,t),e.instance=s;case"stylesheet":a=dl(n.href);var i=t.querySelector(bu(a));if(i)return e.state.loading|=4,e.instance=i,Ln(i),i;s=f2(n),(a=ea.get(a))&&kg(s,a),i=(t.ownerDocument||t).createElement("link"),Ln(i);var r=i;return r._p=new Promise(function(l,c){r.onload=l,r.onerror=c}),Xn(i,"link",s),e.state.loading|=4,Mh(i,n.precedence,t),e.instance=i;case"script":return i=Il(n.src),(a=t.querySelector(xu(i)))?(e.instance=a,Ln(a),a):(s=n,(a=ea.get(i))&&(s=qt({},n),Cg(s,a)),t=t.ownerDocument||t,a=t.createElement("script"),Ln(a),Xn(a,"link",s),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(G(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(s=e.instance,e.state.loading|=4,Mh(s,n.precedence,t));return e.instance}function Mh(t,e,n){for(var s=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=s.length?s[s.length-1]:null,i=a,r=0;r<s.length;r++){var l=s[r];if(l.dataset.precedence===e)i=l;else if(i!==a)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function kg(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Cg(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Dh=null;function n1(t,e,n){if(Dh===null){var s=new Map,a=Dh=new Map;a.set(n,s)}else a=Dh,s=a.get(n),s||(s=new Map,a.set(n,s));if(s.has(t))return s;for(s.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var i=n[a];if(!(i[du]||i[Gn]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var r=i.getAttribute(e)||"";r=t+r;var l=s.get(r);l?l.push(i):s.set(r,[i])}}return s}function s1(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function u5(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function d2(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function h5(t,e,n,s){if(n.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=dl(s.href),i=e.querySelector(bu(a));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Tf.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Ln(i);return}i=e.ownerDocument||e,s=f2(s),(a=ea.get(a))&&kg(s,a),i=i.createElement("link"),Ln(i);var r=i;r._p=new Promise(function(l,c){r.onload=l,r.onerror=c}),Xn(i,"link",s),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Tf.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var km=0;function f5(t,e){return t.stylesheets&&t.count===0&&Oh(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var s=setTimeout(function(){if(t.stylesheets&&Oh(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&km===0&&(km=62500*GN());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Oh(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>km?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(a)}}:null}function Tf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Oh(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Ef=null;function Oh(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Ef=new Map,e.forEach(d5,t),Ef=null,Tf.call(t))}function d5(t,e){if(!(e.state.loading&4)){var n=Ef.get(t);if(n)var s=n.get(null);else{n=new Map,Ef.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var r=a[i];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),s=r)}s&&n.set(null,s)}a=e.instance,r=a.getAttribute("data-precedence"),i=n.get(r)||s,i===s&&n.set(null,a),n.set(r,a),this.count++,s=Tf.bind(this),a.addEventListener("load",s),a.addEventListener("error",s),i?i.parentNode.insertBefore(a,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Xc={$$typeof:Ja,Provider:null,Consumer:null,_currentValue:zr,_currentValue2:zr,_threadCount:0};function m5(t,e,n,s,a,i,r,l,c){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Jd(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jd(0),this.hiddenUpdates=Jd(null),this.identifierPrefix=s,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function m2(t,e,n,s,a,i,r,l,c,h,d,p){return t=new m5(t,e,n,r,c,h,d,p,l),e=1,i===!0&&(e|=24),i=Ds(3,null,null,e),t.current=i,i.stateNode=t,e=ng(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:s,isDehydrated:n,cache:e},ig(i),t}function p2(t){return t?(t=Uo,t):Uo}function g2(t,e,n,s,a,i){a=p2(a),s.context===null?s.context=a:s.pendingContext=a,s=Gi(e),s.payload={element:n},i=i===void 0?null:i,i!==null&&(s.callback=i),n=Yi(t,s,e),n!==null&&(As(n,t,e),xc(n,t,e))}function a1(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Ig(t,e){a1(t,e),(t=t.alternate)&&a1(t,e)}function y2(t){if(t.tag===13||t.tag===31){var e=ro(t,67108864);e!==null&&As(e,t,67108864),Ig(t,67108864)}}function i1(t){if(t.tag===13||t.tag===31){var e=Us();e=$p(e);var n=ro(t,e);n!==null&&As(n,t,e),Ig(t,e)}}var wf=!0;function p5(t,e,n,s){var a=Ce.T;Ce.T=null;var i=gt.p;try{gt.p=2,Mg(t,e,n,s)}finally{gt.p=i,Ce.T=a}}function g5(t,e,n,s){var a=Ce.T;Ce.T=null;var i=gt.p;try{gt.p=8,Mg(t,e,n,s)}finally{gt.p=i,Ce.T=a}}function Mg(t,e,n,s){if(wf){var a=X0(s);if(a===null)Nm(t,e,s,Sf,n),r1(t,s);else if(v5(a,t,e,n,s))s.stopPropagation();else if(r1(t,s),e&4&&-1<y5.indexOf(t)){for(;a!==null;){var i=Al(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var r=Mr(i.pendingLanes);if(r!==0){var l=i;for(l.pendingLanes|=2,l.entangledLanes|=2;r;){var c=1<<31-Ls(r);l.entanglements[1]|=c,r&=~c}La(i),!(pt&6)&&(mf=Ps()+500,vu(0,!1))}}break;case 31:case 13:l=ro(i,2),l!==null&&As(l,i,2),hd(),Ig(i,2)}if(i=X0(s),i===null&&Nm(t,e,s,Sf,n),i===a)break;a=i}a!==null&&s.stopPropagation()}else Nm(t,e,s,null,n)}}function X0(t){return t=Gp(t),Dg(t)}var Sf=null;function Dg(t){if(Sf=null,t=Do(t),t!==null){var e=cu(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=Vx(e),t!==null)return t;t=null}else if(n===31){if(t=Lx(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Sf=t,null}function v2(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(nA()){case $x:return 2;case Fx:return 8;case Zh:case sA:return 32;case Hx:return 268435456;default:return 32}default:return 32}}var W0=!1,Xi=null,Wi=null,Ji=null,Wc=new Map,Jc=new Map,Mi=[],y5="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function r1(t,e){switch(t){case"focusin":case"focusout":Xi=null;break;case"dragenter":case"dragleave":Wi=null;break;case"mouseover":case"mouseout":Ji=null;break;case"pointerover":case"pointerout":Wc.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jc.delete(e.pointerId)}}function ec(t,e,n,s,a,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:s,nativeEvent:i,targetContainers:[a]},e!==null&&(e=Al(e),e!==null&&y2(e)),t):(t.eventSystemFlags|=s,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function v5(t,e,n,s,a){switch(e){case"focusin":return Xi=ec(Xi,t,e,n,s,a),!0;case"dragenter":return Wi=ec(Wi,t,e,n,s,a),!0;case"mouseover":return Ji=ec(Ji,t,e,n,s,a),!0;case"pointerover":var i=a.pointerId;return Wc.set(i,ec(Wc.get(i)||null,t,e,n,s,a)),!0;case"gotpointercapture":return i=a.pointerId,Jc.set(i,ec(Jc.get(i)||null,t,e,n,s,a)),!0}return!1}function b2(t){var e=Do(t.target);if(e!==null){var n=cu(e);if(n!==null){if(e=n.tag,e===13){if(e=Vx(n),e!==null){t.blockedOn=e,Hy(t.priority,function(){i1(n)});return}}else if(e===31){if(e=Lx(n),e!==null){t.blockedOn=e,Hy(t.priority,function(){i1(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function jh(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=X0(t.nativeEvent);if(n===null){n=t.nativeEvent;var s=new n.constructor(n.type,n);p0=s,n.target.dispatchEvent(s),p0=null}else return e=Al(n),e!==null&&y2(e),t.blockedOn=n,!1;e.shift()}return!0}function o1(t,e,n){jh(t)&&n.delete(e)}function b5(){W0=!1,Xi!==null&&jh(Xi)&&(Xi=null),Wi!==null&&jh(Wi)&&(Wi=null),Ji!==null&&jh(Ji)&&(Ji=null),Wc.forEach(o1),Jc.forEach(o1)}function oh(t,e){t.blockedOn===e&&(t.blockedOn=null,W0||(W0=!0,Mn.unstable_scheduleCallback(Mn.unstable_NormalPriority,b5)))}var lh=null;function l1(t){lh!==t&&(lh=t,Mn.unstable_scheduleCallback(Mn.unstable_NormalPriority,function(){lh===t&&(lh=null);for(var e=0;e<t.length;e+=3){var n=t[e],s=t[e+1],a=t[e+2];if(typeof s!="function"){if(Dg(s||n)===null)continue;break}var i=Al(n);i!==null&&(t.splice(e,3),e-=3,I0(i,{pending:!0,data:a,method:n.method,action:s},s,a))}}))}function ml(t){function e(c){return oh(c,t)}Xi!==null&&oh(Xi,t),Wi!==null&&oh(Wi,t),Ji!==null&&oh(Ji,t),Wc.forEach(e),Jc.forEach(e);for(var n=0;n<Mi.length;n++){var s=Mi[n];s.blockedOn===t&&(s.blockedOn=null)}for(;0<Mi.length&&(n=Mi[0],n.blockedOn===null);)b2(n),n.blockedOn===null&&Mi.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(s=0;s<n.length;s+=3){var a=n[s],i=n[s+1],r=a[Ns]||null;if(typeof i=="function")r||l1(n);else if(r){var l=null;if(i&&i.hasAttribute("formAction")){if(a=i,r=i[Ns]||null)l=r.formAction;else if(Dg(a)!==null)continue}else l=r.action;typeof l=="function"?n[s+1]=l:(n.splice(s,3),s-=3),l1(n)}}}function x2(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),s||setTimeout(n,20)}function n(){if(!s&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Og(t){this._internalRoot=t}md.prototype.render=Og.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(G(409));var n=e.current,s=Us();g2(n,s,t,e,null,null)};md.prototype.unmount=Og.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;g2(t.current,2,null,t,null,null),hd(),e[Sl]=null}};function md(t){this._internalRoot=t}md.prototype.unstable_scheduleHydration=function(t){if(t){var e=Qx();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Mi.length&&e!==0&&e<Mi[n].priority;n++);Mi.splice(n,0,t),n===0&&b2(t)}};var c1=jx.version;if(c1!=="19.2.5")throw Error(G(527,c1,"19.2.5"));gt.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(G(188)):(t=Object.keys(t).join(","),Error(G(268,t)));return t=QS(e),t=t!==null?Ux(t):null,t=t===null?null:t.stateNode,t};var x5={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:Ce,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ch=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ch.isDisabled&&ch.supportsFiber)try{uu=ch.inject(x5),Vs=ch}catch{}}Wf.createRoot=function(t,e){if(!Px(t))throw Error(G(299));var n=!1,s="",a=hT,i=fT,r=dT;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=m2(t,1,!1,null,null,n,s,null,a,i,r,x2),t[Sl]=e.current,Rg(t),new Og(e)};Wf.hydrateRoot=function(t,e,n){if(!Px(t))throw Error(G(299));var s=!1,a="",i=hT,r=fT,l=dT,c=null;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(l=n.onRecoverableError),n.formState!==void 0&&(c=n.formState)),e=m2(t,1,!0,e,n??null,s,a,c,i,r,l,x2),e.context=p2(null),n=e.current,s=Us(),s=$p(s),a=Gi(s),a.callback=null,Yi(n,a,s),n=s,e.current.lanes=n,fu(e,n),La(e),t[Sl]=e.current,Rg(t),new md(e)};Wf.version="19.2.5";function _2(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_2)}catch(t){console.error(t)}}_2(),kx.exports=Wf;var _5=kx.exports;const T5=bx(_5),E5=()=>{};/**
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
 */const T2=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let a=t.charCodeAt(s);a<128?e[n++]=a:a<2048?(e[n++]=a>>6|192,e[n++]=a&63|128):(a&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(a=65536+((a&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=a>>18|240,e[n++]=a>>12&63|128,e[n++]=a>>6&63|128,e[n++]=a&63|128):(e[n++]=a>>12|224,e[n++]=a>>6&63|128,e[n++]=a&63|128)}return e},w5=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const a=t[n++];if(a<128)e[s++]=String.fromCharCode(a);else if(a>191&&a<224){const i=t[n++];e[s++]=String.fromCharCode((a&31)<<6|i&63)}else if(a>239&&a<365){const i=t[n++],r=t[n++],l=t[n++],c=((a&7)<<18|(i&63)<<12|(r&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],r=t[n++];e[s++]=String.fromCharCode((a&15)<<12|(i&63)<<6|r&63)}}return e.join("")},jg={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let a=0;a<t.length;a+=3){const i=t[a],r=a+1<t.length,l=r?t[a+1]:0,c=a+2<t.length,h=c?t[a+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let g=(l&15)<<2|h>>6,v=h&63;c||(v=64,r||(g=64)),s.push(n[d],n[p],n[g],n[v])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(T2(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):w5(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let a=0;a<t.length;){const i=n[t.charAt(a++)],l=a<t.length?n[t.charAt(a)]:0;++a;const h=a<t.length?n[t.charAt(a)]:64;++a;const p=a<t.length?n[t.charAt(a)]:64;if(++a,i==null||l==null||h==null||p==null)throw new S5;const g=i<<2|l>>4;if(s.push(g),h!==64){const v=l<<4&240|h>>2;if(s.push(v),p!==64){const C=h<<6&192|p;s.push(C)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class S5 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const A5=function(t){const e=T2(t);return jg.encodeByteArray(e,!0)},Af=function(t){return A5(t).replace(/\./g,"")},E2=function(t){try{return jg.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function w2(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const N5=()=>w2().__FIREBASE_DEFAULTS__,R5=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},k5=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&E2(t[1]);return e&&JSON.parse(e)},pd=()=>{try{return E5()||N5()||R5()||k5()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},S2=t=>{var e,n;return(n=(e=pd())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},C5=t=>{const e=S2(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},A2=()=>{var t;return(t=pd())==null?void 0:t.config},N2=t=>{var e;return(e=pd())==null?void 0:e[`_${t}`]};/**
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
 */class Zc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function I5(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",a=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r={iss:`https://securetoken.google.com/${s}`,aud:s,iat:a,exp:a+3600,auth_time:a,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t},l="";return[Af(JSON.stringify(n)),Af(JSON.stringify(r)),l].join(".")}/**
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
 */function rs(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function M5(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(rs())}function D5(){var e;const t=(e=pd())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function O5(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function j5(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function P5(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function V5(){const t=rs();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function L5(){return!D5()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Pg(){try{return typeof indexedDB=="object"}catch{return!1}}function U5(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(s);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var i;e(((i=a.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}/**
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
 */const z5="FirebaseError";class _i extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=z5,Object.setPrototypeOf(this,_i.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ml.prototype.create)}}class Ml{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},a=`${this.service}/${e}`,i=this.errors[e],r=i?B5(i,s):"Error",l=`${this.serviceName}: ${r} (${a}).`;return new _i(a,l,s)}}function B5(t,e){return t.replace($5,(n,s)=>{const a=e[s];return a!=null?String(a):`<${s}?>`})}const $5=/\{\$([^}]+)}/g;function F5(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function lr(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const a of n){if(!s.includes(a))return!1;const i=t[a],r=e[a];if(u1(i)&&u1(r)){if(!lr(i,r))return!1}else if(i!==r)return!1}for(const a of s)if(!n.includes(a))return!1;return!0}function u1(t){return t!==null&&typeof t=="object"}/**
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
 */function _u(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(a=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(a))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function H5(t,e){const n=new q5(t,e);return n.subscribe.bind(n)}class q5{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let a;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");G5(e,["next","error","complete"])?a=e:a={next:e,error:n,complete:s},a.next===void 0&&(a.next=Cm),a.error===void 0&&(a.error=Cm),a.complete===void 0&&(a.complete=Cm);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function G5(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Cm(){}/**
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
 */const Y5=1e3,K5=2,Q5=4*60*60*1e3,X5=.5;function W5(t,e=Y5,n=K5){const s=e*Math.pow(n,t),a=Math.round(X5*s*(Math.random()-.5)*2);return Math.min(Q5,s+a)}/**
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
 */function zn(t){return t&&t._delegate?t._delegate:t}/**
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
 */function Tu(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function R2(t){return(await fetch(t,{credentials:"include"})).ok}class mi{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const jr="[DEFAULT]";/**
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
 */class J5{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Zc;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:n});a&&s.resolve(a)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(eR(e))try{this.getOrInitializeService({instanceIdentifier:jr})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:a});s.resolve(i)}catch{}}}}clearInstance(e=jr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=jr){return this.instances.has(e)}getOptions(e=jr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,r]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);s===l&&r.resolve(a)}return a}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),a=this.onInitCallbacks.get(s)??new Set;a.add(e),this.onInitCallbacks.set(s,a);const i=this.instances.get(s);return i&&e(i,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const a of s)try{a(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Z5(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=jr){return this.component?this.component.multipleInstances?e:jr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Z5(t){return t===jr?void 0:t}function eR(t){return t.instantiationMode==="EAGER"}/**
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
 */class tR{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new J5(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var tt;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(tt||(tt={}));const nR={debug:tt.DEBUG,verbose:tt.VERBOSE,info:tt.INFO,warn:tt.WARN,error:tt.ERROR,silent:tt.SILENT},sR=tt.INFO,aR={[tt.DEBUG]:"log",[tt.VERBOSE]:"log",[tt.INFO]:"info",[tt.WARN]:"warn",[tt.ERROR]:"error"},iR=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),a=aR[e];if(a)console[a](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class gd{constructor(e){this.name=e,this._logLevel=sR,this._logHandler=iR,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in tt))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?nR[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,tt.DEBUG,...e),this._logHandler(this,tt.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,tt.VERBOSE,...e),this._logHandler(this,tt.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,tt.INFO,...e),this._logHandler(this,tt.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,tt.WARN,...e),this._logHandler(this,tt.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,tt.ERROR,...e),this._logHandler(this,tt.ERROR,...e)}}const rR=(t,e)=>e.some(n=>t instanceof n);let h1,f1;function oR(){return h1||(h1=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function lR(){return f1||(f1=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const k2=new WeakMap,J0=new WeakMap,C2=new WeakMap,Im=new WeakMap,Vg=new WeakMap;function cR(t){const e=new Promise((n,s)=>{const a=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{n(Zi(t.result)),a()},r=()=>{s(t.error),a()};t.addEventListener("success",i),t.addEventListener("error",r)});return e.then(n=>{n instanceof IDBCursor&&k2.set(n,t)}).catch(()=>{}),Vg.set(e,t),e}function uR(t){if(J0.has(t))return;const e=new Promise((n,s)=>{const a=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{n(),a()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),a()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)});J0.set(t,e)}let Z0={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return J0.get(t);if(e==="objectStoreNames")return t.objectStoreNames||C2.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Zi(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function hR(t){Z0=t(Z0)}function fR(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Mm(this),e,...n);return C2.set(s,e.sort?e.sort():[e]),Zi(s)}:lR().includes(t)?function(...e){return t.apply(Mm(this),e),Zi(k2.get(this))}:function(...e){return Zi(t.apply(Mm(this),e))}}function dR(t){return typeof t=="function"?fR(t):(t instanceof IDBTransaction&&uR(t),rR(t,oR())?new Proxy(t,Z0):t)}function Zi(t){if(t instanceof IDBRequest)return cR(t);if(Im.has(t))return Im.get(t);const e=dR(t);return e!==t&&(Im.set(t,e),Vg.set(e,t)),e}const Mm=t=>Vg.get(t);function mR(t,e,{blocked:n,upgrade:s,blocking:a,terminated:i}={}){const r=indexedDB.open(t,e),l=Zi(r);return s&&r.addEventListener("upgradeneeded",c=>{s(Zi(r.result),c.oldVersion,c.newVersion,Zi(r.transaction),c)}),n&&r.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),a&&c.addEventListener("versionchange",h=>a(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const pR=["get","getKey","getAll","getAllKeys","count"],gR=["put","add","delete","clear"],Dm=new Map;function d1(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Dm.get(e))return Dm.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,a=gR.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(a||pR.includes(n)))return;const i=async function(r,...l){const c=this.transaction(r,a?"readwrite":"readonly");let h=c.store;return s&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),a&&c.done]))[0]};return Dm.set(e,i),i}hR(t=>({...t,get:(e,n,s)=>d1(e,n)||t.get(e,n,s),has:(e,n)=>!!d1(e,n)||t.has(e,n)}));/**
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
 */class yR{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(vR(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function vR(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ep="@firebase/app",m1="0.14.11";/**
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
 */const pi=new gd("@firebase/app"),bR="@firebase/app-compat",xR="@firebase/analytics-compat",_R="@firebase/analytics",TR="@firebase/app-check-compat",ER="@firebase/app-check",wR="@firebase/auth",SR="@firebase/auth-compat",AR="@firebase/database",NR="@firebase/data-connect",RR="@firebase/database-compat",kR="@firebase/functions",CR="@firebase/functions-compat",IR="@firebase/installations",MR="@firebase/installations-compat",DR="@firebase/messaging",OR="@firebase/messaging-compat",jR="@firebase/performance",PR="@firebase/performance-compat",VR="@firebase/remote-config",LR="@firebase/remote-config-compat",UR="@firebase/storage",zR="@firebase/storage-compat",BR="@firebase/firestore",$R="@firebase/ai",FR="@firebase/firestore-compat",HR="firebase",qR="12.12.0";/**
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
 */const tp="[DEFAULT]",GR={[ep]:"fire-core",[bR]:"fire-core-compat",[_R]:"fire-analytics",[xR]:"fire-analytics-compat",[ER]:"fire-app-check",[TR]:"fire-app-check-compat",[wR]:"fire-auth",[SR]:"fire-auth-compat",[AR]:"fire-rtdb",[NR]:"fire-data-connect",[RR]:"fire-rtdb-compat",[kR]:"fire-fn",[CR]:"fire-fn-compat",[IR]:"fire-iid",[MR]:"fire-iid-compat",[DR]:"fire-fcm",[OR]:"fire-fcm-compat",[jR]:"fire-perf",[PR]:"fire-perf-compat",[VR]:"fire-rc",[LR]:"fire-rc-compat",[UR]:"fire-gcs",[zR]:"fire-gcs-compat",[BR]:"fire-fst",[FR]:"fire-fst-compat",[$R]:"fire-vertex","fire-js":"fire-js",[HR]:"fire-js-all"};/**
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
 */const Nf=new Map,YR=new Map,np=new Map;function p1(t,e){try{t.container.addComponent(e)}catch(n){pi.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function cr(t){const e=t.name;if(np.has(e))return pi.debug(`There were multiple attempts to register component ${e}.`),!1;np.set(e,t);for(const n of Nf.values())p1(n,t);for(const n of YR.values())p1(n,t);return!0}function Eu(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ha(t){return t==null?!1:t.settings!==void 0}/**
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
 */const KR={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},er=new Ml("app","Firebase",KR);/**
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
 */class QR{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new mi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw er.create("app-deleted",{appName:this._name})}}/**
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
 */const Dl=qR;function I2(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:tp,automaticDataCollectionEnabled:!0,...e},a=s.name;if(typeof a!="string"||!a)throw er.create("bad-app-name",{appName:String(a)});if(n||(n=A2()),!n)throw er.create("no-options");const i=Nf.get(a);if(i){if(lr(n,i.options)&&lr(s,i.config))return i;throw er.create("duplicate-app",{appName:a})}const r=new tR(a);for(const c of np.values())r.addComponent(c);const l=new QR(n,s,r);return Nf.set(a,l),l}function Lg(t=tp){const e=Nf.get(t);if(!e&&t===tp&&A2())return I2();if(!e)throw er.create("no-app",{appName:t});return e}function ri(t,e,n){let s=GR[t]??t;n&&(s+=`-${n}`);const a=s.match(/\s|\//),i=e.match(/\s|\//);if(a||i){const r=[`Unable to register library "${s}" with version "${e}":`];a&&r.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&i&&r.push("and"),i&&r.push(`version name "${e}" contains illegal characters (whitespace or "/")`),pi.warn(r.join(" "));return}cr(new mi(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const XR="firebase-heartbeat-database",WR=1,eu="firebase-heartbeat-store";let Om=null;function M2(){return Om||(Om=mR(XR,WR,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(eu)}catch(n){console.warn(n)}}}}).catch(t=>{throw er.create("idb-open",{originalErrorMessage:t.message})})),Om}async function JR(t){try{const n=(await M2()).transaction(eu),s=await n.objectStore(eu).get(D2(t));return await n.done,s}catch(e){if(e instanceof _i)pi.warn(e.message);else{const n=er.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});pi.warn(n.message)}}}async function g1(t,e){try{const s=(await M2()).transaction(eu,"readwrite");await s.objectStore(eu).put(e,D2(t)),await s.done}catch(n){if(n instanceof _i)pi.warn(n.message);else{const s=er.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});pi.warn(s.message)}}}function D2(t){return`${t.name}!${t.options.appId}`}/**
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
 */const ZR=1024,ek=30;class tk{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new sk(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=y1();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(r=>r.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:a}),this._heartbeatsCache.heartbeats.length>ek){const r=ak(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){pi.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=y1(),{heartbeatsToSend:s,unsentEntries:a}=nk(this._heartbeatsCache.heartbeats),i=Af(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return pi.warn(n),""}}}function y1(){return new Date().toISOString().substring(0,10)}function nk(t,e=ZR){const n=[];let s=t.slice();for(const a of t){const i=n.find(r=>r.agent===a.agent);if(i){if(i.dates.push(a.date),v1(n)>e){i.dates.pop();break}}else if(n.push({agent:a.agent,dates:[a.date]}),v1(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class sk{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pg()?U5().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await JR(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return g1(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return g1(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function v1(t){return Af(JSON.stringify({version:2,heartbeats:t})).length}function ak(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
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
 */function ik(t){cr(new mi("platform-logger",e=>new yR(e),"PRIVATE")),cr(new mi("heartbeat",e=>new tk(e),"PRIVATE")),ri(ep,m1,t),ri(ep,m1,"esm2020"),ri("fire-js","")}ik("");var rk="firebase",ok="12.12.1";/**
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
 */ri(rk,ok,"app");var b1=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var tr,O2;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,x){function E(){}E.prototype=x.prototype,T.F=x.prototype,T.prototype=new E,T.prototype.constructor=T,T.D=function(A,k,M){for(var w=Array(arguments.length-2),te=2;te<arguments.length;te++)w[te-2]=arguments[te];return x.prototype[k].apply(A,w)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,n),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function a(T,x,E){E||(E=0);const A=Array(16);if(typeof x=="string")for(var k=0;k<16;++k)A[k]=x.charCodeAt(E++)|x.charCodeAt(E++)<<8|x.charCodeAt(E++)<<16|x.charCodeAt(E++)<<24;else for(k=0;k<16;++k)A[k]=x[E++]|x[E++]<<8|x[E++]<<16|x[E++]<<24;x=T.g[0],E=T.g[1],k=T.g[2];let M=T.g[3],w;w=x+(M^E&(k^M))+A[0]+3614090360&4294967295,x=E+(w<<7&4294967295|w>>>25),w=M+(k^x&(E^k))+A[1]+3905402710&4294967295,M=x+(w<<12&4294967295|w>>>20),w=k+(E^M&(x^E))+A[2]+606105819&4294967295,k=M+(w<<17&4294967295|w>>>15),w=E+(x^k&(M^x))+A[3]+3250441966&4294967295,E=k+(w<<22&4294967295|w>>>10),w=x+(M^E&(k^M))+A[4]+4118548399&4294967295,x=E+(w<<7&4294967295|w>>>25),w=M+(k^x&(E^k))+A[5]+1200080426&4294967295,M=x+(w<<12&4294967295|w>>>20),w=k+(E^M&(x^E))+A[6]+2821735955&4294967295,k=M+(w<<17&4294967295|w>>>15),w=E+(x^k&(M^x))+A[7]+4249261313&4294967295,E=k+(w<<22&4294967295|w>>>10),w=x+(M^E&(k^M))+A[8]+1770035416&4294967295,x=E+(w<<7&4294967295|w>>>25),w=M+(k^x&(E^k))+A[9]+2336552879&4294967295,M=x+(w<<12&4294967295|w>>>20),w=k+(E^M&(x^E))+A[10]+4294925233&4294967295,k=M+(w<<17&4294967295|w>>>15),w=E+(x^k&(M^x))+A[11]+2304563134&4294967295,E=k+(w<<22&4294967295|w>>>10),w=x+(M^E&(k^M))+A[12]+1804603682&4294967295,x=E+(w<<7&4294967295|w>>>25),w=M+(k^x&(E^k))+A[13]+4254626195&4294967295,M=x+(w<<12&4294967295|w>>>20),w=k+(E^M&(x^E))+A[14]+2792965006&4294967295,k=M+(w<<17&4294967295|w>>>15),w=E+(x^k&(M^x))+A[15]+1236535329&4294967295,E=k+(w<<22&4294967295|w>>>10),w=x+(k^M&(E^k))+A[1]+4129170786&4294967295,x=E+(w<<5&4294967295|w>>>27),w=M+(E^k&(x^E))+A[6]+3225465664&4294967295,M=x+(w<<9&4294967295|w>>>23),w=k+(x^E&(M^x))+A[11]+643717713&4294967295,k=M+(w<<14&4294967295|w>>>18),w=E+(M^x&(k^M))+A[0]+3921069994&4294967295,E=k+(w<<20&4294967295|w>>>12),w=x+(k^M&(E^k))+A[5]+3593408605&4294967295,x=E+(w<<5&4294967295|w>>>27),w=M+(E^k&(x^E))+A[10]+38016083&4294967295,M=x+(w<<9&4294967295|w>>>23),w=k+(x^E&(M^x))+A[15]+3634488961&4294967295,k=M+(w<<14&4294967295|w>>>18),w=E+(M^x&(k^M))+A[4]+3889429448&4294967295,E=k+(w<<20&4294967295|w>>>12),w=x+(k^M&(E^k))+A[9]+568446438&4294967295,x=E+(w<<5&4294967295|w>>>27),w=M+(E^k&(x^E))+A[14]+3275163606&4294967295,M=x+(w<<9&4294967295|w>>>23),w=k+(x^E&(M^x))+A[3]+4107603335&4294967295,k=M+(w<<14&4294967295|w>>>18),w=E+(M^x&(k^M))+A[8]+1163531501&4294967295,E=k+(w<<20&4294967295|w>>>12),w=x+(k^M&(E^k))+A[13]+2850285829&4294967295,x=E+(w<<5&4294967295|w>>>27),w=M+(E^k&(x^E))+A[2]+4243563512&4294967295,M=x+(w<<9&4294967295|w>>>23),w=k+(x^E&(M^x))+A[7]+1735328473&4294967295,k=M+(w<<14&4294967295|w>>>18),w=E+(M^x&(k^M))+A[12]+2368359562&4294967295,E=k+(w<<20&4294967295|w>>>12),w=x+(E^k^M)+A[5]+4294588738&4294967295,x=E+(w<<4&4294967295|w>>>28),w=M+(x^E^k)+A[8]+2272392833&4294967295,M=x+(w<<11&4294967295|w>>>21),w=k+(M^x^E)+A[11]+1839030562&4294967295,k=M+(w<<16&4294967295|w>>>16),w=E+(k^M^x)+A[14]+4259657740&4294967295,E=k+(w<<23&4294967295|w>>>9),w=x+(E^k^M)+A[1]+2763975236&4294967295,x=E+(w<<4&4294967295|w>>>28),w=M+(x^E^k)+A[4]+1272893353&4294967295,M=x+(w<<11&4294967295|w>>>21),w=k+(M^x^E)+A[7]+4139469664&4294967295,k=M+(w<<16&4294967295|w>>>16),w=E+(k^M^x)+A[10]+3200236656&4294967295,E=k+(w<<23&4294967295|w>>>9),w=x+(E^k^M)+A[13]+681279174&4294967295,x=E+(w<<4&4294967295|w>>>28),w=M+(x^E^k)+A[0]+3936430074&4294967295,M=x+(w<<11&4294967295|w>>>21),w=k+(M^x^E)+A[3]+3572445317&4294967295,k=M+(w<<16&4294967295|w>>>16),w=E+(k^M^x)+A[6]+76029189&4294967295,E=k+(w<<23&4294967295|w>>>9),w=x+(E^k^M)+A[9]+3654602809&4294967295,x=E+(w<<4&4294967295|w>>>28),w=M+(x^E^k)+A[12]+3873151461&4294967295,M=x+(w<<11&4294967295|w>>>21),w=k+(M^x^E)+A[15]+530742520&4294967295,k=M+(w<<16&4294967295|w>>>16),w=E+(k^M^x)+A[2]+3299628645&4294967295,E=k+(w<<23&4294967295|w>>>9),w=x+(k^(E|~M))+A[0]+4096336452&4294967295,x=E+(w<<6&4294967295|w>>>26),w=M+(E^(x|~k))+A[7]+1126891415&4294967295,M=x+(w<<10&4294967295|w>>>22),w=k+(x^(M|~E))+A[14]+2878612391&4294967295,k=M+(w<<15&4294967295|w>>>17),w=E+(M^(k|~x))+A[5]+4237533241&4294967295,E=k+(w<<21&4294967295|w>>>11),w=x+(k^(E|~M))+A[12]+1700485571&4294967295,x=E+(w<<6&4294967295|w>>>26),w=M+(E^(x|~k))+A[3]+2399980690&4294967295,M=x+(w<<10&4294967295|w>>>22),w=k+(x^(M|~E))+A[10]+4293915773&4294967295,k=M+(w<<15&4294967295|w>>>17),w=E+(M^(k|~x))+A[1]+2240044497&4294967295,E=k+(w<<21&4294967295|w>>>11),w=x+(k^(E|~M))+A[8]+1873313359&4294967295,x=E+(w<<6&4294967295|w>>>26),w=M+(E^(x|~k))+A[15]+4264355552&4294967295,M=x+(w<<10&4294967295|w>>>22),w=k+(x^(M|~E))+A[6]+2734768916&4294967295,k=M+(w<<15&4294967295|w>>>17),w=E+(M^(k|~x))+A[13]+1309151649&4294967295,E=k+(w<<21&4294967295|w>>>11),w=x+(k^(E|~M))+A[4]+4149444226&4294967295,x=E+(w<<6&4294967295|w>>>26),w=M+(E^(x|~k))+A[11]+3174756917&4294967295,M=x+(w<<10&4294967295|w>>>22),w=k+(x^(M|~E))+A[2]+718787259&4294967295,k=M+(w<<15&4294967295|w>>>17),w=E+(M^(k|~x))+A[9]+3951481745&4294967295,T.g[0]=T.g[0]+x&4294967295,T.g[1]=T.g[1]+(k+(w<<21&4294967295|w>>>11))&4294967295,T.g[2]=T.g[2]+k&4294967295,T.g[3]=T.g[3]+M&4294967295}s.prototype.v=function(T,x){x===void 0&&(x=T.length);const E=x-this.blockSize,A=this.C;let k=this.h,M=0;for(;M<x;){if(k==0)for(;M<=E;)a(this,T,M),M+=this.blockSize;if(typeof T=="string"){for(;M<x;)if(A[k++]=T.charCodeAt(M++),k==this.blockSize){a(this,A),k=0;break}}else for(;M<x;)if(A[k++]=T[M++],k==this.blockSize){a(this,A),k=0;break}}this.h=k,this.o+=x},s.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var x=1;x<T.length-8;++x)T[x]=0;x=this.o*8;for(var E=T.length-8;E<T.length;++E)T[E]=x&255,x/=256;for(this.v(T),T=Array(16),x=0,E=0;E<4;++E)for(let A=0;A<32;A+=8)T[x++]=this.g[E]>>>A&255;return T};function i(T,x){var E=l;return Object.prototype.hasOwnProperty.call(E,T)?E[T]:E[T]=x(T)}function r(T,x){this.h=x;const E=[];let A=!0;for(let k=T.length-1;k>=0;k--){const M=T[k]|0;A&&M==x||(E[k]=M,A=!1)}this.g=E}var l={};function c(T){return-128<=T&&T<128?i(T,function(x){return new r([x|0],x<0?-1:0)}):new r([T|0],T<0?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return p;if(T<0)return j(h(-T));const x=[];let E=1;for(let A=0;T>=E;A++)x[A]=T/E|0,E*=4294967296;return new r(x,0)}function d(T,x){if(T.length==0)throw Error("number format error: empty string");if(x=x||10,x<2||36<x)throw Error("radix out of range: "+x);if(T.charAt(0)=="-")return j(d(T.substring(1),x));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const E=h(Math.pow(x,8));let A=p;for(let M=0;M<T.length;M+=8){var k=Math.min(8,T.length-M);const w=parseInt(T.substring(M,M+k),x);k<8?(k=h(Math.pow(x,k)),A=A.j(k).add(h(w))):(A=A.j(E),A=A.add(h(w)))}return A}var p=c(0),g=c(1),v=c(16777216);t=r.prototype,t.m=function(){if(I(this))return-j(this).m();let T=0,x=1;for(let E=0;E<this.g.length;E++){const A=this.i(E);T+=(A>=0?A:4294967296+A)*x,x*=4294967296}return T},t.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(I(this))return"-"+j(this).toString(T);const x=h(Math.pow(T,6));var E=this;let A="";for(;;){const k=P(E,x).g;E=_(E,k.j(x));let M=((E.g.length>0?E.g[0]:E.h)>>>0).toString(T);if(E=k,C(E))return M+A;for(;M.length<6;)M="0"+M;A=M+A}},t.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(let x=0;x<T.g.length;x++)if(T.g[x]!=0)return!1;return!0}function I(T){return T.h==-1}t.l=function(T){return T=_(this,T),I(T)?-1:C(T)?0:1};function j(T){const x=T.g.length,E=[];for(let A=0;A<x;A++)E[A]=~T.g[A];return new r(E,~T.h).add(g)}t.abs=function(){return I(this)?j(this):this},t.add=function(T){const x=Math.max(this.g.length,T.g.length),E=[];let A=0;for(let k=0;k<=x;k++){let M=A+(this.i(k)&65535)+(T.i(k)&65535),w=(M>>>16)+(this.i(k)>>>16)+(T.i(k)>>>16);A=w>>>16,M&=65535,w&=65535,E[k]=w<<16|M}return new r(E,E[E.length-1]&-2147483648?-1:0)};function _(T,x){return T.add(j(x))}t.j=function(T){if(C(this)||C(T))return p;if(I(this))return I(T)?j(this).j(j(T)):j(j(this).j(T));if(I(T))return j(this.j(j(T)));if(this.l(v)<0&&T.l(v)<0)return h(this.m()*T.m());const x=this.g.length+T.g.length,E=[];for(var A=0;A<2*x;A++)E[A]=0;for(A=0;A<this.g.length;A++)for(let k=0;k<T.g.length;k++){const M=this.i(A)>>>16,w=this.i(A)&65535,te=T.i(k)>>>16,pe=T.i(k)&65535;E[2*A+2*k]+=w*pe,b(E,2*A+2*k),E[2*A+2*k+1]+=M*pe,b(E,2*A+2*k+1),E[2*A+2*k+1]+=w*te,b(E,2*A+2*k+1),E[2*A+2*k+2]+=M*te,b(E,2*A+2*k+2)}for(T=0;T<x;T++)E[T]=E[2*T+1]<<16|E[2*T];for(T=x;T<2*x;T++)E[T]=0;return new r(E,0)};function b(T,x){for(;(T[x]&65535)!=T[x];)T[x+1]+=T[x]>>>16,T[x]&=65535,x++}function N(T,x){this.g=T,this.h=x}function P(T,x){if(C(x))throw Error("division by zero");if(C(T))return new N(p,p);if(I(T))return x=P(j(T),x),new N(j(x.g),j(x.h));if(I(x))return x=P(T,j(x)),new N(j(x.g),x.h);if(T.g.length>30){if(I(T)||I(x))throw Error("slowDivide_ only works with positive integers.");for(var E=g,A=x;A.l(T)<=0;)E=$(E),A=$(A);var k=J(E,1),M=J(A,1);for(A=J(A,2),E=J(E,2);!C(A);){var w=M.add(A);w.l(T)<=0&&(k=k.add(E),M=w),A=J(A,1),E=J(E,1)}return x=_(T,k.j(x)),new N(k,x)}for(k=p;T.l(x)>=0;){for(E=Math.max(1,Math.floor(T.m()/x.m())),A=Math.ceil(Math.log(E)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),M=h(E),w=M.j(x);I(w)||w.l(T)>0;)E-=A,M=h(E),w=M.j(x);C(M)&&(M=g),k=k.add(M),T=_(T,w)}return new N(k,T)}t.B=function(T){return P(this,T).h},t.and=function(T){const x=Math.max(this.g.length,T.g.length),E=[];for(let A=0;A<x;A++)E[A]=this.i(A)&T.i(A);return new r(E,this.h&T.h)},t.or=function(T){const x=Math.max(this.g.length,T.g.length),E=[];for(let A=0;A<x;A++)E[A]=this.i(A)|T.i(A);return new r(E,this.h|T.h)},t.xor=function(T){const x=Math.max(this.g.length,T.g.length),E=[];for(let A=0;A<x;A++)E[A]=this.i(A)^T.i(A);return new r(E,this.h^T.h)};function $(T){const x=T.g.length+1,E=[];for(let A=0;A<x;A++)E[A]=T.i(A)<<1|T.i(A-1)>>>31;return new r(E,T.h)}function J(T,x){const E=x>>5;x%=32;const A=T.g.length-E,k=[];for(let M=0;M<A;M++)k[M]=x>0?T.i(M+E)>>>x|T.i(M+E+1)<<32-x:T.i(M+E);return new r(k,T.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,O2=s,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=h,r.fromString=d,tr=r}).apply(typeof b1<"u"?b1:typeof self<"u"?self:typeof window<"u"?window:{});var uh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var j2,cc,P2,Ph,sp,V2,L2,U2;(function(){var t,e=Object.defineProperty;function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof uh=="object"&&uh];for(var f=0;f<o.length;++f){var m=o[f];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var s=n(this);function a(o,f){if(f)e:{var m=s;o=o.split(".");for(var y=0;y<o.length-1;y++){var D=o[y];if(!(D in m))break e;m=m[D]}o=o[o.length-1],y=m[o],f=f(y),f!=y&&f!=null&&e(m,o,{configurable:!0,writable:!0,value:f})}}a("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),a("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),a("Object.entries",function(o){return o||function(f){var m=[],y;for(y in f)Object.prototype.hasOwnProperty.call(f,y)&&m.push([y,f[y]]);return m}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},r=this||self;function l(o){var f=typeof o;return f=="object"&&o!=null||f=="function"}function c(o,f,m){return o.call.apply(o.bind,arguments)}function h(o,f,m){return h=c,h.apply(null,arguments)}function d(o,f){var m=Array.prototype.slice.call(arguments,1);return function(){var y=m.slice();return y.push.apply(y,arguments),o.apply(this,y)}}function p(o,f){function m(){}m.prototype=f.prototype,o.Z=f.prototype,o.prototype=new m,o.prototype.constructor=o,o.Ob=function(y,D,V){for(var H=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)H[Q-2]=arguments[Q];return f.prototype[D].apply(y,H)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function v(o){const f=o.length;if(f>0){const m=Array(f);for(let y=0;y<f;y++)m[y]=o[y];return m}return[]}function C(o,f){for(let y=1;y<arguments.length;y++){const D=arguments[y];var m=typeof D;if(m=m!="object"?m:D?Array.isArray(D)?"array":m:"null",m=="array"||m=="object"&&typeof D.length=="number"){m=o.length||0;const V=D.length||0;o.length=m+V;for(let H=0;H<V;H++)o[m+H]=D[H]}else o.push(D)}}class I{constructor(f,m){this.i=f,this.j=m,this.h=0,this.g=null}get(){let f;return this.h>0?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function j(o){r.setTimeout(()=>{throw o},0)}function _(){var o=T;let f=null;return o.g&&(f=o.g,o.g=o.g.next,o.g||(o.h=null),f.next=null),f}class b{constructor(){this.h=this.g=null}add(f,m){const y=N.get();y.set(f,m),this.h?this.h.next=y:this.g=y,this.h=y}}var N=new I(()=>new P,o=>o.reset());class P{constructor(){this.next=this.g=this.h=null}set(f,m){this.h=f,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let $,J=!1,T=new b,x=()=>{const o=Promise.resolve(void 0);$=()=>{o.then(E)}};function E(){for(var o;o=_();){try{o.h.call(o.g)}catch(m){j(m)}var f=N;f.j(o),f.h<100&&(f.h++,o.next=f.g,f.g=o)}J=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function k(o,f){this.type=o,this.g=this.target=f,this.defaultPrevented=!1}k.prototype.h=function(){this.defaultPrevented=!0};var M=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var o=!1,f=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const m=()=>{};r.addEventListener("test",m,f),r.removeEventListener("test",m,f)}catch{}return o}();function w(o){return/^[\s\xa0]*$/.test(o)}function te(o,f){k.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,f)}p(te,k),te.prototype.init=function(o,f){const m=this.type=o.type,y=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=f,f=o.relatedTarget,f||(m=="mouseover"?f=o.fromElement:m=="mouseout"&&(f=o.toElement)),this.relatedTarget=f,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&te.Z.h.call(this)},te.prototype.h=function(){te.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var pe="closure_listenable_"+(Math.random()*1e6|0),W=0;function ee(o,f,m,y,D){this.listener=o,this.proxy=null,this.src=f,this.type=m,this.capture=!!y,this.ha=D,this.key=++W,this.da=this.fa=!1}function ae(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ue(o,f,m){for(const y in o)f.call(m,o[y],y,o)}function Le(o,f){for(const m in o)f.call(void 0,o[m],m,o)}function Ze(o){const f={};for(const m in o)f[m]=o[m];return f}const ut="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Mt(o,f){let m,y;for(let D=1;D<arguments.length;D++){y=arguments[D];for(m in y)o[m]=y[m];for(let V=0;V<ut.length;V++)m=ut[V],Object.prototype.hasOwnProperty.call(y,m)&&(o[m]=y[m])}}function qe(o){this.src=o,this.g={},this.h=0}qe.prototype.add=function(o,f,m,y,D){const V=o.toString();o=this.g[V],o||(o=this.g[V]=[],this.h++);const H=ht(o,f,y,D);return H>-1?(f=o[H],m||(f.fa=!1)):(f=new ee(f,this.src,V,!!y,D),f.fa=m,o.push(f)),f};function He(o,f){const m=f.type;if(m in o.g){var y=o.g[m],D=Array.prototype.indexOf.call(y,f,void 0),V;(V=D>=0)&&Array.prototype.splice.call(y,D,1),V&&(ae(f),o.g[m].length==0&&(delete o.g[m],o.h--))}}function ht(o,f,m,y){for(let D=0;D<o.length;++D){const V=o[D];if(!V.da&&V.listener==f&&V.capture==!!m&&V.ha==y)return D}return-1}var F="closure_lm_"+(Math.random()*1e6|0),re={};function he(o,f,m,y,D){if(y&&y.once)return Te(o,f,m,y,D);if(Array.isArray(f)){for(let V=0;V<f.length;V++)he(o,f[V],m,y,D);return null}return m=dt(m),o&&o[pe]?o.J(f,m,l(y)?!!y.capture:!!y,D):Z(o,f,m,!1,y,D)}function Z(o,f,m,y,D,V){if(!f)throw Error("Invalid event type");const H=l(D)?!!D.capture:!!D;let Q=ft(o);if(Q||(o[F]=Q=new qe(o)),m=Q.add(f,m,y,H,V),m.proxy)return m;if(y=Pe(),m.proxy=y,y.src=o,y.listener=m,o.addEventListener)M||(D=H),D===void 0&&(D=!1),o.addEventListener(f.toString(),y,D);else if(o.attachEvent)o.attachEvent(Qe(f.toString()),y);else if(o.addListener&&o.removeListener)o.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Pe(){function o(m){return f.call(o.src,o.listener,m)}const f=wt;return o}function Te(o,f,m,y,D){if(Array.isArray(f)){for(let V=0;V<f.length;V++)Te(o,f[V],m,y,D);return null}return m=dt(m),o&&o[pe]?o.K(f,m,l(y)?!!y.capture:!!y,D):Z(o,f,m,!0,y,D)}function Ge(o,f,m,y,D){if(Array.isArray(f))for(var V=0;V<f.length;V++)Ge(o,f[V],m,y,D);else y=l(y)?!!y.capture:!!y,m=dt(m),o&&o[pe]?(o=o.i,V=String(f).toString(),V in o.g&&(f=o.g[V],m=ht(f,m,y,D),m>-1&&(ae(f[m]),Array.prototype.splice.call(f,m,1),f.length==0&&(delete o.g[V],o.h--)))):o&&(o=ft(o))&&(f=o.g[f.toString()],o=-1,f&&(o=ht(f,m,y,D)),(m=o>-1?f[o]:null)&&De(m))}function De(o){if(typeof o!="number"&&o&&!o.da){var f=o.src;if(f&&f[pe])He(f.i,o);else{var m=o.type,y=o.proxy;f.removeEventListener?f.removeEventListener(m,y,o.capture):f.detachEvent?f.detachEvent(Qe(m),y):f.addListener&&f.removeListener&&f.removeListener(y),(m=ft(f))?(He(m,o),m.h==0&&(m.src=null,f[F]=null)):ae(o)}}}function Qe(o){return o in re?re[o]:re[o]="on"+o}function wt(o,f){if(o.da)o=!0;else{f=new te(f,this);const m=o.listener,y=o.ha||o.src;o.fa&&De(o),o=m.call(y,f)}return o}function ft(o){return o=o[F],o instanceof qe?o:null}var Jn="__closure_events_fn_"+(Math.random()*1e9>>>0);function dt(o){return typeof o=="function"?o:(o[Jn]||(o[Jn]=function(f){return o.handleEvent(f)}),o[Jn])}function fe(){A.call(this),this.i=new qe(this),this.M=this,this.G=null}p(fe,A),fe.prototype[pe]=!0,fe.prototype.removeEventListener=function(o,f,m,y){Ge(this,o,f,m,y)};function Ee(o,f){var m,y=o.G;if(y)for(m=[];y;y=y.G)m.push(y);if(o=o.M,y=f.type||f,typeof f=="string")f=new k(f,o);else if(f instanceof k)f.target=f.target||o;else{var D=f;f=new k(y,o),Mt(f,D)}D=!0;let V,H;if(m)for(H=m.length-1;H>=0;H--)V=f.g=m[H],D=Se(V,y,!0,f)&&D;if(V=f.g=o,D=Se(V,y,!0,f)&&D,D=Se(V,y,!1,f)&&D,m)for(H=0;H<m.length;H++)V=f.g=m[H],D=Se(V,y,!1,f)&&D}fe.prototype.N=function(){if(fe.Z.N.call(this),this.i){var o=this.i;for(const f in o.g){const m=o.g[f];for(let y=0;y<m.length;y++)ae(m[y]);delete o.g[f],o.h--}}this.G=null},fe.prototype.J=function(o,f,m,y){return this.i.add(String(o),f,!1,m,y)},fe.prototype.K=function(o,f,m,y){return this.i.add(String(o),f,!0,m,y)};function Se(o,f,m,y){if(f=o.i.g[String(f)],!f)return!0;f=f.concat();let D=!0;for(let V=0;V<f.length;++V){const H=f[V];if(H&&!H.da&&H.capture==m){const Q=H.listener,ve=H.ha||H.src;H.fa&&He(o.i,H),D=Q.call(ve,y)!==!1&&D}}return D&&!y.defaultPrevented}function bt(o,f){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(f)>2147483647?-1:r.setTimeout(o,f||0)}function ne(o){o.g=bt(()=>{o.g=null,o.i&&(o.i=!1,ne(o))},o.l);const f=o.h;o.h=null,o.m.apply(null,f)}class X extends A{constructor(f,m){super(),this.m=f,this.l=m,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:ne(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function oe(o){A.call(this),this.h=o,this.g={}}p(oe,A);var Ue=[];function ye(o){ue(o.g,function(f,m){this.g.hasOwnProperty(m)&&De(f)},o),o.g={}}oe.prototype.N=function(){oe.Z.N.call(this),ye(this)},oe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ce=r.JSON.stringify,Xe=r.JSON.parse,it=class{stringify(o){return r.JSON.stringify(o,void 0)}parse(o){return r.JSON.parse(o,void 0)}};function Ke(){}function mn(){}var Dt={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Qt(){k.call(this,"d")}p(Qt,k);function we(){k.call(this,"c")}p(we,k);var me={},Oe=null;function Ot(){return Oe=Oe||new fe}me.Ia="serverreachability";function Gt(o){k.call(this,me.Ia,o)}p(Gt,k);function Re(o){const f=Ot();Ee(f,new Gt(f))}me.STAT_EVENT="statevent";function mt(o,f){k.call(this,me.STAT_EVENT,o),this.stat=f}p(mt,k);function xt(o){const f=Ot();Ee(f,new mt(f,o))}me.Ja="timingevent";function ls(o,f){k.call(this,me.Ja,o),this.size=f}p(ls,k);function Ae(o,f){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){o()},f)}function ot(){this.g=!0}ot.prototype.ua=function(){this.g=!1};function jt(o,f,m,y,D,V){o.info(function(){if(o.g)if(V){var H="",Q=V.split("&");for(let _e=0;_e<Q.length;_e++){var ve=Q[_e].split("=");if(ve.length>1){const Ie=ve[0];ve=ve[1];const lt=Ie.split("_");H=lt.length>=2&&lt[1]=="type"?H+(Ie+"="+ve+"&"):H+(Ie+"=redacted&")}}}else H=null;else H=V;return"XMLHTTP REQ ("+y+") [attempt "+D+"]: "+f+`
`+m+`
`+H})}function St(o,f,m,y,D,V,H){o.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+D+"]: "+f+`
`+m+`
`+V+" "+H})}function Xt(o,f,m,y){o.info(function(){return"XMLHTTP TEXT ("+f+"): "+Yt(o,m)+(y?" "+y:"")})}function Sn(o,f){o.info(function(){return"TIMEOUT: "+f})}ot.prototype.info=function(){};function Yt(o,f){if(!o.g)return f;if(!f)return null;try{const V=JSON.parse(f);if(V){for(o=0;o<V.length;o++)if(Array.isArray(V[o])){var m=V[o];if(!(m.length<2)){var y=m[1];if(Array.isArray(y)&&!(y.length<1)){var D=y[0];if(D!="noop"&&D!="stop"&&D!="close")for(let H=1;H<y.length;H++)y[H]=""}}}}return ce(V)}catch{return f}}var Wt={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ya={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},na;function nn(){}p(nn,Ke),nn.prototype.g=function(){return new XMLHttpRequest},na=new nn;function ms(o){return encodeURIComponent(String(o))}function Bn(o){var f=1;o=o.split(":");const m=[];for(;f>0&&o.length;)m.push(o.shift()),f--;return o.length&&m.push(o.join(":")),m}function $n(o,f,m,y){this.j=o,this.i=f,this.l=m,this.S=y||1,this.V=new oe(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new cs}function cs(){this.i=null,this.g="",this.h=!1}var sa={},uo={};function aa(o,f,m){o.M=1,o.A=ts(us(f)),o.u=m,o.R=!0,ks(o,null)}function ks(o,f){o.F=Date.now(),Er(o),o.B=us(o.A);var m=o.B,y=o.S;Array.isArray(y)||(y=[String(y)]),wi(m.i,"t",y),o.C=0,m=o.j.L,o.h=new cs,o.g=on(o.j,m?f:null,!o.u),o.P>0&&(o.O=new X(h(o.Y,o,o.g),o.P)),f=o.V,m=o.g,y=o.ba;var D="readystatechange";Array.isArray(D)||(D&&(Ue[0]=D.toString()),D=Ue);for(let V=0;V<D.length;V++){const H=he(m,D[V],y||f.handleEvent,!1,f.h||f);if(!H)break;f.g[H.key]=H}f=o.J?Ze(o.J):{},o.u?(o.v||(o.v="POST"),f["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,f)):(o.v="GET",o.g.ea(o.B,o.v,null,f)),Re(),jt(o.i,o.v,o.B,o.l,o.S,o.u)}$n.prototype.ba=function(o){o=o.target;const f=this.O;f&&la(o)==3?f.j():this.Y(o)},$n.prototype.Y=function(o){try{if(o==this.g)e:{const Q=la(this.g),ve=this.g.ya(),_e=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||Hl(this.g)))){this.K||Q!=4||ve==7||(ve==8||_e<=0?Re(3):Re(2)),Cs(this);var f=this.g.ca();this.X=f;var m=Tr(this);if(this.o=f==200,St(this.i,this.v,this.B,this.l,this.S,Q,f),this.o){if(this.U&&!this.L){t:{if(this.g){var y,D=this.g;if((y=D.g?D.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(y)){var V=y;break t}}V=null}if(o=V)Xt(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ps(this,o);else{this.o=!1,this.m=3,xt(12),An(this),ba(this);break e}}if(this.R){o=!0;let Ie;for(;!this.K&&this.C<m.length;)if(Ie=Ti(this,m),Ie==uo){Q==4&&(this.m=4,xt(14),o=!1),Xt(this.i,this.l,null,"[Incomplete Response]");break}else if(Ie==sa){this.m=4,xt(15),Xt(this.i,this.l,m,"[Invalid Chunk]"),o=!1;break}else Xt(this.i,this.l,Ie,null),ps(this,Ie);if(Zn(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||m.length!=0||this.h.h||(this.m=1,xt(16),o=!1),this.o=this.o&&o,!o)Xt(this.i,this.l,m,"[Invalid Chunked Response]"),An(this),ba(this);else if(m.length>0&&!this.W){this.W=!0;var H=this.j;H.g==this&&H.aa&&!H.P&&(H.j.info("Great, no buffering proxy detected. Bytes received: "+m.length),Y(H),H.P=!0,xt(11))}}else Xt(this.i,this.l,m,null),ps(this,m);Q==4&&An(this),this.o&&!this.K&&(Q==4?et(this.j,this):(this.o=!1,Er(this)))}else Hu(this.g),f==400&&m.indexOf("Unknown SID")>0?(this.m=3,xt(12)):(this.m=0,xt(13)),An(this),ba(this)}}}catch{}finally{}};function Tr(o){if(!Zn(o))return o.g.la();const f=Hl(o.g);if(f==="")return"";let m="";const y=f.length,D=la(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return An(o),ba(o),"";o.h.i=new r.TextDecoder}for(let V=0;V<y;V++)o.h.h=!0,m+=o.h.i.decode(f[V],{stream:!(D&&V==y-1)});return f.length=0,o.h.g+=m,o.C=0,o.h.g}function Zn(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Ti(o,f){var m=o.C,y=f.indexOf(`
`,m);return y==-1?uo:(m=Number(f.substring(m,y)),isNaN(m)?sa:(y+=1,y+m>f.length?uo:(f=f.slice(y,y+m),o.C=y+m,f)))}$n.prototype.cancel=function(){this.K=!0,An(this)};function Er(o){o.T=Date.now()+o.H,va(o,o.H)}function va(o,f){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Ae(h(o.aa,o),f)}function Cs(o){o.D&&(r.clearTimeout(o.D),o.D=null)}$n.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Sn(this.i,this.B),this.M!=2&&(Re(),xt(17)),An(this),this.m=2,ba(this)):va(this,this.T-o)};function ba(o){o.j.I==0||o.K||et(o.j,o)}function An(o){Cs(o);var f=o.O;f&&typeof f.dispose=="function"&&f.dispose(),o.O=null,ye(o.V),o.g&&(f=o.g,o.g=null,f.abort(),f.dispose())}function ps(o,f){try{var m=o.j;if(m.I!=0&&(m.g==o||ho(m.h,o))){if(!o.L&&ho(m.h,o)&&m.I==3){try{var y=m.Ba.g.parse(f)}catch{y=null}if(Array.isArray(y)&&y.length==3){var D=y;if(D[0]==0){e:if(!m.v){if(m.g)if(m.g.F+3e3<o.F)ke(m),bo(m);else break e;z(m),xt(18)}}else m.xa=D[1],0<m.xa-m.K&&D[2]<37500&&m.F&&m.A==0&&!m.C&&(m.C=Ae(h(m.Va,m),6e3));$s(m.h)<=1&&m.ta&&(m.ta=void 0)}else Ct(m,11)}else if((o.L||m.g==o)&&ke(m),!w(f))for(D=m.Ba.g.parse(f),f=0;f<D.length;f++){let _e=D[f];const Ie=_e[0];if(!(Ie<=m.K))if(m.K=Ie,_e=_e[1],m.I==2)if(_e[0]=="c"){m.M=_e[1],m.ba=_e[2];const lt=_e[3];lt!=null&&(m.ka=lt,m.j.info("VER="+m.ka));const $e=_e[4];$e!=null&&(m.za=$e,m.j.info("SVER="+m.za));const Nt=_e[5];Nt!=null&&typeof Nt=="number"&&Nt>0&&(y=1.5*Nt,m.O=y,m.j.info("backChannelRequestTimeoutMs_="+y)),y=m;const cn=o.g;if(cn){const un=cn.g?cn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(un){var V=y.h;V.g||un.indexOf("spdy")==-1&&un.indexOf("quic")==-1&&un.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(fo(V,V.h),V.h=null))}if(y.G){const On=cn.g?cn.g.getResponseHeader("X-HTTP-Session-Id"):null;On&&(y.wa=On,U(y.J,y.G,On))}}m.I=3,m.l&&m.l.ra(),m.aa&&(m.T=Date.now()-o.F,m.j.info("Handshake RTT: "+m.T+"ms")),y=m;var H=o;if(y.na=Ut(y,y.L?y.ba:null,y.W),H.L){mo(y.h,H);var Q=H,ve=y.O;ve&&(Q.H=ve),Q.D&&(Cs(Q),Er(Q)),y.g=H}else ie(y);m.i.length>0&&Rr(m)}else _e[0]!="stop"&&_e[0]!="close"||Ct(m,7);else m.I==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?Ct(m,7):ql(m):_e[0]!="noop"&&m.l&&m.l.qa(_e),m.A=0)}}Re(4)}catch{}}var ia=class{constructor(o,f){this.g=o,this.map=f}};function wr(o){this.l=o||10,r.PerformanceNavigationTiming?(o=r.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function gs(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function $s(o){return o.h?1:o.g?o.g.size:0}function ho(o,f){return o.h?o.h==f:o.g?o.g.has(f):!1}function fo(o,f){o.g?o.g.add(f):o.h=f}function mo(o,f){o.h&&o.h==f?o.h=null:o.g&&o.g.has(f)&&o.g.delete(f)}wr.prototype.cancel=function(){if(this.i=po(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function po(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let f=o.i;for(const m of o.g.values())f=f.concat(m.G);return f}return v(o.i)}var go=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ua(o,f){if(o){o=o.split("&");for(let m=0;m<o.length;m++){const y=o[m].indexOf("=");let D,V=null;y>=0?(D=o[m].substring(0,y),V=o[m].substring(y+1)):D=o[m],f(D,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function ys(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let f;o instanceof ys?(this.l=o.l,Sr(this,o.j),this.o=o.o,this.g=o.g,es(this,o.u),this.h=o.h,ge(this,Bl(o.i)),this.m=o.m):o&&(f=String(o).match(go))?(this.l=!1,Sr(this,f[1]||"",!0),this.o=xa(f[2]||""),this.g=xa(f[3]||"",!0),es(this,f[4]),this.h=xa(f[5]||"",!0),ge(this,f[6]||"",!0),this.m=xa(f[7]||"")):(this.l=!1,this.i=new ra(null,this.l))}ys.prototype.toString=function(){const o=[];var f=this.j;f&&o.push(Ar(f,se,!0),":");var m=this.g;return(m||f=="file")&&(o.push("//"),(f=this.o)&&o.push(Ar(f,se,!0),"@"),o.push(ms(m).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.u,m!=null&&o.push(":",String(m))),(m=this.h)&&(this.g&&m.charAt(0)!="/"&&o.push("/"),o.push(Ar(m,m.charAt(0)=="/"?Bd:Ou,!0))),(m=this.i.toString())&&o.push("?",m),(m=this.m)&&o.push("#",Ar(m,ju)),o.join("")},ys.prototype.resolve=function(o){const f=us(this);let m=!!o.j;m?Sr(f,o.j):m=!!o.o,m?f.o=o.o:m=!!o.g,m?f.g=o.g:m=o.u!=null;var y=o.h;if(m)es(f,o.u);else if(m=!!o.h){if(y.charAt(0)!="/")if(this.g&&!this.h)y="/"+y;else{var D=f.h.lastIndexOf("/");D!=-1&&(y=f.h.slice(0,D+1)+y)}if(D=y,D==".."||D==".")y="";else if(D.indexOf("./")!=-1||D.indexOf("/.")!=-1){y=D.lastIndexOf("/",0)==0,D=D.split("/");const V=[];for(let H=0;H<D.length;){const Q=D[H++];Q=="."?y&&H==D.length&&V.push(""):Q==".."?((V.length>1||V.length==1&&V[0]!="")&&V.pop(),y&&H==D.length&&V.push("")):(V.push(Q),y=!0)}y=V.join("/")}else y=D}return m?f.h=y:m=o.i.toString()!=="",m?ge(f,Bl(o.i)):m=!!o.m,m&&(f.m=o.m),f};function us(o){return new ys(o)}function Sr(o,f,m){o.j=m?xa(f,!0):f,o.j&&(o.j=o.j.replace(/:$/,""))}function es(o,f){if(f){if(f=Number(f),isNaN(f)||f<0)throw Error("Bad port number "+f);o.u=f}else o.u=null}function ge(o,f,m){f instanceof ra?(o.i=f,Vu(o.i,o.l)):(m||(f=Ar(f,yo)),o.i=new ra(f,o.l))}function U(o,f,m){o.i.set(f,m)}function ts(o){return U(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function xa(o,f){return o?f?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ar(o,f,m){return typeof o=="string"?(o=encodeURI(o).replace(f,Nn),m&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Nn(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var se=/[#\/\?@]/g,Ou=/[#\?:]/g,Bd=/[#\?]/g,yo=/[#\?@]/g,ju=/#/g;function ra(o,f){this.h=this.g=null,this.i=o||null,this.j=!!f}function oa(o){o.g||(o.g=new Map,o.h=0,o.i&&Ua(o.i,function(f,m){o.add(decodeURIComponent(f.replace(/\+/g," ")),m)}))}t=ra.prototype,t.add=function(o,f){oa(this),this.i=null,o=za(this,o);let m=this.g.get(o);return m||this.g.set(o,m=[]),m.push(f),this.h+=1,this};function zl(o,f){oa(o),f=za(o,f),o.g.has(f)&&(o.i=null,o.h-=o.g.get(f).length,o.g.delete(f))}function Pu(o,f){return oa(o),f=za(o,f),o.g.has(f)}t.forEach=function(o,f){oa(this),this.g.forEach(function(m,y){m.forEach(function(D){o.call(f,D,y,this)},this)},this)};function Ei(o,f){oa(o);let m=[];if(typeof f=="string")Pu(o,f)&&(m=m.concat(o.g.get(za(o,f))));else for(o=Array.from(o.g.values()),f=0;f<o.length;f++)m=m.concat(o[f]);return m}t.set=function(o,f){return oa(this),this.i=null,o=za(this,o),Pu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[f]),this.h+=1,this},t.get=function(o,f){return o?(o=Ei(this,o),o.length>0?String(o[0]):f):f};function wi(o,f,m){zl(o,f),m.length>0&&(o.i=null,o.g.set(za(o,f),v(m)),o.h+=m.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],f=Array.from(this.g.keys());for(let y=0;y<f.length;y++){var m=f[y];const D=ms(m);m=Ei(this,m);for(let V=0;V<m.length;V++){let H=D;m[V]!==""&&(H+="="+ms(m[V])),o.push(H)}}return this.i=o.join("&")};function Bl(o){const f=new ra;return f.i=o.i,o.g&&(f.g=new Map(o.g),f.h=o.h),f}function za(o,f){return f=String(f),o.j&&(f=f.toLowerCase()),f}function Vu(o,f){f&&!o.j&&(oa(o),o.i=null,o.g.forEach(function(m,y){const D=y.toLowerCase();y!=D&&(zl(this,y),wi(this,D,m))},o)),o.j=f}function vs(o,f){const m=new ot;if(r.Image){const y=new Image;y.onload=d(_a,m,"TestLoadImage: loaded",!0,f,y),y.onerror=d(_a,m,"TestLoadImage: error",!1,f,y),y.onabort=d(_a,m,"TestLoadImage: abort",!1,f,y),y.ontimeout=d(_a,m,"TestLoadImage: timeout",!1,f,y),r.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=o}else f(!1)}function $d(o,f){const m=new ot,y=new AbortController,D=setTimeout(()=>{y.abort(),_a(m,"TestPingServer: timeout",!1,f)},1e4);fetch(o,{signal:y.signal}).then(V=>{clearTimeout(D),V.ok?_a(m,"TestPingServer: ok",!0,f):_a(m,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(D),_a(m,"TestPingServer: error",!1,f)})}function _a(o,f,m,y,D){try{D&&(D.onload=null,D.onerror=null,D.onabort=null,D.ontimeout=null),y(m)}catch{}}function Fd(){this.g=new it}function $l(o){this.i=o.Sb||null,this.h=o.ab||!1}p($l,Ke),$l.prototype.g=function(){return new vo(this.i,this.h)};function vo(o,f){fe.call(this),this.H=o,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(vo,fe),t=vo.prototype,t.open=function(o,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=f,this.readyState=1,Ta(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const f={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(f.body=o),(this.H||r).fetch(new Request(this.D,f)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ba(this)),this.readyState=0},t.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Ta(this)),this.g&&(this.readyState=3,Ta(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof r.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Lu(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Lu(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}t.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var f=o.value?o.value:new Uint8Array(0);(f=this.B.decode(f,{stream:!o.done}))&&(this.response=this.responseText+=f)}o.done?Ba(this):Ta(this),this.readyState==3&&Lu(this)}},t.Oa=function(o){this.g&&(this.response=this.responseText=o,Ba(this))},t.Na=function(o){this.g&&(this.response=o,Ba(this))},t.ga=function(){this.g&&Ba(this)};function Ba(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Ta(o)}t.setRequestHeader=function(o,f){this.A.append(o,f)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],f=this.h.entries();for(var m=f.next();!m.done;)m=m.value,o.push(m[0]+": "+m[1]),m=f.next();return o.join(`\r
`)};function Ta(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(vo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Uu(o){let f="";return ue(o,function(m,y){f+=y,f+=":",f+=m,f+=`\r
`}),f}function Fl(o,f,m){e:{for(y in m){var y=!1;break e}y=!0}y||(m=Uu(m),typeof o=="string"?m!=null&&ms(m):U(o,f,m))}function At(o){fe.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(At,fe);var zu=/^https?$/i,Hd=["POST","PUT"];t=At.prototype,t.Fa=function(o){this.H=o},t.ea=function(o,f,m,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);f=f?f.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():na.g(),this.g.onreadystatechange=g(h(this.Ca,this));try{this.B=!0,this.g.open(f,String(o),!0),this.B=!1}catch(V){Bu(this,V);return}if(o=m||"",m=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var D in y)m.set(D,y[D]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const V of y.keys())m.set(V,y.get(V));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(m.keys()).find(V=>V.toLowerCase()=="content-type"),D=r.FormData&&o instanceof r.FormData,!(Array.prototype.indexOf.call(Hd,f,void 0)>=0)||y||D||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,H]of m)this.g.setRequestHeader(V,H);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(V){Bu(this,V)}};function Bu(o,f){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=f,o.o=5,$u(o),$a(o)}function $u(o){o.A||(o.A=!0,Ee(o,"complete"),Ee(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Ee(this,"complete"),Ee(this,"abort"),$a(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),$a(this,!0)),At.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?Fu(this):this.Xa())},t.Xa=function(){Fu(this)};function Fu(o){if(o.h&&typeof i<"u"){if(o.v&&la(o)==4)setTimeout(o.Ca.bind(o),0);else if(Ee(o,"readystatechange"),la(o)==4){o.h=!1;try{const V=o.ca();e:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var m;if(!(m=f)){var y;if(y=V===0){let H=String(o.D).match(go)[1]||null;!H&&r.self&&r.self.location&&(H=r.self.location.protocol.slice(0,-1)),y=!zu.test(H?H.toLowerCase():"")}m=y}if(m)Ee(o,"complete"),Ee(o,"success");else{o.o=6;try{var D=la(o)>2?o.g.statusText:""}catch{D=""}o.l=D+" ["+o.ca()+"]",$u(o)}}finally{$a(o)}}}}function $a(o,f){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const m=o.g;o.g=null,f||Ee(o,"ready");try{m.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function la(o){return o.g?o.g.readyState:0}t.ca=function(){try{return la(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(o){if(this.g){var f=this.g.responseText;return o&&f.indexOf(o)==0&&(f=f.substring(o.length)),Xe(f)}};function Hl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Hu(o){const f={};o=(o.g&&la(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<o.length;y++){if(w(o[y]))continue;var m=Bn(o[y]);const D=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const V=f[D]||[];f[D]=V,V.push(m)}Le(f,function(y){return y.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Nr(o,f,m){return m&&m.internalChannelParams&&m.internalChannelParams[o]||f}function qu(o){this.za=0,this.i=[],this.j=new ot,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Nr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Nr("baseRetryDelayMs",5e3,o),this.Za=Nr("retryDelaySeedMs",1e4,o),this.Ta=Nr("forwardChannelMaxRetries",2,o),this.va=Nr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new wr(o&&o.concurrentRequestLimit),this.Ba=new Fd,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=qu.prototype,t.ka=8,t.I=1,t.connect=function(o,f,m,y){xt(0),this.W=o,this.H=f||{},m&&y!==void 0&&(this.H.OSID=m,this.H.OAID=y),this.F=this.X,this.J=Ut(this,null,this.W),Rr(this)};function ql(o){if(Gl(o),o.I==3){var f=o.V++,m=us(o.J);if(U(m,"SID",o.M),U(m,"RID",f),U(m,"TYPE","terminate"),L(o,m),f=new $n(o,o.j,f),f.M=2,f.A=ts(us(m)),m=!1,r.navigator&&r.navigator.sendBeacon)try{m=r.navigator.sendBeacon(f.A.toString(),"")}catch{}!m&&r.Image&&(new Image().src=f.A,m=!0),m||(f.g=on(f.j,null),f.g.ea(f.A)),f.F=Date.now(),Er(f)}Ye(o)}function bo(o){o.g&&(Y(o),o.g.cancel(),o.g=null)}function Gl(o){bo(o),o.v&&(r.clearTimeout(o.v),o.v=null),ke(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&r.clearTimeout(o.m),o.m=null)}function Rr(o){if(!gs(o.h)&&!o.m){o.m=!0;var f=o.Ea;$||x(),J||($(),J=!0),T.add(f,o),o.D=0}}function Gu(o,f){return $s(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=f.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Ae(h(o.Ea,o,f),Jt(o,o.D)),o.D++,!0)}t.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const D=new $n(this,this.j,o);let V=this.o;if(this.U&&(V?(V=Ze(V),Mt(V,this.U)):V=this.U),this.u!==null||this.R||(D.J=V,V=null),this.S)e:{for(var f=0,m=0;m<this.i.length;m++){t:{var y=this.i[m];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(f+=y,f>4096){f=m;break e}if(f===4096||m===this.i.length-1){f=m+1;break e}}f=1e3}else f=1e3;f=B(this,D,f),m=us(this.J),U(m,"RID",o),U(m,"CVER",22),this.G&&U(m,"X-HTTP-Session-Id",this.G),L(this,m),V&&(this.R?f="headers="+ms(Uu(V))+"&"+f:this.u&&Fl(m,this.u,V)),fo(this.h,D),this.Ra&&U(m,"TYPE","init"),this.S?(U(m,"$req",f),U(m,"SID","null"),D.U=!0,aa(D,m,null)):aa(D,m,f),this.I=2}}else this.I==3&&(o?S(this,o):this.i.length==0||gs(this.h)||S(this))};function S(o,f){var m;f?m=f.l:m=o.V++;const y=us(o.J);U(y,"SID",o.M),U(y,"RID",m),U(y,"AID",o.K),L(o,y),o.u&&o.o&&Fl(y,o.u,o.o),m=new $n(o,o.j,m,o.D+1),o.u===null&&(m.J=o.o),f&&(o.i=f.G.concat(o.i)),f=B(o,m,1e3),m.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),fo(o.h,m),aa(m,y,f)}function L(o,f){o.H&&ue(o.H,function(m,y){U(f,y,m)}),o.l&&ue({},function(m,y){U(f,y,m)})}function B(o,f,m){m=Math.min(o.i.length,m);const y=o.l?h(o.l.Ka,o.l,o):null;e:{var D=o.i;let Q=-1;for(;;){const ve=["count="+m];Q==-1?m>0?(Q=D[0].g,ve.push("ofs="+Q)):Q=0:ve.push("ofs="+Q);let _e=!0;for(let Ie=0;Ie<m;Ie++){var V=D[Ie].g;const lt=D[Ie].map;if(V-=Q,V<0)Q=Math.max(0,D[Ie].g-100),_e=!1;else try{V="req"+V+"_"||"";try{var H=lt instanceof Map?lt:Object.entries(lt);for(const[$e,Nt]of H){let cn=Nt;l(Nt)&&(cn=ce(Nt)),ve.push(V+$e+"="+encodeURIComponent(cn))}}catch($e){throw ve.push(V+"type="+encodeURIComponent("_badmap")),$e}}catch{y&&y(lt)}}if(_e){H=ve.join("&");break e}}H=void 0}return o=o.i.splice(0,m),f.G=o,H}function ie(o){if(!o.g&&!o.v){o.Y=1;var f=o.Da;$||x(),J||($(),J=!0),T.add(f,o),o.A=0}}function z(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Ae(h(o.Da,o),Jt(o,o.A)),o.A++,!0)}t.Da=function(){if(this.v=null,be(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Ae(h(this.Wa,this),o)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,xt(10),bo(this),be(this))};function Y(o){o.B!=null&&(r.clearTimeout(o.B),o.B=null)}function be(o){o.g=new $n(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var f=us(o.na);U(f,"RID","rpc"),U(f,"SID",o.M),U(f,"AID",o.K),U(f,"CI",o.F?"0":"1"),!o.F&&o.ia&&U(f,"TO",o.ia),U(f,"TYPE","xmlhttp"),L(o,f),o.u&&o.o&&Fl(f,o.u,o.o),o.O&&(o.g.H=o.O);var m=o.g;o=o.ba,m.M=1,m.A=ts(us(f)),m.u=null,m.R=!0,ks(m,o)}t.Va=function(){this.C!=null&&(this.C=null,bo(this),z(this),xt(19))};function ke(o){o.C!=null&&(r.clearTimeout(o.C),o.C=null)}function et(o,f){var m=null;if(o.g==f){ke(o),Y(o),o.g=null;var y=2}else if(ho(o.h,f))m=f.G,mo(o.h,f),y=1;else return;if(o.I!=0){if(f.o)if(y==1){m=f.u?f.u.length:0,f=Date.now()-f.F;var D=o.D;y=Ot(),Ee(y,new ls(y,m)),Rr(o)}else ie(o);else if(D=f.m,D==3||D==0&&f.X>0||!(y==1&&Gu(o,f)||y==2&&z(o)))switch(m&&m.length>0&&(f=o.h,f.i=f.i.concat(m)),D){case 1:Ct(o,5);break;case 4:Ct(o,10);break;case 3:Ct(o,6);break;default:Ct(o,2)}}}function Jt(o,f){let m=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(m*=2),m*f}function Ct(o,f){if(o.j.info("Error code "+f),f==2){var m=h(o.bb,o),y=o.Ua;const D=!y;y=new ys(y||"//www.google.com/images/cleardot.gif"),r.location&&r.location.protocol=="http"||Sr(y,"https"),ts(y),D?vs(y.toString(),m):$d(y.toString(),m)}else xt(2);o.I=0,o.l&&o.l.pa(f),Ye(o),Gl(o)}t.bb=function(o){o?(this.j.info("Successfully pinged google.com"),xt(2)):(this.j.info("Failed to ping google.com"),xt(1))};function Ye(o){if(o.I=0,o.ja=[],o.l){const f=po(o.h);(f.length!=0||o.i.length!=0)&&(C(o.ja,f),C(o.ja,o.i),o.h.i.length=0,v(o.i),o.i.length=0),o.l.oa()}}function Ut(o,f,m){var y=m instanceof ys?us(m):new ys(m);if(y.g!="")f&&(y.g=f+"."+y.g),es(y,y.u);else{var D=r.location;y=D.protocol,f=f?f+"."+D.hostname:D.hostname,D=+D.port;const V=new ys(null);y&&Sr(V,y),f&&(V.g=f),D&&es(V,D),m&&(V.h=m),y=V}return m=o.G,f=o.wa,m&&f&&U(y,m,f),U(y,"VER",o.ka),L(o,y),y}function on(o,f,m){if(f&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return f=o.Aa&&!o.ma?new At(new $l({ab:m})):new At(o.ma),f.Fa(o.L),f}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Dn(){}t=Dn.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function ln(){}ln.prototype.g=function(o,f){return new zt(o,f)};function zt(o,f){fe.call(this),this.g=new qu(f),this.l=o,this.h=f&&f.messageUrlParams||null,o=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(o?o["X-WebChannel-Content-Type"]=f.messageContentType:o={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.sa&&(o?o["X-WebChannel-Client-Profile"]=f.sa:o={"X-WebChannel-Client-Profile":f.sa}),this.g.U=o,(o=f&&f.Qb)&&!w(o)&&(this.g.u=o),this.A=f&&f.supportsCrossDomainXhr||!1,this.v=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!w(f)&&(this.g.G=f,o=this.h,o!==null&&f in o&&(o=this.h,f in o&&delete o[f])),this.j=new pn(this)}p(zt,fe),zt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},zt.prototype.close=function(){ql(this.g)},zt.prototype.o=function(o){var f=this.g;if(typeof o=="string"){var m={};m.__data__=o,o=m}else this.v&&(m={},m.__data__=ce(o),o=m);f.i.push(new ia(f.Ya++,o)),f.I==3&&Rr(f)},zt.prototype.N=function(){this.g.l=null,delete this.j,ql(this.g),delete this.g,zt.Z.N.call(this)};function Rn(o){Qt.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var f=o.__sm__;if(f){e:{for(const m in f){o=m;break e}o=void 0}(this.i=o)&&(o=this.i,f=f!==null&&o in f?f[o]:void 0),this.data=f}else this.data=o}p(Rn,Qt);function Fa(){we.call(this),this.status=1}p(Fa,we);function pn(o){this.g=o}p(pn,Dn),pn.prototype.ra=function(){Ee(this.g,"a")},pn.prototype.qa=function(o){Ee(this.g,new Rn(o))},pn.prototype.pa=function(o){Ee(this.g,new Fa)},pn.prototype.oa=function(){Ee(this.g,"b")},ln.prototype.createWebChannel=ln.prototype.g,zt.prototype.send=zt.prototype.o,zt.prototype.open=zt.prototype.m,zt.prototype.close=zt.prototype.close,U2=function(){return new ln},L2=function(){return Ot()},V2=me,sp={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Wt.NO_ERROR=0,Wt.TIMEOUT=8,Wt.HTTP_ERROR=6,Ph=Wt,ya.COMPLETE="complete",P2=ya,mn.EventType=Dt,Dt.OPEN="a",Dt.CLOSE="b",Dt.ERROR="c",Dt.MESSAGE="d",fe.prototype.listen=fe.prototype.J,cc=mn,At.prototype.listenOnce=At.prototype.K,At.prototype.getLastError=At.prototype.Ha,At.prototype.getLastErrorCode=At.prototype.ya,At.prototype.getStatus=At.prototype.ca,At.prototype.getResponseJson=At.prototype.La,At.prototype.getResponseText=At.prototype.la,At.prototype.send=At.prototype.ea,At.prototype.setWithCredentials=At.prototype.Fa,j2=At}).apply(typeof uh<"u"?uh:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class as{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}as.UNAUTHENTICATED=new as(null),as.GOOGLE_CREDENTIALS=new as("google-credentials-uid"),as.FIRST_PARTY=new as("first-party-uid"),as.MOCK_USER=new as("mock-user");/**
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
 */let Ol="12.12.0";function lk(t){Ol=t}/**
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
 */const Jr=new gd("@firebase/firestore");function No(){return Jr.logLevel}function de(t,...e){if(Jr.logLevel<=tt.DEBUG){const n=e.map(Ug);Jr.debug(`Firestore (${Ol}): ${t}`,...n)}}function gi(t,...e){if(Jr.logLevel<=tt.ERROR){const n=e.map(Ug);Jr.error(`Firestore (${Ol}): ${t}`,...n)}}function Zr(t,...e){if(Jr.logLevel<=tt.WARN){const n=e.map(Ug);Jr.warn(`Firestore (${Ol}): ${t}`,...n)}}function Ug(t){if(typeof t=="string")return t;try{return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
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
 */function Ne(t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,z2(t,s,n)}function z2(t,e,n){let s=`FIRESTORE (${Ol}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{s+=" CONTEXT: "+JSON.stringify(n)}catch{s+=" CONTEXT: "+n}throw gi(s),new Error(s)}function vt(t,e,n,s){let a="Unexpected state";typeof n=="string"?a=n:s=n,t||z2(e,a,s)}function Ve(t,e){return t}/**
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
 */const q={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class le extends _i{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class oi{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class B2{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ck{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(as.UNAUTHENTICATED))}shutdown(){}}class uk{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class hk{constructor(e){this.t=e,this.currentUser=as.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){vt(this.o===void 0,42304);let s=this.i;const a=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new oi;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new oi,e.enqueueRetryable(()=>a(this.currentUser))};const r=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await a(this.currentUser)})},l=c=>{de("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),r())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(de("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new oi)}},0),r()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(de("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(vt(typeof s.accessToken=="string",31837,{l:s}),new B2(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return vt(e===null||typeof e=="string",2055,{h:e}),new as(e)}}class fk{constructor(e,n,s){this.P=e,this.T=n,this.I=s,this.type="FirstParty",this.user=as.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class dk{constructor(e,n,s){this.P=e,this.T=n,this.I=s}getToken(){return Promise.resolve(new fk(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(as.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class x1{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class mk{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ha(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){vt(this.o===void 0,3512);const s=i=>{i.error!=null&&de("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const r=i.token!==this.m;return this.m=i.token,de("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const a=i=>{de("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>a(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?a(i):de("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new x1(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(vt(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new x1(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function pk(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
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
 */class zg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const a=pk(40);for(let i=0;i<a.length;++i)s.length<20&&a[i]<n&&(s+=e.charAt(a[i]%62))}return s}}function nt(t,e){return t<e?-1:t>e?1:0}function ap(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const a=t.charAt(s),i=e.charAt(s);if(a!==i)return jm(a)===jm(i)?nt(a,i):jm(a)?1:-1}return nt(t.length,e.length)}const gk=55296,yk=57343;function jm(t){const e=t.charCodeAt(0);return e>=gk&&e<=yk}function pl(t,e,n){return t.length===e.length&&t.every((s,a)=>n(s,e[a]))}/**
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
 */const _1="__name__";class Ea{constructor(e,n,s){n===void 0?n=0:n>e.length&&Ne(637,{offset:n,range:e.length}),s===void 0?s=e.length-n:s>e.length-n&&Ne(1746,{length:s,range:e.length-n}),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return Ea.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ea?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let a=0;a<s;a++){const i=Ea.compareSegments(e.get(a),n.get(a));if(i!==0)return i}return nt(e.length,n.length)}static compareSegments(e,n){const s=Ea.isNumericId(e),a=Ea.isNumericId(n);return s&&!a?-1:!s&&a?1:s&&a?Ea.extractNumericId(e).compare(Ea.extractNumericId(n)):ap(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return tr.fromString(e.substring(4,e.length-2))}}class Vt extends Ea{construct(e,n,s){return new Vt(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new le(q.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(a=>a.length>0))}return new Vt(n)}static emptyPath(){return new Vt([])}}const vk=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Kn extends Ea{construct(e,n,s){return new Kn(e,n,s)}static isValidIdentifier(e){return vk.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Kn.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===_1}static keyField(){return new Kn([_1])}static fromServerFormat(e){const n=[];let s="",a=0;const i=()=>{if(s.length===0)throw new le(q.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let r=!1;for(;a<e.length;){const l=e[a];if(l==="\\"){if(a+1===e.length)throw new le(q.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[a+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new le(q.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,a+=2}else l==="`"?(r=!r,a++):l!=="."||r?(s+=l,a++):(i(),a++)}if(i(),r)throw new le(q.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Kn(n)}static emptyPath(){return new Kn([])}}/**
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
 */class xe{constructor(e){this.path=e}static fromPath(e){return new xe(Vt.fromString(e))}static fromName(e){return new xe(Vt.fromString(e).popFirst(5))}static empty(){return new xe(Vt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Vt.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Vt.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new xe(new Vt(e.slice()))}}/**
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
 */function $2(t,e,n){if(!n)throw new le(q.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function bk(t,e,n,s){if(e===!0&&s===!0)throw new le(q.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function T1(t){if(!xe.isDocumentKey(t))throw new le(q.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function E1(t){if(xe.isDocumentKey(t))throw new le(q.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function F2(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function yd(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Ne(12329,{type:typeof t})}function Zs(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new le(q.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=yd(t);throw new le(q.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function xk(t,e){if(e<=0)throw new le(q.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
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
 */function wn(t,e){const n={typeString:t};return e&&(n.value=e),n}function wu(t,e){if(!F2(t))throw new le(q.INVALID_ARGUMENT,"JSON must be an object");let n;for(const s in e)if(e[s]){const a=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in t)){n=`JSON missing required field: '${s}'`;break}const r=t[s];if(a&&typeof r!==a){n=`JSON field '${s}' must be a ${a}.`;break}if(i!==void 0&&r!==i.value){n=`Expected '${s}' field to equal '${i.value}'`;break}}if(n)throw new le(q.INVALID_ARGUMENT,n);return!0}/**
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
 */const w1=-62135596800,S1=1e6;class Ft{static now(){return Ft.fromMillis(Date.now())}static fromDate(e){return Ft.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor((e-1e3*n)*S1);return new Ft(n,s)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new le(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new le(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<w1)throw new le(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new le(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/S1}_compareTo(e){return this.seconds===e.seconds?nt(this.nanoseconds,e.nanoseconds):nt(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ft._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(wu(e,Ft._jsonSchema))return new Ft(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-w1;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ft._jsonSchemaVersion="firestore/timestamp/1.0",Ft._jsonSchema={type:wn("string",Ft._jsonSchemaVersion),seconds:wn("number"),nanoseconds:wn("number")};/**
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
 */class je{static fromTimestamp(e){return new je(e)}static min(){return new je(new Ft(0,0))}static max(){return new je(new Ft(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const tu=-1;function _k(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,a=je.fromTimestamp(s===1e9?new Ft(n+1,0):new Ft(n,s));return new ur(a,xe.empty(),e)}function Tk(t){return new ur(t.readTime,t.key,tu)}class ur{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new ur(je.min(),xe.empty(),tu)}static max(){return new ur(je.max(),xe.empty(),tu)}}function Ek(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=xe.comparator(t.documentKey,e.documentKey),n!==0?n:nt(t.largestBatchId,e.largestBatchId))}/**
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
 */const wk="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Sk{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function jl(t){if(t.code!==q.FAILED_PRECONDITION||t.message!==wk)throw t;de("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class K{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&Ne(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new K((s,a)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,a)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,a)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof K?n:K.resolve(n)}catch(n){return K.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):K.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):K.reject(n)}static resolve(e){return new K((n,s)=>{n(e)})}static reject(e){return new K((n,s)=>{s(e)})}static waitFor(e){return new K((n,s)=>{let a=0,i=0,r=!1;e.forEach(l=>{++a,l.next(()=>{++i,r&&i===a&&n()},c=>s(c))}),r=!0,i===a&&n()})}static or(e){let n=K.resolve(!1);for(const s of e)n=n.next(a=>a?K.resolve(a):s());return n}static forEach(e,n){const s=[];return e.forEach((a,i)=>{s.push(n.call(this,a,i))}),this.waitFor(s)}static mapArray(e,n){return new K((s,a)=>{const i=e.length,r=new Array(i);let l=0;for(let c=0;c<i;c++){const h=c;n(e[h]).next(d=>{r[h]=d,++l,l===i&&s(r)},d=>a(d))}})}static doWhile(e,n){return new K((s,a)=>{const i=()=>{e()===!0?n().next(()=>{i()},a):s()};i()})}}function Ak(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Pl(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class vd{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>n.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}vd.ce=-1;/**
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
 */const Bg=-1;function bd(t){return t==null}function Rf(t){return t===0&&1/t==-1/0}function Nk(t){return typeof t=="number"&&Number.isInteger(t)&&!Rf(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */const H2="";function Rk(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=A1(e)),e=kk(t.get(n),e);return A1(e)}function kk(t,e){let n=e;const s=t.length;for(let a=0;a<s;a++){const i=t.charAt(a);switch(i){case"\0":n+="";break;case H2:n+="";break;default:n+=i}}return n}function A1(t){return t+H2+""}/**
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
 */function N1(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function br(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function q2(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class tn{constructor(e,n){this.comparator=e,this.root=n||qn.EMPTY}insert(e,n){return new tn(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,qn.BLACK,null,null))}remove(e){return new tn(this.comparator,this.root.remove(e,this.comparator).copy(null,null,qn.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const a=this.comparator(e,s.key);if(a===0)return n+s.left.size;a<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new hh(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new hh(this.root,e,this.comparator,!1)}getReverseIterator(){return new hh(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new hh(this.root,e,this.comparator,!0)}}class hh{constructor(e,n,s,a){this.isReverse=a,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&a&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class qn{constructor(e,n,s,a,i){this.key=e,this.value=n,this.color=s??qn.RED,this.left=a??qn.EMPTY,this.right=i??qn.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,a,i){return new qn(e??this.key,n??this.value,s??this.color,a??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let a=this;const i=s(e,a.key);return a=i<0?a.copy(null,null,null,a.left.insert(e,n,s),null):i===0?a.copy(null,n,null,null,null):a.copy(null,null,null,null,a.right.insert(e,n,s)),a.fixUp()}removeMin(){if(this.left.isEmpty())return qn.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,a=this;if(n(e,a.key)<0)a.left.isEmpty()||a.left.isRed()||a.left.left.isRed()||(a=a.moveRedLeft()),a=a.copy(null,null,null,a.left.remove(e,n),null);else{if(a.left.isRed()&&(a=a.rotateRight()),a.right.isEmpty()||a.right.isRed()||a.right.left.isRed()||(a=a.moveRedRight()),n(e,a.key)===0){if(a.right.isEmpty())return qn.EMPTY;s=a.right.min(),a=a.copy(s.key,s.value,null,null,a.right.removeMin())}a=a.copy(null,null,null,null,a.right.remove(e,n))}return a.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,qn.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,qn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Ne(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Ne(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Ne(27949);return e+(this.isRed()?0:1)}}qn.EMPTY=null,qn.RED=!0,qn.BLACK=!1;qn.EMPTY=new class{constructor(){this.size=0}get key(){throw Ne(57766)}get value(){throw Ne(16141)}get color(){throw Ne(16727)}get left(){throw Ne(29726)}get right(){throw Ne(36894)}copy(e,n,s,a,i){return this}insert(e,n,s){return new qn(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Cn{constructor(e){this.comparator=e,this.data=new tn(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const a=s.getNext();if(this.comparator(a.key,e[1])>=0)return;n(a.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new R1(this.data.getIterator())}getIteratorFrom(e){return new R1(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof Cn)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const a=n.getNext().key,i=s.getNext().key;if(this.comparator(a,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Cn(this.comparator);return n.data=e,n}}class R1{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class js{constructor(e){this.fields=e,e.sort(Kn.comparator)}static empty(){return new js([])}unionWith(e){let n=new Cn(Kn.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new js(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return pl(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
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
 */class G2 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Wn{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(a){try{return atob(a)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new G2("Invalid base64 string: "+i):i}}(e);return new Wn(n)}static fromUint8Array(e){const n=function(a){let i="";for(let r=0;r<a.length;++r)i+=String.fromCharCode(a[r]);return i}(e);return new Wn(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const s=new Uint8Array(n.length);for(let a=0;a<n.length;a++)s[a]=n.charCodeAt(a);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return nt(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Wn.EMPTY_BYTE_STRING=new Wn("");const Ck=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function hr(t){if(vt(!!t,39018),typeof t=="string"){let e=0;const n=Ck.exec(t);if(vt(!!n,46558,{timestamp:t}),n[1]){let a=n[1];a=(a+"000000000").substr(0,9),e=Number(a)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:hn(t.seconds),nanos:hn(t.nanos)}}function hn(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function fr(t){return typeof t=="string"?Wn.fromBase64String(t):Wn.fromUint8Array(t)}/**
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
 */const Y2="server_timestamp",K2="__type__",Q2="__previous_value__",X2="__local_write_time__";function $g(t){var n,s;return((s=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[K2])==null?void 0:s.stringValue)===Y2}function xd(t){const e=t.mapValue.fields[Q2];return $g(e)?xd(e):e}function nu(t){const e=hr(t.mapValue.fields[X2].timestampValue);return new Ft(e.seconds,e.nanos)}/**
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
 */class Ik{constructor(e,n,s,a,i,r,l,c,h,d,p){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=a,this.ssl=i,this.forceLongPolling=r,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=d,this.apiKey=p}}const kf="(default)";class su{constructor(e,n){this.projectId=e,this.database=n||kf}static empty(){return new su("","")}get isDefaultDatabase(){return this.database===kf}isEqual(e){return e instanceof su&&e.projectId===this.projectId&&e.database===this.database}}function Mk(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new le(q.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new su(t.options.projectId,e)}/**
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
 */const W2="__type__",J2="__max__",fh={mapValue:{fields:{__type__:{stringValue:J2}}}},Z2="__vector__",Cf="value";function dr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?$g(t)?4:Ok(t)?9007199254740991:Dk(t)?10:11:Ne(28295,{value:t})}function Pa(t,e){if(t===e)return!0;const n=dr(t);if(n!==dr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return nu(t).isEqual(nu(e));case 3:return function(a,i){if(typeof a.timestampValue=="string"&&typeof i.timestampValue=="string"&&a.timestampValue.length===i.timestampValue.length)return a.timestampValue===i.timestampValue;const r=hr(a.timestampValue),l=hr(i.timestampValue);return r.seconds===l.seconds&&r.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(a,i){return fr(a.bytesValue).isEqual(fr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(a,i){return hn(a.geoPointValue.latitude)===hn(i.geoPointValue.latitude)&&hn(a.geoPointValue.longitude)===hn(i.geoPointValue.longitude)}(t,e);case 2:return function(a,i){if("integerValue"in a&&"integerValue"in i)return hn(a.integerValue)===hn(i.integerValue);if("doubleValue"in a&&"doubleValue"in i){const r=hn(a.doubleValue),l=hn(i.doubleValue);return r===l?Rf(r)===Rf(l):isNaN(r)&&isNaN(l)}return!1}(t,e);case 9:return pl(t.arrayValue.values||[],e.arrayValue.values||[],Pa);case 10:case 11:return function(a,i){const r=a.mapValue.fields||{},l=i.mapValue.fields||{};if(N1(r)!==N1(l))return!1;for(const c in r)if(r.hasOwnProperty(c)&&(l[c]===void 0||!Pa(r[c],l[c])))return!1;return!0}(t,e);default:return Ne(52216,{left:t})}}function au(t,e){return(t.values||[]).find(n=>Pa(n,e))!==void 0}function gl(t,e){if(t===e)return 0;const n=dr(t),s=dr(e);if(n!==s)return nt(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return nt(t.booleanValue,e.booleanValue);case 2:return function(i,r){const l=hn(i.integerValue||i.doubleValue),c=hn(r.integerValue||r.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return k1(t.timestampValue,e.timestampValue);case 4:return k1(nu(t),nu(e));case 5:return ap(t.stringValue,e.stringValue);case 6:return function(i,r){const l=fr(i),c=fr(r);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,r){const l=i.split("/"),c=r.split("/");for(let h=0;h<l.length&&h<c.length;h++){const d=nt(l[h],c[h]);if(d!==0)return d}return nt(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,r){const l=nt(hn(i.latitude),hn(r.latitude));return l!==0?l:nt(hn(i.longitude),hn(r.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return C1(t.arrayValue,e.arrayValue);case 10:return function(i,r){var g,v,C,I;const l=i.fields||{},c=r.fields||{},h=(g=l[Cf])==null?void 0:g.arrayValue,d=(v=c[Cf])==null?void 0:v.arrayValue,p=nt(((C=h==null?void 0:h.values)==null?void 0:C.length)||0,((I=d==null?void 0:d.values)==null?void 0:I.length)||0);return p!==0?p:C1(h,d)}(t.mapValue,e.mapValue);case 11:return function(i,r){if(i===fh.mapValue&&r===fh.mapValue)return 0;if(i===fh.mapValue)return 1;if(r===fh.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),h=r.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const g=ap(c[p],d[p]);if(g!==0)return g;const v=gl(l[c[p]],h[d[p]]);if(v!==0)return v}return nt(c.length,d.length)}(t.mapValue,e.mapValue);default:throw Ne(23264,{he:n})}}function k1(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return nt(t,e);const n=hr(t),s=hr(e),a=nt(n.seconds,s.seconds);return a!==0?a:nt(n.nanos,s.nanos)}function C1(t,e){const n=t.values||[],s=e.values||[];for(let a=0;a<n.length&&a<s.length;++a){const i=gl(n[a],s[a]);if(i)return i}return nt(n.length,s.length)}function yl(t){return ip(t)}function ip(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const s=hr(n);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return fr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return xe.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let s="[",a=!0;for(const i of n.values||[])a?a=!1:s+=",",s+=ip(i);return s+"]"}(t.arrayValue):"mapValue"in t?function(n){const s=Object.keys(n.fields||{}).sort();let a="{",i=!0;for(const r of s)i?i=!1:a+=",",a+=`${r}:${ip(n.fields[r])}`;return a+"}"}(t.mapValue):Ne(61005,{value:t})}function Vh(t){switch(dr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=xd(t);return e?16+Vh(e):16;case 5:return 2*t.stringValue.length;case 6:return fr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((a,i)=>a+Vh(i),0)}(t.arrayValue);case 10:case 11:return function(s){let a=0;return br(s.fields,(i,r)=>{a+=i.length+Vh(r)}),a}(t.mapValue);default:throw Ne(13486,{value:t})}}function I1(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function rp(t){return!!t&&"integerValue"in t}function Fg(t){return!!t&&"arrayValue"in t}function M1(t){return!!t&&"nullValue"in t}function D1(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Lh(t){return!!t&&"mapValue"in t}function Dk(t){var n,s;return((s=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[W2])==null?void 0:s.stringValue)===Z2}function kc(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return br(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=kc(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=kc(t.arrayValue.values[n]);return e}return{...t}}function Ok(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===J2}/**
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
 */class ws{constructor(e){this.value=e}static empty(){return new ws({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!Lh(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=kc(n)}setAll(e){let n=Kn.emptyPath(),s={},a=[];e.forEach((r,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,s,a),s={},a=[],n=l.popLast()}r?s[l.lastSegment()]=kc(r):a.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,a)}delete(e){const n=this.field(e.popLast());Lh(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Pa(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let a=n.mapValue.fields[e.get(s)];Lh(a)&&a.mapValue.fields||(a={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=a),n=a}return n.mapValue.fields}applyChanges(e,n,s){br(n,(a,i)=>e[a]=i);for(const a of s)delete e[a]}clone(){return new ws(kc(this.value))}}function eE(t){const e=[];return br(t.fields,(n,s)=>{const a=new Kn([n]);if(Lh(s)){const i=eE(s.mapValue).fields;if(i.length===0)e.push(a);else for(const r of i)e.push(a.child(r))}else e.push(a)}),new js(e)}/**
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
 */class is{constructor(e,n,s,a,i,r,l){this.key=e,this.documentType=n,this.version=s,this.readTime=a,this.createTime=i,this.data=r,this.documentState=l}static newInvalidDocument(e){return new is(e,0,je.min(),je.min(),je.min(),ws.empty(),0)}static newFoundDocument(e,n,s,a){return new is(e,1,n,je.min(),s,a,0)}static newNoDocument(e,n){return new is(e,2,n,je.min(),je.min(),ws.empty(),0)}static newUnknownDocument(e,n){return new is(e,3,n,je.min(),je.min(),ws.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(je.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ws.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ws.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=je.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof is&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new is(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class If{constructor(e,n){this.position=e,this.inclusive=n}}function O1(t,e,n){let s=0;for(let a=0;a<t.position.length;a++){const i=e[a],r=t.position[a];if(i.field.isKeyField()?s=xe.comparator(xe.fromName(r.referenceValue),n.key):s=gl(r,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function j1(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Pa(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class Mf{constructor(e,n="asc"){this.field=e,this.dir=n}}function jk(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class tE{}class Tn extends tE{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new Vk(e,n,s):n==="array-contains"?new zk(e,s):n==="in"?new Bk(e,s):n==="not-in"?new $k(e,s):n==="array-contains-any"?new Fk(e,s):new Tn(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new Lk(e,s):new Uk(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(gl(n,this.value)):n!==null&&dr(this.value)===dr(n)&&this.matchesComparison(gl(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Ne(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class pa extends tE{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new pa(e,n)}matches(e){return nE(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function nE(t){return t.op==="and"}function sE(t){return Pk(t)&&nE(t)}function Pk(t){for(const e of t.filters)if(e instanceof pa)return!1;return!0}function op(t){if(t instanceof Tn)return t.field.canonicalString()+t.op.toString()+yl(t.value);if(sE(t))return t.filters.map(e=>op(e)).join(",");{const e=t.filters.map(n=>op(n)).join(",");return`${t.op}(${e})`}}function aE(t,e){return t instanceof Tn?function(s,a){return a instanceof Tn&&s.op===a.op&&s.field.isEqual(a.field)&&Pa(s.value,a.value)}(t,e):t instanceof pa?function(s,a){return a instanceof pa&&s.op===a.op&&s.filters.length===a.filters.length?s.filters.reduce((i,r,l)=>i&&aE(r,a.filters[l]),!0):!1}(t,e):void Ne(19439)}function iE(t){return t instanceof Tn?function(n){return`${n.field.canonicalString()} ${n.op} ${yl(n.value)}`}(t):t instanceof pa?function(n){return n.op.toString()+" {"+n.getFilters().map(iE).join(" ,")+"}"}(t):"Filter"}class Vk extends Tn{constructor(e,n,s){super(e,n,s),this.key=xe.fromName(s.referenceValue)}matches(e){const n=xe.comparator(e.key,this.key);return this.matchesComparison(n)}}class Lk extends Tn{constructor(e,n){super(e,"in",n),this.keys=rE("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Uk extends Tn{constructor(e,n){super(e,"not-in",n),this.keys=rE("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function rE(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(s=>xe.fromName(s.referenceValue))}class zk extends Tn{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Fg(n)&&au(n.arrayValue,this.value)}}class Bk extends Tn{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&au(this.value.arrayValue,n)}}class $k extends Tn{constructor(e,n){super(e,"not-in",n)}matches(e){if(au(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!au(this.value.arrayValue,n)}}class Fk extends Tn{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Fg(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>au(this.value.arrayValue,s))}}/**
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
 */class Hk{constructor(e,n=null,s=[],a=[],i=null,r=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=a,this.limit=i,this.startAt=r,this.endAt=l,this.Te=null}}function P1(t,e=null,n=[],s=[],a=null,i=null,r=null){return new Hk(t,e,n,s,a,i,r)}function Hg(t){const e=Ve(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>op(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),bd(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>yl(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>yl(s)).join(",")),e.Te=n}return e.Te}function qg(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!jk(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!aE(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!j1(t.startAt,e.startAt)&&j1(t.endAt,e.endAt)}function lp(t){return xe.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Su{constructor(e,n=null,s=[],a=[],i=null,r="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=a,this.limit=i,this.limitType=r,this.startAt=l,this.endAt=c,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function qk(t,e,n,s,a,i,r,l){return new Su(t,e,n,s,a,i,r,l)}function _d(t){return new Su(t)}function V1(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Gk(t){return xe.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function oE(t){return t.collectionGroup!==null}function Cc(t){const e=Ve(t);if(e.Ee===null){e.Ee=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),n.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(r){let l=new Cn(Kn.comparator);return r.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Mf(i,s))}),n.has(Kn.keyField().canonicalString())||e.Ee.push(new Mf(Kn.keyField(),s))}return e.Ee}function Ca(t){const e=Ve(t);return e.Ie||(e.Ie=Yk(e,Cc(t))),e.Ie}function Yk(t,e){if(t.limitType==="F")return P1(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(a=>{const i=a.dir==="desc"?"asc":"desc";return new Mf(a.field,i)});const n=t.endAt?new If(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new If(t.startAt.position,t.startAt.inclusive):null;return P1(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}function cp(t,e){const n=t.filters.concat([e]);return new Su(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Df(t,e,n){return new Su(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Td(t,e){return qg(Ca(t),Ca(e))&&t.limitType===e.limitType}function lE(t){return`${Hg(Ca(t))}|lt:${t.limitType}`}function Ro(t){return`Query(target=${function(n){let s=n.path.canonicalString();return n.collectionGroup!==null&&(s+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(s+=`, filters: [${n.filters.map(a=>iE(a)).join(", ")}]`),bd(n.limit)||(s+=", limit: "+n.limit),n.orderBy.length>0&&(s+=`, orderBy: [${n.orderBy.map(a=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(a)).join(", ")}]`),n.startAt&&(s+=", startAt: ",s+=n.startAt.inclusive?"b:":"a:",s+=n.startAt.position.map(a=>yl(a)).join(",")),n.endAt&&(s+=", endAt: ",s+=n.endAt.inclusive?"a:":"b:",s+=n.endAt.position.map(a=>yl(a)).join(",")),`Target(${s})`}(Ca(t))}; limitType=${t.limitType})`}function Ed(t,e){return e.isFoundDocument()&&function(s,a){const i=a.key.path;return s.collectionGroup!==null?a.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):xe.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(t,e)&&function(s,a){for(const i of Cc(s))if(!i.field.isKeyField()&&a.data.field(i.field)===null)return!1;return!0}(t,e)&&function(s,a){for(const i of s.filters)if(!i.matches(a))return!1;return!0}(t,e)&&function(s,a){return!(s.startAt&&!function(r,l,c){const h=O1(r,l,c);return r.inclusive?h<=0:h<0}(s.startAt,Cc(s),a)||s.endAt&&!function(r,l,c){const h=O1(r,l,c);return r.inclusive?h>=0:h>0}(s.endAt,Cc(s),a))}(t,e)}function Kk(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function cE(t){return(e,n)=>{let s=!1;for(const a of Cc(t)){const i=Qk(a,e,n);if(i!==0)return i;s=s||a.field.isKeyField()}return 0}}function Qk(t,e,n){const s=t.field.isKeyField()?xe.comparator(e.key,n.key):function(i,r,l){const c=r.data.field(i),h=l.data.field(i);return c!==null&&h!==null?gl(c,h):Ne(42886)}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return Ne(19790,{direction:t.dir})}}/**
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
 */class lo{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[a,i]of s)if(this.equalsFn(a,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),a=this.inner[s];if(a===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<a.length;i++)if(this.equalsFn(a[i][0],e))return void(a[i]=[e,n]);a.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let a=0;a<s.length;a++)if(this.equalsFn(s[a][0],e))return s.length===1?delete this.inner[n]:s.splice(a,1),this.innerSize--,!0;return!1}forEach(e){br(this.inner,(n,s)=>{for(const[a,i]of s)e(a,i)})}isEmpty(){return q2(this.inner)}size(){return this.innerSize}}/**
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
 */const Xk=new tn(xe.comparator);function yi(){return Xk}const uE=new tn(xe.comparator);function uc(...t){let e=uE;for(const n of t)e=e.insert(n.key,n);return e}function hE(t){let e=uE;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function Lr(){return Ic()}function fE(){return Ic()}function Ic(){return new lo(t=>t.toString(),(t,e)=>t.isEqual(e))}const Wk=new tn(xe.comparator),Jk=new Cn(xe.comparator);function st(...t){let e=Jk;for(const n of t)e=e.add(n);return e}const Zk=new Cn(nt);function eC(){return Zk}/**
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
 */function Gg(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Rf(e)?"-0":e}}function dE(t){return{integerValue:""+t}}function tC(t,e){return Nk(e)?dE(e):Gg(t,e)}/**
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
 */class wd{constructor(){this._=void 0}}function nC(t,e,n){return t instanceof Of?function(a,i){const r={fields:{[K2]:{stringValue:Y2},[X2]:{timestampValue:{seconds:a.seconds,nanos:a.nanoseconds}}}};return i&&$g(i)&&(i=xd(i)),i&&(r.fields[Q2]=i),{mapValue:r}}(n,e):t instanceof vl?pE(t,e):t instanceof iu?gE(t,e):function(a,i){const r=mE(a,i),l=L1(r)+L1(a.Ae);return rp(r)&&rp(a.Ae)?dE(l):Gg(a.serializer,l)}(t,e)}function sC(t,e,n){return t instanceof vl?pE(t,e):t instanceof iu?gE(t,e):n}function mE(t,e){return t instanceof jf?function(s){return rp(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class Of extends wd{}class vl extends wd{constructor(e){super(),this.elements=e}}function pE(t,e){const n=yE(e);for(const s of t.elements)n.some(a=>Pa(a,s))||n.push(s);return{arrayValue:{values:n}}}class iu extends wd{constructor(e){super(),this.elements=e}}function gE(t,e){let n=yE(e);for(const s of t.elements)n=n.filter(a=>!Pa(a,s));return{arrayValue:{values:n}}}class jf extends wd{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function L1(t){return hn(t.integerValue||t.doubleValue)}function yE(t){return Fg(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class aC{constructor(e,n){this.field=e,this.transform=n}}function iC(t,e){return t.field.isEqual(e.field)&&function(s,a){return s instanceof vl&&a instanceof vl||s instanceof iu&&a instanceof iu?pl(s.elements,a.elements,Pa):s instanceof jf&&a instanceof jf?Pa(s.Ae,a.Ae):s instanceof Of&&a instanceof Of}(t.transform,e.transform)}class rC{constructor(e,n){this.version=e,this.transformResults=n}}class Ia{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ia}static exists(e){return new Ia(void 0,e)}static updateTime(e){return new Ia(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Uh(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Sd{}function vE(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new xE(t.key,Ia.none()):new Au(t.key,t.data,Ia.none());{const n=t.data,s=ws.empty();let a=new Cn(Kn.comparator);for(let i of e.fields)if(!a.has(i)){let r=n.field(i);r===null&&i.length>1&&(i=i.popLast(),r=n.field(i)),r===null?s.delete(i):s.set(i,r),a=a.add(i)}return new xr(t.key,s,new js(a.toArray()),Ia.none())}}function oC(t,e,n){t instanceof Au?function(a,i,r){const l=a.value.clone(),c=z1(a.fieldTransforms,i,r.transformResults);l.setAll(c),i.convertToFoundDocument(r.version,l).setHasCommittedMutations()}(t,e,n):t instanceof xr?function(a,i,r){if(!Uh(a.precondition,i))return void i.convertToUnknownDocument(r.version);const l=z1(a.fieldTransforms,i,r.transformResults),c=i.data;c.setAll(bE(a)),c.setAll(l),i.convertToFoundDocument(r.version,c).setHasCommittedMutations()}(t,e,n):function(a,i,r){i.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}function Mc(t,e,n,s){return t instanceof Au?function(i,r,l,c){if(!Uh(i.precondition,r))return l;const h=i.value.clone(),d=B1(i.fieldTransforms,c,r);return h.setAll(d),r.convertToFoundDocument(r.version,h).setHasLocalMutations(),null}(t,e,n,s):t instanceof xr?function(i,r,l,c){if(!Uh(i.precondition,r))return l;const h=B1(i.fieldTransforms,c,r),d=r.data;return d.setAll(bE(i)),d.setAll(h),r.convertToFoundDocument(r.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,s):function(i,r,l){return Uh(i.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):l}(t,e,n)}function lC(t,e){let n=null;for(const s of t.fieldTransforms){const a=e.data.field(s.field),i=mE(s.transform,a||null);i!=null&&(n===null&&(n=ws.empty()),n.set(s.field,i))}return n||null}function U1(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(s,a){return s===void 0&&a===void 0||!(!s||!a)&&pl(s,a,(i,r)=>iC(i,r))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Au extends Sd{constructor(e,n,s,a=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=a,this.type=0}getFieldMask(){return null}}class xr extends Sd{constructor(e,n,s,a,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=a,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function bE(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function z1(t,e,n){const s=new Map;vt(t.length===n.length,32656,{Ve:n.length,de:t.length});for(let a=0;a<n.length;a++){const i=t[a],r=i.transform,l=e.data.field(i.field);s.set(i.field,sC(r,l,n[a]))}return s}function B1(t,e,n){const s=new Map;for(const a of t){const i=a.transform,r=n.data.field(a.field);s.set(a.field,nC(i,r,e))}return s}class xE extends Sd{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class cC extends Sd{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class uC{constructor(e,n,s,a){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=a}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let a=0;a<this.mutations.length;a++){const i=this.mutations[a];i.key.isEqual(e.key)&&oC(i,e,s[a])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=Mc(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=Mc(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=fE();return this.mutations.forEach(a=>{const i=e.get(a.key),r=i.overlayedDocument;let l=this.applyToLocalView(r,i.mutatedFields);l=n.has(a.key)?null:l;const c=vE(r,l);c!==null&&s.set(a.key,c),r.isValidDocument()||r.convertToNoDocument(je.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),st())}isEqual(e){return this.batchId===e.batchId&&pl(this.mutations,e.mutations,(n,s)=>U1(n,s))&&pl(this.baseMutations,e.baseMutations,(n,s)=>U1(n,s))}}class Yg{constructor(e,n,s,a){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=a}static from(e,n,s){vt(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let a=function(){return Wk}();const i=e.mutations;for(let r=0;r<i.length;r++)a=a.insert(i[r].key,s[r].version);return new Yg(e,n,s,a)}}/**
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
 */class hC{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class fC{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var yn,ct;function dC(t){switch(t){case q.OK:return Ne(64938);case q.CANCELLED:case q.UNKNOWN:case q.DEADLINE_EXCEEDED:case q.RESOURCE_EXHAUSTED:case q.INTERNAL:case q.UNAVAILABLE:case q.UNAUTHENTICATED:return!1;case q.INVALID_ARGUMENT:case q.NOT_FOUND:case q.ALREADY_EXISTS:case q.PERMISSION_DENIED:case q.FAILED_PRECONDITION:case q.ABORTED:case q.OUT_OF_RANGE:case q.UNIMPLEMENTED:case q.DATA_LOSS:return!0;default:return Ne(15467,{code:t})}}function _E(t){if(t===void 0)return gi("GRPC error has no .code"),q.UNKNOWN;switch(t){case yn.OK:return q.OK;case yn.CANCELLED:return q.CANCELLED;case yn.UNKNOWN:return q.UNKNOWN;case yn.DEADLINE_EXCEEDED:return q.DEADLINE_EXCEEDED;case yn.RESOURCE_EXHAUSTED:return q.RESOURCE_EXHAUSTED;case yn.INTERNAL:return q.INTERNAL;case yn.UNAVAILABLE:return q.UNAVAILABLE;case yn.UNAUTHENTICATED:return q.UNAUTHENTICATED;case yn.INVALID_ARGUMENT:return q.INVALID_ARGUMENT;case yn.NOT_FOUND:return q.NOT_FOUND;case yn.ALREADY_EXISTS:return q.ALREADY_EXISTS;case yn.PERMISSION_DENIED:return q.PERMISSION_DENIED;case yn.FAILED_PRECONDITION:return q.FAILED_PRECONDITION;case yn.ABORTED:return q.ABORTED;case yn.OUT_OF_RANGE:return q.OUT_OF_RANGE;case yn.UNIMPLEMENTED:return q.UNIMPLEMENTED;case yn.DATA_LOSS:return q.DATA_LOSS;default:return Ne(39323,{code:t})}}(ct=yn||(yn={}))[ct.OK=0]="OK",ct[ct.CANCELLED=1]="CANCELLED",ct[ct.UNKNOWN=2]="UNKNOWN",ct[ct.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ct[ct.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ct[ct.NOT_FOUND=5]="NOT_FOUND",ct[ct.ALREADY_EXISTS=6]="ALREADY_EXISTS",ct[ct.PERMISSION_DENIED=7]="PERMISSION_DENIED",ct[ct.UNAUTHENTICATED=16]="UNAUTHENTICATED",ct[ct.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ct[ct.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ct[ct.ABORTED=10]="ABORTED",ct[ct.OUT_OF_RANGE=11]="OUT_OF_RANGE",ct[ct.UNIMPLEMENTED=12]="UNIMPLEMENTED",ct[ct.INTERNAL=13]="INTERNAL",ct[ct.UNAVAILABLE=14]="UNAVAILABLE",ct[ct.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function mC(){return new TextEncoder}/**
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
 */const pC=new tr([4294967295,4294967295],0);function $1(t){const e=mC().encode(t),n=new O2;return n.update(e),new Uint8Array(n.digest())}function F1(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),a=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new tr([n,s],0),new tr([a,i],0)]}class Kg{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new hc(`Invalid padding: ${n}`);if(s<0)throw new hc(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new hc(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new hc(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=tr.fromNumber(this.ge)}ye(e,n,s){let a=e.add(n.multiply(tr.fromNumber(s)));return a.compare(pC)===1&&(a=new tr([a.getBits(0),a.getBits(1)],0)),a.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=$1(e),[s,a]=F1(n);for(let i=0;i<this.hashCount;i++){const r=this.ye(s,a,i);if(!this.we(r))return!1}return!0}static create(e,n,s){const a=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),r=new Kg(i,a,n);return s.forEach(l=>r.insert(l)),r}insert(e){if(this.ge===0)return;const n=$1(e),[s,a]=F1(n);for(let i=0;i<this.hashCount;i++){const r=this.ye(s,a,i);this.Se(r)}}Se(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class hc extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ad{constructor(e,n,s,a,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=a,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const a=new Map;return a.set(e,Nu.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new Ad(je.min(),a,new tn(nt),yi(),st())}}class Nu{constructor(e,n,s,a,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=a,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new Nu(s,n,st(),st(),st())}}/**
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
 */class zh{constructor(e,n,s,a){this.be=e,this.removedTargetIds=n,this.key=s,this.De=a}}class TE{constructor(e,n){this.targetId=e,this.Ce=n}}class EE{constructor(e,n,s=Wn.EMPTY_BYTE_STRING,a=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=a}}class H1{constructor(){this.ve=0,this.Fe=q1(),this.Me=Wn.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=st(),n=st(),s=st();return this.Fe.forEach((a,i)=>{switch(i){case 0:e=e.add(a);break;case 2:n=n.add(a);break;case 1:s=s.add(a);break;default:Ne(38017,{changeType:i})}}),new Nu(this.Me,this.xe,e,n,s)}qe(){this.Oe=!1,this.Fe=q1()}Ke(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,vt(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class gC{constructor(e){this.Ge=e,this.ze=new Map,this.je=yi(),this.Je=dh(),this.He=dh(),this.Ze=new tn(nt)}Xe(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Ye(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const s=this.nt(n);switch(e.state){case 0:this.rt(n)&&s.Le(e.resumeToken);break;case 1:s.We(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.We(),s.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(s.Qe(),s.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),s.Le(e.resumeToken));break;default:Ne(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((s,a)=>{this.rt(a)&&n(a)})}st(e){const n=e.targetId,s=e.Ce.count,a=this.ot(n);if(a){const i=a.target;if(lp(i))if(s===0){const r=new xe(i.path);this.et(n,r,is.newNoDocument(r,je.min()))}else vt(s===1,20013,{expectedCount:s});else{const r=this._t(n);if(r!==s){const l=this.ut(e),c=l?this.ct(l,e,r):1;if(c!==0){this.it(n);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(n,h)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:s="",padding:a=0},hashCount:i=0}=n;let r,l;try{r=fr(s).toUint8Array()}catch(c){if(c instanceof G2)return Zr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Kg(r,a,i)}catch(c){return Zr(c instanceof hc?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,n,s){return n.Ce.count===s-this.Pt(e,n.targetId)?0:2}Pt(e,n){const s=this.Ge.getRemoteKeysForTarget(n);let a=0;return s.forEach(i=>{const r=this.Ge.ht(),l=`projects/${r.projectId}/databases/${r.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(n,i,null),a++)}),a}Tt(e){const n=new Map;this.ze.forEach((i,r)=>{const l=this.ot(r);if(l){if(i.current&&lp(l.target)){const c=new xe(l.target.path);this.Et(c).has(r)||this.It(r,c)||this.et(r,c,is.newNoDocument(c,e))}i.Be&&(n.set(r,i.ke()),i.qe())}});let s=st();this.He.forEach((i,r)=>{let l=!0;r.forEachWhile(c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(s=s.add(i))}),this.je.forEach((i,r)=>r.setReadTime(e));const a=new Ad(e,n,this.Ze,this.je,s);return this.je=yi(),this.Je=dh(),this.He=dh(),this.Ze=new tn(nt),a}Ye(e,n){if(!this.rt(e))return;const s=this.It(e,n.key)?2:0;this.nt(e).Ke(n.key,s),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.Et(n.key).add(e)),this.He=this.He.insert(n.key,this.Rt(n.key).add(e))}et(e,n,s){if(!this.rt(e))return;const a=this.nt(e);this.It(e,n)?a.Ke(n,1):a.Ue(n),this.He=this.He.insert(n,this.Rt(n).delete(e)),this.He=this.He.insert(n,this.Rt(n).add(e)),s&&(this.je=this.je.insert(n,s))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let n=this.ze.get(e);return n||(n=new H1,this.ze.set(e,n)),n}Rt(e){let n=this.He.get(e);return n||(n=new Cn(nt),this.He=this.He.insert(e,n)),n}Et(e){let n=this.Je.get(e);return n||(n=new Cn(nt),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||de("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new H1),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}It(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function dh(){return new tn(xe.comparator)}function q1(){return new tn(xe.comparator)}const yC=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),vC=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),bC=(()=>({and:"AND",or:"OR"}))();class xC{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function up(t,e){return t.useProto3Json||bd(e)?e:{value:e}}function Pf(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function wE(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function _C(t,e){return Pf(t,e.toTimestamp())}function Ma(t){return vt(!!t,49232),je.fromTimestamp(function(n){const s=hr(n);return new Ft(s.seconds,s.nanos)}(t))}function Qg(t,e){return hp(t,e).canonicalString()}function hp(t,e){const n=function(a){return new Vt(["projects",a.projectId,"databases",a.database])}(t).child("documents");return e===void 0?n:n.child(e)}function SE(t){const e=Vt.fromString(t);return vt(CE(e),10190,{key:e.toString()}),e}function fp(t,e){return Qg(t.databaseId,e.path)}function Pm(t,e){const n=SE(e);if(n.get(1)!==t.databaseId.projectId)throw new le(q.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new le(q.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new xe(NE(n))}function AE(t,e){return Qg(t.databaseId,e)}function TC(t){const e=SE(t);return e.length===4?Vt.emptyPath():NE(e)}function dp(t){return new Vt(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function NE(t){return vt(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function G1(t,e,n){return{name:fp(t,e),fields:n.value.mapValue.fields}}function EC(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:Ne(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),a=e.targetChange.targetIds||[],i=function(h,d){return h.useProto3Json?(vt(d===void 0||typeof d=="string",58123),Wn.fromBase64String(d||"")):(vt(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Wn.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),r=e.targetChange.cause,l=r&&function(h){const d=h.code===void 0?q.UNKNOWN:_E(h.code);return new le(d,h.message||"")}(r);n=new EE(s,a,i,l||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const a=Pm(t,s.document.name),i=Ma(s.document.updateTime),r=s.document.createTime?Ma(s.document.createTime):je.min(),l=new ws({mapValue:{fields:s.document.fields}}),c=is.newFoundDocument(a,i,r,l),h=s.targetIds||[],d=s.removedTargetIds||[];n=new zh(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const a=Pm(t,s.document),i=s.readTime?Ma(s.readTime):je.min(),r=is.newNoDocument(a,i),l=s.removedTargetIds||[];n=new zh([],l,r.key,r)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const a=Pm(t,s.document),i=s.removedTargetIds||[];n=new zh([],i,a,null)}else{if(!("filter"in e))return Ne(11601,{Vt:e});{e.filter;const s=e.filter;s.targetId;const{count:a=0,unchangedNames:i}=s,r=new fC(a,i),l=s.targetId;n=new TE(l,r)}}return n}function wC(t,e){let n;if(e instanceof Au)n={update:G1(t,e.key,e.value)};else if(e instanceof xE)n={delete:fp(t,e.key)};else if(e instanceof xr)n={update:G1(t,e.key,e.data),updateMask:DC(e.fieldMask)};else{if(!(e instanceof cC))return Ne(16599,{dt:e.type});n={verify:fp(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(i,r){const l=r.transform;if(l instanceof Of)return{fieldPath:r.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof vl)return{fieldPath:r.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof iu)return{fieldPath:r.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof jf)return{fieldPath:r.field.canonicalString(),increment:l.Ae};throw Ne(20930,{transform:r.transform})}(0,s))),e.precondition.isNone||(n.currentDocument=function(a,i){return i.updateTime!==void 0?{updateTime:_C(a,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Ne(27497)}(t,e.precondition)),n}function SC(t,e){return t&&t.length>0?(vt(e!==void 0,14353),t.map(n=>function(a,i){let r=a.updateTime?Ma(a.updateTime):Ma(i);return r.isEqual(je.min())&&(r=Ma(i)),new rC(r,a.transformResults||[])}(n,e))):[]}function AC(t,e){return{documents:[AE(t,e.path)]}}function NC(t,e){const n={structuredQuery:{}},s=e.path;let a;e.collectionGroup!==null?(a=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(a=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=AE(t,a);const i=function(h){if(h.length!==0)return kE(pa.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const r=function(h){if(h.length!==0)return h.map(d=>function(g){return{field:ko(g.field),direction:CC(g.dir)}}(d))}(e.orderBy);r&&(n.structuredQuery.orderBy=r);const l=up(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:n,parent:a}}function RC(t){let e=TC(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let a=null;if(s>0){vt(s===1,65062);const d=n.from[0];d.allDescendants?a=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const g=RE(p);return g instanceof pa&&sE(g)?g.getFilters():[g]}(n.where));let r=[];n.orderBy&&(r=function(p){return p.map(g=>function(C){return new Mf(Co(C.field),function(j){switch(j){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(p){let g;return g=typeof p=="object"?p.value:p,bd(g)?null:g}(n.limit));let c=null;n.startAt&&(c=function(p){const g=!!p.before,v=p.values||[];return new If(v,g)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const g=!p.before,v=p.values||[];return new If(v,g)}(n.endAt)),qk(e,a,r,i,l,"F",c,h)}function kC(t,e){const n=function(a){switch(a){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Ne(28987,{purpose:a})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function RE(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const s=Co(n.unaryFilter.field);return Tn.create(s,"==",{doubleValue:NaN});case"IS_NULL":const a=Co(n.unaryFilter.field);return Tn.create(a,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Co(n.unaryFilter.field);return Tn.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=Co(n.unaryFilter.field);return Tn.create(r,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Ne(61313);default:return Ne(60726)}}(t):t.fieldFilter!==void 0?function(n){return Tn.create(Co(n.fieldFilter.field),function(a){switch(a){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Ne(58110);default:return Ne(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return pa.create(n.compositeFilter.filters.map(s=>RE(s)),function(a){switch(a){case"AND":return"and";case"OR":return"or";default:return Ne(1026)}}(n.compositeFilter.op))}(t):Ne(30097,{filter:t})}function CC(t){return yC[t]}function IC(t){return vC[t]}function MC(t){return bC[t]}function ko(t){return{fieldPath:t.canonicalString()}}function Co(t){return Kn.fromServerFormat(t.fieldPath)}function kE(t){return t instanceof Tn?function(n){if(n.op==="=="){if(D1(n.value))return{unaryFilter:{field:ko(n.field),op:"IS_NAN"}};if(M1(n.value))return{unaryFilter:{field:ko(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(D1(n.value))return{unaryFilter:{field:ko(n.field),op:"IS_NOT_NAN"}};if(M1(n.value))return{unaryFilter:{field:ko(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ko(n.field),op:IC(n.op),value:n.value}}}(t):t instanceof pa?function(n){const s=n.getFilters().map(a=>kE(a));return s.length===1?s[0]:{compositeFilter:{op:MC(n.op),filters:s}}}(t):Ne(54877,{filter:t})}function DC(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function CE(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}function IE(t){return!!t&&typeof t._toProto=="function"&&t._protoValueType==="ProtoValue"}/**
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
 */class $i{constructor(e,n,s,a,i=je.min(),r=je.min(),l=Wn.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=a,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new $i(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new $i(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new $i(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new $i(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class OC{constructor(e){this.yt=e}}function jC(t){const e=RC({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Df(e,e.limit,"L"):e}/**
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
 */class PC{constructor(){this.bn=new VC}addToCollectionParentIndex(e,n){return this.bn.add(n),K.resolve()}getCollectionParents(e,n){return K.resolve(this.bn.getEntries(n))}addFieldIndex(e,n){return K.resolve()}deleteFieldIndex(e,n){return K.resolve()}deleteAllFieldIndexes(e){return K.resolve()}createTargetIndexes(e,n){return K.resolve()}getDocumentsMatchingTarget(e,n){return K.resolve(null)}getIndexType(e,n){return K.resolve(0)}getFieldIndexes(e,n){return K.resolve([])}getNextCollectionGroupToUpdate(e){return K.resolve(null)}getMinOffset(e,n){return K.resolve(ur.min())}getMinOffsetFromCollectionGroup(e,n){return K.resolve(ur.min())}updateCollectionGroup(e,n,s){return K.resolve()}updateIndexEntries(e,n){return K.resolve()}}class VC{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),a=this.index[n]||new Cn(Vt.comparator),i=!a.has(s);return this.index[n]=a.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),a=this.index[n];return a&&a.has(s)}getEntries(e){return(this.index[e]||new Cn(Vt.comparator)).toArray()}}/**
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
 */const Y1={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ME=41943040;class Es{static withCacheSize(e){return new Es(e,Es.DEFAULT_COLLECTION_PERCENTILE,Es.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=s}}/**
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
 */Es.DEFAULT_COLLECTION_PERCENTILE=10,Es.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Es.DEFAULT=new Es(ME,Es.DEFAULT_COLLECTION_PERCENTILE,Es.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Es.DISABLED=new Es(-1,0,0);/**
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
 */class bl{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new bl(0)}static ar(){return new bl(-1)}}/**
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
 */const K1="LruGarbageCollector",LC=1048576;function Q1([t,e],[n,s]){const a=nt(t,n);return a===0?nt(e,s):a}class UC{constructor(e){this.Pr=e,this.buffer=new Cn(Q1),this.Tr=0}Er(){return++this.Tr}Ir(e){const n=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(n);else{const s=this.buffer.last();Q1(n,s)<0&&(this.buffer=this.buffer.delete(s).add(n))}}get maxValue(){return this.buffer.last()[0]}}class zC{constructor(e,n,s){this.garbageCollector=e,this.asyncQueue=n,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){de(K1,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Pl(n)?de(K1,"Ignoring IndexedDB error during garbage collection: ",n):await jl(n)}await this.Ar(3e5)})}}class BC{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.dr(e).next(s=>Math.floor(n/100*s))}nthSequenceNumber(e,n){if(n===0)return K.resolve(vd.ce);const s=new UC(n);return this.Vr.forEachTarget(e,a=>s.Ir(a.sequenceNumber)).next(()=>this.Vr.mr(e,a=>s.Ir(a))).next(()=>s.maxValue)}removeTargets(e,n,s){return this.Vr.removeTargets(e,n,s)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(de("LruGarbageCollector","Garbage collection skipped; disabled"),K.resolve(Y1)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?(de("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Y1):this.gr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,n){let s,a,i,r,l,c,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(de("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),a=this.params.maximumSequenceNumbersToCollect):a=p,r=Date.now(),this.nthSequenceNumber(e,a))).next(p=>(s=p,l=Date.now(),this.removeTargets(e,s,n))).next(p=>(i=p,c=Date.now(),this.removeOrphanedDocuments(e,s))).next(p=>(h=Date.now(),No()<=tt.DEBUG&&de("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${r-d}ms
	Determined least recently used ${a} in `+(l-r)+`ms
	Removed ${i} targets in `+(c-l)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-d}ms`),K.resolve({didRun:!0,sequenceNumbersCollected:a,targetsRemoved:i,documentsRemoved:p})))}}function $C(t,e){return new BC(t,e)}/**
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
 */class FC{constructor(){this.changes=new lo(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,is.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?K.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class HC{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class qC{constructor(e,n,s,a){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=a}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(a=>(s=a,this.remoteDocumentCache.getEntry(e,n))).next(a=>(s!==null&&Mc(s.mutation,a,js.empty(),Ft.now()),a))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,st()).next(()=>s))}getLocalViewOfDocuments(e,n,s=st()){const a=Lr();return this.populateOverlays(e,a,n).next(()=>this.computeViews(e,n,a,s).next(i=>{let r=uc();return i.forEach((l,c)=>{r=r.insert(l,c.overlayedDocument)}),r}))}getOverlayedDocuments(e,n){const s=Lr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,st()))}populateOverlays(e,n,s){const a=[];return s.forEach(i=>{n.has(i)||a.push(i)}),this.documentOverlayCache.getOverlays(e,a).next(i=>{i.forEach((r,l)=>{n.set(r,l)})})}computeViews(e,n,s,a){let i=yi();const r=Ic(),l=function(){return Ic()}();return n.forEach((c,h)=>{const d=s.get(h.key);a.has(h.key)&&(d===void 0||d.mutation instanceof xr)?i=i.insert(h.key,h):d!==void 0?(r.set(h.key,d.mutation.getFieldMask()),Mc(d.mutation,h,d.mutation.getFieldMask(),Ft.now())):r.set(h.key,js.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,d)=>r.set(h,d)),n.forEach((h,d)=>l.set(h,new HC(d,r.get(h)??null))),l))}recalculateAndSaveOverlays(e,n){const s=Ic();let a=new tn((r,l)=>r-l),i=st();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(r=>{for(const l of r)l.keys().forEach(c=>{const h=n.get(c);if(h===null)return;let d=s.get(c)||js.empty();d=l.applyToLocalView(h,d),s.set(c,d);const p=(a.get(l.batchId)||st()).add(c);a=a.insert(l.batchId,p)})}).next(()=>{const r=[],l=a.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,d=c.value,p=fE();d.forEach(g=>{if(!i.has(g)){const v=vE(n.get(g),s.get(g));v!==null&&p.set(g,v),i=i.add(g)}}),r.push(this.documentOverlayCache.saveOverlays(e,h,p))}return K.waitFor(r)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s,a){return Gk(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):oE(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s,a):this.getDocumentsMatchingCollectionQuery(e,n,s,a)}getNextDocuments(e,n,s,a){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,a).next(i=>{const r=a-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,a-i.size):K.resolve(Lr());let l=tu,c=i;return r.next(h=>K.forEach(h,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?K.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{c=c.insert(d,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,st())).next(d=>({batchId:l,changes:hE(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new xe(n)).next(s=>{let a=uc();return s.isFoundDocument()&&(a=a.insert(s.key,s)),a})}getDocumentsMatchingCollectionGroupQuery(e,n,s,a){const i=n.collectionGroup;let r=uc();return this.indexManager.getCollectionParents(e,i).next(l=>K.forEach(l,c=>{const h=function(p,g){return new Su(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,s,a).next(d=>{d.forEach((p,g)=>{r=r.insert(p,g)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(e,n,s,a){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(r=>(i=r,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,i,a))).next(r=>{i.forEach((c,h)=>{const d=h.getKey();r.get(d)===null&&(r=r.insert(d,is.newInvalidDocument(d)))});let l=uc();return r.forEach((c,h)=>{const d=i.get(c);d!==void 0&&Mc(d.mutation,h,js.empty(),Ft.now()),Ed(n,h)&&(l=l.insert(c,h))}),l})}}/**
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
 */class GC{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,n){return K.resolve(this.Nr.get(n))}saveBundleMetadata(e,n){return this.Nr.set(n.id,function(a){return{id:a.id,version:a.version,createTime:Ma(a.createTime)}}(n)),K.resolve()}getNamedQuery(e,n){return K.resolve(this.Br.get(n))}saveNamedQuery(e,n){return this.Br.set(n.name,function(a){return{name:a.name,query:jC(a.bundledQuery),readTime:Ma(a.readTime)}}(n)),K.resolve()}}/**
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
 */class YC{constructor(){this.overlays=new tn(xe.comparator),this.Lr=new Map}getOverlay(e,n){return K.resolve(this.overlays.get(n))}getOverlays(e,n){const s=Lr();return K.forEach(n,a=>this.getOverlay(e,a).next(i=>{i!==null&&s.set(a,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((a,i)=>{this.St(e,n,i)}),K.resolve()}removeOverlaysForBatchId(e,n,s){const a=this.Lr.get(s);return a!==void 0&&(a.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(s)),K.resolve()}getOverlaysForCollection(e,n,s){const a=Lr(),i=n.length+1,r=new xe(n.child("")),l=this.overlays.getIteratorFrom(r);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>s&&a.set(c.getKey(),c)}return K.resolve(a)}getOverlaysForCollectionGroup(e,n,s,a){let i=new tn((h,d)=>h-d);const r=this.overlays.getIterator();for(;r.hasNext();){const h=r.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>s){let d=i.get(h.largestBatchId);d===null&&(d=Lr(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const l=Lr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,d)=>l.set(h,d)),!(l.size()>=a)););return K.resolve(l)}St(e,n,s){const a=this.overlays.get(s.key);if(a!==null){const r=this.Lr.get(a.largestBatchId).delete(s.key);this.Lr.set(a.largestBatchId,r)}this.overlays=this.overlays.insert(s.key,new hC(n,s));let i=this.Lr.get(n);i===void 0&&(i=st(),this.Lr.set(n,i)),this.Lr.set(n,i.add(s.key))}}/**
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
 */class KC{constructor(){this.sessionToken=Wn.EMPTY_BYTE_STRING}getSessionToken(e){return K.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,K.resolve()}}/**
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
 */class Xg{constructor(){this.kr=new Cn(Pn.qr),this.Kr=new Cn(Pn.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,n){const s=new Pn(e,n);this.kr=this.kr.add(s),this.Kr=this.Kr.add(s)}$r(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.Wr(new Pn(e,n))}Qr(e,n){e.forEach(s=>this.removeReference(s,n))}Gr(e){const n=new xe(new Vt([])),s=new Pn(n,e),a=new Pn(n,e+1),i=[];return this.Kr.forEachInRange([s,a],r=>{this.Wr(r),i.push(r.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const n=new xe(new Vt([])),s=new Pn(n,e),a=new Pn(n,e+1);let i=st();return this.Kr.forEachInRange([s,a],r=>{i=i.add(r.key)}),i}containsKey(e){const n=new Pn(e,0),s=this.kr.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class Pn{constructor(e,n){this.key=e,this.Jr=n}static qr(e,n){return xe.comparator(e.key,n.key)||nt(e.Jr,n.Jr)}static Ur(e,n){return nt(e.Jr,n.Jr)||xe.comparator(e.key,n.key)}}/**
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
 */class QC{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Yn=1,this.Hr=new Cn(Pn.qr)}checkEmpty(e){return K.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,a){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new uC(i,n,s,a);this.mutationQueue.push(r);for(const l of a)this.Hr=this.Hr.add(new Pn(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return K.resolve(r)}lookupMutationBatch(e,n){return K.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,a=this.Xr(s),i=a<0?0:a;return K.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return K.resolve(this.mutationQueue.length===0?Bg:this.Yn-1)}getAllMutationBatches(e){return K.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new Pn(n,0),a=new Pn(n,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([s,a],r=>{const l=this.Zr(r.Jr);i.push(l)}),K.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new Cn(nt);return n.forEach(a=>{const i=new Pn(a,0),r=new Pn(a,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,r],l=>{s=s.add(l.Jr)})}),K.resolve(this.Yr(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,a=s.length+1;let i=s;xe.isDocumentKey(i)||(i=i.child(""));const r=new Pn(new xe(i),0);let l=new Cn(nt);return this.Hr.forEachWhile(c=>{const h=c.key.path;return!!s.isPrefixOf(h)&&(h.length===a&&(l=l.add(c.Jr)),!0)},r),K.resolve(this.Yr(l))}Yr(e){const n=[];return e.forEach(s=>{const a=this.Zr(s);a!==null&&n.push(a)}),n}removeMutationBatch(e,n){vt(this.ei(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Hr;return K.forEach(n.mutations,a=>{const i=new Pn(a.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,a.key)}).next(()=>{this.Hr=s})}nr(e){}containsKey(e,n){const s=new Pn(n,0),a=this.Hr.firstAfterOrEqual(s);return K.resolve(n.isEqual(a&&a.key))}performConsistencyCheck(e){return this.mutationQueue.length,K.resolve()}ei(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class XC{constructor(e){this.ti=e,this.docs=function(){return new tn(xe.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,a=this.docs.get(s),i=a?a.size:0,r=this.ti(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:r}),this.size+=r-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return K.resolve(s?s.document.mutableCopy():is.newInvalidDocument(n))}getEntries(e,n){let s=yi();return n.forEach(a=>{const i=this.docs.get(a);s=s.insert(a,i?i.document.mutableCopy():is.newInvalidDocument(a))}),K.resolve(s)}getDocumentsMatchingQuery(e,n,s,a){let i=yi();const r=n.path,l=new xe(r.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!r.isPrefixOf(h.path))break;h.path.length>r.length+1||Ek(Tk(d),s)<=0||(a.has(d.key)||Ed(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return K.resolve(i)}getAllFromCollectionGroup(e,n,s,a){Ne(9500)}ni(e,n){return K.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new WC(this)}getSize(e){return K.resolve(this.size)}}class WC extends FC{constructor(e){super(),this.Mr=e}applyChanges(e){const n=[];return this.changes.forEach((s,a)=>{a.isValidDocument()?n.push(this.Mr.addEntry(e,a)):this.Mr.removeEntry(s)}),K.waitFor(n)}getFromCache(e,n){return this.Mr.getEntry(e,n)}getAllFromCache(e,n){return this.Mr.getEntries(e,n)}}/**
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
 */class JC{constructor(e){this.persistence=e,this.ri=new lo(n=>Hg(n),qg),this.lastRemoteSnapshotVersion=je.min(),this.highestTargetId=0,this.ii=0,this.si=new Xg,this.targetCount=0,this.oi=bl._r()}forEachTarget(e,n){return this.ri.forEach((s,a)=>n(a)),K.resolve()}getLastRemoteSnapshotVersion(e){return K.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return K.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),K.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.ii&&(this.ii=n),K.resolve()}lr(e){this.ri.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.oi=new bl(n),this.highestTargetId=n),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,n){return this.lr(n),this.targetCount+=1,K.resolve()}updateTargetData(e,n){return this.lr(n),K.resolve()}removeTargetData(e,n){return this.ri.delete(n.target),this.si.Gr(n.targetId),this.targetCount-=1,K.resolve()}removeTargets(e,n,s){let a=0;const i=[];return this.ri.forEach((r,l)=>{l.sequenceNumber<=n&&s.get(l.targetId)===null&&(this.ri.delete(r),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),a++)}),K.waitFor(i).next(()=>a)}getTargetCount(e){return K.resolve(this.targetCount)}getTargetData(e,n){const s=this.ri.get(n)||null;return K.resolve(s)}addMatchingKeys(e,n,s){return this.si.$r(n,s),K.resolve()}removeMatchingKeys(e,n,s){this.si.Qr(n,s);const a=this.persistence.referenceDelegate,i=[];return a&&n.forEach(r=>{i.push(a.markPotentiallyOrphaned(e,r))}),K.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.si.Gr(n),K.resolve()}getMatchingKeysForTargetId(e,n){const s=this.si.jr(n);return K.resolve(s)}containsKey(e,n){return K.resolve(this.si.containsKey(n))}}/**
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
 */class DE{constructor(e,n){this._i={},this.overlays={},this.ai=new vd(0),this.ui=!1,this.ui=!0,this.ci=new KC,this.referenceDelegate=e(this),this.li=new JC(this),this.indexManager=new PC,this.remoteDocumentCache=function(a){return new XC(a)}(s=>this.referenceDelegate.hi(s)),this.serializer=new OC(n),this.Pi=new GC(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new YC,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this._i[e.toKey()];return s||(s=new QC(n,this.referenceDelegate),this._i[e.toKey()]=s),s}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,n,s){de("MemoryPersistence","Starting transaction:",e);const a=new ZC(this.ai.next());return this.referenceDelegate.Ti(),s(a).next(i=>this.referenceDelegate.Ei(a).next(()=>i)).toPromise().then(i=>(a.raiseOnCommittedEvent(),i))}Ii(e,n){return K.or(Object.values(this._i).map(s=>()=>s.containsKey(e,n)))}}class ZC extends Sk{constructor(e){super(),this.currentSequenceNumber=e}}class Wg{constructor(e){this.persistence=e,this.Ri=new Xg,this.Ai=null}static Vi(e){return new Wg(e)}get di(){if(this.Ai)return this.Ai;throw Ne(60996)}addReference(e,n,s){return this.Ri.addReference(s,n),this.di.delete(s.toString()),K.resolve()}removeReference(e,n,s){return this.Ri.removeReference(s,n),this.di.add(s.toString()),K.resolve()}markPotentiallyOrphaned(e,n){return this.di.add(n.toString()),K.resolve()}removeTarget(e,n){this.Ri.Gr(n.targetId).forEach(a=>this.di.add(a.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(a=>{a.forEach(i=>this.di.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}Ti(){this.Ai=new Set}Ei(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return K.forEach(this.di,s=>{const a=xe.fromPath(s);return this.mi(e,a).next(i=>{i||n.removeEntry(a,je.min())})}).next(()=>(this.Ai=null,n.apply(e)))}updateLimboDocument(e,n){return this.mi(e,n).next(s=>{s?this.di.delete(n.toString()):this.di.add(n.toString())})}hi(e){return 0}mi(e,n){return K.or([()=>K.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ii(e,n)])}}class Vf{constructor(e,n){this.persistence=e,this.fi=new lo(s=>Rk(s.path),(s,a)=>s.isEqual(a)),this.garbageCollector=$C(this,n)}static Vi(e,n){return new Vf(e,n)}Ti(){}Ei(e){return K.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}dr(e){const n=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>n.next(a=>s+a))}pr(e){let n=0;return this.mr(e,s=>{n++}).next(()=>n)}mr(e,n){return K.forEach(this.fi,(s,a)=>this.wr(e,s,a).next(i=>i?K.resolve():n(a)))}removeTargets(e,n,s){return this.persistence.getTargetCache().removeTargets(e,n,s)}removeOrphanedDocuments(e,n){let s=0;const a=this.persistence.getRemoteDocumentCache(),i=a.newChangeBuffer();return a.ni(e,r=>this.wr(e,r,n).next(l=>{l||(s++,i.removeEntry(r,je.min()))})).next(()=>i.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,n){return this.fi.set(n,e.currentSequenceNumber),K.resolve()}removeTarget(e,n){const s=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,n,s){return this.fi.set(s,e.currentSequenceNumber),K.resolve()}removeReference(e,n,s){return this.fi.set(s,e.currentSequenceNumber),K.resolve()}updateLimboDocument(e,n){return this.fi.set(n,e.currentSequenceNumber),K.resolve()}hi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Vh(e.data.value)),n}wr(e,n,s){return K.or([()=>this.persistence.Ii(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const a=this.fi.get(n);return K.resolve(a!==void 0&&a>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Jg{constructor(e,n,s,a){this.targetId=e,this.fromCache=n,this.Ts=s,this.Es=a}static Is(e,n){let s=st(),a=st();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:a=a.add(i.doc.key)}return new Jg(e,n.fromCache,s,a)}}/**
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
 */class eI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class tI{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return L5()?8:Ak(rs())>0?6:4}()}initialize(e,n){this.fs=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,s,a){const i={result:null};return this.gs(e,n).next(r=>{i.result=r}).next(()=>{if(!i.result)return this.ps(e,n,a,s).next(r=>{i.result=r})}).next(()=>{if(i.result)return;const r=new eI;return this.ys(e,n,r).next(l=>{if(i.result=l,this.As)return this.ws(e,n,r,l.size)})}).next(()=>i.result)}ws(e,n,s,a){return s.documentReadCount<this.Vs?(No()<=tt.DEBUG&&de("QueryEngine","SDK will not create cache indexes for query:",Ro(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),K.resolve()):(No()<=tt.DEBUG&&de("QueryEngine","Query:",Ro(n),"scans",s.documentReadCount,"local documents and returns",a,"documents as results."),s.documentReadCount>this.ds*a?(No()<=tt.DEBUG&&de("QueryEngine","The SDK decides to create cache indexes for query:",Ro(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ca(n))):K.resolve())}gs(e,n){if(V1(n))return K.resolve(null);let s=Ca(n);return this.indexManager.getIndexType(e,s).next(a=>a===0?null:(n.limit!==null&&a===1&&(n=Df(n,null,"F"),s=Ca(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const r=st(...i);return this.fs.getDocuments(e,r).next(l=>this.indexManager.getMinOffset(e,s).next(c=>{const h=this.Ss(n,l);return this.bs(n,h,r,c.readTime)?this.gs(e,Df(n,null,"F")):this.Ds(e,h,n,c)}))})))}ps(e,n,s,a){return V1(n)||a.isEqual(je.min())?K.resolve(null):this.fs.getDocuments(e,s).next(i=>{const r=this.Ss(n,i);return this.bs(n,r,s,a)?K.resolve(null):(No()<=tt.DEBUG&&de("QueryEngine","Re-using previous result from %s to execute query: %s",a.toString(),Ro(n)),this.Ds(e,r,n,_k(a,tu)).next(l=>l))})}Ss(e,n){let s=new Cn(cE(e));return n.forEach((a,i)=>{Ed(e,i)&&(s=s.add(i))}),s}bs(e,n,s,a){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(a)>0)}ys(e,n,s){return No()<=tt.DEBUG&&de("QueryEngine","Using full collection scan to execute query:",Ro(n)),this.fs.getDocumentsMatchingQuery(e,n,ur.min(),s)}Ds(e,n,s,a){return this.fs.getDocumentsMatchingQuery(e,s,a).next(i=>(n.forEach(r=>{i=i.insert(r.key,r)}),i))}}/**
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
 */const Zg="LocalStore",nI=3e8;class sI{constructor(e,n,s,a){this.persistence=e,this.Cs=n,this.serializer=a,this.vs=new tn(nt),this.Fs=new lo(i=>Hg(i),qg),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(s)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new qC(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.vs))}}function aI(t,e,n,s){return new sI(t,e,n,s)}async function OE(t,e){const n=Ve(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let a;return n.mutationQueue.getAllMutationBatches(s).next(i=>(a=i,n.Os(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const r=[],l=[];let c=st();for(const h of a){r.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){l.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(s,c).next(h=>({Ns:h,removedBatchIds:r,addedBatchIds:l}))})})}function iI(t,e){const n=Ve(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const a=e.batch.keys(),i=n.xs.newChangeBuffer({trackRemovals:!0});return function(l,c,h,d){const p=h.batch,g=p.keys();let v=K.resolve();return g.forEach(C=>{v=v.next(()=>d.getEntry(c,C)).next(I=>{const j=h.docVersions.get(C);vt(j!==null,48541),I.version.compareTo(j)<0&&(p.applyToRemoteDocument(I,h),I.isValidDocument()&&(I.setReadTime(h.commitVersion),d.addEntry(I)))})}),v.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,a,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(l){let c=st();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>n.localDocuments.getDocuments(s,a))})}function jE(t){const e=Ve(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.li.getLastRemoteSnapshotVersion(n))}function rI(t,e){const n=Ve(t),s=e.snapshotVersion;let a=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const r=n.xs.newChangeBuffer({trackRemovals:!0});a=n.vs;const l=[];e.targetChanges.forEach((d,p)=>{const g=a.get(p);if(!g)return;l.push(n.li.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.li.addMatchingKeys(i,d.addedDocuments,p)));let v=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?v=v.withResumeToken(Wn.EMPTY_BYTE_STRING,je.min()).withLastLimboFreeSnapshotVersion(je.min()):d.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(d.resumeToken,s)),a=a.insert(p,v),function(I,j,_){return I.resumeToken.approximateByteSize()===0||j.snapshotVersion.toMicroseconds()-I.snapshotVersion.toMicroseconds()>=nI?!0:_.addedDocuments.size+_.modifiedDocuments.size+_.removedDocuments.size>0}(g,v,d)&&l.push(n.li.updateTargetData(i,v))});let c=yi(),h=st();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),l.push(oI(i,r,e.documentUpdates).next(d=>{c=d.Bs,h=d.Ls})),!s.isEqual(je.min())){const d=n.li.getLastRemoteSnapshotVersion(i).next(p=>n.li.setTargetsMetadata(i,i.currentSequenceNumber,s));l.push(d)}return K.waitFor(l).next(()=>r.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(n.vs=a,i))}function oI(t,e,n){let s=st(),a=st();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let r=yi();return n.forEach((l,c)=>{const h=i.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(a=a.add(l)),c.isNoDocument()&&c.version.isEqual(je.min())?(e.removeEntry(l,c.readTime),r=r.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),r=r.insert(l,c)):de(Zg,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Bs:r,Ls:a}})}function lI(t,e){const n=Ve(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=Bg),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function cI(t,e){const n=Ve(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let a;return n.li.getTargetData(s,e).next(i=>i?(a=i,K.resolve(a)):n.li.allocateTargetId(s).next(r=>(a=new $i(e,r,"TargetPurposeListen",s.currentSequenceNumber),n.li.addTargetData(s,a).next(()=>a))))}).then(s=>{const a=n.vs.get(s.targetId);return(a===null||s.snapshotVersion.compareTo(a.snapshotVersion)>0)&&(n.vs=n.vs.insert(s.targetId,s),n.Fs.set(e,s.targetId)),s})}async function mp(t,e,n){const s=Ve(t),a=s.vs.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,r=>s.persistence.referenceDelegate.removeTarget(r,a))}catch(r){if(!Pl(r))throw r;de(Zg,`Failed to update sequence numbers for target ${e}: ${r}`)}s.vs=s.vs.remove(e),s.Fs.delete(a.target)}function X1(t,e,n){const s=Ve(t);let a=je.min(),i=st();return s.persistence.runTransaction("Execute query","readwrite",r=>function(c,h,d){const p=Ve(c),g=p.Fs.get(d);return g!==void 0?K.resolve(p.vs.get(g)):p.li.getTargetData(h,d)}(s,r,Ca(e)).next(l=>{if(l)return a=l.lastLimboFreeSnapshotVersion,s.li.getMatchingKeysForTargetId(r,l.targetId).next(c=>{i=c})}).next(()=>s.Cs.getDocumentsMatchingQuery(r,e,n?a:je.min(),n?i:st())).next(l=>(uI(s,Kk(e),l),{documents:l,ks:i})))}function uI(t,e,n){let s=t.Ms.get(e)||je.min();n.forEach((a,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Ms.set(e,s)}class W1{constructor(){this.activeTargetIds=eC()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class hI{constructor(){this.vo=new W1,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e,n=!0){return n&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,n,s){this.Fo[e]=n}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new W1,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class fI{Mo(e){}shutdown(){}}/**
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
 */const J1="ConnectivityMonitor";class Z1{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){de(J1,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){de(J1,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let mh=null;function pp(){return mh===null?mh=function(){return 268435456+Math.round(2147483648*Math.random())}():mh++,"0x"+mh.toString(16)}/**
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
 */const Vm="RestConnection",dI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class mI{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),a=encodeURIComponent(this.databaseId.database);this.Ko=n+"://"+e.host,this.Uo=`projects/${s}/databases/${a}`,this.$o=this.databaseId.database===kf?`project_id=${s}`:`project_id=${s}&database_id=${a}`}Wo(e,n,s,a,i){const r=pp(),l=this.Qo(e,n.toUriEncodedString());de(Vm,`Sending RPC '${e}' ${r}:`,l,s);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(c,a,i);const{host:h}=new URL(l),d=Tu(h);return this.zo(e,l,c,s,d).then(p=>(de(Vm,`Received RPC '${e}' ${r}: `,p),p),p=>{throw Zr(Vm,`RPC '${e}' ${r} failed with error: `,p,"url: ",l,"request:",s),p})}jo(e,n,s,a,i,r){return this.Wo(e,n,s,a,i)}Go(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ol}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((a,i)=>e[i]=a),s&&s.headers.forEach((a,i)=>e[i]=a)}Qo(e,n){const s=dI[e];let a=`${this.Ko}/v1/${n}:${s}`;return this.databaseInfo.apiKey&&(a=`${a}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),a}terminate(){}}/**
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
 */class pI{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const ns="WebChannelConnection",tc=(t,e,n)=>{t.listen(e,s=>{try{n(s)}catch(a){setTimeout(()=>{throw a},0)}})};class Zo extends mI{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Zo.c_){const e=L2();tc(e,V2.STAT_EVENT,n=>{n.stat===sp.PROXY?de(ns,"STAT_EVENT: detected buffering proxy"):n.stat===sp.NOPROXY&&de(ns,"STAT_EVENT: detected no buffering proxy")}),Zo.c_=!0}}zo(e,n,s,a,i){const r=pp();return new Promise((l,c)=>{const h=new j2;h.setWithCredentials(!0),h.listenOnce(P2.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Ph.NO_ERROR:const p=h.getResponseJson();de(ns,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(p)),l(p);break;case Ph.TIMEOUT:de(ns,`RPC '${e}' ${r} timed out`),c(new le(q.DEADLINE_EXCEEDED,"Request time out"));break;case Ph.HTTP_ERROR:const g=h.getStatus();if(de(ns,`RPC '${e}' ${r} failed with status:`,g,"response text:",h.getResponseText()),g>0){let v=h.getResponseJson();Array.isArray(v)&&(v=v[0]);const C=v==null?void 0:v.error;if(C&&C.status&&C.message){const I=function(_){const b=_.toLowerCase().replace(/_/g,"-");return Object.values(q).indexOf(b)>=0?b:q.UNKNOWN}(C.status);c(new le(I,C.message))}else c(new le(q.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new le(q.UNAVAILABLE,"Connection failed."));break;default:Ne(9055,{l_:e,streamId:r,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{de(ns,`RPC '${e}' ${r} completed.`)}});const d=JSON.stringify(a);de(ns,`RPC '${e}' ${r} sending request:`,a),h.send(n,"POST",d,s,15)})}T_(e,n,s){const a=pp(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],r=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,n,s),l.encodeInitMessageHeaders=!0;const h=i.join("");de(ns,`Creating RPC '${e}' stream ${a}: ${h}`,l);const d=r.createWebChannel(h,l);this.E_(d);let p=!1,g=!1;const v=new pI({Jo:C=>{g?de(ns,`Not sending because RPC '${e}' stream ${a} is closed:`,C):(p||(de(ns,`Opening RPC '${e}' stream ${a} transport.`),d.open(),p=!0),de(ns,`RPC '${e}' stream ${a} sending:`,C),d.send(C))},Ho:()=>d.close()});return tc(d,cc.EventType.OPEN,()=>{g||(de(ns,`RPC '${e}' stream ${a} transport opened.`),v.i_())}),tc(d,cc.EventType.CLOSE,()=>{g||(g=!0,de(ns,`RPC '${e}' stream ${a} transport closed`),v.o_(),this.I_(d))}),tc(d,cc.EventType.ERROR,C=>{g||(g=!0,Zr(ns,`RPC '${e}' stream ${a} transport errored. Name:`,C.name,"Message:",C.message),v.o_(new le(q.UNAVAILABLE,"The operation could not be completed")))}),tc(d,cc.EventType.MESSAGE,C=>{var I;if(!g){const j=C.data[0];vt(!!j,16349);const _=j,b=(_==null?void 0:_.error)||((I=_[0])==null?void 0:I.error);if(b){de(ns,`RPC '${e}' stream ${a} received error:`,b);const N=b.status;let P=function(T){const x=yn[T];if(x!==void 0)return _E(x)}(N),$=b.message;N==="NOT_FOUND"&&$.includes("database")&&$.includes("does not exist")&&$.includes(this.databaseId.database)&&Zr(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),P===void 0&&(P=q.INTERNAL,$="Unknown error status: "+N+" with message "+b.message),g=!0,v.o_(new le(P,$)),d.close()}else de(ns,`RPC '${e}' stream ${a} received:`,j),v.__(j)}}),Zo.u_(),setTimeout(()=>{v.s_()},0),v}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(n=>n===e)}Go(e,n,s){super.Go(e,n,s),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return U2()}}/**
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
 */function gI(t){return new Zo(t)}function Lm(){return typeof document<"u"?document:null}/**
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
 */function Nd(t){return new xC(t,!0)}/**
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
 */Zo.c_=!1;class PE{constructor(e,n,s=1e3,a=1.5,i=6e4){this.Ci=e,this.timerId=n,this.R_=s,this.A_=a,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const n=Math.floor(this.d_+this.y_()),s=Math.max(0,Date.now()-this.f_),a=Math.max(0,n-s);a>0&&de("ExponentialBackoff",`Backing off for ${a} ms (base delay: ${this.d_} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,a,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const eb="PersistentStream";class VE{constructor(e,n,s,a,i,r,l,c){this.Ci=e,this.S_=s,this.b_=a,this.connection=i,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new PE(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===q.RESOURCE_EXHAUSTED?(gi(n.toString()),gi("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===q.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(n)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,a])=>{this.D_===n&&this.G_(s,a)},s=>{e(()=>{const a=new le(q.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(a)})})}G_(e,n){const s=this.Q_(this.D_);this.stream=this.j_(e,n),this.stream.Zo(()=>{s(()=>this.listener.Zo())}),this.stream.Yo(()=>{s(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(a=>{s(()=>this.z_(a))}),this.stream.onMessage(a=>{s(()=>++this.F_==1?this.J_(a):this.onNext(a))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return de(eb,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return n=>{this.Ci.enqueueAndForget(()=>this.D_===e?n():(de(eb,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class yI extends VE{constructor(e,n,s,a,i,r){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,a,r),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=EC(this.serializer,e),s=function(i){if(!("targetChange"in i))return je.min();const r=i.targetChange;return r.targetIds&&r.targetIds.length?je.min():r.readTime?Ma(r.readTime):je.min()}(e);return this.listener.H_(n,s)}Z_(e){const n={};n.database=dp(this.serializer),n.addTarget=function(i,r){let l;const c=r.target;if(l=lp(c)?{documents:AC(i,c)}:{query:NC(i,c).ft},l.targetId=r.targetId,r.resumeToken.approximateByteSize()>0){l.resumeToken=wE(i,r.resumeToken);const h=up(i,r.expectedCount);h!==null&&(l.expectedCount=h)}else if(r.snapshotVersion.compareTo(je.min())>0){l.readTime=Pf(i,r.snapshotVersion.toTimestamp());const h=up(i,r.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const s=kC(this.serializer,e);s&&(n.labels=s),this.q_(n)}X_(e){const n={};n.database=dp(this.serializer),n.removeTarget=e,this.q_(n)}}class vI extends VE{constructor(e,n,s,a,i,r){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,a,r),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return vt(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,vt(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){vt(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=SC(e.writeResults,e.commitTime),s=Ma(e.commitTime);return this.listener.na(s,n)}ra(){const e={};e.database=dp(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>wC(this.serializer,s))};this.q_(n)}}/**
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
 */class bI{}class xI extends bI{constructor(e,n,s,a){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=a,this.ia=!1}sa(){if(this.ia)throw new le(q.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,s,a){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,r])=>this.connection.Wo(e,hp(n,s),a,i,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new le(q.UNKNOWN,i.toString())})}jo(e,n,s,a,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,l])=>this.connection.jo(e,hp(n,s),a,r,l,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new le(q.UNKNOWN,r.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function _I(t,e,n,s){return new xI(t,e,n,s)}class TI{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(gi(n),this.aa=!1):de("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const eo="RemoteStore";class EI{constructor(e,n,s,a,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(r=>{s.enqueueAndForget(async()=>{co(this)&&(de(eo,"Restarting streams for network reachability change."),await async function(c){const h=Ve(c);h.Ia.add(4),await Ru(h),h.Va.set("Unknown"),h.Ia.delete(4),await Rd(h)}(this))})}),this.Va=new TI(s,a)}}async function Rd(t){if(co(t))for(const e of t.Ra)await e(!0)}async function Ru(t){for(const e of t.Ra)await e(!1)}function LE(t,e){const n=Ve(t);n.Ea.has(e.targetId)||(n.Ea.set(e.targetId,e),sy(n)?ny(n):Vl(n).O_()&&ty(n,e))}function ey(t,e){const n=Ve(t),s=Vl(n);n.Ea.delete(e),s.O_()&&UE(n,e),n.Ea.size===0&&(s.O_()?s.L_():co(n)&&n.Va.set("Unknown"))}function ty(t,e){if(t.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(je.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Vl(t).Z_(e)}function UE(t,e){t.da.$e(e),Vl(t).X_(e)}function ny(t){t.da=new gC({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ea.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Vl(t).start(),t.Va.ua()}function sy(t){return co(t)&&!Vl(t).x_()&&t.Ea.size>0}function co(t){return Ve(t).Ia.size===0}function zE(t){t.da=void 0}async function wI(t){t.Va.set("Online")}async function SI(t){t.Ea.forEach((e,n)=>{ty(t,e)})}async function AI(t,e){zE(t),sy(t)?(t.Va.ha(e),ny(t)):t.Va.set("Unknown")}async function NI(t,e,n){if(t.Va.set("Online"),e instanceof EE&&e.state===2&&e.cause)try{await async function(a,i){const r=i.cause;for(const l of i.targetIds)a.Ea.has(l)&&(await a.remoteSyncer.rejectListen(l,r),a.Ea.delete(l),a.da.removeTarget(l))}(t,e)}catch(s){de(eo,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Lf(t,s)}else if(e instanceof zh?t.da.Xe(e):e instanceof TE?t.da.st(e):t.da.tt(e),!n.isEqual(je.min()))try{const s=await jE(t.localStore);n.compareTo(s)>=0&&await function(i,r){const l=i.da.Tt(r);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.Ea.get(h);d&&i.Ea.set(h,d.withResumeToken(c.resumeToken,r))}}),l.targetMismatches.forEach((c,h)=>{const d=i.Ea.get(c);if(!d)return;i.Ea.set(c,d.withResumeToken(Wn.EMPTY_BYTE_STRING,d.snapshotVersion)),UE(i,c);const p=new $i(d.target,c,h,d.sequenceNumber);ty(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(s){de(eo,"Failed to raise snapshot:",s),await Lf(t,s)}}async function Lf(t,e,n){if(!Pl(e))throw e;t.Ia.add(1),await Ru(t),t.Va.set("Offline"),n||(n=()=>jE(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{de(eo,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await Rd(t)})}function BE(t,e){return e().catch(n=>Lf(t,n,e))}async function kd(t){const e=Ve(t),n=mr(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Bg;for(;RI(e);)try{const a=await lI(e.localStore,s);if(a===null){e.Ta.length===0&&n.L_();break}s=a.batchId,kI(e,a)}catch(a){await Lf(e,a)}$E(e)&&FE(e)}function RI(t){return co(t)&&t.Ta.length<10}function kI(t,e){t.Ta.push(e);const n=mr(t);n.O_()&&n.Y_&&n.ea(e.mutations)}function $E(t){return co(t)&&!mr(t).x_()&&t.Ta.length>0}function FE(t){mr(t).start()}async function CI(t){mr(t).ra()}async function II(t){const e=mr(t);for(const n of t.Ta)e.ea(n.mutations)}async function MI(t,e,n){const s=t.Ta.shift(),a=Yg.from(s,e,n);await BE(t,()=>t.remoteSyncer.applySuccessfulWrite(a)),await kd(t)}async function DI(t,e){e&&mr(t).Y_&&await async function(s,a){if(function(r){return dC(r)&&r!==q.ABORTED}(a.code)){const i=s.Ta.shift();mr(s).B_(),await BE(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,a)),await kd(s)}}(t,e),$E(t)&&FE(t)}async function tb(t,e){const n=Ve(t);n.asyncQueue.verifyOperationInProgress(),de(eo,"RemoteStore received new credentials");const s=co(n);n.Ia.add(3),await Ru(n),s&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await Rd(n)}async function OI(t,e){const n=Ve(t);e?(n.Ia.delete(2),await Rd(n)):e||(n.Ia.add(2),await Ru(n),n.Va.set("Unknown"))}function Vl(t){return t.ma||(t.ma=function(n,s,a){const i=Ve(n);return i.sa(),new yI(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,a)}(t.datastore,t.asyncQueue,{Zo:wI.bind(null,t),Yo:SI.bind(null,t),t_:AI.bind(null,t),H_:NI.bind(null,t)}),t.Ra.push(async e=>{e?(t.ma.B_(),sy(t)?ny(t):t.Va.set("Unknown")):(await t.ma.stop(),zE(t))})),t.ma}function mr(t){return t.fa||(t.fa=function(n,s,a){const i=Ve(n);return i.sa(),new vI(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,a)}(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),Yo:CI.bind(null,t),t_:DI.bind(null,t),ta:II.bind(null,t),na:MI.bind(null,t)}),t.Ra.push(async e=>{e?(t.fa.B_(),await kd(t)):(await t.fa.stop(),t.Ta.length>0&&(de(eo,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
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
 */class ay{constructor(e,n,s,a,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=a,this.removalCallback=i,this.deferred=new oi,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(r=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,a,i){const r=Date.now()+s,l=new ay(e,n,r,a,i);return l.start(s),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new le(q.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function iy(t,e){if(gi("AsyncQueue",`${e}: ${t}`),Pl(t))return new le(q.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class el{static emptySet(e){return new el(e.comparator)}constructor(e){this.comparator=e?(n,s)=>e(n,s)||xe.comparator(n.key,s.key):(n,s)=>xe.comparator(n.key,s.key),this.keyedMap=uc(),this.sortedSet=new tn(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof el)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const a=n.getNext().key,i=s.getNext().key;if(!a.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new el;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
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
 */class nb{constructor(){this.ga=new tn(xe.comparator)}track(e){const n=e.doc.key,s=this.ga.get(n);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(n,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(n):e.type===1&&s.type===2?this.ga=this.ga.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):Ne(63341,{Vt:e,pa:s}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,s)=>{e.push(s)}),e}}class xl{constructor(e,n,s,a,i,r,l,c,h){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=a,this.mutatedKeys=i,this.fromCache=r,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,n,s,a,i){const r=[];return n.forEach(l=>{r.push({type:0,doc:l})}),new xl(e,n,el.emptySet(n),r,s,a,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Td(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let a=0;a<n.length;a++)if(n[a].type!==s[a].type||!n[a].doc.isEqual(s[a].doc))return!1;return!0}}/**
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
 */class jI{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class PI{constructor(){this.queries=sb(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,s){const a=Ve(n),i=a.queries;a.queries=sb(),i.forEach((r,l)=>{for(const c of l.Sa)c.onError(s)})})(this,new le(q.ABORTED,"Firestore shutting down"))}}function sb(){return new lo(t=>lE(t),Td)}async function ry(t,e){const n=Ve(t);let s=3;const a=e.query;let i=n.queries.get(a);i?!i.ba()&&e.Da()&&(s=2):(i=new jI,s=e.Da()?0:1);try{switch(s){case 0:i.wa=await n.onListen(a,!0);break;case 1:i.wa=await n.onListen(a,!1);break;case 2:await n.onFirstRemoteStoreListen(a)}}catch(r){const l=iy(r,`Initialization of query '${Ro(e.query)}' failed`);return void e.onError(l)}n.queries.set(a,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&ly(n)}async function oy(t,e){const n=Ve(t),s=e.query;let a=3;const i=n.queries.get(s);if(i){const r=i.Sa.indexOf(e);r>=0&&(i.Sa.splice(r,1),i.Sa.length===0?a=e.Da()?0:1:!i.ba()&&e.Da()&&(a=2))}switch(a){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}function VI(t,e){const n=Ve(t);let s=!1;for(const a of e){const i=a.query,r=n.queries.get(i);if(r){for(const l of r.Sa)l.Fa(a)&&(s=!0);r.wa=a}}s&&ly(n)}function LI(t,e,n){const s=Ve(t),a=s.queries.get(e);if(a)for(const i of a.Sa)i.onError(n);s.queries.delete(e)}function ly(t){t.Ca.forEach(e=>{e.next()})}var gp,ab;(ab=gp||(gp={})).Ma="default",ab.Cache="cache";class cy{constructor(e,n,s){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const a of e.docChanges)a.type!==3&&s.push(a);e=new xl(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const s=n!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=xl.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==gp.Cache}}/**
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
 */class HE{constructor(e){this.key=e}}class qE{constructor(e){this.key=e}}class UI{constructor(e,n){this.query=e,this.Za=n,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=st(),this.mutatedKeys=st(),this.eu=cE(e),this.tu=new el(this.eu)}get nu(){return this.Za}ru(e,n){const s=n?n.iu:new nb,a=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,r=a,l=!1;const c=this.query.limitType==="F"&&a.size===this.query.limit?a.last():null,h=this.query.limitType==="L"&&a.size===this.query.limit?a.first():null;if(e.inorderTraversal((d,p)=>{const g=a.get(d),v=Ed(this.query,p)?p:null,C=!!g&&this.mutatedKeys.has(g.key),I=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let j=!1;g&&v?g.data.isEqual(v.data)?C!==I&&(s.track({type:3,doc:v}),j=!0):this.su(g,v)||(s.track({type:2,doc:v}),j=!0,(c&&this.eu(v,c)>0||h&&this.eu(v,h)<0)&&(l=!0)):!g&&v?(s.track({type:0,doc:v}),j=!0):g&&!v&&(s.track({type:1,doc:g}),j=!0,(c||h)&&(l=!0)),j&&(v?(r=r.add(v),i=I?i.add(d):i.delete(d)):(r=r.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;r.size>this.query.limit;){const d=this.query.limitType==="F"?r.last():r.first();r=r.delete(d.key),i=i.delete(d.key),s.track({type:1,doc:d})}return{tu:r,iu:s,bs:l,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s,a){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const r=e.iu.ya();r.sort((d,p)=>function(v,C){const I=j=>{switch(j){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Ne(20277,{Vt:j})}};return I(v)-I(C)}(d.type,p.type)||this.eu(d.doc,p.doc)),this.ou(s),a=a??!1;const l=n&&!a?this._u():[],c=this.Ya.size===0&&this.current&&!a?1:0,h=c!==this.Xa;return this.Xa=c,r.length!==0||h?{snapshot:new xl(this.query,e.tu,i,r,e.mutatedKeys,c===0,h,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new nb,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Za=this.Za.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Za=this.Za.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=st(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Ya=this.Ya.add(s.key))});const n=[];return e.forEach(s=>{this.Ya.has(s)||n.push(new qE(s))}),this.Ya.forEach(s=>{e.has(s)||n.push(new HE(s))}),n}cu(e){this.Za=e.ks,this.Ya=st();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return xl.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const uy="SyncEngine";class zI{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class BI{constructor(e){this.key=e,this.hu=!1}}class $I{constructor(e,n,s,a,i,r){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=a,this.currentUser=i,this.maxConcurrentLimboResolutions=r,this.Pu={},this.Tu=new lo(l=>lE(l),Td),this.Eu=new Map,this.Iu=new Set,this.Ru=new tn(xe.comparator),this.Au=new Map,this.Vu=new Xg,this.du={},this.mu=new Map,this.fu=bl.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function FI(t,e,n=!0){const s=WE(t);let a;const i=s.Tu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),a=i.view.lu()):a=await GE(s,e,n,!0),a}async function HI(t,e){const n=WE(t);await GE(n,e,!0,!1)}async function GE(t,e,n,s){const a=await cI(t.localStore,Ca(e)),i=a.targetId,r=t.sharedClientState.addLocalQueryTarget(i,n);let l;return s&&(l=await qI(t,e,i,r==="current",a.resumeToken)),t.isPrimaryClient&&n&&LE(t.remoteStore,a),l}async function qI(t,e,n,s,a){t.pu=(p,g,v)=>async function(I,j,_,b){let N=j.view.ru(_);N.bs&&(N=await X1(I.localStore,j.query,!1).then(({documents:T})=>j.view.ru(T,N)));const P=b&&b.targetChanges.get(j.targetId),$=b&&b.targetMismatches.get(j.targetId)!=null,J=j.view.applyChanges(N,I.isPrimaryClient,P,$);return rb(I,j.targetId,J.au),J.snapshot}(t,p,g,v);const i=await X1(t.localStore,e,!0),r=new UI(e,i.ks),l=r.ru(i.documents),c=Nu.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",a),h=r.applyChanges(l,t.isPrimaryClient,c);rb(t,n,h.au);const d=new zI(e,n,r);return t.Tu.set(e,d),t.Eu.has(n)?t.Eu.get(n).push(e):t.Eu.set(n,[e]),h.snapshot}async function GI(t,e,n){const s=Ve(t),a=s.Tu.get(e),i=s.Eu.get(a.targetId);if(i.length>1)return s.Eu.set(a.targetId,i.filter(r=>!Td(r,e))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(a.targetId),s.sharedClientState.isActiveQueryTarget(a.targetId)||await mp(s.localStore,a.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(a.targetId),n&&ey(s.remoteStore,a.targetId),yp(s,a.targetId)}).catch(jl)):(yp(s,a.targetId),await mp(s.localStore,a.targetId,!0))}async function YI(t,e){const n=Ve(t),s=n.Tu.get(e),a=n.Eu.get(s.targetId);n.isPrimaryClient&&a.length===1&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),ey(n.remoteStore,s.targetId))}async function KI(t,e,n){const s=t4(t);try{const a=await function(r,l){const c=Ve(r),h=Ft.now(),d=l.reduce((v,C)=>v.add(C.key),st());let p,g;return c.persistence.runTransaction("Locally write mutations","readwrite",v=>{let C=yi(),I=st();return c.xs.getEntries(v,d).next(j=>{C=j,C.forEach((_,b)=>{b.isValidDocument()||(I=I.add(_))})}).next(()=>c.localDocuments.getOverlayedDocuments(v,C)).next(j=>{p=j;const _=[];for(const b of l){const N=lC(b,p.get(b.key).overlayedDocument);N!=null&&_.push(new xr(b.key,N,eE(N.value.mapValue),Ia.exists(!0)))}return c.mutationQueue.addMutationBatch(v,h,_,l)}).next(j=>{g=j;const _=j.applyToLocalDocumentSet(p,I);return c.documentOverlayCache.saveOverlays(v,j.batchId,_)})}).then(()=>({batchId:g.batchId,changes:hE(p)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(a.batchId),function(r,l,c){let h=r.du[r.currentUser.toKey()];h||(h=new tn(nt)),h=h.insert(l,c),r.du[r.currentUser.toKey()]=h}(s,a.batchId,n),await ku(s,a.changes),await kd(s.remoteStore)}catch(a){const i=iy(a,"Failed to persist write");n.reject(i)}}async function YE(t,e){const n=Ve(t);try{const s=await rI(n.localStore,e);e.targetChanges.forEach((a,i)=>{const r=n.Au.get(i);r&&(vt(a.addedDocuments.size+a.modifiedDocuments.size+a.removedDocuments.size<=1,22616),a.addedDocuments.size>0?r.hu=!0:a.modifiedDocuments.size>0?vt(r.hu,14607):a.removedDocuments.size>0&&(vt(r.hu,42227),r.hu=!1))}),await ku(n,s,e)}catch(s){await jl(s)}}function ib(t,e,n){const s=Ve(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const a=[];s.Tu.forEach((i,r)=>{const l=r.view.va(e);l.snapshot&&a.push(l.snapshot)}),function(r,l){const c=Ve(r);c.onlineState=l;let h=!1;c.queries.forEach((d,p)=>{for(const g of p.Sa)g.va(l)&&(h=!0)}),h&&ly(c)}(s.eventManager,e),a.length&&s.Pu.H_(a),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function QI(t,e,n){const s=Ve(t);s.sharedClientState.updateQueryState(e,"rejected",n);const a=s.Au.get(e),i=a&&a.key;if(i){let r=new tn(xe.comparator);r=r.insert(i,is.newNoDocument(i,je.min()));const l=st().add(i),c=new Ad(je.min(),new Map,new tn(nt),r,l);await YE(s,c),s.Ru=s.Ru.remove(i),s.Au.delete(e),hy(s)}else await mp(s.localStore,e,!1).then(()=>yp(s,e,n)).catch(jl)}async function XI(t,e){const n=Ve(t),s=e.batch.batchId;try{const a=await iI(n.localStore,e);QE(n,s,null),KE(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await ku(n,a)}catch(a){await jl(a)}}async function WI(t,e,n){const s=Ve(t);try{const a=await function(r,l){const c=Ve(r);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let d;return c.mutationQueue.lookupMutationBatch(h,l).next(p=>(vt(p!==null,37113),d=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,d,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d)).next(()=>c.localDocuments.getDocuments(h,d))})}(s.localStore,e);QE(s,e,n),KE(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await ku(s,a)}catch(a){await jl(a)}}function KE(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function QE(t,e,n){const s=Ve(t);let a=s.du[s.currentUser.toKey()];if(a){const i=a.get(e);i&&(n?i.reject(n):i.resolve(),a=a.remove(e)),s.du[s.currentUser.toKey()]=a}}function yp(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.Eu.get(e))t.Tu.delete(s),n&&t.Pu.yu(s,n);t.Eu.delete(e),t.isPrimaryClient&&t.Vu.Gr(e).forEach(s=>{t.Vu.containsKey(s)||XE(t,s)})}function XE(t,e){t.Iu.delete(e.path.canonicalString());const n=t.Ru.get(e);n!==null&&(ey(t.remoteStore,n),t.Ru=t.Ru.remove(e),t.Au.delete(n),hy(t))}function rb(t,e,n){for(const s of n)s instanceof HE?(t.Vu.addReference(s.key,e),JI(t,s)):s instanceof qE?(de(uy,"Document no longer in limbo: "+s.key),t.Vu.removeReference(s.key,e),t.Vu.containsKey(s.key)||XE(t,s.key)):Ne(19791,{wu:s})}function JI(t,e){const n=e.key,s=n.path.canonicalString();t.Ru.get(n)||t.Iu.has(s)||(de(uy,"New document in limbo: "+n),t.Iu.add(s),hy(t))}function hy(t){for(;t.Iu.size>0&&t.Ru.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new xe(Vt.fromString(e)),s=t.fu.next();t.Au.set(s,new BI(n)),t.Ru=t.Ru.insert(n,s),LE(t.remoteStore,new $i(Ca(_d(n.path)),s,"TargetPurposeLimboResolution",vd.ce))}}async function ku(t,e,n){const s=Ve(t),a=[],i=[],r=[];s.Tu.isEmpty()||(s.Tu.forEach((l,c)=>{r.push(s.pu(c,e,n).then(h=>{var d;if((h||n)&&s.isPrimaryClient){const p=h?!h.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))==null?void 0:d.current;s.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){a.push(h);const p=Jg.Is(c.targetId,h);i.push(p)}}))}),await Promise.all(r),s.Pu.H_(a),await async function(c,h){const d=Ve(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>K.forEach(h,g=>K.forEach(g.Ts,v=>d.persistence.referenceDelegate.addReference(p,g.targetId,v)).next(()=>K.forEach(g.Es,v=>d.persistence.referenceDelegate.removeReference(p,g.targetId,v)))))}catch(p){if(!Pl(p))throw p;de(Zg,"Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const v=d.vs.get(g),C=v.snapshotVersion,I=v.withLastLimboFreeSnapshotVersion(C);d.vs=d.vs.insert(g,I)}}}(s.localStore,i))}async function ZI(t,e){const n=Ve(t);if(!n.currentUser.isEqual(e)){de(uy,"User change. New user:",e.toKey());const s=await OE(n.localStore,e);n.currentUser=e,function(i,r){i.mu.forEach(l=>{l.forEach(c=>{c.reject(new le(q.CANCELLED,r))})}),i.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await ku(n,s.Ns)}}function e4(t,e){const n=Ve(t),s=n.Au.get(e);if(s&&s.hu)return st().add(s.key);{let a=st();const i=n.Eu.get(e);if(!i)return a;for(const r of i){const l=n.Tu.get(r);a=a.unionWith(l.view.nu)}return a}}function WE(t){const e=Ve(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=YE.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=e4.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=QI.bind(null,e),e.Pu.H_=VI.bind(null,e.eventManager),e.Pu.yu=LI.bind(null,e.eventManager),e}function t4(t){const e=Ve(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=XI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=WI.bind(null,e),e}class Uf{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Nd(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return aI(this.persistence,new tI,e.initialUser,this.serializer)}Cu(e){return new DE(Wg.Vi,this.serializer)}Du(e){return new hI}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Uf.provider={build:()=>new Uf};class n4 extends Uf{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){vt(this.persistence.referenceDelegate instanceof Vf,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new zC(s,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?Es.withCacheSize(this.cacheSizeBytes):Es.DEFAULT;return new DE(s=>Vf.Vi(s,n),this.serializer)}}class vp{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>ib(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=ZI.bind(null,this.syncEngine),await OI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new PI}()}createDatastore(e){const n=Nd(e.databaseInfo.databaseId),s=gI(e.databaseInfo);return _I(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return function(s,a,i,r,l){return new EI(s,a,i,r,l)}(this.localStore,this.datastore,e.asyncQueue,n=>ib(this.syncEngine,n,0),function(){return Z1.v()?new Z1:new fI}())}createSyncEngine(e,n){return function(a,i,r,l,c,h,d){const p=new $I(a,i,r,l,c,h);return d&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(a){const i=Ve(a);de(eo,"RemoteStore shutting down."),i.Ia.add(5),await Ru(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}vp.provider={build:()=>new vp};/**
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
 */class fy{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):gi("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */const pr="FirestoreClient";class s4{constructor(e,n,s,a,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this._databaseInfo=a,this.user=as.UNAUTHENTICATED,this.clientId=zg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async r=>{de(pr,"Received user=",r.uid),await this.authCredentialListener(r),this.user=r}),this.appCheckCredentials.start(s,r=>(de(pr,"Received new app check token=",r),this.appCheckCredentialListener(r,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new oi;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=iy(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function Um(t,e){t.asyncQueue.verifyOperationInProgress(),de(pr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async a=>{s.isEqual(a)||(await OE(e.localStore,a),s=a)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function ob(t,e){t.asyncQueue.verifyOperationInProgress();const n=await a4(t);de(pr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(s=>tb(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,a)=>tb(e.remoteStore,a)),t._onlineComponents=e}async function a4(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){de(pr,"Using user provided OfflineComponentProvider");try{await Um(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(a){return a.name==="FirebaseError"?a.code===q.FAILED_PRECONDITION||a.code===q.UNIMPLEMENTED:!(typeof DOMException<"u"&&a instanceof DOMException)||a.code===22||a.code===20||a.code===11}(n))throw n;Zr("Error using user provided cache. Falling back to memory cache: "+n),await Um(t,new Uf)}}else de(pr,"Using default OfflineComponentProvider"),await Um(t,new n4(void 0));return t._offlineComponents}async function JE(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(de(pr,"Using user provided OnlineComponentProvider"),await ob(t,t._uninitializedComponentsProvider._online)):(de(pr,"Using default OnlineComponentProvider"),await ob(t,new vp))),t._onlineComponents}function i4(t){return JE(t).then(e=>e.syncEngine)}async function zf(t){const e=await JE(t),n=e.eventManager;return n.onListen=FI.bind(null,e.syncEngine),n.onUnlisten=GI.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=HI.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=YI.bind(null,e.syncEngine),n}function r4(t,e,n,s){const a=new fy(s),i=new cy(e,a,n);return t.asyncQueue.enqueueAndForget(async()=>ry(await zf(t),i)),()=>{a.Nu(),t.asyncQueue.enqueueAndForget(async()=>oy(await zf(t),i))}}function o4(t,e,n={}){const s=new oi;return t.asyncQueue.enqueueAndForget(async()=>function(i,r,l,c,h){const d=new fy({next:g=>{d.Nu(),r.enqueueAndForget(()=>oy(i,p));const v=g.docs.has(l);!v&&g.fromCache?h.reject(new le(q.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&g.fromCache&&c&&c.source==="server"?h.reject(new le(q.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new cy(_d(l.path),d,{includeMetadataChanges:!0,qa:!0});return ry(i,p)}(await zf(t),t.asyncQueue,e,n,s)),s.promise}function l4(t,e,n={}){const s=new oi;return t.asyncQueue.enqueueAndForget(async()=>function(i,r,l,c,h){const d=new fy({next:g=>{d.Nu(),r.enqueueAndForget(()=>oy(i,p)),g.fromCache&&c.source==="server"?h.reject(new le(q.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new cy(l,d,{includeMetadataChanges:!0,qa:!0});return ry(i,p)}(await zf(t),t.asyncQueue,e,n,s)),s.promise}function c4(t,e){const n=new oi;return t.asyncQueue.enqueueAndForget(async()=>KI(await i4(t),e,n)),n.promise}/**
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
 */function ZE(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const u4="ComponentProvider",lb=new Map;function h4(t,e,n,s,a){return new Ik(t,e,n,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,ZE(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator,s)}/**
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
 */const ew="firestore.googleapis.com",cb=!0;class ub{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new le(q.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ew,this.ssl=cb}else this.host=e.host,this.ssl=e.ssl??cb;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ME;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<LC)throw new le(q.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}bk("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ZE(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new le(q.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new le(q.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new le(q.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,a){return s.timeoutSeconds===a.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Cd{constructor(e,n,s,a){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=a,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ub({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new le(q.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new le(q.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ub(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new ck;switch(s.type){case"firstParty":return new dk(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new le(q.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const s=lb.get(n);s&&(de(u4,"Removing Datastore"),lb.delete(n),s.terminate())}(this),Promise.resolve()}}function f4(t,e,n,s={}){var h;t=Zs(t,Cd);const a=Tu(e),i=t._getSettings(),r={...i,emulatorOptions:t._getEmulatorOptions()},l=`${e}:${n}`;a&&R2(`https://${l}`),i.host!==ew&&i.host!==l&&Zr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:l,ssl:a,emulatorOptions:s};if(!lr(c,r)&&(t._setSettings(c),s.mockUserToken)){let d,p;if(typeof s.mockUserToken=="string")d=s.mockUserToken,p=as.MOCK_USER;else{d=I5(s.mockUserToken,(h=t._app)==null?void 0:h.options.projectId);const g=s.mockUserToken.sub||s.mockUserToken.user_id;if(!g)throw new le(q.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new as(g)}t._authCredentials=new uk(new B2(d,p))}}/**
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
 */class _r{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new _r(this.firestore,e,this._query)}}class rn{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new nr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new rn(this.firestore,e,this._key)}toJSON(){return{type:rn._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,s){if(wu(n,rn._jsonSchema))return new rn(e,s||null,new xe(Vt.fromString(n.referencePath)))}}rn._jsonSchemaVersion="firestore/documentReference/1.0",rn._jsonSchema={type:wn("string",rn._jsonSchemaVersion),referencePath:wn("string")};class nr extends _r{constructor(e,n,s){super(e,n,_d(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new rn(this.firestore,null,new xe(e))}withConverter(e){return new nr(this.firestore,e,this._path)}}function hb(t,e,...n){if(t=zn(t),$2("collection","path",e),t instanceof Cd){const s=Vt.fromString(e,...n);return E1(s),new nr(t,null,s)}{if(!(t instanceof rn||t instanceof nr))throw new le(q.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Vt.fromString(e,...n));return E1(s),new nr(t.firestore,null,s)}}function nc(t,e,...n){if(t=zn(t),arguments.length===1&&(e=zg.newId()),$2("doc","path",e),t instanceof Cd){const s=Vt.fromString(e,...n);return T1(s),new rn(t,null,new xe(s))}{if(!(t instanceof rn||t instanceof nr))throw new le(q.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Vt.fromString(e,...n));return T1(s),new rn(t.firestore,t instanceof nr?t.converter:null,new xe(s))}}/**
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
 */const fb="AsyncQueue";class db{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new PE(this,"async_queue_retry"),this._c=()=>{const s=Lm();s&&de(fb,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const n=Lm();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=Lm();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new oi;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Pl(e))throw e;de(fb,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,gi("INTERNAL UNHANDLED ERROR: ",mb(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=n,n}enqueueAfterDelay(e,n,s){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const a=ay.createAndSchedule(this,e,n,s,i=>this.hc(i));return this.tc.push(a),a}uc(){this.nc&&Ne(47125,{Pc:mb(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function mb(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class to extends Cd{constructor(e,n,s,a){super(e,n,s,a),this.type="firestore",this._queue=new db,this._persistenceKey=(a==null?void 0:a.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new db(e),this._firestoreClient=void 0,await e}}}function d4(t,e){const n=typeof t=="object"?t:Lg(),s=typeof t=="string"?t:e||kf,a=Eu(n,"firestore").getImmediate({identifier:s});if(!a._initialized){const i=C5("firestore");i&&f4(a,...i)}return a}function Id(t){if(t._terminated)throw new le(q.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||m4(t),t._firestoreClient}function m4(t){var s,a,i,r;const e=t._freezeSettings(),n=h4(t._databaseId,((s=t._app)==null?void 0:s.options.appId)||"",t._persistenceKey,(a=t._app)==null?void 0:a.options.apiKey,e);t._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((r=e.localCache)!=null&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new s4(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(t._componentsProvider))}/**
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
 */class Xs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Xs(Wn.fromBase64String(e))}catch(n){throw new le(q.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Xs(Wn.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Xs._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(wu(e,Xs._jsonSchema))return Xs.fromBase64String(e.bytes)}}Xs._jsonSchemaVersion="firestore/bytes/1.0",Xs._jsonSchema={type:wn("string",Xs._jsonSchemaVersion),bytes:wn("string")};/**
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
 */class dy{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new le(q.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Kn(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Md{constructor(e){this._methodName=e}}/**
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
 */class Da{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new le(q.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new le(q.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return nt(this._lat,e._lat)||nt(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Da._jsonSchemaVersion}}static fromJSON(e){if(wu(e,Da._jsonSchema))return new Da(e.latitude,e.longitude)}}Da._jsonSchemaVersion="firestore/geoPoint/1.0",Da._jsonSchema={type:wn("string",Da._jsonSchemaVersion),latitude:wn("number"),longitude:wn("number")};/**
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
 */class ma{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,a){if(s.length!==a.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==a[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ma._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(wu(e,ma._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new ma(e.vectorValues);throw new le(q.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ma._jsonSchemaVersion="firestore/vectorValue/1.0",ma._jsonSchema={type:wn("string",ma._jsonSchemaVersion),vectorValues:wn("object")};/**
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
 */const p4=/^__.*__$/;class g4{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new xr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Au(e,this.data,n,this.fieldTransforms)}}class tw{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new xr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function nw(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Ne(40011,{dataSource:t})}}class Dd{constructor(e,n,s,a,i,r){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=a,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=r||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Dd({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var a;const n=(a=this.path)==null?void 0:a.child(e),s=this.i({path:n,arrayElement:!1});return s.mc(e),s}fc(e){var a;const n=(a=this.path)==null?void 0:a.child(e),s=this.i({path:n,arrayElement:!1});return s.Ac(),s}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Bf(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(nw(this.dataSource)&&p4.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class y4{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||Nd(e)}I(e,n,s,a=!1){return new Dd({dataSource:e,methodName:n,targetDoc:s,path:Kn.emptyPath(),arrayElement:!1,hasConverter:a},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function my(t){const e=t._freezeSettings(),n=Nd(t._databaseId);return new y4(t._databaseId,!!e.ignoreUndefinedProperties,n)}function v4(t,e,n,s,a,i={}){const r=t.I(i.merge||i.mergeFields?2:0,e,n,a);gy("Data must be an object, but it was:",r,s);const l=sw(s,r);let c,h;if(i.merge)c=new js(r.fieldMask),h=r.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=_l(e,p,n);if(!r.contains(g))throw new le(q.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);rw(d,g)||d.push(g)}c=new js(d),h=r.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=r.fieldTransforms;return new g4(new ws(l),c,h)}class Od extends Md{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Od}}function b4(t,e,n){return new Dd({dataSource:3,targetDoc:e.settings.targetDoc,methodName:t._methodName,arrayElement:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class py extends Md{constructor(e,n){super(e),this.Sc=n}_toFieldTransform(e){const n=b4(this,e,!0),s=this.Sc.map(i=>Ll(i,n)),a=new vl(s);return new aC(e.path,a)}isEqual(e){return e instanceof py&&lr(this.Sc,e.Sc)}}function x4(t,e,n,s){const a=t.I(1,e,n);gy("Data must be an object, but it was:",a,s);const i=[],r=ws.empty();br(s,(c,h)=>{const d=iw(e,c,n);h=zn(h);const p=a.fc(d);if(h instanceof Od)i.push(d);else{const g=Ll(h,p);g!=null&&(i.push(d),r.set(d,g))}});const l=new js(i);return new tw(r,l,a.fieldTransforms)}function _4(t,e,n,s,a,i){const r=t.I(1,e,n),l=[_l(e,s,n)],c=[a];if(i.length%2!=0)throw new le(q.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(_l(e,i[g])),c.push(i[g+1]);const h=[],d=ws.empty();for(let g=l.length-1;g>=0;--g)if(!rw(h,l[g])){const v=l[g];let C=c[g];C=zn(C);const I=r.fc(v);if(C instanceof Od)h.push(v);else{const j=Ll(C,I);j!=null&&(h.push(v),d.set(v,j))}}const p=new js(h);return new tw(d,p,r.fieldTransforms)}function T4(t,e,n,s=!1){return Ll(n,t.I(s?4:3,e))}function Ll(t,e){if(aw(t=zn(t)))return gy("Unsupported field value:",e,t),sw(t,e);if(t instanceof Md)return function(s,a){if(!nw(a.dataSource))throw a.yc(`${s._methodName}() can only be used with update() and set()`);if(!a.path)throw a.yc(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(a);i&&a.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(s,a){const i=[];let r=0;for(const l of s){let c=Ll(l,a.gc(r));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),r++}return{arrayValue:{values:i}}}(t,e)}return function(s,a){if((s=zn(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return tC(a.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=Ft.fromDate(s);return{timestampValue:Pf(a.serializer,i)}}if(s instanceof Ft){const i=new Ft(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Pf(a.serializer,i)}}if(s instanceof Da)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Xs)return{bytesValue:wE(a.serializer,s._byteString)};if(s instanceof rn){const i=a.databaseId,r=s.firestore._databaseId;if(!r.isEqual(i))throw a.yc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Qg(s.firestore._databaseId||a.databaseId,s._key.path)}}if(s instanceof ma)return function(r,l){const c=r instanceof ma?r.toArray():r;return{mapValue:{fields:{[W2]:{stringValue:Z2},[Cf]:{arrayValue:{values:c.map(d=>{if(typeof d!="number")throw l.yc("VectorValues must only contain numeric values.");return Gg(l.serializer,d)})}}}}}}(s,a);if(IE(s))return s._toProto(a.serializer);throw a.yc(`Unsupported field value: ${yd(s)}`)}(t,e)}function sw(t,e){const n={};return q2(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):br(t,(s,a)=>{const i=Ll(a,e.dc(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function aw(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ft||t instanceof Da||t instanceof Xs||t instanceof rn||t instanceof Md||t instanceof ma||IE(t))}function gy(t,e,n){if(!aw(n)||!F2(n)){const s=yd(n);throw s==="an object"?e.yc(t+" a custom object"):e.yc(t+" "+s)}}function _l(t,e,n){if((e=zn(e))instanceof dy)return e._internalPath;if(typeof e=="string")return iw(t,e);throw Bf("Field path arguments must be of type string or ",t,!1,void 0,n)}const E4=new RegExp("[~\\*/\\[\\]]");function iw(t,e,n){if(e.search(E4)>=0)throw Bf(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new dy(...e.split("."))._internalPath}catch{throw Bf(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Bf(t,e,n,s,a){const i=s&&!s.isEmpty(),r=a!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||r)&&(c+=" (found",i&&(c+=` in field ${s}`),r&&(c+=` in document ${a}`),c+=")"),new le(q.INVALID_ARGUMENT,l+t+c)}function rw(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class w4{convertValue(e,n="none"){switch(dr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return hn(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(fr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw Ne(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return br(e,(a,i)=>{s[a]=this.convertValue(i,n)}),s}convertVectorValue(e){var s,a,i;const n=(i=(a=(s=e.fields)==null?void 0:s[Cf].arrayValue)==null?void 0:a.values)==null?void 0:i.map(r=>hn(r.doubleValue));return new ma(n)}convertGeoPoint(e){return new Da(hn(e.latitude),hn(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=xd(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(nu(e));default:return null}}convertTimestamp(e){const n=hr(e);return new Ft(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=Vt.fromString(e);vt(CE(s),9688,{name:e});const a=new su(s.get(1),s.get(3)),i=new xe(s.popFirst(5));return a.isEqual(n)||gi(`Document ${i} contains a document reference within a different database (${a.projectId}/${a.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */class yy extends w4{constructor(e){super(),this.firestore=e}convertBytes(e){return new Xs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new rn(this.firestore,null,n)}}function Cr(...t){return new py("arrayUnion",t)}const pb="@firebase/firestore",gb="4.14.0";/**
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
 */function yb(t){return function(n,s){if(typeof n!="object"||n===null)return!1;const a=n;for(const i of s)if(i in a&&typeof a[i]=="function")return!0;return!1}(t,["next","error","complete"])}/**
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
 */class ow{constructor(e,n,s,a,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=a,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new rn(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new S4(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const n=this._document.data.field(_l("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class S4 extends ow{data(){return super.data()}}/**
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
 */function lw(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new le(q.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class vy{}class cw extends vy{}function vb(t,e,...n){let s=[];e instanceof vy&&s.push(e),s=s.concat(n),function(i){const r=i.filter(c=>c instanceof by).length,l=i.filter(c=>c instanceof jd).length;if(r>1||r>0&&l>0)throw new le(q.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const a of s)t=a._apply(t);return t}class jd extends cw{constructor(e,n,s){super(),this._field=e,this._op=n,this._value=s,this.type="where"}static _create(e,n,s){return new jd(e,n,s)}_apply(e){const n=this._parse(e);return uw(e._query,n),new _r(e.firestore,e.converter,cp(e._query,n))}_parse(e){const n=my(e.firestore);return function(i,r,l,c,h,d,p){let g;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new le(q.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){_b(p,d);const C=[];for(const I of p)C.push(xb(c,i,I));g={arrayValue:{values:C}}}else g=xb(c,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||_b(p,d),g=T4(l,r,p,d==="in"||d==="not-in");return Tn.create(h,d,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function zm(t,e,n){const s=e,a=_l("where",t);return jd._create(a,s,n)}class by extends vy{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new by(e,n)}_parse(e){const n=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return n.length===1?n[0]:pa.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(a,i){let r=a;const l=i.getFlattenedFilters();for(const c of l)uw(r,c),r=cp(r,c)}(e._query,n),new _r(e.firestore,e.converter,cp(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class xy extends cw{constructor(e,n,s){super(),this.type=e,this._limit=n,this._limitType=s}static _create(e,n,s){return new xy(e,n,s)}_apply(e){return new _r(e.firestore,e.converter,Df(e._query,this._limit,this._limitType))}}function bb(t){return xk("limit",t),xy._create("limit",t,"F")}function xb(t,e,n){if(typeof(n=zn(n))=="string"){if(n==="")throw new le(q.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!oE(e)&&n.indexOf("/")!==-1)throw new le(q.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const s=e.path.child(Vt.fromString(n));if(!xe.isDocumentKey(s))throw new le(q.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return I1(t,new xe(s))}if(n instanceof rn)return I1(t,n._key);throw new le(q.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${yd(n)}.`)}function _b(t,e){if(!Array.isArray(t)||t.length===0)throw new le(q.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function uw(t,e){const n=function(a,i){for(const r of a)for(const l of r.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(a){switch(a){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new le(q.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new le(q.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function A4(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}class fc{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class qr extends ow{constructor(e,n,s,a,i,r){super(e,n,s,a,r),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Bh(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(_l("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new le(q.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=qr._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}qr._jsonSchemaVersion="firestore/documentSnapshot/1.0",qr._jsonSchema={type:wn("string",qr._jsonSchemaVersion),bundleSource:wn("string","DocumentSnapshot"),bundleName:wn("string"),bundle:wn("string")};class Bh extends qr{data(e={}){return super.data(e)}}class Gr{constructor(e,n,s,a){this._firestore=e,this._userDataWriter=n,this._snapshot=a,this.metadata=new fc(a.hasPendingWrites,a.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new Bh(this._firestore,this._userDataWriter,s.key,s,new fc(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new le(q.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(a,i){if(a._snapshot.oldDocs.isEmpty()){let r=0;return a._snapshot.docChanges.map(l=>{const c=new Bh(a._firestore,a._userDataWriter,l.doc.key,l.doc,new fc(a._snapshot.mutatedKeys.has(l.doc.key),a._snapshot.fromCache),a.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:r++}})}{let r=a._snapshot.oldDocs;return a._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new Bh(a._firestore,a._userDataWriter,l.doc.key,l.doc,new fc(a._snapshot.mutatedKeys.has(l.doc.key),a._snapshot.fromCache),a.query.converter);let h=-1,d=-1;return l.type!==0&&(h=r.indexOf(l.doc.key),r=r.delete(l.doc.key)),l.type!==1&&(r=r.add(l.doc),d=r.indexOf(l.doc.key)),{type:N4(l.type),doc:c,oldIndex:h,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new le(q.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Gr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=zg.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],s=[],a=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),a.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function N4(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Ne(61501,{type:t})}}/**
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
 */Gr._jsonSchemaVersion="firestore/querySnapshot/1.0",Gr._jsonSchema={type:wn("string",Gr._jsonSchemaVersion),bundleSource:wn("string","QuerySnapshot"),bundleName:wn("string"),bundle:wn("string")};/**
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
 */function R4(t){t=Zs(t,rn);const e=Zs(t.firestore,to),n=Id(e);return o4(n,t._key).then(s=>fw(e,t,s))}function Tb(t){t=Zs(t,_r);const e=Zs(t.firestore,to),n=Id(e),s=new yy(e);return lw(t._query),l4(n,t._query).then(a=>new Gr(e,s,t,a))}function k4(t,e,n){t=Zs(t,rn);const s=Zs(t.firestore,to),a=A4(t.converter,e,n),i=my(s);return hw(s,[v4(i,"setDoc",t._key,a,t.converter!==null,n).toMutation(t._key,Ia.none())])}function Eb(t,e,n,...s){t=Zs(t,rn);const a=Zs(t.firestore,to),i=my(a);let r;return r=typeof(e=zn(e))=="string"||e instanceof dy?_4(i,"updateDoc",t._key,e,n,s):x4(i,"updateDoc",t._key,e),hw(a,[r.toMutation(t._key,Ia.exists(!0))])}function C4(t,...e){var h,d,p;t=zn(t);let n={includeMetadataChanges:!1,source:"default"},s=0;typeof e[s]!="object"||yb(e[s])||(n=e[s++]);const a={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(yb(e[s])){const g=e[s];e[s]=(h=g.next)==null?void 0:h.bind(g),e[s+1]=(d=g.error)==null?void 0:d.bind(g),e[s+2]=(p=g.complete)==null?void 0:p.bind(g)}let i,r,l;if(t instanceof rn)r=Zs(t.firestore,to),l=_d(t._key.path),i={next:g=>{e[s]&&e[s](fw(r,t,g))},error:e[s+1],complete:e[s+2]};else{const g=Zs(t,_r);r=Zs(g.firestore,to),l=g._query;const v=new yy(r);i={next:C=>{e[s]&&e[s](new Gr(r,v,g,C))},error:e[s+1],complete:e[s+2]},lw(t._query)}const c=Id(r);return r4(c,l,a,i)}function hw(t,e){const n=Id(t);return c4(n,e)}function fw(t,e,n){const s=n.docs.get(e._key),a=new yy(t);return new qr(t,a,e._key,s,new fc(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){lk(Dl),cr(new mi("firestore",(s,{instanceIdentifier:a,options:i})=>{const r=s.getProvider("app").getImmediate(),l=new to(new hk(s.getProvider("auth-internal")),new mk(r,s.getProvider("app-check-internal")),Mk(r,a),r);return i={useFetchStreams:n,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),ri(pb,gb,e),ri(pb,gb,"esm2020")})();function dw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const I4=dw,mw=new Ml("auth","Firebase",dw());/**
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
 */const $f=new gd("@firebase/auth");function M4(t,...e){$f.logLevel<=tt.WARN&&$f.warn(`Auth (${Dl}): ${t}`,...e)}function $h(t,...e){$f.logLevel<=tt.ERROR&&$f.error(`Auth (${Dl}): ${t}`,...e)}/**
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
 */function vi(t,...e){throw _y(t,...e)}function Oa(t,...e){return _y(t,...e)}function pw(t,e,n){const s={...I4(),[e]:n};return new Ml("auth","Firebase",s).create(e,{appName:t.name})}function sr(t){return pw(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _y(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return mw.create(t,...e)}function Me(t,e,...n){if(!t)throw _y(e,...n)}function ti(t){const e="INTERNAL ASSERTION FAILED: "+t;throw $h(e),new Error(e)}function bi(t,e){t||ti(e)}/**
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
 */function bp(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function D4(){return wb()==="http:"||wb()==="https:"}function wb(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
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
 */function O4(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(D4()||j5()||"connection"in navigator)?navigator.onLine:!0}function j4(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Cu{constructor(e,n){this.shortDelay=e,this.longDelay=n,bi(n>e,"Short delay should be less than long delay!"),this.isMobile=M5()||P5()}get(){return O4()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ty(t,e){bi(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class gw{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ti("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ti("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ti("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const P4={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const V4=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],L4=new Cu(3e4,6e4);function Pd(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Ul(t,e,n,s,a={}){return yw(t,a,async()=>{let i={},r={};s&&(e==="GET"?r=s:i={body:JSON.stringify(s)});const l=_u({key:t.config.apiKey,...r}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const h={method:e,headers:c,...i};return O5()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&Tu(t.emulatorConfig.host)&&(h.credentials="include"),gw.fetch()(await bw(t,t.config.apiHost,n,l),h)})}async function yw(t,e,n){t._canInitEmulator=!1;const s={...P4,...e};try{const a=new U4(t),i=await Promise.race([n(),a.promise]);a.clearNetworkTimeout();const r=await i.json();if("needConfirmation"in r)throw ph(t,"account-exists-with-different-credential",r);if(i.ok&&!("errorMessage"in r))return r;{const l=i.ok?r.errorMessage:r.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ph(t,"credential-already-in-use",r);if(c==="EMAIL_EXISTS")throw ph(t,"email-already-in-use",r);if(c==="USER_DISABLED")throw ph(t,"user-disabled",r);const d=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw pw(t,d,h);vi(t,d)}}catch(a){if(a instanceof _i)throw a;vi(t,"network-request-failed",{message:String(a)})}}async function vw(t,e,n,s,a={}){const i=await Ul(t,e,n,s,a);return"mfaPendingCredential"in i&&vi(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function bw(t,e,n,s){const a=`${e}${n}?${s}`,i=t,r=i.config.emulator?Ty(t.config,a):`${t.config.apiScheme}://${a}`;return V4.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(r).toString():r}class U4{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Oa(this.auth,"network-request-failed")),L4.get())})}}function ph(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const a=Oa(t,e,s);return a.customData._tokenResponse=n,a}/**
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
 */async function z4(t,e){return Ul(t,"POST","/v1/accounts:delete",e)}async function Ff(t,e){return Ul(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Dc(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function B4(t,e=!1){const n=zn(t),s=await n.getIdToken(e),a=Ey(s);Me(a&&a.exp&&a.auth_time&&a.iat,n.auth,"internal-error");const i=typeof a.firebase=="object"?a.firebase:void 0,r=i==null?void 0:i.sign_in_provider;return{claims:a,token:s,authTime:Dc(Bm(a.auth_time)),issuedAtTime:Dc(Bm(a.iat)),expirationTime:Dc(Bm(a.exp)),signInProvider:r||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Bm(t){return Number(t)*1e3}function Ey(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return $h("JWT malformed, contained fewer than 3 sections"),null;try{const a=E2(n);return a?JSON.parse(a):($h("Failed to decode base64 JWT payload"),null)}catch(a){return $h("Caught error parsing JWT payload as JSON",a==null?void 0:a.toString()),null}}function Sb(t){const e=Ey(t);return Me(e,"internal-error"),Me(typeof e.exp<"u","internal-error"),Me(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ru(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof _i&&$4(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function $4({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class F4{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class xp{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Dc(this.lastLoginAt),this.creationTime=Dc(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Hf(t){var p;const e=t.auth,n=await t.getIdToken(),s=await ru(t,Ff(e,{idToken:n}));Me(s==null?void 0:s.users.length,e,"internal-error");const a=s.users[0];t._notifyReloadListener(a);const i=(p=a.providerUserInfo)!=null&&p.length?xw(a.providerUserInfo):[],r=q4(t.providerData,i),l=t.isAnonymous,c=!(t.email&&a.passwordHash)&&!(r!=null&&r.length),h=l?c:!1,d={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:r,metadata:new xp(a.createdAt,a.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function H4(t){const e=zn(t);await Hf(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function q4(t,e){return[...t.filter(s=>!e.some(a=>a.providerId===s.providerId)),...e]}function xw(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function G4(t,e){const n=await yw(t,{},async()=>{const s=_u({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:a,apiKey:i}=t.config,r=await bw(t,a,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:s};return t.emulatorConfig&&Tu(t.emulatorConfig.host)&&(c.credentials="include"),gw.fetch()(r,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Y4(t,e){return Ul(t,"POST","/v2/accounts:revokeToken",Pd(t,e))}/**
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
 */class tl{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Me(e.idToken,"internal-error"),Me(typeof e.idToken<"u","internal-error"),Me(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Sb(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Me(e.length!==0,"internal-error");const n=Sb(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Me(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:a,expiresIn:i}=await G4(e,n);this.updateTokensAndExpiration(s,a,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:a,expirationTime:i}=n,r=new tl;return s&&(Me(typeof s=="string","internal-error",{appName:e}),r.refreshToken=s),a&&(Me(typeof a=="string","internal-error",{appName:e}),r.accessToken=a),i&&(Me(typeof i=="number","internal-error",{appName:e}),r.expirationTime=i),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new tl,this.toJSON())}_performRefresh(){return ti("not implemented")}}/**
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
 */function Ai(t,e){Me(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class fa{constructor({uid:e,auth:n,stsTokenManager:s,...a}){this.providerId="firebase",this.proactiveRefresh=new F4(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new xp(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const n=await ru(this,this.stsTokenManager.getToken(this.auth,e));return Me(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return B4(this,e)}reload(){return H4(this)}_assign(e){this!==e&&(Me(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new fa({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){Me(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Hf(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ha(this.auth.app))return Promise.reject(sr(this.auth));const e=await this.getIdToken();return await ru(this,z4(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,a=n.email??void 0,i=n.phoneNumber??void 0,r=n.photoURL??void 0,l=n.tenantId??void 0,c=n._redirectEventId??void 0,h=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:v,providerData:C,stsTokenManager:I}=n;Me(p&&I,e,"internal-error");const j=tl.fromJSON(this.name,I);Me(typeof p=="string",e,"internal-error"),Ai(s,e.name),Ai(a,e.name),Me(typeof g=="boolean",e,"internal-error"),Me(typeof v=="boolean",e,"internal-error"),Ai(i,e.name),Ai(r,e.name),Ai(l,e.name),Ai(c,e.name),Ai(h,e.name),Ai(d,e.name);const _=new fa({uid:p,auth:e,email:a,emailVerified:g,displayName:s,isAnonymous:v,photoURL:r,phoneNumber:i,tenantId:l,stsTokenManager:j,createdAt:h,lastLoginAt:d});return C&&Array.isArray(C)&&(_.providerData=C.map(b=>({...b}))),c&&(_._redirectEventId=c),_}static async _fromIdTokenResponse(e,n,s=!1){const a=new tl;a.updateFromServerResponse(n);const i=new fa({uid:n.localId,auth:e,stsTokenManager:a,isAnonymous:s});return await Hf(i),i}static async _fromGetAccountInfoResponse(e,n,s){const a=n.users[0];Me(a.localId!==void 0,"internal-error");const i=a.providerUserInfo!==void 0?xw(a.providerUserInfo):[],r=!(a.email&&a.passwordHash)&&!(i!=null&&i.length),l=new tl;l.updateFromIdToken(s);const c=new fa({uid:a.localId,auth:e,stsTokenManager:l,isAnonymous:r}),h={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:i,metadata:new xp(a.createdAt,a.lastLoginAt),isAnonymous:!(a.email&&a.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
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
 */const Ab=new Map;function ni(t){bi(t instanceof Function,"Expected a class definition");let e=Ab.get(t);return e?(bi(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ab.set(t,e),e)}/**
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
 */class _w{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}_w.type="NONE";const Nb=_w;/**
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
 */function Fh(t,e,n){return`firebase:${t}:${e}:${n}`}class nl{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:a,name:i}=this.auth;this.fullUserKey=Fh(this.userKey,a.apiKey,i),this.fullPersistenceKey=Fh("persistence",a.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Ff(this.auth,{idToken:e}).catch(()=>{});return n?fa._fromGetAccountInfoResponse(this.auth,n,e):null}return fa._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new nl(ni(Nb),e,s);const a=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=a[0]||ni(Nb);const r=Fh(s,e.config.apiKey,e.name);let l=null;for(const h of n)try{const d=await h._get(r);if(d){let p;if(typeof d=="string"){const g=await Ff(e,{idToken:d}).catch(()=>{});if(!g)break;p=await fa._fromGetAccountInfoResponse(e,g,d)}else p=fa._fromJSON(e,d);h!==i&&(l=p),i=h;break}}catch{}const c=a.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new nl(i,e,s):(i=c[0],l&&await i._set(r,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(r)}catch{}})),new nl(i,e,s))}}/**
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
 */function Rb(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Sw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Tw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Nw(e))return"Blackberry";if(Rw(e))return"Webos";if(Ew(e))return"Safari";if((e.includes("chrome/")||ww(e))&&!e.includes("edge/"))return"Chrome";if(Aw(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Tw(t=rs()){return/firefox\//i.test(t)}function Ew(t=rs()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ww(t=rs()){return/crios\//i.test(t)}function Sw(t=rs()){return/iemobile/i.test(t)}function Aw(t=rs()){return/android/i.test(t)}function Nw(t=rs()){return/blackberry/i.test(t)}function Rw(t=rs()){return/webos/i.test(t)}function wy(t=rs()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function K4(t=rs()){var e;return wy(t)&&!!((e=window.navigator)!=null&&e.standalone)}function Q4(){return V5()&&document.documentMode===10}function kw(t=rs()){return wy(t)||Aw(t)||Rw(t)||Nw(t)||/windows phone/i.test(t)||Sw(t)}/**
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
 */function Cw(t,e=[]){let n;switch(t){case"Browser":n=Rb(rs());break;case"Worker":n=`${Rb(rs())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Dl}/${s}`}/**
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
 */class X4{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((r,l)=>{try{const c=e(i);r(c)}catch(c){l(c)}});s.onAbort=n,this.queue.push(s);const a=this.queue.length-1;return()=>{this.queue[a]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const a of n)try{a()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function W4(t,e={}){return Ul(t,"GET","/v2/passwordPolicy",Pd(t,e))}/**
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
 */const J4=6;class Z4{constructor(e){var s;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??J4,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,a=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),a&&(n.meetsMaxPasswordLength=e.length<=a)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let a=0;a<e.length;a++)s=e.charAt(a),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,a,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=a)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class eM{constructor(e,n,s,a){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=a,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new kb(this),this.idTokenSubscription=new kb(this),this.beforeStateQueue=new X4(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=mw,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=a.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ni(n)),this._initializationPromise=this.queue(async()=>{var s,a,i;if(!this._deleted&&(this.persistenceManager=await nl.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((a=this._popupRedirectResolver)!=null&&a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ff(this,{idToken:e}),s=await fa._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(ha(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!r||r===l)&&(c!=null&&c.user)&&(s=c.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(r){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Me(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Hf(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=j4()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ha(this.app))return Promise.reject(sr(this));const n=e?zn(e):null;return n&&Me(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Me(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ha(this.app)?Promise.reject(sr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ha(this.app)?Promise.reject(sr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ni(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await W4(this),n=new Z4(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ml("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await Y4(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ni(e)||this._popupRedirectResolver;Me(n,this,"argument-error"),this.redirectPersistenceManager=await nl.create(this,[ni(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,a){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let r=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Me(l,this,"internal-error"),l.then(()=>{r||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,a);return()=>{r=!0,c()}}else{const c=e.addObserver(n);return()=>{r=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Me(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Cw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var a;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((a=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:a.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var n;if(ha(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&M4(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Vd(t){return zn(t)}class kb{constructor(e){this.auth=e,this.observer=null,this.addObserver=H5(n=>this.observer=n)}get next(){return Me(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Sy={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function tM(t){Sy=t}function nM(t){return Sy.loadJS(t)}function sM(){return Sy.gapiScript}function aM(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function iM(t,e){const n=Eu(t,"auth");if(n.isInitialized()){const a=n.getImmediate(),i=n.getOptions();if(lr(i,e??{}))return a;vi(a,"already-initialized")}return n.initialize({options:e})}function rM(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(ni);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function oM(t,e,n){const s=Vd(t);Me(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const a=!!(n!=null&&n.disableWarnings),i=Iw(e),{host:r,port:l}=lM(e),c=l===null?"":`:${l}`,h={url:`${i}//${r}${c}/`},d=Object.freeze({host:r,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:a})});if(!s._canInitEmulator){Me(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),Me(lr(h,s.config.emulator)&&lr(d,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=h,s.emulatorConfig=d,s.settings.appVerificationDisabledForTesting=!0,Tu(r)?R2(`${i}//${r}${c}`):a||cM()}function Iw(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function lM(t){const e=Iw(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",a=/^(\[[^\]]+\])(:|$)/.exec(s);if(a){const i=a[1];return{host:i,port:Cb(s.substr(i.length+1))}}else{const[i,r]=s.split(":");return{host:i,port:Cb(r)}}}function Cb(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function cM(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Mw{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ti("not implemented")}_getIdTokenResponse(e){return ti("not implemented")}_linkToIdToken(e,n){return ti("not implemented")}_getReauthenticationResolver(e){return ti("not implemented")}}/**
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
 */async function sl(t,e){return vw(t,"POST","/v1/accounts:signInWithIdp",Pd(t,e))}/**
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
 */const uM="http://localhost";class no extends Mw{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new no(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):vi("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:a,...i}=n;if(!s||!a)return null;const r=new no(s,a);return r.idToken=i.idToken||void 0,r.accessToken=i.accessToken||void 0,r.secret=i.secret,r.nonce=i.nonce,r.pendingToken=i.pendingToken||null,r}_getIdTokenResponse(e){const n=this.buildRequest();return sl(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,sl(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,sl(e,n)}buildRequest(){const e={requestUri:uM,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=_u(n)}return e}}/**
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
 */class Dw{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Iu extends Dw{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Di extends Iu{constructor(){super("facebook.com")}static credential(e){return no._fromParams({providerId:Di.PROVIDER_ID,signInMethod:Di.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Di.credentialFromTaggedObject(e)}static credentialFromError(e){return Di.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Di.credential(e.oauthAccessToken)}catch{return null}}}Di.FACEBOOK_SIGN_IN_METHOD="facebook.com";Di.PROVIDER_ID="facebook.com";/**
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
 */class Oi extends Iu{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return no._fromParams({providerId:Oi.PROVIDER_ID,signInMethod:Oi.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Oi.credentialFromTaggedObject(e)}static credentialFromError(e){return Oi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Oi.credential(n,s)}catch{return null}}}Oi.GOOGLE_SIGN_IN_METHOD="google.com";Oi.PROVIDER_ID="google.com";/**
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
 */class ji extends Iu{constructor(){super("github.com")}static credential(e){return no._fromParams({providerId:ji.PROVIDER_ID,signInMethod:ji.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ji.credentialFromTaggedObject(e)}static credentialFromError(e){return ji.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ji.credential(e.oauthAccessToken)}catch{return null}}}ji.GITHUB_SIGN_IN_METHOD="github.com";ji.PROVIDER_ID="github.com";/**
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
 */class Pi extends Iu{constructor(){super("twitter.com")}static credential(e,n){return no._fromParams({providerId:Pi.PROVIDER_ID,signInMethod:Pi.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Pi.credentialFromTaggedObject(e)}static credentialFromError(e){return Pi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Pi.credential(n,s)}catch{return null}}}Pi.TWITTER_SIGN_IN_METHOD="twitter.com";Pi.PROVIDER_ID="twitter.com";/**
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
 */async function hM(t,e){return vw(t,"POST","/v1/accounts:signUp",Pd(t,e))}/**
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
 */class gr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,a=!1){const i=await fa._fromIdTokenResponse(e,s,a),r=Ib(s);return new gr({user:i,providerId:r,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const a=Ib(s);return new gr({user:e,providerId:a,_tokenResponse:s,operationType:n})}}function Ib(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function fM(t){var a;if(ha(t.app))return Promise.reject(sr(t));const e=Vd(t);if(await e._initializationPromise,(a=e.currentUser)!=null&&a.isAnonymous)return new gr({user:e.currentUser,providerId:null,operationType:"signIn"});const n=await hM(e,{returnSecureToken:!0}),s=await gr._fromIdTokenResponse(e,"signIn",n,!0);return await e._updateCurrentUser(s.user),s}/**
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
 */class qf extends _i{constructor(e,n,s,a){super(n.code,n.message),this.operationType=s,this.user=a,Object.setPrototypeOf(this,qf.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,a){return new qf(e,n,s,a)}}function Ow(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?qf._fromErrorAndOperation(t,i,e,s):i})}async function dM(t,e,n=!1){const s=await ru(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return gr._forOperation(t,"link",s)}/**
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
 */async function mM(t,e,n=!1){const{auth:s}=t;if(ha(s.app))return Promise.reject(sr(s));const a="reauthenticate";try{const i=await ru(t,Ow(s,a,e,t),n);Me(i.idToken,s,"internal-error");const r=Ey(i.idToken);Me(r,s,"internal-error");const{sub:l}=r;return Me(t.uid===l,s,"user-mismatch"),gr._forOperation(t,a,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&vi(s,"user-mismatch"),i}}/**
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
 */async function pM(t,e,n=!1){if(ha(t.app))return Promise.reject(sr(t));const s="signIn",a=await Ow(t,s,e),i=await gr._fromIdTokenResponse(t,s,a);return n||await t._updateCurrentUser(i.user),i}function gM(t,e,n,s){return zn(t).onIdTokenChanged(e,n,s)}function yM(t,e,n){return zn(t).beforeAuthStateChanged(e,n)}function vM(t,e,n,s){return zn(t).onAuthStateChanged(e,n,s)}const Gf="__sak";/**
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
 */class jw{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Gf,"1"),this.storage.removeItem(Gf),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const bM=1e3,xM=10;class Pw extends jw{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=kw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),a=this.localCache[n];s!==a&&e(n,a,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((r,l,c)=>{this.notifyListeners(r,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const a=()=>{const r=this.storage.getItem(s);!n&&this.localCache[s]===r||this.notifyListeners(s,r)},i=this.storage.getItem(s);Q4()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(a,xM):a()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},bM)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Pw.type="LOCAL";const _M=Pw;/**
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
 */class Vw extends jw{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Vw.type="SESSION";const Lw=Vw;/**
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
 */function TM(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Ld{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(a=>a.isListeningto(e));if(n)return n;const s=new Ld(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:a,data:i}=n.data,r=this.handlersMap[a];if(!(r!=null&&r.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:a});const l=Array.from(r).map(async h=>h(n.origin,i)),c=await TM(l);n.ports[0].postMessage({status:"done",eventId:s,eventType:a,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ld.receivers=[];/**
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
 */function Ay(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class EM{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const a=typeof MessageChannel<"u"?new MessageChannel:null;if(!a)throw new Error("connection_unavailable");let i,r;return new Promise((l,c)=>{const h=Ay("",20);a.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},s);r={messageChannel:a,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(r),a.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[a.port2])}).finally(()=>{r&&this.removeMessageHandler(r)})}}/**
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
 */function ja(){return window}function wM(t){ja().location.href=t}/**
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
 */function Uw(){return typeof ja().WorkerGlobalScope<"u"&&typeof ja().importScripts=="function"}async function SM(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function AM(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function NM(){return Uw()?self:null}/**
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
 */const zw="firebaseLocalStorageDb",RM=1,Yf="firebaseLocalStorage",Bw="fbase_key";class Mu{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ud(t,e){return t.transaction([Yf],e?"readwrite":"readonly").objectStore(Yf)}function kM(){const t=indexedDB.deleteDatabase(zw);return new Mu(t).toPromise()}function _p(){const t=indexedDB.open(zw,RM);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Yf,{keyPath:Bw})}catch(a){n(a)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Yf)?e(s):(s.close(),await kM(),e(await _p()))})})}async function Mb(t,e,n){const s=Ud(t,!0).put({[Bw]:e,value:n});return new Mu(s).toPromise()}async function CM(t,e){const n=Ud(t,!1).get(e),s=await new Mu(n).toPromise();return s===void 0?null:s.value}function Db(t,e){const n=Ud(t,!0).delete(e);return new Mu(n).toPromise()}const IM=800,MM=3;class $w{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _p(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>MM)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Uw()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ld._getInstance(NM()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,s;if(this.activeServiceWorker=await SM(),!this.activeServiceWorker)return;this.sender=new EM(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||AM()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await _p();return await Mb(e,Gf,"1"),await Db(e,Gf),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Mb(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>CM(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Db(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(a=>{const i=Ud(a,!1).getAll();return new Mu(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:a,value:i}of e)s.add(a),JSON.stringify(this.localCache[a])!==JSON.stringify(i)&&(this.notifyListeners(a,i),n.push(a));for(const a of Object.keys(this.localCache))this.localCache[a]&&!s.has(a)&&(this.notifyListeners(a,null),n.push(a));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),IM)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}$w.type="LOCAL";const DM=$w;new Cu(3e4,6e4);/**
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
 */function OM(t,e){return e?ni(e):(Me(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Ny extends Mw{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return sl(e,this._buildIdpRequest())}_linkToIdToken(e,n){return sl(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return sl(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function jM(t){return pM(t.auth,new Ny(t),t.bypassAuthState)}function PM(t){const{auth:e,user:n}=t;return Me(n,e,"internal-error"),mM(n,new Ny(t),t.bypassAuthState)}async function VM(t){const{auth:e,user:n}=t;return Me(n,e,"internal-error"),dM(n,new Ny(t),t.bypassAuthState)}/**
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
 */class Fw{constructor(e,n,s,a,i=!1){this.auth=e,this.resolver=s,this.user=a,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:a,tenantId:i,error:r,type:l}=e;if(r){this.reject(r);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:a||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return jM;case"linkViaPopup":case"linkViaRedirect":return VM;case"reauthViaPopup":case"reauthViaRedirect":return PM;default:vi(this.auth,"internal-error")}}resolve(e){bi(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){bi(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const LM=new Cu(2e3,1e4);class Fo extends Fw{constructor(e,n,s,a,i){super(e,n,a,i),this.provider=s,this.authWindow=null,this.pollId=null,Fo.currentPopupAction&&Fo.currentPopupAction.cancel(),Fo.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Me(e,this.auth,"internal-error"),e}async onExecution(){bi(this.filter.length===1,"Popup operations only handle one event");const e=Ay();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Oa(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Oa(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Fo.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if((s=(n=this.authWindow)==null?void 0:n.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Oa(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,LM.get())};e()}}Fo.currentPopupAction=null;/**
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
 */const UM="pendingRedirect",Hh=new Map;class zM extends Fw{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Hh.get(this.auth._key());if(!e){try{const s=await BM(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Hh.set(this.auth._key(),e)}return this.bypassAuthState||Hh.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function BM(t,e){const n=HM(e),s=FM(t);if(!await s._isAvailable())return!1;const a=await s._get(n)==="true";return await s._remove(n),a}function $M(t,e){Hh.set(t._key(),e)}function FM(t){return ni(t._redirectPersistence)}function HM(t){return Fh(UM,t.config.apiKey,t.name)}async function qM(t,e,n=!1){if(ha(t.app))return Promise.reject(sr(t));const s=Vd(t),a=OM(s,e),r=await new zM(s,a,n).execute();return r&&!n&&(delete r.user._redirectEventId,await s._persistUserIfCurrent(r.user),await s._setRedirectUser(null,e)),r}/**
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
 */const GM=10*60*1e3;class YM{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!KM(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!Hw(e)){const a=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";n.onError(Oa(this.auth,a))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=GM&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ob(e))}saveEventToCache(e){this.cachedEventUids.add(Ob(e)),this.lastProcessedEventTime=Date.now()}}function Ob(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Hw({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function KM(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Hw(t);default:return!1}}/**
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
 */async function QM(t,e={}){return Ul(t,"GET","/v1/projects",e)}/**
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
 */const XM=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,WM=/^https?/;async function JM(t){if(t.config.emulator)return;const{authorizedDomains:e}=await QM(t);for(const n of e)try{if(ZM(n))return}catch{}vi(t,"unauthorized-domain")}function ZM(t){const e=bp(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const r=new URL(t);return r.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&r.hostname===s}if(!WM.test(n))return!1;if(XM.test(t))return s===t;const a=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+a+"|"+a+")$","i").test(s)}/**
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
 */const e3=new Cu(3e4,6e4);function jb(){const t=ja().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function t3(t){return new Promise((e,n)=>{var a,i,r;function s(){jb(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jb(),n(Oa(t,"network-request-failed"))},timeout:e3.get()})}if((i=(a=ja().gapi)==null?void 0:a.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((r=ja().gapi)!=null&&r.load)s();else{const l=aM("iframefcb");return ja()[l]=()=>{gapi.load?s():n(Oa(t,"network-request-failed"))},nM(`${sM()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw qh=null,e})}let qh=null;function n3(t){return qh=qh||t3(t),qh}/**
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
 */const s3=new Cu(5e3,15e3),a3="__/auth/iframe",i3="emulator/auth/iframe",r3={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},o3=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function l3(t){const e=t.config;Me(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ty(e,i3):`https://${t.config.authDomain}/${a3}`,s={apiKey:e.apiKey,appName:t.name,v:Dl},a=o3.get(t.config.apiHost);a&&(s.eid=a);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${_u(s).slice(1)}`}async function c3(t){const e=await n3(t),n=ja().gapi;return Me(n,t,"internal-error"),e.open({where:document.body,url:l3(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:r3,dontclear:!0},s=>new Promise(async(a,i)=>{await s.restyle({setHideOnLeave:!1});const r=Oa(t,"network-request-failed"),l=ja().setTimeout(()=>{i(r)},s3.get());function c(){ja().clearTimeout(l),a(s)}s.ping(c).then(c,()=>{i(r)})}))}/**
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
 */const u3={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},h3=500,f3=600,d3="_blank",m3="http://localhost";class Pb{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function p3(t,e,n,s=h3,a=f3){const i=Math.max((window.screen.availHeight-a)/2,0).toString(),r=Math.max((window.screen.availWidth-s)/2,0).toString();let l="";const c={...u3,width:s.toString(),height:a.toString(),top:i,left:r},h=rs().toLowerCase();n&&(l=ww(h)?d3:n),Tw(h)&&(e=e||m3,c.scrollbars="yes");const d=Object.entries(c).reduce((g,[v,C])=>`${g}${v}=${C},`,"");if(K4(h)&&l!=="_self")return g3(e||"",l),new Pb(null);const p=window.open(e||"",l,d);Me(p,t,"popup-blocked");try{p.focus()}catch{}return new Pb(p)}function g3(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const y3="__/auth/handler",v3="emulator/auth/handler",b3=encodeURIComponent("fac");async function Vb(t,e,n,s,a,i){Me(t.config.authDomain,t,"auth-domain-config-required"),Me(t.config.apiKey,t,"invalid-api-key");const r={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Dl,eventId:a};if(e instanceof Dw){e.setDefaultLanguage(t.languageCode),r.providerId=e.providerId||"",F5(e.getCustomParameters())||(r.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries(i||{}))r[d]=p}if(e instanceof Iu){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(r.scopes=d.join(","))}t.tenantId&&(r.tid=t.tenantId);const l=r;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await t._getAppCheckToken(),h=c?`#${b3}=${encodeURIComponent(c)}`:"";return`${x3(t)}?${_u(l).slice(1)}${h}`}function x3({config:t}){return t.emulator?Ty(t,v3):`https://${t.authDomain}/${y3}`}/**
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
 */const $m="webStorageSupport";class _3{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Lw,this._completeRedirectFn=qM,this._overrideRedirectResult=$M}async _openPopup(e,n,s,a){var r;bi((r=this.eventManagers[e._key()])==null?void 0:r.manager,"_initialize() not called before _openPopup()");const i=await Vb(e,n,s,bp(),a);return p3(e,i,Ay())}async _openRedirect(e,n,s,a){await this._originValidation(e);const i=await Vb(e,n,s,bp(),a);return wM(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:a,promise:i}=this.eventManagers[n];return a?Promise.resolve(a):(bi(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await c3(e),s=new YM(e);return n.register("authEvent",a=>(Me(a==null?void 0:a.authEvent,e,"invalid-auth-event"),{status:s.onEvent(a.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send($m,{type:$m},a=>{var r;const i=(r=a==null?void 0:a[0])==null?void 0:r[$m];i!==void 0&&n(!!i),vi(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=JM(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return kw()||Ew()||wy()}}const T3=_3;var Lb="@firebase/auth",Ub="1.13.0";/**
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
 */class E3{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Me(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function w3(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function S3(t){cr(new mi("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),a=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:r,authDomain:l}=s.options;Me(r&&!r.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:r,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Cw(t)},h=new eM(s,a,i,c);return rM(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),cr(new mi("auth-internal",e=>{const n=Vd(e.getProvider("auth").getImmediate());return(s=>new E3(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ri(Lb,Ub,w3(t)),ri(Lb,Ub,"esm2020")}/**
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
 */const A3=5*60,N3=N2("authIdTokenMaxAge")||A3;let zb=null;const R3=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>N3)return;const a=n==null?void 0:n.token;zb!==a&&(zb=a,await fetch(t,{method:a?"POST":"DELETE",headers:a?{Authorization:`Bearer ${a}`}:{}}))};function k3(t=Lg()){const e=Eu(t,"auth");if(e.isInitialized())return e.getImmediate();const n=iM(t,{popupRedirectResolver:T3,persistence:[DM,_M,Lw]}),s=N2("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const r=R3(i.toString());yM(n,r,()=>r(n.currentUser)),gM(n,l=>r(l))}}const a=S2("auth");return a&&oM(n,`http://${a}`),n}function C3(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}tM({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=a=>{const i=Oa("internal-error");i.customData=a,n(i)},s.type="text/javascript",s.charset="UTF-8",C3().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});S3("Browser");/**
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
 */const Tp=new Map,qw={activated:!1,tokenObservers:[]},I3={initialized:!1,enabled:!1};function In(t){return Tp.get(t)||{...qw}}function M3(t,e){return Tp.set(t,e),Tp.get(t)}function zd(){return I3}/**
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
 */const Gw="https://content-firebaseappcheck.googleapis.com/v1",D3="exchangeRecaptchaV3Token",O3="exchangeDebugToken",Bb={OFFSET_DURATION:5*60*1e3,RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},j3=24*60*60*1e3;/**
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
 */class P3{constructor(e,n,s,a,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=a,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=a,a>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Zc,this.pending.promise.catch(n=>{}),await V3(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Zc,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function V3(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */const L3={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Ss=new Ml("appCheck","AppCheck",L3);/**
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
 */function $b(t=!1){var e;return t?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function Ry(t){if(!In(t).activated)throw Ss.create("use-before-activation",{appName:t.name})}function Yw(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),a=Math.floor((e-n*3600*24-s*3600)/60),i=e-n*3600*24-s*3600-a*60;let r="";return n&&(r+=gh(n)+"d:"),s&&(r+=gh(s)+"h:"),r+=gh(a)+"m:"+gh(i)+"s",r}function gh(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
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
 */async function ky({url:t,body:e},n){const s={"Content-Type":"application/json"},a=n.getImmediate({optional:!0});if(a){const p=await a.getHeartbeatsHeader();p&&(s["X-Firebase-Client"]=p)}const i={method:"POST",body:JSON.stringify(e),headers:s};let r;try{r=await fetch(t,i)}catch(p){throw Ss.create("fetch-network-error",{originalErrorMessage:p==null?void 0:p.message})}if(r.status!==200)throw Ss.create("fetch-status-error",{httpStatus:r.status});let l;try{l=await r.json()}catch(p){throw Ss.create("fetch-parse-error",{originalErrorMessage:p==null?void 0:p.message})}const c=l.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Ss.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${l.ttl}`});const h=Number(c[1])*1e3,d=Date.now();return{token:l.token,expireTimeMillis:d+h,issuedAtTimeMillis:d}}function U3(t,e){const{projectId:n,appId:s,apiKey:a}=t.options;return{url:`${Gw}/projects/${n}/apps/${s}:${D3}?key=${a}`,body:{recaptcha_v3_token:e}}}function Kw(t,e){const{projectId:n,appId:s,apiKey:a}=t.options;return{url:`${Gw}/projects/${n}/apps/${s}:${O3}?key=${a}`,body:{debug_token:e}}}/**
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
 */const z3="firebase-app-check-database",B3=1,ou="firebase-app-check-store",Qw="debug-token";let yh=null;function Xw(){return yh||(yh=new Promise((t,e)=>{try{const n=indexedDB.open(z3,B3);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{var a;e(Ss.create("storage-open",{originalErrorMessage:(a=s.target.error)==null?void 0:a.message}))},n.onupgradeneeded=s=>{const a=s.target.result;switch(s.oldVersion){case 0:a.createObjectStore(ou,{keyPath:"compositeKey"})}}}catch(n){e(Ss.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),yh)}function $3(t){return Jw(Zw(t))}function F3(t,e){return Ww(Zw(t),e)}function H3(t){return Ww(Qw,t)}function q3(){return Jw(Qw)}async function Ww(t,e){const s=(await Xw()).transaction(ou,"readwrite"),i=s.objectStore(ou).put({compositeKey:t,value:e});return new Promise((r,l)=>{i.onsuccess=c=>{r()},s.onerror=c=>{var h;l(Ss.create("storage-set",{originalErrorMessage:(h=c.target.error)==null?void 0:h.message}))}})}async function Jw(t){const n=(await Xw()).transaction(ou,"readonly"),a=n.objectStore(ou).get(t);return new Promise((i,r)=>{a.onsuccess=l=>{const c=l.target.result;i(c?c.value:void 0)},n.onerror=l=>{var c;r(Ss.create("storage-get",{originalErrorMessage:(c=l.target.error)==null?void 0:c.message}))}})}function Zw(t){return`${t.options.appId}-${t.name}`}/**
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
 */const Fi=new gd("@firebase/app-check");/**
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
 */async function G3(t){if(Pg()){let e;try{e=await $3(t)}catch(n){Fi.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Fm(t,e){return Pg()?F3(t,e).catch(n=>{Fi.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function Y3(){let t;try{t=await q3()}catch{}if(t)return t;{const e=crypto.randomUUID();return H3(e).catch(n=>Fi.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
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
 */function Cy(){return zd().enabled}async function Iy(){const t=zd();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function K3(){const t=w2(),e=zd();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Zc;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(Y3())}/**
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
 */const Q3={error:"UNKNOWN_ERROR"};function X3(t){return jg.encodeString(JSON.stringify(t),!1)}async function Ep(t,e=!1,n=!1){const s=t.app;Ry(s);const a=In(s);let i=a.token,r;if(i&&!Ho(i)&&(a.token=void 0,i=void 0),!i){const h=await a.cachedTokenPromise;h&&(Ho(h)?i=h:await Fm(s,void 0))}if(!e&&i&&Ho(i))return{token:i.token};let l=!1;if(Cy())try{const h=await Iy();a.exchangeTokenPromise||(a.exchangeTokenPromise=ky(Kw(s,h),t.heartbeatServiceProvider).finally(()=>{a.exchangeTokenPromise=void 0}),l=!0);const d=await a.exchangeTokenPromise;return await Fm(s,d),a.token=d,{token:d.token}}catch(h){return h.code==="appCheck/throttled"||h.code==="appCheck/initial-throttle"?Fi.warn(h.message):n&&Fi.error(h),Hm(h)}try{a.exchangeTokenPromise||(a.exchangeTokenPromise=a.provider.getToken().finally(()=>{a.exchangeTokenPromise=void 0}),l=!0),i=await In(s).exchangeTokenPromise}catch(h){h.code==="appCheck/throttled"||h.code==="appCheck/initial-throttle"?Fi.warn(h.message):n&&Fi.error(h),r=h}let c;return i?r?Ho(i)?c={token:i.token,internalError:r}:c=Hm(r):(c={token:i.token},a.token=i,await Fm(s,i)):c=Hm(r),l&&nS(s,c),c}async function W3(t){const e=t.app;Ry(e);const{provider:n}=In(e);if(Cy()){const s=await Iy(),{token:a}=await ky(Kw(e,s),t.heartbeatServiceProvider);return{token:a}}else{const{token:s}=await n.getToken();return{token:s}}}function eS(t,e,n,s){const{app:a}=t,i=In(a),r={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,r],i.token&&Ho(i.token)){const l=i.token;Promise.resolve().then(()=>{n({token:l.token}),Fb(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Fb(t))}function tS(t,e){const n=In(t),s=n.tokenObservers.filter(a=>a.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function Fb(t){const{app:e}=t,n=In(e);let s=n.tokenRefresher;s||(s=J3(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function J3(t){const{app:e}=t;return new P3(async()=>{const n=In(e);let s;if(n.token?s=await Ep(t,!0):s=await Ep(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=In(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const a=n.token.expireTimeMillis-5*60*1e3;return s=Math.min(s,a),Math.max(0,s-Date.now())}else return 0},Bb.RETRIAL_MIN_WAIT,Bb.RETRIAL_MAX_WAIT)}function nS(t,e){const n=In(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function Ho(t){return t.expireTimeMillis-Date.now()>0}function Hm(t){return{token:X3(Q3),error:t}}/**
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
 */class Z3{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=In(this.app);for(const n of e)tS(this.app,n.next);return Promise.resolve()}}function eD(t,e){return new Z3(t,e)}function tD(t){return{getToken:e=>Ep(t,e),getLimitedUseToken:()=>W3(t),addTokenListener:e=>eS(t,"INTERNAL",e),removeTokenListener:e=>tS(t.app,e)}}const nD="@firebase/app-check",sD="0.11.2";/**
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
 */const aD="https://www.google.com/recaptcha/api.js";function iD(t,e){const n=new Zc,s=In(t);s.reCAPTCHAState={initialized:n};const a=rD(t),i=$b(!1);return i?Hb(t,e,i,a,n):cD(()=>{const r=$b(!1);if(!r)throw new Error("no recaptcha");Hb(t,e,r,a,n)}),n.promise}function Hb(t,e,n,s,a){n.ready(()=>{lD(t,e,n,s),a.resolve(n)})}function rD(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function oD(t){Ry(t);const n=await In(t).reCAPTCHAState.initialized.promise;return new Promise((s,a)=>{const i=In(t).reCAPTCHAState;n.ready(()=>{s(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function lD(t,e,n,s){const a=n.render(s,{sitekey:e,size:"invisible",callback:()=>{In(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{In(t).reCAPTCHAState.succeeded=!1}}),i=In(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:a}}function cD(t){const e=document.createElement("script");e.src=aD,e.onload=t,document.head.appendChild(e)}/**
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
 */class My{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var s,a,i;hD(this._throttleData);const e=await oD(this._app).catch(r=>{throw Ss.create("recaptcha-error")});if(!((s=In(this._app).reCAPTCHAState)!=null&&s.succeeded))throw Ss.create("recaptcha-error");let n;try{n=await ky(U3(this._app,e),this._heartbeatServiceProvider)}catch(r){throw(a=r.code)!=null&&a.includes("fetch-status-error")?(this._throttleData=uD(Number((i=r.customData)==null?void 0:i.httpStatus),this._throttleData),Ss.create("initial-throttle",{time:Yw(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):r}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Eu(e,"heartbeat"),iD(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof My?this._siteKey===e._siteKey:!1}}function uD(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+j3,httpStatus:t};{const n=e?e.backoffCount:0,s=W5(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function hD(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Ss.create("throttled",{time:Yw(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
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
 */function fD(t=Lg(),e){t=zn(t);const n=Eu(t,"app-check");if(zd().initialized||K3(),Cy()&&Iy().then(a=>console.log(`App Check debug token: ${a}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const a=n.getImmediate(),i=n.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return a;throw Ss.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return dD(t,e.provider,e.isTokenAutoRefreshEnabled),In(t).isTokenAutoRefreshEnabled&&eS(s,"INTERNAL",()=>{}),s}function dD(t,e,n=!1){const s=M3(t,{...qw});s.activated=!0,s.provider=e,s.cachedTokenPromise=G3(t).then(a=>(a&&Ho(a)&&(s.token=a,nS(t,{token:a.token})),a)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Fi.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}const mD="app-check",qb="app-check-internal";function pD(){cr(new mi(mD,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return eD(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(qb).initialize()})),cr(new mi(qb,t=>{const e=t.getProvider("app-check").getImmediate();return tD(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ri(nD,sD)}pD();const gD={apiKey:"AIzaSyAWUXxzuVCzJXlpz7NfRtVSgF9HvylLQX0",authDomain:"rrmgame-7df52.firebaseapp.com",projectId:"rrmgame-7df52",storageBucket:"rrmgame-7df52.firebasestorage.app",messagingSenderId:"975432671213",appId:"1:975432671213:web:7495a65b68a80559f811e4",measurementId:"G-JNBJM2HTP5"},Dy=I2(gD),Pr=d4(Dy),Gb=k3(Dy),Yb={}.VITE_FIREBASE_APP_CHECK_SITE_KEY;typeof window<"u"&&Yb&&fD(Dy,{provider:new My(Yb),isTokenAutoRefreshEnabled:!0});/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yD=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),vD=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,s)=>s?s.toUpperCase():n.toLowerCase()),Kb=t=>{const e=vD(t);return e.charAt(0).toUpperCase()+e.slice(1)},sS=(...t)=>t.filter((e,n,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===n).join(" ").trim(),bD=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var xD={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _D=R.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:s,className:a="",children:i,iconNode:r,...l},c)=>R.createElement("svg",{ref:c,...xD,width:e,height:e,stroke:t,strokeWidth:s?Number(n)*24/Number(e):n,className:sS("lucide",a),...!i&&!bD(l)&&{"aria-hidden":"true"},...l},[...r.map(([h,d])=>R.createElement(h,d)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const os=(t,e)=>{const n=R.forwardRef(({className:s,...a},i)=>R.createElement(_D,{ref:i,iconNode:e,className:sS(`lucide-${yD(Kb(t))}`,`lucide-${t}`,s),...a}));return n.displayName=Kb(t),n};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TD=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ED=os("arrow-right",TD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wD=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],SD=os("briefcase",wD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AD=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],wp=os("chevron-right",AD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ND=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],Sp=os("coins",ND);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RD=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M16 8h.01",key:"cr5u4v"}],["path",{d:"M8 8h.01",key:"1e4136"}],["path",{d:"M8 16h.01",key:"18s6g9"}],["path",{d:"M16 16h.01",key:"1f9h7w"}],["path",{d:"M12 12h.01",key:"1mp3jc"}]],Du=os("dice-5",RD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kD=[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]],CD=os("flame",kD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ID=[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",key:"geh8rc"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"1fto5m"}],["path",{d:"m2 16 6 6",key:"1pfhp9"}],["circle",{cx:"16",cy:"9",r:"2.9",key:"1n0dlu"}],["circle",{cx:"6",cy:"5",r:"3",key:"151irh"}]],MD=os("hand-coins",ID);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DD=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Ur=os("loader-circle",DD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OD=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],jD=os("trending-down",OD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PD=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],VD=os("trending-up",PD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LD=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],UD=os("trophy",LD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zD=[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]],BD=os("tv",zD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $D=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],FD=os("users",$D);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HD=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],qD=os("volume-2",HD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GD=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],YD=os("volume-x",GD);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KD=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],aS=os("x",KD),Qb=["ゲーマー","配信者","ギャンブラー","リリム","社畜","無職","お祈り中","底辺","億り人","錬金術師"],Zt=50,yt=Object.freeze({NEUTRAL:"NEUTRAL",MOVE_FORWARD:"MOVE_FORWARD",MOVE_BACKWARD:"MOVE_BACKWARD",GAIN_MONEY:"GAIN_MONEY",LOSE_MONEY:"LOSE_MONEY",INCREASE_PON:"INCREASE_PON"}),Sa=7,Ap=8,Tl=1500,QD=2600,XD=280,WD=Tl+XD,JD=Tl+QD,ZD=15,Kf=100,eO=[100,300,500,1e3],O={startingMoney:600,pon:{startMin:10,startMax:20,dailyGain:5,fireThreshold:30,deathThreshold:80,deathChance:.5,stream:{moneyMin:300,moneyMax:800,skillLoss:20},work:{penaltyMin:200,penaltyMax:500}},stream:{baseFailRate:.6,combinedStatNoFailThreshold:150,successMin:400,successMax:1800,chat:{virtueGainMin:5,virtueGainMax:15},game:{skillGainMin:15,skillGainMax:35}},work:{reward:1300,skillGain:0,virtueGain:3},living:{dailyCost:500},rimiru:{interestPercent:10,dailyGracesBefore:2,day8TurnsBefore:3},dice:{maxTurns:ZD,slotsPerSugorokuTurn:3,shopCost:150,helpChance:.3,helpVirtueMin:22,helpVirtueMax:38,taxiChance:.25,taxiMenuAlwaysVisible:!0,taxiCost:450,taxiMoveMin:12,taxiMoveMax:18,taxiBaseTurns:1,taxiCongestThresh:70,taxiCongestChance:1,taxiCongestPon:10,virtueWaveThresh:100,virtueWavePonDelta:-5,splashRadius:3},slot:{skillBaseline:50,skillBlockSize:10,skillMissReducePerBlock:.015,skillToMid:.3,skillToAtari:.35,skillToSmall:.35,luckBaseline:50,luckRefSpan:50,luckAtariDrainAtLuck100:.02,luckSmallDrainAtLuck100:.03,luckToJp:.3,luckToBig:.7,heatTransferPerSpin:.015,heatWeightJp:1/15,heatWeightBig:3/15,heatWeightMid:5/15,heatWeightAtari:6/15,nearMissReachChance:.12,slipSymbolChance:.1},shrine:{cost:300,luckGain:20,virtueGain:2,ponReduce:10,amuletBaseRate:.2},sugorokuTiles:{neutralRatioMin:.3,neutralRatioMax:.4,moveForwardMin:1,moveForwardMax:3,moveBackwardMin:1,moveBackwardMax:2,gainMoneyMin:200,gainMoneyMax:500,loseMoneyMin:100,loseMoneyMax:300,ponIncreaseMin:10,ponIncreaseMax:25,maxChainSteps:8},dailySlot:{spinBet:300,spins:2,skillGainEverySpin:10,skillGainOnRole:10}},wa={standard:{key:"standard",label:"スタンダード",emoji:"🎰",desc:"バランス型。まずはここから。",color:"text-amber-300",border:"border-amber-500/50 bg-amber-500/10",symbols:["7","BAR","🍒","⭐","🔔","💎"],baseRates:{jp:.005,big:.02,mid:.05,atari:.08,small:.145},basePayout:{miss:0,small:80,atari:150,mid:300,big:1e3,jackpot:3e3}}},en={salaryman:{key:"salaryman",label:"ギャンブラーサラリーマン",emoji:"💼",desc:"技量+20でスタート。仕事の報酬+200G。配信報酬は0.8倍だが安定感がある。",color:"text-sky-300",border:"border-sky-500/60 bg-sky-500/10",skillBonus:20,workRewardBonus:200,streamMultiplier:.8,ponMultiplier:1,dailyLivingCost:500},student:{key:"student",label:"ギャンブル初心者な大学生",emoji:"🎓",desc:"運+10・技量-20。ビギナーズラックでスロットがやや有利。生活費は低めだが仕事収入は半分、PON発火時の資金ペナルティは軽め。配信は通常どおり。",color:"text-emerald-300",border:"border-emerald-500/55 bg-emerald-500/10",luckBonus:10,skillBonus:-20,streamMultiplier:1,ponMultiplier:1,workRewardMultiplier:.5,ponFireMoneyPenaltyMultiplier:.5,dailyLivingCost:300,startingMoney:800},vtuber:{key:"vtuber",label:"リリム",emoji:"🎭",desc:"技量-10・運+10・生活費300Gでスタート。PON上昇1.2倍。失言がバズるたびに配信報酬倍率が+0.5される。",color:"text-violet-300",border:"border-violet-500/60 bg-violet-500/10",skillBonus:-10,luckBonus:10,streamMultiplier:1,ponMultiplier:1.2,dailyLivingCost:300}},iS="闇月リリム",Oc="vtuber";function jc(t){return typeof t=="string"&&t.trim()===iS}const tO=[{key:"luck",label:"運",color:"text-amber-400"},{key:"skill",label:"技量",color:"text-sky-400"},{key:"pon",label:"PON",color:"text-fuchsia-400"},{key:"virtue",label:"善行",color:"text-emerald-400"},{key:"livingCost",label:"生活費",color:"text-orange-300"},{key:"money",label:"資金",color:"text-yellow-300"}],Xb=["/images/icon_rrm.png","/images/icon_rrm.webp","/images/icon_rrm.jpg","/images/icon_rrm.jpeg"],nO=["/images/icon_gambling_salaryman.png","/images/icon_gambling_salaryman.webp","/images/icon_gambling_salaryman.jpg","/images/icon_gambling_salaryman.jpeg"],sO=["/images/gambling_salaryman_noback.png","/images/gambling_salaryman_noback.webp","/images/gambling_salaryman_noback.jpg","/images/gambling_salaryman_noback.jpeg"],aO=["/images/icon_beginner_university_student.png","/images/icon_beginner_university_student.webp","/images/icon_beginner_university_student.jpg","/images/icon_beginner_university_student.jpeg"],iO=["/images/beginner_university_student_noback.png","/images/beginner_university_student_noback.webp","/images/beginner_university_student_noback.jpg","/images/beginner_university_student_noback.jpeg"],Wb={normal:["/images/rrm_noback.png"],fallen:["/images/fell_down_rrm.png","/images/fell_down_rrm.webp"],stumble:["/images/stumble_rrm.png","/images/stumble_rrm.webp"],fell_down:["/images/fell_down_rrm.png","/images/fell_down_rrm.webp"]},rO={salaryman:nO,student:aO,vtuber:Xb,ririm:Xb},Jb={salaryman:{normal:sO,fallen:[],stumble:["/images/stumble_gambling_salaryman.png","/images/stumble_gambling_salaryman.webp"],fell_down:["/images/fell_down_gambling_salaryman.png","/images/fell_down_gambling_salaryman.webp"]},student:{normal:iO,fallen:[],stumble:["/images/stumble_beginner_university_student.png","/images/stumble_beginner_university_student.webp"],fell_down:["/images/fell_down_beginner_university_student.png","/images/fell_down_beginner_university_student.webp"]},vtuber:Wb,ririm:Wb},Zb=["/images/city_seamless.png","/images/city_seamless.webp"],ex={pc:Zb,sp:Zb},Np="/images/taxi.png",oO={taxi_congestion:["/images/traffic_jam.png","/images/traffic_jam.webp","/images/traffic_jam.jpg","/images/traffic_jam.jpeg"],taxi_ride_clear:[Np]};function lO(t){const e=rO[t];return Array.isArray(e)?e:[]}function rS(t,e="normal"){const n=Jb[t]??Jb.salaryman,s=Array.isArray(n.normal)?n.normal:[],a=Array.isArray(n.fallen)?n.fallen:[];return e==="normal"?[...s]:e==="fallen"?[...a,...s]:e==="stumble"?[...Array.isArray(n.stumble)?n.stumble:[],...s]:e==="fell_down"?[...Array.isArray(n.fell_down)?n.fell_down:[],...a,...s]:[...s]}function ta(t){if(t==null||typeof t!="string")return t;const e=t.trim();if(/^https?:\/\//i.test(e)||e.startsWith("data:")||e.startsWith("blob:")||!e.startsWith("/images/"))return e;const n="/".replace(/\/?$/,"/");let s=e.replace(/^\//,"");return s=s.replace(/(\.)([^./\\]+)$/,(a,i,r)=>i+r.toLowerCase()),`${n}${s}`}function El({characterType:t,imgClassName:e="",spanClassName:n="",imgStyle:s,spanStyle:a}){const i=en[t]??en.salaryman,r=lO(t),[l,c]=R.useState(0);return R.useEffect(()=>{c(0)},[t]),!r.length||l>=r.length?u.jsx("span",{className:n,style:a,children:i.emoji??"🙂"}):u.jsx("img",{src:ta(r[l]),alt:"",draggable:!1,className:`select-none ${e}`,style:s,onError:()=>c(h=>h+1)})}function Gh({characterType:t,pose:e="normal",imgClassName:n="",spanClassName:s="",imgStyle:a,spanStyle:i}){const r=en[t]??en.salaryman,l=rS(t,e),[c,h]=R.useState(0);return R.useEffect(()=>{h(0)},[t,e]),!l.length||c>=l.length?u.jsx("span",{className:s,style:i,children:r.emoji??"🙂"}):u.jsx("img",{src:ta(l[c]),alt:"",draggable:!1,className:`select-none ${n}`,style:a,onError:()=>h(d=>d+1)})}function lu({imgClassName:t="",imgStyle:e,emojiFallback:n="🚕"}){const[s,a]=R.useState(!1),i={}.VITE_TAXI_SRC_RAW==="1",r=i?Np:ta(Np);R.useEffect(()=>{a(!1)},[i]);const l={minWidth:48,minHeight:48,objectFit:"contain",boxSizing:"border-box",opacity:1,filter:"brightness(1)",...e};return s?u.jsx("span",{className:`inline-flex min-h-[48px] min-w-[48px] select-none items-center justify-center opacity-100 brightness-100 ${t}`,style:e,title:"taxi image failed — check Network tab for 404 URL",children:n}):u.jsx("img",{src:r,alt:"",draggable:!1,className:`select-none opacity-100 brightness-100 ${t}`,style:l,onError:()=>{a(!0)}})}function oS(t){if(t==null||t==="")return NaN;if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="object"){if(typeof t.toMillis=="function")return t.toMillis();const n=t.seconds??t._seconds;if(typeof n=="number")return n*1e3+Math.floor((t.nanoseconds??t._nanoseconds??0)/1e6)}const e=Number(t);return Number.isFinite(e)?e:NaN}const _t=(t,e=0,n=999999)=>Math.max(e,Math.min(n,t)),vn=t=>Math.round(Math.max(-999999999,Math.min(999999999,t))),ze=(t,e)=>Math.floor(Math.random()*(e-t+1))+t,da=(t,e=[])=>[...t.slice().reverse(),...e].slice(0,30),qm=()=>{const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return Array.from({length:6},()=>t[ze(0,t.length-1)]).join("")},sc=()=>Qb[Math.floor(Math.random()*Qb.length)]+Math.floor(10+Math.random()*89);function lS(t){return(en[t]??en.salaryman).dailyLivingCost??O.living.dailyCost}function dc(t){var n;const e=(n=t==null?void 0:t.stats)==null?void 0:n.livingCost;return typeof e=="number"&&Number.isFinite(e)&&e>=0?e:lS(t==null?void 0:t.characterType)}function Rp(t){const e=en[t]??en.salaryman,n=e.luckBonus??0,s=e.skillBonus??0,a=e.virtueBonus??0,i=e.ponBonus??0,r=(e.dailyLivingCost??O.living.dailyCost)-300;return{luck:{min:n,max:10+n},skill:{min:30+s,max:55+s},virtue:{min:30+a,max:70+a},pon:{min:i,max:50+i},livingCost:{min:200+r,max:450+r}}}const cO=[10,18,26,34,42,50];function Yh(){return{luck:Math.floor(Math.random()*6),skill:Math.floor(Math.random()*6),virtue:Math.floor(Math.random()*6),pon:Math.floor(Math.random()*6)}}function cS(t){return Math.floor((t.luck+t.skill+t.virtue)/3)}function Oy(t,e){const n=en[e]??en.salaryman,s=t.luck,a=t.skill,i=t.virtue,r=t.pon,l=s*2,c=30+a*5,h=20+cO[i],d=r*10,g=200+cS(t)*50,v=_t(l+(n.luckBonus??0),0,999999),C=_t(c+(n.skillBonus??0),0,2e3),I=_t(h+(n.virtueBonus??0),0,999999),j=_t(d+(n.ponBonus??0),0,999999),_=Math.max(50,g+((n.dailyLivingCost??O.living.dailyCost)-300));return{luck:v,skill:C,virtue:I,pon:j,livingCost:_}}function uO(t){return Oy(Yh(),t??"salaryman")}function li(t){if(!t||typeof t!="object")return null;const e=r=>{const l=Number(r);if(!Number.isFinite(l))return null;const c=Math.round(l);return c<0||c>5?null:c},n=e(t.luck),s=e(t.skill),a=e(t.virtue),i=e(t.pon);return n==null||s==null||a==null||i==null?null:{luck:n,skill:s,virtue:a,pon:i}}function hO(t){if(!t||typeof t!="object")return null;const e=Number(t.luck),n=Number(t.skill),s=Number(t.virtue),a=Number(t.pon),i=Number(t.livingCost);return[e,n,s,a,i].every(r=>Number.isFinite(r))?{luck:e,skill:n,virtue:s,pon:a,livingCost:i}:null}function uS(t){return t>=100?4:t>=70?3:t>=50?2:1}function fO(t){const e=uS(t.virtue),n=t.luck>=80,s=ze(e,6);if(n){const a=ze(e,6);return{value:s+a,rolls:[s,a],advantage:!0}}return{value:s,rolls:[s],advantage:!1}}const Gm={jp:.01,big:.02,small:.02};function hS(t,e,n=0,s=null){const{baseRates:a}=e,i=O.slot;let r=a.jp,l=a.big,c=a.mid,h=a.atari,d=a.small,p=1-(r+l+c+h+d);const g=Math.max(0,t.skill-i.skillBaseline),v=g>=i.skillBlockSize?Math.floor(g/i.skillBlockSize):0,I=Math.max(0,t.luck-i.luckBaseline)/i.luckRefSpan;let j=0;const _=v*i.skillMissReducePerBlock;_>0&&p>0&&(j=Math.min(_,p),p-=j,c+=j*i.skillToMid,h+=j*i.skillToAtari,d+=j*i.skillToSmall);let b=0,N=0,P=0;if(I>0){const x=i.luckAtariDrainAtLuck100*I,E=i.luckSmallDrainAtLuck100*I;N=Math.min(x,h),P=Math.min(E,d),b=N+P,b>0&&(h-=N,d-=P,r+=b*i.luckToJp,l+=b*i.luckToBig)}let $=0;const J=n*i.heatTransferPerSpin;J>0&&p>0&&($=Math.min(J,p),p-=$,r+=$*i.heatWeightJp,l+=$*i.heatWeightBig,c+=$*i.heatWeightMid,h+=$*i.heatWeightAtari);const T=r+l+c+h+d;if(p=Math.max(0,1-T),s==="student"){r+=Gm.jp,l+=Gm.big,d+=Gm.small;const x=r+l+c+h+d;p=Math.max(0,1-x)}return{jp:r,big:l,mid:c,atari:h,small:d,miss:p,skillMissReduced:j,luckConverted:b,luckDrainAtari:N,luckDrainSmall:P,heatMissReduced:$,heat:n}}function fS(t){const e=Number(t)||0;return Math.max(10,15-Math.floor(e/20))}function Pc(t){return 1+(Number(t)||0)*.2/100}function Ym(t,e){return Math.round(Number(t)*Pc(e))}function dO(t,e){const n=Number(e);return n>0?Math.min(1,n*(1+(Number(t)||0)/100)):0}function mO(t,e){const n=t.jp+t.big+t.mid+t.atari+t.small;if(!(n>0))return"small";let s=e*n;return s<t.jp?"jackpot":(s-=t.jp,s<t.big?"big":(s-=t.big,s<t.mid?"mid":(s-=t.mid,s<t.atari?"atari":"small")))}function pO(t,e){const{machine:n,bp:s,sym:a,r:i,bet:r,machineKey:l,pay:c,pityCounterAfter:h,pityForced:d,maxPity:p}=e,g={r:i,bet:r,machineKey:l,pityCounterAfter:h,pityForced:d,maxPity:p};switch(t){case"miss":return{tier:"miss",payout:0,message:"ハズレ…",reels:gO(n),...g};case"jackpot":return{tier:"jackpot",payout:c(s.jackpot),message:"🎰 777 JACKPOT!! 超大当たり！",reels:[a[0],a[0],a[0]],...g};case"big":return{tier:"big",payout:c(s.big),message:"💎 大当たり！！",reels:["💎","💎","💎"],...g};case"mid":return{tier:"mid",payout:c(s.mid),message:"⭐ 中当たり！",reels:["⭐","⭐","⭐"],...g};case"atari":return{tier:"atari",payout:c(s.atari),message:"🔔 当たり！",reels:["🔔","🔔","🔔"],...g};default:return{tier:"small",payout:c(s.small),message:"🍒 小当たり",reels:["🍒","🍒","🍒"],...g}}}function gO(t){const e=(t==null?void 0:t.symbols)??[];if(!e.length)return["?","?","?"];if(e.length===1)return[e[0],e[0],e[0]];for(let r=0;r<64;r++){const l=e[ze(0,e.length-1)],c=e[ze(0,e.length-1)],h=e[ze(0,e.length-1)];if(!(l===c&&c===h))return[l,c,h]}const n=e[ze(0,e.length-1)],s=e.filter(r=>r!==n),a=s[ze(0,s.length-1)],i=e[ze(0,e.length-1)];return[n,i,a]}function dS(t,e=Kf,n="standard",s=0,a=null,i=null){const r=wa[n]??wa.standard,{basePayout:l,symbols:c}=r,h=hS(t,r,s,a),d=(i==null?void 0:i.pityCounter)??0,p=fS(t==null?void 0:t.virtue),g=d>=p,v=e/Kf,C=_=>Math.round(_*v);let I;if(g)I=mO(h,Math.random());else{const _=Math.random();let b=h.miss;_<b?I="miss":(b+=h.jp,_<b?I="jackpot":(b+=h.big,_<b?I="big":(b+=h.mid,_<b?I="mid":(b+=h.atari,I=_<b?"atari":"small"))))}const j=I==="miss"?d+1:0;return pO(I,{machine:r,bp:l,sym:c,r:h,bet:e,machineKey:n,pay:C,pityCounterAfter:j,pityForced:g,maxPity:p})}function yO(t,e){if(!Array.isArray(t)||t.length!==3)return{reachPossible:!1};const n=t[0],s=t[1],a=t[2];return n!==s?{reachPossible:!1}:{reachPossible:["jackpot","big","mid"].includes(e)||e==="miss"&&n!==a}}function vO(){return Math.random()<.5}function kp(t,e,n){const s=e.symbols;if(!s.length)return[t,t,t];let a=s.indexOf(t);a<0&&(a=0);const i=s.length,r=s[(a-1+i)%i],l=s[(a+1)%i],c=s[(a-2+i)%i],h=s[(a+2)%i],d=s[a],p=(n%3+3)%3;return p===0?[r,d,l]:p===1?[l,d,r]:[c,d,h]}function mS(t){const e=t.symbols;return[e[ze(0,e.length-1)],e[ze(0,e.length-1)],e[ze(0,e.length-1)]]}function pS(t,e){const n=e.symbols.filter(s=>s!==t);return n.length?n[ze(0,n.length-1)]:t}function bO(t,e,n,s=null){const a=en[n]??en.salaryman,i=vn(a.startingMoney??O.startingMoney);return s&&typeof s=="object"?{id:e,name:t,characterType:n,streamMultiplier:a.streamMultiplier,stats:{luck:_t(s.luck,0,999999),skill:_t(s.skill,0,2e3),pon:_t(s.pon,0,999999),virtue:_t(s.virtue,0,999999),livingCost:Math.max(50,Math.floor(Number(s.livingCost)||0)),money:i},position:0,moveTurns:0,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0,spinCount:0,slotNet:0,lastMoveEvent:"",lastSpinResult:null,alive:!0,skipTurns:0,amulets:0,slotHeat:0,slotPityCounter:0,debtStreakDaily:0,debtStreakDay8:0,pendingTaxiSteps:0}:{id:e,name:t,characterType:n,streamMultiplier:a.streamMultiplier,stats:{luck:_t(0+(a.luckBonus??0),0,999999),skill:_t(50+a.skillBonus,0,2e3),pon:ze(O.pon.startMin,O.pon.startMax),virtue:50,livingCost:lS(n),money:i},position:0,moveTurns:0,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0,spinCount:0,slotNet:0,lastMoveEvent:"",lastSpinResult:null,alive:!0,skipTurns:0,amulets:0,slotHeat:0,slotPityCounter:0,debtStreakDaily:0,debtStreakDay8:0,pendingTaxiSteps:0}}function tx(t,e){var r;const n=((r=t.stats)==null?void 0:r.money)??0;if(n>=0)return{...t,debtStreakDaily:0};let s=(t.debtStreakDaily??0)+1;const a=O.rimiru.dailyGracesBefore;let i=n;if(s>=a){const l=i,c=1+O.rimiru.interestPercent/100;i=Math.floor(l*c),s=0;const h=Math.round(Math.abs(l)*(O.rimiru.interestPercent/100));e.push(`🩸 闇金リリムからの督促：（連続赤字が${a}ターン）高利子+${O.rimiru.interestPercent}%——${l}G → ${i}G（増額+${h}G）`)}return{...t,stats:{...t.stats,money:vn(i)},debtStreakDaily:s}}function xO(t,e,n){return e.map((s,a)=>{var h;if(a!==t)return s;const i=((h=s.stats)==null?void 0:h.money)??0;if(i>=0)return{...s,debtStreakDay8:0};let r=(s.debtStreakDay8??0)+1;const l=O.rimiru.day8TurnsBefore;let c=i;if(r>=l){const d=c,p=1+O.rimiru.interestPercent/100;c=Math.floor(d*p),r=0;const g=Math.round(Math.abs(d)*(O.rimiru.interestPercent/100));n.push(`🩸 闇金リリム：『それが増えるんで』連続赤字${l}回の手終わりや—— ${s.name}の借金 ${d}G → ${c}G (+${g}G / +${O.rimiru.interestPercent}%)`)}return{...s,stats:{...s.stats,money:vn(c)},debtStreakDay8:r}})}function nx(t){return t.alive?t.movePhase==="moving"||t.movePhase==="goalLanding"?!1:t.movePhase==="waitingSlot"?(t.reservedSlotTurns??0)<=0:t.movePhase==="missed"?!0:t.movePhase==="arrived"?t.slotTurnsLeft<=0:!0:!0}function Vc(t){return t>=3e4?"SS":t>=15e3?"S":t>=8e3?"A":t>=4e3?"B":"C"}function gS(t,e){const n=e??t.players,s=[...n.filter(i=>i.alive).map(i=>`${i.name}: 最終資金 ${i.stats.money}G / ランク ${Vc(i.stats.money)}`),"━━━ 8日目終了！全員完了 ━━━","━━━ 最終結果 ───"],a={...t,players:n,gamePhase:"results",subPhase:"daily",log:da(s,t.log)};return delete a.finalBattleStartedAt,delete a.finalBattleEntry,a}function _O(t){const e=t.slice();for(let n=e.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1)),a=e[n];e[n]=e[s],e[s]=a}return e}function TO(){const t=O.sugorokuTiles,e=Array.from({length:Zt+1},()=>({kind:yt.NEUTRAL})),n=Zt-1,s=Math.max(0,t.neutralRatioMax-t.neutralRatioMin),a=t.neutralRatioMin+Math.random()*s;let i=Math.round(n*a);i=Math.max(0,Math.min(n,i));const r=[];for(let d=0;d<i;d++)r.push(yt.NEUTRAL);const l=[yt.MOVE_FORWARD,yt.MOVE_BACKWARD,yt.GAIN_MONEY,yt.LOSE_MONEY,yt.INCREASE_PON];for(;r.length<n;)r.push(l[ze(0,l.length-1)]);_O(r);const c=d=>{switch(d){case yt.MOVE_FORWARD:return ze(t.moveForwardMin,t.moveForwardMax);case yt.MOVE_BACKWARD:return ze(t.moveBackwardMin,t.moveBackwardMax);case yt.GAIN_MONEY:return ze(t.gainMoneyMin,t.gainMoneyMax);case yt.LOSE_MONEY:return ze(t.loseMoneyMin,t.loseMoneyMax);case yt.INCREASE_PON:return ze(t.ponIncreaseMin,t.ponIncreaseMax);default:return 0}};let h=0;for(let d=1;d<=Zt-1;d++){const p=r[h++];p===yt.NEUTRAL?e[d]={kind:p}:e[d]={kind:p,value:c(p)}}return e}function yS(t){const e=Zt+1,n=t==null?void 0:t.sugorokuTileEffects;return Array.isArray(n)&&n.length===e?t:{...t,sugorokuTileEffects:TO()}}function EO(t){const n=`${t.players[0].name}の移動ターン（T1 / ${Zt}マス先へ！）`,s="━━━ 8日目！全員で交互に移動＆スロット ━━━",a={...yS(t),gamePhase:"playing",subPhase:"day8",aidAvailable:Math.random()<O.dice.helpChance,taxiAvailable:Math.random()<O.dice.taxiChance,lastDiceRolls:[],recentPonEvent:null,showSpinResult:!1,displayReels:["?","?","?"]};return delete a.finalBattleStartedAt,delete a.finalBattleEntry,a.log=da([n,s],t.log),a}function wO(t){const e=t.map(s=>{const a=s.character??"salaryman",i=li(s.initialRolls),r=hO(s.initialStats);let l=null;return i?l=Oy(i,a):r?l=r:l=uO(a),bO(s.name,s.id,a,l)}),n=[`${e[0].name}のターン（1日目）`,`━━━ ゲーム開始！${e.length===1?"ソロ":`${e.length}人`}プレイ ━━━`,...e.map(s=>{const a=en[s.characterType],i=dc(s);return`${s.name}(${(a==null?void 0:a.emoji)??""}${(a==null?void 0:a.label)??""}): PON=${s.stats.pon} 運=${s.stats.luck} 技量=${s.stats.skill} 善行=${s.stats.virtue} 生活費=${i}G`})];return{players:e,currentDay:1,currentPlayerIdx:0,subPhase:"daily",gamePhase:"playing",log:n,aidAvailable:!1,taxiAvailable:!1,recentPonEvent:null,gameOverMsg:"",showSpinResult:!1,lastDiceRolls:[],displayReels:["?","?","?"]}}function sx(t,e,n){const s=e.length,a=t.currentPlayerIdx+1;let i=[],r={};if(a>=s){const l=t.currentDay+1;if(l>Sa){const c=Date.now();i=["育成フェーズ、終幕――いま、参道の向こうに決戦が待つ。","── 【決戦の日】 ──"],r={currentDay:l,currentPlayerIdx:0,subPhase:"finalBattle",gamePhase:"finalBattle",finalBattleStartedAt:c,finalBattleEntry:"preDay8"}}else i=[`${e[0].name}のターン`,`━━━ ${l}日目 開始 ━━━`],r={currentDay:l,currentPlayerIdx:0}}else i=[`${e[a].name}のターン（${t.currentDay}日目）`],r={currentPlayerIdx:a};return{...t,...r,players:e,log:da([...n,...i],t.log)}}function Vr(t,e,n){const s=Math.max(1,O.dice.slotsPerSugorokuTurn),a=t.currentPlayerIdx,i=e[a],r=(i==null?void 0:i.slotTurnsLeft)??0,l=(i==null?void 0:i.slotPullsThisSeat)??0;if((i==null?void 0:i.movePhase)==="arrived"&&r>0&&l<s)return{...t,players:e,showSpinResult:!1,displayReels:["?","?","?"],log:da(n,t.log)};let c=e;(i==null?void 0:i.movePhase)==="arrived"&&(c=e.map((j,_)=>_!==a?j:{...j,moveTurns:(j.moveTurns??0)+1}));const h=[];let d=xO(t.currentPlayerIdx,c,h);const p=[...n,...h];if(d=d.map((j,_)=>_!==t.currentPlayerIdx?j:{...j,slotPullsThisSeat:0}),d.every(nx)){const j={...t,players:d,log:da(p,t.log)};return gS(j,d)}const g=d.length;let v=(t.currentPlayerIdx+1)%g;for(let j=0;j<g&&nx(d[v]);j++)v=(v+1)%g;const C=d[v];let I;return C.movePhase==="arrived"?I=`${C.name}のスロットターン（残り${C.slotTurnsLeft}回 / 資金${C.stats.money}G）`:C.movePhase==="waitingSlot"?I=`${C.name}のターン（ゴール到着済み・スロット${C.reservedSlotTurns??0}ターンブンを開始できます）`:I=`${C.name}の移動ターン（T${C.moveTurns+1} / ${C.position}/${Zt}マス）`,{...t,players:d,currentPlayerIdx:v,aidAvailable:Math.random()<O.dice.helpChance,taxiAvailable:Math.random()<O.dice.taxiChance,lastDiceRolls:[],showSpinResult:!1,displayReels:["?","?","?"],log:da([...p,I],t.log)}}function vh(t,e,n,s,a){const i=O.dice.virtueWaveThresh;if(e<i&&n>=i){const r=O.dice.virtueWavePonDelta,l=s.map(c=>({...c,stats:{...c.stats,pon:_t(c.stats.pon+r,0)}}));return a.push(`🌟 ${t.name}の徳が高すぎて全員の心が洗われた！全員PON${r}`),l}return s}function Cp(t,e,n){const s=e[t],a=O.dice.splashRadius;return e.map((i,r)=>r===t||!i.alive||i.movePhase!=="moving"||Math.abs(i.position-s.position)>a?i:(n.push(`💥 巻き添え！${i.name}（${i.position}マス付近）→ 次ターン1回休み`),{...i,skipTurns:(i.skipTurns||0)+1}))}function SO(t,e,n,s,a){const i=O.sugorokuTiles;let r=Math.max(0,Math.min(Zt,e));const l={...n},c=[],h=(v,C)=>{a.push(v),C&&c.push(C)};if(r<=0||r>=Zt)return{finalPos:r,stats:l,popupTitles:c};const d=t[r],p=(d==null?void 0:d.kind)??yt.NEUTRAL;if(p===yt.NEUTRAL)return{finalPos:r,stats:l,popupTitles:c};const g=typeof(d==null?void 0:d.value)=="number"&&Number.isFinite(d.value)?d.value:null;switch(p){case yt.MOVE_FORWARD:{const v=g??ze(i.moveForwardMin,i.moveForwardMax);h(`  🔰 マス効果 (${r})：進行マスで +${v} 進む`,`Forward +${v} steps (+${v}マス)`),r=Math.min(Zt,r+v);break}case yt.MOVE_BACKWARD:{const v=g??ze(i.moveBackwardMin,i.moveBackwardMax);h(`  🔰 マス効果 (${r})：転がり坂で −${v} 戻る`,`Back −${v} steps (−${v}マス)`),r=Math.max(0,r-v);break}case yt.GAIN_MONEY:{const v=g??ze(i.gainMoneyMin,i.gainMoneyMax);l.money=vn(l.money+v),h(`  🔰 マス効果 (${r})：ひろい金で +${v}G→${l.money}G`,`+${v}G`);break}case yt.LOSE_MONEY:{const v=g??ze(i.loseMoneyMin,i.loseMoneyMax);l.money=vn(l.money-v),h(`  🔰 マス効果 (${r})：落とし穴で −${v}G→${l.money}G`,`−${v}G`);break}case yt.INCREASE_PON:{const v=g??ze(i.ponIncreaseMin,i.ponIncreaseMax);l.pon=_t(l.pon+v),h(`  🔰 マス効果 (${r})：炎上予約で +PON ${v}%→${l.pon}`,`Fire +${v} PON`);break}}return{finalPos:r,stats:l,popupTitles:c}}function ax(t,e,n,s,a,i={}){const r=!!i.ponSplashDamage,l=yS(t),c=l.sugorokuTileEffects,h=t.players.map((I,j)=>j===e?{...I,stats:{...s},position:n}:{...I}),d=r?Cp(e,h,a):h,p=d[e],g=SO(c,n,{...p.stats},p.name,a),v=d.map((I,j)=>j===e?{...I,stats:g.stats,position:g.finalPos}:I),C=g.popupTitles.length>0?{title:"Tile effect / マス効果",lines:g.popupTitles}:null;return{gsWithTiles:l,players:v,tileToast:C}}function AO(t){const e=Math.min(1,Math.max(0,t));return e<.5?4*e*e*e:1-(-2*e+2)**3/2}function mc(t){const n=2e3+Math.abs(t)*55;return Math.round(Math.min(3200,Math.max(2200,n)))}const NO=20,RO=300;function Km(t,e){const n=e-t,s=Math.abs(n),a=Math.min(s,NO),r=s>6?110:360;return a*r+RO}function kO(t,e){return t+e/2}function CO(t,e,n,s){const a=e-t,i=Math.max(0,s);if(Math.abs(a)<1e-9)return{jamMid:t,firstLegMs:i,secondLegMs:0};const r=kO(t,n);let l=r;a>0?l=Math.min(e,Math.max(t,r)):l=Math.max(e,Math.min(t,r));const c=(l-t)/a,h=Math.max(120,Math.round(i*c)),d=Math.round(i*(1-c));return{jamMid:l,firstLegMs:h,secondLegMs:Math.max(0,d)}}function IO(t,e,n=!1){return n&&t>=e?{icon:"⛩️",bg:"bg-indigo-950/95",border:"border-violet-300/70",text:"text-violet-100",shadow:"0 5px 0 #1e1b4b, 0 8px 16px rgba(0,0,0,0.65)",glow:"0 0 28px rgba(167,139,250,0.55)"}:t<=0?{icon:"🚀",bg:"bg-emerald-800/90",border:"border-emerald-400/70",text:"text-emerald-200",shadow:"0 5px 0 #064e3b, 0 7px 10px rgba(0,0,0,0.5)",glow:"0 0 14px rgba(52,211,153,0.35)"}:t>=e?{icon:"🏆",bg:"bg-amber-700/90",border:"border-amber-300/80",text:"text-amber-100",shadow:"0 5px 0 #78350f, 0 7px 10px rgba(0,0,0,0.5)",glow:"0 0 18px rgba(251,191,36,0.5)"}:t%10===0?{icon:"⭐",bg:"bg-sky-800/80",border:"border-sky-400/60",text:"text-sky-200",shadow:"0 4px 0 #0c4a6e, 0 6px 8px rgba(0,0,0,0.45)",glow:"0 0 12px rgba(56,189,248,0.3)"}:t%7===0?{icon:"🎲",bg:"bg-violet-900/80",border:"border-violet-400/55",text:"text-violet-300",shadow:"0 4px 0 #3b0764, 0 6px 8px rgba(0,0,0,0.4)",glow:null}:t%5===0?{icon:"✦",bg:"bg-slate-700/90",border:"border-slate-400/40",text:"text-slate-300",shadow:"0 3px 0 #1e293b, 0 5px 7px rgba(0,0,0,0.35)",glow:null}:{icon:null,bg:"bg-slate-800/95",border:"border-slate-600/50",text:"text-slate-400",shadow:"0 3px 0 #0f172a, 0 4px 6px rgba(0,0,0,0.3)",glow:null}}const ix="(min-width: 768px)";function MO(t){return`url('${String(t).replace(/\\/g,"/").replace(/'/g,"\\'")}')`}function DO({className:t,scrollPx:e=0,scrollMultiplier:n=1,traveling:s=!1}){const[a,i]=R.useState(()=>typeof window<"u"&&window.matchMedia(ix).matches);R.useEffect(()=>{const C=window.matchMedia(ix),I=()=>i(C.matches);return I(),C.addEventListener("change",I),()=>C.removeEventListener("change",I)},[]);const r=R.useMemo(()=>{const C=ex.pc??[],I=ex.sp??[];return a?[...C,...I]:[...I,...C]},[a]),[l,c]=R.useState(0);R.useEffect(()=>{c(0)},[a]);const h=t??"pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl";if(!r.length||l>=r.length)return u.jsx("div",{className:h,"aria-hidden":!0});const d=ta(r[l]),p=MO(d),g=Number.isFinite(n)?n:1,v=e*g;return u.jsxs("div",{className:h,"aria-hidden":!0,children:[u.jsx("img",{src:d,alt:"",className:"pointer-events-none absolute h-0 w-0 opacity-0",onError:()=>c(C=>C+1)}),u.jsx("div",{className:"pointer-events-none absolute inset-0 sugoroku-seamless-bg",style:{backgroundImage:p,backgroundRepeat:"repeat-y",backgroundSize:"100% auto",backgroundPosition:`center ${v}px`,filter:"none",transition:"filter 0.35s ease-out",willChange:s?"background-position, filter":"auto"}})]})}function OO({effect:t,sizePx:e=13}){if(!t||t.kind===yt.NEUTRAL)return null;const n=Math.max(8,e),s="anim-tile-effect-float pointer-events-none";switch(t.kind){case yt.MOVE_FORWARD:case yt.MOVE_BACKWARD:return u.jsx("span",{className:s,title:"移動マス",children:u.jsx(Du,{className:"text-sky-300","aria-hidden":!0,strokeWidth:2.35,size:n})});case yt.GAIN_MONEY:return u.jsx("span",{className:s,title:"増資マス",children:u.jsx(Sp,{className:"text-amber-300","aria-hidden":!0,strokeWidth:2.35,size:n})});case yt.LOSE_MONEY:return u.jsx("span",{className:s,title:"出費マス",children:u.jsx(Sp,{className:"text-slate-500 opacity-95","aria-hidden":!0,strokeWidth:2.35,size:n})});case yt.INCREASE_PON:return u.jsx("span",{className:s,title:"燃えマス",children:u.jsx(CD,{className:"text-orange-400","aria-hidden":!0,strokeWidth:2.35,size:n})});default:return null}}function rx({player:t}){const e=(t==null?void 0:t.pendingTaxiSteps)??0;return e<=0||!t?null:u.jsx("span",{className:"pointer-events-none absolute bottom-full left-1/2 z-[38] mb-0.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-orange-400/90 bg-orange-950/95 px-[5px] py-[2px] text-[9px] font-black leading-none text-orange-100 animate-pulse",title:`タクシー渋滞：残り${e}マス`,children:"🚗渋滞中…"})}const jO=new Set(["ride","trafficJam","drive","driveBeforeJam","driveAfterJam"]);function PO({characterType:t,taxiPhase:e}){if(!t||e!=="arrive")return null;const n="pointer-events-none relative shrink-0 flex w-[min(216px,56vw)] max-w-[240px] flex-col items-center",s=u.jsxs("div",{className:"relative w-full",children:[u.jsx(lu,{imgClassName:"relative z-0 block w-full object-contain opacity-100"}),null]});return u.jsx("div",{className:`${n} anim-taxi-arrive-exit-wrapper`,children:u.jsx("div",{className:"relative w-full anim-taxi-arrive-park-inner",children:u.jsx("div",{className:"relative w-full",children:s})})})}const VO=10,LO=-100;function UO({deco:t,iconPx:e,tileW:n}){const[s,a]=R.useState(!1),i=n*VO;return s?u.jsx("span",{style:{fontSize:`${e}px`},className:`leading-none ${t.text}`,children:t.icon}):u.jsx("div",{className:"absolute left-1/2 top-full z-[5] pointer-events-none opacity-100",style:{width:i,height:i,transform:`translate(-50%, ${LO}px)`},children:u.jsx("img",{src:ta("/images/slotRirimu.png"),alt:"",draggable:!1,className:"h-full w-full object-contain select-none opacity-100",onError:()=>a(!0)})})}function zO({tileW:t}){const e=Math.min(300,Math.max(Math.round(t*1.65),t+36));return u.jsx("div",{className:"pointer-events-none mb-1.5 shrink-0 z-[4] mx-auto rounded-md border-2 border-amber-950/50 shadow-[0_0_18px_rgba(250,204,21,0.4)]",style:{width:e,height:14,backgroundImage:"repeating-linear-gradient(90deg, #171717 0px, #171717 7px, #fafaf9 7px, #fafaf9 14px)"},"aria-hidden":!0})}const BO=300,$O=52,FO=72,Qm=12,HO=.38,qO=.015;function ox(t){return!t||typeof t!="string"?t:t.replace(/\/(\d{2,3})\b/g,"")}function GO(t,e,n,s){const a=n+s;return e>=0?(t-Math.floor(t+1e-9))*a:-(Math.ceil(t-1e-9)-t)*a}function Ip({players:t,viewPos:e,boardGoal:n,isDiceRolling:s,taxiPhase:a,pieceHopping:i,currentPlayer:r,visualTheme:l="default",tileEffects:c=null,reportHopAnimationComplete:h=!1,onHopAnimationComplete:d,taxiDriveCongested:p=!1,taxiDriveEndPos:g=null,taxiDriveSegmentMs:v=null,taxiJamMidPos:C=null,taxiDriveDurationMs:I=2600}){const _=l==="nightShrine",[b,N]=R.useState(e),[P,$]=R.useState({forward:!0,msPerStep:360,fast:!1}),J=R.useRef(null),[T,x]=R.useState(480),[E,A]=R.useState(58),k=R.useRef(e),M=R.useRef(1),w=R.useRef(null),te=R.useRef(null),pe=R.useRef(null),W=R.useRef(d);W.current=d,R.useLayoutEffect(()=>{const fe=J.current;if(!fe)return;const Ee=()=>{const bt=fe.clientHeight||480,ne=fe.clientWidth||360;x(bt),A(Math.min(FO,Math.max($O,Math.round(ne*.22))))};Ee();const Se=new ResizeObserver(Ee);return Se.observe(fe),()=>Se.disconnect()},[]),R.useEffect(()=>{if(e===k.current||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")return;const fe=k.current,Ee=e,Se=Ee-fe;if(a&&(a==="taxiHail"||a==="enter"||a==="boarding"||a==="ride"||a==="trafficJam"||a==="arrive")){w.current&&(cancelAnimationFrame(w.current),w.current=null),pe.current&&(clearTimeout(pe.current),pe.current=null),M.current=Se>=0?1:-1,k.current=e,N(e),$({forward:Se>=0,msPerStep:360,fast:!1});return}const ne=Math.min(Math.abs(Se),20),X=Se>0?1:-1;if(M.current=X,k.current=e,w.current&&(cancelAnimationFrame(w.current),w.current=null),pe.current&&(clearTimeout(pe.current),pe.current=null),ne===0){N(Ee);return}const oe=Math.abs(Se)>6,Ue=oe?110:360,ye=ne*Ue;$({forward:X>0,msPerStep:Ue,fast:oe});const ce=performance.now(),Xe=it=>{const Ke=Math.min(1,Math.max(0,(it-ce)/ye)),mn=fe+Se*Ke;N(mn),Ke<1?w.current=requestAnimationFrame(Xe):(w.current=null,N(Ee),h&&ne>0&&(pe.current=setTimeout(()=>{var Dt;(Dt=W.current)==null||Dt.call(W)},BO)))};return w.current=requestAnimationFrame(Xe),()=>{w.current&&cancelAnimationFrame(w.current),pe.current&&clearTimeout(pe.current)}},[e,h,a]),R.useEffect(()=>{if(!(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")||g==null)return;w.current&&(cancelAnimationFrame(w.current),w.current=null),pe.current&&(clearTimeout(pe.current),pe.current=null);const Ee=k.current,Se=g,bt=v??I,ne=bt>0?bt:mc(Math.abs(Se-Ee));let X=Se;a==="driveBeforeJam"&&C!=null?X=C:a==="driveAfterJam"&&(X=Se),M.current=Se>=Ee?1:-1;const oe=a==="driveBeforeJam"||(a==="drive"||a==="driveAfterJam")&&!p;if($({forward:Se>=Ee,msPerStep:110,fast:oe}),Math.abs(X-Ee)<1e-9){N(X),k.current=X;return}N(Ee);const Ue=performance.now(),ye=ce=>{const Xe=Math.min(1,Math.max(0,(ce-Ue)/ne)),it=Ee+(X-Ee)*AO(Xe);N(it),Xe<1?te.current=requestAnimationFrame(ye):(te.current=null,N(X),k.current=X)};return te.current=requestAnimationFrame(ye),()=>{te.current&&(cancelAnimationFrame(te.current),te.current=null)}},[a,g,I,v,C,p]);const ee=E,ae=ee+Qm,ue=Math.abs(e-b)>qO,Le=ue?GO(b,M.current,ee,Qm):0,Ze=Math.floor(b+1e-9),ut=Math.min(n,Ze+6),Mt=[];for(let fe=0;fe<=ut;fe++)Mt.push({pos:fe});const qe={};t.forEach(fe=>{fe.alive&&fe.id!==(r==null?void 0:r.id)&&(qe[fe.position]||(qe[fe.position]=[]),qe[fe.position].push(fe))});const He=Math.round(ee*.48),ht=Math.max(10,Math.round(ee*.26)),F=b*ae+ee/2,re=T*HO-F,he=-b*ae;let Z=1;(a==="enter"||a==="boarding")&&(Z=1.15),a==="ride"&&(Z=2),a==="trafficJam"&&(Z=.06),(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||a==="arrive")&&(Z=1);const Pe=((r==null?void 0:r.pendingTaxiSteps)??0)>0&&a==null,Te=a!=null&&jO.has(a)||Pe,Ge=(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")&&!p,De=a==="enter"||a==="boarding",Qe=a==="ride"||a==="trafficJam"||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||Pe,wt=a==="arrive",ft=_?"linear-gradient(to bottom, #010118 0%, #09092e 42%, #0e0e46 100%)":"linear-gradient(to bottom, #020617 0%, #0f172a 55%, #1e293b 100%)",Jn=ue||i,dt=Math.ceil(Math.abs(e-b)-1e-9);return u.jsxs("div",{className:`relative flex min-h-0 w-full flex-col overflow-visible rounded-xl ${_?"final-battle-night":""}`,style:{background:ft,height:"100%",filter:a==="arrive"?"brightness(0.9) saturate(0.95)":void 0,transition:"filter 0.35s ease-out"},children:[u.jsx(DO,{scrollPx:he,scrollMultiplier:Z,traveling:ue||Ge,fast:!!(P.fast&&ue)||Ge}),u.jsx("div",{className:`absolute top-0 left-1/2 -translate-x-1/2 w-52 h-16 rounded-full pointer-events-none z-[1]
        ${_?"":"opacity-[0.35]"}`,style:{background:_?"radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 72%)":"radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)"}}),_&&u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light opacity-90",style:{background:"radial-gradient(ellipse 120% 80% at 50% 18%, rgba(79,70,229,0.25) 0%, transparent 55%)"}}),u.jsx("div",{className:"pointer-events-none absolute inset-0 z-[2] opacity-[0.35]",style:{background:"repeating-linear-gradient(100deg, transparent, transparent 5px, rgba(148,163,184,0.06) 5px, rgba(148,163,184,0.06) 10px)",maskImage:"linear-gradient(to bottom, transparent, black 35%)"}}),u.jsx("div",{className:"pointer-events-none absolute inset-x-0 bottom-0 h-[55%] z-[3] opacity-50",style:{background:"linear-gradient(to top, rgba(2,6,23,0.92), transparent)"}}),Array.from({length:22},(fe,Ee)=>u.jsx("span",{className:"pointer-events-none absolute rounded-full anim-cold-spark z-[4]",style:{left:`${Ee*47%100}%`,bottom:"-4%",width:2+Ee%4,height:2+Ee%4,background:Ee%3===0?"rgba(199,210,254,0.95)":"rgba(165,243,252,0.85)",boxShadow:"0 0 6px rgba(191,219,254,0.9)",animationDuration:`${4.2+Ee%7*.35}s`,animationDelay:`${Ee%11*.28}s`}},Ee))]}),ue&&dt>0&&!a&&u.jsxs("div",{className:"absolute top-2 right-3 z-10 text-[11px] font-bold text-cyan-300/80 bg-slate-900/60 px-2 py-0.5 rounded-full pointer-events-none",children:["残り",dt,"マス..."]}),u.jsx("div",{ref:J,className:`relative z-10 flex min-h-0 flex-1 flex-col overflow-visible w-full pt-2 pb-3 ${s&&a!=="taxiHail"&&!ue&&!i?"opacity-75":""}`,children:u.jsx("div",{className:"relative mx-auto flex w-full max-w-[92vw] flex-col items-center overflow-visible px-3",style:{transform:`translateY(${re}px)`,transition:ue?"none":"transform 0.4s linear",willChange:ue?"transform":"auto"},children:Mt.map(({pos:fe},Ee)=>{const Se=IO(fe,n,_),bt=fe===Ze,ne=fe<Ze,X=qe[fe]??[],oe=Array.isArray(c)?c[fe]:null,Ue=oe&&oe.kind!==yt.NEUTRAL&&fe>0&&fe<n,ye=Ue&&(oe.kind===yt.MOVE_BACKWARD||oe.kind===yt.LOSE_MONEY||oe.kind===yt.INCREASE_PON),ce=ox(Se.bg),Xe=ox(Se.border),Ke=Ee===Mt.length-1?0:Qm,mn=ne&&!ye&&fe!==n?"brightness-[0.88] saturate-[0.92]":"",Dt=Te&&!De?-Math.round(ee*.22):0,Qt=X.length>0||bt&&r&&(!Qe||wt||Te||De);return u.jsxs("div",{className:"flex flex-col items-center select-none opacity-100",style:{marginBottom:Ke,transition:"opacity 0.25s ease"},children:[fe===n&&u.jsx(zO,{tileW:ee}),u.jsxs("div",{className:"relative flex flex-col items-center",style:{width:ee},children:[Qt?u.jsxs("div",{className:`pointer-events-none absolute left-1/2 bottom-full flex flex-row items-end justify-center gap-1 ${a==="taxiHail"||a==="enter"||a==="boarding"||a==="ride"||a==="trafficJam"||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||a==="arrive"?"z-[28]":"z-20"}`,style:{transform:`translate(-50%, ${Math.max(10,Math.round(ee*.52))}px)`},children:[X.map(we=>{const me=bt?28:Math.max(12,He-6);return u.jsxs("div",{className:"relative flex flex-col items-center justify-end",children:[u.jsx(rx,{player:we}),u.jsx("span",{className:"anim-breathe leading-none inline-flex items-end justify-center",children:u.jsx(Gh,{characterType:we.characterType,pose:(we.skipTurns??0)>0?"fallen":"normal",imgClassName:"object-contain object-bottom",spanClassName:"leading-none",imgStyle:{maxHeight:Math.max(72,Math.min(118,me*5.5)),width:"auto",maxWidth:Math.max(58,me*6.25)},spanStyle:{fontSize:me}})})]},we.id)}),bt&&wt&&u.jsx(PO,{characterType:r.characterType,taxiPhase:a}),bt&&r&&(!Qe||Te||De)&&u.jsxs("div",{className:"relative flex flex-col items-center justify-end",children:[u.jsx(rx,{player:r}),De?u.jsxs("div",{className:"flex max-w-[min(340px,calc(100vw-40px))] flex-row flex-nowrap items-end justify-center gap-1 pr-0.5 origin-bottom scale-[0.88] sm:scale-95 md:scale-100",children:[u.jsx("div",{className:`order-1 shrink-0 self-end ${a==="enter"?"anim-taxi-from-above-left-of-tile":"taxi-approach-parked"} relative z-[24]`,children:u.jsx(lu,{imgClassName:"relative z-[1] max-h-[118px] w-auto min-w-[48px] max-w-[min(165px,46vw)] object-contain object-bottom opacity-100"})}),u.jsx("div",{className:`order-2 shrink-0 relative z-[20] flex flex-col items-center justify-end self-end ${a==="boarding"?"taxi-boarding-char-to-cab":""}`,children:u.jsx("span",{className:`inline-flex items-end justify-center leading-none ${a==="boarding"?"":s?"animate-bounce":"anim-float"}`,children:u.jsx(Gh,{characterType:r.characterType,pose:(r.skipTurns??0)>0?"fallen":"normal",imgClassName:"max-h-[130px] w-auto max-w-[min(180px,55vw)] object-contain object-bottom",spanClassName:"text-4xl leading-none"})})})]}):u.jsxs("div",{className:`relative flex items-end justify-center ${Te?"z-[26]":""} ${a==="arrive"?"taxi-piece-arrive-fadein":""}`,style:{zIndex:Te?26:i||Jn?20:5,position:"relative"},children:[u.jsx("span",{className:`inline-flex items-end justify-center leading-none ${a==="arrive"||ue?"":i?"anim-hop":s?"animate-bounce":"anim-float"}`,children:u.jsx("span",{className:"inline-flex items-end justify-center leading-none",style:{transform:`translate3d(${Dt}px, ${Le}px, 0)`,transition:ue?"none":"transform 0.4s linear",willChange:ue?"transform":"auto"},children:u.jsx("span",{className:`standee-piece relative inline-flex items-end justify-center leading-none ${ue&&!Te?"anim-standee-walk":""} ${Te?"z-[26] anim-pulse-taxi-ride":""} ${Te&&a==="trafficJam"?"anim-taxi-stutter":""} ${a==="arrive"?"taxi-piece-arrive-fadein-target":""}`,style:ue&&!Te?{"--standee-walk-ms":`${P.msPerStep*1.35}ms`}:void 0,children:Te?u.jsx(lu,{imgClassName:"relative z-[1] max-h-[130px] w-auto min-w-[48px] max-w-[min(180px,55vw)] object-contain object-bottom opacity-100"}):u.jsx(Gh,{characterType:r.characterType,pose:(r.skipTurns??0)>0?"fallen":"normal",imgClassName:"max-h-[130px] w-auto max-w-[min(180px,55vw)] object-contain object-bottom",spanClassName:"text-4xl leading-none"})})})}),!Te&&r.stats.luck>=80&&[{cls:"anim-sparkle-0",t:"-10px",l:"-12px"},{cls:"anim-sparkle-1",t:"-8px",r:"-12px"},{cls:"anim-sparkle-2",b:"-8px",l:"-10px"},{cls:"anim-sparkle-3",b:"-6px",r:"-10px"}].map((we,me)=>u.jsx("span",{className:`absolute text-yellow-300 font-black text-[11px] pointer-events-none ${we.cls}`,style:{top:we.t,left:we.l,bottom:we.b,right:we.r},children:"✦"},me))]})]})]}):null,u.jsxs("div",{className:`relative z-0 flex items-center justify-center overflow-visible rounded-xl border-[3px] ${mn}
                    ${fe===n?"bg-yellow-400 border-yellow-600 text-amber-950":ye?"border-rose-500 bg-gradient-to-br from-red-950 to-red-900 text-rose-50":`${ce} ${Xe}`}
                    ${bt?ye?"ring-2 ring-rose-300/95":fe===n?"ring-2 ring-amber-700/90":"ring-2 ring-cyan-400/90":""}`,style:{width:`${ee}px`,height:`${ee}px`,boxShadow:"none",transition:"width 0.28s ease, height 0.28s ease, filter 0.28s ease"},children:[u.jsx("div",{className:`absolute top-0 left-0 right-0 h-1 rounded-t-xl pointer-events-none ${ye?"bg-rose-400/50":fe===n?"bg-yellow-500/80":"bg-white/25"}`}),ne&&fe>0&&u.jsx("span",{className:"pointer-events-none absolute left-1 top-1 z-[3] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/95 text-sm leading-none text-emerald-200 ring-2 ring-emerald-400/80","aria-hidden":!0,children:"✓"}),fe===n?u.jsx(UO,{deco:Se,iconPx:He,tileW:ee}):Ue?u.jsx(OO,{effect:oe,sizePx:Math.max(16,Math.round(He*1.05))}):Se.icon?u.jsx("span",{style:{fontSize:`${He}px`},className:`leading-none ${Se.text}`,children:Se.icon}):u.jsx("span",{style:{fontSize:`${ht}px`},className:`font-bold ${Se.text}`,children:fe}),fe===n&&u.jsx("span",{className:"pointer-events-none absolute bottom-1 left-1/2 z-[6] -translate-x-1/2 text-[10px] font-black leading-none tracking-wide text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]",children:"GOAL!"})]})]}),bt&&Se.icon&&(fe===0||fe>=n)&&u.jsx("span",{className:`text-[9px] mt-0.5 font-medium ${Se.text}`,children:fe===0?"スタート":"GOAL!"})]},fe)})})}),u.jsx("div",{className:"absolute bottom-0 left-0 right-0 z-[15] h-5 rounded-b-xl pointer-events-none",style:{background:"linear-gradient(to top, rgba(15,23,42,0.88), transparent)"}}),u.jsxs("div",{className:"pointer-events-none absolute right-2 top-1/2 z-[16] -translate-y-1/2 rounded-lg border border-cyan-400/50 bg-slate-900/85 px-2 py-1 text-right shadow-[0_4px_18px_rgba(0,0,0,0.45)]",children:[u.jsx("div",{className:"text-[10px] font-semibold tracking-wide text-cyan-300/90",children:"現在マス"}),u.jsxs("div",{className:"text-sm font-black tabular-nums text-cyan-100 leading-tight",children:[Math.max(0,Ze),u.jsx("span",{className:"text-slate-500 font-semibold",children:" / "}),n]})]})]})}function YO({gs:t,cpGs:e,boardViewPos:n=null,onSugorokuHopComplete:s,reportSugorokuHopComplete:a=!1,isMyTurn:i,cpIsGoalLanding:r,cpIsWaitingSlot:l,isDay8Moving:c,isDiceRolling:h,localDice:d,diceShuffleValues:p,diceConfirmed:g,isLuckyRoll:v,showDiceTotal:C,displayDice:I,taxiPhase:j,taxiDriveCongested:_=!1,taxiDriveEndPos:b=null,taxiDriveSegmentMs:N=null,taxiJamMidPos:P=null,taxiDriveDurationMs:$=2600,pieceHopping:J,onMoveAction:T,onGoalLandingConfirm:x}){if(!e)return null;const E=e.pendingTaxiSteps??0,A=E>0,k=e.reservedSlotTurns??0,M=k*O.dice.slotsPerSugorokuTurn,w=typeof n=="number"?n:e.position;return u.jsxs(u.Fragment,{children:[i&&t.subPhase==="day8"&&r&&u.jsxs("div",{className:"space-y-4",children:[u.jsxs("div",{className:"rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-500/20 to-yellow-900/30 p-5 text-center space-y-3",children:[u.jsx("p",{className:"text-4xl animate-bounce",children:"🏁"}),u.jsx("h2",{className:"text-2xl font-black text-amber-200 tracking-wide",children:"GOAL!"}),u.jsxs("p",{className:"text-amber-100/90 font-semibold",children:[e.name," が 8日目ゴールへ到着しました。"]}),u.jsxs("p",{className:"text-sm text-amber-200/80",children:["このターンを終えるとスロットは",u.jsx("span",{className:"font-bold text-white",children:"あなたの次のターン開始時"}),"に始まります。 （残り道中のプレイヤーは移動を続行します）"]}),u.jsxs("p",{className:"text-xs text-yellow-400/70",children:["獲得",u.jsx("strong",{className:"text-white",children:k}),"ターンブン（すごろく1手番＝スロット",u.jsx("strong",{className:"text-white",children:O.dice.slotsPerSugorokuTurn}),"回・計",u.jsx("strong",{className:"text-white",children:M}),"回）",u.jsx("span",{className:"block mt-1 text-yellow-400/55",children:"ターン終了まで他プレイヤーとの効果で運・善行・資金が変わっても、開始直前まで反映されます。"})]})]}),u.jsx("div",{style:{height:"min(720px, 80vh)",minHeight:"min(560px, 72vh)",overflow:"hidden",borderRadius:"12px"},children:u.jsx(Ip,{players:t.players,viewPos:w,boardGoal:Zt,isDiceRolling:!1,taxiPhase:null,pieceHopping:!1,currentPlayer:e,tileEffects:t==null?void 0:t.sugorokuTileEffects})}),e.lastMoveEvent&&u.jsx("p",{className:"rounded-lg bg-slate-800/60 px-3 py-2 text-xs text-slate-300 text-center",children:e.lastMoveEvent}),u.jsx("button",{type:"button",onClick:x,className:"w-full rounded-xl bg-amber-500 py-4 font-black text-slate-950 hover:bg-amber-400 shadow-lg animate-pulse",children:"確認してターンを終える →"})]}),c&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"flex items-center justify-between gap-2",children:[u.jsxs("h2",{className:"font-semibold text-sm text-slate-300 shrink-0",children:[e.name," — T",e.moveTurns+1]}),u.jsxs("div",{className:"flex-1 flex flex-col items-center",children:[u.jsx("span",{className:"text-[10px] text-yellow-400/60 font-medium tracking-widest uppercase",children:"GOAL"}),u.jsxs("div",{className:"flex items-baseline gap-1",children:[u.jsx("span",{className:"text-2xl font-black text-yellow-300 tabular-nums leading-none",children:Math.max(0,Zt-e.position)}),u.jsx("span",{className:"text-xs text-yellow-400/70",children:"マス先"})]})]}),u.jsxs("span",{className:"text-xs text-slate-500 shrink-0",children:["残",Math.max(0,O.dice.maxTurns-e.moveTurns),"T"]})]}),u.jsx("div",{style:{height:"min(720px, 80vh)",minHeight:"min(560px, 72vh)",overflow:"hidden",borderRadius:"12px"},children:u.jsx(Ip,{players:t.players,viewPos:w,boardGoal:Zt,isDiceRolling:h,taxiPhase:j,taxiDriveCongested:_,taxiDriveEndPos:b,taxiDriveSegmentMs:N,taxiJamMidPos:P,taxiDriveDurationMs:$,pieceHopping:J,currentPlayer:e,tileEffects:t==null?void 0:t.sugorokuTileEffects,reportHopAnimationComplete:a,onHopAnimationComplete:s})}),(()=>{if(A)return null;const te=h,pe=te?d.map((ae,ue)=>({value:(g[ue]?ae:p[ue])??"?",confirmed:g[ue]??!1})):I.map(ae=>({value:ae,confirmed:!0}));if(pe.length===0)return null;const W=te?C:!0,ee=pe.reduce((ae,{value:ue})=>ae+(Number(ue)||0),0);return u.jsxs("div",{className:"flex flex-col items-center gap-2",children:[u.jsx("div",{className:"flex gap-3 justify-center flex-wrap",children:pe.map(({value:ae,confirmed:ue},Le)=>{const Ze=te&&v&&Le===1;return u.jsxs("div",{className:`relative flex items-center gap-1.5 rounded-xl border-2 px-4 py-2.5 min-w-[66px] justify-center font-black text-xl transition-all duration-300
                              ${Ze&&ue?"border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.55)]":Ze?"border-amber-500/60 bg-amber-900/30 text-amber-300 animate-pulse":ue?"border-cyan-400/70 bg-cyan-500/10 text-cyan-100 anim-dice-pop":"border-slate-600/60 bg-slate-800/80 text-slate-400 animate-pulse"}`,children:[u.jsx("span",{className:"text-base leading-none select-none",children:"🎲"}),u.jsx("span",{children:ae}),Ze&&u.jsx("span",{className:"absolute -top-2.5 -right-2 text-[11px] text-amber-300 font-black leading-none select-none",children:"★"})]},`day8-dice-${Le}-${ae}-${ue?"c":"u"}`)})}),W&&pe.length>1&&u.jsxs("div",{className:"flex items-baseline gap-1.5 anim-fadein",children:[u.jsx("span",{className:"text-sm text-slate-400",children:"合計"}),u.jsx("span",{className:"text-2xl font-black text-white",children:ee}),u.jsx("span",{className:"text-sm text-slate-400",children:"マス進む！"})]})]})})(),A&&u.jsx("div",{className:"rounded-lg border border-amber-600/45 bg-amber-950/50 px-3 py-2 text-center",children:u.jsxs("p",{className:"text-xs font-semibold text-amber-100",children:["タクシー渋滞中 — 駒に「渋滞中…」表示。あと",u.jsx("strong",{className:"tabular-nums text-white",children:E}),"マスが残っています。"]})}),u.jsx("div",{className:"flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500 justify-center",children:!A&&u.jsxs(u.Fragment,{children:[u.jsxs("span",{children:["最低出目: ",uS(e.stats.virtue),"（善行",e.stats.virtue,"）"]}),u.jsx("span",{children:e.stats.luck>=80?"アドバンテージ🎲🎲":"通常🎲"}),e.stats.pon>=O.pon.fireThreshold&&u.jsxs("span",{className:e.stats.pon>=O.pon.deathThreshold?"text-rose-300":"text-orange-300",children:["PON",e.stats.pon," ⚡転倒リスク"]})]})}),i&&u.jsxs(u.Fragment,{children:[e.skipTurns>0&&u.jsxs("div",{className:"rounded-xl border border-orange-400/40 bg-orange-400/10 p-3 text-sm text-orange-200 flex items-center gap-2 justify-center",children:["💤 巻き添えで",e.skipTurns,"回休み…自動スキップ中"]}),A?u.jsxs("button",{type:"button",onClick:()=>T("taxiTrafficWait"),disabled:h||!!j||e.skipTurns>0,className:"mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border-2 border-amber-200/70 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 px-6 py-5 font-black text-slate-950 shadow-[0_0_36px_rgba(251,191,36,0.45)] transition-[filter] hover:brightness-[1.05] disabled:cursor-not-allowed disabled:opacity-40",children:[u.jsx("span",{className:"flex items-center gap-2 text-2xl leading-tight tracking-tight",children:"🚧 渋滞を待つ"}),u.jsx("span",{className:"mt-1 text-sm font-bold opacity-95",children:"Wait in Traffic"}),u.jsxs("span",{className:"mt-2 text-[11px] font-semibold opacity-85 tabular-nums",children:["あと ",E," マスでタクシー行程完了"]})]}):u.jsxs("div",{className:"flex flex-wrap gap-2 justify-center",children:[u.jsxs("button",{type:"button",onClick:()=>T("normal"),disabled:h||!!j||e.skipTurns>0,className:"inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40 shadow-lg",children:[u.jsx(ED,{size:18}),"進む"]}),u.jsxs("div",{className:"relative group",children:[u.jsxs("button",{type:"button",onClick:()=>T("shop"),disabled:h||!!j||e.stats.money<O.dice.shopCost||e.skipTurns>0,className:"inline-flex items-center gap-2 rounded-xl bg-lime-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-lime-400 transition-colors disabled:opacity-40 shadow-lg",children:[u.jsx(Sp,{size:18}),"コンビニ ",u.jsxs("span",{className:"text-xs opacity-70",children:["-",O.dice.shopCost,"G"]})]}),u.jsx("div",{className:"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none",children:u.jsxs("div",{className:"bg-slate-800 border border-lime-500/40 text-slate-100 text-xs rounded-xl px-3 py-2 whitespace-nowrap shadow-xl",children:["🍰 コンビニスイーツでエネルギー補給！（ダイスを1個追加）",u.jsx("div",{className:"absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"})]})})]}),u.jsxs("button",{type:"button",onClick:()=>T("taxi"),disabled:h||!!j||e.stats.money<O.dice.taxiCost||e.skipTurns>0,className:"inline-flex items-center gap-1.5 rounded-xl bg-yellow-400 px-5 py-2.5 font-semibold text-slate-950 hover:bg-yellow-300 transition-colors disabled:opacity-40 shadow-lg",children:[u.jsx(lu,{imgClassName:"h-[2.25rem] w-[2.25rem] object-contain shrink-0 opacity-100"}),"タクシー",u.jsxs("span",{className:"text-xs opacity-70",children:["-",O.dice.taxiCost,"G / ",O.dice.taxiMoveMin,"〜",O.dice.taxiMoveMax,"マス"]}),e.stats.virtue<=O.dice.taxiCongestThresh&&u.jsx("span",{className:"text-[10px] opacity-60",title:"善行が低めのときに一定確率で2ターン渋滞イベント（前半→次自分ターンで残り進行／渋滞時+PON、そのターンは他操作不可）",children:"渋滞リスク"})]}),t.aidAvailable&&u.jsxs("button",{type:"button",onClick:()=>T("help"),disabled:h||!!j||e.skipTurns>0,className:`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-colors disabled:opacity-40 shadow-lg ${e.stats.pon>=O.pon.deathThreshold?"bg-rose-600 text-white hover:bg-rose-500":"bg-emerald-500 text-slate-950 hover:bg-emerald-400"}`,children:[u.jsx(MD,{size:18}),"人助け ",e.stats.pon>=O.pon.deathThreshold?"⚠️即死50%":""]})]}),!A&&u.jsxs("p",{className:"text-center text-[10px] text-slate-600",children:["人助け ",(O.dice.helpChance*100).toFixed(0),"% / タクシー"," メニュー常時（確率のみに戻す: taxiMenuAlwaysVisible を false、taxiChance で割合）"]})]})]})]})}const Mp=1600,KO=900,QO=1600,XO=Mp+QO;function WO(){try{const t=new(window.AudioContext||window.webkitAudioContext);t.state==="suspended"&&t.resume().catch(()=>{});const e=t.currentTime,n=t.createOscillator(),s=t.createGain();n.connect(s),s.connect(t.destination),n.type="sine",n.frequency.setValueAtTime(420,e),n.frequency.exponentialRampToValueAtTime(760,e+.07),s.gain.setValueAtTime(.22,e),s.gain.exponentialRampToValueAtTime(.001,e+.14),n.start(e),n.stop(e+.15)}catch{}}function JO(){try{const t=new(window.AudioContext||window.webkitAudioContext);t.state==="suspended"&&t.resume().catch(()=>{});const e=t.currentTime,n=.24,s=Math.floor(t.sampleRate*n),a=t.createBuffer(1,s,t.sampleRate),i=a.getChannelData(0);for(let p=0;p<s;p++){const g=Math.pow(1-p/s,2.1);i[p]=(Math.random()*2-1)*g}const r=t.createBufferSource();r.buffer=a;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=380;const c=t.createGain();c.gain.setValueAtTime(.34,e),c.gain.exponentialRampToValueAtTime(.001,e+n),r.connect(l),l.connect(c),c.connect(t.destination),r.start(e),r.stop(e+n);const h=t.createOscillator(),d=t.createGain();h.connect(d),d.connect(t.destination),h.type="triangle",h.frequency.setValueAtTime(98,e),h.frequency.exponentialRampToValueAtTime(42,e+n),d.gain.setValueAtTime(.36,e),d.gain.exponentialRampToValueAtTime(.001,e+n*1.05),h.start(e),h.stop(e+n+.02)}catch{}}function lx({characterType:t,pose:e}){const n=rS(t,e),[s,a]=R.useState(0),i=en[t]??en.salaryman;return R.useEffect(()=>{a(0)},[t,e]),!n.length||s>=n.length?u.jsx("span",{className:"select-none text-[clamp(4.5rem,20vw,9rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]",children:i.emoji??"🙂"}):u.jsx("img",{src:ta(n[s]),alt:"",draggable:!1,className:"max-h-[min(52vh,520px)] w-auto max-w-[min(92vw,560px)] select-none object-contain object-bottom drop-shadow-[0_12px_40px_rgba(0,0,0,0.75)]",onError:()=>a(r=>r+1)})}function ZO({active:t,characterType:e,onComplete:n,onFallLand:s}){const[a,i]=R.useState(!0),[r,l]=R.useState(!1),[c,h]=R.useState(!1),[d,p]=R.useState(!1),g=R.useRef(n),v=R.useRef(s);if(g.current=n,v.current=s,R.useEffect(()=>{if(!t){i(!0),l(!1),h(!1),p(!1);return}i(!0),l(!1),h(!1),p(!1),WO();const j=setTimeout(()=>i(!1),KO),_=setTimeout(()=>{var N;l(!0),JO(),(N=v.current)==null||N.call(v),h(!0),p(!0)},Mp),b=setTimeout(()=>{var N;(N=g.current)==null||N.call(g)},XO);return()=>{clearTimeout(j),clearTimeout(_),clearTimeout(b)}},[t]),!t)return null;const C=e??"salaryman",I=Mp/1e3;return u.jsxs("div",{className:`fixed inset-0 z-[220] flex cursor-default flex-col items-center justify-center gap-4 bg-black/75 pointer-events-auto px-4 ${a?"anim-pon-cutin-shake":""}`,"aria-hidden":!0,children:[u.jsx("div",{className:`pon-cutin-scene relative mx-auto w-[min(92vw,560px)] h-[min(52vh,520px)] transition-transform duration-500 ease-out ${d?"translate-y-2 scale-[0.99]":""}`,children:r?u.jsx("div",{className:"pon-cutin-spin-host anim-fadein",children:u.jsx(lx,{characterType:C,pose:"fell_down"})}):u.jsx("div",{className:"pon-cutin-spin-host anim-pon-stumble-spin",style:{"--pon-spin-duration":`${I}s`},children:u.jsx(lx,{characterType:C,pose:"stumble"})})}),c&&u.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:u.jsxs("div",{className:"relative anim-pon-burst-impact font-black tracking-tight text-white",children:[u.jsx("span",{className:"anim-pon-spark-impact pointer-events-none absolute -inset-12 rounded-full bg-rose-500/35 blur-3xl -z-10"}),u.jsx("span",{className:"relative inline-block drop-shadow-[0_0_40px_rgba(251,113,133,0.9)]",style:{fontSize:"clamp(2.8rem, 11vw, 5rem)",textShadow:"0 0 32px rgba(244,63,94,1), 0 0 64px rgba(251,113,133,0.65), 0 8px 0 #881337, 0 14px 28px rgba(0,0,0,0.8)"},children:"PON!!"})]})})]})}function ej(){const[t,e]=R.useState(!1),n=oO.taxi_congestion??[];R.useEffect(()=>{e(!1)},[]);const s=n.length>0&&!t?ta(n[0]):null;return u.jsx("div",{className:"fixed inset-0 z-[218] flex flex-col items-center justify-center pointer-events-none px-4 anim-traffic-jam-overlay-fade bg-black/88 backdrop-blur-[4px]","aria-hidden":!0,children:u.jsxs("div",{className:"relative w-full max-w-[min(92vw,1160px)] rounded-2xl border border-amber-500/25 shadow-[0_28px_80px_rgba(0,0,0,0.92)] overflow-hidden bg-slate-950",children:[u.jsx("div",{className:"absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/20 to-black/70 pointer-events-none"}),s?u.jsx("img",{src:s,alt:"",className:"relative z-0 w-full max-h-[min(112vh,1040px)] object-cover object-center",draggable:!1,onError:()=>e(!0)}):u.jsxs("div",{className:"relative z-0 flex min-h-[min(88vh,720px)] w-full items-center justify-center gap-3 bg-slate-900 px-4 text-[clamp(2.5rem,12vw,3.5rem)] leading-none opacity-95",children:[u.jsx("span",{"aria-hidden":!0,children:"🚧"}),u.jsx(lu,{imgClassName:"max-h-[min(56vh,400px)] w-auto max-w-[72%] object-contain opacity-100 drop-shadow-lg"}),u.jsx("span",{"aria-hidden":!0,children:"🚧"})]}),u.jsxs("div",{className:"absolute inset-0 z-[2] flex flex-col items-center justify-end pb-6 pt-16 px-4 pointer-events-none",children:[u.jsxs("p",{className:"text-center font-black anim-traffic-jam-neon text-[clamp(1.25rem,4.5vw,1.85rem)] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]",children:[u.jsx("span",{className:"text-amber-100",children:"渋滞発生！"}),u.jsx("span",{className:"text-slate-200 text-[0.82em] ml-2 tracking-tight font-bold normal-case",children:"(Traffic Jam!)"})]}),u.jsx("p",{className:"mt-2 text-center text-xs font-semibold text-amber-200/85 max-w-md",children:"運転手もため息… メーターだけが無情に刻みます。"})]})]})})}const Xm=80;function tj({gs:t,cpGs:e,onDailyAction:n,onOpenDailySlot:s,interactionLocked:a=!1}){if(!e)return null;const i=O.dailySlot.spinBet*O.dailySlot.spins,r=en[e.characterType]??en.salaryman,l=r.ponMultiplier??1,c=Math.ceil(O.pon.dailyGain*l);e.stats.pon+c;const h=r.workRewardMultiplier??1,d=r.workRewardBonus??0,p=Math.round(Math.floor((O.work.reward+d)*h)*Pc(e.stats.virtue)),g=e.stats.skill+e.stats.luck,v=g>O.stream.combinedStatNoFailThreshold?0:Math.max(0,O.stream.baseFailRate-g/O.stream.combinedStatNoFailThreshold*O.stream.baseFailRate),C=[],I=[];e.stats.luck>=Xm&&(C.push("drop-shadow(0 0 10px rgba(250, 204, 21, 0.9))","drop-shadow(0 0 24px rgba(250, 204, 21, 0.72))"),I.push("0 0 14px rgba(250, 204, 21, 0.9)")),e.stats.skill>=Xm&&(C.push("drop-shadow(0 0 10px rgba(56, 189, 248, 0.9))","drop-shadow(0 0 24px rgba(56, 189, 248, 0.72))"),I.push("0 0 14px rgba(56, 189, 248, 0.9)")),e.stats.virtue>=Xm&&(C.push("drop-shadow(0 0 10px rgba(74, 222, 128, 0.9))","drop-shadow(0 0 24px rgba(74, 222, 128, 0.72))"),I.push("0 0 14px rgba(74, 222, 128, 0.9)"));const j=C.length>0?{filter:`${C.join(" ")} saturate(1.08)`}:void 0,_=I.length>0?{textShadow:I.join(", ")}:void 0;return u.jsxs(u.Fragment,{children:[u.jsxs("h2",{className:"font-semibold",children:[t.currentDay,"日目 行動選択 — ",e.name]}),u.jsxs("div",{className:"rounded-xl border border-cyan-600/45 bg-gradient-to-br from-cyan-950/50 to-slate-900/90 px-3 py-2.5 space-y-2",children:[u.jsxs("div",{className:"flex flex-wrap items-center gap-x-2 gap-y-1",children:[u.jsxs("span",{className:"inline-flex items-center rounded-md border border-cyan-600/50 bg-cyan-950/70 px-2 py-1 text-[11px] font-semibold leading-tight text-cyan-100 shadow-sm",children:["決戦の",Ap,"日目まで",u.jsxs("strong",{className:"mx-1 tabular-nums text-white text-xs",children:["あと ",Ap-t.currentDay," 日"]})]}),u.jsxs("span",{className:"text-[11px] text-slate-500 tabular-nums",children:["育成 ",t.currentDay," / ",Sa," 日"]})]}),u.jsx("div",{className:"flex gap-1 w-full","aria-hidden":"true",children:Array.from({length:Sa},(b,N)=>{const P=N<t.currentDay-1,$=N===t.currentDay-1;return u.jsx("span",{title:`${N+1}日目${$?"（今ここ）":P?"（終了）":""}`,className:"h-2 min-w-[8px] flex-1 rounded-full transition-colors "+(P?"bg-cyan-700/85":$?"bg-cyan-300 ring-1 ring-cyan-100/75 shadow-[0_0_10px_rgba(34,211,238,0.55)]":"bg-slate-700/90")},`daily-progress-${N}`)})})]}),u.jsxs("div",{className:"flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-3",children:[u.jsxs("button",{type:"button",onClick:()=>n("work"),disabled:a,className:"inline-flex items-center gap-2 self-start rounded-xl bg-emerald-500/90 px-5 py-2.5 font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40",children:[u.jsx(SD,{size:18}),"仕事（+",p,"G 目安・善行反映 / 善行+",O.work.virtueGain,"）"]}),u.jsxs("button",{type:"button",onClick:()=>n("stream"),disabled:a,className:"inline-flex w-fit max-w-full flex-col items-start gap-1 self-start rounded-xl bg-violet-500/90 px-5 py-2.5 font-medium text-white text-left transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40",children:[u.jsxs("span",{className:"inline-flex items-center gap-2",children:[u.jsx(BD,{size:18,"aria-hidden":!0}),"配信（内容はランダム）"]}),u.jsxs("span",{className:"text-[11px] font-normal leading-snug text-violet-50/95 pl-[26px] space-y-1 flex flex-col",children:[u.jsxs("span",{children:["失敗；",(v*100).toFixed(0),"% ＋",O.stream.successMin,"Gのみ、ステータス増加なし"]}),u.jsxs("span",{children:["成功；＋",O.stream.successMin,"〜",O.stream.successMax,"G（善行で増加）"]}),u.jsx("span",{className:"pt-0.5",children:"配信タイプ"}),u.jsxs("span",{children:["・雑談；善行＋",O.stream.chat.virtueGainMin,"〜",O.stream.chat.virtueGainMax]}),u.jsxs("span",{children:["・ゲーム；技量 ＋",O.stream.game.skillGainMin,"〜",O.stream.game.skillGainMax]})]})]}),u.jsxs("button",{type:"button",onClick:()=>s==null?void 0:s(),disabled:a||e.stats.money<i,title:a?"演出中は選択できません":e.stats.money<i?`資金から${i}G必要（現在${e.stats.money}G）`:`所持資金から計${i}Gを支払い。スピンごとに技量+${O.dailySlot.skillGainEverySpin}（毎回確定）、役が揃えばさらに+${O.dailySlot.skillGainOnRole}。${O.dailySlot.spinBet}G×${O.dailySlot.spins}回（筐体演出）`,className:"inline-flex w-fit max-w-full flex-col items-start gap-1 self-start rounded-xl bg-fuchsia-600/90 px-5 py-2.5 font-medium text-white text-left hover:bg-fuchsia-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",children:[u.jsxs("span",{className:"inline-flex items-center gap-2",children:[u.jsx(Du,{size:18,"aria-hidden":!0}),"デイリースロット（資金から-",i,"G／",O.dailySlot.spinBet,"G×",O.dailySlot.spins,"）"]}),u.jsxs("span",{className:"text-[11px] font-normal leading-snug text-fuchsia-50/95 pl-[26px]",children:["技量；スピンごと+",O.dailySlot.skillGainEverySpin,"（ハズレでも）／役成立でさらに+",O.dailySlot.skillGainOnRole]})]}),u.jsxs("button",{type:"button",onClick:()=>n("shrine"),disabled:a,className:"inline-flex items-center gap-2 self-start rounded-xl bg-amber-600/90 px-5 py-2.5 font-medium text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40",children:[u.jsx("span",{className:"text-base leading-none",children:"⛩"}),"神社（-",O.shrine.cost,"G / 運+",O.shrine.luckGain,"）"]})]}),u.jsx("div",{className:"hidden sm:flex min-w-[220px] items-center justify-center self-stretch",children:u.jsx(Gh,{characterType:e.characterType,pose:"normal",imgClassName:"h-[330px] w-[210px] object-contain object-center opacity-100 -translate-x-40",spanClassName:"text-8xl leading-none opacity-100",imgStyle:j,spanStyle:_})})]})]})}const vS="/assets/slot-machine-8fe98381.png";function nj(t){return new Promise(e=>setTimeout(e,t))}function sj({open:t,statsForSpin:e,characterType:n,playerName:s,initialSlotPityCounter:a=0,soundRef:i,onClose:r,onFinished:l}){const[c,h]=R.useState(!1),[d,p]=R.useState(0),[g,v]=R.useState(e),[C,I]=R.useState([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),[j,_]=R.useState([!1,!1,!1]),[b,N]=R.useState(-1),[P,$]=R.useState(!1),[J,T]=R.useState(null),[x,E]=R.useState("idle"),[A,k]=R.useState(!1),[M,w]=R.useState(!1),[te,pe]=R.useState(!1),[W,ee]=R.useState(null),ae=R.useRef(null),ue=R.useRef([!1,!1,!1]),Le=R.useRef(!1),Ze=R.useRef(null),ut=R.useRef(0),Mt="standard",qe=wa[Mt],He=O.dailySlot.spinBet,ht=O.dailySlot.spins,F=He*ht;R.useEffect(()=>{t&&(Le.current=!1,pe(!1),h(!1),p(0),w(!1),ee(null),T(null),E("idle"),$(!1),N(-1),_([!1,!1,!1]),ue.current=[!1,!1,!1],I([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),ae.current&&(clearInterval(ae.current),ae.current=null),v(e??null),Ze.current=null,ut.current=a??0)},[t,e,a]),R.useEffect(()=>()=>{ae.current&&clearInterval(ae.current)},[]);const re=Lp.useCallback((ne,X,oe)=>new Promise(Ue=>{let ye=[...X.reels];if(X.tier==="miss"){const Re=qe.symbols,mt=O.slot.nearMissReachChance,xt=O.slot.slipSymbolChance,ls=Math.random();if(Re.length>=2&&ls<mt){const Ae=Re[ze(0,Re.length-1)],ot=Re.filter(St=>St!==Ae),jt=ot[ze(0,ot.length-1)];ye=[Ae,Ae,jt]}else if(ls<mt+xt){const Ae=ze(0,2);ye[Ae]=Re[1]}}const ce=["jackpot","big","mid"].includes(X.tier)&&ye[0]===ye[1],Xe=X.tier==="miss"&&ye[0]===ye[1]&&ye[0]!==ye[2],it=ce||Xe,Ke=Math.max(0,ne.luck-O.slot.luckBaseline),mn=Math.max(0,ne.skill-O.slot.skillBaseline),Dt=X.tier!=="miss"&&(Ke>=10||mn>=10),Qt=ye.map((Re,mt)=>kp(Re,qe,mt));k(!0),setTimeout(()=>k(!1),340),h(!0),$(!1),T(null),E("spinning"),ue.current=[!1,!1,!1],_([!1,!1,!1]),I([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),N(-1);const we=i==null?void 0:i.current;we==null||we.playStart(),setTimeout(()=>we==null?void 0:we.startSpin(),200),ae.current&&clearInterval(ae.current),ae.current=setInterval(()=>{const Re=ue.current;I(mt=>mt.map((xt,ls)=>Re[ls]?xt:mS(qe)))},80);const me=(Re,mt,xt)=>{if(xt&&Dt&&Math.random()<.5){const Ae=pS(mt[1],qe),ot=[mt[0],Ae,mt[2]];ue.current[Re]=!0,I(jt=>{const St=[...jt];return St[Re]=ot,St}),N(Re),we==null||we.playStop(Re),setTimeout(()=>N(-1),430),setTimeout(()=>{I(jt=>{const St=[...jt];return St[Re]=mt,St}),_(jt=>{const St=[...jt];return St[Re]=!0,St}),setTimeout(()=>{_(jt=>{const St=[...jt];return St[Re]=!1,St})},560)},380)}else ue.current[Re]=!0,I(Ae=>{const ot=[...Ae];return ot[Re]=mt,ot}),N(Re),we==null||we.playStop(Re),setTimeout(()=>N(-1),430)},Oe=1200,Ot=1700,Gt=it?Ot+2400:Ot+550;setTimeout(()=>me(0,Qt[0],!0),Oe),setTimeout(()=>me(1,Qt[1],!0),Ot),it&&setTimeout(()=>{$(!0),E("reach"),setTimeout(()=>we==null?void 0:we.playReach(),150)},Ot+400),setTimeout(()=>{ae.current&&(clearInterval(ae.current),ae.current=null),we==null||we.stopSpin(),me(2,Qt[2],!0),$(!1),I(Qt);const Re=X.tier!=="miss";Re?(T(X.tier),E("win"),setTimeout(()=>we==null?void 0:we.playWin(X.tier),200),setTimeout(()=>T(null),4e3)):E("miss");const mt=X.payout-X.bet;ee({won:Re,title:`${oe}　${Re?"当たり！":"ハズレ"}`,detail:`${X.message??""}／収支 ${mt>=0?"+":""}${mt}G`}),h(!1),Ue()},Gt)}),[qe,Mt,i]),he=async()=>{if(!t||!e||c||M||Le.current)return;Le.current=!0;const ne=[];let X={...e};try{for(let ye=0;ye<ht;ye++){p(ye+1),v({...X});const ce=dS(X,He,Mt,0,n,{pityCounter:ut.current});ut.current=ce.pityCounterAfter??0,ne.push(ce),await re(X,ce,`第 ${ye+1} / ${ht} 回`),await nj(ye<ht-1?1100:0);const Xe=O.dailySlot.skillGainEverySpin+(ce!=null&&ce.tier&&ce.tier!=="miss"?O.dailySlot.skillGainOnRole:0);X={...X,money:vn(X.money-ce.bet+ce.payout),skill:_t(X.skill+Xe)}}const oe=ne.reduce((ye,ce)=>ye+(ce.payout-ce.bet),0),Ue=ne.filter(ye=>ye.tier!=="miss").length;ee({won:oe>0,title:oe>=0?`合計プラス収支 ${oe}G！`:`合計収支 ${oe}G`,detail:`${Ue} / ${ne.length} 回役成立（スピンごと技量 +${O.dailySlot.skillGainEverySpin}／役ごと追加 +${O.dailySlot.skillGainOnRole}）・次へでターン終了`}),Ze.current=ne,w(!0)}catch(oe){console.error(oe),Le.current=!1,w(!1),pe(!1),p(0),Ze.current=null,ee(null)}},Z=async()=>{if(!t||te||!M)return;const ne=Ze.current;if(!(!Array.isArray(ne)||ne.length!==ht)){pe(!0);try{await l(ne),r()}finally{pe(!1)}}};if(!t||!e)return null;const Pe=Math.max(0,(g??e).luck-O.slot.luckBaseline),Te=Math.max(0,(g??e).skill-O.slot.skillBaseline),Ge=Pe>=50?3:Pe>=30?2:Pe>=10?1:0,De=Te>=30?2:Te>=10?1:0,Qe=Ge>=1&&De>=1,wt=c&&(Ge>0||De>0);let ft="";wt&&(Qe?ft="slot-cabinet-stage--aura-combo":Ge>=3?ft="slot-cabinet-stage--aura-luck3":Ge===2?ft="slot-cabinet-stage--aura-luck2":Ge===1?ft="slot-cabinet-stage--aura-luck1":De>=2?ft="slot-cabinet-stage--aura-skill2":De===1&&(ft="slot-cabinet-stage--aura-skill1"));const Jn=n??"salaryman",dt=x==="win"?"anim-char-bounce":x==="reach"?"anim-char-pray":x==="spinning"?"anim-char-wobble":x==="miss"?"anim-char-sad":"",fe=!!J,Ee={top:"var(--slot-window-top)",left:"var(--slot-window-left)",width:"var(--slot-window-width)",height:"var(--slot-window-height)"},Se=te?"締め処理中…":M?"次へ":c?d>0?`回転中… (${d}/${ht})`:"回転中…":`資金から${He}G×${ht}回スピン（計${F}G・各回収支適用）`,bt=te||M||c||d>0;return u.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]",role:"dialog","aria-modal":"true","aria-labelledby":"daily-slot-title",children:u.jsxs("div",{className:"relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-amber-500/40 bg-slate-950 shadow-[0_0_60px_rgba(251,191,36,0.15)]",children:[u.jsx("button",{type:"button",disabled:bt,onClick:r,title:bt&&!te&&!M?"1回開始したあとは「次へ」で確定するまで閉じられません":void 0,className:"absolute right-3 top-3 z-[110] rounded-lg border border-slate-600 bg-slate-800 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300","aria-label":bt?"閉じる（この段階では使用できません）":"閉じる",children:u.jsx(aS,{size:18})}),u.jsxs("div",{className:"space-y-3 p-4 pt-12",children:[u.jsx("h2",{id:"daily-slot-title",className:"text-lg font-bold text-amber-100",children:"デイリースロット（技能練習）"}),u.jsxs("p",{className:"text-xs text-slate-400 leading-relaxed",children:[s," /",u.jsx("span",{className:"text-slate-500",children:"所持資金から"})," ",u.jsxs("span",{className:"text-amber-200 font-semibold tabular-nums",children:[He,"G×",ht,"回ベット（計",F,"G）"]})," · ","8日目スロットと同じ",u.jsx("strong",{className:"text-slate-200",children:"役ごとの配当"}),"・倍率／スピンごと技量+",u.jsx("span",{className:"text-sky-300",children:O.dailySlot.skillGainEverySpin}),"、役成立でさらに+",u.jsx("span",{className:"text-sky-300",children:O.dailySlot.skillGainOnRole})]}),W&&u.jsxs("div",{className:`rounded-xl border px-3 py-3 text-center text-sm font-bold ${W.won?"border-emerald-500/60 bg-emerald-500/15 text-emerald-100":"border-rose-500/55 bg-rose-500/12 text-rose-100"}`,children:[u.jsx("p",{className:"text-base",children:W.title}),u.jsx("p",{className:"mt-1 text-xs font-normal opacity-95",children:W.detail})]}),u.jsxs("div",{className:`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${J==="jackpot"?"anim-jp-rainbow":""}`,children:[J&&J!=="miss"&&u.jsx("div",{className:"absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl",children:Array.from({length:J==="jackpot"?28:J==="big"?16:8},(ne,X)=>u.jsx("span",{style:{position:"absolute",left:`${(X*97+11)%100}%`,top:"-30px",fontSize:J==="jackpot"?"1.6rem":"1.2rem",animation:`coinDrop ${1.4+X*.11%1.2}s ${X*.07%1.1}s ease-in forwards`},children:J==="jackpot"?["🪙","⭐","💎","✨"][X%4]:"🪙"},X))}),u.jsxs("div",{className:"relative z-[8] flex flex-col items-center gap-3 w-full",children:[u.jsxs("div",{className:["slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",A?"slot-cabinet-recoiling":"",ft].filter(Boolean).join(" "),children:[P&&u.jsx("p",{className:"pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse",children:"🎯 REACH!!"}),u.jsxs("div",{className:"slot-machine-stack relative w-full min-h-[200px]",children:[u.jsx("div",{className:"absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none",style:Ee,"aria-hidden":!0}),u.jsx("div",{className:"slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none",style:Ee,children:u.jsx("div",{className:"slot-grid-3x3 flex h-full w-full flex-row",style:{gap:"var(--slot-reel-gap)",padding:"var(--slot-reel-pad-y) var(--slot-reel-pad-x)"},children:C.map((ne,X)=>u.jsx("div",{className:["slot-reel-col relative flex min-h-0 h-full min-w-0 flex-1 flex-col overflow-hidden rounded-sm",b===X?"anim-reel-bounce":"",P&&X===2?"ring-2 ring-amber-400/70 ring-offset-0 rounded-sm":""].filter(Boolean).join(" "),children:u.jsx("div",{className:["slot-reel-strip w-full transition-transform duration-500 ease-out",j[X]?"slot-reel-strip--slip":""].filter(Boolean).join(" "),children:ne.map((oe,Ue)=>{const ye=Ue===1,ce=ye&&!ue.current[X]&&c;return u.jsx("div",{className:["slot-cell flex min-h-0 min-w-0 items-center justify-center border border-slate-600/50 text-slate-100",ye?"slot-cell--payline":"slot-cell--edge",ye&&fe?"slot-cell--win-pulse":"",Ue===1?"bg-[color-mix(in_srgb,var(--slot-reel-face)_75%,#272e3d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]":"bg-[color-mix(in_srgb,var(--slot-reel-face)_55%,#0f141c)]",ce?"slot-cell--spinning":""].filter(Boolean).join(" "),children:oe},`${X}-${Ue}-daily`)})})},X))})}),u.jsx("div",{className:"relative z-[5] w-full pointer-events-none select-none",children:u.jsx("img",{src:vS,alt:"",className:"relative z-[6] block w-full max-w-[440px] mx-auto pointer-events-none",draggable:!1,onError:ne=>{const X=ne.currentTarget,oe="/";X.src=`${oe}images/slot-machine.png`}})}),u.jsx("button",{type:"button",title:`連続スピン（${He}G×${ht}）`,"aria-label":"スロットを回す",disabled:c||M||te,className:"absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",style:{top:"var(--slot-spin-top)",left:"var(--slot-spin-left)",width:"var(--slot-spin-w)",height:"var(--slot-spin-h)"},onClick:()=>void he()})]})]}),u.jsx("div",{className:"relative z-[12] flex justify-center pointer-events-none mt-2",children:u.jsx(El,{characterType:Jn,imgClassName:`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${dt}`,spanClassName:`text-5xl leading-none inline-block ${dt}`})}),J==="jackpot"&&u.jsx("p",{className:"relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse",style:{textShadow:"0 0 20px #fbbf24, 0 0 40px #f59e0b"},children:"🎰 777 JACKPOT!! 🎰"})]})]}),u.jsxs("button",{type:"button","aria-label":te?"締め処理中":M?"次のプレイヤーへ（ターン終了）":"スロット練習を開始",disabled:c||te,onClick:()=>M?void Z():void he(),className:"flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-40 transition-colors",children:[M?u.jsx(wp,{size:20}):u.jsx(Du,{size:20}),Se]}),u.jsx("p",{className:"text-[10px] text-slate-500 text-center",children:"開始後は自動で連続回転します。「次へ」で結果を送信し、翌手番（または翌日開始）まで進みます。回転〜結果確認まで閉じることはできません。"})]})]})})}function aj({gameState:t,soundRef:e}){const[n,s]=R.useState(()=>Date.now()),a=R.useRef(!1);R.useEffect(()=>{const _=setInterval(()=>s(Date.now()),50);return()=>clearInterval(_)},[]);const i=(t==null?void 0:t.finalBattleStartedAt)!=null?JSON.stringify(t.finalBattleStartedAt):"";R.useEffect(()=>{a.current=!1},[i]);const r=(t==null?void 0:t.players)??[],l=oS(t==null?void 0:t.finalBattleStartedAt),[c]=R.useState(()=>Date.now()),h=Number.isFinite(l)?l:c,d=Math.max(0,n-h),p=d<Tl,g=d>=Tl,v=(t==null?void 0:t.finalBattleEntry)==="preDay8";R.useEffect(()=>{const _=e==null?void 0:e.current;!_||!p||a.current||(a.current=!0,_.tryPlayWarHornIfLoaded())},[p,e]),R.useEffect(()=>{const _=e==null?void 0:e.current;_&&g&&_.stopWarHorn()},[g,e]),R.useEffect(()=>()=>{var _,b;(b=(_=e==null?void 0:e.current)==null?void 0:_.stopWarHorn)==null||b.call(_)},[e]);const C=v?null:r.filter(_=>_.alive)[0]??r[0]??null,I=v?0:C?Math.min(Zt,Math.max(0,C.position)):Math.floor(Zt*.62);R.useEffect(()=>{var _;if(!(!g||v))try{typeof document<"u"&&((_=document.fonts)!=null&&_.ready)&&document.fonts.ready.then(()=>{}).catch(()=>{})}catch{}},[g,v]);const j=R.useMemo(()=>Array.from({length:20},(_,b)=>({id:b,leftPct:5+b*47%90,bottomPct:22+b%7*4,delayMs:b*67%900,durSec:.75+b%6*.13})),[]);return u.jsxs("div",{className:"relative min-h-screen w-full bg-slate-950",children:[!v&&u.jsxs("div",{className:g?"relative z-10 w-full mx-auto px-3 py-4 space-y-3":"fixed inset-0 z-[5] w-full mx-auto px-3 py-4 space-y-3 opacity-0 pointer-events-none overflow-hidden","aria-hidden":!g,children:[g&&u.jsxs("div",{className:"text-center space-y-1",children:[u.jsxs("h2",{className:"text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-violet-100 to-indigo-300 tracking-[0.08em]",style:{fontFamily:"'Zen Old Mincho',serif"},children:["決戦の地",u.jsx("span",{className:"text-slate-400 text-xs md:text-sm ml-2 font-normal tracking-normal",children:"／ 夜ノ神社へ"})]}),u.jsx("p",{className:"text-xs text-indigo-200/65",children:"参道には霧。青く冷たい火屑だけが漂う——"})]}),u.jsx("div",{className:"h-[min(720px,80vh)] min-h-[min(560px,72vh)] overflow-hidden rounded-2xl border border-indigo-800/65 shadow-[0_0_72px_rgba(79,70,229,0.2)] bg-black/40 mx-auto max-w-4xl",children:u.jsx(Ip,{players:r,viewPos:I,boardGoal:Zt,isDiceRolling:!1,taxiPhase:null,pieceHopping:!1,currentPlayer:C,visualTheme:"nightShrine",tileEffects:(t==null?void 0:t.sugorokuTileEffects)??null})})]}),p&&v&&u.jsx("div",{className:"fixed inset-0 z-50 flex min-h-[100dvh] w-full items-center justify-center bg-neutral-950 px-5 pointer-events-none",children:u.jsx("h2",{className:"fb-preday8-burn-title text-center px-3 max-w-[min(94vw,40rem)]",children:"決戦の日"})},i),p&&!v&&u.jsxs("div",{className:"fixed inset-0 z-50 overflow-hidden pointer-events-none anim-fb-shake-once isolate",children:[u.jsx("div",{className:"absolute inset-0 bg-neutral-950","aria-hidden":!0}),u.jsx("div",{className:"absolute inset-0 anim-fb-heat-wave","aria-hidden":!0}),u.jsx("div",{className:"absolute inset-0 anim-fb-heat-bg","aria-hidden":!0}),u.jsx("div",{"aria-hidden":!0,className:"anim-fb-flame-sheet anim-fb-flame-sheet-delay pointer-events-none absolute left-1/2 bottom-[14%] w-[118%] max-w-none -translate-x-1/2 h-[72%]",style:{borderRadius:"45% 45% 50% 50%",background:"linear-gradient(to top,#7f1d1d 0%,#b91c1c 28%,#ea580c 58%,rgba(251,191,36,0.5) 88%,transparent 100%)"}}),u.jsx("div",{"aria-hidden":!0,className:"anim-fb-flame-sheet pointer-events-none absolute left-1/2 bottom-[17%] w-[94%] max-w-none -translate-x-1/2 h-[62%]",style:{borderRadius:"48% 48% 50% 50%",mixBlendMode:"screen",background:"linear-gradient(to top,#451a03 0%,#dc2626 35%,#fb923c 65%,rgba(254,249,195,0.55) 95%,transparent 100%)"}}),u.jsx("div",{className:"absolute inset-0 z-[1]","aria-hidden":!0,children:j.map(_=>u.jsx("span",{className:"anim-fb-ember-dot",style:{left:`${_.leftPct}%`,bottom:`${_.bottomPct}%`,"--delay":`${_.delayMs}ms`,"--dur":`${_.durSec}s`}},_.id))}),u.jsx("div",{className:"relative z-10 flex h-full min-h-[100dvh] w-full items-center justify-center px-5",children:u.jsx("h2",{className:"fb-decisive-title text-center px-3 max-w-[min(94vw,40rem)]",children:"決戦の日"})})]},i)]})}const Qf="POTENTIAL OVER NEXT SPIN (PONS)",ij=!0,rj="現在はソロプレイ体験版です。オンラインで仲間と遊ぶ「Next Spin」（マルチプレイ）は開発中です。次のアップデートで解放予定です。",Wm="POTENTIAL OVER NEXT SPIN",Kh="PONS",bS="/images/title_logo.png",oj="/images/casual_chat_stream.png",lj="/images/game_streaming.png",cj="/images/work.png";function Lc({myFullId:t,copied:e,onCopy:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r}){const[l,c]=R.useState(!1),h=R.useRef(null);if(R.useEffect(()=>{if(!l)return;const g=v=>{h.current&&!h.current.contains(v.target)&&c(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[l]),!t)return null;const d=Math.round(Math.max(0,Math.min(1,s))*100),p=Math.round(Math.max(0,Math.min(1,a))*100);return u.jsxs("div",{ref:h,className:"fixed top-3 right-3 z-[200] flex flex-col items-end gap-1 select-none",children:[u.jsxs("div",{className:"flex max-w-[min(calc(100vw-5.5rem),18rem)] items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-slate-800/95 px-3 py-1.5 shadow-md",children:[u.jsx("span",{className:"truncate font-mono text-xs font-bold text-cyan-300",title:t,children:t}),u.jsx("button",{type:"button",onClick:n,className:`shrink-0 text-sm transition-all ${e?"text-emerald-400":"text-slate-400 hover:text-white"}`,title:"コピー",children:e?"✓":"📋"})]}),u.jsx("div",{className:"flex w-full justify-end pr-0.5",children:u.jsx("button",{type:"button",onClick:()=>c(g=>!g),className:"rounded-lg border border-slate-600 bg-slate-800/90 px-2 py-1 text-base leading-none text-slate-300 hover:bg-slate-700 hover:text-white","aria-expanded":l,"aria-label":"音量設定",title:"音量設定",children:"⚙"})}),l&&u.jsxs("div",{className:"w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-slate-600 bg-slate-950/98 p-3 text-xs text-slate-200 shadow-xl backdrop-blur-sm",children:[u.jsx("p",{className:"mb-2.5 font-semibold text-slate-400",children:"サウンド"}),u.jsxs("label",{className:"mb-3 flex flex-col gap-1.5",children:[u.jsxs("span",{className:"flex justify-between font-medium text-slate-300",children:[u.jsx("span",{children:"効果音"}),u.jsxs("span",{className:"tabular-nums text-cyan-300/90",children:[d,"%"]})]}),u.jsx("input",{type:"range",min:0,max:100,value:d,onChange:g=>i(Number(g.target.value)/100),className:"w-full accent-cyan-500"})]}),u.jsxs("label",{className:"flex flex-col gap-1.5",children:[u.jsxs("span",{className:"flex justify-between font-medium text-slate-300",children:[u.jsx("span",{children:"BGM（タイトル〜待機・育成・8日目）"}),u.jsxs("span",{className:"tabular-nums text-violet-300/90",children:[p,"%"]})]}),u.jsx("input",{type:"range",min:0,max:100,value:p,onChange:g=>r(Number(g.target.value)/100),className:"w-full accent-violet-500"})]})]})]})}function uj({myFullId:t,copied:e,onCopyMyId:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r,loading:l,onSoloPlay:c,multiOpen:h,onToggleMultiOpen:d,multiAction:p,onSetMultiAction:g,onQuickMatch:v,isPrivateRoom:C,onSetPrivateRoom:I,allowQuickMatch:j,onSetAllowQuickMatch:_,onCreateRoom:b,joinInput:N,onJoinInputChange:P,onJoinRoom:$,onCheckInvites:J,uiError:T,onClearUiError:x}){const E=ij,A=h&&!E;return u.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[u.jsx(Lc,{myFullId:t,copied:e,onCopy:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r}),u.jsxs("div",{className:"w-full max-w-md space-y-5 pt-10",children:[u.jsxs("div",{className:"flex flex-col items-center gap-4 text-center",children:[u.jsx("img",{src:ta(bS),alt:Qf,className:"mx-auto w-full max-w-[min(92vw,440px)] h-auto object-contain select-none drop-shadow-[0_0_28px_rgba(34,211,238,0.14)]"}),u.jsx("h2",{className:"font-[Rajdhani] text-lg sm:text-xl font-bold tracking-tight text-slate-50 leading-tight px-1",children:Qf}),u.jsxs("div",{className:"w-full rounded-xl border border-cyan-500/25 bg-slate-900/80 px-3 py-2.5 text-left",children:[u.jsx("p",{className:"text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400",children:"News · ひとこと"}),u.jsx("p",{className:"mt-1.5 text-xs text-slate-400 leading-relaxed",children:rj})]})]}),u.jsxs("div",{className:"text-center space-y-1 pt-1",children:[u.jsx("p",{className:"text-xs text-slate-500",children:"ようこそ"}),u.jsx("p",{className:"text-2xl font-bold",children:t||"プレイヤー"}),u.jsx("p",{className:"text-sm text-slate-400",children:"どのように遊びますか？"})]}),u.jsx("button",{type:"button",onClick:c,disabled:l,className:"w-full rounded-2xl bg-gradient-to-br from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 active:scale-[0.98] py-5 font-bold text-white text-xl transition-all disabled:opacity-50 shadow-lg shadow-violet-900/30 flex items-center justify-center gap-3",children:l?u.jsx(Ur,{size:24,className:"animate-spin"}):u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"text-2xl",children:"🎮"}),u.jsx("span",{children:"一人で遊ぶ"})]})}),u.jsxs("div",{className:"relative",children:[u.jsxs("button",{type:"button",disabled:E,"aria-disabled":E,tabIndex:-1,title:"マルチプレイは開発中です",className:["w-full rounded-2xl py-5 font-bold text-xl shadow-lg flex items-center justify-center gap-3 transition-all","pointer-events-none cursor-not-allowed border border-slate-700/90 bg-slate-900/60 text-slate-500 grayscale opacity-[0.52]"].join(" "),children:[u.jsx("span",{className:"text-2xl grayscale",children:"👥"}),u.jsx("span",{className:"opacity-90",children:"みんなで遊ぶ（オンライン）"}),!E]}),u.jsx("div",{className:"pointer-events-none absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-0 px-2","aria-hidden":"true",children:u.jsxs("span",{className:"inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-950/92 px-2.5 py-1 shadow-[0_8px_28px_rgba(0,0,0,0.45)] ring-1 ring-cyan-500/15 backdrop-blur-sm",children:[u.jsx("span",{className:"rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-amber-950 shadow-sm",children:"Coming Soon"}),u.jsx("span",{className:"pr-1 text-[10px] font-bold tracking-wide text-cyan-100/95",children:"準備中"})]})})]}),A&&u.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900 p-4 space-y-3",children:[u.jsxs("button",{type:"button",onClick:v,disabled:l,className:"w-full rounded-xl bg-violet-700 hover:bg-violet-600 active:scale-[0.98] py-3.5 font-semibold text-white transition-all disabled:opacity-50 flex flex-col items-center gap-0.5",children:[u.jsx("span",{className:"text-base font-bold",children:"⚡ クイックマッチ"}),u.jsx("span",{className:"text-xs text-violet-300 opacity-80",children:"空きルームにランダム参加"})]}),u.jsxs("button",{type:"button",onClick:()=>g(k=>k==="create"?null:"create"),className:`w-full rounded-xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 ${p==="create"?"bg-cyan-600 text-white":"bg-slate-800 hover:bg-slate-700 text-slate-200"}`,children:[u.jsx("span",{className:"text-base font-bold",children:"🏠 新しいルームを作成"}),u.jsx("span",{className:"text-xs opacity-60",children:p==="create"?"▲ 閉じる":"ホストとしてルームを立てる ▼"})]}),p==="create"&&u.jsxs("div",{className:"rounded-xl bg-slate-800 border border-slate-700 p-3 space-y-3",children:[u.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[u.jsx("button",{type:"button",onClick:()=>I(!1),className:`rounded-xl py-2.5 text-sm font-semibold transition-all ${C?"bg-slate-700 text-slate-300 hover:bg-slate-600":"bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/60"}`,children:"🌐 公開ルーム"}),u.jsx("button",{type:"button",onClick:()=>I(!0),className:`rounded-xl py-2.5 text-sm font-semibold transition-all ${C?"bg-rose-500 text-white ring-2 ring-rose-400/60":"bg-slate-700 text-slate-300 hover:bg-slate-600"}`,children:"🔒 招待制"})]}),u.jsx("p",{className:"text-xs text-slate-400 text-center",children:C?"招待したIDのみ参加可":"ルームIDを知っていれば誰でも参加可"}),!C&&u.jsxs("div",{className:"flex items-center justify-between rounded-lg bg-slate-700 px-3 py-2.5",children:[u.jsxs("div",{children:[u.jsx("p",{className:"text-sm font-medium",children:"⚡ クイックマッチを受け入れる"}),u.jsx("p",{className:"text-xs text-slate-400",children:"OFFにすると自動マッチングから除外"})]}),u.jsx("button",{type:"button",onClick:()=>_(k=>!k),className:`relative shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${j?"bg-cyan-500":"bg-slate-600"}`,children:u.jsx("div",{className:`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${j?"translate-x-5":"translate-x-0.5"}`})})]}),u.jsx("button",{type:"button",onClick:b,disabled:l,className:"w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 py-2.5 font-bold text-slate-950 transition-colors disabled:opacity-50",children:l?"作成中…":"ルームを作成"})]}),u.jsxs("button",{type:"button",onClick:()=>g(k=>k==="join"?null:"join"),className:`w-full rounded-xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 ${p==="join"?"bg-cyan-600 text-white":"bg-slate-800 hover:bg-slate-700 text-slate-200"}`,children:[u.jsx("span",{className:"text-base font-bold",children:"🔑 ルームIDで参加"}),u.jsx("span",{className:"text-xs opacity-60",children:p==="join"?"▲ 閉じる":"6桁のルーム番号で入室 ▼"})]}),p==="join"&&u.jsx("div",{className:"rounded-xl bg-slate-800 border border-slate-700 p-3 space-y-2",children:u.jsxs("div",{className:"flex gap-2",children:[u.jsx("input",{value:N,onChange:k=>P(k.target.value.toUpperCase()),maxLength:8,onKeyDown:k=>k.key==="Enter"&&$(),className:"flex-1 rounded-lg border border-slate-700 bg-slate-700 px-3 py-2 text-sm text-center font-mono tracking-widest focus:border-cyan-500 focus:outline-none",placeholder:"ルームID",autoFocus:!0}),u.jsx("button",{type:"button",onClick:$,disabled:l,className:"rounded-xl bg-slate-600 hover:bg-slate-500 px-5 py-2 font-medium transition-colors disabled:opacity-50",children:"参加"})]})}),u.jsxs("button",{type:"button",onClick:J,disabled:l,className:"w-full rounded-xl bg-rose-700 hover:bg-rose-600 active:scale-[0.98] py-3.5 font-semibold text-white transition-all disabled:opacity-50 flex flex-col items-center gap-0.5",children:[u.jsx("span",{className:"text-base font-bold",children:"🔔 招待を確認"}),u.jsx("span",{className:"text-xs text-rose-300 opacity-80",children:"自分宛ての招待ルームを探す"})]})]}),T&&u.jsx("div",{className:"rounded-xl border border-rose-500/40 bg-rose-950/35 px-3 py-3 text-left shadow-lg shadow-black/25",role:"alert",children:u.jsxs("div",{className:"flex items-start gap-3",children:[u.jsx("span",{className:"text-base leading-none shrink-0 pt-0.5 opacity-95","aria-hidden":!0,children:"⚠️"}),u.jsx("p",{className:"flex-1 min-w-0 text-sm text-rose-100/95 leading-relaxed",children:T}),typeof x=="function"&&u.jsx("button",{type:"button",onClick:x,className:"shrink-0 rounded-lg p-1.5 text-rose-200/85 hover:bg-rose-500/15 hover:text-rose-50 transition-colors","aria-label":"エラーを閉じる",children:u.jsx(aS,{size:18})})]})}),u.jsxs("div",{className:"rounded-xl bg-slate-800/50 border border-slate-800 p-3 text-xs leading-relaxed text-slate-400 space-y-2.5",children:[u.jsx("p",{className:"font-semibold text-slate-300",children:"ゲーム概要"}),u.jsxs("p",{children:[u.jsxs("strong",{className:"text-slate-300",children:["1〜",Sa,"日目は育成パート。"]}),"毎ターン、仕事・配信・神社・デイリースロットのどれかを選び、資金や運・技量・善行などを育てていきます。キャラごとに生活費が異なり、行動後に毎回かかるので、お金の持ちぐあいが勝負の土台になります。"]}),u.jsxs("p",{children:[u.jsx("strong",{className:"text-slate-300",children:"PON"})," は行動のたびに少しずつ溜まり、高めになるとイベントが発生しやすくなります（内容は行動種別によって違うことも）。 配信は運要素が強く、技量や善行が結果に効いてきます。"]}),u.jsxs("p",{children:[u.jsxs("strong",{className:"text-slate-300",children:[Ap,"日目は決戦。"]}),"すごろくでゴールを目指し、素早くゴールするとスロットを長く行えます。"]}),u.jsx("p",{className:"text-[11px] text-slate-500 pt-1 border-t border-slate-700/60 leading-snug",children:"具体的な金額・割合・各ステータスの効き方は、プレイ画面の説明やログで確認できます。"})]})]})]})}function hj(){const t=R.useMemo(()=>Array.from({length:40},(e,n)=>({id:n,left:(n*97+13)%100,delay:n*37%30/10,dur:2.2+n*17%20/10,sym:n%4===0?"¥":n%4===1?"★":n%4===2?"¥":"◆",size:13+n%5*4,color:n%3===0?"#fbbf24":n%3===1?"#fde68a":"#f59e0b"})),[]);return u.jsx("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-20",children:t.map(e=>u.jsx("span",{className:"absolute anim-particle font-black select-none",style:{left:`${e.left}%`,top:"-40px",fontSize:`${e.size}px`,color:e.color,animationDelay:`${e.delay}s`,animationDuration:`${e.dur}s`},children:e.sym},e.id))})}function fj(t,e,n){const s=t==="ririm"?"vtuber":t??"salaryman";return e&&n?s==="vtuber"?"Jackpot! My fans are gonna love this clip! ✨":s==="student"?"Whoa, it actually worked! Beginner's luck is real! 🎓":null:e&&!n?s==="vtuber"?"Whaat?! It looked so hot! This game is rigged! 💢":s==="student"?"Wait, that was a miss? But the effect was so flashy...":null:!e&&n?s==="salaryman"?"Calculated. Visual flair isn't everything. 💼":s==="student"?"Huh? I wasn't even watching and I won!":null:null}const cx=0,dj=2e3,mj=600,pj=1e3,gj=new Set(["vtuber","ririm"]);function yj({gs:t,cpGs:e,isMyTurn:n,writeGS:s,commitPendingGameState:a,soundRef:i,roomId:r}){var Se,bt;const[l,c]=R.useState(!1),[h,d]=R.useState(["?","?","?"]),[p,g]=R.useState(!1),[v,C]=R.useState(5),[I,j]=R.useState("standard"),[_,b]=R.useState([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),[N,P]=R.useState([!1,!1,!1]),[$,J]=R.useState(-1),[T,x]=R.useState(!1),[E,A]=R.useState(!1),[k,M]=R.useState(!1),[w,te]=R.useState(!1),[pe,W]=R.useState(null),[ee,ae]=R.useState("idle"),[ue,Le]=R.useState(!1),[Ze,ut]=R.useState(!1),[Mt,qe]=R.useState(0),[He,ht]=R.useState(!1),F=R.useRef(null),re=R.useRef([!1,!1,!1]),he=R.useRef(null),Z=R.useRef(null),Pe=R.useRef(0),Te=(t==null?void 0:t.gamePhase)==="playing"&&(t==null?void 0:t.subPhase)==="day8"&&(e==null?void 0:e.movePhase)==="arrived",Ge=((bt=(Se=t==null?void 0:t.displayReels)==null?void 0:Se.join)==null?void 0:bt.call(Se,","))??"",De=(t==null?void 0:t.gamePhase)==="playing"&&n&&Te&&(e==null?void 0:e.slotTurnsLeft)>0&&!l&&!p;R.useEffect(()=>{if(!Te||l)return;const ne=t==null?void 0:t.displayReels;if(!Array.isArray(ne)||ne.length!==3)return;const X=wa[I]??wa.standard;b(ne.map((oe,Ue)=>kp(oe,X,Ue)))},[Te,l,Ge,I,t==null?void 0:t.displayReels]),R.useEffect(()=>{if(!p)return;if(v<=0){const X=he.current;he.current=null,g(!1),C(5),X&&r&&a(X);return}const ne=setTimeout(()=>C(X=>X-1),1e3);return()=>clearTimeout(ne)},[p,v,r,a]);const Qe=async()=>{const ne=he.current;he.current=null,g(!1),C(5),ne&&await s(ne)},wt=async()=>{if(!t||!n||l)return;const ne=t.currentPlayerIdx,X=t.players[ne],oe=[`${X.name} スロット終了 / 資金${X.stats.money}G / ランク${Vc(X.stats.money)}`],Ue=t.players.map((ye,ce)=>ce!==ne?ye:{...ye,slotTurnsLeft:0,slotPullsGranted:0,slotPullsThisSeat:0});await s(Vr(t,Ue,oe))},ft=async(ne=Kf)=>{if(l||!n||!t)return;const X=t.players[t.currentPlayerIdx];if(X.slotTurnsLeft<=0)return;const oe=wa[I]??wa.standard,Ue=X.slotHeat??0,ye=X.slotPityCounter??0,ce=dS(X.stats,ne,I,Ue,X.characterType,{pityCounter:ye});let Xe=[...ce.reels];if(ce.tier==="miss"){const Ae=oe.symbols,ot=O.slot.nearMissReachChance,jt=O.slot.slipSymbolChance,St=Math.random();if(Ae.length>=2&&St<ot){const Xt=Ae[ze(0,Ae.length-1)],Sn=Ae.filter(Wt=>Wt!==Xt),Yt=Sn[ze(0,Sn.length-1)];Xe=[Xt,Xt,Yt]}else if(St<ot+jt){const Xt=ze(0,2);Xe[Xt]=Ae[1]}}const{reachPossible:it}=yO(Xe,ce.tier),Ke=it&&vO(),mn=Math.max(0,X.stats.luck-O.slot.luckBaseline),Dt=Math.max(0,X.stats.skill-O.slot.skillBaseline),Qt=ce.tier!=="miss"&&(mn>=10||Dt>=10),we=Xe.map((Ae,ot)=>kp(Ae,oe,ot));Le(!0),setTimeout(()=>Le(!1),340),c(!0),x(!1),A(!1),M(!1),te(!1),Pe.current=0,Z.current&&(clearTimeout(Z.current),Z.current=null),W(null),ht(!1),qe(0),ae("spinning"),re.current=[!1,!1,!1],P([!1,!1,!1]),b([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),J(-1),d(Xe);const me=i.current;me==null||me.playStart(),setTimeout(()=>me==null?void 0:me.startSpin(),200),F.current&&clearInterval(F.current),F.current=setInterval(()=>{if(performance.now()<Pe.current)return;const Ae=re.current;b(ot=>ot.map((jt,St)=>Ae[St]?jt:mS(oe)))},80);const Oe=(Ae,ot,jt)=>{if(jt&&Qt&&Math.random()<.5){const Xt=pS(ot[1],oe),Sn=[ot[0],Xt,ot[2]];re.current[Ae]=!0,b(Yt=>{const Wt=[...Yt];return Wt[Ae]=Sn,Wt}),J(Ae),me==null||me.playStop(Ae),setTimeout(()=>J(-1),430),setTimeout(()=>{b(Yt=>{const Wt=[...Yt];return Wt[Ae]=ot,Wt}),P(Yt=>{const Wt=[...Yt];return Wt[Ae]=!0,Wt}),setTimeout(()=>{P(Yt=>{const Wt=[...Yt];return Wt[Ae]=!1,Wt})},560)},380)}else re.current[Ae]=!0,b(Xt=>{const Sn=[...Xt];return Sn[Ae]=ot,Sn}),J(Ae),me==null||me.playStop(Ae),setTimeout(()=>J(-1),430)},Ot=1200,Gt=1700,Re=it?Gt+2400:Gt+550,mt=Ke?Math.max(Gt+480,Re+cx):1/0,xt=Ke?Math.max(Re+cx,Math.round(mt+dj)):Re;setTimeout(()=>Oe(0,we[0],!0),Ot),setTimeout(()=>Oe(1,we[1],!0),Gt),it&&setTimeout(()=>{x(!0),ae("reach"),setTimeout(()=>me==null?void 0:me.playReach(),150)},Gt+400),Ke&&mt<xt&&(Z.current=setTimeout(()=>{Z.current=null,Pe.current=performance.now()+mj,te(!0),setTimeout(()=>te(!1),110),A(!0)},mt));const ls=()=>new Promise(Ae=>{if(!Ke){A(!1),M(!1),Ae();return}if(ce.tier==="miss"){M(!0),me==null||me.playReachGaseSting(),setTimeout(()=>{A(!1),M(!1),Ae()},720);return}setTimeout(()=>{A(!1),M(!1),Ae()},200)});setTimeout(async()=>{Z.current&&(clearTimeout(Z.current),Z.current=null),Ke&&(await ls(),await new Promise(cs=>setTimeout(cs,pj))),clearInterval(F.current),me==null||me.stopSpin(),Oe(2,we[2],!0),x(!1),b(we),ce.tier!=="miss"?(qe(ce.payout),ht(!0),W(ce.tier),ae("win"),setTimeout(()=>me==null?void 0:me.playWin(ce.tier),200),setTimeout(()=>W(null),4e3)):ae("miss");const Ae=ce.payout-ne,ot=vn(X.stats.money-ne+ce.payout),jt=X.slotTurnsLeft-1,St=(X.slotPullsThisSeat??0)+1,Xt=X.spinCount+1,Sn=X.slotNet+Ae,Yt=Ue+1,Wt=t.players.map((cs,sa)=>sa!==t.currentPlayerIdx?cs:{...cs,stats:{...cs.stats,money:ot},slotTurnsLeft:jt,slotPullsThisSeat:St,spinCount:Xt,slotNet:Sn,slotHeat:Yt,slotPityCounter:ce.pityCounterAfter,lastSpinResult:{...ce,net:Ae,spin:Xt}}),ya=(Yt*1.5).toFixed(1),na=Yt>=10?"🔥 BURNING!!":Yt>=6?"🌡️ 熱くなってきた！":"🌀 台が温まってきた！",nn=fj(X.characterType,Ke,ce.tier!=="miss"),ms=ce.pityForced?`  🎯 善行ピティ: 連続ハズレ${ce.maxPity}回で今回は役確定（カウンタリセット）`:`  🎯 善行ピティ: ${ce.pityCounterAfter}/${ce.maxPity}（善行が高いほど天井までの回数が減ります）`,Bn=[`${X.name} スロット${Xt}回[${oe.emoji}${oe.label}|${ne}G]: ${ce.message} / 収支${Ae>=0?"+":""}${Ae}G / 合計${Sn>=0?"+":""}${Sn}G | JP ${(ce.r.jp*100).toFixed(1)}% ハズレ ${(ce.r.miss*100).toFixed(1)}%`,ms,`  技量によりハズレを${(ce.r.skillMissReduced*100).toFixed(2)}%削減 / 運：当−${(ce.r.luckDrainAtari*100).toFixed(2)}%・小−${(ce.r.luckDrainSmall*100).toFixed(2)}%→上位 / 熟成でハズレ${(ce.r.heatMissReduced*100).toFixed(2)}%削減`,`  ${na} ハズレ確率が${ya}%ダウン（熟成Lv${Yt}）`];nn&&Bn.push(`💬 ${X.name}: 「${nn}」`);const $n={...t,players:Wt,displayReels:Xe,showSpinResult:!0,log:da(Bn,t.log)};he.current=Vr($n,Wt,[]),g(!0),C(5),await s($n),d(ce.reels),c(!1)},xt)};if(!e||!Te)return null;const Jn=Math.max(1,O.dice.slotsPerSugorokuTurn),dt=e.slotPullsThisSeat??0,fe=Math.min(e.slotTurnsLeft??0,Math.max(0,Jn-dt)),Ee="/".replace(/\/?$/,"/");return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:E?"anim-slot-reach-machine-shake":"",children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("h2",{className:"font-semibold",children:["8日目 スロットターン — ",e.name]}),u.jsxs("button",{type:"button",onClick:()=>{var X;const ne=!Ze;ut(ne),(X=i.current)==null||X.setMuted(ne)},title:Ze?"ミュート解除":"ミュート",className:`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${Ze?"border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500":"border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"}`,children:[Ze?u.jsx(YD,{size:14}):u.jsx(qD,{size:14}),Ze?"OFF":"ON"]})]}),e.slotTurnsLeft>0||p?u.jsxs("div",{className:"space-y-4",children:[(()=>{var we;const ne=wa[I]??wa.standard,X=e.slotHeat??0,oe=hS(e.stats,ne,X,e.characterType),Ue=(oe.heatMissReduced*100).toFixed(1),ye=X>=10,ce=X>=6,Xe=ye?"text-red-400":ce?"text-orange-400":X>=3?"text-yellow-400":"text-slate-400",it=ye?"🔥 BURNING!!":ce?"🌡️ 熱い！":X>=3?"🌀 温まってきた":"❄️ 冷",Ke=Math.min(100,X/15*100),mn=ye?"bg-red-500":ce?"bg-orange-500":X>=3?"bg-yellow-500":"bg-slate-600",Dt=e.slotPityCounter??0,Qt=fS((we=e.stats)==null?void 0:we.virtue);return u.jsxs("div",{className:"rounded-lg bg-slate-800/50 p-3 text-xs space-y-2",children:[n&&!p&&u.jsx("div",{className:"flex gap-2 flex-wrap pb-1 border-b border-slate-700",children:Object.values(wa).map(me=>u.jsxs("button",{type:"button",onClick:()=>j(me.key),className:`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors border ${I===me.key?`${me.border} ${me.color}`:"border-slate-700 text-slate-400 hover:border-slate-500"}`,children:[me.emoji," ",me.label]},me.key))}),u.jsxs("div",{className:`rounded-lg border px-3 py-2 space-y-1.5 ${ye?"border-red-500/60 bg-red-500/10":ce?"border-orange-500/50 bg-orange-500/8":"border-slate-700 bg-slate-900/40"}`,children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("span",{className:`font-black text-sm tracking-wide ${Xe}`,children:["LUCKY LEVEL ",X]}),u.jsx("span",{className:`text-xs font-bold ${Xe}`,children:it})]}),u.jsx("div",{className:"h-2.5 rounded-full bg-slate-700 overflow-hidden",children:u.jsx("div",{className:`h-full rounded-full transition-all duration-500 ${mn} ${ye?"animate-pulse":""}`,style:{width:`${Ke}%`}})}),u.jsxs("div",{className:"flex justify-between text-slate-500",style:{fontSize:"10px"},children:[u.jsxs("span",{children:["熟成でハズレから ",Ue,"% を上位4役へ配分（内訳は右）"]}),u.jsxs("span",{children:["JP+",(X*.1).toFixed(1),"% / 大当+",(X*.3).toFixed(1),"% / 中当+",(X*.5).toFixed(1),"% / 当+",(X*.6).toFixed(1),"%"]})]})]}),u.jsxs("div",{className:"rounded-lg border border-emerald-700/45 bg-emerald-950/25 px-3 py-2 space-y-0.5",children:[u.jsxs("div",{className:"flex items-center justify-between text-[11px]",children:[u.jsx("span",{className:"font-semibold text-emerald-200/95",children:"善行ピティ（連続ハズレ天井）"}),u.jsxs("span",{className:"tabular-nums text-emerald-100 font-bold",children:[Dt," / ",Qt]})]}),u.jsxs("p",{className:"text-slate-500",style:{fontSize:"10px"},children:["ハズレるたび +1。",Qt,"回ハズレで次スピンは当たり確定（役は通常抽選）。当たり後 0 にリセット。善行が高いほど天井までが短い。"]})]}),u.jsxs("p",{className:"text-slate-300",children:["現資金 ",u.jsx("span",{className:"font-bold text-white text-base",children:e.stats.money}),"G",e.spinCount>0&&u.jsxs("span",{className:`ml-2 font-semibold ${e.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:["スロット収支: ",e.slotNet>=0?"+":"",e.slotNet,"G"]})]}),(()=>{const me=Math.max(0,e.stats.luck-O.slot.luckBaseline),Oe=Math.max(0,e.stats.skill-O.slot.skillBaseline),Ot=Oe>=O.slot.skillBlockSize?Math.floor(Oe/O.slot.skillBlockSize):0,Gt=me>0,Re=Ot>0;return Gt||Re?u.jsxs("div",{className:"flex gap-1.5 flex-wrap",children:[Gt&&u.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 px-2 py-0.5 text-[10px] font-bold text-yellow-300",children:["✨ 運：運100で当−2%・小−3%→JP・大（現在+",me,"点 → 当最大−",(O.slot.luckAtariDrainAtLuck100*100*me/O.slot.luckRefSpan).toFixed(1),"%・小最大−",(O.slot.luckSmallDrainAtLuck100*100*me/O.slot.luckRefSpan).toFixed(1),"%）"]}),Re&&u.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-[10px] font-bold text-sky-300",children:["⚙️ 技量：満",O.slot.skillBlockSize,"点ごとハズレ",(O.slot.skillMissReducePerBlock*100).toFixed(1),"%→中",(O.slot.skillToMid*100).toFixed(0),"%・当",(O.slot.skillToAtari*100).toFixed(0),"%・小",(O.slot.skillToSmall*100).toFixed(0),"%（",Ot,"段 × ",(O.slot.skillMissReducePerBlock*100).toFixed(1),"%＝最大",(Ot*O.slot.skillMissReducePerBlock*100).toFixed(1),"%）"]})]}):null})(),u.jsxs("p",{className:"text-slate-500",style:{fontSize:"10px"},children:["[",ne.emoji,ne.label,"] JP ",u.jsxs("span",{className:"text-yellow-400 font-semibold",children:[(oe.jp*100).toFixed(2),"%"]}),"  /  ","大当 ",u.jsxs("span",{className:"text-amber-400 font-semibold",children:[(oe.big*100).toFixed(2),"%"]}),"  /  ","中当 ",u.jsxs("span",{className:"text-emerald-400 font-semibold",children:[(oe.mid*100).toFixed(2),"%"]}),"  /  ","当 ",u.jsxs("span",{className:"text-cyan-400 font-semibold",children:[(oe.atari*100).toFixed(2),"%"]}),"  /  ","小当 ",u.jsxs("span",{className:"text-slate-300 font-semibold",children:[(oe.small*100).toFixed(2),"%"]}),"  /  ","ハズレ ",u.jsxs("span",{className:"text-rose-400 font-semibold",children:[(oe.miss*100).toFixed(1),"%"]})]}),u.jsxs("p",{className:"text-slate-500 border-t border-slate-700/80 pt-1.5 mt-1",style:{fontSize:"10px"},children:["再配分内訳：技量でハズレ ",u.jsxs("span",{className:"text-sky-400 font-semibold",children:["−",(oe.skillMissReduced*100).toFixed(2),"%"]})," · ","運で小役→上位 ",u.jsxs("span",{className:"text-yellow-400 font-semibold",children:[(oe.luckConverted*100).toFixed(2),"%"]})," · ","熟成でハズレ ",u.jsxs("span",{className:"text-orange-400 font-semibold",children:["−",(oe.heatMissReduced*100).toFixed(2),"%"]})]})]})})(),(()=>{const ne=e.slotHeat??0,X=ne>=10?"anim-heat-burning":ne>=6?"anim-heat-warm":"",oe=e.characterType??"salaryman",Ue=ee==="win"?"anim-char-bounce":ee==="reach"?"anim-char-pray":ee==="spinning"?"anim-char-wobble":ee==="miss"?"anim-char-sad":"",ye=Math.max(0,e.stats.luck-O.slot.luckBaseline),ce=Math.max(0,e.stats.skill-O.slot.skillBaseline),Xe=ye>=50?3:ye>=30?2:ye>=10?1:0,it=ce>=30?2:ce>=10?1:0,Ke=Xe>=1&&it>=1,mn=l&&(Xe>0||it>0);let Dt="";mn&&(Ke?Dt="slot-cabinet-stage--aura-combo":Xe>=3?Dt="slot-cabinet-stage--aura-luck3":Xe===2?Dt="slot-cabinet-stage--aura-luck2":Xe===1?Dt="slot-cabinet-stage--aura-luck1":it>=2?Dt="slot-cabinet-stage--aura-skill2":it===1&&(Dt="slot-cabinet-stage--aura-skill1"));const Qt=!!pe,we={top:"var(--slot-window-top)",left:"var(--slot-window-left)",width:"var(--slot-window-width)",height:"var(--slot-window-height)"};return u.jsxs("div",{className:`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${X} ${pe==="jackpot"?"anim-jp-rainbow":""}`,children:[pe&&pe!=="miss"&&u.jsx("div",{className:"absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl",children:Array.from({length:pe==="jackpot"?28:pe==="big"?16:8},(me,Oe)=>u.jsx("span",{style:{position:"absolute",left:`${(Oe*97+11)%100}%`,top:"-30px",fontSize:pe==="jackpot"?"1.6rem":"1.2rem",animation:`coinDrop ${1.4+Oe*.11%1.2}s ${Oe*.07%1.1}s ease-in forwards`},children:pe==="jackpot"?["🪙","⭐","💎","✨"][Oe%4]:"🪙"},Oe))}),u.jsx("div",{className:"relative z-[8] flex flex-col items-center gap-3 w-full",children:u.jsxs("div",{className:["slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",ue?"slot-cabinet-recoiling":"",Dt].filter(Boolean).join(" "),children:[He&&Mt>0&&u.jsx("div",{className:"pointer-events-none absolute top-1/2 z-[42] flex -translate-y-1/2 items-center pl-2 sm:pl-3",style:{left:"100%"},"aria-live":"polite","aria-atomic":"true",children:u.jsxs("span",{role:"presentation",className:"anim-slot-payout-popup font-black tabular-nums leading-none tracking-tight text-[#ffe566]",style:{fontSize:"clamp(2.5rem, min(14vw, 5rem), 5rem)",WebkitTextStroke:"2px rgba(120,53,15,0.85)",paintOrder:"stroke fill",textShadow:"0 0 2px #000, 0 2px 0 #854d0e, 0 4px 12px rgba(0,0,0,0.75), 0 0 28px rgba(250,204,21,0.75), 0 0 48px rgba(234,179,8,0.45)"},onAnimationEnd:()=>{ht(!1),qe(0)},children:["+",Mt,"G"]})}),T&&u.jsx("p",{className:"pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse",children:"🎯 REACH!!"}),u.jsxs("div",{className:"slot-machine-stack relative w-full min-h-[200px]",children:[u.jsx("div",{className:"absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none",style:we,"aria-hidden":!0}),u.jsxs("div",{className:"slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none",style:we,children:[u.jsx("div",{className:"slot-grid-3x3 flex h-full w-full flex-row",style:{gap:"var(--slot-reel-gap)",padding:"var(--slot-reel-pad-y) var(--slot-reel-pad-x)"},children:_.map((me,Oe)=>u.jsx("div",{className:["slot-reel-col relative flex min-h-0 h-full min-w-0 flex-1 flex-col overflow-hidden rounded-sm",$===Oe?"anim-reel-bounce":"",T&&Oe===2?"ring-2 ring-amber-400/70 ring-offset-0 rounded-sm":""].filter(Boolean).join(" "),children:u.jsx("div",{className:["slot-reel-strip w-full transition-transform duration-500 ease-out",N[Oe]?"slot-reel-strip--slip":""].filter(Boolean).join(" "),children:me.map((Ot,Gt)=>{const Re=Gt===1,mt=Re&&!re.current[Oe]&&l;return u.jsx("div",{className:["slot-cell flex min-h-0 min-w-0 items-center justify-center border border-slate-600/50 text-slate-100",Re?"slot-cell--payline":"slot-cell--edge",Re&&Qt?"slot-cell--win-pulse":"",Gt===1?"bg-[color-mix(in_srgb,var(--slot-reel-face)_75%,#272e3d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]":"bg-[color-mix(in_srgb,var(--slot-reel-face)_55%,#0f141c)]",mt?"slot-cell--spinning":""].filter(Boolean).join(" "),children:Ot},`${Oe}-${Gt}`)})})},Oe))}),u.jsx("div",{className:"slot-win-line","aria-hidden":!0}),u.jsx("span",{className:"slot-payline-marker slot-payline-marker--l","aria-hidden":!0,children:"▶"}),u.jsx("span",{className:"slot-payline-marker slot-payline-marker--r","aria-hidden":!0,children:"◀"}),u.jsx("div",{className:"slot-reel-vignette","aria-hidden":!0})]}),mn&&u.jsxs("div",{className:"pointer-events-none absolute z-[2] mix-blend-screen overflow-hidden rounded-sm",style:we,"aria-hidden":!0,children:[(Xe>=2||Ke)&&Array.from({length:Ke?14:10},(me,Oe)=>u.jsx("span",{className:"absolute text-[11px]",style:{left:`${(Oe*71+13)%94}%`,top:`${(Oe*47+11)%88}%`,opacity:Ke?.5:.45,animation:`sparkle ${.42+Oe%3*.08}s ease-in-out ${Oe%6*.06}s infinite`,filter:Ke?"drop-shadow(0 0 4px #fde047)":"drop-shadow(0 0 3px rgba(253,224,71,0.8))"},children:Ke&&Oe%3===0?"✨":"✦"},`cab-spark-${Oe}`)),it>=1&&!Ke&&Xe===0&&Array.from({length:8},(me,Oe)=>u.jsx("span",{className:"absolute text-[10px] text-emerald-200/90",style:{left:`${(Oe*83+19)%92}%`,top:`${Oe*59%86}%`,opacity:.4,animation:`auraSparkFloat ${2+Oe%4*.15}s linear ${Oe*.12}s infinite`},children:"✦"},`cab-sk-${Oe}`))]}),u.jsx("div",{className:"slot-cabinet-img-wrap relative z-[10] mx-auto w-full max-w-full pointer-events-none",children:u.jsx("img",{src:vS,alt:"",decoding:"async",draggable:!1,className:"slot-cabinet-img mx-auto block h-auto w-full max-w-full select-none pointer-events-none",onError:me=>{const Oe=me.currentTarget,Ot="/".replace(/\/?$/,"/"),Gt=Oe.dataset.cabinetImgTry??"0";Gt==="0"?(Oe.dataset.cabinetImgTry="1",Oe.src=`${Ot}assets/images/slot-machine.png`):Gt==="1"&&(Oe.dataset.cabinetImgTry="2",Oe.src=`${Ot}images/slot-machine.png`)}})}),u.jsx("button",{type:"button",title:"SPIN（100G・筐体）","aria-label":"スロットを回す（100G）",disabled:!De,className:"absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",style:{top:"var(--slot-spin-top)",left:"var(--slot-spin-left)",width:"var(--slot-spin-w)",height:"var(--slot-spin-h)"},onClick:()=>ft(Kf)})]})]})}),u.jsx("div",{className:"relative z-[12] flex justify-center pointer-events-none mt-2",children:u.jsx(El,{characterType:oe,imgClassName:`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${Ue}`,spanClassName:`text-5xl leading-none inline-block ${Ue}`})}),pe==="jackpot"&&u.jsx("p",{className:"relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse",style:{textShadow:"0 0 20px #fbbf24, 0 0 40px #f59e0b"},children:"🎰 777 JACKPOT!! 🎰"})]})})(),t.showSpinResult&&e.lastSpinResult&&u.jsxs("div",{className:`rounded-xl border p-3 text-sm ${e.lastSpinResult.tier==="jackpot"?"border-amber-400/60 bg-amber-400/10 text-amber-200":e.lastSpinResult.tier==="miss"?"border-slate-700 bg-slate-800/50 text-slate-400":"border-emerald-400/40 bg-emerald-400/10 text-emerald-200"}`,children:[u.jsx("p",{className:"font-semibold",children:e.lastSpinResult.message}),u.jsxs("p",{className:"text-xs mt-1",children:[e.lastSpinResult.spin,"回目 / 収支",e.lastSpinResult.net>=0?"+":"",e.lastSpinResult.net,"G / JP率 ",(e.lastSpinResult.r.jp*100).toFixed(1),"% / ハズレ率"," ",(e.lastSpinResult.r.miss*100).toFixed(1),"%"]}),u.jsxs("p",{className:"text-[10px] mt-1 text-slate-500 leading-snug",children:["技量でハズレ −",((e.lastSpinResult.r.skillMissReduced??0)*100).toFixed(2),"% / 運で小役→上位"," ",((e.lastSpinResult.r.luckConverted??0)*100).toFixed(2),"% / 熟成でハズレ −",((e.lastSpinResult.r.heatMissReduced??0)*100).toFixed(2),"%"]})]}),u.jsxs("div",{className:"flex flex-col gap-1.5",children:[(e.slotTurnsLeft>0||p)&&u.jsx("div",{className:"w-full rounded-lg bg-amber-500/15 border border-amber-400/35 px-3 py-1.5 text-center",children:u.jsxs("span",{className:"text-lg font-black tabular-nums text-amber-100",children:["残り ",fe,"/",Jn]})}),u.jsx("div",{className:"flex gap-3 flex-wrap",children:p?u.jsxs("button",{type:"button",onClick:Qe,className:"inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 animate-pulse",children:[u.jsx(wp,{size:18}),"確認（",v,"秒で自動進行）"]}):u.jsxs(u.Fragment,{children:[eO.map(ne=>{const X=!De,oe=ne===100?"bg-cyan-600 hover:bg-cyan-500":ne===300?"bg-violet-600 hover:bg-violet-500":ne===500?"bg-amber-500 hover:bg-amber-400":"bg-rose-600 hover:bg-rose-500";return u.jsxs("button",{type:"button",onClick:()=>ft(ne),disabled:X,className:`inline-flex items-center gap-1.5 rounded-xl ${oe} px-4 py-2.5 font-semibold text-white transition-colors disabled:opacity-40`,children:[u.jsx(Du,{size:16}),l?"…":u.jsxs("span",{className:"flex flex-col items-start leading-tight",children:[u.jsxs("span",{children:[ne,"G"]}),e.stats.money<ne&&u.jsx("span",{className:"text-[9px] font-normal opacity-80",children:"←借金プレイ"})]})]},ne)}),u.jsxs("button",{type:"button",onClick:wt,disabled:l,className:"inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600 transition-colors disabled:opacity-40",children:[u.jsx(wp,{size:16}),"終了・次へ"]})]})})]})]}):u.jsx("p",{className:"text-sm text-slate-400",children:"スロット回数を全て使いました。"})]}),E&&u.jsxs("div",{className:["slot-reach-cutin-full",k?"slot-reach-cutin-full--gase":""].filter(Boolean).join(" "),"aria-hidden":!0,children:[u.jsx("div",{className:"slot-reach-cutin-full-speed"}),u.jsx("div",{className:"slot-reach-cutin-full-dim"}),u.jsx("div",{className:"slot-reach-cutin-full-vignette"}),u.jsx("div",{className:"slot-reach-cutin-full-scan slot-reach-cutin-full-scan--top"}),u.jsx("div",{className:"slot-reach-cutin-full-scan slot-reach-cutin-full-scan--bottom"}),u.jsx("div",{className:"slot-reach-cutin-full-frame"}),u.jsxs("div",{className:"slot-reach-cutin-full-center",children:[u.jsxs("div",{className:"slot-reach-cutin-hero",children:[u.jsx("div",{className:"slot-reach-cutin-hero-bar","aria-hidden":!0}),gj.has(e==null?void 0:e.characterType)?u.jsx("img",{alt:"",decoding:"async",draggable:!1,src:`${Ee}images/chance_rrm.png`,className:"select-none",onError:ne=>{const X=ne.currentTarget;(X.dataset.chanceCutinTry??"0")==="0"&&(X.dataset.chanceCutinTry="1",X.src=`${Ee}assets/images/chance_rrm.png`)}}):u.jsx(El,{characterType:(e==null?void 0:e.characterType)??"salaryman",imgClassName:"",spanClassName:"select-none block mx-auto text-[clamp(4rem,18vw,8rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]"}),u.jsx("div",{className:"slot-reach-cutin-hero-bar slot-reach-cutin-hero-bar--bottom","aria-hidden":!0})]}),u.jsx("p",{className:"slot-reach-cutin-full-chance-tag font-black",children:"チャンス！！"})]})]}),w&&u.jsx("div",{className:"fixed inset-0 z-[10060] pointer-events-none anim-slot-reach-cutin-white-flash","aria-hidden":!0})]})}const vj="#EFFF42";function ux(t){return Number.isFinite(t)?Math.max(0,Math.min(1,t)):0}function bj({label:t,value:e,min:n,max:s,suffix:a="",hideNumeric:i=!1,barFillPercent:r=null,barShuffle:l=!1,showMaxRollGlow:c=!1,showScaleRange:h=!1,scaleRangeLabel:d="",overviewHint:p="",className:g=""}){const v=s>n?s-n:1,C=ux((Number(e)-n)/v),I=r!=null&&Number.isFinite(Number(r))?ux(Number(r)/100)*100:C*100,j=d||`${Math.round(n)}${a}〜${Math.round(s)}${a}`,_=u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx("span",{className:"w-10 shrink-0 text-right text-[13px] font-bold tracking-tight text-slate-100",children:t}),u.jsxs("div",{className:`relative h-[26px] min-w-0 flex-1 overflow-hidden border-[2px] border-black bg-white shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.06)] transition-[box-shadow] duration-300 ${c?"lobby-gauge-max-ring":""}`,children:[u.jsx("div",{className:`absolute left-0 top-0 z-[1] h-full origin-left ${l?"lobby-gauge-fill-shuffle":"transition-[width] duration-500 ease-in-out"}`,style:{width:`${I}%`,backgroundColor:vj}}),u.jsx("div",{className:"pointer-events-none absolute bottom-[3px] left-[6px] right-[6px] z-[2] h-px bg-black"}),[20,40,60,80].map((b,N)=>{const P=N===0||N===3;return u.jsx("div",{className:"pointer-events-none absolute bottom-[3px] z-[2] w-px bg-black",style:{left:`${b}%`,height:P?"70%":"42%",transform:"translateX(-50%)"}},b)})]}),u.jsx("span",{className:"w-[52px] shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-slate-200",children:i?`—${a}`:`${Math.round(Number(e))}${a}`})]}),h?u.jsxs("div",{className:"flex items-start gap-2",children:[u.jsx("span",{className:"w-10 shrink-0","aria-hidden":!0}),u.jsx("p",{className:"min-w-0 flex-1 text-center text-[9px] tabular-nums leading-tight text-slate-500",children:j}),u.jsx("span",{className:"w-[52px] shrink-0","aria-hidden":!0})]}):null]});return p?u.jsxs("div",{className:`group/stat-hint relative flex flex-col gap-0.5 ${g}`,children:[u.jsx("div",{className:"cursor-help rounded-md px-0.5 py-0.5 outline-none ring-offset-2 ring-offset-slate-900 transition-colors hover:bg-slate-800/40 focus-visible:ring-2 focus-visible:ring-cyan-500/50",tabIndex:0,children:_}),u.jsx("div",{role:"tooltip",className:"pointer-events-none absolute left-1/2 top-full z-[100] mt-1 w-max max-w-[min(288px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-left text-[11px] leading-snug text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-0 transition-opacity duration-150 delay-75 invisible group-hover/stat-hint:opacity-100 group-hover/stat-hint:visible group-hover/stat-hint:delay-0 group-focus-within/stat-hint:opacity-100 group-focus-within/stat-hint:visible group-focus-within/stat-hint:delay-0",children:p})]}):u.jsx("div",{className:`flex flex-col gap-0.5 ${g}`,children:_})}const hx="salaryman",Qh=3,Jm=Qh+1,qo=[{id:"luck",label:"運",valueKey:"luck",rollKey:"luckRoll",suffix:"",rangeKey:"luck",overview:"運気の強さです。伸びるとすごろくのダイスなどで追い風になりやすくなります。一定値を超えるとダイスが増える！？"},{id:"skill",label:"技量",valueKey:"skill",rollKey:"skillRoll",suffix:"",rangeKey:"skill",overview:"腕前やコツのイメージです。スロットでは当たりやすさなどに効いてきます。"},{id:"virtue",label:"善行",valueKey:"virtue",rollKey:"virtueRoll",suffix:"",rangeKey:"virtue",overview:"善行の蓄えです。ダイスや日常イベントで「最低限ここまで」が変わるなど、行動の土台に効きます。"},{id:"pon",label:"PON",valueKey:"pon",rollKey:"ponRoll",suffix:"",rangeKey:"pon",overview:"ストレスや無謀さの目安です。高まると荒れた展開に振れやすくなります。"},{id:"livingCost",label:"生活費",valueKey:"livingCost",rollKey:"livingRoll",suffix:"G",rangeKey:"livingCost",overview:"暮らしの固定費です。日が進むたびにこの負担がのしかかり、資金との攻防になります。"}];function xj(t){const e=Rp(t);return{luck:e.luck.min,skill:e.skill.min,virtue:e.virtue.min,pon:e.pon.min,livingCost:e.livingCost.min}}function _j(t,e){const n=xj(e),s={...n};if(!t||typeof t!="object")return s;for(const a of Object.keys(n)){const i=t[a];Number.isFinite(Number(i))&&(s[a]=Number(i))}return{...t,...s}}function fx(t,e){const n=Oy(t,e);return{luck:n.luck,skill:n.skill,virtue:n.virtue,pon:n.pon,livingCost:n.livingCost,luckRoll:t.luck,skillRoll:t.skill,virtueRoll:t.virtue,ponRoll:t.pon,livingRoll:cS(t)}}const xS=148,_S=72,Tj=_S+xS*(qo.length-1);function Eo(t){return`${Math.max(0,Math.min(100,t)).toFixed(3)}%`}function Ej(t,e){const n=e>0?t/e*100:100;return`
@keyframes dice-roll-sync {
  0% {
    transform: translate(-110px, -55px) rotate(0deg) scale(0.82);
    filter: drop-shadow(12px 18px 8px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.35));
  }
  ${Eo(n*.38)} {
    transform: translate(-52px, 14px) rotate(210deg) scale(1);
    filter: drop-shadow(10px 14px 10px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  ${Eo(n*.72)} {
    transform: translate(10px, -24px) rotate(460deg) scale(1.08);
    filter: drop-shadow(8px 12px 12px rgba(0, 0, 0, 0.42)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.22));
  }
  ${Eo(n*.94)} {
    transform: translate(0, 0) rotate(660deg) scale(1);
    filter: drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.25));
  }
  ${Eo(n)} {
    transform: translate(0, 0) rotate(720deg) scale(1);
    filter: drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.48)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  ${Eo(n+(100-n)*.42)} {
    transform: translate(0, -12px) rotate(738deg) scale(1.05);
    filter: drop-shadow(12px 22px 18px rgba(0, 0, 0, 0.32)) drop-shadow(0 0 18px rgba(255, 255, 255, 0.32));
  }
  ${Eo(n+(100-n)*.78)} {
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
`}function dx(t){const e=(s,a)=>s+Math.random()*(a-s),n=()=>Math.floor(Math.random()*6);return{luck:e(t.luck.min,t.luck.max),skill:e(t.skill.min,t.skill.max),virtue:e(t.virtue.min,t.virtue.max),pon:e(t.pon.min,t.pon.max),livingCost:e(t.livingCost.min,t.livingCost.max),luckRoll:n(),skillRoll:n(),virtueRoll:n(),ponRoll:n(),livingRoll:n()}}function wj(t,e,n){const s={...t};for(let a=0;a<=n;a++){const{valueKey:i,rollKey:r}=qo[a];s[i]=e[i],s[r]=e[r]}return s}const Sj=`
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
`;function mx({playerSlots:t,myId:e,onSelectCharacter:n,onCommitInitialRolls:s,soundRef:a,waitingSessionKey:i,unlockPlayerNameForSecret:r,onSecretCharacterSelected:l}){const c=t.find(Z=>Z.id===e),h=(c==null?void 0:c.character)??null,d=R.useMemo(()=>{const Z=(c==null?void 0:c.name)??"",Pe=r??"";return jc(Z)||jc(Pe)},[c==null?void 0:c.name,r]),p=R.useMemo(()=>Object.values(en).filter(Z=>Z.key!==Oc||d),[d]),[g,v]=R.useState(null),[C,I]=R.useState(0),[j,_]=R.useState(()=>Yh()),[b,N]=R.useState(!1),[P,$]=R.useState(!1),[J,T]=R.useState(null),[x,E]=R.useState(()=>new Set),[A,k]=R.useState(920),[M,w]=R.useState(""),[te,pe]=R.useState(!1),W=R.useRef([]),ee=R.useRef(null);R.useEffect(()=>()=>{W.current.forEach(Z=>{clearInterval(Z),clearTimeout(Z)}),W.current=[]},[]);const ae=Math.max(0,Qh-Math.max(0,C-1)),ue=C<Jm&&!b,Le=h??hx,Ze=Rp(Le);R.useLayoutEffect(()=>{b||(v(null),I(0),_(Yh()),T(null),$(!1),pe(!1),w(""),E(new Set))},[i]);const ut=li(c==null?void 0:c.initialRolls),Mt=ut?`${ut.luck}-${ut.skill}-${ut.virtue}-${ut.pon}`:"";R.useEffect(()=>{b||ut&&(v(ut),_(ut),I(Z=>Math.max(Z,1)))},[Mt,b]);const qe=fx(g??j,Le),He=J??_j(qe,Le),ht=(He==null?void 0:He.roll)!=null?He.roll:null,F=Z=>new Promise(Pe=>{const Te=setTimeout(Pe,Z);W.current.push(Te)}),re=async Z=>{if(b)return;if(Z===Oc&&(l==null||l()),!(li(c==null?void 0:c.initialRolls)!=null)){const Te=g??j,Ge=li({luck:Te.luck,skill:Te.skill,virtue:Te.virtue,pon:Te.pon});if(Ge){await n(Z,Ge),v(Ge),_(Ge),I(De=>Math.max(De,1));return}}await n(Z)},he=async()=>{var wt,ft,Jn,dt,fe;if(!ue||b)return;const Z=h??hx,Pe=Yh(),Te=fx(Pe,Z),Ge=Rp(Z),De=a==null?void 0:a.current;let Qe=null;try{const Ee=Math.round(800+Math.random()*200),Se=Ee+Tj;w(Ej(Ee,Se)),k(Se),pe(!0),N(!0),$(!0),E(new Set),Qe=((wt=De==null?void 0:De.startDiceRoll)==null?void 0:wt.call(De))??null;let bt=dx(Ge);T(bt),await new Promise(oe=>{let Ue=!1,ye;const ce=setInterval(()=>{bt=dx(Ge),T({...bt})},46);W.current.push(ce),ye=setTimeout(()=>{Ue||(Ue=!0,clearInterval(ce),clearTimeout(ye),oe())},Ee),W.current.push(ye)}),ee.current&&clearTimeout(ee.current),ee.current=setTimeout(()=>{ee.current=null,pe(!1)},Se+200),W.current.push(ee.current),(ft=Qe==null?void 0:Qe.stop)==null||ft.call(Qe),Qe=null,$(!1);let ne=bt;T({...ne});for(let oe=0;oe<qo.length;oe++){await F(oe===0?_S:xS),ne=wj(ne,Te,oe),T({...ne});const Ue=qo[oe].rollKey,ye=Te[Ue];if((Jn=De==null?void 0:De.playDiceTick)==null||Jn.call(De),ye===5){(dt=De==null?void 0:De.playDiceMaxSpark)==null||dt.call(De);const ce=qo[oe].id;E(it=>new Set(it).add(ce));const Xe=setTimeout(()=>{E(it=>{const Ke=new Set(it);return Ke.delete(ce),Ke})},720);W.current.push(Xe)}}if(!await s({luck:Pe.luck,skill:Pe.skill,virtue:Pe.virtue,pon:Pe.pon}))return;v(Pe),I(oe=>oe+1)}finally{(fe=Qe==null?void 0:Qe.stop)==null||fe.call(Qe),ee.current&&(clearTimeout(ee.current),ee.current=null),pe(!1),w(""),N(!1),$(!1),T(null)}};return u.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3",children:[u.jsxs("style",{children:[Sj,M]}),u.jsxs("div",{className:"rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-3 space-y-3",children:[u.jsx("p",{className:"text-xs font-bold text-cyan-400",children:"ステータス・ゲージ（プレビュー）"}),u.jsxs("p",{className:"text-[11px] text-slate-400 leading-snug",children:[u.jsx("strong",{className:"text-slate-200",children:"①キャラ選択"}),"すると、ダイス（raw）がまだサーバーに無い場合は",u.jsx("strong",{className:"text-slate-200",children:"いま画面上の値がそのまま確定して同期"}),"します（試行1回相当）。必要なら下の",u.jsx("strong",{className:"text-slate-200",children:"ダイス演出付きで再抽選"}),"。 ゲージは",u.jsx("strong",{className:"text-slate-200",children:"いま選んでいるキャラ"}),"換算のプレビューです。",u.jsxs("strong",{className:"text-slate-200",children:["再抽選は最大",Qh,"回"]}),"（キャラで初回同期を含め計",Jm,"試行まで）。"]}),u.jsx("div",{className:"space-y-2",children:qo.map(Z=>{const Pe=Ze[Z.rangeKey],Te=Z.valueKey,Ge=Z.rollKey,De=He[Te]??Pe.min,Qe=He[Ge],wt=Qe!=null&&Number.isFinite(Number(Qe))?Number(Qe):ht!=null&&Number.isFinite(Number(ht))?Number(ht):null,ft=Qe!=null&&Number.isFinite(Number(Qe))?Number(Qe)/5*100:0;return u.jsx(bj,{label:Z.label,value:De,min:Pe.min,max:Pe.max,barFillPercent:ft,hideNumeric:!1,suffix:Z.suffix,barShuffle:P,showMaxRollGlow:x.has(Z.id)&&wt===5,overviewHint:Z.overview},`${i}-${Z.id}`)})}),u.jsxs("div",{className:"relative pt-1",children:[te&&u.jsx("div",{role:"presentation","aria-hidden":!0,className:"pointer-events-none absolute left-1 top-1/2 z-30 flex h-[80px] w-[80px] -translate-y-1/2 items-center justify-center dice-roll-sync sm:left-2 sm:h-[88px] sm:w-[88px]",style:{animationDuration:`${A}ms`},onAnimationEnd:Z=>{String(Z.animationName||"").includes("dice-roll-sync")&&(ee.current&&(clearTimeout(ee.current),ee.current=null),pe(!1))},children:u.jsx("div",{className:"flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border-[3px] border-neutral-900 bg-gradient-to-b from-white via-neutral-50 to-neutral-200 shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_2px_0_rgba(255,255,255,0.95)] sm:h-[80px] sm:w-[80px]",children:u.jsx(Du,{className:"h-[52px] w-[52px] text-neutral-950 sm:h-14 sm:w-14",strokeWidth:2.35})})}),u.jsxs("div",{className:"space-y-1.5",children:[u.jsx("button",{type:"button",onClick:()=>void he(),disabled:!ue||b,className:`w-full rounded-lg border-2 border-black bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-400 py-2.5 text-center text-[13px] font-black leading-tight text-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-[filter,padding] hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 ${te?"pl-[4.25rem] sm:pl-24":""}`,children:b?"抽選中…":C===0?"ステータス抽選を試す（ダイス演出付き）":"再抽選"}),u.jsxs("p",{className:"text-center text-[11px] text-slate-400",children:["再抽選できる回数：",u.jsx("span",{className:"tabular-nums font-semibold text-slate-200",children:ae}),"／",Qh,"回（初回はキャラまたは上の抽選で確定。合計の確定回数は上限",Jm,"回）"]})]})]})]}),u.jsx("p",{className:"text-xs font-semibold text-slate-400",children:"キャラクターを選択"}),u.jsx("div",{className:"grid grid-cols-2 gap-3",children:p.map(Z=>{const Pe=h===Z.key,Te=h===Z.key,Ge=Z.key===Oc&&d;return u.jsxs("button",{type:"button",onClick:()=>void re(Z.key),disabled:b,className:`relative overflow-hidden rounded-xl border p-3 text-left transition-all disabled:opacity-50 ${Ge?"ririm-secret-card border-fuchsia-400/50 bg-violet-950/40":""} ${Te?`${Z.border} ring-2 ring-offset-1 ring-offset-slate-900 ring-cyan-500`:"border-slate-700 bg-slate-800/50 hover:border-slate-600"}`,children:[Ge&&u.jsx("span",{className:"absolute right-2 top-2 z-[1] rounded-full bg-gradient-to-r from-fuchsia-600 to-amber-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-md",children:"Secret"}),Ge&&u.jsxs("span",{className:"ririm-secret-glitter","aria-hidden":!0,children:[u.jsx("span",{children:"✦"}),u.jsx("span",{children:"✧"}),u.jsx("span",{children:"✦"}),u.jsx("span",{children:"✧"})]}),u.jsx("div",{className:"mb-1 flex min-h-[2.5rem] items-center justify-center",children:u.jsx(El,{characterType:Z.key,imgClassName:"h-10 w-10 object-contain",spanClassName:"text-2xl"})}),u.jsx("div",{className:`text-sm font-semibold ${Pe?Z.color:"text-slate-300"}`,children:Z.label}),u.jsx("div",{className:"text-xs text-slate-400 mt-1 leading-relaxed",children:Z.desc})]},Z.key)})})]})}function Aj({waitingSessionKey:t=0,myFullId:e,copied:n,onCopyMyId:s,roomData:a,roomId:i,playerSlots:r,myId:l,isHost:c,onReturnToLobby:h,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,onStartGame:v,loading:C,uiError:I,inviteInput:j,onInviteInputChange:_,inviteError:b,onInvitePlayer:N,seVolume:P,bgmVolume:$,onSeVolumeChange:J,onBgmVolumeChange:T,unlockPlayerNameForSecret:x,onSecretCharacterSelected:E}){var w;const A=r.find(te=>te.id===l),k=!!li(A==null?void 0:A.initialRolls),M=r.length>0&&r.every(te=>li(te.initialRolls));return u.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[u.jsx(Lc,{myFullId:e,copied:n,onCopy:s,seVolume:P,bgmVolume:$,onSeVolumeChange:J,onBgmVolumeChange:T}),a!=null&&a.isSolo?u.jsxs("div",{className:"w-full max-w-md space-y-6",children:[u.jsxs("div",{className:"relative text-center",children:[u.jsx("button",{type:"button",onClick:h,className:"absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors",children:"← 戻る"}),u.jsx("h2",{className:"text-2xl font-bold",children:"🎮 一人で遊ぶ"})]}),u.jsx(mx,{waitingSessionKey:t,playerSlots:r,myId:l,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,unlockPlayerNameForSecret:x,onSecretCharacterSelected:E}),u.jsx("button",{type:"button",onClick:v,disabled:C||!(A!=null&&A.character)||!k,className:"w-full rounded-xl bg-cyan-500 py-4 font-bold text-slate-950 text-lg hover:bg-cyan-400 transition-colors disabled:opacity-40",children:C?"開始中…":"準備完了 · ゲームスタート"}),I&&u.jsx("p",{className:"text-sm text-rose-400 text-center",children:I})]}):u.jsxs("div",{className:"w-full max-w-md space-y-5 pt-10",children:[u.jsxs("div",{className:"relative text-center",children:[u.jsx("button",{type:"button",onClick:h,className:"absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors",children:"← 戻る"}),u.jsx("h2",{className:"text-2xl font-bold",children:"ルーム待機中"}),u.jsx("p",{className:"text-sm text-slate-400 mt-1",children:"ルームIDを友達に共有してください"})]}),u.jsxs("div",{className:"rounded-2xl border border-cyan-500/40 bg-cyan-500/5 p-5 text-center space-y-2",children:[u.jsx("p",{className:"text-xs text-slate-400",children:"ルームID"}),u.jsx("p",{className:"text-4xl font-bold tracking-[0.3em] text-cyan-400 font-mono",children:i}),u.jsx("span",{className:`inline-block text-xs font-semibold rounded-full px-3 py-0.5 ${a!=null&&a.isPrivate?"bg-rose-500/20 text-rose-300 border border-rose-500/40":"bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"}`,children:a!=null&&a.isPrivate?"🔒 プライベート（招待制）":"🌐 公開"})]}),u.jsxs("div",{className:"rounded-xl border border-cyan-500/40 bg-cyan-500/8 px-4 py-3 space-y-1.5",children:[u.jsx("p",{className:"text-xs text-cyan-400 font-semibold",children:"🪪 あなたの招待ID（ホストへ共有してください）"}),u.jsxs("div",{className:"flex items-center gap-2",children:[u.jsx("span",{className:"flex-1 font-mono text-base font-bold text-white truncate select-all",children:e}),u.jsx("button",{type:"button",onClick:s,className:`shrink-0 rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${n?"bg-emerald-500 text-white scale-95":"bg-cyan-600 hover:bg-cyan-500 text-white"}`,children:n?"コピーしました！✓":"📋 コピー"})]}),u.jsx("p",{className:"text-xs text-slate-500",children:"このIDをホストの「招待するプレイヤー」欄に入力してもらってください"})]}),u.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-2",children:[u.jsxs("p",{className:"text-xs text-slate-400 mb-2",children:["参加済みプレイヤー (",r.length,"/4)"]}),r.map((te,pe)=>u.jsxs("div",{className:"flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2",children:[u.jsxs("span",{className:"text-sm font-medium",children:[pe+1,". ",te.name]}),te.fullId&&u.jsxs("span",{className:"text-xs text-slate-500 font-mono",children:["#",te.fullId.split("#")[1]]}),te.id===(a==null?void 0:a.hostId)&&u.jsx("span",{className:"text-xs text-amber-400 ml-auto",children:"ホスト"}),te.id===l&&u.jsx("span",{className:"text-xs text-cyan-400 ml-auto border border-cyan-400/40 rounded px-1",children:"YOU"})]},te.id)),r.length<2&&u.jsxs("p",{className:"text-xs text-slate-500 text-center pt-1 flex items-center justify-center gap-2",children:[u.jsx(Ur,{size:12,className:"animate-spin"}),"他のプレイヤーを待っています… (1人でも開始できます)"]})]}),u.jsx(mx,{waitingSessionKey:t,playerSlots:r,myId:l,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,unlockPlayerNameForSecret:x,onSecretCharacterSelected:E}),u.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2",children:[u.jsx("p",{className:"text-[11px] font-semibold text-slate-500 mb-1.5",children:"全員のキャラ選択状況"}),u.jsx("div",{className:"space-y-1",children:r.map(te=>{const pe=te.character,W=pe?en[pe]:null;return u.jsxs("div",{className:"flex items-center gap-2 text-xs text-slate-400",children:[u.jsxs("span",{children:[te.name,te.id===l?" (YOU)":""]}),u.jsx("span",{className:"ml-auto flex items-center gap-1",children:pe?u.jsxs(u.Fragment,{children:[u.jsx(El,{characterType:pe,imgClassName:"h-4 w-4 object-contain shrink-0",spanClassName:"text-sm leading-none"}),u.jsx("span",{className:W.color,children:W.label})]}):u.jsx("span",{className:"text-amber-400/90 font-medium",children:"未選択"})})]},te.id)})})]}),c&&(a==null?void 0:a.isPrivate)&&u.jsxs("div",{className:"rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-3",children:[u.jsx("p",{className:"text-xs font-semibold text-rose-300",children:"🔒 招待管理（ホスト専用）"}),u.jsxs("div",{children:[u.jsx("label",{className:"text-xs text-slate-300 font-medium block mb-1.5",children:"招待するプレイヤー（Name#ID）"}),u.jsxs("div",{className:"flex gap-2",children:[u.jsx("input",{value:j,onChange:te=>_(te.target.value),onKeyDown:te=>te.key==="Enter"&&N(),className:"flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-mono focus:border-rose-400 focus:outline-none",placeholder:"例: 闇月リリム#1234"}),u.jsx("button",{type:"button",onClick:N,className:"rounded-xl bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 text-sm font-bold transition-colors",children:"招待"})]}),u.jsx("p",{className:"text-xs text-slate-500 mt-1.5",children:"※ 相手の画面に表示されている「Name#ID」を全文コピーして入力してください"}),b&&u.jsx("p",{className:"text-xs text-rose-400 mt-1",children:b})]}),((w=a.allowedPlayers)==null?void 0:w.length)>0&&u.jsxs("div",{className:"space-y-1",children:[u.jsxs("p",{className:"text-xs text-slate-500",children:["招待済み (",a.allowedPlayers.length,"名)"]}),a.allowedPlayers.map(te=>u.jsxs("div",{className:"flex items-center gap-2 rounded bg-slate-800 px-2 py-1 text-xs font-mono text-slate-300",children:[u.jsx("span",{className:"text-emerald-400",children:"✓"})," ",te]},te))]})]}),c?u.jsx("button",{type:"button",onClick:v,disabled:r.length<1||C||r.some(te=>!te.character)||!M,className:"w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40",children:C?"開始中…":`準備完了 · ゲームスタート（${r.length}人）`}):u.jsxs("p",{className:"text-center text-sm text-slate-400 flex items-center justify-center gap-2",children:[u.jsx(Ur,{size:14,className:"animate-spin"}),"ホストがゲームを開始するのを待っています…"]}),I&&u.jsx("p",{className:"text-sm text-rose-400 text-center",children:I})]})]})}function Nj({mode:t,gold:e,stat:n}){if(t!=="chat"&&t!=="game")return null;const s=ta(t==="chat"?oj:lj);return u.jsx("div",{className:"fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-slate-950 pointer-events-auto","aria-hidden":!0,role:"presentation",children:u.jsxs("div",{className:"relative z-[2] flex flex-col items-center justify-center px-5",children:[u.jsx("div",{className:"rounded-2xl border-2 border-cyan-400 bg-slate-900 p-4 sm:p-5",children:u.jsx("img",{src:s,alt:"",className:"max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_32px_rgba(34,211,238,0.55)] opacity-100",draggable:!1})}),u.jsxs("div",{className:"mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]",children:[u.jsxs("p",{className:"text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums",children:["＋",e,"ゴールド"]}),n?u.jsxs("p",{className:"mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-cyan-200 tabular-nums",children:[n.label," ＋",n.delta]}):null]})]})})}function Rj({gold:t,stat:e,characterType:n}){const a=ta(n==="vtuber"||n==="ririm"?"/images/work_ririmu.png":cj);return u.jsx("div",{className:"fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-slate-950 pointer-events-auto","aria-hidden":!0,role:"presentation",children:u.jsxs("div",{className:"relative z-[2] flex flex-col items-center justify-center px-5",children:[u.jsx("div",{className:"rounded-2xl border-2 border-amber-400 bg-slate-900 p-4 sm:p-5",children:u.jsx("img",{src:a,alt:"",className:"max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_28px_rgba(251,191,36,0.45)] opacity-100",draggable:!1})}),u.jsxs("div",{className:"mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]",children:[u.jsxs("p",{className:"text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums",children:["＋",t,"ゴールド"]}),e?u.jsxs("p",{className:"mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-amber-200 tabular-nums",children:[e.label," ＋",e.delta]}):null]})]})})}const px=`
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

`;function ss(t,e){const n=e??"エラーが発生しました。しばらくしてから再度お試しいただくか、画面を再読み込みしてください。";if(t==null)return n;const s=t.code;if(s==="permission-denied")return"権限または接続の問題で処理できませんでした。ログイン状態とネットワークをご確認ください。";if(s==="unavailable"||s==="deadline-exceeded")return"サーバーに接続できませんでした。しばらくしてから再度お試しください。";const a=t.message;if(typeof a=="string"){const i=a.trim();if(i.length>0&&i.length<=280)return i}return n}function kj(t){const e=R.useCallback(C=>{if(typeof t!="function"||C==null)return;const I=typeof C=="string"?C:ss(C,"接続またはデータの読み込みで問題が発生しました。");t(I)},[t]),[n,s]=R.useState(null),[a,i]=R.useState(!1),[r,l]=R.useState(null),[c,h]=R.useState(null);R.useEffect(()=>(fM(Gb).catch(I=>e(I)),vM(Gb,I=>{I&&(s(I.uid),i(!0))})),[e]),R.useEffect(()=>{if(!r){h(null);return}return C4(nc(Pr,"rooms",r),I=>{if(!I.exists()){e("ルームが存在しません");return}h(I.data())},I=>e(I))},[r,e]);const d=R.useCallback(async C=>{if(!r)throw new Error("roomId missing");await Eb(nc(Pr,"rooms",r),C)},[r]),p=R.useCallback(async(C,I)=>{await Eb(nc(Pr,"rooms",C),I)},[]),g=R.useCallback(async(C,I)=>{await k4(nc(Pr,"rooms",C),I)},[]),v=R.useCallback(async C=>R4(nc(Pr,"rooms",C)),[]);return{myId:n,authReady:a,roomId:r,setRoomId:l,roomData:c,updateRoom:d,updateRoomById:p,createRoom:g,fetchRoom:v}}function Cj(t){if(t==null||typeof t!="string")return t;const e=t.replace(/^\/+/,"").replace(/\\/g,"/");return`${"/".replace(/\/?$/,"/")}sounds/${e}`}function Ij(){let t=null,e=!1,n=null,s=null,a=.82,i=.08,r=!1,l=!1,c=!1,h=!1,d=!1,p=!1,g=!1,v=!1,C=!1,I=!1,j=!1,_=!1;const b={};function N(F){const re=Number(F);return Number.isFinite(re)?Math.max(0,Math.min(1,re)):1}function P(){return t||(t=new(window.AudioContext||window.webkitAudioContext)),t.state==="suspended"&&t.resume().catch(()=>{}),t}function $({freq:F=440,dur:re=.15,type:he="triangle",vol:Z=.28,ramp:Pe=!0}={}){if(!e)try{const Te=P(),Ge=Te.createOscillator(),De=Te.createGain();Ge.connect(De),De.connect(Te.destination),Ge.type=he,Ge.frequency.setValueAtTime(F,Te.currentTime);const Qe=Z*a;De.gain.setValueAtTime(Qe,Te.currentTime),Pe&&De.gain.exponentialRampToValueAtTime(.001,Te.currentTime+re),Ge.start(Te.currentTime),Ge.stop(Te.currentTime+re+.01)}catch{}}function J(F,re=.07,he=.12,Z="triangle"){F.forEach((Pe,Te)=>setTimeout(()=>$({freq:Pe,dur:he,type:Z,vol:.22}),Te*re*1e3))}function T(){if(n){try{n.osc.stop(),n.lfo.stop()}catch{}n=null}te("spin")}async function x(F,re){try{const he=Cj(re),Z=await fetch(he,{method:"GET",cache:"force-cache"});if(!Z.ok){b[F]=null;return}const Pe=await Z.blob(),Te=URL.createObjectURL(Pe),Ge=new Audio(Te);Ge.preload="auto",await new Promise((De,Qe)=>{Ge.addEventListener("canplaythrough",De,{once:!0}),Ge.addEventListener("error",Qe,{once:!0}),setTimeout(Qe,4e3)}),b[F]=Ge}catch{b[F]=null}}async function E(F){return x(F,`${F}.mp3`)}function A(){te("war_horn")}function k(){if(s){if(s.type==="synth")try{s.osc.stop(),s.osc2.stop()}catch{}s=null}te("final_battle")}function M(F){return F==="daily_bgm"||F==="day8_bgm"||F==="menu_bgm"?i:a}function w(F,re=!1){if(e)return!1;const he=b[F];if(!he)return!1;try{return he.loop=re,he.volume=M(F),he.currentTime=0,he.play().catch(()=>{}),!0}catch{return!1}}function te(F){const re=b[F];if(re)try{re.pause(),re.currentTime=0}catch{}}function pe(){if(h||!l||e)return;h=!0;const F=()=>{h=!1,document.removeEventListener("pointerdown",F,!0),W()};document.addEventListener("pointerdown",F,{capture:!0,once:!0})}function W(){if(ue(),Mt(),e||!l||c||r)return;const F=b.daily_bgm;if(F){F.loop=!0,F.volume=i,c=!0;try{F.currentTime=0,F.play().then(()=>{r=!0,c=!1}).catch(()=>{c=!1,r=!1,pe()})}catch{c=!1,pe()}}}function ee(){c=!1,te("daily_bgm"),r=!1}function ae(){l=!1,ee()}function ue(){g=!1,te("day8_bgm"),d=!1}function Le(){p=!1,ue()}function Ze(){if(_||!I||e)return;_=!0;const F=()=>{_=!1,document.removeEventListener("pointerdown",F,!0),ut()};document.addEventListener("pointerdown",F,{capture:!0,once:!0})}function ut(){if(ee(),ue(),e||!I||j||C)return;const F=b.menu_bgm;if(F){F.loop=!0,F.volume=i,j=!0;try{F.currentTime=0,F.play().then(()=>{C=!0,j=!1}).catch(()=>{j=!1,C=!1,Ze()})}catch{j=!1,Ze()}}}function Mt(){j=!1,te("menu_bgm"),C=!1}function qe(){I=!1,Mt()}function He(){if(v||!p||e)return;v=!0;const F=()=>{v=!1,document.removeEventListener("pointerdown",F,!0),ht()};document.addEventListener("pointerdown",F,{capture:!0,once:!0})}function ht(){if(ee(),Mt(),e||!p||g||d)return;const F=b.day8_bgm;if(F){F.loop=!0,F.volume=i,g=!0;try{F.currentTime=0,F.play().then(()=>{d=!0,g=!1}).catch(()=>{g=!1,d=!1,He()})}catch{g=!1,He()}}}return{async init(){await Promise.allSettled([Promise.all(["start","spin","stop","reach","win","jackpot","final_battle","war_horn"].map(F=>E(F))),x("daily_bgm","View_from_the_Fifth_Floor.mp3"),x("day8_bgm","Morning_of_the_Stand.mp3"),x("menu_bgm","Velvet_Current.mp3")]),p&&b.day8_bgm&&!e?ht():l&&b.daily_bgm&&!e?W():I&&b.menu_bgm&&!e&&ut()},setSeVolume(F){a=N(F)},setBgmVolume(F){i=N(F);for(const re of["daily_bgm","day8_bgm","menu_bgm"]){const he=b[re];he&&(he.volume=i)}},startDailyBgm(){qe(),Le(),l=!0,!e&&W()},stopDailyBgm(){ae()},startDay8Bgm(){qe(),ae(),p=!0,!e&&ht()},stopDay8Bgm(){Le()},startMenuBgm(){ae(),Le(),I=!0,!e&&ut()},stopMenuBgm(){qe()},setMuted(F){e=F,F?(this.stopSpin(),this.stopFinalBattleAmbient(),ee(),ue(),Mt()):p&&b.day8_bgm?ht():l&&b.daily_bgm?W():I&&b.menu_bgm&&ut()},getMuted(){return e},playStart(){w("start")||J([523,659,784],.06,.1,"square")},startSpin(){if(!(e||n)&&!w("spin",!0))try{const F=P(),re=F.createOscillator(),he=F.createOscillator(),Z=F.createGain(),Pe=F.createGain();he.frequency.value=14,Z.gain.value=20,he.connect(Z),Z.connect(re.frequency),re.connect(Pe),Pe.connect(F.destination),re.type="sawtooth",re.frequency.value=160,Pe.gain.value=.07*a,he.start(),re.start(),n={osc:re,lfo:he}}catch{}},stopSpin(){T()},playStop(F=0){w("stop")||$({freq:220-F*35,dur:.09,type:"square",vol:.18})},playReach(){w("reach")||J([392,523,659,784,1047],.075,.16)},playStreamFailGaan(){if(!e){$({freq:155,dur:.06,type:"square",vol:.22,ramp:!0}),setTimeout(()=>{$({freq:85,dur:.08,type:"square",vol:.2,ramp:!0})},40);try{const F=P(),re=F.currentTime,he=F.createOscillator(),Z=F.createGain();he.connect(Z),Z.connect(F.destination),he.type="triangle",he.frequency.setValueAtTime(295,re),he.frequency.exponentialRampToValueAtTime(72,re+.95),Z.gain.setValueAtTime(.32*a,re),Z.gain.exponentialRampToValueAtTime(.002,re+1.05),he.start(re),he.stop(re+1.08)}catch{}setTimeout(()=>$({freq:98,dur:.2,type:"sine",vol:.08,ramp:!0}),720)}},playStreamPonBurn(){if(!e){setTimeout(()=>$({freq:1750,dur:.055,type:"square",vol:.16,ramp:!0}),40),setTimeout(()=>$({freq:2200,dur:.045,type:"square",vol:.12,ramp:!0}),110);for(let F=0;F<16;F++)setTimeout(()=>{$({freq:320+Math.random()*750,dur:.035,type:Math.random()>.5?"square":"sawtooth",vol:.1+Math.random()*.09,ramp:!0})},F*26);setTimeout(()=>{$({freq:520,dur:.07,type:"triangle",vol:.22,ramp:!0}),$({freq:380,dur:.09,type:"square",vol:.18,ramp:!0})},380);try{const F=P(),re=F.currentTime+.42,he=F.createOscillator(),Z=F.createGain();he.connect(Z),Z.connect(F.destination),he.type="sawtooth",he.frequency.setValueAtTime(260,re),he.frequency.exponentialRampToValueAtTime(38,re+.58),Z.gain.setValueAtTime(.36*a,re),Z.gain.exponentialRampToValueAtTime(.002,re+.65),he.start(re),he.stop(re+.68)}catch{}setTimeout(()=>$({freq:120,dur:.35,type:"triangle",vol:.14,ramp:!0}),520)}},playWorkPonPlateBreak(){if(!e){for(let F=0;F<9;F++)setTimeout(()=>{$({freq:2100+Math.random()*2600,dur:.022,type:"square",vol:.11+Math.random()*.07,ramp:!0})},F*34);setTimeout(()=>$({freq:440,dur:.045,type:"triangle",vol:.18,ramp:!0}),300),setTimeout(()=>{$({freq:165,dur:.26,type:"sawtooth",vol:.34,ramp:!0}),$({freq:92,dur:.3,type:"square",vol:.24,ramp:!0})},332),setTimeout(()=>$({freq:68,dur:.4,type:"triangle",vol:.2,ramp:!0}),420),setTimeout(()=>$({freq:52,dur:.18,type:"sine",vol:.09,ramp:!0}),460)}},playReachGaseSting(){if(!e){$({freq:310,dur:.1,type:"sawtooth",vol:.2,ramp:!0}),setTimeout(()=>{$({freq:195,dur:.16,type:"square",vol:.14,ramp:!0})},70),setTimeout(()=>{$({freq:142,dur:.24,type:"triangle",vol:.12,ramp:!0})},180);try{const F=P(),re=F.currentTime,he=F.createOscillator(),Z=F.createGain();he.connect(Z),Z.connect(F.destination),he.type="sine",he.frequency.setValueAtTime(198,re),he.frequency.exponentialRampToValueAtTime(128,re+.42),Z.gain.setValueAtTime(.065*a,re),Z.gain.exponentialRampToValueAtTime(.0015,re+.52),he.start(re),he.stop(re+.54)}catch{}}},startDiceRoll(){if(e)return{stop(){}};const F=setInterval(()=>{$({freq:90+Math.random()*150,dur:.036,type:Math.random()>.45?"square":"triangle",vol:.14,ramp:!0})},56);return{stop:()=>clearInterval(F)}},playDiceTick(){e||$({freq:1047,dur:.052,type:"square",vol:.2})},playDiceMaxSpark(){e||J([784,1175,1568],.042,.09,"square")},playWin(F="small"){if(w(F==="jackpot"?"jackpot":"win"))return;const he={small:[523,659],atari:[523,659,784],mid:[523,659,784,1047],big:[523,659,784,1047,1319],jackpot:[523,659,784,1047,1319,1568,2093]};J(he[F]??he.small,.065,.14)},stopWarHorn(){A()},tryPlayWarHornIfLoaded(){if(e)return!1;const F=b.war_horn;if(!F)return!1;try{T(),F.volume=a,F.currentTime=0,F.play()}catch{return!1}return!0},stopFinalBattleAmbient(){k(),A()},startFinalBattleAmbient(){if(!e&&(T(),!(s||w("final_battle",!0))))try{const F=P(),re=F.createOscillator(),he=F.createOscillator(),Z=F.createGain();re.type="sine",he.type="sine",re.frequency.value=52,he.frequency.value=78,re.connect(Z),he.connect(Z),Z.connect(F.destination),Z.gain.value=.055*a,re.start(),he.start(),s={type:"synth",osc:re,osc2:he,gain:Z,ac:F}}catch{}}}}const Zm="pons_se_vol",e0="pons_bgm_vol",gx=.82,yx=.08,t0=["/sounds/ohayo.mp3","/sounds/yumemitano.mp3","/sounds/full_name.mp3"],Mj="/sounds/start_rrm.mp3",Dj={money:"行動やスロットで増減する所持金です。マイナスになっても続行できますが、借金状態になります。",luck:"運気の強さです。伸びるとすごろくのダイスなどで追い風になりやすくなります。一定値を超えるとダイスが増える！？",skill:"腕前やコツのイメージです。スロットでは当たりやすさなどに効いてきます。",virtue:"善行の蓄えです。ダイスや日常イベントで「最低限ここまで」が変わるなど、行動の土台に効きます。",pon:"ストレスや無謀さの目安です。高まると荒れた展開に振れやすくなります。",livingCost:"暮らしの固定費です。日が進むたびにこの負担がのしかかり、資金との攻防になります。"};function bh(t,e){try{const n=localStorage.getItem(t);if(n==null)return e;const s=parseFloat(n);return Number.isFinite(s)?Math.max(0,Math.min(1,s)):e}catch{return e}}function xh(t,e,n){return t.map((s,a)=>a!==e?s:{...s,position:n,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0})}function vx(t,e,n){if(!n)return t;const s={...t};return delete s.finalBattleStartedAt,delete s.finalBattleEntry,{...s,gamePhase:"playing",subPhase:"daily",currentDay:Sa,currentPlayerIdx:e.currentPlayerIdx}}function Oj(){var Gl,Rr,Gu;const[t,e]=R.useState(""),{myId:n,authReady:s,roomId:a,setRoomId:i,roomData:r,updateRoom:l,updateRoomById:c,createRoom:h,fetchRoom:d}=kj(e),[p,g]=R.useState(""),[v]=R.useState(()=>String(Math.floor(1e3+Math.random()*9e3))),[C,I]=R.useState(""),[j,_]=R.useState("entry"),[b,N]=R.useState(0),[P,$]=R.useState(!1),[J,T]=R.useState(!1),[x,E]=R.useState(""),[A,k]=R.useState(""),[M,w]=R.useState(!1),[te,pe]=R.useState(()=>bh(Zm,gx)),[W,ee]=R.useState(()=>bh(e0,yx)),[ae,ue]=R.useState(!1),[Le,Ze]=R.useState(null),[ut,Mt]=R.useState(!0),[qe,He]=R.useState(!1),[ht,F]=R.useState([]),[re,he]=R.useState([]),[Z,Pe]=R.useState([]),[Te,Ge]=R.useState(!1),[De,Qe]=R.useState(!1),wt=R.useRef(null),ft=R.useRef({unlock:null,select:null}),Jn=R.useRef(!1),[dt,fe]=R.useState(null),[Ee,Se]=R.useState(!1),[bt,ne]=R.useState(!1),[X,oe]=R.useState(!1),[Ue,ye]=R.useState(null),[ce,Xe]=R.useState(!1),it=R.useRef(null),Ke=R.useRef(null),mn=R.useRef(2600),[Dt,Qt]=R.useState(null),[we,me]=R.useState(2600),[Oe,Ot]=R.useState(null),[Gt,Re]=R.useState(2600),mt=R.useRef(0),xt=R.useRef(!1),ls=R.useRef(null),Ae=R.useRef(async()=>{}),[ot,jt]=R.useState(null),[St,Xt]=R.useState(null),[Sn,Yt]=R.useState(null),[Wt,ya]=R.useState(!1),na=R.useRef(!1),nn=R.useRef(null),ms=R.useRef(null),Bn=R.useRef(null),[$n,cs]=R.useState(null),[sa,uo]=R.useState(!1),aa=R.useRef(null),[ks,Tr]=R.useState(null),Zn=R.useRef(null),[Ti,Er]=R.useState(!1),va=R.useRef(null),[Cs,ba]=R.useState(null),An=R.useRef(null),ps=R.useRef([]),[ia,wr]=R.useState(null),gs=R.useRef(null),$s=R.useRef([]),[ho,fo]=R.useState(null),[mo,po]=R.useState(null),go=R.useRef(null),Ua=R.useRef(null),ys=R.useCallback(S=>{const L=ft.current[S];L&&(L.pause(),L.currentTime=0,ft.current[S]=null)},[]),us=R.useCallback((S,L)=>{ys(S);const B=new Audio(ta(L));B.preload="auto",B.volume=Math.max(0,Math.min(1,te)),B.onended=()=>{ft.current[S]===B&&(ft.current[S]=null)},B.onerror=()=>{ft.current[S]===B&&(ft.current[S]=null)},ft.current[S]=B,B.play().catch(()=>{ft.current[S]===B&&(ft.current[S]=null)})},[te,ys]),Sr=R.useCallback(()=>{us("select",Mj)},[us]);R.useEffect(()=>{if(!jc(p)||Jn.current)return;const L=Math.floor(Math.random()*t0.length),B=t0[L]??t0[0];Jn.current=!0,us("unlock",B)},[p,us]),R.useEffect(()=>()=>{ys("unlock"),ys("select")},[ys]);const es=p.trim()?`${p.trim()}#${v}`:"",ge=(r==null?void 0:r.gameState)??null,U=$n??ge,ts=(r==null?void 0:r.playerSlots)??[],xa=(r==null?void 0:r.hostId)===n,Ar=$n!=null,Nn=!!ge&&((Gl=ge.players[ge.currentPlayerIdx])==null?void 0:Gl.id)===n&&!Ar,se=(U==null?void 0:U.players[U==null?void 0:U.currentPlayerIdx])??null,Ou=R.useRef(ge);Ou.current=ge;const Bd=qe?ht:(U==null?void 0:U.lastDiceRolls)??[],yo=(U==null?void 0:U.gamePhase)==="playing",ju=(U==null?void 0:U.gamePhase)==="finalBattle"||(U==null?void 0:U.subPhase)==="finalBattle",ra=yo&&(U==null?void 0:U.subPhase)==="day8"&&(se==null?void 0:se.movePhase)==="waitingSlot",oa=yo&&(U==null?void 0:U.subPhase)==="day8"&&(se==null?void 0:se.movePhase)==="goalLanding",zl=yo&&(U==null?void 0:U.subPhase)==="day8"&&(se==null?void 0:se.movePhase)==="arrived",Pu=yo&&(U==null?void 0:U.subPhase)==="day8"&&(se==null?void 0:se.movePhase)==="moving";se&&Math.min(100,se.position/Zt*100),R.useEffect(()=>{if(!U||U.gamePhase!=="playing"||U.subPhase!=="day8"||!Array.isArray(U.players)){go.current=null,po(null);return}const S=U.currentPlayerIdx;if(!Number.isInteger(S)||S<0||S>=U.players.length)return;const L=U.players[S],B=`${S}:${(L==null?void 0:L.id)??""}:${(L==null?void 0:L.moveTurns)??-1}:${(L==null?void 0:L.movePhase)??""}:${(L==null?void 0:L.slotTurnsLeft)??-1}`,ie=go.current;if(go.current=B,ie==null||ie===B)return;const z=Math.max(0,O.dice.maxTurns-((L==null?void 0:L.moveTurns)??0));po(z)},[U==null?void 0:U.gamePhase,U==null?void 0:U.subPhase,U==null?void 0:U.currentPlayerIdx,U==null?void 0:U.players]),R.useEffect(()=>{mo==null||!(!qe&&dt==null&&!X&&!St&&Ue==null&&!sa&&!Ti&&!Cs&&!ia&&!ks)||(fo(mo),po(null),Ua.current&&clearTimeout(Ua.current),Ua.current=setTimeout(()=>{fo(null),Ua.current=null},2e3))},[mo,qe,dt,X,St,Ue,sa,Ti,Cs,ia,ks]),R.useEffect(()=>()=>{Ua.current&&(clearTimeout(Ua.current),Ua.current=null)},[]);const Ei=R.useCallback(S=>{var B,ie;const L=Math.max(0,Math.min(1,Number(S)));pe(L);try{localStorage.setItem(Zm,String(L))}catch{}(ie=(B=wt.current)==null?void 0:B.setSeVolume)==null||ie.call(B,L)},[]),wi=R.useCallback(S=>{var B,ie;const L=Math.max(0,Math.min(1,Number(S)));ee(L);try{localStorage.setItem(e0,String(L))}catch{}(ie=(B=wt.current)==null?void 0:B.setBgmVolume)==null||ie.call(B,L)},[]),Bl=R.useMemo(()=>{if(j!=="playing"||!U||U.gamePhase!=="playing")return!1;const S=Number(U.currentDay);return U.subPhase==="daily"&&S>=1&&S<=Sa},[j,U==null?void 0:U.gamePhase,U==null?void 0:U.subPhase,U==null?void 0:U.currentDay]),za=R.useMemo(()=>j!=="playing"||!U||U.gamePhase!=="playing"?!1:U.subPhase==="day8",[j,U==null?void 0:U.gamePhase,U==null?void 0:U.subPhase]),Vu=R.useMemo(()=>s&&(j==="entry"||j==="lobby"||j==="waiting"),[s,j]);R.useEffect(()=>{const S=Ij();wt.current=S,S.setSeVolume(bh(Zm,gx)),S.setBgmVolume(bh(e0,yx)),S.init()},[]),R.useEffect(()=>{document.title=`${Kh} — ${Wm}`},[]),R.useEffect(()=>{r&&(r.status==="playing"||r.status==="FINAL_BATTLE")&&j==="waiting"&&_("playing")},[r==null?void 0:r.status]),R.useEffect(()=>{ge!=null&&ge.gamePhase&&(ge.gamePhase==="results"&&j!=="results"&&_("results"),ge.gamePhase==="gameOver"&&j!=="gameover"&&_("gameover"))},[ge==null?void 0:ge.gamePhase]),R.useEffect(()=>{const S=wt.current;if(!S||!(ge!=null&&ge.gamePhase))return;if(!(ge.gamePhase==="finalBattle"||ge.subPhase==="finalBattle")){S.stopFinalBattleAmbient();return}ge.finalBattleEntry!=="preDay8"&&S.startFinalBattleAmbient()},[ge==null?void 0:ge.gamePhase,ge==null?void 0:ge.subPhase,ge==null?void 0:ge.finalBattleEntry]),R.useEffect(()=>{var L,B;const S=wt.current;S&&(Bl?(L=S.startDailyBgm)==null||L.call(S):(B=S.stopDailyBgm)==null||B.call(S))},[Bl]),R.useEffect(()=>{var L,B;const S=wt.current;S&&(za?(L=S.startDay8Bgm)==null||L.call(S):(B=S.stopDay8Bgm)==null||B.call(S))},[za]),R.useEffect(()=>{var L,B;const S=wt.current;S&&(Vu?(L=S.startMenuBgm)==null||L.call(S):(B=S.stopMenuBgm)==null||B.call(S))},[Vu]),R.useEffect(()=>{if(!xa||!a||!ge||ge.gamePhase!=="finalBattle")return;const S=oS(ge.finalBattleStartedAt);if(!Number.isFinite(S))return;const L=ge.finalBattleEntry==="preDay8"?WD+200:JD+350,B=S+L,ie=Math.max(0,B-Date.now()),z=setTimeout(async()=>{var Y;try{const ke=(Y=(await d(a)).data())==null?void 0:Y.gameState;if(!ke||ke.gamePhase!=="finalBattle")return;if(ke.finalBattleEntry==="preDay8"){const et=EO(ke);await l({gameState:et,status:"playing"})}else{const et=gS(ke,ke.players);await l({gameState:et,status:"completed"})}}catch(be){e(ss(be,"処理に失敗しました。しばらくしてから再度お試しください。"))}},ie);return()=>clearTimeout(z)},[xa,a,ge==null?void 0:ge.gamePhase,ge==null?void 0:ge.finalBattleStartedAt,ge==null?void 0:ge.finalBattleEntry]),R.useEffect(()=>{var S;!$n||!((S=ge==null?void 0:ge.log)!=null&&S.length)||ge.log[0]===$n.log[0]&&cs(null)},[ge,$n]),R.useEffect(()=>()=>{aa.current&&(clearTimeout(aa.current),aa.current=null),Zn.current&&(clearTimeout(Zn.current),Zn.current=null),va.current&&(clearTimeout(va.current),va.current=null),An.current&&(clearTimeout(An.current),An.current=null),ps.current.forEach(clearTimeout),ps.current=[],$s.current.forEach(clearTimeout),$s.current=[],gs.current&&(clearTimeout(gs.current),gs.current=null),ba(null),wr(null),Tr(null)},[]),R.useEffect(()=>()=>{nn.current&&(clearTimeout(nn.current),nn.current=null)},[]),R.useEffect(()=>{ge||cs(null)},[ge]),R.useEffect(()=>{if(!dt||dt==="taxiHail")return;const S=xt.current,B=dt==="drive"||dt==="driveBeforeJam"||dt==="driveAfterJam"?Gt:{enter:900,boarding:500,ride:450,trafficJam:2600,arrive:1800}[dt];if(B==null)return;const ie=Y=>Y==="enter"?"boarding":Y==="boarding"?"ride":Y==="ride"?S?"driveBeforeJam":"drive":Y==="driveBeforeJam"?"trafficJam":Y==="trafficJam"?mt.current<=0?"arrive":"driveAfterJam":Y==="driveAfterJam"||Y==="drive"?"arrive":null,z=setTimeout(async()=>{const Y=ie(dt),be=(dt==="drive"||dt==="driveAfterJam"||dt==="trafficJam"&&Y==="arrive")&&it.current&&a;let ke=!1;if(be&&it.current){const Jt=it.current,Ct=Jt.players[Jt.currentPlayerIdx];ke=((Ct==null?void 0:Ct.pendingTaxiSteps)??0)>0}if(be){const Jt=Ke.current;let Ct=!1;try{await l({gameState:it.current}),Ct=!0}catch(Ye){e(ss(Ye,"処理に失敗しました。しばらくしてから再度お試しください。"))}if(it.current=null,Ke.current=null,Ct){const Ye=Ut=>{var on;(on=Ut==null?void 0:Ut.lines)!=null&&on.length&&(Bn.current&&clearTimeout(Bn.current),Yt(Ut),Bn.current=setTimeout(()=>{Yt(null),Bn.current=null},2800))};if(Jt){const Ut=Km(Jt.fromPos,Jt.toPos);setTimeout(async()=>{try{await l({gameState:Jt.finalGS});const on=ms.current;ms.current=null,Ye(on)}catch(on){e(ss(on,"処理に失敗しました。しばらくしてから再度お試しください。"))}},Ut)}else{const Ut=ms.current;ms.current=null,Ye(Ut)}}ne(!0),setTimeout(()=>ne(!1),500)}let et=Y;Y==="arrive"&&ke&&(et=null),et==="driveAfterJam"?(Re(mt.current),Se(!0)):(et==="drive"||et==="driveBeforeJam"||dt==="trafficJam"&&et!=="driveAfterJam")&&Se(!1),et==="arrive"&&Se(!1),et===null&&(xt.current=!1,Se(!1),Qt(null),Ot(null)),fe(et)},B);return()=>clearTimeout(z)},[dt,a,Gt]),R.useEffect(()=>{if(!Nn||!U||U.subPhase!=="day8"||U.gamePhase!=="playing")return;const S=se;if(!S||S.skipTurns<=0||S.movePhase!=="moving"||(S.pendingTaxiSteps??0)>0)return;const L=U.players.map((ie,z)=>z===U.currentPlayerIdx?{...ie,skipTurns:ie.skipTurns-1}:ie),B=[`💤 ${S.name} 1回休み（炎上の巻き添え）`];vs(Vr(U,L,B))},[Nn,U==null?void 0:U.currentPlayerIdx]),R.useEffect(()=>{if(typeof ot!="number"||!ge||!n)return;const S=ge.players.find(L=>L.id===n);S&&S.position===ot&&jt(null)},[ge,ot,n]);const vs=async S=>{try{const L={gameState:S};return S.gamePhase==="finalBattle"&&(L.status="FINAL_BATTLE"),S.gamePhase==="results"&&(L.status="completed"),await l(L),!0}catch(L){return e(ss(L,"処理に失敗しました。しばらくしてから再度お試しください。")),!1}};Ae.current=async()=>{var B;const S=ls.current;ls.current=null,na.current=!1,ya(!1),Xt(null);const L=(S==null?void 0:S.tileFxToast)??null;if(S!=null&&S.nextGS)try{if(S.intermediateGS&&S.tileSlideToPos!=null){const Y=S.intermediateGS,be={gameState:Y};Y.gamePhase==="finalBattle"&&(be.status="FINAL_BATTLE"),Y.gamePhase==="results"&&(be.status="completed"),await l(be),jt(S.tileSlideToPos),await new Promise(ke=>setTimeout(ke,Km(S.tileSlideFromPos??S.tileSlideToPos,S.tileSlideToPos)))}const ie=S.nextGS,z={gameState:ie};ie.gamePhase==="finalBattle"&&(z.status="FINAL_BATTLE"),ie.gamePhase==="results"&&(z.status="completed"),await l(z),(B=L==null?void 0:L.lines)!=null&&B.length&&(Bn.current&&clearTimeout(Bn.current),Yt(L),Bn.current=setTimeout(()=>{Yt(null),Bn.current=null},2800))}catch(ie){e(ss(ie,"処理に失敗しました。しばらくしてから再度お試しください。")),jt(null),He(!1),nn.current&&(clearTimeout(nn.current),nn.current=null);return}He(!1)};const $d=R.useCallback(()=>{if(!na.current)return;na.current=!1,ya(!1);const S=ls.current;S!=null&&S.nextGS&&Xt({characterType:S.characterType??"salaryman"})},[]),_a=R.useCallback(async S=>{try{const L={gameState:S};S.gamePhase==="finalBattle"&&(L.status="FINAL_BATTLE"),S.gamePhase==="results"&&(L.status="completed"),await l(L)}catch(L){e(ss(L,"処理に失敗しました。しばらくしてから再度お試しください。"))}},[l]),Fd=async()=>{const S=p.trim()||sc();p.trim()||g(S);const L=`${S}#${v}`;$(!0),e("");try{const B=qm();await h(B,{hostId:n,status:"lobby",playerSlots:[{id:n,name:S,fullId:L}],playerIds:[n],gameState:null,isPrivate:J,allowedPlayers:J?[L]:[],acceptQuickMatch:!J&&ut,createdAt:new Date().toISOString()}),i(B),N(ie=>ie+1),_("waiting")}catch(B){e(ss(B,"処理に失敗しました。しばらくしてから再度お試しください。"))}$(!1)},$l=async()=>{var B;if(!C.trim()){e("ルームIDを入力してください");return}const S=p.trim()||sc();p.trim()||g(S);const L=`${S}#${v}`;$(!0),e("");try{const ie=C.trim().toUpperCase(),z=await d(ie);if(!z.exists()){e("ルームが見つかりません"),$(!1);return}const Y=z.data();if(Y.status!=="lobby"){e("このルームはすでに開始されています"),$(!1);return}if(Y.playerSlots.length>=4){e("ルームが満員です"),$(!1);return}if(Y.isPrivate&&!((B=Y.allowedPlayers)!=null&&B.includes(L))){e(`招待されていません。ホストに「${L}」を共有して招待してもらってください`),$(!1);return}Y.playerSlots.find(be=>be.id===n)||await c(ie,{playerSlots:Cr({id:n,name:S,fullId:L}),playerIds:Cr(n)}),i(ie),N(be=>be+1),_("waiting")}catch(ie){e(ss(ie,"処理に失敗しました。しばらくしてから再度お試しください。"))}$(!1)},vo=async()=>{if(!xa||ts.length<1)return;if(ts.some(B=>!B.character)){e("全員がキャラクターを選択してから開始してください");return}if(ts.some(B=>!li(B.initialRolls))){e("全員がステータス抽選を確定（同期）してから開始してください");return}$(!0);try{const B=wO(ts);await l({status:"playing",gameState:B})}catch(B){e(ss(B,"処理に失敗しました。しばらくしてから再度お試しください。"))}$(!1)},Lu=R.useCallback(async({luck:S,skill:L,virtue:B,pon:ie})=>{if(!a||!n)return!1;try{const z=li({luck:S,skill:L,virtue:B,pon:ie});if(!z)throw new Error("ダイス値が不正です");const Y=ts.map(be=>{if(be.id!==n)return be;const ke={...be,initialRolls:z};return delete ke.initialStats,ke});return await l({playerSlots:Y}),!0}catch(z){return e(ss(z,"ステータス抽選の保存に失敗しました。しばらくしてから再度お試しください。")),!1}},[a,n,ts,l]),Ba=R.useCallback(async(S,L=null)=>{if(!a||!n)return;if(S===Oc&&!jc(p)){e(`シークレットキャラは、プレイヤー名が「${iS}」と一致するときのみ選べます（前後の空白は無視）。`);return}const B=ts.map(ie=>{if(ie.id!==n)return ie;let z={...ie,character:S};if(L!=null&&typeof L=="object"){const Y=li(L);Y&&(z={...z,initialRolls:Y},delete z.initialStats)}return z});try{await l({playerSlots:B})}catch(ie){e(ss(ie,"処理に失敗しました。しばらくしてから再度お試しください。"))}},[a,n,p,ts,l]);R.useEffect(()=>{if(j!=="waiting"||!a||!n||jc(p))return;const S=ts.find(L=>L.id===n);!S||S.character!==Oc||Ba("salaryman")},[j,p,ts,n,a,Ba]);const Ta=()=>{_("lobby"),i(null),e("")},Uu=async()=>{$(!0),e("");const S=p.trim()||sc();p.trim()||g(S);const L=`${S}#${v}`;try{const B=vb(hb(Pr,"rooms"),zm("status","==","lobby"),bb(10)),z=(await Tb(B)).docs.find(Y=>{var ke;const be=Y.data();return!be.isPrivate&&be.acceptQuickMatch!==!1&&(((ke=be.playerSlots)==null?void 0:ke.length)??0)<4});if(z){const Y=z.id;z.data().playerSlots.find(ke=>ke.id===n)||await c(Y,{playerSlots:Cr({id:n,name:S,fullId:L}),playerIds:Cr(n)}),i(Y),N(ke=>ke+1),_("waiting")}else{const Y=qm();await h(Y,{hostId:n,status:"lobby",playerSlots:[{id:n,name:S,fullId:L}],playerIds:[n],gameState:null,isPrivate:!1,allowedPlayers:[],createdAt:new Date().toISOString()}),i(Y),N(be=>be+1),_("waiting")}}catch(B){e(ss(B,"処理に失敗しました。しばらくしてから再度お試しください。"))}$(!1)},Fl=async()=>{var L;const S=x.trim();if(!S||!S.match(/^.+#\d{4}$/)){k("「Name#ID」の形式（例: 闇月リリム#1234）で入力してください。# を含めた全文を入力してください");return}if((L=r==null?void 0:r.allowedPlayers)!=null&&L.includes(S)){k("すでに招待済みです");return}try{await l({allowedPlayers:Cr(S)}),E(""),k("")}catch(B){k(ss(B,"招待の追加に失敗しました。しばらくしてから再度お試しください。"))}},At=()=>{es&&navigator.clipboard.writeText(es).then(()=>{w(!0),setTimeout(()=>w(!1),2e3)})},zu=()=>{const S=p.trim()||sc();p.trim()||g(S),ue(!1),Ze(null),e(""),_("lobby")},Hd=async()=>{const S=p.trim()||sc();p.trim()||g(S);const L=`${S}#${v}`;$(!0),e("");try{const B=qm();await h(B,{hostId:n,status:"lobby",playerSlots:[{id:n,name:S,fullId:L}],playerIds:[n],gameState:null,isPrivate:!0,isSolo:!0,allowedPlayers:[L],acceptQuickMatch:!1,createdAt:new Date().toISOString()}),i(B),N(ie=>ie+1),_("waiting")}catch(B){e(ss(B,"一人プレイ用のルームを作成できませんでした。ネットワークを確認のうえ、再度お試しください。"))}$(!1)},Bu=async()=>{if(es){$(!0),e("");try{const S=vb(hb(Pr,"rooms"),zm("status","==","lobby"),zm("allowedPlayers","array-contains",es),bb(5)),B=(await Tb(S)).docs.find(Y=>{var ke,et;const be=Y.data();return(((ke=be.playerSlots)==null?void 0:ke.length)??0)<4&&!((et=be.playerSlots)!=null&&et.find(Jt=>Jt.id===n))});if(!B){e("招待されているルームが見つかりませんでした"),$(!1);return}const ie=B.id,z=p.trim();await c(ie,{playerSlots:Cr({id:n,name:z,fullId:es}),playerIds:Cr(n)}),i(ie),N(Y=>Y+1),_("waiting")}catch(S){e(ss(S,"処理に失敗しました。しばらくしてから再度お試しください。"))}$(!1)}},$u=async()=>{if(!U||!Nn)return;const S=U.players[U.currentPlayerIdx];if(S.movePhase!=="goalLanding")return;const L=S.reservedSlotTurns??0;let B;if(L<=0){const Y=[`${S.name}: ゴール済み／スロット権利0回でラウンド不参加`];B=U.players.map((be,ke)=>ke!==U.currentPlayerIdx?be:{...be,movePhase:"arrived",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}),await vs(Vr(U,B,Y));return}const ie=L*O.dice.slotsPerSugorokuTurn,z=[`${S.name}: ゴール到着ターン終了　→ スロット${L}ターンブン（計最大${ie}回）は次の自分のターンで開始できます`];B=U.players.map((Y,be)=>be!==U.currentPlayerIdx?Y:{...Y,movePhase:"waitingSlot"}),await vs(Vr(U,B,z))},Fu=async()=>{if(!U||!Nn)return;const S=U.players[U.currentPlayerIdx];if(S.movePhase!=="waitingSlot")return;const L=S.reservedSlotTurns??0;if(L<=0)return;const B=Math.max(0,L*O.dice.slotsPerSugorokuTurn),ie=[`${S.name}: スロット開始（${L}ターンブン・計${B}回）`],z=U.players.map((Y,be)=>be!==U.currentPlayerIdx?Y:{...Y,movePhase:"arrived",slotTurnsLeft:B,reservedSlotTurns:0,slotPullsGranted:B,slotPullsThisSeat:0});await vs({...U,players:z,log:da(ie,U.log)})},$a=R.useRef(!1);R.useEffect(()=>{if(!Nn||!ra){$a.current=!1;return}$a.current||($a.current=!0,Fu().finally(()=>{$a.current=!1}))},[Nn,ra,U]);const la=R.useMemo(()=>{if(!se)return null;const S={...se.stats},L=se.amulets??0;return L>0&&(S.luck=_t(S.luck+L*2)),S},[se]),[Hl,Hu]=R.useState(!1),Nr=()=>{if(!Nn||!ge||ge.subPhase!=="daily"||ia!=null||Cs!=null||Ue!=null||Ti||ks!=null||sa)return;const S=ge.players[ge.currentPlayerIdx];!S||S.stats.money<O.dailySlot.spinBet*O.dailySlot.spins||Hu(!0)},qu=R.useCallback(async S=>{var V;const L=Ou.current;if(!L||L.subPhase!=="daily")return;const B=L.currentPlayerIdx,ie=L.players[B];let z={...ie.stats};const Y=[],be=z.virtue,ke=en[ie.characterType]??en.salaryman,et=ke.ponMultiplier;let Jt=ie.streamMultiplier??ke.streamMultiplier,Ct=ie.amulets??0;if(Ct>0){const H=Ct*2;z.luck=_t(z.luck+H),Y.push(`🧿 お守り効果（${Ct}個）: 運+${H}→${z.luck}`)}const Ye=O.dailySlot;if(!Array.isArray(S)||S.length!==Ye.spins){e("デイリースロットの結果データが不正です");return}Y.push(`${ie.name} ${L.currentDay}日目【デイリースロット・技能練習】${S.length}回（各${Ye.spinBet}Gベット／8日目スロットと同じ役配当テーブル）`);const Ut=typeof((V=S[S.length-1])==null?void 0:V.pityCounterAfter)=="number"?S[S.length-1].pityCounterAfter:ie.slotPityCounter??0;let on=0;S.forEach((H,Q)=>{const ve=Number((H==null?void 0:H.bet)??Ye.spinBet),_e=Number((H==null?void 0:H.payout)??0),Ie=_e-ve;on+=Ie,z.money=vn(z.money-ve+_e);const lt=Ye.skillGainEverySpin,$e=H!=null&&H.tier&&H.tier!=="miss"?Ye.skillGainOnRole:0;z.skill=_t(z.skill+lt+$e),Y.push(`  ${Q+1}回目 [${ve}G]: ${(H==null?void 0:H.message)??"？"} / 収支${Ie>=0?"+":""}${Ie}G → 資金${z.money}G・技量${z.skill}（本回練習+${lt}${$e?`・役ボ+${$e}`:""}）`)}),Y.push(`  デイリースロット収支計 ${on>=0?"+":""}${on}G`);const Dn="dailySlot";if(L.subPhase==="daily"){const H=dc(ie);z.money=vn(z.money-H),Y.push(`  生活費 -${H}G → 資金 ${z.money}G${z.money<0?" 【借金中】":""}`)}const ln=Math.ceil(O.pon.dailyGain*et),zt=z.pon;z.pon=_t(z.pon+ln),Y.push(`  PON: ${zt} +${ln}${et!==1?`(×${et})`:""} → ${z.pon}`);let Rn=null,Fa=Jt;const pn=ke.ponFireMoneyPenaltyMultiplier??1;if(z.pon>=O.pon.fireThreshold&&Math.random()<z.pon/100){const H=z.pon;{const Q=Math.max(1,Math.round(ze(O.pon.work.penaltyMin,O.pon.work.penaltyMax)*pn));z.money=vn(z.money-Q),Rn=`⚠️ 弁償！資金-${Q}G`}z.pon=Math.floor(H/2),Y.push(`  [PON発火 ${H}%] ${Rn} / PON→半減→${z.pon}`)}else Y.push(`  PON発火なし（${z.pon>=O.pon.fireThreshold?`${z.pon}%判定ハズレ`:`閾値${O.pon.fireThreshold}まであと${O.pon.fireThreshold-z.pon}`}）`);let o=L.players.map((H,Q)=>Q===B?{...H,stats:z,streamMultiplier:Fa,amulets:Ct,slotPityCounter:Ut}:H);o=vh(ie,be,z.virtue,o,Y),Rn&&Dn==="stream"&&L.subPhase==="day8"&&(o=Cp(B,o,Y)),L.subPhase==="daily"&&(o=o.map((H,Q)=>Q!==B?H:tx(H,Y))),Rn&&Dn==="stream"&&(ne(!0),setTimeout(()=>ne(!1),500));const f={...L,recentPonEvent:Rn?{player:ie.name,msg:Rn}:null},m=sx(f,o,Y),y=L.currentDay===Sa&&B===L.players.length-1;L.currentDay===Sa&&L.subPhase==="daily"&&cs(vx(m,L,y)),y&&await new Promise(H=>setTimeout(H,Tl)),await vs(m)||cs(null)},[vs]),ql=async S=>{if(!Nn||!ge||ia!=null||Cs!=null||Ue!=null||Ti||ks!=null||sa)return;S!=="stream"&&(ps.current.forEach(clearTimeout),ps.current=[],An.current&&(clearTimeout(An.current),An.current=null),ba(null)),S!=="work"&&($s.current.forEach(clearTimeout),$s.current=[],gs.current&&(clearTimeout(gs.current),gs.current=null),Zn.current&&(clearTimeout(Zn.current),Zn.current=null),wr(null),Tr(null));const L=ge,B=L.players[L.currentPlayerIdx],ie=B.stats.money;let z={...B.stats};const Y=[];let be=!1,ke=!1,et=!1,Jt=0,Ct=0,Ye=0;const Ut=z.virtue,on=en[B.characterType]??en.salaryman,Dn=on.ponMultiplier;let ln=B.streamMultiplier??on.streamMultiplier,zt=B.amulets??0;if(zt>0){const Q=zt*2;z.luck=_t(z.luck+Q),Y.push(`🧿 お守り効果（${zt}個）: 運+${Q}→${z.luck}`)}if(S==="shrine"){const Q=O.shrine,ve=z.virtue;z.money=vn(z.money-Q.cost),z.luck=_t(z.luck+Q.luckGain),z.virtue=_t(z.virtue+Q.virtueGain),z.pon=Math.max(0,z.pon-Q.ponReduce),Y.push(`${B.name} ${L.currentDay}日目【神社】二礼二拍手一礼。運気が上がった気がする！ -${Q.cost}G / 運+${Q.luckGain}→${z.luck} / 善行+${Q.virtueGain}→${z.virtue} / PON-${Q.ponReduce}→${z.pon}`);const _e=dO(ve,Q.amuletBaseRate);Math.random()<_e&&(zt++,Y.push(`  🧿 お守りを入手した！（計${zt}個／善行${ve}・抽選${(_e*100).toFixed(0)}%）`)),ye("in"),setTimeout(()=>ye("out"),1700),setTimeout(()=>ye(null),2700)}else if(S==="work"){$s.current.forEach(clearTimeout),$s.current=[],gs.current&&(clearTimeout(gs.current),gs.current=null),Zn.current&&(clearTimeout(Zn.current),Zn.current=null),Tr(null);const Q=on.workRewardBonus??0,ve=on.workRewardMultiplier??1,_e=Math.floor((O.work.reward+Q)*ve),Ie=Pc(z.virtue),lt=Ym(_e,z.virtue),$e=O.work.virtueGain;z.money=vn(z.money+lt),z.virtue=_t(z.virtue+$e),wr({gold:lt,stat:{label:"善行",delta:$e},characterType:B.characterType}),gs.current=window.setTimeout(()=>{wr(null),gs.current=null},2e3),Y.push(`${B.name} ${L.currentDay}日目【仕事】資金+${lt}G${Q?`（査定+${Q}G込み・×${ve}）`:ve!==1?`（×${ve}）`:""}・善行収入×${Ie.toFixed(2)}（ベース${_e}G） / 善行+${$e}→${z.virtue}`),Jt=lt}else if(S==="stream"){ps.current.forEach(clearTimeout),ps.current=[];const Q=Math.random()<.5?"chat":"game",ve=Q==="chat"?"雑談配信":"ゲーム配信";An.current&&(clearTimeout(An.current),An.current=null);const _e=z.skill+z.luck,Ie=_e>O.stream.combinedStatNoFailThreshold?0:Math.max(0,O.stream.baseFailRate-_e/O.stream.combinedStatNoFailThreshold*O.stream.baseFailRate),lt=Math.random()<Ie;be=lt;let $e=0,Nt=null;if(lt){const cn=O.stream.successMin,un=Math.round(cn*ln),On=Pc(z.virtue),gn=Ym(un,z.virtue);$e=gn,z.money=vn(z.money+gn),Y.push(`${B.name} ${L.currentDay}日目【${ve}】💥失敗（最低収入） 資金+${gn}G（成功時下限${O.stream.successMin}G×配信×${ln.toFixed(1)}・善行収入×${On.toFixed(2)}・基準${un}G）/ 善行・技量ボーナスなし (失敗率${(Ie*100).toFixed(0)}%)`)}else{const cn=ze(O.stream.successMin,O.stream.successMax),un=Math.round(cn*ln),On=Pc(z.virtue),gn=Ym(un,z.virtue);if($e=gn,z.money=vn(z.money+gn),Q==="chat"){const Fn=ze(O.stream.chat.virtueGainMin,O.stream.chat.virtueGainMax);z.virtue=_t(z.virtue+Fn),Nt=Fn?{label:"善行",delta:Fn}:null,Y.push(`${B.name} ${L.currentDay}日目【${ve}】✨成功 資金+${gn}G（配信×${ln.toFixed(1)}・善行収入×${On.toFixed(2)}・基準${un}G） / 善行+${Fn}→${z.virtue} (失敗率${(Ie*100).toFixed(0)}%)`)}else{const Fn=ze(O.stream.game.skillGainMin,O.stream.game.skillGainMax);z.skill=_t(z.skill+Fn),Nt=Fn?{label:"技量",delta:Fn}:null,Y.push(`${B.name} ${L.currentDay}日目【${ve}】✨成功 資金+${gn}G（配信×${ln.toFixed(1)}・善行収入×${On.toFixed(2)}・基準${un}G） / 技量+${Fn}→${z.skill} (失敗率${(Ie*100).toFixed(0)}%)`)}}ba({mode:Q,gold:$e,stat:Nt}),An.current=setTimeout(()=>{ba(null),An.current=null},2e3)}else return;if(L.subPhase==="daily"){const Q=dc(B);z.money=vn(z.money-Q),Y.push(`  生活費 -${Q}G → 資金 ${z.money}G${z.money<0?" 【借金中】":""}`),S==="work"&&(Ct=Q)}const Rn=Math.ceil(O.pon.dailyGain*Dn),Fa=z.pon;z.pon=_t(z.pon+Rn),Y.push(`  PON: ${Fa} +${Rn}${Dn!==1?`(×${Dn})`:""} → ${z.pon}`);let pn=null,o=ln;const f=on.ponFireMoneyPenaltyMultiplier??1;if(z.pon>=O.pon.fireThreshold&&Math.random()<z.pon/100){const Q=z.pon;if(S==="stream"){const ve=ze(O.pon.stream.moneyMin,O.pon.stream.moneyMax);z.money=vn(z.money+ve),z.skill=_t(z.skill-O.pon.stream.skillLoss,0),pn=`🔥 失言がバズった！資金+${ve}G / 技量-${O.pon.stream.skillLoss}`,B.characterType==="vtuber"&&(o=+(ln+.5).toFixed(1),pn+=` / 🎭リリム効果：配信倍率 ×${ln.toFixed(1)}→×${o.toFixed(1)}（永続UP！）`),ke=!0}else if(S==="shrine"){const ve=Math.max(1,Math.round(ze(50,150)*f));z.money=vn(z.money-ve),pn=`⚠️ ご神域で粗相をしてしまった！資金-${ve}G`}else{const ve=Math.max(1,Math.round(ze(O.pon.work.penaltyMin,O.pon.work.penaltyMax)*f));z.money=vn(z.money-ve),pn=`⚠️ 弁償！資金-${ve}G`,S==="work"&&(et=!0,Ye=ve)}z.pon=Math.floor(Q/2),Y.push(`  [PON発火 ${Q}%] ${pn} / PON→半減→${z.pon}`)}else Y.push(`  PON発火なし（${z.pon>=O.pon.fireThreshold?`${z.pon}%判定ハズレ`:`閾値${O.pon.fireThreshold}まであと${O.pon.fireThreshold-z.pon}`}）`);if(S==="stream"){ps.current.forEach(clearTimeout),ps.current=[];let Ie=2e3;if(ke){const lt=window.setTimeout(()=>{var $e,Nt;Er(!0),ne(!0),window.setTimeout(()=>ne(!1),500);try{(Nt=($e=wt.current)==null?void 0:$e.playStreamPonBurn)==null||Nt.call($e)}catch{}va.current&&clearTimeout(va.current),va.current=window.setTimeout(()=>{Er(!1),va.current=null},3300)},Ie);ps.current.push(lt),Ie+=3300}if(be){const lt=window.setTimeout(()=>{var $e,Nt;uo(!0);try{(Nt=($e=wt.current)==null?void 0:$e.playStreamFailGaan)==null||Nt.call($e)}catch{}aa.current&&clearTimeout(aa.current),aa.current=window.setTimeout(()=>{uo(!1),aa.current=null},3200)},Ie);ps.current.push(lt)}}if(S==="work"&&($s.current.forEach(clearTimeout),$s.current=[],et)){const _e=Jt-Ct-Ye,Ie={penalty:Ye,workIncome:Jt,livingCost:Ct,balanceAfter:z.money,turnDelta:_e,moneyBefore:ie},lt=window.setTimeout(()=>{var $e,Nt;Tr(Ie);try{(Nt=($e=wt.current)==null?void 0:$e.playWorkPonPlateBreak)==null||Nt.call($e)}catch{}Zn.current&&clearTimeout(Zn.current),Zn.current=window.setTimeout(()=>{Tr(null),Zn.current=null},3100)},2e3);$s.current.push(lt)}let m=L.players.map((Q,ve)=>ve===L.currentPlayerIdx?{...Q,stats:z,streamMultiplier:o,amulets:zt}:Q);if(m=vh(B,Ut,z.virtue,m,Y),pn&&S==="stream"&&L.subPhase==="day8"&&(m=Cp(L.currentPlayerIdx,m,Y)),L.subPhase==="daily"){const Q=L.currentPlayerIdx;m=m.map((ve,_e)=>_e!==Q?ve:tx(ve,Y))}const y={...L,recentPonEvent:pn?{player:B.name,msg:pn}:null},D=sx(y,m,Y),V=L.currentDay===Sa&&L.currentPlayerIdx===L.players.length-1;L.currentDay===Sa&&L.subPhase==="daily"&&cs(vx(D,L,V)),V&&await new Promise(Q=>setTimeout(Q,Tl)),await vs(D)||cs(null)},bo=async S=>{if(!Nn||!U)return;const L=U.currentPlayerIdx,B=U.players[L];if(B.movePhase!=="moving")return;const ie=B.pendingTaxiSteps??0;if(ie>0){if(qe||S!=="taxiTrafficWait")return;nn.current&&(clearTimeout(nn.current),nn.current=null),na.current=!1,ya(!1),jt(null),Ke.current=null;const m={...B.stats},y=m.pon,D=m.virtue;m.pon=_t(m.pon+ie);const V=Math.min(Zt,B.position+ie),H=B.moveTurns+1,Q=[];B.characterType==="vtuber"&&Q.push(`🎭 ${B.name}: "Ugh, this traffic is the worst! My stream is going to be late!"`);const ve=ax(U,L,V,m,Q,{ponSplashDamage:!1}),_e=ve.players[L],Ie=_e.position,lt=_e.stats,$e=Ie>=Zt,Nt=!$e&&H>=O.dice.maxTurns,cn=$e?Math.max(0,O.dice.maxTurns-H):0;let un=`🚗 渋滞を待つ（Wait in Traffic）⋯ 残り${ie}マス進行 → ${Ie}/${Zt}マス / PON${y}+${ie}→${lt.pon}`;if(Ie!==V&&(un+=`（マス効果:${V}→${Ie}）`),Q.push(`${B.name} T${H}: ${un}`),$e){const Yu=cn*O.dice.slotsPerSugorokuTurn;Q.push(`🎯 ${B.name} がゴールへ到着！獲得スロット ${cn}ターンブン（開始時までに計${Yu}回）（確認後ターン終了 → 次の自分のターンでスロット開始）`)}Nt&&Q.push(`⏰ ${B.name} タイムアップ（${O.dice.maxTurns}ターン消費）`);let On=vh(B,D,lt.virtue,ve.players,Q).map((Yu,TS)=>{if(TS!==L)return Yu;const Gd={...Yu,moveTurns:H,lastMoveEvent:un,pendingTaxiSteps:0};return $e?{...Gd,movePhase:"goalLanding",slotTurnsLeft:0,reservedSlotTurns:cn,slotPullsGranted:0,slotPullsThisSeat:0}:Nt?{...Gd,movePhase:"missed",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}:{...Gd,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}});const gn={...ve.gsWithTiles,lastDiceRolls:[]},Fn=$e?{...gn,players:On,log:da(Q,gn.log)}:Vr(gn,On,Q),xo=Ie!==V,Pt=xo?xh(On,L,V):null,jn=Pt?{...gn,players:Pt}:null,Ha=xo?V:Ie;oe(!0),setTimeout(()=>oe(!1),700);const Yl=mc(Math.abs(Ha-B.position))*2;mn.current=Yl,me(Yl),Qt(Ha),Ot(null),mt.current=0,Re(Yl),it.current=xo&&jn?jn:Fn,Ke.current=xo&&jn?{finalGS:Fn,fromPos:V,toPos:Ie}:null,xt.current=!1,ms.current=ve.tileToast,Se(!0),fe("drive");return}if(qe)return;if(nn.current&&(clearTimeout(nn.current),nn.current=null),na.current=!1,ya(!1),jt(null),Ke.current=null,S==="help"&&B.stats.pon>=O.pon.deathThreshold&&Math.random()<O.pon.deathChance){const m=U.players.map((y,D)=>D===U.currentPlayerIdx?{...y,alive:!1}:y);await vs({...U,players:m,gamePhase:"gameOver",gameOverMsg:`${B.name} はPON${B.stats.pon}の状態で人助けに失敗し、社会的に抹殺された…`,log:da([`💀 GAME OVER: ${B.name} / PON${B.stats.pon}で人助け失敗！`],U.log)});return}let z=0,Y=[],be="",ke=!1,et=0,Jt=!1,Ct=0,Ye={...B.stats};const Ut=[],on=Ye.virtue;if(S==="help"){z=1;const m=ze(O.dice.helpVirtueMin,O.dice.helpVirtueMax);Ye.virtue=_t(Ye.virtue+m),be=`人助け！1マス前進 / 善行+${m}（→${Ye.virtue}）`,Y=[1]}else if(S==="taxi"){if(Ye.money<O.dice.taxiCost)return;Ye.money=vn(Ye.money-O.dice.taxiCost);const m=ze(O.dice.taxiMoveMin,O.dice.taxiMoveMax);if(et=O.dice.taxiBaseTurns-1,Y=[m],z=m,be=`タクシー！${m}マス予定 / 資金-${O.dice.taxiCost}G`,Ye.virtue<=O.dice.taxiCongestThresh&&Math.random()<O.dice.taxiCongestChance){const y=Math.ceil(m/2);B.position+y>=Zt||(Ct=m-y,z=y,Jt=!0,Ye.pon=_t(Ye.pon+O.dice.taxiCongestPon),be+=` / 🚗渋滞！まず ${y} マスのみ進行／残り ${Ct} マスは次の自分ターンで完了（試行+PON+${O.dice.taxiCongestPon}）`)}}else{const m=fO(B.stats);z=m.value,Y=[...m.rolls],ke=m.advantage;const y=m.advantage?`（運アドバンテージ：合計${m.value}マス）`:"";if(S==="shop"){if(Ye.money<O.dice.shopCost)return;const D=ze(1,4);z+=D,Y=[...m.rolls,D],Ye.money=vn(Ye.money-O.dice.shopCost),be=`コンビニ！🎲${m.rolls.join(", ")}${y} + 店舗🎲${D} = ${z}マス / -${O.dice.shopCost}G`}else be=`🎲 ダイスの出目: ${m.rolls.join(", ")}${y} (合計${z}マス)`}let Dn=!1;const ln=z;S!=="taxi"&&Ye.pon>=O.pon.fireThreshold&&Math.random()<Ye.pon/100&&(Dn=!0,z=Math.ceil(z/2));const zt=Ye.pon;Ye.pon=_t(Ye.pon+z),Dn&&(Ye.pon=Math.floor(Ye.pon/2));const Rn=Y.length,Fa=400,pn=520,o=Fa+(Rn-1)*pn+2e3;He(!0),F(Array(Rn).fill(null)),Pe(Array(Rn).fill(!1)),he(Array.from({length:Rn},()=>ze(1,6))),Ge(ke),Qe(!1),S==="taxi"&&fe("taxiHail"),ke&&(Xe(!0),setTimeout(()=>Xe(!1),1900));const f=setInterval(()=>{he(Array.from({length:Rn},()=>ze(1,6)))},80);setTimeout(()=>{clearInterval(f),Y.forEach((m,y)=>{setTimeout(()=>{F(D=>{const V=[...D];return V[y]=m,V}),Pe(D=>{const V=[...D];return V[y]=!0,V}),y===Rn-1&&setTimeout(()=>Qe(!0),200)},y*pn)})},Fa),setTimeout(async()=>{const m=Dn?Math.ceil(ln/2):z,y=Math.min(Zt,B.position+m),D=B.moveTurns+1+et,V=ax(U,L,y,Ye,Ut,{ponSplashDamage:Dn}),H=V.players[L],Q=H.position,ve=H.stats,_e=Q>=Zt,Ie=!_e&&D>=O.dice.maxTurns,lt=_e?Math.max(0,O.dice.maxTurns-D):0,$e=Dn?` ⚡転倒(${zt}%) ${ln}→${z}マス / PON→半減→${ve.pon}`:` / PON${zt}+${z}→${ve.pon}`;let Nt=`${be} → ${Q}/${Zt}マス${$e}`;if(Q!==y&&(Nt+=`（マス効果:${y}→${Q}）`),Y.length>1&&Ut.push(`  ダイスの出目: ${Y.join(", ")} (合計${ln}${Dn?`→転倒で${z}`:""}マス)`),Dn&&Ut.push(`  ⚡転倒！${ln}マス→${z}マス / PON半減`),_e){const Pt=lt*O.dice.slotsPerSugorokuTurn;Ut.push(`🎯 ${B.name} がゴールへ到着！獲得スロット ${lt}ターンブン（開始時までに計${Pt}回）（確認後ターン終了 → 次の自分のターンでスロット開始）`)}Ie&&Ut.push(`⏰ ${B.name} タイムアップ（${O.dice.maxTurns}ターン消費）`),Ut.push(`${B.name} T${D}: ${Nt}`);const cn=!Ie&&!_e&&Jt?Ct:0;let un=vh(B,on,V.players[L].stats.virtue,V.players,Ut).map((Pt,jn)=>{if(jn!==U.currentPlayerIdx)return Pt;const Ha={...Pt,moveTurns:D,lastMoveEvent:Nt,pendingTaxiSteps:cn};return _e?{...Ha,movePhase:"goalLanding",slotTurnsLeft:0,reservedSlotTurns:lt,slotPullsGranted:0,slotPullsThisSeat:0}:Ie?{...Ha,movePhase:"missed",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}:{...Ha,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}});const On={...V.gsWithTiles,lastDiceRolls:Y},gn=_e?{...On,players:un,log:da(Ut,V.gsWithTiles.log)}:Vr(On,un,Ut),Fn=Q!==y,xo=()=>{var Pt,jn;(jn=(Pt=V.tileToast)==null?void 0:Pt.lines)!=null&&jn.length&&(Bn.current&&clearTimeout(Bn.current),Yt(V.tileToast),Bn.current=setTimeout(()=>{Yt(null),Bn.current=null},2800))};if(oe(!0),setTimeout(()=>oe(!1),700),S==="taxi"){if(xt.current=Jt,ms.current=V.tileToast,Jt){it.current=gn,Ke.current=null;const Pt=mc(Math.abs(Q-B.position));mn.current=Pt,me(Pt),Qt(Q);const{jamMid:jn,firstLegMs:Ha,secondLegMs:qd}=CO(B.position,Q,Y[0],Pt);Ot(jn),mt.current=qd,Re(Ha)}else if(Fn){const Pt=xh(un,L,y);it.current={...On,players:Pt},Ke.current={finalGS:gn,fromPos:y,toPos:Q};const jn=mc(Math.abs(y-B.position));mn.current=jn,me(jn),Qt(y),Ot(null),mt.current=0,Re(jn)}else{it.current=gn,Ke.current=null;const Pt=mc(Math.abs(Q-B.position));mn.current=Pt,me(Pt),Qt(Q),Ot(null),mt.current=0,Re(Pt)}fe("enter"),Se(!1),He(!1)}else if(Dn){const Pt=Fn?xh(un,L,y):null,jn=Pt?{...On,players:Pt}:null;ls.current={nextGS:gn,characterType:B.characterType??"salaryman",tileFxToast:V.tileToast,intermediateGS:jn,tileSlideFromPos:y,tileSlideToPos:Fn?Q:null},na.current=!0,nn.current&&(clearTimeout(nn.current),nn.current=null),jt(y),ya(!0),He(!1)}else{if(Fn){const Pt=xh(un,L,y),jn={...On,players:Pt};if(!await vs(jn)){He(!1);return}if(await new Promise(Yl=>setTimeout(Yl,Km(B.position,y))),!await vs(gn)){He(!1);return}}else if(!await vs(gn)){He(!1);return}He(!1),xo()}},o)};if(!s)return u.jsxs("div",{className:"min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400",children:[u.jsx(Ur,{size:32,className:"animate-spin text-cyan-400"}),u.jsx("p",{className:"text-sm",children:"接続中…"})]});if(j==="entry")return u.jsx("div",{className:"min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 pb-12 text-slate-100",children:u.jsxs("div",{className:"w-full max-w-6xl flex flex-col items-center text-center space-y-10",children:[u.jsxs("div",{className:"flex flex-col items-center gap-5 w-full",children:[u.jsx("img",{src:ta(bS),alt:Qf,className:"w-full max-w-[min(100%,1020px)] h-auto object-contain select-none drop-shadow-[0_0_40px_rgba(34,211,238,0.12)]"}),u.jsxs("div",{className:"space-y-3 px-1 max-w-3xl",children:[u.jsx("h1",{className:"text-xl sm:text-2xl md:text-[1.65rem] font-bold text-slate-50 leading-snug tracking-tight font-[Rajdhani]",children:Qf}),u.jsxs("p",{className:"text-[11px] font-semibold tracking-[0.32em] text-cyan-400/90 uppercase",children:[Kh," · ",Wm]}),u.jsxs("div",{className:"rounded-xl border border-slate-700/80 bg-slate-900/50 px-3 py-2.5 text-left",children:[u.jsx("p",{className:"text-[11px] font-bold text-amber-200/95 mb-1",children:"ソロ先行プレイ版"}),u.jsx("p",{className:"text-xs text-slate-400 leading-relaxed",children:"マルチプレイ（オンライン）はロック中です。まず一人でゲームシステムをお楽しみください。"})]})]})]}),u.jsxs("div",{className:"w-full max-w-md space-y-4",children:[u.jsxs("div",{className:"space-y-2 text-left",children:[u.jsx("label",{className:"text-sm text-slate-300 font-semibold block",children:"プレイヤー名"}),u.jsx("input",{value:p,onChange:S=>g(S.target.value),onKeyDown:S=>S.key==="Enter"&&zu(),maxLength:12,autoFocus:!0,className:"w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-base text-center focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-colors",placeholder:"例: 闇月リリム"}),u.jsx("p",{className:"text-xs text-slate-500 text-center",children:"空欄の場合はランダムな名前が割り当てられます"})]}),u.jsxs("button",{type:"button",onClick:zu,className:"w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] py-4 font-bold text-slate-950 transition-all shadow-lg shadow-cyan-900/35 border border-cyan-400/30",children:[u.jsx("span",{className:"block text-xl tracking-[0.2em] font-black",children:"START"}),u.jsx("span",{className:"block text-xs font-semibold text-slate-900/75 mt-1",children:"遊ぶ"})]})]})]})});if(j==="lobby")return u.jsx(uj,{myFullId:es,copied:M,onCopyMyId:At,loading:P,onSoloPlay:Hd,multiOpen:ae,onToggleMultiOpen:()=>{ue(S=>!S),Ze(null),e("")},multiAction:Le,onSetMultiAction:Ze,onQuickMatch:Uu,isPrivateRoom:J,onSetPrivateRoom:T,allowQuickMatch:ut,onSetAllowQuickMatch:Mt,onCreateRoom:Fd,joinInput:C,onJoinInputChange:I,onJoinRoom:$l,onCheckInvites:Bu,uiError:t,onClearUiError:()=>e(""),seVolume:te,bgmVolume:W,onSeVolumeChange:Ei,onBgmVolumeChange:wi});if(j==="waiting")return u.jsx(Aj,{waitingSessionKey:b,myFullId:es,copied:M,onCopyMyId:At,roomData:r,roomId:a,playerSlots:ts,myId:n,isHost:xa,onReturnToLobby:Ta,onSelectCharacter:Ba,onCommitInitialRolls:Lu,soundRef:wt,onStartGame:vo,loading:P,uiError:t,inviteInput:x,onInviteInputChange:E,inviteError:A,onInvitePlayer:Fl,seVolume:te,bgmVolume:W,onSeVolumeChange:Ei,onBgmVolumeChange:wi,unlockPlayerNameForSecret:p,onSecretCharacterSelected:Sr});if(j==="gameover")return u.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[u.jsx(Lc,{myFullId:es,copied:M,onCopy:At,seVolume:te,bgmVolume:W,onSeVolumeChange:Ei,onBgmVolumeChange:wi}),u.jsxs("div",{className:"w-full max-w-md space-y-6 text-center",children:[u.jsx("div",{className:"text-7xl",children:"💀"}),u.jsx("h2",{className:"text-3xl font-bold text-rose-400",children:"GAME OVER"}),u.jsx("p",{className:"text-slate-300 text-sm leading-relaxed",children:U==null?void 0:U.gameOverMsg}),((Rr=U==null?void 0:U.players)==null?void 0:Rr.some(S=>S.alive))&&u.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left space-y-2",children:[u.jsx("p",{className:"text-xs text-slate-400 mb-2",children:"生き残ったプレイヤー"}),(U.players??[]).filter(S=>S.alive).map(S=>u.jsxs("div",{className:"flex justify-between text-sm",children:[u.jsxs("span",{children:[S.name,S.id===n&&" (YOU)"]}),u.jsxs("span",{className:"text-yellow-300",children:[S.stats.money,"G / ",Vc(S.stats.money),"ランク"]})]},S.id))]}),u.jsx("button",{onClick:Ta,className:"rounded-xl bg-cyan-500 px-8 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ロビーへ戻る"})]})]});if(j==="results"){const S=[...(U==null?void 0:U.players)??[]].sort((Y,be)=>be.stats.money-Y.stats.money),L=["🥇","🥈","🥉",""],B=S.length>0?S[0]:null,ie=B!=null&&Vc(B.stats.money)==="SS",z=ie?B.characterType==="vtuber"?"✦ 伝説のリリム ✦":"✦ 伝説のスター ✦":"最終結果";return u.jsxs("div",{className:"relative min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8 overflow-hidden",children:[u.jsx("style",{children:px}),u.jsx(Lc,{myFullId:es,copied:M,onCopy:At,seVolume:te,bgmVolume:W,onSeVolumeChange:Ei,onBgmVolumeChange:wi}),ie&&u.jsx(hj,{}),u.jsxs("div",{className:"mx-auto max-w-lg space-y-5 relative z-10",children:[u.jsxs("div",{className:"text-center space-y-2",children:[ie?u.jsx("div",{className:"text-5xl leading-none select-none anim-fadein",children:"👑"}):u.jsx(UD,{size:52,className:"mx-auto text-amber-400"}),u.jsx("h2",{className:`text-3xl font-bold ${ie?"text-yellow-300":""}`,children:z}),ie&&u.jsx("p",{className:"text-amber-300/80 text-sm tracking-wider",children:"スーパースター達成！おめでとう！"})]}),u.jsx("div",{className:"space-y-3",children:S.map((Y,be)=>{const ke=Vc(Y.stats.money),et=ke==="SS";return u.jsx("div",{className:`rounded-xl border p-4 ${be===0&&et?"border-yellow-400/80 bg-yellow-400/10 shadow-[0_0_24px_rgba(251,191,36,0.25)]":be===0?"border-amber-400/60 bg-amber-400/10":"border-slate-800 bg-slate-900"}`,children:u.jsxs("div",{className:"flex items-center gap-3",children:[u.jsx("span",{className:"text-2xl",children:et&&be===0?"👑":L[be]??""}),u.jsxs("div",{className:"flex-1",children:[u.jsxs("div",{className:"font-semibold flex items-center gap-2 flex-wrap",children:[u.jsx("span",{className:et?"text-yellow-200":"",children:Y.name}),Y.id===n&&u.jsx("span",{className:"text-xs text-cyan-400 border border-cyan-400/40 rounded px-1",children:"YOU"}),(Y.amulets??0)>0&&u.jsxs("span",{className:"text-xs text-amber-400",children:["🧿×",Y.amulets]})]}),u.jsxs("div",{className:"text-xs text-slate-400",children:["スロット",Y.spinCount,"回 / 移動",Y.moveTurns,"T / 技量",Y.stats.skill," / 善行",Y.stats.virtue]})]}),u.jsxs("div",{className:"text-right",children:[u.jsxs("div",{className:"text-xl font-bold text-yellow-300",children:[Y.stats.money,"G"]}),u.jsxs("div",{className:"text-xs text-slate-400",children:["スロット収支: ",u.jsxs("span",{className:Y.slotNet>=0?"text-emerald-400":"text-rose-400",children:[Y.slotNet>=0?"+":"",Y.slotNet,"G"]})]}),u.jsxs("div",{className:`text-sm font-black ${et?"text-yellow-300":ke==="S"?"text-amber-400":"text-slate-400"}`,children:[et&&"✦ ","ランク ",ke,et&&" ✦"]})]})]})},Y.id)})}),u.jsx("button",{onClick:Ta,className:"w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ロビーへ戻る"})]})]})}return U?u.jsxs("div",{className:`min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8 ${bt?"anim-shake":""}`,children:[u.jsx("style",{children:px}),u.jsx(Lc,{myFullId:es,copied:M,onCopy:At,seVolume:te,bgmVolume:W,onSeVolumeChange:Ei,onBgmVolumeChange:wi}),bt&&u.jsx("div",{className:"fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none",children:u.jsx("span",{className:"bg-rose-600/90 text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg anim-fadein tracking-wide",children:"⚡ 転倒 / 炎上！"})}),St&&u.jsx(ZO,{active:!0,characterType:St.characterType,onFallLand:()=>{ne(!0),setTimeout(()=>ne(!1),420)},onComplete:()=>{Ae.current()}}),dt==="trafficJam"&&u.jsx(ej,{}),((Gu=Sn==null?void 0:Sn.lines)==null?void 0:Gu.length)>0&&u.jsxs("div",{className:"fixed bottom-[min(132px,22vh)] left-1/2 z-[228] flex w-[min(92vw,360px)] -translate-x-1/2 flex-col gap-1.5 rounded-2xl border border-cyan-500/55 bg-slate-950/95 px-5 py-3.5 shadow-[0_14px_50px_rgba(0,0,0,0.75)] pointer-events-none text-center anim-fadein",role:"status","aria-live":"polite",children:[u.jsx("p",{className:"text-[11px] font-bold uppercase tracking-widest text-cyan-300/85",children:Sn.title??"マス効果"}),u.jsx("ul",{className:"space-y-1 text-sm font-bold text-amber-100 leading-snug",children:Sn.lines.map((S,L)=>u.jsx("li",{children:S},L))})]}),Cs&&u.jsx(Nj,{mode:Cs.mode,gold:Cs.gold,stat:Cs.stat}),ia&&u.jsx(Rj,{gold:ia.gold,stat:ia.stat,characterType:ia.characterType}),ho!=null&&u.jsxs("div",{className:"fixed inset-0 z-[260] flex items-center justify-center pointer-events-none bg-black/55 anim-fadein overflow-hidden",role:"status","aria-live":"polite",children:[u.jsx("div",{className:"absolute inset-0 anim-stream-cutin-lines opacity-40","aria-hidden":!0}),u.jsx("div",{className:"pointer-events-none absolute inset-y-[-15%] left-[-45%] w-[190%] bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent opacity-90 anim-stream-cutin-sweep","aria-hidden":!0}),u.jsxs("div",{className:"relative rounded-2xl border-2 border-cyan-300/80 bg-slate-950/95 px-12 py-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.78)] anim-pon-burst-impact",children:[u.jsx("p",{className:"text-cyan-200 text-2xl sm:text-3xl font-black tracking-wide",children:"ーーーーーーーーー"}),u.jsxs("p",{className:"mt-3 text-white text-4xl sm:text-5xl font-black tracking-tight tabular-nums drop-shadow-[0_0_18px_rgba(125,211,252,0.6)] anim-stream-pon-text",children:["残り",ho,"ターン"]}),u.jsx("p",{className:"mt-3 text-cyan-200 text-2xl sm:text-3xl font-black tracking-wide",children:"ーーーーーーーーー"})]})]}),Ti&&u.jsxs("div",{className:"fixed inset-0 z-[230] cursor-default overflow-hidden bg-black/0 anim-fadein pointer-events-auto",role:"status","aria-live":"assertive",children:[u.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black via-red-950/85 to-orange-950/75 anim-stream-pon-burn-veil","aria-hidden":!0}),u.jsx("div",{className:"absolute -bottom-[18%] left-[-20%] right-[-20%] h-[72%] rounded-[50%] bg-gradient-to-t from-orange-500/60 via-red-600/40 to-transparent blur-[90px] anim-stream-pon-flame","aria-hidden":!0}),u.jsx("div",{className:"absolute bottom-0 left-[12%] w-[76%] h-[48%] rounded-full bg-amber-300/25 blur-[80px] anim-stream-pon-flame opacity-95",style:{animationDelay:"0.12s"},"aria-hidden":!0}),u.jsx("div",{className:"absolute top-[28%] left-[8%] h-40 w-40 rounded-full bg-orange-400/35 blur-[48px] anim-stream-pon-flame","aria-hidden":!0}),u.jsx("div",{className:"absolute top-[32%] right-[10%] h-48 w-48 rounded-full bg-red-500/30 blur-[56px] anim-stream-pon-flame",style:{animationDelay:"0.2s"},"aria-hidden":!0}),u.jsx("div",{className:"relative z-[1] flex min-h-full flex-col items-center justify-center px-5 pt-8",children:u.jsx("p",{className:"text-[min(20vw,7rem)] sm:text-[min(16vw,7.5rem)] font-black tracking-tight leading-none anim-stream-pon-text text-amber-100",style:{textShadow:"0 0 52px rgba(251,146,60,1), 0 0 100px rgba(239,68,68,0.85), 0 6px 0 rgb(124,45,18), 0 -4px 28px rgba(254,243,199,0.65)",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"PON！！"})})]}),ks&&u.jsxs("div",{className:"fixed inset-0 z-[230] flex cursor-default flex-col items-center justify-center px-5 bg-black/70 pointer-events-auto anim-fadein",role:"status","aria-live":"assertive",children:[u.jsx("p",{className:"text-[min(20vw,7rem)] sm:text-[min(16vw,7.5rem)] font-black tracking-tight text-fuchsia-100 leading-none",style:{textShadow:"0 0 56px rgba(232,121,249,0.65), 0 5px 0 rgb(109,40,217), 0 0 2px #fff",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"PON！！"}),u.jsxs("div",{className:"mt-6 max-w-lg space-y-4 text-center text-sm sm:text-base text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]",children:[u.jsxs("p",{children:["PONでの弁償"," ",u.jsxs("span",{className:"font-bold tabular-nums text-rose-300",children:["-",ks.penalty,"G"]})]}),u.jsxs("p",{children:["このターンの収支（仕事 − 生活費 − 弁償）"," ",u.jsxs("span",{className:`font-bold tabular-nums ${ks.turnDelta>=0?"text-cyan-300":"text-rose-300"}`,children:[ks.turnDelta>=0?"+":"",ks.turnDelta,"G"]})]})]})]}),sa&&u.jsxs("div",{className:"fixed inset-0 z-[230] flex cursor-default flex-col items-center justify-center px-5 bg-black/75 pointer-events-auto anim-fadein",role:"status","aria-live":"assertive",children:[u.jsx("p",{className:"text-[min(22vw,7.5rem)] sm:text-[min(18vw,8rem)] font-black tracking-tighter text-white leading-none mb-6",style:{textShadow:"0 0 48px rgba(248,113,113,0.55), 0 4px 0 rgb(127,29,29)",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"失敗"}),u.jsx("p",{className:"max-w-lg text-center text-base sm:text-lg font-semibold text-slate-200 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",children:"OBSトラブルで少ししか配信ができなかった"})]}),Ue&&u.jsxs("div",{className:`fixed inset-0 z-[210] flex cursor-default flex-col items-center justify-center bg-black/65 pointer-events-auto ${Ue==="in"?"anim-shrine-in":"anim-shrine-out"}`,children:[u.jsx("span",{className:"text-[100px] leading-none select-none",style:{filter:"drop-shadow(0 0 30px rgba(251,191,36,0.7))"},children:"⛩"}),u.jsx("p",{className:"mt-4 text-xl font-semibold text-amber-200 tracking-[0.25em]",children:"二礼二拍手一礼"}),u.jsx("p",{className:"text-sm text-amber-300/70 mt-1",children:"運気が上がった気がする…"})]}),ce&&u.jsx("div",{className:"fixed inset-0 z-40 flex items-center justify-center pointer-events-none",children:u.jsx("span",{className:"text-3xl font-black text-amber-300 tracking-wide anim-lucky-pop",style:{textShadow:"0 0 24px rgba(251,191,36,0.9), 0 0 8px rgba(251,191,36,0.7)"},children:"幸運のダイス！🎲🎲"})}),ju&&u.jsx(aj,{gameState:U,soundRef:wt}),ju?null:u.jsxs("div",{className:"mx-auto w-full max-w-4xl space-y-5",children:[u.jsx("header",{className:"rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4",children:u.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2",children:[u.jsxs("div",{children:[u.jsx("h1",{className:"text-lg font-bold md:text-xl font-[Rajdhani] tracking-wide text-white",children:Kh}),u.jsx("p",{className:"text-[10px] text-slate-500 mt-0.5 leading-tight uppercase tracking-wide max-w-md",children:Wm}),u.jsxs("p",{className:"text-xs text-slate-400 mt-1.5 leading-relaxed space-y-0.5",children:[U.subPhase==="daily"&&`${U.currentDay}日目 / ${se==null?void 0:se.name}のターン`,U.subPhase==="day8"&&se&&u.jsxs(u.Fragment,{children:[u.jsxs("span",{className:"block",children:[se.movePhase==="missed"&&`【8日目・決戦】タイムアウト／${se.name}`,oa&&`【8日目・決戦】ゴール到着処理中／${se.name}`,ra&&`【8日目・決戦】ゴール済／${se.name}（次の自分ターンからスロット）`,zl&&`【8日目・決戦】スロット／${se.name}`]}),u.jsxs("span",{className:"block tabular-nums font-semibold text-amber-200/90 mt-1 sm:mt-0.5",children:["残りターンバースト"," ",u.jsx("strong",{children:Math.max(0,O.dice.maxTurns-se.moveTurns)})," / ",O.dice.maxTurns,"ターン"," ",u.jsx("span",{className:"font-normal text-slate-500",children:"（すごろく／スロット共通）"})]})]})]})]}),u.jsxs("div",{className:"flex items-center gap-2 flex-wrap justify-end",children:[U.subPhase==="day8"&&se&&u.jsxs("div",{className:"flex flex-col items-end gap-0.5",children:[u.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wide text-amber-400/90 leading-none",children:"8日目 HUD"}),u.jsx("span",{className:"text-xs font-bold text-slate-200 tabular-nums leading-none",children:se.movePhase==="goalLanding"||se.movePhase==="waitingSlot"?u.jsx(u.Fragment,{children:"ゴール済・スロット待ち"}):se.movePhase==="arrived"?u.jsx(u.Fragment,{children:"🎰 スロット"}):se.movePhase==="moving"?u.jsxs(u.Fragment,{children:["移動手番 ",u.jsx("strong",{children:se.moveTurns}),u.jsx("span",{className:"text-slate-600",children:"/"}),u.jsx("strong",{children:O.dice.maxTurns})]}):u.jsx(u.Fragment,{children:se.movePhase==="missed"?"すごろくタイムアウト済":"—"})})]}),u.jsx("span",{className:"text-xs text-slate-600 font-mono border border-slate-700 rounded px-2 py-0.5",children:a}),u.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[u.jsx(FD,{size:12,className:"text-cyan-400"}),u.jsx("span",{children:U.players.map(S=>S.name).join(" · ")})]}),!Nn&&u.jsxs("span",{className:"flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400",children:[u.jsx(Ur,{size:10,className:"animate-spin"}),se==null?void 0:se.name,"のターン待ち"]})]})]})}),se&&u.jsxs("section",{className:"rounded-2xl border border-cyan-800/50 bg-slate-900 p-4",children:[u.jsxs("div",{className:"flex items-center gap-2 mb-3 flex-wrap",children:[u.jsxs("span",{className:"font-semibold text-cyan-400 text-sm",children:[se.name,"のステータス"]}),se.id===n&&u.jsx("span",{className:"text-xs text-cyan-400 border border-cyan-400/40 rounded px-1.5 py-0.5",children:"YOU"}),se.stats.pon>=O.pon.deathThreshold&&u.jsxs("span",{className:"animate-pulse rounded-full border border-rose-500/60 bg-rose-500/15 px-2 py-0.5 text-xs text-rose-300",children:["💀 PON危険域 (",se.stats.pon,")"]}),se.stats.pon>=O.pon.fireThreshold&&se.stats.pon<O.pon.deathThreshold&&u.jsxs("span",{className:"rounded-full border border-orange-500/50 bg-orange-500/15 px-2 py-0.5 text-xs text-orange-300",children:["🔥 PON発火域 (",se.stats.pon,")"]})]}),u.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6",children:tO.map(({key:S,label:L,color:B})=>{const ie=dc(se),z=S==="livingCost",Y=z?ie:se.stats[S],be=S==="money"&&se.stats.money<0,ke=S==="money"?"text-lg":"text-2xl";return u.jsxs("div",{className:"group/status-hint relative rounded-lg bg-slate-800 p-2.5 text-center",children:[u.jsxs("div",{className:"text-xs text-slate-400 leading-tight",children:[L,z&&u.jsxs("span",{className:"text-slate-500 text-[10px]",children:["／日",u.jsx("span",{className:"sr-only",children:"（1〜7日目の行動後）"})]})]}),u.jsxs("div",{className:`mt-0.5 font-bold tabular-nums inline-flex items-baseline justify-center gap-0.5 ${be?"text-rose-400":B} ${ke}`,children:[u.jsx("span",{children:Y}),z&&u.jsx("span",{className:"text-xs font-semibold opacity-75",children:"G"})]}),u.jsx("div",{role:"tooltip",className:"pointer-events-none absolute left-1/2 top-full z-[120] mt-1 w-max max-w-[min(288px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-left text-[11px] leading-snug text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-0 transition-opacity duration-150 delay-75 invisible group-hover/status-hint:opacity-100 group-hover/status-hint:visible group-hover/status-hint:delay-0",children:Dj[S]??""})]},S)})}),(se.amulets??0)>0&&u.jsxs("div",{className:"flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-sm",children:[u.jsx("span",{className:"text-base leading-none",children:"🧿"}),u.jsxs("span",{className:"text-amber-300 font-semibold",children:["お守り ×",se.amulets]}),u.jsxs("span",{className:"text-amber-400/60 text-xs ml-auto",children:["毎ターン 運+",se.amulets*2]})]}),U.subPhase==="day8"&&se.spinCount>0&&u.jsxs("div",{className:"mt-2 flex items-center justify-end gap-2",children:[se.slotNet>=0?u.jsx(VD,{size:14,className:"text-emerald-400"}):u.jsx(jD,{size:14,className:"text-rose-400"}),u.jsx("span",{className:"text-xs text-slate-400",children:"スロット収支:"}),u.jsxs("span",{className:`text-sm font-bold ${se.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:[se.slotNet>=0?"+":"",se.slotNet,"G"]}),u.jsxs("span",{className:"text-xs text-slate-500",children:["（",se.spinCount,"回）"]})]}),se.stats.money<0&&u.jsxs("div",{className:"mt-2 rounded-lg border border-violet-500/45 bg-gradient-to-r from-violet-950/50 to-slate-900/80 px-3 py-2 space-y-0.5",children:[u.jsxs("span",{className:"text-violet-200 text-xs font-bold tracking-wide flex items-center gap-1.5",children:[u.jsx("span",{children:"🩻"})," 闇金リリムから高利子で借金中"]}),u.jsxs("span",{className:"block text-[11px] text-rose-300/90",children:["現在の赤字: ",se.stats.money,"G（連続赤字が",O.rimiru.dailyGracesBefore,"ターン／",O.rimiru.day8TurnsBefore,"手番ごとに+",O.rimiru.interestPercent,"%）"]})]}),U.recentPonEvent&&u.jsxs("div",{className:"mt-3 rounded-lg border border-orange-500/40 bg-orange-500/10 p-2.5 text-sm text-orange-200",children:["【PONイベント / ",U.recentPonEvent.player,"】",U.recentPonEvent.msg]})]}),u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4",children:[!Nn&&u.jsxs("div",{className:"rounded-xl border border-slate-700 bg-slate-800/40 p-5 text-center space-y-2",children:[u.jsx(Ur,{size:24,className:"animate-spin text-slate-500 mx-auto"}),u.jsx("p",{className:"text-slate-400 text-sm",children:oa?`${se==null?void 0:se.name} がゴール到着！終了確認を待っています…`:ra?`${se==null?void 0:se.name} のゴール後ターン／スロット開始を待っています…`:`${se==null?void 0:se.name} のターン操作を待っています…`})]}),Nn&&U.subPhase==="daily"&&se&&u.jsx(tj,{gs:U,cpGs:se,onDailyAction:ql,onOpenDailySlot:Nr,interactionLocked:ia!=null||Cs!=null||Ue!=null||Ti||ks!=null||sa}),Hl&&la&&se&&u.jsx(sj,{open:Hl,statsForSpin:la,characterType:se.characterType,playerName:se.name,initialSlotPityCounter:se.slotPityCounter??0,soundRef:wt,onClose:()=>Hu(!1),onFinished:qu}),u.jsx(YO,{gs:U,cpGs:se,boardViewPos:Nn&&typeof ot=="number"?ot:null,reportSugorokuHopComplete:Nn&&Wt,onSugorokuHopComplete:$d,isMyTurn:Nn,cpIsGoalLanding:oa,cpIsWaitingSlot:ra,isDay8Moving:Pu,isDiceRolling:qe,localDice:ht,diceShuffleValues:re,diceConfirmed:Z,isLuckyRoll:Te,showDiceTotal:De,displayDice:Bd,taxiPhase:dt,taxiDriveCongested:Ee,taxiDriveEndPos:Dt,taxiDriveDurationMs:we,taxiDriveSegmentMs:Gt,taxiJamMidPos:Oe,pieceHopping:X,onMoveAction:bo,onGoalLandingConfirm:$u}),Nn&&zl&&se&&u.jsx(yj,{gs:U,cpGs:se,isMyTurn:Nn,writeGS:vs,commitPendingGameState:_a,soundRef:wt,roomId:a})]}),u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4",children:[u.jsx("h2",{className:"mb-3 text-xs font-semibold text-slate-400",children:"全プレイヤー"}),u.jsx("div",{className:"grid grid-cols-1 gap-2 sm:grid-cols-2",children:U.players.map((S,L)=>u.jsxs("div",{className:`rounded-xl border p-3 ${L===U.currentPlayerIdx?"border-cyan-500/60 bg-cyan-500/5":"border-slate-800 bg-slate-800/30"}`,children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("span",{className:"text-sm font-medium flex items-center gap-1.5",children:[L===U.currentPlayerIdx?"▶ ":"",U.subPhase!=="day8"&&u.jsx(El,{characterType:S.characterType,imgClassName:"h-5 w-5 shrink-0 object-contain",spanClassName:"text-base leading-none"}),S.name,S.id===n&&u.jsx("span",{className:`text-xs border rounded px-1 ${U.subPhase==="day8"&&S.stats.luck>=80?"text-amber-300 border-amber-400/40":"text-cyan-400 border-cyan-400/40"}`,children:U.subPhase==="day8"&&S.stats.luck>=80?"✦YOU":"YOU"})]}),u.jsxs("div",{className:"flex items-center gap-2",children:[U.subPhase==="day8"&&S.spinCount>0&&u.jsxs("span",{className:`text-xs font-semibold ${S.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:["S:",S.slotNet>=0?"+":"",S.slotNet]}),u.jsxs("span",{className:"text-xs font-semibold text-yellow-300",children:[S.stats.money,"G"]})]})]}),u.jsx("div",{className:"mt-2 grid grid-cols-5 gap-1 text-center text-xs",children:[["生活費","text-orange-300",dc(S)],["技量","text-sky-400",S.stats.skill],["運","text-amber-400",S.stats.luck],["善行","text-emerald-400",S.stats.virtue],["PON",S.stats.pon>=O.pon.deathThreshold?"text-rose-400":S.stats.pon>=O.pon.fireThreshold?"text-orange-400":"text-fuchsia-400",S.stats.pon]].map(([B,ie,z])=>u.jsxs("div",{className:"rounded bg-slate-900/60 py-1",children:[u.jsx("div",{className:"text-slate-500",style:{fontSize:"10px"},children:B}),u.jsx("div",{className:`font-bold ${ie}`,children:z})]},B))}),U.subPhase==="day8"&&u.jsxs("div",{className:"mt-1.5 text-xs",children:[S.movePhase==="moving"&&u.jsxs("span",{className:"text-slate-400",children:["スタートから",S.position,"マス目（T",S.moveTurns,"）"]}),S.movePhase==="goalLanding"&&u.jsx("span",{className:"text-yellow-300",children:"🏁 ゴール到着・確認待ち"}),S.movePhase==="waitingSlot"&&u.jsx("span",{className:"text-teal-300",children:"🎰 ゴール済／次の自分ターンでスロット"}),S.movePhase==="arrived"&&S.slotTurnsLeft>0?u.jsxs("span",{className:"text-amber-300",children:["ゴール・スロット中",S.stats.money<0?"（借金可）":""]}):S.movePhase==="arrived"&&u.jsx("span",{className:"text-slate-500",children:"✅ スロット完了"}),S.movePhase==="missed"&&u.jsx("span",{className:"text-rose-400",children:"⏰ タイムアウト"})]})]},S.id))})]}),u.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4",children:[u.jsx("h2",{className:"mb-2 text-xs font-semibold text-slate-400",children:"ゲームログ（全員共有）"}),u.jsx("div",{className:"max-h-64 space-y-1 overflow-y-auto font-mono text-xs text-slate-300",children:(U.log??[]).map((S,L)=>u.jsx("p",{className:"border-b border-slate-800/50 pb-1 last:border-0",children:S},L))})]}),u.jsx("button",{onClick:Ta,className:"text-xs text-slate-600 underline hover:text-slate-400",children:"ロビーへ戻る（ゲームは続行中）"})]})]}):u.jsx("div",{className:"min-h-screen bg-slate-950 flex items-center justify-center",children:u.jsx(Ur,{size:32,className:"animate-spin text-cyan-400"})})}class jj extends Lp.Component{constructor(n){super(n);jy(this,"handleReload",()=>{window.location.reload()});this.state={hasError:!1,error:null}}static getDerivedStateFromError(n){return{hasError:!0,error:n}}componentDidCatch(n,s){}render(){return this.state.hasError?u.jsx("div",{className:"min-h-screen bg-slate-950 p-6 text-slate-100 flex items-center justify-center",children:u.jsxs("div",{className:"w-full max-w-md space-y-6 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-8 text-center shadow-xl",role:"alert",children:[u.jsx("p",{className:"text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/90",children:Kh}),u.jsx("h1",{className:"text-xl font-bold text-slate-50",children:"表示中に問題が発生しました"}),u.jsx("p",{className:"text-sm text-slate-400 leading-relaxed",children:"データの読み込みや画面の描画中に予期しないエラーが起きました。再読み込みで改善することがあります。"}),u.jsx("div",{className:"flex flex-col gap-3 sm:flex-row sm:justify-center",children:u.jsx("button",{type:"button",onClick:this.handleReload,className:"rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ページを再読み込み"})})]})}):this.props.children}}T5.createRoot(document.getElementById("root")).render(u.jsx(Lp.StrictMode,{children:u.jsx(jj,{children:u.jsx(Oj,{})})}));
