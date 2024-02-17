import React from 'react'
import Post from './Post';

const Feed = ({posts}) => {
  return (
    <>
            <p className='trending_heading'>
              Trending Movies This Week!
            </p>
            
            <div className='movies'>
            {posts.map(post => (
                // <div className='movies'>
                  <Post key={post.id} post={post} />
                  // </div>
            ))}
            </div>
    </>
  )
}

export default Feed