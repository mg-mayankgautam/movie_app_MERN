import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// const api = axios.create({
//     baseURL: 'http://localhost:3500'
// });

const Addpost = ({handleSubmit, postTitle, setPostTitle, postBody, setPostBody}) => {
    
    //console.log(postTitle,postBody);
  return (
    <div>

        <main className="NewPost">
            <h2>Add New Post</h2>
            <form className="newPostForm"
              onSubmit={handleSubmit}
             >
                <label htmlFor="postTitle">Title:</label>
                <input
                    placeholder='Title'
                    id="postTitle"
                    type="text"
                    required
                     value={postTitle}
                     onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    placeholder='Post:'
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>

    </div>
  )
}

export default Addpost