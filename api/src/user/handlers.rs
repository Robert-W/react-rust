use crate::user::model::{User, UserInput};
use actix_web::web::{Data, Json, Path};
use actix_web::{delete, get, post, put};
use actix_web::{HttpResponse, Responder};
use std::collections::HashMap;
use std::sync::Mutex;

type SharedDatabase = Data<Mutex<HashMap<usize, User>>>;

// Handler to retrieve a single user by id
#[get("/users/{id}")]
pub async fn get_user(
    Path(id): Path<usize>,
    database: SharedDatabase,
) -> Result<User, HttpResponse> {
    let database = database.lock().unwrap();
    // Handle possible errors with bad lookups
    if let Some(user) = database.get(&id) {
        Ok(user.clone())
    } else {
        Err(HttpResponse::NotFound().body("Not Found"))
    }
}

// Handler to create a single user
#[post("/users")]
pub async fn add_user(user: Json<UserInput>, database: SharedDatabase) -> impl Responder {
    let mut database = database.lock().unwrap();
    let user = User::from(user.into_inner());
    let id = database.len();
    database.insert(id, user);
    database.get(&id).unwrap().clone()
}

// Handler to update a single user
#[put("/users/{id}")]
pub async fn update_user(
    Path(id): Path<usize>,
    user: Json<UserInput>,
    database: SharedDatabase,
) -> impl Responder {
    let mut database = database.lock().unwrap();
    let user = User::from(user.into_inner());
    database.insert(id, user);
    database.get(&id).unwrap().clone()
}

// Handler to delete a single user
#[delete("/users/{id}")]
pub async fn delete_user(Path(id): Path<usize>, database: SharedDatabase) -> impl Responder {
    let mut database = database.lock().unwrap();
    database.remove(&id);
    // Return a 204, no need to return an error
    HttpResponse::NoContent()
}

// Handler to retrieve all of our user
#[get("/users")]
pub async fn get_users(database: SharedDatabase) -> impl Responder {
    let database = database.lock().unwrap();
    let mut users: Vec<User> = Vec::new();
    // Iterate through our hash map
    for user in database.values() {
        users.push(user.clone());
    }
    // Return all of our users
    Json(users)
}
