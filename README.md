# myob-nextgen

The next-generation of my.orderbird

## Development

It's important to notice, we're using node `9.4.0` at the moment.
In order to change the version, an agreement must be made among the team members to ensure a consistent environment.

### Requisites

* pip

You can read a full complete tutorial [here](http://www.pyladies.com/blog/Get-Your-Mac-Ready-for-Python-Programming/).

TL;DR:

```
make bootstrap
```

Or, you can do manually, following the instructions below:


Install Homebrew:

```
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
```

Install Python:

```
brew install python
```

Install Pip:
```
cd /tmp/
curl -O http://python-distribute.org/distribute_setup.py
python distribute_setup.py

curl -O https://raw.github.com/pypa/pip/master/contrib/get-pip.py
python get-pip.py
```

Install virtualenv
```
pip2 install virtualenv
```

Create a new virtualenv for this project:

```
virtualenv ~/.virtualenv/myob-nextgen
```

Activate the newly created virutalenv:
```
source ~/.virtualenv/myob-nextgen/bin/activate
```

Now you can import the packages requirements:

```
pip2 install -r requirements.txt
```

Create a virtual environment for `node`:

```
nodeenv --node=9.4.0 ~/.nodeenv/node-9.4.0/
```

Activate the newly node virtual environment created:

```
source ~/.nodeenv/node-9.4.0/bin/activate
```

Install all the required packages:

`npm install` or `yarn`


## Run locally
- `npm start` or `yarn start`
- browse to http://localhost:1234/

You can also run this application in a local docker container.
To install docker [follow these instructions](https://docs.docker.com/docker-for-mac/install/).

## Run unit tests
- `npm test` or `yarn test`

## Docker

The configuration used can be found at `Dockerfile`.
The base image is built by [mhart/alpine-node](https://github.com/mhart/alpine-node).

## Make

All the commands and their purposes can be seem by typing `make help`.

## Continuous Integration/Delivery

The jobs related to this project can be found [here](https://jenkins2.orderbird.com/job/falcon/job/myob-nextgen/)






