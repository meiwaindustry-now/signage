const puppeteer = require("puppeteer");
const sharp = require("sharp");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // 表示サイズ（大きめに取得）
  await page.setViewport({ width: 1920, height: 1080 });

  // 🔽 取得したいページURL（ここを変更）
  await page.goto("https://solar-carport.meiwajp-dev.link/meiwa-niigata-factory", {
    waitUntil: "networkidle2"
  });

  // ===== 2段階待ち（超重要） =====
  // ① JS・通信が落ち着くまで
  await page.waitForTimeout(5000);

  // ② アニメーション・描画が完了するまで
  await page.waitForTimeout(5000);

  // 一時スクショ
  await page.screenshot({
    path: "temp.png",
    fullPage: false
  });

  await browser.close();

  // ===== 1920×1080に収める =====
  await sharp("temp.png")
    .resize(1920, 1080, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0 }
    })
    .png()
    .toFile("image.png");
})();
