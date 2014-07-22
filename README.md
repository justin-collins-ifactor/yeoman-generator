# Angular webapp environment setup

> [Yeoman](http://yeoman.io) generator


## Getting Started

1. Install [Node](http://nodejs.org/download/)

2. Install Yeoman
  ```bash
  npm install -g yo
  ```

3. Download webapp generator somewhere out of the way
  ```bash
  git clone git@github.com:justin-collins/yeoman-generator.git
  ```

4. Navigate to the generator-webapp folder within the repo. 
    1. Install node dependencies.
      ```bash
      npm install
      ```
    2. And link it.
      ```bash
      npm link
      ```

5. Navigate to the development directory
  ```bash
  yo webapp
  ```

## Installation Options
These options can be applied to the Yeoman generator.

### Skip Dependency installation
--skip-install

For Example:
  ```bash
  yo webapp --skip-install
  ```

## Grunt Options
These options can be used with the grunt process.

### Update dev files & run Unit Tests
test

For Example:
  ```bash
  grunt test
  ```

### Update prod files
build

For Example:
  ```bash
  grunt build
  ```

### Start a connect web server
serve

For Example:
  ```bash
  grunt serve
  ```