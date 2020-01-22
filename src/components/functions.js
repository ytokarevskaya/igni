/*
  Определение мобильного устройства
*/
const isMobile = () => {
  const userAgentFlag = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera));
  return (userAgentFlag || (window.innerWidth < 1280));
}

const isTablet = () => {
  return window.mobile && window.innerWidth >= 768;
}

// для больших айпадов - размер крупнее
const getTabletFont = () => {
  return window.tablet && window.innerWidth > 1280 && window.innerWidth < 1367? 18 : 15;
}

const onWindowResize = () => {
  window.mobile = isMobile();
  window.tablet = isTablet();
  if (window.mobile) {
    document.body.classList.add("mobile");
    document.body.classList.remove("desktop");
    // removeWheelListener(onWheel);
    // main.addEventListener("scroll", defaultScroll);
    setFontSize(window.tablet? getTabletFont() : 10);
  } else {
    document.body.classList.add("desktop");
    document.body.classList.remove("mobile");
    // if (page === "home") {
      // setWheelListener(onWheel);
      // main.removeEventListener("scroll", defaultScroll);
    // } else {
      // removeWheelListener(onWheel);
      // main.addEventListener("scroll", defaultScroll);
    // }
    setFontSize();
  }
}

/*
  Устаналивает font-size для элемента html, чтобы масштабировать все эл-ты с размером в rem-единицах
*/
const setFontSize = (val) => {
  const fontVal = val || 5+4*((window.innerWidth*window.innerHeight)/(1920*1080));
  document.getElementsByTagName("html")[0].style.fontSize = fontVal + "px";
}

const getURLParameter = (name, searchLine) => {
  const search = searchLine || window.location.search || window.location.hash;
  const uri = (new RegExp('(\\?|&)' + name + '=' + '(.+?)(&|$)').exec(search)||["",null])[2];
  return uri && decodeURI(uri);
}

const setWheelListener = (listener) => {
  if ("onwheel" in document) {
    // IE9+, FF17+, Ch31+
    window.addEventListener("wheel", listener);
  } else if ("onmousewheel" in document) {
    window.addEventListener("mousewheel", listener);
  } else {
    // Firefox < 17
    window.addEventListener("MozMousePixelScroll", listener);
  }
}

const removeWheelListener = (listener) => {
  if ("onwheel" in document) {
    window.removeEventListener("wheel", listener);
  } else if ("onmousewheel" in document) {
    window.removeEventListener("mousewheel", listener);
  } else {
    window.removeEventListener("MozMousePixelScroll", listener);
  }
}

const onPageLoad = () => {
  window.mobile = isMobile();
  window.tablet = isTablet();
  document.body.classList.add(window.mobile? "mobile" : "desktop");

  if (window.mobile && !window.tablet) {
    setFontSize(10);
  } else if (window.tablet) {
    setFontSize(getTabletFont());
  } else setFontSize();
}

export { onWindowResize, onPageLoad }