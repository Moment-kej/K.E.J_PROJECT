package com.kej.app.board.service.vo;

import java.sql.Timestamp;


import lombok.Data;

@Data
public class BoardVO {
	private int boardNo;
	private int code;
	private int category;
	private String id;
	private String title;
	private String  content;
	// https://donggu1105.tistory.com/122
	// Timestamp : mysql 데이터타입 'DATETIME'을 읽을 때 사용하는 java 데이터 타입 
	private Timestamp writeDt;
	private int view;
	private int yn;
	
	//댓글
	private int replyCount;
	private int replyNo;
}
