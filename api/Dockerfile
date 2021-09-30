# NOTE: This is a development dockerfile, not intended for production
# The Dockerfile at the root is the production Dockerfile
FROM rust:latest

# Install some dependencies
RUN apt update && apt install -y musl-tools musl-dev
RUN update-ca-certificates

# Copy over our directrories
COPY assets /srv/assets
COPY certs /srv/certs
COPY src /srv/src

# Copy over files
COPY .env Cargo.toml /srv/

# Ser working directory and run our development process
WORKDIR /srv
CMD ["cargo run"]
