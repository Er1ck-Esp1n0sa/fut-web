import React, { useState } from "react";

const CommentBox = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleNewComment = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = () => {
        if (newComment !== "") {
            const newCommentObj = {
                text: newComment
            };
            setComments([...comments, newCommentObj]);
            setNewComment("");
            setShowForm(false);
        }
    };

    return (
        <div className="comment-box">
            <div className="comments">
                {comments.map((comment, index) => (
                    <div className="comment" key={index}>
                        <p className="comment-text">{comment.text}</p>
                    </div>
                ))}
            </div>
            {showForm ? (
                <div className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={handleNewComment}
                        placeholder="Add a comment..."
                    />
                    <button onClick={handleAddComment}>Post</button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </div>
            ) : (
                <button class="btn btn-primary" onClick={() => setShowForm(true)}>Añadir comentario</button>
            )}
        </div>
    );
};

export default CommentBox;
