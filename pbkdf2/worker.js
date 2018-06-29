function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const key = await crypto.subtle.importKey(
    "raw",
    crypto.getRandomValues(new Uint8Array(16)),
    {
        name: "PBKDF2",
    },
    false,
    ["deriveKey", "deriveBits"]
  )

  var resp = await crypto.subtle.deriveBits(
    {
        name: "PBKDF2",
        salt: crypto.getRandomValues(new Uint8Array(16)),
        iterations: 15000,
        hash: {name: "SHA-512"},
    },
    key,
    256
  ) 

  return new Response(buf2hex(resp))
}
