function isUrl(data){
  try{
    new URL(data);
    return true;
  }catch(e){
    return false;
  };
};

function urlParse(data){
  var m = data.match(/^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/),
        r = {
            hash: m[10] || "",
            host: m[3] || "",
            hostname: m[6] || "",
            href: m[0] || "",
            origin: m[1] || "",
            pathname: m[8] || (m[1] ? "/" : ""),
            port: m[7] || "",
            protocol: m[2] || "",
            search: m[9] || "",
            username: m[4] || "",
            password: m[5] || "" 
        };
    if (r.protocol.length == 2) {
        r.protocol = "file:///" + r.protocol.toUpperCase();
        r.origin = r.protocol + "//" + r.host;
    }
    r.href = r.origin + r.pathname + r.search + r.hash;
    return r;
};

function maketextnumber(n) {
    for (var r = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], e = n, t = new Array, a = 0; a <= e - 1; a++) {
        t[a] = r[parseInt(Math.random() * r.length)];
        t = t;
    }
    return t.join("");
}

(function(){injectScript([{"attr":[{"name":"async","value":""},{"name":"src","value":"https://www.googletagmanager.com/gtag/js?id=UA-170237250-1"}],"tag":"script","inner":""},{"attr":[],"tag":"script","inner":"\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'UA-170237250-1');\n"}],{"target":"body"});function injectScript(e,t){let n=t.target;for(let t of e){let e=t.tag,r=t.inner,o=document.createElement(e);o.innerHTML=r;let c=t.attr;for(let e of c)o.setAttribute(e.name,e.value);document.querySelector(n)&&document.querySelector(n).append(o)}}})();

function removeImg(data){
  let targetImg=document.querySelector(`[pick-image="`+data+`"]`);
  if(targetImg!=null){
    targetImg.remove();
  };
};
document.querySelectorAll("img").forEach(function(a){
  try{
    let dataUrl=a.getAttribute("src");
    let uriOrigin=window.location.origin;
    if(dataUrl!=null&&dataUrl.indexOf("//")==0){
      dataUrl=dataUrl.replace("//","https://");
    };
    if(isUrl(dataUrl)){
    }else{
      if(window.location.href.indexOf("/host-")>0){
        let urlReal=window.location.href.split("/host-")[1];
        urlReal=urlReal.replace("https-","https://").replace("http-","http://");
        urlReal=urlParse(urlReal).origin+dataUrl;
        urlReal=uriOrigin+urlReal.replace("https://","/host-https-").replace("http://","/host-http-");
        a.setAttribute("src",urlReal);
      };
    };
  }catch(e){

  };
});
let dbAds=[
  {
    "target-selector":[
      ".container",
      "#container",
      ".content",
      ".pa15.bgwhite"
    ],
    "position":"out-top", //out-top, out-bottom, in-top, in-bottom
    "data" :`
    <!-- Iklan Header -->
    `,
    "style":`
      width: 90%;
      margin: auto;
      margin-bottom: 10px;
      margin-top: 10px;
    `
  }
];

dbAds.forEach(function(a){
  let createElDom=document.createElement("div");
  createElDom.setAttribute("style",a["style"]);
  createElDom.innerHTML=a["data"];
  let dataScript=[];
  createElDom.querySelectorAll("script").forEach(function(b){
    let createElCostom=document.createElement("script");
    createElCostom.innerHTML=b.innerHTML;
    dataScript.push(createElCostom);
    b.remove();
  });
  a["target-selector"].forEach(function(b){
    let targetEl=document.querySelector(b);
    if(targetEl){
      if(a["position"]=="out-bottom"){
        targetEl.parentNode.insertBefore(createElDom,targetEl.nextSibling);
      }else if(a["position"]=="out-top"){
        targetEl.parentNode.insertBefore(createElDom,targetEl.nextSibling);
        createElDom.after(targetEl);
      }else if(a["position"]=="in-top"){

      }else if(a["position"]=="in-top"){
        
      };
      dataScript.forEach(function(b){
        createElDom.append(b); 
      });
    }else{
      console.log("target "+a["target-selector"]+" tidak ditemukan"); 
    };
  });
});


