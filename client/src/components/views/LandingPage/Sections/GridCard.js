import React from 'react'
import { Col } from 'antd'

function GridCard(props) {
    const {image, movieId, title} = props
    return (
        <div>
            <Col key={movieId} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${movieId}`} >
                        <img style={{ width: '80%', height: '350px', borderRadius: "10px" }} alt={title} src={image} />
                    </a>
                </div>
            </Col>
        </div>
    )
}

export default GridCard
