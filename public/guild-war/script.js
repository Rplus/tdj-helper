const url = 'https://opensheet.elk.sh/1QPm9o1Se4P_7bf3t01L9NYHWo7ROgbu6y51MTe4w1c8/data';

const box = document.getElementById('form-box');
const output = document.getElementById('output');

let data;
let o_types;

window.onload = async function (argument) {
  const gen_btn = document.getElementById('gen_btn');
  data = await fetch(url).then(r => r.json());
  o_types = [... new Set(data.map(i => i.name))]

  gen_btn.addEventListener('click', genForm);
  gen_btn.disabled = false;
  addDynamicStyle();

  genForm();

  document.getElementById('copy')?.addEventListener('click', () => {
    navigator.clipboard.writeText(output.value);
  });
}

function addDynamicStyle() {
  let style = document.createElement('style');
  style.textContent = o_types.map(i => `form[data-click="${i}"] .lineups label[data-type="${i}"] { display: flex;}`).join('');
  box.append(style);
}

function genForm() {
  if (document.querySelectorAll('form').length > 2) {
    return;
  }

  let uid = Math.random() + (+new Date());
  let types = o_types
    .map(i => `<label class="flex" data-type>
        <input data-click="types" type="radio"
          name="${uid}"
          value="${i}">
        <span>${i}</span>
      </label>`)
    .join('');

  let lineups = data
    .map(i => `<label data-type="${i.name}">
        <input type="radio" data-click="members"
          name="lineups-${uid}"
          value="${i.member}">
        <div class="member-content">${i.member.trim()}</div>
      </label>`)
    .join('');
  let form = document.createElement('form');

  form.addEventListener('input', (e) => {
    if ('types' !== e.target.dataset.click) {
      return;
    }
    form.dataset.click = e.target.value;
    form.style = `--click: '${e.target.value}'`;
  });

  form.addEventListener('change', genOutput);

  form.innerHTML = `
    <details open class="mb-1">
      <summary class="mb-1"></summary>
      <div class="flex ml-1 flex-wrap">
        <div class="flex-left">
          <strong>關卡</strong>
          <div>${types}</div>
        </div>
        <div class="ml-1">
          <strong>陣容</strong>
          <div class="lineups" data-type="">${lineups}</div>
        </div>
      </div>
    </details>`;

  box.append(form);
}

function genOutput() {
  let forms = [...document.querySelectorAll('form')];

  output.textContent = forms.map((form, index) => {
    let type = form.dataset.click;
    let value = form.querySelector(`label[data-type="${type}"] input[data-click="members"]:checked`)?.value || 'o.O?';
    return `#${index + 1} ${type}:\n\n${value}`;
  }).join('\n\n\n\n');
}
