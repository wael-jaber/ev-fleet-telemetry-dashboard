import{g as V,a as E,u as N,j as e,c as U,B as F,w as P,h as b}from"./ThemeDecorator-By2_yl6Q.js";import{a as q}from"./index-CAGvNhDm.js";import{s as H,c as W,P as O,T as f}from"./Typography-Byy0t5gE.js";import{c as g}from"./createSvgIcon-BLpqG5Fa.js";function $(o){return V("MuiCard",o)}E("MuiCard",["root"]);const A=o=>{const{classes:t}=o;return W({root:["root"]},$,t)},G=H(O,{name:"MuiCard",slot:"Root",overridesResolver:(o,t)=>t.root})({overflow:"hidden"}),J=q.forwardRef(function(t,r){const s=N({props:t,name:"MuiCard"}),{className:p,raised:n=!1,...u}=s,a={...s,raised:n},C=A(a);return e.jsx(G,{className:U(C.root,p),elevation:n?8:void 0,ref:r,ownerState:a,...u})});function K(o){return V("MuiCardContent",o)}E("MuiCardContent",["root"]);const Q=o=>{const{classes:t}=o;return W({root:["root"]},K,t)},X=H("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(o,t)=>t.root})({padding:16,"&:last-child":{paddingBottom:24}}),Y=q.forwardRef(function(t,r){const s=N({props:t,name:"MuiCardContent"}),{className:p,component:n="div",...u}=s,a={...s,component:n},C=Q(a);return e.jsx(X,{as:n,className:U(C.root,p),ownerState:a,ref:r,...u})}),_=({title:o,value:t,icon:r,iconColor:s})=>e.jsxs(J,{sx:{display:"flex",alignItems:"center",p:1.2},children:[e.jsxs(Y,{sx:{flex:1,p:"6px !important"},children:[e.jsx(f,{variant:"h6",sx:{fontSize:"1rem",fontWeight:600},children:t}),e.jsx(f,{color:"text.secondary",sx:{fontSize:"0.85rem",fontWeight:500},children:o})]}),e.jsx(F,{sx:{color:s,pr:1.5},children:r})]});_.__docgenInfo={description:"",methods:[],displayName:"StatCard",props:{title:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},icon:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},iconColor:{required:!1,tsType:{name:"string"},description:""}}};const h=g(e.jsx("path",{d:"M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16m11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M5 11l1.5-4.5h11L19 11z"}),"DirectionsCar"),Z=g(e.jsx("path",{d:"M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4M11 20v-5.5H9L13 7v5.5h2z"}),"BatteryChargingFull"),ee=g(e.jsx("path",{d:"M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66s.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21"}),"Bolt"),ne={title:"Components/StatCard",component:_,tags:["autodocs"],argTypes:{title:{control:"text"},value:{control:"text"},iconColor:{control:"color"}}},i={args:{title:"Total Vehicles",value:42,icon:e.jsx(h,{fontSize:"large"}),iconColor:"primary.main"},decorators:[P]},c={args:{title:"Total Vehicles",value:42,icon:e.jsx(h,{fontSize:"large"}),iconColor:"primary.main"},decorators:[b]},l={args:{title:"Battery Level",value:"85%",icon:e.jsx(Z,{fontSize:"large"}),iconColor:"success.main"}},d={args:{title:"Energy Consumption",value:"12.5 kWh",icon:e.jsx(ee,{fontSize:"large"}),iconColor:"warning.main"}},m={args:{title:"Mileage",value:"123,456 km",icon:e.jsx(h,{fontSize:"large"}),iconColor:"info.main"}};var v,x,y;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: "Total Vehicles",
    value: 42,
    icon: <DirectionsCarIcon fontSize="large" />,
    iconColor: "primary.main"
  },
  decorators: [withLightTheme]
}`,...(y=(x=i.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var S,M,j;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    title: "Total Vehicles",
    value: 42,
    icon: <DirectionsCarIcon fontSize="large" />,
    iconColor: "primary.main"
  },
  decorators: [withDarkTheme]
}`,...(j=(M=c.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};var z,T,w;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    title: "Battery Level",
    value: "85%",
    icon: <BatteryChargingFullIcon fontSize="large" />,
    iconColor: "success.main"
  }
}`,...(w=(T=l.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var B,L,R;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    title: "Energy Consumption",
    value: "12.5 kWh",
    icon: <BoltIcon fontSize="large" />,
    iconColor: "warning.main"
  }
}`,...(R=(L=d.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var I,D,k;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    title: "Mileage",
    value: "123,456 km",
    icon: <DirectionsCarIcon fontSize="large" />,
    iconColor: "info.main"
  }
}`,...(k=(D=m.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};const ae=["LightMode","DarkMode","BatteryLevel","EnergyConsumption","LargeValue"];export{l as BatteryLevel,c as DarkMode,d as EnergyConsumption,m as LargeValue,i as LightMode,ae as __namedExportsOrder,ne as default};
