# Recipe Book
----

## What is it?
A responsive Single Page Application (SPA), written in [Angular2](https://angular.io/), to store personal recipes. The Recipe Book website allows recipes to be added, edited, or deleted; individual ingredients are also managed. Images of the recipe can be specified as a URL, no uploading at the moment.  Recipe ingredients can be added to a separate Shopping List page.  Items can be added, edited, or deleted on the Shopping List page.

All of this data is stored in a [Firebase](https://firebase.google.com/) database. Authentication to the database is controlled using Google as an OAuth 2.0 provider.  Once user's login, they can get and set data in the database.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3. The HTML/CSS templates utilize [Bootstrap](http://getbootstrap.com/) version 3.3.7 for styling.

## Installation
1. Download and install [Node.js](https://nodejs.org/en/download/) using these [instructions](https://docs.npmjs.com/getting-started/installing-node).
2. Download and install [GitHub Desktop](https://help.github.com/articles/set-up-git/) using these [instructions](https://help.github.com/articles/set-up-git/)
3. Clone this repository using the [instructions from GitHub](https://help.github.com/articles/cloning-a-repository/)
    * Ensure you use command:
        ```Shell
            $ git clone https://github.com/ZGrauer/recipe-book.git
        ```

4. Install all dependencies by entering `npm install` from a terminal within the cloned folder.
5. Go to [console.firebase.google.com/](https://console.firebase.google.com/) and `Create New Project` using [this guide](https://firebase.google.com/docs/web/setup).
6. Go to your project file `/src/index.html`, and update the Firebase `var config` values within the `<script>` tag starting on line 24.  This will setup the connection to your database.
7. Edit Angular files as needed within the `./src/app/` folder.  Use the [Angular CLI](https://cli.angular.io/) to add components.

## Development server
Be sure to update the Firebase configuration settings in `/src/index.html` before running `ng serve`.

```TypeScript
    <script src="https://www.gstatic.com/firebasejs/3.7.1/firebase.js"></script>
    <script>
        // Initialize Firebase
        // TODO: Replace with your project's customized code snippet
        var config = {
        apiKey: "<API_KEY>",
        authDomain: "<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
        storageBucket: "<BUCKET>.appspot.com",
        messagingSenderId: "<SENDER_ID>",
        };
        firebase.initializeApp(config);
    </script>
```

Run `ng serve` in a terminal from the project directory for a dev server. The app can then be run by navigating to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```Shell
    $ ng serve
```

## Code scaffolding

From a terminal run `ng generate component component-name` to generate a new component using the Angular CLI. You can also use `ng generate directive/pipe/service/class/module`.

```Shell
    $ ng generate component component-name
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

```Shell
    $ ng build
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

```Shell
    $ ng help
```

### Todos
- [X] Add user authentication and authorization via Google OAuth 2.0
- [X] Guard paths/routes based on user

### License
GNU GENERAL PUBLIC LICENSE
