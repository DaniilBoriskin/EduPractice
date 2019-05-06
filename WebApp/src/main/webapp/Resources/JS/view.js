/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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