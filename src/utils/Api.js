

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch("${this._baseUrl}/users/me", {
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return res.json()
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }

  getAppInfo() {
    return Promise.all([
      this.getUserInfo().then((res) => {
        this._userId = res._id;
        return res;
      }),
      this.getInitialCards()
    ]);
  }
  

  getInitialCards() {
    return fetch("${this._baseUrl}/cards", {
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return  res.json()
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }


  // other methods for working with the API

 



  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }



editAvatarInfo(avatar) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}
}



export default Api;
