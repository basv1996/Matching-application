const deleteForm = document.querySelectorAll("form.dislikeMe");
const deleteButton = document.querySelector("form.dislikeMe input:last-child");

function areYouSure() {
  for (var a = 0; a < deleteForm.length; a++) {
    deleteForm.preventdefault();
    alert("are you sure you want to delete?");
  }
}

deleteButton.addEventListener("click", areYouSure);
console.log("added delete confirm js file");
