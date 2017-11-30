# Deploying

By default the scaffold uses [Docker](https://www.docker.com/) to build and serve the application (at least in production).

To test this process locally, execute

```shell
# Build's the docker image targeting the production / live environment and tags it as `myApplicationImage`.
docker build --pull -t myApplicationImage .

# Creates a new detached container instance which listens on port 8080 for incoming HTTP traffic.
docker run -d -p 8080:8080 myApplicationImage
```

To stop the running container, execute `docker ps`, copy the container ID and execute `docker stop <id>`.

__Note: These instructions are purely for testing purposes. Deployments will and should be done automatically via your CI/CD pipeline!__
