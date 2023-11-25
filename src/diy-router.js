const fs = require("fs");
const http = require("http");
const Route = require("route-parser");

const express = (() => {
  let routes = [];

  const mimetype = {
    ".plain": "text/plain",
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".gif": "image/gif",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".bmp": "image/bmp",
    ".webp": "image/webp",
    ".midi": "audio/midi",
    ".mpeg": "audio/mpeg",
    ".weba": "audio/webm",
    ".oga": "audio/ogg",
    ".wav": "audio/wav",
    ".webm": "video/webm",
    ".ogv": "video/ogg",
  };

  const addRoute = (method, url, handler) => {
    routes.push({ method, url: new Route(url), handler });
  };

  const findRoute = (method, url) => {
    const route = routes.find((route) => {
      return route.method === method && route.url.match(url);
    });

    if (!route) return null;

    return { handler: route.handler, params: route.url.match(url) };
  };

  const get = (route, handler) => addRoute("get", route, handler);
  const post = (route, handler) => addRoute("post", route, handler);

  const router = () => {
    const listen = (port, cb) => {
      http
        .createServer((req, res) => {
          const method = req.method.toLowerCase();
          const url = req.url.toLowerCase();
          const found = findRoute(method, url);
          console.log(routes);

          if (found) {
            req.params = found.params;
            res.send = (content) => {
              if (content) {
                res.writeHead(200, {
                  "Content-Type": "text/html",
                });
                res.end(content);
              } else {
                res.writeHead(404, {
                  "Content-Type": "text/html",
                });

                res.end("<h1>Failed to render page...</h1>");
              }
            };

            return found.handler(req, res);
          }

          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("Route not found.");
        })
        .listen(port, cb);
    };

    return {
      get,
      post,
      listen,
    };
  };

  return router;
})();

module.exports = express;
