const apiLink = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=299980fcb428b855ce7208eedeefbc05&page=1";
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const searchApi = "https://api.themoviedb.org/3/search/movie?api_key=299980fcb428b855ce7208eedeefbc05&query="; 
var foundCount = 0;
const header = document.getElementById('header');
const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query'); 
returnMovies(apiLink);
function removeSearchText(){
    while(header.firstChild){
        header.removeChild(header.firstChild);
    }
}
function returnMovies (url){
    
  return  fetch(url).then(res=>res.json()).then(function(data){
        foundCount = data.results.length;
        console.log(data.results);
        data.results.forEach(element =>{
            const div_card = document.createElement('div');
            div_card.setAttribute('class','card');
            const div_row = document.createElement('div');
            div_row.setAttribute('class','row');
            const div_column = document.createElement('div');
            div_column.setAttribute('class','column');
            const image = document.createElement('img');
            image.setAttribute('class','thumbnail');
            image.setAttribute('id','image');
            const title = document.createElement('h3');
            title.setAttribute('id','title');
            const center = document.createElement('center');
            title.innerHTML = `${element.title}<br><a href = "movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
            image.src = imgPath + element.poster_path;
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title); 
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
            main.appendChild(div_row); 
        });
        
    });
    
}
function updateFoundCount(count) {
    const foundNumber = document.createElement('h3');
    foundNumber.setAttribute('id','foundNumber');
    foundNumber.innerHTML = `Found: ${count}`;
    header.appendChild(foundNumber);
}
form.addEventListener("submit",async (e)=>{
    removeSearchText();
    e.preventDefault();
    main.innerHTML = '';
    const searchText = document.createElement('h1');
    searchText.setAttribute('id','searchText');
    
    searchText.innerHTML = `Search results for: "${search.value}"`;

    header.appendChild(searchText);
    
    const searchItem = search.value;
    if(searchItem){
        foundCount = 0;
        await returnMovies(searchApi + searchItem);
        search.value = '';
       updateFoundCount(foundCount);
    }
});