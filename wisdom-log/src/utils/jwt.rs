use std::collections::HashMap;
use serde_json::Value;
pub struct Jwt {
    headers: HashMap<String, Value>,
    payloads: HashMap<String, Value>,
    token: String
}

impl Jwt {
    pub fn new(token: &str) -> Self {
        Jwt {
            headers: HashMap::new(),
            payloads: HashMap::new(),
            token: token.to_string()
        }
    }

    pub fn add_headers(&mut self, headers: HashMap<String, Value>) -> &Self {
        self.headers = headers;
        self
    }

    pub fn add_payloads(&mut self, payloads: HashMap<String, Value>) -> &Self {
        self.payloads = payloads;
        self
    }

    pub fn get_payload(&self, name: &str) -> Option<&Value> {
        self.payloads.get(name)
    }

    pub fn build() -> String {
        "".to_string()
    }
}
