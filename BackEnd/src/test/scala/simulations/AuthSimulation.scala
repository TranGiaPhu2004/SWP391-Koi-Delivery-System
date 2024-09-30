package simulations

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import scala.io.Source

class AuthSimulation extends Simulation {

  // Đọc file JSON từ thư mục resources/data
  val usernameRequestBody = Source.fromFile("src/test/resources/data/username.json").mkString
  val emailRequestBody = Source.fromFile("src/test/resources/data/email.json").mkString

  // Cấu hình HTTP
  val httpProtocol = http
    .baseUrl("http://localhost:8080") // URL của API
    .acceptHeader("application/json")
    .contentTypeHeader("application/json")

  // Kịch bản cho login bằng username
  val scnLoginUsername = scenario("Login with Username")
    .exec(http("Login by Username")
      .post("/auth/login/username")
      .body(StringBody(usernameRequestBody)).asJson // Load body từ file JSON
      .check(status.is(200))
      .check(jsonPath("$.token").saveAs("authToken")) // Lưu token trả về từ API
    )

  // Kịch bản cho login bằng email
  val scnLoginEmail = scenario("Login with Email")
    .exec(http("Login by Email")
      .post("/auth/login/email")
      .body(StringBody(emailRequestBody)).asJson // Load body từ file JSON
      .check(status.is(200))
      .check(jsonPath("$.token").saveAs("authToken")) // Lưu token trả về từ API
    )

  // Cấu hình mô phỏng
  setUp(
    scnLoginUsername.inject(atOnceUsers(10)), // 10 người dùng đăng nhập bằng username
    scnLoginEmail.inject(atOnceUsers(10))     // 10 người dùng đăng nhập bằng email
  ).protocols(httpProtocol)
}
