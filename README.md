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


## Decisions

I was asked to document my decisions while writing this (also see the
"Decisions" section in the backend's README):

1. __Integrate front-/backend?__

I could have integrated the front- and backend into one Git
repository and possibly also coupled some code generation in the
frontend to shared schema files. However, I decided that was not
worth the effort since the schema is relatively small in the case.

Keeping the front- and backend separate also allowed me to work on
them more independently.

2. __Component/service structure__

The Angular app has intentionally been kept very simple with just one
component (`AppComponent`) and one service (`ChatService`). For this
use case nothing more complicated was needed.

3. __GraphQL framework for the frontend__

[Apollo Angular](https://apollo-angular.com) seemed to be a
widespread client with a relatively straightforward interface so I
decided to use that.

I was a bit disappointed by the lack of real type validation for
query results (the framework appears to be just casting results?) so
I wrote a little helper to at least check some response types (see
`src/models/types.ts`).
