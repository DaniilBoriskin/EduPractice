/* eslint-disable no-console */
class Post {

	constructor(id, description, createdAt, author, photoLink, hashtags, likes) {
		this.id = id;
		this.description = description;
		this.createdAt = createdAt;
		this.author = author;
		this.photoLink = photoLink;
		this.hashtags = hashtags;
		this.likes = likes;
	}
}

class PhotoPosts{
	constructor(photoPosts = []) {
		this._photoPosts = photoPosts;
	}

	getPhotoPosts(skip, size, filterConfig) {
		if (skip < this._photoPosts.length) {
			let res = this._photoPosts;
			if (filterConfig !== undefined) {
				if (filterConfig.hashtags && filterConfig.author) {
					res = res.filter(post => {
						if (post.author === filterConfig.author) {
							for (let i = 0; i < post.hashtags.length; ++i) {
								for (let j = 0; j < filterConfig.hashtags.length; ++j) {
									if (filterConfig.hashtags[j] === post.hashtags[i]) {
										return true;
									}
								}
							}
						}
						return false;
					});
				} else {
					if (filterConfig.author) {
						res = res.filter(post => post.author === filterConfig.author);
					}
					if (filterConfig.hashtags) {
						res = res.filter(post => {
							for (let i = 0; i < post.hashtags.length; ++i) {
								for (let j = 0; j < filterConfig.hashtags.length; ++j) {
									if (filterConfig.hashtags[j] === post.hashtags[i]) {
										return true;
									}
								}
							}
							return false;
						});
					}
				}
			}
			return res.sort((a, b) => b.createdAt - a.createdAt).slice(skip, skip + size);
		}
	}

	static validatePhotoPost(post) {
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

	getPhotoPost(id) {
		if (id > 0 && id <= this._photoPosts.length) {
			return this._photoPosts[id - 1];
		}
	}

	addPhotoPost(post) {
		let isValid = PhotoPosts.validatePhotoPost(post);
		if(isValid) {
			this._photoPosts.push(post);
		}
		return isValid;
	}

	editPhotoPost(id, post) {
		if (id > '0' && id <= this._photoPosts.length) {
			let curPost = this.getPhotoPost(id);
			let tempPost = new Post(curPost.id, post.description, curPost.createdAt, curPost.author, post.photoLink, curPost.hashtags, curPost.likes);
			let isValid = PhotoPosts.validatePhotoPost(tempPost);
			if (isValid) {
				this._photoPosts[id - 1] = tempPost;
			}
			return isValid;
		}
		return false;
	}
    
	removePhotoPost(id) {
		if (id > 0 && id <= this._photoPosts.length) {
			this._photoPosts.splice(id - 1, 1);
			return true;
		}
		return false;
	}

	addAll(arr){
		let res = [];
		if(Array.isArray(arr)){
			for(let i = 0; i < arr.length; ++i){
				if(!this.addPhotoPost(arr[i])){
					res.push(arr[i]);
				}
			}
		}
		return res;
	}
}

let q = new PhotoPosts();
q.addPhotoPost(new Post('1', '1', new Date(2009,6,10), 'Алиса', 'qweq.png',['#cool', '#r'], ['Алиса']));
q.addPhotoPost(new Post('2', 'qwer', new Date(2007,6,10), 'Олег', 'qwer.png',['#cool', '#wow'], ['Олег', 'Алиса']));
q.addPhotoPost(new Post('3', '1', new Date(2001,6,10), 'Алиса', 'qweq.png',['#cool', '#s'], ['Алиса']));
q.addPhotoPost(new Post('4', '1', new Date(2008,5,10), 'Богдан', 'qweq.png',['#q', '#r'], ['Алиса']));
console.log(q.getPhotoPost('1'));
console.log(q.getPhotoPost('4'));
console.log(q.getPhotoPosts(1,3,{
	hashtags: ['#cool'],
}));
console.log(q.getPhotoPosts(0,2,{
	hashtags: ['#r'],
}));
console.log(q.getPhotoPost('1'));
console.log(q.editPhotoPost('1',{
	photoLink: 'qwefdgfemwke.wdqw',
}));
console.log(q.getPhotoPost('1'));
console.log(q.removePhotoPost('1'));
console.log(q.getPhotoPost('1'));