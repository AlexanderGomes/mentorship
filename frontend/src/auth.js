import axios from "axios";

async function uploadFiles(photoFile, documentFile) {
  const formData = new FormData();
  formData.append("photo", photoFile);
  formData.append("document", documentFile);

  try {
    await axios.post("/api/auth", formData);
  } catch (error) {
    console.error(error);
  }
}

const auth = {
  uploadFiles,
};

export default auth;
