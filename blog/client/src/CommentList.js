import React from 'react'

const CommentList = ({comments}) => {
    const renderItems = comments.map((o) => {
        return (
            <li key={o.id}>{o.comment}</li>
        )
    })
    return (
        <div>
            <ul>
                {renderItems}
            </ul>
        </div>
    )
}

export default CommentList