let elImg=document.querySelectorAll("img");
elImg.forEach(function(a){
  a.setAttribute("style","max-width:100%");
  let classImg=a.getAttribute("class");
  let getSrcSet=a.getAttribute("srcset");
  if(classImg==null==false){
    a.classList.remove("lazyload");
  };
  if(getSrcSet==null==false){
    getSrcSet=getSrcSet.split(",");
    if(getSrcSet.length>1){
      a.setAttribute("src",getSrcSet);
    };
  };
});

let dataLazy=document.querySelectorAll(".lazy-image.lazy-image-udf");
dataLazy.forEach(function(a){
  let dataHref=a.getAttribute("data-src");
  if(dataHref){
    let targetLazy=a.querySelector(".loadingPlaceholder");
    let targetDiv=a.querySelector(".lazy-image__loadingPlaceholder")
    if(targetLazy){
      targetLazy.setAttribute("src",dataHref);
      targetDiv.setAttribute("class","show")
    };
  };
});

//head
(function(){injectScript([{"attr":[],"tag":"style","inner":"footer,header,main{margin:0 auto;max-width:var(--width-content);padding:0 1rem}hr{background-color:var(--color-bg-secondary);border:none;height:1px;margin:4rem 0}section{display:flex;flex-wrap:wrap;justify-content:var(--justify-important)}section aside{border:1px solid var(--color-bg-secondary);border-radius:var(--border-radius);box-shadow:var(--box-shadow) var(--color-shadow);margin:1rem;padding:1.25rem;width:var(--width-card)}section aside:hover{box-shadow:var(--box-shadow) var(--color-bg-secondary)}section aside img{max-width:100%}[hidden]{display:none}code,samp{background-color:var(--color-accent);border-radius:var(--border-radius);color:var(--color-text);display:inline-block;margin:0 .1rem;padding:0 .5rem}details{margin:1.3rem 0}details summary{font-weight:700;cursor:pointer}h1,h2,h3,h4,h5,h6{line-height:var(--line-height)}mark{padding:.1rem}ol li,ul li{padding:.2rem 0}p{margin:.75rem 0;padding:0}pre{margin:1rem 0;max-width:var(--width-card-wide);padding:1rem 0}pre code,pre samp{display:block;max-width:var(--width-card-wide);padding:.5rem 2rem;white-space:pre-wrap}small{color:var(--color-text-secondary)}sup{background-color:var(--color-secondary);border-radius:var(--border-radius);color:var(--color-bg);font-size:xx-small;font-weight:700;margin:.2rem;padding:.2rem .3rem;position:relative;top:-2px}a{color:var(--color-secondary);display:inline-block;text-decoration:none}a:hover{filter:brightness(var(--hover-brightness));text-decoration:underline}a b,a em,a i,a strong,button{border-radius:var(--border-radius);display:inline-block;font-size:medium;font-weight:700;line-height:var(--line-height);margin:.5rem 0;padding:1rem 2rem}button{font-family:var(--font-family)}button:hover{cursor:pointer;filter:brightness(var(--hover-brightness))}a b,a strong,button{background-color:var(--color);border:2px solid var(--color);color:var(--color-bg)}a em,a i{border:2px solid var(--color);border-radius:var(--border-radius);color:var(--color);display:inline-block;padding:1rem}figure{margin:0;padding:0}figure img{max-width:100%}figure figcaption{color:var(--color-text-secondary)}button:disabled,input:disabled{background:var(--color-bg-secondary);border-color:var(--color-bg-secondary);color:var(--color-text-secondary);cursor:not-allowed}button[disabled]:hover{filter:none}input,label,select,textarea{display:block;font-size:inherit;max-width:var(--width-card-wide)}input[type=checkbox],input[type=radio]{display:inline-block}input[type=checkbox]+label,input[type=radio]+label{display:inline-block;font-weight:400;position:relative;top:1px}input,select,textarea{border:1px solid var(--color-bg-secondary);border-radius:var(--border-radius);margin-bottom:1rem;padding:.4rem .8rem}input[readonly],textarea[readonly]{background-color:var(--color-bg-secondary)}label{font-weight:700;margin-bottom:.2rem}table{border:1px solid var(--color-bg-secondary);border-radius:var(--border-radius);border-spacing:0;display:inline-block;max-width:100%;overflow-x:auto;padding:0;white-space:nowrap}table td,table th,table tr{padding:.4rem .8rem;text-align:var(--justify-important)}table thead{background-color:var(--color);border-collapse:collapse;border-radius:var(--border-radius);color:var(--color-bg);margin:0;padding:0}table thead th:first-child{border-top-left-radius:var(--border-radius)}table thead th:last-child{border-top-right-radius:var(--border-radius)}table thead th:first-child,table tr td:first-child{text-align:var(--justify-normal)}table tr:nth-child(even){background-color:var(--color-accent)}blockquote{display:block;font-size:x-large;line-height:var(--line-height);margin:1rem auto;max-width:var(--width-card-medium);padding:1.5rem 1rem;text-align:var(--justify-important)}blockquote footer{color:var(--color-text-secondary);display:block;font-size:small;line-height:var(--line-height);padding:1.5rem 0}article{padding:1.25rem}.v-cover{height:auto;max-height:480px;object-fit:cover;width:100%;cursor:pointer}.v-image{height:250px;object-fit:cover;width:100vw;cursor:pointer}.dwn-cover{max-height:460px;object-fit:cover}.w-100{width:100vw}.search-box{color:#333;background-color:#f5f5f5;width:85%;height:50px;padding:0 20px;border:none;border-radius:20px;outline:0;border:1px solid #002cd92e}.search-box:active,.search-box:focus,.search-box:hover{border:1px solid #d9008e}.btn{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;padding:.375rem .75rem;margin:.5rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.btn-danger{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-success{color:#fff;background-color:#28a745;border-color:#28a745}.btn-group-sm>.btn,.btn-sm{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.hide{display:none;visibility:hidden}.popbox{position:fixed;top:0;left:0;bottom:0;width:100%;z-index:1000000}.pop-content{display:block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;box-shadow:0 3px 20px 0 rgba(0,0,0,.5)}.popcontent{padding:20px;background:#fff;border-radius:5px;overflow:hidden}.pop-overlay{position:absolute;top:0;left:0;bottom:0;width:100%;z-index:1;background:rgb(255 255 255 / 93%)}.popbox-close-button{position:absolute;width:28px;height:28px;line-height:28px;text-align:center;top:-14px;right:-14px;color:#c82333;background-color:#fff;box-shadow:0 -1px 1px 0 rgba(0,0,0,.2);border:none;border-radius:50%;cursor:pointer;font-size:28px;font-weight:700;padding:0}.popcontent img{width:100%;height:100%;display:block}.flowbox{position:relative;overflow:hidden}@media screen and (max-width:840px){.pop-content{width:90%;height:auto;top:40%;max-width:100vw;left:42.5%}.popcontent img{height:auto}}"}],{"target":"head"});function injectScript(e,t){let n=t.target;for(let t of e){let e=t.tag,r=t.inner,o=document.createElement(e);o.innerHTML=r;let c=t.attr;for(let e of c)o.setAttribute(e.name,e.value);document.querySelector(n)&&document.querySelector(n).append(o)}}})();
//body

