package com.seonghwan.project.report.repository;

import com.seonghwan.project.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findByBookIdAndUser_Id(String bookId, Long userId);
    List<Report> findAllByUser_Id(Long userId);
}