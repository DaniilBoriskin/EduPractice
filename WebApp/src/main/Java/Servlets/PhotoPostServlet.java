package Servlets;

import Classes.PhotoPost;
import Classes.Posts;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@WebServlet("/photo-post")
public class PhotoPostServlet extends HttpServlet {
    public static Posts posts = new Posts();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");
        if(id!=null)resp.getOutputStream().println(posts.getPost(id.trim()).toString());
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp){
        String id = req.getParameter("id");
        if (id != null) posts.deletePost(id.trim());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        String id = req.getParameter("id").trim();
        String author = req.getParameter("author").trim();
        String description = req.getParameter("description").trim();
        String photolink = req.getParameter("photolink").trim();
        List<String> hashtags = Arrays.asList(req.getParameter("hashtags").trim().split(","));
        posts.addPost(new PhotoPost(id, description, author, photolink, new Date(), new ArrayList<String>(), hashtags));
    }
}
