import axios from 'axios';
import React, { useState } from 'react';

const CommentCreate = ({postId}) => {
    const [comment,setComment] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:4001/posts/${postId}/comments`,{
            comment
        })
        setComment('');
    }
    const changeHandler = (text) =>{
        setComment(text.target.value)
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Comment</label>
                    <input className="form-control" onChange={changeHandler} value={comment}/>
                </div>
                <br />
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate