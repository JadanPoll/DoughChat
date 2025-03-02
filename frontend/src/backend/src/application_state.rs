use std::{env, sync::Arc};
use neo4rs::{query, Graph, Query};
use tokio::sync::Mutex;
use dotenv::dotenv;

pub struct ApplicationState {
    pub neo4j_connection: Graph,
    //pub plaid_client: PlaidClient,
}

pub async fn initialize_application_state() -> Arc<Mutex<ApplicationState>> {
    // env variables
    dotenv::dotenv().ok();
    
    // setup tracing information
    tracing_subscriber::fmt().with_max_level(tracing::Level::DEBUG).init();

    let neo4j_connection = initialize_database().await;

    //let plaid_client: PlaidClient = initialize_plaid_client().await;

    tracing::info!("Successfully connected to database");

    Arc::new(
        Mutex::new(
            ApplicationState {
                neo4j_connection,
                //plaid_client,
            }
        )
    )
}

async fn initialize_database() -> Graph {
    // connect to database
    let neo4j_uri = env::var("NEO4J_URI").expect("Define NEO4J_URI");
    let neo4j_user = env::var("NEO4J_USER").expect("Define NEO4J_USER");
    let neo4j_password = env::var("NEO4J_PASSWORD").expect("Define NEO4J_PASSWORD");

    let neo4j_connection: neo4rs::Graph = neo4rs::Graph::new(neo4j_uri, neo4j_user, neo4j_password).await.expect("Unable to connect to database");

    // Execute a simple query to test the connection
    let mut result = neo4j_connection.execute(query("RETURN 1 AS number")).await.unwrap();

    // Consume the stream to ensure the query is executed
    while let Ok(Some(row)) = result.next().await {
        println!("{:?}", row);
    }

    neo4j_connection
} 

//async fn initialize_plaid_client() -> PlaidClient {
//    let plaid_auth = PlaidAuth::from_env();
//
//    let plaid_client = PlaidClient::with_auth(plaid_auth);
//
//    tracing::info!("Successfully created plaid client");
//
//    plaid_client
//}
