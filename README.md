# Dwelling of Duels

The static site generator for [Dwelling of Duels].

**This is a work in progress until I tag it `v1.0.0`.**

## Installation

1. Install [Python 3]
2. Ensure that you can run `python` and `pip` in your terminal
3. Download and unzip [the latest release] of this software
4. Open a terminal to the unzipped release
5. Install python packages: `pip install -r requirements.txt`

## Configuration

Edit `site.cfg` to configure your build of the site. It has the following
settings:

- `voting` controls whether or not the site is in voting mode. Valid values are
`on` and `off`.
- `archive_dir` is the name of the local directory that holds the DoD archive
folder. It defaults to `dodarchive`. You probably don't need to change this.

## Usage

Ensure that the `archive_dir` you specified in `site.cfg` directory is in the
same directory as `build.py`.

To build for deploying to a web server:

`python build.py`

To build for local testing:

`python build.py test`

In either of the above scenarios, you will find a `deploy` directory containing
the newly-built site.

## Front Page Content

Edit `front-page.md` to add content to the front page of the site under the
banner image. This file will be parsed as [Markdown] when you run `build.py`.

## DoD Lifecycle Example

Below are instructions on how to use the site through the different phases of
a duel.

#### Beginning of Month

1. Ensure that all tagged songs and ancillary files (banner image, listening
   log, etc) for the duel that just ended are in the `archive_dir` both locally
   and on the server.
2. Set `voting` to `off` in `site.cfg`.
3. Edit front page content in `front-page.md`.
4. Regenerate the site (see Usage section above).

#### Voting

1. Create the new duel's directory in `archive_dir`.
2. Add anonymous MP3s and `banner.jpg` to the new duel's directory.
3. Set `voting` to `on` in `site.cfg`.
4. Regenerate the site (see Usage section above).

[Dwelling of Duels]: http://dwellingofduels.net/
[Python 3]: https://www.python.org/
[the latest release]: https://github.com/adamzap/dwelling-of-duels/releases
[Markdown]: https://daringfireball.net/projects/markdown/syntax