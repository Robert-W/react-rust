use actix_tls::openssl::SslStream;
use actix_web::{dev::Extensions, rt::net::TcpStream};
use openssl::x509::X509StoreContextRef;
use std::any::Any;

// Function to validate incoming certificates
pub fn validate(_verified: bool, _context: &mut X509StoreContextRef) -> bool {
    // Return true for now to just accept all incoming certificates
    // Should look into the correct way to verify this in the future
    // unless we are ok just accepting all (some scenarios this is fine)
    true
}

// Function to parse client certificate
pub fn get_client_cert(connection: &dyn Any, data: &mut Extensions) {
    if let Some(stream) = connection.downcast_ref::<SslStream<TcpStream>>() {
        if let Some(peer) = stream.ssl().peer_certificate() {
            // To gain access to this certificate in your route
            // handlers, add the following parameter:
            // peer: Option<web::ReqData<openssl::x509::X509>>
            data.insert(peer);
        }
    }
}

/*
You can see this in action by adding the peer argument to your API handlers. Follow these steps to test:

1. Update the get_user handler in /api/src/user/handlers.rs to include the following (note the arg `peer: Option<ReqData<openssl::x509::X509>>`):

```rust
pub async fn get_user(Path(id): Path<usize>, database: SharedDatabase, peer: Option<ReqData<openssl::x509::X509>>) -> Result<User, HttpResponse> {
    if let Some(cert) = peer {
        println!("{:?}", cert);
    }
}
```

2. Declare the ReqData module at the top of /api/src/user/handlers.rs

```rust
use actix_web::web::{ReqData};
```

3. Create certs in the api/certs directory

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

4. Create a user

```shell
curl https://localhost:3000/api/users \
    -d '{"email":"joe.doe@gmail.com", "roles":["ADMIN"]}' \
    -H 'Content-type: application/json' \
    -X POST \
    -k
```

5. Get the user with certs, and check the logs from the Rust server

```shell
curl https://localhost:3000/api/users/0 \
    --cacert client-ca.pem \
    --cert client-cert.pem \
    --key client-key.pem \
    -k
```
*/
