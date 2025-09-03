# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2019-10-03 (@regisphilibert)

- Remove iFrame snippt/shortcode
- Add caption to content images
- Fixes vulnerability
- Fix ordering of Lodgings after filtering

## [0.3.0] - 2019-10-03 (@regisphilibert)

- Fix pinterest share button

## [0.2.1] - 2019-06-12 (@regisphilibert)

- Fix scripts deps issue (add instafeed and lunr to package.json)
- Add /public/ to gitignore
- Moved vendors (jquery, cycle) to static/vendors (away from webpack handled /dist)
- Add GetAssetSRC to centralizde script URL fetching (in case this changes a lot)