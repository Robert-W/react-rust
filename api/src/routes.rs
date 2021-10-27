use actix_files::{Files, NamedFile};
use actix_web::get;
use actix_web::{web, HttpResponse, Responder, Result};

// Declare our various feature modules
use crate::user;

// Function to handle our healthcheck
#[get("/healthcheck")]
async fn healthcheck() -> impl Responder {
    HttpResponse::Ok()
}

// Function used in the root as our default service
pub async fn index() -> Result<NamedFile> {
    Ok(NamedFile::open("./assets/index.html")?)
}

pub fn routes(cfg: &mut web::ServiceConfig) {
    // Setup and configure all of our routes
    cfg.service(Files::new("/public", "./assets/public"))
        .service(
            web::scope("/api")
                // Our healthchecks
                .service(healthcheck)
                // User routes
                .service(user::handlers::get_user)
                .service(user::handlers::add_user)
                .service(user::handlers::update_user)
                .service(user::handlers::delete_user)
                .service(user::handlers::get_users),
        );
}
