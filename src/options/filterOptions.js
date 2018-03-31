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

//RU
const genresOptionsMovieRu = [
    {
      "value": 28,
      "label": "Экшн"
    },
    {
      "value": 12,
      "label": "Приключения"
    },
    {
      "value": 16,
      "label": "Анимация"
    },
    {
      "value": 35,
      "label": "Комедия"
    },
    {
      "value": 80,
      "label": "Криминал"
    },
    {
      "value": 99,
      "label": "Документальный"
    },
    {
      "value": 18,
      "label": "Драма"
    },
    {
      "value": 10751,
      "label": "Симейный"
    },
    {
      "value": 14,
      "label": "Фентези"
    },
    {
      "value": 36,
      "label": "Исторический"
    },
    {
      "value": 27,
      "label": "Ужасы"
    },
    {
      "value": 10402,
      "label": "Музыкальный"
    },
    {
      "value": 9648,
      "label": "Мистика"
    },
    {
      "value": 10749,
      "label": "Романтика"
    },
    {
      "value": 878,
      "label": "Фантастика"
    },
    {
      "value": 10770,
      "label": "ТВ Фильм"
    },
    {
      "value": 53,
      "label": "Триллер"
    },
    {
      "value": 10752,
      "label": "Военный"
    },
    {
      "value": 37,
      "label": "Вестерн"
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

//RU TV
const genresOptionsTVRu = [
    {
      "value": 10759,
      "label": "Экшн"
    },
    {
      "value": 16,
      "label": "Анимация"
    },
    {
      "value": 35,
      "label": "Комедия"
    },
    {
      "value": 80,
      "label": "Криминал"
    },
    {
      "value": 99,
      "label": "Документальный"
    },
    {
      "value": 18,
      "label": "Драма"
    },
    {
      "value": 10751,
      "label": "Семейный"
    },
    {
      "value": 10762,
      "label": "Kvalues"
    },
    {
      "value": 9648,
      "label": "Мистика"
    },
    {
      "value": 10763,
      "label": "Новости"
    },
    {
      "value": 10764,
      "label": "Реалити"
    },
    {
      "value": 10765,
      "label": "Sci-Fi и Фентези"
    },
    {
      "value": 10766,
      "label": "Мыльная опера"
    },
    {
      "value": 10767,
      "label": "Ток-шоу"
    },
    {
      "value": 10768,
      "label": "Война и Политика"
    },
    {
      "value": 37,
      "label": "Вестерн"
    }
];


//SORT_BY options for TV or Movies

const sortByMovies = [
    { value: 'popularity.desc', label: 'Popularity desc' },
    { value: 'popularity.asc', label: 'Popularity asc' },
    { value: 'vote_average.desc', label: 'Rating desc' },
    { value: 'vote_average.asc', label: 'Rating asc' }           
];

//RU
const sortByMoviesRu = [
    { value: 'popularity.desc', label: 'Популярности ▼' },
    { value: 'popularity.asc', label: 'Популярности ▲' },
    { value: 'vote_average.desc', label: 'Рейтингу ↓' },
    { value: 'vote_average.asc', label: 'Рейтингу ↑' }           
];

const sortByTV = [
    { value: 'popularity.desc', label: 'Popularity desc' },
    { value: 'popularity.asc', label: 'Popularity asc' },
    { value: 'vote_average.desc', label: 'Rating desc' },
    { value: 'vote_average.asc', label: 'Rating asc' },
    { value: 'first_air_date.desc', label: 'First Air desc' },
    { value: 'first_air_date.asc', label: 'First Air asc' }             
];

//RU
const sortByTVRu = [
    { value: 'popularity.desc', label: 'Популярности ▼' },
    { value: 'popularity.asc', label: 'Популярности ▲' },
    { value: 'vote_average.desc', label: 'Рейтингу ↓' },
    { value: 'vote_average.asc', label: 'Рейтингу ↑' },
    { value: 'first_air_date.desc', label: 'Дата релиза ▼' },
    { value: 'first_air_date.asc', label: 'Дата релиза ▲' }             
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





export {genresOptionsMovie, genresOptionsMovieRu, genresOptionsTV, genresOptionsTVRu, getYearOptions, sortByTV, sortByTVRu, sortByMovies, sortByMoviesRu};

