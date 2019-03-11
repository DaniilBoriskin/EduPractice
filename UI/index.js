class PhotoPost {
    constructor(id, description, createdAt, author, photoLink, hashtags, likes) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.hashtags = hashtags
        this.likes = likes;
    }
}

let photoPosts = (function () {
    let photoPosts = [];

    function print() {
        for (let i = 0; i < photoPosts.length; ++i) {
            console.log(photoPosts[i]);
        }
    }

    function getPhotoPosts(/*photoPosts, */skip, size, filterConfig) {
        if (skip < photoPosts.length) {
            let res = photoPosts;
            if (filterConfig.hashtags && filterConfig.author) {
                res = res.filter(post => {
                    if (post.author == filterConfig.author) {
                        for (let i = 0; i < post.hashtags.length; ++i) {
                            for (let j = 0; j < filterConfig.hashtags.length; ++j) {
                                if (filterConfig.hashtags[j] == post.hashtags[i]) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                })
            } else {
                if (filterConfig.author) {
                    res = res.filter(post => post.author == filterConfig.author);
                }
                if (filterConfig.hashtags) {
                    res = res.filter(post => {
                        for (let i = 0; i < post.hashtags.length; ++i) {
                            for (let j = 0; j < filterConfig.hashtags.length; ++j) {
                                if (filterConfig.hashtags[j] == post.hashtags[i]) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    })
                }
            }
            
            return res.sort((a, b) => b.createdAt - a.createdAt).slice(skip, skip + size);
        }
    }

    function validatePhotoPost(post) {
        return (typeof post.id == "string" &&
                // typeof post.description == "string" &&
                typeof post.createdAt == "object" &&
                typeof post.author == "string" &&
                typeof post.photoLink == "string" &&
                typeof post.hashtags == "object" &&
                typeof post.likes == "object" &&
                post.id &&
                // post.description &&
                post.createdAt &&
                post.author &&
                post.photoLink) ? true : false;
    }

    function getPhotoPost(/*photoPosts, */id) {
        if (id > 0 && id <= photoPosts.length) {
            return photoPosts[id - 1];
        }
    }

    function addPhotoPost(/*photoPosts, */post) {
        let isValid = validatePhotoPost(post);
        if(isValid) {
            photoPosts.push(post);
        }
        return isValid;
    }

    function editPhotoPost(/*photoPosts, */id, post) {
        if (id > "0" && id <= photoPosts.length) {
            let curPost = getPhotoPost(/*photoPosts, */id);
            let tempPost = new PhotoPost(curPost.id, post.description, curPost.createdAt, curPost.author, post.photoLink, curPost.hashtags, curPost.likes);
            let isValid = validatePhotoPost(tempPost);
            if (isValid) {
                photoPosts[id - 1] = tempPost;
            }
            return isValid;
        }
        return false;
    }

    function removePhotoPost(/*photoPosts, */id) {
        if (id > 0 && id <= photoPosts.length) {
            photoPosts.splice(id - 1, 1);
            return true;
        }
        return false;
    }

    return{
        getPhotoPosts,
        getPhotoPost,
        validatePhotoPost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost,
        print,
    }
})()
