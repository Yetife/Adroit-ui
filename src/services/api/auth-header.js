export default function authHeader() {
  let user = JSON.parse(JSON.stringify(sessionStorage.getItem('token')));
  if (user) {
    return { Authorization: `Bearer ${user}` };
  } else {
    return {};
  }
}
