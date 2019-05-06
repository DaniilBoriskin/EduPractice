package Classes;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Posts {
    private List<PhotoPost> posts;
    public Posts() {
        posts = new ArrayList<>();
    }
    public Posts(List<PhotoPost> list) {
        posts = new ArrayList<>(list);
    }

    public int size(){
        return posts.size();
    }

    public PhotoPost getPost(String id){
        return posts.stream().filter((item)-> item.getId().equals(id)).findFirst().orElse(null);
    }

    public boolean addPost(PhotoPost post){
        if(getPost(post.getId()) == null){
            posts.add(post);
            return true;
        }
        return false;
    }

    public boolean editPost(PhotoPost post){
        PhotoPost tmp = getPost(post.getId());
        if(tmp != null){
           tmp.setDescription(post.getDescription());
           tmp.setPhotoLink(post.getPhotoLink());
            return true;
        }
        return false;
    }

    public boolean deletePost(String id){
        return posts.remove(getPost(id));
    }

    public void clear(){
        posts.clear();
    }

    public List<PhotoPost> getPosts(int skip, int size, PostFilter filter){
        if (!(skip >= 0 && skip < this.posts.size())) {
            return new ArrayList<>();
        }
        List<PhotoPost> res = new ArrayList<>(posts);
        if(!filter.isEmpty()){
            if(filter.isFull()){
                res = res.stream()
                        .filter((post)->post.getAuthor().equals(filter.getAuthor()) && post.getHashtags().stream()
                                .anyMatch((item) -> filter.getHashtags().contains(item)))
                        .collect(Collectors.toList());
            }else {
                if (!filter.getAuthor().equals("")) {
                    res = res.stream()
                            .filter((post)->post.getAuthor().equals(filter.getAuthor()))
                            .collect(Collectors.toList());
                }
                else{
                    res = res.stream()
                            .filter((post) -> post.getHashtags().stream()
                                    .anyMatch((item) -> filter.getHashtags().contains(item)))
                            .collect(Collectors.toList());
                }
            }
        }
        return res.stream().sorted((a,b)-> a.getCreatedAt().compareTo(b.getCreatedAt())).skip(skip).limit(size).collect(Collectors.toList());
    }
}
