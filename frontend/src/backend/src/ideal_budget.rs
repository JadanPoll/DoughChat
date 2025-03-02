use axum::{extract::Query, response::IntoResponse, Json};
use neo4rs::Id;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tokio::sync::Mutex;
use std::sync::Arc;

use crate::application_state::ApplicationState;

pub fn give_labels() -> Vec<String> {
    vec!["Needs", "Wants", "Savings", "Food and Drink", "Rent and Utilities", "Transportation", "Entertainment", "Personal Care", "General Merchandise", "Travel", "Loan Payment"].into_iter().map(|item| item.to_string()).collect::<Vec<String>>()
}

pub fn give_parents() -> Vec<String> {
    vec!["Needs", "Wants", "Savings", "Needs", "Needs", "Needs", "Wants", "Wants", "Wants", "Wants", "Savings"]
        .into_iter()
        .map(|item| item.to_string())
        .collect()
}

fn give_values(income: i32, debt: i32) -> Vec<f64> {
    let mut n = 0.0;
    let mut w = 0.0;
    let mut s = 0.0;

    let mut h = 0.0;
    let mut f = 0.0;
    let mut tran = 0.0;

    let mut e = 0.0;
    let mut p = 0.0;
    let mut g = 0.0;
    let mut trav = 0.0;

    let mut repay = 0.0;
        
    if income <= 10000 {
        n = 0.7 * income as f64;
    }
    else if income <= 50000 {
        n = (0.5 * (income as f64 - 10000.0)) + 7000.0;
    }
    else if income <= 100000 {
        n = (0.4 * (income as f64 - 50000.0)) + 27000.0;
    }
    else if income <= 250000 {
        n = (0.35 * (income as f64 - 100000.0)) + 47000.0;
    }
    else {
        n = (0.3 * (income as f64 - 250000.0)) + 99500.0;
    }


    if income <= 10000 {
        w = 0.1 * income as f64;
    }
    else if income <= 50000 {
        w = (0.3 * (income as f64 - 10000.0)) + 1000.0;
    }
    else if income <= 100000 {
        w = (0.35 * (income as f64 - 50000.0)) + 13000.0;
    }
    else {
        w = (0.25 * (income as f64 - 100000.0)) + 30500.0;
    }

    if income <= 50000 {
        s = 0.2 * income as f64;
    }
    else if income <= 100000 {
        s = (0.25 * (income as f64 - 50000.0)) + 10000.0;
    }
    else if income <= 250000 {
        s = (0.4 * (income as f64 - 100000.0)) + 22500.0;
    }
    else {
        s = (0.45 * (income as f64 - 250000.0)) + 82500.0;
    }

    if n < 60000.0 {
        h = 0.6 * n;
    }
    else {
        h = (0.4 * n) + 6200.0;
    }

    tran = 0.2 * n;

    f = n - (tran + h);

    if w >= 5000.0 {
        trav = 0.1 * (w - 5000.0);
    }

    g = 0.5 * w;
    e = (1.0/3.0) * (w - (trav + g));
    p = e;


    
    if debt > 0 {
        if (debt as f64) < (0.25 * s) {
            repay = debt as f64;
        }
        else {
            repay = 0.25 * s;
        }
    }

    let values = vec![n, w, s, f, h, tran, e, p, g, trav, repay];
    values
}


#[derive(Serialize, Deserialize, Debug)]
pub struct BudgetParameters {
    income: i32,
    debt: i32
}

#[derive(Serialize, Deserialize, Debug)]
pub struct IdealBudgetResponse {
    pub labels: Vec<String>,
    pub parents: Vec<String>,
    pub values: Vec<f64>,
}

pub async fn ideal_budget(
    Query(budget_params): Query<BudgetParameters>) -> Json<IdealBudgetResponse> {
    let response = IdealBudgetResponse {
        labels: give_labels(),
        parents: give_parents(),
        values: give_values(budget_params.income, budget_params.debt),
    };

    assert!(response.values.len() == response.parents.len() && response.parents.len() == response.values.len());

    Json(response)
    //"".to_string()
} 

pub async fn get_transactions_for_month() -> Json<IdealBudgetResponse> {
    let categories = give_labels();
    let parents = give_parents();

    let num_transactions = rand::random_range(100..200);

    let mut budget_response = IdealBudgetResponse {
        labels: vec![],
        parents: vec![],
        values: vec![],
    };

    for _ in 0..num_transactions {
        let category_chosen_index = rand::random_range(3..categories.len());

        budget_response.labels.push(categories[category_chosen_index].clone());
        budget_response.parents.push(parents[category_chosen_index].clone());

        let dollars_spent = rand::random_range(5..300);

        budget_response.values.push(dollars_spent as f64);
    }

    Json(budget_response)
}
