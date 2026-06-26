const RELEASE_ID = process.argv[2];
const TOKEN = process.env.GH_TOKEN;

const body = `## 📦 Koma-Nezha v1.0.3

### 🔧 功能修复

- 🔴 **离线卡片布局重构**：修复离线服务器卡片右侧信息排列问题，现在呈现清晰的两行布局：
  - 第一行：\`服务器已离线\`（红色加粗提示）
  - 第二行：套餐标签 + 备注标签（带宽、流量、IPv4/IPv6、线路、彩色备注 tag）
- 🏷️ **备注标签归位**：将 \`PlanInfo\`（套餐与备注标签）从独立行移入离线提示容器，与离线提示垂直排列，布局更紧凑合理

### 📥 安装方式

下载 \`koma-nezha-theme-v1.0.3.zip\`，在 Komari Monitor 后台导入主题包即可。

### 🙏 致谢

感谢使用 Koma-Nezha 主题！如有问题或建议，欢迎在 [Issues](https://github.com/yutian81/koma-nezha/issues) 反馈。`;

const res = await fetch(
  `https://api.github.com/repos/yutian81/koma-nezha/releases/${RELEASE_ID}`,
  {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      name: "📦 Koma-Nezha v1.0.3",
      body: body,
    }),
  }
);

const data = await res.json();
console.log("Status:", res.status);
console.log("Name:", data.name);
console.log("URL:", data.html_url);
console.log("Body length:", data.body?.length);
