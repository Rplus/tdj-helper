import fs from 'fs';
import { Converter } from 'opencc-js';
import * as OpenCC from 'opencc-js';

const customDict = [
  ['於小雪', '于小雪'],
  ['星佔賢者', '星占賢者'],
  ['激活', '啟動'],
  ['概率', '機率'],
];

const converter = OpenCC
  // .Converter({ from: 'cn', to: 'tw' })
  .ConverterFactory(
    OpenCC.Locale.from.cn,
    OpenCC.Locale.to.tw,
    [customDict],
  );


export function outputJSON(obj = {}) {
  let space = obj.space;
  if (space === undefined) {
    space = 2;
  }
  let fileContent = JSON.stringify(obj.json, null, space);
  writeFile(obj.fn, fileContent, obj.cn2tw);
};

export function writeFile(fileName = '', fileContent = '', cn2tw = false) {
  if (cn2tw) {
    fileContent = converter(fileContent);
  }
	fs.writeFileSync(fileName, fileContent);
  console.log('\x1b[46m%s\x1b[0m', `Data saved as ${fileName}! ( ${fileContent.length / 1000} kb )`);
}

export function getArgs() {
  return process.argv.slice(2).reduce((all, i) => {
    let pair = i.split('=');
    all[pair[0]] = pair[1];
    return all;
  }, {});
}

export function readJsonFile(filePath) {
  let content;
  try {
    // fs.unlinkSync(filename);
    content = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(content);
    return content;
  } catch (err) {
    // console.error(err.message);
    console.error(err);
    return null;
  }
}

export function parse_number(str = '') {
  return parseInt(str.replace(/\D/g, ''));
}

export function pick_obj(obj, props = []) {
  return props.reduce((all, prop) => {
    all[prop] = obj[prop];
    return all;
  }, {});
}