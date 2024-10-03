package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().info(new Info().title("SWP391 api")
                        .version("1.0")
                        .description("Koi delivery ordering sys")
                        .license(new License().name("Api license").url("https://opensource.org/licenses/LICENSE-2.0.html")))
                .servers(List.of(new Server().url("http://localhost:8080/").description("Server test")));
    }

    @Bean
    public GroupedOpenApi groupedOpenApi() {
        return GroupedOpenApi.builder()
                .group("api-service-1")
                .packagesToScan("com.example.demo.controller")
                .build();
    }

}
