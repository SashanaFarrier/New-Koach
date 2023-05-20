gsap.registerPlugin(ScrollTrigger);

const videoContainer = document.querySelector(".video__container")
const videoEl = videoContainer.querySelector("#video")
// const sectionVideo = videoContainer.querySelector("#section-video")
const menu = document.querySelector(".menu")
const closeBtn = menu.querySelector(".close-btn")
const nav = document.querySelector(".nav")
const topContentBody = document.querySelector(".top__content_body")
const searchContainer = topContentBody.querySelector(".search__container")
const searchBox = searchContainer.querySelector(".search-box")
const searchBoxExpanded = searchContainer.querySelector(".search-box--expand")
const searchBoxExpandedCloseBtn = searchBoxExpanded.querySelector(".close-btn")
const imagesContainer = document.querySelector(".images__container")
const imageContainer = Array.from(imagesContainer.querySelectorAll(".image__container"))
const dotsContainer = document.querySelector(".dots")
const dots = Array.from(dotsContainer.querySelectorAll(".dot"))
const blackBgSection = document.querySelector(".bg-black")
const blackBgSectionVideo = blackBgSection.querySelector("video")

blackBgSectionVideo.playbackRate = 2.5

videoEl.addEventListener('ended', function() {
   
    const activesource = videoEl.querySelector(".active");
    const nextsource = videoEl.querySelector("source.active + source") || document.querySelector("source:first-child");
    
    // deactivate current source, and activate next one
    activesource.className = "";
    nextsource.className = "active";
    
    // update the video source and play
    videoEl.src = nextsource.src;
    videoEl.play();
  });

  // sectionVideo.addEventListener('ended', function() {
   
  //   const activesource = sectionVideo.querySelector(".active");
  //   const nextsource = sectionVideo.querySelector("source.active + source")
    
  //   // deactivate current source, and activate next one
  //   activesource.className = "";
  //   nextsource.className = "active";
    
  //   // update the video source and play
  //   sectionVideo.src = nextsource.src;
  //   sectionVideo.play();
  // });


  // toggle menu
  menu.addEventListener("click", function(e) {
    e.preventDefault()
    let hidden = videoEl.getAttribute("hidden");
    if(hidden) {
        videoEl.removeAttribute("hidden")
    } else {
        videoEl.setAttribute("hidden", "hidden")
    }

    nav.classList.toggle("hidden")
    menu.querySelector("p").classList.toggle("hidden")
    closeBtn.classList.toggle("hidden")
    topContentBody.classList.toggle("hidden")
  })

  // activate carousel

  let slideIndex = 0

  // get the with of one of the image container to know how much px to move to
  const imageContainerSize = imageContainer[0].getBoundingClientRect().width

  function goToNextSlide() {
    const nextDot = (el) => {
      dots.forEach(dot => {
        dot.classList.remove("active")
      })
      el.classList.add("active")
     
    }

    dotsContainer.addEventListener("click", function(e) {
      if(e.target.classList.contains("dot")) {
        const activeDot = e.target
        nextDot(activeDot)
        slideIndex = dots.indexOf(activeDot)

        const currentSlide = imageContainer[slideIndex]

        imageContainer.forEach(img => {
          img.classList.remove("active")
        })
        currentSlide.classList.add("active")

        // if(slideIndex === dots.length - 1) {
        //   imagesContainer.style.transform = "translateX(-400px)"
        // } else {
        //   imagesContainer.style.transform = `translateX(-${imageContainerSize * slideIndex}px)`
        // }

        imagesContainer.style.transform = `translateX(-${imageContainerSize * slideIndex}px)`
        // console.log(imageContainer.get)
        
      } else {
        return
      }
    })
  
  }
  goToNextSlide()


  searchBox.addEventListener("click", function(e) {
    searchBoxExpanded.classList.toggle("hidden")
    searchBox.classList.toggle("hidden")
    topContentBody.style.top = "0px"
    topContentBody.style.transform = "translateY(0px)"
  })
  
  searchBoxExpandedCloseBtn.addEventListener("click", function(e) {
    searchBoxExpanded.classList.toggle("hidden")
    searchBox.classList.toggle("hidden")
    topContentBody.style.top = "50%"
    topContentBody.style.transform = "translateY(-50%)"
  })

