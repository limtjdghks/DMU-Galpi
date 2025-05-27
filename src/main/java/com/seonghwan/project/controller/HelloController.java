package com.seonghwan.project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class HelloController {
        @GetMapping("/api/hello")
        public String hello() {
            return "하이하이";
        }
}