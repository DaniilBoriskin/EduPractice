package Classes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PhotoPost {
    private String id;
    private String author;
    private String photoLink;
    private String description;
    private Date createdAt;
    private List<String> likes;
    private List<String> hashtags;

    public PhotoPost(String id, String description, String author, String link, Date date, List<String> likes, List<String> tags) {
        this.id = id;
        this.author = author;
        this.createdAt = date;
        this.hashtags = new ArrayList<>(tags);
        this.likes = new ArrayList<>(likes);
        this.photoLink = link;
        this.description = description;
    }

    public String toString() {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(this);
    }

    public String getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public List<String> getLikes() {
        return likes;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public void setHashtags(List<String> hashtags) {
        this.hashtags = hashtags;
    }
}