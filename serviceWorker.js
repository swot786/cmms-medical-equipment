const cmmsMedicalEquipment = "cmms-medical-equipment-site-v1"
const assets = [
  "/",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./table2excel.js",
  "./images/page_excel.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cmmsMedicalEquipment).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})