mod user_routes;
mod application_state;
mod transactions;
mod ideal_budget;

use application_state::{initialize_application_state, ApplicationState};
use ideal_budget::{ideal_budget, get_transactions_for_month};
use axum::{
    Router,
    routing::{get, post}
};
use user_routes::{create_user, hello_route, login_user};

use std::sync::Arc;
use tokio::sync::Mutex;

use tower_http::cors::{CorsLayer, Any};

#[tokio::main]
async fn main() {

    let application_state: Arc<Mutex<ApplicationState>> = initialize_application_state().await;

    let cors = CorsLayer::new()
        .allow_origin(Any) // Allows all origins
        .allow_methods(Any) // Allows all HTTP methods
        .allow_headers(Any); // Allows all headers

    let application = Router::new()
        .without_v07_checks()
        .route("/", get(hello_route))
        .route("/user/create", post(create_user))
        .route("/user/login", post(login_user))
        .route("/budget/ideal", get(ideal_budget))
        .route("/budget/current", get(get_transactions_for_month))
        .layer(cors)

        .with_state(application_state);

    // run our app with hyper, listening globally on port 3333
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3333").await.unwrap();
    axum::serve(listener, application).await.unwrap();
}
