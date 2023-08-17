self.addEventListener('install', function (event) {
	// console.log("SW installed");
});

self.addEventListener('activate', function (event) {
	// console.log("SW activated");
});

self.addEventListener('fetch', function (event) {
	// console.log("Hijacked Signal");
	// event.respondWith(new Response("offline page"));
});
