package com.kej.app.common.service.vo;

import java.util.List;

import lombok.Data;

@Data
public class NaverBookVO {
	private String lastBuildDate;
	private int total;
	private int start;
	private int display;
	private List<BookVO> items;
}
