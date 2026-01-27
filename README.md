# WeChatFlow

一个简洁、高效、美观的公众号文章排版工具。

## ✨ 主要功能

*   **实时预览**：左侧编辑 Markdown，右侧即时查看微信风格排版效果。
*   **一键复制**：支持一键复制带样式的 HTML，直接粘贴到微信公众号后台。
*   **精美样式**：
    *   内置“纯净雅致”和“人文故事”等多款精心调校的主题。
    *   支持多种背景纹理（淡黄方格、白底方格等），完美模拟纸张质感。
*   **多端视图**：支持手机/桌面视图切换，确保在不同设备上的阅读体验。

## 🛠️ 本地运行

1.  安装依赖：
    ```bash
    npm install
    ```

2.  启动开发服务器：
    ```bash
    npm run dev
    ```

3.  打开浏览器访问 `http://localhost:3000`。

## 🚀 上传到 GitHub

如果你想将本项目上传到 GitHub，请按照以下步骤操作：

1.  **在 GitHub 上创建新仓库**：
    *   登录 [GitHub](https://github.com)。
    *   点击右上角的 `+` 号，选择 **New repository**。
    *   输入仓库名称（例如 `wechatflow`）。
    *   保持其他选项默认，点击 **Create repository**。

2.  **推送代码**：
    在项目根目录下打开终端，执行以下命令（将其中的 `<你的用户名>` 替换为你的 GitHub 用户名）：

    ```bash
    # 关联远程仓库
    git remote add origin https://github.com/<你的用户名>/wechatflow.git

    # 推送代码到 main 分支
    git push -u origin main
    ```

    > 注意：如果提示 `remote origin already exists`，请先执行 `git remote remove origin` 删除旧关联。

## 📦 技术栈

*   React 19
*   TypeScript
*   Vite
*   Tailwind CSS
*   Lucide React (图标库)
