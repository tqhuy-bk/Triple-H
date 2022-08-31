async function getIp() {
  return fetch('https://geolocation-db.com/json/')
    .then(res => {
      return res.json();
    })
    .then(data => data.IPv4);
}

export default getIp;
