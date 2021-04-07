import React, { useState } from 'react'
import axios from 'axios'
function PostCreate() {
    const [title,setTitle] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/posts',{
            title
        })
        setTitle('');
    }
    const changeHandler = (text) =>{
        setTitle(text.target.value)
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" onChange={changeHandler} type="text" value={title}/>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate
