const puppeteer = require("puppeteer");
const sharp = require("sharp");

(async () => {
  // puppeteer.launch() は headless のみで十分
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // 取得元ページ
  await page.goto("https://solar-carport.meiwajp-dev.link/meiwa-niigata-factory", {
    waitUntil: "networkidle2"
  });

  // 2段階待ち（合計10秒）
  await page.waitForTimeout(5000);
  await page.waitForTimeout(5000);

  // スクショ一時保存
  await page.screenshot({ path: "temp.png", fullPage: false });

  await browser.close();

  // 1920×1080にリサイズして保存
  await sharp("temp.png")
    .resize(1920, 1080, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0 }
    })
    .png()
    .toFile("image.png");
})();
