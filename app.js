const data = {
  'aus-egy': {
    title:'Australia vs Egipto', teams:['Australia','Egipto'], index:[72,79], risk:'Riesgo medio',
    markets:[['Over 1.5 goles',76],['Over 2.5 goles',50],['Ambos marcan',47],['Over 6.5 córners',89],['Over 7.5 córners',77],['Egipto gana/clasifica',80],['Australia menos de 2 goles',85]],
    ranking:[['Over 6.5 córners','Volumen combinado fuerte de córners',89],['Australia menos de 2 goles','Australia genera poco xG ofensivo',85],['Egipto gana/clasifica','Mejor producción ofensiva reciente',80],['Over 1.5 goles','Línea más segura que Over 2.5',76]],
    stats:[['xG promedio','0.69','1.64'],['Tiros','8.7','15.3'],['Tiros a puerta','3.7','4.7'],['Córners','4.0','4.0'],['Goles por partido','0.67','1.67']]
  },
  'arg-cpv': {
    title:'Argentina vs Cabo Verde', teams:['Argentina','Cabo Verde'], index:[94,67], risk:'Riesgo bajo',
    markets:[['Argentina clasifica',95],['Argentina gana',91],['Over 1.5 goles',88],['Argentina 2+ goles',86],['Cabo Verde menos de 1.5 goles',91],['Argentina +5 tiros a puerta',93],['Argentina más córners',84]],
    ranking:[['Argentina clasifica','Superioridad clara del modelo',95],['Argentina +5 tiros a puerta','Promedia 5.0 tiros a puerta',93],['Cabo Verde menos de 1.5 goles','Baja producción ofensiva rival',91],['Over 1.5 goles','Argentina puede cubrir casi sola',88]],
    stats:[['xG promedio','1.99','0.82'],['Tiros a puerta','5.0','2.3'],['Goles por partido','2.67','0.67'],['Posesión','58.3%','37.3%'],['Porterías a cero','2','2']]
  },
  'col-gha': {
    title:'Colombia vs Ghana', teams:['Colombia','Ghana'], index:[90,62], risk:'Riesgo bajo/medio',
    markets:[['Colombia clasifica',92],['Colombia gana',73],['Ghana menos de 1.5 goles',91],['Colombia +4 tiros a puerta',88],['Colombia +5 tiros totales',96],['Colombia +4 córners',82],['Menos de 3.5 goles',76]],
    ranking:[['Colombia +5 tiros totales','Volumen ofensivo muy superior',96],['Colombia clasifica','Ventaja global del modelo',92],['Ghana menos de 1.5 goles','Ghana genera poco ataque',91],['Colombia +4 tiros a puerta','Promedia 6.3 tiros a puerta',88]],
    stats:[['xG promedio','1.43','0.69'],['Tiros','19.7','5.0'],['Tiros a puerta','6.3','1.3'],['Posesión','60%','35.3%'],['Goles recibidos','0.3','0.7']]
  }
};

function render(key){
  const m=data[key];
  document.getElementById('matchTitle').textContent=m.title;
  document.getElementById('teamAName').textContent=m.teams[0];
  document.getElementById('teamBName').textContent=m.teams[1];
  document.getElementById('teamAIndex').textContent=`Índice ${m.index[0]}/100`;
  document.getElementById('teamBIndex').textContent=`Índice ${m.index[1]}/100`;
  document.getElementById('riskBadge').textContent=m.risk;
  document.getElementById('markets').innerHTML=m.markets.map(([name,p])=>`<div class="market"><div class="market-head"><strong>${name}</strong><span>${p}%</span></div><div class="bar"><div class="fill" style="width:${p}%"></div></div></div>`).join('');
  document.getElementById('ranking').innerHTML=m.ranking.map(([name,sub,p],i)=>`<li><span class="rank-num">${i+1}</span><div><div class="pick-title">${name}</div><div class="pick-sub">${sub}</div></div><span class="prob">${p}%</span></li>`).join('');
  document.getElementById('statsTable').innerHTML=`<div class="stat-row"><span>Variable</span><strong>${m.teams[0]}</strong><strong>${m.teams[1]}</strong></div>`+m.stats.map(r=>`<div class="stat-row"><span>${r[0]}</span><strong>${r[1]}</strong><strong>${r[2]}</strong></div>`).join('');
}

document.getElementById('matchSelect').addEventListener('change', e=>render(e.target.value));
document.getElementById('calcBtn').addEventListener('click',()=>{
  const p=Number(document.getElementById('probInput').value)/100;
  const o=Number(document.getElementById('oddsInput').value);
  const ev=(p*o-1)*100;
  document.getElementById('evResult').textContent=`EV: ${ev>=0?'+':''}${ev.toFixed(1)}% — ${ev>0?'Value Bet':'No apostar'}`;
  document.getElementById('evResult').style.color=ev>0?'#34d399':'#fb7185';
});
render('aus-egy');

if('serviceWorker' in navigator){navigator.serviceWorker.register('./service-worker.js');}
let deferredPrompt; const installBtn=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', e=>{e.preventDefault(); deferredPrompt=e; installBtn.classList.remove('hidden');});
installBtn.addEventListener('click', async()=>{if(deferredPrompt){deferredPrompt.prompt(); deferredPrompt=null; installBtn.classList.add('hidden');}});
