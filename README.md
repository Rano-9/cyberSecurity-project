# Cyber security project for HY cyber security course
To run project you can use docker

Either run to use image from dockerhub repo. 
``docker compose up --build``
Or run to build image from github repo
``docker compose --file docker-compose.dev.yml up --build``

Project isn't deployed anywhere. It would be depolyed at ranu.fi, but service provider uses CPanel. Which doesn't use docker, but podman.  