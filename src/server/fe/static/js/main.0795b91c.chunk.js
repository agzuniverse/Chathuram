(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{48:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){},71:function(e,t,n){},79:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(19),o=n.n(c),s=(n(64),n(8)),i=(n(65),n(37)),l=n(11),u=n(7),d=n.n(u),j=n(13),b=n(102),p=n(101),h=n(2);function f(e){console.log("inside logout function"),e&&e.preventDefault(),localStorage.removeItem("token"),window.location.replace("/")}function O(e){e&&e.preventDefault(),localStorage.removeItem("dbConfigured"),window.location.replace("/")}var m,x,g=function(){return Object(h.jsx)("div",{children:Object(h.jsxs)(b.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark",children:[Object(h.jsx)(b.a.Brand,{href:"#",children:"C H A T H U R A M"}),Object(h.jsx)(b.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(h.jsx)(b.a.Collapse,{id:"responsive-navbar-nav",children:Object(h.jsxs)(p.a,{className:"ml-auto",children:[Object(h.jsx)(p.a.Link,{href:"/dashboard",children:"Dashboard"}),localStorage.getItem("token")&&Object(h.jsx)(p.a.Link,{onClick:f,children:"Logout"}),localStorage.getItem("dbConfig")&&Object(h.jsx)(p.a.Link,{onClick:O,children:"Reset Config"})]})})]})})},v="http://127.0.0.1:5000",y=null===(m=JSON.parse(localStorage.getItem("token")))||void 0===m?void 0:m.token;if(y){var w=atob(y.split(".")[1]);x=JSON.parse(w).exp}var C=function(){Date.now().valueOf()/1e3>x&&(console.log("ERROR: Token expired"),f())};function S(){return(S=Object(j.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(v,"/life"),{headers:{"x-access-token":JSON.parse(localStorage.getItem("token")).token}}).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e){return N.apply(this,arguments)}function N(){return(N=Object(j.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(v,"/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(e){return I.apply(this,arguments)}function I(){return(I=Object(j.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(),e.abrupt("return",fetch("".concat(v,"/config"),{method:"POST",headers:{"Content-Type":"application/json","x-access-token":JSON.parse(localStorage.getItem("token")).token},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(){return(T=Object(j.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(),e.abrupt("return",fetch("".concat(v,"/meta"),{method:"POST",headers:{"Content-Type":"application/json","x-access-token":JSON.parse(localStorage.getItem("token")).token},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e,t){return L.apply(this,arguments)}function L(){return(L=Object(j.a)(d.a.mark((function e(t,n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null!==n&&void 0!==n||(n=1),C(),e.abrupt("return",fetch("".concat(v,"/read"),{method:"POST",headers:{"Content-Type":"application/json","x-access-token":JSON.parse(localStorage.getItem("token")).token},body:JSON.stringify({table:t,pageNum:n})}).then((function(e){return e.json()})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(){return(M=Object(j.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(),e.abrupt("return",fetch("".concat(v,"/create"),{method:"POST",headers:{"Content-Type":"application/json","x-access-token":JSON.parse(localStorage.getItem("token")).token},body:JSON.stringify({table:t.tableName,row:t.newRow})}).then((function(e){return e.json()})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(){return(D=Object(j.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(),e.abrupt("return",fetch("".concat(v,"/update"),{method:"POST",headers:{"Content-Type":"application/json","x-access-token":JSON.parse(localStorage.getItem("token")).token},body:JSON.stringify({table:t.tableName,row:t.newRow,old_row:t.oldRow})}).then((function(e){return e.json()})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e){return P.apply(this,arguments)}function P(){return(P=Object(j.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(),e.abrupt("return",fetch("".concat(v,"/delete"),{method:"POST",headers:{"Content-Type":"application/json","x-access-token":JSON.parse(localStorage.getItem("token")).token},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return(B=Object(j.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(),e.abrupt("return",fetch("".concat(v,"/delete_all"),{method:"POST",headers:{"Content-Type":"application/json","x-access-token":JSON.parse(localStorage.getItem("token")).token},body:JSON.stringify({table:t})}).then((function(e){return e.json()})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A=Object(r.createContext)(null),_=Object(r.createContext)({errorMessage:"",setErrorMessage:function(){},clearError:function(){}}),F=n(95),G=n(103),U=n(100),q=n(96),V=(n(48),function(e){var t=e.setToken,n=Object(r.useState)(),a=Object(s.a)(n,2),c=a[0],o=a[1],i=Object(r.useState)(),l=Object(s.a)(i,2),u=l[0],b=l[1],p=Object(r.useContext)(_),f=(p.errorMessage,p.setErrorMessage),O=p.clearError,m=function(){var e=Object(j.a)(d.a.mark((function e(n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),O(),e.next=4,k({username:c,password:u});case 4:(r=e.sent).error?f(r.error):t(r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{children:[Object(h.jsx)(g,{}),Object(h.jsx)(F.a,{children:Object(h.jsx)(G.a,{children:Object(h.jsx)(G.a.Body,{children:Object(h.jsxs)(U.a,{children:[Object(h.jsxs)(U.a.Group,{children:[Object(h.jsx)(U.a.Label,{children:"Username"}),Object(h.jsx)(U.a.Control,{type:"text",placeholder:"Enter username",onChange:function(e){return o(e.target.value)}})]}),Object(h.jsxs)(U.a.Group,{controlId:"formBasicPassword",children:[Object(h.jsx)(U.a.Label,{children:"Password"}),Object(h.jsx)(U.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return b(e.target.value)}})]}),Object(h.jsx)(q.a,{variant:"light",type:"submit",onClick:m,className:"full-btn",children:"S U B M I T"})]})})})})]})}),H=n(58),z=["mysql","postgres"],K=function(e){var t=e.setDBConfig,n=e.dbConfig,a=Object(r.useState)(),c=Object(s.a)(a,2),o=c[0],i=c[1],l=Object(r.useState)(),u=Object(s.a)(l,2),b=u[0],p=u[1],f=Object(r.useState)(),O=Object(s.a)(f,2),m=O[0],x=O[1],v=Object(r.useState)(),y=Object(s.a)(v,2),w=y[0],C=y[1],S=Object(r.useState)(),k=Object(s.a)(S,2),N=k[0],I=k[1],T=Object(r.useState)(z[0]),J=Object(s.a)(T,2),L=J[0],M=J[1],D=Object(r.useContext)(_),R=(D.errorMessage,D.setErrorMessage),P=D.clearError;Object(r.useEffect)((function(){n&&(i(null===n||void 0===n?void 0:n.username),x(null===n||void 0===n?void 0:n.url),C(null===n||void 0===n?void 0:n.port),M(null===n||void 0===n?void 0:n.db_type),I(null===n||void 0===n?void 0:n.db_name))}),[n]);var B=function(){var e=Object(j.a)(d.a.mark((function e(n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),P(),console.log(o,b,m,w,N,L),e.next=5,E({username:o,password:b,url:m,port:w,db_name:N,db_type:L});case 5:(r=e.sent).error?R(r.error):(t(Object(H.a)({username:o,url:m,port:w,db_name:N,db_type:L},r)),window.location.replace("".concat(window.location.origin,"/dashboard")));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{children:[Object(h.jsx)(g,{}),Object(h.jsx)(F.a,{children:Object(h.jsx)(G.a,{children:Object(h.jsx)(G.a.Body,{children:Object(h.jsxs)(U.a,{children:[Object(h.jsxs)(U.a.Group,{children:[Object(h.jsx)(U.a.Label,{children:"Username"}),Object(h.jsx)(U.a.Control,{type:"text",placeholder:"Enter username",defaultValue:null===n||void 0===n?void 0:n.username,onChange:function(e){return i(e.target.value)}})]}),Object(h.jsxs)(U.a.Group,{controlId:"formBasicPassword",children:[Object(h.jsx)(U.a.Label,{children:"Password"}),Object(h.jsx)(U.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return p(e.target.value)}})]}),Object(h.jsxs)(U.a.Group,{controlId:"formURL",children:[Object(h.jsx)(U.a.Label,{children:"DB URL"}),Object(h.jsx)(U.a.Control,{type:"text",placeholder:"Enter DB URL",defaultValue:null===n||void 0===n?void 0:n.url,onChange:function(e){return x(e.target.value)}})]}),Object(h.jsxs)(U.a.Group,{children:[Object(h.jsx)(U.a.Label,{children:"Port"}),Object(h.jsx)(U.a.Control,{type:"text",placeholder:"Enter port",defaultValue:null===n||void 0===n?void 0:n.port,onChange:function(e){return C(e.target.value)}})]}),Object(h.jsxs)(U.a.Group,{children:[Object(h.jsx)(U.a.Label,{children:"DB Name"}),Object(h.jsx)(U.a.Control,{type:"text",placeholder:"Enter DB Name",defaultValue:null===n||void 0===n?void 0:n.db_name,onChange:function(e){return I(e.target.value)}})]}),Object(h.jsxs)(U.a.Group,{controlId:"exampleForm.SelectCustom",children:[Object(h.jsx)(U.a.Label,{children:"DB Type"}),Object(h.jsx)(U.a.Control,{as:"select",defaultValue:n?n.db_type:z[0],custom:!0,onChange:function(e){return M(e.target.value)},children:z.map((function(e,t){return Object(h.jsx)("option",{value:e,children:e},t)}))})]}),Object(h.jsx)(q.a,{variant:"light",type:"submit",onClick:B,className:"full-btn",children:"S U B M I T"})]})})})})]})};var $=n(98),Q=n(54),W=(n(71),[{id:1,firstname:"abc",lastname:"xyz",phone:"+91 789654123",email:"abcyz@gmail.com"},{id:2,firstname:"def",lastname:"uvz",phone:"+91 123456987",email:"defvu@gmail.com"}]),X=n(97),Y=n(104),Z=n(99),ee=n(55),te=n.n(ee),ne=function(e){var t=Object(l.f)(),n=function(){t.push({pathname:"/edit",oldRow:e.content,tableName:e.tableName})};return e.content.map((function(e,t){return Object(h.jsx)("td",{className:"pointer",onClick:n,children:e},t)}))},re=function(e){var t=Object(r.useState)(),n=Object(s.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)([]),i=Object(s.a)(o,2),l=i[0],u=i[1],d=Object(r.useContext)(_),j=(d.errorMessage,d.setErrorMessage),b=d.clearError,p=Object(r.useState)(!1),f=Object(s.a)(p,2),O=f[0],m=f[1],x=Object(r.useRef)(),g=Object(r.useRef)({}),v=function(){return m(!1)},y=function(){return m(!0)};Object(r.useEffect)((function(){e.tableName&&(b(),J(e.tableName,e.pageNum).then((function(e){e.error?j(e.error):c(e)})))}),[e.tableName]);var w=function(t){console.log(t),t=g.current,b(),R({table:e.tableName,rows:[t]}).then((function(t){t.error?j(t.error):J(e.tableName,e.pageNum).then((function(e){e.error?j(e.error):c(e)}))})),v()},C=function(){b(),function(e){return B.apply(this,arguments)}(e.tableName).then((function(){return J(e.tableName).then((function(e){e.error?j(e.error):c(e)}))})),v()},S=function(){b(),R({table:e.tableName,rows:l}).then((function(){u([]),c([]),J(e.tableName).then((function(e){e.error?j(e.error):c(e)}))})),v()},k=function(){var e;return null===(e=a.metadata)||void 0===e?void 0:e.map((function(e,t){return e.name}))};return Object(h.jsxs)(F.a,{style:{marginTop:40},children:[Object(h.jsxs)(X.a,{striped:!0,bordered:!0,hover:!0,children:[Object(h.jsx)("thead",{children:Object(h.jsx)("tr",{children:a&&function(){var e=k();return null===e||void 0===e?void 0:e.map((function(e,t){return Object(h.jsx)("th",{children:e},t)}))}()})}),Object(h.jsx)("tbody",{children:a&&function(){var t;k();return null===(t=a.rows)||void 0===t?void 0:t.map((function(t,n){return Object(h.jsxs)("tr",{children:[Object(h.jsx)(ne,{content:t,tableName:e.tableName},n),Object(h.jsx)("td",{className:"pointer",children:Object(h.jsx)(te.a,{onClick:function(){g.current=t,x.current=w,a.metadata&&y()}})}),Object(h.jsx)("td",{children:Object(h.jsx)("input",{type:"checkbox",onClick:function(e){return function(e,t){var n,r=l;n=e.target.checked?r.concat([t]):r.filter((function(e){return JSON.stringify(e)!=JSON.stringify(t)})),u(n)}(e,t)}})})]},n)}))}()})]}),Object(h.jsx)(q.a,{variant:"primary",type:"submit",id:"delete-all-button",onClick:function(e){e.preventDefault(),x.current=C,y()},children:"Delete all rows"}),Object(h.jsx)(q.a,{variant:"primary",type:"submit",id:"delete-selected-button",onClick:function(e){e.preventDefault(),x.current=S,y()},children:"Delete selected rows"}),Object(h.jsxs)(Z.a,{show:O,onHide:v,children:[Object(h.jsx)(Z.a.Header,{closeButton:!0,children:Object(h.jsx)(Z.a.Title,{children:"Confirm Delete"})}),Object(h.jsxs)(Z.a.Body,{children:["Are you sure you want to delete?",Object(h.jsx)("br",{}),"(This may result in loss of related rows)"]}),Object(h.jsxs)(Z.a.Footer,{children:[Object(h.jsx)(q.a,{variant:"secondary",onClick:v,children:"Close"}),Object(h.jsx)(q.a,{variant:"danger",onClick:x.current,children:"Confirm"})]})]}),Object(h.jsx)("div",{className:"pagination-parent",children:a&&1!=a.pages&&function(){var t=a.pages,n=e.tableName,r=e.pageNum;t=parseInt(t),r=r?parseInt(r):1,console.log("pages:",t,"pageNum:",r);var c=[],o="".concat(window.location.origin,"/dashboard/").concat(n,"/");if(1!=r&&c.push(Object(h.jsx)(Y.a.Prev,{href:o+(r-1)})),t<7)for(var s=1;s<=t;s++)c.push(Object(h.jsx)(Y.a.Item,{href:o+s,children:s},s));else if(r<4){for(var i=1;i<=4;i++)c.push(Object(h.jsx)(Y.a.Item,{href:o+i,children:i},i));var l=Math.floor((4+t)/2);c.push(Object(h.jsx)(Y.a.Ellipsis,{href:o+l})),c.push(Object(h.jsx)(Y.a.Item,{href:o+t,children:t}))}else if(t-r<3){for(var u=1;u<=2;u++)c.push(Object(h.jsx)(Y.a.Item,{href:o+u,children:u},u));var d=Math.floor((t-1)/2);c.push(Object(h.jsx)(Y.a.Ellipsis,{href:o+d}));for(var j=t-3;j<=t;j++)c.push(Object(h.jsx)(Y.a.Item,{href:o+j,children:j},j))}else{c.push(Object(h.jsx)(Y.a.Item,{href:o+"1",children:1},1));var b=Math.floor(r/2);c.push(Object(h.jsx)(Y.a.Ellipsis,{href:o+b}));for(var p=r-1;p<=r+1;p++)c.push(Object(h.jsx)(Y.a.Item,{href:o+p,children:p},p));var f=Math.floor((r+1+t)/2);c.push(Object(h.jsx)(Y.a.Ellipsis,{href:o+f})),c.push(Object(h.jsx)(Y.a.Item,{href:o+t,children:t},t))}return r!=t&&c.push(Object(h.jsx)(Y.a.Next,{href:o+(r+1)})),Object(h.jsx)(Y.a,{children:c})}()})]})};re.defaultProps={data:W};var ae=re,ce=function(e){var t,n=Object(l.f)(),a=null===(t=JSON.parse(localStorage.getItem("dbConfig")))||void 0===t?void 0:t.tables,c=Object(r.useState)(null),o=Object(s.a)(c,2),i=o[0],u=o[1],d=Object(r.useState)(null),j=Object(s.a)(d,2),b=j[0],f=j[1];Object(r.useEffect)((function(){(function(){return S.apply(this,arguments)})().then((function(e){e.error&&(localStorage.removeItem("dbConfigured"),window.location.replace("/"))}));var t=e.match.params;t.tableName?(u(t.tableName),t.pageNum&&f(t.pageNum)):a&&u(a[0])}),[]);return Object(h.jsx)(F.a,{fluid:!0,children:Object(h.jsxs)($.a,{children:[Object(h.jsx)(Q.a,{xs:2,id:"sidebar-wrapper",children:Object(h.jsxs)(p.a,{className:"col-md-12 d-none d-md-block bg-dark sidebar",activeKey:"/home",children:[Object(h.jsx)("div",{className:"sidebar-sticky"}),a&&a.map((function(e,t){return Object(h.jsx)(p.a.Item,{children:Object(h.jsx)(p.a.Link,{href:"/dashboard/".concat(e),children:e})},t)}))]})}),Object(h.jsxs)(Q.a,{xs:10,id:"page-content-wrapper",children:[Object(h.jsx)(q.a,{variant:"primary",type:"submit",id:"create-button",onClick:function(e){e.preventDefault(),n.push({pathname:"/create",tableName:i})},children:"Add Row"}),Object(h.jsx)(ae,{tableName:i,pageNum:b})]})]})})},oe=n(57),se=function(e){var t=e.id,n=e.type,a=e.name,c=e.maxLength,o=e.value,s=e.required,i=Object(r.useContext)(A).handleChange;return Object(h.jsx)("input",{id:t,type:n,name:a,required:s,maxLength:c,size:c,value:null!==o&&void 0!==o?o:"",onChange:function(e){return i(t,e)}})},ie=function(e){var t=e.id,n=e.type,a=e.name,c=e.value,o=Object(r.useContext)(A).handleChange;return Object(h.jsx)("input",{id:t,type:n,name:a,checked:"1"==c,onChange:function(e){return o(t,e)}})},le=function(e){var t=e.id,n=e.type,a=e.name,c=e.maxLength,o=e.value,s=e.required,i=Object(r.useContext)(A).handleChange;return Object(h.jsx)("textarea",{id:t,type:n,name:a,required:s,maxLength:c,size:c,value:null!==o&&void 0!==o?o:"",onChange:function(e){return i(t,e)}})},ue=function(e){var t=Object(r.useState)(null),n=Object(s.a)(t,2),a=n[0],c=n[1],o=Object(r.useContext)(_),i=(o.errorMessage,o.setErrorMessage),l=o.clearError;Object(r.useEffect)((function(){e.table&&(l(),function(e){return T.apply(this,arguments)}({table:e.table}).then((function(t){t.error?i(t.error):e.oldRow?c(t.metadata.map((function(t,n){return t.value=e.oldRow[n],t}))):c(t.metadata)})))}),[e.table]);var u=function(t){t.preventDefault();var n={};if(a.forEach((function(e){"BOOLEAN"==e.type&&""==e.value&&(e.value=!1),n[e.name]=e.value})),e.oldRow){var r={};a.forEach((function(t,n){return r[t.name]=e.oldRow[n]})),l(),function(e){return D.apply(this,arguments)}({tableName:e.table,oldRow:r,newRow:n}).then((function(t){t.error?i(t.error):"Successfully Updated"===t.message&&window.location.replace("".concat(window.location.origin,"/dashboard/").concat(e.table))}))}else l(),function(e){return M.apply(this,arguments)}({tableName:e.table,newRow:n}).then((function(t){t.error?i(t.error):"Successfully Created"===t.message&&window.location.replace("".concat(window.location.origin,"/dashboard/").concat(e.table))}))},d=function(e,t){var n=Object(oe.a)(a);n.forEach((function(r){var a=r.type,o=r.name;if(e===o)switch(a){case"BOOLEAN":r.value=t.target.checked;break;default:r.value=t.target.value}c(n)}))};return Object(r.useMemo)((function(){return Object(h.jsx)(F.a,{style:{marginTop:40},children:Object(h.jsx)(G.a,{children:Object(h.jsx)(G.a.Body,{children:Object(h.jsx)(A.Provider,{value:{handleChange:d},children:Object(h.jsxs)(U.a,{children:[console.log("Elements:",a),a?a.map((function(e,t){console.log("Type:",e.type);var n,r,a=(n=e.type.toLowerCase()).includes("char")||n.includes("text")||n.includes("binary")||n.includes("blob")?"text":n.includes("integer")||n.includes("float")||n.includes("decimal")||n.includes("bit")||n.includes("int")||n.includes("double")||n.includes("year")?"number":n.includes("boolean")?"checkbox":n.includes("dateandtime")||n.includes("timestamp")?"datetime-local":n.includes("date")?"date":n.includes("time")?"time":n.includes("json")?"json":"",c=function(e){if(e.includes("year"))return 4;if(e.includes("blob"))return 21;var t=e.match(/\(([^)]*)\)$/);return null!=t?t[1]:t}(e.type.toLowerCase()),o=e.value?e.value:null,s=e.name,i=!e.nullable;return null!=c&&c>=21||"json"==a?r=Object(h.jsx)(le,{id:s,type:a,name:s,maxLength:c,value:o,required:i},s):"text"==a||"number"==a||"datetime-local"==a||"date"==a||"time"==a?r=Object(h.jsx)(se,{id:s,type:a,name:s,maxLength:c,value:o,required:i},s):"checkbox"==a&&(r=Object(h.jsx)(ie,{id:s,type:a,name:s,value:o},s)),Object(h.jsxs)(U.a.Group,{className:"table-form",children:[Object(h.jsx)("span",{}),Object(h.jsx)("label",{htmlFor:s,children:Object(h.jsx)("strong",{children:s})},t+1),Object(h.jsx)("span",{children:r})]},t)})):null,Object(h.jsx)(q.a,{variant:"dark",type:"submit",onClick:function(e){return u(e)},children:"S A V E"})]})})})})})}),[a])};ue.defaultProps={metadata:[{type:"VARCHAR(30)",nullable:!1,default:"testing",name:"device_id",comment:"Source tablet device ID"},{type:"DateAndTime",nullable:!0,default:null,name:"time",comment:"Source tablet device ID"},{type:"tinyint",nullable:!1,default:!1,name:"isSet",comment:"Testing checkbox"},{type:"integer",nullable:!1,default:"10",name:"Number",comment:"Testing checkbox"}]};var de=ue,je=function(e){return console.log(e),Object(h.jsx)("div",{children:Object(h.jsx)(de,{table:e.location.tableName,oldRow:e.location.oldRow})})},be=function(e){return console.log(e),Object(h.jsx)("div",{children:Object(h.jsx)(de,{table:e.location.tableName})})},pe=n(52),he=(n(79),function(){var e=Object(r.useContext)(_),t=e.errorMessage,n=(e.setErrorMessage,e.clearError);return t?Object(h.jsx)("div",{className:"fixedPositionErrorBox",children:Object(h.jsxs)(pe.a,{variant:"danger",onClose:function(){return n()},dismissible:!0,children:[Object(h.jsx)(pe.a.Heading,{children:"Error"}),Object(h.jsx)("p",{children:t})]})}):null}),fe=function(){var e=function(){var e=Object(r.useState)(function(){var e=localStorage.getItem("token"),t=JSON.parse(e);return null===t||void 0===t?void 0:t.token}()),t=Object(s.a)(e,2),n=t[0],a=t[1];return{setToken:function(e){localStorage.setItem("token",JSON.stringify(e)),a(e.token)},token:n}}(),t=e.token,n=e.setToken,a=function(){var e=Object(r.useState)(function(){var e=localStorage.getItem("dbConfig");return JSON.parse(e)||null}()),t=Object(s.a)(e,2),n=t[0],a=t[1];return{setDBConfig:function(e){localStorage.setItem("dbConfig",JSON.stringify(e)),localStorage.setItem("dbConfigured",JSON.stringify(!0)),a(e)},dbConfig:n}}(),c=a.dbConfig,o=a.setDBConfig,u=Object(r.useState)(""),d=Object(s.a)(u,2),j=d[0],b=d[1],p=function(){b("")};return t?JSON.parse(localStorage.getItem("dbConfigured"))?Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(g,{}),Object(h.jsxs)(_.Provider,{value:{errorMessage:j,setErrorMessage:b,clearError:p},children:[Object(h.jsx)(i.a,{children:Object(h.jsxs)(l.c,{children:[Object(h.jsx)(l.a,{path:"/dashboard/:tableName?/:pageNum?",component:ce}),Object(h.jsx)(l.a,{path:"/edit",component:je}),Object(h.jsx)(l.a,{path:"/create",component:be}),Object(h.jsx)(l.a,{path:"/",component:ce})]})}),Object(h.jsx)(he,{})]})]}):Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)(_.Provider,{value:{errorMessage:j,setErrorMessage:b,clearError:p},children:[Object(h.jsx)(K,{setDBConfig:o,dbConfig:c}),Object(h.jsx)(he,{})]})}):Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)(_.Provider,{value:{errorMessage:j,setErrorMessage:b,clearError:p},children:[Object(h.jsx)(V,{setToken:n}),Object(h.jsx)(he,{})]})})},Oe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,105)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};n(80);o.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(fe,{})}),document.getElementById("root")),Oe()}},[[82,1,2]]]);
//# sourceMappingURL=main.0795b91c.chunk.js.map