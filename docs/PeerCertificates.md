# Peer Certificates in Actix Web

The API server has been configured to parse peer certificates from the request. It is currently implemented `on_connect` with the web server. If a certificae is present, it will parse it and add it to the requests data which you can use in any of your request handlers. Below is an example of how we can get certificate info from a request.

For this example, we are going to generate a cert, hit the `/api/users/` endpoint, grab the certificate from the application data in actix web, and log it out to see what properties it has.

1. Update the `get_user` handler in `api/src/user/handlers.rs` to add the optional peer certificate to the function arguments. The additional argument we are adding is `peer: Option<ReqData<openssl::x509::X509>>`. You also need to add the `ReqData` module to the top of `api/src/user/handlers.rs`.
    ```rust
    // At the top of the file
    use actix_web::web::{ReqData};

    // Updated get_user function
    pub async fn get_user(Path(id): Path<usize>, database: SharedDatabase, peer: Option<ReqData<openssl::x509::X509>>) -> Result<User, HttpResponse> {
        if let Some(cert) = peer {
            println!("{:?}", cert);
        }
    }
    ```

1. We're all set and ready to test it now. Let's start by creating some peer certificates in the `api/certs` directory.
    ```shell
    cd api/certs

    # Generate our certificate authority
    openssl genrsa -out ca-private.key 2048
    openssl req -x509 -new -nodes -key ca-private.key -sha256 -out client-ca.pem

    # Generate client private key and certificate request
    openssl req -newkey rsa:2048 -nodes -keyout client-key.pem -out client-req.pem

    # Generate the certificate
    openssl x509 -req -in client-req.pem -set_serial 01 -out client-cert.pem -CA client-ca.pem -CAkey ca-private.key
    ```

1. Next let's create a user like normal, without the certificates
    ```shell
    curl https://localhost:3000/api/users \
        -d '{"email":"joe.doe@gmail.com", "roles":["ADMIN"]}' \
        -H 'Content-type: application/json' \
        -X POST \
        -k
    ```

1. Finally, lets get the user we just created, but with the certs we just created included in the request. We can check the logs from the Rust server to verify we got the cert and were able to log it.
    ```shell
    curl https://localhost:3000/api/users/0 \
        --cacert client-ca.pem \
        --cert client-cert.pem \
        --key client-key.pem \
        -k
    ```
