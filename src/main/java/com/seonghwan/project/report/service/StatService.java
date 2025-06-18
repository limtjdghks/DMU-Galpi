package com.seonghwan.project.report.service;

import com.seonghwan.project.report.entity.Report;
import com.seonghwan.project.report.repository.ReportRepository;
import com.seonghwan.project.user.entity.User;
import com.seonghwan.project.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    // 한달 간격으로 독후감 작성 통계 조회
    public Map<YearMonth, Long> getMonthlyStats(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 조회할 수 없습니다"));

        List<Report> reports = reportRepository.findAllByUser_Id(user.getId());

        return reports.stream()
                .collect(Collectors.groupingBy(
                        r -> YearMonth.from(r.getCreatedAt()),
                        Collectors.counting()
                ));
    }

    // 읽은 책 장르 통계 조회
    public Map<String, Long> getTagStats(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 조회할 수 없습니다"));

        List<Report> reports = reportRepository.findAllByUser_Id(user.getId());

        return reports.stream()
                .collect(Collectors.groupingBy(
                        Report::getTag,
                        Collectors.counting()
                ));
    }
}