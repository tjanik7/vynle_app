import React, { useState } from "react"

function CommentCreationForm() {
    const [commentBody, setCommentBody] = useState('')

    return (
        <>
            <form>
                <textarea onChange={(e) => setCommentBody(e.target.value)} />
                <button type={'submit'} className={'btn btn-primary'}>Comment</button>
            </form>
        </>
    )
}

export default CommentCreationForm