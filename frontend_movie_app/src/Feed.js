import React from 'react'
import Post from './Post';

const Feed = ({posts}) => {
  return (
    <>
            TOP trending This WEEk
            
            {posts.map(post => (
                <div className='movies'><Post key={post.id} post={post} /></div>
            ))}
    </>
  )
}

export default Feed