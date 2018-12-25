var api = {
    getNews(){
        var url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=17a46a288932458f8296cb7d00114db5`;
        return fetch(url).then((res) => res.json());
    }
}

module.exports = api;