// setting up map using leaflet
  const map = L.map('map').setView([21.7679, 78.8718], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);





  // animations
  const tl = gsap.timeline()
  
const zoomOutSection = document.querySelector(".zoom-out-section")
// const introSection = document.querySelector(".intro-section")
const overflowSection = document.querySelector(".overflow-section")

  const zoomOutSectionHeight = zoomOutSection.getBoundingClientRect().height
  // const introSectionHeight = introSection.getBoundingClientRect().height
const overflowSectionHeight = overflowSection.getBoundingClientRect().height
// console.log(innerHeight.getBoundingClientRect().height)

ScrollTrigger.create({
  trigger: zoomOutSection,
  start: "top top",
  pin: true
})

// ScrollTrigger.create({
//   trigger: overflowSection,
//   start: "top top",
//   pin: true
// })

gsap.registerEffect({
  name: "swapText",
  effect: (targets, config) => {
    let tl = gsap.timeline({delay: config.delay});
    tl.to(targets, {opacity: 0, duration: config.duration});
    tl.add(() => targets[0].innerText = config.text);
    tl.to(targets, {opacity: 1, duration: config.duration});
    return tl;
  },
  scrollTrigger: {
    trigger: zoomOutSection,
    scrub: 3
  },
  defaults: {duration: 2}, 
  extendTimeline: true
});

const spanText = `Koach provides Talent as a Service through a platform connecting businesses with subject matter experts.`
let textTl = gsap.timeline({repeat: -1});
textTl.swapText(".fade-in", {text: "Introducing Koach", delay: .25})
.swapText(".fade-in", {text: "Anytime, Anywhere."})
// .swapText(".fade-in", {text: "Introducing Koach", delay: 2}); // back to the start


// tl.fromTo(".zoom-out-section .h1-fade-in", {
// display: "block",
// duration: 0.5,
//   // stagger: 3,
//   // delay: 20,
//   scrollTrigger: {
//     trigger: ".zoom-out-section",
//     toggleActions: "reverse, none, none, none",
//     start: "top center",
//     // end: `+=${zoomOutSectionHeight}`,
//     scrub: 3,

//     // markers: true
//   }
// })

// tl.to(".zoom-out-section .fade-in", {
//  display: "block",
//   duration: 3,
//   stagger: 3,
//   // delay: 20,
//   scrollTrigger: {
//     trigger: ".zoom-out-section",
//     toggleActions: "reverse, none, none, none",
//     start: "30% center",
//     end: `+=${zoomOutSectionHeight}`,
//     scrub: 3,

//     // markers: true
//   }
// })

  

//  console.log(window.innerWidth)

gsap.to(".zoom-out-section .radial-gradient", {
  ease: "none",
  duration: 3,
  scale: 0.25,
  opacity: 0,
  y: "100%",
  scrollTrigger: {
    trigger: zoomOutSection,
    // toggleActions: "play reset reverse reset",
    start: "top",
    end: `+=${zoomOutSectionHeight}`,
    scrub: 2
  }
})