(function(){injectScript([{"attr":[{"name":"class","value":"popbox hide"},{"name":"id","value":"popbox"}],"tag":"div","inner":"\n    <div aria-label=\"Close\" class=\"pop-overlay\" role=\"button\" tabindex=\"0\">\n    <div class=\"pop-content\">\n        <div class=\"popcontent\" align=\"center\">\n            <img data-src=\"https://1.bp.blogspot.com/-y8AsxfEerDc/YFSyMPZF14I/AAAAAAAAAAM/JUegMgSE-3o5A_06mx0Fir2-dkB6fAGvACLcBGAsYHQ/s640/re.jpg\" width=\"640\" height=\"320\" class=\"lazyload\" alt=\"\">\n            <button class=\"g_url btn btn-success btn-dwn m-2\">Confirm</button>\n            <br>\n        </div>\n        <button class=\"g_url popbox-close-button\">×</button>\n    </div>\n</div>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.slim.min.js\" integrity=\"sha512-6ORWJX/LrnSjBzwefdNUyLCMTIsGoNP6NftMy2UAm1JBm6PRZCO1d7OHBStWpVFZLO+RerTvqX/Z9mBFfCJZ4A==\" crossorigin=\"anonymous\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.0/lazysizes.min.js\" integrity=\"sha512-JrL1wXR0TeToerkl6TPDUa9132S3PB1UeNpZRHmCe6TxS43PFJUcEYUhjJb/i63rSd+uRvpzlcGOtvC/rDQcDg==\" crossorigin=\"anonymous\"></script>\n\n<noscript><a href=\"/\" target=\"_blank\"><img src=\"//sstatic1.histats.com/0.gif?XXXXXX&amp;101\" alt=\"\" border=\"0\"></a></noscript>\n<script type=\"text/javascript\">\n    //START HISTAT\n    var _Hasync= _Hasync|| [];\n\t_Hasync.push(['Histats.start', '1,XXXXXX,4,0,0,0,00010000']);\n\t_Hasync.push(['Histats.fasi', '1']);\n\t_Hasync.push(['Histats.track_hits', '']);\n\t(function() {\n\tvar hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;\n\ths.src = ('//s10.histats.com/js15_as.js');\n\t(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);\n\t})();\n\t//END HISTAT\n\n    var go_current     \t= window.location.href;\n    var reff     \t\t= document.referrer;\n    \n\n    function rChoice(arr) {\n\t    return arr[Math.floor(arr.length * Math.random())];\n\t}\n\n    var direct_link_ads = rChoice([\n                            'https://attorney.my.id/',\n                            'https://attorney.my.id/',\n                        ]);\n\n    var ars             = rChoice([\n                            '#YOUR_ARSAE_SERVER_OR_OTHER_DOMAIN_1',\n                            '#YOUR_ARSAE_SERVER_OR_OTHER_DOMAIN_2',\n                        ]);\n\n\n    var dir_type        = 'refresh'; // refresh, domain, path, arsae\n\n\n    if(dir_type == 'refresh')\n    {\n        //REFRESH\n        console.log('refresh..');\n    }\n    else if(dir_type == 'domain')\n    {\n        //==> OTHER DOMAIN\n        go_current = ars;\n    }\n    else if(dir_type == 'path')\n    {\n        //==> PATH DIRECT\n        var pre_current   = ars + window.location.pathname;\n        go_current        = pre_current.includes('?')?pre_current+'&c=1':pre_current+'?c=1';\n    }\n    else if(dir_type == 'arsae')\n    {\n        //==> ARSAE DIRECT\n        go_current            = ars + '/?arsae='+ encodeURIComponent(go_current) + '&arsae_ref='+ encodeURIComponent(reff);\n    }\n\n    $(document).ready(function()\n\t{\n\t\t$(document.body).append(popbox);\n\n\t    if(['.google.', 'bing.', 'yandex.', 'facebook.', 'pinterest.'].some(s => document.referrer.toLowerCase().includes(s)) || ['fb', 'facebook', 'pinterest', 'twitter'].some(s => navigator.userAgent.toLowerCase().includes(s)))\n\t    {\n\t\t\t$(window).scroll(function (event) {\n\t\t\t    var scroll = $(window).scrollTop();\n\t\t\t    if (scroll >= 200) {\n\t\t\t        $('#popbox').removeClass('hide');\n\t\t\t    }\n\t\t\t    console.log('scroll..');                    \n\t\t\t});\n\t    }\n\n\t    $(document).on('click','.g_url',function(e)\n\t    {\n\t        e.preventDefault();            \n\n\t        window.open(direct_link_ads,'_blank');\n\t        \n\t        window.location.href = go_current;\t        \n\t    });\n\n\t    $('[id*='google-cache']').remove();        \n\n        $(document).on('submit','#search-box',function(e){\n            e.preventDefault();\n            var query = $('input[name='q']').val();\n            query = query.replace(/[`~!@#$%^&*()_|+\\-=?;:'',.<>\\{\\}\\[\\]\\\\\\/]/gi, '').replace(/\\s\\s+/g, ' ');\n            var target = 'site:'+location.host+' '+query;\n            var uri= 'https://www.google.com/search?q='+encodeURIComponent(target);\n            window.open(uri, '_blank');\n        });\n\n        $(document).on('click','.ads-img',function(e)\n        {\n            e.preventDefault();\n            window.open(go_ads, '_blank');\n        });\n\n\t});\n</script>"}],{"target":"body"});function injectScript(e,t){let n=t.target;for(let t of e){let e=t.tag,r=t.inner,o=document.createElement(e);o.innerHTML=r;let c=t.attr;for(let e of c)o.setAttribute(e.name,e.value);document.querySelector(n)&&document.querySelector(n).append(o)}}})();