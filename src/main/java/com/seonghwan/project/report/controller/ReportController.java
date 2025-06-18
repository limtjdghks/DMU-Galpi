package com.seonghwan.project.report.controller;

import com.seonghwan.project.report.dto.ReportDTO;
import com.seonghwan.project.report.entity.Report;
import com.seonghwan.project.report.service.ReportService;
import com.seonghwan.project.user.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<?> createReport(@RequestBody ReportDTO report) {
        String userId = SecurityUtil.getCurrentUserName()
                .orElseThrow(() -> new RuntimeException("인증정보가 없습니다"));

        Report saved = reportService.createReport(report, userId);
        return ResponseEntity.ok().body(saved.getId());
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<?> getReport(@PathVariable String bookId) {
        String userId = SecurityUtil.getCurrentUserName()
                .orElseThrow(() -> new RuntimeException("인증정보가 없습니다."));

        Report report = reportService.getReport(bookId, userId);
        return ResponseEntity.ok().body(report);
    }
}