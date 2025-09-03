menu_items = document.querySelectorAll(".m-standard-nav li").forEach(item => {
  if (window.location.href.indexOf(item.getAttribute('data-taxonomyname')) !== -1) {
    item.classList.add('active')
  }
});
document.querySelectorAll(".share-trigger").forEach(item => {
  item.addEventListener("click", function() {
    const sibling = item.nextElementSibling
    sibling.classList.toggle('show')
  })
});
document.querySelectorAll(".m-standard-nav h3").forEach(item => {
  if(item.classList.contains('no-js')){
    return
  }
  item.addEventListener("click", function(){
    const sibling = item.nextElementSibling
    sibling.classList.toggle('show')
  })
})

/* Adding caption to images in news pages */
var richTextImages = document.querySelectorAll(".user-content img");
if (richTextImages) {
    richTextImages.forEach(function(element) {
    var title = element.getAttribute("title");
    var caption =
        "<figcaption>" + title + "</figcaption>";
    if (title !== null) {
        element.insertAdjacentHTML("afterend", caption);
    }
    });
}