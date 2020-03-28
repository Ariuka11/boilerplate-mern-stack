import React, {useEffect, useState} from 'react'
import {Button} from 'antd'
import axios from 'axios'

function Favourite({ userId, movieId, movieInfo }) {

    useEffect(() => {

        const favMovie = { 
            userId: userId,
            movieId: movieId,
            movieTitle: movieInfo.original_title,
            movieImage: movieInfo.backdrop_path,
            movieRunTime: movieInfo.runtime 
        }

        axios.post('/api/favourite/favId', favMovie)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        
    }, [])

    const handleClick = () => {

    }

    return (
        <div>
            <Button onClick = {handleClick}>Favourite</Button>
        </div>
    )
}

export default Favourite
