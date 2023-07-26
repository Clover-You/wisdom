use std::collections::HashMap;

use actix_web::middleware::Logger;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use env_logger::Env;
use log::{info};
use serde_json::Value;

mod utils;
use utils::jwt;

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(Env::default().default_filter_or("debug"));

    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(web::scope("/record").service(save_record))
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
    })
    .bind(("127.0.0.1", 10100))?
    .run()
    .await
}

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[post("/save")]
async fn save_record() -> impl Responder{
    info!("日志保存 OK👌");
    HttpResponse::Ok()
}

pub struct JwtHeader {
    alg: String,
    typ: String
}