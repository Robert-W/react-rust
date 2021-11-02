use actix_web::{Error, HttpRequest, HttpResponse, Responder};
use futures::future::{ready, Ready};
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use uuid::Uuid;

// Hash Set that we will use to validate any writes/updates
// pub fn validate_roles(input: HashSet<String>) -> bool {
//     let allowed: HashSet<String> = [
//         String::from("TESTER"),
//         String::from("ADMIN"),
//         String::from("USER"),
//     ].iter().cloned().collect();

//     input.is_subset(&allowed)
// }

// Create a struct for user input
#[derive(Serialize, Deserialize, Debug)]
pub struct UserInput {
    pub email: String,
    pub roles: HashSet<String>,
}

// Implement the from trait
impl From<UserInput> for User {
    fn from(user: UserInput) -> User {
        User {
            id: Uuid::new_v4(),
            email: user.email,
            roles: user.roles,
        }
    }
}

// Create our user
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User {
    pub(crate) id: Uuid,
    email: String,
    roles: HashSet<String>,
}

// Implement the responder trait to return the user struct
impl Responder for User {
    type Error = Error;
    type Future = Ready<Result<HttpResponse, Error>>;

    fn respond_to(self, _req: &HttpRequest) -> Self::Future {
        let body = serde_json::to_string(&self).unwrap();

        ready(Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(body)))
    }
}
