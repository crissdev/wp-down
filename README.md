# wp-down

[![npm version](https://badge.fury.io/js/wp-down.svg)](http://badge.fury.io/js/wp-down)

> Download WordPress releases


## Install

```sh
$ npm install --save wp-down
```

## Usage

```js
var wpd = require('wp-down');
wpd('4.2.2', function(err, files) {
  if (err) {
    console.log('Download failed', err.message);
  }
  else {
    console.log('Download complete');
  }
});
```

## CLI

```sh
# Download the latest release and extract it
$ wp-down 

# Download 4.3.1 release but don't extract contents of the archive
$ wp-down --release=4.3.1 --extract=no

# download 4.3.1 release, in zip format and extract the contents of 
# the archive in ./wp directory
$ wp-down --release=4.3.1 --extract=yes --format=zip --out=./wp
```

## API

wp-down(options, callback)

### Options 

Type: `String` or `Object`

When this argument is a String, it specifies which WordPress version to download.


#### options.version

Type: `String`

Default: `Latest version available`

Which WordPress version to download. By default it will be the latest version detected from the latest tag available in
the Github repository https://github.com/WordPress/WordPress/tags.


#### options.format

Type: `String`

Default: `zip`

The format of the archive to retrieve. Supported values are: `zip`, `tar.gz`.


#### options.extract

Type: `Boolean`

Default: `true`

When set to true, it will extract the contents of the WordPress release archive.


#### options.dir

Type: `String`

Default: `./wordpress-{version}`

The directory where to extract the WordPress release archive. The value `{version}` may be used to specify 
a version based name.


### callback(err, files)

Type: `Function`

The callback will return an array of vinyl `files` in files.



## License

MIT © [Cristian Trifan](http://crissdev.com)
