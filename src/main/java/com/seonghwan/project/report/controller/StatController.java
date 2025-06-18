package com.seonghwan.project.report.controller;

import com.seonghwan.project.report.service.StatService;
import com.seonghwan.project.user.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/report/stats")
@RequiredArgsConstructor
public class StatController {
    private final StatService statService;

    @GetMapping("/monthly")
    public ResponseEntity<?> getMonthlyStats() {
        String userId = SecurityUtil.getCurrentUserName().orElseThrow();
        return ResponseEntity.ok(statService.getMonthlyStats(userId));
    }

    @GetMapping("/tags")
    public ResponseEntity<?> getTagsStats() {
        String userId = SecurityUtil.getCurrentUserName().orElseThrow();
        return ResponseEntity.ok(statService.getTagStats(userId));
    }
}