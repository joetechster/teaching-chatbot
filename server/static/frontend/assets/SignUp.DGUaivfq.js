import{n as U,l as F,s as T,_ as w,b as p,x as W,f as R,q as z,j as e,J as _,g as M,T as I,t as P,k as N,z as $,A as q,L as D,C,D as f,K as O,M as k,O as B,E as G,F as H,G as J,H as K}from"./main.R4OWzCMX.js";import{C as V,l as Q,M as E,L as X}from"./logo.CSwIFrxP.js";import{G as r}from"./Grid.D9WAuUnX.js";function Y(n){return F("MuiInputAdornment",n)}const L=U("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var A;const Z=["children","className","component","disablePointerEvents","disableTypography","position","variant"],ee=(n,t)=>{const{ownerState:s}=n;return[t.root,t[`position${P(s.position)}`],s.disablePointerEvents===!0&&t.disablePointerEvents,t[s.variant]]},te=n=>{const{classes:t,disablePointerEvents:s,hiddenLabel:i,position:l,size:h,variant:v}=n,c={root:["root",s&&"disablePointerEvents",l&&`position${P(l)}`,v,i&&"hiddenLabel",h&&`size${P(h)}`]};return N(c,Y,t)},se=T("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:ee})(({theme:n,ownerState:t})=>w({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(n.vars||n).palette.action.active},t.variant==="filled"&&{[`&.${L.positionStart}&:not(.${L.hiddenLabel})`]:{marginTop:16}},t.position==="start"&&{marginRight:8},t.position==="end"&&{marginLeft:8},t.disablePointerEvents===!0&&{pointerEvents:"none"})),ne=p.forwardRef(function(t,s){const i=W({props:t,name:"MuiInputAdornment"}),{children:l,className:h,component:v="div",disablePointerEvents:c=!1,disableTypography:b=!1,position:g,variant:y}=i,x=R(i,Z),m=z()||{};let j=y;y&&m.variant,m&&!j&&(j=m.variant);const o=w({},i,{hiddenLabel:m.hiddenLabel,size:m.size,disablePointerEvents:c,position:g,variant:j}),d=te(o);return e.jsx(_.Provider,{value:null,children:e.jsx(se,w({as:v,ownerState:o,className:M(d.root,h),ref:s},x,{children:typeof l=="string"&&!b?e.jsx(I,{color:"text.secondary",children:l}):e.jsxs(p.Fragment,{children:[g==="start"?A||(A=e.jsx("span",{className:"notranslate",children:"​"})):null,l]})}))})});function oe(){const[n,t]=p.useState("student"),[s,i]=p.useState(null),[l,h]=p.useState(""),[v,c]=p.useState(null),[b,g]=p.useState(!1),y=$(),x=q(),m=o=>{const d=o.target.files[0];if(d)if(d.type.startsWith("image/")){i(d),c(null);const u=new FileReader;u.onload=()=>{const a=u.result;h(a)},u.readAsDataURL(d)}else i(null),c("Invalid file type. Please select an image file.");else i(null),c(null)},j=async o=>{g(!0),o.preventDefault();const d=new FormData(o.currentTarget),u=await fetch(`${J}sign-up/`,{method:"POST",body:d});if(u.status===200||u.status===201){const a=await u.json();await K(a.user,a.token),x.show("Sign up successful",{type:"success"}),y("/")}else try{const a=await u.json();typeof a=="object"?Object.keys(a).forEach(S=>{x.error(`${S}: ${a[S]}`)}):x.error(a)}catch{x.error("Something went wrong")}g(!1)};return e.jsx(D,{children:e.jsx(V,{component:"main",maxWidth:"xs",children:e.jsxs(C,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(C,{component:"img",src:Q,alt:"Brand",width:"5rem",sx:{borderRadius:2}}),e.jsx(I,{component:"h1",variant:"h5",children:"Sign up"}),e.jsxs(C,{component:"form",noValidate:!0,onSubmit:j,sx:{mt:3},children:[e.jsxs(r,{container:!0,spacing:2,sx:{maxWidth:"444px"},children:[e.jsx(r,{item:!0,xs:12,children:e.jsxs(f,{required:!0,fullWidth:!0,name:"type",label:"User Type",select:!0,SelectProps:{sx:{height:"45px",minHeight:"100%"}},value:n,onChange:o=>t(o.target.value),children:[e.jsx(E,{value:"student",children:"Student"}),e.jsx(E,{value:"instructor",children:"Instructor"})]})}),e.jsx(r,{item:!0,xs:12,sm:6,children:e.jsx(f,{autoComplete:"given-name",name:"first_name",required:!0,fullWidth:!0,id:"first_name",label:"First Name",autoFocus:!0})}),e.jsx(r,{item:!0,xs:12,sm:6,children:e.jsx(f,{required:!0,fullWidth:!0,label:"Last Name",name:"last_name",autoComplete:"family-name"})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(f,{required:!0,fullWidth:!0,label:n==="student"?"Matriculation Number":"Username",name:"username"})}),e.jsx(r,{item:!0,xs:12,children:e.jsxs(O,{sx:{width:"100%"},variant:"outlined",children:[e.jsx(k,{htmlFor:"outlined-adornment-password",children:"Passport"}),e.jsx(I,{sx:{position:"absolute",p:2},variant:"caption",children:s==null?void 0:s.name}),e.jsx(B,{id:"outlined-adornment-password",type:"file",label:"Passport",name:"passport",inputProps:{style:{opacity:0,zIndex:1}},onChange:m,endAdornment:e.jsx(ne,{position:"end",children:e.jsx("img",{alt:s==null?void 0:s.name,src:l,style:{width:30,aspectRatio:1,objectFit:"cover"}})})})]})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(f,{required:!0,fullWidth:!0,name:"address",label:"Address",autoComplete:"address"})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(f,{required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"new-password"})})]}),e.jsx(G,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2,color:"#fff"},disabled:b,startIcon:b?e.jsx(H,{size:20,color:"secondary"}):null,children:"Sign Up"}),e.jsx(r,{container:!0,justifyContent:"flex-end",children:e.jsx(r,{item:!0,children:e.jsx(X,{href:"sign-in",variant:"body2",children:"Already have an account? Sign in"})})})]})]})})})}export{oe as default};
