const likeDislikeForm = document.querySelector("#homePage main section form");
const dislikeButton = document.querySelector('#homePage main section form label:nth-of-type(1) input');
const likeButton = document.querySelector('#homePage main section form label:nth-of-type(2) input');



function submitItAlready() {
    if(dislikeButton.checked || likeButton.checked){
        likeDislikeForm.submit();
    }
}
dislikeButton.addEventListener("click", submitItAlready);
likeButton.addEventListener("click", submitItAlready);