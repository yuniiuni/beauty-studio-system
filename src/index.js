import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
- 點「Commit changes」

### 📌 步驟 5（用 Vercel 部署）

1. 去 https://vercel.com
2. 點「Sign Up」用 GitHub 帳號登入
3. 授權 GitHub（允許 Vercel 存取你的 repo）
4. 點「New Project」
5. 你會看到你的 `beauty-studio-system` repo
6. 點它 → 選「Import」
7. 保持所有預設設定
8. 點「Deploy」
9. **等 2-3 分鐘**，會看到「Congratulations! 🎉」
10. 點「Visit」就可以看到你的網站了！

你會得到一個網址，例如：
```
https://beauty-studio-system-abc123.vercel.app
