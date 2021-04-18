import React from 'react'

const CommentList = ({comments}) => {
    const renderItems = comments.map((o) => {
        let status = ''
        let color = ''
        if(o.status==='pending'){
            color = 'warning'
            status = 'Pending'
        }else if(o.status==='rejected'){
            color = 'danger'
            status = 'Rejected'
        }else if(o.status==='approved'){
            color = 'success'
            status = 'Approved'
        }
        return (
            <li key={o.id}>{o.comment} <label className={`text text-${color}`}>({status})</label></li>
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