# Angular webapp environment setup

> [Yeoman](http://yeoman.io) generator


## Getting Started

1. Install [Node](http://nodejs.org/download/)

2. Install SASS & Friends (MAC users can skip to step ii)
  1. Install [Ruby](http://www.rubyinstaller.org/downloads/)
  2. Install Sass
  ```bash
  gem install sass
  ```
  3. Install Compass
  ```bash
  gem install compass
  ```

3. Install Yeoman
  ```bash
  npm install -g yo
  ```

4. Download webapp generator somewhere out of the way
  ```bash
  git clone git@github.com:justin-collins/yeoman-generator.git
  ```

5. Navigate to the generator-webapp folder within the repo. And link it.
  ```bash
  npm link
  ```

6. Navigate to the development directory
  ```bash
  yo webapp
  ```

## Options
These options can be applied to the Yeoman generator.

### Skip Dependency installation
--skip-install

For Example:
  ```bash
  yo webapp --skip-install
  ```
