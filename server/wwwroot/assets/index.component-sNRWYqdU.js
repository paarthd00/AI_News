import{r,d,j as e}from"./index-GfsaLtzC.js";import{g as f}from"./network-qS66KcGb.js";import{u as g}from"./useQuery-n3eTkuGX.js";import{u as m,P as l}from"./post-listing-HGDNJ4w5.js";import"./utils-g-Ig_Dqa.js";const E=function(){const{isPending:s,error:i,data:u,refetch:n}=g({queryKey:["postData"],queryFn:f}),{connection:t}=m("/r/postHub");r.useEffect(()=>{if(t)return t.on("newpost",()=>{n()}),t.on("updatepost",()=>{n()}),t.on("deletepost",()=>{n()}),()=>{t.off("newpost")}},[t]);const{isAuthenticated:o,isLoading:c,login:a,user:p}=d();return console.log("user: ",p),r.useEffect(()=>{o&&n()},[o]),c?e.jsx("p",{children:"Loading"}):s?e.jsx("div",{children:"Loading..."}):i?e.jsx("div",{children:"Something went wrong"}):e.jsx(e.Fragment,{children:o?e.jsx(l,{posts:u}):e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"Please sign in or register!"}),e.jsx("button",{onClick:()=>{a()},type:"button",children:"Sign In"})]})})};export{E as component};
