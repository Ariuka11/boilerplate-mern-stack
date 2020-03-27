import React from 'react'
import { Col } from 'antd'

function GridCard(props) {
    const {image, movieId, title, name, character, portrait, castId} = props
    if(name) {
        return (
            <div>
                <Col key={castId} lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <img style={{ width: '75%', height: '470px', borderRadius: "10px" }} alt={name} src={portrait} />
                            <h3>{name}</h3>
                    </div>
                </Col>
            </div>
        )
    } else {
        return (
            <div>
                <Col key={movieId} lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <a href={`/movie/${movieId}`} >
                            <img style={{ width: '80%', height: '470px', borderRadius: "10px", margin: "2%"}} alt={title} src={image} />
                        </a>
                    </div>
                </Col>
           </div>
        ) 
    }
}

export default GridCard
