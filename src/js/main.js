console.log('hola mundo')
const noCambia = 'Daniela'
let sicambia = 'Michelle'

const getUser = new Promise(function (todoBien, todoMal) {
     setTimeout(function(){
         todoMal('se acabo el tiempo')
     }, 3000)
})

getUser
    .then(function() {
        console.log('Todo esta bien en la vida')
    })
    .catch(function(message){
        console.log(message)
    })

    

    // $.ajax ('https://randomuser.me/api/',{
    //     method: 'GET',
    //     success: function (data) {
    //         console.log(data)
    //     },
    //     error: function (error){
    //         console.log(error)
    //     }
    // })

    fetch('https://randomuser.me/api/')
        .then(function(response){
            console.log(response)
            return response.json()
        })
        .then (function(user) {
            console.log('user', user.results[0].name.first)
        })

        .catch (function(error) {
            console.log(error)
        });

    //   ----------------------creando funcion asincrona----------------------


     (async function load() {

        async function getData(url){
             const response = await fetch(url)
             const data = await response.json()
             return data

            }

            
            
            const $form = document.getElementById('form')
            const $home = document.getElementById('home')
            const $featuringContainer = document.getElementById('featuring')

         
        function setAttributes ($element, attributes) {
            for (const attribute in attributes) {
                $element.setAttribute(attribute,attributes[attribute])
            }
        }

        const BASE_API = 'https://yts.mx/api/v2/'

        function featuringTemplate (peli){

            return (
            `
              <div class="featuring">
                 <div class="featuring-image">
                    <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
                 </div>
                 <div class="featuring-content">
                    <p class="featuring-title">Pelicula encontrada</p>
                    <p class="featuring-album">${peli.title}</p>
                 </div>
              </div>
            `
            )
        }

         $form.addEventListener('submit', async(event) => {
                event.preventDefault()
                $home.classList.add('search-active')
                const $loader = document.createElement('img')
                setAttributes($loader,{
                    src: 'src/images/loader.gif',
                    height: 50,
                    width: 50,
                })
                $featuringContainer.append($loader)
            
                const data = new FormData($form)
                // const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
                // const HTMLString = featuringTemplate(peli.data.movies[0])
                const {
                    data: {
                        movies: pelis
                    }
                } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
                const HTMLString = featuringTemplate(pelis[0])

                $featuringContainer.innerHTML = HTMLString
                

                
           
         })

            const actionList = await getData(`${BASE_API}list_movies.json?genre=action`)
            const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`)
            const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`)

            console.log('anctionList', actionList)
            console.log('dramaList', dramaList)
            console.log('animationList', animationList)

            function videoItemTemplate(peli) {
                return (

                    `<div class="primaryPlaylistItem">
                      <div class="primaryPlaylistItem-image">
                        <img src="${peli.medium_cover_image}">
                      </div>
                      <h4 class="primaryPlaylistItem-title">
                           ${peli.title}
                      </h4>
                    </div>`
                )
           }
           
           function createTemplate (HTMLString) {
               const html = document.implementation.createHTMLDocument()
               html.body.innerHTML = HTMLString
               return html.body.children[0]
            }

            function addEventClick (element){
                element.addEventListener('click',() => {
                    showModal()
                })

            }
            
            
            function renderMovieList (list,container) {
                container.children[0].remove()
                //    actionList.data.movies
                list.forEach((movie) => {
                    const HTMLString = videoItemTemplate(movie)
                    const movieElement = createTemplate(HTMLString)
                    container.append(movieElement)
                    addEventClick(movieElement)
                })
            }
            
            const $actionContainer = document.querySelector('#action')
            const $dramaContainer = document.getElementById('drama')
            const $animationContainer = document.querySelector('#animation')
            

            renderMovieList(actionList.data.movies,$actionContainer)
            renderMovieList(dramaList.data.movies,$dramaContainer)
            renderMovieList(animationList.data.movies,$animationContainer)


            const $modal = document.getElementById('modal')
            const $overlay = document.getElementById('overlay')
            const $hideModal = document.getElementById('hide-modal')

            const modalTitlte = $modal.querySelector('h1')
            const modalImage = $modal.querySelector('img')
            const modalDescription = $modal.querySelector('p')

            function showModal() {
                $overlay.classList.add('active')
                $modal.style.animation = 'modalIn .8s forwards'
            }
          
            $hideModal.addEventListener('click',hideModal)

            function hideModal () {
                $overlay.classList.remove('active')
                $modal.style.animation = 'modalOut .8s forwards'
            }
            

            // console.log(videoItemTemplate('src/images/cover/bitcoinjpg', 'bitcoin'))

            
     }) ()
     
     

















