// package simulations

// import io.gatling.core.Predef._
// import io.gatling.http.Predef._
// import scala.concurrent.duration._

// class TestSimulation extends Simulation {

//   val httpProtocol = http
//     .baseUrl("http://localhost:8080") // Đường dẫn ứng dụng
//     .inferHtmlResources()

//   val scn = scenario("Auth Simulation")
//     .exec(http("Get_Test")
//       .get("/test")
//       .check(status.is(200)))

//   setUp(
//     scn.inject(atOnceUsers(10)) // Số lượng người dùng đồng thời
//   ).protocols(httpProtocol)
// }
