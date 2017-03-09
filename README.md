# Recipe Book
----

## What is it?
A responsive Single Page Application (SPA), written in [Angular2](https://angular.io/), to store personal recipes. The Recipe Book website allows recipes to be added, edited, or deleted; individual ingredients are also managed. Images of the recipe can be specified as a URL, no uploading at the moment.  Recipe ingredients can be added to a separate Shopping List page.  Items can be added, edited, or deleted on the Shopping List page. All of this data can be stored in a database and retrieved later.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3. The HTML/CSS templates utilize [Bootstrap](http://getbootstrap.com/) version 3.3.7 for styling.

## Installation
1. Download and install [Node.js](https://nodejs.org/en/download/) using these [instructions](https://docs.npmjs.com/getting-started/installing-node).
2. Download and install [GitHub Desktop](https://help.github.com/articles/set-up-git/) using these [instructions](https://help.github.com/articles/set-up-git/)
3. Clone this repository using the [instructions from GitHub](https://help.github.com/articles/cloning-a-repository/)
    * Ensure you use command:
        ```sh
        $ git clone https://github.com/ZGrauer/recipe-book.git
        ```
4. Install all dependencies by entering the below command from a terminal within the cloned folder.
    ```sh
    $ npm install
    ```
5. Edit Angular files as needed within the `./src/app/` folder.  Use the [Angular CLI](https://cli.angular.io/) to add components.

## Development server
Run `ng serve` in a terminal from the project directory for a dev server. The app can then be run by navigating to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```sh
    $ ng serve
```

## Code scaffolding

From a terminal run `ng generate component component-name` to generate a new component using the Angular CLI. You can also use `ng generate directive/pipe/service/class/module`.

```sh
    $ ng generate component component-name
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

```sh
    $ ng build
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

```sh
    $ ng help
```

### Todos
- [ ] Add user authentication and authorization
- [ ] Guard paths/routes based on user

### License
GNU GENERAL PUBLIC LICENSE
