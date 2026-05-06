const CACHE_NAME = "cognitive-games-v1";

const FILES_TO_CACHE = [
  "/Cognitive-Games/",
  "/Cognitive-Games/index.html",
  "/Cognitive-Games/manifest.json",
  "/Cognitive-Games/shared.js",
  "/Cognitive-Games/sw.js",
  "/Cognitive-Games/word-wise-data.js",
  "/Cognitive-Games/balloon-float.html",
  "/Cognitive-Games/light-catcher.html",
  "/Cognitive-Games/matchOrNoMatch.html",
  "/Cognitive-Games/rhythmTap.html",
  "/Cognitive-Games/road-runner.html",
  "/Cognitive-Games/settings.html",
  "/Cognitive-Games/simons-path.html",
  "/Cognitive-Games/sorterGame.html",
  "/Cognitive-Games/word-wise.html",
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
  );
  self.skipWaiting();
});

// ACTIVATE — clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

// FETCH — cache-first, fall back to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
