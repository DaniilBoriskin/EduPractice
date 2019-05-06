/* eslint-disable no-unused-vars */

const postContainer = document.getElementById('container');
const view = new View();
const posts = new Posts();
const user = new User();

function addPost(post) {
	const valid = posts.addPost(post);
	if (valid) {
		view.addPost(post);
	}
	return valid;
}

function removePost(id) {
	posts.removePost(id);
	view.removePost(id);
}

function editPost(id, post) {
	if (posts.editPost(id, post)) {
		view.editPost(id, posts.getPost(id));
	}
}

function consoleAuthors() {
	// eslint-disable-next-line no-console
	console.log(posts.getAuthors());
}

function userView() {
	view.userView();
}

function guestView() {
	view.guestView();
}


function clear() {
	posts.clear();
	view.clear();
}

function addPosts(skip, size, filterConfig) {
	const arr = posts.getPosts(skip, size, filterConfig);
	if (arr !== []) {
		view.showPosts(arr);
	}
}

function addAll(arr) {
	if (posts.addAll(arr)) {
		view.showPosts(arr);
	}
}

function switchOnOff() {
	view.switchOnOff();
}

function like(node) {
	const id = +node.closest('.post').dataset.id;
	const post = posts.getPost(id);
	if (node.dataset.isliked === '0') {
		post.likes.push(user.name);
		node.setAttribute('src', 'img/likeActive.png');
		node.dataset.isliked = '1';
		node.parentNode.style.opacity = 1;
	} else if (node.dataset.isliked === '1') {
		post.likes.splice(post.likes.indexOf(user.name),1);
		node.setAttribute('src', 'img/like.png');
		node.dataset.isliked = '0';
		node.parentNode.style.opacity = 0.5;
	}
	node.parentNode.lastElementChild.textContent = post.likes.length;
}

function clickLike(event) {
	if (event.target.className === 'like-image' && user.name !== '') {
		like(event.target);
	}
}

postContainer.addEventListener('click', clickLike);





addPost(new PhotoPost('1', '1', new Date(2009, 6, 10), 'Алиса', 'img/picture2_skolko-jagod-sobe_342560_p0.jpg', ['#cool', '#r'], ['Алиса']));
addPost(new PhotoPost('2', 'qwer', new Date(2007, 6, 10), 'Олег', 'img/picture2_skolko-jagod-sobe_342560_p0.jpg', ['#cool', '#wow'], ['Олег', 'Алиса']));
addPost(new PhotoPost('3', '1', new Date(2001, 6, 10), 'Алиса', 'img/picture2_skolko-jagod-sobe_342560_p0.jpg', ['#cool', '#s'], ['Алиса']));
addPost(new PhotoPost('4', '1', new Date(2008, 5, 10), 'Богдан', 'img/picture2_skolko-jagod-sobe_342560_p0.jpg', ['#q', '#r'], ['Алиса']));
consoleAuthors();
removePost(1);
guestView();
editPost('3', {
	description: 'qweredmks',
	photoLink: 'https://lastday.club/wp-content/uploads/2016/08/Sedobnye-griby-Klassifikatsiya-kategorii-osobennosti-Last-Day-Club.jpg',
});
addPosts(0, 2);
switchOnOff();


