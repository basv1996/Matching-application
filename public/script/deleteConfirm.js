const deleteForm = document.querySelectorAll("form.deleteForm");
const deleteButton = document.querySelector(
  "form.deleteForm input:last-of-type"
);

function areYouSure() {
  for (var a = 0; a < deleteForm.length; a++) {
    deleteForm.preventdefault();
    alert("are you sure you want to delete?");
  }
}

addEventListener.deleteButton("click", areYouSure);
