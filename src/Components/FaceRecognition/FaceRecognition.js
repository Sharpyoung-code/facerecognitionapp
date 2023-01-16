import React from 'react';
import "./FaceRecognition.css"

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center'>
            <div className='absolute'>
                <img id="inputImage" alt="" src={imageUrl} width="400px" height="auto" />
                {box ? (
                    box.map((item) => (
                        <div 
                          key={item.bottomRow}
                          className='bounding-box' 
                          style={{ 
                            top: item.topRow, 
                            bottom: item.bottomRow, 
                            left: item.leftCol, 
                            right: item.rightCol 
                          }}
                        ></div>
                    ))
                ) : (
                    <div></div>
                )}
                
            </div>
            
        </div>
    )
}
export default FaceRecognition;