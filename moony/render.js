// Original instructional studies. Deterministic strokes keep each stage comparable.
const PI=Math.PI;
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
export function render(canvas,kind,stage=8,grid=false){
 canvas.width=900;canvas.height=600;const c=canvas.getContext('2d');c.scale(1.5,1.5);const rand=rng([...kind].reduce((a,x)=>a+x.charCodeAt(0),97));const s=stage===0?8:stage;
 c.fillStyle='#fcfbf8';c.fillRect(0,0,600,400);
 const line=(pts,v=100,w=.7)=>{c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=`rgb(${v},${v},${v})`;c.lineWidth=w;c.stroke()};
 const label=(t,x,y)=>{c.fillStyle='#66665e';c.font='11px system-ui';c.fillText(t,x,y)};
 const path=pts=>{const p=new Path2D();pts.forEach(([x,y],i)=>i?p.lineTo(x,y):p.moveTo(x,y));p.closePath();return p};
 function graphite(p,value=140,angle=.7,rough=1){
   if(s<=2){c.strokeStyle=s===1?'#b8b7b0':'#93928c';c.lineWidth=.6;c.stroke(p);return}
   let v=s===3?Math.round(value/110)*110:s===4?Math.round(value/55)*55:value;
   v=Math.max(25,Math.min(246,v));if(s===5)v=255-(255-v)*.85;
   c.save();c.clip(p);c.fillStyle=`rgb(${v+Math.min(12,255-v)},${v+Math.min(12,255-v)},${v+Math.min(12,255-v)})`;c.fillRect(0,0,600,400);
   if(s>=5){for(let i=0;i<900;i++){let x=rand()*600,y=rand()*400,l=3+rand()*18;c.strokeStyle=`rgba(25,24,21,${(.02+rand()*.14)*rough})`;c.lineWidth=.25+rand()*.65;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(angle)*l,y+Math.sin(angle)*l);c.stroke()}}
   c.restore();
 }
 function ellipse(x,y,rx,ry,v,angle=.6){const p=new Path2D();p.ellipse(x,y,rx,ry,0,0,PI*2);graphite(p,v,angle);return p}
 const poly=(pts,v,a=.7)=>graphite(path(pts),v,a);
 function tree(x,y,h,v=60,pine=false){
   if(pine){poly([[x,y-h],[x-h*.24,y-h*.35],[x-h*.1,y-h*.38],[x-h*.34,y],[x+h*.32,y],[x+h*.1,y-h*.4],[x+h*.2,y-h*.35]],v,1.5);return}
   const trunk=[[x-h*.04,y],[x+h*.02,y-h*.6],[x-h*.1,y-h*.86],[x+h*.05,y-h*.64],[x+h*.16,y-h*.9],[x+h*.09,y-h*.56],[x+h*.08,y]];poly(trunk,v,1.5);
   for(let i=0;i<20;i++){let a=rand()*6.28,r=Math.sqrt(rand())*h*.33;ellipse(x+Math.cos(a)*r,y-h*.76+Math.sin(a)*r,h*(.1+rand()*.08),h*.10,v+rand()*75,1)}
 }
 function ridge(y,amp,seed){return Array.from({length:61},(_,i)=>{let x=i*10;return[x,y+Math.sin(i*.19+seed)*amp+Math.sin(i*.63+seed)*amp*.28+Math.sin(i*1.71)*amp*.07]})}
 const fillBelow=(pts,v,a=.8)=>poly([...pts,[600,400],[0,400]],v,a);
 if(kind==='grip'){
   label('GHOST THE MOVEMENT. THEN TOUCH THE PAPER.',45,38);
   for(let row=0;row<3;row++){for(let j=0;j<7;j++){if(s<3&&j>2)continue;let y=85+row*92+j*7;line([[50,y],[250,y+Math.sin(j)*1.5]],205-j*20,.45+j*.12)}}
   if(s>=2)for(let j=0;j<(s>=5?12:5);j++){c.beginPath();c.ellipse(425,125+j*9,90,30+j*2,-.1,0,PI*2);c.strokeStyle=`rgba(40,39,34,${.12+j*.035})`;c.lineWidth=.7;c.stroke()}
   label('2H / light, parallel lines',50,365);label('HB / shoulder-led ellipses',335,365);
 }else if(kind==='values'){
   label('NINE VALUES / PAPER WHITE TO DEEPEST GRAPHITE',45,50);
   for(let i=0;i<9;i++){const x=42+i*57;poly([[x,95],[x+52,95],[x+52,270],[x,270]],250-i*28,1.1);label(String(i+1),x+21,294);if(s<4&&i>2)break}
   label('Keep 1 clean. Build 9 in layers, without scoring the paper.',45,345);
 }else if(kind==='hatching'){
   const names=['Hatching','Cross-hatching','Contour hatching'];names.forEach((t,j)=>{label(t,45+j*185,65);const x=45+j*185;const p=path([[x,90],[x+145,90],[x+145,295],[x,295]]);c.save();c.clip(p);for(let i=0;i<(s<3?12:62);i++){const yy=85+i*4;line([[x-10,yy],[x+160,yy+80]],100,.55);if(j===1&&s>=4)line([[x-10,yy+80],[x+160,yy]],100,.55);if(j===2){c.clearRect(x,90,145,205);break}}if(j===2){c.fillStyle='#fcfbf8';c.fillRect(x,90,145,205);for(let i=0;i<(s<3?10:42);i++){c.beginPath();c.ellipse(x+70,100+i*5,74,22,0,0,PI);c.lineWidth=.55;c.strokeStyle='#777';c.stroke()}}c.restore()});label('Darken with closer spacing and another layer, not a heavy outline.',45,355);
 }else if(kind==='texture'){
   label('MAKE A MARK VOCABULARY',45,45);for(let j=0;j<3;j++){let x=45+j*185;label(['Stippling','Circulism','Layered graphite'][j],x,75);let n=s<3?70:s<5?400:2000;for(let i=0;i<n;i++){let xx=x+rand()*140,yy=95+rand()*210;if(j===0){c.fillStyle='#666';c.fillRect(xx,yy,.7,.7)}else if(j===1){c.beginPath();c.arc(xx,yy,1+rand()*3,0,PI*2);c.strokeStyle='#77777755';c.lineWidth=.5;c.stroke()}else line([[xx,yy],[Math.min(x+140,xx+10),yy+2]],140,.4)}}
 }else if(kind==='blend'||kind==='edges'){
   label(kind==='blend'?'LAYER / BLEND / LIFT':'HARD / SOFT / LOST',45,45);
   for(let j=0;j<3;j++){ellipse(120+j*180,205,65,90,130,.9);if(s>=6&&j>0){c.save();c.globalAlpha=.6;c.filter='blur(8px)';ellipse(105+j*180,180,35,65,220);c.restore()}if(s>=7&&j===2){for(let i=0;i<15;i++)line([[455+i,140],[480+i,248]],244,2)}}
   label('Reserve paper white; lift gently. Blending cannot fix the value map.',45,355);
 }else if(['sphere','cube','cylinder','cone'].includes(kind)){
   label('LIGHT FROM UPPER LEFT',45,45);line([[90,65],[160,100]],150);line([[148,85],[160,100],[143,99]],150);
   ellipse(343,317,153,28,165,0);
   if(kind==='sphere'){for(let i=0;i<36;i++){let r=105-i*2.5;ellipse(295-i*.8,203-i*.7,r,r,70+i*4.8,1.1)}if(s>=7)ellipse(250,155,12,9,246)}
   if(kind==='cube'){poly([[180,140],[310,96],[425,145],[295,195]],223);poly([[180,140],[295,195],[295,318],[180,264]],160,1.4);poly([[295,195],[425,145],[425,267],[295,318]],80,1.5)}
   if(kind==='cylinder'){for(let i=0;i<70;i++){let x=220+i*2;poly([[x,135],[x+2,135],[x+2,300],[x,300]],210-130*i/70,1.5)}ellipse(290,135,70,24,226,0);if(s>=2){c.beginPath();c.ellipse(290,300,70,24,0,0,PI);c.strokeStyle='#555';c.lineWidth=.6;c.stroke()}}
   if(kind==='cone'){poly([[290,95],[180,305],[390,305]],172,1.2);poly([[290,95],[307,319],[390,305]],77,1.1);if(s>=2){c.beginPath();c.ellipse(285,305,105,23,0,0,PI);c.strokeStyle='#777';c.stroke()}}
   if(s>=8){label('Halftone',120,190);label('Core / form shadow',365,238);label('Cast shadow',410,355)}
 }else if(kind==='onepoint'){
   const vp=[300,155];line([[35,155],[565,155]],170);label('Horizon / eye level',40,142);label('VP',308,147);
   for(const q of [[40,365],[560,365],[70,55],[530,55]])line([q,vp],s<3?185:115);
   for(let i=1;i<7;i++){let t=1-Math.pow(.65,i);const y=365+(155-365)*t;line([[40+260*t,y],[560-260*t,y]],160)}
   if(s>=3){poly([[70,55],[170,95],[170,260],[70,340]],185,1.5);poly([[430,95],[530,55],[530,340],[430,260]],100,1.5)}
   label('Parallel depth edges converge. Verticals remain vertical.',45,385);
 }else if(kind==='twopoint'){
   const l=[25,125],r=[575,125];line([l,r],180);label('VP 1',25,110);label('VP 2',540,110);
   poly([[300,90],[145,110],[145,208],[300,315]],190,1.5);poly([[300,90],[460,110],[460,204],[300,315]],105,1.5);
   if(s<=4)for(const q of [[300,90],[300,315]]){line([l,q,r],185,.5)}
   label('Use widely spaced vanishing points. Compare the angles.',45,365);
 }else if(kind==='mountains'){
   const far=ridge(168,45,1),near=ridge(195,75,3);poly([...far,[600,260],[0,260]],210,.8);poly([...near,[600,260],[0,260]],151,1.2);
   if(s>=3){for(let i=0;i<near.length-2;i+=4){let [x,y]=near[i];poly([[x,y],[x+20,y+45],[x+54,260],[x+5,260]],95+i%60,1.25)}}
   line([[0,260],[600,260]],120,.7);
   if(s>=3){c.save();c.beginPath();c.rect(0,260,600,140);c.clip();for(let i=0;i<1800;i++){let x=rand()*600,yy=265+rand()*125,j=Math.min(60,Math.floor(x/10)),height=(260-near[j][1])*.7;if(yy<260+height){line([[x,yy],[x+5+rand()*18,yy]],150+rand()*55,.4)}}c.restore()}
   if(s>=5){for(let i=0;i<16;i++)tree(i*42+rand()*20,263,12+rand()*24,70,true)}
   if(s>=7)for(let i=0;i<25;i++){let yy=270+rand()*90;line([[rand()*400,yy],[200+rand()*400,yy]],243,.8)}
 }else if(kind==='dunes'||kind==='oasis'){
   for(let j=0;j<4;j++){let pts=Array.from({length:61},(_,i)=>[i*10,135+j*62+Math.sin(i*.047+j*1.5)*34]);fillBelow(pts,220-j*20,0);let shadow=pts.map(([x,y])=>[x,y+(Math.sin(x*.005+j)+1)*22]);poly([...pts,...shadow.reverse()],145-j*19,.55)}
   if(s>=5)for(let i=0;i<90;i++){let y=300+i*.8;line([[0,y],[170,y+Math.sin(i*.04)*16],[280,y+25]],175+i*.3,.25)}
   if(kind==='oasis'){ellipse(280,304,145,20,175,0);for(const [x,y,h] of [[160,300,145],[440,310,120],[192,305,100]]){poly([[x-3,y],[x+8,y-h],[x+13,y-h],[x+6,y]],70,1.5);for(let i=0;i<9;i++){let a=i/9*PI*2;const pts=[[x+10,y-h],[x+10+Math.cos(a)*35,y-h+Math.sin(a)*18],[x+10+Math.cos(a)*65,y-h+30+Math.sin(a)*20]];line(pts,75,2);if(s>=5)for(let k=0;k<8;k++)line([[pts[1][0]+k*2,pts[1][1]+k],[pts[1][0]+k*2-9,pts[1][1]+k+14]],100,.5)}}}
 }else if(kind==='forest'){
   poly([[0,110],[600,110],[600,400],[0,400]],221,1.5);poly([[285,170],[310,170],[510,400],[65,400]],238,1);
   for(let i=0;i<27;i++){let x=rand()*600,h=70+rand()*240,y=190+(h-70)*.8;if(x>235&&x<360)continue;tree(x,y,h,190-h*.48)}
 }else if(kind==='cliffs'){
   poly([[0,210],[600,210],[600,400],[0,400]],223,0);poly([[0,75],[120,95],[165,145],[250,175],[240,270],[315,322],[125,380],[0,340]],140,1.5);poly([[120,95],[165,145],[250,175],[240,270],[315,322],[210,295]],73,1.4);
   if(s>=5)for(let i=0;i<240;i++){let x=250+rand()*350,y=220+rand()*170;line([[x,y],[x+10+rand()*45,y-3]],170+rand()*60,.5)}
   if(s>=7)for(let i=0;i<28;i++){let y=270+i*4;line([[320,y],[370,y-8],[440,y-5]],248,2)}
 }else if(kind==='clouds'){
   poly([[0,0],[600,0],[600,350],[0,350]],180,0);for(const [x,y,r] of [[210,220,60],[270,170,75],[350,205,60],[410,240,44]]){ellipse(x,y,r,r*.8,232);if(s>=5)ellipse(x+10,y+27,r*.8,r*.32,196,0)}
   if(s>=7)for(let i=0;i<40;i++)ellipse(180+rand()*230,150+rand()*45,10+rand()*20,8,242);
   fillBelow(ridge(351,10,3),110,0);
 }else if(kind==='tree'){
   ellipse(310,350,165,20,220,0);tree(280,347,260,95);if(s>=5)for(let i=0;i<80;i++){let x=275+rand()*22;line([[x,345-rand()*90],[x+rand()*6,260-rand()*55]],75,.6)}
 }else if(kind==='village'){
   fillBelow(ridge(153,30,1),220);fillBelow(ridge(240,53,3),190);poly([[260,270],[335,240],[390,266],[320,300]],75);poly([[260,270],[320,300],[320,349],[260,322]],200);poly([[320,300],[390,266],[390,318],[320,349]],130,1.5);poly([[335,313],[350,307],[350,336],[335,343]],50,1.5);tree(150,350,140,110);if(s>=5)for(let i=0;i<6;i++)line([[263,280+i*7],[317,307+i*7]],150,.5);
 }
 // Fine paper tooth: neutral marks, no coloured noise or changing random stages.
 if(s>=5){c.save();for(let i=0;i<6500;i++){const x=rand()*600,y=rand()*400;c.fillStyle=rand()>.5?'rgba(255,255,255,.12)':'rgba(45,43,37,.035)';c.fillRect(x,y,.4+rand(),.3+rand()*.6)}c.restore()}
 if(grid){c.save();c.setLineDash([3,5]);for(let x=60;x<600;x+=60)line([[x,0],[x,400]],150,.5);for(let y=40;y<400;y+=40)line([[0,y],[600,y]],150,.5);c.restore()}
}
