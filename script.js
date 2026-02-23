// =======================
// TAB SYSTEM
// =======================
const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});


// =======================
// TOOLTIP SYSTEM
// =======================
const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.info').forEach(el => {
  el.addEventListener('mouseenter', e => {
    tooltip.innerText = e.target.dataset.full;
    tooltip.style.display = 'block';
  });

  el.addEventListener('mousemove', e => {
    tooltip.style.top = e.pageY + 15 + 'px';
    tooltip.style.left = e.pageX + 15 + 'px';
  });

  el.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});


// =======================
// MC TRANSFORMER CALCULATOR
// =======================
const calcBtn = document.getElementById('calcWinding');

if (calcBtn) {
  calcBtn.addEventListener('click', () => {
    const maxTurns = 240;

    let V1 = parseFloat(document.getElementById('vPrimary').value);
    let V2 = parseFloat(document.getElementById('vSecondary').value);

    if (V1 <= 0 || V2 <= 0 || isNaN(V1) || isNaN(V2)) {
      document.getElementById('windingResult').innerText = "Enter valid voltages!";
      return;
    }

    let ratio = V1 / V2;

    let N_primary = Math.round((ratio / (1 + ratio)) * maxTurns);
    let N_secondary = maxTurns - N_primary;

    document.getElementById('windingResult').innerText =
      `Primary Winding: ${N_primary} turns, Secondary Winding: ${N_secondary} turns (Total: ${N_primary + N_secondary})`;
  });
}


// =======================
// SAFETY CHECKLIST SYSTEM
// =======================

function evaluateGroup(groupName, statusId, safeText, unsafeText) {

  const group = document.querySelector(`.checklist[data-group="${groupName}"]`);
  if (!group) return;

  const requiredCheckboxes = group.querySelectorAll('input[data-required="true"]');
  const statusBox = document.getElementById(statusId);

  let allRequiredChecked = true;

  requiredCheckboxes.forEach(cb => {
    if (!cb.checked) {
      allRequiredChecked = false;
    }
  });

  if (allRequiredChecked) {
    statusBox.classList.remove('unsafe');
    statusBox.classList.add('safe');
    statusBox.innerText = safeText;
  } else {
    statusBox.classList.remove('safe');
    statusBox.classList.add('unsafe');
    statusBox.innerText = unsafeText;
  }
}


// Attach listeners to ALL checklist checkboxes
document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {

    evaluateGroup(
      "substation",
      "substationStatus",
      "SAFE TO WORK",
      "NOT SAFE TO WORK"
    );

    evaluateGroup(
      "eicr",
      "eicrStatus",
      "SAFE TO CERTIFY",
      "NOT SAFE TO CERTIFY"
    );

  });
});


// =======================
// INITIAL STATUS CHECK ON LOAD
// =======================
window.addEventListener('DOMContentLoaded', () => {

  evaluateGroup(
    "substation",
    "substationStatus",
    "SAFE TO WORK",
    "NOT SAFE TO WORK"
  );

  evaluateGroup(
    "eicr",
    "eicrStatus",
    "SAFE TO CERTIFY",
    "NOT SAFE TO CERTIFY"
  );

});
