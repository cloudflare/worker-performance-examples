addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let n = 1300000000000000 + Math.floor(Math.random() * 100000)
  let out = []

  for (let factor = 3; factor * factor <= n; factor++) {
    while (n % factor === 0){
      out.push(factor)
      n = n / factor
    }
  }
  
  if (n > 1){
    out.push(n)
  }

  return new Response(out.join(', '))
}
