import jwt_decode from "jwt-decode";

function getUserIdFromAccessToken(accessToken) {
  try {
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      return decodedToken.id;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const user = {
  getUserIdFromAccessToken,
  phoneRegExp,
};

export default user;
