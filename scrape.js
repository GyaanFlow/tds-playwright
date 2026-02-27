const { chromium } = require("playwright");

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=27",
  "https://sanand0.github.io/tdsdata/js_table/?seed=28",
  "https://sanand0.github.io/tdsdata/js_table/?seed=29",
  "https://sanand0.github.io/tdsdata/js_table/?seed=30",
  "https://sanand0.github.io/tdsdata/js_table/?seed=31",
  "https://sanand0.github.io/tdsdata/js_table/?seed=32",
  "https://sanand0.github.io/tdsdata/js_table/?seed=33",
  "https://sanand0.github.io/tdsdata/js_table/?seed=34",
  "https://sanand0.github.io/tdsdata/js_table/?seed=35",
  "https://sanand0.github.io/tdsdata/js_table/?seed=36",
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    // Go to page and wait for table to load
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for table cells to appear
    await page.waitForSelector("td", { timeout: 10000 });

    // Extract all numbers from all table cells
    const pageSum = await page.evaluate(() => {
      const cells = document.querySelectorAll("td");
      let total = 0;
      cells.forEach((cell) => {
        const val = parseFloat(cell.innerText.trim());
        if (!isNaN(val)) {
          total += val;
        }
      });
      return total;
    });

    console.log(`Seed URL: ${url} → Sum: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`\n✅ TOTAL SUM ACROSS ALL PAGES: ${grandTotal}`);
  await browser.close();
})();
