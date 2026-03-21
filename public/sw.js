const CACHE_NAME = "shadcn-blocks-shell-v1"
const APP_SHELL_URLS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/pwa-192.png",
  "/pwa-512.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_URLS))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event

  if (request.method !== "GET") {
    return
  }

  const url = new URL(request.url)

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/index.html"))
    )
    return
  }

  if (url.origin !== self.location.origin) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkResponsePromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone()
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, responseClone))
          }

          return networkResponse
        })
        .catch(() => cachedResponse)

      return cachedResponse ?? networkResponsePromise
    })
  )
})
