/*
 * @Author: dengxuyang
 * @Date: 2025-04-24 22:34:20
 * @LastEditors: 673303066@qq.com
 * @LastEditTime: 2025-04-29 14:35:23
 * @FilePath: /Playwright Browser Tools Extension/launch-browser.js
 * @Description: 
 */

const { chromium } = require('playwright');
const readline = require('readline');
const { spawn } = require('child_process');

// 创建交互式命令行界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 获取目标网址，默认为 http://localhost:5173
const defaultUrl = 'http://localhost:5173';
let targetUrl;

// 将 rl.question 包装为 Promise
function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

(async () => {
  try {
    // 询问用户输入目标网址
    const answer = await askQuestion(`请输入目标网页URL (默认: ${defaultUrl}): `);
    targetUrl = answer.trim() || defaultUrl;
    rl.close();

    // 启动 Browser Tools Server
    await startBrowserToolsServer();

    // 启动浏览器
    const { context, page } = await launchBrowserWithExtension();

    console.log('Browser launched successfully');
    console.log('Remote debugging available at: http://localhost:9222');
    console.log(`Navigated to: ${targetUrl}`);

    // 保持浏览器打开
    await new Promise(() => {});
  } catch (error) {
    console.error(error);
  }
})();

// 启动 Browser Tools Server 的函数
async function startBrowserToolsServer() {
  console.log('Starting Browser Tools Server...');
  const serverProcess = spawn('npx', ['@agentdeskai/browser-tools-server@1.2.0'], {
    stdio: 'inherit',
    shell: true
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Browser Tools Server started successfully');
      resolve();
    }, 1000); // 假设启动需要 1 秒
  });
}

async function launchBrowserWithExtension() {
  const extensionPath = './chrome-extension';
  
  // 启动浏览器并加载扩展，添加远程调试端口
  const context = await chromium.launchPersistentContext('', {
    headless: false, // 必须使用有头模式才能加载扩展
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
      '--remote-debugging-port=9222'  // 添加远程调试端口
    ]
  });

  // 创建新页面
  const page = await context.newPage();
  
  // 导航到目标网站
  await page.goto(targetUrl);

  // 返回context和page以便后续使用
  return { context, page };
}


