package Servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/check")
public class CheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Test t = new Test("Bob", true);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        resp.getOutputStream().println(gson.toJson(t));
    }
}

class Test {
    private boolean success;
    private String name;

    Test(String name, boolean success) {
        this.success = success;
        this.name = name;
    }
}