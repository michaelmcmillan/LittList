# LittList
[ ![Codeship Status for michaelmcmillan/LittList](https://codeship.com/projects/de2188a0-cc94-0132-a791-5ed66ccacfb8/status?branch=master)](https://codeship.com/projects/76074)

> A bibliography generator that removes the suckiness of having to manually write bibliographies.

### How does it work?
LittList is a web application that is available to anyone at [Littlist.no](http://beta.littlist.no). It acts like a search engine: You query for something you want to reference in your bibliography and it will respond with results. You can then add those results and LittList will automatically generate a proper and validated bibliography you can copy and paste straight into your paper.

### Install
````bash
git clone --recursive git@github.com:michaelmcmillan/LittList.git
cd LittList
npm install
mysql -u [username] -p[password] littlist < schema.sql
````

This presumes that you have a database called <code>littlist</code>.

### Tests
The test suite consists of around 100 tests, where the majority are unit tests which take around 80 ms to complete. To run the unit tests run the following.

````bash
npm test
````
To run the integration tests (currently only persistence tests for the database) run the following.

````bash
npm run-script setup-database-test
npm run-script database-test
````

### Configuration
<code>config.js</code> contains all the configuration options you need to change to get the software running. It comes with a couple of settings as default out of the box. You only need to change the database settings for whatever environment (CI, test or production) you want to run LittList in.

### Credits
A huge thanks to Rintze M. Zelle, Sebastian Karcher, Frank G. Bennett, Jr.,
and Bruce D'Arcus of CSL and citeproc-js for putting down so many hours of work into creating a remarkable piece of software.