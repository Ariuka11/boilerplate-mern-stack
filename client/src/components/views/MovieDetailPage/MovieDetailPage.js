import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_KEY, API_URL, IMG_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import GridCard from '../LandingPage/Sections/GridCard'
import { Button, Descriptions, Row, Badge } from 'antd'
import Favourite from './Sections/Favourite'


function MovieDetailPage(props) {

    const [movie, setMovie] = useState({})
    const [casts, setCasts] = useState([])
    const [toggle, setToggle] = useState(false)
    
    const movieId = props.match.params.movieId
    const movieEndPoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
    const castEndPoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

    useEffect(() => {
        fetchMovieData(movieEndPoint)
        fetchCastData(castEndPoint)
    }, [])
    
    const fetchMovieData = (path) => {
        axios.get(path)
        .then(res => {
            // console.log(res)
            setMovie(res.data)
        })
    }
    const fetchCastData = (path) => {
        axios.get(path)
        .then(res => {
            // console.log(res)
            setCasts(res.data.cast)
        })
    }
   
    const handleClick = () => {
        setToggle(!toggle)
    }
    
    return (
        <div>
            {/* Main Image */}
                {movie && 
                    <MainImage
                        image = {`${IMG_URL}w1280${movie.backdrop_path}`}
                        title = {movie.original_title}
                        text = {movie.overview}
                    />
                }
            
            {/* Body */}
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    {/* Favourite Button */}
                    <div style= {{display :'flex', justifyContent :"flex-end"}}> 
                        <Favourite userId = {localStorage.getItem("userId")} movieId={movieId} movieInfo = {movie} />
                    </div>

                    {/* Movie Info Table */}
                    <Descriptions title="Movie Info" bordered>
                        <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
                        <Descriptions.Item label="Release date">
                            <Badge status="processing" text={movie.release_date} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Revenue">{movie.revenue} $</Descriptions.Item>
                        <Descriptions.Item label="Runtime">{movie.runtime}min</Descriptions.Item>
                        <Descriptions.Item label="Vote average" span={2}>
                            {movie.vote_average}
                        </Descriptions.Item>
                        <Descriptions.Item label="Vote count">{movie.vote_count}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                         <Badge status="processing" text={movie.status} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Popularity">{movie.popularity}</Descriptions.Item>
                    </Descriptions>

                    {/* Toggle Button */}
                    <div style= {{display :'flex', justifyContent :"center", marginTop : "5%"}}> 
                        <Button onClick = {handleClick}  style = {{marginBottom : "2%"}} >See Cast</Button>
                    </div>

                    {/* Grid Cards for Casts */}
                    {toggle && 
                        <Row  gutter={[16, 16]}>
                            {casts && casts.map((cast, index) =>(
                                <React.Fragment key = {index}>
                                    {cast.profile_path &&
                                    <GridCard 
                                        castId = {cast.cast_id}
                                        name = {cast.name}
                                        character = {cast.character}
                                        portrait = {`${IMG_URL}w500${cast.profile_path}`}
                                    />
                                    }
                                </React.Fragment>
                            ))}
                        </Row>
                    }
                </div>
        </div>
    )
}

export default MovieDetailPage
