import config from "./Constants/Constants";

const urls = {
    Trending: `trending/all/week?api_key=${config.API_KEY}&language=en-US`,
    Originals: `discover/tv?api_key=${config.API_KEY}&with_networks=213`,
    Action: `discover/movie?api_key=${config.API_KEY}&with_genres=28`,
    MovieVideos: `movie/:id/videos?api_key=${config.API_KEY}&language=en-US`
}

export default urls