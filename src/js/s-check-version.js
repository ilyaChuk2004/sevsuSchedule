

export function s_check_version(ms) {

  function doo() {
    if (navigator.onLine) {
      app.request({
        url: `https://${state.appData.url}/php/version.php`,
        cache: false,
        success: (res) => {
          if (localStorage.version == undefined) {
            localStorage.version = res
          } else if (res != localStorage.version) {
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            console.log("CLEEEARRR")
            try {
              caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                  caches.delete(cacheName);
                });
              });
            } catch (error) { }

            try {
              navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                  registration.unregister()
                }
              })
            } catch (error) { }

            localStorage.version = res

            app.dialog.alert('Обнаружена новая версия приложения ' + res + '. Страница будет перезагружена', 'Обновление', () => {
              window.location.replace(window.location.href)
            })
          }
        }
      })
    }
  }

  doo()
  
 setInterval(() => {
   doo()
 }, ms);
  

}