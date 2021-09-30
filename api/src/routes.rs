use actix_web::{web, Result, HttpResponse, Responder};
use actix_files::{NamedFile, Files};

// Declare our various feature modules
use crate::user;

// Function to handle our healthcheck
async fn health() -> impl Responder {
    HttpResponse::Ok()
}

// Function used in the root as our default service
pub async fn index() -> Result<NamedFile> {
    Ok(NamedFile::open("./assets/index.html")?)
}

pub fn routes(cfg: &mut web::ServiceConfig) {
    // Setup and configure all of our routes
    cfg
        .service(Files::new("/public", "./assets/public"))
        .service(
            web::scope("/api")
                // Our healthchecks
                .route("/healthcheck", web::get().to(health))
                // User routes
                .service(
                    web::scope("/users")
                        .route("{id}", web::delete().to(user::handlers::delete_user))
                        .route("{id}", web::put().to(user::handlers::update_user))
                        .route("{id}", web::get().to(user::handlers::get_user))
                        .route("", web::post().to(user::handlers::add_user))
                        .route("", web::get().to(user::handlers::get_users))
                )
        );
}
