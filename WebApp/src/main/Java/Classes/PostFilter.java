package Classes;

import java.util.ArrayList;
import java.util.List;

public class PostFilter {
    private List<String> hashtags;
    private String author;

    public PostFilter(){
        hashtags = new ArrayList<>();
        author = "";
    }

    public PostFilter(List<String> hashtags, String author){
        this.hashtags = new ArrayList<>(hashtags);
        this.author = author;
    }

    public String getAuthor(){
        return author;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public void addHashtag(String hashtag) {
        this.hashtags.add(hashtag);
    }

    public void addHashtags(List<String> hashtags) {
        this.hashtags.addAll(hashtags);
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public boolean isEmpty(){
        return author.equals("") && hashtags.size() == 0;
    }

    public boolean isFull(){
        return !(author.equals("") || hashtags.size() == 0);
    }
}
