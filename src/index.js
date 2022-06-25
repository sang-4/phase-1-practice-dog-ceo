// console.log('%c HI', 'color: firebrick')

let dog_breed = []
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

document.addEventListener('DOMContentLoaded', ()=>{
    loadDogImages()
    loadBreed()
});
    
function loadDogImages()
{
    fetch(imgUrl)
    .then(response => response.json())
    .then(image =>{
        image.message.forEach(function(im){
            const dog = document.createElement('img')
            dog.src = im;
            dog.style.width = '400px'
            document.querySelector('#dog-image-container').appendChild(dog)
        })
    })
}



function loadBreed()
{
    
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds =>{
        dog_breed = Object.keys(breeds.message)
        dog_breed.forEach(function(breed){
            addBreed(breed)
            filterBreed()

        })
    })
}
function filterBreed()
 {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
       filterDog(event.target.value)

    });
}
function filterDog(text)
{
    updateBreeds(dog_breed.filter(breed => breed.startsWith(text)))
}
function updateBreeds(dogs){
    const ul = document.querySelector('#dog-breeds')
    let child = ul.lastElementChild;
       while(child){
            ul.removeChild(child);
            child = ul.lastElementChild;

       }
    dogs.forEach(dog=>addBreed(dog))
}
function addBreed(breed)
{
    const ul = document.querySelector('#dog-breeds')
    const li = document.createElement('li')
    li.innerText = breed;
    ul.appendChild(li);
    li.style.cursor = 'pointer'
    li.addEventListener('click', ()=>{
        li.style.color  = 'purple'
    })
}