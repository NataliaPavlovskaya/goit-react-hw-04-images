import axios from 'axios';

export default async function fetchImages(query, currentPage) {
    const url = 'https://pixabay.com/api/';
    const key = '27468413-3d55e0b6bb58ee7723acedfd1';
    const filter = `?q=${query}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;
  
    return await axios.get(`${url}${filter}`)
    .then(response => response.data);
    
  };