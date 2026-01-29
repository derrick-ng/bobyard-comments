import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const API_URL = "http://localhost:8000/api/comments/";

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const response = await axios.get(API_URL);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, {
        text: newComment,
      });
      setComments([response.data, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding new comment", error);
    }
  };

  const handleStartEdit = (comment) => {
    setEditId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.put(`${API_URL}${id}/`, {
        text: editText,
      });
      setComments(comments.map((comment) => (comment.id === id ? response.data : comment)));
      setEditId(null);
      setEditText("");
    } catch (error) {
      console.error("Error editing comment", error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setComments(comments.filter((comment) => comment.id != id));
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl text-center font-bold">Comments Section</h1>
      <h2 className="text-lg mb-4">{comments.length} Comments</h2>

      {/* Add comment */}
      <form className="mb-10" onSubmit={handleAddComment}>
        <textarea
          className="w-full pb-2 border-b border-gray-300"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <div className="flex justify-end pt-2">
          <button className="px-4 py-2 text-sm bg-blue-400 rounded-full" type="submit">
            Comment
          </button>
        </div>
      </form>

      {/* Comments List*/}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id}>
            {/* Author and Date */}
            <div className="flex gap-4 mb-1">
              <div className="text-sm">{comment.author}</div>
              <div className="text-gray-500 text-xs mt-0.5">{new Date(comment.date).toLocaleDateString()}</div>
            </div>

            {editId == comment.id ? (
              <div>
                <textarea
                  className="w-full pb-2 border-b-2 border-gray-900"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows="3"
                />
                <div className="flex gap-3 justify-end">
                  <button className="px-4 py-2 text-sm hover:bg-gray-100 rounded-full" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-700 rounded-full bg-blue-400 " onClick={() => handleSaveEdit(comment.id)}>
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Text */}
                <p className="text-sm mb-2">{comment.text}</p>

                {/* Image */}
                {comment.image && <img className="max-w-sm" src={comment.image} />}

                {/* Like, Edit, and Cancel */}
                <div className="flex items-center gap-4">
                  <div className="text-gray-600">👍 {comment.likes}</div>
                  <button className="text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100" onClick={() => handleStartEdit(comment)}>
                    Edit
                  </button>
                  <button className="text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100" onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
