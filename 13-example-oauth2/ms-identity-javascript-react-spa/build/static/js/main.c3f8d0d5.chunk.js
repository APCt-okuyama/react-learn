(this["webpackJsonpmsal-react-quickstart"]=this["webpackJsonpmsal-react-quickstart"]||[]).push([[0],{105:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),o=n(26),a=n.n(o),i=(n(72),n(73),n(40)),s=n(22),l=n(20),u=n(44),j={auth:{clientId:"8448ce9f-6978-48b5-94c9-042e67bb8048",authority:"https://login.microsoftonline.com/4029eb38-8689-465c-92e1-9464066c814c",redirectUri:"https://myreactstorage001.z11.web.core.windows.net/"},cache:{cacheLocation:"sessionStorage",storeAuthStateInCookie:!1},system:{loggerOptions:{loggerCallback:function(e,t,n){if(!n)switch(e){case u.a.Error:return void console.error(t);case u.a.Info:return void console.info(t);case u.a.Verbose:return void console.debug(t);case u.a.Warning:return void console.warn(t)}}}}},d={scopes:["api://8448ce9f-6978-48b5-94c9-042e67bb8048/test","api://8448ce9f-6978-48b5-94c9-042e67bb8048/test2"]},h="https://graph.microsoft.com/v1.0/me",b=n(67),p=n(45),f=n(27),O=n(8),g=function(){var e=Object(l.e)().instance,t=function(t){"popup"===t?e.loginPopup(d).catch((function(e){console.log(e)})):"redirect"===t&&e.loginRedirect(d).catch((function(e){console.log(e)}))};return Object(O.jsxs)(p.a,{variant:"secondary",className:"ml-auto",drop:"left",title:"Sign In",children:[Object(O.jsx)(f.a.Item,{as:"button",onClick:function(){return t("popup")},children:"Sign in using Popup"}),Object(O.jsx)(f.a.Item,{as:"button",onClick:function(){return t("redirect")},children:"Sign in using Redirect"})]})},m=function(){var e=Object(l.e)().instance,t=function(t){"popup"===t?e.logoutPopup({postLogoutRedirectUri:"/",mainWindowRedirectUri:"/"}):"redirect"===t&&e.logoutRedirect({postLogoutRedirectUri:"/"})};return Object(O.jsxs)(p.a,{variant:"secondary",className:"ml-auto",drop:"left",title:"Sign Out",children:[Object(O.jsx)(f.a.Item,{as:"button",onClick:function(){return t("popup")},children:"Sign out using Popup"}),Object(O.jsx)(f.a.Item,{as:"button",onClick:function(){return t("redirect")},children:"Sign out using Redirect"})]})},x=function(e){var t=Object(l.d)();return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)(b.a,{bg:"primary",variant:"dark",children:[Object(O.jsx)("a",{className:"navbar-brand",href:"/",children:"Microsoft Identity Platform"}),t?Object(O.jsx)(m,{}):Object(O.jsx)(g,{})]}),Object(O.jsx)("h5",{children:Object(O.jsx)("center",{children:"Welcome to the Microsoft Authentication Library For Javascript - React Quickstart"})}),Object(O.jsx)("h5",{children:Object(O.jsx)("center",{children:"\u30ed\u30b0\u30a4\u30f3\u51e6\u7406\u304c\u6210\u529f\u3059\u308b\u3068\u30dc\u30bf\u30f3\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002"})}),Object(O.jsx)("br",{}),Object(O.jsx)("br",{}),e.children]})},v=function(e){return console.log(e.graphData),Object(O.jsxs)("div",{id:"profile-div",children:[Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"First Name: "})," ",e.graphData.givenName]}),Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"Last Name: "})," ",e.graphData.surname]}),Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"Email: "})," ",e.graphData.userPrincipalName]}),Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"Id: "})," ",e.graphData.id]})]})},k=n(34),y=n.n(k),I=n(43);function w(){return(w=Object(I.a)(y.a.mark((function e(t){var n,c,r;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Headers,c="Bearer ".concat(t),n.append("Authorization",c),r={method:"GET",headers:n},e.abrupt("return",fetch(h,r).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var S=n(38),P=(n(79),n(80).default),C=function(){var e=Object(l.e)(),t=e.instance,n=e.accounts,r=Object(c.useState)(null),o=Object(s.a)(r,2),a=o[0],u=o[1];return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("h5",{className:"card-title",children:["Welcome ",n[0].name]}),a?Object(O.jsx)(v,{graphData:a}):Object(O.jsx)(S.a,{variant:"secondary",onClick:function(){t.acquireTokenSilent(Object(i.a)(Object(i.a)({},d),{},{account:n[0]})).then((function(e){(function(e){return w.apply(this,arguments)})(e.accessToken).then((function(e){return u(e)}))}))},children:"Request Profile Information"}),Object(O.jsx)(S.a,{onClick:function(){console.log("start requestAPICall ..."),t.acquireTokenSilent(Object(i.a)(Object(i.a)({},d),{},{account:n[0]})).then((function(e){var t;t=e.accessToken,console.log("start callMyAPI ..."),P.get("https://my-example-apim.azure-api.net/hello",{headers:{authorization:"Bearer "+t}}).then((function(e){console.log("handle success"),console.log(e)})).catch((function(e){console.log("handle error"),console.log(e)})).then((function(){}))}))},children:"\u78ba\u8a8d\u306e\u70ba\u306btoken\u3092\u3064\u3051\u3066API\u3092Call\u3057\u307e\u3059\u3002"})]})},N=function(){return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(l.a,{children:Object(O.jsx)(C,{})}),Object(O.jsx)(l.c,{children:Object(O.jsx)("h5",{className:"card-title",children:"Please sign-in to see your profile information."})})]})};function R(){return Object(O.jsx)(x,{children:Object(O.jsx)(N,{})})}var A=new(n(110).a)(j);a.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(l.b,{instance:A,children:Object(O.jsx)(R,{})})}),document.getElementById("root"))},73:function(e,t,n){},79:function(e,t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.c3f8d0d5.chunk.js.map