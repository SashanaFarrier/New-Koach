const headerContent = document.querySelector(".header-content")
const headerFlexContainer = headerContent.querySelector(".flex-container")
const menu = headerFlexContainer.querySelector(".menu")
const menuText = menu.querySelector("p")
const closeBtn = menu.querySelector(".close-btn")
const nav = menu.querySelector(".nav")

menuText.addEventListener("click", function(e) {

    nav.classList.toggle("hidden")
    menuText.classList.toggle("hidden")
    closeBtn.classList.toggle("hidden")
  })


  closeBtn.addEventListener("click", function() {
    nav.classList.toggle("hidden")
    menuText.classList.toggle("hidden")
    closeBtn.classList.toggle("hidden")
  })
