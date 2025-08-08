// registerServiceWorker.js
// Basado en CRA, registra el service worker para PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      if (isLocalhost) {
        // En localhost, solo registra si existe
        fetch(swUrl)
          .then(response => {
            if (
              response.status === 200 &&
              response.headers.get('content-type').includes('javascript')
            ) {
              navigator.serviceWorker.register(swUrl);
            }
          })
          .catch(() => {});
      } else {
        navigator.serviceWorker.register(swUrl);
      }
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
