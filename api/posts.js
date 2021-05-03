// A class for interacting with our https://dummyapi.io/ data
class API {
  constructor() {
    this._url = 'https://dummyapi.io/data/api/post?limit=5'; // post endpoint limit 5
    this._app_id = '608ff65ecfb4e068c46f3038'; // had to signup for a app id key
    this._options = {
      headers: { 'app-id': this._app_id }, // we have to add the cred to the headers of the req
    };
    this._posts = []; // db store property for our posts
  }
  get url() {
    return this._url;
  }
  get options() {
    return this._options;
  }
  get posts() {
    return this._posts;
  }
  async getInitialPosts() {
    try {
      const response = await fetch(this.url, this.options);
      const postData = await response.json();
      console.log('Retrieved Posts from API!');
      this._posts = postData.data;
    } catch (err) {
      console.log(err);
    }
  }
  getPosts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.posts
          ? resolve(this.posts)
          : reject(new Error(`Couldn't retrieve post data!`));
      }, 1000);
    });
  }

  addPost(post) {
    return new Promise((resolve, reject) => {
      this._posts.push(post);
      console.log('Post was created!');
      setTimeout(() => {
        post
          ? resolve(post)
          : reject(new Error(`Error: something went wrong!`));
      }, 500);
    });
  }

  deletePost() {
    return new Promise((resolve, reject) => {
      const deletedPost = this._posts.pop();
      console.log('Last Post was deleted!');
      setTimeout(() => {
        deletedPost
          ? resolve(deletedPost)
          : reject(new Error(`Error: something went wrong!`));
      }, 500);
    });
  }
}

const api = new API();

const init = async () => {
  await api.getInitialPosts();
};

init();
