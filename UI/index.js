/* eslint-disable no-console */
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

class Posts{
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
	
	_filterByHashTags(arr, hashtags){
		return arr.filter(post => {
			for (let i = 0; i < post.hashtags.length; ++i) {
				if (hashtags.some((item) => item === post.hashtags[i])){
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
		if(this._isIDExist(post.id)){
			post.id = '' + this._generateID();
		}
		const isValid = PhotoPost.validatePost(post);
		if(isValid) {
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

	addAll(arr){
		return arr.reduce((done,curr) => {
			return this.addPost(curr) ? [] : done.concat(curr);
		},[]);
	}

	clear(){
		this._posts.splice(0,this._posts.length);
	}

	getAuthors(){
		return this._authors;
	}

	_generateID(){
		return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
	}

	_isIDExist(id){
		return this._posts.some((post) => id === post.id);
	}
}

class View {
	constructor(){
		this._postContainer = document.getElementById('container');
		this._postTemplate = document.getElementById('post-template');
		this._postContainer.style.display = 'none';
	}

	getPostHTML(post) {
		const postTemplate = this._postTemplate.content.firstElementChild.cloneNode(true);
		postTemplate.setAttribute('data-id', post.id);
		postTemplate.querySelector('.post-photo img').setAttribute('src', post.photoLink);
		postTemplate.querySelector('.post-user-name').textContent = post.author;
		postTemplate.querySelector('.post-description small').textContent = post.description;
		const options = {year: 'numeric', month: 'long', day: 'numeric' };
		postTemplate.querySelector('.date-container').textContent = post.createdAt.toLocaleDateString('ru',options);
		postTemplate.querySelector('span.like-counter').textContent = post.likes.length;
		const hashtagContainer = postTemplate.querySelector('.hashtag-container');
		const tag = document.createElement('a');
		tag.setAttribute('href','#');
		for (let i = 0; i < post.hashtags.length; ++i) {
			tag.textContent = post.hashtags[i];
			hashtagContainer.appendChild(tag.cloneNode(true));
		}
		return postTemplate;
	}

	addPost(post) {
		this._postContainer.insertBefore(this.getPostHTML(post), this._postContainer.children[0]);
	}

	removePost(id) {
		const attr = '[data-id="' + id + '"]';
		const post = document.querySelector(attr);
		post.remove();
	}

	editPost(id,post){
		const attr = '[data-id="' + id + '"]';
		document.querySelector(attr).replaceWith(this.getPostHTML(post));

	}

	guestView(){
		const headerUserContainer = document.querySelector('.user-container');
		headerUserContainer.firstElementChild.textContent = 'Guest';
		const buttonGroup = headerUserContainer.lastElementChild;
		buttonGroup.firstElementChild.textContent = 'Sign Up';
		buttonGroup.lastElementChild.textContent = 'Log In';
	}

	userView(){
		const headerUserContainer = document.querySelector('.user-container');
		headerUserContainer.firstElementChild.textContent = 'Олег';
		const buttonGroup = headerUserContainer.lastElementChild;
		buttonGroup.firstElementChild.textContent = 'Add post';
		buttonGroup.lastElementChild.textContent = 'Log out';
	}

	showPosts(arrPosts)	{
		for(let i = 0; i < arrPosts.length; ++i){
			this.addPost(arrPosts[i]);
		}
	}

	clear() {
		const chevron = this._postContainer.lastElementChild;
		this._postContainer.innerHTML = '';
		this._postContainer.appendChild(this._postTemplate);
		this._postContainer.appendChild(chevron);
	}

	switchOnOff(){
		this._postContainer.style.display = this._postContainer.style.display === 'none' ? '': 'none';
	}
}

const work = (function () {
	const view = new View();
	const posts = new Posts();

	function addPost(post){
		const valid = posts.addPost(post);
		if(valid){
			view.addPost(post);
		}
		return valid;
	}

	function removePost(id){
		posts.removePost(id);
		view.removePost(id);
	}

	function editPost(id, post) {
		if (posts.editPost(id, post)) {
			view.editPost(id, posts.getPost(id));
		}
	}

	function consoleAuthors(){
		console.log(posts.getAuthors());
	}

	function userView(){
		view.userView();
	}

	function guestView(){
		view.guestView();
	}

	
	function clear(){
		posts.clear();
		view.clear();
	}

	function addPosts(skip,size,filterConfig){
		const arr = posts.getPosts(skip,size,filterConfig)
		if(arr !== []){
			view.showPosts(arr);
		}
	}

	function addAll(arr){
		if(posts.addAll(arr)){
			view.showPosts(arr);
		}
	}

	function switchOnOff(){
		view.switchOnOff();
	}

	return{
		addPost,
		removePost,
		editPost,
		consoleAuthors,
		userView,
		guestView,
		clear,
		addPosts,
		addAll,
		switchOnOff,
	};
})();

work.addPost(new PhotoPost('1', '1', new Date(2009, 6, 10), 'Алиса', 'img/picture2_skolko-jagod-sobe_342560_p0.jpg', ['#cool', '#r'], ['Алиса']));
work.addPost(new PhotoPost('2', 'qwer', new Date(2007, 6, 10), 'Олег', 'img/picture2_skolko-jagod-sobe_342560_p0.jpg', ['#cool', '#wow'], ['Олег', 'Алиса']));
work.addPost(new PhotoPost('3', '1', new Date(2001, 6, 10), 'Алиса', 'img/picture2_skolko-jagod-sobe_342560_p0.jpg', ['#cool', '#s'], ['Алиса']));
work.addPost(new PhotoPost('4', '1', new Date(2008, 5, 10), 'Богдан', 'img/picture2_skolko-jagod-sobe_342560_p0.jpg', ['#q', '#r'], ['Алиса']));
work.consoleAuthors();
work.removePost(1);
work.guestView();
work.editPost('3', {
	description: 'qweredmks',
	photoLink: 'https://lastday.club/wp-content/uploads/2016/08/Sedobnye-griby-Klassifikatsiya-kategorii-osobennosti-Last-Day-Club.jpg',
});
work.addPosts(0,2);
work.switchOnOff();