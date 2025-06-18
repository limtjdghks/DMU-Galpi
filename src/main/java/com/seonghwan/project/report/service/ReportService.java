package com.seonghwan.project.report.service;

import com.seonghwan.project.report.dto.ReportDTO;
import com.seonghwan.project.report.entity.Report;
import com.seonghwan.project.report.repository.ReportRepository;
import com.seonghwan.project.user.entity.User;
import com.seonghwan.project.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public Report createReport(ReportDTO dto, String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Report report = Report.builder()
                .bookId(dto.getBookId())
                .bookName(dto.getBookName())
                .tag(dto.getTag())
                .content(dto.getContent())
                .user(user)
                .build();

        return reportRepository.save(report);
    }

    public Report getReport(String bookId, String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return reportRepository.findByBookIdAndUser_Id(bookId, user.getId())
                .orElseThrow(() -> new NoSuchElementException("독후감을 찾을 수 없습니다."));
    }
}