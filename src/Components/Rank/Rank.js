import React from 'react';

const Rank = ({ name, entries}) => {
    return (
        <div>
            <div className='white f3'>
                <p>{name} , your current rank is .....</p>
            </div>
            <div className='white f1'>
                {entries}
            </div>

        </div>
    )
}
export default Rank;