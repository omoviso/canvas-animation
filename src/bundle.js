!function(t){var e={};function i(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(o,s,function(e){return t[e]}.bind(null,s));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){t.exports=i(1)},function(t,e){function i(t){let e="SPAN"==t.target.tagName?t.target.parentNode:t.target,i=document.querySelector(".content"),o=document.querySelector(".cover"),s=document.querySelector("div.avatar");o.style.display="block";let a=document.querySelector(".back");a.addEventListener("click",r);let n=e.classList.contains("sample");function r(){d=setInterval(x,16)}n&&(c.starFall=e.classList.contains("starfall"),c.fireworkShoot=e.classList.contains("firework"));let l,h,d,p,u=document.querySelectorAll("div.section"),f=(document.querySelector("div.section").getBoundingClientRect().top,document.querySelector("div.section").getBoundingClientRect().left,{opacity:1,top:0}),y={opacity:1,baseLeft:e.getBoundingClientRect().left,baseTop:e.getBoundingClientRect().top,posLeft:0,posTop:0},g={opacity:0,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,leftMargin:30,topMargin:35},w=0,m=setInterval(function(){u.forEach(t=>{(t!=e||n)&&(t.style.opacity=f.opacity,t.style.top=`${f.top}px`)}),s.style.opacity=f.opacity,f.opacity>0?(f.opacity-=.08,f.top--):(f.opacity=0,n?h=setInterval(b,16):l=setInterval(v,16),clearInterval(m))},16);function v(){let t=Math.abs(g.leftMargin-y.baseLeft)/10,o=Math.abs(g.topMargin-y.baseTop)/10;e.getBoundingClientRect().left>g.leftMargin+t?y.posLeft-=t:y.posLeft=g.leftMargin-y.baseLeft,e.getBoundingClientRect().top>g.topMargin+o?y.posTop-=o:y.posTop=g.topMargin-y.baseTop,y.posTop==g.topMargin-y.baseTop&&y.posLeft==g.leftMargin-y.baseLeft&&(i.style.cssText=`left: ${g.leftMargin}px; \n\t\t\t\t\t\t\t\t\t top: ${g.topMargin}px;\n\t\t\t\t\t\t\t\t\t width: ${e.getBoundingClientRect().width}px;\n\t\t\t\t\t\t\t\t\t height: ${e.getBoundingClientRect().height}px`,i.style.display="block"),y.opacity>0?y.opacity-=.2:y.opacity=0,e.style.left=`${y.posLeft}px`,e.style.top=`${y.posTop}px`,e.firstElementChild.style.opacity=y.opacity,0==y.opacity&&y.posLeft==g.leftMargin-y.baseLeft&&(clearInterval(l),document.querySelectorAll("div.section").forEach(t=>{t.style.left=0,t.style.display="none",t.style.top=`${f.top}px`,e.firstElementChild.style.opacity=1}),h=setInterval(b,16))}function b(){let t=e.parentNode.getBoundingClientRect().width-2*g.leftMargin,o=e.parentNode.getBoundingClientRect().height-75;g.width<t?g.width+=50:(i.style.overflow="auto",g.width=t),g.height<o?g.height+=50:(i.style.overflow="auto",g.height=o),n?g.opacity=0:g.opacity<1?g.opacity+=.03:g.opacity=1,i.style.width=`${g.width}px`,i.style.height=`${g.height}px`,i.firstElementChild.style.opacity=g.opacity,(1==g.opacity&&g.width==e.parentNode.getBoundingClientRect().width-2*g.leftMargin||n)&&(a.style.display="block",w<1?w+=.1:w=1,a.style.opacity=w,1==w&&clearInterval(h))}function x(){a.removeEventListener("click",r),i.style.overflow="hidden";let t=i.getBoundingClientRect().width>6*g.width/50?i.getBoundingClientRect().width-6*g.width/50:0,e=i.getBoundingClientRect().height>6*g.height/50?i.getBoundingClientRect().height-6*g.height/50:0;w>0?w-=.09:w=0,a.style.opacity=w,i.firstElementChild.style.opacity=w,0==t&&0==e&&(i.style.display="none",0==w&&(clearInterval(d),p=setInterval(S,16),c.starFall=!1,c.fireworkShoot=!1)),0==w&&(a.style.display="none"),i.style.width=`${t}px`,i.style.height=`${e}px`}function S(){f.top<0?f.top++:f.top=0,f.opacity<1?f.opacity+=.06:f.opacity=1,s.style.opacity=f.opacity,u.forEach(t=>{t.style.top=`${f.top}px`,t.style.opacity=f.opacity,t.style.display="flex"}),0==f.top&&1==f.opacity&&(o.style.display="none",clearInterval(p))}}let o=(s=0,function(){s>.98?s=1:s+=.02,x.save(),x.fillStyle=`rgba(0, 0, 0, ${s}`,x.fillRect(0,0,b.width,b.height);let t=M.doors[0];if(1==s&&(t.x>0?t.x-=b.width/200:t.x=0,t.y>0?t.y-=b.height/200:t.y=0,t.w<b.width?t.w+=b.width/100:t.w=b.width,t.h<b.height?t.h+=b.height/100:t.h=b.height,t.w==b.width&&t.h==b.height&&0==t.x&&0==t.y)){b.style.background="linear-gradient(#171e26 26%, #3f586b 70%)",k.clearRect(0,0,b.width,b.height),I=!0,function(){for(let t=0;t<60;t++){let e=!1,i=p(2,4),o=p(i,b.width),s=p(i,b.height/2.2);d.starsBackground.length>1&&d.starsBackground.forEach(a=>{a!=d.starsBackground[t]&&Math.abs(a.x-o)<Math.abs(a.radius+i+10)&&Math.abs(a.y-s)<Math.abs(a.radius+i+10)&&(e=!0)}),e?t--:d.starsBackground.push(new f(o,s,i,"white"))}}(),y(),d.starsBackground.forEach(t=>t.draw(k)),g();let t=document.querySelector(".description");t.style.display="flex",setTimeout(()=>{t.classList.add("active")},1)}t.draw(),x.restore(),M.candles.forEach(t=>{t.h>.2&&t.w>.05&&t.rad>2.5?(t.h-=.22,t.w-=.05,t.rad-=2.5):(t.h=0,t.w=0,t.rad=0)})});var s;function a(t,e,i){let o=b.width,s=b.height;this.x=o/3,this.y=s/30,this.angle=0,this.rotateSpeed=0,this.dropSpeed=10,this.base=.008,this.direction=!0,this.rotX=t,this.rotY=e,this.draw=(()=>{x.save(),x.translate(this.rotX,this.rotY),x.rotate(this.angle),x.translate(-this.rotX,-this.rotY),x.drawImage(i,this.x,this.y,o/3,s/4),x.font=`bold ${o/28}px Comic Sans MS`,x.textAlign="center",x.fillText("My Portfolio",this.x+o/6,this.y+s/8+o/115),x.restore()}),this.update=(()=>{if(P)if(Math.abs(this.rotateSpeed)<=.002&&this.angle<=Math.PI/2+Math.abs(this.base)&&this.angle>=Math.PI/2-Math.abs(this.base)){this.rotateSpeed=0,this.dropSpeed+=5,this.x<=6*s?this.x+=this.dropSpeed:this.dropSpeed=0;for(let t in M.nails)t%2==0&&(M.nails[t].isDrop=!0)}else(this.direction&&this.angle>=Math.PI/2||!this.direction&&this.angle<=Math.PI/2)&&(this.base*=-1,this.rotateSpeed*=.355,this.direction=!this.direction),this.rotateSpeed+=this.base,this.angle+=this.rotateSpeed;this.draw()})}function n(t,e,i,o,s=!1){let a=b.width,n=b.height;this.x=t,this.y=e,this.w=i,this.h=o,this.isBackground=s,this.draw=(()=>{if(x.save(),this.isBackground){let t=x.createLinearGradient(0,0,0,n);t.addColorStop(.26,"#171e26"),t.addColorStop(.7,"#3f586b"),x.fillStyle=t}else x.fillStyle="#400000";x.beginPath(),x.rect(this.x,this.y,this.w,this.h),x.strokeStyle="black",x.fill(),x.stroke(),x.closePath(),x.restore()}),this.update=(()=>{if(P&&(this.isBackground||this.x>=a/2-1.5*this.w&&this.x<=a/2+this.w/2&&(this.x<a/2?this.x--:this.x++)),this.draw(),!this.isBackground&&this.x<a/2-1.5*this.w)return!0})}function r(){let t;x.clearRect(0,0,b.width,b.height),x.drawImage(S,0,0),M.doors.forEach((e,i)=>{1==(t=e.update())?(M.board.forEach(t=>{t.update()}),M.nails.forEach(t=>{t.update()})):(M.board.forEach(t=>{t.draw()}),M.nails.forEach(t=>{t.draw()}))}),M.candles.forEach(t=>{t.update()}),1==M.nails[0].update()&&o(),I?x.clearRect(0,0,b.width,b.height):window.requestAnimationFrame(r)}function l(t,e,i,o,s="#333333"){b.width;let a=b.height;this.x=t,this.y=e,this.rad=i,this.isDrop=o,this.gravity=9,this.fill=s,this.draw=(()=>{x.save(),x.beginPath(),x.fillStyle=s,x.arc(this.x,this.y,this.rad,0,2*Math.PI),x.fill(),x.stroke(),x.closePath(),x.restore()}),this.update=(()=>{if(P&&this.isDrop&&this.y<=a+this.rad&&(this.gravity+=1,this.x+=.15*this.gravity,this.y+=this.gravity),this.draw(),this.y>=a+this.rad&&M.nails[0]==this)return!0})}let h=0,c={starFall:!1,fireworkShoot:!1},d={starsBackground:[],starsFall:[],starsParticle:[]};function p(t,e){return Math.random()*(e-t)+t}function u(t,e,i){let o=b.width,s=b.height;e=b.height-e,x.save(),x.beginPath(),x.moveTo(0,s),x.lineTo(0,t);for(let s=0;s<i;s++){let a=o/(2*i)+s*o/i;x.lineTo(a,e),x.lineTo(a+o/(2*i),t)}x.lineTo(o,s);let a=x.createLinearGradient(0,0,0,s);a.addColorStop(0,"#182c25"),a.addColorStop(.25,"#1e453e"),a.addColorStop(.5,"#2c4c3b"),a.addColorStop(.75,"#306844"),a.addColorStop(1,"#455b55"),x.fillStyle=a,x.stroke(),x.fill(),x.closePath(),x.restore()}function f(t,e,i,o,s=0,a=0,n=!1){this.x=t,this.y=e,this.radius=i,this.vecX=s,this.vecY=a,this.fill=o,this.drop=!1,this.isParticles=n,this.opacity=1}function y(){for(let t=d.starsFall.length;t<4;t++){let t=p(6,8),e=2*-t,i=p(t,b.width-t),o=p(-7,7),s=p(3,8);d.starsFall.push(new f(i,e,t,"white",o,s))}}function g(){window.requestAnimationFrame(g),x.clearRect(0,0,b.width,b.height),h<1?h+=.03:h=1,x.globalAlpha=h,x.drawImage(S,0,0),u(b.height/2.1,b.height/1.1,1),u(b.height/1.8,b.height/1.5,2),u(b.height/1.5,b.height/2,3),1==h&&d.starsFall.forEach(t=>{t.updateStarFall()}),d.starsParticle.length>0&&d.starsParticle.forEach(t=>{t.updateStarFall()}),C.shootUps.forEach(t=>{t.animation()}),C.particles.forEach(t=>{t.animation()})}function w(t,e,i,o,s){let a=b.width;b.height;k.save(),k.beginPath(),k.fillStyle=s,k.rect(t,e,i,o),k.rect(a-t-i,e,i,o),k.fill(),k.stroke(),k.closePath(),k.restore()}function m(t,e,i,o){let s=b.width,a=b.height;this.x=t,this.y=e,this.w=i,this.h=o;let n=.05*Math.sin(1.1*Date.now()/1e5);this.rad=(a/7+s/6)*(1+n),this.draw=(()=>{x.save(),x.beginPath(),x.fillStyle="yellow",x.ellipse(this.x,this.y,this.w,this.h,0,0,2*Math.PI),x.fill(),x.closePath(),x.restore(),function(t,e,i,o,s){b.width,b.height;s.save(),s.globalCompositeOperation="lighter";let a=s.createRadialGradient(t,e,0,t,e,i);a.addColorStop(0,"#BB9"),a.addColorStop(.1+o,"#AA8"),a.addColorStop(.75+o,"#330"),a.addColorStop(.9,"#110"),a.addColorStop(1,"#000"),s.beginPath(),s.fillStyle=a,s.arc(t,e,i,0,2*Math.PI),s.fill(),s.closePath(),s.restore()}(t,e,this.rad,n,x)}),this.update=(()=>{this.y-=.1,this.y<=e-3&&(this.y=e),this.draw()})}f.prototype.draw=function(t=x){t.save(),t.beginPath(),t.shadowColor=this.fill,t.shadowBlur=20,t.globalAlpha=this.opacity>0?this.opacity:0,t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.fill,t.fill(),t.closePath(),t.restore()},f.prototype.updateStarFall=function(){(!this.drop&&Math.random()>.989&&c.starFall||this.isParticles)&&(this.drop=!0),this.isParticles&&(this.opacity>0?this.opacity-=.01:d.starsParticle.forEach((t,e)=>{this==t&&d.starsParticle.splice(e,1)})),this.drop&&(this.vecX=this.vecX<.05&&this.vecX>0?0:.999*this.vecX,(this.x>=b.width-this.radius||this.x<=this.radius)&&(this.vecX*=-1),this.x+=this.vecX,this.vecY<.004&&this.vecY>0?(this.y=b.height-this.radius,this.isParticles?d.starsParticle.forEach((t,e)=>{this==t&&d.starsParticle.splice(e,1)}):d.starsFall.forEach((t,e)=>{this==t&&(d.starsFall.splice(e,1),y())})):(this.y>=b.height-this.radius-this.vecY?(this.vecY=-.7*this.vecY,this.radius/=1.5,this.isParticles||function(t,e,i,o){for(let e=0;e<5;e++){let e=p(-3,3);o=p(o,-10),i=p(i/1.5,i),d.starsParticle.push(new f(t,b.height-i,i,"white",e,o,!0))}}(this.x,this.y,this.radius,this.vecY)):this.vecY+=.5,this.y+=this.vecY),this.radius<3&&!this.isParticles&&(this.isParticles||d.starsFall.forEach((t,e)=>{this==t&&(d.starsFall.splice(e,1),y())}))),this.draw()};let v={aboutMe:"\n  <div>\n    <h1>About Me</h1>\n    <p id=\"intro\"><q><i>You do not always work as what you studied, but just do it</i></q> - My mother's and Nike's combined quote.\n    </p>\n    <p id=\"welcome\">Welcome to my Portfolio\n    </p>\n    <p>First, thank you for passing by. Let me briefly introduce myself. My name is Thanh Nguyen Tien. I am a graduated Automation Engineer from HAMK University of Applied Sciences in Valkeakoski city, Finland.\n    </p>\n    <p>I graduated as an Automation Engineer, but I am looking for jobs that involve with coding using HTML, CSS and Javascript, or Front-end developer. The reason for this shift in work is that I did not know what I liked back when I was in pre-university period and therefore, I listened to my parents' choice. After 5 years in the University, I came to realize that I like coding and figuring out effective ways to do stuff, as well as solving problems - through codes, of course! Because of studying an unrelated field, I have been studying HTML, CSS and Javascript on a daily basis for almost a year so that I can somewhat keep up with those actually graduated from relevant fields. Even though Automation Engineering is not related to what I would like to work as, the time I spent studying it helped me develop better logical thinking. \n    </p>\n    <p>As a person who loves coding, I really enjoy it when I can see my products fully displayed in front of me as expected, when I punch through hard walls (figuratively) that make me sleep less soundly for days. I often look for help on stackexchange.com when I meet such walls, and developer.mozilla.org for things whose functions I don't understand. I also have friends who actually studied in this field. They have been giving me their hands on my path I am walking.\n    </p>\n    <p>I am currently studying Vue and Webpack to keep up with the rest of the developer's world. I implemented what I learned about Vue into this portfolio as first steps of ultilizing it. As of now, I still study Javascript and challenge myself with self-made problems to sharpen my thinking. I always aim for being better by studying harder and learning from other people.\n    </p>\n  </div>\n",personalInfo:"\n  <div>\n    <h1> Personal Information </h1>\n    <ul>\n      <li> Full name: Nguyen Tien Thanh.</li>\n      <li> Date of Birth: 06/11/1995.</li>\n      <li>Phone: 0465601840.</li>\n      <li>Address: Harustie 8, 00980, Helsinki.</li>\n    </ul>\n    <h1>Education & Skills</h1>\n    <ul>\n      <li>Bachelor of Automation Engineering (Sep 2013 - Feb 2019) at HAMK University Of Applied Sciences - GPA: 3.39.</li>\n      <li>Self-studying HTML, CSS and Javascript on a daily basis.</li>\n      <li>Finished challenges on javascript30.com.</li>\n      <li>Completed 17 katas with Javascript on codewars.com.</li>\n      <li>Studying basics of Vue.</li>\n      <li>Know how to use Github.</li>\n    </ul>\n    <h1>Previous Work Experience</h1>\n    <ul>\n      <li>Morning paper delivery boy using bikes.</li>\n      <li>Restaurant cleaner.</li>\n      <li>Internship at a Vietnamese company specialized in solar power named SolarBK.</li>\n      <li>Internship at a Russia-Vietnam Joint Venture named Vietsovpetro in Vung Tau city.</li>\n    </ul>\n    <h1>Sample works</h1>\n    <ul>\n    \t<li>Starfall - Inspired by Chris Course Canvas Animation</li>\n    \t<li>Firework - Inspired by Chris Course Canvas Animation</li>\n    </ul>\n  </div>\n"};Vue.component("tab-about",{template:v.aboutMe}),Vue.component("tab-info",{template:v.personalInfo}),new Vue({el:".description",data:{titles:[{title:"About Me",content:"about"},{title:"Personal Info",content:"info"}],currentTab:"about"},computed:{currentTabComponent:function(){return`tab-${this.currentTab}`}}});let b=document.querySelector("canvas");b.width=window.innerWidth,b.height=window.innerHeight;let x=b.getContext("2d"),S=document.createElement("canvas");S.width=b.width,S.height=b.height;let k=S.getContext("2d");CanvasRenderingContext2D.prototype.roundRect=function(t,e,i,o,s){return i<2*s&&(s=i/2),o<2*s&&(s=o/2),this.beginPath(),this.moveTo(t+s,e),this.arcTo(t+i,e,t+i,e+o,s),this.arcTo(t+i,e+o,t,e+o,s),this.arcTo(t,e+o,t,e,s),this.arcTo(t,e,t+i,e,s),this.closePath(),this};let M={doors:[],board:[],nails:[],candles:[]},P=!1,I=!1;function p(t,e){return Math.random()*(t-e)+e}window.onload=(()=>{T();let t=document.querySelectorAll("div.section"),e=document.querySelector("div.avatar"),o=parseFloat(window.getComputedStyle(t[0]).getPropertyValue("margin-top"));e.style.top=`${o/2}px`,t.forEach(t=>{t.addEventListener("click",i)});let s=document.createElement("img");s.src="https://cdn.pixabay.com/photo/2015/01/16/20/39/wood-601830_960_720.png",function(){k.save();let t=b.width,e=b.height;k.fillStyle="#555555";for(let i=0;i<11;i++)for(let o=0;o<18;o++){let s=0;s=o%2==0?-t/20:0,k.roundRect(i*t/9.8+s,o*e/16.5,t/10,e/18,7),k.fill()}k.restore()}(),function(){k.save();let t=b.width,e=b.height,i=t/30,o=e/8,s=t/13,a=e/3;w(s,a,i,o,"brown"),w((s+=i/2)-(i/=4)/2,a-=o/=15,i,o,"red"),k.restore(),x.save(),i/=3,a-=o=e/60;for(let e=0;e<2;e++)1==e&&(s=-s),M.candles.push(new m(s+e*t,a,i,o));x.restore()}();let[h,c]=function(){k.save();let t=b.width,e=t/2.6,i=t/70,o=b.height/15;k.fillStyle="#333333";for(let s=0;s<2;s++){k.beginPath(),k.rect(e+s*t/4.5,-3,i,o),k.fill(),k.stroke(),k.closePath();let a=s%2!=0;M.nails.push(new l(e+i/2+s*t/4.5,-3+o,i/2,a))}return k.restore(),[e,-3+o]}();!function(){let t=b.width,e=b.height,i=t/7,o=e/1.8,s=e-o,a=t/2-i;M.doors.push(new n(a+i/2,s,i,o+5,!0));let r=document.querySelector("button.enter");r.style.cssText=`top:${s+o/2-r.offsetHeight/2}px`;for(let e=0;e<2;e++)a=t/2-i+e*i,M.doors.push(new n(a,s,i,o+5))}(),function(t,e,i){M.board.push(new a(t,e,i))}(h,c,s),x.drawImage(S,0,0);for(let t in M)M[t].forEach(t=>{t.update()});r();let d=document.querySelector("button.enter");d.addEventListener("click",()=>{P=!0,d.style.display="none"}),d.addEventListener("mousedown",()=>{d.classList.add("active")}),d.addEventListener("mouseout",()=>{d.classList.remove("active")}),d.addEventListener("mouseup",()=>{d.classList.remove("active")})});let C={shootUps:[],particles:[]};function E(t,e,i,o,s,a,n,r,l=!0){this.x=t,this.y=e,this.radius={x:i,y:o},this.velocity={x:s,y:a},this.index=r,this.firework=l,this.bloom=!1,this.color=n,this.opacity=1,this.fireWorkStart=!1}function T(t=3){if(C.shootUps.length>=t)return;const e=/[0-9]+/g,i=["rgb(211, 248, 226)","rgb(228, 193, 249)","rgb(246, 148, 193)","rgb(237, 231, 177)","rgb(169, 222, 249)"];for(let o=C.shootUps.length;o<t;o++){const t=p(2,4),s=p(6,8),a=p(t,b.width-t),n=b.height+s,r=b.width/2>=a?p(1,5):p(-5,-1),l=p(-8,-6),h=i[Math.round(p(0,4))].split(",").map(t=>t.match(e)[0]);C.shootUps.push(new E(a,n,t,s,r,l,h,o))}}E.prototype.draw=function(t=x){t.save(),t.beginPath(),t.ellipse(this.x,this.y,this.radius.x,this.radius.y,0,0,2*Math.PI),t.shadowColor=`rgb(${this.color[0]},${this.color[1]},${this.color[2]})`,t.shadowBlur=50,t.fillStyle=`rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity})`,t.fill(),t.restore()},E.prototype.animation=function(){if(!c.fireworkShoot&&this.firework||(this.fireWorkStart=!0),this.fireWorkStart)if(this.firework){if(this.y+=this.velocity.y,this.x+=this.velocity.x,this.y<=b.height/2&&this.y>0&&(this.y>0&&(this.bloom=Math.random()>.99||this.bloom),this.bloom||this.y<=150)){this.createParticles(this.color),this.bloom=!1;for(let t=this.index+1;t<C.shootUps.length;t++)C.shootUps[t].index--;C.shootUps.splice(this.index,1),T()}}else{this.radius.x;this.velocity.x*=1.001,this.velocity.y+=.06,this.x+=this.velocity.x,this.y+=this.velocity.y,this.opacity-=.009}if(this.draw(),this.opacity<=0){for(let t=this.index+1;t<C.particles.length;t++)C.particles[t].index-=1;C.particles.splice(this.index,1)}},E.prototype.createParticles=function(t){let e=0,i=p(-.2,.6);const o=C.particles.length;for(let s=0;s<30;s++){s%10==0&&(e+=.4);const a=2;let n=(i+e)*a*Math.cos(s*Math.PI/5),r=(i+e)*-a*Math.sin(s*Math.PI/5);C.particles.push(new E(this.x,this.y,a,a,n,r,t,o+s,!1))}}}]);