package com.seonghwan.project.book;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
public class BookController {
    private final RestTemplate restTemplate;

    @Value("${aladin.ttbkey}")
    private String ttbKey;

    private static final String SCHEME = "http";
    private static final String HOST = "www.aladin.co.kr";
    private static final String BASE_PATH = "/ttb/api";

    public BookController(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        URI uri = UriComponentsBuilder.newInstance()
                .scheme(SCHEME)
                .host(HOST)
                .path(BASE_PATH + "/ItemSearch.aspx")
                .queryParam("ttbkey", ttbKey)
                .queryParam("Query", query)
                .queryParam("QueryType", "Title")
                .queryParam("MaxResults", 20)
                .queryParam("start", 1)
                .queryParam("SearchTarget", "Book")
                .queryParam("output", "js")
                .queryParam("Version", "20131101")
                .build()
                .toUri();

        ResponseEntity<Map> response = restTemplate.getForEntity(uri, Map.class);
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<?> getDetail(@PathVariable String id) {
        if(id.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid ISBN 13");
        }

        URI uri = UriComponentsBuilder.newInstance()
                .scheme(SCHEME)
                .host(HOST)
                .path(BASE_PATH + "/ItemLookUp.aspx")
                .queryParam("ttbkey", ttbKey)
                .queryParam("itemIdType", "ISBN13")
                .queryParam("ItemId", id)
                .queryParam("output", "js")
                .queryParam("Version", "20131101")
                .queryParam("OptResult", "Story,previewImgList,ratingInfo")
                .build()
                .toUri();
        ResponseEntity<Map> response = restTemplate.getForEntity(uri, Map.class);
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/bestsellers")
    public ResponseEntity<?> getBestSellers() {
        URI uri = UriComponentsBuilder.newInstance()
                .scheme(SCHEME)
                .host(HOST)
                .path(BASE_PATH + "/ItemList.aspx")
                .queryParam("ttbkey", ttbKey)
                .queryParam("QueryType", "Bestseller")
                .queryParam("MaxResults", 4)
                .queryParam("start", 1)
                .queryParam("SearchTarget", "Book")
                .queryParam("output", "js")
                .queryParam("Version", "20131101")
                .build()
                .toUri();

        ResponseEntity<Map> response = restTemplate.getForEntity(uri, Map.class);
        return ResponseEntity.ok(response.getBody());
    }
}