// ─── shared.js ─────────────────────────────────────────────────────────────
const PROVINCE_DATA = {
    "北京":  { coal:458.71,  gas:3.50, elec:0.7925, water:9.00,  oxy:520, steam:240, salary:218312, oil:4200 },
    "天津":  { coal:714.59,  gas:3.20, elec:0.8491, water:8.00,  oxy:520, steam:220, salary:138007, oil:3800 },
    "河北":  { coal:638.71,  gas:2.80, elec:0.5925, water:6.00,  oxy:540, steam:180, salary:94818,  oil:3600 },
    "山西":  { coal:580.80,  gas:2.60, elec:0.5564, water:5.50,  oxy:375, steam:180, salary:95025,  oil:3500 },
    "内蒙古":{ coal:527.00,  gas:2.40, elec:0.3580, water:4.65,  oxy:350, steam:170, salary:108856, oil:3400 },
    "辽宁":  { coal:880.00,  gas:2.90, elec:0.6586, water:5.00,  oxy:410, steam:190, salary:97330,  oil:3700 },
    "吉林":  { coal:566.58,  gas:2.70, elec:0.8110, water:4.25,  oxy:400, steam:190, salary:94937,  oil:3500 },
    "黑龙江":{ coal:594.00,  gas:2.65, elec:0.7452, water:3.75,  oxy:415, steam:180, salary:95750,  oil:3500 },
    "上海":  { coal:733.23,  gas:3.80, elec:1.0049, water:8.00,  oxy:525, steam:255, salary:229337, oil:4500 },
    "江苏":  { coal:527.86,  gas:3.10, elec:0.4362, water:6.00,  oxy:475, steam:200, salary:125102, oil:3900 },
    "浙江":  { coal:912.59,  gas:3.50, elec:0.8775, water:6.50,  oxy:525, steam:210, salary:133045, oil:4100 },
    "安徽":  { coal:665.70,  gas:3.00, elec:0.7940, water:5.00,  oxy:510, steam:200, salary:103688, oil:3700 },
    "福建":  { coal:523.72,  gas:3.20, elec:0.7480, water:5.50,  oxy:400, steam:210, salary:108520, oil:3800 },
    "江西":  { coal:649.77,  gas:2.90, elec:0.7207, water:4.25,  oxy:475, steam:190, salary:92794,  oil:3700 },
    "山东":  { coal:739.33,  gas:2.95, elec:0.5405, water:6.00,  oxy:435, steam:190, salary:107131, oil:3700 },
    "河南":  { coal:720.00,  gas:2.80, elec:0.6340, water:5.00,  oxy:360, steam:190, salary:84156,  oil:3600 },
    "湖北":  { coal:577.65,  gas:2.85, elec:0.9157, water:4.65,  oxy:430, steam:200, salary:109227, oil:3700 },
    "湖南":  { coal:602.28,  gas:2.85, elec:0.9222, water:4.25,  oxy:425, steam:190, salary:97015,  oil:3700 },
    "广东":  { coal:547.87,  gas:3.40, elec:0.9753, water:6.50,  oxy:395, steam:220, salary:131418, oil:4200 },
    "广西":  { coal:707.02,  gas:3.00, elec:0.9145, water:6.00,  oxy:475, steam:210, salary:96184,  oil:3800 },
    "海南":  { coal:507.00,  gas:3.30, elec:0.9759, water:5.50,  oxy:422, steam:240, salary:114572, oil:4000 },
    "重庆":  { coal:572.42,  gas:2.70, elec:0.9366, water:5.00,  oxy:325, steam:200, salary:113653, oil:3600 },
    "四川":  { coal:831.11,  gas:2.50, elec:0.7533, water:4.25,  oxy:225, steam:190, salary:110160, oil:3500 },
    "贵州":  { coal:663.49,  gas:2.80, elec:0.7513, water:4.65,  oxy:350, steam:180, salary:102010, oil:3600 },
    "云南":  { coal:446.17,  gas:2.60, elec:0.5269, water:4.25,  oxy:350, steam:170, salary:106769, oil:3500 },
    "西藏":  { coal:488.40,  gas:3.00, elec:0.7051, water:3.25,  oxy:422, steam:275, salary:165004, oil:3800 },
    "陕西":  { coal:595.30,  gas:2.55, elec:0.6946, water:5.50,  oxy:360, steam:180, salary:106969, oil:3500 },
    "甘肃":  { coal:482.87,  gas:2.40, elec:0.3843, water:5.00,  oxy:375, steam:190, salary:99124,  oil:3400 },
    "青海":  { coal:357.42,  gas:2.30, elec:0.4546, water:3.75,  oxy:390, steam:180, salary:121457, oil:3300 },
    "宁夏":  { coal:574.20,  gas:2.35, elec:0.3363, water:5.50,  oxy:370, steam:170, salary:117681, oil:3300 },
    "新疆":  { coal:165.00,  gas:1.80, elec:0.4095, water:4.50,  oxy:530, steam:160, salary:112305, oil:3000 }
};
const PIE_COLORS = ['#1a5fb4','#26a269','#e66100','#813d9c','#1c71d8','#2ec27e','#ff7800','#9141ac','#0077c2','#57ba98','#c01c28','#e5a50a'];
function calcCRF(r_pct,n){const r=r_pct/100;if(r===0)return 1/n;return(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);}
function g(id){return parseFloat(document.getElementById(id).value)||0;}
function setVal(id,val){const el=document.getElementById(id);if(el)el.value=val;}
function renderPieChart(canvasId,legendId,items,total){
    const ctx=document.getElementById(canvasId).getContext('2d');
    if(window._pieChart)window._pieChart.destroy();
    window._pieChart=new Chart(ctx,{type:'doughnut',data:{labels:items.map(d=>d.name),datasets:[{data:items.map(d=>d.value),backgroundColor:items.map(d=>d.color),borderColor:'#fff',borderWidth:2,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:true,cutout:'55%',plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>{const pct=(ctx.parsed/total*100).toFixed(1);return` ${ctx.label}：${ctx.parsed.toFixed(3)} 元/kg（${pct}%）`;}}}}}}); 
    document.getElementById(legendId).innerHTML=items.map(d=>{const pct=(d.value/total*100).toFixed(1);return`<div class="legend-item"><div class="legend-dot" style="background:${d.color}"></div><span class="legend-name">${d.name}</span><span class="legend-pct">${pct}%</span><span class="legend-val">${d.value.toFixed(3)} 元/kg</span></div>`;}).join('');
}
function showResult(lcoh,variable,capexKg,fixedKg,items){
    document.getElementById('result-lcoh').textContent=lcoh.toFixed(2);
    document.getElementById('result-variable').textContent=variable.toFixed(3)+' 元/kg';
    document.getElementById('result-capex').textContent=capexKg.toFixed(3)+' 元/kg';
    document.getElementById('result-fixed').textContent=fixedKg.toFixed(3)+' 元/kg';
    document.getElementById('result-section').classList.add('visible');
    renderPieChart('costPieChart','chart-legend',items.filter(d=>d.value>0),lcoh);
    setTimeout(()=>document.getElementById('result-section').scrollIntoView({behavior:'smooth',block:'start'}),100);
}
