

export function s_check_version(ms) {

  function doo() {
    if (navigator.onLine) {
      app.request({
        url: `https://${state.appData.url}/php/version.php`,
        cache: false,
        success: (res) => {
          if (localStorage.version == undefined) {
            localStorage.version = res
          } else if (res != localStorage.version && res[0]!='b') {
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
            let resArr = res.split('^')
            let wnew = () => {
              if (resArr.length > 1) {
                return '</br>' + resArr.splice(1).map((it) => {
                  return `• ${it}`
                }).join('</br>') + '</br>-------'
              }
              return ''
            }

            app.dialog.alert(`Обнаружена новая версия приложения <strong>` + resArr[0] + `</strong>.
            ${resArr.length > 1 ? '</br>-------</br>Что нового:' : ""}
            ${wnew()}
            </br> Страница будет перезагружена`, 'Обновление', () => {
              window.location.replace(window.location.href)
            })
          } else if (res[0] == 'b') {
            app.dialog.alert('Простите небольшие технические шоколадки')
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