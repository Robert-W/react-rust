use actix_cors::Cors;
use std::env;

// Function to generate the cors wrapper based on the current environment
pub fn cors_wrapper() -> Cors {
    let is_localhost = env::var("IS_LOCALHOST").is_ok();
    // If the IS_LOCALHOST env is set, set cors up for localhost
    if is_localhost {
        Cors::permissive()
    } else {
        // TODO, restrict this or make this some kind of noop middleware
        // We need Cors for local development but not for production
        Cors::default()
    }
}
