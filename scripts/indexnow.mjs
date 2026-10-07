// Pings IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live sitemap.
// Run after a deploy: `npm run indexnow`. The key file lives in public/<key>.txt.
const HOST = "safocleaning.tj";
const KEY = "3189c360c7e04416acd835db55bc5321";

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);
