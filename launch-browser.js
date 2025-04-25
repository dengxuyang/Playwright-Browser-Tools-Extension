/*
 * @Author: dengxuyang
 * @Date: 2025-04-24 22:34:20
 * @LastEditors: 673303066@qq.com
 * @LastEditTime: 2025-04-25 09:06:57
 * @FilePath: /playwright-extension/launch-browser.js
 * @Description: 
 */
const { chromium } = require('playwright');

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
  await page.goto('http://localhost:5173');

  // 返回context和page以便后续使用
  return { context, page };
}

// 运行函数
launchBrowserWithExtension()
  .then(({ context, page }) => {
    console.log('Browser launched successfully');
    console.log('Remote debugging available at: http://localhost:9222');
    // 保持浏览器打开
    return new Promise(() => {});
  })
  .catch(console.error);