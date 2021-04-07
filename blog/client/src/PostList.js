import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

function PostList() {
    const [posts,setPosts] = useState({});
    const fetchPosts = async () => {
        let res = await axios.get('http://localhost:4000/posts');
        setPosts(res.data);
    }
    useEffect(() => {
        fetchPosts();
    },[])
    const renderItems = Object.values(posts).map((o) => {
        return (
            <div className='col-12 col-md-4' key={o.id}>
                <div className='card'>
                    <div className='card-body'>
                        <h3>{o.title}</h3>
                        <hr/>
                        <CommentList postId={o.id}/>
                        <CommentCreate postId={o.id}/>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className='row'>
            {renderItems}
        </div>
    )
}

export default PostList
