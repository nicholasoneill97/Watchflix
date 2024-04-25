//api key

export const key = 'd50834595a9ac5c2fd35904d6b68625b'

//requests that populate the home page's movie rows

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestComedy: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=Comedy&page=3&include_adult`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    
    
    
     
}

export default requests