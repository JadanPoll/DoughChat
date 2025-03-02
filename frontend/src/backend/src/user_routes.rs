use axum::{body::Body, extract::State, Json, http::StatusCode};
use neo4rs::query;
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};

use std::{fmt::write, sync::Arc};
use tokio::sync::Mutex;

use crate::application_state::ApplicationState;

pub async fn hello_route() -> String {
    "Whattup Mohammad".to_string()
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateUser {
    email: String,
    plaintext_password: String,

    // User information
    
    // Questionarre information
    //credit_limit_dollars: i32,
    //credit_utilized_dollars: i32,

}

pub async fn create_user(State(app_state): State<Arc<Mutex<ApplicationState>>>, Json(payload): Json<CreateUser>) -> Result<StatusCode, String> {
    let neo_graph = &app_state.lock().await.neo4j_connection;

    tracing::info!("Creating user");

    let db_resp = neo_graph.execute(
        query("
            MERGE (u:User {email: $user_email})
            SET u.hashed_password = $hashed_password
            RETURN u
        ")
        .param("user_email", payload.email)
        .param("hashed_password", hash_password(&payload.plaintext_password))
    ).await;

    match db_resp {
        Ok(mut resp) => {
            tracing::info!("Successfully created user in database!");
            println!("{:?}", resp.next().await);
            Ok(StatusCode::OK)
        },
        Err(_) => {
            Ok(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

fn hash_password(plaintext_password: &str) -> String {
    bcrypt::hash(plaintext_password, bcrypt::DEFAULT_COST).unwrap_or("".to_string())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginUser {
    email: String,
    
    // this will be fine when we are using https but huge security issue right now
    plaintext_password: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct DatabaseUser {
    email: String,
    hashed_password: String,

    // User information
    
    // Questionarre information
    credit_limit_dollars: i32,
    credit_utilized_dollars: i32,
}

pub async fn login_user(State(app_state): State<Arc<Mutex<ApplicationState>>>, Json(payload): Json<LoginUser>) -> Result<String, StatusCode> {
    // get hashed password stored in database
    let neo_graph = &app_state.lock().await.neo4j_connection;
    let user_node_resp = neo_graph.execute(
        query("
            MATCH (u:User {email: $user_email})
            RETURN u
        ")
        .param("user_email", payload.email.clone())
    ).await;

    let password_correct: bool = match user_node_resp {
        Ok(mut row) => {
            if let Ok(Some(user_row)) = row.next().await {
                if let Ok(user) = user_row.get::<DatabaseUser>("u") {
                    if let Ok(res) = bcrypt::verify(payload.plaintext_password.clone(), &user.hashed_password) {
                        res
                    } else {
                        false
                    }
                } else {
                    tracing::debug!("Hashed password does not match");
                    false
                }
            } else {
                tracing::debug!("No rows match that email");
                false
            }
        },
        Err(e) => {
            tracing::error!("Unable to get node from db: {}", e.to_string());
            false
        }
    };

    if password_correct {
        // generate JWT
        tracing::debug!("Password correct, generating jwt");
        let user_json_web_token = generate_jwt(payload.to_user_jwt());
        Ok(user_json_web_token)
    } else {
        Err(StatusCode::UNAUTHORIZED)
    }
}

impl LoginUser {
    pub fn to_user_jwt(&self) -> UserJWT {
    // Generate the current time and expiration time
    let now = chrono::Utc::now();
    let expiration = now + chrono::Duration::hours(1);  // Token expires in 1 hour

    // Create the claims struct
        UserJWT {
            email: self.email.clone(),
            exp: expiration.timestamp() as usize,
            iat: now.timestamp() as usize,
        }
    } 
}


#[derive(Serialize, Deserialize, Debug)]
pub struct UserJWT {
    exp: usize,
    iat: usize,

    email: String,
}

pub fn generate_jwt(userjwt: UserJWT) -> String {
    let jwt_secret = jsonwebtoken::EncodingKey::from_secret(std::env::var("JWT_SECRET").expect("define jwt secret").as_ref());
    let default_header = jsonwebtoken::Header::default();
    match jsonwebtoken::encode(&default_header, &userjwt, &jwt_secret) {
        Ok(jwt) => jwt,
        Err(_) => "".to_string()
    }
}
