import jwt_decode from "jwt-decode";

function getUserIdFromAccessToken(accessToken) {
  try {
    const decodedToken = jwt_decode(accessToken);
    return decodedToken.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const user = {
  getUserIdFromAccessToken,
};

export default user;
