(()=>{var e={687:()=>{const e=document.querySelectorAll(".wp-block-bigbite-image-comparison");if(e?.length>0){let t=!1;const i=()=>{t=!1},o=()=>{t=!0},n=(e,i)=>{if(!t)return;const o=i.querySelector(".wp-block-bigbite-image-comparison__container"),n=o?.parentElement?.classList?.contains("wp-block-bigbite-image-comparison--horizontal"),r=n?e?.clientY:e?.clientX,a=e?.target?.getBoundingClientRect();let c=(r-(n?a?.y:a?.x))/(n?a?.height:a?.width)*100;c<0?c=0:c>100&&(c=100),i.style.setProperty("--bigbite-image-comparison-divider-initial-position",c)},r=(e,t)=>{const i=e?.keyCode;let o;const n=t.querySelector(".wp-block-bigbite-image-comparison__container"),r=n?.parentElement?.classList?.contains("wp-block-bigbite-image-comparison--horizontal"),a=r?[38,40]:[37,39];if(!a.includes(i))return;e.preventDefault();const c=parseInt(t.style.getPropertyValue("--bigbite-image-comparison-divider-initial-position"),10);o=0===a.indexOf(i)?c-10:c+10,o<0?o=0:o>100&&(o=100),t.style.setProperty("--bigbite-image-comparison-divider-initial-position",o)};e?.forEach((e=>{const t=e.querySelector(".wp-block-bigbite-image-comparison__container"),i=e.querySelector(".wp-block-bigbite-image-comparison__divider button");t.addEventListener("pointerdown",o),t.addEventListener("pointermove",(t=>n(t,e))),i.addEventListener("keydown",(t=>r(t,e)))})),window.addEventListener("pointerup",i)}}},t={};function i(o){var n=t[o];if(void 0!==n)return n.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";i(687)})()})();
//# sourceMappingURL=frontend-896f4274.js.map