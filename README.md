# Live Chat (Frontend)

This is the frontend for the Live Chat application, a demo app built
on Go, GraphQL, TypeScript and Angular.

For a dev server with automatic hot reloading run:

```
ng serve
```

The app should be available at http://localhost:4200. To build the
project for deployment run:

```bash
ng build --prod                                     # to build the web resources
sudo docker build --tag live-chat-frontend deploy/  # to build the container
```

A container can then be started with:

```
sudo docker run --rm -d --name frontend -p 8080:8080 live-chat-frontend
```

...and the frontend will be available at http://localhost:8080.
