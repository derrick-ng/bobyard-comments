import { useState } from "react";
import axios from "axios";
import CommentList from "./components/CommentList";

function App() {
  return (
    <div>
      <h1 className="text-xl text-center mb-4">Bobyard Take Home - Derrick Ng</h1>
      <CommentList />
    </div>
  );
}

export default App;
