(function () {
  'use strict';

  function styles(type) {
    const isTop = type === "top" && type !== "fullscreen";
    const isFullScreen = type === "fullscreen";

    return `
.allies__container {
  position: relative;
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: black;
}
.allies__container a {
  color: #2f80ed;
  text-decoration: none;
}
.allies__container a:hover {
  text-decoration: underline;
}
.allies__banner {
  position: fixed;
  background-color: #efefef;
  ${
    isFullScreen
      ? "font-size: 16px; line-height: 24px;"
      : "font-size: 13px; line-height: 15px;"
  }
  z-index: 100000000;
  ${isTop || isFullScreen ? "top: 0" : "bottom: 0"};
  width: 100%;
  ${isFullScreen ? "height: 100%;" : ""}
  margin: 0;
  padding: 8px 0;
  display: flex;
  ${isFullScreen ? "flex-direction: column;" : ""}
  justify-content: center;
  align-items: center;
  ${
    isTop
      ? "box-shadow: 0 -3px 10px -1px black"
      : "box-shadow: 0 0px 10px -4px black"
  };
  transition: 300ms linear all;
}
.allies__text {
  display: inline;
}
@media only screen and (max-width: 600px) {
  .allies__text {
    display: block;
  ${isFullScreen ? "font-size: 16px; line-height: 24px;" : ""}
  }
}
.allies__hidden {
  ${isTop ? "top: -100px" : "bottom: -100px"};
}
.allies__icon {
  position: relative;
  ${!isFullScreen ? "margin-right: 8px;" : ""}
  top: 3px;
}
.allies__dismiss {
  position: absolute;
  ${isFullScreen ? "top: 14px;" : ""}
  right: 14px;
  cursor: pointer;
}`;
  }

  function template(layout) {
    const isFullScreen = layout === 'fullscreen';

    return `
    <div class="allies__banner allies__hidden">
  <svg
    class="allies__icon"
    ${isFullScreen ? 'width="200" height="280"': 'width="20" height="28"'}
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <path
        d="M13.37 12.116c-.412-.586-1.55-2.17-1.55-2.17s.384-.493.682-.972c.3-.48 1.138-2.09 1.423-2.796.284-.706.355-1.718.298-2.17-.057-.453-1-2.126-1.663-2.996C11.896.142 10.74 0 10 0S8.104.142 7.44 1.012c-.663.87-1.606 2.543-1.663 2.996-.056.453.014 1.465.3 2.17.284.706 1.122 2.317 1.42 2.796.3.48.683.972.683.972s-1.137 1.585-1.55 2.17c-.412.586-2.331 3.21-2.63 3.635 0 0 1.123 2.17 1.251 3.249 0 0 2.773-3.768 3.1-4.247.326-.48 1.496-2.057 1.649-2.287.153.23 1.322 1.808 1.65 2.287.326.48 3.099 4.247 3.099 4.247.128-1.078 1.251-3.249 1.251-3.249-.298-.426-2.218-3.049-2.63-3.635zm-2.218-6.337c-.143.206-.96 1.368-1.152 1.584-.192-.216-1.01-1.378-1.151-1.584-.143-.207-1.02-1.758-1.18-2.095a6.338 6.338 0 01-.304-.861c.232-.347 1.051-.679 1.479-.764A9.252 9.252 0 0110 1.944c.139 0 .81.046 1.156.115.428.085 1.247.417 1.479.764 0 0-.142.524-.303.86-.162.338-1.038 1.89-1.18 2.096z"
        fill="url(#paint0_linear)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="10"
        y1="0"
        x2="10"
        y2="19"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stop-color="#010101" stop-opacity=".51" />
      </linearGradient>
      <filter
        id="filter0_d"
        x="0"
        y="0"
        width="20"
        height="28"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="5" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>

  <span style="${!isFullScreen ? 'margin-right: 32px;' : ''}">
    <span class="allies__text"
      >We stand in support of racial equity and justice,&nbsp;</span
    ><span class="allies__text"
      ><a href="https://blacklivesmatters.carrd.co/" target="_blank"
        >learn how you can help</a
      >.</span
    >
  </span>

  <span
    role="button"
    class="allies__dismiss"
    id="dismiss-allies"
    aria-label="dismiss"
    tabindex="0"
  >
    <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.25 1.75l-11.5 11.5M1.75 1.75l11.5 11.5"
        stroke="#515151"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</div>
`;
  }

  var styleTag;
  var bannerTag;
  var fontLink;

  function start({ layout }) {
    createStyles(layout);
    createBanner(layout);

    setTimeout(function () {
      bannerTag.querySelector(".allies__banner").className = "allies__banner";
    }, 500);
  }

  function createStyles(layout) {
    fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Roboto&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    styleTag = document.createElement("style");
    styleTag.setAttribute("type", "text/css");
    styleTag.textContent = styles(layout);
    document.head.appendChild(styleTag);
  }

  function createBanner(layout) {
    bannerTag = document.createElement("div");
    bannerTag.className = "allies__container";
    bannerTag.innerHTML = template(layout);

    document.body.parentElement.appendChild(bannerTag);
    const dismiss = bannerTag.querySelector("#dismiss-allies");
    dismiss.addEventListener("click", dismissBanner);
    dismiss.addEventListener("keydown", handleKeyboardClick(dismissBanner));
  }

  function dismissBanner() {
    bannerTag.querySelector(".allies__banner").className =
      "allies__banner allies__hidden";
    setTimeout(cleanup, 500);
  }

  function cleanup() {
    bannerTag.parentElement.removeChild(bannerTag);
    styleTag.parentElement.removeChild(styleTag);
    fontLink.parentElement.removeChild(fontLink);
  }

  function handleKeyboardClick(fn) {
    return function(e) {
      if(e.key === 'Enter' || e.key === ' ') {
        return fn(e)
      }
    }
  }

  start({layout: 'bottom'});

}());
