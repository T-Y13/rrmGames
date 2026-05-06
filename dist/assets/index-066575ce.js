var AS=Object.defineProperty;var NS=(t,e,n)=>e in t?AS(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ty=(t,e,n)=>(NS(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function Db(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var jb={exports:{}},kf={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var RS=Symbol.for("react.transitional.element"),CS=Symbol.for("react.fragment");function Ob(t,e,n){var s=null;if(n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:RS,type:t,key:s,ref:e!==void 0?e:null,props:n}}kf.Fragment=CS;kf.jsx=Ob;kf.jsxs=Ob;jb.exports=kf;var c=jb.exports,Vb={exports:{}},Fe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rp=Symbol.for("react.transitional.element"),kS=Symbol.for("react.portal"),IS=Symbol.for("react.fragment"),MS=Symbol.for("react.strict_mode"),DS=Symbol.for("react.profiler"),jS=Symbol.for("react.consumer"),OS=Symbol.for("react.context"),VS=Symbol.for("react.forward_ref"),PS=Symbol.for("react.suspense"),LS=Symbol.for("react.memo"),Pb=Symbol.for("react.lazy"),US=Symbol.for("react.activity"),ny=Symbol.iterator;function zS(t){return t===null||typeof t!="object"?null:(t=ny&&t[ny]||t["@@iterator"],typeof t=="function"?t:null)}var Lb={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ub=Object.assign,zb={};function vo(t,e,n){this.props=t,this.context=e,this.refs=zb,this.updater=n||Lb}vo.prototype.isReactComponent={};vo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};vo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Bb(){}Bb.prototype=vo.prototype;function lp(t,e,n){this.props=t,this.context=e,this.refs=zb,this.updater=n||Lb}var op=lp.prototype=new Bb;op.constructor=lp;Ub(op,vo.prototype);op.isPureReactComponent=!0;var sy=Array.isArray;function Mm(){}var Qt={H:null,A:null,T:null,S:null},$b=Object.prototype.hasOwnProperty;function cp(t,e,n){var s=n.ref;return{$$typeof:rp,type:t,key:e,ref:s!==void 0?s:null,props:n}}function BS(t,e){return cp(t.type,e,t.props)}function up(t){return typeof t=="object"&&t!==null&&t.$$typeof===rp}function $S(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var ay=/\/+/g;function wd(t,e){return typeof t=="object"&&t!==null&&t.key!=null?$S(""+t.key):e.toString(36)}function FS(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Mm,Mm):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function gl(t,e,n,s,a){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(i){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case rp:case kS:r=!0;break;case Pb:return r=t._init,gl(r(t._payload),e,n,s,a)}}if(r)return a=a(t),r=s===""?"."+wd(t,0):s,sy(a)?(n="",r!=null&&(n=r.replace(ay,"$&/")+"/"),gl(a,e,n,"",function(h){return h})):a!=null&&(up(a)&&(a=BS(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(ay,"$&/")+"/")+r)),e.push(a)),1;r=0;var o=s===""?".":s+":";if(sy(t))for(var u=0;u<t.length;u++)s=t[u],i=o+wd(s,u),r+=gl(s,e,n,i,a);else if(u=zS(t),typeof u=="function")for(t=u.call(t),u=0;!(s=t.next()).done;)s=s.value,i=o+wd(s,u++),r+=gl(s,e,n,i,a);else if(i==="object"){if(typeof t.then=="function")return gl(FS(t),e,n,s,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function Cu(t,e,n){if(t==null)return t;var s=[],a=0;return gl(t,s,"","",function(i){return e.call(n,i,a++)}),s}function qS(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var iy=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},HS={map:Cu,forEach:function(t,e,n){Cu(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Cu(t,function(){e++}),e},toArray:function(t){return Cu(t,function(e){return e})||[]},only:function(t){if(!up(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Fe.Activity=US;Fe.Children=HS;Fe.Component=vo;Fe.Fragment=IS;Fe.Profiler=DS;Fe.PureComponent=lp;Fe.StrictMode=MS;Fe.Suspense=PS;Fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Qt;Fe.__COMPILER_RUNTIME={__proto__:null,c:function(t){return Qt.H.useMemoCache(t)}};Fe.cache=function(t){return function(){return t.apply(null,arguments)}};Fe.cacheSignal=function(){return null};Fe.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var s=Ub({},t.props),a=t.key;if(e!=null)for(i in e.key!==void 0&&(a=""+e.key),e)!$b.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(s[i]=e[i]);var i=arguments.length-2;if(i===1)s.children=n;else if(1<i){for(var r=Array(i),o=0;o<i;o++)r[o]=arguments[o+2];s.children=r}return cp(t.type,a,s)};Fe.createContext=function(t){return t={$$typeof:OS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:jS,_context:t},t};Fe.createElement=function(t,e,n){var s,a={},i=null;if(e!=null)for(s in e.key!==void 0&&(i=""+e.key),e)$b.call(e,s)&&s!=="key"&&s!=="__self"&&s!=="__source"&&(a[s]=e[s]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),u=0;u<r;u++)o[u]=arguments[u+2];a.children=o}if(t&&t.defaultProps)for(s in r=t.defaultProps,r)a[s]===void 0&&(a[s]=r[s]);return cp(t,i,a)};Fe.createRef=function(){return{current:null}};Fe.forwardRef=function(t){return{$$typeof:VS,render:t}};Fe.isValidElement=up;Fe.lazy=function(t){return{$$typeof:Pb,_payload:{_status:-1,_result:t},_init:qS}};Fe.memo=function(t,e){return{$$typeof:LS,type:t,compare:e===void 0?null:e}};Fe.startTransition=function(t){var e=Qt.T,n={};Qt.T=n;try{var s=t(),a=Qt.S;a!==null&&a(n,s),typeof s=="object"&&s!==null&&typeof s.then=="function"&&s.then(Mm,iy)}catch(i){iy(i)}finally{e!==null&&n.types!==null&&(e.types=n.types),Qt.T=e}};Fe.unstable_useCacheRefresh=function(){return Qt.H.useCacheRefresh()};Fe.use=function(t){return Qt.H.use(t)};Fe.useActionState=function(t,e,n){return Qt.H.useActionState(t,e,n)};Fe.useCallback=function(t,e){return Qt.H.useCallback(t,e)};Fe.useContext=function(t){return Qt.H.useContext(t)};Fe.useDebugValue=function(){};Fe.useDeferredValue=function(t,e){return Qt.H.useDeferredValue(t,e)};Fe.useEffect=function(t,e){return Qt.H.useEffect(t,e)};Fe.useEffectEvent=function(t){return Qt.H.useEffectEvent(t)};Fe.useId=function(){return Qt.H.useId()};Fe.useImperativeHandle=function(t,e,n){return Qt.H.useImperativeHandle(t,e,n)};Fe.useInsertionEffect=function(t,e){return Qt.H.useInsertionEffect(t,e)};Fe.useLayoutEffect=function(t,e){return Qt.H.useLayoutEffect(t,e)};Fe.useMemo=function(t,e){return Qt.H.useMemo(t,e)};Fe.useOptimistic=function(t,e){return Qt.H.useOptimistic(t,e)};Fe.useReducer=function(t,e,n){return Qt.H.useReducer(t,e,n)};Fe.useRef=function(t){return Qt.H.useRef(t)};Fe.useState=function(t){return Qt.H.useState(t)};Fe.useSyncExternalStore=function(t,e,n){return Qt.H.useSyncExternalStore(t,e,n)};Fe.useTransition=function(){return Qt.H.useTransition()};Fe.version="19.2.5";Vb.exports=Fe;var k=Vb.exports;const hp=Db(k);var Fb={exports:{}},If={},qb={exports:{}},Hb={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(X,ie){var se=X.length;X.push(ie);e:for(;0<se;){var pe=se-1>>>1,Se=X[pe];if(0<a(Se,ie))X[pe]=ie,X[se]=Se,se=pe;else break e}}function n(X){return X.length===0?null:X[0]}function s(X){if(X.length===0)return null;var ie=X[0],se=X.pop();if(se!==ie){X[0]=se;e:for(var pe=0,Se=X.length,Qe=Se>>>1;pe<Qe;){var ht=2*(pe+1)-1,Dt=X[ht],Ue=ht+1,rt=X[Ue];if(0>a(Dt,se))Ue<Se&&0>a(rt,Dt)?(X[pe]=rt,X[Ue]=se,pe=Ue):(X[pe]=Dt,X[ht]=se,pe=ht);else if(Ue<Se&&0>a(rt,se))X[pe]=rt,X[Ue]=se,pe=Ue;else break e}}return ie}function a(X,ie){var se=X.sortIndex-ie.sortIndex;return se!==0?se:X.id-ie.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var r=Date,o=r.now();t.unstable_now=function(){return r.now()-o}}var u=[],h=[],d=1,p=null,g=3,y=!1,R=!1,I=!1,O=!1,x=typeof setTimeout=="function"?setTimeout:null,b=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function V(X){for(var ie=n(h);ie!==null;){if(ie.callback===null)s(h);else if(ie.startTime<=X)s(h),ie.sortIndex=ie.expirationTime,e(u,ie);else break;ie=n(h)}}function U(X){if(I=!1,V(X),!R)if(n(u)!==null)R=!0,W||(W=!0,M());else{var ie=n(h);ie!==null&&me(U,ie.startTime-X)}}var W=!1,S=-1,_=5,E=-1;function A(){return O?!0:!(t.unstable_now()-E<_)}function w(){if(O=!1,W){var X=t.unstable_now();E=X;var ie=!0;try{e:{R=!1,I&&(I=!1,b(S),S=-1),y=!0;var se=g;try{t:{for(V(X),p=n(u);p!==null&&!(p.expirationTime>X&&A());){var pe=p.callback;if(typeof pe=="function"){p.callback=null,g=p.priorityLevel;var Se=pe(p.expirationTime<=X);if(X=t.unstable_now(),typeof Se=="function"){p.callback=Se,V(X),ie=!0;break t}p===n(u)&&s(u),V(X)}else s(u);p=n(u)}if(p!==null)ie=!0;else{var Qe=n(h);Qe!==null&&me(U,Qe.startTime-X),ie=!1}}break e}finally{p=null,g=se,y=!1}ie=void 0}}finally{ie?M():W=!1}}}var M;if(typeof N=="function")M=function(){N(w)};else if(typeof MessageChannel<"u"){var T=new MessageChannel,ue=T.port2;T.port1.onmessage=w,M=function(){ue.postMessage(null)}}else M=function(){x(w,0)};function me(X,ie){S=x(function(){X(t.unstable_now())},ie)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(X){X.callback=null},t.unstable_forceFrameRate=function(X){0>X||125<X?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<X?Math.floor(1e3/X):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_next=function(X){switch(g){case 1:case 2:case 3:var ie=3;break;default:ie=g}var se=g;g=ie;try{return X()}finally{g=se}},t.unstable_requestPaint=function(){O=!0},t.unstable_runWithPriority=function(X,ie){switch(X){case 1:case 2:case 3:case 4:case 5:break;default:X=3}var se=g;g=X;try{return ie()}finally{g=se}},t.unstable_scheduleCallback=function(X,ie,se){var pe=t.unstable_now();switch(typeof se=="object"&&se!==null?(se=se.delay,se=typeof se=="number"&&0<se?pe+se:pe):se=pe,X){case 1:var Se=-1;break;case 2:Se=250;break;case 5:Se=1073741823;break;case 4:Se=1e4;break;default:Se=5e3}return Se=se+Se,X={id:d++,callback:ie,priorityLevel:X,startTime:se,expirationTime:Se,sortIndex:-1},se>pe?(X.sortIndex=se,e(h,X),n(u)===null&&X===n(h)&&(I?(b(S),S=-1):I=!0,me(U,se-pe))):(X.sortIndex=Se,e(u,X),R||y||(R=!0,W||(W=!0,M()))),X},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(X){var ie=g;return function(){var se=g;g=ie;try{return X.apply(this,arguments)}finally{g=se}}}})(Hb);qb.exports=Hb;var GS=qb.exports,Gb={exports:{}},fs={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var YS=k;function Yb(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ei(){}var hs={d:{f:Ei,r:function(){throw Error(Yb(522))},D:Ei,C:Ei,L:Ei,m:Ei,X:Ei,S:Ei,M:Ei},p:0,findDOMNode:null},KS=Symbol.for("react.portal");function QS(t,e,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:KS,key:s==null?null:""+s,children:t,containerInfo:e,implementation:n}}var rc=YS.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Mf(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}fs.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=hs;fs.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Yb(299));return QS(t,e,null,n)};fs.flushSync=function(t){var e=rc.T,n=hs.p;try{if(rc.T=null,hs.p=2,t)return t()}finally{rc.T=e,hs.p=n,hs.d.f()}};fs.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,hs.d.C(t,e))};fs.prefetchDNS=function(t){typeof t=="string"&&hs.d.D(t)};fs.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,s=Mf(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?hs.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:s,integrity:a,fetchPriority:i}):n==="script"&&hs.d.X(t,{crossOrigin:s,integrity:a,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};fs.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=Mf(e.as,e.crossOrigin);hs.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&hs.d.M(t)};fs.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,s=Mf(n,e.crossOrigin);hs.d.L(t,n,{crossOrigin:s,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};fs.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=Mf(e.as,e.crossOrigin);hs.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else hs.d.m(t)};fs.requestFormReset=function(t){hs.d.r(t)};fs.unstable_batchedUpdates=function(t,e){return t(e)};fs.useFormState=function(t,e,n){return rc.H.useFormState(t,e,n)};fs.useFormStatus=function(){return rc.H.useHostTransitionStatus()};fs.version="19.2.5";function Kb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Kb)}catch(t){console.error(t)}}Kb(),Gb.exports=fs;var XS=Gb.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mn=GS,Qb=k,WS=XS;function G(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Xb(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Xc(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Wb(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Jb(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function ry(t){if(Xc(t)!==t)throw Error(G(188))}function JS(t){var e=t.alternate;if(!e){if(e=Xc(t),e===null)throw Error(G(188));return e!==t?null:t}for(var n=t,s=e;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(s=a.return,s!==null){n=s;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return ry(a),t;if(i===s)return ry(a),e;i=i.sibling}throw Error(G(188))}if(n.return!==s.return)n=a,s=i;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,s=i;break}if(o===s){r=!0,s=a,n=i;break}o=o.sibling}if(!r){for(o=i.child;o;){if(o===n){r=!0,n=i,s=a;break}if(o===s){r=!0,s=i,n=a;break}o=o.sibling}if(!r)throw Error(G(189))}}if(n.alternate!==s)throw Error(G(190))}if(n.tag!==3)throw Error(G(188));return n.stateNode.current===n?t:e}function Zb(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=Zb(t),e!==null)return e;t=t.sibling}return null}var Xt=Object.assign,ZS=Symbol.for("react.element"),ku=Symbol.for("react.transitional.element"),Xo=Symbol.for("react.portal"),El=Symbol.for("react.fragment"),ex=Symbol.for("react.strict_mode"),Dm=Symbol.for("react.profiler"),tx=Symbol.for("react.consumer"),Qa=Symbol.for("react.context"),fp=Symbol.for("react.forward_ref"),jm=Symbol.for("react.suspense"),Om=Symbol.for("react.suspense_list"),dp=Symbol.for("react.memo"),wi=Symbol.for("react.lazy"),Vm=Symbol.for("react.activity"),ew=Symbol.for("react.memo_cache_sentinel"),ly=Symbol.iterator;function zo(t){return t===null||typeof t!="object"?null:(t=ly&&t[ly]||t["@@iterator"],typeof t=="function"?t:null)}var tw=Symbol.for("react.client.reference");function Pm(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===tw?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case El:return"Fragment";case Dm:return"Profiler";case ex:return"StrictMode";case jm:return"Suspense";case Om:return"SuspenseList";case Vm:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Xo:return"Portal";case Qa:return t.displayName||"Context";case tx:return(t._context.displayName||"Context")+".Consumer";case fp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case dp:return e=t.displayName||null,e!==null?e:Pm(t.type)||"Memo";case wi:e=t._payload,t=t._init;try{return Pm(t(e))}catch{}}return null}var Wo=Array.isArray,Ce=Qb.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,yt=WS.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ur={pending:!1,data:null,method:null,action:null},Lm=[],Sl=-1;function Oa(t){return{current:t}}function Un(t){0>Sl||(t.current=Lm[Sl],Lm[Sl]=null,Sl--)}function Ft(t,e){Sl++,Lm[Sl]=t.current,t.current=e}var Na=Oa(null),Rc=Oa(null),Bi=Oa(null),Rh=Oa(null);function Ch(t,e){switch(Ft(Bi,e),Ft(Rc,t),Ft(Na,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?dv(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=dv(e),t=_T(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Un(Na),Ft(Na,t)}function Xl(){Un(Na),Un(Rc),Un(Bi)}function Um(t){t.memoizedState!==null&&Ft(Rh,t);var e=Na.current,n=_T(e,t.type);e!==n&&(Ft(Rc,t),Ft(Na,n))}function kh(t){Rc.current===t&&(Un(Na),Un(Rc)),Rh.current===t&&(Un(Rh),Uc._currentValue=Ur)}var Ad,oy;function kr(t){if(Ad===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Ad=e&&e[1]||"",oy=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ad+t+oy}var Nd=!1;function Rd(t,e){if(!t||Nd)return"";Nd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(e){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(y){var g=y}Reflect.construct(t,[],p)}else{try{p.call()}catch(y){g=y}t.call(p.prototype)}}else{try{throw Error()}catch(y){g=y}(p=t())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(y){if(y&&g&&typeof y.stack=="string")return[y.stack,g.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=s.DetermineComponentFrameRoot(),r=i[0],o=i[1];if(r&&o){var u=r.split(`
`),h=o.split(`
`);for(a=s=0;s<u.length&&!u[s].includes("DetermineComponentFrameRoot");)s++;for(;a<h.length&&!h[a].includes("DetermineComponentFrameRoot");)a++;if(s===u.length||a===h.length)for(s=u.length-1,a=h.length-1;1<=s&&0<=a&&u[s]!==h[a];)a--;for(;1<=s&&0<=a;s--,a--)if(u[s]!==h[a]){if(s!==1||a!==1)do if(s--,a--,0>a||u[s]!==h[a]){var d=`
`+u[s].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=s&&0<=a);break}}}finally{Nd=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?kr(n):""}function nw(t,e){switch(t.tag){case 26:case 27:case 5:return kr(t.type);case 16:return kr("Lazy");case 13:return t.child!==e&&e!==null?kr("Suspense Fallback"):kr("Suspense");case 19:return kr("SuspenseList");case 0:case 15:return Rd(t.type,!1);case 11:return Rd(t.type.render,!1);case 1:return Rd(t.type,!0);case 31:return kr("Activity");default:return""}}function cy(t){try{var e="",n=null;do e+=nw(t,n),n=t,t=t.return;while(t);return e}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var zm=Object.prototype.hasOwnProperty,mp=Mn.unstable_scheduleCallback,Cd=Mn.unstable_cancelCallback,sw=Mn.unstable_shouldYield,aw=Mn.unstable_requestPaint,Os=Mn.unstable_now,iw=Mn.unstable_getCurrentPriorityLevel,nx=Mn.unstable_ImmediatePriority,sx=Mn.unstable_UserBlockingPriority,Ih=Mn.unstable_NormalPriority,rw=Mn.unstable_LowPriority,ax=Mn.unstable_IdlePriority,lw=Mn.log,ow=Mn.unstable_setDisableYieldValue,Wc=null,Vs=null;function Oi(t){if(typeof lw=="function"&&ow(t),Vs&&typeof Vs.setStrictMode=="function")try{Vs.setStrictMode(Wc,t)}catch{}}var Ps=Math.clz32?Math.clz32:hw,cw=Math.log,uw=Math.LN2;function hw(t){return t>>>=0,t===0?32:31-(cw(t)/uw|0)|0}var Iu=256,Mu=262144,Du=4194304;function Ir(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Df(t,e,n){var s=t.pendingLanes;if(s===0)return 0;var a=0,i=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var o=s&134217727;return o!==0?(s=o&~i,s!==0?a=Ir(s):(r&=o,r!==0?a=Ir(r):n||(n=o&~t,n!==0&&(a=Ir(n))))):(o=s&~i,o!==0?a=Ir(o):r!==0?a=Ir(r):n||(n=s&~t,n!==0&&(a=Ir(n)))),a===0?0:e!==0&&e!==a&&!(e&i)&&(i=a&-a,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:a}function Jc(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function fw(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ix(){var t=Du;return Du<<=1,!(Du&62914560)&&(Du=4194304),t}function kd(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Zc(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function dw(t,e,n,s,a,i){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,u=t.expirationTimes,h=t.hiddenUpdates;for(n=r&~n;0<n;){var d=31-Ps(n),p=1<<d;o[d]=0,u[d]=-1;var g=h[d];if(g!==null)for(h[d]=null,d=0;d<g.length;d++){var y=g[d];y!==null&&(y.lane&=-536870913)}n&=~p}s!==0&&rx(t,s,0),i!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=i&~(r&~e))}function rx(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var s=31-Ps(e);t.entangledLanes|=e,t.entanglements[s]=t.entanglements[s]|1073741824|n&261930}function lx(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var s=31-Ps(n),a=1<<s;a&e|t[s]&e&&(t[s]|=e),n&=~a}}function ox(t,e){var n=e&-e;return n=n&42?1:pp(n),n&(t.suspendedLanes|e)?0:n}function pp(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function gp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function cx(){var t=yt.p;return t!==0?t:(t=window.event,t===void 0?32:MT(t.type))}function uy(t,e){var n=yt.p;try{return yt.p=t,e()}finally{yt.p=n}}var mr=Math.random().toString(36).slice(2),Fn="__reactFiber$"+mr,Es="__reactProps$"+mr,bo="__reactContainer$"+mr,Bm="__reactEvents$"+mr,mw="__reactListeners$"+mr,pw="__reactHandles$"+mr,hy="__reactResources$"+mr,eu="__reactMarker$"+mr;function yp(t){delete t[Fn],delete t[Es],delete t[Bm],delete t[mw],delete t[pw]}function wl(t){var e=t[Fn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[bo]||n[Fn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=vv(t);t!==null;){if(n=t[Fn])return n;t=vv(t)}return e}t=n,n=t.parentNode}return null}function xo(t){if(t=t[Fn]||t[bo]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Jo(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(G(33))}function Ll(t){var e=t[hy];return e||(e=t[hy]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Ln(t){t[eu]=!0}var ux=new Set,hx={};function sl(t,e){Wl(t,e),Wl(t+"Capture",e)}function Wl(t,e){for(hx[t]=e,t=0;t<e.length;t++)ux.add(e[t])}var gw=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),fy={},dy={};function yw(t){return zm.call(dy,t)?!0:zm.call(fy,t)?!1:gw.test(t)?dy[t]=!0:(fy[t]=!0,!1)}function Zu(t,e,n){if(yw(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var s=e.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function ju(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function $a(t,e,n,s){if(s===null)t.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+s)}}function Ys(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function fx(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function vw(t,e,n){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var a=s.get,i=s.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,i.call(this,r)}}),Object.defineProperty(t,e,{enumerable:s.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function $m(t){if(!t._valueTracker){var e=fx(t)?"checked":"value";t._valueTracker=vw(t,e,""+t[e])}}function dx(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),s="";return t&&(s=fx(t)?t.checked?"true":"false":t.value),t=s,t!==n?(e.setValue(t),!0):!1}function Mh(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var bw=/[\n"\\]/g;function Xs(t){return t.replace(bw,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function Fm(t,e,n,s,a,i,r,o){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Ys(e)):t.value!==""+Ys(e)&&(t.value=""+Ys(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?qm(t,r,Ys(e)):n!=null?qm(t,r,Ys(n)):s!=null&&t.removeAttribute("value"),a==null&&i!=null&&(t.defaultChecked=!!i),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+Ys(o):t.removeAttribute("name")}function mx(t,e,n,s,a,i,r,o){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){$m(t);return}n=n!=null?""+Ys(n):"",e=e!=null?""+Ys(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}s=s??a,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=o?t.checked:!!s,t.defaultChecked=!!s,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),$m(t)}function qm(t,e,n){e==="number"&&Mh(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Ul(t,e,n,s){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&s&&(t[n].defaultSelected=!0)}else{for(n=""+Ys(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,s&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function px(t,e,n){if(e!=null&&(e=""+Ys(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+Ys(n):""}function gx(t,e,n,s){if(e==null){if(s!=null){if(n!=null)throw Error(G(92));if(Wo(s)){if(1<s.length)throw Error(G(93));s=s[0]}n=s}n==null&&(n=""),e=n}n=Ys(e),t.defaultValue=n,s=t.textContent,s===n&&s!==""&&s!==null&&(t.value=s),$m(t)}function Jl(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var xw=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function my(t,e,n){var s=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?s?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":s?t.setProperty(e,n):typeof n!="number"||n===0||xw.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function yx(t,e,n){if(e!=null&&typeof e!="object")throw Error(G(62));if(t=t.style,n!=null){for(var s in n)!n.hasOwnProperty(s)||e!=null&&e.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="");for(var a in e)s=e[a],e.hasOwnProperty(a)&&n[a]!==s&&my(t,a,s)}else for(var i in e)e.hasOwnProperty(i)&&my(t,i,e[i])}function vp(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _w=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Tw=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function eh(t){return Tw.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Xa(){}var Hm=null;function bp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Al=null,zl=null;function py(t){var e=xo(t);if(e&&(t=e.stateNode)){var n=t[Es]||null;e:switch(t=e.stateNode,e.type){case"input":if(Fm(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Xs(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var s=n[e];if(s!==t&&s.form===t.form){var a=s[Es]||null;if(!a)throw Error(G(90));Fm(s,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)s=n[e],s.form===t.form&&dx(s)}break e;case"textarea":px(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&Ul(t,!!n.multiple,e,!1)}}}var Id=!1;function vx(t,e,n){if(Id)return t(e,n);Id=!0;try{var s=t(e);return s}finally{if(Id=!1,(Al!==null||zl!==null)&&(Hf(),Al&&(e=Al,t=zl,zl=Al=null,py(e),t)))for(e=0;e<t.length;e++)py(t[e])}}function Cc(t,e){var n=t.stateNode;if(n===null)return null;var s=n[Es]||null;if(s===null)return null;n=s[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(G(231,e,typeof n));return n}var ii=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Gm=!1;if(ii)try{var Bo={};Object.defineProperty(Bo,"passive",{get:function(){Gm=!0}}),window.addEventListener("test",Bo,Bo),window.removeEventListener("test",Bo,Bo)}catch{Gm=!1}var Vi=null,xp=null,th=null;function bx(){if(th)return th;var t,e=xp,n=e.length,s,a="value"in Vi?Vi.value:Vi.textContent,i=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(s=1;s<=r&&e[n-s]===a[i-s];s++);return th=a.slice(t,1<s?1-s:void 0)}function nh(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ou(){return!0}function gy(){return!1}function Ss(t){function e(n,s,a,i,r){this._reactName=n,this._targetInst=a,this.type=s,this.nativeEvent=i,this.target=r,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ou:gy,this.isPropagationStopped=gy,this}return Xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ou)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ou)},persist:function(){},isPersistent:Ou}),e}var al={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},jf=Ss(al),tu=Xt({},al,{view:0,detail:0}),Ew=Ss(tu),Md,Dd,$o,Of=Xt({},tu,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_p,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==$o&&($o&&t.type==="mousemove"?(Md=t.screenX-$o.screenX,Dd=t.screenY-$o.screenY):Dd=Md=0,$o=t),Md)},movementY:function(t){return"movementY"in t?t.movementY:Dd}}),yy=Ss(Of),Sw=Xt({},Of,{dataTransfer:0}),ww=Ss(Sw),Aw=Xt({},tu,{relatedTarget:0}),jd=Ss(Aw),Nw=Xt({},al,{animationName:0,elapsedTime:0,pseudoElement:0}),Rw=Ss(Nw),Cw=Xt({},al,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),kw=Ss(Cw),Iw=Xt({},al,{data:0}),vy=Ss(Iw),Mw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Dw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ow(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=jw[t])?!!e[t]:!1}function _p(){return Ow}var Vw=Xt({},tu,{key:function(t){if(t.key){var e=Mw[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=nh(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Dw[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_p,charCode:function(t){return t.type==="keypress"?nh(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?nh(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Pw=Ss(Vw),Lw=Xt({},Of,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),by=Ss(Lw),Uw=Xt({},tu,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_p}),zw=Ss(Uw),Bw=Xt({},al,{propertyName:0,elapsedTime:0,pseudoElement:0}),$w=Ss(Bw),Fw=Xt({},Of,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),qw=Ss(Fw),Hw=Xt({},al,{newState:0,oldState:0}),Gw=Ss(Hw),Yw=[9,13,27,32],Tp=ii&&"CompositionEvent"in window,lc=null;ii&&"documentMode"in document&&(lc=document.documentMode);var Kw=ii&&"TextEvent"in window&&!lc,xx=ii&&(!Tp||lc&&8<lc&&11>=lc),xy=String.fromCharCode(32),_y=!1;function _x(t,e){switch(t){case"keyup":return Yw.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Tx(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Nl=!1;function Qw(t,e){switch(t){case"compositionend":return Tx(e);case"keypress":return e.which!==32?null:(_y=!0,xy);case"textInput":return t=e.data,t===xy&&_y?null:t;default:return null}}function Xw(t,e){if(Nl)return t==="compositionend"||!Tp&&_x(t,e)?(t=bx(),th=xp=Vi=null,Nl=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return xx&&e.locale!=="ko"?null:e.data;default:return null}}var Ww={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ty(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Ww[t.type]:e==="textarea"}function Ex(t,e,n,s){Al?zl?zl.push(s):zl=[s]:Al=s,e=Xh(e,"onChange"),0<e.length&&(n=new jf("onChange","change",null,n,s),t.push({event:n,listeners:e}))}var oc=null,kc=null;function Jw(t){vT(t,0)}function Vf(t){var e=Jo(t);if(dx(e))return t}function Ey(t,e){if(t==="change")return e}var Sx=!1;if(ii){var Od;if(ii){var Vd="oninput"in document;if(!Vd){var Sy=document.createElement("div");Sy.setAttribute("oninput","return;"),Vd=typeof Sy.oninput=="function"}Od=Vd}else Od=!1;Sx=Od&&(!document.documentMode||9<document.documentMode)}function wy(){oc&&(oc.detachEvent("onpropertychange",wx),kc=oc=null)}function wx(t){if(t.propertyName==="value"&&Vf(kc)){var e=[];Ex(e,kc,t,bp(t)),vx(Jw,e)}}function Zw(t,e,n){t==="focusin"?(wy(),oc=e,kc=n,oc.attachEvent("onpropertychange",wx)):t==="focusout"&&wy()}function eA(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Vf(kc)}function tA(t,e){if(t==="click")return Vf(e)}function nA(t,e){if(t==="input"||t==="change")return Vf(e)}function sA(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Us=typeof Object.is=="function"?Object.is:sA;function Ic(t,e){if(Us(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),s=Object.keys(e);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var a=n[s];if(!zm.call(e,a)||!Us(t[a],e[a]))return!1}return!0}function Ay(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ny(t,e){var n=Ay(t);t=0;for(var s;n;){if(n.nodeType===3){if(s=t+n.textContent.length,t<=e&&s>=e)return{node:n,offset:e-t};t=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ay(n)}}function Ax(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Ax(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Nx(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Mh(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Mh(t.document)}return e}function Ep(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var aA=ii&&"documentMode"in document&&11>=document.documentMode,Rl=null,Ym=null,cc=null,Km=!1;function Ry(t,e,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Km||Rl==null||Rl!==Mh(s)||(s=Rl,"selectionStart"in s&&Ep(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),cc&&Ic(cc,s)||(cc=s,s=Xh(Ym,"onSelect"),0<s.length&&(e=new jf("onSelect","select",null,e,n),t.push({event:e,listeners:s}),e.target=Rl)))}function Rr(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Cl={animationend:Rr("Animation","AnimationEnd"),animationiteration:Rr("Animation","AnimationIteration"),animationstart:Rr("Animation","AnimationStart"),transitionrun:Rr("Transition","TransitionRun"),transitionstart:Rr("Transition","TransitionStart"),transitioncancel:Rr("Transition","TransitionCancel"),transitionend:Rr("Transition","TransitionEnd")},Pd={},Rx={};ii&&(Rx=document.createElement("div").style,"AnimationEvent"in window||(delete Cl.animationend.animation,delete Cl.animationiteration.animation,delete Cl.animationstart.animation),"TransitionEvent"in window||delete Cl.transitionend.transition);function il(t){if(Pd[t])return Pd[t];if(!Cl[t])return t;var e=Cl[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Rx)return Pd[t]=e[n];return t}var Cx=il("animationend"),kx=il("animationiteration"),Ix=il("animationstart"),iA=il("transitionrun"),rA=il("transitionstart"),lA=il("transitioncancel"),Mx=il("transitionend"),Dx=new Map,Qm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Qm.push("scrollEnd");function ga(t,e){Dx.set(t,e),sl(e,[t])}var Dh=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Gs=[],kl=0,Sp=0;function Pf(){for(var t=kl,e=Sp=kl=0;e<t;){var n=Gs[e];Gs[e++]=null;var s=Gs[e];Gs[e++]=null;var a=Gs[e];Gs[e++]=null;var i=Gs[e];if(Gs[e++]=null,s!==null&&a!==null){var r=s.pending;r===null?a.next=a:(a.next=r.next,r.next=a),s.pending=a}i!==0&&jx(n,a,i)}}function Lf(t,e,n,s){Gs[kl++]=t,Gs[kl++]=e,Gs[kl++]=n,Gs[kl++]=s,Sp|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function wp(t,e,n,s){return Lf(t,e,n,s),jh(t)}function rl(t,e){return Lf(t,null,null,e),jh(t)}function jx(t,e,n){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n);for(var a=!1,i=t.return;i!==null;)i.childLanes|=n,s=i.alternate,s!==null&&(s.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(a=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,a&&e!==null&&(a=31-Ps(n),t=i.hiddenUpdates,s=t[a],s===null?t[a]=[e]:s.push(e),e.lane=n|536870912),i):null}function jh(t){if(50<vc)throw vc=0,g0=null,Error(G(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Il={};function oA(t,e,n,s){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ms(t,e,n,s){return new oA(t,e,n,s)}function Ap(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ei(t,e){var n=t.alternate;return n===null?(n=Ms(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function Ox(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function sh(t,e,n,s,a,i){var r=0;if(s=t,typeof t=="function")Ap(t)&&(r=1);else if(typeof t=="string")r=d5(t,n,Na.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case Vm:return t=Ms(31,n,e,a),t.elementType=Vm,t.lanes=i,t;case El:return zr(n.children,a,i,e);case ex:r=8,a|=24;break;case Dm:return t=Ms(12,n,e,a|2),t.elementType=Dm,t.lanes=i,t;case jm:return t=Ms(13,n,e,a),t.elementType=jm,t.lanes=i,t;case Om:return t=Ms(19,n,e,a),t.elementType=Om,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Qa:r=10;break e;case tx:r=9;break e;case fp:r=11;break e;case dp:r=14;break e;case wi:r=16,s=null;break e}r=29,n=Error(G(130,t===null?"null":typeof t,"")),s=null}return e=Ms(r,n,e,a),e.elementType=t,e.type=s,e.lanes=i,e}function zr(t,e,n,s){return t=Ms(7,t,s,e),t.lanes=n,t}function Ld(t,e,n){return t=Ms(6,t,null,e),t.lanes=n,t}function Vx(t){var e=Ms(18,null,null,0);return e.stateNode=t,e}function Ud(t,e,n){return e=Ms(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Cy=new WeakMap;function Ws(t,e){if(typeof t=="object"&&t!==null){var n=Cy.get(t);return n!==void 0?n:(e={value:t,source:e,stack:cy(e)},Cy.set(t,e),e)}return{value:t,source:e,stack:cy(e)}}var Ml=[],Dl=0,Oh=null,Mc=0,Ks=[],Qs=0,nr=null,Sa=1,wa="";function Ya(t,e){Ml[Dl++]=Mc,Ml[Dl++]=Oh,Oh=t,Mc=e}function Px(t,e,n){Ks[Qs++]=Sa,Ks[Qs++]=wa,Ks[Qs++]=nr,nr=t;var s=Sa;t=wa;var a=32-Ps(s)-1;s&=~(1<<a),n+=1;var i=32-Ps(e)+a;if(30<i){var r=a-a%5;i=(s&(1<<r)-1).toString(32),s>>=r,a-=r,Sa=1<<32-Ps(e)+a|n<<a|s,wa=i+t}else Sa=1<<i|n<<a|s,wa=t}function Np(t){t.return!==null&&(Ya(t,1),Px(t,1,0))}function Rp(t){for(;t===Oh;)Oh=Ml[--Dl],Ml[Dl]=null,Mc=Ml[--Dl],Ml[Dl]=null;for(;t===nr;)nr=Ks[--Qs],Ks[Qs]=null,wa=Ks[--Qs],Ks[Qs]=null,Sa=Ks[--Qs],Ks[Qs]=null}function Lx(t,e){Ks[Qs++]=Sa,Ks[Qs++]=wa,Ks[Qs++]=nr,Sa=e.id,wa=e.overflow,nr=t}var qn=null,Yt=null,lt=!1,$i=null,Js=!1,Xm=Error(G(519));function sr(t){var e=Error(G(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Dc(Ws(e,t)),Xm}function ky(t){var e=t.stateNode,n=t.type,s=t.memoizedProps;switch(e[Fn]=t,e[Es]=s,n){case"dialog":et("cancel",e),et("close",e);break;case"iframe":case"object":case"embed":et("load",e);break;case"video":case"audio":for(n=0;n<Pc.length;n++)et(Pc[n],e);break;case"source":et("error",e);break;case"img":case"image":case"link":et("error",e),et("load",e);break;case"details":et("toggle",e);break;case"input":et("invalid",e),mx(e,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":et("invalid",e);break;case"textarea":et("invalid",e),gx(e,s.value,s.defaultValue,s.children)}n=s.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||s.suppressHydrationWarning===!0||xT(e.textContent,n)?(s.popover!=null&&(et("beforetoggle",e),et("toggle",e)),s.onScroll!=null&&et("scroll",e),s.onScrollEnd!=null&&et("scrollend",e),s.onClick!=null&&(e.onclick=Xa),e=!0):e=!1,e||sr(t,!0)}function Iy(t){for(qn=t.return;qn;)switch(qn.tag){case 5:case 31:case 13:Js=!1;return;case 27:case 3:Js=!0;return;default:qn=qn.return}}function dl(t){if(t!==qn)return!1;if(!lt)return Iy(t),lt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||_0(t.type,t.memoizedProps)),n=!n),n&&Yt&&sr(t),Iy(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(G(317));Yt=yv(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(G(317));Yt=yv(t)}else e===27?(e=Yt,pr(t.type)?(t=w0,w0=null,Yt=t):Yt=e):Yt=qn?ta(t.stateNode.nextSibling):null;return!0}function Gr(){Yt=qn=null,lt=!1}function zd(){var t=$i;return t!==null&&(bs===null?bs=t:bs.push.apply(bs,t),$i=null),t}function Dc(t){$i===null?$i=[t]:$i.push(t)}var Wm=Oa(null),ll=null,Wa=null;function Ni(t,e,n){Ft(Wm,e._currentValue),e._currentValue=n}function ti(t){t._currentValue=Wm.current,Un(Wm)}function Jm(t,e,n){for(;t!==null;){var s=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,s!==null&&(s.childLanes|=e)):s!==null&&(s.childLanes&e)!==e&&(s.childLanes|=e),t===n)break;t=t.return}}function Zm(t,e,n,s){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var i=a.dependencies;if(i!==null){var r=a.child;i=i.firstContext;e:for(;i!==null;){var o=i;i=a;for(var u=0;u<e.length;u++)if(o.context===e[u]){i.lanes|=n,o=i.alternate,o!==null&&(o.lanes|=n),Jm(i.return,n,t),s||(r=null);break e}i=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(G(341));r.lanes|=n,i=r.alternate,i!==null&&(i.lanes|=n),Jm(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function _o(t,e,n,s){t=null;for(var a=e,i=!1;a!==null;){if(!i){if(a.flags&524288)i=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(G(387));if(r=r.memoizedProps,r!==null){var o=a.type;Us(a.pendingProps.value,r.value)||(t!==null?t.push(o):t=[o])}}else if(a===Rh.current){if(r=a.alternate,r===null)throw Error(G(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Uc):t=[Uc])}a=a.return}t!==null&&Zm(e,t,n,s),e.flags|=262144}function Vh(t){for(t=t.firstContext;t!==null;){if(!Us(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Yr(t){ll=t,Wa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Gn(t){return Ux(ll,t)}function Vu(t,e){return ll===null&&Yr(t),Ux(t,e)}function Ux(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Wa===null){if(t===null)throw Error(G(308));Wa=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Wa=Wa.next=e;return n}var cA=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,s){t.push(s)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},uA=Mn.unstable_scheduleCallback,hA=Mn.unstable_NormalPriority,En={$$typeof:Qa,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Cp(){return{controller:new cA,data:new Map,refCount:0}}function nu(t){t.refCount--,t.refCount===0&&uA(hA,function(){t.controller.abort()})}var uc=null,e0=0,Zl=0,Bl=null;function fA(t,e){if(uc===null){var n=uc=[];e0=0,Zl=eg(),Bl={status:"pending",value:void 0,then:function(s){n.push(s)}}}return e0++,e.then(My,My),e}function My(){if(--e0===0&&uc!==null){Bl!==null&&(Bl.status="fulfilled");var t=uc;uc=null,Zl=0,Bl=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function dA(t,e){var n=[],s={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){s.status="fulfilled",s.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(s.status="rejected",s.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),s}var Dy=Ce.S;Ce.S=function(t,e){Z_=Os(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&fA(t,e),Dy!==null&&Dy(t,e)};var Br=Oa(null);function kp(){var t=Br.current;return t!==null?t:Ut.pooledCache}function ah(t,e){e===null?Ft(Br,Br.current):Ft(Br,e.pool)}function zx(){var t=kp();return t===null?null:{parent:En._currentValue,pool:t}}var To=Error(G(460)),Ip=Error(G(474)),Uf=Error(G(542)),Ph={then:function(){}};function jy(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Bx(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Xa,Xa),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Vy(t),t;default:if(typeof e.status=="string")e.then(Xa,Xa);else{if(t=Ut,t!==null&&100<t.shellSuspendCounter)throw Error(G(482));t=e,t.status="pending",t.then(function(s){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=s}},function(s){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=s}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Vy(t),t}throw $r=e,To}}function Mr(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?($r=n,To):n}}var $r=null;function Oy(){if($r===null)throw Error(G(459));var t=$r;return $r=null,t}function Vy(t){if(t===To||t===Uf)throw Error(G(483))}var $l=null,jc=0;function Pu(t){var e=jc;return jc+=1,$l===null&&($l=[]),Bx($l,t,e)}function Fo(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function Lu(t,e){throw e.$$typeof===ZS?Error(G(525)):(t=Object.prototype.toString.call(e),Error(G(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function $x(t){function e(x,b){if(t){var N=x.deletions;N===null?(x.deletions=[b],x.flags|=16):N.push(b)}}function n(x,b){if(!t)return null;for(;b!==null;)e(x,b),b=b.sibling;return null}function s(x){for(var b=new Map;x!==null;)x.key!==null?b.set(x.key,x):b.set(x.index,x),x=x.sibling;return b}function a(x,b){return x=ei(x,b),x.index=0,x.sibling=null,x}function i(x,b,N){return x.index=N,t?(N=x.alternate,N!==null?(N=N.index,N<b?(x.flags|=67108866,b):N):(x.flags|=67108866,b)):(x.flags|=1048576,b)}function r(x){return t&&x.alternate===null&&(x.flags|=67108866),x}function o(x,b,N,V){return b===null||b.tag!==6?(b=Ld(N,x.mode,V),b.return=x,b):(b=a(b,N),b.return=x,b)}function u(x,b,N,V){var U=N.type;return U===El?d(x,b,N.props.children,V,N.key):b!==null&&(b.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===wi&&Mr(U)===b.type)?(b=a(b,N.props),Fo(b,N),b.return=x,b):(b=sh(N.type,N.key,N.props,null,x.mode,V),Fo(b,N),b.return=x,b)}function h(x,b,N,V){return b===null||b.tag!==4||b.stateNode.containerInfo!==N.containerInfo||b.stateNode.implementation!==N.implementation?(b=Ud(N,x.mode,V),b.return=x,b):(b=a(b,N.children||[]),b.return=x,b)}function d(x,b,N,V,U){return b===null||b.tag!==7?(b=zr(N,x.mode,V,U),b.return=x,b):(b=a(b,N),b.return=x,b)}function p(x,b,N){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return b=Ld(""+b,x.mode,N),b.return=x,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ku:return N=sh(b.type,b.key,b.props,null,x.mode,N),Fo(N,b),N.return=x,N;case Xo:return b=Ud(b,x.mode,N),b.return=x,b;case wi:return b=Mr(b),p(x,b,N)}if(Wo(b)||zo(b))return b=zr(b,x.mode,N,null),b.return=x,b;if(typeof b.then=="function")return p(x,Pu(b),N);if(b.$$typeof===Qa)return p(x,Vu(x,b),N);Lu(x,b)}return null}function g(x,b,N,V){var U=b!==null?b.key:null;if(typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint")return U!==null?null:o(x,b,""+N,V);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case ku:return N.key===U?u(x,b,N,V):null;case Xo:return N.key===U?h(x,b,N,V):null;case wi:return N=Mr(N),g(x,b,N,V)}if(Wo(N)||zo(N))return U!==null?null:d(x,b,N,V,null);if(typeof N.then=="function")return g(x,b,Pu(N),V);if(N.$$typeof===Qa)return g(x,b,Vu(x,N),V);Lu(x,N)}return null}function y(x,b,N,V,U){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return x=x.get(N)||null,o(b,x,""+V,U);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case ku:return x=x.get(V.key===null?N:V.key)||null,u(b,x,V,U);case Xo:return x=x.get(V.key===null?N:V.key)||null,h(b,x,V,U);case wi:return V=Mr(V),y(x,b,N,V,U)}if(Wo(V)||zo(V))return x=x.get(N)||null,d(b,x,V,U,null);if(typeof V.then=="function")return y(x,b,N,Pu(V),U);if(V.$$typeof===Qa)return y(x,b,N,Vu(b,V),U);Lu(b,V)}return null}function R(x,b,N,V){for(var U=null,W=null,S=b,_=b=0,E=null;S!==null&&_<N.length;_++){S.index>_?(E=S,S=null):E=S.sibling;var A=g(x,S,N[_],V);if(A===null){S===null&&(S=E);break}t&&S&&A.alternate===null&&e(x,S),b=i(A,b,_),W===null?U=A:W.sibling=A,W=A,S=E}if(_===N.length)return n(x,S),lt&&Ya(x,_),U;if(S===null){for(;_<N.length;_++)S=p(x,N[_],V),S!==null&&(b=i(S,b,_),W===null?U=S:W.sibling=S,W=S);return lt&&Ya(x,_),U}for(S=s(S);_<N.length;_++)E=y(S,x,_,N[_],V),E!==null&&(t&&E.alternate!==null&&S.delete(E.key===null?_:E.key),b=i(E,b,_),W===null?U=E:W.sibling=E,W=E);return t&&S.forEach(function(w){return e(x,w)}),lt&&Ya(x,_),U}function I(x,b,N,V){if(N==null)throw Error(G(151));for(var U=null,W=null,S=b,_=b=0,E=null,A=N.next();S!==null&&!A.done;_++,A=N.next()){S.index>_?(E=S,S=null):E=S.sibling;var w=g(x,S,A.value,V);if(w===null){S===null&&(S=E);break}t&&S&&w.alternate===null&&e(x,S),b=i(w,b,_),W===null?U=w:W.sibling=w,W=w,S=E}if(A.done)return n(x,S),lt&&Ya(x,_),U;if(S===null){for(;!A.done;_++,A=N.next())A=p(x,A.value,V),A!==null&&(b=i(A,b,_),W===null?U=A:W.sibling=A,W=A);return lt&&Ya(x,_),U}for(S=s(S);!A.done;_++,A=N.next())A=y(S,x,_,A.value,V),A!==null&&(t&&A.alternate!==null&&S.delete(A.key===null?_:A.key),b=i(A,b,_),W===null?U=A:W.sibling=A,W=A);return t&&S.forEach(function(M){return e(x,M)}),lt&&Ya(x,_),U}function O(x,b,N,V){if(typeof N=="object"&&N!==null&&N.type===El&&N.key===null&&(N=N.props.children),typeof N=="object"&&N!==null){switch(N.$$typeof){case ku:e:{for(var U=N.key;b!==null;){if(b.key===U){if(U=N.type,U===El){if(b.tag===7){n(x,b.sibling),V=a(b,N.props.children),V.return=x,x=V;break e}}else if(b.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===wi&&Mr(U)===b.type){n(x,b.sibling),V=a(b,N.props),Fo(V,N),V.return=x,x=V;break e}n(x,b);break}else e(x,b);b=b.sibling}N.type===El?(V=zr(N.props.children,x.mode,V,N.key),V.return=x,x=V):(V=sh(N.type,N.key,N.props,null,x.mode,V),Fo(V,N),V.return=x,x=V)}return r(x);case Xo:e:{for(U=N.key;b!==null;){if(b.key===U)if(b.tag===4&&b.stateNode.containerInfo===N.containerInfo&&b.stateNode.implementation===N.implementation){n(x,b.sibling),V=a(b,N.children||[]),V.return=x,x=V;break e}else{n(x,b);break}else e(x,b);b=b.sibling}V=Ud(N,x.mode,V),V.return=x,x=V}return r(x);case wi:return N=Mr(N),O(x,b,N,V)}if(Wo(N))return R(x,b,N,V);if(zo(N)){if(U=zo(N),typeof U!="function")throw Error(G(150));return N=U.call(N),I(x,b,N,V)}if(typeof N.then=="function")return O(x,b,Pu(N),V);if(N.$$typeof===Qa)return O(x,b,Vu(x,N),V);Lu(x,N)}return typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint"?(N=""+N,b!==null&&b.tag===6?(n(x,b.sibling),V=a(b,N),V.return=x,x=V):(n(x,b),V=Ld(N,x.mode,V),V.return=x,x=V),r(x)):n(x,b)}return function(x,b,N,V){try{jc=0;var U=O(x,b,N,V);return $l=null,U}catch(S){if(S===To||S===Uf)throw S;var W=Ms(29,S,null,x.mode);return W.lanes=V,W.return=x,W}finally{}}}var Kr=$x(!0),Fx=$x(!1),Ai=!1;function Mp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function t0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Fi(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function qi(t,e,n){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,gt&2){var a=s.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),s.pending=e,e=jh(t),jx(t,null,n),e}return Lf(t,s,e,n),jh(t)}function hc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,lx(t,n)}}function Bd(t,e){var n=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?a=i=r:i=i.next=r,n=n.next}while(n!==null);i===null?a=i=e:i=i.next=e}else a=i=e;n={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:s.shared,callbacks:s.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var n0=!1;function fc(){if(n0){var t=Bl;if(t!==null)throw t}}function dc(t,e,n,s){n0=!1;var a=t.updateQueue;Ai=!1;var i=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var u=o,h=u.next;u.next=null,r===null?i=h:r.next=h,r=u;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=h:o.next=h,d.lastBaseUpdate=u))}if(i!==null){var p=a.baseState;r=0,d=h=u=null,o=i;do{var g=o.lane&-536870913,y=g!==o.lane;if(y?(it&g)===g:(s&g)===g){g!==0&&g===Zl&&(n0=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var R=t,I=o;g=e;var O=n;switch(I.tag){case 1:if(R=I.payload,typeof R=="function"){p=R.call(O,p,g);break e}p=R;break e;case 3:R.flags=R.flags&-65537|128;case 0:if(R=I.payload,g=typeof R=="function"?R.call(O,p,g):R,g==null)break e;p=Xt({},p,g);break e;case 2:Ai=!0}}g=o.callback,g!==null&&(t.flags|=64,y&&(t.flags|=8192),y=a.callbacks,y===null?a.callbacks=[g]:y.push(g))}else y={lane:g,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(h=d=y,u=p):d=d.next=y,r|=g;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;y=o,o=y.next,y.next=null,a.lastBaseUpdate=y,a.shared.pending=null}}while(1);d===null&&(u=p),a.baseState=u,a.firstBaseUpdate=h,a.lastBaseUpdate=d,i===null&&(a.shared.lanes=0),ir|=r,t.lanes=r,t.memoizedState=p}}function qx(t,e){if(typeof t!="function")throw Error(G(191,t));t.call(e)}function Hx(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)qx(n[t],e)}var eo=Oa(null),Lh=Oa(0);function Py(t,e){t=ci,Ft(Lh,t),Ft(eo,e),ci=t|e.baseLanes}function s0(){Ft(Lh,ci),Ft(eo,eo.current)}function Dp(){ci=Lh.current,Un(eo),Un(Lh)}var zs=Oa(null),ea=null;function Ri(t){var e=t.alternate;Ft(gn,gn.current&1),Ft(zs,t),ea===null&&(e===null||eo.current!==null||e.memoizedState!==null)&&(ea=t)}function a0(t){Ft(gn,gn.current),Ft(zs,t),ea===null&&(ea=t)}function Gx(t){t.tag===22?(Ft(gn,gn.current),Ft(zs,t),ea===null&&(ea=t)):Ci()}function Ci(){Ft(gn,gn.current),Ft(zs,zs.current)}function Is(t){Un(zs),ea===t&&(ea=null),Un(gn)}var gn=Oa(0);function Uh(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||E0(n)||S0(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ri=0,Ge=null,Mt=null,_n=null,zh=!1,Fl=!1,Qr=!1,Bh=0,Oc=0,ql=null,mA=0;function fn(){throw Error(G(321))}function jp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Us(t[n],e[n]))return!1;return!0}function Op(t,e,n,s,a,i){return ri=i,Ge=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ce.H=t===null||t.memoizedState===null?E_:Gp,Qr=!1,i=n(s,a),Qr=!1,Fl&&(i=Kx(e,n,s,a)),Yx(t),i}function Yx(t){Ce.H=Vc;var e=Mt!==null&&Mt.next!==null;if(ri=0,_n=Mt=Ge=null,zh=!1,Oc=0,ql=null,e)throw Error(G(300));t===null||wn||(t=t.dependencies,t!==null&&Vh(t)&&(wn=!0))}function Kx(t,e,n,s){Ge=t;var a=0;do{if(Fl&&(ql=null),Oc=0,Fl=!1,25<=a)throw Error(G(301));if(a+=1,_n=Mt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}Ce.H=S_,i=e(n,s)}while(Fl);return i}function pA(){var t=Ce.H,e=t.useState()[0];return e=typeof e.then=="function"?su(e):e,t=t.useState()[0],(Mt!==null?Mt.memoizedState:null)!==t&&(Ge.flags|=1024),e}function Vp(){var t=Bh!==0;return Bh=0,t}function Pp(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function Lp(t){if(zh){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}zh=!1}ri=0,_n=Mt=Ge=null,Fl=!1,Oc=Bh=0,ql=null}function us(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _n===null?Ge.memoizedState=_n=t:_n=_n.next=t,_n}function yn(){if(Mt===null){var t=Ge.alternate;t=t!==null?t.memoizedState:null}else t=Mt.next;var e=_n===null?Ge.memoizedState:_n.next;if(e!==null)_n=e,Mt=t;else{if(t===null)throw Ge.alternate===null?Error(G(467)):Error(G(310));Mt=t,t={memoizedState:Mt.memoizedState,baseState:Mt.baseState,baseQueue:Mt.baseQueue,queue:Mt.queue,next:null},_n===null?Ge.memoizedState=_n=t:_n=_n.next=t}return _n}function zf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function su(t){var e=Oc;return Oc+=1,ql===null&&(ql=[]),t=Bx(ql,t,e),e=Ge,(_n===null?e.memoizedState:_n.next)===null&&(e=e.alternate,Ce.H=e===null||e.memoizedState===null?E_:Gp),t}function Bf(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return su(t);if(t.$$typeof===Qa)return Gn(t)}throw Error(G(438,String(t)))}function Up(t){var e=null,n=Ge.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var s=Ge.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(e={data:s.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=zf(),Ge.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),s=0;s<t;s++)n[s]=ew;return e.index++,n}function li(t,e){return typeof e=="function"?e(t):e}function ih(t){var e=yn();return zp(e,Mt,t)}function zp(t,e,n){var s=t.queue;if(s===null)throw Error(G(311));s.lastRenderedReducer=n;var a=t.baseQueue,i=s.pending;if(i!==null){if(a!==null){var r=a.next;a.next=i.next,i.next=r}e.baseQueue=a=i,s.pending=null}if(i=t.baseState,a===null)t.memoizedState=i;else{e=a.next;var o=r=null,u=null,h=e,d=!1;do{var p=h.lane&-536870913;if(p!==h.lane?(it&p)===p:(ri&p)===p){var g=h.revertLane;if(g===0)u!==null&&(u=u.next={lane:0,revertLane:0,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),p===Zl&&(d=!0);else if((ri&g)===g){h=h.next,g===Zl&&(d=!0);continue}else p={lane:0,revertLane:h.revertLane,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},u===null?(o=u=p,r=i):u=u.next=p,Ge.lanes|=g,ir|=g;p=h.action,Qr&&n(i,p),i=h.hasEagerState?h.eagerState:n(i,p)}else g={lane:p,revertLane:h.revertLane,gesture:h.gesture,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},u===null?(o=u=g,r=i):u=u.next=g,Ge.lanes|=p,ir|=p;h=h.next}while(h!==null&&h!==e);if(u===null?r=i:u.next=o,!Us(i,t.memoizedState)&&(wn=!0,d&&(n=Bl,n!==null)))throw n;t.memoizedState=i,t.baseState=r,t.baseQueue=u,s.lastRenderedState=i}return a===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function $d(t){var e=yn(),n=e.queue;if(n===null)throw Error(G(311));n.lastRenderedReducer=t;var s=n.dispatch,a=n.pending,i=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do i=t(i,r.action),r=r.next;while(r!==a);Us(i,e.memoizedState)||(wn=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,s]}function Qx(t,e,n){var s=Ge,a=yn(),i=lt;if(i){if(n===void 0)throw Error(G(407));n=n()}else n=e();var r=!Us((Mt||a).memoizedState,n);if(r&&(a.memoizedState=n,wn=!0),a=a.queue,Bp(Jx.bind(null,s,a,t),[t]),a.getSnapshot!==e||r||_n!==null&&_n.memoizedState.tag&1){if(s.flags|=2048,to(9,{destroy:void 0},Wx.bind(null,s,a,n,e),null),Ut===null)throw Error(G(349));i||ri&127||Xx(s,e,n)}return n}function Xx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ge.updateQueue,e===null?(e=zf(),Ge.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Wx(t,e,n,s){e.value=n,e.getSnapshot=s,Zx(e)&&e_(t)}function Jx(t,e,n){return n(function(){Zx(e)&&e_(t)})}function Zx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Us(t,n)}catch{return!0}}function e_(t){var e=rl(t,2);e!==null&&Ts(e,t,2)}function i0(t){var e=us();if(typeof t=="function"){var n=t;if(t=n(),Qr){Oi(!0);try{n()}finally{Oi(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:li,lastRenderedState:t},e}function t_(t,e,n,s){return t.baseState=n,zp(t,Mt,typeof s=="function"?s:li)}function gA(t,e,n,s,a){if(Ff(t))throw Error(G(485));if(t=e.action,t!==null){var i={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){i.listeners.push(r)}};Ce.T!==null?n(!0):i.isTransition=!1,s(i),n=e.pending,n===null?(i.next=e.pending=i,n_(e,i)):(i.next=n.next,e.pending=n.next=i)}}function n_(t,e){var n=e.action,s=e.payload,a=t.state;if(e.isTransition){var i=Ce.T,r={};Ce.T=r;try{var o=n(a,s),u=Ce.S;u!==null&&u(r,o),Ly(t,e,o)}catch(h){r0(t,e,h)}finally{i!==null&&r.types!==null&&(i.types=r.types),Ce.T=i}}else try{i=n(a,s),Ly(t,e,i)}catch(h){r0(t,e,h)}}function Ly(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(s){Uy(t,e,s)},function(s){return r0(t,e,s)}):Uy(t,e,n)}function Uy(t,e,n){e.status="fulfilled",e.value=n,s_(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,n_(t,n)))}function r0(t,e,n){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do e.status="rejected",e.reason=n,s_(e),e=e.next;while(e!==s)}t.action=null}function s_(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function a_(t,e){return e}function zy(t,e){if(lt){var n=Ut.formState;if(n!==null){e:{var s=Ge;if(lt){if(Yt){t:{for(var a=Yt,i=Js;a.nodeType!==8;){if(!i){a=null;break t}if(a=ta(a.nextSibling),a===null){a=null;break t}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){Yt=ta(a.nextSibling),s=a.data==="F!";break e}}sr(s)}s=!1}s&&(e=n[0])}}return n=us(),n.memoizedState=n.baseState=e,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:a_,lastRenderedState:e},n.queue=s,n=x_.bind(null,Ge,s),s.dispatch=n,s=i0(!1),i=Hp.bind(null,Ge,!1,s.queue),s=us(),a={state:e,dispatch:null,action:t,pending:null},s.queue=a,n=gA.bind(null,Ge,a,i,n),a.dispatch=n,s.memoizedState=t,[e,n,!1]}function By(t){var e=yn();return i_(e,Mt,t)}function i_(t,e,n){if(e=zp(t,e,a_)[0],t=ih(li)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var s=su(e)}catch(r){throw r===To?Uf:r}else s=e;e=yn();var a=e.queue,i=a.dispatch;return n!==e.memoizedState&&(Ge.flags|=2048,to(9,{destroy:void 0},yA.bind(null,a,n),null)),[s,i,t]}function yA(t,e){t.action=e}function $y(t){var e=yn(),n=Mt;if(n!==null)return i_(e,n,t);yn(),e=e.memoizedState,n=yn();var s=n.queue.dispatch;return n.memoizedState=t,[e,s,!1]}function to(t,e,n,s){return t={tag:t,create:n,deps:s,inst:e,next:null},e=Ge.updateQueue,e===null&&(e=zf(),Ge.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(s=n.next,n.next=t,t.next=s,e.lastEffect=t),t}function r_(){return yn().memoizedState}function rh(t,e,n,s){var a=us();Ge.flags|=t,a.memoizedState=to(1|e,{destroy:void 0},n,s===void 0?null:s)}function $f(t,e,n,s){var a=yn();s=s===void 0?null:s;var i=a.memoizedState.inst;Mt!==null&&s!==null&&jp(s,Mt.memoizedState.deps)?a.memoizedState=to(e,i,n,s):(Ge.flags|=t,a.memoizedState=to(1|e,i,n,s))}function Fy(t,e){rh(8390656,8,t,e)}function Bp(t,e){$f(2048,8,t,e)}function vA(t){Ge.flags|=4;var e=Ge.updateQueue;if(e===null)e=zf(),Ge.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function l_(t){var e=yn().memoizedState;return vA({ref:e,nextImpl:t}),function(){if(gt&2)throw Error(G(440));return e.impl.apply(void 0,arguments)}}function o_(t,e){return $f(4,2,t,e)}function c_(t,e){return $f(4,4,t,e)}function u_(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function h_(t,e,n){n=n!=null?n.concat([t]):null,$f(4,4,u_.bind(null,e,t),n)}function $p(){}function f_(t,e){var n=yn();e=e===void 0?null:e;var s=n.memoizedState;return e!==null&&jp(e,s[1])?s[0]:(n.memoizedState=[t,e],t)}function d_(t,e){var n=yn();e=e===void 0?null:e;var s=n.memoizedState;if(e!==null&&jp(e,s[1]))return s[0];if(s=t(),Qr){Oi(!0);try{t()}finally{Oi(!1)}}return n.memoizedState=[s,e],s}function Fp(t,e,n){return n===void 0||ri&1073741824&&!(it&261930)?t.memoizedState=e:(t.memoizedState=n,t=tT(),Ge.lanes|=t,ir|=t,n)}function m_(t,e,n,s){return Us(n,e)?n:eo.current!==null?(t=Fp(t,n,s),Us(t,e)||(wn=!0),t):!(ri&42)||ri&1073741824&&!(it&261930)?(wn=!0,t.memoizedState=n):(t=tT(),Ge.lanes|=t,ir|=t,e)}function p_(t,e,n,s,a){var i=yt.p;yt.p=i!==0&&8>i?i:8;var r=Ce.T,o={};Ce.T=o,Hp(t,!1,e,n);try{var u=a(),h=Ce.S;if(h!==null&&h(o,u),u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=dA(u,s);mc(t,e,d,Ls(t))}else mc(t,e,s,Ls(t))}catch(p){mc(t,e,{then:function(){},status:"rejected",reason:p},Ls())}finally{yt.p=i,r!==null&&o.types!==null&&(r.types=o.types),Ce.T=r}}function bA(){}function l0(t,e,n,s){if(t.tag!==5)throw Error(G(476));var a=g_(t).queue;p_(t,a,e,Ur,n===null?bA:function(){return y_(t),n(s)})}function g_(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Ur,baseState:Ur,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:li,lastRenderedState:Ur},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:li,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function y_(t){var e=g_(t);e.next===null&&(e=t.alternate.memoizedState),mc(t,e.next.queue,{},Ls())}function qp(){return Gn(Uc)}function v_(){return yn().memoizedState}function b_(){return yn().memoizedState}function xA(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=Ls();t=Fi(n);var s=qi(e,t,n);s!==null&&(Ts(s,e,n),hc(s,e,n)),e={cache:Cp()},t.payload=e;return}e=e.return}}function _A(t,e,n){var s=Ls();n={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ff(t)?__(e,n):(n=wp(t,e,n,s),n!==null&&(Ts(n,t,s),T_(n,e,s)))}function x_(t,e,n){var s=Ls();mc(t,e,n,s)}function mc(t,e,n,s){var a={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ff(t))__(e,a);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var r=e.lastRenderedState,o=i(r,n);if(a.hasEagerState=!0,a.eagerState=o,Us(o,r))return Lf(t,e,a,0),Ut===null&&Pf(),!1}catch{}finally{}if(n=wp(t,e,a,s),n!==null)return Ts(n,t,s),T_(n,e,s),!0}return!1}function Hp(t,e,n,s){if(s={lane:2,revertLane:eg(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Ff(t)){if(e)throw Error(G(479))}else e=wp(t,n,s,2),e!==null&&Ts(e,t,2)}function Ff(t){var e=t.alternate;return t===Ge||e!==null&&e===Ge}function __(t,e){Fl=zh=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function T_(t,e,n){if(n&4194048){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,lx(t,n)}}var Vc={readContext:Gn,use:Bf,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useLayoutEffect:fn,useInsertionEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useSyncExternalStore:fn,useId:fn,useHostTransitionStatus:fn,useFormState:fn,useActionState:fn,useOptimistic:fn,useMemoCache:fn,useCacheRefresh:fn};Vc.useEffectEvent=fn;var E_={readContext:Gn,use:Bf,useCallback:function(t,e){return us().memoizedState=[t,e===void 0?null:e],t},useContext:Gn,useEffect:Fy,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,rh(4194308,4,u_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return rh(4194308,4,t,e)},useInsertionEffect:function(t,e){rh(4,2,t,e)},useMemo:function(t,e){var n=us();e=e===void 0?null:e;var s=t();if(Qr){Oi(!0);try{t()}finally{Oi(!1)}}return n.memoizedState=[s,e],s},useReducer:function(t,e,n){var s=us();if(n!==void 0){var a=n(e);if(Qr){Oi(!0);try{n(e)}finally{Oi(!1)}}}else a=e;return s.memoizedState=s.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},s.queue=t,t=t.dispatch=_A.bind(null,Ge,t),[s.memoizedState,t]},useRef:function(t){var e=us();return t={current:t},e.memoizedState=t},useState:function(t){t=i0(t);var e=t.queue,n=x_.bind(null,Ge,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:$p,useDeferredValue:function(t,e){var n=us();return Fp(n,t,e)},useTransition:function(){var t=i0(!1);return t=p_.bind(null,Ge,t.queue,!0,!1),us().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var s=Ge,a=us();if(lt){if(n===void 0)throw Error(G(407));n=n()}else{if(n=e(),Ut===null)throw Error(G(349));it&127||Xx(s,e,n)}a.memoizedState=n;var i={value:n,getSnapshot:e};return a.queue=i,Fy(Jx.bind(null,s,i,t),[t]),s.flags|=2048,to(9,{destroy:void 0},Wx.bind(null,s,i,n,e),null),n},useId:function(){var t=us(),e=Ut.identifierPrefix;if(lt){var n=wa,s=Sa;n=(s&~(1<<32-Ps(s)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Bh++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=mA++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:qp,useFormState:zy,useActionState:zy,useOptimistic:function(t){var e=us();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Hp.bind(null,Ge,!0,n),n.dispatch=e,[t,e]},useMemoCache:Up,useCacheRefresh:function(){return us().memoizedState=xA.bind(null,Ge)},useEffectEvent:function(t){var e=us(),n={impl:t};return e.memoizedState=n,function(){if(gt&2)throw Error(G(440));return n.impl.apply(void 0,arguments)}}},Gp={readContext:Gn,use:Bf,useCallback:f_,useContext:Gn,useEffect:Bp,useImperativeHandle:h_,useInsertionEffect:o_,useLayoutEffect:c_,useMemo:d_,useReducer:ih,useRef:r_,useState:function(){return ih(li)},useDebugValue:$p,useDeferredValue:function(t,e){var n=yn();return m_(n,Mt.memoizedState,t,e)},useTransition:function(){var t=ih(li)[0],e=yn().memoizedState;return[typeof t=="boolean"?t:su(t),e]},useSyncExternalStore:Qx,useId:v_,useHostTransitionStatus:qp,useFormState:By,useActionState:By,useOptimistic:function(t,e){var n=yn();return t_(n,Mt,t,e)},useMemoCache:Up,useCacheRefresh:b_};Gp.useEffectEvent=l_;var S_={readContext:Gn,use:Bf,useCallback:f_,useContext:Gn,useEffect:Bp,useImperativeHandle:h_,useInsertionEffect:o_,useLayoutEffect:c_,useMemo:d_,useReducer:$d,useRef:r_,useState:function(){return $d(li)},useDebugValue:$p,useDeferredValue:function(t,e){var n=yn();return Mt===null?Fp(n,t,e):m_(n,Mt.memoizedState,t,e)},useTransition:function(){var t=$d(li)[0],e=yn().memoizedState;return[typeof t=="boolean"?t:su(t),e]},useSyncExternalStore:Qx,useId:v_,useHostTransitionStatus:qp,useFormState:$y,useActionState:$y,useOptimistic:function(t,e){var n=yn();return Mt!==null?t_(n,Mt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:Up,useCacheRefresh:b_};S_.useEffectEvent=l_;function Fd(t,e,n,s){e=t.memoizedState,n=n(s,e),n=n==null?e:Xt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var o0={enqueueSetState:function(t,e,n){t=t._reactInternals;var s=Ls(),a=Fi(s);a.payload=e,n!=null&&(a.callback=n),e=qi(t,a,s),e!==null&&(Ts(e,t,s),hc(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var s=Ls(),a=Fi(s);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=qi(t,a,s),e!==null&&(Ts(e,t,s),hc(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Ls(),s=Fi(n);s.tag=2,e!=null&&(s.callback=e),e=qi(t,s,n),e!==null&&(Ts(e,t,n),hc(e,t,n))}};function qy(t,e,n,s,a,i,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,i,r):e.prototype&&e.prototype.isPureReactComponent?!Ic(n,s)||!Ic(a,i):!0}function Hy(t,e,n,s){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,s),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,s),e.state!==t&&o0.enqueueReplaceState(e,e.state,null)}function Xr(t,e){var n=e;if("ref"in e){n={};for(var s in e)s!=="ref"&&(n[s]=e[s])}if(t=t.defaultProps){n===e&&(n=Xt({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function w_(t){Dh(t)}function A_(t){console.error(t)}function N_(t){Dh(t)}function $h(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(s){setTimeout(function(){throw s})}}function Gy(t,e,n){try{var s=t.onCaughtError;s(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function c0(t,e,n){return n=Fi(n),n.tag=3,n.payload={element:null},n.callback=function(){$h(t,e)},n}function R_(t){return t=Fi(t),t.tag=3,t}function C_(t,e,n,s){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=s.value;t.payload=function(){return a(i)},t.callback=function(){Gy(e,n,s)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){Gy(e,n,s),typeof a!="function"&&(Hi===null?Hi=new Set([this]):Hi.add(this));var o=s.stack;this.componentDidCatch(s.value,{componentStack:o!==null?o:""})})}function TA(t,e,n,s,a){if(n.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(e=n.alternate,e!==null&&_o(e,n,a,!0),n=zs.current,n!==null){switch(n.tag){case 31:case 13:return ea===null?Yh():n.alternate===null&&dn===0&&(dn=3),n.flags&=-257,n.flags|=65536,n.lanes=a,s===Ph?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([s]):e.add(s),em(t,s,a)),!1;case 22:return n.flags|=65536,s===Ph?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([s])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([s]):n.add(s)),em(t,s,a)),!1}throw Error(G(435,n.tag))}return em(t,s,a),Yh(),!1}if(lt)return e=zs.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,s!==Xm&&(t=Error(G(422),{cause:s}),Dc(Ws(t,n)))):(s!==Xm&&(e=Error(G(423),{cause:s}),Dc(Ws(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,s=Ws(s,n),a=c0(t.stateNode,s,a),Bd(t,a),dn!==4&&(dn=2)),!1;var i=Error(G(520),{cause:s});if(i=Ws(i,n),yc===null?yc=[i]:yc.push(i),dn!==4&&(dn=2),e===null)return!0;s=Ws(s,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=c0(n.stateNode,s,t),Bd(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Hi===null||!Hi.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,a=R_(a),C_(a,t,n,s),Bd(n,a),!1}n=n.return}while(n!==null);return!1}var Yp=Error(G(461)),wn=!1;function Bn(t,e,n,s){e.child=t===null?Fx(e,null,n,s):Kr(e,t.child,n,s)}function Yy(t,e,n,s,a){n=n.render;var i=e.ref;if("ref"in s){var r={};for(var o in s)o!=="ref"&&(r[o]=s[o])}else r=s;return Yr(e),s=Op(t,e,n,r,i,a),o=Vp(),t!==null&&!wn?(Pp(t,e,a),oi(t,e,a)):(lt&&o&&Np(e),e.flags|=1,Bn(t,e,s,a),e.child)}function Ky(t,e,n,s,a){if(t===null){var i=n.type;return typeof i=="function"&&!Ap(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,k_(t,e,i,s,a)):(t=sh(n.type,null,s,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Kp(t,a)){var r=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ic,n(r,s)&&t.ref===e.ref)return oi(t,e,a)}return e.flags|=1,t=ei(i,s),t.ref=e.ref,t.return=e,e.child=t}function k_(t,e,n,s,a){if(t!==null){var i=t.memoizedProps;if(Ic(i,s)&&t.ref===e.ref)if(wn=!1,e.pendingProps=s=i,Kp(t,a))t.flags&131072&&(wn=!0);else return e.lanes=t.lanes,oi(t,e,a)}return u0(t,e,n,s,a)}function I_(t,e,n,s){var a=s.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if(e.flags&128){if(i=i!==null?i.baseLanes|n:n,t!==null){for(s=e.child=t.child,a=0;s!==null;)a=a|s.lanes|s.childLanes,s=s.sibling;s=a&~i}else s=0,e.child=null;return Qy(t,e,i,n,s)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ah(e,i!==null?i.cachePool:null),i!==null?Py(e,i):s0(),Gx(e);else return s=e.lanes=536870912,Qy(t,e,i!==null?i.baseLanes|n:n,n,s)}else i!==null?(ah(e,i.cachePool),Py(e,i),Ci(),e.memoizedState=null):(t!==null&&ah(e,null),s0(),Ci());return Bn(t,e,a,n),e.child}function Zo(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Qy(t,e,n,s,a){var i=kp();return i=i===null?null:{parent:En._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ah(e,null),s0(),Gx(e),t!==null&&_o(t,e,s,!0),e.childLanes=a,null}function lh(t,e){return e=Fh({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Xy(t,e,n){return Kr(e,t.child,null,n),t=lh(e,e.pendingProps),t.flags|=2,Is(e),e.memoizedState=null,t}function EA(t,e,n){var s=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(lt){if(s.mode==="hidden")return t=lh(e,s),e.lanes=536870912,Zo(null,t);if(a0(e),(t=Yt)?(t=ET(t,Js),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:nr!==null?{id:Sa,overflow:wa}:null,retryLane:536870912,hydrationErrors:null},n=Vx(t),n.return=e,e.child=n,qn=e,Yt=null)):t=null,t===null)throw sr(e);return e.lanes=536870912,null}return lh(e,s)}var i=t.memoizedState;if(i!==null){var r=i.dehydrated;if(a0(e),a)if(e.flags&256)e.flags&=-257,e=Xy(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(G(558));else if(wn||_o(t,e,n,!1),a=(n&t.childLanes)!==0,wn||a){if(s=Ut,s!==null&&(r=ox(s,n),r!==0&&r!==i.retryLane))throw i.retryLane=r,rl(t,r),Ts(s,t,r),Yp;Yh(),e=Xy(t,e,n)}else t=i.treeContext,Yt=ta(r.nextSibling),qn=e,lt=!0,$i=null,Js=!1,t!==null&&Lx(e,t),e=lh(e,s),e.flags|=4096;return e}return t=ei(t.child,{mode:s.mode,children:s.children}),t.ref=e.ref,e.child=t,t.return=e,t}function oh(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(G(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function u0(t,e,n,s,a){return Yr(e),n=Op(t,e,n,s,void 0,a),s=Vp(),t!==null&&!wn?(Pp(t,e,a),oi(t,e,a)):(lt&&s&&Np(e),e.flags|=1,Bn(t,e,n,a),e.child)}function Wy(t,e,n,s,a,i){return Yr(e),e.updateQueue=null,n=Kx(e,s,n,a),Yx(t),s=Vp(),t!==null&&!wn?(Pp(t,e,i),oi(t,e,i)):(lt&&s&&Np(e),e.flags|=1,Bn(t,e,n,i),e.child)}function Jy(t,e,n,s,a){if(Yr(e),e.stateNode===null){var i=Il,r=n.contextType;typeof r=="object"&&r!==null&&(i=Gn(r)),i=new n(s,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=o0,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=s,i.state=e.memoizedState,i.refs={},Mp(e),r=n.contextType,i.context=typeof r=="object"&&r!==null?Gn(r):Il,i.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Fd(e,n,r,s),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(r=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),r!==i.state&&o0.enqueueReplaceState(i,i.state,null),dc(e,s,i,a),fc(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),s=!0}else if(t===null){i=e.stateNode;var o=e.memoizedProps,u=Xr(n,o);i.props=u;var h=i.context,d=n.contextType;r=Il,typeof d=="object"&&d!==null&&(r=Gn(d));var p=n.getDerivedStateFromProps;d=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,d||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o||h!==r)&&Hy(e,i,s,r),Ai=!1;var g=e.memoizedState;i.state=g,dc(e,s,i,a),fc(),h=e.memoizedState,o||g!==h||Ai?(typeof p=="function"&&(Fd(e,n,p,s),h=e.memoizedState),(u=Ai||qy(e,n,u,s,g,h,r))?(d||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=s,e.memoizedState=h),i.props=s,i.state=h,i.context=r,s=u):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),s=!1)}else{i=e.stateNode,t0(t,e),r=e.memoizedProps,d=Xr(n,r),i.props=d,p=e.pendingProps,g=i.context,h=n.contextType,u=Il,typeof h=="object"&&h!==null&&(u=Gn(h)),o=n.getDerivedStateFromProps,(h=typeof o=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r!==p||g!==u)&&Hy(e,i,s,u),Ai=!1,g=e.memoizedState,i.state=g,dc(e,s,i,a),fc();var y=e.memoizedState;r!==p||g!==y||Ai||t!==null&&t.dependencies!==null&&Vh(t.dependencies)?(typeof o=="function"&&(Fd(e,n,o,s),y=e.memoizedState),(d=Ai||qy(e,n,d,s,g,y,u)||t!==null&&t.dependencies!==null&&Vh(t.dependencies))?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(s,y,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(s,y,u)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=s,e.memoizedState=y),i.props=s,i.state=y,i.context=u,s=d):(typeof i.componentDidUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),s=!1)}return i=s,oh(t,e),s=(e.flags&128)!==0,i||s?(i=e.stateNode,n=s&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&s?(e.child=Kr(e,t.child,null,a),e.child=Kr(e,null,n,a)):Bn(t,e,n,a),e.memoizedState=i.state,t=e.child):t=oi(t,e,a),t}function Zy(t,e,n,s){return Gr(),e.flags|=256,Bn(t,e,n,s),e.child}var qd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Hd(t){return{baseLanes:t,cachePool:zx()}}function Gd(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=Ds),t}function M_(t,e,n){var s=e.pendingProps,a=!1,i=(e.flags&128)!==0,r;if((r=i)||(r=t!==null&&t.memoizedState===null?!1:(gn.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(lt){if(a?Ri(e):Ci(),(t=Yt)?(t=ET(t,Js),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:nr!==null?{id:Sa,overflow:wa}:null,retryLane:536870912,hydrationErrors:null},n=Vx(t),n.return=e,e.child=n,qn=e,Yt=null)):t=null,t===null)throw sr(e);return S0(t)?e.lanes=32:e.lanes=536870912,null}var o=s.children;return s=s.fallback,a?(Ci(),a=e.mode,o=Fh({mode:"hidden",children:o},a),s=zr(s,a,n,null),o.return=e,s.return=e,o.sibling=s,e.child=o,s=e.child,s.memoizedState=Hd(n),s.childLanes=Gd(t,r,n),e.memoizedState=qd,Zo(null,s)):(Ri(e),h0(e,o))}var u=t.memoizedState;if(u!==null&&(o=u.dehydrated,o!==null)){if(i)e.flags&256?(Ri(e),e.flags&=-257,e=Yd(t,e,n)):e.memoizedState!==null?(Ci(),e.child=t.child,e.flags|=128,e=null):(Ci(),o=s.fallback,a=e.mode,s=Fh({mode:"visible",children:s.children},a),o=zr(o,a,n,null),o.flags|=2,s.return=e,o.return=e,s.sibling=o,e.child=s,Kr(e,t.child,null,n),s=e.child,s.memoizedState=Hd(n),s.childLanes=Gd(t,r,n),e.memoizedState=qd,e=Zo(null,s));else if(Ri(e),S0(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var h=r.dgst;r=h,s=Error(G(419)),s.stack="",s.digest=r,Dc({value:s,source:null,stack:null}),e=Yd(t,e,n)}else if(wn||_o(t,e,n,!1),r=(n&t.childLanes)!==0,wn||r){if(r=Ut,r!==null&&(s=ox(r,n),s!==0&&s!==u.retryLane))throw u.retryLane=s,rl(t,s),Ts(r,t,s),Yp;E0(o)||Yh(),e=Yd(t,e,n)}else E0(o)?(e.flags|=192,e.child=t.child,e=null):(t=u.treeContext,Yt=ta(o.nextSibling),qn=e,lt=!0,$i=null,Js=!1,t!==null&&Lx(e,t),e=h0(e,s.children),e.flags|=4096);return e}return a?(Ci(),o=s.fallback,a=e.mode,u=t.child,h=u.sibling,s=ei(u,{mode:"hidden",children:s.children}),s.subtreeFlags=u.subtreeFlags&65011712,h!==null?o=ei(h,o):(o=zr(o,a,n,null),o.flags|=2),o.return=e,s.return=e,s.sibling=o,e.child=s,Zo(null,s),s=e.child,o=t.child.memoizedState,o===null?o=Hd(n):(a=o.cachePool,a!==null?(u=En._currentValue,a=a.parent!==u?{parent:u,pool:u}:a):a=zx(),o={baseLanes:o.baseLanes|n,cachePool:a}),s.memoizedState=o,s.childLanes=Gd(t,r,n),e.memoizedState=qd,Zo(t.child,s)):(Ri(e),n=t.child,t=n.sibling,n=ei(n,{mode:"visible",children:s.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function h0(t,e){return e=Fh({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Fh(t,e){return t=Ms(22,t,null,e),t.lanes=0,t}function Yd(t,e,n){return Kr(e,t.child,null,n),t=h0(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function ev(t,e,n){t.lanes|=e;var s=t.alternate;s!==null&&(s.lanes|=e),Jm(t.return,e,n)}function Kd(t,e,n,s,a,i){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:a,treeForkCount:i}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=s,r.tail=n,r.tailMode=a,r.treeForkCount=i)}function D_(t,e,n){var s=e.pendingProps,a=s.revealOrder,i=s.tail;s=s.children;var r=gn.current,o=(r&2)!==0;if(o?(r=r&1|2,e.flags|=128):r&=1,Ft(gn,r),Bn(t,e,s,n),s=lt?Mc:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ev(t,n,e);else if(t.tag===19)ev(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&Uh(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Kd(e,!1,a,n,i,s);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Uh(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Kd(e,!0,n,null,i,s);break;case"together":Kd(e,!1,null,null,void 0,s);break;default:e.memoizedState=null}return e.child}function oi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ir|=e.lanes,!(n&e.childLanes))if(t!==null){if(_o(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(G(153));if(e.child!==null){for(t=e.child,n=ei(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ei(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Kp(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Vh(t)))}function SA(t,e,n){switch(e.tag){case 3:Ch(e,e.stateNode.containerInfo),Ni(e,En,t.memoizedState.cache),Gr();break;case 27:case 5:Um(e);break;case 4:Ch(e,e.stateNode.containerInfo);break;case 10:Ni(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,a0(e),null;break;case 13:var s=e.memoizedState;if(s!==null)return s.dehydrated!==null?(Ri(e),e.flags|=128,null):n&e.child.childLanes?M_(t,e,n):(Ri(e),t=oi(t,e,n),t!==null?t.sibling:null);Ri(e);break;case 19:var a=(t.flags&128)!==0;if(s=(n&e.childLanes)!==0,s||(_o(t,e,n,!1),s=(n&e.childLanes)!==0),a){if(s)return D_(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Ft(gn,gn.current),s)break;return null;case 22:return e.lanes=0,I_(t,e,n,e.pendingProps);case 24:Ni(e,En,t.memoizedState.cache)}return oi(t,e,n)}function j_(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)wn=!0;else{if(!Kp(t,n)&&!(e.flags&128))return wn=!1,SA(t,e,n);wn=!!(t.flags&131072)}else wn=!1,lt&&e.flags&1048576&&Px(e,Mc,e.index);switch(e.lanes=0,e.tag){case 16:e:{var s=e.pendingProps;if(t=Mr(e.elementType),e.type=t,typeof t=="function")Ap(t)?(s=Xr(t,s),e.tag=1,e=Jy(null,e,t,s,n)):(e.tag=0,e=u0(null,e,t,s,n));else{if(t!=null){var a=t.$$typeof;if(a===fp){e.tag=11,e=Yy(null,e,t,s,n);break e}else if(a===dp){e.tag=14,e=Ky(null,e,t,s,n);break e}}throw e=Pm(t)||t,Error(G(306,e,""))}}return e;case 0:return u0(t,e,e.type,e.pendingProps,n);case 1:return s=e.type,a=Xr(s,e.pendingProps),Jy(t,e,s,a,n);case 3:e:{if(Ch(e,e.stateNode.containerInfo),t===null)throw Error(G(387));s=e.pendingProps;var i=e.memoizedState;a=i.element,t0(t,e),dc(e,s,null,n);var r=e.memoizedState;if(s=r.cache,Ni(e,En,s),s!==i.cache&&Zm(e,[En],n,!0),fc(),s=r.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Zy(t,e,s,n);break e}else if(s!==a){a=Ws(Error(G(424)),e),Dc(a),e=Zy(t,e,s,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Yt=ta(t.firstChild),qn=e,lt=!0,$i=null,Js=!0,n=Fx(e,null,s,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Gr(),s===a){e=oi(t,e,n);break e}Bn(t,e,s,n)}e=e.child}return e;case 26:return oh(t,e),t===null?(n=xv(e.type,null,e.pendingProps,null))?e.memoizedState=n:lt||(n=e.type,t=e.pendingProps,s=Wh(Bi.current).createElement(n),s[Fn]=e,s[Es]=t,Yn(s,n,t),Ln(s),e.stateNode=s):e.memoizedState=xv(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Um(e),t===null&&lt&&(s=e.stateNode=ST(e.type,e.pendingProps,Bi.current),qn=e,Js=!0,a=Yt,pr(e.type)?(w0=a,Yt=ta(s.firstChild)):Yt=a),Bn(t,e,e.pendingProps.children,n),oh(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&lt&&((a=s=Yt)&&(s=e5(s,e.type,e.pendingProps,Js),s!==null?(e.stateNode=s,qn=e,Yt=ta(s.firstChild),Js=!1,a=!0):a=!1),a||sr(e)),Um(e),a=e.type,i=e.pendingProps,r=t!==null?t.memoizedProps:null,s=i.children,_0(a,i)?s=null:r!==null&&_0(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=Op(t,e,pA,null,null,n),Uc._currentValue=a),oh(t,e),Bn(t,e,s,n),e.child;case 6:return t===null&&lt&&((t=n=Yt)&&(n=t5(n,e.pendingProps,Js),n!==null?(e.stateNode=n,qn=e,Yt=null,t=!0):t=!1),t||sr(e)),null;case 13:return M_(t,e,n);case 4:return Ch(e,e.stateNode.containerInfo),s=e.pendingProps,t===null?e.child=Kr(e,null,s,n):Bn(t,e,s,n),e.child;case 11:return Yy(t,e,e.type,e.pendingProps,n);case 7:return Bn(t,e,e.pendingProps,n),e.child;case 8:return Bn(t,e,e.pendingProps.children,n),e.child;case 12:return Bn(t,e,e.pendingProps.children,n),e.child;case 10:return s=e.pendingProps,Ni(e,e.type,s.value),Bn(t,e,s.children,n),e.child;case 9:return a=e.type._context,s=e.pendingProps.children,Yr(e),a=Gn(a),s=s(a),e.flags|=1,Bn(t,e,s,n),e.child;case 14:return Ky(t,e,e.type,e.pendingProps,n);case 15:return k_(t,e,e.type,e.pendingProps,n);case 19:return D_(t,e,n);case 31:return EA(t,e,n);case 22:return I_(t,e,n,e.pendingProps);case 24:return Yr(e),s=Gn(En),t===null?(a=kp(),a===null&&(a=Ut,i=Cp(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=n),a=i),e.memoizedState={parent:s,cache:a},Mp(e),Ni(e,En,a)):(t.lanes&n&&(t0(t,e),dc(e,null,null,n),fc()),a=t.memoizedState,i=e.memoizedState,a.parent!==s?(a={parent:s,cache:s},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),Ni(e,En,s)):(s=i.cache,Ni(e,En,s),s!==a.cache&&Zm(e,[En],n,!0))),Bn(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(G(156,e.tag))}function Fa(t){t.flags|=4}function Qd(t,e,n,s,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(aT())t.flags|=8192;else throw $r=Ph,Ip}else t.flags&=-16777217}function tv(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!NT(e))if(aT())t.flags|=8192;else throw $r=Ph,Ip}function Uu(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?ix():536870912,t.lanes|=e,no|=e)}function qo(t,e){if(!lt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null}}function Gt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,s=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags&65011712,s|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=s,t.childLanes=n,e}function wA(t,e,n){var s=e.pendingProps;switch(Rp(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Gt(e),null;case 1:return Gt(e),null;case 3:return n=e.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),e.memoizedState.cache!==s&&(e.flags|=2048),ti(En),Xl(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(dl(e)?Fa(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zd())),Gt(e),null;case 26:var a=e.type,i=e.memoizedState;return t===null?(Fa(e),i!==null?(Gt(e),tv(e,i)):(Gt(e),Qd(e,a,null,s,n))):i?i!==t.memoizedState?(Fa(e),Gt(e),tv(e,i)):(Gt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==s&&Fa(e),Gt(e),Qd(e,a,t,s,n)),null;case 27:if(kh(e),n=Bi.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&Fa(e);else{if(!s){if(e.stateNode===null)throw Error(G(166));return Gt(e),null}t=Na.current,dl(e)?ky(e):(t=ST(a,s,n),e.stateNode=t,Fa(e))}return Gt(e),null;case 5:if(kh(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&Fa(e);else{if(!s){if(e.stateNode===null)throw Error(G(166));return Gt(e),null}if(i=Na.current,dl(e))ky(e);else{var r=Wh(Bi.current);switch(i){case 1:i=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=r.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof s.is=="string"?r.createElement("select",{is:s.is}):r.createElement("select"),s.multiple?i.multiple=!0:s.size&&(i.size=s.size);break;default:i=typeof s.is=="string"?r.createElement(a,{is:s.is}):r.createElement(a)}}i[Fn]=e,i[Es]=s;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)i.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=i;e:switch(Yn(i,a,s),a){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}s&&Fa(e)}}return Gt(e),Qd(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==s&&Fa(e);else{if(typeof s!="string"&&e.stateNode===null)throw Error(G(166));if(t=Bi.current,dl(e)){if(t=e.stateNode,n=e.memoizedProps,s=null,a=qn,a!==null)switch(a.tag){case 27:case 5:s=a.memoizedProps}t[Fn]=e,t=!!(t.nodeValue===n||s!==null&&s.suppressHydrationWarning===!0||xT(t.nodeValue,n)),t||sr(e,!0)}else t=Wh(t).createTextNode(s),t[Fn]=e,e.stateNode=t}return Gt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(s=dl(e),n!==null){if(t===null){if(!s)throw Error(G(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(G(557));t[Fn]=e}else Gr(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Gt(e),t=!1}else n=zd(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Is(e),e):(Is(e),null);if(e.flags&128)throw Error(G(558))}return Gt(e),null;case 13:if(s=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=dl(e),s!==null&&s.dehydrated!==null){if(t===null){if(!a)throw Error(G(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(G(317));a[Fn]=e}else Gr(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Gt(e),a=!1}else a=zd(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(Is(e),e):(Is(e),null)}return Is(e),e.flags&128?(e.lanes=n,e):(n=s!==null,t=t!==null&&t.memoizedState!==null,n&&(s=e.child,a=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(a=s.alternate.memoizedState.cachePool.pool),i=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(i=s.memoizedState.cachePool.pool),i!==a&&(s.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Uu(e,e.updateQueue),Gt(e),null);case 4:return Xl(),t===null&&tg(e.stateNode.containerInfo),Gt(e),null;case 10:return ti(e.type),Gt(e),null;case 19:if(Un(gn),s=e.memoizedState,s===null)return Gt(e),null;if(a=(e.flags&128)!==0,i=s.rendering,i===null)if(a)qo(s,!1);else{if(dn!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(i=Uh(t),i!==null){for(e.flags|=128,qo(s,!1),t=i.updateQueue,e.updateQueue=t,Uu(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)Ox(n,t),n=n.sibling;return Ft(gn,gn.current&1|2),lt&&Ya(e,s.treeForkCount),e.child}t=t.sibling}s.tail!==null&&Os()>Hh&&(e.flags|=128,a=!0,qo(s,!1),e.lanes=4194304)}else{if(!a)if(t=Uh(i),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,Uu(e,t),qo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!i.alternate&&!lt)return Gt(e),null}else 2*Os()-s.renderingStartTime>Hh&&n!==536870912&&(e.flags|=128,a=!0,qo(s,!1),e.lanes=4194304);s.isBackwards?(i.sibling=e.child,e.child=i):(t=s.last,t!==null?t.sibling=i:e.child=i,s.last=i)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Os(),t.sibling=null,n=gn.current,Ft(gn,a?n&1|2:n&1),lt&&Ya(e,s.treeForkCount),t):(Gt(e),null);case 22:case 23:return Is(e),Dp(),s=e.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(e.flags|=8192):s&&(e.flags|=8192),s?n&536870912&&!(e.flags&128)&&(Gt(e),e.subtreeFlags&6&&(e.flags|=8192)):Gt(e),n=e.updateQueue,n!==null&&Uu(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),s=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),s!==n&&(e.flags|=2048),t!==null&&Un(Br),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),ti(En),Gt(e),null;case 25:return null;case 30:return null}throw Error(G(156,e.tag))}function AA(t,e){switch(Rp(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ti(En),Xl(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return kh(e),null;case 31:if(e.memoizedState!==null){if(Is(e),e.alternate===null)throw Error(G(340));Gr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Is(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(G(340));Gr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Un(gn),null;case 4:return Xl(),null;case 10:return ti(e.type),null;case 22:case 23:return Is(e),Dp(),t!==null&&Un(Br),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return ti(En),null;case 25:return null;default:return null}}function O_(t,e){switch(Rp(e),e.tag){case 3:ti(En),Xl();break;case 26:case 27:case 5:kh(e);break;case 4:Xl();break;case 31:e.memoizedState!==null&&Is(e);break;case 13:Is(e);break;case 19:Un(gn);break;case 10:ti(e.type);break;case 22:case 23:Is(e),Dp(),t!==null&&Un(Br);break;case 24:ti(En)}}function au(t,e){try{var n=e.updateQueue,s=n!==null?n.lastEffect:null;if(s!==null){var a=s.next;n=a;do{if((n.tag&t)===t){s=void 0;var i=n.create,r=n.inst;s=i(),r.destroy=s}n=n.next}while(n!==a)}}catch(o){Rt(e,e.return,o)}}function ar(t,e,n){try{var s=e.updateQueue,a=s!==null?s.lastEffect:null;if(a!==null){var i=a.next;s=i;do{if((s.tag&t)===t){var r=s.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=e;var u=n,h=o;try{h()}catch(d){Rt(a,u,d)}}}s=s.next}while(s!==i)}}catch(d){Rt(e,e.return,d)}}function V_(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Hx(e,n)}catch(s){Rt(t,t.return,s)}}}function P_(t,e,n){n.props=Xr(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(s){Rt(t,e,s)}}function pc(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:s=t.stateNode;break;default:s=t.stateNode}typeof n=="function"?t.refCleanup=n(s):n.current=s}}catch(a){Rt(t,e,a)}}function Aa(t,e){var n=t.ref,s=t.refCleanup;if(n!==null)if(typeof s=="function")try{s()}catch(a){Rt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){Rt(t,e,a)}else n.current=null}function L_(t){var e=t.type,n=t.memoizedProps,s=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&s.focus();break e;case"img":n.src?s.src=n.src:n.srcSet&&(s.srcset=n.srcSet)}}catch(a){Rt(t,t.return,a)}}function Xd(t,e,n){try{var s=t.stateNode;KA(s,t.type,n,e),s[Es]=e}catch(a){Rt(t,t.return,a)}}function U_(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&pr(t.type)||t.tag===4}function Wd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||U_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&pr(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function f0(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Xa));else if(s!==4&&(s===27&&pr(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(f0(t,e,n),t=t.sibling;t!==null;)f0(t,e,n),t=t.sibling}function qh(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(s!==4&&(s===27&&pr(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(qh(t,e,n),t=t.sibling;t!==null;)qh(t,e,n),t=t.sibling}function z_(t){var e=t.stateNode,n=t.memoizedProps;try{for(var s=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Yn(e,s,n),e[Fn]=t,e[Es]=n}catch(i){Rt(t,t.return,i)}}var Ka=!1,Tn=!1,Jd=!1,nv=typeof WeakSet=="function"?WeakSet:Set,Pn=null;function NA(t,e){if(t=t.containerInfo,b0=tf,t=Nx(t),Ep(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var a=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var r=0,o=-1,u=-1,h=0,d=0,p=t,g=null;t:for(;;){for(var y;p!==n||a!==0&&p.nodeType!==3||(o=r+a),p!==i||s!==0&&p.nodeType!==3||(u=r+s),p.nodeType===3&&(r+=p.nodeValue.length),(y=p.firstChild)!==null;)g=p,p=y;for(;;){if(p===t)break t;if(g===n&&++h===a&&(o=r),g===i&&++d===s&&(u=r),(y=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=y}n=o===-1||u===-1?null:{start:o,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(x0={focusedElem:t,selectionRange:n},tf=!1,Pn=e;Pn!==null;)if(e=Pn,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Pn=t;else for(;Pn!==null;){switch(e=Pn,i=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&i!==null){t=void 0,n=e,a=i.memoizedProps,i=i.memoizedState,s=n.stateNode;try{var R=Xr(n.type,a);t=s.getSnapshotBeforeUpdate(R,i),s.__reactInternalSnapshotBeforeUpdate=t}catch(I){Rt(n,n.return,I)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)T0(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":T0(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(G(163))}if(t=e.sibling,t!==null){t.return=e.return,Pn=t;break}Pn=e.return}}function B_(t,e,n){var s=n.flags;switch(n.tag){case 0:case 11:case 15:Ha(t,n),s&4&&au(5,n);break;case 1:if(Ha(t,n),s&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){Rt(n,n.return,r)}else{var a=Xr(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){Rt(n,n.return,r)}}s&64&&V_(n),s&512&&pc(n,n.return);break;case 3:if(Ha(t,n),s&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Hx(t,e)}catch(r){Rt(n,n.return,r)}}break;case 27:e===null&&s&4&&z_(n);case 26:case 5:Ha(t,n),e===null&&s&4&&L_(n),s&512&&pc(n,n.return);break;case 12:Ha(t,n);break;case 31:Ha(t,n),s&4&&q_(t,n);break;case 13:Ha(t,n),s&4&&H_(t,n),s&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=VA.bind(null,n),n5(t,n))));break;case 22:if(s=n.memoizedState!==null||Ka,!s){e=e!==null&&e.memoizedState!==null||Tn,a=Ka;var i=Tn;Ka=s,(Tn=e)&&!i?Ga(t,n,(n.subtreeFlags&8772)!==0):Ha(t,n),Ka=a,Tn=i}break;case 30:break;default:Ha(t,n)}}function $_(t){var e=t.alternate;e!==null&&(t.alternate=null,$_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&yp(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var en=null,vs=!1;function qa(t,e,n){for(n=n.child;n!==null;)F_(t,e,n),n=n.sibling}function F_(t,e,n){if(Vs&&typeof Vs.onCommitFiberUnmount=="function")try{Vs.onCommitFiberUnmount(Wc,n)}catch{}switch(n.tag){case 26:Tn||Aa(n,e),qa(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Tn||Aa(n,e);var s=en,a=vs;pr(n.type)&&(en=n.stateNode,vs=!1),qa(t,e,n),bc(n.stateNode),en=s,vs=a;break;case 5:Tn||Aa(n,e);case 6:if(s=en,a=vs,en=null,qa(t,e,n),en=s,vs=a,en!==null)if(vs)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(n.stateNode)}catch(i){Rt(n,e,i)}else try{en.removeChild(n.stateNode)}catch(i){Rt(n,e,i)}break;case 18:en!==null&&(vs?(t=en,pv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ro(t)):pv(en,n.stateNode));break;case 4:s=en,a=vs,en=n.stateNode.containerInfo,vs=!0,qa(t,e,n),en=s,vs=a;break;case 0:case 11:case 14:case 15:ar(2,n,e),Tn||ar(4,n,e),qa(t,e,n);break;case 1:Tn||(Aa(n,e),s=n.stateNode,typeof s.componentWillUnmount=="function"&&P_(n,e,s)),qa(t,e,n);break;case 21:qa(t,e,n);break;case 22:Tn=(s=Tn)||n.memoizedState!==null,qa(t,e,n),Tn=s;break;default:qa(t,e,n)}}function q_(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ro(t)}catch(n){Rt(e,e.return,n)}}}function H_(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ro(t)}catch(n){Rt(e,e.return,n)}}function RA(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new nv),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new nv),e;default:throw Error(G(435,t.tag))}}function zu(t,e){var n=RA(t);e.forEach(function(s){if(!n.has(s)){n.add(s);var a=PA.bind(null,t,s);s.then(a,a)}})}function gs(t,e){var n=e.deletions;if(n!==null)for(var s=0;s<n.length;s++){var a=n[s],i=t,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(pr(o.type)){en=o.stateNode,vs=!1;break e}break;case 5:en=o.stateNode,vs=!1;break e;case 3:case 4:en=o.stateNode.containerInfo,vs=!0;break e}o=o.return}if(en===null)throw Error(G(160));F_(i,r,a),en=null,vs=!1,i=a.alternate,i!==null&&(i.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)G_(e,t),e=e.sibling}var ua=null;function G_(t,e){var n=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:gs(e,t),ys(t),s&4&&(ar(3,t,t.return),au(3,t),ar(5,t,t.return));break;case 1:gs(e,t),ys(t),s&512&&(Tn||n===null||Aa(n,n.return)),s&64&&Ka&&(t=t.updateQueue,t!==null&&(s=t.callbacks,s!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?s:n.concat(s))));break;case 26:var a=ua;if(gs(e,t),ys(t),s&512&&(Tn||n===null||Aa(n,n.return)),s&4){var i=n!==null?n.memoizedState:null;if(s=t.memoizedState,n===null)if(s===null)if(t.stateNode===null){e:{s=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(s){case"title":i=a.getElementsByTagName("title")[0],(!i||i[eu]||i[Fn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(s),a.head.insertBefore(i,a.querySelector("head > title"))),Yn(i,s,n),i[Fn]=t,Ln(i),s=i;break e;case"link":var r=Tv("link","href",a).get(s+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(i=r[o],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break t}}i=a.createElement(s),Yn(i,s,n),a.head.appendChild(i);break;case"meta":if(r=Tv("meta","content",a).get(s+(n.content||""))){for(o=0;o<r.length;o++)if(i=r[o],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break t}}i=a.createElement(s),Yn(i,s,n),a.head.appendChild(i);break;default:throw Error(G(468,s))}i[Fn]=t,Ln(i),s=i}t.stateNode=s}else Ev(a,t.type,t.stateNode);else t.stateNode=_v(a,s,t.memoizedProps);else i!==s?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,s===null?Ev(a,t.type,t.stateNode):_v(a,s,t.memoizedProps)):s===null&&t.stateNode!==null&&Xd(t,t.memoizedProps,n.memoizedProps)}break;case 27:gs(e,t),ys(t),s&512&&(Tn||n===null||Aa(n,n.return)),n!==null&&s&4&&Xd(t,t.memoizedProps,n.memoizedProps);break;case 5:if(gs(e,t),ys(t),s&512&&(Tn||n===null||Aa(n,n.return)),t.flags&32){a=t.stateNode;try{Jl(a,"")}catch(R){Rt(t,t.return,R)}}s&4&&t.stateNode!=null&&(a=t.memoizedProps,Xd(t,a,n!==null?n.memoizedProps:a)),s&1024&&(Jd=!0);break;case 6:if(gs(e,t),ys(t),s&4){if(t.stateNode===null)throw Error(G(162));s=t.memoizedProps,n=t.stateNode;try{n.nodeValue=s}catch(R){Rt(t,t.return,R)}}break;case 3:if(hh=null,a=ua,ua=Jh(e.containerInfo),gs(e,t),ua=a,ys(t),s&4&&n!==null&&n.memoizedState.isDehydrated)try{ro(e.containerInfo)}catch(R){Rt(t,t.return,R)}Jd&&(Jd=!1,Y_(t));break;case 4:s=ua,ua=Jh(t.stateNode.containerInfo),gs(e,t),ys(t),ua=s;break;case 12:gs(e,t),ys(t);break;case 31:gs(e,t),ys(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,zu(t,s)));break;case 13:gs(e,t),ys(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(qf=Os()),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,zu(t,s)));break;case 22:a=t.memoizedState!==null;var u=n!==null&&n.memoizedState!==null,h=Ka,d=Tn;if(Ka=h||a,Tn=d||u,gs(e,t),Tn=d,Ka=h,ys(t),s&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||u||Ka||Tn||Dr(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){u=n=e;try{if(i=u.stateNode,a)r=i.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=u.stateNode;var p=u.memoizedProps.style,g=p!=null&&p.hasOwnProperty("display")?p.display:null;o.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(R){Rt(u,u.return,R)}}}else if(e.tag===6){if(n===null){u=e;try{u.stateNode.nodeValue=a?"":u.memoizedProps}catch(R){Rt(u,u.return,R)}}}else if(e.tag===18){if(n===null){u=e;try{var y=u.stateNode;a?gv(y,!0):gv(u.stateNode,!1)}catch(R){Rt(u,u.return,R)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}s&4&&(s=t.updateQueue,s!==null&&(n=s.retryQueue,n!==null&&(s.retryQueue=null,zu(t,n))));break;case 19:gs(e,t),ys(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,zu(t,s)));break;case 30:break;case 21:break;default:gs(e,t),ys(t)}}function ys(t){var e=t.flags;if(e&2){try{for(var n,s=t.return;s!==null;){if(U_(s)){n=s;break}s=s.return}if(n==null)throw Error(G(160));switch(n.tag){case 27:var a=n.stateNode,i=Wd(t);qh(t,i,a);break;case 5:var r=n.stateNode;n.flags&32&&(Jl(r,""),n.flags&=-33);var o=Wd(t);qh(t,o,r);break;case 3:case 4:var u=n.stateNode.containerInfo,h=Wd(t);f0(t,h,u);break;default:throw Error(G(161))}}catch(d){Rt(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Y_(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Y_(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ha(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)B_(t,e.alternate,e),e=e.sibling}function Dr(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:ar(4,e,e.return),Dr(e);break;case 1:Aa(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&P_(e,e.return,n),Dr(e);break;case 27:bc(e.stateNode);case 26:case 5:Aa(e,e.return),Dr(e);break;case 22:e.memoizedState===null&&Dr(e);break;case 30:Dr(e);break;default:Dr(e)}t=t.sibling}}function Ga(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var s=e.alternate,a=t,i=e,r=i.flags;switch(i.tag){case 0:case 11:case 15:Ga(a,i,n),au(4,i);break;case 1:if(Ga(a,i,n),s=i,a=s.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(h){Rt(s,s.return,h)}if(s=i,a=s.updateQueue,a!==null){var o=s.stateNode;try{var u=a.shared.hiddenCallbacks;if(u!==null)for(a.shared.hiddenCallbacks=null,a=0;a<u.length;a++)qx(u[a],o)}catch(h){Rt(s,s.return,h)}}n&&r&64&&V_(i),pc(i,i.return);break;case 27:z_(i);case 26:case 5:Ga(a,i,n),n&&s===null&&r&4&&L_(i),pc(i,i.return);break;case 12:Ga(a,i,n);break;case 31:Ga(a,i,n),n&&r&4&&q_(a,i);break;case 13:Ga(a,i,n),n&&r&4&&H_(a,i);break;case 22:i.memoizedState===null&&Ga(a,i,n),pc(i,i.return);break;case 30:break;default:Ga(a,i,n)}e=e.sibling}}function Qp(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&nu(n))}function Xp(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&nu(t))}function ca(t,e,n,s){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)K_(t,e,n,s),e=e.sibling}function K_(t,e,n,s){var a=e.flags;switch(e.tag){case 0:case 11:case 15:ca(t,e,n,s),a&2048&&au(9,e);break;case 1:ca(t,e,n,s);break;case 3:ca(t,e,n,s),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&nu(t)));break;case 12:if(a&2048){ca(t,e,n,s),t=e.stateNode;try{var i=e.memoizedProps,r=i.id,o=i.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(u){Rt(e,e.return,u)}}else ca(t,e,n,s);break;case 31:ca(t,e,n,s);break;case 13:ca(t,e,n,s);break;case 23:break;case 22:i=e.stateNode,r=e.alternate,e.memoizedState!==null?i._visibility&2?ca(t,e,n,s):gc(t,e):i._visibility&2?ca(t,e,n,s):(i._visibility|=2,yl(t,e,n,s,(e.subtreeFlags&10256)!==0||!1)),a&2048&&Qp(r,e);break;case 24:ca(t,e,n,s),a&2048&&Xp(e.alternate,e);break;default:ca(t,e,n,s)}}function yl(t,e,n,s,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,r=e,o=n,u=s,h=r.flags;switch(r.tag){case 0:case 11:case 15:yl(i,r,o,u,a),au(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?yl(i,r,o,u,a):gc(i,r):(d._visibility|=2,yl(i,r,o,u,a)),a&&h&2048&&Qp(r.alternate,r);break;case 24:yl(i,r,o,u,a),a&&h&2048&&Xp(r.alternate,r);break;default:yl(i,r,o,u,a)}e=e.sibling}}function gc(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,s=e,a=s.flags;switch(s.tag){case 22:gc(n,s),a&2048&&Qp(s.alternate,s);break;case 24:gc(n,s),a&2048&&Xp(s.alternate,s);break;default:gc(n,s)}e=e.sibling}}var ec=8192;function ml(t,e,n){if(t.subtreeFlags&ec)for(t=t.child;t!==null;)Q_(t,e,n),t=t.sibling}function Q_(t,e,n){switch(t.tag){case 26:ml(t,e,n),t.flags&ec&&t.memoizedState!==null&&m5(n,ua,t.memoizedState,t.memoizedProps);break;case 5:ml(t,e,n);break;case 3:case 4:var s=ua;ua=Jh(t.stateNode.containerInfo),ml(t,e,n),ua=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=ec,ec=16777216,ml(t,e,n),ec=s):ml(t,e,n));break;default:ml(t,e,n)}}function X_(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Ho(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];Pn=s,J_(s,t)}X_(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)W_(t),t=t.sibling}function W_(t){switch(t.tag){case 0:case 11:case 15:Ho(t),t.flags&2048&&ar(9,t,t.return);break;case 3:Ho(t);break;case 12:Ho(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,ch(t)):Ho(t);break;default:Ho(t)}}function ch(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];Pn=s,J_(s,t)}X_(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:ar(8,e,e.return),ch(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,ch(e));break;default:ch(e)}t=t.sibling}}function J_(t,e){for(;Pn!==null;){var n=Pn;switch(n.tag){case 0:case 11:case 15:ar(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var s=n.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:nu(n.memoizedState.cache)}if(s=n.child,s!==null)s.return=n,Pn=s;else e:for(n=t;Pn!==null;){s=Pn;var a=s.sibling,i=s.return;if($_(s),s===n){Pn=null;break e}if(a!==null){a.return=i,Pn=a;break e}Pn=i}}}var CA={getCacheForType:function(t){var e=Gn(En),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Gn(En).controller.signal}},kA=typeof WeakMap=="function"?WeakMap:Map,gt=0,Ut=null,tt=null,it=0,Nt=0,ks=null,Pi=!1,Eo=!1,Wp=!1,ci=0,dn=0,ir=0,Fr=0,Jp=0,Ds=0,no=0,yc=null,bs=null,d0=!1,qf=0,Z_=0,Hh=1/0,Gh=null,Hi=null,kn=0,Gi=null,so=null,ni=0,m0=0,p0=null,eT=null,vc=0,g0=null;function Ls(){return gt&2&&it!==0?it&-it:Ce.T!==null?eg():cx()}function tT(){if(Ds===0)if(!(it&536870912)||lt){var t=Mu;Mu<<=1,!(Mu&3932160)&&(Mu=262144),Ds=t}else Ds=536870912;return t=zs.current,t!==null&&(t.flags|=32),Ds}function Ts(t,e,n){(t===Ut&&(Nt===2||Nt===9)||t.cancelPendingCommit!==null)&&(ao(t,0),Li(t,it,Ds,!1)),Zc(t,n),(!(gt&2)||t!==Ut)&&(t===Ut&&(!(gt&2)&&(Fr|=n),dn===4&&Li(t,it,Ds,!1)),Va(t))}function nT(t,e,n){if(gt&6)throw Error(G(327));var s=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Jc(t,e),a=s?DA(t,e):Zd(t,e,!0),i=s;do{if(a===0){Eo&&!s&&Li(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!IA(n)){a=Zd(t,e,!1),i=!1;continue}if(a===2){if(i=e,t.errorRecoveryDisabledLanes&i)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=t;a=yc;var u=o.current.memoizedState.isDehydrated;if(u&&(ao(o,r).flags|=256),r=Zd(o,r,!1),r!==2){if(Wp&&!u){o.errorRecoveryDisabledLanes|=i,Fr|=i,a=4;break e}i=bs,bs=a,i!==null&&(bs===null?bs=i:bs.push.apply(bs,i))}a=r}if(i=!1,a!==2)continue}}if(a===1){ao(t,0),Li(t,e,0,!0);break}e:{switch(s=t,i=a,i){case 0:case 1:throw Error(G(345));case 4:if((e&4194048)!==e)break;case 6:Li(s,e,Ds,!Pi);break e;case 2:bs=null;break;case 3:case 5:break;default:throw Error(G(329))}if((e&62914560)===e&&(a=qf+300-Os(),10<a)){if(Li(s,e,Ds,!Pi),Df(s,0,!0)!==0)break e;ni=e,s.timeoutHandle=TT(sv.bind(null,s,n,bs,Gh,d0,e,Ds,Fr,no,Pi,i,"Throttled",-0,0),a);break e}sv(s,n,bs,Gh,d0,e,Ds,Fr,no,Pi,i,null,-0,0)}}break}while(1);Va(t)}function sv(t,e,n,s,a,i,r,o,u,h,d,p,g,y){if(t.timeoutHandle=-1,p=e.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Xa},Q_(e,i,p);var R=(i&62914560)===i?qf-Os():(i&4194048)===i?Z_-Os():0;if(R=p5(p,R),R!==null){ni=i,t.cancelPendingCommit=R(iv.bind(null,t,e,i,n,s,a,r,o,u,d,p,null,g,y)),Li(t,i,r,!h);return}}iv(t,e,i,n,s,a,r,o,u)}function IA(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var s=0;s<n.length;s++){var a=n[s],i=a.getSnapshot;a=a.value;try{if(!Us(i(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Li(t,e,n,s){e&=~Jp,e&=~Fr,t.suspendedLanes|=e,t.pingedLanes&=~e,s&&(t.warmLanes|=e),s=t.expirationTimes;for(var a=e;0<a;){var i=31-Ps(a),r=1<<i;s[i]=-1,a&=~r}n!==0&&rx(t,n,e)}function Hf(){return gt&6?!0:(iu(0,!1),!1)}function Zp(){if(tt!==null){if(Nt===0)var t=tt.return;else t=tt,Wa=ll=null,Lp(t),$l=null,jc=0,t=tt;for(;t!==null;)O_(t.alternate,t),t=t.return;tt=null}}function ao(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,WA(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),ni=0,Zp(),Ut=t,tt=n=ei(t.current,null),it=e,Nt=0,ks=null,Pi=!1,Eo=Jc(t,e),Wp=!1,no=Ds=Jp=Fr=ir=dn=0,bs=yc=null,d0=!1,e&8&&(e|=e&32);var s=t.entangledLanes;if(s!==0)for(t=t.entanglements,s&=e;0<s;){var a=31-Ps(s),i=1<<a;e|=t[a],s&=~i}return ci=e,Pf(),n}function sT(t,e){Ge=null,Ce.H=Vc,e===To||e===Uf?(e=Oy(),Nt=3):e===Ip?(e=Oy(),Nt=4):Nt=e===Yp?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,ks=e,tt===null&&(dn=1,$h(t,Ws(e,t.current)))}function aT(){var t=zs.current;return t===null?!0:(it&4194048)===it?ea===null:(it&62914560)===it||it&536870912?t===ea:!1}function iT(){var t=Ce.H;return Ce.H=Vc,t===null?Vc:t}function rT(){var t=Ce.A;return Ce.A=CA,t}function Yh(){dn=4,Pi||(it&4194048)!==it&&zs.current!==null||(Eo=!0),!(ir&134217727)&&!(Fr&134217727)||Ut===null||Li(Ut,it,Ds,!1)}function Zd(t,e,n){var s=gt;gt|=2;var a=iT(),i=rT();(Ut!==t||it!==e)&&(Gh=null,ao(t,e)),e=!1;var r=dn;e:do try{if(Nt!==0&&tt!==null){var o=tt,u=ks;switch(Nt){case 8:Zp(),r=6;break e;case 3:case 2:case 9:case 6:zs.current===null&&(e=!0);var h=Nt;if(Nt=0,ks=null,jl(t,o,u,h),n&&Eo){r=0;break e}break;default:h=Nt,Nt=0,ks=null,jl(t,o,u,h)}}MA(),r=dn;break}catch(d){sT(t,d)}while(1);return e&&t.shellSuspendCounter++,Wa=ll=null,gt=s,Ce.H=a,Ce.A=i,tt===null&&(Ut=null,it=0,Pf()),r}function MA(){for(;tt!==null;)lT(tt)}function DA(t,e){var n=gt;gt|=2;var s=iT(),a=rT();Ut!==t||it!==e?(Gh=null,Hh=Os()+500,ao(t,e)):Eo=Jc(t,e);e:do try{if(Nt!==0&&tt!==null){e=tt;var i=ks;t:switch(Nt){case 1:Nt=0,ks=null,jl(t,e,i,1);break;case 2:case 9:if(jy(i)){Nt=0,ks=null,av(e);break}e=function(){Nt!==2&&Nt!==9||Ut!==t||(Nt=7),Va(t)},i.then(e,e);break e;case 3:Nt=7;break e;case 4:Nt=5;break e;case 7:jy(i)?(Nt=0,ks=null,av(e)):(Nt=0,ks=null,jl(t,e,i,7));break;case 5:var r=null;switch(tt.tag){case 26:r=tt.memoizedState;case 5:case 27:var o=tt;if(r?NT(r):o.stateNode.complete){Nt=0,ks=null;var u=o.sibling;if(u!==null)tt=u;else{var h=o.return;h!==null?(tt=h,Gf(h)):tt=null}break t}}Nt=0,ks=null,jl(t,e,i,5);break;case 6:Nt=0,ks=null,jl(t,e,i,6);break;case 8:Zp(),dn=6;break e;default:throw Error(G(462))}}jA();break}catch(d){sT(t,d)}while(1);return Wa=ll=null,Ce.H=s,Ce.A=a,gt=n,tt!==null?0:(Ut=null,it=0,Pf(),dn)}function jA(){for(;tt!==null&&!sw();)lT(tt)}function lT(t){var e=j_(t.alternate,t,ci);t.memoizedProps=t.pendingProps,e===null?Gf(t):tt=e}function av(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Wy(n,e,e.pendingProps,e.type,void 0,it);break;case 11:e=Wy(n,e,e.pendingProps,e.type.render,e.ref,it);break;case 5:Lp(e);default:O_(n,e),e=tt=Ox(e,ci),e=j_(n,e,ci)}t.memoizedProps=t.pendingProps,e===null?Gf(t):tt=e}function jl(t,e,n,s){Wa=ll=null,Lp(e),$l=null,jc=0;var a=e.return;try{if(TA(t,a,e,n,it)){dn=1,$h(t,Ws(n,t.current)),tt=null;return}}catch(i){if(a!==null)throw tt=a,i;dn=1,$h(t,Ws(n,t.current)),tt=null;return}e.flags&32768?(lt||s===1?t=!0:Eo||it&536870912?t=!1:(Pi=t=!0,(s===2||s===9||s===3||s===6)&&(s=zs.current,s!==null&&s.tag===13&&(s.flags|=16384))),oT(e,t)):Gf(e)}function Gf(t){var e=t;do{if(e.flags&32768){oT(e,Pi);return}t=e.return;var n=wA(e.alternate,e,ci);if(n!==null){tt=n;return}if(e=e.sibling,e!==null){tt=e;return}tt=e=t}while(e!==null);dn===0&&(dn=5)}function oT(t,e){do{var n=AA(t.alternate,t);if(n!==null){n.flags&=32767,tt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){tt=t;return}tt=t=n}while(t!==null);dn=6,tt=null}function iv(t,e,n,s,a,i,r,o,u){t.cancelPendingCommit=null;do Yf();while(kn!==0);if(gt&6)throw Error(G(327));if(e!==null){if(e===t.current)throw Error(G(177));if(i=e.lanes|e.childLanes,i|=Sp,dw(t,n,i,r,o,u),t===Ut&&(tt=Ut=null,it=0),so=e,Gi=t,ni=n,m0=i,p0=a,eT=s,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,LA(Ih,function(){return dT(),null})):(t.callbackNode=null,t.callbackPriority=0),s=(e.flags&13878)!==0,e.subtreeFlags&13878||s){s=Ce.T,Ce.T=null,a=yt.p,yt.p=2,r=gt,gt|=4;try{NA(t,e,n)}finally{gt=r,yt.p=a,Ce.T=s}}kn=1,cT(),uT(),hT()}}function cT(){if(kn===1){kn=0;var t=Gi,e=so,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=Ce.T,Ce.T=null;var s=yt.p;yt.p=2;var a=gt;gt|=4;try{G_(e,t);var i=x0,r=Nx(t.containerInfo),o=i.focusedElem,u=i.selectionRange;if(r!==o&&o&&o.ownerDocument&&Ax(o.ownerDocument.documentElement,o)){if(u!==null&&Ep(o)){var h=u.start,d=u.end;if(d===void 0&&(d=h),"selectionStart"in o)o.selectionStart=h,o.selectionEnd=Math.min(d,o.value.length);else{var p=o.ownerDocument||document,g=p&&p.defaultView||window;if(g.getSelection){var y=g.getSelection(),R=o.textContent.length,I=Math.min(u.start,R),O=u.end===void 0?I:Math.min(u.end,R);!y.extend&&I>O&&(r=O,O=I,I=r);var x=Ny(o,I),b=Ny(o,O);if(x&&b&&(y.rangeCount!==1||y.anchorNode!==x.node||y.anchorOffset!==x.offset||y.focusNode!==b.node||y.focusOffset!==b.offset)){var N=p.createRange();N.setStart(x.node,x.offset),y.removeAllRanges(),I>O?(y.addRange(N),y.extend(b.node,b.offset)):(N.setEnd(b.node,b.offset),y.addRange(N))}}}}for(p=[],y=o;y=y.parentNode;)y.nodeType===1&&p.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var V=p[o];V.element.scrollLeft=V.left,V.element.scrollTop=V.top}}tf=!!b0,x0=b0=null}finally{gt=a,yt.p=s,Ce.T=n}}t.current=e,kn=2}}function uT(){if(kn===2){kn=0;var t=Gi,e=so,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=Ce.T,Ce.T=null;var s=yt.p;yt.p=2;var a=gt;gt|=4;try{B_(t,e.alternate,e)}finally{gt=a,yt.p=s,Ce.T=n}}kn=3}}function hT(){if(kn===4||kn===3){kn=0,aw();var t=Gi,e=so,n=ni,s=eT;e.subtreeFlags&10256||e.flags&10256?kn=5:(kn=0,so=Gi=null,fT(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(Hi=null),gp(n),e=e.stateNode,Vs&&typeof Vs.onCommitFiberRoot=="function")try{Vs.onCommitFiberRoot(Wc,e,void 0,(e.current.flags&128)===128)}catch{}if(s!==null){e=Ce.T,a=yt.p,yt.p=2,Ce.T=null;try{for(var i=t.onRecoverableError,r=0;r<s.length;r++){var o=s[r];i(o.value,{componentStack:o.stack})}}finally{Ce.T=e,yt.p=a}}ni&3&&Yf(),Va(t),a=t.pendingLanes,n&261930&&a&42?t===g0?vc++:(vc=0,g0=t):vc=0,iu(0,!1)}}function fT(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,nu(e)))}function Yf(){return cT(),uT(),hT(),dT()}function dT(){if(kn!==5)return!1;var t=Gi,e=m0;m0=0;var n=gp(ni),s=Ce.T,a=yt.p;try{yt.p=32>n?32:n,Ce.T=null,n=p0,p0=null;var i=Gi,r=ni;if(kn=0,so=Gi=null,ni=0,gt&6)throw Error(G(331));var o=gt;if(gt|=4,W_(i.current),K_(i,i.current,r,n),gt=o,iu(0,!1),Vs&&typeof Vs.onPostCommitFiberRoot=="function")try{Vs.onPostCommitFiberRoot(Wc,i)}catch{}return!0}finally{yt.p=a,Ce.T=s,fT(t,e)}}function rv(t,e,n){e=Ws(n,e),e=c0(t.stateNode,e,2),t=qi(t,e,2),t!==null&&(Zc(t,2),Va(t))}function Rt(t,e,n){if(t.tag===3)rv(t,t,n);else for(;e!==null;){if(e.tag===3){rv(e,t,n);break}else if(e.tag===1){var s=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Hi===null||!Hi.has(s))){t=Ws(n,t),n=R_(2),s=qi(e,n,2),s!==null&&(C_(n,s,e,t),Zc(s,2),Va(s));break}}e=e.return}}function em(t,e,n){var s=t.pingCache;if(s===null){s=t.pingCache=new kA;var a=new Set;s.set(e,a)}else a=s.get(e),a===void 0&&(a=new Set,s.set(e,a));a.has(n)||(Wp=!0,a.add(n),t=OA.bind(null,t,e,n),e.then(t,t))}function OA(t,e,n){var s=t.pingCache;s!==null&&s.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Ut===t&&(it&n)===n&&(dn===4||dn===3&&(it&62914560)===it&&300>Os()-qf?!(gt&2)&&ao(t,0):Jp|=n,no===it&&(no=0)),Va(t)}function mT(t,e){e===0&&(e=ix()),t=rl(t,e),t!==null&&(Zc(t,e),Va(t))}function VA(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),mT(t,n)}function PA(t,e){var n=0;switch(t.tag){case 31:case 13:var s=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(G(314))}s!==null&&s.delete(e),mT(t,n)}function LA(t,e){return mp(t,e)}var Kh=null,vl=null,y0=!1,Qh=!1,tm=!1,Ui=0;function Va(t){t!==vl&&t.next===null&&(vl===null?Kh=vl=t:vl=vl.next=t),Qh=!0,y0||(y0=!0,zA())}function iu(t,e){if(!tm&&Qh){tm=!0;do for(var n=!1,s=Kh;s!==null;){if(!e)if(t!==0){var a=s.pendingLanes;if(a===0)var i=0;else{var r=s.suspendedLanes,o=s.pingedLanes;i=(1<<31-Ps(42|t)+1)-1,i&=a&~(r&~o),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,lv(s,i))}else i=it,i=Df(s,s===Ut?i:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),!(i&3)||Jc(s,i)||(n=!0,lv(s,i));s=s.next}while(n);tm=!1}}function UA(){pT()}function pT(){Qh=y0=!1;var t=0;Ui!==0&&XA()&&(t=Ui);for(var e=Os(),n=null,s=Kh;s!==null;){var a=s.next,i=gT(s,e);i===0?(s.next=null,n===null?Kh=a:n.next=a,a===null&&(vl=n)):(n=s,(t!==0||i&3)&&(Qh=!0)),s=a}kn!==0&&kn!==5||iu(t,!1),Ui!==0&&(Ui=0)}function gT(t,e){for(var n=t.suspendedLanes,s=t.pingedLanes,a=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var r=31-Ps(i),o=1<<r,u=a[r];u===-1?(!(o&n)||o&s)&&(a[r]=fw(o,e)):u<=e&&(t.expiredLanes|=o),i&=~o}if(e=Ut,n=it,n=Df(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,n===0||t===e&&(Nt===2||Nt===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&Cd(s),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Jc(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(s!==null&&Cd(s),gp(n)){case 2:case 8:n=sx;break;case 32:n=Ih;break;case 268435456:n=ax;break;default:n=Ih}return s=yT.bind(null,t),n=mp(n,s),t.callbackPriority=e,t.callbackNode=n,e}return s!==null&&s!==null&&Cd(s),t.callbackPriority=2,t.callbackNode=null,2}function yT(t,e){if(kn!==0&&kn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Yf()&&t.callbackNode!==n)return null;var s=it;return s=Df(t,t===Ut?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(nT(t,s,e),gT(t,Os()),t.callbackNode!=null&&t.callbackNode===n?yT.bind(null,t):null)}function lv(t,e){if(Yf())return null;nT(t,e,!0)}function zA(){JA(function(){gt&6?mp(nx,UA):pT()})}function eg(){if(Ui===0){var t=Zl;t===0&&(t=Iu,Iu<<=1,!(Iu&261888)&&(Iu=256)),Ui=t}return Ui}function ov(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:eh(""+t)}function cv(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function BA(t,e,n,s,a){if(e==="submit"&&n&&n.stateNode===a){var i=ov((a[Es]||null).action),r=s.submitter;r&&(e=(e=r[Es]||null)?ov(e.formAction):r.getAttribute("formAction"),e!==null&&(i=e,r=null));var o=new jf("action","action",null,s,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(Ui!==0){var u=r?cv(a,r):new FormData(a);l0(n,{pending:!0,data:u,method:a.method,action:i},null,u)}}else typeof i=="function"&&(o.preventDefault(),u=r?cv(a,r):new FormData(a),l0(n,{pending:!0,data:u,method:a.method,action:i},i,u))},currentTarget:a}]})}}for(var nm=0;nm<Qm.length;nm++){var sm=Qm[nm],$A=sm.toLowerCase(),FA=sm[0].toUpperCase()+sm.slice(1);ga($A,"on"+FA)}ga(Cx,"onAnimationEnd");ga(kx,"onAnimationIteration");ga(Ix,"onAnimationStart");ga("dblclick","onDoubleClick");ga("focusin","onFocus");ga("focusout","onBlur");ga(iA,"onTransitionRun");ga(rA,"onTransitionStart");ga(lA,"onTransitionCancel");ga(Mx,"onTransitionEnd");Wl("onMouseEnter",["mouseout","mouseover"]);Wl("onMouseLeave",["mouseout","mouseover"]);Wl("onPointerEnter",["pointerout","pointerover"]);Wl("onPointerLeave",["pointerout","pointerover"]);sl("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));sl("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));sl("onBeforeInput",["compositionend","keypress","textInput","paste"]);sl("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));sl("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));sl("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Pc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qA=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Pc));function vT(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var s=t[n],a=s.event;s=s.listeners;e:{var i=void 0;if(e)for(var r=s.length-1;0<=r;r--){var o=s[r],u=o.instance,h=o.currentTarget;if(o=o.listener,u!==i&&a.isPropagationStopped())break e;i=o,a.currentTarget=h;try{i(a)}catch(d){Dh(d)}a.currentTarget=null,i=u}else for(r=0;r<s.length;r++){if(o=s[r],u=o.instance,h=o.currentTarget,o=o.listener,u!==i&&a.isPropagationStopped())break e;i=o,a.currentTarget=h;try{i(a)}catch(d){Dh(d)}a.currentTarget=null,i=u}}}}function et(t,e){var n=e[Bm];n===void 0&&(n=e[Bm]=new Set);var s=t+"__bubble";n.has(s)||(bT(e,t,2,!1),n.add(s))}function am(t,e,n){var s=0;e&&(s|=4),bT(n,t,s,e)}var Bu="_reactListening"+Math.random().toString(36).slice(2);function tg(t){if(!t[Bu]){t[Bu]=!0,ux.forEach(function(n){n!=="selectionchange"&&(qA.has(n)||am(n,!1,t),am(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Bu]||(e[Bu]=!0,am("selectionchange",!1,e))}}function bT(t,e,n,s){switch(MT(e)){case 2:var a=v5;break;case 8:a=b5;break;default:a=ig}n=a.bind(null,e,n,t),a=void 0,!Gm||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),s?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function im(t,e,n,s,a){var i=s;if(!(e&1)&&!(e&2)&&s!==null)e:for(;;){if(s===null)return;var r=s.tag;if(r===3||r===4){var o=s.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=s.return;r!==null;){var u=r.tag;if((u===3||u===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=wl(o),r===null)return;if(u=r.tag,u===5||u===6||u===26||u===27){s=i=r;continue e}o=o.parentNode}}s=s.return}vx(function(){var h=i,d=bp(n),p=[];e:{var g=Dx.get(t);if(g!==void 0){var y=jf,R=t;switch(t){case"keypress":if(nh(n)===0)break e;case"keydown":case"keyup":y=Pw;break;case"focusin":R="focus",y=jd;break;case"focusout":R="blur",y=jd;break;case"beforeblur":case"afterblur":y=jd;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=yy;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=ww;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=zw;break;case Cx:case kx:case Ix:y=Rw;break;case Mx:y=$w;break;case"scroll":case"scrollend":y=Ew;break;case"wheel":y=qw;break;case"copy":case"cut":case"paste":y=kw;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=by;break;case"toggle":case"beforetoggle":y=Gw}var I=(e&4)!==0,O=!I&&(t==="scroll"||t==="scrollend"),x=I?g!==null?g+"Capture":null:g;I=[];for(var b=h,N;b!==null;){var V=b;if(N=V.stateNode,V=V.tag,V!==5&&V!==26&&V!==27||N===null||x===null||(V=Cc(b,x),V!=null&&I.push(Lc(b,V,N))),O)break;b=b.return}0<I.length&&(g=new y(g,R,null,n,d),p.push({event:g,listeners:I}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",y=t==="mouseout"||t==="pointerout",g&&n!==Hm&&(R=n.relatedTarget||n.fromElement)&&(wl(R)||R[bo]))break e;if((y||g)&&(g=d.window===d?d:(g=d.ownerDocument)?g.defaultView||g.parentWindow:window,y?(R=n.relatedTarget||n.toElement,y=h,R=R?wl(R):null,R!==null&&(O=Xc(R),I=R.tag,R!==O||I!==5&&I!==27&&I!==6)&&(R=null)):(y=null,R=h),y!==R)){if(I=yy,V="onMouseLeave",x="onMouseEnter",b="mouse",(t==="pointerout"||t==="pointerover")&&(I=by,V="onPointerLeave",x="onPointerEnter",b="pointer"),O=y==null?g:Jo(y),N=R==null?g:Jo(R),g=new I(V,b+"leave",y,n,d),g.target=O,g.relatedTarget=N,V=null,wl(d)===h&&(I=new I(x,b+"enter",R,n,d),I.target=N,I.relatedTarget=O,V=I),O=V,y&&R)t:{for(I=HA,x=y,b=R,N=0,V=x;V;V=I(V))N++;V=0;for(var U=b;U;U=I(U))V++;for(;0<N-V;)x=I(x),N--;for(;0<V-N;)b=I(b),V--;for(;N--;){if(x===b||b!==null&&x===b.alternate){I=x;break t}x=I(x),b=I(b)}I=null}else I=null;y!==null&&uv(p,g,y,I,!1),R!==null&&O!==null&&uv(p,O,R,I,!0)}}e:{if(g=h?Jo(h):window,y=g.nodeName&&g.nodeName.toLowerCase(),y==="select"||y==="input"&&g.type==="file")var W=Ey;else if(Ty(g))if(Sx)W=nA;else{W=eA;var S=Zw}else y=g.nodeName,!y||y.toLowerCase()!=="input"||g.type!=="checkbox"&&g.type!=="radio"?h&&vp(h.elementType)&&(W=Ey):W=tA;if(W&&(W=W(t,h))){Ex(p,W,n,d);break e}S&&S(t,g,h),t==="focusout"&&h&&g.type==="number"&&h.memoizedProps.value!=null&&qm(g,"number",g.value)}switch(S=h?Jo(h):window,t){case"focusin":(Ty(S)||S.contentEditable==="true")&&(Rl=S,Ym=h,cc=null);break;case"focusout":cc=Ym=Rl=null;break;case"mousedown":Km=!0;break;case"contextmenu":case"mouseup":case"dragend":Km=!1,Ry(p,n,d);break;case"selectionchange":if(aA)break;case"keydown":case"keyup":Ry(p,n,d)}var _;if(Tp)e:{switch(t){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else Nl?_x(t,n)&&(E="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(xx&&n.locale!=="ko"&&(Nl||E!=="onCompositionStart"?E==="onCompositionEnd"&&Nl&&(_=bx()):(Vi=d,xp="value"in Vi?Vi.value:Vi.textContent,Nl=!0)),S=Xh(h,E),0<S.length&&(E=new vy(E,t,null,n,d),p.push({event:E,listeners:S}),_?E.data=_:(_=Tx(n),_!==null&&(E.data=_)))),(_=Kw?Qw(t,n):Xw(t,n))&&(E=Xh(h,"onBeforeInput"),0<E.length&&(S=new vy("onBeforeInput","beforeinput",null,n,d),p.push({event:S,listeners:E}),S.data=_)),BA(p,t,h,n,d)}vT(p,e)})}function Lc(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Xh(t,e){for(var n=e+"Capture",s=[];t!==null;){var a=t,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=Cc(t,n),a!=null&&s.unshift(Lc(t,a,i)),a=Cc(t,e),a!=null&&s.push(Lc(t,a,i))),t.tag===3)return s;t=t.return}return[]}function HA(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function uv(t,e,n,s,a){for(var i=e._reactName,r=[];n!==null&&n!==s;){var o=n,u=o.alternate,h=o.stateNode;if(o=o.tag,u!==null&&u===s)break;o!==5&&o!==26&&o!==27||h===null||(u=h,a?(h=Cc(n,i),h!=null&&r.unshift(Lc(n,h,u))):a||(h=Cc(n,i),h!=null&&r.push(Lc(n,h,u)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var GA=/\r\n?/g,YA=/\u0000|\uFFFD/g;function hv(t){return(typeof t=="string"?t:""+t).replace(GA,`
`).replace(YA,"")}function xT(t,e){return e=hv(e),hv(t)===e}function It(t,e,n,s,a,i){switch(n){case"children":typeof s=="string"?e==="body"||e==="textarea"&&s===""||Jl(t,s):(typeof s=="number"||typeof s=="bigint")&&e!=="body"&&Jl(t,""+s);break;case"className":ju(t,"class",s);break;case"tabIndex":ju(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":ju(t,n,s);break;case"style":yx(t,s,i);break;case"data":if(e!=="object"){ju(t,"data",s);break}case"src":case"href":if(s===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=eh(""+s),t.setAttribute(n,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&It(t,e,"name",a.name,a,null),It(t,e,"formEncType",a.formEncType,a,null),It(t,e,"formMethod",a.formMethod,a,null),It(t,e,"formTarget",a.formTarget,a,null)):(It(t,e,"encType",a.encType,a,null),It(t,e,"method",a.method,a,null),It(t,e,"target",a.target,a,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=eh(""+s),t.setAttribute(n,s);break;case"onClick":s!=null&&(t.onclick=Xa);break;case"onScroll":s!=null&&et("scroll",t);break;case"onScrollEnd":s!=null&&et("scrollend",t);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(G(61));if(n=s.__html,n!=null){if(a.children!=null)throw Error(G(60));t.innerHTML=n}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}n=eh(""+s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""+s):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":s===!0?t.setAttribute(n,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,s):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(n,s):t.removeAttribute(n);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(n):t.setAttribute(n,s);break;case"popover":et("beforetoggle",t),et("toggle",t),Zu(t,"popover",s);break;case"xlinkActuate":$a(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":$a(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":$a(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":$a(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":$a(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":$a(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":$a(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":$a(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":$a(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":Zu(t,"is",s);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=_w.get(n)||n,Zu(t,n,s))}}function v0(t,e,n,s,a,i){switch(n){case"style":yx(t,s,i);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(G(61));if(n=s.__html,n!=null){if(a.children!=null)throw Error(G(60));t.innerHTML=n}}break;case"children":typeof s=="string"?Jl(t,s):(typeof s=="number"||typeof s=="bigint")&&Jl(t,""+s);break;case"onScroll":s!=null&&et("scroll",t);break;case"onScrollEnd":s!=null&&et("scrollend",t);break;case"onClick":s!=null&&(t.onclick=Xa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!hx.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),i=t[Es]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,a),typeof s=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,s,a);break e}n in t?t[n]=s:s===!0?t.setAttribute(n,""):Zu(t,n,s)}}}function Yn(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":et("error",t),et("load",t);var s=!1,a=!1,i;for(i in n)if(n.hasOwnProperty(i)){var r=n[i];if(r!=null)switch(i){case"src":s=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(G(137,e));default:It(t,e,i,r,n,null)}}a&&It(t,e,"srcSet",n.srcSet,n,null),s&&It(t,e,"src",n.src,n,null);return;case"input":et("invalid",t);var o=i=r=a=null,u=null,h=null;for(s in n)if(n.hasOwnProperty(s)){var d=n[s];if(d!=null)switch(s){case"name":a=d;break;case"type":r=d;break;case"checked":u=d;break;case"defaultChecked":h=d;break;case"value":i=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(G(137,e));break;default:It(t,e,s,d,n,null)}}mx(t,i,o,u,h,r,a,!1);return;case"select":et("invalid",t),s=r=i=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":i=o;break;case"defaultValue":r=o;break;case"multiple":s=o;default:It(t,e,a,o,n,null)}e=i,n=r,t.multiple=!!s,e!=null?Ul(t,!!s,e,!1):n!=null&&Ul(t,!!s,n,!0);return;case"textarea":et("invalid",t),i=a=s=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":s=o;break;case"defaultValue":a=o;break;case"children":i=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(G(91));break;default:It(t,e,r,o,n,null)}gx(t,s,a,i);return;case"option":for(u in n)if(n.hasOwnProperty(u)&&(s=n[u],s!=null))switch(u){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:It(t,e,u,s,n,null)}return;case"dialog":et("beforetoggle",t),et("toggle",t),et("cancel",t),et("close",t);break;case"iframe":case"object":et("load",t);break;case"video":case"audio":for(s=0;s<Pc.length;s++)et(Pc[s],t);break;case"image":et("error",t),et("load",t);break;case"details":et("toggle",t);break;case"embed":case"source":case"link":et("error",t),et("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(h in n)if(n.hasOwnProperty(h)&&(s=n[h],s!=null))switch(h){case"children":case"dangerouslySetInnerHTML":throw Error(G(137,e));default:It(t,e,h,s,n,null)}return;default:if(vp(e)){for(d in n)n.hasOwnProperty(d)&&(s=n[d],s!==void 0&&v0(t,e,d,s,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(s=n[o],s!=null&&It(t,e,o,s,n,null))}function KA(t,e,n,s){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,r=null,o=null,u=null,h=null,d=null;for(y in n){var p=n[y];if(n.hasOwnProperty(y)&&p!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":u=p;default:s.hasOwnProperty(y)||It(t,e,y,null,s,p)}}for(var g in s){var y=s[g];if(p=n[g],s.hasOwnProperty(g)&&(y!=null||p!=null))switch(g){case"type":i=y;break;case"name":a=y;break;case"checked":h=y;break;case"defaultChecked":d=y;break;case"value":r=y;break;case"defaultValue":o=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(G(137,e));break;default:y!==p&&It(t,e,g,y,s,p)}}Fm(t,r,o,u,h,d,i,a);return;case"select":y=r=o=g=null;for(i in n)if(u=n[i],n.hasOwnProperty(i)&&u!=null)switch(i){case"value":break;case"multiple":y=u;default:s.hasOwnProperty(i)||It(t,e,i,null,s,u)}for(a in s)if(i=s[a],u=n[a],s.hasOwnProperty(a)&&(i!=null||u!=null))switch(a){case"value":g=i;break;case"defaultValue":o=i;break;case"multiple":r=i;default:i!==u&&It(t,e,a,i,s,u)}e=o,n=r,s=y,g!=null?Ul(t,!!n,g,!1):!!s!=!!n&&(e!=null?Ul(t,!!n,e,!0):Ul(t,!!n,n?[]:"",!1));return;case"textarea":y=g=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!s.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:It(t,e,o,null,s,a)}for(r in s)if(a=s[r],i=n[r],s.hasOwnProperty(r)&&(a!=null||i!=null))switch(r){case"value":g=a;break;case"defaultValue":y=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(G(91));break;default:a!==i&&It(t,e,r,a,s,i)}px(t,g,y);return;case"option":for(var R in n)if(g=n[R],n.hasOwnProperty(R)&&g!=null&&!s.hasOwnProperty(R))switch(R){case"selected":t.selected=!1;break;default:It(t,e,R,null,s,g)}for(u in s)if(g=s[u],y=n[u],s.hasOwnProperty(u)&&g!==y&&(g!=null||y!=null))switch(u){case"selected":t.selected=g&&typeof g!="function"&&typeof g!="symbol";break;default:It(t,e,u,g,s,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var I in n)g=n[I],n.hasOwnProperty(I)&&g!=null&&!s.hasOwnProperty(I)&&It(t,e,I,null,s,g);for(h in s)if(g=s[h],y=n[h],s.hasOwnProperty(h)&&g!==y&&(g!=null||y!=null))switch(h){case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(G(137,e));break;default:It(t,e,h,g,s,y)}return;default:if(vp(e)){for(var O in n)g=n[O],n.hasOwnProperty(O)&&g!==void 0&&!s.hasOwnProperty(O)&&v0(t,e,O,void 0,s,g);for(d in s)g=s[d],y=n[d],!s.hasOwnProperty(d)||g===y||g===void 0&&y===void 0||v0(t,e,d,g,s,y);return}}for(var x in n)g=n[x],n.hasOwnProperty(x)&&g!=null&&!s.hasOwnProperty(x)&&It(t,e,x,null,s,g);for(p in s)g=s[p],y=n[p],!s.hasOwnProperty(p)||g===y||g==null&&y==null||It(t,e,p,g,s,y)}function fv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function QA(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),s=0;s<n.length;s++){var a=n[s],i=a.transferSize,r=a.initiatorType,o=a.duration;if(i&&o&&fv(r)){for(r=0,o=a.responseEnd,s+=1;s<n.length;s++){var u=n[s],h=u.startTime;if(h>o)break;var d=u.transferSize,p=u.initiatorType;d&&fv(p)&&(u=u.responseEnd,r+=d*(u<o?1:(o-h)/(u-h)))}if(--s,e+=8*(i+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var b0=null,x0=null;function Wh(t){return t.nodeType===9?t:t.ownerDocument}function dv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function _T(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function _0(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var rm=null;function XA(){var t=window.event;return t&&t.type==="popstate"?t===rm?!1:(rm=t,!0):(rm=null,!1)}var TT=typeof setTimeout=="function"?setTimeout:void 0,WA=typeof clearTimeout=="function"?clearTimeout:void 0,mv=typeof Promise=="function"?Promise:void 0,JA=typeof queueMicrotask=="function"?queueMicrotask:typeof mv<"u"?function(t){return mv.resolve(null).then(t).catch(ZA)}:TT;function ZA(t){setTimeout(function(){throw t})}function pr(t){return t==="head"}function pv(t,e){var n=e,s=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(s===0){t.removeChild(a),ro(e);return}s--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")s++;else if(n==="html")bc(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,bc(n);for(var i=n.firstChild;i;){var r=i.nextSibling,o=i.nodeName;i[eu]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=r}}else n==="body"&&bc(t.ownerDocument.body);n=a}while(n);ro(e)}function gv(t,e){var n=t;t=0;do{var s=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=s}while(n)}function T0(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":T0(n),yp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function e5(t,e,n,s){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[eu])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=ta(t.nextSibling),t===null)break}return null}function t5(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=ta(t.nextSibling),t===null))return null;return t}function ET(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=ta(t.nextSibling),t===null))return null;return t}function E0(t){return t.data==="$?"||t.data==="$~"}function S0(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function n5(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var s=function(){e(),n.removeEventListener("DOMContentLoaded",s)};n.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function ta(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var w0=null;function yv(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return ta(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function vv(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function ST(t,e,n){switch(e=Wh(n),t){case"html":if(t=e.documentElement,!t)throw Error(G(452));return t;case"head":if(t=e.head,!t)throw Error(G(453));return t;case"body":if(t=e.body,!t)throw Error(G(454));return t;default:throw Error(G(451))}}function bc(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);yp(t)}var sa=new Map,bv=new Set;function Jh(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var pi=yt.d;yt.d={f:s5,r:a5,D:i5,C:r5,L:l5,m:o5,X:u5,S:c5,M:h5};function s5(){var t=pi.f(),e=Hf();return t||e}function a5(t){var e=xo(t);e!==null&&e.tag===5&&e.type==="form"?y_(e):pi.r(t)}var So=typeof document>"u"?null:document;function wT(t,e,n){var s=So;if(s&&typeof e=="string"&&e){var a=Xs(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),bv.has(a)||(bv.add(a),t={rel:t,crossOrigin:n,href:e},s.querySelector(a)===null&&(e=s.createElement("link"),Yn(e,"link",t),Ln(e),s.head.appendChild(e)))}}function i5(t){pi.D(t),wT("dns-prefetch",t,null)}function r5(t,e){pi.C(t,e),wT("preconnect",t,e)}function l5(t,e,n){pi.L(t,e,n);var s=So;if(s&&t&&e){var a='link[rel="preload"][as="'+Xs(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Xs(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Xs(n.imageSizes)+'"]')):a+='[href="'+Xs(t)+'"]';var i=a;switch(e){case"style":i=io(t);break;case"script":i=wo(t)}sa.has(i)||(t=Xt({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),sa.set(i,t),s.querySelector(a)!==null||e==="style"&&s.querySelector(ru(i))||e==="script"&&s.querySelector(lu(i))||(e=s.createElement("link"),Yn(e,"link",t),Ln(e),s.head.appendChild(e)))}}function o5(t,e){pi.m(t,e);var n=So;if(n&&t){var s=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Xs(s)+'"][href="'+Xs(t)+'"]',i=a;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=wo(t)}if(!sa.has(i)&&(t=Xt({rel:"modulepreload",href:t},e),sa.set(i,t),n.querySelector(a)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(lu(i)))return}s=n.createElement("link"),Yn(s,"link",t),Ln(s),n.head.appendChild(s)}}}function c5(t,e,n){pi.S(t,e,n);var s=So;if(s&&t){var a=Ll(s).hoistableStyles,i=io(t);e=e||"default";var r=a.get(i);if(!r){var o={loading:0,preload:null};if(r=s.querySelector(ru(i)))o.loading=5;else{t=Xt({rel:"stylesheet",href:t,"data-precedence":e},n),(n=sa.get(i))&&ng(t,n);var u=r=s.createElement("link");Ln(u),Yn(u,"link",t),u._p=new Promise(function(h,d){u.onload=h,u.onerror=d}),u.addEventListener("load",function(){o.loading|=1}),u.addEventListener("error",function(){o.loading|=2}),o.loading|=4,uh(r,e,s)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(i,r)}}}function u5(t,e){pi.X(t,e);var n=So;if(n&&t){var s=Ll(n).hoistableScripts,a=wo(t),i=s.get(a);i||(i=n.querySelector(lu(a)),i||(t=Xt({src:t,async:!0},e),(e=sa.get(a))&&sg(t,e),i=n.createElement("script"),Ln(i),Yn(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},s.set(a,i))}}function h5(t,e){pi.M(t,e);var n=So;if(n&&t){var s=Ll(n).hoistableScripts,a=wo(t),i=s.get(a);i||(i=n.querySelector(lu(a)),i||(t=Xt({src:t,async:!0,type:"module"},e),(e=sa.get(a))&&sg(t,e),i=n.createElement("script"),Ln(i),Yn(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},s.set(a,i))}}function xv(t,e,n,s){var a=(a=Bi.current)?Jh(a):null;if(!a)throw Error(G(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=io(n.href),n=Ll(a).hoistableStyles,s=n.get(e),s||(s={type:"style",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=io(n.href);var i=Ll(a).hoistableStyles,r=i.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,r),(i=a.querySelector(ru(t)))&&!i._p&&(r.instance=i,r.state.loading=5),sa.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},sa.set(t,n),i||f5(a,t,n,r.state))),e&&s===null)throw Error(G(528,""));return r}if(e&&s!==null)throw Error(G(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=wo(n),n=Ll(a).hoistableScripts,s=n.get(e),s||(s={type:"script",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(G(444,t))}}function io(t){return'href="'+Xs(t)+'"'}function ru(t){return'link[rel="stylesheet"]['+t+"]"}function AT(t){return Xt({},t,{"data-precedence":t.precedence,precedence:null})}function f5(t,e,n,s){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?s.loading=1:(e=t.createElement("link"),s.preload=e,e.addEventListener("load",function(){return s.loading|=1}),e.addEventListener("error",function(){return s.loading|=2}),Yn(e,"link",n),Ln(e),t.head.appendChild(e))}function wo(t){return'[src="'+Xs(t)+'"]'}function lu(t){return"script[async]"+t}function _v(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var s=t.querySelector('style[data-href~="'+Xs(n.href)+'"]');if(s)return e.instance=s,Ln(s),s;var a=Xt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),Ln(s),Yn(s,"style",a),uh(s,n.precedence,t),e.instance=s;case"stylesheet":a=io(n.href);var i=t.querySelector(ru(a));if(i)return e.state.loading|=4,e.instance=i,Ln(i),i;s=AT(n),(a=sa.get(a))&&ng(s,a),i=(t.ownerDocument||t).createElement("link"),Ln(i);var r=i;return r._p=new Promise(function(o,u){r.onload=o,r.onerror=u}),Yn(i,"link",s),e.state.loading|=4,uh(i,n.precedence,t),e.instance=i;case"script":return i=wo(n.src),(a=t.querySelector(lu(i)))?(e.instance=a,Ln(a),a):(s=n,(a=sa.get(i))&&(s=Xt({},n),sg(s,a)),t=t.ownerDocument||t,a=t.createElement("script"),Ln(a),Yn(a,"link",s),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(G(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(s=e.instance,e.state.loading|=4,uh(s,n.precedence,t));return e.instance}function uh(t,e,n){for(var s=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=s.length?s[s.length-1]:null,i=a,r=0;r<s.length;r++){var o=s[r];if(o.dataset.precedence===e)i=o;else if(i!==a)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function ng(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function sg(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var hh=null;function Tv(t,e,n){if(hh===null){var s=new Map,a=hh=new Map;a.set(n,s)}else a=hh,s=a.get(n),s||(s=new Map,a.set(n,s));if(s.has(t))return s;for(s.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var i=n[a];if(!(i[eu]||i[Fn]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var r=i.getAttribute(e)||"";r=t+r;var o=s.get(r);o?o.push(i):s.set(r,[i])}}return s}function Ev(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function d5(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function NT(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function m5(t,e,n,s){if(n.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=io(s.href),i=e.querySelector(ru(a));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Zh.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Ln(i);return}i=e.ownerDocument||e,s=AT(s),(a=sa.get(a))&&ng(s,a),i=i.createElement("link"),Ln(i);var r=i;r._p=new Promise(function(o,u){r.onload=o,r.onerror=u}),Yn(i,"link",s),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Zh.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var lm=0;function p5(t,e){return t.stylesheets&&t.count===0&&fh(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var s=setTimeout(function(){if(t.stylesheets&&fh(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&lm===0&&(lm=62500*QA());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&fh(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>lm?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(a)}}:null}function Zh(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)fh(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var ef=null;function fh(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ef=new Map,e.forEach(g5,t),ef=null,Zh.call(t))}function g5(t,e){if(!(e.state.loading&4)){var n=ef.get(t);if(n)var s=n.get(null);else{n=new Map,ef.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var r=a[i];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),s=r)}s&&n.set(null,s)}a=e.instance,r=a.getAttribute("data-precedence"),i=n.get(r)||s,i===s&&n.set(null,a),n.set(r,a),this.count++,s=Zh.bind(this),a.addEventListener("load",s),a.addEventListener("error",s),i?i.parentNode.insertBefore(a,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Uc={$$typeof:Qa,Provider:null,Consumer:null,_currentValue:Ur,_currentValue2:Ur,_threadCount:0};function y5(t,e,n,s,a,i,r,o,u){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=kd(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=kd(0),this.hiddenUpdates=kd(null),this.identifierPrefix=s,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=u,this.incompleteTransitions=new Map}function RT(t,e,n,s,a,i,r,o,u,h,d,p){return t=new y5(t,e,n,r,u,h,d,p,o),e=1,i===!0&&(e|=24),i=Ms(3,null,null,e),t.current=i,i.stateNode=t,e=Cp(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:s,isDehydrated:n,cache:e},Mp(i),t}function CT(t){return t?(t=Il,t):Il}function kT(t,e,n,s,a,i){a=CT(a),s.context===null?s.context=a:s.pendingContext=a,s=Fi(e),s.payload={element:n},i=i===void 0?null:i,i!==null&&(s.callback=i),n=qi(t,s,e),n!==null&&(Ts(n,t,e),hc(n,t,e))}function Sv(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ag(t,e){Sv(t,e),(t=t.alternate)&&Sv(t,e)}function IT(t){if(t.tag===13||t.tag===31){var e=rl(t,67108864);e!==null&&Ts(e,t,67108864),ag(t,67108864)}}function wv(t){if(t.tag===13||t.tag===31){var e=Ls();e=pp(e);var n=rl(t,e);n!==null&&Ts(n,t,e),ag(t,e)}}var tf=!0;function v5(t,e,n,s){var a=Ce.T;Ce.T=null;var i=yt.p;try{yt.p=2,ig(t,e,n,s)}finally{yt.p=i,Ce.T=a}}function b5(t,e,n,s){var a=Ce.T;Ce.T=null;var i=yt.p;try{yt.p=8,ig(t,e,n,s)}finally{yt.p=i,Ce.T=a}}function ig(t,e,n,s){if(tf){var a=A0(s);if(a===null)im(t,e,s,nf,n),Av(t,s);else if(_5(a,t,e,n,s))s.stopPropagation();else if(Av(t,s),e&4&&-1<x5.indexOf(t)){for(;a!==null;){var i=xo(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var r=Ir(i.pendingLanes);if(r!==0){var o=i;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var u=1<<31-Ps(r);o.entanglements[1]|=u,r&=~u}Va(i),!(gt&6)&&(Hh=Os()+500,iu(0,!1))}}break;case 31:case 13:o=rl(i,2),o!==null&&Ts(o,i,2),Hf(),ag(i,2)}if(i=A0(s),i===null&&im(t,e,s,nf,n),i===a)break;a=i}a!==null&&s.stopPropagation()}else im(t,e,s,null,n)}}function A0(t){return t=bp(t),rg(t)}var nf=null;function rg(t){if(nf=null,t=wl(t),t!==null){var e=Xc(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=Wb(e),t!==null)return t;t=null}else if(n===31){if(t=Jb(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return nf=t,null}function MT(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(iw()){case nx:return 2;case sx:return 8;case Ih:case rw:return 32;case ax:return 268435456;default:return 32}default:return 32}}var N0=!1,Yi=null,Ki=null,Qi=null,zc=new Map,Bc=new Map,ki=[],x5="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Av(t,e){switch(t){case"focusin":case"focusout":Yi=null;break;case"dragenter":case"dragleave":Ki=null;break;case"mouseover":case"mouseout":Qi=null;break;case"pointerover":case"pointerout":zc.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bc.delete(e.pointerId)}}function Go(t,e,n,s,a,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:s,nativeEvent:i,targetContainers:[a]},e!==null&&(e=xo(e),e!==null&&IT(e)),t):(t.eventSystemFlags|=s,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function _5(t,e,n,s,a){switch(e){case"focusin":return Yi=Go(Yi,t,e,n,s,a),!0;case"dragenter":return Ki=Go(Ki,t,e,n,s,a),!0;case"mouseover":return Qi=Go(Qi,t,e,n,s,a),!0;case"pointerover":var i=a.pointerId;return zc.set(i,Go(zc.get(i)||null,t,e,n,s,a)),!0;case"gotpointercapture":return i=a.pointerId,Bc.set(i,Go(Bc.get(i)||null,t,e,n,s,a)),!0}return!1}function DT(t){var e=wl(t.target);if(e!==null){var n=Xc(e);if(n!==null){if(e=n.tag,e===13){if(e=Wb(n),e!==null){t.blockedOn=e,uy(t.priority,function(){wv(n)});return}}else if(e===31){if(e=Jb(n),e!==null){t.blockedOn=e,uy(t.priority,function(){wv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function dh(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=A0(t.nativeEvent);if(n===null){n=t.nativeEvent;var s=new n.constructor(n.type,n);Hm=s,n.target.dispatchEvent(s),Hm=null}else return e=xo(n),e!==null&&IT(e),t.blockedOn=n,!1;e.shift()}return!0}function Nv(t,e,n){dh(t)&&n.delete(e)}function T5(){N0=!1,Yi!==null&&dh(Yi)&&(Yi=null),Ki!==null&&dh(Ki)&&(Ki=null),Qi!==null&&dh(Qi)&&(Qi=null),zc.forEach(Nv),Bc.forEach(Nv)}function $u(t,e){t.blockedOn===e&&(t.blockedOn=null,N0||(N0=!0,Mn.unstable_scheduleCallback(Mn.unstable_NormalPriority,T5)))}var Fu=null;function Rv(t){Fu!==t&&(Fu=t,Mn.unstable_scheduleCallback(Mn.unstable_NormalPriority,function(){Fu===t&&(Fu=null);for(var e=0;e<t.length;e+=3){var n=t[e],s=t[e+1],a=t[e+2];if(typeof s!="function"){if(rg(s||n)===null)continue;break}var i=xo(n);i!==null&&(t.splice(e,3),e-=3,l0(i,{pending:!0,data:a,method:n.method,action:s},s,a))}}))}function ro(t){function e(u){return $u(u,t)}Yi!==null&&$u(Yi,t),Ki!==null&&$u(Ki,t),Qi!==null&&$u(Qi,t),zc.forEach(e),Bc.forEach(e);for(var n=0;n<ki.length;n++){var s=ki[n];s.blockedOn===t&&(s.blockedOn=null)}for(;0<ki.length&&(n=ki[0],n.blockedOn===null);)DT(n),n.blockedOn===null&&ki.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(s=0;s<n.length;s+=3){var a=n[s],i=n[s+1],r=a[Es]||null;if(typeof i=="function")r||Rv(n);else if(r){var o=null;if(i&&i.hasAttribute("formAction")){if(a=i,r=i[Es]||null)o=r.formAction;else if(rg(a)!==null)continue}else o=r.action;typeof o=="function"?n[s+1]=o:(n.splice(s,3),s-=3),Rv(n)}}}function jT(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),s||setTimeout(n,20)}function n(){if(!s&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function lg(t){this._internalRoot=t}Kf.prototype.render=lg.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(G(409));var n=e.current,s=Ls();kT(n,s,t,e,null,null)};Kf.prototype.unmount=lg.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;kT(t.current,2,null,t,null,null),Hf(),e[bo]=null}};function Kf(t){this._internalRoot=t}Kf.prototype.unstable_scheduleHydration=function(t){if(t){var e=cx();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ki.length&&e!==0&&e<ki[n].priority;n++);ki.splice(n,0,t),n===0&&DT(t)}};var Cv=Qb.version;if(Cv!=="19.2.5")throw Error(G(527,Cv,"19.2.5"));yt.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(G(188)):(t=Object.keys(t).join(","),Error(G(268,t)));return t=JS(e),t=t!==null?Zb(t):null,t=t===null?null:t.stateNode,t};var E5={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:Ce,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var qu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!qu.isDisabled&&qu.supportsFiber)try{Wc=qu.inject(E5),Vs=qu}catch{}}If.createRoot=function(t,e){if(!Xb(t))throw Error(G(299));var n=!1,s="",a=w_,i=A_,r=N_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=RT(t,1,!1,null,null,n,s,null,a,i,r,jT),t[bo]=e.current,tg(t),new lg(e)};If.hydrateRoot=function(t,e,n){if(!Xb(t))throw Error(G(299));var s=!1,a="",i=w_,r=A_,o=N_,u=null;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(u=n.formState)),e=RT(t,1,!0,e,n??null,s,a,u,i,r,o,jT),e.context=CT(null),n=e.current,s=Ls(),s=pp(s),a=Fi(s),a.callback=null,qi(n,a,s),n=s,e.current.lanes=n,Zc(e,n),Va(e),t[bo]=e.current,tg(t),new Kf(e)};If.version="19.2.5";function OT(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(OT)}catch(t){console.error(t)}}OT(),Fb.exports=If;var S5=Fb.exports;const w5=Db(S5),A5=()=>{};/**
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
 */const VT=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let a=t.charCodeAt(s);a<128?e[n++]=a:a<2048?(e[n++]=a>>6|192,e[n++]=a&63|128):(a&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(a=65536+((a&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=a>>18|240,e[n++]=a>>12&63|128,e[n++]=a>>6&63|128,e[n++]=a&63|128):(e[n++]=a>>12|224,e[n++]=a>>6&63|128,e[n++]=a&63|128)}return e},N5=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const a=t[n++];if(a<128)e[s++]=String.fromCharCode(a);else if(a>191&&a<224){const i=t[n++];e[s++]=String.fromCharCode((a&31)<<6|i&63)}else if(a>239&&a<365){const i=t[n++],r=t[n++],o=t[n++],u=((a&7)<<18|(i&63)<<12|(r&63)<<6|o&63)-65536;e[s++]=String.fromCharCode(55296+(u>>10)),e[s++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],r=t[n++];e[s++]=String.fromCharCode((a&15)<<12|(i&63)<<6|r&63)}}return e.join("")},PT={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let a=0;a<t.length;a+=3){const i=t[a],r=a+1<t.length,o=r?t[a+1]:0,u=a+2<t.length,h=u?t[a+2]:0,d=i>>2,p=(i&3)<<4|o>>4;let g=(o&15)<<2|h>>6,y=h&63;u||(y=64,r||(g=64)),s.push(n[d],n[p],n[g],n[y])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(VT(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):N5(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let a=0;a<t.length;){const i=n[t.charAt(a++)],o=a<t.length?n[t.charAt(a)]:0;++a;const h=a<t.length?n[t.charAt(a)]:64;++a;const p=a<t.length?n[t.charAt(a)]:64;if(++a,i==null||o==null||h==null||p==null)throw new R5;const g=i<<2|o>>4;if(s.push(g),h!==64){const y=o<<4&240|h>>2;if(s.push(y),p!==64){const R=h<<6&192|p;s.push(R)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class R5 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const C5=function(t){const e=VT(t);return PT.encodeByteArray(e,!0)},sf=function(t){return C5(t).replace(/\./g,"")},LT=function(t){try{return PT.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function k5(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const I5=()=>k5().__FIREBASE_DEFAULTS__,M5=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},D5=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&LT(t[1]);return e&&JSON.parse(e)},Qf=()=>{try{return A5()||I5()||M5()||D5()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},UT=t=>{var e,n;return(n=(e=Qf())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},j5=t=>{const e=UT(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},zT=()=>{var t;return(t=Qf())==null?void 0:t.config},BT=t=>{var e;return(e=Qf())==null?void 0:e[`_${t}`]};/**
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
 */class O5{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function V5(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",a=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r={iss:`https://securetoken.google.com/${s}`,aud:s,iat:a,exp:a+3600,auth_time:a,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t},o="";return[sf(JSON.stringify(n)),sf(JSON.stringify(r)),o].join(".")}/**
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
 */function is(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function P5(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(is())}function L5(){var e;const t=(e=Qf())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function U5(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function z5(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function B5(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function $5(){const t=is();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function F5(){return!L5()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function q5(){try{return typeof indexedDB=="object"}catch{return!1}}function H5(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(s);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var i;e(((i=a.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}/**
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
 */const G5="FirebaseError";class gi extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=G5,Object.setPrototypeOf(this,gi.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ou.prototype.create)}}class ou{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},a=`${this.service}/${e}`,i=this.errors[e],r=i?Y5(i,s):"Error",o=`${this.serviceName}: ${r} (${a}).`;return new gi(a,o,s)}}function Y5(t,e){return t.replace(K5,(n,s)=>{const a=e[s];return a!=null?String(a):`<${s}?>`})}const K5=/\{\$([^}]+)}/g;function Q5(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function rr(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const a of n){if(!s.includes(a))return!1;const i=t[a],r=e[a];if(kv(i)&&kv(r)){if(!rr(i,r))return!1}else if(i!==r)return!1}for(const a of s)if(!n.includes(a))return!1;return!0}function kv(t){return t!==null&&typeof t=="object"}/**
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
 */function cu(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(a=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(a))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function X5(t,e){const n=new W5(t,e);return n.subscribe.bind(n)}class W5{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let a;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");J5(e,["next","error","complete"])?a=e:a={next:e,error:n,complete:s},a.next===void 0&&(a.next=om),a.error===void 0&&(a.error=om),a.complete===void 0&&(a.complete=om);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function J5(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function om(){}/**
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
 */function Kn(t){return t&&t._delegate?t._delegate:t}/**
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
 */function uu(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function $T(t){return(await fetch(t,{credentials:"include"})).ok}class Wr{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Z5{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new O5;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:n});a&&s.resolve(a)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(tN(e))try{this.getOrInitializeService({instanceIdentifier:jr})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:a});s.resolve(i)}catch{}}}}clearInstance(e=jr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=jr){return this.instances.has(e)}getOptions(e=jr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(i);s===o&&r.resolve(a)}return a}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),a=this.onInitCallbacks.get(s)??new Set;a.add(e),this.onInitCallbacks.set(s,a);const i=this.instances.get(s);return i&&e(i,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const a of s)try{a(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:eN(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=jr){return this.component?this.component.multipleInstances?e:jr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function eN(t){return t===jr?void 0:t}function tN(t){return t.instantiationMode==="EAGER"}/**
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
 */class nN{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Z5(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var nt;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(nt||(nt={}));const sN={debug:nt.DEBUG,verbose:nt.VERBOSE,info:nt.INFO,warn:nt.WARN,error:nt.ERROR,silent:nt.SILENT},aN=nt.INFO,iN={[nt.DEBUG]:"log",[nt.VERBOSE]:"log",[nt.INFO]:"info",[nt.WARN]:"warn",[nt.ERROR]:"error"},rN=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),a=iN[e];if(a)console[a](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class og{constructor(e){this.name=e,this._logLevel=aN,this._logHandler=rN,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in nt))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?sN[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,nt.DEBUG,...e),this._logHandler(this,nt.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,nt.VERBOSE,...e),this._logHandler(this,nt.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,nt.INFO,...e),this._logHandler(this,nt.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,nt.WARN,...e),this._logHandler(this,nt.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,nt.ERROR,...e),this._logHandler(this,nt.ERROR,...e)}}const lN=(t,e)=>e.some(n=>t instanceof n);let Iv,Mv;function oN(){return Iv||(Iv=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function cN(){return Mv||(Mv=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const FT=new WeakMap,R0=new WeakMap,qT=new WeakMap,cm=new WeakMap,cg=new WeakMap;function uN(t){const e=new Promise((n,s)=>{const a=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{n(Xi(t.result)),a()},r=()=>{s(t.error),a()};t.addEventListener("success",i),t.addEventListener("error",r)});return e.then(n=>{n instanceof IDBCursor&&FT.set(n,t)}).catch(()=>{}),cg.set(e,t),e}function hN(t){if(R0.has(t))return;const e=new Promise((n,s)=>{const a=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{n(),a()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),a()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)});R0.set(t,e)}let C0={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return R0.get(t);if(e==="objectStoreNames")return t.objectStoreNames||qT.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Xi(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function fN(t){C0=t(C0)}function dN(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(um(this),e,...n);return qT.set(s,e.sort?e.sort():[e]),Xi(s)}:cN().includes(t)?function(...e){return t.apply(um(this),e),Xi(FT.get(this))}:function(...e){return Xi(t.apply(um(this),e))}}function mN(t){return typeof t=="function"?dN(t):(t instanceof IDBTransaction&&hN(t),lN(t,oN())?new Proxy(t,C0):t)}function Xi(t){if(t instanceof IDBRequest)return uN(t);if(cm.has(t))return cm.get(t);const e=mN(t);return e!==t&&(cm.set(t,e),cg.set(e,t)),e}const um=t=>cg.get(t);function pN(t,e,{blocked:n,upgrade:s,blocking:a,terminated:i}={}){const r=indexedDB.open(t,e),o=Xi(r);return s&&r.addEventListener("upgradeneeded",u=>{s(Xi(r.result),u.oldVersion,u.newVersion,Xi(r.transaction),u)}),n&&r.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),o.then(u=>{i&&u.addEventListener("close",()=>i()),a&&u.addEventListener("versionchange",h=>a(h.oldVersion,h.newVersion,h))}).catch(()=>{}),o}const gN=["get","getKey","getAll","getAllKeys","count"],yN=["put","add","delete","clear"],hm=new Map;function Dv(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(hm.get(e))return hm.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,a=yN.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(a||gN.includes(n)))return;const i=async function(r,...o){const u=this.transaction(r,a?"readwrite":"readonly");let h=u.store;return s&&(h=h.index(o.shift())),(await Promise.all([h[n](...o),a&&u.done]))[0]};return hm.set(e,i),i}fN(t=>({...t,get:(e,n,s)=>Dv(e,n)||t.get(e,n,s),has:(e,n)=>!!Dv(e,n)||t.has(e,n)}));/**
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
 */class vN{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(bN(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function bN(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const k0="@firebase/app",jv="0.14.11";/**
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
 */const ui=new og("@firebase/app"),xN="@firebase/app-compat",_N="@firebase/analytics-compat",TN="@firebase/analytics",EN="@firebase/app-check-compat",SN="@firebase/app-check",wN="@firebase/auth",AN="@firebase/auth-compat",NN="@firebase/database",RN="@firebase/data-connect",CN="@firebase/database-compat",kN="@firebase/functions",IN="@firebase/functions-compat",MN="@firebase/installations",DN="@firebase/installations-compat",jN="@firebase/messaging",ON="@firebase/messaging-compat",VN="@firebase/performance",PN="@firebase/performance-compat",LN="@firebase/remote-config",UN="@firebase/remote-config-compat",zN="@firebase/storage",BN="@firebase/storage-compat",$N="@firebase/firestore",FN="@firebase/ai",qN="@firebase/firestore-compat",HN="firebase",GN="12.12.0";/**
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
 */const I0="[DEFAULT]",YN={[k0]:"fire-core",[xN]:"fire-core-compat",[TN]:"fire-analytics",[_N]:"fire-analytics-compat",[SN]:"fire-app-check",[EN]:"fire-app-check-compat",[wN]:"fire-auth",[AN]:"fire-auth-compat",[NN]:"fire-rtdb",[RN]:"fire-data-connect",[CN]:"fire-rtdb-compat",[kN]:"fire-fn",[IN]:"fire-fn-compat",[MN]:"fire-iid",[DN]:"fire-iid-compat",[jN]:"fire-fcm",[ON]:"fire-fcm-compat",[VN]:"fire-perf",[PN]:"fire-perf-compat",[LN]:"fire-rc",[UN]:"fire-rc-compat",[zN]:"fire-gcs",[BN]:"fire-gcs-compat",[$N]:"fire-fst",[qN]:"fire-fst-compat",[FN]:"fire-vertex","fire-js":"fire-js",[HN]:"fire-js-all"};/**
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
 */const af=new Map,KN=new Map,M0=new Map;function Ov(t,e){try{t.container.addComponent(e)}catch(n){ui.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function lo(t){const e=t.name;if(M0.has(e))return ui.debug(`There were multiple attempts to register component ${e}.`),!1;M0.set(e,t);for(const n of af.values())Ov(n,t);for(const n of KN.values())Ov(n,t);return!0}function ug(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ha(t){return t==null?!1:t.settings!==void 0}/**
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
 */const QN={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Wi=new ou("app","Firebase",QN);/**
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
 */class XN{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Wr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Wi.create("app-deleted",{appName:this._name})}}/**
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
 */const Ao=GN;function HT(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:I0,automaticDataCollectionEnabled:!0,...e},a=s.name;if(typeof a!="string"||!a)throw Wi.create("bad-app-name",{appName:String(a)});if(n||(n=zT()),!n)throw Wi.create("no-options");const i=af.get(a);if(i){if(rr(n,i.options)&&rr(s,i.config))return i;throw Wi.create("duplicate-app",{appName:a})}const r=new nN(a);for(const u of M0.values())r.addComponent(u);const o=new XN(n,s,r);return af.set(a,o),o}function GT(t=I0){const e=af.get(t);if(!e&&t===I0&&zT())return HT();if(!e)throw Wi.create("no-app",{appName:t});return e}function Ji(t,e,n){let s=YN[t]??t;n&&(s+=`-${n}`);const a=s.match(/\s|\//),i=e.match(/\s|\//);if(a||i){const r=[`Unable to register library "${s}" with version "${e}":`];a&&r.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&i&&r.push("and"),i&&r.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ui.warn(r.join(" "));return}lo(new Wr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const WN="firebase-heartbeat-database",JN=1,$c="firebase-heartbeat-store";let fm=null;function YT(){return fm||(fm=pN(WN,JN,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore($c)}catch(n){console.warn(n)}}}}).catch(t=>{throw Wi.create("idb-open",{originalErrorMessage:t.message})})),fm}async function ZN(t){try{const n=(await YT()).transaction($c),s=await n.objectStore($c).get(KT(t));return await n.done,s}catch(e){if(e instanceof gi)ui.warn(e.message);else{const n=Wi.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ui.warn(n.message)}}}async function Vv(t,e){try{const s=(await YT()).transaction($c,"readwrite");await s.objectStore($c).put(e,KT(t)),await s.done}catch(n){if(n instanceof gi)ui.warn(n.message);else{const s=Wi.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ui.warn(s.message)}}}function KT(t){return`${t.name}!${t.options.appId}`}/**
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
 */const eR=1024,tR=30;class nR{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new aR(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Pv();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(r=>r.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:a}),this._heartbeatsCache.heartbeats.length>tR){const r=iR(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){ui.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Pv(),{heartbeatsToSend:s,unsentEntries:a}=sR(this._heartbeatsCache.heartbeats),i=sf(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return ui.warn(n),""}}}function Pv(){return new Date().toISOString().substring(0,10)}function sR(t,e=eR){const n=[];let s=t.slice();for(const a of t){const i=n.find(r=>r.agent===a.agent);if(i){if(i.dates.push(a.date),Lv(n)>e){i.dates.pop();break}}else if(n.push({agent:a.agent,dates:[a.date]}),Lv(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class aR{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return q5()?H5().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await ZN(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Vv(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Vv(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Lv(t){return sf(JSON.stringify({version:2,heartbeats:t})).length}function iR(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
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
 */function rR(t){lo(new Wr("platform-logger",e=>new vN(e),"PRIVATE")),lo(new Wr("heartbeat",e=>new nR(e),"PRIVATE")),Ji(k0,jv,t),Ji(k0,jv,"esm2020"),Ji("fire-js","")}rR("");var lR="firebase",oR="12.12.1";/**
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
 */Ji(lR,oR,"app");var Uv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Zi,QT;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,_){function E(){}E.prototype=_.prototype,S.F=_.prototype,S.prototype=new E,S.prototype.constructor=S,S.D=function(A,w,M){for(var T=Array(arguments.length-2),ue=2;ue<arguments.length;ue++)T[ue-2]=arguments[ue];return _.prototype[w].apply(A,T)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,n),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function a(S,_,E){E||(E=0);const A=Array(16);if(typeof _=="string")for(var w=0;w<16;++w)A[w]=_.charCodeAt(E++)|_.charCodeAt(E++)<<8|_.charCodeAt(E++)<<16|_.charCodeAt(E++)<<24;else for(w=0;w<16;++w)A[w]=_[E++]|_[E++]<<8|_[E++]<<16|_[E++]<<24;_=S.g[0],E=S.g[1],w=S.g[2];let M=S.g[3],T;T=_+(M^E&(w^M))+A[0]+3614090360&4294967295,_=E+(T<<7&4294967295|T>>>25),T=M+(w^_&(E^w))+A[1]+3905402710&4294967295,M=_+(T<<12&4294967295|T>>>20),T=w+(E^M&(_^E))+A[2]+606105819&4294967295,w=M+(T<<17&4294967295|T>>>15),T=E+(_^w&(M^_))+A[3]+3250441966&4294967295,E=w+(T<<22&4294967295|T>>>10),T=_+(M^E&(w^M))+A[4]+4118548399&4294967295,_=E+(T<<7&4294967295|T>>>25),T=M+(w^_&(E^w))+A[5]+1200080426&4294967295,M=_+(T<<12&4294967295|T>>>20),T=w+(E^M&(_^E))+A[6]+2821735955&4294967295,w=M+(T<<17&4294967295|T>>>15),T=E+(_^w&(M^_))+A[7]+4249261313&4294967295,E=w+(T<<22&4294967295|T>>>10),T=_+(M^E&(w^M))+A[8]+1770035416&4294967295,_=E+(T<<7&4294967295|T>>>25),T=M+(w^_&(E^w))+A[9]+2336552879&4294967295,M=_+(T<<12&4294967295|T>>>20),T=w+(E^M&(_^E))+A[10]+4294925233&4294967295,w=M+(T<<17&4294967295|T>>>15),T=E+(_^w&(M^_))+A[11]+2304563134&4294967295,E=w+(T<<22&4294967295|T>>>10),T=_+(M^E&(w^M))+A[12]+1804603682&4294967295,_=E+(T<<7&4294967295|T>>>25),T=M+(w^_&(E^w))+A[13]+4254626195&4294967295,M=_+(T<<12&4294967295|T>>>20),T=w+(E^M&(_^E))+A[14]+2792965006&4294967295,w=M+(T<<17&4294967295|T>>>15),T=E+(_^w&(M^_))+A[15]+1236535329&4294967295,E=w+(T<<22&4294967295|T>>>10),T=_+(w^M&(E^w))+A[1]+4129170786&4294967295,_=E+(T<<5&4294967295|T>>>27),T=M+(E^w&(_^E))+A[6]+3225465664&4294967295,M=_+(T<<9&4294967295|T>>>23),T=w+(_^E&(M^_))+A[11]+643717713&4294967295,w=M+(T<<14&4294967295|T>>>18),T=E+(M^_&(w^M))+A[0]+3921069994&4294967295,E=w+(T<<20&4294967295|T>>>12),T=_+(w^M&(E^w))+A[5]+3593408605&4294967295,_=E+(T<<5&4294967295|T>>>27),T=M+(E^w&(_^E))+A[10]+38016083&4294967295,M=_+(T<<9&4294967295|T>>>23),T=w+(_^E&(M^_))+A[15]+3634488961&4294967295,w=M+(T<<14&4294967295|T>>>18),T=E+(M^_&(w^M))+A[4]+3889429448&4294967295,E=w+(T<<20&4294967295|T>>>12),T=_+(w^M&(E^w))+A[9]+568446438&4294967295,_=E+(T<<5&4294967295|T>>>27),T=M+(E^w&(_^E))+A[14]+3275163606&4294967295,M=_+(T<<9&4294967295|T>>>23),T=w+(_^E&(M^_))+A[3]+4107603335&4294967295,w=M+(T<<14&4294967295|T>>>18),T=E+(M^_&(w^M))+A[8]+1163531501&4294967295,E=w+(T<<20&4294967295|T>>>12),T=_+(w^M&(E^w))+A[13]+2850285829&4294967295,_=E+(T<<5&4294967295|T>>>27),T=M+(E^w&(_^E))+A[2]+4243563512&4294967295,M=_+(T<<9&4294967295|T>>>23),T=w+(_^E&(M^_))+A[7]+1735328473&4294967295,w=M+(T<<14&4294967295|T>>>18),T=E+(M^_&(w^M))+A[12]+2368359562&4294967295,E=w+(T<<20&4294967295|T>>>12),T=_+(E^w^M)+A[5]+4294588738&4294967295,_=E+(T<<4&4294967295|T>>>28),T=M+(_^E^w)+A[8]+2272392833&4294967295,M=_+(T<<11&4294967295|T>>>21),T=w+(M^_^E)+A[11]+1839030562&4294967295,w=M+(T<<16&4294967295|T>>>16),T=E+(w^M^_)+A[14]+4259657740&4294967295,E=w+(T<<23&4294967295|T>>>9),T=_+(E^w^M)+A[1]+2763975236&4294967295,_=E+(T<<4&4294967295|T>>>28),T=M+(_^E^w)+A[4]+1272893353&4294967295,M=_+(T<<11&4294967295|T>>>21),T=w+(M^_^E)+A[7]+4139469664&4294967295,w=M+(T<<16&4294967295|T>>>16),T=E+(w^M^_)+A[10]+3200236656&4294967295,E=w+(T<<23&4294967295|T>>>9),T=_+(E^w^M)+A[13]+681279174&4294967295,_=E+(T<<4&4294967295|T>>>28),T=M+(_^E^w)+A[0]+3936430074&4294967295,M=_+(T<<11&4294967295|T>>>21),T=w+(M^_^E)+A[3]+3572445317&4294967295,w=M+(T<<16&4294967295|T>>>16),T=E+(w^M^_)+A[6]+76029189&4294967295,E=w+(T<<23&4294967295|T>>>9),T=_+(E^w^M)+A[9]+3654602809&4294967295,_=E+(T<<4&4294967295|T>>>28),T=M+(_^E^w)+A[12]+3873151461&4294967295,M=_+(T<<11&4294967295|T>>>21),T=w+(M^_^E)+A[15]+530742520&4294967295,w=M+(T<<16&4294967295|T>>>16),T=E+(w^M^_)+A[2]+3299628645&4294967295,E=w+(T<<23&4294967295|T>>>9),T=_+(w^(E|~M))+A[0]+4096336452&4294967295,_=E+(T<<6&4294967295|T>>>26),T=M+(E^(_|~w))+A[7]+1126891415&4294967295,M=_+(T<<10&4294967295|T>>>22),T=w+(_^(M|~E))+A[14]+2878612391&4294967295,w=M+(T<<15&4294967295|T>>>17),T=E+(M^(w|~_))+A[5]+4237533241&4294967295,E=w+(T<<21&4294967295|T>>>11),T=_+(w^(E|~M))+A[12]+1700485571&4294967295,_=E+(T<<6&4294967295|T>>>26),T=M+(E^(_|~w))+A[3]+2399980690&4294967295,M=_+(T<<10&4294967295|T>>>22),T=w+(_^(M|~E))+A[10]+4293915773&4294967295,w=M+(T<<15&4294967295|T>>>17),T=E+(M^(w|~_))+A[1]+2240044497&4294967295,E=w+(T<<21&4294967295|T>>>11),T=_+(w^(E|~M))+A[8]+1873313359&4294967295,_=E+(T<<6&4294967295|T>>>26),T=M+(E^(_|~w))+A[15]+4264355552&4294967295,M=_+(T<<10&4294967295|T>>>22),T=w+(_^(M|~E))+A[6]+2734768916&4294967295,w=M+(T<<15&4294967295|T>>>17),T=E+(M^(w|~_))+A[13]+1309151649&4294967295,E=w+(T<<21&4294967295|T>>>11),T=_+(w^(E|~M))+A[4]+4149444226&4294967295,_=E+(T<<6&4294967295|T>>>26),T=M+(E^(_|~w))+A[11]+3174756917&4294967295,M=_+(T<<10&4294967295|T>>>22),T=w+(_^(M|~E))+A[2]+718787259&4294967295,w=M+(T<<15&4294967295|T>>>17),T=E+(M^(w|~_))+A[9]+3951481745&4294967295,S.g[0]=S.g[0]+_&4294967295,S.g[1]=S.g[1]+(w+(T<<21&4294967295|T>>>11))&4294967295,S.g[2]=S.g[2]+w&4294967295,S.g[3]=S.g[3]+M&4294967295}s.prototype.v=function(S,_){_===void 0&&(_=S.length);const E=_-this.blockSize,A=this.C;let w=this.h,M=0;for(;M<_;){if(w==0)for(;M<=E;)a(this,S,M),M+=this.blockSize;if(typeof S=="string"){for(;M<_;)if(A[w++]=S.charCodeAt(M++),w==this.blockSize){a(this,A),w=0;break}}else for(;M<_;)if(A[w++]=S[M++],w==this.blockSize){a(this,A),w=0;break}}this.h=w,this.o+=_},s.prototype.A=function(){var S=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);S[0]=128;for(var _=1;_<S.length-8;++_)S[_]=0;_=this.o*8;for(var E=S.length-8;E<S.length;++E)S[E]=_&255,_/=256;for(this.v(S),S=Array(16),_=0,E=0;E<4;++E)for(let A=0;A<32;A+=8)S[_++]=this.g[E]>>>A&255;return S};function i(S,_){var E=o;return Object.prototype.hasOwnProperty.call(E,S)?E[S]:E[S]=_(S)}function r(S,_){this.h=_;const E=[];let A=!0;for(let w=S.length-1;w>=0;w--){const M=S[w]|0;A&&M==_||(E[w]=M,A=!1)}this.g=E}var o={};function u(S){return-128<=S&&S<128?i(S,function(_){return new r([_|0],_<0?-1:0)}):new r([S|0],S<0?-1:0)}function h(S){if(isNaN(S)||!isFinite(S))return p;if(S<0)return O(h(-S));const _=[];let E=1;for(let A=0;S>=E;A++)_[A]=S/E|0,E*=4294967296;return new r(_,0)}function d(S,_){if(S.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(S.charAt(0)=="-")return O(d(S.substring(1),_));if(S.indexOf("-")>=0)throw Error('number format error: interior "-" character');const E=h(Math.pow(_,8));let A=p;for(let M=0;M<S.length;M+=8){var w=Math.min(8,S.length-M);const T=parseInt(S.substring(M,M+w),_);w<8?(w=h(Math.pow(_,w)),A=A.j(w).add(h(T))):(A=A.j(E),A=A.add(h(T)))}return A}var p=u(0),g=u(1),y=u(16777216);t=r.prototype,t.m=function(){if(I(this))return-O(this).m();let S=0,_=1;for(let E=0;E<this.g.length;E++){const A=this.i(E);S+=(A>=0?A:4294967296+A)*_,_*=4294967296}return S},t.toString=function(S){if(S=S||10,S<2||36<S)throw Error("radix out of range: "+S);if(R(this))return"0";if(I(this))return"-"+O(this).toString(S);const _=h(Math.pow(S,6));var E=this;let A="";for(;;){const w=V(E,_).g;E=x(E,w.j(_));let M=((E.g.length>0?E.g[0]:E.h)>>>0).toString(S);if(E=w,R(E))return M+A;for(;M.length<6;)M="0"+M;A=M+A}},t.i=function(S){return S<0?0:S<this.g.length?this.g[S]:this.h};function R(S){if(S.h!=0)return!1;for(let _=0;_<S.g.length;_++)if(S.g[_]!=0)return!1;return!0}function I(S){return S.h==-1}t.l=function(S){return S=x(this,S),I(S)?-1:R(S)?0:1};function O(S){const _=S.g.length,E=[];for(let A=0;A<_;A++)E[A]=~S.g[A];return new r(E,~S.h).add(g)}t.abs=function(){return I(this)?O(this):this},t.add=function(S){const _=Math.max(this.g.length,S.g.length),E=[];let A=0;for(let w=0;w<=_;w++){let M=A+(this.i(w)&65535)+(S.i(w)&65535),T=(M>>>16)+(this.i(w)>>>16)+(S.i(w)>>>16);A=T>>>16,M&=65535,T&=65535,E[w]=T<<16|M}return new r(E,E[E.length-1]&-2147483648?-1:0)};function x(S,_){return S.add(O(_))}t.j=function(S){if(R(this)||R(S))return p;if(I(this))return I(S)?O(this).j(O(S)):O(O(this).j(S));if(I(S))return O(this.j(O(S)));if(this.l(y)<0&&S.l(y)<0)return h(this.m()*S.m());const _=this.g.length+S.g.length,E=[];for(var A=0;A<2*_;A++)E[A]=0;for(A=0;A<this.g.length;A++)for(let w=0;w<S.g.length;w++){const M=this.i(A)>>>16,T=this.i(A)&65535,ue=S.i(w)>>>16,me=S.i(w)&65535;E[2*A+2*w]+=T*me,b(E,2*A+2*w),E[2*A+2*w+1]+=M*me,b(E,2*A+2*w+1),E[2*A+2*w+1]+=T*ue,b(E,2*A+2*w+1),E[2*A+2*w+2]+=M*ue,b(E,2*A+2*w+2)}for(S=0;S<_;S++)E[S]=E[2*S+1]<<16|E[2*S];for(S=_;S<2*_;S++)E[S]=0;return new r(E,0)};function b(S,_){for(;(S[_]&65535)!=S[_];)S[_+1]+=S[_]>>>16,S[_]&=65535,_++}function N(S,_){this.g=S,this.h=_}function V(S,_){if(R(_))throw Error("division by zero");if(R(S))return new N(p,p);if(I(S))return _=V(O(S),_),new N(O(_.g),O(_.h));if(I(_))return _=V(S,O(_)),new N(O(_.g),_.h);if(S.g.length>30){if(I(S)||I(_))throw Error("slowDivide_ only works with positive integers.");for(var E=g,A=_;A.l(S)<=0;)E=U(E),A=U(A);var w=W(E,1),M=W(A,1);for(A=W(A,2),E=W(E,2);!R(A);){var T=M.add(A);T.l(S)<=0&&(w=w.add(E),M=T),A=W(A,1),E=W(E,1)}return _=x(S,w.j(_)),new N(w,_)}for(w=p;S.l(_)>=0;){for(E=Math.max(1,Math.floor(S.m()/_.m())),A=Math.ceil(Math.log(E)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),M=h(E),T=M.j(_);I(T)||T.l(S)>0;)E-=A,M=h(E),T=M.j(_);R(M)&&(M=g),w=w.add(M),S=x(S,T)}return new N(w,S)}t.B=function(S){return V(this,S).h},t.and=function(S){const _=Math.max(this.g.length,S.g.length),E=[];for(let A=0;A<_;A++)E[A]=this.i(A)&S.i(A);return new r(E,this.h&S.h)},t.or=function(S){const _=Math.max(this.g.length,S.g.length),E=[];for(let A=0;A<_;A++)E[A]=this.i(A)|S.i(A);return new r(E,this.h|S.h)},t.xor=function(S){const _=Math.max(this.g.length,S.g.length),E=[];for(let A=0;A<_;A++)E[A]=this.i(A)^S.i(A);return new r(E,this.h^S.h)};function U(S){const _=S.g.length+1,E=[];for(let A=0;A<_;A++)E[A]=S.i(A)<<1|S.i(A-1)>>>31;return new r(E,S.h)}function W(S,_){const E=_>>5;_%=32;const A=S.g.length-E,w=[];for(let M=0;M<A;M++)w[M]=_>0?S.i(M+E)>>>_|S.i(M+E+1)<<32-_:S.i(M+E);return new r(w,S.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,QT=s,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=h,r.fromString=d,Zi=r}).apply(typeof Uv<"u"?Uv:typeof self<"u"?self:typeof window<"u"?window:{});var Hu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var XT,tc,WT,mh,D0,JT,ZT,e2;(function(){var t,e=Object.defineProperty;function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof Hu=="object"&&Hu];for(var f=0;f<l.length;++f){var m=l[f];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var s=n(this);function a(l,f){if(f)e:{var m=s;l=l.split(".");for(var v=0;v<l.length-1;v++){var j=l[v];if(!(j in m))break e;m=m[j]}l=l[l.length-1],v=m[l],f=f(v),f!=v&&f!=null&&e(m,l,{configurable:!0,writable:!0,value:f})}}a("Symbol.dispose",function(l){return l||Symbol("Symbol.dispose")}),a("Array.prototype.values",function(l){return l||function(){return this[Symbol.iterator]()}}),a("Object.entries",function(l){return l||function(f){var m=[],v;for(v in f)Object.prototype.hasOwnProperty.call(f,v)&&m.push([v,f[v]]);return m}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},r=this||self;function o(l){var f=typeof l;return f=="object"&&l!=null||f=="function"}function u(l,f,m){return l.call.apply(l.bind,arguments)}function h(l,f,m){return h=u,h.apply(null,arguments)}function d(l,f){var m=Array.prototype.slice.call(arguments,1);return function(){var v=m.slice();return v.push.apply(v,arguments),l.apply(this,v)}}function p(l,f){function m(){}m.prototype=f.prototype,l.Z=f.prototype,l.prototype=new m,l.prototype.constructor=l,l.Ob=function(v,j,P){for(var J=Array(arguments.length-2),Me=2;Me<arguments.length;Me++)J[Me-2]=arguments[Me];return f.prototype[j].apply(v,J)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?l=>l&&AsyncContext.Snapshot.wrap(l):l=>l;function y(l){const f=l.length;if(f>0){const m=Array(f);for(let v=0;v<f;v++)m[v]=l[v];return m}return[]}function R(l,f){for(let v=1;v<arguments.length;v++){const j=arguments[v];var m=typeof j;if(m=m!="object"?m:j?Array.isArray(j)?"array":m:"null",m=="array"||m=="object"&&typeof j.length=="number"){m=l.length||0;const P=j.length||0;l.length=m+P;for(let J=0;J<P;J++)l[m+J]=j[J]}else l.push(j)}}class I{constructor(f,m){this.i=f,this.j=m,this.h=0,this.g=null}get(){let f;return this.h>0?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function O(l){r.setTimeout(()=>{throw l},0)}function x(){var l=S;let f=null;return l.g&&(f=l.g,l.g=l.g.next,l.g||(l.h=null),f.next=null),f}class b{constructor(){this.h=this.g=null}add(f,m){const v=N.get();v.set(f,m),this.h?this.h.next=v:this.g=v,this.h=v}}var N=new I(()=>new V,l=>l.reset());class V{constructor(){this.next=this.g=this.h=null}set(f,m){this.h=f,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let U,W=!1,S=new b,_=()=>{const l=Promise.resolve(void 0);U=()=>{l.then(E)}};function E(){for(var l;l=x();){try{l.h.call(l.g)}catch(m){O(m)}var f=N;f.j(l),f.h<100&&(f.h++,l.next=f.g,f.g=l)}W=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(l,f){this.type=l,this.g=this.target=f,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var M=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var l=!1,f=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const m=()=>{};r.addEventListener("test",m,f),r.removeEventListener("test",m,f)}catch{}return l}();function T(l){return/^[\s\xa0]*$/.test(l)}function ue(l,f){w.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l&&this.init(l,f)}p(ue,w),ue.prototype.init=function(l,f){const m=this.type=l.type,v=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;this.target=l.target||l.srcElement,this.g=f,f=l.relatedTarget,f||(m=="mouseover"?f=l.fromElement:m=="mouseout"&&(f=l.toElement)),this.relatedTarget=f,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=l.pointerType,this.state=l.state,this.i=l,l.defaultPrevented&&ue.Z.h.call(this)},ue.prototype.h=function(){ue.Z.h.call(this);const l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var me="closure_listenable_"+(Math.random()*1e6|0),X=0;function ie(l,f,m,v,j){this.listener=l,this.proxy=null,this.src=f,this.type=m,this.capture=!!v,this.ha=j,this.key=++X,this.da=this.fa=!1}function se(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function pe(l,f,m){for(const v in l)f.call(m,l[v],v,l)}function Se(l,f){for(const m in l)f.call(void 0,l[m],m,l)}function Qe(l){const f={};for(const m in l)f[m]=l[m];return f}const ht="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Dt(l,f){let m,v;for(let j=1;j<arguments.length;j++){v=arguments[j];for(m in v)l[m]=v[m];for(let P=0;P<ht.length;P++)m=ht[P],Object.prototype.hasOwnProperty.call(v,m)&&(l[m]=v[m])}}function Ue(l){this.src=l,this.g={},this.h=0}Ue.prototype.add=function(l,f,m,v,j){const P=l.toString();l=this.g[P],l||(l=this.g[P]=[],this.h++);const J=xt(l,f,v,j);return J>-1?(f=l[J],m||(f.fa=!1)):(f=new ie(f,this.src,P,!!v,j),f.fa=m,l.push(f)),f};function rt(l,f){const m=f.type;if(m in l.g){var v=l.g[m],j=Array.prototype.indexOf.call(v,f,void 0),P;(P=j>=0)&&Array.prototype.splice.call(v,j,1),P&&(se(f),l.g[m].length==0&&(delete l.g[m],l.h--))}}function xt(l,f,m,v){for(let j=0;j<l.length;++j){const P=l[j];if(!P.da&&P.listener==f&&P.capture==!!m&&P.ha==v)return j}return-1}var $="closure_lm_"+(Math.random()*1e6|0),ae={};function Y(l,f,m,v,j){if(v&&v.once)return qe(l,f,m,v,j);if(Array.isArray(f)){for(let P=0;P<f.length;P++)Y(l,f[P],m,v,j);return null}return m=ve(m),l&&l[me]?l.J(f,m,o(v)?!!v.capture:!!v,j):oe(l,f,m,!1,v,j)}function oe(l,f,m,v,j,P){if(!f)throw Error("Invalid event type");const J=o(j)?!!j.capture:!!j;let Me=ot(l);if(Me||(l[$]=Me=new Ue(l)),m=Me.add(f,m,v,J,P),m.proxy)return m;if(v=Ae(),m.proxy=v,v.src=l,v.listener=m,l.addEventListener)M||(j=J),j===void 0&&(j=!1),l.addEventListener(f.toString(),v,j);else if(l.attachEvent)l.attachEvent(on(f.toString()),v);else if(l.addListener&&l.removeListener)l.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Ae(){function l(m){return f.call(l.src,l.listener,m)}const f=jt;return l}function qe(l,f,m,v,j){if(Array.isArray(f)){for(let P=0;P<f.length;P++)qe(l,f[P],m,v,j);return null}return m=ve(m),l&&l[me]?l.K(f,m,o(v)?!!v.capture:!!v,j):oe(l,f,m,!0,v,j)}function Ne(l,f,m,v,j){if(Array.isArray(f))for(var P=0;P<f.length;P++)Ne(l,f[P],m,v,j);else v=o(v)?!!v.capture:!!v,m=ve(m),l&&l[me]?(l=l.i,P=String(f).toString(),P in l.g&&(f=l.g[P],m=xt(f,m,v,j),m>-1&&(se(f[m]),Array.prototype.splice.call(f,m,1),f.length==0&&(delete l.g[P],l.h--)))):l&&(l=ot(l))&&(f=l.g[f.toString()],l=-1,f&&(l=xt(f,m,v,j)),(m=l>-1?f[l]:null)&&ze(m))}function ze(l){if(typeof l!="number"&&l&&!l.da){var f=l.src;if(f&&f[me])rt(f.i,l);else{var m=l.type,v=l.proxy;f.removeEventListener?f.removeEventListener(m,v,l.capture):f.detachEvent?f.detachEvent(on(m),v):f.addListener&&f.removeListener&&f.removeListener(v),(m=ot(f))?(rt(m,l),m.h==0&&(m.src=null,f[$]=null)):se(l)}}}function on(l){return l in ae?ae[l]:ae[l]="on"+l}function jt(l,f){if(l.da)l=!0;else{f=new ue(f,this);const m=l.listener,v=l.ha||l.src;l.fa&&ze(l),l=m.call(v,f)}return l}function ot(l){return l=l[$],l instanceof Ue?l:null}var Nn="__closure_events_fn_"+(Math.random()*1e9>>>0);function ve(l){return typeof l=="function"?l:(l[Nn]||(l[Nn]=function(f){return l.handleEvent(f)}),l[Nn])}function ge(){A.call(this),this.i=new Ue(this),this.M=this,this.G=null}p(ge,A),ge.prototype[me]=!0,ge.prototype.removeEventListener=function(l,f,m,v){Ne(this,l,f,m,v)};function xe(l,f){var m,v=l.G;if(v)for(m=[];v;v=v.G)m.push(v);if(l=l.M,v=f.type||f,typeof f=="string")f=new w(f,l);else if(f instanceof w)f.target=f.target||l;else{var j=f;f=new w(v,l),Dt(f,j)}j=!0;let P,J;if(m)for(J=m.length-1;J>=0;J--)P=f.g=m[J],j=Xe(P,v,!0,f)&&j;if(P=f.g=l,j=Xe(P,v,!0,f)&&j,j=Xe(P,v,!1,f)&&j,m)for(J=0;J<m.length;J++)P=f.g=m[J],j=Xe(P,v,!1,f)&&j}ge.prototype.N=function(){if(ge.Z.N.call(this),this.i){var l=this.i;for(const f in l.g){const m=l.g[f];for(let v=0;v<m.length;v++)se(m[v]);delete l.g[f],l.h--}}this.G=null},ge.prototype.J=function(l,f,m,v){return this.i.add(String(l),f,!1,m,v)},ge.prototype.K=function(l,f,m,v){return this.i.add(String(l),f,!0,m,v)};function Xe(l,f,m,v){if(f=l.i.g[String(f)],!f)return!0;f=f.concat();let j=!0;for(let P=0;P<f.length;++P){const J=f[P];if(J&&!J.da&&J.capture==m){const Me=J.listener,Be=J.ha||J.src;J.fa&&rt(l.i,J),j=Me.call(Be,v)!==!1&&j}}return j&&!v.defaultPrevented}function zt(l,f){if(typeof l!="function")if(l&&typeof l.handleEvent=="function")l=h(l.handleEvent,l);else throw Error("Invalid listener argument");return Number(f)>2147483647?-1:r.setTimeout(l,f||0)}function ee(l){l.g=zt(()=>{l.g=null,l.i&&(l.i=!1,ee(l))},l.l);const f=l.h;l.h=null,l.m.apply(null,f)}class q extends A{constructor(f,m){super(),this.m=f,this.l=m,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:ee(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function he(l){A.call(this),this.h=l,this.g={}}p(he,A);var Ke=[];function ye(l){pe(l.g,function(f,m){this.g.hasOwnProperty(m)&&ze(f)},l),l.g={}}he.prototype.N=function(){he.Z.N.call(this),ye(this)},he.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var te=r.JSON.stringify,Ye=r.JSON.parse,_t=class{stringify(l){return r.JSON.stringify(l,void 0)}parse(l){return r.JSON.parse(l,void 0)}};function Ot(){}function cn(){}var nn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ft(){w.call(this,"d")}p(ft,w);function je(){w.call(this,"c")}p(je,w);var fe={},ke=null;function Bt(){return ke=ke||new ge}fe.Ia="serverreachability";function Vt(l){w.call(this,fe.Ia,l)}p(Vt,w);function Ie(l){const f=Bt();xe(f,new Vt(f))}fe.STAT_EVENT="statevent";function Tt(l,f){w.call(this,fe.STAT_EVENT,l),this.stat=f}p(Tt,w);function Pt(l){const f=Bt();xe(f,new Tt(f,l))}fe.Ja="timingevent";function Xn(l,f){w.call(this,fe.Ja,l),this.size=f}p(Xn,w);function _e(l,f){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){l()},f)}function dt(){this.g=!0}dt.prototype.ua=function(){this.g=!1};function un(l,f,m,v,j,P){l.info(function(){if(l.g)if(P){var J="",Me=P.split("&");for(let Pe=0;Pe<Me.length;Pe++){var Be=Me[Pe].split("=");if(Be.length>1){const kt=Be[0];Be=Be[1];const ps=kt.split("_");J=ps.length>=2&&ps[1]=="type"?J+(kt+"="+Be+"&"):J+(kt+"=redacted&")}}}else J=null;else J=P;return"XMLHTTP REQ ("+v+") [attempt "+j+"]: "+f+`
`+m+`
`+J})}function Et(l,f,m,v,j,P,J){l.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+j+"]: "+f+`
`+m+`
`+P+" "+J})}function Lt(l,f,m,v){l.info(function(){return"XMLHTTP TEXT ("+f+"): "+qt(l,m)+(v?" "+v:"")})}function rs(l,f){l.info(function(){return"TIMEOUT: "+f})}dt.prototype.info=function(){};function qt(l,f){if(!l.g)return f;if(!f)return null;try{const P=JSON.parse(f);if(P){for(l=0;l<P.length;l++)if(Array.isArray(P[l])){var m=P[l];if(!(m.length<2)){var v=m[1];if(Array.isArray(v)&&!(v.length<1)){var j=v[0];if(j!="noop"&&j!="stop"&&j!="close")for(let J=1;J<v.length;J++)v[J]=""}}}}return te(P)}catch{return f}}var Ct={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},hn={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},aa;function Rn(){}p(Rn,Ot),Rn.prototype.g=function(){return new XMLHttpRequest},aa=new Rn;function ws(l){return encodeURIComponent(String(l))}function ia(l){var f=1;l=l.split(":");const m=[];for(;f>0&&l.length;)m.push(l.shift()),f--;return l.length&&m.push(l.join(":")),m}function Wn(l,f,m,v){this.j=l,this.i=f,this.l=m,this.S=v||1,this.V=new he(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ra}function ra(){this.i=null,this.g="",this.h=!1}var Bs={},$s={};function Pa(l,f,m){l.M=1,l.A=Tr(Hs(f)),l.u=m,l.R=!0,Jn(l,null)}function Jn(l,f){l.F=Date.now(),Fs(l),l.B=Hs(l.A);var m=l.B,v=l.S;Array.isArray(v)||(v=[String(v)]),hl(m.i,"t",v),l.C=0,m=l.j.L,l.h=new ra,l.g=ut(l.j,m?f:null,!l.u),l.P>0&&(l.O=new q(h(l.Y,l,l.g),l.P)),f=l.V,m=l.g,v=l.ba;var j="readystatechange";Array.isArray(j)||(j&&(Ke[0]=j.toString()),j=Ke);for(let P=0;P<j.length;P++){const J=Y(m,j[P],v||f.handleEvent,!1,f.h||f);if(!J)break;f.g[J.key]=J}f=l.J?Qe(l.J):{},l.u?(l.v||(l.v="POST"),f["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.B,l.v,l.u,f)):(l.v="GET",l.g.ea(l.B,l.v,null,f)),Ie(),un(l.i,l.v,l.B,l.l,l.S,l.u)}Wn.prototype.ba=function(l){l=l.target;const f=this.O;f&&z(l)==3?f.j():this.Y(l)},Wn.prototype.Y=function(l){try{if(l==this.g)e:{const Me=z(this.g),Be=this.g.ya(),Pe=this.g.ca();if(!(Me<3)&&(Me!=3||this.g&&(this.h.h||this.g.la()||ne(this.g)))){this.K||Me!=4||Be==7||(Be==8||Pe<=0?Ie(3):Ie(2)),ls(this);var f=this.g.ca();this.X=f;var m=ul(this);if(this.o=f==200,Et(this.i,this.v,this.B,this.l,this.S,Me,f),this.o){if(this.U&&!this.L){t:{if(this.g){var v,j=this.g;if((v=j.g?j.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(v)){var P=v;break t}}P=null}if(l=P)Lt(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,yi(this,l);else{this.o=!1,this.m=3,Pt(12),ds(this),Zn(this);break e}}if(this.R){l=!0;let kt;for(;!this.K&&this.C<m.length;)if(kt=La(this,m),kt==$s){Me==4&&(this.m=4,Pt(14),l=!1),Lt(this.i,this.l,null,"[Incomplete Response]");break}else if(kt==Bs){this.m=4,Pt(15),Lt(this.i,this.l,m,"[Invalid Chunk]"),l=!1;break}else Lt(this.i,this.l,kt,null),yi(this,kt);if(Do(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Me!=4||m.length!=0||this.h.h||(this.m=1,Pt(16),l=!1),this.o=this.o&&l,!l)Lt(this.i,this.l,m,"[Invalid Chunked Response]"),ds(this),Zn(this);else if(m.length>0&&!this.W){this.W=!0;var J=this.j;J.g==this&&J.aa&&!J.P&&(J.j.info("Great, no buffering proxy detected. Bytes received: "+m.length),vn(J),J.P=!0,Pt(11))}}else Lt(this.i,this.l,m,null),yi(this,m);Me==4&&ds(this),this.o&&!this.K&&(Me==4?es(this.j,this):(this.o=!1,Fs(this)))}else L(this.g),f==400&&m.indexOf("Unknown SID")>0?(this.m=3,Pt(12)):(this.m=0,Pt(13)),ds(this),Zn(this)}}}catch{}finally{}};function ul(l){if(!Do(l))return l.g.la();const f=ne(l.g);if(f==="")return"";let m="";const v=f.length,j=z(l.g)==4;if(!l.h.i){if(typeof TextDecoder>"u")return ds(l),Zn(l),"";l.h.i=new r.TextDecoder}for(let P=0;P<v;P++)l.h.h=!0,m+=l.h.i.decode(f[P],{stream:!(j&&P==v-1)});return f.length=0,l.h.g+=m,l.C=0,l.h.g}function Do(l){return l.g?l.v=="GET"&&l.M!=2&&l.j.Aa:!1}function La(l,f){var m=l.C,v=f.indexOf(`
`,m);return v==-1?$s:(m=Number(f.substring(m,v)),isNaN(m)?Bs:(v+=1,v+m>f.length?$s:(f=f.slice(v,v+m),l.C=v+m,f)))}Wn.prototype.cancel=function(){this.K=!0,ds(this)};function Fs(l){l.T=Date.now()+l.H,br(l,l.H)}function br(l,f){if(l.D!=null)throw Error("WatchDog timer not null");l.D=_e(h(l.aa,l),f)}function ls(l){l.D&&(r.clearTimeout(l.D),l.D=null)}Wn.prototype.aa=function(){this.D=null;const l=Date.now();l-this.T>=0?(rs(this.i,this.B),this.M!=2&&(Ie(),Pt(17)),ds(this),this.m=2,Zn(this)):br(this,this.T-l)};function Zn(l){l.j.I==0||l.K||es(l.j,l)}function ds(l){ls(l);var f=l.O;f&&typeof f.dispose=="function"&&f.dispose(),l.O=null,ye(l.V),l.g&&(f=l.g,l.g=null,f.abort(),f.dispose())}function yi(l,f){try{var m=l.j;if(m.I!=0&&(m.g==l||F(m.h,l))){if(!l.L&&F(m.h,l)&&m.I==3){try{var v=m.Ba.g.parse(f)}catch{v=null}if(Array.isArray(v)&&v.length==3){var j=v;if(j[0]==0){e:if(!m.v){if(m.g)if(m.g.F+3e3<l.F)On(m),We(m);else break e;cs(m),Pt(18)}}else m.xa=j[1],0<m.xa-m.K&&j[2]<37500&&m.F&&m.A==0&&!m.C&&(m.C=_e(h(m.Va,m),6e3));de(m.h)<=1&&m.ta&&(m.ta=void 0)}else Re(m,11)}else if((l.L||m.g==l)&&On(m),!T(f))for(j=m.Ba.g.parse(f),f=0;f<j.length;f++){let Pe=j[f];const kt=Pe[0];if(!(kt<=m.K))if(m.K=kt,Pe=Pe[1],m.I==2)if(Pe[0]=="c"){m.M=Pe[1],m.ba=Pe[2];const ps=Pe[3];ps!=null&&(m.ka=ps,m.j.info("VER="+m.ka));const Rs=Pe[4];Rs!=null&&(m.za=Rs,m.j.info("SVER="+m.za));const Cs=Pe[5];Cs!=null&&typeof Cs=="number"&&Cs>0&&(v=1.5*Cs,m.O=v,m.j.info("backChannelRequestTimeoutMs_="+v)),v=m;const xa=l.g;if(xa){const Ti=xa.g?xa.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ti){var P=v.h;P.g||Ti.indexOf("spdy")==-1&&Ti.indexOf("quic")==-1&&Ti.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(os(P,P.h),P.h=null))}if(v.G){const Sd=xa.g?xa.g.getResponseHeader("X-HTTP-Session-Id"):null;Sd&&(v.wa=Sd,St(v.J,v.G,Sd))}}m.I=3,m.l&&m.l.ra(),m.aa&&(m.T=Date.now()-l.F,m.j.info("Handshake RTT: "+m.T+"ms")),v=m;var J=l;if(v.na=an(v,v.L?v.ba:null,v.W),J.L){xr(v.h,J);var Me=J,Be=v.O;Be&&(Me.H=Be),Me.D&&(ls(Me),Fs(Me)),v.g=J}else Cn(v);m.i.length>0&&Jt(m)}else Pe[0]!="stop"&&Pe[0]!="close"||Re(m,7);else m.I==3&&(Pe[0]=="stop"||Pe[0]=="close"?Pe[0]=="stop"?Re(m,7):Oe(m):Pe[0]!="noop"&&m.l&&m.l.qa(Pe),m.A=0)}}Ie(4)}catch{}}var As=class{constructor(l,f){this.g=l,this.map=f}};function qs(l){this.l=l||10,r.PerformanceNavigationTiming?(l=r.performance.getEntriesByType("navigation"),l=l.length>0&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ns(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function de(l){return l.h?1:l.g?l.g.size:0}function F(l,f){return l.h?l.h==f:l.g?l.g.has(f):!1}function os(l,f){l.g?l.g.add(f):l.h=f}function xr(l,f){l.h&&l.h==f?l.h=null:l.g&&l.g.has(f)&&l.g.delete(f)}qs.prototype.cancel=function(){if(this.i=xu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function xu(l){if(l.h!=null)return l.i.concat(l.h.G);if(l.g!=null&&l.g.size!==0){let f=l.i;for(const m of l.g.values())f=f.concat(m.G);return f}return y(l.i)}var Dn=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Z(l,f){if(l){l=l.split("&");for(let m=0;m<l.length;m++){const v=l[m].indexOf("=");let j,P=null;v>=0?(j=l[m].substring(0,v),P=l[m].substring(v+1)):j=l[m],f(j,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function la(l){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let f;l instanceof la?(this.l=l.l,va(this,l.j),this.o=l.o,this.g=l.g,vi(this,l.u),this.h=l.h,_r(this,Ar(l.i)),this.m=l.m):l&&(f=String(l).match(Dn))?(this.l=!1,va(this,f[1]||"",!0),this.o=Er(f[2]||""),this.g=Er(f[3]||"",!0),vi(this,f[4]),this.h=Er(f[5]||"",!0),_r(this,f[6]||"",!0),this.m=Er(f[7]||"")):(this.l=!1,this.i=new wr(null,this.l))}la.prototype.toString=function(){const l=[];var f=this.j;f&&l.push(oa(f,jo,!0),":");var m=this.g;return(m||f=="file")&&(l.push("//"),(f=this.o)&&l.push(oa(f,jo,!0),"@"),l.push(ws(m).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.u,m!=null&&l.push(":",String(m))),(m=this.h)&&(this.g&&m.charAt(0)!="/"&&l.push("/"),l.push(oa(m,m.charAt(0)=="/"?Tu:_u,!0))),(m=this.i.toString())&&l.push("?",m),(m=this.m)&&l.push("#",oa(m,xd)),l.join("")},la.prototype.resolve=function(l){const f=Hs(this);let m=!!l.j;m?va(f,l.j):m=!!l.o,m?f.o=l.o:m=!!l.g,m?f.g=l.g:m=l.u!=null;var v=l.h;if(m)vi(f,l.u);else if(m=!!l.h){if(v.charAt(0)!="/")if(this.g&&!this.h)v="/"+v;else{var j=f.h.lastIndexOf("/");j!=-1&&(v=f.h.slice(0,j+1)+v)}if(j=v,j==".."||j==".")v="";else if(j.indexOf("./")!=-1||j.indexOf("/.")!=-1){v=j.lastIndexOf("/",0)==0,j=j.split("/");const P=[];for(let J=0;J<j.length;){const Me=j[J++];Me=="."?v&&J==j.length&&P.push(""):Me==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),v&&J==j.length&&P.push("")):(P.push(Me),v=!0)}v=P.join("/")}else v=j}return m?f.h=v:m=l.i.toString()!=="",m?_r(f,Ar(l.i)):m=!!l.m,m&&(f.m=l.m),f};function Hs(l){return new la(l)}function va(l,f,m){l.j=m?Er(f,!0):f,l.j&&(l.j=l.j.replace(/:$/,""))}function vi(l,f){if(f){if(f=Number(f),isNaN(f)||f<0)throw Error("Bad port number "+f);l.u=f}else l.u=null}function _r(l,f,m){f instanceof wr?(l.i=f,_d(l.i,l.l)):(m||(f=oa(f,ms)),l.i=new wr(f,l.l))}function St(l,f,m){l.i.set(f,m)}function Tr(l){return St(l,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),l}function Er(l,f){return l?f?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function oa(l,f,m){return typeof l=="string"?(l=encodeURI(l).replace(f,Sr),m&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function Sr(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var jo=/[#\/\?@]/g,_u=/[#\?:]/g,Tu=/[#\?]/g,ms=/[#\?@]/g,xd=/#/g;function wr(l,f){this.h=this.g=null,this.i=l||null,this.j=!!f}function Ua(l){l.g||(l.g=new Map,l.h=0,l.i&&Z(l.i,function(f,m){l.add(decodeURIComponent(f.replace(/\+/g," ")),m)}))}t=wr.prototype,t.add=function(l,f){Ua(this),this.i=null,l=bi(this,l);let m=this.g.get(l);return m||this.g.set(l,m=[]),m.push(f),this.h+=1,this};function Eu(l,f){Ua(l),f=bi(l,f),l.g.has(f)&&(l.i=null,l.h-=l.g.get(f).length,l.g.delete(f))}function Su(l,f){return Ua(l),f=bi(l,f),l.g.has(f)}t.forEach=function(l,f){Ua(this),this.g.forEach(function(m,v){m.forEach(function(j){l.call(f,j,v,this)},this)},this)};function wu(l,f){Ua(l);let m=[];if(typeof f=="string")Su(l,f)&&(m=m.concat(l.g.get(bi(l,f))));else for(l=Array.from(l.g.values()),f=0;f<l.length;f++)m=m.concat(l[f]);return m}t.set=function(l,f){return Ua(this),this.i=null,l=bi(this,l),Su(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[f]),this.h+=1,this},t.get=function(l,f){return l?(l=wu(this,l),l.length>0?String(l[0]):f):f};function hl(l,f,m){Eu(l,f),m.length>0&&(l.i=null,l.g.set(bi(l,f),y(m)),l.h+=m.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],f=Array.from(this.g.keys());for(let v=0;v<f.length;v++){var m=f[v];const j=ws(m);m=wu(this,m);for(let P=0;P<m.length;P++){let J=j;m[P]!==""&&(J+="="+ws(m[P])),l.push(J)}}return this.i=l.join("&")};function Ar(l){const f=new wr;return f.i=l.i,l.g&&(f.g=new Map(l.g),f.h=l.h),f}function bi(l,f){return f=String(f),l.j&&(f=f.toLowerCase()),f}function _d(l,f){f&&!l.j&&(Ua(l),l.i=null,l.g.forEach(function(m,v){const j=v.toLowerCase();v!=j&&(Eu(this,v),hl(this,j,m))},l)),l.j=f}function Nr(l,f){const m=new dt;if(r.Image){const v=new Image;v.onload=d(ba,m,"TestLoadImage: loaded",!0,f,v),v.onerror=d(ba,m,"TestLoadImage: error",!1,f,v),v.onabort=d(ba,m,"TestLoadImage: abort",!1,f,v),v.ontimeout=d(ba,m,"TestLoadImage: timeout",!1,f,v),r.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=l}else f(!1)}function Au(l,f){const m=new dt,v=new AbortController,j=setTimeout(()=>{v.abort(),ba(m,"TestPingServer: timeout",!1,f)},1e4);fetch(l,{signal:v.signal}).then(P=>{clearTimeout(j),P.ok?ba(m,"TestPingServer: ok",!0,f):ba(m,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(j),ba(m,"TestPingServer: error",!1,f)})}function ba(l,f,m,v,j){try{j&&(j.onload=null,j.onerror=null,j.onabort=null,j.ontimeout=null),v(m)}catch{}}function Td(){this.g=new _t}function Oo(l){this.i=l.Sb||null,this.h=l.ab||!1}p(Oo,Ot),Oo.prototype.g=function(){return new fl(this.i,this.h)};function fl(l,f){ge.call(this),this.H=l,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(fl,ge),t=fl.prototype,t.open=function(l,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=l,this.D=f,this.readyState=1,_i(this)},t.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const f={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};l&&(f.body=l),(this.H||r).fetch(new Request(this.D,f)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,xi(this)),this.readyState=0},t.Pa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,_i(this)),this.g&&(this.readyState=3,_i(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof r.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Vo(this)}else l.text().then(this.Oa.bind(this),this.ga.bind(this))};function Vo(l){l.j.read().then(l.Ma.bind(l)).catch(l.ga.bind(l))}t.Ma=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var f=l.value?l.value:new Uint8Array(0);(f=this.B.decode(f,{stream:!l.done}))&&(this.response=this.responseText+=f)}l.done?xi(this):_i(this),this.readyState==3&&Vo(this)}},t.Oa=function(l){this.g&&(this.response=this.responseText=l,xi(this))},t.Na=function(l){this.g&&(this.response=l,xi(this))},t.ga=function(){this.g&&xi(this)};function xi(l){l.readyState=4,l.l=null,l.j=null,l.B=null,_i(l)}t.setRequestHeader=function(l,f){this.A.append(l,f)},t.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],f=this.h.entries();for(var m=f.next();!m.done;)m=m.value,l.push(m[0]+": "+m[1]),m=f.next();return l.join(`\r
`)};function _i(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(fl.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function Nu(l){let f="";return pe(l,function(m,v){f+=v,f+=":",f+=m,f+=`\r
`}),f}function Po(l,f,m){e:{for(v in m){var v=!1;break e}v=!0}v||(m=Nu(m),typeof l=="string"?m!=null&&ws(m):St(l,f,m))}function Wt(l){ge.call(this),this.headers=new Map,this.L=l||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(Wt,ge);var Ed=/^https?$/i,Ru=["POST","PUT"];t=Wt.prototype,t.Fa=function(l){this.H=l},t.ea=function(l,f,m,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);f=f?f.toUpperCase():"GET",this.D=l,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():aa.g(),this.g.onreadystatechange=g(h(this.Ca,this));try{this.B=!0,this.g.open(f,String(l),!0),this.B=!1}catch(P){Lo(this,P);return}if(l=m||"",m=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var j in v)m.set(j,v[j]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const P of v.keys())m.set(P,v.get(P));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(m.keys()).find(P=>P.toLowerCase()=="content-type"),j=r.FormData&&l instanceof r.FormData,!(Array.prototype.indexOf.call(Ru,f,void 0)>=0)||v||j||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,J]of m)this.g.setRequestHeader(P,J);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(l),this.v=!1}catch(P){Lo(this,P)}};function Lo(l,f){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=f,l.o=5,Uo(l),B(l)}function Uo(l){l.A||(l.A=!0,xe(l,"complete"),xe(l,"error"))}t.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=l||7,xe(this,"complete"),xe(this,"abort"),B(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),B(this,!0)),Wt.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?C(this):this.Xa())},t.Xa=function(){C(this)};function C(l){if(l.h&&typeof i<"u"){if(l.v&&z(l)==4)setTimeout(l.Ca.bind(l),0);else if(xe(l,"readystatechange"),z(l)==4){l.h=!1;try{const P=l.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var m;if(!(m=f)){var v;if(v=P===0){let J=String(l.D).match(Dn)[1]||null;!J&&r.self&&r.self.location&&(J=r.self.location.protocol.slice(0,-1)),v=!Ed.test(J?J.toLowerCase():"")}m=v}if(m)xe(l,"complete"),xe(l,"success");else{l.o=6;try{var j=z(l)>2?l.g.statusText:""}catch{j=""}l.l=j+" ["+l.ca()+"]",Uo(l)}}finally{B(l)}}}}function B(l,f){if(l.g){l.m&&(clearTimeout(l.m),l.m=null);const m=l.g;l.g=null,f||xe(l,"ready");try{m.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function z(l){return l.g?l.g.readyState:0}t.ca=function(){try{return z(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(l){if(this.g){var f=this.g.responseText;return l&&f.indexOf(l)==0&&(f=f.substring(l.length)),Ye(f)}};function ne(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.F){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function L(l){const f={};l=(l.g&&z(l)>=2&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<l.length;v++){if(T(l[v]))continue;var m=ia(l[v]);const j=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const P=f[j]||[];f[j]=P,P.push(m)}Se(f,function(v){return v.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function K(l,f,m){return m&&m.internalChannelParams&&m.internalChannelParams[l]||f}function Te(l){this.za=0,this.i=[],this.j=new dt,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=K("failFast",!1,l),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=K("baseRetryDelayMs",5e3,l),this.Za=K("retryDelaySeedMs",1e4,l),this.Ta=K("forwardChannelMaxRetries",2,l),this.va=K("forwardChannelRequestTimeoutMs",2e4,l),this.ma=l&&l.xmlHttpFactory||void 0,this.Ua=l&&l.Rb||void 0,this.Aa=l&&l.useFetchStreams||!1,this.O=void 0,this.L=l&&l.supportsCrossDomainXhr||!1,this.M="",this.h=new qs(l&&l.concurrentRequestLimit),this.Ba=new Td,this.S=l&&l.fastHandshake||!1,this.R=l&&l.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=l&&l.Pb||!1,l&&l.ua&&this.j.ua(),l&&l.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&l&&l.detectBufferingProxy||!1,this.ia=void 0,l&&l.longPollingTimeout&&l.longPollingTimeout>0&&(this.ia=l.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=Te.prototype,t.ka=8,t.I=1,t.connect=function(l,f,m,v){Pt(0),this.W=l,this.H=f||{},m&&v!==void 0&&(this.H.OSID=m,this.H.OAID=v),this.F=this.X,this.J=an(this,null,this.W),Jt(this)};function Oe(l){if(sn(l),l.I==3){var f=l.V++,m=Hs(l.J);if(St(m,"SID",l.M),St(m,"RID",f),St(m,"TYPE","terminate"),Zt(l,m),f=new Wn(l,l.j,f),f.M=2,f.A=Tr(Hs(m)),m=!1,r.navigator&&r.navigator.sendBeacon)try{m=r.navigator.sendBeacon(f.A.toString(),"")}catch{}!m&&r.Image&&(new Image().src=f.A,m=!0),m||(f.g=ut(f.j,null),f.g.ea(f.A)),f.F=Date.now(),Fs(f)}Ze(l)}function We(l){l.g&&(vn(l),l.g.cancel(),l.g=null)}function sn(l){We(l),l.v&&(r.clearTimeout(l.v),l.v=null),On(l),l.h.cancel(),l.m&&(typeof l.m=="number"&&r.clearTimeout(l.m),l.m=null)}function Jt(l){if(!Ns(l.h)&&!l.m){l.m=!0;var f=l.Ea;U||_(),W||(U(),W=!0),S.add(f,l),l.D=0}}function Je(l,f){return de(l.h)>=l.h.j-(l.m?1:0)?!1:l.m?(l.i=f.G.concat(l.i),!0):l.I==1||l.I==2||l.D>=(l.Sa?0:l.Ta)?!1:(l.m=_e(h(l.Ea,l,f),Ba(l,l.D)),l.D++,!0)}t.Ea=function(l){if(this.m)if(this.m=null,this.I==1){if(!l){this.V=Math.floor(Math.random()*1e5),l=this.V++;const j=new Wn(this,this.j,l);let P=this.o;if(this.U&&(P?(P=Qe(P),Dt(P,this.U)):P=this.U),this.u!==null||this.R||(j.J=P,P=null),this.S)e:{for(var f=0,m=0;m<this.i.length;m++){t:{var v=this.i[m];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(f+=v,f>4096){f=m;break e}if(f===4096||m===this.i.length-1){f=m+1;break e}}f=1e3}else f=1e3;f=jn(this,j,f),m=Hs(this.J),St(m,"RID",l),St(m,"CVER",22),this.G&&St(m,"X-HTTP-Session-Id",this.G),Zt(this,m),P&&(this.R?f="headers="+ws(Nu(P))+"&"+f:this.u&&Po(m,this.u,P)),os(this.h,j),this.Ra&&St(m,"TYPE","init"),this.S?(St(m,"$req",f),St(m,"SID","null"),j.U=!0,Pa(j,m,null)):Pa(j,m,f),this.I=2}}else this.I==3&&(l?Ht(this,l):this.i.length==0||Ns(this.h)||Ht(this))};function Ht(l,f){var m;f?m=f.l:m=l.V++;const v=Hs(l.J);St(v,"SID",l.M),St(v,"RID",m),St(v,"AID",l.K),Zt(l,v),l.u&&l.o&&Po(v,l.u,l.o),m=new Wn(l,l.j,m,l.D+1),l.u===null&&(m.J=l.o),f&&(l.i=f.G.concat(l.i)),f=jn(l,m,1e3),m.H=Math.round(l.va*.5)+Math.round(l.va*.5*Math.random()),os(l.h,m),Pa(m,v,f)}function Zt(l,f){l.H&&pe(l.H,function(m,v){St(f,v,m)}),l.l&&pe({},function(m,v){St(f,v,m)})}function jn(l,f,m){m=Math.min(l.i.length,m);const v=l.l?h(l.l.Ka,l.l,l):null;e:{var j=l.i;let Me=-1;for(;;){const Be=["count="+m];Me==-1?m>0?(Me=j[0].g,Be.push("ofs="+Me)):Me=0:Be.push("ofs="+Me);let Pe=!0;for(let kt=0;kt<m;kt++){var P=j[kt].g;const ps=j[kt].map;if(P-=Me,P<0)Me=Math.max(0,j[kt].g-100),Pe=!1;else try{P="req"+P+"_"||"";try{var J=ps instanceof Map?ps:Object.entries(ps);for(const[Rs,Cs]of J){let xa=Cs;o(Cs)&&(xa=te(Cs)),Be.push(P+Rs+"="+encodeURIComponent(xa))}}catch(Rs){throw Be.push(P+"type="+encodeURIComponent("_badmap")),Rs}}catch{v&&v(ps)}}if(Pe){J=Be.join("&");break e}}J=void 0}return l=l.i.splice(0,m),f.G=l,J}function Cn(l){if(!l.g&&!l.v){l.Y=1;var f=l.Da;U||_(),W||(U(),W=!0),S.add(f,l),l.A=0}}function cs(l){return l.g||l.v||l.A>=3?!1:(l.Y++,l.v=_e(h(l.Da,l),Ba(l,l.A)),l.A++,!0)}t.Da=function(){if(this.v=null,za(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var l=4*this.T;this.j.info("BP detection timer enabled: "+l),this.B=_e(h(this.Wa,this),l)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Pt(10),We(this),za(this))};function vn(l){l.B!=null&&(r.clearTimeout(l.B),l.B=null)}function za(l){l.g=new Wn(l,l.j,"rpc",l.Y),l.u===null&&(l.g.J=l.o),l.g.P=0;var f=Hs(l.na);St(f,"RID","rpc"),St(f,"SID",l.M),St(f,"AID",l.K),St(f,"CI",l.F?"0":"1"),!l.F&&l.ia&&St(f,"TO",l.ia),St(f,"TYPE","xmlhttp"),Zt(l,f),l.u&&l.o&&Po(f,l.u,l.o),l.O&&(l.g.H=l.O);var m=l.g;l=l.ba,m.M=1,m.A=Tr(Hs(f)),m.u=null,m.R=!0,Jn(m,l)}t.Va=function(){this.C!=null&&(this.C=null,We(this),cs(this),Pt(19))};function On(l){l.C!=null&&(r.clearTimeout(l.C),l.C=null)}function es(l,f){var m=null;if(l.g==f){On(l),vn(l),l.g=null;var v=2}else if(F(l.h,f))m=f.G,xr(l.h,f),v=1;else return;if(l.I!=0){if(f.o)if(v==1){m=f.u?f.u.length:0,f=Date.now()-f.F;var j=l.D;v=Bt(),xe(v,new Xn(v,m)),Jt(l)}else Cn(l);else if(j=f.m,j==3||j==0&&f.X>0||!(v==1&&Je(l,f)||v==2&&cs(l)))switch(m&&m.length>0&&(f=l.h,f.i=f.i.concat(m)),j){case 1:Re(l,5);break;case 4:Re(l,10);break;case 3:Re(l,6);break;default:Re(l,2)}}}function Ba(l,f){let m=l.Qa+Math.floor(Math.random()*l.Za);return l.isActive()||(m*=2),m*f}function Re(l,f){if(l.j.info("Error code "+f),f==2){var m=h(l.bb,l),v=l.Ua;const j=!v;v=new la(v||"//www.google.com/images/cleardot.gif"),r.location&&r.location.protocol=="http"||va(v,"https"),Tr(v),j?Nr(v.toString(),m):Au(v.toString(),m)}else Pt(2);l.I=0,l.l&&l.l.pa(f),Ze(l),sn(l)}t.bb=function(l){l?(this.j.info("Successfully pinged google.com"),Pt(2)):(this.j.info("Failed to ping google.com"),Pt(1))};function Ze(l){if(l.I=0,l.ja=[],l.l){const f=xu(l.h);(f.length!=0||l.i.length!=0)&&(R(l.ja,f),R(l.ja,l.i),l.h.i.length=0,y(l.i),l.i.length=0),l.l.oa()}}function an(l,f,m){var v=m instanceof la?Hs(m):new la(m);if(v.g!="")f&&(v.g=f+"."+v.g),vi(v,v.u);else{var j=r.location;v=j.protocol,f=f?f+"."+j.hostname:j.hostname,j=+j.port;const P=new la(null);v&&va(P,v),f&&(P.g=f),j&&vi(P,j),m&&(P.h=m),v=P}return m=l.G,f=l.wa,m&&f&&St(v,m,f),St(v,"VER",l.ka),Zt(l,v),v}function ut(l,f,m){if(f&&!l.L)throw Error("Can't create secondary domain capable XhrIo object.");return f=l.Aa&&!l.ma?new Wt(new Oo({ab:m})):new Wt(l.ma),f.Fa(l.L),f}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function He(){}t=He.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function re(){}re.prototype.g=function(l,f){return new Ee(l,f)};function Ee(l,f){ge.call(this),this.g=new Te(f),this.l=l,this.h=f&&f.messageUrlParams||null,l=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(l?l["X-WebChannel-Content-Type"]=f.messageContentType:l={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.sa&&(l?l["X-WebChannel-Client-Profile"]=f.sa:l={"X-WebChannel-Client-Profile":f.sa}),this.g.U=l,(l=f&&f.Qb)&&!T(l)&&(this.g.u=l),this.A=f&&f.supportsCrossDomainXhr||!1,this.v=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!T(f)&&(this.g.G=f,l=this.h,l!==null&&f in l&&(l=this.h,f in l&&delete l[f])),this.j=new pt(this)}p(Ee,ge),Ee.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ee.prototype.close=function(){Oe(this.g)},Ee.prototype.o=function(l){var f=this.g;if(typeof l=="string"){var m={};m.__data__=l,l=m}else this.v&&(m={},m.__data__=te(l),l=m);f.i.push(new As(f.Ya++,l)),f.I==3&&Jt(f)},Ee.prototype.N=function(){this.g.l=null,delete this.j,Oe(this.g),delete this.g,Ee.Z.N.call(this)};function mt(l){ft.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var f=l.__sm__;if(f){e:{for(const m in f){l=m;break e}l=void 0}(this.i=l)&&(l=this.i,f=f!==null&&l in f?f[l]:void 0),this.data=f}else this.data=l}p(mt,ft);function wt(){je.call(this),this.status=1}p(wt,je);function pt(l){this.g=l}p(pt,He),pt.prototype.ra=function(){xe(this.g,"a")},pt.prototype.qa=function(l){xe(this.g,new mt(l))},pt.prototype.pa=function(l){xe(this.g,new wt)},pt.prototype.oa=function(){xe(this.g,"b")},re.prototype.createWebChannel=re.prototype.g,Ee.prototype.send=Ee.prototype.o,Ee.prototype.open=Ee.prototype.m,Ee.prototype.close=Ee.prototype.close,e2=function(){return new re},ZT=function(){return Bt()},JT=fe,D0={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ct.NO_ERROR=0,Ct.TIMEOUT=8,Ct.HTTP_ERROR=6,mh=Ct,hn.COMPLETE="complete",WT=hn,cn.EventType=nn,nn.OPEN="a",nn.CLOSE="b",nn.ERROR="c",nn.MESSAGE="d",ge.prototype.listen=ge.prototype.J,tc=cn,Wt.prototype.listenOnce=Wt.prototype.K,Wt.prototype.getLastError=Wt.prototype.Ha,Wt.prototype.getLastErrorCode=Wt.prototype.ya,Wt.prototype.getStatus=Wt.prototype.ca,Wt.prototype.getResponseJson=Wt.prototype.La,Wt.prototype.getResponseText=Wt.prototype.la,Wt.prototype.send=Wt.prototype.ea,Wt.prototype.setWithCredentials=Wt.prototype.Fa,XT=Wt}).apply(typeof Hu<"u"?Hu:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class ss{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ss.UNAUTHENTICATED=new ss(null),ss.GOOGLE_CREDENTIALS=new ss("google-credentials-uid"),ss.FIRST_PARTY=new ss("first-party-uid"),ss.MOCK_USER=new ss("mock-user");/**
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
 */let No="12.12.0";function cR(t){No=t}/**
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
 */const Jr=new og("@firebase/firestore");function bl(){return Jr.logLevel}function ce(t,...e){if(Jr.logLevel<=nt.DEBUG){const n=e.map(hg);Jr.debug(`Firestore (${No}): ${t}`,...n)}}function hi(t,...e){if(Jr.logLevel<=nt.ERROR){const n=e.map(hg);Jr.error(`Firestore (${No}): ${t}`,...n)}}function Zr(t,...e){if(Jr.logLevel<=nt.WARN){const n=e.map(hg);Jr.warn(`Firestore (${No}): ${t}`,...n)}}function hg(t){if(typeof t=="string")return t;try{return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
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
 */function we(t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,t2(t,s,n)}function t2(t,e,n){let s=`FIRESTORE (${No}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{s+=" CONTEXT: "+JSON.stringify(n)}catch{s+=" CONTEXT: "+n}throw hi(s),new Error(s)}function bt(t,e,n,s){let a="Unexpected state";typeof n=="string"?a=n:s=n,t||t2(e,a,s)}function Le(t,e){return t}/**
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
 */const H={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class le extends gi{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class si{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class n2{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class uR{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ss.UNAUTHENTICATED))}shutdown(){}}class hR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class fR{constructor(e){this.t=e,this.currentUser=ss.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){bt(this.o===void 0,42304);let s=this.i;const a=u=>this.i!==s?(s=this.i,n(u)):Promise.resolve();let i=new si;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new si,e.enqueueRetryable(()=>a(this.currentUser))};const r=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await a(this.currentUser)})},o=u=>{ce("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),r())};this.t.onInit(u=>o(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?o(u):(ce("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new si)}},0),r()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(ce("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(bt(typeof s.accessToken=="string",31837,{l:s}),new n2(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return bt(e===null||typeof e=="string",2055,{h:e}),new ss(e)}}class dR{constructor(e,n,s){this.P=e,this.T=n,this.I=s,this.type="FirstParty",this.user=ss.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class mR{constructor(e,n,s){this.P=e,this.T=n,this.I=s}getToken(){return Promise.resolve(new dR(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(ss.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class zv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pR{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ha(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){bt(this.o===void 0,3512);const s=i=>{i.error!=null&&ce("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const r=i.token!==this.m;return this.m=i.token,ce("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const a=i=>{ce("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>a(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?a(i):ce("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new zv(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(bt(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new zv(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function gR(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
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
 */class fg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const a=gR(40);for(let i=0;i<a.length;++i)s.length<20&&a[i]<n&&(s+=e.charAt(a[i]%62))}return s}}function st(t,e){return t<e?-1:t>e?1:0}function j0(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const a=t.charAt(s),i=e.charAt(s);if(a!==i)return dm(a)===dm(i)?st(a,i):dm(a)?1:-1}return st(t.length,e.length)}const yR=55296,vR=57343;function dm(t){const e=t.charCodeAt(0);return e>=yR&&e<=vR}function oo(t,e,n){return t.length===e.length&&t.every((s,a)=>n(s,e[a]))}/**
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
 */const Bv="__name__";class _a{constructor(e,n,s){n===void 0?n=0:n>e.length&&we(637,{offset:n,range:e.length}),s===void 0?s=e.length-n:s>e.length-n&&we(1746,{length:s,range:e.length-n}),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return _a.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof _a?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let a=0;a<s;a++){const i=_a.compareSegments(e.get(a),n.get(a));if(i!==0)return i}return st(e.length,n.length)}static compareSegments(e,n){const s=_a.isNumericId(e),a=_a.isNumericId(n);return s&&!a?-1:!s&&a?1:s&&a?_a.extractNumericId(e).compare(_a.extractNumericId(n)):j0(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Zi.fromString(e.substring(4,e.length-2))}}class $t extends _a{construct(e,n,s){return new $t(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new le(H.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(a=>a.length>0))}return new $t(n)}static emptyPath(){return new $t([])}}const bR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Hn extends _a{construct(e,n,s){return new Hn(e,n,s)}static isValidIdentifier(e){return bR.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Hn.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Bv}static keyField(){return new Hn([Bv])}static fromServerFormat(e){const n=[];let s="",a=0;const i=()=>{if(s.length===0)throw new le(H.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let r=!1;for(;a<e.length;){const o=e[a];if(o==="\\"){if(a+1===e.length)throw new le(H.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[a+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new le(H.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=u,a+=2}else o==="`"?(r=!r,a++):o!=="."||r?(s+=o,a++):(i(),a++)}if(i(),r)throw new le(H.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Hn(n)}static emptyPath(){return new Hn([])}}/**
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
 */class be{constructor(e){this.path=e}static fromPath(e){return new be($t.fromString(e))}static fromName(e){return new be($t.fromString(e).popFirst(5))}static empty(){return new be($t.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&$t.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return $t.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new be(new $t(e.slice()))}}/**
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
 */function s2(t,e,n){if(!n)throw new le(H.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function xR(t,e,n,s){if(e===!0&&s===!0)throw new le(H.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function $v(t){if(!be.isDocumentKey(t))throw new le(H.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Fv(t){if(be.isDocumentKey(t))throw new le(H.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function a2(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Xf(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":we(12329,{type:typeof t})}function na(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new le(H.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Xf(t);throw new le(H.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function _R(t,e){if(e<=0)throw new le(H.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
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
 */function An(t,e){const n={typeString:t};return e&&(n.value=e),n}function hu(t,e){if(!a2(t))throw new le(H.INVALID_ARGUMENT,"JSON must be an object");let n;for(const s in e)if(e[s]){const a=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in t)){n=`JSON missing required field: '${s}'`;break}const r=t[s];if(a&&typeof r!==a){n=`JSON field '${s}' must be a ${a}.`;break}if(i!==void 0&&r!==i.value){n=`Expected '${s}' field to equal '${i.value}'`;break}}if(n)throw new le(H.INVALID_ARGUMENT,n);return!0}/**
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
 */const qv=-62135596800,Hv=1e6;class Kt{static now(){return Kt.fromMillis(Date.now())}static fromDate(e){return Kt.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor((e-1e3*n)*Hv);return new Kt(n,s)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new le(H.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new le(H.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<qv)throw new le(H.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new le(H.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Hv}_compareTo(e){return this.seconds===e.seconds?st(this.nanoseconds,e.nanoseconds):st(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Kt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(hu(e,Kt._jsonSchema))return new Kt(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-qv;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Kt._jsonSchemaVersion="firestore/timestamp/1.0",Kt._jsonSchema={type:An("string",Kt._jsonSchemaVersion),seconds:An("number"),nanoseconds:An("number")};/**
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
 */class Ve{static fromTimestamp(e){return new Ve(e)}static min(){return new Ve(new Kt(0,0))}static max(){return new Ve(new Kt(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Fc=-1;function TR(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,a=Ve.fromTimestamp(s===1e9?new Kt(n+1,0):new Kt(n,s));return new lr(a,be.empty(),e)}function ER(t){return new lr(t.readTime,t.key,Fc)}class lr{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new lr(Ve.min(),be.empty(),Fc)}static max(){return new lr(Ve.max(),be.empty(),Fc)}}function SR(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=be.comparator(t.documentKey,e.documentKey),n!==0?n:st(t.largestBatchId,e.largestBatchId))}/**
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
 */const wR="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class AR{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Ro(t){if(t.code!==H.FAILED_PRECONDITION||t.message!==wR)throw t;ce("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class Q{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&we(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new Q((s,a)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,a)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,a)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof Q?n:Q.resolve(n)}catch(n){return Q.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):Q.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):Q.reject(n)}static resolve(e){return new Q((n,s)=>{n(e)})}static reject(e){return new Q((n,s)=>{s(e)})}static waitFor(e){return new Q((n,s)=>{let a=0,i=0,r=!1;e.forEach(o=>{++a,o.next(()=>{++i,r&&i===a&&n()},u=>s(u))}),r=!0,i===a&&n()})}static or(e){let n=Q.resolve(!1);for(const s of e)n=n.next(a=>a?Q.resolve(a):s());return n}static forEach(e,n){const s=[];return e.forEach((a,i)=>{s.push(n.call(this,a,i))}),this.waitFor(s)}static mapArray(e,n){return new Q((s,a)=>{const i=e.length,r=new Array(i);let o=0;for(let u=0;u<i;u++){const h=u;n(e[h]).next(d=>{r[h]=d,++o,o===i&&s(r)},d=>a(d))}})}static doWhile(e,n){return new Q((s,a)=>{const i=()=>{e()===!0?n().next(()=>{i()},a):s()};i()})}}function NR(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Co(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class Wf{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>n.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Wf.ce=-1;/**
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
 */const dg=-1;function Jf(t){return t==null}function rf(t){return t===0&&1/t==-1/0}function RR(t){return typeof t=="number"&&Number.isInteger(t)&&!rf(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */const i2="";function CR(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Gv(e)),e=kR(t.get(n),e);return Gv(e)}function kR(t,e){let n=e;const s=t.length;for(let a=0;a<s;a++){const i=t.charAt(a);switch(i){case"\0":n+="";break;case i2:n+="";break;default:n+=i}}return n}function Gv(t){return t+i2+""}/**
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
 */function Yv(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function gr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function r2(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class ln{constructor(e,n){this.comparator=e,this.root=n||$n.EMPTY}insert(e,n){return new ln(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,$n.BLACK,null,null))}remove(e){return new ln(this.comparator,this.root.remove(e,this.comparator).copy(null,null,$n.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const a=this.comparator(e,s.key);if(a===0)return n+s.left.size;a<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Gu(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Gu(this.root,e,this.comparator,!1)}getReverseIterator(){return new Gu(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Gu(this.root,e,this.comparator,!0)}}class Gu{constructor(e,n,s,a){this.isReverse=a,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&a&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class $n{constructor(e,n,s,a,i){this.key=e,this.value=n,this.color=s??$n.RED,this.left=a??$n.EMPTY,this.right=i??$n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,a,i){return new $n(e??this.key,n??this.value,s??this.color,a??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let a=this;const i=s(e,a.key);return a=i<0?a.copy(null,null,null,a.left.insert(e,n,s),null):i===0?a.copy(null,n,null,null,null):a.copy(null,null,null,null,a.right.insert(e,n,s)),a.fixUp()}removeMin(){if(this.left.isEmpty())return $n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,a=this;if(n(e,a.key)<0)a.left.isEmpty()||a.left.isRed()||a.left.left.isRed()||(a=a.moveRedLeft()),a=a.copy(null,null,null,a.left.remove(e,n),null);else{if(a.left.isRed()&&(a=a.rotateRight()),a.right.isEmpty()||a.right.isRed()||a.right.left.isRed()||(a=a.moveRedRight()),n(e,a.key)===0){if(a.right.isEmpty())return $n.EMPTY;s=a.right.min(),a=a.copy(s.key,s.value,null,null,a.right.removeMin())}a=a.copy(null,null,null,null,a.right.remove(e,n))}return a.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,$n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,$n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw we(43730,{key:this.key,value:this.value});if(this.right.isRed())throw we(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw we(27949);return e+(this.isRed()?0:1)}}$n.EMPTY=null,$n.RED=!0,$n.BLACK=!1;$n.EMPTY=new class{constructor(){this.size=0}get key(){throw we(57766)}get value(){throw we(16141)}get color(){throw we(16727)}get left(){throw we(29726)}get right(){throw we(36894)}copy(e,n,s,a,i){return this}insert(e,n,s){return new $n(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class In{constructor(e){this.comparator=e,this.data=new ln(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const a=s.getNext();if(this.comparator(a.key,e[1])>=0)return;n(a.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Kv(this.data.getIterator())}getIteratorFrom(e){return new Kv(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof In)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const a=n.getNext().key,i=s.getNext().key;if(this.comparator(a,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new In(this.comparator);return n.data=e,n}}class Kv{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class js{constructor(e){this.fields=e,e.sort(Hn.comparator)}static empty(){return new js([])}unionWith(e){let n=new In(Hn.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new js(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return oo(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
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
 */class l2 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Qn{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(a){try{return atob(a)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new l2("Invalid base64 string: "+i):i}}(e);return new Qn(n)}static fromUint8Array(e){const n=function(a){let i="";for(let r=0;r<a.length;++r)i+=String.fromCharCode(a[r]);return i}(e);return new Qn(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const s=new Uint8Array(n.length);for(let a=0;a<n.length;a++)s[a]=n.charCodeAt(a);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return st(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Qn.EMPTY_BYTE_STRING=new Qn("");const IR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function or(t){if(bt(!!t,39018),typeof t=="string"){let e=0;const n=IR.exec(t);if(bt(!!n,46558,{timestamp:t}),n[1]){let a=n[1];a=(a+"000000000").substr(0,9),e=Number(a)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:pn(t.seconds),nanos:pn(t.nanos)}}function pn(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function cr(t){return typeof t=="string"?Qn.fromBase64String(t):Qn.fromUint8Array(t)}/**
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
 */const o2="server_timestamp",c2="__type__",u2="__previous_value__",h2="__local_write_time__";function mg(t){var n,s;return((s=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[c2])==null?void 0:s.stringValue)===o2}function Zf(t){const e=t.mapValue.fields[u2];return mg(e)?Zf(e):e}function qc(t){const e=or(t.mapValue.fields[h2].timestampValue);return new Kt(e.seconds,e.nanos)}/**
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
 */class MR{constructor(e,n,s,a,i,r,o,u,h,d,p){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=a,this.ssl=i,this.forceLongPolling=r,this.autoDetectLongPolling=o,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=d,this.apiKey=p}}const lf="(default)";class Hc{constructor(e,n){this.projectId=e,this.database=n||lf}static empty(){return new Hc("","")}get isDefaultDatabase(){return this.database===lf}isEqual(e){return e instanceof Hc&&e.projectId===this.projectId&&e.database===this.database}}function DR(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new le(H.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Hc(t.options.projectId,e)}/**
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
 */const f2="__type__",d2="__max__",Yu={mapValue:{fields:{__type__:{stringValue:d2}}}},m2="__vector__",of="value";function ur(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?mg(t)?4:OR(t)?9007199254740991:jR(t)?10:11:we(28295,{value:t})}function ja(t,e){if(t===e)return!0;const n=ur(t);if(n!==ur(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return qc(t).isEqual(qc(e));case 3:return function(a,i){if(typeof a.timestampValue=="string"&&typeof i.timestampValue=="string"&&a.timestampValue.length===i.timestampValue.length)return a.timestampValue===i.timestampValue;const r=or(a.timestampValue),o=or(i.timestampValue);return r.seconds===o.seconds&&r.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(a,i){return cr(a.bytesValue).isEqual(cr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(a,i){return pn(a.geoPointValue.latitude)===pn(i.geoPointValue.latitude)&&pn(a.geoPointValue.longitude)===pn(i.geoPointValue.longitude)}(t,e);case 2:return function(a,i){if("integerValue"in a&&"integerValue"in i)return pn(a.integerValue)===pn(i.integerValue);if("doubleValue"in a&&"doubleValue"in i){const r=pn(a.doubleValue),o=pn(i.doubleValue);return r===o?rf(r)===rf(o):isNaN(r)&&isNaN(o)}return!1}(t,e);case 9:return oo(t.arrayValue.values||[],e.arrayValue.values||[],ja);case 10:case 11:return function(a,i){const r=a.mapValue.fields||{},o=i.mapValue.fields||{};if(Yv(r)!==Yv(o))return!1;for(const u in r)if(r.hasOwnProperty(u)&&(o[u]===void 0||!ja(r[u],o[u])))return!1;return!0}(t,e);default:return we(52216,{left:t})}}function Gc(t,e){return(t.values||[]).find(n=>ja(n,e))!==void 0}function co(t,e){if(t===e)return 0;const n=ur(t),s=ur(e);if(n!==s)return st(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return st(t.booleanValue,e.booleanValue);case 2:return function(i,r){const o=pn(i.integerValue||i.doubleValue),u=pn(r.integerValue||r.doubleValue);return o<u?-1:o>u?1:o===u?0:isNaN(o)?isNaN(u)?0:-1:1}(t,e);case 3:return Qv(t.timestampValue,e.timestampValue);case 4:return Qv(qc(t),qc(e));case 5:return j0(t.stringValue,e.stringValue);case 6:return function(i,r){const o=cr(i),u=cr(r);return o.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(i,r){const o=i.split("/"),u=r.split("/");for(let h=0;h<o.length&&h<u.length;h++){const d=st(o[h],u[h]);if(d!==0)return d}return st(o.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,r){const o=st(pn(i.latitude),pn(r.latitude));return o!==0?o:st(pn(i.longitude),pn(r.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Xv(t.arrayValue,e.arrayValue);case 10:return function(i,r){var g,y,R,I;const o=i.fields||{},u=r.fields||{},h=(g=o[of])==null?void 0:g.arrayValue,d=(y=u[of])==null?void 0:y.arrayValue,p=st(((R=h==null?void 0:h.values)==null?void 0:R.length)||0,((I=d==null?void 0:d.values)==null?void 0:I.length)||0);return p!==0?p:Xv(h,d)}(t.mapValue,e.mapValue);case 11:return function(i,r){if(i===Yu.mapValue&&r===Yu.mapValue)return 0;if(i===Yu.mapValue)return 1;if(r===Yu.mapValue)return-1;const o=i.fields||{},u=Object.keys(o),h=r.fields||{},d=Object.keys(h);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const g=j0(u[p],d[p]);if(g!==0)return g;const y=co(o[u[p]],h[d[p]]);if(y!==0)return y}return st(u.length,d.length)}(t.mapValue,e.mapValue);default:throw we(23264,{he:n})}}function Qv(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return st(t,e);const n=or(t),s=or(e),a=st(n.seconds,s.seconds);return a!==0?a:st(n.nanos,s.nanos)}function Xv(t,e){const n=t.values||[],s=e.values||[];for(let a=0;a<n.length&&a<s.length;++a){const i=co(n[a],s[a]);if(i)return i}return st(n.length,s.length)}function uo(t){return O0(t)}function O0(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const s=or(n);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return cr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return be.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let s="[",a=!0;for(const i of n.values||[])a?a=!1:s+=",",s+=O0(i);return s+"]"}(t.arrayValue):"mapValue"in t?function(n){const s=Object.keys(n.fields||{}).sort();let a="{",i=!0;for(const r of s)i?i=!1:a+=",",a+=`${r}:${O0(n.fields[r])}`;return a+"}"}(t.mapValue):we(61005,{value:t})}function ph(t){switch(ur(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Zf(t);return e?16+ph(e):16;case 5:return 2*t.stringValue.length;case 6:return cr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((a,i)=>a+ph(i),0)}(t.arrayValue);case 10:case 11:return function(s){let a=0;return gr(s.fields,(i,r)=>{a+=i.length+ph(r)}),a}(t.mapValue);default:throw we(13486,{value:t})}}function Wv(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function V0(t){return!!t&&"integerValue"in t}function pg(t){return!!t&&"arrayValue"in t}function Jv(t){return!!t&&"nullValue"in t}function Zv(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function gh(t){return!!t&&"mapValue"in t}function jR(t){var n,s;return((s=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[f2])==null?void 0:s.stringValue)===m2}function xc(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return gr(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=xc(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=xc(t.arrayValue.values[n]);return e}return{...t}}function OR(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===d2}/**
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
 */class _s{constructor(e){this.value=e}static empty(){return new _s({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!gh(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=xc(n)}setAll(e){let n=Hn.emptyPath(),s={},a=[];e.forEach((r,o)=>{if(!n.isImmediateParentOf(o)){const u=this.getFieldsMap(n);this.applyChanges(u,s,a),s={},a=[],n=o.popLast()}r?s[o.lastSegment()]=xc(r):a.push(o.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,a)}delete(e){const n=this.field(e.popLast());gh(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return ja(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let a=n.mapValue.fields[e.get(s)];gh(a)&&a.mapValue.fields||(a={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=a),n=a}return n.mapValue.fields}applyChanges(e,n,s){gr(n,(a,i)=>e[a]=i);for(const a of s)delete e[a]}clone(){return new _s(xc(this.value))}}function p2(t){const e=[];return gr(t.fields,(n,s)=>{const a=new Hn([n]);if(gh(s)){const i=p2(s.mapValue).fields;if(i.length===0)e.push(a);else for(const r of i)e.push(a.child(r))}else e.push(a)}),new js(e)}/**
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
 */class as{constructor(e,n,s,a,i,r,o){this.key=e,this.documentType=n,this.version=s,this.readTime=a,this.createTime=i,this.data=r,this.documentState=o}static newInvalidDocument(e){return new as(e,0,Ve.min(),Ve.min(),Ve.min(),_s.empty(),0)}static newFoundDocument(e,n,s,a){return new as(e,1,n,Ve.min(),s,a,0)}static newNoDocument(e,n){return new as(e,2,n,Ve.min(),Ve.min(),_s.empty(),0)}static newUnknownDocument(e,n){return new as(e,3,n,Ve.min(),Ve.min(),_s.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Ve.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=_s.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=_s.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Ve.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof as&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new as(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class cf{constructor(e,n){this.position=e,this.inclusive=n}}function e1(t,e,n){let s=0;for(let a=0;a<t.position.length;a++){const i=e[a],r=t.position[a];if(i.field.isKeyField()?s=be.comparator(be.fromName(r.referenceValue),n.key):s=co(r,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function t1(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!ja(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class uf{constructor(e,n="asc"){this.field=e,this.dir=n}}function VR(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class g2{}class Sn extends g2{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new LR(e,n,s):n==="array-contains"?new BR(e,s):n==="in"?new $R(e,s):n==="not-in"?new FR(e,s):n==="array-contains-any"?new qR(e,s):new Sn(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new UR(e,s):new zR(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(co(n,this.value)):n!==null&&ur(this.value)===ur(n)&&this.matchesComparison(co(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return we(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class pa extends g2{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new pa(e,n)}matches(e){return y2(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function y2(t){return t.op==="and"}function v2(t){return PR(t)&&y2(t)}function PR(t){for(const e of t.filters)if(e instanceof pa)return!1;return!0}function P0(t){if(t instanceof Sn)return t.field.canonicalString()+t.op.toString()+uo(t.value);if(v2(t))return t.filters.map(e=>P0(e)).join(",");{const e=t.filters.map(n=>P0(n)).join(",");return`${t.op}(${e})`}}function b2(t,e){return t instanceof Sn?function(s,a){return a instanceof Sn&&s.op===a.op&&s.field.isEqual(a.field)&&ja(s.value,a.value)}(t,e):t instanceof pa?function(s,a){return a instanceof pa&&s.op===a.op&&s.filters.length===a.filters.length?s.filters.reduce((i,r,o)=>i&&b2(r,a.filters[o]),!0):!1}(t,e):void we(19439)}function x2(t){return t instanceof Sn?function(n){return`${n.field.canonicalString()} ${n.op} ${uo(n.value)}`}(t):t instanceof pa?function(n){return n.op.toString()+" {"+n.getFilters().map(x2).join(" ,")+"}"}(t):"Filter"}class LR extends Sn{constructor(e,n,s){super(e,n,s),this.key=be.fromName(s.referenceValue)}matches(e){const n=be.comparator(e.key,this.key);return this.matchesComparison(n)}}class UR extends Sn{constructor(e,n){super(e,"in",n),this.keys=_2("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class zR extends Sn{constructor(e,n){super(e,"not-in",n),this.keys=_2("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function _2(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(s=>be.fromName(s.referenceValue))}class BR extends Sn{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return pg(n)&&Gc(n.arrayValue,this.value)}}class $R extends Sn{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Gc(this.value.arrayValue,n)}}class FR extends Sn{constructor(e,n){super(e,"not-in",n)}matches(e){if(Gc(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Gc(this.value.arrayValue,n)}}class qR extends Sn{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!pg(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>Gc(this.value.arrayValue,s))}}/**
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
 */class HR{constructor(e,n=null,s=[],a=[],i=null,r=null,o=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=a,this.limit=i,this.startAt=r,this.endAt=o,this.Te=null}}function n1(t,e=null,n=[],s=[],a=null,i=null,r=null){return new HR(t,e,n,s,a,i,r)}function gg(t){const e=Le(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>P0(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),Jf(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>uo(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>uo(s)).join(",")),e.Te=n}return e.Te}function yg(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!VR(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!b2(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!t1(t.startAt,e.startAt)&&t1(t.endAt,e.endAt)}function L0(t){return be.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class fu{constructor(e,n=null,s=[],a=[],i=null,r="F",o=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=a,this.limit=i,this.limitType=r,this.startAt=o,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function GR(t,e,n,s,a,i,r,o){return new fu(t,e,n,s,a,i,r,o)}function ed(t){return new fu(t)}function s1(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function YR(t){return be.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function T2(t){return t.collectionGroup!==null}function _c(t){const e=Le(t);if(e.Ee===null){e.Ee=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),n.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(r){let o=new In(Hn.comparator);return r.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(o=o.add(h.field))})}),o})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new uf(i,s))}),n.has(Hn.keyField().canonicalString())||e.Ee.push(new uf(Hn.keyField(),s))}return e.Ee}function Ra(t){const e=Le(t);return e.Ie||(e.Ie=KR(e,_c(t))),e.Ie}function KR(t,e){if(t.limitType==="F")return n1(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(a=>{const i=a.dir==="desc"?"asc":"desc";return new uf(a.field,i)});const n=t.endAt?new cf(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new cf(t.startAt.position,t.startAt.inclusive):null;return n1(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}function U0(t,e){const n=t.filters.concat([e]);return new fu(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function hf(t,e,n){return new fu(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function td(t,e){return yg(Ra(t),Ra(e))&&t.limitType===e.limitType}function E2(t){return`${gg(Ra(t))}|lt:${t.limitType}`}function xl(t){return`Query(target=${function(n){let s=n.path.canonicalString();return n.collectionGroup!==null&&(s+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(s+=`, filters: [${n.filters.map(a=>x2(a)).join(", ")}]`),Jf(n.limit)||(s+=", limit: "+n.limit),n.orderBy.length>0&&(s+=`, orderBy: [${n.orderBy.map(a=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(a)).join(", ")}]`),n.startAt&&(s+=", startAt: ",s+=n.startAt.inclusive?"b:":"a:",s+=n.startAt.position.map(a=>uo(a)).join(",")),n.endAt&&(s+=", endAt: ",s+=n.endAt.inclusive?"a:":"b:",s+=n.endAt.position.map(a=>uo(a)).join(",")),`Target(${s})`}(Ra(t))}; limitType=${t.limitType})`}function nd(t,e){return e.isFoundDocument()&&function(s,a){const i=a.key.path;return s.collectionGroup!==null?a.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):be.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(t,e)&&function(s,a){for(const i of _c(s))if(!i.field.isKeyField()&&a.data.field(i.field)===null)return!1;return!0}(t,e)&&function(s,a){for(const i of s.filters)if(!i.matches(a))return!1;return!0}(t,e)&&function(s,a){return!(s.startAt&&!function(r,o,u){const h=e1(r,o,u);return r.inclusive?h<=0:h<0}(s.startAt,_c(s),a)||s.endAt&&!function(r,o,u){const h=e1(r,o,u);return r.inclusive?h>=0:h>0}(s.endAt,_c(s),a))}(t,e)}function QR(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function S2(t){return(e,n)=>{let s=!1;for(const a of _c(t)){const i=XR(a,e,n);if(i!==0)return i;s=s||a.field.isKeyField()}return 0}}function XR(t,e,n){const s=t.field.isKeyField()?be.comparator(e.key,n.key):function(i,r,o){const u=r.data.field(i),h=o.data.field(i);return u!==null&&h!==null?co(u,h):we(42886)}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return we(19790,{direction:t.dir})}}/**
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
 */class ol{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[a,i]of s)if(this.equalsFn(a,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),a=this.inner[s];if(a===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<a.length;i++)if(this.equalsFn(a[i][0],e))return void(a[i]=[e,n]);a.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let a=0;a<s.length;a++)if(this.equalsFn(s[a][0],e))return s.length===1?delete this.inner[n]:s.splice(a,1),this.innerSize--,!0;return!1}forEach(e){gr(this.inner,(n,s)=>{for(const[a,i]of s)e(a,i)})}isEmpty(){return r2(this.inner)}size(){return this.innerSize}}/**
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
 */const WR=new ln(be.comparator);function fi(){return WR}const w2=new ln(be.comparator);function nc(...t){let e=w2;for(const n of t)e=e.insert(n.key,n);return e}function A2(t){let e=w2;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function Pr(){return Tc()}function N2(){return Tc()}function Tc(){return new ol(t=>t.toString(),(t,e)=>t.isEqual(e))}const JR=new ln(be.comparator),ZR=new In(be.comparator);function at(...t){let e=ZR;for(const n of t)e=e.add(n);return e}const eC=new In(st);function tC(){return eC}/**
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
 */function vg(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:rf(e)?"-0":e}}function R2(t){return{integerValue:""+t}}function nC(t,e){return RR(e)?R2(e):vg(t,e)}/**
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
 */class sd{constructor(){this._=void 0}}function sC(t,e,n){return t instanceof ff?function(a,i){const r={fields:{[c2]:{stringValue:o2},[h2]:{timestampValue:{seconds:a.seconds,nanos:a.nanoseconds}}}};return i&&mg(i)&&(i=Zf(i)),i&&(r.fields[u2]=i),{mapValue:r}}(n,e):t instanceof ho?k2(t,e):t instanceof Yc?I2(t,e):function(a,i){const r=C2(a,i),o=a1(r)+a1(a.Ae);return V0(r)&&V0(a.Ae)?R2(o):vg(a.serializer,o)}(t,e)}function aC(t,e,n){return t instanceof ho?k2(t,e):t instanceof Yc?I2(t,e):n}function C2(t,e){return t instanceof df?function(s){return V0(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class ff extends sd{}class ho extends sd{constructor(e){super(),this.elements=e}}function k2(t,e){const n=M2(e);for(const s of t.elements)n.some(a=>ja(a,s))||n.push(s);return{arrayValue:{values:n}}}class Yc extends sd{constructor(e){super(),this.elements=e}}function I2(t,e){let n=M2(e);for(const s of t.elements)n=n.filter(a=>!ja(a,s));return{arrayValue:{values:n}}}class df extends sd{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function a1(t){return pn(t.integerValue||t.doubleValue)}function M2(t){return pg(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class iC{constructor(e,n){this.field=e,this.transform=n}}function rC(t,e){return t.field.isEqual(e.field)&&function(s,a){return s instanceof ho&&a instanceof ho||s instanceof Yc&&a instanceof Yc?oo(s.elements,a.elements,ja):s instanceof df&&a instanceof df?ja(s.Ae,a.Ae):s instanceof ff&&a instanceof ff}(t.transform,e.transform)}class lC{constructor(e,n){this.version=e,this.transformResults=n}}class Ca{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ca}static exists(e){return new Ca(void 0,e)}static updateTime(e){return new Ca(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function yh(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class ad{}function D2(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new O2(t.key,Ca.none()):new du(t.key,t.data,Ca.none());{const n=t.data,s=_s.empty();let a=new In(Hn.comparator);for(let i of e.fields)if(!a.has(i)){let r=n.field(i);r===null&&i.length>1&&(i=i.popLast(),r=n.field(i)),r===null?s.delete(i):s.set(i,r),a=a.add(i)}return new yr(t.key,s,new js(a.toArray()),Ca.none())}}function oC(t,e,n){t instanceof du?function(a,i,r){const o=a.value.clone(),u=r1(a.fieldTransforms,i,r.transformResults);o.setAll(u),i.convertToFoundDocument(r.version,o).setHasCommittedMutations()}(t,e,n):t instanceof yr?function(a,i,r){if(!yh(a.precondition,i))return void i.convertToUnknownDocument(r.version);const o=r1(a.fieldTransforms,i,r.transformResults),u=i.data;u.setAll(j2(a)),u.setAll(o),i.convertToFoundDocument(r.version,u).setHasCommittedMutations()}(t,e,n):function(a,i,r){i.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}function Ec(t,e,n,s){return t instanceof du?function(i,r,o,u){if(!yh(i.precondition,r))return o;const h=i.value.clone(),d=l1(i.fieldTransforms,u,r);return h.setAll(d),r.convertToFoundDocument(r.version,h).setHasLocalMutations(),null}(t,e,n,s):t instanceof yr?function(i,r,o,u){if(!yh(i.precondition,r))return o;const h=l1(i.fieldTransforms,u,r),d=r.data;return d.setAll(j2(i)),d.setAll(h),r.convertToFoundDocument(r.version,d).setHasLocalMutations(),o===null?null:o.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,s):function(i,r,o){return yh(i.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):o}(t,e,n)}function cC(t,e){let n=null;for(const s of t.fieldTransforms){const a=e.data.field(s.field),i=C2(s.transform,a||null);i!=null&&(n===null&&(n=_s.empty()),n.set(s.field,i))}return n||null}function i1(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(s,a){return s===void 0&&a===void 0||!(!s||!a)&&oo(s,a,(i,r)=>rC(i,r))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class du extends ad{constructor(e,n,s,a=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=a,this.type=0}getFieldMask(){return null}}class yr extends ad{constructor(e,n,s,a,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=a,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function j2(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function r1(t,e,n){const s=new Map;bt(t.length===n.length,32656,{Ve:n.length,de:t.length});for(let a=0;a<n.length;a++){const i=t[a],r=i.transform,o=e.data.field(i.field);s.set(i.field,aC(r,o,n[a]))}return s}function l1(t,e,n){const s=new Map;for(const a of t){const i=a.transform,r=n.data.field(a.field);s.set(a.field,sC(i,r,e))}return s}class O2 extends ad{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class uC extends ad{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class hC{constructor(e,n,s,a){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=a}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let a=0;a<this.mutations.length;a++){const i=this.mutations[a];i.key.isEqual(e.key)&&oC(i,e,s[a])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=Ec(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=Ec(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=N2();return this.mutations.forEach(a=>{const i=e.get(a.key),r=i.overlayedDocument;let o=this.applyToLocalView(r,i.mutatedFields);o=n.has(a.key)?null:o;const u=D2(r,o);u!==null&&s.set(a.key,u),r.isValidDocument()||r.convertToNoDocument(Ve.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),at())}isEqual(e){return this.batchId===e.batchId&&oo(this.mutations,e.mutations,(n,s)=>i1(n,s))&&oo(this.baseMutations,e.baseMutations,(n,s)=>i1(n,s))}}class bg{constructor(e,n,s,a){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=a}static from(e,n,s){bt(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let a=function(){return JR}();const i=e.mutations;for(let r=0;r<i.length;r++)a=a.insert(i[r].key,s[r].version);return new bg(e,n,s,a)}}/**
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
 */class fC{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class dC{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var bn,ct;function mC(t){switch(t){case H.OK:return we(64938);case H.CANCELLED:case H.UNKNOWN:case H.DEADLINE_EXCEEDED:case H.RESOURCE_EXHAUSTED:case H.INTERNAL:case H.UNAVAILABLE:case H.UNAUTHENTICATED:return!1;case H.INVALID_ARGUMENT:case H.NOT_FOUND:case H.ALREADY_EXISTS:case H.PERMISSION_DENIED:case H.FAILED_PRECONDITION:case H.ABORTED:case H.OUT_OF_RANGE:case H.UNIMPLEMENTED:case H.DATA_LOSS:return!0;default:return we(15467,{code:t})}}function V2(t){if(t===void 0)return hi("GRPC error has no .code"),H.UNKNOWN;switch(t){case bn.OK:return H.OK;case bn.CANCELLED:return H.CANCELLED;case bn.UNKNOWN:return H.UNKNOWN;case bn.DEADLINE_EXCEEDED:return H.DEADLINE_EXCEEDED;case bn.RESOURCE_EXHAUSTED:return H.RESOURCE_EXHAUSTED;case bn.INTERNAL:return H.INTERNAL;case bn.UNAVAILABLE:return H.UNAVAILABLE;case bn.UNAUTHENTICATED:return H.UNAUTHENTICATED;case bn.INVALID_ARGUMENT:return H.INVALID_ARGUMENT;case bn.NOT_FOUND:return H.NOT_FOUND;case bn.ALREADY_EXISTS:return H.ALREADY_EXISTS;case bn.PERMISSION_DENIED:return H.PERMISSION_DENIED;case bn.FAILED_PRECONDITION:return H.FAILED_PRECONDITION;case bn.ABORTED:return H.ABORTED;case bn.OUT_OF_RANGE:return H.OUT_OF_RANGE;case bn.UNIMPLEMENTED:return H.UNIMPLEMENTED;case bn.DATA_LOSS:return H.DATA_LOSS;default:return we(39323,{code:t})}}(ct=bn||(bn={}))[ct.OK=0]="OK",ct[ct.CANCELLED=1]="CANCELLED",ct[ct.UNKNOWN=2]="UNKNOWN",ct[ct.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ct[ct.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ct[ct.NOT_FOUND=5]="NOT_FOUND",ct[ct.ALREADY_EXISTS=6]="ALREADY_EXISTS",ct[ct.PERMISSION_DENIED=7]="PERMISSION_DENIED",ct[ct.UNAUTHENTICATED=16]="UNAUTHENTICATED",ct[ct.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ct[ct.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ct[ct.ABORTED=10]="ABORTED",ct[ct.OUT_OF_RANGE=11]="OUT_OF_RANGE",ct[ct.UNIMPLEMENTED=12]="UNIMPLEMENTED",ct[ct.INTERNAL=13]="INTERNAL",ct[ct.UNAVAILABLE=14]="UNAVAILABLE",ct[ct.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function pC(){return new TextEncoder}/**
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
 */const gC=new Zi([4294967295,4294967295],0);function o1(t){const e=pC().encode(t),n=new QT;return n.update(e),new Uint8Array(n.digest())}function c1(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),a=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Zi([n,s],0),new Zi([a,i],0)]}class xg{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new sc(`Invalid padding: ${n}`);if(s<0)throw new sc(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new sc(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new sc(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=Zi.fromNumber(this.ge)}ye(e,n,s){let a=e.add(n.multiply(Zi.fromNumber(s)));return a.compare(gC)===1&&(a=new Zi([a.getBits(0),a.getBits(1)],0)),a.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=o1(e),[s,a]=c1(n);for(let i=0;i<this.hashCount;i++){const r=this.ye(s,a,i);if(!this.we(r))return!1}return!0}static create(e,n,s){const a=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),r=new xg(i,a,n);return s.forEach(o=>r.insert(o)),r}insert(e){if(this.ge===0)return;const n=o1(e),[s,a]=c1(n);for(let i=0;i<this.hashCount;i++){const r=this.ye(s,a,i);this.Se(r)}}Se(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class sc extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class id{constructor(e,n,s,a,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=a,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const a=new Map;return a.set(e,mu.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new id(Ve.min(),a,new ln(st),fi(),at())}}class mu{constructor(e,n,s,a,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=a,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new mu(s,n,at(),at(),at())}}/**
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
 */class vh{constructor(e,n,s,a){this.be=e,this.removedTargetIds=n,this.key=s,this.De=a}}class P2{constructor(e,n){this.targetId=e,this.Ce=n}}class L2{constructor(e,n,s=Qn.EMPTY_BYTE_STRING,a=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=a}}class u1{constructor(){this.ve=0,this.Fe=h1(),this.Me=Qn.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=at(),n=at(),s=at();return this.Fe.forEach((a,i)=>{switch(i){case 0:e=e.add(a);break;case 2:n=n.add(a);break;case 1:s=s.add(a);break;default:we(38017,{changeType:i})}}),new mu(this.Me,this.xe,e,n,s)}qe(){this.Oe=!1,this.Fe=h1()}Ke(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,bt(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class yC{constructor(e){this.Ge=e,this.ze=new Map,this.je=fi(),this.Je=Ku(),this.He=Ku(),this.Ze=new ln(st)}Xe(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Ye(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const s=this.nt(n);switch(e.state){case 0:this.rt(n)&&s.Le(e.resumeToken);break;case 1:s.We(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.We(),s.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(s.Qe(),s.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),s.Le(e.resumeToken));break;default:we(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((s,a)=>{this.rt(a)&&n(a)})}st(e){const n=e.targetId,s=e.Ce.count,a=this.ot(n);if(a){const i=a.target;if(L0(i))if(s===0){const r=new be(i.path);this.et(n,r,as.newNoDocument(r,Ve.min()))}else bt(s===1,20013,{expectedCount:s});else{const r=this._t(n);if(r!==s){const o=this.ut(e),u=o?this.ct(o,e,r):1;if(u!==0){this.it(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(n,h)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:s="",padding:a=0},hashCount:i=0}=n;let r,o;try{r=cr(s).toUint8Array()}catch(u){if(u instanceof l2)return Zr("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{o=new xg(r,a,i)}catch(u){return Zr(u instanceof sc?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return o.ge===0?null:o}ct(e,n,s){return n.Ce.count===s-this.Pt(e,n.targetId)?0:2}Pt(e,n){const s=this.Ge.getRemoteKeysForTarget(n);let a=0;return s.forEach(i=>{const r=this.Ge.ht(),o=`projects/${r.projectId}/databases/${r.database}/documents/${i.path.canonicalString()}`;e.mightContain(o)||(this.et(n,i,null),a++)}),a}Tt(e){const n=new Map;this.ze.forEach((i,r)=>{const o=this.ot(r);if(o){if(i.current&&L0(o.target)){const u=new be(o.target.path);this.Et(u).has(r)||this.It(r,u)||this.et(r,u,as.newNoDocument(u,e))}i.Be&&(n.set(r,i.ke()),i.qe())}});let s=at();this.He.forEach((i,r)=>{let o=!0;r.forEachWhile(u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(o=!1,!1)}),o&&(s=s.add(i))}),this.je.forEach((i,r)=>r.setReadTime(e));const a=new id(e,n,this.Ze,this.je,s);return this.je=fi(),this.Je=Ku(),this.He=Ku(),this.Ze=new ln(st),a}Ye(e,n){if(!this.rt(e))return;const s=this.It(e,n.key)?2:0;this.nt(e).Ke(n.key,s),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.Et(n.key).add(e)),this.He=this.He.insert(n.key,this.Rt(n.key).add(e))}et(e,n,s){if(!this.rt(e))return;const a=this.nt(e);this.It(e,n)?a.Ke(n,1):a.Ue(n),this.He=this.He.insert(n,this.Rt(n).delete(e)),this.He=this.He.insert(n,this.Rt(n).add(e)),s&&(this.je=this.je.insert(n,s))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let n=this.ze.get(e);return n||(n=new u1,this.ze.set(e,n)),n}Rt(e){let n=this.He.get(e);return n||(n=new In(st),this.He=this.He.insert(e,n)),n}Et(e){let n=this.Je.get(e);return n||(n=new In(st),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||ce("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new u1),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}It(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function Ku(){return new ln(be.comparator)}function h1(){return new ln(be.comparator)}const vC=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),bC=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),xC=(()=>({and:"AND",or:"OR"}))();class _C{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function z0(t,e){return t.useProto3Json||Jf(e)?e:{value:e}}function mf(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function U2(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function TC(t,e){return mf(t,e.toTimestamp())}function ka(t){return bt(!!t,49232),Ve.fromTimestamp(function(n){const s=or(n);return new Kt(s.seconds,s.nanos)}(t))}function _g(t,e){return B0(t,e).canonicalString()}function B0(t,e){const n=function(a){return new $t(["projects",a.projectId,"databases",a.database])}(t).child("documents");return e===void 0?n:n.child(e)}function z2(t){const e=$t.fromString(t);return bt(H2(e),10190,{key:e.toString()}),e}function $0(t,e){return _g(t.databaseId,e.path)}function mm(t,e){const n=z2(e);if(n.get(1)!==t.databaseId.projectId)throw new le(H.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new le(H.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new be($2(n))}function B2(t,e){return _g(t.databaseId,e)}function EC(t){const e=z2(t);return e.length===4?$t.emptyPath():$2(e)}function F0(t){return new $t(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function $2(t){return bt(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function f1(t,e,n){return{name:$0(t,e),fields:n.value.mapValue.fields}}function SC(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:we(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),a=e.targetChange.targetIds||[],i=function(h,d){return h.useProto3Json?(bt(d===void 0||typeof d=="string",58123),Qn.fromBase64String(d||"")):(bt(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Qn.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),r=e.targetChange.cause,o=r&&function(h){const d=h.code===void 0?H.UNKNOWN:V2(h.code);return new le(d,h.message||"")}(r);n=new L2(s,a,i,o||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const a=mm(t,s.document.name),i=ka(s.document.updateTime),r=s.document.createTime?ka(s.document.createTime):Ve.min(),o=new _s({mapValue:{fields:s.document.fields}}),u=as.newFoundDocument(a,i,r,o),h=s.targetIds||[],d=s.removedTargetIds||[];n=new vh(h,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const a=mm(t,s.document),i=s.readTime?ka(s.readTime):Ve.min(),r=as.newNoDocument(a,i),o=s.removedTargetIds||[];n=new vh([],o,r.key,r)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const a=mm(t,s.document),i=s.removedTargetIds||[];n=new vh([],i,a,null)}else{if(!("filter"in e))return we(11601,{Vt:e});{e.filter;const s=e.filter;s.targetId;const{count:a=0,unchangedNames:i}=s,r=new dC(a,i),o=s.targetId;n=new P2(o,r)}}return n}function wC(t,e){let n;if(e instanceof du)n={update:f1(t,e.key,e.value)};else if(e instanceof O2)n={delete:$0(t,e.key)};else if(e instanceof yr)n={update:f1(t,e.key,e.data),updateMask:jC(e.fieldMask)};else{if(!(e instanceof uC))return we(16599,{dt:e.type});n={verify:$0(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(i,r){const o=r.transform;if(o instanceof ff)return{fieldPath:r.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof ho)return{fieldPath:r.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof Yc)return{fieldPath:r.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof df)return{fieldPath:r.field.canonicalString(),increment:o.Ae};throw we(20930,{transform:r.transform})}(0,s))),e.precondition.isNone||(n.currentDocument=function(a,i){return i.updateTime!==void 0?{updateTime:TC(a,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:we(27497)}(t,e.precondition)),n}function AC(t,e){return t&&t.length>0?(bt(e!==void 0,14353),t.map(n=>function(a,i){let r=a.updateTime?ka(a.updateTime):ka(i);return r.isEqual(Ve.min())&&(r=ka(i)),new lC(r,a.transformResults||[])}(n,e))):[]}function NC(t,e){return{documents:[B2(t,e.path)]}}function RC(t,e){const n={structuredQuery:{}},s=e.path;let a;e.collectionGroup!==null?(a=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(a=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=B2(t,a);const i=function(h){if(h.length!==0)return q2(pa.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const r=function(h){if(h.length!==0)return h.map(d=>function(g){return{field:_l(g.field),direction:IC(g.dir)}}(d))}(e.orderBy);r&&(n.structuredQuery.orderBy=r);const o=z0(t,e.limit);return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:n,parent:a}}function CC(t){let e=EC(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let a=null;if(s>0){bt(s===1,65062);const d=n.from[0];d.allDescendants?a=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const g=F2(p);return g instanceof pa&&v2(g)?g.getFilters():[g]}(n.where));let r=[];n.orderBy&&(r=function(p){return p.map(g=>function(R){return new uf(Tl(R.field),function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(g))}(n.orderBy));let o=null;n.limit&&(o=function(p){let g;return g=typeof p=="object"?p.value:p,Jf(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(p){const g=!!p.before,y=p.values||[];return new cf(y,g)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const g=!p.before,y=p.values||[];return new cf(y,g)}(n.endAt)),GR(e,a,r,i,o,"F",u,h)}function kC(t,e){const n=function(a){switch(a){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return we(28987,{purpose:a})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function F2(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const s=Tl(n.unaryFilter.field);return Sn.create(s,"==",{doubleValue:NaN});case"IS_NULL":const a=Tl(n.unaryFilter.field);return Sn.create(a,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Tl(n.unaryFilter.field);return Sn.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=Tl(n.unaryFilter.field);return Sn.create(r,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return we(61313);default:return we(60726)}}(t):t.fieldFilter!==void 0?function(n){return Sn.create(Tl(n.fieldFilter.field),function(a){switch(a){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return we(58110);default:return we(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return pa.create(n.compositeFilter.filters.map(s=>F2(s)),function(a){switch(a){case"AND":return"and";case"OR":return"or";default:return we(1026)}}(n.compositeFilter.op))}(t):we(30097,{filter:t})}function IC(t){return vC[t]}function MC(t){return bC[t]}function DC(t){return xC[t]}function _l(t){return{fieldPath:t.canonicalString()}}function Tl(t){return Hn.fromServerFormat(t.fieldPath)}function q2(t){return t instanceof Sn?function(n){if(n.op==="=="){if(Zv(n.value))return{unaryFilter:{field:_l(n.field),op:"IS_NAN"}};if(Jv(n.value))return{unaryFilter:{field:_l(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Zv(n.value))return{unaryFilter:{field:_l(n.field),op:"IS_NOT_NAN"}};if(Jv(n.value))return{unaryFilter:{field:_l(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_l(n.field),op:MC(n.op),value:n.value}}}(t):t instanceof pa?function(n){const s=n.getFilters().map(a=>q2(a));return s.length===1?s[0]:{compositeFilter:{op:DC(n.op),filters:s}}}(t):we(54877,{filter:t})}function jC(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function H2(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}function G2(t){return!!t&&typeof t._toProto=="function"&&t._protoValueType==="ProtoValue"}/**
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
 */class zi{constructor(e,n,s,a,i=Ve.min(),r=Ve.min(),o=Qn.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=a,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=o,this.expectedCount=u}withSequenceNumber(e){return new zi(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new zi(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new zi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new zi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class OC{constructor(e){this.yt=e}}function VC(t){const e=CC({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?hf(e,e.limit,"L"):e}/**
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
 */class PC{constructor(){this.bn=new LC}addToCollectionParentIndex(e,n){return this.bn.add(n),Q.resolve()}getCollectionParents(e,n){return Q.resolve(this.bn.getEntries(n))}addFieldIndex(e,n){return Q.resolve()}deleteFieldIndex(e,n){return Q.resolve()}deleteAllFieldIndexes(e){return Q.resolve()}createTargetIndexes(e,n){return Q.resolve()}getDocumentsMatchingTarget(e,n){return Q.resolve(null)}getIndexType(e,n){return Q.resolve(0)}getFieldIndexes(e,n){return Q.resolve([])}getNextCollectionGroupToUpdate(e){return Q.resolve(null)}getMinOffset(e,n){return Q.resolve(lr.min())}getMinOffsetFromCollectionGroup(e,n){return Q.resolve(lr.min())}updateCollectionGroup(e,n,s){return Q.resolve()}updateIndexEntries(e,n){return Q.resolve()}}class LC{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),a=this.index[n]||new In($t.comparator),i=!a.has(s);return this.index[n]=a.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),a=this.index[n];return a&&a.has(s)}getEntries(e){return(this.index[e]||new In($t.comparator)).toArray()}}/**
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
 */const d1={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Y2=41943040;class xs{static withCacheSize(e){return new xs(e,xs.DEFAULT_COLLECTION_PERCENTILE,xs.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=s}}/**
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
 */xs.DEFAULT_COLLECTION_PERCENTILE=10,xs.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,xs.DEFAULT=new xs(Y2,xs.DEFAULT_COLLECTION_PERCENTILE,xs.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),xs.DISABLED=new xs(-1,0,0);/**
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
 */class fo{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new fo(0)}static ar(){return new fo(-1)}}/**
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
 */const m1="LruGarbageCollector",UC=1048576;function p1([t,e],[n,s]){const a=st(t,n);return a===0?st(e,s):a}class zC{constructor(e){this.Pr=e,this.buffer=new In(p1),this.Tr=0}Er(){return++this.Tr}Ir(e){const n=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(n);else{const s=this.buffer.last();p1(n,s)<0&&(this.buffer=this.buffer.delete(s).add(n))}}get maxValue(){return this.buffer.last()[0]}}class BC{constructor(e,n,s){this.garbageCollector=e,this.asyncQueue=n,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){ce(m1,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Co(n)?ce(m1,"Ignoring IndexedDB error during garbage collection: ",n):await Ro(n)}await this.Ar(3e5)})}}class $C{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.dr(e).next(s=>Math.floor(n/100*s))}nthSequenceNumber(e,n){if(n===0)return Q.resolve(Wf.ce);const s=new zC(n);return this.Vr.forEachTarget(e,a=>s.Ir(a.sequenceNumber)).next(()=>this.Vr.mr(e,a=>s.Ir(a))).next(()=>s.maxValue)}removeTargets(e,n,s){return this.Vr.removeTargets(e,n,s)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(ce("LruGarbageCollector","Garbage collection skipped; disabled"),Q.resolve(d1)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?(ce("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),d1):this.gr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,n){let s,a,i,r,o,u,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(ce("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),a=this.params.maximumSequenceNumbersToCollect):a=p,r=Date.now(),this.nthSequenceNumber(e,a))).next(p=>(s=p,o=Date.now(),this.removeTargets(e,s,n))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,s))).next(p=>(h=Date.now(),bl()<=nt.DEBUG&&ce("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${r-d}ms
	Determined least recently used ${a} in `+(o-r)+`ms
	Removed ${i} targets in `+(u-o)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-d}ms`),Q.resolve({didRun:!0,sequenceNumbersCollected:a,targetsRemoved:i,documentsRemoved:p})))}}function FC(t,e){return new $C(t,e)}/**
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
 */class qC{constructor(){this.changes=new ol(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,as.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?Q.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class GC{constructor(e,n,s,a){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=a}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(a=>(s=a,this.remoteDocumentCache.getEntry(e,n))).next(a=>(s!==null&&Ec(s.mutation,a,js.empty(),Kt.now()),a))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,at()).next(()=>s))}getLocalViewOfDocuments(e,n,s=at()){const a=Pr();return this.populateOverlays(e,a,n).next(()=>this.computeViews(e,n,a,s).next(i=>{let r=nc();return i.forEach((o,u)=>{r=r.insert(o,u.overlayedDocument)}),r}))}getOverlayedDocuments(e,n){const s=Pr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,at()))}populateOverlays(e,n,s){const a=[];return s.forEach(i=>{n.has(i)||a.push(i)}),this.documentOverlayCache.getOverlays(e,a).next(i=>{i.forEach((r,o)=>{n.set(r,o)})})}computeViews(e,n,s,a){let i=fi();const r=Tc(),o=function(){return Tc()}();return n.forEach((u,h)=>{const d=s.get(h.key);a.has(h.key)&&(d===void 0||d.mutation instanceof yr)?i=i.insert(h.key,h):d!==void 0?(r.set(h.key,d.mutation.getFieldMask()),Ec(d.mutation,h,d.mutation.getFieldMask(),Kt.now())):r.set(h.key,js.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,d)=>r.set(h,d)),n.forEach((h,d)=>o.set(h,new HC(d,r.get(h)??null))),o))}recalculateAndSaveOverlays(e,n){const s=Tc();let a=new ln((r,o)=>r-o),i=at();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(r=>{for(const o of r)o.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let d=s.get(u)||js.empty();d=o.applyToLocalView(h,d),s.set(u,d);const p=(a.get(o.batchId)||at()).add(u);a=a.insert(o.batchId,p)})}).next(()=>{const r=[],o=a.getReverseIterator();for(;o.hasNext();){const u=o.getNext(),h=u.key,d=u.value,p=N2();d.forEach(g=>{if(!i.has(g)){const y=D2(n.get(g),s.get(g));y!==null&&p.set(g,y),i=i.add(g)}}),r.push(this.documentOverlayCache.saveOverlays(e,h,p))}return Q.waitFor(r)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s,a){return YR(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):T2(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s,a):this.getDocumentsMatchingCollectionQuery(e,n,s,a)}getNextDocuments(e,n,s,a){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,a).next(i=>{const r=a-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,a-i.size):Q.resolve(Pr());let o=Fc,u=i;return r.next(h=>Q.forEach(h,(d,p)=>(o<p.largestBatchId&&(o=p.largestBatchId),i.get(d)?Q.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{u=u.insert(d,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,at())).next(d=>({batchId:o,changes:A2(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new be(n)).next(s=>{let a=nc();return s.isFoundDocument()&&(a=a.insert(s.key,s)),a})}getDocumentsMatchingCollectionGroupQuery(e,n,s,a){const i=n.collectionGroup;let r=nc();return this.indexManager.getCollectionParents(e,i).next(o=>Q.forEach(o,u=>{const h=function(p,g){return new fu(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,s,a).next(d=>{d.forEach((p,g)=>{r=r.insert(p,g)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(e,n,s,a){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(r=>(i=r,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,i,a))).next(r=>{i.forEach((u,h)=>{const d=h.getKey();r.get(d)===null&&(r=r.insert(d,as.newInvalidDocument(d)))});let o=nc();return r.forEach((u,h)=>{const d=i.get(u);d!==void 0&&Ec(d.mutation,h,js.empty(),Kt.now()),nd(n,h)&&(o=o.insert(u,h))}),o})}}/**
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
 */class YC{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,n){return Q.resolve(this.Nr.get(n))}saveBundleMetadata(e,n){return this.Nr.set(n.id,function(a){return{id:a.id,version:a.version,createTime:ka(a.createTime)}}(n)),Q.resolve()}getNamedQuery(e,n){return Q.resolve(this.Br.get(n))}saveNamedQuery(e,n){return this.Br.set(n.name,function(a){return{name:a.name,query:VC(a.bundledQuery),readTime:ka(a.readTime)}}(n)),Q.resolve()}}/**
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
 */class KC{constructor(){this.overlays=new ln(be.comparator),this.Lr=new Map}getOverlay(e,n){return Q.resolve(this.overlays.get(n))}getOverlays(e,n){const s=Pr();return Q.forEach(n,a=>this.getOverlay(e,a).next(i=>{i!==null&&s.set(a,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((a,i)=>{this.St(e,n,i)}),Q.resolve()}removeOverlaysForBatchId(e,n,s){const a=this.Lr.get(s);return a!==void 0&&(a.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(s)),Q.resolve()}getOverlaysForCollection(e,n,s){const a=Pr(),i=n.length+1,r=new be(n.child("")),o=this.overlays.getIteratorFrom(r);for(;o.hasNext();){const u=o.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>s&&a.set(u.getKey(),u)}return Q.resolve(a)}getOverlaysForCollectionGroup(e,n,s,a){let i=new ln((h,d)=>h-d);const r=this.overlays.getIterator();for(;r.hasNext();){const h=r.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>s){let d=i.get(h.largestBatchId);d===null&&(d=Pr(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const o=Pr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,d)=>o.set(h,d)),!(o.size()>=a)););return Q.resolve(o)}St(e,n,s){const a=this.overlays.get(s.key);if(a!==null){const r=this.Lr.get(a.largestBatchId).delete(s.key);this.Lr.set(a.largestBatchId,r)}this.overlays=this.overlays.insert(s.key,new fC(n,s));let i=this.Lr.get(n);i===void 0&&(i=at(),this.Lr.set(n,i)),this.Lr.set(n,i.add(s.key))}}/**
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
 */class QC{constructor(){this.sessionToken=Qn.EMPTY_BYTE_STRING}getSessionToken(e){return Q.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,Q.resolve()}}/**
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
 */class Tg{constructor(){this.kr=new In(Vn.qr),this.Kr=new In(Vn.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,n){const s=new Vn(e,n);this.kr=this.kr.add(s),this.Kr=this.Kr.add(s)}$r(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.Wr(new Vn(e,n))}Qr(e,n){e.forEach(s=>this.removeReference(s,n))}Gr(e){const n=new be(new $t([])),s=new Vn(n,e),a=new Vn(n,e+1),i=[];return this.Kr.forEachInRange([s,a],r=>{this.Wr(r),i.push(r.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const n=new be(new $t([])),s=new Vn(n,e),a=new Vn(n,e+1);let i=at();return this.Kr.forEachInRange([s,a],r=>{i=i.add(r.key)}),i}containsKey(e){const n=new Vn(e,0),s=this.kr.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class Vn{constructor(e,n){this.key=e,this.Jr=n}static qr(e,n){return be.comparator(e.key,n.key)||st(e.Jr,n.Jr)}static Ur(e,n){return st(e.Jr,n.Jr)||be.comparator(e.key,n.key)}}/**
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
 */class XC{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Yn=1,this.Hr=new In(Vn.qr)}checkEmpty(e){return Q.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,a){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new hC(i,n,s,a);this.mutationQueue.push(r);for(const o of a)this.Hr=this.Hr.add(new Vn(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return Q.resolve(r)}lookupMutationBatch(e,n){return Q.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,a=this.Xr(s),i=a<0?0:a;return Q.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return Q.resolve(this.mutationQueue.length===0?dg:this.Yn-1)}getAllMutationBatches(e){return Q.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new Vn(n,0),a=new Vn(n,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([s,a],r=>{const o=this.Zr(r.Jr);i.push(o)}),Q.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new In(st);return n.forEach(a=>{const i=new Vn(a,0),r=new Vn(a,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,r],o=>{s=s.add(o.Jr)})}),Q.resolve(this.Yr(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,a=s.length+1;let i=s;be.isDocumentKey(i)||(i=i.child(""));const r=new Vn(new be(i),0);let o=new In(st);return this.Hr.forEachWhile(u=>{const h=u.key.path;return!!s.isPrefixOf(h)&&(h.length===a&&(o=o.add(u.Jr)),!0)},r),Q.resolve(this.Yr(o))}Yr(e){const n=[];return e.forEach(s=>{const a=this.Zr(s);a!==null&&n.push(a)}),n}removeMutationBatch(e,n){bt(this.ei(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Hr;return Q.forEach(n.mutations,a=>{const i=new Vn(a.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,a.key)}).next(()=>{this.Hr=s})}nr(e){}containsKey(e,n){const s=new Vn(n,0),a=this.Hr.firstAfterOrEqual(s);return Q.resolve(n.isEqual(a&&a.key))}performConsistencyCheck(e){return this.mutationQueue.length,Q.resolve()}ei(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class WC{constructor(e){this.ti=e,this.docs=function(){return new ln(be.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,a=this.docs.get(s),i=a?a.size:0,r=this.ti(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:r}),this.size+=r-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return Q.resolve(s?s.document.mutableCopy():as.newInvalidDocument(n))}getEntries(e,n){let s=fi();return n.forEach(a=>{const i=this.docs.get(a);s=s.insert(a,i?i.document.mutableCopy():as.newInvalidDocument(a))}),Q.resolve(s)}getDocumentsMatchingQuery(e,n,s,a){let i=fi();const r=n.path,o=new be(r.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(o);for(;u.hasNext();){const{key:h,value:{document:d}}=u.getNext();if(!r.isPrefixOf(h.path))break;h.path.length>r.length+1||SR(ER(d),s)<=0||(a.has(d.key)||nd(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return Q.resolve(i)}getAllFromCollectionGroup(e,n,s,a){we(9500)}ni(e,n){return Q.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new JC(this)}getSize(e){return Q.resolve(this.size)}}class JC extends qC{constructor(e){super(),this.Mr=e}applyChanges(e){const n=[];return this.changes.forEach((s,a)=>{a.isValidDocument()?n.push(this.Mr.addEntry(e,a)):this.Mr.removeEntry(s)}),Q.waitFor(n)}getFromCache(e,n){return this.Mr.getEntry(e,n)}getAllFromCache(e,n){return this.Mr.getEntries(e,n)}}/**
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
 */class ZC{constructor(e){this.persistence=e,this.ri=new ol(n=>gg(n),yg),this.lastRemoteSnapshotVersion=Ve.min(),this.highestTargetId=0,this.ii=0,this.si=new Tg,this.targetCount=0,this.oi=fo._r()}forEachTarget(e,n){return this.ri.forEach((s,a)=>n(a)),Q.resolve()}getLastRemoteSnapshotVersion(e){return Q.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Q.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),Q.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.ii&&(this.ii=n),Q.resolve()}lr(e){this.ri.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.oi=new fo(n),this.highestTargetId=n),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,n){return this.lr(n),this.targetCount+=1,Q.resolve()}updateTargetData(e,n){return this.lr(n),Q.resolve()}removeTargetData(e,n){return this.ri.delete(n.target),this.si.Gr(n.targetId),this.targetCount-=1,Q.resolve()}removeTargets(e,n,s){let a=0;const i=[];return this.ri.forEach((r,o)=>{o.sequenceNumber<=n&&s.get(o.targetId)===null&&(this.ri.delete(r),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),a++)}),Q.waitFor(i).next(()=>a)}getTargetCount(e){return Q.resolve(this.targetCount)}getTargetData(e,n){const s=this.ri.get(n)||null;return Q.resolve(s)}addMatchingKeys(e,n,s){return this.si.$r(n,s),Q.resolve()}removeMatchingKeys(e,n,s){this.si.Qr(n,s);const a=this.persistence.referenceDelegate,i=[];return a&&n.forEach(r=>{i.push(a.markPotentiallyOrphaned(e,r))}),Q.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.si.Gr(n),Q.resolve()}getMatchingKeysForTargetId(e,n){const s=this.si.jr(n);return Q.resolve(s)}containsKey(e,n){return Q.resolve(this.si.containsKey(n))}}/**
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
 */class K2{constructor(e,n){this._i={},this.overlays={},this.ai=new Wf(0),this.ui=!1,this.ui=!0,this.ci=new QC,this.referenceDelegate=e(this),this.li=new ZC(this),this.indexManager=new PC,this.remoteDocumentCache=function(a){return new WC(a)}(s=>this.referenceDelegate.hi(s)),this.serializer=new OC(n),this.Pi=new YC(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new KC,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this._i[e.toKey()];return s||(s=new XC(n,this.referenceDelegate),this._i[e.toKey()]=s),s}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,n,s){ce("MemoryPersistence","Starting transaction:",e);const a=new e4(this.ai.next());return this.referenceDelegate.Ti(),s(a).next(i=>this.referenceDelegate.Ei(a).next(()=>i)).toPromise().then(i=>(a.raiseOnCommittedEvent(),i))}Ii(e,n){return Q.or(Object.values(this._i).map(s=>()=>s.containsKey(e,n)))}}class e4 extends AR{constructor(e){super(),this.currentSequenceNumber=e}}class Eg{constructor(e){this.persistence=e,this.Ri=new Tg,this.Ai=null}static Vi(e){return new Eg(e)}get di(){if(this.Ai)return this.Ai;throw we(60996)}addReference(e,n,s){return this.Ri.addReference(s,n),this.di.delete(s.toString()),Q.resolve()}removeReference(e,n,s){return this.Ri.removeReference(s,n),this.di.add(s.toString()),Q.resolve()}markPotentiallyOrphaned(e,n){return this.di.add(n.toString()),Q.resolve()}removeTarget(e,n){this.Ri.Gr(n.targetId).forEach(a=>this.di.add(a.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(a=>{a.forEach(i=>this.di.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}Ti(){this.Ai=new Set}Ei(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Q.forEach(this.di,s=>{const a=be.fromPath(s);return this.mi(e,a).next(i=>{i||n.removeEntry(a,Ve.min())})}).next(()=>(this.Ai=null,n.apply(e)))}updateLimboDocument(e,n){return this.mi(e,n).next(s=>{s?this.di.delete(n.toString()):this.di.add(n.toString())})}hi(e){return 0}mi(e,n){return Q.or([()=>Q.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ii(e,n)])}}class pf{constructor(e,n){this.persistence=e,this.fi=new ol(s=>CR(s.path),(s,a)=>s.isEqual(a)),this.garbageCollector=FC(this,n)}static Vi(e,n){return new pf(e,n)}Ti(){}Ei(e){return Q.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}dr(e){const n=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>n.next(a=>s+a))}pr(e){let n=0;return this.mr(e,s=>{n++}).next(()=>n)}mr(e,n){return Q.forEach(this.fi,(s,a)=>this.wr(e,s,a).next(i=>i?Q.resolve():n(a)))}removeTargets(e,n,s){return this.persistence.getTargetCache().removeTargets(e,n,s)}removeOrphanedDocuments(e,n){let s=0;const a=this.persistence.getRemoteDocumentCache(),i=a.newChangeBuffer();return a.ni(e,r=>this.wr(e,r,n).next(o=>{o||(s++,i.removeEntry(r,Ve.min()))})).next(()=>i.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,n){return this.fi.set(n,e.currentSequenceNumber),Q.resolve()}removeTarget(e,n){const s=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,n,s){return this.fi.set(s,e.currentSequenceNumber),Q.resolve()}removeReference(e,n,s){return this.fi.set(s,e.currentSequenceNumber),Q.resolve()}updateLimboDocument(e,n){return this.fi.set(n,e.currentSequenceNumber),Q.resolve()}hi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=ph(e.data.value)),n}wr(e,n,s){return Q.or([()=>this.persistence.Ii(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const a=this.fi.get(n);return Q.resolve(a!==void 0&&a>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Sg{constructor(e,n,s,a){this.targetId=e,this.fromCache=n,this.Ts=s,this.Es=a}static Is(e,n){let s=at(),a=at();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:a=a.add(i.doc.key)}return new Sg(e,n.fromCache,s,a)}}/**
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
 */class t4{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class n4{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return F5()?8:NR(is())>0?6:4}()}initialize(e,n){this.fs=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,s,a){const i={result:null};return this.gs(e,n).next(r=>{i.result=r}).next(()=>{if(!i.result)return this.ps(e,n,a,s).next(r=>{i.result=r})}).next(()=>{if(i.result)return;const r=new t4;return this.ys(e,n,r).next(o=>{if(i.result=o,this.As)return this.ws(e,n,r,o.size)})}).next(()=>i.result)}ws(e,n,s,a){return s.documentReadCount<this.Vs?(bl()<=nt.DEBUG&&ce("QueryEngine","SDK will not create cache indexes for query:",xl(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),Q.resolve()):(bl()<=nt.DEBUG&&ce("QueryEngine","Query:",xl(n),"scans",s.documentReadCount,"local documents and returns",a,"documents as results."),s.documentReadCount>this.ds*a?(bl()<=nt.DEBUG&&ce("QueryEngine","The SDK decides to create cache indexes for query:",xl(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ra(n))):Q.resolve())}gs(e,n){if(s1(n))return Q.resolve(null);let s=Ra(n);return this.indexManager.getIndexType(e,s).next(a=>a===0?null:(n.limit!==null&&a===1&&(n=hf(n,null,"F"),s=Ra(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const r=at(...i);return this.fs.getDocuments(e,r).next(o=>this.indexManager.getMinOffset(e,s).next(u=>{const h=this.Ss(n,o);return this.bs(n,h,r,u.readTime)?this.gs(e,hf(n,null,"F")):this.Ds(e,h,n,u)}))})))}ps(e,n,s,a){return s1(n)||a.isEqual(Ve.min())?Q.resolve(null):this.fs.getDocuments(e,s).next(i=>{const r=this.Ss(n,i);return this.bs(n,r,s,a)?Q.resolve(null):(bl()<=nt.DEBUG&&ce("QueryEngine","Re-using previous result from %s to execute query: %s",a.toString(),xl(n)),this.Ds(e,r,n,TR(a,Fc)).next(o=>o))})}Ss(e,n){let s=new In(S2(e));return n.forEach((a,i)=>{nd(e,i)&&(s=s.add(i))}),s}bs(e,n,s,a){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(a)>0)}ys(e,n,s){return bl()<=nt.DEBUG&&ce("QueryEngine","Using full collection scan to execute query:",xl(n)),this.fs.getDocumentsMatchingQuery(e,n,lr.min(),s)}Ds(e,n,s,a){return this.fs.getDocumentsMatchingQuery(e,s,a).next(i=>(n.forEach(r=>{i=i.insert(r.key,r)}),i))}}/**
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
 */const wg="LocalStore",s4=3e8;class a4{constructor(e,n,s,a){this.persistence=e,this.Cs=n,this.serializer=a,this.vs=new ln(st),this.Fs=new ol(i=>gg(i),yg),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(s)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new GC(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.vs))}}function i4(t,e,n,s){return new a4(t,e,n,s)}async function Q2(t,e){const n=Le(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let a;return n.mutationQueue.getAllMutationBatches(s).next(i=>(a=i,n.Os(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const r=[],o=[];let u=at();for(const h of a){r.push(h.batchId);for(const d of h.mutations)u=u.add(d.key)}for(const h of i){o.push(h.batchId);for(const d of h.mutations)u=u.add(d.key)}return n.localDocuments.getDocuments(s,u).next(h=>({Ns:h,removedBatchIds:r,addedBatchIds:o}))})})}function r4(t,e){const n=Le(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const a=e.batch.keys(),i=n.xs.newChangeBuffer({trackRemovals:!0});return function(o,u,h,d){const p=h.batch,g=p.keys();let y=Q.resolve();return g.forEach(R=>{y=y.next(()=>d.getEntry(u,R)).next(I=>{const O=h.docVersions.get(R);bt(O!==null,48541),I.version.compareTo(O)<0&&(p.applyToRemoteDocument(I,h),I.isValidDocument()&&(I.setReadTime(h.commitVersion),d.addEntry(I)))})}),y.next(()=>o.mutationQueue.removeMutationBatch(u,p))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,a,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(o){let u=at();for(let h=0;h<o.mutationResults.length;++h)o.mutationResults[h].transformResults.length>0&&(u=u.add(o.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(s,a))})}function X2(t){const e=Le(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.li.getLastRemoteSnapshotVersion(n))}function l4(t,e){const n=Le(t),s=e.snapshotVersion;let a=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const r=n.xs.newChangeBuffer({trackRemovals:!0});a=n.vs;const o=[];e.targetChanges.forEach((d,p)=>{const g=a.get(p);if(!g)return;o.push(n.li.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.li.addMatchingKeys(i,d.addedDocuments,p)));let y=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?y=y.withResumeToken(Qn.EMPTY_BYTE_STRING,Ve.min()).withLastLimboFreeSnapshotVersion(Ve.min()):d.resumeToken.approximateByteSize()>0&&(y=y.withResumeToken(d.resumeToken,s)),a=a.insert(p,y),function(I,O,x){return I.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-I.snapshotVersion.toMicroseconds()>=s4?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(g,y,d)&&o.push(n.li.updateTargetData(i,y))});let u=fi(),h=at();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),o.push(o4(i,r,e.documentUpdates).next(d=>{u=d.Bs,h=d.Ls})),!s.isEqual(Ve.min())){const d=n.li.getLastRemoteSnapshotVersion(i).next(p=>n.li.setTargetsMetadata(i,i.currentSequenceNumber,s));o.push(d)}return Q.waitFor(o).next(()=>r.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(n.vs=a,i))}function o4(t,e,n){let s=at(),a=at();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let r=fi();return n.forEach((o,u)=>{const h=i.get(o);u.isFoundDocument()!==h.isFoundDocument()&&(a=a.add(o)),u.isNoDocument()&&u.version.isEqual(Ve.min())?(e.removeEntry(o,u.readTime),r=r.insert(o,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),r=r.insert(o,u)):ce(wg,"Ignoring outdated watch update for ",o,". Current version:",h.version," Watch version:",u.version)}),{Bs:r,Ls:a}})}function c4(t,e){const n=Le(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=dg),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function u4(t,e){const n=Le(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let a;return n.li.getTargetData(s,e).next(i=>i?(a=i,Q.resolve(a)):n.li.allocateTargetId(s).next(r=>(a=new zi(e,r,"TargetPurposeListen",s.currentSequenceNumber),n.li.addTargetData(s,a).next(()=>a))))}).then(s=>{const a=n.vs.get(s.targetId);return(a===null||s.snapshotVersion.compareTo(a.snapshotVersion)>0)&&(n.vs=n.vs.insert(s.targetId,s),n.Fs.set(e,s.targetId)),s})}async function q0(t,e,n){const s=Le(t),a=s.vs.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,r=>s.persistence.referenceDelegate.removeTarget(r,a))}catch(r){if(!Co(r))throw r;ce(wg,`Failed to update sequence numbers for target ${e}: ${r}`)}s.vs=s.vs.remove(e),s.Fs.delete(a.target)}function g1(t,e,n){const s=Le(t);let a=Ve.min(),i=at();return s.persistence.runTransaction("Execute query","readwrite",r=>function(u,h,d){const p=Le(u),g=p.Fs.get(d);return g!==void 0?Q.resolve(p.vs.get(g)):p.li.getTargetData(h,d)}(s,r,Ra(e)).next(o=>{if(o)return a=o.lastLimboFreeSnapshotVersion,s.li.getMatchingKeysForTargetId(r,o.targetId).next(u=>{i=u})}).next(()=>s.Cs.getDocumentsMatchingQuery(r,e,n?a:Ve.min(),n?i:at())).next(o=>(h4(s,QR(e),o),{documents:o,ks:i})))}function h4(t,e,n){let s=t.Ms.get(e)||Ve.min();n.forEach((a,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Ms.set(e,s)}class y1{constructor(){this.activeTargetIds=tC()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class f4{constructor(){this.vo=new y1,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e,n=!0){return n&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,n,s){this.Fo[e]=n}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new y1,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class d4{Mo(e){}shutdown(){}}/**
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
 */const v1="ConnectivityMonitor";class b1{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){ce(v1,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){ce(v1,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Qu=null;function H0(){return Qu===null?Qu=function(){return 268435456+Math.round(2147483648*Math.random())}():Qu++,"0x"+Qu.toString(16)}/**
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
 */const pm="RestConnection",m4={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class p4{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),a=encodeURIComponent(this.databaseId.database);this.Ko=n+"://"+e.host,this.Uo=`projects/${s}/databases/${a}`,this.$o=this.databaseId.database===lf?`project_id=${s}`:`project_id=${s}&database_id=${a}`}Wo(e,n,s,a,i){const r=H0(),o=this.Qo(e,n.toUriEncodedString());ce(pm,`Sending RPC '${e}' ${r}:`,o,s);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,a,i);const{host:h}=new URL(o),d=uu(h);return this.zo(e,o,u,s,d).then(p=>(ce(pm,`Received RPC '${e}' ${r}: `,p),p),p=>{throw Zr(pm,`RPC '${e}' ${r} failed with error: `,p,"url: ",o,"request:",s),p})}jo(e,n,s,a,i,r){return this.Wo(e,n,s,a,i)}Go(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+No}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((a,i)=>e[i]=a),s&&s.headers.forEach((a,i)=>e[i]=a)}Qo(e,n){const s=m4[e];let a=`${this.Ko}/v1/${n}:${s}`;return this.databaseInfo.apiKey&&(a=`${a}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),a}terminate(){}}/**
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
 */class g4{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const ts="WebChannelConnection",Yo=(t,e,n)=>{t.listen(e,s=>{try{n(s)}catch(a){setTimeout(()=>{throw a},0)}})};class Hl extends p4{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Hl.c_){const e=ZT();Yo(e,JT.STAT_EVENT,n=>{n.stat===D0.PROXY?ce(ts,"STAT_EVENT: detected buffering proxy"):n.stat===D0.NOPROXY&&ce(ts,"STAT_EVENT: detected no buffering proxy")}),Hl.c_=!0}}zo(e,n,s,a,i){const r=H0();return new Promise((o,u)=>{const h=new XT;h.setWithCredentials(!0),h.listenOnce(WT.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case mh.NO_ERROR:const p=h.getResponseJson();ce(ts,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(p)),o(p);break;case mh.TIMEOUT:ce(ts,`RPC '${e}' ${r} timed out`),u(new le(H.DEADLINE_EXCEEDED,"Request time out"));break;case mh.HTTP_ERROR:const g=h.getStatus();if(ce(ts,`RPC '${e}' ${r} failed with status:`,g,"response text:",h.getResponseText()),g>0){let y=h.getResponseJson();Array.isArray(y)&&(y=y[0]);const R=y==null?void 0:y.error;if(R&&R.status&&R.message){const I=function(x){const b=x.toLowerCase().replace(/_/g,"-");return Object.values(H).indexOf(b)>=0?b:H.UNKNOWN}(R.status);u(new le(I,R.message))}else u(new le(H.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new le(H.UNAVAILABLE,"Connection failed."));break;default:we(9055,{l_:e,streamId:r,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{ce(ts,`RPC '${e}' ${r} completed.`)}});const d=JSON.stringify(a);ce(ts,`RPC '${e}' ${r} sending request:`,a),h.send(n,"POST",d,s,15)})}T_(e,n,s){const a=H0(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],r=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(o.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Go(o.initMessageHeaders,n,s),o.encodeInitMessageHeaders=!0;const h=i.join("");ce(ts,`Creating RPC '${e}' stream ${a}: ${h}`,o);const d=r.createWebChannel(h,o);this.E_(d);let p=!1,g=!1;const y=new g4({Jo:R=>{g?ce(ts,`Not sending because RPC '${e}' stream ${a} is closed:`,R):(p||(ce(ts,`Opening RPC '${e}' stream ${a} transport.`),d.open(),p=!0),ce(ts,`RPC '${e}' stream ${a} sending:`,R),d.send(R))},Ho:()=>d.close()});return Yo(d,tc.EventType.OPEN,()=>{g||(ce(ts,`RPC '${e}' stream ${a} transport opened.`),y.i_())}),Yo(d,tc.EventType.CLOSE,()=>{g||(g=!0,ce(ts,`RPC '${e}' stream ${a} transport closed`),y.o_(),this.I_(d))}),Yo(d,tc.EventType.ERROR,R=>{g||(g=!0,Zr(ts,`RPC '${e}' stream ${a} transport errored. Name:`,R.name,"Message:",R.message),y.o_(new le(H.UNAVAILABLE,"The operation could not be completed")))}),Yo(d,tc.EventType.MESSAGE,R=>{var I;if(!g){const O=R.data[0];bt(!!O,16349);const x=O,b=(x==null?void 0:x.error)||((I=x[0])==null?void 0:I.error);if(b){ce(ts,`RPC '${e}' stream ${a} received error:`,b);const N=b.status;let V=function(S){const _=bn[S];if(_!==void 0)return V2(_)}(N),U=b.message;N==="NOT_FOUND"&&U.includes("database")&&U.includes("does not exist")&&U.includes(this.databaseId.database)&&Zr(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),V===void 0&&(V=H.INTERNAL,U="Unknown error status: "+N+" with message "+b.message),g=!0,y.o_(new le(V,U)),d.close()}else ce(ts,`RPC '${e}' stream ${a} received:`,O),y.__(O)}}),Hl.u_(),setTimeout(()=>{y.s_()},0),y}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(n=>n===e)}Go(e,n,s){super.Go(e,n,s),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return e2()}}/**
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
 */function y4(t){return new Hl(t)}function gm(){return typeof document<"u"?document:null}/**
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
 */function rd(t){return new _C(t,!0)}/**
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
 */Hl.c_=!1;class W2{constructor(e,n,s=1e3,a=1.5,i=6e4){this.Ci=e,this.timerId=n,this.R_=s,this.A_=a,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const n=Math.floor(this.d_+this.y_()),s=Math.max(0,Date.now()-this.f_),a=Math.max(0,n-s);a>0&&ce("ExponentialBackoff",`Backing off for ${a} ms (base delay: ${this.d_} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,a,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const x1="PersistentStream";class J2{constructor(e,n,s,a,i,r,o,u){this.Ci=e,this.S_=s,this.b_=a,this.connection=i,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=o,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new W2(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===H.RESOURCE_EXHAUSTED?(hi(n.toString()),hi("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===H.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(n)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,a])=>{this.D_===n&&this.G_(s,a)},s=>{e(()=>{const a=new le(H.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(a)})})}G_(e,n){const s=this.Q_(this.D_);this.stream=this.j_(e,n),this.stream.Zo(()=>{s(()=>this.listener.Zo())}),this.stream.Yo(()=>{s(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(a=>{s(()=>this.z_(a))}),this.stream.onMessage(a=>{s(()=>++this.F_==1?this.J_(a):this.onNext(a))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return ce(x1,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return n=>{this.Ci.enqueueAndForget(()=>this.D_===e?n():(ce(x1,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class v4 extends J2{constructor(e,n,s,a,i,r){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,a,r),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=SC(this.serializer,e),s=function(i){if(!("targetChange"in i))return Ve.min();const r=i.targetChange;return r.targetIds&&r.targetIds.length?Ve.min():r.readTime?ka(r.readTime):Ve.min()}(e);return this.listener.H_(n,s)}Z_(e){const n={};n.database=F0(this.serializer),n.addTarget=function(i,r){let o;const u=r.target;if(o=L0(u)?{documents:NC(i,u)}:{query:RC(i,u).ft},o.targetId=r.targetId,r.resumeToken.approximateByteSize()>0){o.resumeToken=U2(i,r.resumeToken);const h=z0(i,r.expectedCount);h!==null&&(o.expectedCount=h)}else if(r.snapshotVersion.compareTo(Ve.min())>0){o.readTime=mf(i,r.snapshotVersion.toTimestamp());const h=z0(i,r.expectedCount);h!==null&&(o.expectedCount=h)}return o}(this.serializer,e);const s=kC(this.serializer,e);s&&(n.labels=s),this.q_(n)}X_(e){const n={};n.database=F0(this.serializer),n.removeTarget=e,this.q_(n)}}class b4 extends J2{constructor(e,n,s,a,i,r){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,a,r),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return bt(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,bt(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){bt(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=AC(e.writeResults,e.commitTime),s=ka(e.commitTime);return this.listener.na(s,n)}ra(){const e={};e.database=F0(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>wC(this.serializer,s))};this.q_(n)}}/**
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
 */class x4{}class _4 extends x4{constructor(e,n,s,a){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=a,this.ia=!1}sa(){if(this.ia)throw new le(H.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,s,a){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,r])=>this.connection.Wo(e,B0(n,s),a,i,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===H.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new le(H.UNKNOWN,i.toString())})}jo(e,n,s,a,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.jo(e,B0(n,s),a,r,o,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===H.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new le(H.UNKNOWN,r.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function T4(t,e,n,s){return new _4(t,e,n,s)}class E4{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(hi(n),this.aa=!1):ce("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const el="RemoteStore";class S4{constructor(e,n,s,a,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(r=>{s.enqueueAndForget(async()=>{cl(this)&&(ce(el,"Restarting streams for network reachability change."),await async function(u){const h=Le(u);h.Ia.add(4),await pu(h),h.Va.set("Unknown"),h.Ia.delete(4),await ld(h)}(this))})}),this.Va=new E4(s,a)}}async function ld(t){if(cl(t))for(const e of t.Ra)await e(!0)}async function pu(t){for(const e of t.Ra)await e(!1)}function Z2(t,e){const n=Le(t);n.Ea.has(e.targetId)||(n.Ea.set(e.targetId,e),Cg(n)?Rg(n):ko(n).O_()&&Ng(n,e))}function Ag(t,e){const n=Le(t),s=ko(n);n.Ea.delete(e),s.O_()&&eE(n,e),n.Ea.size===0&&(s.O_()?s.L_():cl(n)&&n.Va.set("Unknown"))}function Ng(t,e){if(t.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Ve.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}ko(t).Z_(e)}function eE(t,e){t.da.$e(e),ko(t).X_(e)}function Rg(t){t.da=new yC({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ea.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),ko(t).start(),t.Va.ua()}function Cg(t){return cl(t)&&!ko(t).x_()&&t.Ea.size>0}function cl(t){return Le(t).Ia.size===0}function tE(t){t.da=void 0}async function w4(t){t.Va.set("Online")}async function A4(t){t.Ea.forEach((e,n)=>{Ng(t,e)})}async function N4(t,e){tE(t),Cg(t)?(t.Va.ha(e),Rg(t)):t.Va.set("Unknown")}async function R4(t,e,n){if(t.Va.set("Online"),e instanceof L2&&e.state===2&&e.cause)try{await async function(a,i){const r=i.cause;for(const o of i.targetIds)a.Ea.has(o)&&(await a.remoteSyncer.rejectListen(o,r),a.Ea.delete(o),a.da.removeTarget(o))}(t,e)}catch(s){ce(el,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await gf(t,s)}else if(e instanceof vh?t.da.Xe(e):e instanceof P2?t.da.st(e):t.da.tt(e),!n.isEqual(Ve.min()))try{const s=await X2(t.localStore);n.compareTo(s)>=0&&await function(i,r){const o=i.da.Tt(r);return o.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const d=i.Ea.get(h);d&&i.Ea.set(h,d.withResumeToken(u.resumeToken,r))}}),o.targetMismatches.forEach((u,h)=>{const d=i.Ea.get(u);if(!d)return;i.Ea.set(u,d.withResumeToken(Qn.EMPTY_BYTE_STRING,d.snapshotVersion)),eE(i,u);const p=new zi(d.target,u,h,d.sequenceNumber);Ng(i,p)}),i.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(s){ce(el,"Failed to raise snapshot:",s),await gf(t,s)}}async function gf(t,e,n){if(!Co(e))throw e;t.Ia.add(1),await pu(t),t.Va.set("Offline"),n||(n=()=>X2(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{ce(el,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await ld(t)})}function nE(t,e){return e().catch(n=>gf(t,n,e))}async function od(t){const e=Le(t),n=hr(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:dg;for(;C4(e);)try{const a=await c4(e.localStore,s);if(a===null){e.Ta.length===0&&n.L_();break}s=a.batchId,k4(e,a)}catch(a){await gf(e,a)}sE(e)&&aE(e)}function C4(t){return cl(t)&&t.Ta.length<10}function k4(t,e){t.Ta.push(e);const n=hr(t);n.O_()&&n.Y_&&n.ea(e.mutations)}function sE(t){return cl(t)&&!hr(t).x_()&&t.Ta.length>0}function aE(t){hr(t).start()}async function I4(t){hr(t).ra()}async function M4(t){const e=hr(t);for(const n of t.Ta)e.ea(n.mutations)}async function D4(t,e,n){const s=t.Ta.shift(),a=bg.from(s,e,n);await nE(t,()=>t.remoteSyncer.applySuccessfulWrite(a)),await od(t)}async function j4(t,e){e&&hr(t).Y_&&await async function(s,a){if(function(r){return mC(r)&&r!==H.ABORTED}(a.code)){const i=s.Ta.shift();hr(s).B_(),await nE(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,a)),await od(s)}}(t,e),sE(t)&&aE(t)}async function _1(t,e){const n=Le(t);n.asyncQueue.verifyOperationInProgress(),ce(el,"RemoteStore received new credentials");const s=cl(n);n.Ia.add(3),await pu(n),s&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await ld(n)}async function O4(t,e){const n=Le(t);e?(n.Ia.delete(2),await ld(n)):e||(n.Ia.add(2),await pu(n),n.Va.set("Unknown"))}function ko(t){return t.ma||(t.ma=function(n,s,a){const i=Le(n);return i.sa(),new v4(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,a)}(t.datastore,t.asyncQueue,{Zo:w4.bind(null,t),Yo:A4.bind(null,t),t_:N4.bind(null,t),H_:R4.bind(null,t)}),t.Ra.push(async e=>{e?(t.ma.B_(),Cg(t)?Rg(t):t.Va.set("Unknown")):(await t.ma.stop(),tE(t))})),t.ma}function hr(t){return t.fa||(t.fa=function(n,s,a){const i=Le(n);return i.sa(),new b4(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,a)}(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),Yo:I4.bind(null,t),t_:j4.bind(null,t),ta:M4.bind(null,t),na:D4.bind(null,t)}),t.Ra.push(async e=>{e?(t.fa.B_(),await od(t)):(await t.fa.stop(),t.Ta.length>0&&(ce(el,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
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
 */class kg{constructor(e,n,s,a,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=a,this.removalCallback=i,this.deferred=new si,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(r=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,a,i){const r=Date.now()+s,o=new kg(e,n,r,a,i);return o.start(s),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new le(H.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ig(t,e){if(hi("AsyncQueue",`${e}: ${t}`),Co(t))return new le(H.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Gl{static emptySet(e){return new Gl(e.comparator)}constructor(e){this.comparator=e?(n,s)=>e(n,s)||be.comparator(n.key,s.key):(n,s)=>be.comparator(n.key,s.key),this.keyedMap=nc(),this.sortedSet=new ln(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Gl)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const a=n.getNext().key,i=s.getNext().key;if(!a.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new Gl;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
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
 */class T1{constructor(){this.ga=new ln(be.comparator)}track(e){const n=e.doc.key,s=this.ga.get(n);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(n,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(n):e.type===1&&s.type===2?this.ga=this.ga.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):we(63341,{Vt:e,pa:s}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,s)=>{e.push(s)}),e}}class mo{constructor(e,n,s,a,i,r,o,u,h){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=a,this.mutatedKeys=i,this.fromCache=r,this.syncStateChanged=o,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,s,a,i){const r=[];return n.forEach(o=>{r.push({type:0,doc:o})}),new mo(e,n,Gl.emptySet(n),r,s,a,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&td(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let a=0;a<n.length;a++)if(n[a].type!==s[a].type||!n[a].doc.isEqual(s[a].doc))return!1;return!0}}/**
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
 */class V4{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class P4{constructor(){this.queries=E1(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,s){const a=Le(n),i=a.queries;a.queries=E1(),i.forEach((r,o)=>{for(const u of o.Sa)u.onError(s)})})(this,new le(H.ABORTED,"Firestore shutting down"))}}function E1(){return new ol(t=>E2(t),td)}async function Mg(t,e){const n=Le(t);let s=3;const a=e.query;let i=n.queries.get(a);i?!i.ba()&&e.Da()&&(s=2):(i=new V4,s=e.Da()?0:1);try{switch(s){case 0:i.wa=await n.onListen(a,!0);break;case 1:i.wa=await n.onListen(a,!1);break;case 2:await n.onFirstRemoteStoreListen(a)}}catch(r){const o=Ig(r,`Initialization of query '${xl(e.query)}' failed`);return void e.onError(o)}n.queries.set(a,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&jg(n)}async function Dg(t,e){const n=Le(t),s=e.query;let a=3;const i=n.queries.get(s);if(i){const r=i.Sa.indexOf(e);r>=0&&(i.Sa.splice(r,1),i.Sa.length===0?a=e.Da()?0:1:!i.ba()&&e.Da()&&(a=2))}switch(a){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}function L4(t,e){const n=Le(t);let s=!1;for(const a of e){const i=a.query,r=n.queries.get(i);if(r){for(const o of r.Sa)o.Fa(a)&&(s=!0);r.wa=a}}s&&jg(n)}function U4(t,e,n){const s=Le(t),a=s.queries.get(e);if(a)for(const i of a.Sa)i.onError(n);s.queries.delete(e)}function jg(t){t.Ca.forEach(e=>{e.next()})}var G0,S1;(S1=G0||(G0={})).Ma="default",S1.Cache="cache";class Og{constructor(e,n,s){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const a of e.docChanges)a.type!==3&&s.push(a);e=new mo(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const s=n!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=mo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==G0.Cache}}/**
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
 */class iE{constructor(e){this.key=e}}class rE{constructor(e){this.key=e}}class z4{constructor(e,n){this.query=e,this.Za=n,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=at(),this.mutatedKeys=at(),this.eu=S2(e),this.tu=new Gl(this.eu)}get nu(){return this.Za}ru(e,n){const s=n?n.iu:new T1,a=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,r=a,o=!1;const u=this.query.limitType==="F"&&a.size===this.query.limit?a.last():null,h=this.query.limitType==="L"&&a.size===this.query.limit?a.first():null;if(e.inorderTraversal((d,p)=>{const g=a.get(d),y=nd(this.query,p)?p:null,R=!!g&&this.mutatedKeys.has(g.key),I=!!y&&(y.hasLocalMutations||this.mutatedKeys.has(y.key)&&y.hasCommittedMutations);let O=!1;g&&y?g.data.isEqual(y.data)?R!==I&&(s.track({type:3,doc:y}),O=!0):this.su(g,y)||(s.track({type:2,doc:y}),O=!0,(u&&this.eu(y,u)>0||h&&this.eu(y,h)<0)&&(o=!0)):!g&&y?(s.track({type:0,doc:y}),O=!0):g&&!y&&(s.track({type:1,doc:g}),O=!0,(u||h)&&(o=!0)),O&&(y?(r=r.add(y),i=I?i.add(d):i.delete(d)):(r=r.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;r.size>this.query.limit;){const d=this.query.limitType==="F"?r.last():r.first();r=r.delete(d.key),i=i.delete(d.key),s.track({type:1,doc:d})}return{tu:r,iu:s,bs:o,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s,a){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const r=e.iu.ya();r.sort((d,p)=>function(y,R){const I=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return we(20277,{Vt:O})}};return I(y)-I(R)}(d.type,p.type)||this.eu(d.doc,p.doc)),this.ou(s),a=a??!1;const o=n&&!a?this._u():[],u=this.Ya.size===0&&this.current&&!a?1:0,h=u!==this.Xa;return this.Xa=u,r.length!==0||h?{snapshot:new mo(this.query,e.tu,i,r,e.mutatedKeys,u===0,h,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new T1,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Za=this.Za.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Za=this.Za.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=at(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Ya=this.Ya.add(s.key))});const n=[];return e.forEach(s=>{this.Ya.has(s)||n.push(new rE(s))}),this.Ya.forEach(s=>{e.has(s)||n.push(new iE(s))}),n}cu(e){this.Za=e.ks,this.Ya=at();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return mo.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Vg="SyncEngine";class B4{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class $4{constructor(e){this.key=e,this.hu=!1}}class F4{constructor(e,n,s,a,i,r){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=a,this.currentUser=i,this.maxConcurrentLimboResolutions=r,this.Pu={},this.Tu=new ol(o=>E2(o),td),this.Eu=new Map,this.Iu=new Set,this.Ru=new ln(be.comparator),this.Au=new Map,this.Vu=new Tg,this.du={},this.mu=new Map,this.fu=fo.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function q4(t,e,n=!0){const s=fE(t);let a;const i=s.Tu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),a=i.view.lu()):a=await lE(s,e,n,!0),a}async function H4(t,e){const n=fE(t);await lE(n,e,!0,!1)}async function lE(t,e,n,s){const a=await u4(t.localStore,Ra(e)),i=a.targetId,r=t.sharedClientState.addLocalQueryTarget(i,n);let o;return s&&(o=await G4(t,e,i,r==="current",a.resumeToken)),t.isPrimaryClient&&n&&Z2(t.remoteStore,a),o}async function G4(t,e,n,s,a){t.pu=(p,g,y)=>async function(I,O,x,b){let N=O.view.ru(x);N.bs&&(N=await g1(I.localStore,O.query,!1).then(({documents:S})=>O.view.ru(S,N)));const V=b&&b.targetChanges.get(O.targetId),U=b&&b.targetMismatches.get(O.targetId)!=null,W=O.view.applyChanges(N,I.isPrimaryClient,V,U);return A1(I,O.targetId,W.au),W.snapshot}(t,p,g,y);const i=await g1(t.localStore,e,!0),r=new z4(e,i.ks),o=r.ru(i.documents),u=mu.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",a),h=r.applyChanges(o,t.isPrimaryClient,u);A1(t,n,h.au);const d=new B4(e,n,r);return t.Tu.set(e,d),t.Eu.has(n)?t.Eu.get(n).push(e):t.Eu.set(n,[e]),h.snapshot}async function Y4(t,e,n){const s=Le(t),a=s.Tu.get(e),i=s.Eu.get(a.targetId);if(i.length>1)return s.Eu.set(a.targetId,i.filter(r=>!td(r,e))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(a.targetId),s.sharedClientState.isActiveQueryTarget(a.targetId)||await q0(s.localStore,a.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(a.targetId),n&&Ag(s.remoteStore,a.targetId),Y0(s,a.targetId)}).catch(Ro)):(Y0(s,a.targetId),await q0(s.localStore,a.targetId,!0))}async function K4(t,e){const n=Le(t),s=n.Tu.get(e),a=n.Eu.get(s.targetId);n.isPrimaryClient&&a.length===1&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),Ag(n.remoteStore,s.targetId))}async function Q4(t,e,n){const s=nk(t);try{const a=await function(r,o){const u=Le(r),h=Kt.now(),d=o.reduce((y,R)=>y.add(R.key),at());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",y=>{let R=fi(),I=at();return u.xs.getEntries(y,d).next(O=>{R=O,R.forEach((x,b)=>{b.isValidDocument()||(I=I.add(x))})}).next(()=>u.localDocuments.getOverlayedDocuments(y,R)).next(O=>{p=O;const x=[];for(const b of o){const N=cC(b,p.get(b.key).overlayedDocument);N!=null&&x.push(new yr(b.key,N,p2(N.value.mapValue),Ca.exists(!0)))}return u.mutationQueue.addMutationBatch(y,h,x,o)}).next(O=>{g=O;const x=O.applyToLocalDocumentSet(p,I);return u.documentOverlayCache.saveOverlays(y,O.batchId,x)})}).then(()=>({batchId:g.batchId,changes:A2(p)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(a.batchId),function(r,o,u){let h=r.du[r.currentUser.toKey()];h||(h=new ln(st)),h=h.insert(o,u),r.du[r.currentUser.toKey()]=h}(s,a.batchId,n),await gu(s,a.changes),await od(s.remoteStore)}catch(a){const i=Ig(a,"Failed to persist write");n.reject(i)}}async function oE(t,e){const n=Le(t);try{const s=await l4(n.localStore,e);e.targetChanges.forEach((a,i)=>{const r=n.Au.get(i);r&&(bt(a.addedDocuments.size+a.modifiedDocuments.size+a.removedDocuments.size<=1,22616),a.addedDocuments.size>0?r.hu=!0:a.modifiedDocuments.size>0?bt(r.hu,14607):a.removedDocuments.size>0&&(bt(r.hu,42227),r.hu=!1))}),await gu(n,s,e)}catch(s){await Ro(s)}}function w1(t,e,n){const s=Le(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const a=[];s.Tu.forEach((i,r)=>{const o=r.view.va(e);o.snapshot&&a.push(o.snapshot)}),function(r,o){const u=Le(r);u.onlineState=o;let h=!1;u.queries.forEach((d,p)=>{for(const g of p.Sa)g.va(o)&&(h=!0)}),h&&jg(u)}(s.eventManager,e),a.length&&s.Pu.H_(a),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function X4(t,e,n){const s=Le(t);s.sharedClientState.updateQueryState(e,"rejected",n);const a=s.Au.get(e),i=a&&a.key;if(i){let r=new ln(be.comparator);r=r.insert(i,as.newNoDocument(i,Ve.min()));const o=at().add(i),u=new id(Ve.min(),new Map,new ln(st),r,o);await oE(s,u),s.Ru=s.Ru.remove(i),s.Au.delete(e),Pg(s)}else await q0(s.localStore,e,!1).then(()=>Y0(s,e,n)).catch(Ro)}async function W4(t,e){const n=Le(t),s=e.batch.batchId;try{const a=await r4(n.localStore,e);uE(n,s,null),cE(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await gu(n,a)}catch(a){await Ro(a)}}async function J4(t,e,n){const s=Le(t);try{const a=await function(r,o){const u=Le(r);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let d;return u.mutationQueue.lookupMutationBatch(h,o).next(p=>(bt(p!==null,37113),d=p.keys(),u.mutationQueue.removeMutationBatch(h,p))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,d,o)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d)).next(()=>u.localDocuments.getDocuments(h,d))})}(s.localStore,e);uE(s,e,n),cE(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await gu(s,a)}catch(a){await Ro(a)}}function cE(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function uE(t,e,n){const s=Le(t);let a=s.du[s.currentUser.toKey()];if(a){const i=a.get(e);i&&(n?i.reject(n):i.resolve(),a=a.remove(e)),s.du[s.currentUser.toKey()]=a}}function Y0(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.Eu.get(e))t.Tu.delete(s),n&&t.Pu.yu(s,n);t.Eu.delete(e),t.isPrimaryClient&&t.Vu.Gr(e).forEach(s=>{t.Vu.containsKey(s)||hE(t,s)})}function hE(t,e){t.Iu.delete(e.path.canonicalString());const n=t.Ru.get(e);n!==null&&(Ag(t.remoteStore,n),t.Ru=t.Ru.remove(e),t.Au.delete(n),Pg(t))}function A1(t,e,n){for(const s of n)s instanceof iE?(t.Vu.addReference(s.key,e),Z4(t,s)):s instanceof rE?(ce(Vg,"Document no longer in limbo: "+s.key),t.Vu.removeReference(s.key,e),t.Vu.containsKey(s.key)||hE(t,s.key)):we(19791,{wu:s})}function Z4(t,e){const n=e.key,s=n.path.canonicalString();t.Ru.get(n)||t.Iu.has(s)||(ce(Vg,"New document in limbo: "+n),t.Iu.add(s),Pg(t))}function Pg(t){for(;t.Iu.size>0&&t.Ru.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new be($t.fromString(e)),s=t.fu.next();t.Au.set(s,new $4(n)),t.Ru=t.Ru.insert(n,s),Z2(t.remoteStore,new zi(Ra(ed(n.path)),s,"TargetPurposeLimboResolution",Wf.ce))}}async function gu(t,e,n){const s=Le(t),a=[],i=[],r=[];s.Tu.isEmpty()||(s.Tu.forEach((o,u)=>{r.push(s.pu(u,e,n).then(h=>{var d;if((h||n)&&s.isPrimaryClient){const p=h?!h.fromCache:(d=n==null?void 0:n.targetChanges.get(u.targetId))==null?void 0:d.current;s.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){a.push(h);const p=Sg.Is(u.targetId,h);i.push(p)}}))}),await Promise.all(r),s.Pu.H_(a),await async function(u,h){const d=Le(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>Q.forEach(h,g=>Q.forEach(g.Ts,y=>d.persistence.referenceDelegate.addReference(p,g.targetId,y)).next(()=>Q.forEach(g.Es,y=>d.persistence.referenceDelegate.removeReference(p,g.targetId,y)))))}catch(p){if(!Co(p))throw p;ce(wg,"Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const y=d.vs.get(g),R=y.snapshotVersion,I=y.withLastLimboFreeSnapshotVersion(R);d.vs=d.vs.insert(g,I)}}}(s.localStore,i))}async function ek(t,e){const n=Le(t);if(!n.currentUser.isEqual(e)){ce(Vg,"User change. New user:",e.toKey());const s=await Q2(n.localStore,e);n.currentUser=e,function(i,r){i.mu.forEach(o=>{o.forEach(u=>{u.reject(new le(H.CANCELLED,r))})}),i.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await gu(n,s.Ns)}}function tk(t,e){const n=Le(t),s=n.Au.get(e);if(s&&s.hu)return at().add(s.key);{let a=at();const i=n.Eu.get(e);if(!i)return a;for(const r of i){const o=n.Tu.get(r);a=a.unionWith(o.view.nu)}return a}}function fE(t){const e=Le(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=oE.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=tk.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=X4.bind(null,e),e.Pu.H_=L4.bind(null,e.eventManager),e.Pu.yu=U4.bind(null,e.eventManager),e}function nk(t){const e=Le(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=W4.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=J4.bind(null,e),e}class yf{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=rd(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return i4(this.persistence,new n4,e.initialUser,this.serializer)}Cu(e){return new K2(Eg.Vi,this.serializer)}Du(e){return new f4}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}yf.provider={build:()=>new yf};class sk extends yf{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){bt(this.persistence.referenceDelegate instanceof pf,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new BC(s,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?xs.withCacheSize(this.cacheSizeBytes):xs.DEFAULT;return new K2(s=>pf.Vi(s,n),this.serializer)}}class K0{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>w1(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=ek.bind(null,this.syncEngine),await O4(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new P4}()}createDatastore(e){const n=rd(e.databaseInfo.databaseId),s=y4(e.databaseInfo);return T4(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return function(s,a,i,r,o){return new S4(s,a,i,r,o)}(this.localStore,this.datastore,e.asyncQueue,n=>w1(this.syncEngine,n,0),function(){return b1.v()?new b1:new d4}())}createSyncEngine(e,n){return function(a,i,r,o,u,h,d){const p=new F4(a,i,r,o,u,h);return d&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(a){const i=Le(a);ce(el,"RemoteStore shutting down."),i.Ia.add(5),await pu(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}K0.provider={build:()=>new K0};/**
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
 */class Lg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):hi("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */const fr="FirestoreClient";class ak{constructor(e,n,s,a,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this._databaseInfo=a,this.user=ss.UNAUTHENTICATED,this.clientId=fg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async r=>{ce(fr,"Received user=",r.uid),await this.authCredentialListener(r),this.user=r}),this.appCheckCredentials.start(s,r=>(ce(fr,"Received new app check token=",r),this.appCheckCredentialListener(r,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new si;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=Ig(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function ym(t,e){t.asyncQueue.verifyOperationInProgress(),ce(fr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async a=>{s.isEqual(a)||(await Q2(e.localStore,a),s=a)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function N1(t,e){t.asyncQueue.verifyOperationInProgress();const n=await ik(t);ce(fr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(s=>_1(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,a)=>_1(e.remoteStore,a)),t._onlineComponents=e}async function ik(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){ce(fr,"Using user provided OfflineComponentProvider");try{await ym(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(a){return a.name==="FirebaseError"?a.code===H.FAILED_PRECONDITION||a.code===H.UNIMPLEMENTED:!(typeof DOMException<"u"&&a instanceof DOMException)||a.code===22||a.code===20||a.code===11}(n))throw n;Zr("Error using user provided cache. Falling back to memory cache: "+n),await ym(t,new yf)}}else ce(fr,"Using default OfflineComponentProvider"),await ym(t,new sk(void 0));return t._offlineComponents}async function dE(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(ce(fr,"Using user provided OnlineComponentProvider"),await N1(t,t._uninitializedComponentsProvider._online)):(ce(fr,"Using default OnlineComponentProvider"),await N1(t,new K0))),t._onlineComponents}function rk(t){return dE(t).then(e=>e.syncEngine)}async function vf(t){const e=await dE(t),n=e.eventManager;return n.onListen=q4.bind(null,e.syncEngine),n.onUnlisten=Y4.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=H4.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=K4.bind(null,e.syncEngine),n}function lk(t,e,n,s){const a=new Lg(s),i=new Og(e,a,n);return t.asyncQueue.enqueueAndForget(async()=>Mg(await vf(t),i)),()=>{a.Nu(),t.asyncQueue.enqueueAndForget(async()=>Dg(await vf(t),i))}}function ok(t,e,n={}){const s=new si;return t.asyncQueue.enqueueAndForget(async()=>function(i,r,o,u,h){const d=new Lg({next:g=>{d.Nu(),r.enqueueAndForget(()=>Dg(i,p));const y=g.docs.has(o);!y&&g.fromCache?h.reject(new le(H.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&g.fromCache&&u&&u.source==="server"?h.reject(new le(H.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new Og(ed(o.path),d,{includeMetadataChanges:!0,qa:!0});return Mg(i,p)}(await vf(t),t.asyncQueue,e,n,s)),s.promise}function ck(t,e,n={}){const s=new si;return t.asyncQueue.enqueueAndForget(async()=>function(i,r,o,u,h){const d=new Lg({next:g=>{d.Nu(),r.enqueueAndForget(()=>Dg(i,p)),g.fromCache&&u.source==="server"?h.reject(new le(H.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new Og(o,d,{includeMetadataChanges:!0,qa:!0});return Mg(i,p)}(await vf(t),t.asyncQueue,e,n,s)),s.promise}function uk(t,e){const n=new si;return t.asyncQueue.enqueueAndForget(async()=>Q4(await rk(t),e,n)),n.promise}/**
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
 */function mE(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const hk="ComponentProvider",R1=new Map;function fk(t,e,n,s,a){return new MR(t,e,n,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,mE(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator,s)}/**
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
 */const pE="firestore.googleapis.com",C1=!0;class k1{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new le(H.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=pE,this.ssl=C1}else this.host=e.host,this.ssl=e.ssl??C1;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Y2;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<UC)throw new le(H.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}xR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=mE(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new le(H.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new le(H.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new le(H.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,a){return s.timeoutSeconds===a.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class cd{constructor(e,n,s,a){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=a,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new k1({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new le(H.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new le(H.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new k1(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new uR;switch(s.type){case"firstParty":return new mR(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new le(H.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const s=R1.get(n);s&&(ce(hk,"Removing Datastore"),R1.delete(n),s.terminate())}(this),Promise.resolve()}}function dk(t,e,n,s={}){var h;t=na(t,cd);const a=uu(e),i=t._getSettings(),r={...i,emulatorOptions:t._getEmulatorOptions()},o=`${e}:${n}`;a&&$T(`https://${o}`),i.host!==pE&&i.host!==o&&Zr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:o,ssl:a,emulatorOptions:s};if(!rr(u,r)&&(t._setSettings(u),s.mockUserToken)){let d,p;if(typeof s.mockUserToken=="string")d=s.mockUserToken,p=ss.MOCK_USER;else{d=V5(s.mockUserToken,(h=t._app)==null?void 0:h.options.projectId);const g=s.mockUserToken.sub||s.mockUserToken.user_id;if(!g)throw new le(H.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new ss(g)}t._authCredentials=new hR(new n2(d,p))}}/**
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
 */class vr{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new vr(this.firestore,e,this._query)}}class mn{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new er(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new mn(this.firestore,e,this._key)}toJSON(){return{type:mn._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,s){if(hu(n,mn._jsonSchema))return new mn(e,s||null,new be($t.fromString(n.referencePath)))}}mn._jsonSchemaVersion="firestore/documentReference/1.0",mn._jsonSchema={type:An("string",mn._jsonSchemaVersion),referencePath:An("string")};class er extends vr{constructor(e,n,s){super(e,n,ed(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new mn(this.firestore,null,new be(e))}withConverter(e){return new er(this.firestore,e,this._path)}}function I1(t,e,...n){if(t=Kn(t),s2("collection","path",e),t instanceof cd){const s=$t.fromString(e,...n);return Fv(s),new er(t,null,s)}{if(!(t instanceof mn||t instanceof er))throw new le(H.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child($t.fromString(e,...n));return Fv(s),new er(t.firestore,null,s)}}function Ko(t,e,...n){if(t=Kn(t),arguments.length===1&&(e=fg.newId()),s2("doc","path",e),t instanceof cd){const s=$t.fromString(e,...n);return $v(s),new mn(t,null,new be(s))}{if(!(t instanceof mn||t instanceof er))throw new le(H.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child($t.fromString(e,...n));return $v(s),new mn(t.firestore,t instanceof er?t.converter:null,new be(s))}}/**
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
 */const M1="AsyncQueue";class D1{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new W2(this,"async_queue_retry"),this._c=()=>{const s=gm();s&&ce(M1,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const n=gm();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=gm();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new si;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Co(e))throw e;ce(M1,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,hi("INTERNAL UNHANDLED ERROR: ",j1(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=n,n}enqueueAfterDelay(e,n,s){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const a=kg.createAndSchedule(this,e,n,s,i=>this.hc(i));return this.tc.push(a),a}uc(){this.nc&&we(47125,{Pc:j1(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function j1(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class tl extends cd{constructor(e,n,s,a){super(e,n,s,a),this.type="firestore",this._queue=new D1,this._persistenceKey=(a==null?void 0:a.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new D1(e),this._firestoreClient=void 0,await e}}}function mk(t,e){const n=typeof t=="object"?t:GT(),s=typeof t=="string"?t:e||lf,a=ug(n,"firestore").getImmediate({identifier:s});if(!a._initialized){const i=j5("firestore");i&&dk(a,...i)}return a}function ud(t){if(t._terminated)throw new le(H.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||pk(t),t._firestoreClient}function pk(t){var s,a,i,r;const e=t._freezeSettings(),n=fk(t._databaseId,((s=t._app)==null?void 0:s.options.appId)||"",t._persistenceKey,(a=t._app)==null?void 0:a.options.apiKey,e);t._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((r=e.localCache)!=null&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new ak(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}}(t._componentsProvider))}/**
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
 */class Zs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Zs(Qn.fromBase64String(e))}catch(n){throw new le(H.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Zs(Qn.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Zs._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(hu(e,Zs._jsonSchema))return Zs.fromBase64String(e.bytes)}}Zs._jsonSchemaVersion="firestore/bytes/1.0",Zs._jsonSchema={type:An("string",Zs._jsonSchemaVersion),bytes:An("string")};/**
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
 */class Ug{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new le(H.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Hn(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class hd{constructor(e){this._methodName=e}}/**
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
 */class Ia{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new le(H.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new le(H.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return st(this._lat,e._lat)||st(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ia._jsonSchemaVersion}}static fromJSON(e){if(hu(e,Ia._jsonSchema))return new Ia(e.latitude,e.longitude)}}Ia._jsonSchemaVersion="firestore/geoPoint/1.0",Ia._jsonSchema={type:An("string",Ia._jsonSchemaVersion),latitude:An("number"),longitude:An("number")};/**
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
 */class ma{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,a){if(s.length!==a.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==a[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ma._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(hu(e,ma._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new ma(e.vectorValues);throw new le(H.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ma._jsonSchemaVersion="firestore/vectorValue/1.0",ma._jsonSchema={type:An("string",ma._jsonSchemaVersion),vectorValues:An("object")};/**
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
 */const gk=/^__.*__$/;class yk{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new yr(e,this.data,this.fieldMask,n,this.fieldTransforms):new du(e,this.data,n,this.fieldTransforms)}}class gE{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new yr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function yE(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw we(40011,{dataSource:t})}}class fd{constructor(e,n,s,a,i,r){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=a,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=r||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new fd({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var a;const n=(a=this.path)==null?void 0:a.child(e),s=this.i({path:n,arrayElement:!1});return s.mc(e),s}fc(e){var a;const n=(a=this.path)==null?void 0:a.child(e),s=this.i({path:n,arrayElement:!1});return s.Ac(),s}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return bf(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(yE(this.dataSource)&&gk.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class vk{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||rd(e)}I(e,n,s,a=!1){return new fd({dataSource:e,methodName:n,targetDoc:s,path:Hn.emptyPath(),arrayElement:!1,hasConverter:a},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function zg(t){const e=t._freezeSettings(),n=rd(t._databaseId);return new vk(t._databaseId,!!e.ignoreUndefinedProperties,n)}function bk(t,e,n,s,a,i={}){const r=t.I(i.merge||i.mergeFields?2:0,e,n,a);$g("Data must be an object, but it was:",r,s);const o=vE(s,r);let u,h;if(i.merge)u=new js(r.fieldMask),h=r.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=po(e,p,n);if(!r.contains(g))throw new le(H.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);_E(d,g)||d.push(g)}u=new js(d),h=r.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,h=r.fieldTransforms;return new yk(new _s(o),u,h)}class dd extends hd{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof dd}}function xk(t,e,n){return new fd({dataSource:3,targetDoc:e.settings.targetDoc,methodName:t._methodName,arrayElement:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Bg extends hd{constructor(e,n){super(e),this.Sc=n}_toFieldTransform(e){const n=xk(this,e,!0),s=this.Sc.map(i=>Io(i,n)),a=new ho(s);return new iC(e.path,a)}isEqual(e){return e instanceof Bg&&rr(this.Sc,e.Sc)}}function _k(t,e,n,s){const a=t.I(1,e,n);$g("Data must be an object, but it was:",a,s);const i=[],r=_s.empty();gr(s,(u,h)=>{const d=xE(e,u,n);h=Kn(h);const p=a.fc(d);if(h instanceof dd)i.push(d);else{const g=Io(h,p);g!=null&&(i.push(d),r.set(d,g))}});const o=new js(i);return new gE(r,o,a.fieldTransforms)}function Tk(t,e,n,s,a,i){const r=t.I(1,e,n),o=[po(e,s,n)],u=[a];if(i.length%2!=0)throw new le(H.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)o.push(po(e,i[g])),u.push(i[g+1]);const h=[],d=_s.empty();for(let g=o.length-1;g>=0;--g)if(!_E(h,o[g])){const y=o[g];let R=u[g];R=Kn(R);const I=r.fc(y);if(R instanceof dd)h.push(y);else{const O=Io(R,I);O!=null&&(h.push(y),d.set(y,O))}}const p=new js(h);return new gE(d,p,r.fieldTransforms)}function Ek(t,e,n,s=!1){return Io(n,t.I(s?4:3,e))}function Io(t,e){if(bE(t=Kn(t)))return $g("Unsupported field value:",e,t),vE(t,e);if(t instanceof hd)return function(s,a){if(!yE(a.dataSource))throw a.yc(`${s._methodName}() can only be used with update() and set()`);if(!a.path)throw a.yc(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(a);i&&a.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(s,a){const i=[];let r=0;for(const o of s){let u=Io(o,a.gc(r));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),r++}return{arrayValue:{values:i}}}(t,e)}return function(s,a){if((s=Kn(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return nC(a.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=Kt.fromDate(s);return{timestampValue:mf(a.serializer,i)}}if(s instanceof Kt){const i=new Kt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:mf(a.serializer,i)}}if(s instanceof Ia)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Zs)return{bytesValue:U2(a.serializer,s._byteString)};if(s instanceof mn){const i=a.databaseId,r=s.firestore._databaseId;if(!r.isEqual(i))throw a.yc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:_g(s.firestore._databaseId||a.databaseId,s._key.path)}}if(s instanceof ma)return function(r,o){const u=r instanceof ma?r.toArray():r;return{mapValue:{fields:{[f2]:{stringValue:m2},[of]:{arrayValue:{values:u.map(d=>{if(typeof d!="number")throw o.yc("VectorValues must only contain numeric values.");return vg(o.serializer,d)})}}}}}}(s,a);if(G2(s))return s._toProto(a.serializer);throw a.yc(`Unsupported field value: ${Xf(s)}`)}(t,e)}function vE(t,e){const n={};return r2(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):gr(t,(s,a)=>{const i=Io(a,e.dc(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function bE(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Kt||t instanceof Ia||t instanceof Zs||t instanceof mn||t instanceof hd||t instanceof ma||G2(t))}function $g(t,e,n){if(!bE(n)||!a2(n)){const s=Xf(n);throw s==="an object"?e.yc(t+" a custom object"):e.yc(t+" "+s)}}function po(t,e,n){if((e=Kn(e))instanceof Ug)return e._internalPath;if(typeof e=="string")return xE(t,e);throw bf("Field path arguments must be of type string or ",t,!1,void 0,n)}const Sk=new RegExp("[~\\*/\\[\\]]");function xE(t,e,n){if(e.search(Sk)>=0)throw bf(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ug(...e.split("."))._internalPath}catch{throw bf(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function bf(t,e,n,s,a){const i=s&&!s.isEmpty(),r=a!==void 0;let o=`Function ${e}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let u="";return(i||r)&&(u+=" (found",i&&(u+=` in field ${s}`),r&&(u+=` in document ${a}`),u+=")"),new le(H.INVALID_ARGUMENT,o+t+u)}function _E(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class wk{convertValue(e,n="none"){switch(ur(e)){case 0:return null;case 1:return e.booleanValue;case 2:return pn(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(cr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw we(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return gr(e,(a,i)=>{s[a]=this.convertValue(i,n)}),s}convertVectorValue(e){var s,a,i;const n=(i=(a=(s=e.fields)==null?void 0:s[of].arrayValue)==null?void 0:a.values)==null?void 0:i.map(r=>pn(r.doubleValue));return new ma(n)}convertGeoPoint(e){return new Ia(pn(e.latitude),pn(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=Zf(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(qc(e));default:return null}}convertTimestamp(e){const n=or(e);return new Kt(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=$t.fromString(e);bt(H2(s),9688,{name:e});const a=new Hc(s.get(1),s.get(3)),i=new be(s.popFirst(5));return a.isEqual(n)||hi(`Document ${i} contains a document reference within a different database (${a.projectId}/${a.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */class Fg extends wk{constructor(e){super(),this.firestore=e}convertBytes(e){return new Zs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new mn(this.firestore,null,n)}}function Cr(...t){return new Bg("arrayUnion",t)}const O1="@firebase/firestore",V1="4.14.0";/**
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
 */function P1(t){return function(n,s){if(typeof n!="object"||n===null)return!1;const a=n;for(const i of s)if(i in a&&typeof a[i]=="function")return!0;return!1}(t,["next","error","complete"])}/**
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
 */class TE{constructor(e,n,s,a,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=a,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new mn(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Ak(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const n=this._document.data.field(po("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Ak extends TE{data(){return super.data()}}/**
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
 */function EE(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new le(H.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class qg{}class SE extends qg{}function L1(t,e,...n){let s=[];e instanceof qg&&s.push(e),s=s.concat(n),function(i){const r=i.filter(u=>u instanceof Hg).length,o=i.filter(u=>u instanceof md).length;if(r>1||r>0&&o>0)throw new le(H.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const a of s)t=a._apply(t);return t}class md extends SE{constructor(e,n,s){super(),this._field=e,this._op=n,this._value=s,this.type="where"}static _create(e,n,s){return new md(e,n,s)}_apply(e){const n=this._parse(e);return wE(e._query,n),new vr(e.firestore,e.converter,U0(e._query,n))}_parse(e){const n=zg(e.firestore);return function(i,r,o,u,h,d,p){let g;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new le(H.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){B1(p,d);const R=[];for(const I of p)R.push(z1(u,i,I));g={arrayValue:{values:R}}}else g=z1(u,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||B1(p,d),g=Ek(o,r,p,d==="in"||d==="not-in");return Sn.create(h,d,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function vm(t,e,n){const s=e,a=po("where",t);return md._create(a,s,n)}class Hg extends qg{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Hg(e,n)}_parse(e){const n=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return n.length===1?n[0]:pa.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(a,i){let r=a;const o=i.getFlattenedFilters();for(const u of o)wE(r,u),r=U0(r,u)}(e._query,n),new vr(e.firestore,e.converter,U0(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Gg extends SE{constructor(e,n,s){super(),this.type=e,this._limit=n,this._limitType=s}static _create(e,n,s){return new Gg(e,n,s)}_apply(e){return new vr(e.firestore,e.converter,hf(e._query,this._limit,this._limitType))}}function U1(t){return _R("limit",t),Gg._create("limit",t,"F")}function z1(t,e,n){if(typeof(n=Kn(n))=="string"){if(n==="")throw new le(H.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!T2(e)&&n.indexOf("/")!==-1)throw new le(H.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const s=e.path.child($t.fromString(n));if(!be.isDocumentKey(s))throw new le(H.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return Wv(t,new be(s))}if(n instanceof mn)return Wv(t,n._key);throw new le(H.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Xf(n)}.`)}function B1(t,e){if(!Array.isArray(t)||t.length===0)throw new le(H.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function wE(t,e){const n=function(a,i){for(const r of a)for(const o of r.getFlattenedFilters())if(i.indexOf(o.op)>=0)return o.op;return null}(t.filters,function(a){switch(a){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new le(H.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new le(H.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function Nk(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}class ac{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class qr extends TE{constructor(e,n,s,a,i,r){super(e,n,s,a,r),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new bh(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(po("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new le(H.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=qr._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}qr._jsonSchemaVersion="firestore/documentSnapshot/1.0",qr._jsonSchema={type:An("string",qr._jsonSchemaVersion),bundleSource:An("string","DocumentSnapshot"),bundleName:An("string"),bundle:An("string")};class bh extends qr{data(e={}){return super.data(e)}}class Hr{constructor(e,n,s,a){this._firestore=e,this._userDataWriter=n,this._snapshot=a,this.metadata=new ac(a.hasPendingWrites,a.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new bh(this._firestore,this._userDataWriter,s.key,s,new ac(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new le(H.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(a,i){if(a._snapshot.oldDocs.isEmpty()){let r=0;return a._snapshot.docChanges.map(o=>{const u=new bh(a._firestore,a._userDataWriter,o.doc.key,o.doc,new ac(a._snapshot.mutatedKeys.has(o.doc.key),a._snapshot.fromCache),a.query.converter);return o.doc,{type:"added",doc:u,oldIndex:-1,newIndex:r++}})}{let r=a._snapshot.oldDocs;return a._snapshot.docChanges.filter(o=>i||o.type!==3).map(o=>{const u=new bh(a._firestore,a._userDataWriter,o.doc.key,o.doc,new ac(a._snapshot.mutatedKeys.has(o.doc.key),a._snapshot.fromCache),a.query.converter);let h=-1,d=-1;return o.type!==0&&(h=r.indexOf(o.doc.key),r=r.delete(o.doc.key)),o.type!==1&&(r=r.add(o.doc),d=r.indexOf(o.doc.key)),{type:Rk(o.type),doc:u,oldIndex:h,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new le(H.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Hr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=fg.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],s=[],a=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),a.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Rk(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return we(61501,{type:t})}}/**
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
 */Hr._jsonSchemaVersion="firestore/querySnapshot/1.0",Hr._jsonSchema={type:An("string",Hr._jsonSchemaVersion),bundleSource:An("string","QuerySnapshot"),bundleName:An("string"),bundle:An("string")};/**
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
 */function Ck(t){t=na(t,mn);const e=na(t.firestore,tl),n=ud(e);return ok(n,t._key).then(s=>NE(e,t,s))}function $1(t){t=na(t,vr);const e=na(t.firestore,tl),n=ud(e),s=new Fg(e);return EE(t._query),ck(n,t._query).then(a=>new Hr(e,s,t,a))}function kk(t,e,n){t=na(t,mn);const s=na(t.firestore,tl),a=Nk(t.converter,e,n),i=zg(s);return AE(s,[bk(i,"setDoc",t._key,a,t.converter!==null,n).toMutation(t._key,Ca.none())])}function F1(t,e,n,...s){t=na(t,mn);const a=na(t.firestore,tl),i=zg(a);let r;return r=typeof(e=Kn(e))=="string"||e instanceof Ug?Tk(i,"updateDoc",t._key,e,n,s):_k(i,"updateDoc",t._key,e),AE(a,[r.toMutation(t._key,Ca.exists(!0))])}function Ik(t,...e){var h,d,p;t=Kn(t);let n={includeMetadataChanges:!1,source:"default"},s=0;typeof e[s]!="object"||P1(e[s])||(n=e[s++]);const a={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(P1(e[s])){const g=e[s];e[s]=(h=g.next)==null?void 0:h.bind(g),e[s+1]=(d=g.error)==null?void 0:d.bind(g),e[s+2]=(p=g.complete)==null?void 0:p.bind(g)}let i,r,o;if(t instanceof mn)r=na(t.firestore,tl),o=ed(t._key.path),i={next:g=>{e[s]&&e[s](NE(r,t,g))},error:e[s+1],complete:e[s+2]};else{const g=na(t,vr);r=na(g.firestore,tl),o=g._query;const y=new Fg(r);i={next:R=>{e[s]&&e[s](new Hr(r,y,g,R))},error:e[s+1],complete:e[s+2]},EE(t._query)}const u=ud(r);return lk(u,o,a,i)}function AE(t,e){const n=ud(t);return uk(n,e)}function NE(t,e,n){const s=n.docs.get(e._key),a=new Fg(t);return new qr(t,a,e._key,s,new ac(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){cR(Ao),lo(new Wr("firestore",(s,{instanceIdentifier:a,options:i})=>{const r=s.getProvider("app").getImmediate(),o=new tl(new fR(s.getProvider("auth-internal")),new pR(r,s.getProvider("app-check-internal")),DR(r,a),r);return i={useFetchStreams:n,...i},o._setSettings(i),o},"PUBLIC").setMultipleInstances(!0)),Ji(O1,V1,e),Ji(O1,V1,"esm2020")})();function RE(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Mk=RE,CE=new ou("auth","Firebase",RE());/**
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
 */const xf=new og("@firebase/auth");function Dk(t,...e){xf.logLevel<=nt.WARN&&xf.warn(`Auth (${Ao}): ${t}`,...e)}function xh(t,...e){xf.logLevel<=nt.ERROR&&xf.error(`Auth (${Ao}): ${t}`,...e)}/**
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
 */function di(t,...e){throw Yg(t,...e)}function Ma(t,...e){return Yg(t,...e)}function kE(t,e,n){const s={...Mk(),[e]:n};return new ou("auth","Firebase",s).create(e,{appName:t.name})}function tr(t){return kE(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Yg(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return CE.create(t,...e)}function De(t,e,...n){if(!t)throw Yg(e,...n)}function Ja(t){const e="INTERNAL ASSERTION FAILED: "+t;throw xh(e),new Error(e)}function mi(t,e){t||Ja(e)}/**
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
 */function Q0(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function jk(){return q1()==="http:"||q1()==="https:"}function q1(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
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
 */function Ok(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(jk()||z5()||"connection"in navigator)?navigator.onLine:!0}function Vk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class yu{constructor(e,n){this.shortDelay=e,this.longDelay=n,mi(n>e,"Short delay should be less than long delay!"),this.isMobile=P5()||B5()}get(){return Ok()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Kg(t,e){mi(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class IE{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ja("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ja("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ja("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Pk={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Lk=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Uk=new yu(3e4,6e4);function pd(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Mo(t,e,n,s,a={}){return ME(t,a,async()=>{let i={},r={};s&&(e==="GET"?r=s:i={body:JSON.stringify(s)});const o=cu({key:t.config.apiKey,...r}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h={method:e,headers:u,...i};return U5()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&uu(t.emulatorConfig.host)&&(h.credentials="include"),IE.fetch()(await jE(t,t.config.apiHost,n,o),h)})}async function ME(t,e,n){t._canInitEmulator=!1;const s={...Pk,...e};try{const a=new zk(t),i=await Promise.race([n(),a.promise]);a.clearNetworkTimeout();const r=await i.json();if("needConfirmation"in r)throw Xu(t,"account-exists-with-different-credential",r);if(i.ok&&!("errorMessage"in r))return r;{const o=i.ok?r.errorMessage:r.error.message,[u,h]=o.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Xu(t,"credential-already-in-use",r);if(u==="EMAIL_EXISTS")throw Xu(t,"email-already-in-use",r);if(u==="USER_DISABLED")throw Xu(t,"user-disabled",r);const d=s[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw kE(t,d,h);di(t,d)}}catch(a){if(a instanceof gi)throw a;di(t,"network-request-failed",{message:String(a)})}}async function DE(t,e,n,s,a={}){const i=await Mo(t,e,n,s,a);return"mfaPendingCredential"in i&&di(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function jE(t,e,n,s){const a=`${e}${n}?${s}`,i=t,r=i.config.emulator?Kg(t.config,a):`${t.config.apiScheme}://${a}`;return Lk.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(r).toString():r}class zk{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Ma(this.auth,"network-request-failed")),Uk.get())})}}function Xu(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const a=Ma(t,e,s);return a.customData._tokenResponse=n,a}/**
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
 */async function Bk(t,e){return Mo(t,"POST","/v1/accounts:delete",e)}async function _f(t,e){return Mo(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Sc(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function $k(t,e=!1){const n=Kn(t),s=await n.getIdToken(e),a=Qg(s);De(a&&a.exp&&a.auth_time&&a.iat,n.auth,"internal-error");const i=typeof a.firebase=="object"?a.firebase:void 0,r=i==null?void 0:i.sign_in_provider;return{claims:a,token:s,authTime:Sc(bm(a.auth_time)),issuedAtTime:Sc(bm(a.iat)),expirationTime:Sc(bm(a.exp)),signInProvider:r||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function bm(t){return Number(t)*1e3}function Qg(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return xh("JWT malformed, contained fewer than 3 sections"),null;try{const a=LT(n);return a?JSON.parse(a):(xh("Failed to decode base64 JWT payload"),null)}catch(a){return xh("Caught error parsing JWT payload as JSON",a==null?void 0:a.toString()),null}}function H1(t){const e=Qg(t);return De(e,"internal-error"),De(typeof e.exp<"u","internal-error"),De(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Kc(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof gi&&Fk(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function Fk({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class qk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class X0{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Sc(this.lastLoginAt),this.creationTime=Sc(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Tf(t){var p;const e=t.auth,n=await t.getIdToken(),s=await Kc(t,_f(e,{idToken:n}));De(s==null?void 0:s.users.length,e,"internal-error");const a=s.users[0];t._notifyReloadListener(a);const i=(p=a.providerUserInfo)!=null&&p.length?OE(a.providerUserInfo):[],r=Gk(t.providerData,i),o=t.isAnonymous,u=!(t.email&&a.passwordHash)&&!(r!=null&&r.length),h=o?u:!1,d={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:r,metadata:new X0(a.createdAt,a.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function Hk(t){const e=Kn(t);await Tf(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Gk(t,e){return[...t.filter(s=>!e.some(a=>a.providerId===s.providerId)),...e]}function OE(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function Yk(t,e){const n=await ME(t,{},async()=>{const s=cu({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:a,apiKey:i}=t.config,r=await jE(t,a,"/v1/token",`key=${i}`),o=await t._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:o,body:s};return t.emulatorConfig&&uu(t.emulatorConfig.host)&&(u.credentials="include"),IE.fetch()(r,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Kk(t,e){return Mo(t,"POST","/v2/accounts:revokeToken",pd(t,e))}/**
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
 */class Yl{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){De(e.idToken,"internal-error"),De(typeof e.idToken<"u","internal-error"),De(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):H1(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){De(e.length!==0,"internal-error");const n=H1(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(De(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:a,expiresIn:i}=await Yk(e,n);this.updateTokensAndExpiration(s,a,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:a,expirationTime:i}=n,r=new Yl;return s&&(De(typeof s=="string","internal-error",{appName:e}),r.refreshToken=s),a&&(De(typeof a=="string","internal-error",{appName:e}),r.accessToken=a),i&&(De(typeof i=="number","internal-error",{appName:e}),r.expirationTime=i),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Yl,this.toJSON())}_performRefresh(){return Ja("not implemented")}}/**
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
 */function Si(t,e){De(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class fa{constructor({uid:e,auth:n,stsTokenManager:s,...a}){this.providerId="firebase",this.proactiveRefresh=new qk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new X0(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const n=await Kc(this,this.stsTokenManager.getToken(this.auth,e));return De(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return $k(this,e)}reload(){return Hk(this)}_assign(e){this!==e&&(De(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new fa({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){De(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Tf(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ha(this.auth.app))return Promise.reject(tr(this.auth));const e=await this.getIdToken();return await Kc(this,Bk(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,a=n.email??void 0,i=n.phoneNumber??void 0,r=n.photoURL??void 0,o=n.tenantId??void 0,u=n._redirectEventId??void 0,h=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:y,providerData:R,stsTokenManager:I}=n;De(p&&I,e,"internal-error");const O=Yl.fromJSON(this.name,I);De(typeof p=="string",e,"internal-error"),Si(s,e.name),Si(a,e.name),De(typeof g=="boolean",e,"internal-error"),De(typeof y=="boolean",e,"internal-error"),Si(i,e.name),Si(r,e.name),Si(o,e.name),Si(u,e.name),Si(h,e.name),Si(d,e.name);const x=new fa({uid:p,auth:e,email:a,emailVerified:g,displayName:s,isAnonymous:y,photoURL:r,phoneNumber:i,tenantId:o,stsTokenManager:O,createdAt:h,lastLoginAt:d});return R&&Array.isArray(R)&&(x.providerData=R.map(b=>({...b}))),u&&(x._redirectEventId=u),x}static async _fromIdTokenResponse(e,n,s=!1){const a=new Yl;a.updateFromServerResponse(n);const i=new fa({uid:n.localId,auth:e,stsTokenManager:a,isAnonymous:s});return await Tf(i),i}static async _fromGetAccountInfoResponse(e,n,s){const a=n.users[0];De(a.localId!==void 0,"internal-error");const i=a.providerUserInfo!==void 0?OE(a.providerUserInfo):[],r=!(a.email&&a.passwordHash)&&!(i!=null&&i.length),o=new Yl;o.updateFromIdToken(s);const u=new fa({uid:a.localId,auth:e,stsTokenManager:o,isAnonymous:r}),h={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:i,metadata:new X0(a.createdAt,a.lastLoginAt),isAnonymous:!(a.email&&a.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const G1=new Map;function Za(t){mi(t instanceof Function,"Expected a class definition");let e=G1.get(t);return e?(mi(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,G1.set(t,e),e)}/**
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
 */class VE{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}VE.type="NONE";const Y1=VE;/**
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
 */function _h(t,e,n){return`firebase:${t}:${e}:${n}`}class Kl{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:a,name:i}=this.auth;this.fullUserKey=_h(this.userKey,a.apiKey,i),this.fullPersistenceKey=_h("persistence",a.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await _f(this.auth,{idToken:e}).catch(()=>{});return n?fa._fromGetAccountInfoResponse(this.auth,n,e):null}return fa._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Kl(Za(Y1),e,s);const a=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=a[0]||Za(Y1);const r=_h(s,e.config.apiKey,e.name);let o=null;for(const h of n)try{const d=await h._get(r);if(d){let p;if(typeof d=="string"){const g=await _f(e,{idToken:d}).catch(()=>{});if(!g)break;p=await fa._fromGetAccountInfoResponse(e,g,d)}else p=fa._fromJSON(e,d);h!==i&&(o=p),i=h;break}}catch{}const u=a.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Kl(i,e,s):(i=u[0],o&&await i._set(r,o.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(r)}catch{}})),new Kl(i,e,s))}}/**
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
 */function K1(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(zE(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(PE(e))return"Firefox";if(e.includes("silk/"))return"Silk";if($E(e))return"Blackberry";if(FE(e))return"Webos";if(LE(e))return"Safari";if((e.includes("chrome/")||UE(e))&&!e.includes("edge/"))return"Chrome";if(BE(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function PE(t=is()){return/firefox\//i.test(t)}function LE(t=is()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function UE(t=is()){return/crios\//i.test(t)}function zE(t=is()){return/iemobile/i.test(t)}function BE(t=is()){return/android/i.test(t)}function $E(t=is()){return/blackberry/i.test(t)}function FE(t=is()){return/webos/i.test(t)}function Xg(t=is()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Qk(t=is()){var e;return Xg(t)&&!!((e=window.navigator)!=null&&e.standalone)}function Xk(){return $5()&&document.documentMode===10}function qE(t=is()){return Xg(t)||BE(t)||FE(t)||$E(t)||/windows phone/i.test(t)||zE(t)}/**
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
 */function HE(t,e=[]){let n;switch(t){case"Browser":n=K1(is());break;case"Worker":n=`${K1(is())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ao}/${s}`}/**
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
 */class Wk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((r,o)=>{try{const u=e(i);r(u)}catch(u){o(u)}});s.onAbort=n,this.queue.push(s);const a=this.queue.length-1;return()=>{this.queue[a]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const a of n)try{a()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function Jk(t,e={}){return Mo(t,"GET","/v2/passwordPolicy",pd(t,e))}/**
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
 */const Zk=6;class eI{constructor(e){var s;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Zk,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,a=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),a&&(n.meetsMaxPasswordLength=e.length<=a)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let a=0;a<e.length;a++)s=e.charAt(a),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,a,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=a)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class tI{constructor(e,n,s,a){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=a,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Q1(this),this.idTokenSubscription=new Q1(this),this.beforeStateQueue=new Wk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=CE,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=a.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Za(n)),this._initializationPromise=this.queue(async()=>{var s,a,i;if(!this._deleted&&(this.persistenceManager=await Kl.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((a=this._popupRedirectResolver)!=null&&a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await _f(this,{idToken:e}),s=await fa._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(ha(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=(i=this.redirectUser)==null?void 0:i._redirectEventId,o=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!r||r===o)&&(u!=null&&u.user)&&(s=u.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(r){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return De(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Tf(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Vk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ha(this.app))return Promise.reject(tr(this));const n=e?Kn(e):null;return n&&De(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&De(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ha(this.app)?Promise.reject(tr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ha(this.app)?Promise.reject(tr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Za(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Jk(this),n=new eI(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ou("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await Kk(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Za(e)||this._popupRedirectResolver;De(n,this,"argument-error"),this.redirectPersistenceManager=await Kl.create(this,[Za(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,a){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let r=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(De(o,this,"internal-error"),o.then(()=>{r||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,s,a);return()=>{r=!0,u()}}else{const u=e.addObserver(n);return()=>{r=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return De(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=HE(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var a;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((a=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:a.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var n;if(ha(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&Dk(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function gd(t){return Kn(t)}class Q1{constructor(e){this.auth=e,this.observer=null,this.addObserver=X5(n=>this.observer=n)}get next(){return De(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Wg={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function nI(t){Wg=t}function sI(t){return Wg.loadJS(t)}function aI(){return Wg.gapiScript}function iI(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function rI(t,e){const n=ug(t,"auth");if(n.isInitialized()){const a=n.getImmediate(),i=n.getOptions();if(rr(i,e??{}))return a;di(a,"already-initialized")}return n.initialize({options:e})}function lI(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Za);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function oI(t,e,n){const s=gd(t);De(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const a=!!(n!=null&&n.disableWarnings),i=GE(e),{host:r,port:o}=cI(e),u=o===null?"":`:${o}`,h={url:`${i}//${r}${u}/`},d=Object.freeze({host:r,port:o,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:a})});if(!s._canInitEmulator){De(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),De(rr(h,s.config.emulator)&&rr(d,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=h,s.emulatorConfig=d,s.settings.appVerificationDisabledForTesting=!0,uu(r)?$T(`${i}//${r}${u}`):a||uI()}function GE(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function cI(t){const e=GE(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",a=/^(\[[^\]]+\])(:|$)/.exec(s);if(a){const i=a[1];return{host:i,port:X1(s.substr(i.length+1))}}else{const[i,r]=s.split(":");return{host:i,port:X1(r)}}}function X1(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function uI(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class YE{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ja("not implemented")}_getIdTokenResponse(e){return Ja("not implemented")}_linkToIdToken(e,n){return Ja("not implemented")}_getReauthenticationResolver(e){return Ja("not implemented")}}/**
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
 */async function Ql(t,e){return DE(t,"POST","/v1/accounts:signInWithIdp",pd(t,e))}/**
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
 */const hI="http://localhost";class nl extends YE{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new nl(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):di("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:a,...i}=n;if(!s||!a)return null;const r=new nl(s,a);return r.idToken=i.idToken||void 0,r.accessToken=i.accessToken||void 0,r.secret=i.secret,r.nonce=i.nonce,r.pendingToken=i.pendingToken||null,r}_getIdTokenResponse(e){const n=this.buildRequest();return Ql(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Ql(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ql(e,n)}buildRequest(){const e={requestUri:hI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=cu(n)}return e}}/**
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
 */class KE{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class vu extends KE{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Ii extends vu{constructor(){super("facebook.com")}static credential(e){return nl._fromParams({providerId:Ii.PROVIDER_ID,signInMethod:Ii.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ii.credentialFromTaggedObject(e)}static credentialFromError(e){return Ii.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ii.credential(e.oauthAccessToken)}catch{return null}}}Ii.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ii.PROVIDER_ID="facebook.com";/**
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
 */class Mi extends vu{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return nl._fromParams({providerId:Mi.PROVIDER_ID,signInMethod:Mi.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Mi.credentialFromTaggedObject(e)}static credentialFromError(e){return Mi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Mi.credential(n,s)}catch{return null}}}Mi.GOOGLE_SIGN_IN_METHOD="google.com";Mi.PROVIDER_ID="google.com";/**
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
 */class Di extends vu{constructor(){super("github.com")}static credential(e){return nl._fromParams({providerId:Di.PROVIDER_ID,signInMethod:Di.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Di.credentialFromTaggedObject(e)}static credentialFromError(e){return Di.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Di.credential(e.oauthAccessToken)}catch{return null}}}Di.GITHUB_SIGN_IN_METHOD="github.com";Di.PROVIDER_ID="github.com";/**
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
 */class ji extends vu{constructor(){super("twitter.com")}static credential(e,n){return nl._fromParams({providerId:ji.PROVIDER_ID,signInMethod:ji.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ji.credentialFromTaggedObject(e)}static credentialFromError(e){return ji.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return ji.credential(n,s)}catch{return null}}}ji.TWITTER_SIGN_IN_METHOD="twitter.com";ji.PROVIDER_ID="twitter.com";/**
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
 */async function fI(t,e){return DE(t,"POST","/v1/accounts:signUp",pd(t,e))}/**
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
 */class dr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,a=!1){const i=await fa._fromIdTokenResponse(e,s,a),r=W1(s);return new dr({user:i,providerId:r,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const a=W1(s);return new dr({user:e,providerId:a,_tokenResponse:s,operationType:n})}}function W1(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function dI(t){var a;if(ha(t.app))return Promise.reject(tr(t));const e=gd(t);if(await e._initializationPromise,(a=e.currentUser)!=null&&a.isAnonymous)return new dr({user:e.currentUser,providerId:null,operationType:"signIn"});const n=await fI(e,{returnSecureToken:!0}),s=await dr._fromIdTokenResponse(e,"signIn",n,!0);return await e._updateCurrentUser(s.user),s}/**
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
 */class Ef extends gi{constructor(e,n,s,a){super(n.code,n.message),this.operationType=s,this.user=a,Object.setPrototypeOf(this,Ef.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,a){return new Ef(e,n,s,a)}}function QE(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ef._fromErrorAndOperation(t,i,e,s):i})}async function mI(t,e,n=!1){const s=await Kc(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return dr._forOperation(t,"link",s)}/**
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
 */async function pI(t,e,n=!1){const{auth:s}=t;if(ha(s.app))return Promise.reject(tr(s));const a="reauthenticate";try{const i=await Kc(t,QE(s,a,e,t),n);De(i.idToken,s,"internal-error");const r=Qg(i.idToken);De(r,s,"internal-error");const{sub:o}=r;return De(t.uid===o,s,"user-mismatch"),dr._forOperation(t,a,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&di(s,"user-mismatch"),i}}/**
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
 */async function gI(t,e,n=!1){if(ha(t.app))return Promise.reject(tr(t));const s="signIn",a=await QE(t,s,e),i=await dr._fromIdTokenResponse(t,s,a);return n||await t._updateCurrentUser(i.user),i}function yI(t,e,n,s){return Kn(t).onIdTokenChanged(e,n,s)}function vI(t,e,n){return Kn(t).beforeAuthStateChanged(e,n)}function bI(t,e,n,s){return Kn(t).onAuthStateChanged(e,n,s)}const Sf="__sak";/**
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
 */class XE{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Sf,"1"),this.storage.removeItem(Sf),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const xI=1e3,_I=10;class WE extends XE{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=qE(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),a=this.localCache[n];s!==a&&e(n,a,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((r,o,u)=>{this.notifyListeners(r,u)});return}const s=e.key;n?this.detachListener():this.stopPolling();const a=()=>{const r=this.storage.getItem(s);!n&&this.localCache[s]===r||this.notifyListeners(s,r)},i=this.storage.getItem(s);Xk()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(a,_I):a()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},xI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}WE.type="LOCAL";const TI=WE;/**
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
 */class JE extends XE{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}JE.type="SESSION";const ZE=JE;/**
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
 */function EI(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class yd{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(a=>a.isListeningto(e));if(n)return n;const s=new yd(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:a,data:i}=n.data,r=this.handlersMap[a];if(!(r!=null&&r.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:a});const o=Array.from(r).map(async h=>h(n.origin,i)),u=await EI(o);n.ports[0].postMessage({status:"done",eventId:s,eventType:a,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}yd.receivers=[];/**
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
 */function Jg(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class SI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const a=typeof MessageChannel<"u"?new MessageChannel:null;if(!a)throw new Error("connection_unavailable");let i,r;return new Promise((o,u)=>{const h=Jg("",20);a.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},s);r={messageChannel:a,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(g.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(r),a.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[a.port2])}).finally(()=>{r&&this.removeMessageHandler(r)})}}/**
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
 */function Da(){return window}function wI(t){Da().location.href=t}/**
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
 */function eS(){return typeof Da().WorkerGlobalScope<"u"&&typeof Da().importScripts=="function"}async function AI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function NI(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function RI(){return eS()?self:null}/**
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
 */const tS="firebaseLocalStorageDb",CI=1,wf="firebaseLocalStorage",nS="fbase_key";class bu{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function vd(t,e){return t.transaction([wf],e?"readwrite":"readonly").objectStore(wf)}function kI(){const t=indexedDB.deleteDatabase(tS);return new bu(t).toPromise()}function W0(){const t=indexedDB.open(tS,CI);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(wf,{keyPath:nS})}catch(a){n(a)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(wf)?e(s):(s.close(),await kI(),e(await W0()))})})}async function J1(t,e,n){const s=vd(t,!0).put({[nS]:e,value:n});return new bu(s).toPromise()}async function II(t,e){const n=vd(t,!1).get(e),s=await new bu(n).toPromise();return s===void 0?null:s.value}function Z1(t,e){const n=vd(t,!0).delete(e);return new bu(n).toPromise()}const MI=800,DI=3;class sS{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await W0(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>DI)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return eS()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=yd._getInstance(RI()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,s;if(this.activeServiceWorker=await AI(),!this.activeServiceWorker)return;this.sender=new SI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||NI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await W0();return await J1(e,Sf,"1"),await Z1(e,Sf),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>J1(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>II(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Z1(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(a=>{const i=vd(a,!1).getAll();return new bu(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:a,value:i}of e)s.add(a),JSON.stringify(this.localCache[a])!==JSON.stringify(i)&&(this.notifyListeners(a,i),n.push(a));for(const a of Object.keys(this.localCache))this.localCache[a]&&!s.has(a)&&(this.notifyListeners(a,null),n.push(a));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),MI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}sS.type="LOCAL";const jI=sS;new yu(3e4,6e4);/**
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
 */function OI(t,e){return e?Za(e):(De(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Zg extends YE{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ql(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ql(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ql(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function VI(t){return gI(t.auth,new Zg(t),t.bypassAuthState)}function PI(t){const{auth:e,user:n}=t;return De(n,e,"internal-error"),pI(n,new Zg(t),t.bypassAuthState)}async function LI(t){const{auth:e,user:n}=t;return De(n,e,"internal-error"),mI(n,new Zg(t),t.bypassAuthState)}/**
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
 */class aS{constructor(e,n,s,a,i=!1){this.auth=e,this.resolver=s,this.user=a,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:a,tenantId:i,error:r,type:o}=e;if(r){this.reject(r);return}const u={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:a||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return VI;case"linkViaPopup":case"linkViaRedirect":return LI;case"reauthViaPopup":case"reauthViaRedirect":return PI;default:di(this.auth,"internal-error")}}resolve(e){mi(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){mi(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const UI=new yu(2e3,1e4);class Ol extends aS{constructor(e,n,s,a,i){super(e,n,a,i),this.provider=s,this.authWindow=null,this.pollId=null,Ol.currentPopupAction&&Ol.currentPopupAction.cancel(),Ol.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return De(e,this.auth,"internal-error"),e}async onExecution(){mi(this.filter.length===1,"Popup operations only handle one event");const e=Jg();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ma(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ma(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ol.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if((s=(n=this.authWindow)==null?void 0:n.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ma(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,UI.get())};e()}}Ol.currentPopupAction=null;/**
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
 */const zI="pendingRedirect",Th=new Map;class BI extends aS{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Th.get(this.auth._key());if(!e){try{const s=await $I(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Th.set(this.auth._key(),e)}return this.bypassAuthState||Th.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function $I(t,e){const n=HI(e),s=qI(t);if(!await s._isAvailable())return!1;const a=await s._get(n)==="true";return await s._remove(n),a}function FI(t,e){Th.set(t._key(),e)}function qI(t){return Za(t._redirectPersistence)}function HI(t){return _h(zI,t.config.apiKey,t.name)}async function GI(t,e,n=!1){if(ha(t.app))return Promise.reject(tr(t));const s=gd(t),a=OI(s,e),r=await new BI(s,a,n).execute();return r&&!n&&(delete r.user._redirectEventId,await s._persistUserIfCurrent(r.user),await s._setRedirectUser(null,e)),r}/**
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
 */const YI=10*60*1e3;class KI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!QI(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!iS(e)){const a=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";n.onError(Ma(this.auth,a))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=YI&&this.cachedEventUids.clear(),this.cachedEventUids.has(eb(e))}saveEventToCache(e){this.cachedEventUids.add(eb(e)),this.lastProcessedEventTime=Date.now()}}function eb(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function iS({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function QI(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return iS(t);default:return!1}}/**
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
 */async function XI(t,e={}){return Mo(t,"GET","/v1/projects",e)}/**
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
 */const WI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,JI=/^https?/;async function ZI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await XI(t);for(const n of e)try{if(eM(n))return}catch{}di(t,"unauthorized-domain")}function eM(t){const e=Q0(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const r=new URL(t);return r.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&r.hostname===s}if(!JI.test(n))return!1;if(WI.test(t))return s===t;const a=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+a+"|"+a+")$","i").test(s)}/**
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
 */const tM=new yu(3e4,6e4);function tb(){const t=Da().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function nM(t){return new Promise((e,n)=>{var a,i,r;function s(){tb(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{tb(),n(Ma(t,"network-request-failed"))},timeout:tM.get()})}if((i=(a=Da().gapi)==null?void 0:a.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((r=Da().gapi)!=null&&r.load)s();else{const o=iI("iframefcb");return Da()[o]=()=>{gapi.load?s():n(Ma(t,"network-request-failed"))},sI(`${aI()}?onload=${o}`).catch(u=>n(u))}}).catch(e=>{throw Eh=null,e})}let Eh=null;function sM(t){return Eh=Eh||nM(t),Eh}/**
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
 */const aM=new yu(5e3,15e3),iM="__/auth/iframe",rM="emulator/auth/iframe",lM={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},oM=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function cM(t){const e=t.config;De(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Kg(e,rM):`https://${t.config.authDomain}/${iM}`,s={apiKey:e.apiKey,appName:t.name,v:Ao},a=oM.get(t.config.apiHost);a&&(s.eid=a);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${cu(s).slice(1)}`}async function uM(t){const e=await sM(t),n=Da().gapi;return De(n,t,"internal-error"),e.open({where:document.body,url:cM(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:lM,dontclear:!0},s=>new Promise(async(a,i)=>{await s.restyle({setHideOnLeave:!1});const r=Ma(t,"network-request-failed"),o=Da().setTimeout(()=>{i(r)},aM.get());function u(){Da().clearTimeout(o),a(s)}s.ping(u).then(u,()=>{i(r)})}))}/**
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
 */const hM={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},fM=500,dM=600,mM="_blank",pM="http://localhost";class nb{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function gM(t,e,n,s=fM,a=dM){const i=Math.max((window.screen.availHeight-a)/2,0).toString(),r=Math.max((window.screen.availWidth-s)/2,0).toString();let o="";const u={...hM,width:s.toString(),height:a.toString(),top:i,left:r},h=is().toLowerCase();n&&(o=UE(h)?mM:n),PE(h)&&(e=e||pM,u.scrollbars="yes");const d=Object.entries(u).reduce((g,[y,R])=>`${g}${y}=${R},`,"");if(Qk(h)&&o!=="_self")return yM(e||"",o),new nb(null);const p=window.open(e||"",o,d);De(p,t,"popup-blocked");try{p.focus()}catch{}return new nb(p)}function yM(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const vM="__/auth/handler",bM="emulator/auth/handler",xM=encodeURIComponent("fac");async function sb(t,e,n,s,a,i){De(t.config.authDomain,t,"auth-domain-config-required"),De(t.config.apiKey,t,"invalid-api-key");const r={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Ao,eventId:a};if(e instanceof KE){e.setDefaultLanguage(t.languageCode),r.providerId=e.providerId||"",Q5(e.getCustomParameters())||(r.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries(i||{}))r[d]=p}if(e instanceof vu){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(r.scopes=d.join(","))}t.tenantId&&(r.tid=t.tenantId);const o=r;for(const d of Object.keys(o))o[d]===void 0&&delete o[d];const u=await t._getAppCheckToken(),h=u?`#${xM}=${encodeURIComponent(u)}`:"";return`${_M(t)}?${cu(o).slice(1)}${h}`}function _M({config:t}){return t.emulator?Kg(t,bM):`https://${t.authDomain}/${vM}`}/**
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
 */const xm="webStorageSupport";class TM{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ZE,this._completeRedirectFn=GI,this._overrideRedirectResult=FI}async _openPopup(e,n,s,a){var r;mi((r=this.eventManagers[e._key()])==null?void 0:r.manager,"_initialize() not called before _openPopup()");const i=await sb(e,n,s,Q0(),a);return gM(e,i,Jg())}async _openRedirect(e,n,s,a){await this._originValidation(e);const i=await sb(e,n,s,Q0(),a);return wI(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:a,promise:i}=this.eventManagers[n];return a?Promise.resolve(a):(mi(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await uM(e),s=new KI(e);return n.register("authEvent",a=>(De(a==null?void 0:a.authEvent,e,"invalid-auth-event"),{status:s.onEvent(a.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(xm,{type:xm},a=>{var r;const i=(r=a==null?void 0:a[0])==null?void 0:r[xm];i!==void 0&&n(!!i),di(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=ZI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return qE()||LE()||Xg()}}const EM=TM;var ab="@firebase/auth",ib="1.13.0";/**
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
 */class SM{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){De(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function wM(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function AM(t){lo(new Wr("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),a=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:r,authDomain:o}=s.options;De(r&&!r.includes(":"),"invalid-api-key",{appName:s.name});const u={apiKey:r,authDomain:o,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:HE(t)},h=new tI(s,a,i,u);return lI(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),lo(new Wr("auth-internal",e=>{const n=gd(e.getProvider("auth").getImmediate());return(s=>new SM(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ji(ab,ib,wM(t)),Ji(ab,ib,"esm2020")}/**
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
 */const NM=5*60,RM=BT("authIdTokenMaxAge")||NM;let rb=null;const CM=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>RM)return;const a=n==null?void 0:n.token;rb!==a&&(rb=a,await fetch(t,{method:a?"POST":"DELETE",headers:a?{Authorization:`Bearer ${a}`}:{}}))};function kM(t=GT()){const e=ug(t,"auth");if(e.isInitialized())return e.getImmediate();const n=rI(t,{popupRedirectResolver:EM,persistence:[jI,TI,ZE]}),s=BT("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const r=CM(i.toString());vI(n,r,()=>r(n.currentUser)),yI(n,o=>r(o))}}const a=UT("auth");return a&&oI(n,`http://${a}`),n}function IM(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}nI({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=a=>{const i=Ma("internal-error");i.customData=a,n(i)},s.type="text/javascript",s.charset="UTF-8",IM().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});AM("Browser");const MM={apiKey:"AIzaSyAWUXxzuVCzJXlpz7NfRtVSgF9HvylLQX0",authDomain:"rrmgame-7df52.firebaseapp.com",projectId:"rrmgame-7df52",storageBucket:"rrmgame-7df52.firebasestorage.app",messagingSenderId:"975432671213",appId:"1:975432671213:web:7495a65b68a80559f811e4",measurementId:"G-JNBJM2HTP5"},rS=HT(MM),Or=mk(rS),lb=kM(rS);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DM=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),jM=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,s)=>s?s.toUpperCase():n.toLowerCase()),ob=t=>{const e=jM(t);return e.charAt(0).toUpperCase()+e.slice(1)},lS=(...t)=>t.filter((e,n,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===n).join(" ").trim(),OM=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var VM={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PM=k.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:s,className:a="",children:i,iconNode:r,...o},u)=>k.createElement("svg",{ref:u,...VM,width:e,height:e,stroke:t,strokeWidth:s?Number(n)*24/Number(e):n,className:lS("lucide",a),...!i&&!OM(o)&&{"aria-hidden":"true"},...o},[...r.map(([h,d])=>k.createElement(h,d)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zn=(t,e)=>{const n=k.forwardRef(({className:s,...a},i)=>k.createElement(PM,{ref:i,iconNode:e,className:lS(`lucide-${DM(ob(t))}`,`lucide-${t}`,s),...a}));return n.displayName=ob(t),n};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LM=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],UM=zn("arrow-down",LM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zM=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],BM=zn("arrow-right",zM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $M=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],FM=zn("arrow-up",$M);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qM=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],HM=zn("briefcase",qM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GM=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],J0=zn("chevron-right",GM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YM=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],Z0=zn("coins",YM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KM=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M16 8h.01",key:"cr5u4v"}],["path",{d:"M8 8h.01",key:"1e4136"}],["path",{d:"M8 16h.01",key:"18s6g9"}],["path",{d:"M16 16h.01",key:"1f9h7w"}],["path",{d:"M12 12h.01",key:"1mp3jc"}]],bd=zn("dice-5",KM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QM=[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]],XM=zn("flame",QM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WM=[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",key:"geh8rc"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"1fto5m"}],["path",{d:"m2 16 6 6",key:"1pfhp9"}],["circle",{cx:"16",cy:"9",r:"2.9",key:"1n0dlu"}],["circle",{cx:"6",cy:"5",r:"3",key:"151irh"}]],JM=zn("hand-coins",WM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZM=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Lr=zn("loader-circle",ZM);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e3=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],t3=zn("trending-down",e3);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n3=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],s3=zn("trending-up",n3);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a3=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],i3=zn("trophy",a3);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r3=[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]],l3=zn("tv",r3);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o3=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],c3=zn("users",o3);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u3=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],h3=zn("volume-2",u3);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f3=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],d3=zn("volume-x",f3);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m3=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],oS=zn("x",m3),cb=["ゲーマー","配信者","ギャンブラー","リリム","社畜","無職","お祈り中","底辺","億り人","錬金術師"],tn=50,vt=Object.freeze({NEUTRAL:"NEUTRAL",MOVE_FORWARD:"MOVE_FORWARD",MOVE_BACKWARD:"MOVE_BACKWARD",GAIN_MONEY:"GAIN_MONEY",LOSE_MONEY:"LOSE_MONEY",INCREASE_PON:"INCREASE_PON"}),Ea=7,ep=8,go=1500,p3=2600,g3=280,y3=go+g3,v3=go+p3,b3=15,Af=100,x3=[100,300,500,1e3],D={startingMoney:600,pon:{startMin:10,startMax:20,dailyGain:5,fireThreshold:30,deathThreshold:80,deathChance:.5,stream:{moneyMin:300,moneyMax:800,skillLoss:20},work:{penaltyMin:200,penaltyMax:500}},stream:{baseFailRate:.35,skillFailReduce:.002,minFailRate:.05,successMin:400,successMax:1800,chat:{virtueGainMin:3,virtueGainMax:9},game:{skillGainMin:15,skillGainMax:35}},work:{reward:1300,skillGain:0,virtueGain:3},living:{dailyCost:500},rimiru:{interestPercent:10,dailyGracesBefore:2,day8TurnsBefore:3},dice:{maxTurns:b3,slotsPerSugorokuTurn:3,shopCost:150,helpChance:.3,helpVirtueMin:22,helpVirtueMax:38,taxiChance:.25,taxiMenuAlwaysVisible:!0,taxiCost:450,taxiMoveMin:12,taxiMoveMax:18,taxiBaseTurns:1,taxiCongestThresh:70,taxiCongestChance:1,taxiCongestPon:10,virtueWaveThresh:100,virtueWavePonDelta:-5,splashRadius:3},slot:{skillBaseline:50,skillBlockSize:10,skillMissReducePerBlock:.015,skillToMid:.3,skillToAtari:.35,skillToSmall:.35,luckBaseline:50,luckRefSpan:50,luckAtariDrainAtLuck100:.02,luckSmallDrainAtLuck100:.03,luckToJp:.3,luckToBig:.7,heatTransferPerSpin:.015,heatWeightJp:1/15,heatWeightBig:3/15,heatWeightMid:5/15,heatWeightAtari:6/15,nearMissReachChance:.12,slipSymbolChance:.1},shrine:{cost:300,luckGain:20,virtueGain:2,ponReduce:10,amuletBaseRate:.2},sugorokuTiles:{neutralRatioMin:.3,neutralRatioMax:.4,moveForwardMin:1,moveForwardMax:3,moveBackwardMin:1,moveBackwardMax:2,gainMoneyMin:200,gainMoneyMax:500,loseMoneyMin:100,loseMoneyMax:300,ponIncreaseMin:10,ponIncreaseMax:25,maxChainSteps:8},dailySlot:{spinBet:300,spins:2,skillGainEverySpin:10,skillGainOnRole:10}},Ta={standard:{key:"standard",label:"スタンダード",emoji:"🎰",desc:"バランス型。まずはここから。",color:"text-amber-300",border:"border-amber-500/50 bg-amber-500/10",symbols:["7","BAR","🍒","⭐","🔔","💎"],baseRates:{jp:.005,big:.02,mid:.05,atari:.08,small:.145},basePayout:{miss:0,small:80,atari:150,mid:300,big:1e3,jackpot:3e3}}},rn={salaryman:{key:"salaryman",label:"ギャンブラーサラリーマン",emoji:"💼",desc:"技量+20でスタート。仕事の報酬+200G。配信報酬は0.8倍だが安定感がある。",color:"text-sky-300",border:"border-sky-500/60 bg-sky-500/10",skillBonus:20,workRewardBonus:200,streamMultiplier:.8,ponMultiplier:1,dailyLivingCost:500},student:{key:"student",label:"ギャンブル初心者な大学生",emoji:"🎓",desc:"運+10・技量-30。ビギナーズラックでスロットがやや有利。生活費は低めだが仕事収入は半分、PON発火時の資金ペナルティは軽め。配信は通常どおり。",color:"text-emerald-300",border:"border-emerald-500/55 bg-emerald-500/10",luckBonus:10,skillBonus:-30,streamMultiplier:1,ponMultiplier:1,workRewardMultiplier:.5,ponFireMoneyPenaltyMultiplier:.5,dailyLivingCost:300,startingMoney:800},vtuber:{key:"vtuber",label:"リリム",emoji:"🎭",desc:"技量-20・運+10・生活費300Gでスタート。PON上昇1.2倍。失言がバズるたびに配信報酬倍率が+0.5される。",color:"text-violet-300",border:"border-violet-500/60 bg-violet-500/10",skillBonus:-20,luckBonus:10,streamMultiplier:1,ponMultiplier:1.2,dailyLivingCost:300}},cS="闇月リリム",Nf="vtuber";function Rf(t){return typeof t=="string"&&t.trim()===cS}const _3=[{key:"luck",label:"運",color:"text-amber-400"},{key:"skill",label:"技量",color:"text-sky-400"},{key:"pon",label:"PON",color:"text-fuchsia-400"},{key:"virtue",label:"善行",color:"text-emerald-400"},{key:"livingCost",label:"生活費",color:"text-orange-300"},{key:"money",label:"資金",color:"text-yellow-300"}],ub=["/images/icon_rrm.png","/images/icon_rrm.webp","/images/icon_rrm.jpg","/images/icon_rrm.jpeg"],T3=["/images/icon_gambling_salaryman.png","/images/icon_gambling_salaryman.webp","/images/icon_gambling_salaryman.jpg","/images/icon_gambling_salaryman.jpeg"],E3=["/images/gambling_salaryman_noback.png","/images/gambling_salaryman_noback.webp","/images/gambling_salaryman_noback.jpg","/images/gambling_salaryman_noback.jpeg"],S3=["/images/icon_beginner_university_student.png","/images/icon_beginner_university_student.webp","/images/icon_beginner_university_student.jpg","/images/icon_beginner_university_student.jpeg"],w3=["/images/beginner_university_student_noback.png","/images/beginner_university_student_noback.webp","/images/beginner_university_student_noback.jpg","/images/beginner_university_student_noback.jpeg"],hb={normal:["/images/rrm_noback.png"],fallen:["/images/fell_down_rrm.png","/images/fell_down_rrm.webp"],stumble:["/images/stumble_rrm.png","/images/stumble_rrm.webp"],fell_down:["/images/fell_down_rrm.png","/images/fell_down_rrm.webp"]},A3={salaryman:T3,student:S3,vtuber:ub,ririm:ub},fb={salaryman:{normal:E3,fallen:[],stumble:["/images/stumble_gambling_salaryman.png","/images/stumble_gambling_salaryman.webp"],fell_down:["/images/fell_down_gambling_salaryman.png","/images/fell_down_gambling_salaryman.webp"]},student:{normal:w3,fallen:[],stumble:["/images/stumble_beginner_university_student.png","/images/stumble_beginner_university_student.webp"],fell_down:["/images/fell_down_beginner_university_student.png","/images/fell_down_beginner_university_student.webp"]},vtuber:hb,ririm:hb},db=["/images/city_seamless.png","/images/city_seamless.webp"],mb={pc:db,sp:db},tp="/images/taxi.png",N3={taxi_congestion:["/images/traffic_jam.png","/images/traffic_jam.webp","/images/traffic_jam.jpg","/images/traffic_jam.jpeg"],taxi_ride_clear:[tp]};function R3(t){const e=A3[t];return Array.isArray(e)?e:[]}function uS(t,e="normal"){const n=fb[t]??fb.salaryman,s=Array.isArray(n.normal)?n.normal:[],a=Array.isArray(n.fallen)?n.fallen:[];return e==="normal"?[...s]:e==="fallen"?[...a,...s]:e==="stumble"?[...Array.isArray(n.stumble)?n.stumble:[],...s]:e==="fell_down"?[...Array.isArray(n.fell_down)?n.fell_down:[],...a,...s]:[...s]}function ya(t){if(t==null||typeof t!="string")return t;const e=t.trim();if(/^https?:\/\//i.test(e)||e.startsWith("data:")||e.startsWith("blob:")||!e.startsWith("/images/"))return e;const n="/".replace(/\/?$/,"/");let s=e.replace(/^\//,"");return s=s.replace(/(\.)([^./\\]+)$/,(a,i,r)=>i+r.toLowerCase()),`${n}${s}`}function yo({characterType:t,imgClassName:e="",spanClassName:n="",imgStyle:s,spanStyle:a}){const i=rn[t]??rn.salaryman,r=R3(t),[o,u]=k.useState(0);return k.useEffect(()=>{u(0)},[t]),!r.length||o>=r.length?c.jsx("span",{className:n,style:a,children:i.emoji??"🙂"}):c.jsx("img",{src:ya(r[o]),alt:"",draggable:!1,className:`select-none ${e}`,style:s,onError:()=>u(h=>h+1)})}function _m({characterType:t,pose:e="normal",imgClassName:n="",spanClassName:s="",imgStyle:a,spanStyle:i}){const r=rn[t]??rn.salaryman,o=uS(t,e),[u,h]=k.useState(0);return k.useEffect(()=>{h(0)},[t,e]),!o.length||u>=o.length?c.jsx("span",{className:s,style:i,children:r.emoji??"🙂"}):c.jsx("img",{src:ya(o[u]),alt:"",draggable:!1,className:`select-none ${n}`,style:a,onError:()=>h(d=>d+1)})}function Qc({imgClassName:t="",imgStyle:e,emojiFallback:n="🚕"}){const[s,a]=k.useState(!1),i={}.VITE_TAXI_SRC_RAW==="1",r=i?tp:ya(tp);k.useEffect(()=>{a(!1)},[i]);const o={minWidth:48,minHeight:48,objectFit:"contain",boxSizing:"border-box",...e};return s?c.jsx("span",{className:`inline-flex min-h-[48px] min-w-[48px] select-none items-center justify-center ${t}`,style:e,title:"taxi image failed — check Network tab for 404 URL",children:n}):c.jsx("img",{src:r,alt:"",draggable:!1,className:`select-none ${t}`,style:o,onError:()=>{a(!0)}})}function hS(t){if(t==null||t==="")return NaN;if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="object"){if(typeof t.toMillis=="function")return t.toMillis();const n=t.seconds??t._seconds;if(typeof n=="number")return n*1e3+Math.floor((t.nanoseconds??t._nanoseconds??0)/1e6)}const e=Number(t);return Number.isFinite(e)?e:NaN}const At=(t,e=0,n=999999)=>Math.max(e,Math.min(n,t)),xn=t=>Math.round(Math.max(-999999999,Math.min(999999999,t))),$e=(t,e)=>Math.floor(Math.random()*(e-t+1))+t,da=(t,e=[])=>[...t.slice().reverse(),...e].slice(0,30),Tm=()=>{const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return Array.from({length:6},()=>t[$e(0,t.length-1)]).join("")},Qo=()=>cb[Math.floor(Math.random()*cb.length)]+Math.floor(10+Math.random()*89);function fS(t){return(rn[t]??rn.salaryman).dailyLivingCost??D.living.dailyCost}function Vl(t){var n;const e=(n=t==null?void 0:t.stats)==null?void 0:n.livingCost;return typeof e=="number"&&Number.isFinite(e)&&e>=0?e:fS(t==null?void 0:t.characterType)}function np(t){const e=rn[t]??rn.salaryman,n=e.luckBonus??0,s=e.skillBonus??0,a=e.virtueBonus??0,i=e.ponBonus??0,r=(e.dailyLivingCost??D.living.dailyCost)-300;return{luck:{min:n,max:10+n},skill:{min:30+s,max:55+s},virtue:{min:30+a,max:70+a},pon:{min:i,max:50+i},livingCost:{min:200+r,max:450+r}}}const C3=[10,18,26,34,42,50];function Sh(){return{luck:Math.floor(Math.random()*6),skill:Math.floor(Math.random()*6),virtue:Math.floor(Math.random()*6),pon:Math.floor(Math.random()*6)}}function dS(t){return Math.floor((t.luck+t.skill+t.virtue)/3)}function ey(t,e){const n=rn[e]??rn.salaryman,s=t.luck,a=t.skill,i=t.virtue,r=t.pon,o=s*2,u=30+a*5,h=20+C3[i],d=r*10,g=200+dS(t)*50,y=At(o+(n.luckBonus??0),0,999999),R=At(u+(n.skillBonus??0),0,2e3),I=At(h+(n.virtueBonus??0),0,999999),O=At(d+(n.ponBonus??0),0,999999),x=Math.max(50,g+((n.dailyLivingCost??D.living.dailyCost)-300));return{luck:y,skill:R,virtue:I,pon:O,livingCost:x}}function k3(t){return ey(Sh(),t??"salaryman")}function ai(t){if(!t||typeof t!="object")return null;const e=r=>{const o=Number(r);if(!Number.isFinite(o))return null;const u=Math.round(o);return u<0||u>5?null:u},n=e(t.luck),s=e(t.skill),a=e(t.virtue),i=e(t.pon);return n==null||s==null||a==null||i==null?null:{luck:n,skill:s,virtue:a,pon:i}}function I3(t){if(!t||typeof t!="object")return null;const e=Number(t.luck),n=Number(t.skill),s=Number(t.virtue),a=Number(t.pon),i=Number(t.livingCost);return[e,n,s,a,i].every(r=>Number.isFinite(r))?{luck:e,skill:n,virtue:s,pon:a,livingCost:i}:null}function mS(t){return t>=100?4:t>=70?3:t>=50?2:1}function M3(t){const e=mS(t.virtue),n=t.luck>=80,s=$e(e,6);if(n){const a=$e(e,6);return{value:s+a,rolls:[s,a],advantage:!0}}return{value:s,rolls:[s],advantage:!1}}const Em={jp:.01,big:.02,small:.02};function pS(t,e,n=0,s=null){const{baseRates:a}=e,i=D.slot;let r=a.jp,o=a.big,u=a.mid,h=a.atari,d=a.small,p=1-(r+o+u+h+d);const g=Math.max(0,t.skill-i.skillBaseline),y=g>=i.skillBlockSize?Math.floor(g/i.skillBlockSize):0,I=Math.max(0,t.luck-i.luckBaseline)/i.luckRefSpan;let O=0;const x=y*i.skillMissReducePerBlock;x>0&&p>0&&(O=Math.min(x,p),p-=O,u+=O*i.skillToMid,h+=O*i.skillToAtari,d+=O*i.skillToSmall);let b=0,N=0,V=0;if(I>0){const _=i.luckAtariDrainAtLuck100*I,E=i.luckSmallDrainAtLuck100*I;N=Math.min(_,h),V=Math.min(E,d),b=N+V,b>0&&(h-=N,d-=V,r+=b*i.luckToJp,o+=b*i.luckToBig)}let U=0;const W=n*i.heatTransferPerSpin;W>0&&p>0&&(U=Math.min(W,p),p-=U,r+=U*i.heatWeightJp,o+=U*i.heatWeightBig,u+=U*i.heatWeightMid,h+=U*i.heatWeightAtari);const S=r+o+u+h+d;if(p=Math.max(0,1-S),s==="student"){r+=Em.jp,o+=Em.big,d+=Em.small;const _=r+o+u+h+d;p=Math.max(0,1-_)}return{jp:r,big:o,mid:u,atari:h,small:d,miss:p,skillMissReduced:O,luckConverted:b,luckDrainAtari:N,luckDrainSmall:V,heatMissReduced:U,heat:n}}function gS(t){const e=Number(t)||0;return Math.max(10,15-Math.floor(e/20))}function wc(t){return 1+(Number(t)||0)*.2/100}function Sm(t,e){return Math.round(Number(t)*wc(e))}function D3(t,e){const n=Number(e);return n>0?Math.min(1,n*(1+(Number(t)||0)/100)):0}function j3(t,e){const n=t.jp+t.big+t.mid+t.atari+t.small;if(!(n>0))return"small";let s=e*n;return s<t.jp?"jackpot":(s-=t.jp,s<t.big?"big":(s-=t.big,s<t.mid?"mid":(s-=t.mid,s<t.atari?"atari":"small")))}function O3(t,e){const{machine:n,bp:s,sym:a,r:i,bet:r,machineKey:o,pay:u,pityCounterAfter:h,pityForced:d,maxPity:p}=e,g={r:i,bet:r,machineKey:o,pityCounterAfter:h,pityForced:d,maxPity:p};switch(t){case"miss":return{tier:"miss",payout:0,message:"ハズレ…",reels:V3(n),...g};case"jackpot":return{tier:"jackpot",payout:u(s.jackpot),message:"🎰 777 JACKPOT!! 超大当たり！",reels:[a[0],a[0],a[0]],...g};case"big":return{tier:"big",payout:u(s.big),message:"💎 大当たり！！",reels:["💎","💎","💎"],...g};case"mid":return{tier:"mid",payout:u(s.mid),message:"⭐ 中当たり！",reels:["⭐","⭐","⭐"],...g};case"atari":return{tier:"atari",payout:u(s.atari),message:"🔔 当たり！",reels:["🔔","🔔","🔔"],...g};default:return{tier:"small",payout:u(s.small),message:"🍒 小当たり",reels:["🍒","🍒","🍒"],...g}}}function V3(t){const e=(t==null?void 0:t.symbols)??[];if(!e.length)return["?","?","?"];if(e.length===1)return[e[0],e[0],e[0]];for(let r=0;r<64;r++){const o=e[$e(0,e.length-1)],u=e[$e(0,e.length-1)],h=e[$e(0,e.length-1)];if(!(o===u&&u===h))return[o,u,h]}const n=e[$e(0,e.length-1)],s=e.filter(r=>r!==n),a=s[$e(0,s.length-1)],i=e[$e(0,e.length-1)];return[n,i,a]}function yS(t,e=Af,n="standard",s=0,a=null,i=null){const r=Ta[n]??Ta.standard,{basePayout:o,symbols:u}=r,h=pS(t,r,s,a),d=(i==null?void 0:i.pityCounter)??0,p=gS(t==null?void 0:t.virtue),g=d>=p,y=e/Af,R=x=>Math.round(x*y);let I;if(g)I=j3(h,Math.random());else{const x=Math.random();let b=h.miss;x<b?I="miss":(b+=h.jp,x<b?I="jackpot":(b+=h.big,x<b?I="big":(b+=h.mid,x<b?I="mid":(b+=h.atari,I=x<b?"atari":"small"))))}const O=I==="miss"?d+1:0;return O3(I,{machine:r,bp:o,sym:u,r:h,bet:e,machineKey:n,pay:R,pityCounterAfter:O,pityForced:g,maxPity:p})}function P3(t,e){if(!Array.isArray(t)||t.length!==3)return{reachPossible:!1};const n=t[0],s=t[1],a=t[2];return n!==s?{reachPossible:!1}:{reachPossible:["jackpot","big","mid"].includes(e)||e==="miss"&&n!==a}}function L3(){return Math.random()<.5}function sp(t,e,n){const s=e.symbols;if(!s.length)return[t,t,t];let a=s.indexOf(t);a<0&&(a=0);const i=s.length,r=s[(a-1+i)%i],o=s[(a+1)%i],u=s[(a-2+i)%i],h=s[(a+2)%i],d=s[a],p=(n%3+3)%3;return p===0?[r,d,o]:p===1?[o,d,r]:[u,d,h]}function vS(t){const e=t.symbols;return[e[$e(0,e.length-1)],e[$e(0,e.length-1)],e[$e(0,e.length-1)]]}function bS(t,e){const n=e.symbols.filter(s=>s!==t);return n.length?n[$e(0,n.length-1)]:t}function U3(t,e,n,s=null){const a=rn[n]??rn.salaryman,i=xn(a.startingMoney??D.startingMoney);return s&&typeof s=="object"?{id:e,name:t,characterType:n,streamMultiplier:a.streamMultiplier,stats:{luck:At(s.luck,0,999999),skill:At(s.skill,0,2e3),pon:At(s.pon,0,999999),virtue:At(s.virtue,0,999999),livingCost:Math.max(50,Math.floor(Number(s.livingCost)||0)),money:i},position:0,moveTurns:0,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0,spinCount:0,slotNet:0,lastMoveEvent:"",lastSpinResult:null,alive:!0,skipTurns:0,amulets:0,slotHeat:0,slotPityCounter:0,debtStreakDaily:0,debtStreakDay8:0,pendingTaxiSteps:0}:{id:e,name:t,characterType:n,streamMultiplier:a.streamMultiplier,stats:{luck:At(0+(a.luckBonus??0),0,999999),skill:At(50+a.skillBonus,0,2e3),pon:$e(D.pon.startMin,D.pon.startMax),virtue:50,livingCost:fS(n),money:i},position:0,moveTurns:0,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0,spinCount:0,slotNet:0,lastMoveEvent:"",lastSpinResult:null,alive:!0,skipTurns:0,amulets:0,slotHeat:0,slotPityCounter:0,debtStreakDaily:0,debtStreakDay8:0,pendingTaxiSteps:0}}function pb(t,e){var r;const n=((r=t.stats)==null?void 0:r.money)??0;if(n>=0)return{...t,debtStreakDaily:0};let s=(t.debtStreakDaily??0)+1;const a=D.rimiru.dailyGracesBefore;let i=n;if(s>=a){const o=i,u=1+D.rimiru.interestPercent/100;i=Math.floor(o*u),s=0;const h=Math.round(Math.abs(o)*(D.rimiru.interestPercent/100));e.push(`🩸 闇金リリムからの督促：（連続赤字が${a}ターン）高利子+${D.rimiru.interestPercent}%——${o}G → ${i}G（増額+${h}G）`)}return{...t,stats:{...t.stats,money:xn(i)},debtStreakDaily:s}}function z3(t,e,n){return e.map((s,a)=>{var h;if(a!==t)return s;const i=((h=s.stats)==null?void 0:h.money)??0;if(i>=0)return{...s,debtStreakDay8:0};let r=(s.debtStreakDay8??0)+1;const o=D.rimiru.day8TurnsBefore;let u=i;if(r>=o){const d=u,p=1+D.rimiru.interestPercent/100;u=Math.floor(d*p),r=0;const g=Math.round(Math.abs(d)*(D.rimiru.interestPercent/100));n.push(`🩸 闇金リリム：『それが増えるんで』連続赤字${o}回の手終わりや—— ${s.name}の借金 ${d}G → ${u}G (+${g}G / +${D.rimiru.interestPercent}%)`)}return{...s,stats:{...s.stats,money:xn(u)},debtStreakDay8:r}})}function gb(t){return t.alive?t.movePhase==="moving"||t.movePhase==="goalLanding"?!1:t.movePhase==="waitingSlot"?(t.reservedSlotTurns??0)<=0:t.movePhase==="missed"?!0:t.movePhase==="arrived"?t.slotTurnsLeft<=0:!0:!0}function Ac(t){return t>=3e4?"SS":t>=15e3?"S":t>=8e3?"A":t>=4e3?"B":"C"}function xS(t,e){const n=e??t.players,s=[...n.filter(i=>i.alive).map(i=>`${i.name}: 最終資金 ${i.stats.money}G / ランク ${Ac(i.stats.money)}`),"━━━ 8日目終了！全員完了 ━━━","━━━ 最終結果 ───"],a={...t,players:n,gamePhase:"results",subPhase:"daily",log:da(s,t.log)};return delete a.finalBattleStartedAt,delete a.finalBattleEntry,a}function B3(t){const e=t.slice();for(let n=e.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1)),a=e[n];e[n]=e[s],e[s]=a}return e}function $3(){const t=D.sugorokuTiles,e=Array.from({length:tn+1},()=>({kind:vt.NEUTRAL})),n=tn-1,s=Math.max(0,t.neutralRatioMax-t.neutralRatioMin),a=t.neutralRatioMin+Math.random()*s;let i=Math.round(n*a);i=Math.max(0,Math.min(n,i));const r=[];for(let d=0;d<i;d++)r.push(vt.NEUTRAL);const o=[vt.MOVE_FORWARD,vt.MOVE_BACKWARD,vt.GAIN_MONEY,vt.LOSE_MONEY,vt.INCREASE_PON];for(;r.length<n;)r.push(o[$e(0,o.length-1)]);B3(r);const u=d=>{switch(d){case vt.MOVE_FORWARD:return $e(t.moveForwardMin,t.moveForwardMax);case vt.MOVE_BACKWARD:return $e(t.moveBackwardMin,t.moveBackwardMax);case vt.GAIN_MONEY:return $e(t.gainMoneyMin,t.gainMoneyMax);case vt.LOSE_MONEY:return $e(t.loseMoneyMin,t.loseMoneyMax);case vt.INCREASE_PON:return $e(t.ponIncreaseMin,t.ponIncreaseMax);default:return 0}};let h=0;for(let d=1;d<=tn-1;d++){const p=r[h++];p===vt.NEUTRAL?e[d]={kind:p}:e[d]={kind:p,value:u(p)}}return e}function _S(t){const e=tn+1,n=t==null?void 0:t.sugorokuTileEffects;return Array.isArray(n)&&n.length===e?t:{...t,sugorokuTileEffects:$3()}}function F3(t){const n=`${t.players[0].name}の移動ターン（T1 / ${tn}マス先へ！）`,s="━━━ 8日目！全員で交互に移動＆スロット ━━━",a={..._S(t),gamePhase:"playing",subPhase:"day8",aidAvailable:Math.random()<D.dice.helpChance,taxiAvailable:Math.random()<D.dice.taxiChance,lastDiceRolls:[],recentPonEvent:null,showSpinResult:!1,displayReels:["?","?","?"]};return delete a.finalBattleStartedAt,delete a.finalBattleEntry,a.log=da([n,s],t.log),a}function q3(t){const e=t.map(s=>{const a=s.character??"salaryman",i=ai(s.initialRolls),r=I3(s.initialStats);let o=null;return i?o=ey(i,a):r?o=r:o=k3(a),U3(s.name,s.id,a,o)}),n=[`${e[0].name}のターン（1日目）`,`━━━ ゲーム開始！${e.length===1?"ソロ":`${e.length}人`}プレイ ━━━`,...e.map(s=>{const a=rn[s.characterType],i=Vl(s);return`${s.name}(${(a==null?void 0:a.emoji)??""}${(a==null?void 0:a.label)??""}): PON=${s.stats.pon} 運=${s.stats.luck} 技量=${s.stats.skill} 善行=${s.stats.virtue} 生活費=${i}G`})];return{players:e,currentDay:1,currentPlayerIdx:0,subPhase:"daily",gamePhase:"playing",log:n,aidAvailable:!1,taxiAvailable:!1,recentPonEvent:null,gameOverMsg:"",showSpinResult:!1,lastDiceRolls:[],displayReels:["?","?","?"]}}function yb(t,e,n){const s=e.length,a=t.currentPlayerIdx+1;let i=[],r={};if(a>=s){const o=t.currentDay+1;if(o>Ea){const u=Date.now();i=["育成フェーズ、終幕――いま、参道の向こうに決戦が待つ。","── 【決戦の日】 ──"],r={currentDay:o,currentPlayerIdx:0,subPhase:"finalBattle",gamePhase:"finalBattle",finalBattleStartedAt:u,finalBattleEntry:"preDay8"}}else i=[`${e[0].name}のターン`,`━━━ ${o}日目 開始 ━━━`],r={currentDay:o,currentPlayerIdx:0}}else i=[`${e[a].name}のターン（${t.currentDay}日目）`],r={currentPlayerIdx:a};return{...t,...r,players:e,log:da([...n,...i],t.log)}}function Vr(t,e,n){const s=Math.max(1,D.dice.slotsPerSugorokuTurn),a=t.currentPlayerIdx,i=e[a],r=(i==null?void 0:i.slotTurnsLeft)??0,o=(i==null?void 0:i.slotPullsThisSeat)??0;if((i==null?void 0:i.movePhase)==="arrived"&&r>0&&o<s)return{...t,players:e,showSpinResult:!1,displayReels:["?","?","?"],log:da(n,t.log)};let u=e;(i==null?void 0:i.movePhase)==="arrived"&&(u=e.map((O,x)=>x!==a?O:{...O,moveTurns:(O.moveTurns??0)+1}));const h=[];let d=z3(t.currentPlayerIdx,u,h);const p=[...n,...h];if(d=d.map((O,x)=>x!==t.currentPlayerIdx?O:{...O,slotPullsThisSeat:0}),d.every(gb)){const O={...t,players:d,log:da(p,t.log)};return xS(O,d)}const g=d.length;let y=(t.currentPlayerIdx+1)%g;for(let O=0;O<g&&gb(d[y]);O++)y=(y+1)%g;const R=d[y];let I;return R.movePhase==="arrived"?I=`${R.name}のスロットターン（残り${R.slotTurnsLeft}回 / 資金${R.stats.money}G）`:R.movePhase==="waitingSlot"?I=`${R.name}のターン（ゴール到着済み・スロット${R.reservedSlotTurns??0}ターンブンを開始できます）`:I=`${R.name}の移動ターン（T${R.moveTurns+1} / ${R.position}/${tn}マス）`,{...t,players:d,currentPlayerIdx:y,aidAvailable:Math.random()<D.dice.helpChance,taxiAvailable:Math.random()<D.dice.taxiChance,lastDiceRolls:[],showSpinResult:!1,displayReels:["?","?","?"],log:da([...p,I],t.log)}}function Wu(t,e,n,s,a){const i=D.dice.virtueWaveThresh;if(e<i&&n>=i){const r=D.dice.virtueWavePonDelta,o=s.map(u=>({...u,stats:{...u.stats,pon:At(u.stats.pon+r,0)}}));return a.push(`🌟 ${t.name}の徳が高すぎて全員の心が洗われた！全員PON${r}`),o}return s}function ap(t,e,n){const s=e[t],a=D.dice.splashRadius;return e.map((i,r)=>r===t||!i.alive||i.movePhase!=="moving"||Math.abs(i.position-s.position)>a?i:(n.push(`💥 巻き添え！${i.name}（${i.position}マス付近）→ 次ターン1回休み`),{...i,skipTurns:(i.skipTurns||0)+1}))}function H3(t,e,n,s,a){const i=D.sugorokuTiles;let r=Math.max(0,Math.min(tn,e));const o={...n},u=[],h=(y,R)=>{a.push(y),R&&u.push(R)};if(r<=0||r>=tn)return{finalPos:r,stats:o,popupTitles:u};const d=t[r],p=(d==null?void 0:d.kind)??vt.NEUTRAL;if(p===vt.NEUTRAL)return{finalPos:r,stats:o,popupTitles:u};const g=typeof(d==null?void 0:d.value)=="number"&&Number.isFinite(d.value)?d.value:null;switch(p){case vt.MOVE_FORWARD:{const y=g??$e(i.moveForwardMin,i.moveForwardMax);h(`  🔰 マス効果 (${r})：進行マスで +${y} 進む`,`Forward +${y} steps (+${y}マス)`),r=Math.min(tn,r+y);break}case vt.MOVE_BACKWARD:{const y=g??$e(i.moveBackwardMin,i.moveBackwardMax);h(`  🔰 マス効果 (${r})：転がり坂で −${y} 戻る`,`Back −${y} steps (−${y}マス)`),r=Math.max(0,r-y);break}case vt.GAIN_MONEY:{const y=g??$e(i.gainMoneyMin,i.gainMoneyMax);o.money=xn(o.money+y),h(`  🔰 マス効果 (${r})：ひろい金で +${y}G→${o.money}G`,`+${y}G`);break}case vt.LOSE_MONEY:{const y=g??$e(i.loseMoneyMin,i.loseMoneyMax);o.money=xn(o.money-y),h(`  🔰 マス効果 (${r})：落とし穴で −${y}G→${o.money}G`,`−${y}G`);break}case vt.INCREASE_PON:{const y=g??$e(i.ponIncreaseMin,i.ponIncreaseMax);o.pon=At(o.pon+y),h(`  🔰 マス効果 (${r})：炎上予約で +PON ${y}%→${o.pon}`,`Fire +${y} PON`);break}}return{finalPos:r,stats:o,popupTitles:u}}function vb(t,e,n,s,a,i={}){const r=!!i.ponSplashDamage,o=_S(t),u=o.sugorokuTileEffects,h=t.players.map((I,O)=>O===e?{...I,stats:{...s},position:n}:{...I}),d=r?ap(e,h,a):h,p=d[e],g=H3(u,n,{...p.stats},p.name,a),y=d.map((I,O)=>O===e?{...I,stats:g.stats,position:g.finalPos}:I),R=g.popupTitles.length>0?{title:"Tile effect / マス効果",lines:g.popupTitles}:null;return{gsWithTiles:o,players:y,tileToast:R}}function G3(t){const e=Math.min(1,Math.max(0,t));return e<.5?4*e*e*e:1-(-2*e+2)**3/2}function ic(t){const n=2e3+Math.abs(t)*55;return Math.round(Math.min(3200,Math.max(2200,n)))}const Y3=20,K3=300;function wm(t,e){const n=e-t,s=Math.abs(n),a=Math.min(s,Y3),r=s>6?110:360;return a*r+K3}function Q3(t,e){return t+e/2}function X3(t,e,n,s){const a=e-t,i=Math.max(0,s);if(Math.abs(a)<1e-9)return{jamMid:t,firstLegMs:i,secondLegMs:0};const r=Q3(t,n);let o=r;a>0?o=Math.min(e,Math.max(t,r)):o=Math.max(e,Math.min(t,r));const u=(o-t)/a,h=Math.max(120,Math.round(i*u)),d=Math.round(i*(1-u));return{jamMid:o,firstLegMs:h,secondLegMs:Math.max(0,d)}}function W3(t,e,n=!1){return n&&t>=e?{icon:"⛩️",bg:"bg-indigo-950/95",border:"border-violet-300/70",text:"text-violet-100",shadow:"0 5px 0 #1e1b4b, 0 8px 16px rgba(0,0,0,0.65)",glow:"0 0 28px rgba(167,139,250,0.55)"}:t<=0?{icon:"🚀",bg:"bg-emerald-800/90",border:"border-emerald-400/70",text:"text-emerald-200",shadow:"0 5px 0 #064e3b, 0 7px 10px rgba(0,0,0,0.5)",glow:"0 0 14px rgba(52,211,153,0.35)"}:t>=e?{icon:"🏆",bg:"bg-amber-700/90",border:"border-amber-300/80",text:"text-amber-100",shadow:"0 5px 0 #78350f, 0 7px 10px rgba(0,0,0,0.5)",glow:"0 0 18px rgba(251,191,36,0.5)"}:t%10===0?{icon:"⭐",bg:"bg-sky-800/80",border:"border-sky-400/60",text:"text-sky-200",shadow:"0 4px 0 #0c4a6e, 0 6px 8px rgba(0,0,0,0.45)",glow:"0 0 12px rgba(56,189,248,0.3)"}:t%7===0?{icon:"🎲",bg:"bg-violet-900/80",border:"border-violet-400/55",text:"text-violet-300",shadow:"0 4px 0 #3b0764, 0 6px 8px rgba(0,0,0,0.4)",glow:null}:t%5===0?{icon:"✦",bg:"bg-slate-700/90",border:"border-slate-400/40",text:"text-slate-300",shadow:"0 3px 0 #1e293b, 0 5px 7px rgba(0,0,0,0.35)",glow:null}:{icon:null,bg:"bg-slate-800/95",border:"border-slate-600/50",text:"text-slate-400",shadow:"0 3px 0 #0f172a, 0 4px 6px rgba(0,0,0,0.3)",glow:null}}const bb="(min-width: 768px)";function J3(t){return`url('${String(t).replace(/\\/g,"/").replace(/'/g,"\\'")}')`}function Z3({className:t,scrollPx:e=0,scrollMultiplier:n=1,traveling:s=!1}){const[a,i]=k.useState(()=>typeof window<"u"&&window.matchMedia(bb).matches);k.useEffect(()=>{const R=window.matchMedia(bb),I=()=>i(R.matches);return I(),R.addEventListener("change",I),()=>R.removeEventListener("change",I)},[]);const r=k.useMemo(()=>{const R=mb.pc??[],I=mb.sp??[];return a?[...R,...I]:[...I,...R]},[a]),[o,u]=k.useState(0);k.useEffect(()=>{u(0)},[a]);const h=t??"pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl";if(!r.length||o>=r.length)return c.jsx("div",{className:h,"aria-hidden":!0});const d=ya(r[o]),p=J3(d),g=Number.isFinite(n)?n:1,y=e*g;return c.jsxs("div",{className:h,"aria-hidden":!0,children:[c.jsx("img",{src:d,alt:"",className:"pointer-events-none absolute h-0 w-0 opacity-0",onError:()=>u(R=>R+1)}),c.jsx("div",{className:"pointer-events-none absolute inset-0 sugoroku-seamless-bg",style:{backgroundImage:p,backgroundRepeat:"repeat-y",backgroundSize:"100% auto",backgroundPosition:`center ${y}px`,filter:"none",transition:"filter 0.35s ease-out",willChange:s?"background-position, filter":"auto"}})]})}function eD({effect:t,sizePx:e=13}){if(!t||t.kind===vt.NEUTRAL)return null;const n=Math.max(8,e),s="anim-tile-effect-float pointer-events-none";switch(t.kind){case vt.MOVE_FORWARD:return c.jsx("span",{className:s,title:"進むマス",children:c.jsx(FM,{className:"text-sky-300","aria-hidden":!0,strokeWidth:2.75,size:n})});case vt.MOVE_BACKWARD:return c.jsx("span",{className:s,title:"戻りマス",children:c.jsx(UM,{className:"text-rose-400","aria-hidden":!0,strokeWidth:2.75,size:n})});case vt.GAIN_MONEY:return c.jsx("span",{className:s,title:"増資マス",children:c.jsx(Z0,{className:"text-amber-300","aria-hidden":!0,strokeWidth:2.35,size:n})});case vt.LOSE_MONEY:return c.jsx("span",{className:s,title:"出費マス",children:c.jsx(Z0,{className:"text-slate-500 opacity-95","aria-hidden":!0,strokeWidth:2.35,size:n})});case vt.INCREASE_PON:return c.jsx("span",{className:s,title:"燃えマス",children:c.jsx(XM,{className:"text-orange-400","aria-hidden":!0,strokeWidth:2.35,size:n})});default:return null}}function xb({player:t}){const e=(t==null?void 0:t.pendingTaxiSteps)??0;return e<=0||!t?null:c.jsx("span",{className:"pointer-events-none absolute bottom-full left-1/2 z-[38] mb-0.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-orange-400/90 bg-orange-950/95 px-[5px] py-[2px] text-[9px] font-black leading-none text-orange-100 animate-pulse",title:`タクシー渋滞：残り${e}マス`,children:"🚗渋滞中…"})}const tD=new Set(["ride","trafficJam","drive","driveBeforeJam","driveAfterJam"]);function nD({characterType:t,taxiPhase:e}){if(!t||e!=="arrive")return null;const n="pointer-events-none relative shrink-0 flex w-[min(216px,56vw)] max-w-[240px] flex-col items-center",s=c.jsxs("div",{className:"relative w-full",children:[c.jsx(Qc,{imgClassName:"relative z-0 block w-full object-contain opacity-100"}),null]});return c.jsx("div",{className:`${n} anim-taxi-arrive-exit-wrapper`,children:c.jsx("div",{className:"relative w-full anim-taxi-arrive-park-inner",children:c.jsx("div",{className:"relative w-full",children:s})})})}const sD=10,aD=-100;function iD({deco:t,iconPx:e,tileW:n}){const[s,a]=k.useState(!1),i=n*sD;return s?c.jsx("span",{style:{fontSize:`${e}px`},className:`leading-none ${t.text}`,children:t.icon}):c.jsx("div",{className:"absolute left-1/2 top-full z-[5] pointer-events-none opacity-100",style:{width:i,height:i,transform:`translate(-50%, ${aD}px)`},children:c.jsx("img",{src:ya("/images/slotRirimu.png"),alt:"",draggable:!1,className:"h-full w-full object-contain select-none opacity-100",onError:()=>a(!0)})})}function rD({tileW:t}){const e=Math.min(300,Math.max(Math.round(t*1.65),t+36));return c.jsx("div",{className:"pointer-events-none mb-1.5 shrink-0 z-[4] mx-auto rounded-md border-2 border-amber-950/50 shadow-[0_0_18px_rgba(250,204,21,0.4)]",style:{width:e,height:14,backgroundImage:"repeating-linear-gradient(90deg, #171717 0px, #171717 7px, #fafaf9 7px, #fafaf9 14px)"},"aria-hidden":!0})}const lD=300,oD=52,cD=72,Am=12,uD=.38;function _b(t){return!t||typeof t!="string"?t:t.replace(/\/(\d{2,3})\b/g,"")}function hD(t,e,n,s){const a=n+s;return e>=0?(t-Math.floor(t+1e-9))*a:-(Math.ceil(t-1e-9)-t)*a}function wh({players:t,viewPos:e,boardGoal:n,isDiceRolling:s,taxiPhase:a,pieceHopping:i,currentPlayer:r,visualTheme:o="default",tileEffects:u=null,reportHopAnimationComplete:h=!1,onHopAnimationComplete:d,taxiDriveCongested:p=!1,taxiDriveEndPos:g=null,taxiDriveSegmentMs:y=null,taxiJamMidPos:R=null,taxiDriveDurationMs:I=2600}){const x=o==="nightShrine",[b,N]=k.useState(e),[V,U]=k.useState({forward:!0,msPerStep:360,fast:!1}),W=k.useRef(null),[S,_]=k.useState(480),[E,A]=k.useState(58),w=k.useRef(e),M=k.useRef(1),T=k.useRef(null),ue=k.useRef(null),me=k.useRef(null),X=k.useRef(d);X.current=d,k.useLayoutEffect(()=>{const ve=W.current;if(!ve)return;const ge=()=>{const Xe=ve.clientHeight||480,zt=ve.clientWidth||360;_(Xe),A(Math.min(cD,Math.max(oD,Math.round(zt*.22))))};ge();const xe=new ResizeObserver(ge);return xe.observe(ve),()=>xe.disconnect()},[]),k.useEffect(()=>{if(e===w.current||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")return;const ve=w.current,ge=e,xe=ge-ve;if(a&&(a==="taxiHail"||a==="enter"||a==="boarding"||a==="ride"||a==="trafficJam"||a==="arrive")){T.current&&(cancelAnimationFrame(T.current),T.current=null),me.current&&(clearTimeout(me.current),me.current=null),M.current=xe>=0?1:-1,w.current=e,N(e),U({forward:xe>=0,msPerStep:360,fast:!1});return}const zt=Math.min(Math.abs(xe),20),ee=xe>0?1:-1;if(M.current=ee,w.current=e,T.current&&(cancelAnimationFrame(T.current),T.current=null),me.current&&(clearTimeout(me.current),me.current=null),zt===0){N(ge);return}const q=Math.abs(xe)>6,he=q?110:360,Ke=zt*he;U({forward:ee>0,msPerStep:he,fast:q});const ye=performance.now(),te=Ye=>{const _t=Math.min(1,Math.max(0,(Ye-ye)/Ke)),Ot=ve+xe*_t;N(Ot),_t<1?T.current=requestAnimationFrame(te):(T.current=null,N(ge),h&&zt>0&&(me.current=setTimeout(()=>{var cn;(cn=X.current)==null||cn.call(X)},lD)))};return T.current=requestAnimationFrame(te),()=>{T.current&&cancelAnimationFrame(T.current),me.current&&clearTimeout(me.current)}},[e,h,a]),k.useEffect(()=>{if(!(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")||g==null)return;T.current&&(cancelAnimationFrame(T.current),T.current=null),me.current&&(clearTimeout(me.current),me.current=null);const ge=w.current,xe=g,Xe=y??I,zt=Xe>0?Xe:ic(Math.abs(xe-ge));let ee=xe;a==="driveBeforeJam"&&R!=null?ee=R:a==="driveAfterJam"&&(ee=xe),M.current=xe>=ge?1:-1;const q=a==="driveBeforeJam"||(a==="drive"||a==="driveAfterJam")&&!p;if(U({forward:xe>=ge,msPerStep:110,fast:q}),Math.abs(ee-ge)<1e-9){N(ee),w.current=ee;return}N(ge);const he=performance.now(),Ke=ye=>{const te=Math.min(1,Math.max(0,(ye-he)/zt)),Ye=ge+(ee-ge)*G3(te);N(Ye),te<1?ue.current=requestAnimationFrame(Ke):(ue.current=null,N(ee),w.current=ee)};return ue.current=requestAnimationFrame(Ke),()=>{ue.current&&(cancelAnimationFrame(ue.current),ue.current=null)}},[a,g,I,y,R,p]);const ie=E,se=ie+Am,pe=traveling?hD(b,M.current,ie,Am):0,Se=Math.floor(b+1e-9),Qe=Math.min(n,Se+6),ht=[];for(let ve=0;ve<=Qe;ve++)ht.push({pos:ve});const Dt={};t.forEach(ve=>{ve.alive&&ve.id!==(r==null?void 0:r.id)&&(Dt[ve.position]||(Dt[ve.position]=[]),Dt[ve.position].push(ve))});const Ue=Math.round(ie*.48),rt=Math.max(10,Math.round(ie*.26)),xt=b*se+ie/2,$=S*uD-xt,ae=-b*se;let Y=1;(a==="enter"||a==="boarding")&&(Y=1.15),a==="ride"&&(Y=2),a==="trafficJam"&&(Y=.06),(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||a==="arrive")&&(Y=1);const oe=((r==null?void 0:r.pendingTaxiSteps)??0)>0&&a==null,Ae=a!=null&&tD.has(a)||oe,qe=(a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam")&&!p,Ne=a==="enter"||a==="boarding",ze=a==="ride"||a==="trafficJam"||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||oe,on=a==="arrive",jt=x?"linear-gradient(to bottom, #010118 0%, #09092e 42%, #0e0e46 100%)":"linear-gradient(to bottom, #020617 0%, #0f172a 55%, #1e293b 100%)",ot=traveling||i,Nn=Math.ceil(Math.abs(e-b)-1e-9);return c.jsxs("div",{className:`relative flex min-h-0 w-full flex-col overflow-visible rounded-xl ${x?"final-battle-night":""}`,style:{background:jt,height:"100%",filter:a==="arrive"?"brightness(0.9) saturate(0.95)":void 0,transition:"filter 0.35s ease-out"},children:[c.jsx(Z3,{scrollPx:ae,scrollMultiplier:Y,traveling:traveling||qe,fast:!!(V.fast&&traveling)||qe}),c.jsx("div",{className:`absolute top-0 left-1/2 -translate-x-1/2 w-52 h-16 rounded-full pointer-events-none z-[1]
        ${x?"":"opacity-[0.35]"}`,style:{background:x?"radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 72%)":"radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)"}}),x&&c.jsxs(c.Fragment,{children:[c.jsx("div",{className:"pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light opacity-90",style:{background:"radial-gradient(ellipse 120% 80% at 50% 18%, rgba(79,70,229,0.25) 0%, transparent 55%)"}}),c.jsx("div",{className:"pointer-events-none absolute inset-0 z-[2] opacity-[0.35]",style:{background:"repeating-linear-gradient(100deg, transparent, transparent 5px, rgba(148,163,184,0.06) 5px, rgba(148,163,184,0.06) 10px)",maskImage:"linear-gradient(to bottom, transparent, black 35%)"}}),c.jsx("div",{className:"pointer-events-none absolute inset-x-0 bottom-0 h-[55%] z-[3] opacity-50",style:{background:"linear-gradient(to top, rgba(2,6,23,0.92), transparent)"}}),Array.from({length:22},(ve,ge)=>c.jsx("span",{className:"pointer-events-none absolute rounded-full anim-cold-spark z-[4]",style:{left:`${ge*47%100}%`,bottom:"-4%",width:2+ge%4,height:2+ge%4,background:ge%3===0?"rgba(199,210,254,0.95)":"rgba(165,243,252,0.85)",boxShadow:"0 0 6px rgba(191,219,254,0.9)",animationDuration:`${4.2+ge%7*.35}s`,animationDelay:`${ge%11*.28}s`}},ge))]}),traveling&&Nn>0&&!a&&c.jsxs("div",{className:"absolute top-2 right-3 z-10 text-[11px] font-bold text-cyan-300/80 bg-slate-900/60 px-2 py-0.5 rounded-full pointer-events-none",children:["残り",Nn,"マス..."]}),c.jsx("div",{ref:W,className:`relative z-10 flex min-h-0 flex-1 flex-col overflow-visible w-full pt-2 pb-3 ${s&&a!=="taxiHail"&&!traveling&&!i?"opacity-75":""}`,children:c.jsx("div",{className:"relative mx-auto flex w-full max-w-[92vw] flex-col items-center overflow-visible px-3",style:{transform:`translateY(${$}px)`,transition:traveling?"none":"transform 0.4s linear",willChange:traveling?"transform":"auto"},children:ht.map(({pos:ve},ge)=>{const xe=W3(ve,n,x),Xe=ve===Se,zt=ve<Se,ee=Dt[ve]??[],q=Array.isArray(u)?u[ve]:null,he=q&&q.kind!==vt.NEUTRAL&&ve>0&&ve<n,Ke=he&&(q.kind===vt.MOVE_BACKWARD||q.kind===vt.LOSE_MONEY||q.kind===vt.INCREASE_PON),ye=_b(xe.bg),te=_b(xe.border),_t=ge===ht.length-1?0:Am,Ot=zt&&!Ke&&ve!==n?"brightness-[0.88] saturate-[0.92]":"",cn=Ae&&!Ne?-Math.round(ie*.22):0,nn=ee.length>0||Xe&&r&&(!ze||on||Ae||Ne);return c.jsxs("div",{className:"flex flex-col items-center select-none opacity-100",style:{marginBottom:_t,transition:"opacity 0.25s ease"},children:[ve===n&&c.jsx(rD,{tileW:ie}),c.jsxs("div",{className:"relative flex flex-col items-center",style:{width:ie},children:[nn?c.jsxs("div",{className:`pointer-events-none absolute left-1/2 bottom-full flex flex-row items-end justify-center gap-1 ${a==="taxiHail"||a==="enter"||a==="boarding"||a==="ride"||a==="trafficJam"||a==="drive"||a==="driveBeforeJam"||a==="driveAfterJam"||a==="arrive"?"z-[28]":"z-20"}`,style:{transform:`translate(-50%, ${Math.max(10,Math.round(ie*.52))}px)`},children:[ee.map(ft=>{const je=Xe?28:Math.max(12,Ue-6);return c.jsxs("div",{className:"relative flex flex-col items-center justify-end",children:[c.jsx(xb,{player:ft}),c.jsx("span",{className:"anim-breathe leading-none inline-flex items-end justify-center",children:c.jsx(_m,{characterType:ft.characterType,pose:(ft.skipTurns??0)>0?"fallen":"normal",imgClassName:"object-contain object-bottom",spanClassName:"leading-none",imgStyle:{maxHeight:Math.max(72,Math.min(118,je*5.5)),width:"auto",maxWidth:Math.max(58,je*6.25)},spanStyle:{fontSize:je}})})]},ft.id)}),Xe&&on&&c.jsx(nD,{characterType:r.characterType,taxiPhase:a}),Xe&&r&&(!ze||Ae||Ne)&&c.jsxs("div",{className:"relative flex flex-col items-center justify-end",children:[c.jsx(xb,{player:r}),Ne?c.jsxs("div",{className:"flex max-w-[min(340px,calc(100vw-40px))] flex-row flex-nowrap items-end justify-center gap-1 pr-0.5 origin-bottom scale-[0.88] sm:scale-95 md:scale-100",children:[c.jsx("div",{className:`order-1 shrink-0 self-end ${a==="enter"?"anim-taxi-from-above-left-of-tile":"taxi-approach-parked"} relative z-[24]`,children:c.jsx(Qc,{imgClassName:"relative z-[1] max-h-[118px] w-auto min-w-[48px] max-w-[min(165px,46vw)] object-contain object-bottom opacity-100"})}),c.jsx("div",{className:`order-2 shrink-0 relative z-[20] flex flex-col items-center justify-end self-end ${a==="boarding"?"taxi-boarding-char-to-cab":""}`,children:c.jsx("span",{className:`inline-flex items-end justify-center leading-none ${a==="boarding"?"":s?"animate-bounce":"anim-float"}`,children:c.jsx(_m,{characterType:r.characterType,pose:(r.skipTurns??0)>0?"fallen":"normal",imgClassName:"max-h-[130px] w-auto max-w-[min(180px,55vw)] object-contain object-bottom",spanClassName:"text-4xl leading-none"})})})]}):c.jsxs("div",{className:`relative flex items-end justify-center ${Ae?"z-[26]":""} ${a==="arrive"?"taxi-piece-arrive-fadein":""}`,style:{zIndex:Ae?26:i||ot?20:5,position:"relative"},children:[c.jsx("span",{className:`inline-flex items-end justify-center leading-none ${a==="arrive"||traveling?"":i?"anim-hop":s?"animate-bounce":"anim-float"}`,children:c.jsx("span",{className:"inline-flex items-end justify-center leading-none",style:{transform:`translate3d(${cn}px, ${pe}px, 0)`,transition:traveling?"none":"transform 0.4s linear",willChange:traveling?"transform":"auto"},children:c.jsx("span",{className:`standee-piece relative inline-flex items-end justify-center leading-none ${traveling&&!Ae?"anim-standee-walk":""} ${Ae?"z-[26] anim-pulse-taxi-ride":""} ${Ae&&a==="trafficJam"?"anim-taxi-stutter":""} ${a==="arrive"?"taxi-piece-arrive-fadein-target":""}`,style:traveling&&!Ae?{"--standee-walk-ms":`${V.msPerStep*1.35}ms`}:void 0,children:Ae?c.jsx(Qc,{imgClassName:"relative z-[1] max-h-[130px] w-auto min-w-[48px] max-w-[min(180px,55vw)] object-contain object-bottom opacity-100"}):c.jsx(_m,{characterType:r.characterType,pose:(r.skipTurns??0)>0?"fallen":"normal",imgClassName:"max-h-[130px] w-auto max-w-[min(180px,55vw)] object-contain object-bottom",spanClassName:"text-4xl leading-none"})})})}),!Ae&&r.stats.luck>=80&&[{cls:"anim-sparkle-0",t:"-10px",l:"-12px"},{cls:"anim-sparkle-1",t:"-8px",r:"-12px"},{cls:"anim-sparkle-2",b:"-8px",l:"-10px"},{cls:"anim-sparkle-3",b:"-6px",r:"-10px"}].map((ft,je)=>c.jsx("span",{className:`absolute text-yellow-300 font-black text-[11px] pointer-events-none ${ft.cls}`,style:{top:ft.t,left:ft.l,bottom:ft.b,right:ft.r},children:"✦"},je))]})]})]}):null,c.jsxs("div",{className:`relative z-0 flex items-center justify-center overflow-visible rounded-xl border-[3px] ${Ot}
                    ${ve===n?"bg-yellow-400 border-yellow-600 text-amber-950":Ke?"border-rose-500 bg-gradient-to-br from-red-950 to-red-900 text-rose-50":`${ye} ${te}`}
                    ${Xe?Ke?"ring-2 ring-rose-300/95":ve===n?"ring-2 ring-amber-700/90":"ring-2 ring-cyan-400/90":""}`,style:{width:`${ie}px`,height:`${ie}px`,boxShadow:"none",transition:"width 0.28s ease, height 0.28s ease, filter 0.28s ease"},children:[c.jsx("div",{className:`absolute top-0 left-0 right-0 h-1 rounded-t-xl pointer-events-none ${Ke?"bg-rose-400/50":ve===n?"bg-yellow-500/80":"bg-white/25"}`}),zt&&ve>0&&c.jsx("span",{className:"pointer-events-none absolute left-1 top-1 z-[3] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/95 text-sm leading-none text-emerald-200 ring-2 ring-emerald-400/80","aria-hidden":!0,children:"✓"}),ve===n?c.jsx(iD,{deco:xe,iconPx:Ue,tileW:ie}):xe.icon?c.jsx("span",{style:{fontSize:`${Ue}px`},className:`leading-none ${xe.text}`,children:xe.icon}):c.jsx("span",{style:{fontSize:`${rt}px`},className:`font-bold ${xe.text}`,children:ve}),he&&c.jsx("div",{className:"pointer-events-none absolute right-0.5 top-0.5 z-[2] flex items-center justify-center",children:c.jsx(eD,{effect:q,sizePx:Math.max(10,Math.round(Ue*.55))})}),ve===n&&c.jsx("span",{className:"pointer-events-none absolute bottom-1 left-1/2 z-[6] -translate-x-1/2 text-[10px] font-black leading-none tracking-wide text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]",children:"GOAL!"})]})]}),Xe&&xe.icon&&(ve===0||ve>=n)&&c.jsx("span",{className:`text-[9px] mt-0.5 font-medium ${xe.text}`,children:ve===0?"スタート":"GOAL!"})]},ve)})})}),c.jsx("div",{className:"absolute bottom-0 left-0 right-0 z-[15] h-5 rounded-b-xl pointer-events-none",style:{background:"linear-gradient(to top, rgba(15,23,42,0.88), transparent)"}})]})}function fD({gs:t,cpGs:e,boardViewPos:n=null,onSugorokuHopComplete:s,reportSugorokuHopComplete:a=!1,isMyTurn:i,cpIsGoalLanding:r,cpIsWaitingSlot:o,isDay8Moving:u,isDiceRolling:h,localDice:d,diceShuffleValues:p,diceConfirmed:g,isLuckyRoll:y,showDiceTotal:R,displayDice:I,taxiPhase:O,taxiDriveCongested:x=!1,taxiDriveEndPos:b=null,taxiDriveSegmentMs:N=null,taxiJamMidPos:V=null,taxiDriveDurationMs:U=2600,pieceHopping:W,onMoveAction:S,onGoalLandingConfirm:_,onBeginSlotPhase:E}){if(!e)return null;const A=e.pendingTaxiSteps??0,w=A>0,M=e.reservedSlotTurns??0,T=M*D.dice.slotsPerSugorokuTurn,ue=typeof n=="number"?n:e.position;return c.jsxs(c.Fragment,{children:[i&&t.subPhase==="day8"&&r&&c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-500/20 to-yellow-900/30 p-5 text-center space-y-3",children:[c.jsx("p",{className:"text-4xl animate-bounce",children:"🏁"}),c.jsx("h2",{className:"text-2xl font-black text-amber-200 tracking-wide",children:"GOAL!"}),c.jsxs("p",{className:"text-amber-100/90 font-semibold",children:[e.name," が 8日目ゴールへ到着しました。"]}),c.jsxs("p",{className:"text-sm text-amber-200/80",children:["このターンを終えるとスロットは",c.jsx("span",{className:"font-bold text-white",children:"あなたの次のターン開始時"}),"に始まります。 （残り道中のプレイヤーは移動を続行します）"]}),c.jsxs("p",{className:"text-xs text-yellow-400/70",children:["獲得",c.jsx("strong",{className:"text-white",children:M}),"ターンブン（すごろく1手番＝スロット",c.jsx("strong",{className:"text-white",children:D.dice.slotsPerSugorokuTurn}),"回・計",c.jsx("strong",{className:"text-white",children:T}),"回）",c.jsx("span",{className:"block mt-1 text-yellow-400/55",children:"ターン終了まで他プレイヤーとの効果で運・善行・資金が変わっても、開始直前まで反映されます。"})]})]}),c.jsx("div",{style:{height:"min(720px, 80vh)",minHeight:"min(560px, 72vh)",overflow:"hidden",borderRadius:"12px"},children:c.jsx(wh,{players:t.players,viewPos:ue,boardGoal:tn,isDiceRolling:!1,taxiPhase:null,pieceHopping:!1,currentPlayer:e,tileEffects:t==null?void 0:t.sugorokuTileEffects})}),e.lastMoveEvent&&c.jsx("p",{className:"rounded-lg bg-slate-800/60 px-3 py-2 text-xs text-slate-300 text-center",children:e.lastMoveEvent}),c.jsx("button",{type:"button",onClick:_,className:"w-full rounded-xl bg-amber-500 py-4 font-black text-slate-950 hover:bg-amber-400 shadow-lg animate-pulse",children:"確認してターンを終える →"})]}),i&&t.subPhase==="day8"&&o&&c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center space-y-2",children:[c.jsx("h2",{className:"text-lg font-bold text-emerald-200",children:"8日目 ゴール到着済み"}),c.jsx("p",{className:"text-sm text-slate-300",children:"あなたのターンです。開始時点の運・技量などがスロットに反映されます。"}),c.jsxs("p",{className:"text-emerald-300 font-bold tabular-nums",children:[c.jsx("strong",{className:"text-xl",children:M}),"ターンブン → 開始でスロット最大",c.jsxs("strong",{className:"text-xl text-white",children:[" ",T," "]}),"回"]})]}),c.jsx("div",{style:{height:"min(720px, 80vh)",minHeight:"min(560px, 72vh)",overflow:"hidden",borderRadius:"12px"},children:c.jsx(wh,{players:t.players,viewPos:ue,boardGoal:tn,isDiceRolling:!1,taxiPhase:null,pieceHopping:!1,currentPlayer:e,tileEffects:t==null?void 0:t.sugorokuTileEffects})}),c.jsx("button",{type:"button",onClick:E,disabled:(e.reservedSlotTurns??0)<=0,className:"w-full rounded-xl bg-cyan-500 py-4 font-black text-slate-950 hover:bg-cyan-400 shadow-lg disabled:opacity-40 text-lg tracking-wide",children:"🎰 スロットを開始する"}),c.jsx("p",{className:"text-center text-[10px] text-slate-600",children:"開始後は従来のスロット画面に切り替わります。"})]}),u&&c.jsxs(c.Fragment,{children:[c.jsxs("div",{className:"flex items-center justify-between gap-2",children:[c.jsxs("h2",{className:"font-semibold text-sm text-slate-300 shrink-0",children:[e.name," — T",e.moveTurns+1]}),c.jsxs("div",{className:"flex-1 flex flex-col items-center",children:[c.jsx("span",{className:"text-[10px] text-yellow-400/60 font-medium tracking-widest uppercase",children:"GOAL"}),c.jsxs("div",{className:"flex items-baseline gap-1",children:[c.jsx("span",{className:"text-2xl font-black text-yellow-300 tabular-nums leading-none",children:Math.max(0,tn-e.position)}),c.jsx("span",{className:"text-xs text-yellow-400/70",children:"マス先"})]})]}),c.jsxs("span",{className:"text-xs text-slate-500 shrink-0",children:["残",Math.max(0,D.dice.maxTurns-e.moveTurns),"T"]})]}),c.jsx("div",{style:{height:"min(720px, 80vh)",minHeight:"min(560px, 72vh)",overflow:"hidden",borderRadius:"12px"},children:c.jsx(wh,{players:t.players,viewPos:ue,boardGoal:tn,isDiceRolling:h,taxiPhase:O,taxiDriveCongested:x,taxiDriveEndPos:b,taxiDriveSegmentMs:N,taxiJamMidPos:V,taxiDriveDurationMs:U,pieceHopping:W,currentPlayer:e,tileEffects:t==null?void 0:t.sugorokuTileEffects,reportHopAnimationComplete:a,onHopAnimationComplete:s})}),(()=>{if(w)return null;const me=h,X=me?d.map((pe,Se)=>({value:(g[Se]?pe:p[Se])??"?",confirmed:g[Se]??!1})):I.map(pe=>({value:pe,confirmed:!0}));if(X.length===0)return null;const ie=me?R:!0,se=X.reduce((pe,{value:Se})=>pe+(Number(Se)||0),0);return c.jsxs("div",{className:"flex flex-col items-center gap-2",children:[c.jsx("div",{className:"flex gap-3 justify-center flex-wrap",children:X.map(({value:pe,confirmed:Se},Qe)=>{const ht=me&&y&&Qe===1;return c.jsxs("div",{className:`relative flex items-center gap-1.5 rounded-xl border-2 px-4 py-2.5 min-w-[66px] justify-center font-black text-xl transition-all duration-300
                              ${ht&&Se?"border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.55)]":ht?"border-amber-500/60 bg-amber-900/30 text-amber-300 animate-pulse":Se?"border-cyan-400/70 bg-cyan-500/10 text-cyan-100 anim-dice-pop":"border-slate-600/60 bg-slate-800/80 text-slate-400 animate-pulse"}`,children:[c.jsx("span",{className:"text-base leading-none select-none",children:"🎲"}),c.jsx("span",{children:pe}),ht&&c.jsx("span",{className:"absolute -top-2.5 -right-2 text-[11px] text-amber-300 font-black leading-none select-none",children:"★"})]},`day8-dice-${Qe}-${pe}-${Se?"c":"u"}`)})}),ie&&X.length>1&&c.jsxs("div",{className:"flex items-baseline gap-1.5 anim-fadein",children:[c.jsx("span",{className:"text-sm text-slate-400",children:"合計"}),c.jsx("span",{className:"text-2xl font-black text-white",children:se}),c.jsx("span",{className:"text-sm text-slate-400",children:"マス進む！"})]})]})})(),e.lastMoveEvent&&c.jsx("p",{className:"rounded-lg bg-slate-800/60 px-3 py-2 text-xs text-slate-300 text-center",children:e.lastMoveEvent}),w&&c.jsx("div",{className:"rounded-lg border border-amber-600/45 bg-amber-950/50 px-3 py-2 text-center",children:c.jsxs("p",{className:"text-xs font-semibold text-amber-100",children:["タクシー渋滞中 — 駒に「渋滞中…」表示。あと",c.jsx("strong",{className:"tabular-nums text-white",children:A}),"マスが残っています。"]})}),c.jsx("div",{className:"flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500 justify-center",children:!w&&c.jsxs(c.Fragment,{children:[c.jsxs("span",{children:["最低出目: ",mS(e.stats.virtue),"（善行",e.stats.virtue,"）"]}),c.jsx("span",{children:e.stats.luck>=80?"アドバンテージ🎲🎲":"通常🎲"}),e.stats.pon>=D.pon.fireThreshold&&c.jsxs("span",{className:e.stats.pon>=D.pon.deathThreshold?"text-rose-300":"text-orange-300",children:["PON",e.stats.pon," ⚡転倒リスク"]})]})}),i&&c.jsxs(c.Fragment,{children:[e.skipTurns>0&&c.jsxs("div",{className:"rounded-xl border border-orange-400/40 bg-orange-400/10 p-3 text-sm text-orange-200 flex items-center gap-2 justify-center",children:["💤 巻き添えで",e.skipTurns,"回休み…自動スキップ中"]}),w?c.jsxs("button",{type:"button",onClick:()=>S("taxiTrafficWait"),disabled:h||!!O||e.skipTurns>0,className:"mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border-2 border-amber-200/70 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 px-6 py-5 font-black text-slate-950 shadow-[0_0_36px_rgba(251,191,36,0.45)] transition-[filter] hover:brightness-[1.05] disabled:cursor-not-allowed disabled:opacity-40",children:[c.jsx("span",{className:"flex items-center gap-2 text-2xl leading-tight tracking-tight",children:"🚧 渋滞を待つ"}),c.jsx("span",{className:"mt-1 text-sm font-bold opacity-95",children:"Wait in Traffic"}),c.jsxs("span",{className:"mt-2 text-[11px] font-semibold opacity-85 tabular-nums",children:["あと ",A," マスでタクシー行程完了"]})]}):c.jsxs("div",{className:"flex flex-wrap gap-2 justify-center",children:[c.jsxs("button",{type:"button",onClick:()=>S("normal"),disabled:h||!!O||e.skipTurns>0,className:"inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40 shadow-lg",children:[c.jsx(BM,{size:18}),"進む"]}),c.jsxs("div",{className:"relative group",children:[c.jsxs("button",{type:"button",onClick:()=>S("shop"),disabled:h||!!O||e.stats.money<D.dice.shopCost||e.skipTurns>0,className:"inline-flex items-center gap-2 rounded-xl bg-lime-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-lime-400 transition-colors disabled:opacity-40 shadow-lg",children:[c.jsx(Z0,{size:18}),"コンビニ ",c.jsxs("span",{className:"text-xs opacity-70",children:["-",D.dice.shopCost,"G"]})]}),c.jsx("div",{className:"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none",children:c.jsxs("div",{className:"bg-slate-800 border border-lime-500/40 text-slate-100 text-xs rounded-xl px-3 py-2 whitespace-nowrap shadow-xl",children:["🍰 コンビニスイーツでエネルギー補給！（ダイスを1個追加）",c.jsx("div",{className:"absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"})]})})]}),c.jsxs("button",{type:"button",onClick:()=>S("taxi"),disabled:h||!!O||e.stats.money<D.dice.taxiCost||e.skipTurns>0,className:"inline-flex items-center gap-1.5 rounded-xl bg-yellow-400 px-5 py-2.5 font-semibold text-slate-950 hover:bg-yellow-300 transition-colors disabled:opacity-40 shadow-lg",children:[c.jsx(Qc,{imgClassName:"h-[2.25rem] w-[2.25rem] object-contain shrink-0 opacity-100"}),"タクシー",c.jsxs("span",{className:"text-xs opacity-70",children:["-",D.dice.taxiCost,"G / ",D.dice.taxiMoveMin,"〜",D.dice.taxiMoveMax,"マス"]}),e.stats.virtue<=D.dice.taxiCongestThresh&&c.jsx("span",{className:"text-[10px] opacity-60",title:"善行が低めのときに一定確率で2ターン渋滞イベント（前半→次自分ターンで残り進行／渋滞時+PON、そのターンは他操作不可）",children:"渋滞リスク"})]}),t.aidAvailable&&c.jsxs("button",{type:"button",onClick:()=>S("help"),disabled:h||!!O||e.skipTurns>0,className:`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-colors disabled:opacity-40 shadow-lg ${e.stats.pon>=D.pon.deathThreshold?"bg-rose-600 text-white hover:bg-rose-500":"bg-emerald-500 text-slate-950 hover:bg-emerald-400"}`,children:[c.jsx(JM,{size:18}),"人助け ",e.stats.pon>=D.pon.deathThreshold?"⚠️即死50%":""]})]}),!w&&c.jsxs("p",{className:"text-center text-[10px] text-slate-600",children:["人助け ",(D.dice.helpChance*100).toFixed(0),"% / タクシー"," メニュー常時（確率のみに戻す: taxiMenuAlwaysVisible を false、taxiChance で割合）"]})]})]})]})}const ip=1600,dD=900,mD=1600,pD=ip+mD;function gD(){try{const t=new(window.AudioContext||window.webkitAudioContext);t.state==="suspended"&&t.resume().catch(()=>{});const e=t.currentTime,n=t.createOscillator(),s=t.createGain();n.connect(s),s.connect(t.destination),n.type="sine",n.frequency.setValueAtTime(420,e),n.frequency.exponentialRampToValueAtTime(760,e+.07),s.gain.setValueAtTime(.22,e),s.gain.exponentialRampToValueAtTime(.001,e+.14),n.start(e),n.stop(e+.15)}catch{}}function yD(){try{const t=new(window.AudioContext||window.webkitAudioContext);t.state==="suspended"&&t.resume().catch(()=>{});const e=t.currentTime,n=.24,s=Math.floor(t.sampleRate*n),a=t.createBuffer(1,s,t.sampleRate),i=a.getChannelData(0);for(let p=0;p<s;p++){const g=Math.pow(1-p/s,2.1);i[p]=(Math.random()*2-1)*g}const r=t.createBufferSource();r.buffer=a;const o=t.createBiquadFilter();o.type="lowpass",o.frequency.value=380;const u=t.createGain();u.gain.setValueAtTime(.34,e),u.gain.exponentialRampToValueAtTime(.001,e+n),r.connect(o),o.connect(u),u.connect(t.destination),r.start(e),r.stop(e+n);const h=t.createOscillator(),d=t.createGain();h.connect(d),d.connect(t.destination),h.type="triangle",h.frequency.setValueAtTime(98,e),h.frequency.exponentialRampToValueAtTime(42,e+n),d.gain.setValueAtTime(.36,e),d.gain.exponentialRampToValueAtTime(.001,e+n*1.05),h.start(e),h.stop(e+n+.02)}catch{}}function Tb({characterType:t,pose:e}){const n=uS(t,e),[s,a]=k.useState(0),i=rn[t]??rn.salaryman;return k.useEffect(()=>{a(0)},[t,e]),!n.length||s>=n.length?c.jsx("span",{className:"select-none text-[clamp(4.5rem,20vw,9rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]",children:i.emoji??"🙂"}):c.jsx("img",{src:ya(n[s]),alt:"",draggable:!1,className:"max-h-[min(52vh,520px)] w-auto max-w-[min(92vw,560px)] select-none object-contain object-bottom drop-shadow-[0_12px_40px_rgba(0,0,0,0.75)]",onError:()=>a(r=>r+1)})}function vD({active:t,characterType:e,onComplete:n,onFallLand:s}){const[a,i]=k.useState(!0),[r,o]=k.useState(!1),[u,h]=k.useState(!1),[d,p]=k.useState(!1),g=k.useRef(n),y=k.useRef(s);if(g.current=n,y.current=s,k.useEffect(()=>{if(!t){i(!0),o(!1),h(!1),p(!1);return}i(!0),o(!1),h(!1),p(!1),gD();const O=setTimeout(()=>i(!1),dD),x=setTimeout(()=>{var N;o(!0),yD(),(N=y.current)==null||N.call(y),h(!0),p(!0)},ip),b=setTimeout(()=>{var N;(N=g.current)==null||N.call(g)},pD);return()=>{clearTimeout(O),clearTimeout(x),clearTimeout(b)}},[t]),!t)return null;const R=e??"salaryman",I=ip/1e3;return c.jsxs("div",{className:`fixed inset-0 z-[220] flex cursor-default flex-col items-center justify-center gap-4 bg-black/75 pointer-events-auto px-4 ${a?"anim-pon-cutin-shake":""}`,"aria-hidden":!0,children:[c.jsx("div",{className:`pon-cutin-scene relative mx-auto w-[min(92vw,560px)] h-[min(52vh,520px)] transition-transform duration-500 ease-out ${d?"translate-y-2 scale-[0.99]":""}`,children:r?c.jsx("div",{className:"pon-cutin-spin-host anim-fadein",children:c.jsx(Tb,{characterType:R,pose:"fell_down"})}):c.jsx("div",{className:"pon-cutin-spin-host anim-pon-stumble-spin",style:{"--pon-spin-duration":`${I}s`},children:c.jsx(Tb,{characterType:R,pose:"stumble"})})}),u&&c.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:c.jsxs("div",{className:"relative anim-pon-burst-impact font-black tracking-tight text-white",children:[c.jsx("span",{className:"anim-pon-spark-impact pointer-events-none absolute -inset-12 rounded-full bg-rose-500/35 blur-3xl -z-10"}),c.jsx("span",{className:"relative inline-block drop-shadow-[0_0_40px_rgba(251,113,133,0.9)]",style:{fontSize:"clamp(2.8rem, 11vw, 5rem)",textShadow:"0 0 32px rgba(244,63,94,1), 0 0 64px rgba(251,113,133,0.65), 0 8px 0 #881337, 0 14px 28px rgba(0,0,0,0.8)"},children:"PON!!"})]})})]})}function bD(){const[t,e]=k.useState(!1),n=N3.taxi_congestion??[];k.useEffect(()=>{e(!1)},[]);const s=n.length>0&&!t?ya(n[0]):null;return c.jsx("div",{className:"fixed inset-0 z-[218] flex flex-col items-center justify-center pointer-events-none px-4 anim-traffic-jam-overlay-fade bg-black/88 backdrop-blur-[4px]","aria-hidden":!0,children:c.jsxs("div",{className:"relative w-full max-w-[min(92vw,1160px)] rounded-2xl border border-amber-500/25 shadow-[0_28px_80px_rgba(0,0,0,0.92)] overflow-hidden bg-slate-950",children:[c.jsx("div",{className:"absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/20 to-black/70 pointer-events-none"}),s?c.jsx("img",{src:s,alt:"",className:"relative z-0 w-full max-h-[min(112vh,1040px)] object-cover object-center",draggable:!1,onError:()=>e(!0)}):c.jsxs("div",{className:"relative z-0 flex min-h-[min(88vh,720px)] w-full items-center justify-center gap-3 bg-slate-900 px-4 text-[clamp(2.5rem,12vw,3.5rem)] leading-none opacity-95",children:[c.jsx("span",{"aria-hidden":!0,children:"🚧"}),c.jsx(Qc,{imgClassName:"max-h-[min(56vh,400px)] w-auto max-w-[72%] object-contain opacity-100 drop-shadow-lg"}),c.jsx("span",{"aria-hidden":!0,children:"🚧"})]}),c.jsxs("div",{className:"absolute inset-0 z-[2] flex flex-col items-center justify-end pb-6 pt-16 px-4 pointer-events-none",children:[c.jsxs("p",{className:"text-center font-black anim-traffic-jam-neon text-[clamp(1.25rem,4.5vw,1.85rem)] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]",children:[c.jsx("span",{className:"text-amber-100",children:"渋滞発生！"}),c.jsx("span",{className:"text-slate-200 text-[0.82em] ml-2 tracking-tight font-bold normal-case",children:"(Traffic Jam!)"})]}),c.jsx("p",{className:"mt-2 text-center text-xs font-semibold text-amber-200/85 max-w-md",children:"運転手もため息… メーターだけが無情に刻みます。"})]})]})})}function xD({gs:t,cpGs:e,onDailyAction:n,onOpenDailySlot:s,interactionLocked:a=!1}){if(!e)return null;const i=D.dailySlot.spinBet*D.dailySlot.spins,r=rn[e.characterType]??rn.salaryman,o=r.ponMultiplier??1,u=Math.ceil(D.pon.dailyGain*o),h=e.stats.pon+u,d=r.workRewardMultiplier??1,p=r.workRewardBonus??0,g=Math.round(Math.floor((D.work.reward+p)*d)*wc(e.stats.virtue)),y=Math.max(D.stream.minFailRate,D.stream.baseFailRate-(e.stats.skill-50)*D.stream.skillFailReduce);return c.jsxs(c.Fragment,{children:[c.jsxs("h2",{className:"font-semibold",children:[t.currentDay,"日目 行動選択 — ",e.name]}),c.jsxs("div",{className:"rounded-xl border border-cyan-600/45 bg-gradient-to-br from-cyan-950/50 to-slate-900/90 px-3 py-2.5 space-y-2",children:[c.jsxs("div",{className:"flex flex-wrap items-center gap-x-2 gap-y-1",children:[c.jsxs("span",{className:"inline-flex items-center rounded-md border border-cyan-600/50 bg-cyan-950/70 px-2 py-1 text-[11px] font-semibold leading-tight text-cyan-100 shadow-sm",children:["決戦の",ep,"日目まで",c.jsxs("strong",{className:"mx-1 tabular-nums text-white text-xs",children:["あと ",ep-t.currentDay," 日"]})]}),c.jsxs("span",{className:"text-[11px] text-slate-500 tabular-nums",children:["育成 ",t.currentDay," / ",Ea," 日"]})]}),c.jsx("div",{className:"flex gap-1 w-full","aria-hidden":"true",children:Array.from({length:Ea},(R,I)=>{const O=I<t.currentDay-1,x=I===t.currentDay-1;return c.jsx("span",{title:`${I+1}日目${x?"（今ここ）":O?"（終了）":""}`,className:"h-2 min-w-[8px] flex-1 rounded-full transition-colors "+(O?"bg-cyan-700/85":x?"bg-cyan-300 ring-1 ring-cyan-100/75 shadow-[0_0_10px_rgba(34,211,238,0.55)]":"bg-slate-700/90")},`daily-progress-${I}`)})})]}),c.jsxs("div",{className:`rounded-xl p-3 text-xs space-y-1 border ${h>=D.pon.deathThreshold?"border-rose-500/50 bg-rose-500/10":h>=D.pon.fireThreshold?"border-orange-500/40 bg-orange-500/10":"border-slate-700 bg-slate-800/50"}`,children:[h>=D.pon.fireThreshold&&c.jsx("p",{className:"text-slate-400",children:"発火時：配信→失言がバズった！（資金大増・技量低下）/ 仕事・神社→弁償（資金減）"}),e.stats.pon>=D.pon.deathThreshold&&c.jsxs("p",{className:"text-rose-300 font-bold",children:["💀 PON≥",D.pon.deathThreshold,"！8日目に人助けを選ぶと50%でゲームオーバー！"]}),c.jsxs("div",{className:"text-slate-500 space-y-1",children:[c.jsxs("p",{className:"font-medium text-slate-400",children:["📺 配信（技量 ",e.stats.skill,"／失敗率 ",(y*100).toFixed(0),"%）"]}),c.jsxs("p",{className:"pl-2 border-l border-slate-600/70 space-y-0.5 leading-relaxed",children:[c.jsxs("span",{className:"block",children:["失敗；",(y*100).toFixed(0),"% ＋",D.stream.successMin,"Gのみ、ステータス増加なし"]}),c.jsxs("span",{className:"block",children:["成功；＋",D.stream.successMin,"〜",D.stream.successMax,"G（善行で増加）"]}),c.jsx("span",{className:"block text-slate-600 text-[11px] py-0.5",children:"※上記収入は配信倍率・善行でも増減します。"}),c.jsx("span",{className:"block pt-0.5",children:"配信タイプ"}),c.jsxs("span",{className:"block",children:["・雑談；善行＋",D.stream.chat.virtueGainMin,"〜",D.stream.chat.virtueGainMax]}),c.jsxs("span",{className:"block",children:["・ゲーム；技量 ＋",D.stream.game.skillGainMin,"〜",D.stream.game.skillGainMax]})]}),c.jsx("p",{className:"text-slate-600",children:"仕事・配信の資金は善行でも増えます。"})]}),c.jsxs("p",{className:"text-fuchsia-400/80",children:["🎰 デイリースロット: 所持資金から",D.dailySlot.spinBet,"G×",D.dailySlot.spins,"回を支払い（計",i,"G／資金",i,"G未満では実行不可）/ 8日目と同じ役配当で増減・スピンごと技量+",D.dailySlot.skillGainEverySpin,"（役成立でさらに+",D.dailySlot.skillGainOnRole,"）"]}),c.jsxs("p",{className:"text-amber-500/70",children:["⛩ 神社: -",D.shrine.cost,"G / 運+",D.shrine.luckGain," / 善行+",D.shrine.virtueGain," / PON-",D.shrine.ponReduce,"　お守り確率は基準×(1+善行/100)"]}),c.jsxs("p",{className:"text-rose-400/70",children:["💸 行動後に生活費 -",Vl(e),"G（借金になっても続行）"]})]}),c.jsxs("div",{className:"flex flex-wrap gap-3",children:[c.jsxs("button",{type:"button",onClick:()=>n("work"),disabled:a,className:"inline-flex items-center gap-2 rounded-xl bg-emerald-500/90 px-5 py-2.5 font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40",children:[c.jsx(HM,{size:18}),"仕事（+",g,"G 目安・善行反映 / 善行+",D.work.virtueGain,"）"]}),c.jsxs("button",{type:"button",onClick:()=>n("stream"),disabled:a,className:"inline-flex max-w-full flex-col items-start gap-1 rounded-xl bg-violet-500/90 px-5 py-2.5 font-medium text-white text-left transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40",children:[c.jsxs("span",{className:"inline-flex items-center gap-2",children:[c.jsx(l3,{size:18,"aria-hidden":!0}),"配信（内容はランダム）"]}),c.jsxs("span",{className:"text-[11px] font-normal leading-snug text-violet-50/95 pl-[26px] space-y-1 flex flex-col",children:[c.jsxs("span",{children:["失敗；",(y*100).toFixed(0),"% ＋",D.stream.successMin,"Gのみ、ステータス増加なし"]}),c.jsxs("span",{children:["成功；＋",D.stream.successMin,"〜",D.stream.successMax,"G（善行で増加）"]}),c.jsx("span",{className:"pt-0.5",children:"配信タイプ"}),c.jsxs("span",{children:["・雑談；善行＋",D.stream.chat.virtueGainMin,"〜",D.stream.chat.virtueGainMax]}),c.jsxs("span",{children:["・ゲーム；技量 ＋",D.stream.game.skillGainMin,"〜",D.stream.game.skillGainMax]})]})]}),c.jsxs("button",{type:"button",onClick:()=>s==null?void 0:s(),disabled:a||e.stats.money<i,title:a?"演出中は選択できません":e.stats.money<i?`資金から${i}G必要（現在${e.stats.money}G）`:`所持資金から計${i}Gを支払い。スピンごとに技量+${D.dailySlot.skillGainEverySpin}（毎回確定）、役が揃えばさらに+${D.dailySlot.skillGainOnRole}。${D.dailySlot.spinBet}G×${D.dailySlot.spins}回（筐体演出）`,className:"inline-flex max-w-full flex-col items-start gap-1 rounded-xl bg-fuchsia-600/90 px-5 py-2.5 font-medium text-white text-left hover:bg-fuchsia-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",children:[c.jsxs("span",{className:"inline-flex items-center gap-2",children:[c.jsx(bd,{size:18,"aria-hidden":!0}),"デイリースロット（資金から-",i,"G／",D.dailySlot.spinBet,"G×",D.dailySlot.spins,"）"]}),c.jsxs("span",{className:"text-[11px] font-normal leading-snug text-fuchsia-50/95 pl-[26px]",children:["技量；スピンごと+",D.dailySlot.skillGainEverySpin,"（ハズレでも）／役成立でさらに+",D.dailySlot.skillGainOnRole]})]}),c.jsxs("button",{type:"button",onClick:()=>n("shrine"),disabled:a,className:"inline-flex items-center gap-2 rounded-xl bg-amber-600/90 px-5 py-2.5 font-medium text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40",children:[c.jsx("span",{className:"text-base leading-none",children:"⛩"}),"神社（-",D.shrine.cost,"G / 運+",D.shrine.luckGain,"）"]})]})]})}const TS="/assets/slot-machine-8fe98381.png";function _D(t){return new Promise(e=>setTimeout(e,t))}function TD({open:t,statsForSpin:e,characterType:n,playerName:s,initialSlotPityCounter:a=0,soundRef:i,onClose:r,onFinished:o}){const[u,h]=k.useState(!1),[d,p]=k.useState(0),[g,y]=k.useState(e),[R,I]=k.useState([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),[O,x]=k.useState([!1,!1,!1]),[b,N]=k.useState(-1),[V,U]=k.useState(!1),[W,S]=k.useState(null),[_,E]=k.useState("idle"),[A,w]=k.useState(!1),[M,T]=k.useState(!1),[ue,me]=k.useState(!1),[X,ie]=k.useState(null),se=k.useRef(null),pe=k.useRef([!1,!1,!1]),Se=k.useRef(!1),Qe=k.useRef(null),ht=k.useRef(0),Dt="standard",Ue=Ta[Dt],rt=D.dailySlot.spinBet,xt=D.dailySlot.spins,$=rt*xt;k.useEffect(()=>{t&&(Se.current=!1,me(!1),h(!1),p(0),T(!1),ie(null),S(null),E("idle"),U(!1),N(-1),x([!1,!1,!1]),pe.current=[!1,!1,!1],I([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),se.current&&(clearInterval(se.current),se.current=null),y(e??null),Qe.current=null,ht.current=a??0)},[t,e,a]),k.useEffect(()=>()=>{se.current&&clearInterval(se.current)},[]);const ae=hp.useCallback((ee,q,he)=>new Promise(Ke=>{let ye=[...q.reels];if(q.tier==="miss"){const Ie=Ue.symbols,Tt=D.slot.nearMissReachChance,Pt=D.slot.slipSymbolChance,Xn=Math.random();if(Ie.length>=2&&Xn<Tt){const _e=Ie[$e(0,Ie.length-1)],dt=Ie.filter(Et=>Et!==_e),un=dt[$e(0,dt.length-1)];ye=[_e,_e,un]}else if(Xn<Tt+Pt){const _e=$e(0,2);ye[_e]=Ie[1]}}const te=["jackpot","big","mid"].includes(q.tier)&&ye[0]===ye[1],Ye=q.tier==="miss"&&ye[0]===ye[1]&&ye[0]!==ye[2],_t=te||Ye,Ot=Math.max(0,ee.luck-D.slot.luckBaseline),cn=Math.max(0,ee.skill-D.slot.skillBaseline),nn=q.tier!=="miss"&&(Ot>=10||cn>=10),ft=ye.map((Ie,Tt)=>sp(Ie,Ue,Tt));w(!0),setTimeout(()=>w(!1),340),h(!0),U(!1),S(null),E("spinning"),pe.current=[!1,!1,!1],x([!1,!1,!1]),I([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),N(-1);const je=i==null?void 0:i.current;je==null||je.playStart(),setTimeout(()=>je==null?void 0:je.startSpin(),200),se.current&&clearInterval(se.current),se.current=setInterval(()=>{const Ie=pe.current;I(Tt=>Tt.map((Pt,Xn)=>Ie[Xn]?Pt:vS(Ue)))},80);const fe=(Ie,Tt,Pt)=>{if(Pt&&nn&&Math.random()<.5){const _e=bS(Tt[1],Ue),dt=[Tt[0],_e,Tt[2]];pe.current[Ie]=!0,I(un=>{const Et=[...un];return Et[Ie]=dt,Et}),N(Ie),je==null||je.playStop(Ie),setTimeout(()=>N(-1),430),setTimeout(()=>{I(un=>{const Et=[...un];return Et[Ie]=Tt,Et}),x(un=>{const Et=[...un];return Et[Ie]=!0,Et}),setTimeout(()=>{x(un=>{const Et=[...un];return Et[Ie]=!1,Et})},560)},380)}else pe.current[Ie]=!0,I(_e=>{const dt=[..._e];return dt[Ie]=Tt,dt}),N(Ie),je==null||je.playStop(Ie),setTimeout(()=>N(-1),430)},ke=1200,Bt=1700,Vt=_t?Bt+2400:Bt+550;setTimeout(()=>fe(0,ft[0],!0),ke),setTimeout(()=>fe(1,ft[1],!0),Bt),_t&&setTimeout(()=>{U(!0),E("reach"),setTimeout(()=>je==null?void 0:je.playReach(),150)},Bt+400),setTimeout(()=>{se.current&&(clearInterval(se.current),se.current=null),je==null||je.stopSpin(),fe(2,ft[2],!0),U(!1),I(ft);const Ie=q.tier!=="miss";Ie?(S(q.tier),E("win"),setTimeout(()=>je==null?void 0:je.playWin(q.tier),200),setTimeout(()=>S(null),4e3)):E("miss");const Tt=q.payout-q.bet;ie({won:Ie,title:`${he}　${Ie?"当たり！":"ハズレ"}`,detail:`${q.message??""}／収支 ${Tt>=0?"+":""}${Tt}G`}),h(!1),Ke()},Vt)}),[Ue,Dt,i]),Y=async()=>{if(!t||!e||u||M||Se.current)return;Se.current=!0;const ee=[];let q={...e};try{for(let ye=0;ye<xt;ye++){p(ye+1),y({...q});const te=yS(q,rt,Dt,0,n,{pityCounter:ht.current});ht.current=te.pityCounterAfter??0,ee.push(te),await ae(q,te,`第 ${ye+1} / ${xt} 回`),await _D(ye<xt-1?1100:0);const Ye=D.dailySlot.skillGainEverySpin+(te!=null&&te.tier&&te.tier!=="miss"?D.dailySlot.skillGainOnRole:0);q={...q,money:xn(q.money-te.bet+te.payout),skill:At(q.skill+Ye)}}const he=ee.reduce((ye,te)=>ye+(te.payout-te.bet),0),Ke=ee.filter(ye=>ye.tier!=="miss").length;ie({won:he>0,title:he>=0?`合計プラス収支 ${he}G！`:`合計収支 ${he}G`,detail:`${Ke} / ${ee.length} 回役成立（スピンごと技量 +${D.dailySlot.skillGainEverySpin}／役ごと追加 +${D.dailySlot.skillGainOnRole}）・次へでターン終了`}),Qe.current=ee,T(!0)}catch(he){console.error(he),Se.current=!1,T(!1),me(!1),p(0),Qe.current=null,ie(null)}},oe=async()=>{if(!t||ue||!M)return;const ee=Qe.current;if(!(!Array.isArray(ee)||ee.length!==xt)){me(!0);try{await o(ee),r()}finally{me(!1)}}};if(!t||!e)return null;const Ae=Math.max(0,(g??e).luck-D.slot.luckBaseline),qe=Math.max(0,(g??e).skill-D.slot.skillBaseline),Ne=Ae>=50?3:Ae>=30?2:Ae>=10?1:0,ze=qe>=30?2:qe>=10?1:0,on=Ne>=1&&ze>=1,jt=u&&(Ne>0||ze>0);let ot="";jt&&(on?ot="slot-cabinet-stage--aura-combo":Ne>=3?ot="slot-cabinet-stage--aura-luck3":Ne===2?ot="slot-cabinet-stage--aura-luck2":Ne===1?ot="slot-cabinet-stage--aura-luck1":ze>=2?ot="slot-cabinet-stage--aura-skill2":ze===1&&(ot="slot-cabinet-stage--aura-skill1"));const Nn=n??"salaryman",ve=_==="win"?"anim-char-bounce":_==="reach"?"anim-char-pray":_==="spinning"?"anim-char-wobble":_==="miss"?"anim-char-sad":"",ge=!!W,xe={top:"var(--slot-window-top)",left:"var(--slot-window-left)",width:"var(--slot-window-width)",height:"var(--slot-window-height)"},Xe=ue?"締め処理中…":M?"次へ":u?d>0?`回転中… (${d}/${xt})`:"回転中…":`資金から${rt}G×${xt}回スピン（計${$}G・各回収支適用）`,zt=ue||M||u||d>0;return c.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]",role:"dialog","aria-modal":"true","aria-labelledby":"daily-slot-title",children:c.jsxs("div",{className:"relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-amber-500/40 bg-slate-950 shadow-[0_0_60px_rgba(251,191,36,0.15)]",children:[c.jsx("button",{type:"button",disabled:zt,onClick:r,title:zt&&!ue&&!M?"1回開始したあとは「次へ」で確定するまで閉じられません":void 0,className:"absolute right-3 top-3 z-[110] rounded-lg border border-slate-600 bg-slate-800 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300","aria-label":zt?"閉じる（この段階では使用できません）":"閉じる",children:c.jsx(oS,{size:18})}),c.jsxs("div",{className:"space-y-3 p-4 pt-12",children:[c.jsx("h2",{id:"daily-slot-title",className:"text-lg font-bold text-amber-100",children:"デイリースロット（技能練習）"}),c.jsxs("p",{className:"text-xs text-slate-400 leading-relaxed",children:[s," /",c.jsx("span",{className:"text-slate-500",children:"所持資金から"})," ",c.jsxs("span",{className:"text-amber-200 font-semibold tabular-nums",children:[rt,"G×",xt,"回ベット（計",$,"G）"]})," · ","8日目スロットと同じ",c.jsx("strong",{className:"text-slate-200",children:"役ごとの配当"}),"・倍率／スピンごと技量+",c.jsx("span",{className:"text-sky-300",children:D.dailySlot.skillGainEverySpin}),"、役成立でさらに+",c.jsx("span",{className:"text-sky-300",children:D.dailySlot.skillGainOnRole})]}),X&&c.jsxs("div",{className:`rounded-xl border px-3 py-3 text-center text-sm font-bold ${X.won?"border-emerald-500/60 bg-emerald-500/15 text-emerald-100":"border-rose-500/55 bg-rose-500/12 text-rose-100"}`,children:[c.jsx("p",{className:"text-base",children:X.title}),c.jsx("p",{className:"mt-1 text-xs font-normal opacity-95",children:X.detail})]}),c.jsxs("div",{className:`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${W==="jackpot"?"anim-jp-rainbow":""}`,children:[W&&W!=="miss"&&c.jsx("div",{className:"absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl",children:Array.from({length:W==="jackpot"?28:W==="big"?16:8},(ee,q)=>c.jsx("span",{style:{position:"absolute",left:`${(q*97+11)%100}%`,top:"-30px",fontSize:W==="jackpot"?"1.6rem":"1.2rem",animation:`coinDrop ${1.4+q*.11%1.2}s ${q*.07%1.1}s ease-in forwards`},children:W==="jackpot"?["🪙","⭐","💎","✨"][q%4]:"🪙"},q))}),c.jsxs("div",{className:"relative z-[8] flex flex-col items-center gap-3 w-full",children:[c.jsxs("div",{className:["slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",A?"slot-cabinet-recoiling":"",ot].filter(Boolean).join(" "),children:[V&&c.jsx("p",{className:"pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse",children:"🎯 REACH!!"}),c.jsxs("div",{className:"slot-machine-stack relative w-full min-h-[200px]",children:[c.jsx("div",{className:"absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none",style:xe,"aria-hidden":!0}),c.jsx("div",{className:"slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none",style:xe,children:c.jsx("div",{className:"slot-grid-3x3 flex h-full w-full flex-row",style:{gap:"var(--slot-reel-gap)",padding:"var(--slot-reel-pad-y) var(--slot-reel-pad-x)"},children:R.map((ee,q)=>c.jsx("div",{className:["slot-reel-col relative flex min-h-0 h-full min-w-0 flex-1 flex-col overflow-hidden rounded-sm",b===q?"anim-reel-bounce":"",V&&q===2?"ring-2 ring-amber-400/70 ring-offset-0 rounded-sm":""].filter(Boolean).join(" "),children:c.jsx("div",{className:["slot-reel-strip w-full transition-transform duration-500 ease-out",O[q]?"slot-reel-strip--slip":""].filter(Boolean).join(" "),children:ee.map((he,Ke)=>{const ye=Ke===1,te=ye&&!pe.current[q]&&u;return c.jsx("div",{className:["slot-cell flex min-h-0 min-w-0 items-center justify-center border border-slate-600/50 text-slate-100",ye?"slot-cell--payline":"slot-cell--edge",ye&&ge?"slot-cell--win-pulse":"",Ke===1?"bg-[color-mix(in_srgb,var(--slot-reel-face)_75%,#272e3d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]":"bg-[color-mix(in_srgb,var(--slot-reel-face)_55%,#0f141c)]",te?"slot-cell--spinning":""].filter(Boolean).join(" "),children:he},`${q}-${Ke}-daily`)})})},q))})}),c.jsx("div",{className:"relative z-[5] w-full pointer-events-none select-none",children:c.jsx("img",{src:TS,alt:"",className:"relative z-[6] block w-full max-w-[440px] mx-auto pointer-events-none",draggable:!1,onError:ee=>{const q=ee.currentTarget,he="/";q.src=`${he}images/slot-machine.png`}})}),c.jsx("button",{type:"button",title:`連続スピン（${rt}G×${xt}）`,"aria-label":"スロットを回す",disabled:u||M||ue,className:"absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",style:{top:"var(--slot-spin-top)",left:"var(--slot-spin-left)",width:"var(--slot-spin-w)",height:"var(--slot-spin-h)"},onClick:()=>void Y()})]})]}),c.jsx("div",{className:"relative z-[12] flex justify-center pointer-events-none mt-2",children:c.jsx(yo,{characterType:Nn,imgClassName:`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${ve}`,spanClassName:`text-5xl leading-none inline-block ${ve}`})}),W==="jackpot"&&c.jsx("p",{className:"relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse",style:{textShadow:"0 0 20px #fbbf24, 0 0 40px #f59e0b"},children:"🎰 777 JACKPOT!! 🎰"})]})]}),c.jsxs("button",{type:"button","aria-label":ue?"締め処理中":M?"次のプレイヤーへ（ターン終了）":"スロット練習を開始",disabled:u||ue,onClick:()=>M?void oe():void Y(),className:"flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-40 transition-colors",children:[M?c.jsx(J0,{size:20}):c.jsx(bd,{size:20}),Xe]}),c.jsx("p",{className:"text-[10px] text-slate-500 text-center",children:"開始後は自動で連続回転します。「次へ」で結果を送信し、翌手番（または翌日開始）まで進みます。回転〜結果確認まで閉じることはできません。"})]})]})})}function ED({gameState:t,soundRef:e}){const[n,s]=k.useState(()=>Date.now()),a=k.useRef(!1);k.useEffect(()=>{const x=setInterval(()=>s(Date.now()),50);return()=>clearInterval(x)},[]);const i=(t==null?void 0:t.finalBattleStartedAt)!=null?JSON.stringify(t.finalBattleStartedAt):"";k.useEffect(()=>{a.current=!1},[i]);const r=(t==null?void 0:t.players)??[],o=hS(t==null?void 0:t.finalBattleStartedAt),[u]=k.useState(()=>Date.now()),h=Number.isFinite(o)?o:u,d=Math.max(0,n-h),p=d<go,g=d>=go,y=(t==null?void 0:t.finalBattleEntry)==="preDay8";k.useEffect(()=>{const x=e==null?void 0:e.current;!x||!p||a.current||(a.current=!0,x.tryPlayWarHornIfLoaded())},[p,e]),k.useEffect(()=>{const x=e==null?void 0:e.current;x&&g&&x.stopWarHorn()},[g,e]),k.useEffect(()=>()=>{var x,b;(b=(x=e==null?void 0:e.current)==null?void 0:x.stopWarHorn)==null||b.call(x)},[e]);const R=y?null:r.filter(x=>x.alive)[0]??r[0]??null,I=y?0:R?Math.min(tn,Math.max(0,R.position)):Math.floor(tn*.62);k.useEffect(()=>{var x;if(!(!g||y))try{typeof document<"u"&&((x=document.fonts)!=null&&x.ready)&&document.fonts.ready.then(()=>{}).catch(()=>{})}catch{}},[g,y]);const O=k.useMemo(()=>Array.from({length:20},(x,b)=>({id:b,leftPct:5+b*47%90,bottomPct:22+b%7*4,delayMs:b*67%900,durSec:.75+b%6*.13})),[]);return c.jsxs("div",{className:"relative min-h-screen w-full bg-slate-950",children:[!y&&c.jsxs("div",{className:g?"relative z-10 w-full mx-auto px-3 py-4 space-y-3":"fixed inset-0 z-[5] w-full mx-auto px-3 py-4 space-y-3 opacity-0 pointer-events-none overflow-hidden","aria-hidden":!g,children:[g&&c.jsxs("div",{className:"text-center space-y-1",children:[c.jsxs("h2",{className:"text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-violet-100 to-indigo-300 tracking-[0.08em]",style:{fontFamily:"'Zen Old Mincho',serif"},children:["決戦の地",c.jsx("span",{className:"text-slate-400 text-xs md:text-sm ml-2 font-normal tracking-normal",children:"／ 夜ノ神社へ"})]}),c.jsx("p",{className:"text-xs text-indigo-200/65",children:"参道には霧。青く冷たい火屑だけが漂う——"})]}),c.jsx("div",{className:"h-[min(720px,80vh)] min-h-[min(560px,72vh)] overflow-hidden rounded-2xl border border-indigo-800/65 shadow-[0_0_72px_rgba(79,70,229,0.2)] bg-black/40 mx-auto max-w-4xl",children:c.jsx(wh,{players:r,viewPos:I,boardGoal:tn,isDiceRolling:!1,taxiPhase:null,pieceHopping:!1,currentPlayer:R,visualTheme:"nightShrine",tileEffects:(t==null?void 0:t.sugorokuTileEffects)??null})})]}),p&&y&&c.jsx("div",{className:"fixed inset-0 z-50 flex min-h-[100dvh] w-full items-center justify-center bg-neutral-950 px-5 pointer-events-none",children:c.jsx("h2",{className:"fb-preday8-burn-title text-center px-3 max-w-[min(94vw,40rem)]",children:"決戦の日"})},i),p&&!y&&c.jsxs("div",{className:"fixed inset-0 z-50 overflow-hidden pointer-events-none anim-fb-shake-once isolate",children:[c.jsx("div",{className:"absolute inset-0 bg-neutral-950","aria-hidden":!0}),c.jsx("div",{className:"absolute inset-0 anim-fb-heat-wave","aria-hidden":!0}),c.jsx("div",{className:"absolute inset-0 anim-fb-heat-bg","aria-hidden":!0}),c.jsx("div",{"aria-hidden":!0,className:"anim-fb-flame-sheet anim-fb-flame-sheet-delay pointer-events-none absolute left-1/2 bottom-[14%] w-[118%] max-w-none -translate-x-1/2 h-[72%]",style:{borderRadius:"45% 45% 50% 50%",background:"linear-gradient(to top,#7f1d1d 0%,#b91c1c 28%,#ea580c 58%,rgba(251,191,36,0.5) 88%,transparent 100%)"}}),c.jsx("div",{"aria-hidden":!0,className:"anim-fb-flame-sheet pointer-events-none absolute left-1/2 bottom-[17%] w-[94%] max-w-none -translate-x-1/2 h-[62%]",style:{borderRadius:"48% 48% 50% 50%",mixBlendMode:"screen",background:"linear-gradient(to top,#451a03 0%,#dc2626 35%,#fb923c 65%,rgba(254,249,195,0.55) 95%,transparent 100%)"}}),c.jsx("div",{className:"absolute inset-0 z-[1]","aria-hidden":!0,children:O.map(x=>c.jsx("span",{className:"anim-fb-ember-dot",style:{left:`${x.leftPct}%`,bottom:`${x.bottomPct}%`,"--delay":`${x.delayMs}ms`,"--dur":`${x.durSec}s`}},x.id))}),c.jsx("div",{className:"relative z-10 flex h-full min-h-[100dvh] w-full items-center justify-center px-5",children:c.jsx("h2",{className:"fb-decisive-title text-center px-3 max-w-[min(94vw,40rem)]",children:"決戦の日"})})]},i)]})}const Cf="POTENTIAL OVER NEXT SPIN (PONS)",SD=!0,wD="現在はソロプレイ体験版です。オンラインで仲間と遊ぶ「Next Spin」（マルチプレイ）は開発中です。次のアップデートで解放予定です。",Nm="POTENTIAL OVER NEXT SPIN",Ah="PONS",ES="/images/title_logo.png",AD="/images/casual_chat_stream.png",ND="/images/game_streaming.png",RD="/images/work.png";function Nc({myFullId:t,copied:e,onCopy:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r}){const[o,u]=k.useState(!1),h=k.useRef(null);if(k.useEffect(()=>{if(!o)return;const g=y=>{h.current&&!h.current.contains(y.target)&&u(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[o]),!t)return null;const d=Math.round(Math.max(0,Math.min(1,s))*100),p=Math.round(Math.max(0,Math.min(1,a))*100);return c.jsxs("div",{ref:h,className:"fixed top-3 right-3 z-[200] flex flex-col items-end gap-1 select-none",children:[c.jsxs("div",{className:"flex max-w-[min(calc(100vw-5.5rem),18rem)] items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-slate-800/95 px-3 py-1.5 shadow-md",children:[c.jsx("span",{className:"truncate font-mono text-xs font-bold text-cyan-300",title:t,children:t}),c.jsx("button",{type:"button",onClick:n,className:`shrink-0 text-sm transition-all ${e?"text-emerald-400":"text-slate-400 hover:text-white"}`,title:"コピー",children:e?"✓":"📋"})]}),c.jsx("div",{className:"flex w-full justify-end pr-0.5",children:c.jsx("button",{type:"button",onClick:()=>u(g=>!g),className:"rounded-lg border border-slate-600 bg-slate-800/90 px-2 py-1 text-base leading-none text-slate-300 hover:bg-slate-700 hover:text-white","aria-expanded":o,"aria-label":"音量設定",title:"音量設定",children:"⚙"})}),o&&c.jsxs("div",{className:"w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-slate-600 bg-slate-950/98 p-3 text-xs text-slate-200 shadow-xl backdrop-blur-sm",children:[c.jsx("p",{className:"mb-2.5 font-semibold text-slate-400",children:"サウンド"}),c.jsxs("label",{className:"mb-3 flex flex-col gap-1.5",children:[c.jsxs("span",{className:"flex justify-between font-medium text-slate-300",children:[c.jsx("span",{children:"効果音"}),c.jsxs("span",{className:"tabular-nums text-cyan-300/90",children:[d,"%"]})]}),c.jsx("input",{type:"range",min:0,max:100,value:d,onChange:g=>i(Number(g.target.value)/100),className:"w-full accent-cyan-500"})]}),c.jsxs("label",{className:"flex flex-col gap-1.5",children:[c.jsxs("span",{className:"flex justify-between font-medium text-slate-300",children:[c.jsx("span",{children:"BGM（タイトル〜待機・育成・8日目）"}),c.jsxs("span",{className:"tabular-nums text-violet-300/90",children:[p,"%"]})]}),c.jsx("input",{type:"range",min:0,max:100,value:p,onChange:g=>r(Number(g.target.value)/100),className:"w-full accent-violet-500"})]})]})]})}function CD({myFullId:t,copied:e,onCopyMyId:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r,loading:o,onSoloPlay:u,multiOpen:h,onToggleMultiOpen:d,multiAction:p,onSetMultiAction:g,onQuickMatch:y,isPrivateRoom:R,onSetPrivateRoom:I,allowQuickMatch:O,onSetAllowQuickMatch:x,onCreateRoom:b,joinInput:N,onJoinInputChange:V,onJoinRoom:U,onCheckInvites:W,uiError:S,onClearUiError:_}){const E=SD,A=h&&!E;return c.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[c.jsx(Nc,{myFullId:t,copied:e,onCopy:n,seVolume:s,bgmVolume:a,onSeVolumeChange:i,onBgmVolumeChange:r}),c.jsxs("div",{className:"w-full max-w-md space-y-5 pt-10",children:[c.jsxs("div",{className:"flex flex-col items-center gap-4 text-center",children:[c.jsx("img",{src:ya(ES),alt:Cf,className:"mx-auto w-full max-w-[min(92vw,440px)] h-auto object-contain select-none drop-shadow-[0_0_28px_rgba(34,211,238,0.14)]"}),c.jsx("h2",{className:"font-[Rajdhani] text-lg sm:text-xl font-bold tracking-tight text-slate-50 leading-tight px-1",children:Cf}),c.jsxs("div",{className:"w-full rounded-xl border border-cyan-500/25 bg-slate-900/80 px-3 py-2.5 text-left",children:[c.jsx("p",{className:"text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400",children:"News · ひとこと"}),c.jsx("p",{className:"mt-1.5 text-xs text-slate-400 leading-relaxed",children:wD})]})]}),c.jsxs("div",{className:"text-center space-y-1 pt-1",children:[c.jsx("p",{className:"text-xs text-slate-500",children:"ようこそ"}),c.jsx("p",{className:"text-2xl font-bold",children:t||"プレイヤー"}),c.jsx("p",{className:"text-sm text-slate-400",children:"どのように遊びますか？"})]}),c.jsx("button",{type:"button",onClick:u,disabled:o,className:"w-full rounded-2xl bg-gradient-to-br from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 active:scale-[0.98] py-5 font-bold text-white text-xl transition-all disabled:opacity-50 shadow-lg shadow-violet-900/30 flex items-center justify-center gap-3",children:o?c.jsx(Lr,{size:24,className:"animate-spin"}):c.jsxs(c.Fragment,{children:[c.jsx("span",{className:"text-2xl",children:"🎮"}),c.jsx("span",{children:"一人で遊ぶ"})]})}),c.jsxs("div",{className:"relative",children:[c.jsxs("button",{type:"button",disabled:E,"aria-disabled":E,tabIndex:-1,title:"マルチプレイは開発中です",className:["w-full rounded-2xl py-5 font-bold text-xl shadow-lg flex items-center justify-center gap-3 transition-all","pointer-events-none cursor-not-allowed border border-slate-700/90 bg-slate-900/60 text-slate-500 grayscale opacity-[0.52]"].join(" "),children:[c.jsx("span",{className:"text-2xl grayscale",children:"👥"}),c.jsx("span",{className:"opacity-90",children:"みんなで遊ぶ（オンライン）"}),!E]}),c.jsx("div",{className:"pointer-events-none absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-0 px-2","aria-hidden":"true",children:c.jsxs("span",{className:"inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-950/92 px-2.5 py-1 shadow-[0_8px_28px_rgba(0,0,0,0.45)] ring-1 ring-cyan-500/15 backdrop-blur-sm",children:[c.jsx("span",{className:"rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-amber-950 shadow-sm",children:"Coming Soon"}),c.jsx("span",{className:"pr-1 text-[10px] font-bold tracking-wide text-cyan-100/95",children:"準備中"})]})})]}),A&&c.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900 p-4 space-y-3",children:[c.jsxs("button",{type:"button",onClick:y,disabled:o,className:"w-full rounded-xl bg-violet-700 hover:bg-violet-600 active:scale-[0.98] py-3.5 font-semibold text-white transition-all disabled:opacity-50 flex flex-col items-center gap-0.5",children:[c.jsx("span",{className:"text-base font-bold",children:"⚡ クイックマッチ"}),c.jsx("span",{className:"text-xs text-violet-300 opacity-80",children:"空きルームにランダム参加"})]}),c.jsxs("button",{type:"button",onClick:()=>g(w=>w==="create"?null:"create"),className:`w-full rounded-xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 ${p==="create"?"bg-cyan-600 text-white":"bg-slate-800 hover:bg-slate-700 text-slate-200"}`,children:[c.jsx("span",{className:"text-base font-bold",children:"🏠 新しいルームを作成"}),c.jsx("span",{className:"text-xs opacity-60",children:p==="create"?"▲ 閉じる":"ホストとしてルームを立てる ▼"})]}),p==="create"&&c.jsxs("div",{className:"rounded-xl bg-slate-800 border border-slate-700 p-3 space-y-3",children:[c.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[c.jsx("button",{type:"button",onClick:()=>I(!1),className:`rounded-xl py-2.5 text-sm font-semibold transition-all ${R?"bg-slate-700 text-slate-300 hover:bg-slate-600":"bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/60"}`,children:"🌐 公開ルーム"}),c.jsx("button",{type:"button",onClick:()=>I(!0),className:`rounded-xl py-2.5 text-sm font-semibold transition-all ${R?"bg-rose-500 text-white ring-2 ring-rose-400/60":"bg-slate-700 text-slate-300 hover:bg-slate-600"}`,children:"🔒 招待制"})]}),c.jsx("p",{className:"text-xs text-slate-400 text-center",children:R?"招待したIDのみ参加可":"ルームIDを知っていれば誰でも参加可"}),!R&&c.jsxs("div",{className:"flex items-center justify-between rounded-lg bg-slate-700 px-3 py-2.5",children:[c.jsxs("div",{children:[c.jsx("p",{className:"text-sm font-medium",children:"⚡ クイックマッチを受け入れる"}),c.jsx("p",{className:"text-xs text-slate-400",children:"OFFにすると自動マッチングから除外"})]}),c.jsx("button",{type:"button",onClick:()=>x(w=>!w),className:`relative shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${O?"bg-cyan-500":"bg-slate-600"}`,children:c.jsx("div",{className:`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${O?"translate-x-5":"translate-x-0.5"}`})})]}),c.jsx("button",{type:"button",onClick:b,disabled:o,className:"w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 py-2.5 font-bold text-slate-950 transition-colors disabled:opacity-50",children:o?"作成中…":"ルームを作成"})]}),c.jsxs("button",{type:"button",onClick:()=>g(w=>w==="join"?null:"join"),className:`w-full rounded-xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 ${p==="join"?"bg-cyan-600 text-white":"bg-slate-800 hover:bg-slate-700 text-slate-200"}`,children:[c.jsx("span",{className:"text-base font-bold",children:"🔑 ルームIDで参加"}),c.jsx("span",{className:"text-xs opacity-60",children:p==="join"?"▲ 閉じる":"6桁のルーム番号で入室 ▼"})]}),p==="join"&&c.jsx("div",{className:"rounded-xl bg-slate-800 border border-slate-700 p-3 space-y-2",children:c.jsxs("div",{className:"flex gap-2",children:[c.jsx("input",{value:N,onChange:w=>V(w.target.value.toUpperCase()),maxLength:8,onKeyDown:w=>w.key==="Enter"&&U(),className:"flex-1 rounded-lg border border-slate-700 bg-slate-700 px-3 py-2 text-sm text-center font-mono tracking-widest focus:border-cyan-500 focus:outline-none",placeholder:"ルームID",autoFocus:!0}),c.jsx("button",{type:"button",onClick:U,disabled:o,className:"rounded-xl bg-slate-600 hover:bg-slate-500 px-5 py-2 font-medium transition-colors disabled:opacity-50",children:"参加"})]})}),c.jsxs("button",{type:"button",onClick:W,disabled:o,className:"w-full rounded-xl bg-rose-700 hover:bg-rose-600 active:scale-[0.98] py-3.5 font-semibold text-white transition-all disabled:opacity-50 flex flex-col items-center gap-0.5",children:[c.jsx("span",{className:"text-base font-bold",children:"🔔 招待を確認"}),c.jsx("span",{className:"text-xs text-rose-300 opacity-80",children:"自分宛ての招待ルームを探す"})]})]}),S&&c.jsx("div",{className:"rounded-xl border border-rose-500/40 bg-rose-950/35 px-3 py-3 text-left shadow-lg shadow-black/25",role:"alert",children:c.jsxs("div",{className:"flex items-start gap-3",children:[c.jsx("span",{className:"text-base leading-none shrink-0 pt-0.5 opacity-95","aria-hidden":!0,children:"⚠️"}),c.jsx("p",{className:"flex-1 min-w-0 text-sm text-rose-100/95 leading-relaxed",children:S}),typeof _=="function"&&c.jsx("button",{type:"button",onClick:_,className:"shrink-0 rounded-lg p-1.5 text-rose-200/85 hover:bg-rose-500/15 hover:text-rose-50 transition-colors","aria-label":"エラーを閉じる",children:c.jsx(oS,{size:18})})]})}),c.jsxs("div",{className:"rounded-xl bg-slate-800/50 border border-slate-800 p-3 text-xs leading-relaxed text-slate-400 space-y-2.5",children:[c.jsx("p",{className:"font-semibold text-slate-300",children:"ゲーム概要"}),c.jsxs("p",{children:[c.jsxs("strong",{className:"text-slate-300",children:["1〜",Ea,"日目は育成パート。"]}),"毎ターン、仕事・配信・神社・デイリースロットのどれかを選び、資金や運・技量・善行などを育てていきます。キャラごとに生活費が異なり、行動後に毎回かかるので、お金の持ちぐあいが勝負の土台になります。"]}),c.jsxs("p",{children:[c.jsx("strong",{className:"text-slate-300",children:"PON"})," は行動のたびに少しずつ溜まり、高めになるとイベントが発生しやすくなります（内容は行動種別によって違うことも）。 配信は運要素が強く、技量や善行が結果に効いてきます。"]}),c.jsxs("p",{children:[c.jsxs("strong",{className:"text-slate-300",children:[ep,"日目は決戦。"]}),"すごろくでゴールを目指し、素早くゴールするとスロットを長く行えます。"]}),c.jsx("p",{className:"text-[11px] text-slate-500 pt-1 border-t border-slate-700/60 leading-snug",children:"具体的な金額・割合・各ステータスの効き方は、プレイ画面の説明やログで確認できます。"})]})]})]})}function kD(){const t=k.useMemo(()=>Array.from({length:40},(e,n)=>({id:n,left:(n*97+13)%100,delay:n*37%30/10,dur:2.2+n*17%20/10,sym:n%4===0?"¥":n%4===1?"★":n%4===2?"¥":"◆",size:13+n%5*4,color:n%3===0?"#fbbf24":n%3===1?"#fde68a":"#f59e0b"})),[]);return c.jsx("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-20",children:t.map(e=>c.jsx("span",{className:"absolute anim-particle font-black select-none",style:{left:`${e.left}%`,top:"-40px",fontSize:`${e.size}px`,color:e.color,animationDelay:`${e.delay}s`,animationDuration:`${e.dur}s`},children:e.sym},e.id))})}function ID(t,e,n){const s=t==="ririm"?"vtuber":t??"salaryman";return e&&n?s==="vtuber"?"Jackpot! My fans are gonna love this clip! ✨":s==="student"?"Whoa, it actually worked! Beginner's luck is real! 🎓":null:e&&!n?s==="vtuber"?"Whaat?! It looked so hot! This game is rigged! 💢":s==="student"?"Wait, that was a miss? But the effect was so flashy...":null:!e&&n?s==="salaryman"?"Calculated. Visual flair isn't everything. 💼":s==="student"?"Huh? I wasn't even watching and I won!":null:null}const Eb=0,MD=2e3,DD=600,jD=1e3,OD=new Set(["vtuber","ririm"]);function VD({gs:t,cpGs:e,isMyTurn:n,writeGS:s,commitPendingGameState:a,soundRef:i,roomId:r}){var Xe,zt;const[o,u]=k.useState(!1),[h,d]=k.useState(["?","?","?"]),[p,g]=k.useState(!1),[y,R]=k.useState(5),[I,O]=k.useState("standard"),[x,b]=k.useState([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),[N,V]=k.useState([!1,!1,!1]),[U,W]=k.useState(-1),[S,_]=k.useState(!1),[E,A]=k.useState(!1),[w,M]=k.useState(!1),[T,ue]=k.useState(!1),[me,X]=k.useState(null),[ie,se]=k.useState("idle"),[pe,Se]=k.useState(!1),[Qe,ht]=k.useState(!1),[Dt,Ue]=k.useState(0),[rt,xt]=k.useState(!1),$=k.useRef(null),ae=k.useRef([!1,!1,!1]),Y=k.useRef(null),oe=k.useRef(null),Ae=k.useRef(0),qe=(t==null?void 0:t.gamePhase)==="playing"&&(t==null?void 0:t.subPhase)==="day8"&&(e==null?void 0:e.movePhase)==="arrived",Ne=((zt=(Xe=t==null?void 0:t.displayReels)==null?void 0:Xe.join)==null?void 0:zt.call(Xe,","))??"",ze=(t==null?void 0:t.gamePhase)==="playing"&&n&&qe&&(e==null?void 0:e.slotTurnsLeft)>0&&!o&&!p;k.useEffect(()=>{if(!qe||o)return;const ee=t==null?void 0:t.displayReels;if(!Array.isArray(ee)||ee.length!==3)return;const q=Ta[I]??Ta.standard;b(ee.map((he,Ke)=>sp(he,q,Ke)))},[qe,o,Ne,I,t==null?void 0:t.displayReels]),k.useEffect(()=>{if(!p)return;if(y<=0){const q=Y.current;Y.current=null,g(!1),R(5),q&&r&&a(q);return}const ee=setTimeout(()=>R(q=>q-1),1e3);return()=>clearTimeout(ee)},[p,y,r,a]);const on=async()=>{const ee=Y.current;Y.current=null,g(!1),R(5),ee&&await s(ee)},jt=async()=>{if(!t||!n||o)return;const ee=t.currentPlayerIdx,q=t.players[ee],he=[`${q.name} スロット終了 / 資金${q.stats.money}G / ランク${Ac(q.stats.money)}`],Ke=t.players.map((ye,te)=>te!==ee?ye:{...ye,slotTurnsLeft:0,slotPullsGranted:0,slotPullsThisSeat:0});await s(Vr(t,Ke,he))},ot=async(ee=Af)=>{if(o||!n||!t)return;const q=t.players[t.currentPlayerIdx];if(q.slotTurnsLeft<=0)return;const he=Ta[I]??Ta.standard,Ke=q.slotHeat??0,ye=q.slotPityCounter??0,te=yS(q.stats,ee,I,Ke,q.characterType,{pityCounter:ye});let Ye=[...te.reels];if(te.tier==="miss"){const _e=he.symbols,dt=D.slot.nearMissReachChance,un=D.slot.slipSymbolChance,Et=Math.random();if(_e.length>=2&&Et<dt){const Lt=_e[$e(0,_e.length-1)],rs=_e.filter(Ct=>Ct!==Lt),qt=rs[$e(0,rs.length-1)];Ye=[Lt,Lt,qt]}else if(Et<dt+un){const Lt=$e(0,2);Ye[Lt]=_e[1]}}const{reachPossible:_t}=P3(Ye,te.tier),Ot=_t&&L3(),cn=Math.max(0,q.stats.luck-D.slot.luckBaseline),nn=Math.max(0,q.stats.skill-D.slot.skillBaseline),ft=te.tier!=="miss"&&(cn>=10||nn>=10),je=Ye.map((_e,dt)=>sp(_e,he,dt));Se(!0),setTimeout(()=>Se(!1),340),u(!0),_(!1),A(!1),M(!1),ue(!1),Ae.current=0,oe.current&&(clearTimeout(oe.current),oe.current=null),X(null),xt(!1),Ue(0),se("spinning"),ae.current=[!1,!1,!1],V([!1,!1,!1]),b([["🎰","🎰","🎰"],["🎰","🎰","🎰"],["🎰","🎰","🎰"]]),W(-1),d(Ye);const fe=i.current;fe==null||fe.playStart(),setTimeout(()=>fe==null?void 0:fe.startSpin(),200),$.current&&clearInterval($.current),$.current=setInterval(()=>{if(performance.now()<Ae.current)return;const _e=ae.current;b(dt=>dt.map((un,Et)=>_e[Et]?un:vS(he)))},80);const ke=(_e,dt,un)=>{if(un&&ft&&Math.random()<.5){const Lt=bS(dt[1],he),rs=[dt[0],Lt,dt[2]];ae.current[_e]=!0,b(qt=>{const Ct=[...qt];return Ct[_e]=rs,Ct}),W(_e),fe==null||fe.playStop(_e),setTimeout(()=>W(-1),430),setTimeout(()=>{b(qt=>{const Ct=[...qt];return Ct[_e]=dt,Ct}),V(qt=>{const Ct=[...qt];return Ct[_e]=!0,Ct}),setTimeout(()=>{V(qt=>{const Ct=[...qt];return Ct[_e]=!1,Ct})},560)},380)}else ae.current[_e]=!0,b(Lt=>{const rs=[...Lt];return rs[_e]=dt,rs}),W(_e),fe==null||fe.playStop(_e),setTimeout(()=>W(-1),430)},Bt=1200,Vt=1700,Ie=_t?Vt+2400:Vt+550,Tt=Ot?Math.max(Vt+480,Ie+Eb):1/0,Pt=Ot?Math.max(Ie+Eb,Math.round(Tt+MD)):Ie;setTimeout(()=>ke(0,je[0],!0),Bt),setTimeout(()=>ke(1,je[1],!0),Vt),_t&&setTimeout(()=>{_(!0),se("reach"),setTimeout(()=>fe==null?void 0:fe.playReach(),150)},Vt+400),Ot&&Tt<Pt&&(oe.current=setTimeout(()=>{oe.current=null,Ae.current=performance.now()+DD,ue(!0),setTimeout(()=>ue(!1),110),A(!0)},Tt));const Xn=()=>new Promise(_e=>{if(!Ot){A(!1),M(!1),_e();return}if(te.tier==="miss"){M(!0),fe==null||fe.playReachGaseSting(),setTimeout(()=>{A(!1),M(!1),_e()},720);return}setTimeout(()=>{A(!1),M(!1),_e()},200)});setTimeout(async()=>{oe.current&&(clearTimeout(oe.current),oe.current=null),Ot&&(await Xn(),await new Promise(ra=>setTimeout(ra,jD))),clearInterval($.current),fe==null||fe.stopSpin(),ke(2,je[2],!0),_(!1),b(je),te.tier!=="miss"?(Ue(te.payout),xt(!0),X(te.tier),se("win"),setTimeout(()=>fe==null?void 0:fe.playWin(te.tier),200),setTimeout(()=>X(null),4e3)):se("miss");const _e=te.payout-ee,dt=xn(q.stats.money-ee+te.payout),un=q.slotTurnsLeft-1,Et=(q.slotPullsThisSeat??0)+1,Lt=q.spinCount+1,rs=q.slotNet+_e,qt=Ke+1,Ct=t.players.map((ra,Bs)=>Bs!==t.currentPlayerIdx?ra:{...ra,stats:{...ra.stats,money:dt},slotTurnsLeft:un,slotPullsThisSeat:Et,spinCount:Lt,slotNet:rs,slotHeat:qt,slotPityCounter:te.pityCounterAfter,lastSpinResult:{...te,net:_e,spin:Lt}}),hn=(qt*1.5).toFixed(1),aa=qt>=10?"🔥 BURNING!!":qt>=6?"🌡️ 熱くなってきた！":"🌀 台が温まってきた！",Rn=ID(q.characterType,Ot,te.tier!=="miss"),ws=te.pityForced?`  🎯 善行ピティ: 連続ハズレ${te.maxPity}回で今回は役確定（カウンタリセット）`:`  🎯 善行ピティ: ${te.pityCounterAfter}/${te.maxPity}（善行が高いほど天井までの回数が減ります）`,ia=[`${q.name} スロット${Lt}回[${he.emoji}${he.label}|${ee}G]: ${te.message} / 収支${_e>=0?"+":""}${_e}G / 合計${rs>=0?"+":""}${rs}G | JP ${(te.r.jp*100).toFixed(1)}% ハズレ ${(te.r.miss*100).toFixed(1)}%`,ws,`  技量によりハズレを${(te.r.skillMissReduced*100).toFixed(2)}%削減 / 運：当−${(te.r.luckDrainAtari*100).toFixed(2)}%・小−${(te.r.luckDrainSmall*100).toFixed(2)}%→上位 / 熟成でハズレ${(te.r.heatMissReduced*100).toFixed(2)}%削減`,`  ${aa} ハズレ確率が${hn}%ダウン（熟成Lv${qt}）`];Rn&&ia.push(`💬 ${q.name}: 「${Rn}」`);const Wn={...t,players:Ct,displayReels:Ye,showSpinResult:!0,log:da(ia,t.log)};Y.current=Vr(Wn,Ct,[]),g(!0),R(5),await s(Wn),d(te.reels),u(!1)},Pt)};if(!e||!qe)return null;const Nn=Math.max(1,D.dice.slotsPerSugorokuTurn),ve=e.slotPullsThisSeat??0,ge=Math.min(e.slotTurnsLeft??0,Math.max(0,Nn-ve)),xe="/".replace(/\/?$/,"/");return c.jsxs(c.Fragment,{children:[c.jsxs("div",{className:E?"anim-slot-reach-machine-shake":"",children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsxs("h2",{className:"font-semibold",children:["8日目 スロットターン — ",e.name]}),c.jsxs("button",{type:"button",onClick:()=>{var q;const ee=!Qe;ht(ee),(q=i.current)==null||q.setMuted(ee)},title:Qe?"ミュート解除":"ミュート",className:`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${Qe?"border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500":"border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"}`,children:[Qe?c.jsx(d3,{size:14}):c.jsx(h3,{size:14}),Qe?"OFF":"ON"]})]}),e.slotTurnsLeft>0||p?c.jsxs("div",{className:"space-y-4",children:[(()=>{var je;const ee=Ta[I]??Ta.standard,q=e.slotHeat??0,he=pS(e.stats,ee,q,e.characterType),Ke=(he.heatMissReduced*100).toFixed(1),ye=q>=10,te=q>=6,Ye=ye?"text-red-400":te?"text-orange-400":q>=3?"text-yellow-400":"text-slate-400",_t=ye?"🔥 BURNING!!":te?"🌡️ 熱い！":q>=3?"🌀 温まってきた":"❄️ 冷",Ot=Math.min(100,q/15*100),cn=ye?"bg-red-500":te?"bg-orange-500":q>=3?"bg-yellow-500":"bg-slate-600",nn=e.slotPityCounter??0,ft=gS((je=e.stats)==null?void 0:je.virtue);return c.jsxs("div",{className:"rounded-lg bg-slate-800/50 p-3 text-xs space-y-2",children:[n&&!p&&c.jsx("div",{className:"flex gap-2 flex-wrap pb-1 border-b border-slate-700",children:Object.values(Ta).map(fe=>c.jsxs("button",{type:"button",onClick:()=>O(fe.key),className:`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors border ${I===fe.key?`${fe.border} ${fe.color}`:"border-slate-700 text-slate-400 hover:border-slate-500"}`,children:[fe.emoji," ",fe.label]},fe.key))}),c.jsxs("div",{className:`rounded-lg border px-3 py-2 space-y-1.5 ${ye?"border-red-500/60 bg-red-500/10":te?"border-orange-500/50 bg-orange-500/8":"border-slate-700 bg-slate-900/40"}`,children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsxs("span",{className:`font-black text-sm tracking-wide ${Ye}`,children:["LUCKY LEVEL ",q]}),c.jsx("span",{className:`text-xs font-bold ${Ye}`,children:_t})]}),c.jsx("div",{className:"h-2.5 rounded-full bg-slate-700 overflow-hidden",children:c.jsx("div",{className:`h-full rounded-full transition-all duration-500 ${cn} ${ye?"animate-pulse":""}`,style:{width:`${Ot}%`}})}),c.jsxs("div",{className:"flex justify-between text-slate-500",style:{fontSize:"10px"},children:[c.jsxs("span",{children:["熟成でハズレから ",Ke,"% を上位4役へ配分（内訳は右）"]}),c.jsxs("span",{children:["JP+",(q*.1).toFixed(1),"% / 大当+",(q*.3).toFixed(1),"% / 中当+",(q*.5).toFixed(1),"% / 当+",(q*.6).toFixed(1),"%"]})]})]}),c.jsxs("div",{className:"rounded-lg border border-emerald-700/45 bg-emerald-950/25 px-3 py-2 space-y-0.5",children:[c.jsxs("div",{className:"flex items-center justify-between text-[11px]",children:[c.jsx("span",{className:"font-semibold text-emerald-200/95",children:"善行ピティ（連続ハズレ天井）"}),c.jsxs("span",{className:"tabular-nums text-emerald-100 font-bold",children:[nn," / ",ft]})]}),c.jsxs("p",{className:"text-slate-500",style:{fontSize:"10px"},children:["ハズレるたび +1。",ft,"回ハズレで次スピンは当たり確定（役は通常抽選）。当たり後 0 にリセット。善行が高いほど天井までが短い。"]})]}),c.jsxs("p",{className:"text-slate-300",children:["現資金 ",c.jsx("span",{className:"font-bold text-white text-base",children:e.stats.money}),"G",e.spinCount>0&&c.jsxs("span",{className:`ml-2 font-semibold ${e.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:["スロット収支: ",e.slotNet>=0?"+":"",e.slotNet,"G"]})]}),(()=>{const fe=Math.max(0,e.stats.luck-D.slot.luckBaseline),ke=Math.max(0,e.stats.skill-D.slot.skillBaseline),Bt=ke>=D.slot.skillBlockSize?Math.floor(ke/D.slot.skillBlockSize):0,Vt=fe>0,Ie=Bt>0;return Vt||Ie?c.jsxs("div",{className:"flex gap-1.5 flex-wrap",children:[Vt&&c.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 px-2 py-0.5 text-[10px] font-bold text-yellow-300",children:["✨ 運：運100で当−2%・小−3%→JP・大（現在+",fe,"点 → 当最大−",(D.slot.luckAtariDrainAtLuck100*100*fe/D.slot.luckRefSpan).toFixed(1),"%・小最大−",(D.slot.luckSmallDrainAtLuck100*100*fe/D.slot.luckRefSpan).toFixed(1),"%）"]}),Ie&&c.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-[10px] font-bold text-sky-300",children:["⚙️ 技量：満",D.slot.skillBlockSize,"点ごとハズレ",(D.slot.skillMissReducePerBlock*100).toFixed(1),"%→中",(D.slot.skillToMid*100).toFixed(0),"%・当",(D.slot.skillToAtari*100).toFixed(0),"%・小",(D.slot.skillToSmall*100).toFixed(0),"%（",Bt,"段 × ",(D.slot.skillMissReducePerBlock*100).toFixed(1),"%＝最大",(Bt*D.slot.skillMissReducePerBlock*100).toFixed(1),"%）"]})]}):null})(),c.jsxs("p",{className:"text-slate-500",style:{fontSize:"10px"},children:["[",ee.emoji,ee.label,"] JP ",c.jsxs("span",{className:"text-yellow-400 font-semibold",children:[(he.jp*100).toFixed(2),"%"]}),"  /  ","大当 ",c.jsxs("span",{className:"text-amber-400 font-semibold",children:[(he.big*100).toFixed(2),"%"]}),"  /  ","中当 ",c.jsxs("span",{className:"text-emerald-400 font-semibold",children:[(he.mid*100).toFixed(2),"%"]}),"  /  ","当 ",c.jsxs("span",{className:"text-cyan-400 font-semibold",children:[(he.atari*100).toFixed(2),"%"]}),"  /  ","小当 ",c.jsxs("span",{className:"text-slate-300 font-semibold",children:[(he.small*100).toFixed(2),"%"]}),"  /  ","ハズレ ",c.jsxs("span",{className:"text-rose-400 font-semibold",children:[(he.miss*100).toFixed(1),"%"]})]}),c.jsxs("p",{className:"text-slate-500 border-t border-slate-700/80 pt-1.5 mt-1",style:{fontSize:"10px"},children:["再配分内訳：技量でハズレ ",c.jsxs("span",{className:"text-sky-400 font-semibold",children:["−",(he.skillMissReduced*100).toFixed(2),"%"]})," · ","運で小役→上位 ",c.jsxs("span",{className:"text-yellow-400 font-semibold",children:[(he.luckConverted*100).toFixed(2),"%"]})," · ","熟成でハズレ ",c.jsxs("span",{className:"text-orange-400 font-semibold",children:["−",(he.heatMissReduced*100).toFixed(2),"%"]})]})]})})(),(()=>{const ee=e.slotHeat??0,q=ee>=10?"anim-heat-burning":ee>=6?"anim-heat-warm":"",he=e.characterType??"salaryman",Ke=ie==="win"?"anim-char-bounce":ie==="reach"?"anim-char-pray":ie==="spinning"?"anim-char-wobble":ie==="miss"?"anim-char-sad":"",ye=Math.max(0,e.stats.luck-D.slot.luckBaseline),te=Math.max(0,e.stats.skill-D.slot.skillBaseline),Ye=ye>=50?3:ye>=30?2:ye>=10?1:0,_t=te>=30?2:te>=10?1:0,Ot=Ye>=1&&_t>=1,cn=o&&(Ye>0||_t>0);let nn="";cn&&(Ot?nn="slot-cabinet-stage--aura-combo":Ye>=3?nn="slot-cabinet-stage--aura-luck3":Ye===2?nn="slot-cabinet-stage--aura-luck2":Ye===1?nn="slot-cabinet-stage--aura-luck1":_t>=2?nn="slot-cabinet-stage--aura-skill2":_t===1&&(nn="slot-cabinet-stage--aura-skill1"));const ft=!!me,je={top:"var(--slot-window-top)",left:"var(--slot-window-left)",width:"var(--slot-window-width)",height:"var(--slot-window-height)"};return c.jsxs("div",{className:`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${q} ${me==="jackpot"?"anim-jp-rainbow":""}`,children:[me&&me!=="miss"&&c.jsx("div",{className:"absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl",children:Array.from({length:me==="jackpot"?28:me==="big"?16:8},(fe,ke)=>c.jsx("span",{style:{position:"absolute",left:`${(ke*97+11)%100}%`,top:"-30px",fontSize:me==="jackpot"?"1.6rem":"1.2rem",animation:`coinDrop ${1.4+ke*.11%1.2}s ${ke*.07%1.1}s ease-in forwards`},children:me==="jackpot"?["🪙","⭐","💎","✨"][ke%4]:"🪙"},ke))}),c.jsx("div",{className:"relative z-[8] flex flex-col items-center gap-3 w-full",children:c.jsxs("div",{className:["slot-cabinet-stage relative mx-auto w-full max-w-[min(100%,440px)]",pe?"slot-cabinet-recoiling":"",nn].filter(Boolean).join(" "),children:[rt&&Dt>0&&c.jsx("div",{className:"pointer-events-none absolute top-1/2 z-[42] flex -translate-y-1/2 items-center pl-2 sm:pl-3",style:{left:"100%"},"aria-live":"polite","aria-atomic":"true",children:c.jsxs("span",{role:"presentation",className:"anim-slot-payout-popup font-black tabular-nums leading-none tracking-tight text-[#ffe566]",style:{fontSize:"clamp(2.5rem, min(14vw, 5rem), 5rem)",WebkitTextStroke:"2px rgba(120,53,15,0.85)",paintOrder:"stroke fill",textShadow:"0 0 2px #000, 0 2px 0 #854d0e, 0 4px 12px rgba(0,0,0,0.75), 0 0 28px rgba(250,204,21,0.75), 0 0 48px rgba(234,179,8,0.45)"},onAnimationEnd:()=>{xt(!1),Ue(0)},children:["+",Dt,"G"]})}),S&&c.jsx("p",{className:"pointer-events-none absolute -top-7 left-0 right-0 z-[30] text-center text-xs font-bold text-red-400 animate-pulse",children:"🎯 REACH!!"}),c.jsxs("div",{className:"slot-machine-stack relative w-full min-h-[200px]",children:[c.jsx("div",{className:"absolute z-0 rounded-sm bg-[#0a0d14] pointer-events-none",style:je,"aria-hidden":!0}),c.jsxs("div",{className:"slot-reel-window absolute z-[1] overflow-hidden rounded-sm pointer-events-none",style:je,children:[c.jsx("div",{className:"slot-grid-3x3 flex h-full w-full flex-row",style:{gap:"var(--slot-reel-gap)",padding:"var(--slot-reel-pad-y) var(--slot-reel-pad-x)"},children:x.map((fe,ke)=>c.jsx("div",{className:["slot-reel-col relative flex min-h-0 h-full min-w-0 flex-1 flex-col overflow-hidden rounded-sm",U===ke?"anim-reel-bounce":"",S&&ke===2?"ring-2 ring-amber-400/70 ring-offset-0 rounded-sm":""].filter(Boolean).join(" "),children:c.jsx("div",{className:["slot-reel-strip w-full transition-transform duration-500 ease-out",N[ke]?"slot-reel-strip--slip":""].filter(Boolean).join(" "),children:fe.map((Bt,Vt)=>{const Ie=Vt===1,Tt=Ie&&!ae.current[ke]&&o;return c.jsx("div",{className:["slot-cell flex min-h-0 min-w-0 items-center justify-center border border-slate-600/50 text-slate-100",Ie?"slot-cell--payline":"slot-cell--edge",Ie&&ft?"slot-cell--win-pulse":"",Vt===1?"bg-[color-mix(in_srgb,var(--slot-reel-face)_75%,#272e3d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]":"bg-[color-mix(in_srgb,var(--slot-reel-face)_55%,#0f141c)]",Tt?"slot-cell--spinning":""].filter(Boolean).join(" "),children:Bt},`${ke}-${Vt}`)})})},ke))}),c.jsx("div",{className:"slot-win-line","aria-hidden":!0}),c.jsx("span",{className:"slot-payline-marker slot-payline-marker--l","aria-hidden":!0,children:"▶"}),c.jsx("span",{className:"slot-payline-marker slot-payline-marker--r","aria-hidden":!0,children:"◀"}),c.jsx("div",{className:"slot-reel-vignette","aria-hidden":!0})]}),cn&&c.jsxs("div",{className:"pointer-events-none absolute z-[2] mix-blend-screen overflow-hidden rounded-sm",style:je,"aria-hidden":!0,children:[(Ye>=2||Ot)&&Array.from({length:Ot?14:10},(fe,ke)=>c.jsx("span",{className:"absolute text-[11px]",style:{left:`${(ke*71+13)%94}%`,top:`${(ke*47+11)%88}%`,opacity:Ot?.5:.45,animation:`sparkle ${.42+ke%3*.08}s ease-in-out ${ke%6*.06}s infinite`,filter:Ot?"drop-shadow(0 0 4px #fde047)":"drop-shadow(0 0 3px rgba(253,224,71,0.8))"},children:Ot&&ke%3===0?"✨":"✦"},`cab-spark-${ke}`)),_t>=1&&!Ot&&Ye===0&&Array.from({length:8},(fe,ke)=>c.jsx("span",{className:"absolute text-[10px] text-emerald-200/90",style:{left:`${(ke*83+19)%92}%`,top:`${ke*59%86}%`,opacity:.4,animation:`auraSparkFloat ${2+ke%4*.15}s linear ${ke*.12}s infinite`},children:"✦"},`cab-sk-${ke}`))]}),c.jsx("div",{className:"slot-cabinet-img-wrap relative z-[10] mx-auto w-full max-w-full pointer-events-none",children:c.jsx("img",{src:TS,alt:"",decoding:"async",draggable:!1,className:"slot-cabinet-img mx-auto block h-auto w-full max-w-full select-none pointer-events-none",onError:fe=>{const ke=fe.currentTarget,Bt="/".replace(/\/?$/,"/"),Vt=ke.dataset.cabinetImgTry??"0";Vt==="0"?(ke.dataset.cabinetImgTry="1",ke.src=`${Bt}assets/images/slot-machine.png`):Vt==="1"&&(ke.dataset.cabinetImgTry="2",ke.src=`${Bt}images/slot-machine.png`)}})}),c.jsx("button",{type:"button",title:"SPIN（100G・筐体）","aria-label":"スロットを回す（100G）",disabled:!ze,className:"absolute z-[20] cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-70 active:translate-y-0.5 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",style:{top:"var(--slot-spin-top)",left:"var(--slot-spin-left)",width:"var(--slot-spin-w)",height:"var(--slot-spin-h)"},onClick:()=>ot(Af)})]})]})}),c.jsx("div",{className:"relative z-[12] flex justify-center pointer-events-none mt-2",children:c.jsx(yo,{characterType:he,imgClassName:`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${Ke}`,spanClassName:`text-5xl leading-none inline-block ${Ke}`})}),me==="jackpot"&&c.jsx("p",{className:"relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse",style:{textShadow:"0 0 20px #fbbf24, 0 0 40px #f59e0b"},children:"🎰 777 JACKPOT!! 🎰"})]})})(),t.showSpinResult&&e.lastSpinResult&&c.jsxs("div",{className:`rounded-xl border p-3 text-sm ${e.lastSpinResult.tier==="jackpot"?"border-amber-400/60 bg-amber-400/10 text-amber-200":e.lastSpinResult.tier==="miss"?"border-slate-700 bg-slate-800/50 text-slate-400":"border-emerald-400/40 bg-emerald-400/10 text-emerald-200"}`,children:[c.jsx("p",{className:"font-semibold",children:e.lastSpinResult.message}),c.jsxs("p",{className:"text-xs mt-1",children:[e.lastSpinResult.spin,"回目 / 収支",e.lastSpinResult.net>=0?"+":"",e.lastSpinResult.net,"G / JP率 ",(e.lastSpinResult.r.jp*100).toFixed(1),"% / ハズレ率"," ",(e.lastSpinResult.r.miss*100).toFixed(1),"%"]}),c.jsxs("p",{className:"text-[10px] mt-1 text-slate-500 leading-snug",children:["技量でハズレ −",((e.lastSpinResult.r.skillMissReduced??0)*100).toFixed(2),"% / 運で小役→上位"," ",((e.lastSpinResult.r.luckConverted??0)*100).toFixed(2),"% / 熟成でハズレ −",((e.lastSpinResult.r.heatMissReduced??0)*100).toFixed(2),"%"]})]}),c.jsxs("div",{className:"flex flex-col gap-1.5",children:[(e.slotTurnsLeft>0||p)&&c.jsx("div",{className:"w-full rounded-lg bg-amber-500/15 border border-amber-400/35 px-3 py-1.5 text-center",children:c.jsxs("span",{className:"text-lg font-black tabular-nums text-amber-100",children:["残り ",ge,"/",Nn]})}),c.jsx("div",{className:"flex gap-3 flex-wrap",children:p?c.jsxs("button",{type:"button",onClick:on,className:"inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 animate-pulse",children:[c.jsx(J0,{size:18}),"確認（",y,"秒で自動進行）"]}):c.jsxs(c.Fragment,{children:[x3.map(ee=>{const q=!ze,he=ee===100?"bg-cyan-600 hover:bg-cyan-500":ee===300?"bg-violet-600 hover:bg-violet-500":ee===500?"bg-amber-500 hover:bg-amber-400":"bg-rose-600 hover:bg-rose-500";return c.jsxs("button",{type:"button",onClick:()=>ot(ee),disabled:q,className:`inline-flex items-center gap-1.5 rounded-xl ${he} px-4 py-2.5 font-semibold text-white transition-colors disabled:opacity-40`,children:[c.jsx(bd,{size:16}),o?"…":c.jsxs("span",{className:"flex flex-col items-start leading-tight",children:[c.jsxs("span",{children:[ee,"G"]}),e.stats.money<ee&&c.jsx("span",{className:"text-[9px] font-normal opacity-80",children:"←借金プレイ"})]})]},ee)}),c.jsxs("button",{type:"button",onClick:jt,disabled:o,className:"inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600 transition-colors disabled:opacity-40",children:[c.jsx(J0,{size:16}),"終了・次へ"]})]})})]})]}):c.jsx("p",{className:"text-sm text-slate-400",children:"スロット回数を全て使いました。"})]}),E&&c.jsxs("div",{className:["slot-reach-cutin-full",w?"slot-reach-cutin-full--gase":""].filter(Boolean).join(" "),"aria-hidden":!0,children:[c.jsx("div",{className:"slot-reach-cutin-full-speed"}),c.jsx("div",{className:"slot-reach-cutin-full-dim"}),c.jsx("div",{className:"slot-reach-cutin-full-vignette"}),c.jsx("div",{className:"slot-reach-cutin-full-scan slot-reach-cutin-full-scan--top"}),c.jsx("div",{className:"slot-reach-cutin-full-scan slot-reach-cutin-full-scan--bottom"}),c.jsx("div",{className:"slot-reach-cutin-full-frame"}),c.jsxs("div",{className:"slot-reach-cutin-full-center",children:[c.jsxs("div",{className:"slot-reach-cutin-hero",children:[c.jsx("div",{className:"slot-reach-cutin-hero-bar","aria-hidden":!0}),OD.has(e==null?void 0:e.characterType)?c.jsx("img",{alt:"",decoding:"async",draggable:!1,src:`${xe}images/chance_rrm.png`,className:"select-none",onError:ee=>{const q=ee.currentTarget;(q.dataset.chanceCutinTry??"0")==="0"&&(q.dataset.chanceCutinTry="1",q.src=`${xe}assets/images/chance_rrm.png`)}}):c.jsx(yo,{characterType:(e==null?void 0:e.characterType)??"salaryman",imgClassName:"",spanClassName:"select-none block mx-auto text-[clamp(4rem,18vw,8rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]"}),c.jsx("div",{className:"slot-reach-cutin-hero-bar slot-reach-cutin-hero-bar--bottom","aria-hidden":!0})]}),c.jsx("p",{className:"slot-reach-cutin-full-chance-tag font-black",children:"チャンス！！"})]})]}),T&&c.jsx("div",{className:"fixed inset-0 z-[10060] pointer-events-none anim-slot-reach-cutin-white-flash","aria-hidden":!0})]})}const PD="#EFFF42";function Sb(t){return Number.isFinite(t)?Math.max(0,Math.min(1,t)):0}function LD({label:t,value:e,min:n,max:s,suffix:a="",hideNumeric:i=!1,barFillPercent:r=null,barShuffle:o=!1,showMaxRollGlow:u=!1,showScaleRange:h=!1,scaleRangeLabel:d="",overviewHint:p="",className:g=""}){const y=s>n?s-n:1,R=Sb((Number(e)-n)/y),I=r!=null&&Number.isFinite(Number(r))?Sb(Number(r)/100)*100:R*100,O=d||`${Math.round(n)}${a}〜${Math.round(s)}${a}`,x=c.jsxs(c.Fragment,{children:[c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("span",{className:"w-10 shrink-0 text-right text-[13px] font-bold tracking-tight text-slate-100",children:t}),c.jsxs("div",{className:`relative h-[26px] min-w-0 flex-1 overflow-hidden border-[2px] border-black bg-white shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.06)] transition-[box-shadow] duration-300 ${u?"lobby-gauge-max-ring":""}`,children:[c.jsx("div",{className:`absolute left-0 top-0 z-[1] h-full origin-left ${o?"lobby-gauge-fill-shuffle":"transition-[width] duration-500 ease-in-out"}`,style:{width:`${I}%`,backgroundColor:PD}}),c.jsx("div",{className:"pointer-events-none absolute bottom-[3px] left-[6px] right-[6px] z-[2] h-px bg-black"}),[20,40,60,80].map((b,N)=>{const V=N===0||N===3;return c.jsx("div",{className:"pointer-events-none absolute bottom-[3px] z-[2] w-px bg-black",style:{left:`${b}%`,height:V?"70%":"42%",transform:"translateX(-50%)"}},b)})]}),c.jsx("span",{className:"w-[52px] shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-slate-200",children:i?`—${a}`:`${Math.round(Number(e))}${a}`})]}),h?c.jsxs("div",{className:"flex items-start gap-2",children:[c.jsx("span",{className:"w-10 shrink-0","aria-hidden":!0}),c.jsx("p",{className:"min-w-0 flex-1 text-center text-[9px] tabular-nums leading-tight text-slate-500",children:O}),c.jsx("span",{className:"w-[52px] shrink-0","aria-hidden":!0})]}):null]});return p?c.jsxs("div",{className:`group/stat-hint relative flex flex-col gap-0.5 ${g}`,children:[c.jsx("div",{className:"cursor-help rounded-md px-0.5 py-0.5 outline-none ring-offset-2 ring-offset-slate-900 transition-colors hover:bg-slate-800/40 focus-visible:ring-2 focus-visible:ring-cyan-500/50",tabIndex:0,children:x}),c.jsx("div",{role:"tooltip",className:"pointer-events-none absolute left-1/2 top-full z-[100] mt-1 w-max max-w-[min(288px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-left text-[11px] leading-snug text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-0 transition-opacity duration-150 delay-75 invisible group-hover/stat-hint:opacity-100 group-hover/stat-hint:visible group-hover/stat-hint:delay-0 group-focus-within/stat-hint:opacity-100 group-focus-within/stat-hint:visible group-focus-within/stat-hint:delay-0",children:p})]}):c.jsx("div",{className:`flex flex-col gap-0.5 ${g}`,children:x})}const wb="salaryman",Nh=3,Rm=Nh+1,Pl=[{id:"luck",label:"運",valueKey:"luck",rollKey:"luckRoll",suffix:"",rangeKey:"luck",overview:"運気の強さです。伸びるとすごろくのダイスなどで追い風になりやすくなります。"},{id:"skill",label:"技量",valueKey:"skill",rollKey:"skillRoll",suffix:"",rangeKey:"skill",overview:"腕前やコツのイメージです。スロットでは当たりやすさなどに効いてきます。"},{id:"virtue",label:"善行",valueKey:"virtue",rollKey:"virtueRoll",suffix:"",rangeKey:"virtue",overview:"善行の蓄えです。ダイスや日常イベントで「最低限ここまで」が変わるなど、行動の土台に効きます。"},{id:"pon",label:"PON",valueKey:"pon",rollKey:"ponRoll",suffix:"",rangeKey:"pon",overview:"ストレスや無謀さの目安です。高まると荒れた展開に振れやすくなります。"},{id:"livingCost",label:"生活費",valueKey:"livingCost",rollKey:"livingRoll",suffix:"G",rangeKey:"livingCost",overview:"暮らしの固定費です。日が進むたびにこの負担がのしかかり、資金との攻防になります。"}];function UD(t){const e=np(t);return{luck:e.luck.min,skill:e.skill.min,virtue:e.virtue.min,pon:e.pon.min,livingCost:e.livingCost.min}}function zD(t,e){const n=UD(e),s={...n};if(!t||typeof t!="object")return s;for(const a of Object.keys(n)){const i=t[a];Number.isFinite(Number(i))&&(s[a]=Number(i))}return{...t,...s}}function Ab(t,e){const n=ey(t,e);return{luck:n.luck,skill:n.skill,virtue:n.virtue,pon:n.pon,livingCost:n.livingCost,luckRoll:t.luck,skillRoll:t.skill,virtueRoll:t.virtue,ponRoll:t.pon,livingRoll:dS(t)}}const SS=148,wS=72,BD=wS+SS*(Pl.length-1);function pl(t){return`${Math.max(0,Math.min(100,t)).toFixed(3)}%`}function $D(t,e){const n=e>0?t/e*100:100;return`
@keyframes dice-roll-sync {
  0% {
    transform: translate(-110px, -55px) rotate(0deg) scale(0.82);
    filter: drop-shadow(12px 18px 8px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.35));
  }
  ${pl(n*.38)} {
    transform: translate(-52px, 14px) rotate(210deg) scale(1);
    filter: drop-shadow(10px 14px 10px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  ${pl(n*.72)} {
    transform: translate(10px, -24px) rotate(460deg) scale(1.08);
    filter: drop-shadow(8px 12px 12px rgba(0, 0, 0, 0.42)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.22));
  }
  ${pl(n*.94)} {
    transform: translate(0, 0) rotate(660deg) scale(1);
    filter: drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.25));
  }
  ${pl(n)} {
    transform: translate(0, 0) rotate(720deg) scale(1);
    filter: drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.48)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  ${pl(n+(100-n)*.42)} {
    transform: translate(0, -12px) rotate(738deg) scale(1.05);
    filter: drop-shadow(12px 22px 18px rgba(0, 0, 0, 0.32)) drop-shadow(0 0 18px rgba(255, 255, 255, 0.32));
  }
  ${pl(n+(100-n)*.78)} {
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
`}function Nb(t){const e=(s,a)=>s+Math.random()*(a-s),n=()=>Math.floor(Math.random()*6);return{luck:e(t.luck.min,t.luck.max),skill:e(t.skill.min,t.skill.max),virtue:e(t.virtue.min,t.virtue.max),pon:e(t.pon.min,t.pon.max),livingCost:e(t.livingCost.min,t.livingCost.max),luckRoll:n(),skillRoll:n(),virtueRoll:n(),ponRoll:n(),livingRoll:n()}}function FD(t,e,n){const s={...t};for(let a=0;a<=n;a++){const{valueKey:i,rollKey:r}=Pl[a];s[i]=e[i],s[r]=e[r]}return s}const qD=`
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
@media (prefers-reduced-motion: reduce) {
  .ririm-secret-card {
    animation: none;
  }
}
`;function Rb({playerSlots:t,myId:e,onSelectCharacter:n,onCommitInitialRolls:s,soundRef:a,waitingSessionKey:i,unlockPlayerNameForSecret:r}){const o=t.find(Y=>Y.id===e),u=(o==null?void 0:o.character)??null,h=k.useMemo(()=>{const Y=(o==null?void 0:o.name)??"",oe=r??"";return Rf(Y)||Rf(oe)},[o==null?void 0:o.name,r]),d=k.useMemo(()=>Object.values(rn).filter(Y=>Y.key!==Nf||h),[h]),[p,g]=k.useState(null),[y,R]=k.useState(0),[I,O]=k.useState(()=>Sh()),[x,b]=k.useState(!1),[N,V]=k.useState(!1),[U,W]=k.useState(null),[S,_]=k.useState(()=>new Set),[E,A]=k.useState(920),[w,M]=k.useState(""),[T,ue]=k.useState(!1),me=k.useRef([]),X=k.useRef(null);k.useEffect(()=>()=>{me.current.forEach(Y=>{clearInterval(Y),clearTimeout(Y)}),me.current=[]},[]);const ie=Math.max(0,Nh-Math.max(0,y-1)),se=y<Rm&&!x,pe=u??wb,Se=np(pe);k.useLayoutEffect(()=>{x||(g(null),R(0),O(Sh()),W(null),V(!1),ue(!1),M(""),_(new Set))},[i]);const Qe=ai(o==null?void 0:o.initialRolls),ht=Qe?`${Qe.luck}-${Qe.skill}-${Qe.virtue}-${Qe.pon}`:"";k.useEffect(()=>{x||Qe&&(g(Qe),O(Qe),R(Y=>Math.max(Y,1)))},[ht,x]);const Dt=Ab(p??I,pe),Ue=U??zD(Dt,pe),rt=(Ue==null?void 0:Ue.roll)!=null?Ue.roll:null,xt=Y=>new Promise(oe=>{const Ae=setTimeout(oe,Y);me.current.push(Ae)}),$=async Y=>{if(x)return;if(!(ai(o==null?void 0:o.initialRolls)!=null)){const Ae=p??I,qe=ai({luck:Ae.luck,skill:Ae.skill,virtue:Ae.virtue,pon:Ae.pon});if(qe){await n(Y,qe),g(qe),O(qe),R(Ne=>Math.max(Ne,1));return}}await n(Y)},ae=async()=>{var on,jt,ot,Nn,ve;if(!se||x)return;const Y=u??wb,oe=Sh(),Ae=Ab(oe,Y),qe=np(Y),Ne=a==null?void 0:a.current;let ze=null;try{const ge=Math.round(800+Math.random()*200),xe=ge+BD;M($D(ge,xe)),A(xe),ue(!0),b(!0),V(!0),_(new Set),ze=((on=Ne==null?void 0:Ne.startDiceRoll)==null?void 0:on.call(Ne))??null;let Xe=Nb(qe);W(Xe),await new Promise(q=>{let he=!1,Ke;const ye=setInterval(()=>{Xe=Nb(qe),W({...Xe})},46);me.current.push(ye),Ke=setTimeout(()=>{he||(he=!0,clearInterval(ye),clearTimeout(Ke),q())},ge),me.current.push(Ke)}),X.current&&clearTimeout(X.current),X.current=setTimeout(()=>{X.current=null,ue(!1)},xe+200),me.current.push(X.current),(jt=ze==null?void 0:ze.stop)==null||jt.call(ze),ze=null,V(!1);let zt=Xe;W({...zt});for(let q=0;q<Pl.length;q++){await xt(q===0?wS:SS),zt=FD(zt,Ae,q),W({...zt});const he=Pl[q].rollKey,Ke=Ae[he];if((ot=Ne==null?void 0:Ne.playDiceTick)==null||ot.call(Ne),Ke===5){(Nn=Ne==null?void 0:Ne.playDiceMaxSpark)==null||Nn.call(Ne);const ye=Pl[q].id;_(Ye=>new Set(Ye).add(ye));const te=setTimeout(()=>{_(Ye=>{const _t=new Set(Ye);return _t.delete(ye),_t})},720);me.current.push(te)}}if(!await s({luck:oe.luck,skill:oe.skill,virtue:oe.virtue,pon:oe.pon}))return;g(oe),R(q=>q+1)}finally{(ve=ze==null?void 0:ze.stop)==null||ve.call(ze),X.current&&(clearTimeout(X.current),X.current=null),ue(!1),M(""),b(!1),V(!1),W(null)}};return c.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3",children:[c.jsxs("style",{children:[qD,w]}),c.jsxs("div",{className:"rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-3 space-y-3",children:[c.jsx("p",{className:"text-xs font-bold text-cyan-400",children:"ステータス・ゲージ（プレビュー）"}),c.jsxs("p",{className:"text-[11px] text-slate-400 leading-snug",children:[c.jsx("strong",{className:"text-slate-200",children:"①キャラ選択"}),"すると、ダイス（raw）がまだサーバーに無い場合は",c.jsx("strong",{className:"text-slate-200",children:"いま画面上の値がそのまま確定して同期"}),"します（試行1回相当）。必要なら下の",c.jsx("strong",{className:"text-slate-200",children:"ダイス演出付きで再抽選"}),"。 ゲージは",c.jsx("strong",{className:"text-slate-200",children:"いま選んでいるキャラ"}),"換算のプレビューです。",c.jsxs("strong",{className:"text-slate-200",children:["再抽選は最大",Nh,"回"]}),"（キャラで初回同期を含め計",Rm,"試行まで）。"]}),c.jsx("div",{className:"space-y-2",children:Pl.map(Y=>{const oe=Se[Y.rangeKey],Ae=Y.valueKey,qe=Y.rollKey,Ne=Ue[Ae]??oe.min,ze=Ue[qe],on=ze!=null&&Number.isFinite(Number(ze))?Number(ze):rt!=null&&Number.isFinite(Number(rt))?Number(rt):null,jt=ze!=null&&Number.isFinite(Number(ze))?Number(ze)/5*100:0;return c.jsx(LD,{label:Y.label,value:Ne,min:oe.min,max:oe.max,barFillPercent:jt,hideNumeric:!1,suffix:Y.suffix,barShuffle:N,showMaxRollGlow:S.has(Y.id)&&on===5,overviewHint:Y.overview},`${i}-${Y.id}`)})}),c.jsxs("div",{className:"relative pt-1",children:[T&&c.jsx("div",{role:"presentation","aria-hidden":!0,className:"pointer-events-none absolute left-1 top-1/2 z-30 flex h-[80px] w-[80px] -translate-y-1/2 items-center justify-center dice-roll-sync sm:left-2 sm:h-[88px] sm:w-[88px]",style:{animationDuration:`${E}ms`},onAnimationEnd:Y=>{String(Y.animationName||"").includes("dice-roll-sync")&&(X.current&&(clearTimeout(X.current),X.current=null),ue(!1))},children:c.jsx("div",{className:"flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border-[3px] border-neutral-900 bg-gradient-to-b from-white via-neutral-50 to-neutral-200 shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_2px_0_rgba(255,255,255,0.95)] sm:h-[80px] sm:w-[80px]",children:c.jsx(bd,{className:"h-[52px] w-[52px] text-neutral-950 sm:h-14 sm:w-14",strokeWidth:2.35})})}),c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("button",{type:"button",onClick:()=>void ae(),disabled:!se||x,className:`w-full rounded-lg border-2 border-black bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-400 py-2.5 text-center text-[13px] font-black leading-tight text-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-[filter,padding] hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 ${T?"pl-[4.25rem] sm:pl-24":""}`,children:x?"抽選中…":y===0?"ステータス抽選を試す（ダイス演出付き）":"再抽選"}),c.jsxs("p",{className:"text-center text-[11px] text-slate-400",children:["再抽選できる回数：",c.jsx("span",{className:"tabular-nums font-semibold text-slate-200",children:ie}),"／",Nh,"回（初回はキャラまたは上の抽選で確定。合計の確定回数は上限",Rm,"回）"]})]})]})]}),c.jsx("p",{className:"text-xs font-semibold text-slate-400",children:"キャラクターを選択"}),c.jsx("div",{className:"grid grid-cols-2 gap-3",children:d.map(Y=>{const oe=u===Y.key,Ae=u===Y.key,qe=Y.key===Nf&&h;return c.jsxs("button",{type:"button",onClick:()=>void $(Y.key),disabled:x,className:`relative overflow-hidden rounded-xl border p-3 text-left transition-all disabled:opacity-50 ${qe?"ririm-secret-card border-fuchsia-400/50 bg-violet-950/40":""} ${Ae?`${Y.border} ring-2 ring-offset-1 ring-offset-slate-900 ring-cyan-500`:"border-slate-700 bg-slate-800/50 hover:border-slate-600"}`,children:[qe&&c.jsx("span",{className:"absolute right-2 top-2 z-[1] rounded-full bg-gradient-to-r from-fuchsia-600 to-amber-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-md",children:"Secret"}),c.jsx("div",{className:"mb-1 flex min-h-[2.5rem] items-center justify-center",children:c.jsx(yo,{characterType:Y.key,imgClassName:"h-10 w-10 object-contain",spanClassName:"text-2xl"})}),c.jsx("div",{className:`text-sm font-semibold ${oe?Y.color:"text-slate-300"}`,children:Y.label}),c.jsx("div",{className:"text-xs text-slate-400 mt-1 leading-relaxed",children:Y.desc})]},Y.key)})})]})}function HD({waitingSessionKey:t=0,myFullId:e,copied:n,onCopyMyId:s,roomData:a,roomId:i,playerSlots:r,myId:o,isHost:u,onReturnToLobby:h,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,onStartGame:y,loading:R,uiError:I,inviteInput:O,onInviteInputChange:x,inviteError:b,onInvitePlayer:N,seVolume:V,bgmVolume:U,onSeVolumeChange:W,onBgmVolumeChange:S,unlockPlayerNameForSecret:_}){var M;const E=r.find(T=>T.id===o),A=!!ai(E==null?void 0:E.initialRolls),w=r.length>0&&r.every(T=>ai(T.initialRolls));return c.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[c.jsx(Nc,{myFullId:e,copied:n,onCopy:s,seVolume:V,bgmVolume:U,onSeVolumeChange:W,onBgmVolumeChange:S}),a!=null&&a.isSolo?c.jsxs("div",{className:"w-full max-w-md space-y-6",children:[c.jsxs("div",{className:"relative text-center",children:[c.jsx("button",{type:"button",onClick:h,className:"absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors",children:"← 戻る"}),c.jsx("h2",{className:"text-2xl font-bold",children:"🎮 一人で遊ぶ"})]}),c.jsx(Rb,{waitingSessionKey:t,playerSlots:r,myId:o,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,unlockPlayerNameForSecret:_}),c.jsx("button",{type:"button",onClick:y,disabled:R||!(E!=null&&E.character)||!A,className:"w-full rounded-xl bg-cyan-500 py-4 font-bold text-slate-950 text-lg hover:bg-cyan-400 transition-colors disabled:opacity-40",children:R?"開始中…":"準備完了 · ゲームスタート"}),I&&c.jsx("p",{className:"text-sm text-rose-400 text-center",children:I})]}):c.jsxs("div",{className:"w-full max-w-md space-y-5 pt-10",children:[c.jsxs("div",{className:"relative text-center",children:[c.jsx("button",{type:"button",onClick:h,className:"absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors",children:"← 戻る"}),c.jsx("h2",{className:"text-2xl font-bold",children:"ルーム待機中"}),c.jsx("p",{className:"text-sm text-slate-400 mt-1",children:"ルームIDを友達に共有してください"})]}),c.jsxs("div",{className:"rounded-2xl border border-cyan-500/40 bg-cyan-500/5 p-5 text-center space-y-2",children:[c.jsx("p",{className:"text-xs text-slate-400",children:"ルームID"}),c.jsx("p",{className:"text-4xl font-bold tracking-[0.3em] text-cyan-400 font-mono",children:i}),c.jsx("span",{className:`inline-block text-xs font-semibold rounded-full px-3 py-0.5 ${a!=null&&a.isPrivate?"bg-rose-500/20 text-rose-300 border border-rose-500/40":"bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"}`,children:a!=null&&a.isPrivate?"🔒 プライベート（招待制）":"🌐 公開"})]}),c.jsxs("div",{className:"rounded-xl border border-cyan-500/40 bg-cyan-500/8 px-4 py-3 space-y-1.5",children:[c.jsx("p",{className:"text-xs text-cyan-400 font-semibold",children:"🪪 あなたの招待ID（ホストへ共有してください）"}),c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("span",{className:"flex-1 font-mono text-base font-bold text-white truncate select-all",children:e}),c.jsx("button",{type:"button",onClick:s,className:`shrink-0 rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${n?"bg-emerald-500 text-white scale-95":"bg-cyan-600 hover:bg-cyan-500 text-white"}`,children:n?"コピーしました！✓":"📋 コピー"})]}),c.jsx("p",{className:"text-xs text-slate-500",children:"このIDをホストの「招待するプレイヤー」欄に入力してもらってください"})]}),c.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-2",children:[c.jsxs("p",{className:"text-xs text-slate-400 mb-2",children:["参加済みプレイヤー (",r.length,"/4)"]}),r.map((T,ue)=>c.jsxs("div",{className:"flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2",children:[c.jsxs("span",{className:"text-sm font-medium",children:[ue+1,". ",T.name]}),T.fullId&&c.jsxs("span",{className:"text-xs text-slate-500 font-mono",children:["#",T.fullId.split("#")[1]]}),T.id===(a==null?void 0:a.hostId)&&c.jsx("span",{className:"text-xs text-amber-400 ml-auto",children:"ホスト"}),T.id===o&&c.jsx("span",{className:"text-xs text-cyan-400 ml-auto border border-cyan-400/40 rounded px-1",children:"YOU"})]},T.id)),r.length<2&&c.jsxs("p",{className:"text-xs text-slate-500 text-center pt-1 flex items-center justify-center gap-2",children:[c.jsx(Lr,{size:12,className:"animate-spin"}),"他のプレイヤーを待っています… (1人でも開始できます)"]})]}),c.jsx(Rb,{waitingSessionKey:t,playerSlots:r,myId:o,onSelectCharacter:d,onCommitInitialRolls:p,soundRef:g,unlockPlayerNameForSecret:_}),c.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2",children:[c.jsx("p",{className:"text-[11px] font-semibold text-slate-500 mb-1.5",children:"全員のキャラ選択状況"}),c.jsx("div",{className:"space-y-1",children:r.map(T=>{const ue=T.character,me=ue?rn[ue]:null;return c.jsxs("div",{className:"flex items-center gap-2 text-xs text-slate-400",children:[c.jsxs("span",{children:[T.name,T.id===o?" (YOU)":""]}),c.jsx("span",{className:"ml-auto flex items-center gap-1",children:ue?c.jsxs(c.Fragment,{children:[c.jsx(yo,{characterType:ue,imgClassName:"h-4 w-4 object-contain shrink-0",spanClassName:"text-sm leading-none"}),c.jsx("span",{className:me.color,children:me.label})]}):c.jsx("span",{className:"text-amber-400/90 font-medium",children:"未選択"})})]},T.id)})})]}),u&&(a==null?void 0:a.isPrivate)&&c.jsxs("div",{className:"rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-3",children:[c.jsx("p",{className:"text-xs font-semibold text-rose-300",children:"🔒 招待管理（ホスト専用）"}),c.jsxs("div",{children:[c.jsx("label",{className:"text-xs text-slate-300 font-medium block mb-1.5",children:"招待するプレイヤー（Name#ID）"}),c.jsxs("div",{className:"flex gap-2",children:[c.jsx("input",{value:O,onChange:T=>x(T.target.value),onKeyDown:T=>T.key==="Enter"&&N(),className:"flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-mono focus:border-rose-400 focus:outline-none",placeholder:"例: 闇月リリム#1234"}),c.jsx("button",{type:"button",onClick:N,className:"rounded-xl bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 text-sm font-bold transition-colors",children:"招待"})]}),c.jsx("p",{className:"text-xs text-slate-500 mt-1.5",children:"※ 相手の画面に表示されている「Name#ID」を全文コピーして入力してください"}),b&&c.jsx("p",{className:"text-xs text-rose-400 mt-1",children:b})]}),((M=a.allowedPlayers)==null?void 0:M.length)>0&&c.jsxs("div",{className:"space-y-1",children:[c.jsxs("p",{className:"text-xs text-slate-500",children:["招待済み (",a.allowedPlayers.length,"名)"]}),a.allowedPlayers.map(T=>c.jsxs("div",{className:"flex items-center gap-2 rounded bg-slate-800 px-2 py-1 text-xs font-mono text-slate-300",children:[c.jsx("span",{className:"text-emerald-400",children:"✓"})," ",T]},T))]})]}),u?c.jsx("button",{type:"button",onClick:y,disabled:r.length<1||R||r.some(T=>!T.character)||!w,className:"w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40",children:R?"開始中…":`準備完了 · ゲームスタート（${r.length}人）`}):c.jsxs("p",{className:"text-center text-sm text-slate-400 flex items-center justify-center gap-2",children:[c.jsx(Lr,{size:14,className:"animate-spin"}),"ホストがゲームを開始するのを待っています…"]}),I&&c.jsx("p",{className:"text-sm text-rose-400 text-center",children:I})]})]})}function GD({mode:t,gold:e,stat:n}){if(t!=="chat"&&t!=="game")return null;const s=ya(t==="chat"?AD:ND);return c.jsxs("div",{className:"fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-gradient-to-br from-black/80 via-slate-950/50 to-black/90 pointer-events-auto anim-stream-cutin-veil","aria-hidden":!0,role:"presentation",children:[c.jsx("div",{className:"anim-stream-cutin-lines opacity-50","aria-hidden":!0}),c.jsx("div",{className:"pointer-events-none absolute inset-y-[-15%] left-[-40%] w-[180%] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-90 anim-stream-cutin-sweep","aria-hidden":!0}),c.jsxs("div",{className:"relative z-[2] flex flex-col items-center justify-center px-5 anim-stream-cutin-img-wrap",children:[c.jsx("div",{className:"rounded-2xl border border-cyan-400/40 bg-slate-950/30 p-4 sm:p-5 anim-stream-cutin-ring",children:c.jsx("img",{src:s,alt:"",className:"anim-stream-cutin-img max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_32px_rgba(34,211,238,0.55)]",draggable:!1})}),c.jsxs("div",{className:"mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]",children:[c.jsxs("p",{className:"text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums",children:["＋",e,"ゴールド"]}),n?c.jsxs("p",{className:"mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-cyan-200/95 tabular-nums",children:[n.label," ＋",n.delta]}):null]})]})]})}function YD({gold:t,stat:e}){const n=ya(RD);return c.jsxs("div",{className:"fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-gradient-to-br from-black/80 via-slate-950/50 to-black/90 pointer-events-auto anim-stream-cutin-veil","aria-hidden":!0,role:"presentation",children:[c.jsx("div",{className:"anim-stream-cutin-lines opacity-50","aria-hidden":!0}),c.jsx("div",{className:"pointer-events-none absolute inset-y-[-15%] left-[-40%] w-[180%] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent opacity-90 anim-stream-cutin-sweep","aria-hidden":!0}),c.jsxs("div",{className:"relative z-[2] flex flex-col items-center justify-center px-5 anim-stream-cutin-img-wrap",children:[c.jsx("div",{className:"rounded-2xl border border-amber-400/45 bg-slate-950/30 p-4 sm:p-5 anim-stream-cutin-ring",children:c.jsx("img",{src:n,alt:"",className:"anim-stream-cutin-img max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_28px_rgba(251,191,36,0.45)]",draggable:!1})}),c.jsxs("div",{className:"mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]",children:[c.jsxs("p",{className:"text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums",children:["＋",t,"ゴールド"]}),e?c.jsxs("p",{className:"mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-amber-200/95 tabular-nums",children:[e.label," ＋",e.delta]}):null]})]})]})}const Cb=`
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

`;function ns(t,e){const n=e??"エラーが発生しました。しばらくしてから再度お試しいただくか、画面を再読み込みしてください。";if(t==null)return n;const s=t.code;if(s==="permission-denied")return"権限または接続の問題で処理できませんでした。ログイン状態とネットワークをご確認ください。";if(s==="unavailable"||s==="deadline-exceeded")return"サーバーに接続できませんでした。しばらくしてから再度お試しください。";const a=t.message;if(typeof a=="string"){const i=a.trim();if(i.length>0&&i.length<=280)return i}return n}function KD(t){const e=k.useCallback(R=>{if(typeof t!="function"||R==null)return;const I=typeof R=="string"?R:ns(R,"接続またはデータの読み込みで問題が発生しました。");t(I)},[t]),[n,s]=k.useState(null),[a,i]=k.useState(!1),[r,o]=k.useState(null),[u,h]=k.useState(null);k.useEffect(()=>(dI(lb).catch(I=>e(I)),bI(lb,I=>{I&&(s(I.uid),i(!0))})),[e]),k.useEffect(()=>{if(!r){h(null);return}return Ik(Ko(Or,"rooms",r),I=>{if(!I.exists()){e("ルームが存在しません");return}h(I.data())},I=>e(I))},[r,e]);const d=k.useCallback(async R=>{if(!r)throw new Error("roomId missing");await F1(Ko(Or,"rooms",r),R)},[r]),p=k.useCallback(async(R,I)=>{await F1(Ko(Or,"rooms",R),I)},[]),g=k.useCallback(async(R,I)=>{await kk(Ko(Or,"rooms",R),I)},[]),y=k.useCallback(async R=>Ck(Ko(Or,"rooms",R)),[]);return{myId:n,authReady:a,roomId:r,setRoomId:o,roomData:u,updateRoom:d,updateRoomById:p,createRoom:g,fetchRoom:y}}function QD(t){if(t==null||typeof t!="string")return t;const e=t.replace(/^\/+/,"").replace(/\\/g,"/");return`${"/".replace(/\/?$/,"/")}sounds/${e}`}function XD(){let t=null,e=!1,n=null,s=null,a=.82,i=.08,r=!1,o=!1,u=!1,h=!1,d=!1,p=!1,g=!1,y=!1,R=!1,I=!1,O=!1,x=!1;const b={};function N($){const ae=Number($);return Number.isFinite(ae)?Math.max(0,Math.min(1,ae)):1}function V(){return t||(t=new(window.AudioContext||window.webkitAudioContext)),t.state==="suspended"&&t.resume().catch(()=>{}),t}function U({freq:$=440,dur:ae=.15,type:Y="triangle",vol:oe=.28,ramp:Ae=!0}={}){if(!e)try{const qe=V(),Ne=qe.createOscillator(),ze=qe.createGain();Ne.connect(ze),ze.connect(qe.destination),Ne.type=Y,Ne.frequency.setValueAtTime($,qe.currentTime);const on=oe*a;ze.gain.setValueAtTime(on,qe.currentTime),Ae&&ze.gain.exponentialRampToValueAtTime(.001,qe.currentTime+ae),Ne.start(qe.currentTime),Ne.stop(qe.currentTime+ae+.01)}catch{}}function W($,ae=.07,Y=.12,oe="triangle"){$.forEach((Ae,qe)=>setTimeout(()=>U({freq:Ae,dur:Y,type:oe,vol:.22}),qe*ae*1e3))}function S(){if(n){try{n.osc.stop(),n.lfo.stop()}catch{}n=null}ue("spin")}async function _($,ae){try{const Y=QD(ae),oe=await fetch(Y,{method:"GET",cache:"force-cache"});if(!oe.ok){b[$]=null;return}const Ae=await oe.blob(),qe=URL.createObjectURL(Ae),Ne=new Audio(qe);Ne.preload="auto",await new Promise((ze,on)=>{Ne.addEventListener("canplaythrough",ze,{once:!0}),Ne.addEventListener("error",on,{once:!0}),setTimeout(on,4e3)}),b[$]=Ne}catch{b[$]=null}}async function E($){return _($,`${$}.mp3`)}function A(){ue("war_horn")}function w(){if(s){if(s.type==="synth")try{s.osc.stop(),s.osc2.stop()}catch{}s=null}ue("final_battle")}function M($){return $==="daily_bgm"||$==="day8_bgm"||$==="menu_bgm"?i:a}function T($,ae=!1){if(e)return!1;const Y=b[$];if(!Y)return!1;try{return Y.loop=ae,Y.volume=M($),Y.currentTime=0,Y.play().catch(()=>{}),!0}catch{return!1}}function ue($){const ae=b[$];if(ae)try{ae.pause(),ae.currentTime=0}catch{}}function me(){if(h||!o||e)return;h=!0;const $=()=>{h=!1,document.removeEventListener("pointerdown",$,!0),X()};document.addEventListener("pointerdown",$,{capture:!0,once:!0})}function X(){if(pe(),Dt(),e||!o||u||r)return;const $=b.daily_bgm;if($){$.loop=!0,$.volume=i,u=!0;try{$.currentTime=0,$.play().then(()=>{r=!0,u=!1}).catch(()=>{u=!1,r=!1,me()})}catch{u=!1,me()}}}function ie(){u=!1,ue("daily_bgm"),r=!1}function se(){o=!1,ie()}function pe(){g=!1,ue("day8_bgm"),d=!1}function Se(){p=!1,pe()}function Qe(){if(x||!I||e)return;x=!0;const $=()=>{x=!1,document.removeEventListener("pointerdown",$,!0),ht()};document.addEventListener("pointerdown",$,{capture:!0,once:!0})}function ht(){if(ie(),pe(),e||!I||O||R)return;const $=b.menu_bgm;if($){$.loop=!0,$.volume=i,O=!0;try{$.currentTime=0,$.play().then(()=>{R=!0,O=!1}).catch(()=>{O=!1,R=!1,Qe()})}catch{O=!1,Qe()}}}function Dt(){O=!1,ue("menu_bgm"),R=!1}function Ue(){I=!1,Dt()}function rt(){if(y||!p||e)return;y=!0;const $=()=>{y=!1,document.removeEventListener("pointerdown",$,!0),xt()};document.addEventListener("pointerdown",$,{capture:!0,once:!0})}function xt(){if(ie(),Dt(),e||!p||g||d)return;const $=b.day8_bgm;if($){$.loop=!0,$.volume=i,g=!0;try{$.currentTime=0,$.play().then(()=>{d=!0,g=!1}).catch(()=>{g=!1,d=!1,rt()})}catch{g=!1,rt()}}}return{async init(){await Promise.allSettled([Promise.all(["start","spin","stop","reach","win","jackpot","final_battle","war_horn"].map($=>E($))),_("daily_bgm","View_from_the_Fifth_Floor.mp3"),_("day8_bgm","Morning_of_the_Stand.mp3"),_("menu_bgm","Velvet_Current.mp3")]),p&&b.day8_bgm&&!e?xt():o&&b.daily_bgm&&!e?X():I&&b.menu_bgm&&!e&&ht()},setSeVolume($){a=N($)},setBgmVolume($){i=N($);for(const ae of["daily_bgm","day8_bgm","menu_bgm"]){const Y=b[ae];Y&&(Y.volume=i)}},startDailyBgm(){Ue(),Se(),o=!0,!e&&X()},stopDailyBgm(){se()},startDay8Bgm(){Ue(),se(),p=!0,!e&&xt()},stopDay8Bgm(){Se()},startMenuBgm(){se(),Se(),I=!0,!e&&ht()},stopMenuBgm(){Ue()},setMuted($){e=$,$?(this.stopSpin(),this.stopFinalBattleAmbient(),ie(),pe(),Dt()):p&&b.day8_bgm?xt():o&&b.daily_bgm?X():I&&b.menu_bgm&&ht()},getMuted(){return e},playStart(){T("start")||W([523,659,784],.06,.1,"square")},startSpin(){if(!(e||n)&&!T("spin",!0))try{const $=V(),ae=$.createOscillator(),Y=$.createOscillator(),oe=$.createGain(),Ae=$.createGain();Y.frequency.value=14,oe.gain.value=20,Y.connect(oe),oe.connect(ae.frequency),ae.connect(Ae),Ae.connect($.destination),ae.type="sawtooth",ae.frequency.value=160,Ae.gain.value=.07*a,Y.start(),ae.start(),n={osc:ae,lfo:Y}}catch{}},stopSpin(){S()},playStop($=0){T("stop")||U({freq:220-$*35,dur:.09,type:"square",vol:.18})},playReach(){T("reach")||W([392,523,659,784,1047],.075,.16)},playStreamFailGaan(){if(!e){U({freq:155,dur:.06,type:"square",vol:.22,ramp:!0}),setTimeout(()=>{U({freq:85,dur:.08,type:"square",vol:.2,ramp:!0})},40);try{const $=V(),ae=$.currentTime,Y=$.createOscillator(),oe=$.createGain();Y.connect(oe),oe.connect($.destination),Y.type="triangle",Y.frequency.setValueAtTime(295,ae),Y.frequency.exponentialRampToValueAtTime(72,ae+.95),oe.gain.setValueAtTime(.32*a,ae),oe.gain.exponentialRampToValueAtTime(.002,ae+1.05),Y.start(ae),Y.stop(ae+1.08)}catch{}setTimeout(()=>U({freq:98,dur:.2,type:"sine",vol:.08,ramp:!0}),720)}},playStreamPonBurn(){if(!e){setTimeout(()=>U({freq:1750,dur:.055,type:"square",vol:.16,ramp:!0}),40),setTimeout(()=>U({freq:2200,dur:.045,type:"square",vol:.12,ramp:!0}),110);for(let $=0;$<16;$++)setTimeout(()=>{U({freq:320+Math.random()*750,dur:.035,type:Math.random()>.5?"square":"sawtooth",vol:.1+Math.random()*.09,ramp:!0})},$*26);setTimeout(()=>{U({freq:520,dur:.07,type:"triangle",vol:.22,ramp:!0}),U({freq:380,dur:.09,type:"square",vol:.18,ramp:!0})},380);try{const $=V(),ae=$.currentTime+.42,Y=$.createOscillator(),oe=$.createGain();Y.connect(oe),oe.connect($.destination),Y.type="sawtooth",Y.frequency.setValueAtTime(260,ae),Y.frequency.exponentialRampToValueAtTime(38,ae+.58),oe.gain.setValueAtTime(.36*a,ae),oe.gain.exponentialRampToValueAtTime(.002,ae+.65),Y.start(ae),Y.stop(ae+.68)}catch{}setTimeout(()=>U({freq:120,dur:.35,type:"triangle",vol:.14,ramp:!0}),520)}},playWorkPonPlateBreak(){if(!e){for(let $=0;$<9;$++)setTimeout(()=>{U({freq:2100+Math.random()*2600,dur:.022,type:"square",vol:.11+Math.random()*.07,ramp:!0})},$*34);setTimeout(()=>U({freq:440,dur:.045,type:"triangle",vol:.18,ramp:!0}),300),setTimeout(()=>{U({freq:165,dur:.26,type:"sawtooth",vol:.34,ramp:!0}),U({freq:92,dur:.3,type:"square",vol:.24,ramp:!0})},332),setTimeout(()=>U({freq:68,dur:.4,type:"triangle",vol:.2,ramp:!0}),420),setTimeout(()=>U({freq:52,dur:.18,type:"sine",vol:.09,ramp:!0}),460)}},playReachGaseSting(){if(!e){U({freq:310,dur:.1,type:"sawtooth",vol:.2,ramp:!0}),setTimeout(()=>{U({freq:195,dur:.16,type:"square",vol:.14,ramp:!0})},70),setTimeout(()=>{U({freq:142,dur:.24,type:"triangle",vol:.12,ramp:!0})},180);try{const $=V(),ae=$.currentTime,Y=$.createOscillator(),oe=$.createGain();Y.connect(oe),oe.connect($.destination),Y.type="sine",Y.frequency.setValueAtTime(198,ae),Y.frequency.exponentialRampToValueAtTime(128,ae+.42),oe.gain.setValueAtTime(.065*a,ae),oe.gain.exponentialRampToValueAtTime(.0015,ae+.52),Y.start(ae),Y.stop(ae+.54)}catch{}}},startDiceRoll(){if(e)return{stop(){}};const $=setInterval(()=>{U({freq:90+Math.random()*150,dur:.036,type:Math.random()>.45?"square":"triangle",vol:.14,ramp:!0})},56);return{stop:()=>clearInterval($)}},playDiceTick(){e||U({freq:1047,dur:.052,type:"square",vol:.2})},playDiceMaxSpark(){e||W([784,1175,1568],.042,.09,"square")},playWin($="small"){if(T($==="jackpot"?"jackpot":"win"))return;const Y={small:[523,659],atari:[523,659,784],mid:[523,659,784,1047],big:[523,659,784,1047,1319],jackpot:[523,659,784,1047,1319,1568,2093]};W(Y[$]??Y.small,.065,.14)},stopWarHorn(){A()},tryPlayWarHornIfLoaded(){if(e)return!1;const $=b.war_horn;if(!$)return!1;try{S(),$.volume=a,$.currentTime=0,$.play()}catch{return!1}return!0},stopFinalBattleAmbient(){w(),A()},startFinalBattleAmbient(){if(!e&&(S(),!(s||T("final_battle",!0))))try{const $=V(),ae=$.createOscillator(),Y=$.createOscillator(),oe=$.createGain();ae.type="sine",Y.type="sine",ae.frequency.value=52,Y.frequency.value=78,ae.connect(oe),Y.connect(oe),oe.connect($.destination),oe.gain.value=.055*a,ae.start(),Y.start(),s={type:"synth",osc:ae,osc2:Y,gain:oe,ac:$}}catch{}}}}const Cm="pons_se_vol",km="pons_bgm_vol",kb=.82,Ib=.08;function Ju(t,e){try{const n=localStorage.getItem(t);if(n==null)return e;const s=parseFloat(n);return Number.isFinite(s)?Math.max(0,Math.min(1,s)):e}catch{return e}}function Im(t,e,n){return t.map((s,a)=>a!==e?s:{...s,position:n,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0})}function Mb(t,e,n){if(!n)return t;const s={...t};return delete s.finalBattleStartedAt,delete s.finalBattleEntry,{...s,gamePhase:"playing",subPhase:"daily",currentDay:Ea,currentPlayerIdx:e.currentPlayerIdx}}function WD(){var Ru,Lo,Uo;const[t,e]=k.useState(""),{myId:n,authReady:s,roomId:a,setRoomId:i,roomData:r,updateRoom:o,updateRoomById:u,createRoom:h,fetchRoom:d}=KD(e),[p,g]=k.useState(""),[y]=k.useState(()=>String(Math.floor(1e3+Math.random()*9e3))),[R,I]=k.useState(""),[O,x]=k.useState("entry"),[b,N]=k.useState(0),[V,U]=k.useState(!1),[W,S]=k.useState(!1),[_,E]=k.useState(""),[A,w]=k.useState(""),[M,T]=k.useState(!1),[ue,me]=k.useState(()=>Ju(Cm,kb)),[X,ie]=k.useState(()=>Ju(km,Ib)),[se,pe]=k.useState(!1),[Se,Qe]=k.useState(null),[ht,Dt]=k.useState(!0),[Ue,rt]=k.useState(!1),[xt,$]=k.useState([]),[ae,Y]=k.useState([]),[oe,Ae]=k.useState([]),[qe,Ne]=k.useState(!1),[ze,on]=k.useState(!1),jt=k.useRef(null),[ot,Nn]=k.useState(null),[ve,ge]=k.useState(!1),[xe,Xe]=k.useState(!1),[zt,ee]=k.useState(!1),[q,he]=k.useState(null),[Ke,ye]=k.useState(!1),te=k.useRef(null),Ye=k.useRef(null),_t=k.useRef(2600),[Ot,cn]=k.useState(null),[nn,ft]=k.useState(2600),[je,fe]=k.useState(null),[ke,Bt]=k.useState(2600),Vt=k.useRef(0),Ie=k.useRef(!1),Tt=k.useRef(null),Pt=k.useRef(async()=>{}),[Xn,_e]=k.useState(null),[dt,un]=k.useState(null),[Et,Lt]=k.useState(null),[rs,qt]=k.useState(!1),Ct=k.useRef(!1),hn=k.useRef(null),aa=k.useRef(null),Rn=k.useRef(null),[ws,ia]=k.useState(null),[Wn,ra]=k.useState(!1),Bs=k.useRef(null),[$s,Pa]=k.useState(null),Jn=k.useRef(null),[ul,Do]=k.useState(!1),La=k.useRef(null),[Fs,br]=k.useState(null),ls=k.useRef(null),Zn=k.useRef([]),[ds,yi]=k.useState(null),As=k.useRef(null),qs=k.useRef([]),Ns=p.trim()?`${p.trim()}#${y}`:"",de=(r==null?void 0:r.gameState)??null,F=ws??de,os=(r==null?void 0:r.playerSlots)??[],xr=(r==null?void 0:r.hostId)===n,xu=ws!=null,Dn=!!de&&((Ru=de.players[de.currentPlayerIdx])==null?void 0:Ru.id)===n&&!xu,Z=(F==null?void 0:F.players[F==null?void 0:F.currentPlayerIdx])??null,la=k.useRef(de);la.current=de;const Hs=Ue?xt:(F==null?void 0:F.lastDiceRolls)??[],va=(F==null?void 0:F.gamePhase)==="playing",vi=(F==null?void 0:F.gamePhase)==="finalBattle"||(F==null?void 0:F.subPhase)==="finalBattle",_r=va&&(F==null?void 0:F.subPhase)==="day8"&&(Z==null?void 0:Z.movePhase)==="waitingSlot",St=va&&(F==null?void 0:F.subPhase)==="day8"&&(Z==null?void 0:Z.movePhase)==="goalLanding",Tr=va&&(F==null?void 0:F.subPhase)==="day8"&&(Z==null?void 0:Z.movePhase)==="arrived",Er=va&&(F==null?void 0:F.subPhase)==="day8"&&(Z==null?void 0:Z.movePhase)==="moving";Z&&Math.min(100,Z.position/tn*100);const oa=k.useCallback(C=>{var z,ne;const B=Math.max(0,Math.min(1,Number(C)));me(B);try{localStorage.setItem(Cm,String(B))}catch{}(ne=(z=jt.current)==null?void 0:z.setSeVolume)==null||ne.call(z,B)},[]),Sr=k.useCallback(C=>{var z,ne;const B=Math.max(0,Math.min(1,Number(C)));ie(B);try{localStorage.setItem(km,String(B))}catch{}(ne=(z=jt.current)==null?void 0:z.setBgmVolume)==null||ne.call(z,B)},[]),jo=k.useMemo(()=>{if(O!=="playing"||!F||F.gamePhase!=="playing")return!1;const C=Number(F.currentDay);return F.subPhase==="daily"&&C>=1&&C<=Ea},[O,F==null?void 0:F.gamePhase,F==null?void 0:F.subPhase,F==null?void 0:F.currentDay]),_u=k.useMemo(()=>O!=="playing"||!F||F.gamePhase!=="playing"?!1:F.subPhase==="day8",[O,F==null?void 0:F.gamePhase,F==null?void 0:F.subPhase]),Tu=k.useMemo(()=>s&&(O==="entry"||O==="lobby"||O==="waiting"),[s,O]);k.useEffect(()=>{const C=XD();jt.current=C,C.setSeVolume(Ju(Cm,kb)),C.setBgmVolume(Ju(km,Ib)),C.init()},[]),k.useEffect(()=>{document.title=`${Ah} — ${Nm}`},[]),k.useEffect(()=>{r&&(r.status==="playing"||r.status==="FINAL_BATTLE")&&O==="waiting"&&x("playing")},[r==null?void 0:r.status]),k.useEffect(()=>{de!=null&&de.gamePhase&&(de.gamePhase==="results"&&O!=="results"&&x("results"),de.gamePhase==="gameOver"&&O!=="gameover"&&x("gameover"))},[de==null?void 0:de.gamePhase]),k.useEffect(()=>{const C=jt.current;if(!C||!(de!=null&&de.gamePhase))return;if(!(de.gamePhase==="finalBattle"||de.subPhase==="finalBattle")){C.stopFinalBattleAmbient();return}de.finalBattleEntry!=="preDay8"&&C.startFinalBattleAmbient()},[de==null?void 0:de.gamePhase,de==null?void 0:de.subPhase,de==null?void 0:de.finalBattleEntry]),k.useEffect(()=>{var B,z;const C=jt.current;C&&(jo?(B=C.startDailyBgm)==null||B.call(C):(z=C.stopDailyBgm)==null||z.call(C))},[jo]),k.useEffect(()=>{var B,z;const C=jt.current;C&&(_u?(B=C.startDay8Bgm)==null||B.call(C):(z=C.stopDay8Bgm)==null||z.call(C))},[_u]),k.useEffect(()=>{var B,z;const C=jt.current;C&&(Tu?(B=C.startMenuBgm)==null||B.call(C):(z=C.stopMenuBgm)==null||z.call(C))},[Tu]),k.useEffect(()=>{if(!xr||!a||!de||de.gamePhase!=="finalBattle")return;const C=hS(de.finalBattleStartedAt);if(!Number.isFinite(C))return;const B=de.finalBattleEntry==="preDay8"?y3+200:v3+350,z=C+B,ne=Math.max(0,z-Date.now()),L=setTimeout(async()=>{var K;try{const Oe=(K=(await d(a)).data())==null?void 0:K.gameState;if(!Oe||Oe.gamePhase!=="finalBattle")return;if(Oe.finalBattleEntry==="preDay8"){const We=F3(Oe);await o({gameState:We,status:"playing"})}else{const We=xS(Oe,Oe.players);await o({gameState:We,status:"completed"})}}catch(Te){e(ns(Te,"処理に失敗しました。しばらくしてから再度お試しください。"))}},ne);return()=>clearTimeout(L)},[xr,a,de==null?void 0:de.gamePhase,de==null?void 0:de.finalBattleStartedAt,de==null?void 0:de.finalBattleEntry]),k.useEffect(()=>{var C;!ws||!((C=de==null?void 0:de.log)!=null&&C.length)||de.log[0]===ws.log[0]&&ia(null)},[de,ws]),k.useEffect(()=>()=>{Bs.current&&(clearTimeout(Bs.current),Bs.current=null),Jn.current&&(clearTimeout(Jn.current),Jn.current=null),La.current&&(clearTimeout(La.current),La.current=null),ls.current&&(clearTimeout(ls.current),ls.current=null),Zn.current.forEach(clearTimeout),Zn.current=[],qs.current.forEach(clearTimeout),qs.current=[],As.current&&(clearTimeout(As.current),As.current=null),br(null),yi(null),Pa(null)},[]),k.useEffect(()=>()=>{hn.current&&(clearTimeout(hn.current),hn.current=null)},[]),k.useEffect(()=>{de||ia(null)},[de]),k.useEffect(()=>{if(!ot||ot==="taxiHail")return;const C=Ie.current,z=ot==="drive"||ot==="driveBeforeJam"||ot==="driveAfterJam"?ke:{enter:900,boarding:500,ride:450,trafficJam:2600,arrive:1800}[ot];if(z==null)return;const ne=K=>K==="enter"?"boarding":K==="boarding"?"ride":K==="ride"?C?"driveBeforeJam":"drive":K==="driveBeforeJam"?"trafficJam":K==="trafficJam"?Vt.current<=0?"arrive":"driveAfterJam":K==="driveAfterJam"||K==="drive"?"arrive":null,L=setTimeout(async()=>{const K=ne(ot),Te=(ot==="drive"||ot==="driveAfterJam"||ot==="trafficJam"&&K==="arrive")&&te.current&&a;let Oe=!1;if(Te&&te.current){const sn=te.current,Jt=sn.players[sn.currentPlayerIdx];Oe=((Jt==null?void 0:Jt.pendingTaxiSteps)??0)>0}if(Te){const sn=Ye.current;let Jt=!1;try{await o({gameState:te.current}),Jt=!0}catch(Je){e(ns(Je,"処理に失敗しました。しばらくしてから再度お試しください。"))}if(te.current=null,Ye.current=null,Jt){const Je=Ht=>{var Zt;(Zt=Ht==null?void 0:Ht.lines)!=null&&Zt.length&&(Rn.current&&clearTimeout(Rn.current),Lt(Ht),Rn.current=setTimeout(()=>{Lt(null),Rn.current=null},2800))};if(sn){const Ht=wm(sn.fromPos,sn.toPos);setTimeout(async()=>{try{await o({gameState:sn.finalGS});const Zt=aa.current;aa.current=null,Je(Zt)}catch(Zt){e(ns(Zt,"処理に失敗しました。しばらくしてから再度お試しください。"))}},Ht)}else{const Ht=aa.current;aa.current=null,Je(Ht)}}Xe(!0),setTimeout(()=>Xe(!1),500)}let We=K;K==="arrive"&&Oe&&(We=null),We==="driveAfterJam"?(Bt(Vt.current),ge(!0)):(We==="drive"||We==="driveBeforeJam"||ot==="trafficJam"&&We!=="driveAfterJam")&&ge(!1),We==="arrive"&&ge(!1),We===null&&(Ie.current=!1,ge(!1),cn(null),fe(null)),Nn(We)},z);return()=>clearTimeout(L)},[ot,a,ke]),k.useEffect(()=>{if(!Dn||!F||F.subPhase!=="day8"||F.gamePhase!=="playing")return;const C=Z;if(!C||C.skipTurns<=0||C.movePhase!=="moving"||(C.pendingTaxiSteps??0)>0)return;const B=F.players.map((ne,L)=>L===F.currentPlayerIdx?{...ne,skipTurns:ne.skipTurns-1}:ne),z=[`💤 ${C.name} 1回休み（炎上の巻き添え）`];ms(Vr(F,B,z))},[Dn,F==null?void 0:F.currentPlayerIdx]),k.useEffect(()=>{if(typeof Xn!="number"||!de||!n)return;const C=de.players.find(B=>B.id===n);C&&C.position===Xn&&_e(null)},[de,Xn,n]);const ms=async C=>{try{const B={gameState:C};return C.gamePhase==="finalBattle"&&(B.status="FINAL_BATTLE"),C.gamePhase==="results"&&(B.status="completed"),await o(B),!0}catch(B){return e(ns(B,"処理に失敗しました。しばらくしてから再度お試しください。")),!1}};Pt.current=async()=>{var z;const C=Tt.current;Tt.current=null,Ct.current=!1,qt(!1),un(null);const B=(C==null?void 0:C.tileFxToast)??null;if(C!=null&&C.nextGS)try{const ne=C.nextGS,L={gameState:ne};ne.gamePhase==="finalBattle"&&(L.status="FINAL_BATTLE"),ne.gamePhase==="results"&&(L.status="completed"),await o(L),(z=B==null?void 0:B.lines)!=null&&z.length&&(Rn.current&&clearTimeout(Rn.current),Lt(B),Rn.current=setTimeout(()=>{Lt(null),Rn.current=null},2800))}catch(ne){e(ns(ne,"処理に失敗しました。しばらくしてから再度お試しください。")),_e(null),rt(!1),hn.current&&(clearTimeout(hn.current),hn.current=null);return}rt(!1)};const xd=k.useCallback(()=>{if(!Ct.current)return;Ct.current=!1,qt(!1);const C=Tt.current;C!=null&&C.nextGS&&un({characterType:C.characterType??"salaryman"})},[]),wr=k.useCallback(async C=>{try{const B={gameState:C};C.gamePhase==="finalBattle"&&(B.status="FINAL_BATTLE"),C.gamePhase==="results"&&(B.status="completed"),await o(B)}catch(B){e(ns(B,"処理に失敗しました。しばらくしてから再度お試しください。"))}},[o]),Ua=async()=>{const C=p.trim()||Qo();p.trim()||g(C);const B=`${C}#${y}`;U(!0),e("");try{const z=Tm();await h(z,{hostId:n,status:"lobby",playerSlots:[{id:n,name:C,fullId:B}],playerIds:[n],gameState:null,isPrivate:W,allowedPlayers:W?[B]:[],acceptQuickMatch:!W&&ht,createdAt:new Date().toISOString()}),i(z),N(ne=>ne+1),x("waiting")}catch(z){e(ns(z,"処理に失敗しました。しばらくしてから再度お試しください。"))}U(!1)},Eu=async()=>{var z;if(!R.trim()){e("ルームIDを入力してください");return}const C=p.trim()||Qo();p.trim()||g(C);const B=`${C}#${y}`;U(!0),e("");try{const ne=R.trim().toUpperCase(),L=await d(ne);if(!L.exists()){e("ルームが見つかりません"),U(!1);return}const K=L.data();if(K.status!=="lobby"){e("このルームはすでに開始されています"),U(!1);return}if(K.playerSlots.length>=4){e("ルームが満員です"),U(!1);return}if(K.isPrivate&&!((z=K.allowedPlayers)!=null&&z.includes(B))){e(`招待されていません。ホストに「${B}」を共有して招待してもらってください`),U(!1);return}K.playerSlots.find(Te=>Te.id===n)||await u(ne,{playerSlots:Cr({id:n,name:C,fullId:B}),playerIds:Cr(n)}),i(ne),N(Te=>Te+1),x("waiting")}catch(ne){e(ns(ne,"処理に失敗しました。しばらくしてから再度お試しください。"))}U(!1)},Su=async()=>{if(!xr||os.length<1)return;if(os.some(z=>!z.character)){e("全員がキャラクターを選択してから開始してください");return}if(os.some(z=>!ai(z.initialRolls))){e("全員がステータス抽選を確定（同期）してから開始してください");return}U(!0);try{const z=q3(os);await o({status:"playing",gameState:z})}catch(z){e(ns(z,"処理に失敗しました。しばらくしてから再度お試しください。"))}U(!1)},wu=k.useCallback(async({luck:C,skill:B,virtue:z,pon:ne})=>{if(!a||!n)return!1;try{const L=ai({luck:C,skill:B,virtue:z,pon:ne});if(!L)throw new Error("ダイス値が不正です");const K=os.map(Te=>{if(Te.id!==n)return Te;const Oe={...Te,initialRolls:L};return delete Oe.initialStats,Oe});return await o({playerSlots:K}),!0}catch(L){return e(ns(L,"ステータス抽選の保存に失敗しました。しばらくしてから再度お試しください。")),!1}},[a,n,os,o]),hl=k.useCallback(async(C,B=null)=>{if(!a||!n)return;if(C===Nf&&!Rf(p)){e(`シークレットキャラは、プレイヤー名が「${cS}」と一致するときのみ選べます（前後の空白は無視）。`);return}const z=os.map(ne=>{if(ne.id!==n)return ne;let L={...ne,character:C};if(B!=null&&typeof B=="object"){const K=ai(B);K&&(L={...L,initialRolls:K},delete L.initialStats)}return L});try{await o({playerSlots:z})}catch(ne){e(ns(ne,"処理に失敗しました。しばらくしてから再度お試しください。"))}},[a,n,p,os,o]);k.useEffect(()=>{if(O!=="waiting"||!a||!n||Rf(p))return;const C=os.find(B=>B.id===n);!C||C.character!==Nf||hl("salaryman")},[O,p,os,n,a,hl]);const Ar=()=>{x("lobby"),i(null),e("")},bi=async()=>{U(!0),e("");const C=p.trim()||Qo();p.trim()||g(C);const B=`${C}#${y}`;try{const z=L1(I1(Or,"rooms"),vm("status","==","lobby"),U1(10)),L=(await $1(z)).docs.find(K=>{var Oe;const Te=K.data();return!Te.isPrivate&&Te.acceptQuickMatch!==!1&&(((Oe=Te.playerSlots)==null?void 0:Oe.length)??0)<4});if(L){const K=L.id;L.data().playerSlots.find(Oe=>Oe.id===n)||await u(K,{playerSlots:Cr({id:n,name:C,fullId:B}),playerIds:Cr(n)}),i(K),N(Oe=>Oe+1),x("waiting")}else{const K=Tm();await h(K,{hostId:n,status:"lobby",playerSlots:[{id:n,name:C,fullId:B}],playerIds:[n],gameState:null,isPrivate:!1,allowedPlayers:[],createdAt:new Date().toISOString()}),i(K),N(Te=>Te+1),x("waiting")}}catch(z){e(ns(z,"処理に失敗しました。しばらくしてから再度お試しください。"))}U(!1)},_d=async()=>{var B;const C=_.trim();if(!C||!C.match(/^.+#\d{4}$/)){w("「Name#ID」の形式（例: 闇月リリム#1234）で入力してください。# を含めた全文を入力してください");return}if((B=r==null?void 0:r.allowedPlayers)!=null&&B.includes(C)){w("すでに招待済みです");return}try{await o({allowedPlayers:Cr(C)}),E(""),w("")}catch(z){w(ns(z,"招待の追加に失敗しました。しばらくしてから再度お試しください。"))}},Nr=()=>{Ns&&navigator.clipboard.writeText(Ns).then(()=>{T(!0),setTimeout(()=>T(!1),2e3)})},Au=()=>{const C=p.trim()||Qo();p.trim()||g(C),pe(!1),Qe(null),e(""),x("lobby")},ba=async()=>{const C=p.trim()||Qo();p.trim()||g(C);const B=`${C}#${y}`;U(!0),e("");try{const z=Tm();await h(z,{hostId:n,status:"lobby",playerSlots:[{id:n,name:C,fullId:B}],playerIds:[n],gameState:null,isPrivate:!0,isSolo:!0,allowedPlayers:[B],acceptQuickMatch:!1,createdAt:new Date().toISOString()}),i(z),N(ne=>ne+1),x("waiting")}catch(z){e(ns(z,"一人プレイ用のルームを作成できませんでした。ネットワークを確認のうえ、再度お試しください。"))}U(!1)},Td=async()=>{if(Ns){U(!0),e("");try{const C=L1(I1(Or,"rooms"),vm("status","==","lobby"),vm("allowedPlayers","array-contains",Ns),U1(5)),z=(await $1(C)).docs.find(K=>{var Oe,We;const Te=K.data();return(((Oe=Te.playerSlots)==null?void 0:Oe.length)??0)<4&&!((We=Te.playerSlots)!=null&&We.find(sn=>sn.id===n))});if(!z){e("招待されているルームが見つかりませんでした"),U(!1);return}const ne=z.id,L=p.trim();await u(ne,{playerSlots:Cr({id:n,name:L,fullId:Ns}),playerIds:Cr(n)}),i(ne),N(K=>K+1),x("waiting")}catch(C){e(ns(C,"処理に失敗しました。しばらくしてから再度お試しください。"))}U(!1)}},Oo=async()=>{if(!F||!Dn)return;const C=F.players[F.currentPlayerIdx];if(C.movePhase!=="goalLanding")return;const B=C.reservedSlotTurns??0;let z;if(B<=0){const K=[`${C.name}: ゴール済み／スロット権利0回でラウンド不参加`];z=F.players.map((Te,Oe)=>Oe!==F.currentPlayerIdx?Te:{...Te,movePhase:"arrived",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}),await ms(Vr(F,z,K));return}const ne=B*D.dice.slotsPerSugorokuTurn,L=[`${C.name}: ゴール到着ターン終了　→ スロット${B}ターンブン（計最大${ne}回）は次の自分のターンで開始できます`];z=F.players.map((K,Te)=>Te!==F.currentPlayerIdx?K:{...K,movePhase:"waitingSlot"}),await ms(Vr(F,z,L))},fl=async()=>{if(!F||!Dn)return;const C=F.players[F.currentPlayerIdx];if(C.movePhase!=="waitingSlot")return;const B=C.reservedSlotTurns??0;if(B<=0)return;const z=Math.max(0,B*D.dice.slotsPerSugorokuTurn),ne=[`${C.name}: スロット開始（${B}ターンブン・計${z}回）`],L=F.players.map((K,Te)=>Te!==F.currentPlayerIdx?K:{...K,movePhase:"arrived",slotTurnsLeft:z,reservedSlotTurns:0,slotPullsGranted:z,slotPullsThisSeat:0});await ms({...F,players:L,log:da(ne,F.log)})},Vo=k.useMemo(()=>{if(!Z)return null;const C={...Z.stats},B=Z.amulets??0;return B>0&&(C.luck=At(C.luck+B*2)),C},[Z]),[xi,_i]=k.useState(!1),Nu=()=>{if(!Dn||!de||de.subPhase!=="daily"||ds!=null||Fs!=null||q!=null||ul||$s!=null||Wn)return;const C=de.players[de.currentPlayerIdx];!C||C.stats.money<D.dailySlot.spinBet*D.dailySlot.spins||_i(!0)},Po=k.useCallback(async C=>{var ut;const B=la.current;if(!B||B.subPhase!=="daily")return;const z=B.currentPlayerIdx,ne=B.players[z];let L={...ne.stats};const K=[],Te=L.virtue,Oe=rn[ne.characterType]??rn.salaryman,We=Oe.ponMultiplier;let sn=ne.streamMultiplier??Oe.streamMultiplier,Jt=ne.amulets??0;if(Jt>0){const He=Jt*2;L.luck=At(L.luck+He),K.push(`🧿 お守り効果（${Jt}個）: 運+${He}→${L.luck}`)}const Je=D.dailySlot;if(!Array.isArray(C)||C.length!==Je.spins){e("デイリースロットの結果データが不正です");return}K.push(`${ne.name} ${B.currentDay}日目【デイリースロット・技能練習】${C.length}回（各${Je.spinBet}Gベット／8日目スロットと同じ役配当テーブル）`);const Ht=typeof((ut=C[C.length-1])==null?void 0:ut.pityCounterAfter)=="number"?C[C.length-1].pityCounterAfter:ne.slotPityCounter??0;let Zt=0;C.forEach((He,re)=>{const Ee=Number((He==null?void 0:He.bet)??Je.spinBet),mt=Number((He==null?void 0:He.payout)??0),wt=mt-Ee;Zt+=wt,L.money=xn(L.money-Ee+mt);const pt=Je.skillGainEverySpin,l=He!=null&&He.tier&&He.tier!=="miss"?Je.skillGainOnRole:0;L.skill=At(L.skill+pt+l),K.push(`  ${re+1}回目 [${Ee}G]: ${(He==null?void 0:He.message)??"？"} / 収支${wt>=0?"+":""}${wt}G → 資金${L.money}G・技量${L.skill}（本回練習+${pt}${l?`・役ボ+${l}`:""}）`)}),K.push(`  デイリースロット収支計 ${Zt>=0?"+":""}${Zt}G`);const jn="dailySlot";if(B.subPhase==="daily"){const He=Vl(ne);L.money=xn(L.money-He),K.push(`  生活費 -${He}G → 資金 ${L.money}G${L.money<0?" 【借金中】":""}`)}const Cn=Math.ceil(D.pon.dailyGain*We),cs=L.pon;L.pon=At(L.pon+Cn),K.push(`  PON: ${cs} +${Cn}${We!==1?`(×${We})`:""} → ${L.pon}`);let vn=null,za=sn;const On=Oe.ponFireMoneyPenaltyMultiplier??1;if(L.pon>=D.pon.fireThreshold&&Math.random()<L.pon/100){const He=L.pon;{const re=Math.max(1,Math.round($e(D.pon.work.penaltyMin,D.pon.work.penaltyMax)*On));L.money=xn(L.money-re),vn=`⚠️ 弁償！資金-${re}G`}L.pon=Math.floor(He/2),K.push(`  [PON発火 ${He}%] ${vn} / PON→半減→${L.pon}`)}else K.push(`  PON発火なし（${L.pon>=D.pon.fireThreshold?`${L.pon}%判定ハズレ`:`閾値${D.pon.fireThreshold}まであと${D.pon.fireThreshold-L.pon}`}）`);let es=B.players.map((He,re)=>re===z?{...He,stats:L,streamMultiplier:za,amulets:Jt,slotPityCounter:Ht}:He);es=Wu(ne,Te,L.virtue,es,K),vn&&jn==="stream"&&B.subPhase==="day8"&&(es=ap(z,es,K)),B.subPhase==="daily"&&(es=es.map((He,re)=>re!==z?He:pb(He,K))),vn&&jn==="stream"&&(Xe(!0),setTimeout(()=>Xe(!1),500));const Ba={...B,recentPonEvent:vn?{player:ne.name,msg:vn}:null},Re=yb(Ba,es,K),Ze=B.currentDay===Ea&&z===B.players.length-1;B.currentDay===Ea&&B.subPhase==="daily"&&ia(Mb(Re,B,Ze)),Ze&&await new Promise(He=>setTimeout(He,go)),await ms(Re)||ia(null)},[ms]),Wt=async C=>{if(!Dn||!de||ds!=null||Fs!=null||q!=null||ul||$s!=null||Wn)return;C!=="stream"&&(Zn.current.forEach(clearTimeout),Zn.current=[],ls.current&&(clearTimeout(ls.current),ls.current=null),br(null)),C!=="work"&&(qs.current.forEach(clearTimeout),qs.current=[],As.current&&(clearTimeout(As.current),As.current=null),Jn.current&&(clearTimeout(Jn.current),Jn.current=null),yi(null),Pa(null));const B=de,z=B.players[B.currentPlayerIdx],ne=z.stats.money;let L={...z.stats};const K=[];let Te=!1,Oe=!1,We=!1,sn=0,Jt=0,Je=0;const Ht=L.virtue,Zt=rn[z.characterType]??rn.salaryman,jn=Zt.ponMultiplier;let Cn=z.streamMultiplier??Zt.streamMultiplier,cs=z.amulets??0;if(cs>0){const re=cs*2;L.luck=At(L.luck+re),K.push(`🧿 お守り効果（${cs}個）: 運+${re}→${L.luck}`)}if(C==="shrine"){const re=D.shrine,Ee=L.virtue;L.money=xn(L.money-re.cost),L.luck=At(L.luck+re.luckGain),L.virtue=At(L.virtue+re.virtueGain),L.pon=Math.max(0,L.pon-re.ponReduce),K.push(`${z.name} ${B.currentDay}日目【神社】二礼二拍手一礼。運気が上がった気がする！ -${re.cost}G / 運+${re.luckGain}→${L.luck} / 善行+${re.virtueGain}→${L.virtue} / PON-${re.ponReduce}→${L.pon}`);const mt=D3(Ee,re.amuletBaseRate);Math.random()<mt&&(cs++,K.push(`  🧿 お守りを入手した！（計${cs}個／善行${Ee}・抽選${(mt*100).toFixed(0)}%）`)),he("in"),setTimeout(()=>he("out"),1700),setTimeout(()=>he(null),2700)}else if(C==="work"){qs.current.forEach(clearTimeout),qs.current=[],As.current&&(clearTimeout(As.current),As.current=null),Jn.current&&(clearTimeout(Jn.current),Jn.current=null),Pa(null);const re=Zt.workRewardBonus??0,Ee=Zt.workRewardMultiplier??1,mt=Math.floor((D.work.reward+re)*Ee),wt=wc(L.virtue),pt=Sm(mt,L.virtue),l=D.work.virtueGain;L.money=xn(L.money+pt),L.virtue=At(L.virtue+l),yi({gold:pt,stat:{label:"善行",delta:l}}),As.current=window.setTimeout(()=>{yi(null),As.current=null},2e3),K.push(`${z.name} ${B.currentDay}日目【仕事】資金+${pt}G${re?`（査定+${re}G込み・×${Ee}）`:Ee!==1?`（×${Ee}）`:""}・善行収入×${wt.toFixed(2)}（ベース${mt}G） / 善行+${l}→${L.virtue}`),sn=pt}else if(C==="stream"){Zn.current.forEach(clearTimeout),Zn.current=[];const re=Math.random()<.5?"chat":"game",Ee=re==="chat"?"雑談配信":"ゲーム配信";ls.current&&(clearTimeout(ls.current),ls.current=null);const mt=Math.max(D.stream.minFailRate,D.stream.baseFailRate-(L.skill-50)*D.stream.skillFailReduce),wt=Math.random()<mt;Te=wt;let pt=0,l=null;if(wt){const f=D.stream.successMin,m=Math.round(f*Cn),v=wc(L.virtue),j=Sm(m,L.virtue);pt=j,L.money=xn(L.money+j),K.push(`${z.name} ${B.currentDay}日目【${Ee}】💥失敗（最低収入） 資金+${j}G（成功時下限${D.stream.successMin}G×配信×${Cn.toFixed(1)}・善行収入×${v.toFixed(2)}・基準${m}G）/ 善行・技量ボーナスなし (失敗率${(mt*100).toFixed(0)}%)`)}else{const f=$e(D.stream.successMin,D.stream.successMax),m=Math.round(f*Cn),v=wc(L.virtue),j=Sm(m,L.virtue);if(pt=j,L.money=xn(L.money+j),re==="chat"){const P=$e(D.stream.chat.virtueGainMin,D.stream.chat.virtueGainMax);L.virtue=At(L.virtue+P),l=P?{label:"善行",delta:P}:null,K.push(`${z.name} ${B.currentDay}日目【${Ee}】✨成功 資金+${j}G（配信×${Cn.toFixed(1)}・善行収入×${v.toFixed(2)}・基準${m}G） / 善行+${P}→${L.virtue} (失敗率${(mt*100).toFixed(0)}%)`)}else{const P=$e(D.stream.game.skillGainMin,D.stream.game.skillGainMax);L.skill=At(L.skill+P),l=P?{label:"技量",delta:P}:null,K.push(`${z.name} ${B.currentDay}日目【${Ee}】✨成功 資金+${j}G（配信×${Cn.toFixed(1)}・善行収入×${v.toFixed(2)}・基準${m}G） / 技量+${P}→${L.skill} (失敗率${(mt*100).toFixed(0)}%)`)}}br({mode:re,gold:pt,stat:l}),ls.current=setTimeout(()=>{br(null),ls.current=null},2e3)}else return;if(B.subPhase==="daily"){const re=Vl(z);L.money=xn(L.money-re),K.push(`  生活費 -${re}G → 資金 ${L.money}G${L.money<0?" 【借金中】":""}`),C==="work"&&(Jt=re)}const vn=Math.ceil(D.pon.dailyGain*jn),za=L.pon;L.pon=At(L.pon+vn),K.push(`  PON: ${za} +${vn}${jn!==1?`(×${jn})`:""} → ${L.pon}`);let On=null,es=Cn;const Ba=Zt.ponFireMoneyPenaltyMultiplier??1;if(L.pon>=D.pon.fireThreshold&&Math.random()<L.pon/100){const re=L.pon;if(C==="stream"){const Ee=$e(D.pon.stream.moneyMin,D.pon.stream.moneyMax);L.money=xn(L.money+Ee),L.skill=At(L.skill-D.pon.stream.skillLoss,0),On=`🔥 失言がバズった！資金+${Ee}G / 技量-${D.pon.stream.skillLoss}`,z.characterType==="vtuber"&&(es=+(Cn+.5).toFixed(1),On+=` / 🎭リリム効果：配信倍率 ×${Cn.toFixed(1)}→×${es.toFixed(1)}（永続UP！）`),Oe=!0}else if(C==="shrine"){const Ee=Math.max(1,Math.round($e(50,150)*Ba));L.money=xn(L.money-Ee),On=`⚠️ ご神域で粗相をしてしまった！資金-${Ee}G`}else{const Ee=Math.max(1,Math.round($e(D.pon.work.penaltyMin,D.pon.work.penaltyMax)*Ba));L.money=xn(L.money-Ee),On=`⚠️ 弁償！資金-${Ee}G`,C==="work"&&(We=!0,Je=Ee)}L.pon=Math.floor(re/2),K.push(`  [PON発火 ${re}%] ${On} / PON→半減→${L.pon}`)}else K.push(`  PON発火なし（${L.pon>=D.pon.fireThreshold?`${L.pon}%判定ハズレ`:`閾値${D.pon.fireThreshold}まであと${D.pon.fireThreshold-L.pon}`}）`);if(C==="stream"){Zn.current.forEach(clearTimeout),Zn.current=[];let wt=2e3;if(Oe){const pt=window.setTimeout(()=>{var l,f;Do(!0),Xe(!0),window.setTimeout(()=>Xe(!1),500);try{(f=(l=jt.current)==null?void 0:l.playStreamPonBurn)==null||f.call(l)}catch{}La.current&&clearTimeout(La.current),La.current=window.setTimeout(()=>{Do(!1),La.current=null},3300)},wt);Zn.current.push(pt),wt+=3300}if(Te){const pt=window.setTimeout(()=>{var l,f;ra(!0);try{(f=(l=jt.current)==null?void 0:l.playStreamFailGaan)==null||f.call(l)}catch{}Bs.current&&clearTimeout(Bs.current),Bs.current=window.setTimeout(()=>{ra(!1),Bs.current=null},3200)},wt);Zn.current.push(pt)}}if(C==="work"&&(qs.current.forEach(clearTimeout),qs.current=[],We)){const mt=sn-Jt-Je,wt={penalty:Je,workIncome:sn,livingCost:Jt,balanceAfter:L.money,turnDelta:mt,moneyBefore:ne},pt=window.setTimeout(()=>{var l,f;Pa(wt);try{(f=(l=jt.current)==null?void 0:l.playWorkPonPlateBreak)==null||f.call(l)}catch{}Jn.current&&clearTimeout(Jn.current),Jn.current=window.setTimeout(()=>{Pa(null),Jn.current=null},3100)},2e3);qs.current.push(pt)}let Re=B.players.map((re,Ee)=>Ee===B.currentPlayerIdx?{...re,stats:L,streamMultiplier:es,amulets:cs}:re);if(Re=Wu(z,Ht,L.virtue,Re,K),On&&C==="stream"&&B.subPhase==="day8"&&(Re=ap(B.currentPlayerIdx,Re,K)),B.subPhase==="daily"){const re=B.currentPlayerIdx;Re=Re.map((Ee,mt)=>mt!==re?Ee:pb(Ee,K))}const Ze={...B,recentPonEvent:On?{player:z.name,msg:On}:null},an=yb(Ze,Re,K),ut=B.currentDay===Ea&&B.currentPlayerIdx===B.players.length-1;B.currentDay===Ea&&B.subPhase==="daily"&&ia(Mb(an,B,ut)),ut&&await new Promise(re=>setTimeout(re,go)),await ms(an)||ia(null)},Ed=async C=>{if(!Dn||!F)return;const B=F.currentPlayerIdx,z=F.players[B];if(z.movePhase!=="moving")return;const ne=z.pendingTaxiSteps??0;if(ne>0){if(Ue||C!=="taxiTrafficWait")return;hn.current&&(clearTimeout(hn.current),hn.current=null),Ct.current=!1,qt(!1),_e(null),Ye.current=null;const Re={...z.stats},Ze=Re.pon,an=Re.virtue;Re.pon=At(Re.pon+ne);const ut=Math.min(tn,z.position+ne),He=z.moveTurns+1,re=[];z.characterType==="vtuber"&&re.push(`🎭 ${z.name}: "Ugh, this traffic is the worst! My stream is going to be late!"`);const Ee=vb(F,B,ut,Re,re,{ponSplashDamage:!1}),mt=Ee.players[B],wt=mt.position,pt=mt.stats,l=wt>=tn,f=!l&&He>=D.dice.maxTurns,m=l?Math.max(0,D.dice.maxTurns-He):0;let v=`🚗 渋滞を待つ（Wait in Traffic）⋯ 残り${ne}マス進行 → ${wt}/${tn}マス / PON${Ze}+${ne}→${pt.pon}`;if(wt!==ut&&(v+=`（マス効果:${ut}→${wt}）`),re.push(`${z.name} T${He}: ${v}`),l){const Cs=m*D.dice.slotsPerSugorokuTurn;re.push(`🎯 ${z.name} がゴールへ到着！獲得スロット ${m}ターンブン（開始時までに計${Cs}回）（確認後ターン終了 → 次の自分のターンでスロット開始）`)}f&&re.push(`⏰ ${z.name} タイムアップ（${D.dice.maxTurns}ターン消費）`);let j=Wu(z,an,pt.virtue,Ee.players,re).map((Cs,xa)=>{if(xa!==B)return Cs;const Ti={...Cs,moveTurns:He,lastMoveEvent:v,pendingTaxiSteps:0};return l?{...Ti,movePhase:"goalLanding",slotTurnsLeft:0,reservedSlotTurns:m,slotPullsGranted:0,slotPullsThisSeat:0}:f?{...Ti,movePhase:"missed",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}:{...Ti,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}});const P={...Ee.gsWithTiles,lastDiceRolls:[]},J=l?{...P,players:j,log:da(re,P.log)}:Vr(P,j,re),Me=wt!==ut,Be=Me?Im(j,B,ut):null,Pe=Be?{...P,players:Be}:null,kt=Me?ut:wt;ee(!0),setTimeout(()=>ee(!1),700);const Rs=ic(Math.abs(kt-z.position))*2;_t.current=Rs,ft(Rs),cn(kt),fe(null),Vt.current=0,Bt(Rs),te.current=Me&&Pe?Pe:J,Ye.current=Me&&Pe?{finalGS:J,fromPos:ut,toPos:wt}:null,Ie.current=!1,aa.current=Ee.tileToast,ge(!0),Nn("drive");return}if(Ue)return;if(hn.current&&(clearTimeout(hn.current),hn.current=null),Ct.current=!1,qt(!1),_e(null),Ye.current=null,C==="help"&&z.stats.pon>=D.pon.deathThreshold&&Math.random()<D.pon.deathChance){const Re=F.players.map((Ze,an)=>an===F.currentPlayerIdx?{...Ze,alive:!1}:Ze);await ms({...F,players:Re,gamePhase:"gameOver",gameOverMsg:`${z.name} はPON${z.stats.pon}の状態で人助けに失敗し、社会的に抹殺された…`,log:da([`💀 GAME OVER: ${z.name} / PON${z.stats.pon}で人助け失敗！`],F.log)});return}let L=0,K=[],Te="",Oe=!1,We=0,sn=!1,Jt=0,Je={...z.stats};const Ht=[],Zt=Je.virtue;if(C==="help"){L=1;const Re=$e(D.dice.helpVirtueMin,D.dice.helpVirtueMax);Je.virtue=At(Je.virtue+Re),Te=`人助け！1マス前進 / 善行+${Re}（→${Je.virtue}）`,K=[1]}else if(C==="taxi"){if(Je.money<D.dice.taxiCost)return;Je.money=xn(Je.money-D.dice.taxiCost);const Re=$e(D.dice.taxiMoveMin,D.dice.taxiMoveMax);if(We=D.dice.taxiBaseTurns-1,K=[Re],L=Re,Te=`タクシー！${Re}マス予定 / 資金-${D.dice.taxiCost}G`,Je.virtue<=D.dice.taxiCongestThresh&&Math.random()<D.dice.taxiCongestChance){const Ze=Math.ceil(Re/2);z.position+Ze>=tn||(Jt=Re-Ze,L=Ze,sn=!0,Je.pon=At(Je.pon+D.dice.taxiCongestPon),Te+=` / 🚗渋滞！まず ${Ze} マスのみ進行／残り ${Jt} マスは次の自分ターンで完了（試行+PON+${D.dice.taxiCongestPon}）`)}}else{const Re=M3(z.stats);L=Re.value,K=[...Re.rolls],Oe=Re.advantage;const Ze=Re.advantage?`（運アドバンテージ：合計${Re.value}マス）`:"";if(C==="shop"){if(Je.money<D.dice.shopCost)return;const an=$e(1,4);L+=an,K=[...Re.rolls,an],Je.money=xn(Je.money-D.dice.shopCost),Te=`コンビニ！🎲${Re.rolls.join(", ")}${Ze} + 店舗🎲${an} = ${L}マス / -${D.dice.shopCost}G`}else Te=`🎲 ダイスの出目: ${Re.rolls.join(", ")}${Ze} (合計${L}マス)`}let jn=!1;const Cn=L;C!=="taxi"&&Je.pon>=D.pon.fireThreshold&&Math.random()<Je.pon/100&&(jn=!0,L=Math.ceil(L/2));const cs=Je.pon;Je.pon=At(Je.pon+L),jn&&(Je.pon=Math.floor(Je.pon/2));const vn=K.length,za=400,On=520,es=za+(vn-1)*On+2e3;rt(!0),$(Array(vn).fill(null)),Ae(Array(vn).fill(!1)),Y(Array.from({length:vn},()=>$e(1,6))),Ne(Oe),on(!1),C==="taxi"&&Nn("taxiHail"),Oe&&(ye(!0),setTimeout(()=>ye(!1),1900));const Ba=setInterval(()=>{Y(Array.from({length:vn},()=>$e(1,6)))},80);setTimeout(()=>{clearInterval(Ba),K.forEach((Re,Ze)=>{setTimeout(()=>{$(an=>{const ut=[...an];return ut[Ze]=Re,ut}),Ae(an=>{const ut=[...an];return ut[Ze]=!0,ut}),Ze===vn-1&&setTimeout(()=>on(!0),200)},Ze*On)})},za),setTimeout(async()=>{const Re=jn?Math.ceil(Cn/2):L,Ze=Math.min(tn,z.position+Re),an=z.moveTurns+1+We,ut=vb(F,B,Ze,Je,Ht,{ponSplashDamage:jn}),He=ut.players[B],re=He.position,Ee=He.stats,mt=re>=tn,wt=!mt&&an>=D.dice.maxTurns,pt=mt?Math.max(0,D.dice.maxTurns-an):0,l=jn?` ⚡転倒(${cs}%) ${Cn}→${L}マス / PON→半減→${Ee.pon}`:` / PON${cs}+${L}→${Ee.pon}`;let f=`${Te} → ${re}/${tn}マス${l}`;if(re!==Ze&&(f+=`（マス効果:${Ze}→${re}）`),K.length>1&&Ht.push(`  ダイスの出目: ${K.join(", ")} (合計${Cn}${jn?`→転倒で${L}`:""}マス)`),jn&&Ht.push(`  ⚡転倒！${Cn}マス→${L}マス / PON半減`),mt){const Be=pt*D.dice.slotsPerSugorokuTurn;Ht.push(`🎯 ${z.name} がゴールへ到着！獲得スロット ${pt}ターンブン（開始時までに計${Be}回）（確認後ターン終了 → 次の自分のターンでスロット開始）`)}wt&&Ht.push(`⏰ ${z.name} タイムアップ（${D.dice.maxTurns}ターン消費）`),Ht.push(`${z.name} T${an}: ${f}`);const m=!wt&&!mt&&sn?Jt:0;let v=Wu(z,Zt,ut.players[B].stats.virtue,ut.players,Ht).map((Be,Pe)=>{if(Pe!==F.currentPlayerIdx)return Be;const kt={...Be,moveTurns:an,lastMoveEvent:f,pendingTaxiSteps:m};return mt?{...kt,movePhase:"goalLanding",slotTurnsLeft:0,reservedSlotTurns:pt,slotPullsGranted:0,slotPullsThisSeat:0}:wt?{...kt,movePhase:"missed",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}:{...kt,movePhase:"moving",slotTurnsLeft:0,reservedSlotTurns:0,slotPullsGranted:0,slotPullsThisSeat:0}});const j={...ut.gsWithTiles,lastDiceRolls:K},P=mt?{...j,players:v,log:da(Ht,ut.gsWithTiles.log)}:Vr(j,v,Ht),J=re!==Ze,Me=()=>{var Be,Pe;(Pe=(Be=ut.tileToast)==null?void 0:Be.lines)!=null&&Pe.length&&(Rn.current&&clearTimeout(Rn.current),Lt(ut.tileToast),Rn.current=setTimeout(()=>{Lt(null),Rn.current=null},2800))};if(ee(!0),setTimeout(()=>ee(!1),700),C==="taxi"){if(Ie.current=sn,aa.current=ut.tileToast,sn){te.current=P,Ye.current=null;const Be=ic(Math.abs(re-z.position));_t.current=Be,ft(Be),cn(re);const{jamMid:Pe,firstLegMs:kt,secondLegMs:ps}=X3(z.position,re,K[0],Be);fe(Pe),Vt.current=ps,Bt(kt)}else if(J){const Be=Im(v,B,Ze);te.current={...j,players:Be},Ye.current={finalGS:P,fromPos:Ze,toPos:re};const Pe=ic(Math.abs(Ze-z.position));_t.current=Pe,ft(Pe),cn(Ze),fe(null),Vt.current=0,Bt(Pe)}else{te.current=P,Ye.current=null;const Be=ic(Math.abs(re-z.position));_t.current=Be,ft(Be),cn(re),fe(null),Vt.current=0,Bt(Be)}Nn("enter"),ge(!1),rt(!1)}else if(jn)Tt.current={nextGS:P,characterType:z.characterType??"salaryman",tileFxToast:ut.tileToast},Ct.current=!0,hn.current&&(clearTimeout(hn.current),hn.current=null),J?(qt(!1),_e(Ze),hn.current=setTimeout(()=>{hn.current=null,_e(re),qt(!0)},wm(z.position,Ze))):(qt(!0),_e(re)),rt(!1);else{if(J){const Be=Im(v,B,Ze),Pe={...j,players:Be};if(!await ms(Pe)){rt(!1);return}if(await new Promise(Rs=>setTimeout(Rs,wm(z.position,Ze))),!await ms(P)){rt(!1);return}}else if(!await ms(P)){rt(!1);return}rt(!1),Me()}},es)};if(!s)return c.jsxs("div",{className:"min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400",children:[c.jsx(Lr,{size:32,className:"animate-spin text-cyan-400"}),c.jsx("p",{className:"text-sm",children:"接続中…"})]});if(O==="entry")return c.jsx("div",{className:"min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 pb-12 text-slate-100",children:c.jsxs("div",{className:"w-full max-w-6xl flex flex-col items-center text-center space-y-10",children:[c.jsxs("div",{className:"flex flex-col items-center gap-5 w-full",children:[c.jsx("img",{src:ya(ES),alt:Cf,className:"w-full max-w-[min(100%,1020px)] h-auto object-contain select-none drop-shadow-[0_0_40px_rgba(34,211,238,0.12)]"}),c.jsxs("div",{className:"space-y-3 px-1 max-w-3xl",children:[c.jsx("h1",{className:"text-xl sm:text-2xl md:text-[1.65rem] font-bold text-slate-50 leading-snug tracking-tight font-[Rajdhani]",children:Cf}),c.jsxs("p",{className:"text-[11px] font-semibold tracking-[0.32em] text-cyan-400/90 uppercase",children:[Ah," · ",Nm]}),c.jsxs("div",{className:"rounded-xl border border-slate-700/80 bg-slate-900/50 px-3 py-2.5 text-left",children:[c.jsx("p",{className:"text-[11px] font-bold text-amber-200/95 mb-1",children:"ソロ先行プレイ版"}),c.jsx("p",{className:"text-xs text-slate-400 leading-relaxed",children:"マルチプレイ（オンライン）はロック中です。まず一人でゲームシステムをお楽しみください。"})]})]})]}),c.jsxs("div",{className:"w-full max-w-md space-y-4",children:[c.jsxs("div",{className:"space-y-2 text-left",children:[c.jsx("label",{className:"text-sm text-slate-300 font-semibold block",children:"プレイヤー名"}),c.jsx("input",{value:p,onChange:C=>g(C.target.value),onKeyDown:C=>C.key==="Enter"&&Au(),maxLength:12,autoFocus:!0,className:"w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-base text-center focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-colors",placeholder:"例: 闇月リリム"}),c.jsx("p",{className:"text-xs text-slate-500 text-center",children:"空欄の場合はランダムな名前が割り当てられます"})]}),c.jsxs("button",{type:"button",onClick:Au,className:"w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] py-4 font-bold text-slate-950 transition-all shadow-lg shadow-cyan-900/35 border border-cyan-400/30",children:[c.jsx("span",{className:"block text-xl tracking-[0.2em] font-black",children:"START"}),c.jsx("span",{className:"block text-xs font-semibold text-slate-900/75 mt-1",children:"遊ぶ"})]})]})]})});if(O==="lobby")return c.jsx(CD,{myFullId:Ns,copied:M,onCopyMyId:Nr,loading:V,onSoloPlay:ba,multiOpen:se,onToggleMultiOpen:()=>{pe(C=>!C),Qe(null),e("")},multiAction:Se,onSetMultiAction:Qe,onQuickMatch:bi,isPrivateRoom:W,onSetPrivateRoom:S,allowQuickMatch:ht,onSetAllowQuickMatch:Dt,onCreateRoom:Ua,joinInput:R,onJoinInputChange:I,onJoinRoom:Eu,onCheckInvites:Td,uiError:t,onClearUiError:()=>e(""),seVolume:ue,bgmVolume:X,onSeVolumeChange:oa,onBgmVolumeChange:Sr});if(O==="waiting")return c.jsx(HD,{waitingSessionKey:b,myFullId:Ns,copied:M,onCopyMyId:Nr,roomData:r,roomId:a,playerSlots:os,myId:n,isHost:xr,onReturnToLobby:Ar,onSelectCharacter:hl,onCommitInitialRolls:wu,soundRef:jt,onStartGame:Su,loading:V,uiError:t,inviteInput:_,onInviteInputChange:E,inviteError:A,onInvitePlayer:_d,seVolume:ue,bgmVolume:X,onSeVolumeChange:oa,onBgmVolumeChange:Sr,unlockPlayerNameForSecret:p});if(O==="gameover")return c.jsxs("div",{className:"min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center",children:[c.jsx(Nc,{myFullId:Ns,copied:M,onCopy:Nr,seVolume:ue,bgmVolume:X,onSeVolumeChange:oa,onBgmVolumeChange:Sr}),c.jsxs("div",{className:"w-full max-w-md space-y-6 text-center",children:[c.jsx("div",{className:"text-7xl",children:"💀"}),c.jsx("h2",{className:"text-3xl font-bold text-rose-400",children:"GAME OVER"}),c.jsx("p",{className:"text-slate-300 text-sm leading-relaxed",children:F==null?void 0:F.gameOverMsg}),((Lo=F==null?void 0:F.players)==null?void 0:Lo.some(C=>C.alive))&&c.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left space-y-2",children:[c.jsx("p",{className:"text-xs text-slate-400 mb-2",children:"生き残ったプレイヤー"}),(F.players??[]).filter(C=>C.alive).map(C=>c.jsxs("div",{className:"flex justify-between text-sm",children:[c.jsxs("span",{children:[C.name,C.id===n&&" (YOU)"]}),c.jsxs("span",{className:"text-yellow-300",children:[C.stats.money,"G / ",Ac(C.stats.money),"ランク"]})]},C.id))]}),c.jsx("button",{onClick:Ar,className:"rounded-xl bg-cyan-500 px-8 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ロビーへ戻る"})]})]});if(O==="results"){const C=[...(F==null?void 0:F.players)??[]].sort((K,Te)=>Te.stats.money-K.stats.money),B=["🥇","🥈","🥉",""],z=C.length>0?C[0]:null,ne=z!=null&&Ac(z.stats.money)==="SS",L=ne?z.characterType==="vtuber"?"✦ 伝説のリリム ✦":"✦ 伝説のスター ✦":"最終結果";return c.jsxs("div",{className:"relative min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8 overflow-hidden",children:[c.jsx("style",{children:Cb}),c.jsx(Nc,{myFullId:Ns,copied:M,onCopy:Nr,seVolume:ue,bgmVolume:X,onSeVolumeChange:oa,onBgmVolumeChange:Sr}),ne&&c.jsx(kD,{}),c.jsxs("div",{className:"mx-auto max-w-lg space-y-5 relative z-10",children:[c.jsxs("div",{className:"text-center space-y-2",children:[ne?c.jsx("div",{className:"text-5xl leading-none select-none anim-fadein",children:"👑"}):c.jsx(i3,{size:52,className:"mx-auto text-amber-400"}),c.jsx("h2",{className:`text-3xl font-bold ${ne?"text-yellow-300":""}`,children:L}),ne&&c.jsx("p",{className:"text-amber-300/80 text-sm tracking-wider",children:"スーパースター達成！おめでとう！"})]}),c.jsx("div",{className:"space-y-3",children:C.map((K,Te)=>{const Oe=Ac(K.stats.money),We=Oe==="SS";return c.jsx("div",{className:`rounded-xl border p-4 ${Te===0&&We?"border-yellow-400/80 bg-yellow-400/10 shadow-[0_0_24px_rgba(251,191,36,0.25)]":Te===0?"border-amber-400/60 bg-amber-400/10":"border-slate-800 bg-slate-900"}`,children:c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("span",{className:"text-2xl",children:We&&Te===0?"👑":B[Te]??""}),c.jsxs("div",{className:"flex-1",children:[c.jsxs("div",{className:"font-semibold flex items-center gap-2 flex-wrap",children:[c.jsx("span",{className:We?"text-yellow-200":"",children:K.name}),K.id===n&&c.jsx("span",{className:"text-xs text-cyan-400 border border-cyan-400/40 rounded px-1",children:"YOU"}),(K.amulets??0)>0&&c.jsxs("span",{className:"text-xs text-amber-400",children:["🧿×",K.amulets]})]}),c.jsxs("div",{className:"text-xs text-slate-400",children:["スロット",K.spinCount,"回 / 移動",K.moveTurns,"T / 技量",K.stats.skill," / 善行",K.stats.virtue]})]}),c.jsxs("div",{className:"text-right",children:[c.jsxs("div",{className:"text-xl font-bold text-yellow-300",children:[K.stats.money,"G"]}),c.jsxs("div",{className:"text-xs text-slate-400",children:["スロット収支: ",c.jsxs("span",{className:K.slotNet>=0?"text-emerald-400":"text-rose-400",children:[K.slotNet>=0?"+":"",K.slotNet,"G"]})]}),c.jsxs("div",{className:`text-sm font-black ${We?"text-yellow-300":Oe==="S"?"text-amber-400":"text-slate-400"}`,children:[We&&"✦ ","ランク ",Oe,We&&" ✦"]})]})]})},K.id)})}),c.jsx("button",{onClick:Ar,className:"w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ロビーへ戻る"})]})]})}return F?c.jsxs("div",{className:`min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8 ${xe?"anim-shake":""}`,children:[c.jsx("style",{children:Cb}),c.jsx(Nc,{myFullId:Ns,copied:M,onCopy:Nr,seVolume:ue,bgmVolume:X,onSeVolumeChange:oa,onBgmVolumeChange:Sr}),xe&&c.jsx("div",{className:"fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none",children:c.jsx("span",{className:"bg-rose-600/90 text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg anim-fadein tracking-wide",children:"⚡ 転倒 / 炎上！"})}),dt&&c.jsx(vD,{active:!0,characterType:dt.characterType,onFallLand:()=>{Xe(!0),setTimeout(()=>Xe(!1),420)},onComplete:()=>{Pt.current()}}),ot==="trafficJam"&&c.jsx(bD,{}),((Uo=Et==null?void 0:Et.lines)==null?void 0:Uo.length)>0&&c.jsxs("div",{className:"fixed bottom-[min(132px,22vh)] left-1/2 z-[228] flex w-[min(92vw,360px)] -translate-x-1/2 flex-col gap-1.5 rounded-2xl border border-cyan-500/55 bg-slate-950/95 px-5 py-3.5 shadow-[0_14px_50px_rgba(0,0,0,0.75)] pointer-events-none text-center anim-fadein",role:"status","aria-live":"polite",children:[c.jsx("p",{className:"text-[11px] font-bold uppercase tracking-widest text-cyan-300/85",children:Et.title??"マス効果"}),c.jsx("ul",{className:"space-y-1 text-sm font-bold text-amber-100 leading-snug",children:Et.lines.map((C,B)=>c.jsx("li",{children:C},B))})]}),Fs&&c.jsx(GD,{mode:Fs.mode,gold:Fs.gold,stat:Fs.stat}),ds&&c.jsx(YD,{gold:ds.gold,stat:ds.stat}),ul&&c.jsxs("div",{className:"fixed inset-0 z-[230] cursor-default overflow-hidden bg-black/0 anim-fadein pointer-events-auto",role:"status","aria-live":"assertive",children:[c.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black via-red-950/85 to-orange-950/75 anim-stream-pon-burn-veil","aria-hidden":!0}),c.jsx("div",{className:"absolute -bottom-[18%] left-[-20%] right-[-20%] h-[72%] rounded-[50%] bg-gradient-to-t from-orange-500/60 via-red-600/40 to-transparent blur-[90px] anim-stream-pon-flame","aria-hidden":!0}),c.jsx("div",{className:"absolute bottom-0 left-[12%] w-[76%] h-[48%] rounded-full bg-amber-300/25 blur-[80px] anim-stream-pon-flame opacity-95",style:{animationDelay:"0.12s"},"aria-hidden":!0}),c.jsx("div",{className:"absolute top-[28%] left-[8%] h-40 w-40 rounded-full bg-orange-400/35 blur-[48px] anim-stream-pon-flame","aria-hidden":!0}),c.jsx("div",{className:"absolute top-[32%] right-[10%] h-48 w-48 rounded-full bg-red-500/30 blur-[56px] anim-stream-pon-flame",style:{animationDelay:"0.2s"},"aria-hidden":!0}),c.jsx("div",{className:"relative z-[1] flex min-h-full flex-col items-center justify-center px-5 pt-8",children:c.jsx("p",{className:"text-[min(20vw,7rem)] sm:text-[min(16vw,7.5rem)] font-black tracking-tight leading-none anim-stream-pon-text text-amber-100",style:{textShadow:"0 0 52px rgba(251,146,60,1), 0 0 100px rgba(239,68,68,0.85), 0 6px 0 rgb(124,45,18), 0 -4px 28px rgba(254,243,199,0.65)",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"PON！！"})})]}),$s&&c.jsxs("div",{className:"fixed inset-0 z-[230] flex cursor-default flex-col items-center justify-center px-5 bg-black/70 pointer-events-auto anim-fadein",role:"status","aria-live":"assertive",children:[c.jsx("p",{className:"text-[min(20vw,7rem)] sm:text-[min(16vw,7.5rem)] font-black tracking-tight text-fuchsia-100 leading-none",style:{textShadow:"0 0 56px rgba(232,121,249,0.65), 0 5px 0 rgb(109,40,217), 0 0 2px #fff",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"PON！！"}),c.jsxs("div",{className:"mt-6 max-w-lg space-y-4 text-center text-sm sm:text-base text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]",children:[c.jsxs("p",{children:["PONでの弁償"," ",c.jsxs("span",{className:"font-bold tabular-nums text-rose-300",children:["-",$s.penalty,"G"]})]}),c.jsxs("p",{children:["このターンの収支（仕事 − 生活費 − 弁償）"," ",c.jsxs("span",{className:`font-bold tabular-nums ${$s.turnDelta>=0?"text-cyan-300":"text-rose-300"}`,children:[$s.turnDelta>=0?"+":"",$s.turnDelta,"G"]})]})]})]}),Wn&&c.jsxs("div",{className:"fixed inset-0 z-[230] flex cursor-default flex-col items-center justify-center px-5 bg-black/75 pointer-events-auto anim-fadein",role:"status","aria-live":"assertive",children:[c.jsx("p",{className:"text-[min(22vw,7.5rem)] sm:text-[min(18vw,8rem)] font-black tracking-tighter text-white leading-none mb-6",style:{textShadow:"0 0 48px rgba(248,113,113,0.55), 0 4px 0 rgb(127,29,29)",fontFamily:'"Noto Sans JP","Yu Gothic UI",sans-serif'},children:"失敗"}),c.jsx("p",{className:"max-w-lg text-center text-base sm:text-lg font-semibold text-slate-200 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",children:"OBSトラブルで少ししか配信ができなかった"})]}),q&&c.jsxs("div",{className:`fixed inset-0 z-[210] flex cursor-default flex-col items-center justify-center bg-black/65 pointer-events-auto ${q==="in"?"anim-shrine-in":"anim-shrine-out"}`,children:[c.jsx("span",{className:"text-[100px] leading-none select-none",style:{filter:"drop-shadow(0 0 30px rgba(251,191,36,0.7))"},children:"⛩"}),c.jsx("p",{className:"mt-4 text-xl font-semibold text-amber-200 tracking-[0.25em]",children:"二礼二拍手一礼"}),c.jsx("p",{className:"text-sm text-amber-300/70 mt-1",children:"運気が上がった気がする…"})]}),Ke&&c.jsx("div",{className:"fixed inset-0 z-40 flex items-center justify-center pointer-events-none",children:c.jsx("span",{className:"text-3xl font-black text-amber-300 tracking-wide anim-lucky-pop",style:{textShadow:"0 0 24px rgba(251,191,36,0.9), 0 0 8px rgba(251,191,36,0.7)"},children:"幸運のダイス！🎲🎲"})}),vi&&c.jsx(ED,{gameState:F,soundRef:jt}),vi?null:c.jsxs("div",{className:"mx-auto w-full max-w-4xl space-y-5",children:[c.jsx("header",{className:"rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4",children:c.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2",children:[c.jsxs("div",{children:[c.jsx("h1",{className:"text-lg font-bold md:text-xl font-[Rajdhani] tracking-wide text-white",children:Ah}),c.jsx("p",{className:"text-[10px] text-slate-500 mt-0.5 leading-tight uppercase tracking-wide max-w-md",children:Nm}),c.jsxs("p",{className:"text-xs text-slate-400 mt-1.5 leading-relaxed space-y-0.5",children:[F.subPhase==="daily"&&`${F.currentDay}日目 / ${Z==null?void 0:Z.name}のターン`,F.subPhase==="day8"&&Z&&c.jsxs(c.Fragment,{children:[c.jsxs("span",{className:"block",children:[Z.movePhase==="missed"&&`【8日目・決戦】タイムアウト／${Z.name}`,St&&`【8日目・決戦】ゴール到着処理中／${Z.name}`,_r&&`【8日目・決戦】ゴール済／${Z.name}（次の自分ターンからスロット）`,Tr&&`【8日目・決戦】スロット／${Z.name}`]}),c.jsxs("span",{className:"block tabular-nums font-semibold text-amber-200/90 mt-1 sm:mt-0.5",children:["残りターンバースト"," ",c.jsx("strong",{children:Math.max(0,D.dice.maxTurns-Z.moveTurns)})," / ",D.dice.maxTurns,"ターン"," ",c.jsx("span",{className:"font-normal text-slate-500",children:"（すごろく／スロット共通）"})]})]})]})]}),c.jsxs("div",{className:"flex items-center gap-2 flex-wrap justify-end",children:[F.subPhase==="day8"&&Z&&c.jsxs("div",{className:"flex flex-col items-end gap-0.5",children:[c.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wide text-amber-400/90 leading-none",children:"8日目 HUD"}),c.jsx("span",{className:"text-xs font-bold text-slate-200 tabular-nums leading-none",children:Z.movePhase==="goalLanding"||Z.movePhase==="waitingSlot"?c.jsx(c.Fragment,{children:"ゴール済・スロット待ち"}):Z.movePhase==="arrived"?c.jsx(c.Fragment,{children:"🎰 スロット"}):Z.movePhase==="moving"?c.jsxs(c.Fragment,{children:["移動手番 ",c.jsx("strong",{children:Z.moveTurns}),c.jsx("span",{className:"text-slate-600",children:"/"}),c.jsx("strong",{children:D.dice.maxTurns})]}):c.jsx(c.Fragment,{children:Z.movePhase==="missed"?"すごろくタイムアウト済":"—"})})]}),c.jsx("span",{className:"text-xs text-slate-600 font-mono border border-slate-700 rounded px-2 py-0.5",children:a}),c.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[c.jsx(c3,{size:12,className:"text-cyan-400"}),c.jsx("span",{children:F.players.map(C=>C.name).join(" · ")})]}),!Dn&&c.jsxs("span",{className:"flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400",children:[c.jsx(Lr,{size:10,className:"animate-spin"}),Z==null?void 0:Z.name,"のターン待ち"]})]})]})}),Z&&c.jsxs("section",{className:"rounded-2xl border border-cyan-800/50 bg-slate-900 p-4",children:[c.jsxs("div",{className:"flex items-center gap-2 mb-3 flex-wrap",children:[c.jsxs("span",{className:"font-semibold text-cyan-400 text-sm",children:[Z.name,"のステータス"]}),Z.id===n&&c.jsx("span",{className:"text-xs text-cyan-400 border border-cyan-400/40 rounded px-1.5 py-0.5",children:"YOU"}),Z.stats.pon>=D.pon.deathThreshold&&c.jsxs("span",{className:"animate-pulse rounded-full border border-rose-500/60 bg-rose-500/15 px-2 py-0.5 text-xs text-rose-300",children:["💀 PON危険域 (",Z.stats.pon,")"]}),Z.stats.pon>=D.pon.fireThreshold&&Z.stats.pon<D.pon.deathThreshold&&c.jsxs("span",{className:"rounded-full border border-orange-500/50 bg-orange-500/15 px-2 py-0.5 text-xs text-orange-300",children:["🔥 PON発火域 (",Z.stats.pon,")"]})]}),c.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6",children:_3.map(({key:C,label:B,color:z})=>{const ne=Vl(Z),L=C==="livingCost",K=L?ne:Z.stats[C],Te=C==="money"&&Z.stats.money<0,Oe=C==="money"?"text-lg":"text-2xl";return c.jsxs("div",{className:"rounded-lg bg-slate-800 p-2.5 text-center",children:[c.jsxs("div",{className:"text-xs text-slate-400 leading-tight",children:[B,L&&c.jsxs("span",{className:"text-slate-500 text-[10px]",children:["／日",c.jsx("span",{className:"sr-only",children:"（1〜7日目の行動後）"})]})]}),c.jsxs("div",{className:`mt-0.5 font-bold tabular-nums inline-flex items-baseline justify-center gap-0.5 ${Te?"text-rose-400":z} ${Oe}`,children:[c.jsx("span",{children:K}),L&&c.jsx("span",{className:"text-xs font-semibold opacity-75",children:"G"})]})]},C)})}),(Z.amulets??0)>0&&c.jsxs("div",{className:"flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-sm",children:[c.jsx("span",{className:"text-base leading-none",children:"🧿"}),c.jsxs("span",{className:"text-amber-300 font-semibold",children:["お守り ×",Z.amulets]}),c.jsxs("span",{className:"text-amber-400/60 text-xs ml-auto",children:["毎ターン 運+",Z.amulets*2]})]}),F.subPhase==="day8"&&Z.spinCount>0&&c.jsxs("div",{className:"mt-2 flex items-center justify-end gap-2",children:[Z.slotNet>=0?c.jsx(s3,{size:14,className:"text-emerald-400"}):c.jsx(t3,{size:14,className:"text-rose-400"}),c.jsx("span",{className:"text-xs text-slate-400",children:"スロット収支:"}),c.jsxs("span",{className:`text-sm font-bold ${Z.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:[Z.slotNet>=0?"+":"",Z.slotNet,"G"]}),c.jsxs("span",{className:"text-xs text-slate-500",children:["（",Z.spinCount,"回）"]})]}),Z.stats.money<0&&c.jsxs("div",{className:"mt-2 rounded-lg border border-violet-500/45 bg-gradient-to-r from-violet-950/50 to-slate-900/80 px-3 py-2 space-y-0.5",children:[c.jsxs("span",{className:"text-violet-200 text-xs font-bold tracking-wide flex items-center gap-1.5",children:[c.jsx("span",{children:"🩻"})," 闇金リリムから高利子で借金中"]}),c.jsxs("span",{className:"block text-[11px] text-rose-300/90",children:["現在の赤字: ",Z.stats.money,"G（連続赤字が",D.rimiru.dailyGracesBefore,"ターン／",D.rimiru.day8TurnsBefore,"手番ごとに+",D.rimiru.interestPercent,"%）"]})]}),F.recentPonEvent&&c.jsxs("div",{className:"mt-3 rounded-lg border border-orange-500/40 bg-orange-500/10 p-2.5 text-sm text-orange-200",children:["【PONイベント / ",F.recentPonEvent.player,"】",F.recentPonEvent.msg]})]}),c.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4",children:[!Dn&&c.jsxs("div",{className:"rounded-xl border border-slate-700 bg-slate-800/40 p-5 text-center space-y-2",children:[c.jsx(Lr,{size:24,className:"animate-spin text-slate-500 mx-auto"}),c.jsx("p",{className:"text-slate-400 text-sm",children:St?`${Z==null?void 0:Z.name} がゴール到着！終了確認を待っています…`:_r?`${Z==null?void 0:Z.name} のゴール後ターン／スロット開始を待っています…`:`${Z==null?void 0:Z.name} のターン操作を待っています…`})]}),Dn&&F.subPhase==="daily"&&Z&&c.jsx(xD,{gs:F,cpGs:Z,onDailyAction:Wt,onOpenDailySlot:Nu,interactionLocked:ds!=null||Fs!=null||q!=null||ul||$s!=null||Wn}),xi&&Vo&&Z&&c.jsx(TD,{open:xi,statsForSpin:Vo,characterType:Z.characterType,playerName:Z.name,initialSlotPityCounter:Z.slotPityCounter??0,soundRef:jt,onClose:()=>_i(!1),onFinished:Po}),c.jsx(fD,{gs:F,cpGs:Z,boardViewPos:Dn&&typeof Xn=="number"?Xn:null,reportSugorokuHopComplete:Dn&&rs,onSugorokuHopComplete:xd,isMyTurn:Dn,cpIsGoalLanding:St,cpIsWaitingSlot:_r,isDay8Moving:Er,isDiceRolling:Ue,localDice:xt,diceShuffleValues:ae,diceConfirmed:oe,isLuckyRoll:qe,showDiceTotal:ze,displayDice:Hs,taxiPhase:ot,taxiDriveCongested:ve,taxiDriveEndPos:Ot,taxiDriveDurationMs:nn,taxiDriveSegmentMs:ke,taxiJamMidPos:je,pieceHopping:zt,onMoveAction:Ed,onGoalLandingConfirm:Oo,onBeginSlotPhase:fl}),Dn&&Tr&&Z&&c.jsx(VD,{gs:F,cpGs:Z,isMyTurn:Dn,writeGS:ms,commitPendingGameState:wr,soundRef:jt,roomId:a})]}),c.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4",children:[c.jsx("h2",{className:"mb-3 text-xs font-semibold text-slate-400",children:"全プレイヤー"}),c.jsx("div",{className:"grid grid-cols-1 gap-2 sm:grid-cols-2",children:F.players.map((C,B)=>c.jsxs("div",{className:`rounded-xl border p-3 ${B===F.currentPlayerIdx?"border-cyan-500/60 bg-cyan-500/5":"border-slate-800 bg-slate-800/30"}`,children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsxs("span",{className:"text-sm font-medium flex items-center gap-1.5",children:[B===F.currentPlayerIdx?"▶ ":"",F.subPhase!=="day8"&&c.jsx(yo,{characterType:C.characterType,imgClassName:"h-5 w-5 shrink-0 object-contain",spanClassName:"text-base leading-none"}),C.name,C.id===n&&c.jsx("span",{className:`text-xs border rounded px-1 ${F.subPhase==="day8"&&C.stats.luck>=80?"text-amber-300 border-amber-400/40":"text-cyan-400 border-cyan-400/40"}`,children:F.subPhase==="day8"&&C.stats.luck>=80?"✦YOU":"YOU"})]}),c.jsxs("div",{className:"flex items-center gap-2",children:[F.subPhase==="day8"&&C.spinCount>0&&c.jsxs("span",{className:`text-xs font-semibold ${C.slotNet>=0?"text-emerald-400":"text-rose-400"}`,children:["S:",C.slotNet>=0?"+":"",C.slotNet]}),c.jsxs("span",{className:"text-xs font-semibold text-yellow-300",children:[C.stats.money,"G"]})]})]}),c.jsx("div",{className:"mt-2 grid grid-cols-5 gap-1 text-center text-xs",children:[["生活費","text-orange-300",Vl(C)],["技量","text-sky-400",C.stats.skill],["運","text-amber-400",C.stats.luck],["善行","text-emerald-400",C.stats.virtue],["PON",C.stats.pon>=D.pon.deathThreshold?"text-rose-400":C.stats.pon>=D.pon.fireThreshold?"text-orange-400":"text-fuchsia-400",C.stats.pon]].map(([z,ne,L])=>c.jsxs("div",{className:"rounded bg-slate-900/60 py-1",children:[c.jsx("div",{className:"text-slate-500",style:{fontSize:"10px"},children:z}),c.jsx("div",{className:`font-bold ${ne}`,children:L})]},z))}),F.subPhase==="day8"&&c.jsxs("div",{className:"mt-1.5 text-xs",children:[C.movePhase==="moving"&&c.jsxs("span",{className:"text-slate-400",children:["スタートから",C.position,"マス目（T",C.moveTurns,"）"]}),C.movePhase==="goalLanding"&&c.jsx("span",{className:"text-yellow-300",children:"🏁 ゴール到着・確認待ち"}),C.movePhase==="waitingSlot"&&c.jsx("span",{className:"text-teal-300",children:"🎰 ゴール済／次の自分ターンでスロット"}),C.movePhase==="arrived"&&C.slotTurnsLeft>0?c.jsxs("span",{className:"text-amber-300",children:["ゴール・スロット中",C.stats.money<0?"（借金可）":""]}):C.movePhase==="arrived"&&c.jsx("span",{className:"text-slate-500",children:"✅ スロット完了"}),C.movePhase==="missed"&&c.jsx("span",{className:"text-rose-400",children:"⏰ タイムアウト"})]})]},C.id))})]}),c.jsxs("section",{className:"rounded-2xl border border-slate-800 bg-slate-900 p-4",children:[c.jsx("h2",{className:"mb-2 text-xs font-semibold text-slate-400",children:"ゲームログ（全員共有）"}),c.jsx("div",{className:"max-h-64 space-y-1 overflow-y-auto font-mono text-xs text-slate-300",children:(F.log??[]).map((C,B)=>c.jsx("p",{className:"border-b border-slate-800/50 pb-1 last:border-0",children:C},B))})]}),c.jsx("button",{onClick:Ar,className:"text-xs text-slate-600 underline hover:text-slate-400",children:"ロビーへ戻る（ゲームは続行中）"})]})]}):c.jsx("div",{className:"min-h-screen bg-slate-950 flex items-center justify-center",children:c.jsx(Lr,{size:32,className:"animate-spin text-cyan-400"})})}class JD extends hp.Component{constructor(n){super(n);ty(this,"handleReload",()=>{window.location.reload()});this.state={hasError:!1,error:null}}static getDerivedStateFromError(n){return{hasError:!0,error:n}}componentDidCatch(n,s){}render(){return this.state.hasError?c.jsx("div",{className:"min-h-screen bg-slate-950 p-6 text-slate-100 flex items-center justify-center",children:c.jsxs("div",{className:"w-full max-w-md space-y-6 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-8 text-center shadow-xl",role:"alert",children:[c.jsx("p",{className:"text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/90",children:Ah}),c.jsx("h1",{className:"text-xl font-bold text-slate-50",children:"表示中に問題が発生しました"}),c.jsx("p",{className:"text-sm text-slate-400 leading-relaxed",children:"データの読み込みや画面の描画中に予期しないエラーが起きました。再読み込みで改善することがあります。"}),c.jsx("div",{className:"flex flex-col gap-3 sm:flex-row sm:justify-center",children:c.jsx("button",{type:"button",onClick:this.handleReload,className:"rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors",children:"ページを再読み込み"})})]})}):this.props.children}}w5.createRoot(document.getElementById("root")).render(c.jsx(hp.StrictMode,{children:c.jsx(JD,{children:c.jsx(WD,{})})}));
