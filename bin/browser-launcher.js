#!/usr/bin/env node
/*
 * @Author: dengxuyang
 * @Date: 2025-04-29 15:49:18
 * @LastEditors: 673303066@qq.com
 * @LastEditTime: 2025-04-29 15:49:46
 * @FilePath: /Playwright Browser Tools Extension/bin/browser-launcher.js
 * @Description: 
 */


const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 获取全局安装包的路径
const packagePath = path.resolve(__dirname, '..');

// 确保我们在正确的目录中
process.chdir(packagePath);

console.log('启动浏览器和工具服务...');

// 运行 npm run start 命令
const child = spawn('npm', ['run', 'start'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error(`执行错误: ${error.message}`);
  process.exit(1);
});

child.on('close', (code) => {
  if (code !== 0) {
    console.log(`进程退出，退出码: ${code}`);
  }
});