if(window.innerWidth >= 950) {
 // Background size plugin
const BackgroundSizePlugin = {
  name: "backgroundSize",
  getSize(target, config) {
    let o = {};
    BackgroundSizePlugin.init.call(o, gsap.utils.toArray(target)[0], config);
    return {width: o.sw + o.cw, height: o.sh + o.ch};
  },
  init(target, vars) {
    typeof(vars) !== "object" && (vars = {size: vars});
    let cs = window.getComputedStyle(target),
      imageUrl = cs.backgroundImage,
      {nativeWidth, nativeHeight, scale, size} = vars,
      parsedScale = scale || scale === 0 ? scale : 1,
      data = this,
      image, w, h, ew, eh, ratio, start, end,
      getSize = (size, scale) => {
        if (!/\d/g.test(size) || size.indexOf("%") > -1) {
          ratio = nativeWidth / nativeHeight;
          if (size === "cover" || size === "contain") {
            if ((size === "cover") === (nativeWidth / ew > nativeHeight / eh)) {
              h = eh;
              w = eh * ratio;
            } else {
              w = ew;
              h = ew / ratio;
            }
          } else { // "auto" or %
            size = size.split(" ");
            size.push("");
            w = ~size[0].indexOf("%") ? ew * parseFloat(size[0]) / 100 : nativeWidth;
            h = ~size[1].indexOf("%") ? eh * parseFloat(size[1]) / 100 : nativeHeight;
          }
        } else {
          size = size.split(" ");
          size.push(nativeHeight);
          w = parseFloat(size[0]) || nativeWidth;
          h = parseFloat(size[1]);
        }
        return {w: Math.ceil(w * scale), h: Math.ceil(h * scale)};
      };
    if (imageUrl) {
      if (!nativeWidth || !nativeHeight) {
        image = new Image();
        image.setAttribute("src", imageUrl.replace(/(^url\("|^url\('|^url\(|"\)$|'\)$|\)$)/gi, ""));
        nativeWidth = image.naturalWidth;
        nativeHeight = image.naturalHeight;
      }
      ew = target.offsetWidth;
      eh = target.offsetHeight;
      if (!nativeWidth || !nativeHeight) {
        console.log("bgSize() failed;", imageUrl, "hasn't loaded yet.");
        nativeWidth = ew;
        nativeHeight = eh;
      }
      size || (size = cs.backgroundSize);
      start = getSize(cs.backgroundSize, 1);
      end = getSize(size, parsedScale);
      data.size = parsedScale === 1 ? size : end.w + "px " + end.h + "px";
      data.style = target.style;
      data.sw = start.w;
      data.cw = end.w - start.w;
      data.sh = start.h;
      data.ch = end.h - start.h;
    }
  },
  render(ratio, data) {
    data.style.backgroundSize = ratio === 1 ? data.size : (data.sw + data.cw * ratio).toFixed(1) + "px " + (data.sh + data.ch * ratio).toFixed(1) + "px";
  }
};
gsap.registerPlugin(BackgroundSizePlugin);


// now let's animate...
gsap.fromTo(".bg-img", {
  // delay: 1,
  scale: 1,
  backgroundSize: {
    size: "cover",
    scale: 3, // optionally scale it!
    nativeWidth: 1200, // you don't have to define nativeWidth/nativeHeight but it makes calculations faster and more reliable because it can skip creating an Image and loading the URL.
    nativeHeight: 1200
  }
}, {
  scrollTrigger: {
    trigger: ".options-section",
      scrub: 3,
      start: "top",
      end: `+=${overflowSectionHeight}`

  },
  backgroundSize: {
    size: "cover",
    nativeWidth: 1200, 
    nativeHeight: 1200
  }, 
  duration: 1
}, "+=3");


// or you can grab the numeric width/height (in pixels) like this (returns an object like {width: 100, height: 100})
// let containSize = BackgroundSizePlugin.getSize(".photo", {size: "contain", nativeWidth: 1200, nativeHeight: 1200}); 
// console.log("containSize:", containSize);

  // gsap.to(".zoom-out-section .radial-gradient", {
  //   ease: "none",
  //   duration: 3,
  //   scale: 0.25,
  //   y: "100%",
  //   scrollTrigger: {
  //     trigger: zoomOutSection,
  //     start: "top",
  //     end: `${zoomOutSectionHeight}`,
  //     scrub: 2
  //   }
  // })

  // gsap.to(".zoom-out-section" )

  ScrollTrigger.create({
    duration: 5, 
    trigger: overflowSection,
    start: "top 30%",
    end: "bottom 90%",
    scrub: 3,
    pin: ".pinned",
  })

  // gsap.to(".overflow-section .bg-img", {
  //   // duration: 10,
  //   ease: "none",
  //   // delay: .5,
  //   x: "0%",
  //   scrollTrigger: {
  //     trigger: ".options-section",
  //     scrub: 3,
  //     start: "top",
  //     end: overflowSectionHeight

  //   }
  //   // clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
  //   // scale: 1
  // }, "+=5")


  // console.log(imageContainer)
// const para = imagesContainer.querySelectorAll("p")
// para.forEach(el => el.style.opacity = "0")
  //   tl.to(overflowSection, {

  //     // clipPath: "polygon(0 100%, 100% 100%, 89% 0, 16% 0)",
  //     // color: "#fff",
  //     // backgroundSize: "cover",
  //     // backgroundSize: "128px 128px",
  //   // y: 500,
  //   // backgroundColor: "#29bf12",
  //   duration: 5,
  //   scrollTrigger: {
  //     trigger: overflowSection,
  //     start: "top 30%",
  //     end: "bottom 90%",
  //     scrub: 3, 
  //     pin: ".pinned",
  //     // markers: true
  //   }
  // })
  gsap.to(".overflow-section h3", {
    duration: 3,
    color: "#ffd60a",
    stagger: 2,
    scrollTrigger: {
          trigger: overflowSection,
          scrub: 3,
          start: "top 30%",
          end: `bottom 90%`,
          markers: true
        }
  })
  // .to(imagesContainer, {
  //   duration: 2,
  //   stagger: 0.5,
  //   y: -200,
  //   borderColor: "#29bf12",
  //   scrollTrigger: {
  //     trigger: overflowSection,
  //     scrub: 3,
  //     start: "top 30%",
  //     end: `bottom 90%`,
  //     markers: true
  //   }
  // }, "-=5")
  
  // .to( ".floating-text", {
  //   display: "block",
  //   // y: -200,
  //   y: `-=${overflowSectionHeight / 3}`,
  //   duration: 8,
  //   scrollTrigger: {
  //     trigger: ".options-section",
  //     scrub: 1,
  //     stagger: 2,
  //     // start: `${overflowSectionHeight / 8}`,
  //     // end: "300",
  //     markers: true
  //   }
  // })

  

  // tl.to(".bg-black", {
  //   duration: 0.25,
  //   backgroundColor: "#000814",
  //   scrollTrigger: {
  //     trigger: ".third-image",
  //     scrub: 3,
  //     // start: "top 90%",
  //     markers: true
  //   }
  // })

 

}


 
  // imageContainer.forEach(img => {
  // tl.to(img, {
  //     duration: 3,
  //     opacity: 1,
  //     stagger: 10,
  //   y: -500,
  //     scrollTrigger: {
  //       trigger: ".image__container",
  //       scrub: 5
  //     }
  //   })
  // })

  

  // gsap.from(".intro-section .radial-gradient", {
  //   scale: 100,
  //   duration: 3,
  //   scrollTrigger: {
  //     trigger: ".intro-section",
  //     toggleActions: "reverse, none, none, none",
  //     // start: "top 5%",
  //     end: `+=${introSectionHeight}`,
  //     scrub: 3,
  //     markers: true
  //   }
  // })

  // pin: true,
  // end: `+=${innerHeight} * 1.3`,
  // scrub: 3

  // gsap.to(".zoom-out-section .radial-gradient", {
  //   scale: 0.25,
  //   filter: "blur(0px)",
  //   duration: 3,
  //   scrollTrigger: {
  //     trigger: ".zoom-out-section",
  //     start: "top",
  //     end: `-=${zoomOutSectionHeight} * 1.3`,
  //     scrub: 3
  //   }
  // }, "-=5")