const btn = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});


const newsContainer = document.querySelector('#news')
const allApiBtns = document.querySelectorAll('.get_all_news')

const fetchNews = async (dataFilter) => {
  const data = await fetch(`https://api.nytimes.com/svc/topstories/v2/${dataFilter}.json?api-key=IIiCedQu6MqFJCKhPBLjxdTf5IxN5nNe`);
  const response = await data.json();
  return response;
}

const writeResToDom = (results) => {
  results.forEach(res => {
    const card = /*html*/ `
        <div class="p-4 md:w-6/12 lg:w-4/12"> 
          <a href="${res.url}" class="rounded-sm bg-slate-400">
            <img src="${res.multimedia[0].url}" alt="">
            <h3>${res.title}</h3>
            <p>${res.abstract}</p>
          </a>
        </div>
      `;
    newsContainer.innerHTML += card;
  });
}

allApiBtns.forEach(btn => {
  btn.addEventListener("click", async () => {
    const dataFilter = btn.getAttribute("data-filter")
    const data = await fetchNews(dataFilter)
    const results = data.results.slice(0,6)

    newsContainer.innerHTML = ''
    writeResToDom(results);
  })
});



