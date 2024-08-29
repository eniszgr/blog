const searchItem= document.getElementById("searchIcon")
const searchEngine= document.getElementById("searchEngine")


searchItem.addEventListener('click',()=>{
    searchEngine.classList.toggle('active')
})