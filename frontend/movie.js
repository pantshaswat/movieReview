const url = new URL(location.href);
const movieId = parseInt(url.searchParams.get('id'));
const movieTitle = url.searchParams.get('title');

const apiLink = "http://127.0.0.1:8000/api/v1/reviews/";

var foundCount = 0;
console.log("gg");

const main = document.getElementById('section');
const title = document.getElementById('title');


title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML =
`
<div class = "row">
<div class = "column">
<div class = "card">
New Review
<p><strong> Review: </strong> <input type = "text" id = "new_review"></p>
<p><strong> User: </strong> <input type = "text" id = "new_user"></p>
<p><a href = "#" onclick = "saveReview('new_review', 'new_user')">Create</a></p>
</div>
</div>
</div>

`
main.appendChild(div_new);


returnReviews(apiLink);

async function returnReviews(url) {
    console.log(movieId);
    try {
        const response = await fetch(url +"movie/"+movieId);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        data.forEach(review => {
            const div_card = document.createElement('div');
            div_card.innerHTML =
                `
                <div class = "row">
                <div class = "column">
                <div class = "card" id = "${review._id}">
                <p><strong> Review: </strong> ${review.review}</p>
                <p><strong> User: </strong> ${review.user}</p>
                <p><a href = "#" onclick = "editReview('${review._id}', '${review.review}','${review.user}')">Edit</a>  <a href = "#" onclick = "deleteReview('${review._id}')">Delete</a></p>
                </div>
                </div>
                </div>
                `;
            main.appendChild(div_card);
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


function editReview (id, review, user){
    console.log("edit");
    const element = document.getElementById(id);
    const reviewInputId = "review"+id;
    const userInputId = "user"+ id;
    element.innerHTML = 
    `
    <p><strong> Review: </strong> <input type = "text" id = "${reviewInputId}" value = "${review}"></p>
    <p><strong> User: </strong> <input type = "text" id = "${userInputId}" value = "${user}"></p>
    <p><a href = "#" onclick = "saveReview('${reviewInputId}', '${userInputId}', '${id}')">Update</a></p> 
    `
}
function saveReview(reviewInputId,userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;
    if (id){
        fetch(apiLink + id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type':'application/json' 
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res=> res.json()).then(res => {
            console.log(res);
            location.reload();
        }
        );
    }
    else{
        fetch(apiLink + "new",{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type':'application/json' 
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        }).then(res=> res.json()).then(res => {
            console.log(res);
            location.reload();
        }
        );
    }
}
function deleteReview(id){
    fetch(apiLink + id,{
        method: 'DELETE',
    }).then(res=> res.json()).then(res => {
        console.log(res);
        location.reload();
    }
    );
}