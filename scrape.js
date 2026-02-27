const { chromium } = require("playwright");

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=17",
  "https://sanand0.github.io/tdsdata/js_table/?seed=18",
  "https://sanand0.github.io/tdsdata/js_table/?seed=19",
  "https://sanand0.github.io/tdsdata/js_table/?seed=20",
  "https://sanand0.github.io/tdsdata/js_table/?seed=21",
  "https://sanand0.github.io/tdsdata/js_table/?seed=22",
  "https://sanand0.github.io/tdsdata/js_table/?seed=23",
  "https://sanand0.github.io/tdsdata/js_table/?seed=24",
  "https://sanand0.github.io/tdsdata/js_table/?seed=25",
  "https://sanand0.github.io/tdsdata/js_table/?seed=26",
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
