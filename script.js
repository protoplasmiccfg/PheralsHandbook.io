const tabs=document.querySelectorAll('.tab-button');
const contents=document.querySelectorAll('.tab-content');
tabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    contents.forEach(c=>c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Tooltip
const tooltip=document.getElementById('tooltip');
document.querySelectorAll('.info').forEach(el=>{
  el.addEventListener('mouseenter',e=>{
    tooltip.innerText=e.target.dataset.full;
    tooltip.style.display='block';
  });
  el.addEventListener('mousemove',e=>{
    tooltip.style.top=e.pageY+15+'px';
    tooltip.style.left=e.pageX+15+'px';
  });
  el.addEventListener('mouseleave',()=>{tooltip.style.display='none';});
});

// MC Transformer Winding Calculator
document.getElementById('calcWinding').addEventListener('click',()=>{
  const maxTurns = 240;
  let V1 = parseFloat(document.getElementById('vPrimary').value);
  let V2 = parseFloat(document.getElementById('vSecondary').value);

  if(V1 <= 0 || V2 <= 0){
    document.getElementById('windingResult').innerText = "Enter valid voltages!";
    return;
  }

  let N_primary = Math.round((V1/(V1+V2)) * maxTurns);
  let N_secondary = maxTurns - N_primary;

  document.getElementById('windingResult').innerText = 
    `Primary Winding: ${N_primary} turns, Secondary Winding: ${N_secondary} turns (Total: ${N_primary + N_secondary})`;
});