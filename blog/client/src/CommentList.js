import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CommentList = ({postId}) => {
    const [comments,setComment] = useState({});
    const fetchComments = async () => {
        let res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        setComment(res.data)
    }
    const renderItems = Object.values(comments).map((o) => {
        return (
            <li key={o.id}>{o.comment}</li>
        )
    })
    useEffect(() => {
        fetchComments();
    },[])
    return (
        <div>
            <ul>
                {renderItems}
            </ul>
        </div>
    )
}

export default CommentList