import"./assets/modulepreload-polyfill-ec808ebb.js";import{f as i,i as d}from"./assets/vendor-651d7991.js";const m=document.querySelector("#datetime-picker"),r=document.querySelector("button"),l={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]<new Date?(d.error({message:"Please choose a date in the future",position:"topCenter"}),r.setAttribute("disabled",!0)):(r.removeAttribute("disabled"),t[0])}};i(m,l);function y(t){const s=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),a=Math.floor(t%864e5%36e5/6e4),u=Math.floor(t%864e5%36e5%6e4/1e3);return{days:s,hours:c,minutes:a,seconds:u}}const h=document.querySelector("#data-days"),f=document.querySelector("#data-hours"),T=document.querySelector("#data-minutes"),p=document.querySelector("#data-seconds"),b=document.querySelector("#data-start");b.addEventListener("click",()=>{const t=new Date().getTime(),n=new Date(document.getElementById("datetime-picker").value).getTime();setInterval(()=>{let o=n-t-1e3;console.log(o);const e=y(o);h.textContent=`${e.days}`,f.textContent=`${e.hours}`,T.textContent=`${e.minutes}`,p.textContent=`${e.seconds}`,t+=1e3},1e3)});
//# sourceMappingURL=commonHelpers.js.map