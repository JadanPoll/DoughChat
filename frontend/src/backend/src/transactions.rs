use axum::Json;
use serde::{Deserialize, Serialize};

use crate::ideal_budget::{give_labels, give_parents, IdealBudgetResponse};

#[derive(Serialize, Deserialize, Debug)]
struct Transaction {
    category: String,
    cost: f32,
}

pub fn get_transactions_for_month() -> Json<IdealBudgetResponse> {
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
