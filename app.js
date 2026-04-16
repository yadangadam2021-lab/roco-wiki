/* NAV */
document.querySelectorAll('.nav-tab').forEach(t=>{t.onclick=()=>{document.querySelectorAll('.nav-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');const v=t.dataset.t;document.querySelectorAll('.section').forEach(s=>{s.style.display=(v==='all'||s.dataset.s===v)?'':'none';});}});
/* SEARCH */
document.getElementById('searchInput').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll('.grid-item').forEach(i=>{const l=i.querySelector('.item-label').textContent.toLowerCase();i.style.display=(!q||l.includes(q))?'':'none';});if(q){document.querySelectorAll('.nav-tab')[0].click();}});
/* PANEL */
function openPanel(type){document.getElementById('overlay').classList.add('show');document.getElementById('panel').classList.add('show');document.body.style.overflow='hidden';const title=document.getElementById('panelTitle');const body=document.getElementById('panelBody');
switch(type){
case 'spirits':title.textContent='\u{1F4D6} 精灵图鉴';body.innerHTML=buildSpirits();initSpiritTable();break;
case 'matchup':title.textContent='\u{1F504} 属性克制表';body.innerHTML=buildMatchup();break;
case 'nature':title.textContent='\u{1F60A} 性格修正表';body.innerHTML=buildNature();break;
case 'calc':title.textContent='\u{1F9EE} 能力值计算器';body.innerHTML=buildCalc();initCalc();break;
case 'ability':title.textContent='\u2B50 精灵特性';body.innerHTML=buildAbility();break;
case 'classify':title.textContent='\u{1F4C2} 精灵分类';body.innerHTML=buildClassify();break;
case 'terms':title.textContent='\u{1F4AC} 技能名词';body.innerHTML=buildTerms();break;
default:title.textContent='\u{1F4CC} 功能';body.innerHTML='<p style="color:#888;text-align:center;padding:40px 0">\u{1F6A7} 该功能开发中，敬请期待…</p>';}}
function closePanel(){document.getElementById('overlay').classList.remove('show');document.getElementById('panel').classList.remove('show');document.body.style.overflow='';}

/* SPIRITS */
function buildSpirits(){
let to=TYPES.map(t=>'<option value="'+t+'">'+t+'</option>').join('');
let h='<div class="filter-bar"><input type="text" id="spS" placeholder="搜索精灵…"><select id="spT"><option value="">全部属性</option>'+to+'</select><select id="spR"><option value="">全部稀有度</option><option>普通</option><option>稀有</option><option>史诗</option><option>传说</option></select></div>';
h+='<div style="overflow-x:auto"><table class="data-table" id="spTb"><thead><tr><th data-k="id">ID\u21C5</th><th data-k="name">名称\u21C5</th><th data-k="type">属性</th><th data-k="rarity">稀有度</th><th data-k="hp">HP\u21C5</th><th data-k="atk">攻击\u21C5</th><th data-k="def">防御\u21C5</th><th data-k="spa">特攻\u21C5</th><th data-k="spd">特防\u21C5</th><th data-k="spe">速度\u21C5</th><th data-k="total">种族值\u21C5</th><th>进化链</th></tr></thead><tbody id="spB"></tbody></table></div>';
return h;}
function renderSP(list){
const sb=(v,mx)=>'<span>'+v+'</span><span class="stat-bar" style="width:'+Math.round(v/mx*60)+'px;background:'+(v>=90?'#4CAF50':v>=60?'#FFB300':v>=40?'#FF9800':'#e57373')+'"></span>';
document.getElementById('spB').innerHTML=list.map(s=>{
const t=s.hp+s.atk+s.def+s.spa+s.spd+s.spe;
return '<tr><td>'+s.id+'</td><td><b>'+s.name+'</b><br><small style="color:#aaa">'+s.desc+'</small></td><td><span class="type-badge" style="background:'+TC[s.type]+'">'+s.type+'</span></td><td><span class="rarity-badge" style="background:'+(RC[s.rarity]||'#aaa')+'">'+s.rarity+'</span></td><td>'+sb(s.hp,150)+'</td><td>'+sb(s.atk,150)+'</td><td>'+sb(s.def,150)+'</td><td>'+sb(s.spa,150)+'</td><td>'+sb(s.spd,150)+'</td><td>'+sb(s.spe,150)+'</td><td><b style="color:var(--p)">'+t+'</b></td><td style="font-size:11px">'+s.evo+'</td></tr>';}).join('');}
let sk='id',sa=true;
function initSpiritTable(){renderSP(SP);
document.querySelectorAll('#spTb th[data-k]').forEach(th=>{th.onclick=()=>{const k=th.dataset.k;if(sk===k)sa=!sa;else{sk=k;sa=true;}filterSP();};});
document.getElementById('spS').addEventListener('input',filterSP);
document.getElementById('spT').addEventListener('change',filterSP);
document.getElementById('spR').addEventListener('change',filterSP);}
function filterSP(){
const q=(document.getElementById('spS').value||'').toLowerCase();
const tp=document.getElementById('spT').value;
const ra=document.getElementById('spR').value;
let l=SP.filter(s=>{if(q&&!s.name.toLowerCase().includes(q))return false;if(tp&&s.type!==tp)return false;if(ra&&s.rarity!==ra)return false;return true;});
l.sort((a,b)=>{let va=sk==='name'?a.name:sk==='total'?(a.hp+a.atk+a.def+a.spa+a.spd+a.spe):a[sk];let vb=sk==='name'?b.name:sk==='total'?(b.hp+b.atk+b.def+b.spa+b.spd+b.spe):b[sk];if(typeof va==='string')return sa?va.localeCompare(vb):vb.localeCompare(va);return sa?va-vb:vb-va;});
renderSP(l);}

