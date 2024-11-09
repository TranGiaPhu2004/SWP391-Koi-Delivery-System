package com.example.demo.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginApiTest {

    @Autowired
    private MockMvc mockMvc;

    // Centralized credentials for easy access and modification
    private static final String TEST_USERNAME = "admin";
    private static final String TEST_PASSWORD = "admin123";
    private static final String TEST_ROLE = "Admin";
    private static final String LOGIN_URL = "http://localhost:8080/auth/login/username";
    private static final String WHOAMI_URL = "http://localhost:8080/test/whoami";

    // Helper method to get a valid token
    private String getAuthToken() throws Exception {
        String responseContent = mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"" + TEST_USERNAME + "\", \"password\":\"" + TEST_PASSWORD + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andReturn().getResponse().getContentAsString();

        // Extract the token value from the response body
        return JsonPath.parse(responseContent).read("$.token");
    }

    // TC01 - Test Login API with correct username and password
    @Test
    public void testLoginWithValidCredentials() throws Exception {
        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"" + TEST_USERNAME + "\", \"password\":\"" + TEST_PASSWORD + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.role", is(TEST_ROLE)))
                .andExpect(jsonPath("$.username", is(TEST_USERNAME)));
    }

    // TC02 - Test Login API with correct password but no username
    @Test
    public void testLoginWithMissingUsername() throws Exception {
        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"password\":\"" + TEST_PASSWORD + "\"}"))
                .andExpect(status().isUnauthorized());
    }

    // TC03 - Test Login API with correct username but no password
    @Test
    public void testLoginWithMissingPassword() throws Exception {
        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"" + TEST_USERNAME + "\"}"))
                .andExpect(status().isUnauthorized());
    }

    // TC04 - Test Login API with missing credentials
    @Test
    public void testLoginWithNoCredentials() throws Exception {
        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isUnauthorized());
    }

    // TC05 - Test authorization with a token from a successful login
    @Test
    public void testWhoAmIWithToken() throws Exception {
        String token = getAuthToken();

        // Then, make the /test/whoami request with the token
        mockMvc.perform(get(WHOAMI_URL)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.msg", is("Token belongs to user: " + TEST_USERNAME)));
    }
}
