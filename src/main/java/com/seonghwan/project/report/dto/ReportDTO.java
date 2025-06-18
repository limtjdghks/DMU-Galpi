package com.seonghwan.project.report.dto;

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
}