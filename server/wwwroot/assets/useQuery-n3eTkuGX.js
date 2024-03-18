var J=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)};var s=(r,t,e)=>(J(r,t,"read from private field"),e?e.call(r):t.get(r)),a=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},o=(r,t,e,i)=>(J(r,t,"write to private field"),i?i.call(r,e):t.set(r,e),e);var l=(r,t,e)=>(J(r,t,"access private method"),e);import{S as vt,s as X,e as Ct,i as ct,f as lt,t as Ot,k as Et,l as St,m as dt,n as bt,r as v,b as Qt}from"./index-GfsaLtzC.js";import{s as Ut}from"./network-qS66KcGb.js";var p,n,M,f,E,I,g,A,F,T,S,Q,O,x,U,D,L,Y,k,Z,B,$,j,tt,K,et,V,st,W,rt,_,Rt,yt,wt=(yt=class extends vt{constructor(t,e){super();a(this,U);a(this,L);a(this,k);a(this,B);a(this,j);a(this,K);a(this,V);a(this,W);a(this,_);a(this,p,void 0);a(this,n,void 0);a(this,M,void 0);a(this,f,void 0);a(this,E,void 0);a(this,I,void 0);a(this,g,void 0);a(this,A,void 0);a(this,F,void 0);a(this,T,void 0);a(this,S,void 0);a(this,Q,void 0);a(this,O,void 0);a(this,x,new Set);this.options=e,o(this,p,t),o(this,g,null),this.bindMethods(),this.setOptions(e)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(s(this,n).addObserver(this),ft(s(this,n),this.options)?l(this,U,D).call(this):this.updateResult(),l(this,j,tt).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return it(s(this,n),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return it(s(this,n),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,l(this,K,et).call(this),l(this,V,st).call(this),s(this,n).removeObserver(this)}setOptions(t,e){const i=this.options,y=s(this,n);if(this.options=s(this,p).defaultQueryOptions(t),X(i,this.options)||s(this,p).getQueryCache().notify({type:"observerOptionsUpdated",query:s(this,n),observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=i.queryKey),l(this,W,rt).call(this);const u=this.hasListeners();u&&pt(s(this,n),y,this.options,i)&&l(this,U,D).call(this),this.updateResult(e),u&&(s(this,n)!==y||this.options.enabled!==i.enabled||this.options.staleTime!==i.staleTime)&&l(this,L,Y).call(this);const h=l(this,k,Z).call(this);u&&(s(this,n)!==y||this.options.enabled!==i.enabled||h!==s(this,O))&&l(this,B,$).call(this,h)}getOptimisticResult(t){const e=s(this,p).getQueryCache().build(s(this,p),t),i=this.createResult(e,t);return Ft(this,i)&&(o(this,f,i),o(this,I,this.options),o(this,E,s(this,n).state)),i}getCurrentResult(){return s(this,f)}trackResult(t){const e={};return Object.keys(t).forEach(i=>{Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:()=>(s(this,x).add(i),t[i])})}),e}getCurrentQuery(){return s(this,n)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const e=s(this,p).defaultQueryOptions(t),i=s(this,p).getQueryCache().build(s(this,p),e);return i.isFetchingOptimistic=!0,i.fetch().then(()=>this.createResult(i,e))}fetch(t){return l(this,U,D).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),s(this,f)))}createResult(t,e){var ut;const i=s(this,n),y=this.options,u=s(this,f),h=s(this,E),d=s(this,I),w=t!==i?t.state:s(this,M),{state:c}=t;let{error:z,errorUpdatedAt:at,fetchStatus:P,status:C}=c,ht=!1,R;if(e._optimisticResults){const b=this.hasListeners(),G=!b&&ft(t,e),mt=b&&pt(t,i,e,y);(G||mt)&&(P=St(t.options.networkMode)?"fetching":"paused",c.dataUpdatedAt||(C="pending")),e._optimisticResults==="isRestoring"&&(P="idle")}if(e.select&&typeof c.data<"u")if(u&&c.data===(h==null?void 0:h.data)&&e.select===s(this,A))R=s(this,F);else try{o(this,A,e.select),R=e.select(c.data),R=dt(u==null?void 0:u.data,R,e),o(this,F,R),o(this,g,null)}catch(b){o(this,g,b)}else R=c.data;if(typeof e.placeholderData<"u"&&typeof R>"u"&&C==="pending"){let b;if(u!=null&&u.isPlaceholderData&&e.placeholderData===(d==null?void 0:d.placeholderData))b=u.data;else if(b=typeof e.placeholderData=="function"?e.placeholderData((ut=s(this,T))==null?void 0:ut.state.data,s(this,T)):e.placeholderData,e.select&&typeof b<"u")try{b=e.select(b),o(this,g,null)}catch(G){o(this,g,G)}typeof b<"u"&&(C="success",R=dt(u==null?void 0:u.data,b,e),ht=!0)}s(this,g)&&(z=s(this,g),R=s(this,F),at=Date.now(),C="error");const H=P==="fetching",N=C==="pending",q=C==="error",ot=N&&H;return{status:C,fetchStatus:P,isPending:N,isSuccess:C==="success",isError:q,isInitialLoading:ot,isLoading:ot,data:R,dataUpdatedAt:c.dataUpdatedAt,error:z,errorUpdatedAt:at,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>w.dataUpdateCount||c.errorUpdateCount>w.errorUpdateCount,isFetching:H,isRefetching:H&&!N,isLoadingError:q&&c.dataUpdatedAt===0,isPaused:P==="paused",isPlaceholderData:ht,isRefetchError:q&&c.dataUpdatedAt!==0,isStale:nt(t,e),refetch:this.refetch}}updateResult(t){const e=s(this,f),i=this.createResult(s(this,n),this.options);if(o(this,E,s(this,n).state),o(this,I,this.options),s(this,E).data!==void 0&&o(this,T,s(this,n)),X(i,e))return;o(this,f,i);const y={},u=()=>{if(!e)return!0;const{notifyOnChangeProps:h}=this.options,d=typeof h=="function"?h():h;if(d==="all"||!d&&!s(this,x).size)return!0;const m=new Set(d??s(this,x));return this.options.throwOnError&&m.add("error"),Object.keys(s(this,f)).some(w=>{const c=w;return s(this,f)[c]!==e[c]&&m.has(c)})};(t==null?void 0:t.listeners)!==!1&&u()&&(y.listeners=!0),l(this,_,Rt).call(this,{...y,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&l(this,j,tt).call(this)}},p=new WeakMap,n=new WeakMap,M=new WeakMap,f=new WeakMap,E=new WeakMap,I=new WeakMap,g=new WeakMap,A=new WeakMap,F=new WeakMap,T=new WeakMap,S=new WeakMap,Q=new WeakMap,O=new WeakMap,x=new WeakMap,U=new WeakSet,D=function(t){l(this,W,rt).call(this);let e=s(this,n).fetch(this.options,t);return t!=null&&t.throwOnError||(e=e.catch(Ct)),e},L=new WeakSet,Y=function(){if(l(this,K,et).call(this),ct||s(this,f).isStale||!lt(this.options.staleTime))return;const e=Ot(s(this,f).dataUpdatedAt,this.options.staleTime)+1;o(this,S,setTimeout(()=>{s(this,f).isStale||this.updateResult()},e))},k=new WeakSet,Z=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(s(this,n)):this.options.refetchInterval)??!1},B=new WeakSet,$=function(t){l(this,V,st).call(this),o(this,O,t),!(ct||this.options.enabled===!1||!lt(s(this,O))||s(this,O)===0)&&o(this,Q,setInterval(()=>{(this.options.refetchIntervalInBackground||Et.isFocused())&&l(this,U,D).call(this)},s(this,O)))},j=new WeakSet,tt=function(){l(this,L,Y).call(this),l(this,B,$).call(this,l(this,k,Z).call(this))},K=new WeakSet,et=function(){s(this,S)&&(clearTimeout(s(this,S)),o(this,S,void 0))},V=new WeakSet,st=function(){s(this,Q)&&(clearInterval(s(this,Q)),o(this,Q,void 0))},W=new WeakSet,rt=function(){const t=s(this,p).getQueryCache().build(s(this,p),this.options);if(t===s(this,n))return;const e=s(this,n);o(this,n,t),o(this,M,t.state),this.hasListeners()&&(e==null||e.removeObserver(this),t.addObserver(this))},_=new WeakSet,Rt=function(t){bt.batch(()=>{t.listeners&&this.listeners.forEach(e=>{e(s(this,f))}),s(this,p).getQueryCache().notify({query:s(this,n),type:"observerResultsUpdated"})})},yt);function It(r,t){return t.enabled!==!1&&!r.state.dataUpdatedAt&&!(r.state.status==="error"&&t.retryOnMount===!1)}function ft(r,t){return It(r,t)||r.state.dataUpdatedAt>0&&it(r,t,t.refetchOnMount)}function it(r,t,e){if(t.enabled!==!1){const i=typeof e=="function"?e(r):e;return i==="always"||i!==!1&&nt(r,t)}return!1}function pt(r,t,e,i){return e.enabled!==!1&&(r!==t||i.enabled===!1)&&(!e.suspense||r.state.status!=="error")&&nt(r,e)}function nt(r,t){return r.isStaleByTime(t.staleTime)}function Ft(r,t){return!X(r.getCurrentResult(),t)}var gt=v.createContext(!1),Tt=()=>v.useContext(gt);gt.Provider;function xt(){let r=!1;return{clearReset:()=>{r=!1},reset:()=>{r=!0},isReset:()=>r}}var Pt=v.createContext(xt()),Dt=()=>v.useContext(Pt),Mt=(r,t)=>{(r.suspense||r.throwOnError)&&(t.isReset()||(r.retryOnMount=!1))},At=r=>{v.useEffect(()=>{r.clearReset()},[r])},Lt=({result:r,errorResetBoundary:t,throwOnError:e,query:i})=>r.isError&&!t.isReset()&&!r.isFetching&&i&&Ut(e,[r.error,i]),kt=r=>{r.suspense&&typeof r.staleTime!="number"&&(r.staleTime=1e3)},Bt=(r,t)=>(r==null?void 0:r.suspense)&&t.isPending,jt=(r,t,e)=>t.fetchOptimistic(r).catch(()=>{e.clearReset()});function Kt(r,t,e){const i=Qt(e),y=Tt(),u=Dt(),h=i.defaultQueryOptions(r);h._optimisticResults=y?"isRestoring":"optimistic",kt(h),Mt(h,u),At(u);const[d]=v.useState(()=>new t(i,h)),m=d.getOptimisticResult(h);if(v.useSyncExternalStore(v.useCallback(w=>{const c=y?()=>{}:d.subscribe(bt.batchCalls(w));return d.updateResult(),c},[d,y]),()=>d.getCurrentResult(),()=>d.getCurrentResult()),v.useEffect(()=>{d.setOptions(h,{listeners:!1})},[h,d]),Bt(h,m))throw jt(h,d,u);if(Lt({result:m,errorResetBoundary:u,throwOnError:h.throwOnError,query:i.getQueryCache().get(h.queryHash)}))throw m.error;return h.notifyOnChangeProps?m:d.trackResult(m)}function Ht(r,t){return Kt(r,wt,t)}export{Ht as u};
