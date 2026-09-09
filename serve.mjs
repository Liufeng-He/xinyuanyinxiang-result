import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const server=http.createServer((req,res)=>{
  if(req.url==='/'||req.url==='/index.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(fs.readFileSync('index.html'));return;}
  const relative=decodeURIComponent((req.url||'').split('?')[0]).replace(/^\/+/,''),file=path.resolve(relative);
  if(file.startsWith(path.resolve('assets')+path.sep)&&fs.existsSync(file)){res.writeHead(200,{'Content-Type':file.endsWith('.webp')?'image/webp':'application/octet-stream'});fs.createReadStream(file).pipe(res);return;}
  res.writeHead(404);res.end('Not found');
});
import express from 'express'; // 1. 引入 express 库
const app = express(); // 2. 创建 app 实例
const PORT = process.env.PORT || 4173; // 3. 定义端口

// ... 这里可以添加你的路由和中间件，例如：
// app.use(express.static('public'));
// app.get('/', (req, res) => { res.send('Hello World!'); });

app.listen(PORT, '0.0.0.0', () => { // 4. 启动服务
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
