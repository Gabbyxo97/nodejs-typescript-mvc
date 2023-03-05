# Simple MVC Website
This project is started to learn more about nodejs, express.js and Typescript.\
It's a simple template project for simple MVC websites\

## Tech stuff
- Typescript
- Nodejs
- Express.js
- Yarn

## How to run
1. Make sure you have installed node.js and yarn
2. Run `yarn build` to transpile the Typescript files
3. Run `yarn start` to run the project
4. Browse to http://127.0.0.1:PORT (eg. http://127.0.0.1:1232) to test your website

## How to change your template engine
1. Change the `VIEW_ENGINE` to either `pug` or `twig` depending on which one you want to use
2. Add your website template files in `views/pug/` or `views/twig/`

## How to add a new template engine
In case both pug or twig aren't your thing, this project allows adding more template engines.
1. Make sure to install the right node package for the template engine
2. Change the `VIEW_ENGINE` setting in your `.env` file
3. Add your website template files in `views/VIEW_ENGINE` (replace `VIEW_ENGINE` with the same name as you used in step 3)

## TODO
- Add ability to change hostname of the webserver (this isn't needed yet as it's not production ready)
- Add ability to use models
- Add ability to get data from a database
- Add ability to get data from an API
- Add security

## Need help?
If you have any problems, you have one of the following options:
- Add an issue to the Github repository
- Add me on Discord: `The Palmtop Tiger of Happiness#7229`
- Send me an email: `dev@stargazer-developments.com`