// const url = 'https://opensheet.elk.sh/1QPm9o1Se4P_7bf3t01L9NYHWo7ROgbu6y51MTe4w1c8/data';

const raw_data = [{"name":"魔羊掛角","member":"靈鼩 —— —— 寧采臣\n— 相桓子 —— 劍聖\n— —— 李盈鳳 ——"},{"name":"魔羊掛角","member":"劍平 —— —— 燕明蓉\n— 鮮于超 — 封寒月\n— —— 紫楓 ——"},{"name":"魔羊掛角","member":"殷劍平 —— —— 封寒月\n— 夏侯儀 —— 璇璣 —\n— ——— 葛雲衣 ——"},{"name":"魔羊掛角","member":"雲衣宮主 —— —— 司徒纓\n— 靈鼩 ——— 諸葛艾\n— —— 古倫德 ——"},{"name":"魔羊掛角","member":"璇璣 —— —— 葛雲衣\n— 封寒月 —— 曹沁\n— —— 夏侯儀 ——"},{"name":"魔羊掛角","member":"奚歌 —— —— 赤練\n— 劍邪 —— 林月如\n— —— 曹沁 ——"},{"name":"舊城迷陣","member":"召祐 鮮于超 —\n—— —— 鄲陰\n黎幽 —— 玄羽"},{"name":"舊城迷陣","member":"任斷離 玄羽 ——\n——— —— 九陰\n上官遠 —— 高皇君"},{"name":"舊城迷陣","member":"靈鼩 奚歌 ——\n—— —— 曹沁\n赤練 —— 林月如"},{"name":"舊城迷陣","member":"冰璃 — 陰歙 —\n——— —— 陽寰\n夏侯儀 —— 霍雍"},{"name":"舊城迷陣","member":"古倫德 阿良 ——\n——— —— 璇璣\n燕明蓉 —— 葛雲衣"},{"name":"險境勘探","member":"殷劍平 冰璃 夏侯儀 依依 葛雲衣"},{"name":"險境勘探","member":"太師 封寒月 夏侯儀 銀瑪 冰璃"},{"name":"險境勘探","member":"應奉仁 劍邪 殷劍平 高皇君 殷無邪"},{"name":"險境勘探","member":"于小雪 陰歙 趙靈兒 冰璃 封寒月"},{"name":"險境勘探","member":"韓千秀 春蘭 雲襄 殷劍平 舞蝶"},{"name":"險境勘探","member":"葛雲衣 冰璃 夏侯儀 璇璣 依依"},{"name":"險境勘探","member":"璇璣 夏侯儀 冰璃 依依 葛雲衣"},{"name":"惡魔試煉","member":"—— 阿良 夏侯儀\n殷劍平 — BOSS\n—— 冰璃 璇璣"},{"name":"惡魔試煉","member":"—— 劍邪 高戚\n鄲陰 — BOSS\n—— 方芸 韓無砂"},{"name":"惡魔試煉","member":"—— 聶小倩 雲衣宮主\n雲襄 — BOSS\n—— 霍雍 魔夏"},{"name":"惡魔試煉","member":"—— 殷劍平 曹沁\n依依 — BOSS\n—— 阿良 冰璃"},{"name":"惡魔試煉","member":"—— 燕赤霞 九陰\n林月如 — BOSS\n—— 方芸 紫楓"},{"name":"突擊連環","member":"阿良 無邪 依依 黎幽 虞兮"},{"name":"突擊連環","member":"任斷離 方芸 銀瑪 奚歌 劍聖"},{"name":"突擊連環","member":"葛雲衣 曹沁 依依 夏侯儀 韓無砂"},{"name":"突擊連環","member":"冰璃 阿良 韓無砂 夏侯儀 曹沁"},{"name":"突擊連環","member":"璇璣 阿良 劍平 夏侯儀 依依"},{"name":"突擊連環","member":"曹沁 韓無砂 葛雲衣 封寒月 阿良"},{"name":"江湖紛爭","member":"璇璣 古倫德 封鈴笙 冰璃 夏侯儀"},{"name":"江湖紛爭","member":"紫蘊 高皇君 朱繯 葛雲衣 白莞"},{"name":"江湖紛爭","member":"寧采臣 燕赤霞 韓無砂 聶小倩 朧妖"},{"name":"江湖紛爭","member":"趙靈兒 李逍遙 太師 林月如 于小雪"},{"name":"江湖紛爭","member":"諸葛艾 沒錯 虞兮 李逍遙 封鈴笙"},{"name":"江湖紛爭","member":"封鈴笙 雲衣宮主 秦惟剛 春蘭 燕明蓉"},{"name":"古神祈願","member":"—— 諸葛艾 ——\n紫蘊 ——— 朱繯\n葛雲衣 —— 高皇君"},{"name":"古神祈願","member":"—— 阿良 ——\n冰璃 —— 璇璣\n曹沁 —— 封寒月"},{"name":"古神祈願","member":"—— 黑龍 ——\n九陰 —— 鮮于超\n高戚 —— 上官遠"},{"name":"古神祈願","member":"—— 韓無砂 —\n璇璣 —— 曹沁\n劍平 —— 依依"},{"name":"古神祈願","member":"—— 鮮于超 ——\n任斷離 —— 奚歌\n劍邪 ——— 黎幽"},{"name":"古神祈願","member":"—— 劍聖 ——\n銀瑪 —— 鄲陰\n魔夏 —— 阿良"}];

const box = document.getElementById('form-box');
const output = document.getElementById('output');

// let data;
let o_types;

let qsArr = [false, false, false, ];

window.onload = async function (argument) {
  // data = await fetch(url).then(r => r.json());
  o_types = [... new Set(raw_data.map(i => i.name))]

  addDynamicStyle();

  if (location.search) {
    initQs(raw_data);
    output.rows = 25;
  }
  qsArr.forEach(qsRule => genForm(qsRule));

  document.getElementById('copy')?.addEventListener('click', copy);
  document.getElementById('resize')?.addEventListener('click', () => {
    output.style = '';
    output.rows = output.rows > 20 ? 5 : 25;
  });
}

function copy() {
  navigator.clipboard.writeText(output.value);
}

function addDynamicStyle() {
  let style = document.createElement('style');
  style.textContent = o_types.map(i => `form[data-click="${i}"] .lineups label[data-type="${i}"] { display: flex;}`).join('');
  box.append(style);
}

function genForm(qsRule) {
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

  let lineups = raw_data
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

  if (qsRule) {
    form.querySelector(`input[data-click="types"][value="${qsRule.name}"]`)?.click();
    [...form.querySelectorAll(`input[data-click="members"]`)]
      .find(i => i.value === qsRule.member)?.click()

  }
}

function genOutput() {
  let forms = [...document.querySelectorAll('form')];

  output.textContent = forms.map((form, index) => {
    let type = form.dataset.click;
    let value = form.querySelector(`label[data-type="${type}"] input[data-click="members"]:checked`)?.value || 'o.O?';
    return `#${index + 1} ${type}:\n\n${value}`;
  }).join('\n\n\n\n');
}

function initQs(data) {
  let qs = new URLSearchParams(location.search);

  qsArr = [
    qs.get('1'),
    qs.get('2'),
    qs.get('3'),
  ].map(str => {
    if (!str) { return null; }
    let [_type, _names] = str.split(':');

    return data.find(i => {
      if (!i.name.includes(_type)) { return false; }
      return _names?.split(' ').some(_name => i.member.includes(_name));
    });
  });
}
