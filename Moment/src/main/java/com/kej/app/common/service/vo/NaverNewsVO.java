package com.kej.app.common.service.vo;

import java.util.List;

import lombok.Data;

@Data
public class NaverNewsVO {
	private String lastBuildDate;
	private int total;
	private int start;
	private int display;
	//NewsVO, BookVO랑 같이 사용하려 하였으나 필드명이 같으면 안됨. 
	//필드명을 다르게하면 JSON 맵핑이 안됨
	private List<NewsVO> items;
}
