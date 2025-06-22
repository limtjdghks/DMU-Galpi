package com.seonghwan.project.report.dto;

import com.seonghwan.project.report.entity.Report;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDTO {
    private String bookId;
    private String bookName;
    private String tag;
    private String content;

    public ReportDTO(Report report) {
    }
}