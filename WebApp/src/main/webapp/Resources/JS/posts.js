/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
class PhotoPost {
	constructor(id, description, createdAt, author, photoLink, hashtags, likes) {
		this.id = id;
		this.description = description;
		this.createdAt = createdAt;
		this.author = author;
		this.photoLink = photoLink;
		this.hashtags = hashtags;
		this.likes = likes;
	}

	static parsePhotoPost(post) {
		return (new PhotoPost(post.id, post.description, post.createdAt, post.author, post.photoLink, post.hashtags, post.likes));
	}

	static validatePost(post) {
		return (typeof post.id === 'string' &&
			// typeof post.description === "string" &&
			typeof post.createdAt === 'object' &&
			typeof post.author === 'string' &&
			typeof post.photoLink === 'string' &&
			typeof post.hashtags === 'object' &&
			typeof post.likes === 'object' &&
			post.id &&
			// post.description &&
			post.createdAt &&
			post.author &&
			post.photoLink) ? true : false;
	}
}

class Posts {
	constructor(posts = [], authors = []) {
		this._posts = posts;
		this._authors = authors;
	}

	getPosts(skip, size, filterConfig) {
		if (!(skip >= 0 && skip < this._posts.length)) {
			return [];
		}
		let res = this._posts;
		if (filterConfig !== undefined) {
			if (filterConfig.author) {
				res = res.filter(post => post.author === filterConfig.author);
			}
			if (filterConfig.hashtags) {
				res = this._filterByHashTags(res, filterConfig.hashtags);
			}
		}
		return res.sort((a, b) => b.createdAt - a.createdAt).slice(skip, skip + size);
	}

	_filterByHashTags(arr, hashtags) {
		return arr.filter(post => {
			for (let i = 0; i < post.hashtags.length; ++i) {
				if (hashtags.some((item) => item === post.hashtags[i])) {
					return true;
				}
			}
			return false;
		});
	}

	getPost(id) {
		return this._posts.find((item) => {
			return item.id === id;
		});
	}

	addPost(post) {
		if (this._isIDExist(post.id)) {
			post.id = '' + this._generateID();
		}
		const isValid = PhotoPost.validatePost(post);
		if (isValid) {
			this._posts.push(post);
			if (!this._authors.some((item) => item === post.author)) {
				this._authors.push(post.author);
			}
		}
		return isValid;
	}

	editPost(id, post) {
		if (!this._isIDExist(id)) return false;
		let curPost = this.getPost(id);
		const tempPost = new PhotoPost(curPost.id, post.description, curPost.createdAt, curPost.author, post.photoLink, curPost.hashtags, curPost.likes);
		const isValid = PhotoPost.validatePost(tempPost);
		if (isValid) {
			const index = this._posts.indexOf(this.getPost(id));
			this._posts[index] = tempPost;
		}
		return isValid;
	}

	removePost(id) {
		if (!this._isIDExist(id)) return false;
		this._posts.splice(id - 1, 1);
		return true;
	}

	addAll(arr) {
		return arr.reduce((done, curr) => {
			return this.addPost(curr) ? [] : done.concat(curr);
		}, []);
	}

	clear() {
		this._posts.splice(0, this._posts.length);
	}

	getAuthors() {
		return this._authors;
	}

	_generateID() {
		return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
	}

	_isIDExist(id) {
		return this._posts.some((post) => id === post.id);
	}
}



