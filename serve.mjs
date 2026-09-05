import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const server=http.createServer((req,res)=>{
  if(req.url==='/'||req.url==='/index.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(fs.readFileSync('index.html'));return;}
  const relative=decodeURIComponent((req.url||'').split('?')[0]).replace(/^\/+/,''),file=path.resolve(relative);
  if(file.startsWith(path.resolve('assets')+path.sep)&&fs.existsSync(file)){res.writeHead(200,{'Content-Type':file.endsWith('.webp')?'image/webp':'application/octet-stream'});fs.createReadStream(file).pipe(res);return;}
  res.writeHead(404);res.end('Not found');
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
