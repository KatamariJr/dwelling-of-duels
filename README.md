# Dwelling of Duels

This is the static site generator for [Dwelling of Duels].

## Installation

1. Install [Python 3]
2. Ensure that you can run `python` and `pip` in your terminal
3. Download and unzip [the latest release] of this software
4. Open a terminal to the unzipped release
5. Install python packages: `pip install -r requirements.txt`

## Configuration

### Config file

Edit `site.cfg` to configure your build of the site. An example has been
provided for you as `site_example.cfg` and must be renamed before use. It has
the following settings:

- `voting` controls whether the site is in voting mode. Valid values are
`on` and `off`.
- `deadline_date` is the date displayed in the deadline section of the sidebar.
It must be a date of the form `YYYY-MM-DD`. For example: `2025-01-31`.
- `deadline_time` is the time displayed in the deadline section of the sidebar.
- `archive_dir` is the name of the local directory that holds the DoD archive
folder. It defaults to `dodarchive`. You probably don't need to change this.
- `archive_url` is the url of the webhost where the `archive_dir` directory is 
hosted. In testing, this will be `localhost`, while in production it will
probably be something like `https://www.dwellingofduels.net`. This should
not have a trailing slash.
- `winners_month_override` allows you to force a specific month to appear as the 
winners block at the top of the page. Sometimes needed if non-standard months 
(such as Tornado of Solos) are messing up the sorting. Otherwise, needed if you
run two duels at the same time, like we did in Aug 2022 for Free + Dreamcast duels.
- `latest_month_override` changes which duel is considered 'in voting'. This is
the duel that gets sliders on its page, as well as being redirected to from the
`/voting` route and other 'vote now' buttons. Only noticeable if `voting` is set 
to `on`. 

The `deadline_*` settings refer to the voting deadline when `voting` is set to
`on` and the submission deadline when `voting` is set to off.

### Front Page Content

Edit `front-page.md` to add content to the front page of the site under the
banner image. An example has been provided for you as `front-page_example.cfg` and
must be renamed before use. This file will be parsed as [Markdown] when you run
`build.py`.

### Artist Links

Add artist links to the `artist-links.csv` file.

## Usage

Ensure that the `archive_dir` you specified in `site.cfg` directory is in the
same directory as `build.py`.

To build and test the site:
`make buildAndServe`
You will then be able to visit `localhost:8000` in your browser and browse the site.

After building the site, the content is placed in the `deploy` directory. See "Scripts" for
information on uploading the site.

### Scripts

A number of scripts are provided for site management. 

THESE SCRIPTS CAN BE DESTRUCTIVE. RUNNING THEM OUTSIDE OF THIS FOLDER COULD RESULT IN DELETION OF S3 CONTENT.

| Script                        | Operation                                                                                                                                                     |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| aws_archive_sync.sh           | Synchronizes the entire `dodarchive` directory with the S3 bucket. Deletes anything that exists in S3 but not locally.                                        |
| aws_archive_03-09_sync.sh     | Like `aws_archive_sync.sh`, but only syncs content from 2003-2009                                                                                             |
| aws_archive_10-19_sync.sh     | Like `aws_archive_sync.sh`, but only syncs content from 2010-2019                                                                                             |
| aws_archive_20-29_sync.sh     | Like `aws_archive_sync.sh`, but only syncs content from 2020-2029                                                                                             |
| aws_archive_this_year_sync.sh | Like `aws_archive_sync.sh`, but only syncs content from 2024. *This does not automatically update each year. The script must be modified after the new year.* |
| aws_cloudfront_invalidate.sh  | Resets the AWS Cloudfront cache. All other scripts automatically invoke this script. Almost never needs to be run manually.                                   |
| aws_html_sync.sh              | Synchronizes the entire `deploy` directory with the `www.dwellingofduels.net` S3 bucket. Deletes anything that exists in S3 but not locally.                  |
| make_zips.sh                  | Enters each directory in `dodarchive`, removes the existing zip file and creates a new one.                                                                   |

To upload this to the actual webpage, run `./aws_html_sync.sh`

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

## Build Process in a Nutshell


[Dwelling of Duels]: http://dwellingofduels.net/
[Python 3]: https://www.python.org/
[Markdown]: https://daringfireball.net/projects/markdown/syntax
