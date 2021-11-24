use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use openssl::ssl::{SslAcceptor, SslFiletype, SslMethod, SslVerifyMode};

use std::collections::HashMap;
use std::env;
use std::sync::Mutex;

mod cors;
mod routes;
mod ssl;
mod user;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Setup Dotenv
    dotenv::dotenv().ok();

    // Initialize our logger
    env_logger::init();

    // Setup our requirements foe SSL
    let mut builder = SslAcceptor::mozilla_intermediate(SslMethod::tls()).unwrap();
    builder
        .set_private_key_file(env::var("SSL_KEY").unwrap(), SslFiletype::PEM)
        .unwrap();
    builder
        .set_certificate_chain_file(env::var("SSL_CERT").unwrap())
        .unwrap();
    builder.set_verify_callback(SslVerifyMode::PEER, ssl::validate);

    // Create a shared database, for local testing
    let shared: web::Data<Mutex<HashMap<String, user::model::User>>> =
        web::Data::new(Mutex::new(HashMap::new()));

    HttpServer::new(move || {
        App::new()
            .wrap(cors::cors_wrapper())
            .wrap(Logger::default())
            .app_data(shared.clone())
            .configure(routes::routes)
            .default_service(web::get().to(routes::index))
    })
    .on_connect(ssl::get_client_cert)
    .bind_openssl("0.0.0.0:3000", builder)?
    .run()
    .await
}
