//use actix_tls::openssl::SslStream;
use actix_web::{dev::Extensions, rt::net::TcpStream};
use openssl::x509::X509StoreContextRef;
use std::any::Any;

use actix_tls::accept::openssl::TlsStream;

// Function to validate incoming certificates
pub fn validate(_verified: bool, _context: &mut X509StoreContextRef) -> bool {
    // Return true for now to just accept all incoming certificates
    // Should look into the correct way to verify this in the future
    // unless we are ok just accepting all (some scenarios this is fine)
    true
}

// Function to parse client certificate
pub fn get_client_cert(connection: &dyn Any, data: &mut Extensions) {
    if let Some(stream) = connection.downcast_ref::<TlsStream<TcpStream>>() {
        if let Some(peer) = stream.ssl().peer_certificate() {
            data.insert(peer);
        }
    }
}
