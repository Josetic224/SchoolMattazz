package com.schoolmattazz.backend.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home(){
        return "Welcome to SchoolMattazz API";
    }

    @GetMapping("/health")
    public  String health(){
        return "SchoolMattazz API is running";
    }
}
