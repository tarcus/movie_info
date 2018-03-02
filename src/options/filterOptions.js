const genresOptionsMovie = [
    {
      "value": 28,
      "label": "Action"
    },
    {
      "value": 12,
      "label": "Adventure"
    },
    {
      "value": 16,
      "label": "Animation"
    },
    {
      "value": 35,
      "label": "Comedy"
    },
    {
      "value": 80,
      "label": "Crime"
    },
    {
      "value": 99,
      "label": "Documentary"
    },
    {
      "value": 18,
      "label": "Drama"
    },
    {
      "value": 10751,
      "label": "Family"
    },
    {
      "value": 14,
      "label": "Fantasy"
    },
    {
      "value": 36,
      "label": "History"
    },
    {
      "value": 27,
      "label": "Horror"
    },
    {
      "value": 10402,
      "label": "Music"
    },
    {
      "value": 9648,
      "label": "Mystery"
    },
    {
      "value": 10749,
      "label": "Romance"
    },
    {
      "value": 878,
      "label": "Science Fiction"
    },
    {
      "value": 10770,
      "label": "TV Movie"
    },
    {
      "value": 53,
      "label": "Thriller"
    },
    {
      "value": 10752,
      "label": "War"
    },
    {
      "value": 37,
      "label": "Western"
    }  
];


//Genres for TV Filter
const genresOptionsTV = [
    {
      "value": 10759,
      "label": "Action & Adventure"
    },
    {
      "value": 16,
      "label": "Animation"
    },
    {
      "value": 35,
      "label": "Comedy"
    },
    {
      "value": 80,
      "label": "Crime"
    },
    {
      "value": 99,
      "label": "Documentary"
    },
    {
      "value": 18,
      "label": "Drama"
    },
    {
      "value": 10751,
      "label": "Family"
    },
    {
      "value": 10762,
      "label": "Kvalues"
    },
    {
      "value": 9648,
      "label": "Mystery"
    },
    {
      "value": 10763,
      "label": "News"
    },
    {
      "value": 10764,
      "label": "Reality"
    },
    {
      "value": 10765,
      "label": "Sci-Fi & Fantasy"
    },
    {
      "value": 10766,
      "label": "Soap"
    },
    {
      "value": 10767,
      "label": "Talk"
    },
    {
      "value": 10768,
      "label": "War & Politics"
    },
    {
      "value": 37,
      "label": "Western"
    }
];


//SORT_BY options for TV or Movies

const sortByMovies = [
    { value: 'popularity.desc', label: 'Popularity desc' },
    { value: 'popularity.asc', label: 'Popularity asc' },
    { value: 'vote_average.desc', label: 'Rating desc' },
    { value: 'vote_average.asc', label: 'Rating asc' }           
];

const sortByTV = [
    { value: 'popularity.desc', label: 'Popularity desc' },
    { value: 'popularity.asc', label: 'Popularity asc' },
    { value: 'vote_average.desc', label: 'Rating desc' },
    { value: 'vote_average.asc', label: 'Rating asc' },
    { value: 'first_air_date.desc', label: 'First Air desc' },
    { value: 'first_air_date.asc', label: 'First Air asc' }             
];

//generate years for Year filter

function getYearOptions(startYear){
      let result = []
      const currentYear = new Date().getFullYear();
      
      for(let i = startYear; i<=currentYear; i++){
        result.push({ value: i, label: i }) 
      }
      return result.reverse();
}   




export {genresOptionsMovie, genresOptionsTV, getYearOptions, sortByTV, sortByMovies};