<!--
 * @Author: dengxuyang
 * @Date: 2025-04-25 10:02:36
 * @LastEditors: 673303066@qq.com
 * @LastEditTime: 2025-05-15 16:53:52
 * @FilePath: /Playwright Browser Tools Extension/README.md
 * @Description: 
-->
# Playwright Browser Tools Extension

一个集成了browser-tools插件的Playwright自动化测试工具，用于辅助代码编写和调试。
该项目实质上是通过实时浏览器监视和AI辅助开发工具桥接浏览器自动化测试，使其可用于自动测试和交互式调试方案
## 功能特点

- 集成Chrome浏览器插件browser-tools
- 支持远程调试功能
- 配合AI编辑器实现代码自动化
- 默认支持vite+vue3项目调试

## 快速开始

### 安装依赖

```bash
yarn install
```

### 启动项目

```bash
yarn start
```

> 注意：首次运行时可能需要安装Playwright所需的浏览器内核

### 项目配置

项目默认配置：
- 应用地址：`localhost:5173`（可在`launch-browser.js`中修改）
- 远程调试地址：`http://localhost:9222`

## 配置AI编辑器

本项目推荐使用VSCode + Augment插件进行开发。

### 配置browser-tools

[配置详情](https://mcp.so/server/browser-tools-mcp/AgentDeskAI?tab=content)

```bash
# 配置名称
name: browser-tools
# 配置命令
Command: npx @agentdeskai/browser-tools-mcp@1.2.0

# 启动browser-tools服务 
npx @agentdeskai/browser-tools-server@1.2.0
```
> 注意：在运行项目时已经启动了browser-tools服务 无需再次执行 
### 配置playwright

[配置详情](https://mcp.so/server/playwright-mcp/microsoft?tab=content)

```bash
# 配置名称
name: playwright
# 配置命令
Command: npx @playwright/mcp@latest --cdp-endpoint http://localhost:9222
```

## 使用说明

完成上述配置后，您可以：
1. 使用browser-tools进行浏览器操作监控
2. 使用playwright进行自动化测试
3. 配合AI编辑器实现代码自动化编写和bug修复
4. 可以使用npm link 全局使用 browser-launcher 命令启动浏览器和工具服务
5. 现使用npm start 直接就会启动浏览器和工具服务
6. 添加交互方式启动，输入目标网址，就可以直接调试了
## 作者

- 作者：dengxuyang
- 邮箱：673303066@qq.com

## 许可证

[MIT License](LICENSE)
