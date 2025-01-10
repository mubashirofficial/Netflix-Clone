import React, { useEffect, useState } from 'react'
import './RowPost.css'
import config from '../../Constants/Constants'
import Axios from '../../Axios'
import YouTube from 'react-youtube'
import urls from '../../Urls'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [videoKey, setVideoKey] = useState()
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  useEffect(() => {
    Axios.get(props.url).then((result) => {
      console.log(result.data);
      setMovies(result.data.results);
    }).catch((err) => {
      console.log(err);
    });
  }, [props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    }
  };

  const playMovieTrailer = (id) => {
    setVideoKey('')
    Axios.get(urls.MovieVideos.replace(':id', id)).then((result) => {
      console.log(result);
      if (result.data.results.length > 0) {
        const video = result.data.results.find(video => video.type === 'Trailer')
          || result.data.results.find(video => video.type === 'Teaser')
          || result.data.results.find(video => video.type === 'Clip')
          || result.data.results[0];
        setVideoKey(video.key);
      }
      else {
        setModalMessage({ title: 'Oops !', message: 'Trailer not available' })
        setShowModal(true);
      }
    }).catch((err) => {
      console.log(err);
      if (err.status === 404) {
        setModalMessage({ title: 'Oops !', message: 'Trailer not available' })
        setShowModal(true);
      }
    });
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((movie) => {
          return (
            <img
              className={props.isSmall ? 'smallPoster' : 'poster'}
              src={movies.length > 0 ? config.ImageUrl + movie.backdrop_path : ""}
              alt={movies.length > 0 ? (movie.name || movie.title) : ""}
              key={movie.id}
              onClick={() => playMovieTrailer(movie.id)}
            />
          );
        })}
      </div>
      <div className='trailerVideo'>
        {videoKey && <YouTube opts={opts} videoId={videoKey} />}
      </div>

      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'flex' : 'none' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 style={{color:'black'}}>{modalMessage ? modalMessage.title : ''}</h5>
          </div>
          <div className="modal-body">
            <p style={{color:'black'}}>{modalMessage ? modalMessage.message : ''}</p>
          </div>
          <div className="modal-footer">
            <button onClick={() => setShowModal(false)}>Ok</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RowPost
