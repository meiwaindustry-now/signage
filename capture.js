const puppeteer = require("puppeteer");
const sharp = require("sharp");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 2560, height: 1440 });

  await page.goto("https://solar-carport.meiwajp-dev.link/meiwa-niigata-factory", {
    waitUntil: "networkidle2"
  });

  // 2段階待ち
  await page.waitForTimeout(5000); // JS/通信待ち
  await page.waitForTimeout(5000); // アニメーション描画待ち

  // 一時スクショ
  await page.screenshot({ path: "temp.png", fullPage: false });
  await browser.close();

  // 1920x1080にリサイズ
  await sharp("temp.png")
    .resize(1920, 1080, { fit: "contain", background: { r: 0, g: 0, b: 0 } })
    .toFile("image.png");

  console.log("✅ image.png created!");
})();
