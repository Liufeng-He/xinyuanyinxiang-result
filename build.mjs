import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('index.html','utf8');
if(!html.startsWith('<!doctype html>')||!html.includes('lang="zh-CN"'))throw Error('Missing document metadata');
if(/一年|全年|globalThis\.Tweak|window\.openai/.test(html))throw Error('Unexpected retained text or host dependency');
for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
fs.mkdirSync('dist',{recursive:true});fs.copyFileSync('index.html','dist/index.html');
fs.cpSync('assets','dist/assets',{recursive:true});
console.log('Static H5 build complete.');