/* MATCHUP */
function buildMatchup(){
let h='<p style="margin-bottom:12px;font-size:13px;color:#888">行=攻击方，列=防守方 | <span style="background:#4CAF50;color:#fff;padding:1px 6px;border-radius:4px;font-size:11px">2x 效果拔群</span> <span style="background:#e57373;color:#fff;padding:1px 6px;border-radius:4px;font-size:11px">0.5x 效果一般</span> <span style="background:#424242;color:#fff;padding:1px 6px;border-radius:4px;font-size:11px">0x 无效</span></p>';
h+='<div class="matchup-wrap"><table class="matchup-table"><thead><tr><th class="rh">攻\\防</th>';
TYPES.forEach(t=>{h+='<th><span class="type-badge" style="background:'+TC[t]+';font-size:10px">'+t+'</span></th>';});
h+='</tr></thead><tbody>';
TYPES.forEach((t,i)=>{h+='<tr><td class="rh"><span class="type-badge" style="background:'+TC[t]+';font-size:10px">'+t+'</span></td>';
MATCHUP[i].forEach(v=>{let c=v===2?'ms':v===0.5?'mw':v===0?'mi':'';h+='<td class="'+c+'">'+(v===1?'':v===0?'\u2715':v+'x')+'</td>';});h+='</tr>';});
h+='</tbody></table></div>';return h;}

/* NATURE */
function buildNature(){
let h='<p style="margin-bottom:12px;font-size:13px;color:#888">性格影响精灵能力值，+10% 增益 / -10% 减益</p>';
h+='<table class="nature-table"><thead><tr><th>性格</th><th>增益 (+10%)</th><th>减益 (-10%)</th></tr></thead><tbody>';
NATURES.forEach(n=>{const ne=n.p==='-';h+='<tr><td><b>'+n.n+'</b></td><td>'+(ne?'<span style="color:#ccc">\u2014</span>':'<span class="plus">\u2191 '+n.p+'</span>')+'</td><td>'+(ne?'<span style="color:#ccc">\u2014</span>':'<span class="minus">\u2193 '+n.m+'</span>')+'</td></tr>';});
h+='</tbody></table>';return h;}

