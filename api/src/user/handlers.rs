use actix_web::{delete, get, post, put, Responder};
use crate::user::model::{User, UserInput};
use actix_web::web::{Data, Json, Path};
use std::collections::HashMap;
use std::sync::Mutex;

type SharedDatabase = Data<Mutex<HashMap<String, User>>>;

// Handler to retrieve a single user by id
#[get("/users/{id}")]
pub async fn get_user(params: Path<String>, database: SharedDatabase) -> impl Responder {
    let database = database.lock().unwrap();
    let id = params.into_inner();
    database.get(&id).unwrap().clone()
}

// Handler to create a single user
#[post("/users")]
pub async fn add_user(user: Json<UserInput>, database: SharedDatabase) -> impl Responder {
    let mut database = database.lock().unwrap();
    let user = User::from(user.into_inner());
    let id = user.id.to_hyphenated().to_owned();
    database.insert(id.to_string(), user);
    database.get(&id.to_string()).unwrap().clone()
}

// Handler to update a single user
#[put("/users/{id}")]
pub async fn update_user(
    params: Path<String>,
    user: Json<UserInput>,
    database: SharedDatabase,
) -> impl Responder {
    let mut database = database.lock().unwrap();
    let user = User::from(user.into_inner());
    let id = params.into_inner();
    database.insert(id.to_string(), user);
    database.get(&id).unwrap().clone()
}

// Handler to delete a single user
#[delete("/users/{id}")]
pub async fn delete_user(params: Path<String>, database: SharedDatabase) -> impl Responder {
    let mut database = database.lock().unwrap();
    let id = params.into_inner();
    database.remove(&id)
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
