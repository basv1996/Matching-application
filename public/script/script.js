const TopUserCard = document.querySelector(
  ".allUsers section .userCards:first-child"
);

const likeFormButton = document.querySelector("form.LikeMe input:last-child");
const likeTitle = document.querySelector(".allUsers .userCards:first-child h2");

function likeAnimation() {
  console.log("you liked the profile");
  TopUserCard.classList.add("liked");
  likeTitle.classList.add("liked");
}

likeFormButton.addEventListener("click", likeAnimation);