/* CALC */
function buildCalc(){
let no=NATURES.map(n=>'<option value="'+n.n+'">'+n.n+(n.p!=='-'?' (+'+n.p+' -'+n.m+')':'')+'</option>').join('');
let h='<p style="margin-bottom:14px;font-size:13px;color:#888">输入种族值、个体值(IV)、努力值(EV)，实时计算能力值</p>';
h+='<div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;flex-wrap:wrap"><label style="width:50px;font-size:13px;font-weight:600">性格</label><select class="calc-select" id="cN">'+no+'</select></div>';
h+='<div style="display:flex;gap:10px;align-items:center;margin-bottom:10px"><label style="width:50px;font-size:13px;font-weight:600">等级</label><input class="calc-input" id="cL" type="number" value="100" min="1" max="100"></div>';
h+='<div style="margin-top:10px;border-top:1px solid #f0f0f0;padding-top:14px">';
h+='<div style="display:grid;grid-template-columns:50px 65px 55px 65px 50px 1fr;gap:6px;align-items:center;font-size:12px;font-weight:600;color:#aaa;margin-bottom:6px"><span></span><span>种族值</span><span>IV</span><span>EV</span><span>结果</span><span></span></div>';
['hp','atk','def','spa','spd','spe'].forEach((k,i)=>{
const nm=['HP','攻击','防御','特攻','特防','速度'][i];
h+='<div style="display:grid;grid-template-columns:50px 65px 55px 65px 50px 1fr;gap:6px;align-items:center;margin-bottom:8px">';
h+='<label style="font-size:13px;font-weight:600">'+nm+'</label>';
h+='<input class="calc-input" id="cB_'+k+'" type="number" value="80" min="1" max="255">';
h+='<input class="calc-input" id="cI_'+k+'" type="number" value="31" min="0" max="31">';
h+='<input class="calc-input" id="cE_'+k+'" type="number" value="0" min="0" max="252">';
h+='<span class="calc-result" id="cR_'+k+'">-</span>';
h+='<div class="calc-bar"><div class="calc-bar-fill" id="cBar_'+k+'" style="width:0;background:var(--p)"></div></div></div>';});
h+='</div><div style="margin-top:10px;text-align:right;color:#aaa;font-size:12px">EV总计: <b id="cEvT" style="color:var(--p)">0</b> / 510</div>';
return h;}
function initCalc(){
const ids=['hp','atk','def','spa','spd','spe'];
const nm={'攻击':'atk','防御':'def','特攻':'spa','特防':'spd','速度':'spe'};
function calc(){const lv=parseInt(document.getElementById('cL').value)||100;
const nat=NATURES.find(n=>n.n===document.getElementById('cN').value)||NATURES[20];
let ev=0;ids.forEach(k=>{const b=parseInt(document.getElementById('cB_'+k).value)||0;
const iv=parseInt(document.getElementById('cI_'+k).value)||0;
const e=parseInt(document.getElementById('cE_'+k).value)||0;ev+=e;
let r;if(k==='hp'){r=Math.floor((b*2+iv+Math.floor(e/4))*lv/100)+lv+10;}
else{r=Math.floor(((b*2+iv+Math.floor(e/4))*lv/100+5));if(nat.p!=='-'){if(nm[nat.p]===k)r=Math.floor(r*1.1);if(nm[nat.m]===k)r=Math.floor(r*0.9);}}
document.getElementById('cR_'+k).textContent=r;
const p=Math.min(100,Math.round(r/500*100));
const bar=document.getElementById('cBar_'+k);
bar.style.width=p+'%';bar.style.background=r>=300?'#4CAF50':r>=200?'#FFB300':r>=100?'#FF9800':'#e57373';});
document.getElementById('cEvT').textContent=ev;
document.getElementById('cEvT').style.color=ev>510?'#e57373':'var(--p)';}
document.querySelectorAll('#panel input,#panel select').forEach(el=>{el.addEventListener('input',calc);el.addEventListener('change',calc);});calc();}

