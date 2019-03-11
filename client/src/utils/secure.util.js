export default {
  decodeRole(roleString, point) {
    const resultString = roleString.substr(point, 1);
    return resultString;
  }
};
