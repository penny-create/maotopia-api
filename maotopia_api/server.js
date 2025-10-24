import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 這裡是你 LINE Messaging API 的 Token
const LINE_TOKEN = "MCDA7LNbI0SvMGoX6CKeBveY2A3qqIY0WRE3ggWqlqRFxxqnyFo+B6pPN9Jjky5gNWKwdzyohI0Lfru1orWI5dbrL4hxrSW7nfuns5cyazCEqWnXPJFYNuavhr5wMRMgxpI9HkYBJpiL+gQHgeR1QAdB04t89/1O/w1cDnyilFU=";

// ✅ 表單接收端
app.post("/line", async (req, res) => {
  try {
    const data = req.body;
    console.log("📩 收到表單：", data);

    const message = `
✨ 星際登艦預約通知 ✨
==========================
🚀 任務類型：${data.missionType || '未選'}
📅 登艦日期：${data.startDate || '未填'}
🪐 返回日期：${data.endDate || '未填'}
👩‍🚀 毛孩姓名：${data.petName || '未填'}
⚧ 性別：${data.gender || '未填'}
🩺 是否絕育：${data.neutered || '未填'}
🐕 品種：${data.breed || '未填'}
⚖️ 體重：${data.weight || '未填'} kg
🎂 年齡：${data.age || '未填'} 歲
🌈 健康狀況：${data.health || '未填'} 
💫 個性檔案：${data.personality || '未填'}
👨‍🚀 飼主：${data.ownerName || '未填'}
☎️ 電話：${data.phone || '未填'}
🏠 地址：${data.address || '未填'}
🪩 是否外宿經驗：${data.experience || '未填'}
📘 住宿須知：${data.agreement || '未填'}
🧳 備註：${data.notes || '無'}
==========================
🌟 感謝您完成登艦預約，毛托邦使者將盡快與您聯繫！
`;

    // ✅ 推播到使用者 LINE
    await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LINE_TOKEN}`
      },
      body: JSON.stringify({
        to: data.userId,
        messages: [{ type: "text", text: message }]
      })
    });

    res.json({ status: "success", message: "送出成功！" });
  } catch (err) {
    console.error("❌ 錯誤:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});


// ✅ Render 啟動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






