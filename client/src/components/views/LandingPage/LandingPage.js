import React, {useState, useEffect} from 'react'
// import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMG_URL } from '../../Config';
import { Typography, Row, Button } from 'antd';
import axios from 'axios'
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';
const { Title } = Typography;

const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`

function LandingPage() {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(0)
    
    useEffect(() => {
        fetchMovies(endPoint)
    },[]);

    const fetchMovies = (path) => {
        axios.get(path)
        .then(res => {
            // console.log(res)
            setMovies([...movies, ...res.data.results])
            setPage(res.data.page)
        })
        .catch(err => {
            console.log(`Failed to Fetch:`, err)
        })
    }

    const handleClick = () => {
        const pagePoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page + 1}`
        fetchMovies(pagePoint)
    }

    return (
        <div style = {{width:'100%', margin: 0 }}>
            {/* Movie Main Image */}
                {movies[0] && 
                    <MainImage
                        image = {`${IMG_URL}w1280${movies[0].backdrop_path}`}
                        title = {movies[0].original_title} 
                        text = {movies[0].overview} />
                }
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }} >
                <Title level={2}> Latest Movies </Title>
                <hr />

                {/* Grid Cards */}
                <Row  gutter={[16, 16]}>
                    {movies && movies.map((movie, index) =>(
                        <React.Fragment key = {index}>
                            <GridCard 
                                image = {movie.poster_path &&`${IMG_URL}w500${movie.poster_path}`}
                                movieId = {movie.id}
                                title = {movie.title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {/* Load more Button */}
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button className="loadMore" onClick = {handleClick}>Load More</Button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;