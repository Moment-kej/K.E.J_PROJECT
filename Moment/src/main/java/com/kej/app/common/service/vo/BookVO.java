package com.kej.app.common.service.vo;

import java.util.Date;

import lombok.Data;

@Data
public class BookVO {
	private String title;
	private String originallink;
	private String link;
	private String image;
	private String author;
	private String discount;
	private String publisher;
	private Date pubdate;
	private String isbn;
	private String description;
}
