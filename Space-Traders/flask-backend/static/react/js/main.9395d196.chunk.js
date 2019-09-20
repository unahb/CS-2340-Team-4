(window["webpackJsonpreact-frontend"]=window["webpackJsonpreact-frontend"]||[]).push([[0],{10:function(e,t,n){},24:function(e,t,n){e.exports=n(35)},29:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),o=n(16),i=n.n(o),r=(n(29),n(17)),c=n(18),m=n(22),d=n(19),u=n(23),s=n(6),y=n(5),E=(n(10),n(7)),p=n.n(E);var f=function(){return l.a.createElement("div",{id:"Welcome"},l.a.createElement("div",{id:"stars"},l.a.createElement("header",{id:"Welcome-header"},l.a.createElement("h1",null,"Welcome to Space Traders!")),l.a.createElement("div",null,l.a.createElement("img",{src:p.a,id:"spaceship",align:"left"})),l.a.createElement("button",{type:"button",id:"startButton"},l.a.createElement(s.b,{to:"/PlayerSetup",className:"nav-link"},"START"))))};function g(e){e.pPoints=1,e.fPoints=1,e.mPoints=1,e.ePoints=1,e.total=4,document.getElementById("pskill").value=1,document.getElementById("fskill").value=1,document.getElementById("mskill").value=1,document.getElementById("eskill").value=1;for(var t=1;t<=9;t++)t<=1?(document.getElementById("p"+t).style.opacity="1.0",document.getElementById("p"+t).style.backgroundColor="#00ff00",document.getElementById("f"+t).style.opacity="1.0",document.getElementById("f"+t).style.backgroundColor="#00ff00",document.getElementById("m"+t).style.opacity="1.0",document.getElementById("m"+t).style.backgroundColor="#00ff00",document.getElementById("e"+t).style.opacity="1.0",document.getElementById("e"+t).style.backgroundColor="#00ff00"):(document.getElementById("p"+t).style.opacity="0.0",document.getElementById("f"+t).style.opacity="0.0",document.getElementById("m"+t).style.opacity="0.0",document.getElementById("e"+t).style.opacity="0.0")}var v=function(){var e=[1,2,3,4,5,6,7,8,9],t=16,n={name:null,difficulty:null,pPoints:1,fPoints:1,mPoints:1,ePoints:1,total:4,credits:0},a=[{name:"Pilot:",id:"p"},{name:"Fighter:",id:"f"},{name:"Merchant:",id:"m"},{name:"Engineer:",id:"e"}].map((function(a){return l.a.createElement("tr",null,l.a.createElement("th",null,a.name),e.map((function(e){return l.a.createElement("td",{id:a.id+e})})),l.a.createElement("td",null,l.a.createElement("input",{type:"range",id:a.id+"skill",min:1,max:9,defaultValue:1,onChange:function(e){if("onkeypress"==e.type&&console.log("key pressed"),console.log(e.type),"p"==a.id){if(n.total>=t&&e.target.value-n.pPoints>0)return void(e.target.value=n.pPoints);n.pPoints=parseInt(e.target.value);for(var l=1;l<=9;l++)l<=n.pPoints?(document.getElementById("p"+l).style.opacity="1.0",document.getElementById("p"+l).style.backgroundColor="#00ff00"):document.getElementById("p"+l).style.opacity="0.0"}else if("f"==a.id){if(n.total>=t&&e.target.value-n.fPoints>0)return void(e.target.value=n.fPoints);n.fPoints=parseInt(e.target.value);for(l=1;l<=9;l++)l<=n.fPoints?(document.getElementById("f"+l).style.opacity="1.0",document.getElementById("f"+l).style.backgroundColor="#00ff00"):document.getElementById("f"+l).style.opacity="0.0"}else if("m"==a.id){if(n.total>=t&&e.target.value-n.mPoints>0)return void(e.target.value=n.mPoints);n.mPoints=parseInt(e.target.value);for(l=1;l<=9;l++)l<=n.mPoints?(document.getElementById("m"+l).style.opacity="1.0",document.getElementById("m"+l).style.backgroundColor="#00ff00"):document.getElementById("m"+l).style.opacity="0.0"}else if("e"==a.id){if(n.total>=t&&e.target.value-n.ePoints>0)return void(e.target.value=n.ePoints);n.ePoints=parseInt(e.target.value);for(l=1;l<=9;l++)l<=n.ePoints?(document.getElementById("e"+l).style.opacity="1.0",document.getElementById("e"+l).style.backgroundColor="#00ff00"):document.getElementById("e"+l).style.opacity="0.0"}n.total=n.pPoints+n.fPoints+n.mPoints+n.ePoints,document.getElementById("totalPoints").innerText=t-n.total}})))}));return l.a.createElement("div",{id:"Main"},l.a.createElement("div",{id:"stars"},l.a.createElement("header",{id:"Attributes-header"},l.a.createElement("h1",null,"Choose Your Attributes")),l.a.createElement("div",null,l.a.createElement("img",{src:p.a,id:"spaceship",align:"left"})),l.a.createElement("div",null,l.a.createElement("form",{id:"nameForm"},l.a.createElement("input",{type:"text",id:"name",placeholder:"Please enter your name!"}))),l.a.createElement("div",null,l.a.createElement("button",{type:"button",id:"easyButton",onClick:function(e){n.difficulty="Easy",n.credits=1e3,t=16,g(n),document.getElementById("totalPoints").innerText=t-n.total}},"Easy"),l.a.createElement("br",null),l.a.createElement("button",{type:"button",id:"mediumButton",onClick:function(e){n.difficulty="Medium",n.credits=500,t=12,g(n),document.getElementById("totalPoints").innerText=t-n.total}},"Medium"),l.a.createElement("br",null),l.a.createElement("button",{type:"button",id:"hardButton",onClick:function(e){n.difficulty="Hard",n.credits=100,t=8,g(n),document.getElementById("totalPoints").innerText=t-n.total}},"Hard"),l.a.createElement("br",null),l.a.createElement("label",{id:"totalPoints"},t-n.total)),l.a.createElement("table",{id:"Attribute-Table",align:"right"},l.a.createElement("tr",null,l.a.createElement("th",null,"Skill"),l.a.createElement("th",{colSpan:"9"},"Level"),l.a.createElement("th",null,"Overall:")),a),l.a.createElement("button",{type:"submit",id:"submitButton"},l.a.createElement(s.b,{to:"/PlayerStats",className:"nav-link"},"SUBMIT"))))};var B=function(){return l.a.createElement("div",{id:"Main"},l.a.createElement("div",{id:"stars"},l.a.createElement("header",{id:"Welcome-header"},l.a.createElement("h1",null,"Your Player")),l.a.createElement("div",null,l.a.createElement("img",{src:p.a,id:"spaceship",align:"left"})),l.a.createElement("div",null,l.a.createElement("text",{id:"finalName"}))))},P=function(e){function t(){return Object(r.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(s.a,null,l.a.createElement("div",null,l.a.createElement(y.c,null,l.a.createElement(y.a,{exact:!0,path:"/",component:f}),l.a.createElement(y.a,{path:"/PlayerSetup",component:v}),l.a.createElement(y.a,{path:"/PlayerStats",component:B}))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t,n){e.exports=n.p+"media/spaceship.4d290229.png"}},[[24,1,2]]]);
//# sourceMappingURL=main.9395d196.chunk.js.map