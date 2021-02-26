var likeDislikeForm = document.querySelector("#homePage main section form");
//var formSubmit = document.querySelector('#homePage main section form button');
var dislikeButton = document.querySelector('#homePage main section form label:nth-of-type(1) input');
var likeButton = document.querySelector('#homePage main section form label:nth-of-type(2) input');

function submitItAlready() {
    if(dislikeButton.checked || likeButton.checked){
        likeDislikeForm.submit();
    }
}
dislikeButton.addEventListener("click", submitItAlready);
likeButton.addEventListener("click", submitItAlready);