import React, { useEffect, useState } from 'react'
import config from '../../Constants/Constants'
import urls from '../../Urls'
import Axios from '../../Axios'
import './Banner.css'

function Banner() {
  const [trendingMovie, setTrendingMovie] = useState()

  useEffect(() => {
    Axios.get(urls.Trending).then((result) => {
      const movies = result.data.results;
      if (movies && movies.length > 0) {
        // Generate a random index from 0 to movies.length - 1
        const randomIndex = Math.floor(Math.random() * movies.length);
        setTrendingMovie(movies[randomIndex]);
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <div className='banner'
      style={{ backgroundImage: `url(${trendingMovie ? config.ImageUrl + trendingMovie.backdrop_path : ""})` }}>
      <div className='content'>
        <h1 className='title'>{trendingMovie ? (trendingMovie.name || trendingMovie.title) : ""}</h1>
        <div className='banner-buttons'>
          <button className='button'>Play</button>
          <button className='button'>My list</button>
        </div>
        <h1 className='description'>{trendingMovie ? trendingMovie.overview : ""}</h1>
      </div>
      <div className="fade-bottom"></div>
    </div>
  )
}

export default Banner
