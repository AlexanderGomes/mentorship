import React, { useState } from "react";
import auth from "../../auth";

const Dash = () => {
  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await auth.uploadFiles(photo, document);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => setPhoto(event.target.files[0])}
        />
        <input
          type="file"
          onChange={(event) => setDocument(event.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dash;
