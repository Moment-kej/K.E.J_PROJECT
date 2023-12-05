package com.kej.app.common.service.vo;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;
import lombok.Data;

@Data
public class NewsVO {
//	private String lastBuildDate;
//	private int total;
//	private int start;
//	private int display;
	private String title;
	private String originallink;
	private String link;
	private String description;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date pubDate;
	
}
