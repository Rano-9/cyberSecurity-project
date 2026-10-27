# Cyber security project for HY cyber security course
To run project you can use docker

Either run to use image from dockerhub repo. 

``docker compose up --build``

Or run to build image from github repo

``docker compose --file docker-compose.dev.yml up --build``

To run project without docker.

### Frontend

cyber-front folder

` npm install `

` npm run build `

` npm run dev -- --mode dev`

### Backend

cyber-back folder

` python -m venv .venv`

` source .venv/bin/activate`

` pip install -r requirements.txt`

` python manage.py migrate`

` python manage.py runserver 0.0.0.0:8080`

Project isn't deployed anywhere. It would be depolyed at ranu.fi, but service provider uses CPanel. Which doesn't use docker, but podman.  