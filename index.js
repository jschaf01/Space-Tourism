const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
    
    const visiblity = nav.getAttribute("data-visible");
    if (visiblity === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
})

function selectorClick(ele) {
    var selected = document.querySelector('button[aria-selected="true"]');
    if (ele === selected)
        return;

    if (selected)
        selected.setAttribute("aria-selected", false);

    if (ele) {
        ele.setAttribute("aria-selected", "true");
        var page = getBasePageName().toLowerCase();
        fetchData(page, ele.getAttribute("ID"));
    }
}

function getBasePageName() {
    var url = window.location.pathname;
    if(!url || (url && url.length === 0)) {
      return "";
    }
    var index = url.lastIndexOf("/") + 1;
    var filenameWithExtension = url.substr(index);
    var basename = filenameWithExtension.split(/[.?&#]+/)[0];
  
    // Handle '/mypage/' type paths
    if(basename.length === 0) {
      url = url.substr(0,index-1);
      basename = getBasePageName(url);
    }
    return basename ? basename : ""; 
}

async function fetchData(page, item) {

    if ("index" === page)
       return;    

    var url = "http://localhost:3030/" + page + "/";
    var fn = null;

    switch(page)
    {
        case "destination":
            if (!item)            
                item = document.querySelector('button[aria-selected="true"]').getAttribute("ID");

            fn = setDestinationData;
            break;

        case "crew":
            if (!item)            
                item = document.querySelector('button[aria-selected="true"]').getAttribute("ID");

            fn = setCrewData;
            break;

        case "technology":
            if (!item)            
                item = document.querySelector('button[aria-selected="true"]').getAttribute("ID");

            fn = setTechnologyData;
            break;
    }

    url += item;
    const response = await fetch(url);
    const data = await response.json();
    fn(data);
}

var page = getBasePageName().toLowerCase();
function setNav(page) {

    // nav.querySelectorAll("li").forEach(x => x.removeAttribute("active"));

    switch (page)
    {
        case "index":
            break;

        case "destination":
        case "crew":
        case "technology":
                document.querySelectorAll('button[aria-selected]').forEach(x => 
            {
                x.addEventListener("click", function() { var button = x; selectorClick(button);});
            })

            break;
    }

    //console.log(nav.querySelector('#' + page));
    nav.querySelector('#' + page).setAttribute("class", "active");
}

setNav(page);
fetchData(page);

function setDestinationData(data)
{
    document.querySelector("#webp").setAttribute("srcset", data.images.webp);
    document.querySelector("#png").setAttribute("src", data.images.png);
    document.querySelector("#name").innerHTML=data.name;
    document.querySelector("#description").innerHTML=data.description;
    document.querySelector("#distance").innerHTML=data.distance;
    document.querySelector("#travel").innerHTML=data.travel;
}

function setCrewData(data)
{
    document.querySelector("#webp").setAttribute("srcset", data.images.webp);
    document.querySelector("#png").setAttribute("src", data.images.png);
    document.querySelector("#name").innerHTML=data.name;
    document.querySelector("#bio").innerHTML=data.bio;
    document.querySelector("#role").innerHTML=data.role;
}

function setTechnologyData(data)
{
    document.querySelector("#portrait").setAttribute("src", data.images.portrait);
    document.querySelector("#landscape").setAttribute("src", data.images.landscape);
    document.querySelector("#name").innerHTML=data.name;
    document.querySelector("#description").innerHTML=data.description;
}


