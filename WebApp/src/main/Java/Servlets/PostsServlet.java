package Servlets;

import Classes.PhotoPost;
import Classes.PostFilter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@WebServlet("/photoposts")
public class PostsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PostFilter filter = new PostFilter();
        List<PhotoPost> res;
        int skip, top;
        String str = req.getParameter("skip");
        skip = str == null ? 0 : Integer.parseInt(str.trim());
        str = req.getParameter("top");
        top = str == null ? PhotoPostServlet.posts.size() : Integer.parseInt(str.trim());
        str = req.getParameter("author");
        if (str != null) filter.setAuthor(str.trim());
        str = req.getParameter("hashtags");
        if (str != null) {
            List<String> tags = Arrays.asList(str.trim().split(","));
            filter.addHashtags(tags);
        }
        res = PhotoPostServlet.posts.getPosts(skip, top, filter);
        for (PhotoPost post : res) {
            resp.getOutputStream().println(post.toString());
        }
    }
}
