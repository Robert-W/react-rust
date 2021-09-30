<div align="center">
    <h1>React-Rust Boilerplate</h1>
</div>

## About
This is a WIP and just being used practice with using Rust.

## Getting Started
You should install the following dependencies:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/en/download/)
- [Rust](https://www.rust-lang.org/tools/install)

If you are running Linux, you need to install `docker`, and optionally `docker-compose`. You can use `docker-compose` for local development, but it is slower than running it directly with Rust and Node.js. Docker is only necessary for building a container you could deploy.

## Running the app
There will eventually be a way to do this with docker-compose. Right now it's too slow to re-compile the API portion. So the best way to develop is using cargo and npm.

1. Open a terminal tab and `cd api`.
2. Run `cargo run`.
3. Open another terminal tab and `cd app`.
4. Run `npm start`.
5. The api serves on [https://localhost:3000](https://localhost:3000) and the front-end at [http://localhost:4000](http://localhost:4000).

### Testing the Rust API
You can use curl commands to create, get, update, and delete users. The server also has the ability to get the user's peer certificate if you want to use that for some kind of authorization in the future. To test the API, use the following curl commands:

1. Create a user
    ```shell
    curl https://localhost:3000/api/users \
        -d '{"email":"joe.doe@gmail.com", "roles":["ADMIN"]}' \
        -H 'Content-type: application/json' \
        -X POST \
        -k
    ```
2. Get all users
    ```shell
    curl https://localhost:3000/api/users -k
    ```
3. Get a single user
    ```shell
    curl https://localhost:3000/api/users/0 -k
    ```
    > NOTE: 0 represents the id here. A user's id for the HashMap is based on the length of the HashMap so its far from good. There is a TODO to add an id to the user model and use UUID for it.
4. Update a user
    ```shell
    curl https://localhost:3000/api/users/0 \
        -d '{"email":"joe.doe@gmail.com", "roles":["USER"]}' \
        -H 'Content-type: application/json' \
        -X PUT \
        -k
    ```
5. Delete a user
    ```shell
    curl https://localhost:3000/api/users/0 -X DELETE -k
    ```
    > Get all users and verify the user was deleted: `curl https://localhost:3000/api/users -k`


## Building the container
The build generates two tags, a `<version>` tag and a `latest` tag. You can generate a build by running the following command:

```shell
# <version> defaults to 1.0.0, you do not need to use it if testing locally
bash build.sh <version>
```

## Running the container
This uses `dotenv` for local development. This means you will need to define some environment variables when running the container. These currently configure ssl and logging.

- `SSL_CERT` - Path to your ssl cert in the container.
- `SSL_KEY`  - Path to your ssl key in the container.
- `RUST_LOG` - Log level to use for the rust server. Default is `error`. 

Here is an example of how to run it locally with docker.

```shell
# SSL_KEY and SSL_CERT point to self-signed certs for local development
docker run -p 3000:3000 \
    -e RUST_LOG=info \
    -e SSL_KEY=/srv/certs/key.pem \
    -e SSL_CERT=/srv/certs/cert.pem \
    webapp:latest
```

## TODO
- Better docker-compose local development. It's slow to re-compile because of caching with Rust and cargo.
- Add a MongoDB instance to docker-compose so the Rust API can use a real database instead of a HashMap.
- Unit tests for Rust.
- Documentation for Rust (and API documentation that could be served somehow).
- Document the SSL authentication using peer certificates and how to test with cURL, currently it is documented in the `/api/src/ssl.rs`.
- Add a default user to the Map so the React app can query it and show a full end to end workflow.
- Add ID to user model with real UUID's
- Currently their are old assets in the api/assets directory. This is because the rust api currently uses that for serving the front end of the application. In development mode, the webpack dev server serves on port 
- Improve build.sh performance, creating a production build currently takes 10-12 minutes on a decently powerful laptop.

## NOTES
All certs are self signed certs and should only be used for local development. Before this is "production" ready, the build process would need to retrieve valid certs and pull them into the container at build time.
