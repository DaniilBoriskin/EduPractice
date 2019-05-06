package Servlets;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(urlPatterns = {"/", "/status", "/get", "/check", "/page", "/test1", "/test2"})
public class TestFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest)req;
        String method = request.getMethod();
        String url = request.getRequestURL().toString();
        long time = System.currentTimeMillis();
        chain.doFilter(req, resp);
        time = System.currentTimeMillis() - time;
        System.out.println(method + " + " + url + " + " + time + "ms");
    }
}