/* ABILITY */
function buildAbility(){
const data=[
{name:"猛火",desc:"HP低于1/3时，火系技能威力提升50%",types:"火系精灵常见特性"},
{name:"激流",desc:"HP低于1/3时，水系技能威力提升50%",types:"水系精灵常见特性"},
{name:"茂盛",desc:"HP低于1/3时，草系技能威力提升50%",types:"草系精灵常见特性"},
{name:"静电",desc:"接触攻击时有30%概率使对方麻痹",types:"电系精灵常见特性"},
{name:"威吓",desc:"登场时降低对方攻击一个等级",types:"音速犬、暗影狼等"},
{name:"飘浮",desc:"免疫地面系技能",types:"幽灵猫、光明鸟等"},
{name:"坚硬",desc:"受到的物理伤害减少10%",types:"岩甲兽、机械蛙等"},
{name:"迅捷",desc:"速度提升20%",types:"雷电鼠、风暴战鹰等"},
{name:"再生",desc:"每回合恢复1/16最大HP",types:"草头大眼、瑞琪等"},
{name:"龙鳞",desc:"受到攻击时有10%概率提升防御",types:"龙仔、阿布等"},
{name:"圣光",desc:"光系技能威力额外提升20%",types:"迪莫、光明鸟"},
{name:"暗袭",desc:"暗影系技能有额外10%暴击率",types:"罗隐、暗影狼"},
];
let h='<p style="margin-bottom:14px;font-size:13px;color:#888">精灵特性在战斗中提供被动效果，不同精灵拥有不同特性</p>';
h+='<table class="nature-table"><thead><tr><th>特性名</th><th>效果</th><th>常见精灵</th></tr></thead><tbody>';
data.forEach(d=>{h+='<tr><td><b style="color:var(--p)">'+d.name+'</b></td><td style="text-align:left">'+d.desc+'</td><td style="font-size:12px;color:#888">'+d.types+'</td></tr>';});
h+='</tbody></table>';return h;}

/* CLASSIFY */
function buildClassify(){
let h='<p style="margin-bottom:14px;font-size:13px;color:#888">按属性分类查看精灵</p>';
TYPES.forEach(t=>{
const list=SP.filter(s=>s.type===t);
if(list.length===0)return;
h+='<div style="margin-bottom:16px"><div style="margin-bottom:8px"><span class="type-badge" style="background:'+TC[t]+';font-size:13px;padding:4px 12px">'+t+'系</span> <span style="color:#aaa;font-size:12px">'+list.length+'只</span></div>';
h+='<div style="display:flex;flex-wrap:wrap;gap:6px">';
list.forEach(s=>{h+='<span style="display:inline-block;padding:4px 10px;background:#f8f4f0;border-radius:8px;font-size:12px"><b>'+s.name+'</b> <span class="rarity-badge" style="background:'+(RC[s.rarity]||'#aaa')+';font-size:10px;padding:1px 5px">'+s.rarity+'</span></span>';});
h+='</div></div>';});
return h;}

/* TERMS */
function buildTerms(){
const data=[
{term:"先制技能",desc:"优先度+1或更高的技能，无视速度先行动，如电光一闪、神速等"},
{term:"属性一致加成(STAB)",desc:"使用与自身属性相同的技能时，威力额外×1.5"},
{term:"效果拔群",desc:"属性克制时伤害×2，双重克制时×4"},
{term:"效果一般",desc:"属性被抵抗时伤害×0.5，双重抵抗时×0.25"},
{term:"暴击",desc:"伤害×1.5，忽略对方增益和己方减益。基础暴击率为1/24"},
{term:"命中率/闪避率",desc:"技能命中率×(己方命中等级/对方闪避等级)，决定技能是否命中"},
{term:"PP(技能点数)",desc:"每个技能可使用的次数，PP耗尽则无法使用该技能"},
{term:"物理/特殊/变化",desc:"物理技能看攻击/防御，特殊技能看特攻/特防，变化技能无直接伤害"},
{term:"天气效果",desc:"晴天增强火系削弱水系，雨天反之。沙暴伤害非岩/土/钢，冰雹伤害非冰系"},
{term:"能力等级",desc:"每个能力可在-6~+6之间变化，+1约提升50%，-1约降低33%"},
{term:"替身",desc:"消耗1/4最大HP创造替身，替身存在时替主人承受伤害"},
{term:"强制换人",desc:"吼叫、龙卷风等技能强制对方更换精灵"},
];
let h='<p style="margin-bottom:14px;font-size:13px;color:#888">战斗系统核心术语解释</p>';
data.forEach(d=>{h+='<div style="margin-bottom:12px;padding:12px;background:#f8f4f0;border-radius:10px"><b style="color:var(--p)">'+d.term+'</b><p style="margin-top:4px;font-size:13px;color:#666;line-height:1.5">'+d.desc+'</p></div>';});
return h;}
