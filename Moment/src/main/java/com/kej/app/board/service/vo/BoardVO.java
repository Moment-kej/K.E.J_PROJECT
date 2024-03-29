package com.kej.app.board.service.vo;

import java.sql.Timestamp;
import java.util.List;

import com.mysql.cj.xdevapi.JsonArray;

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
	private int viewCount;
	private int yn;
	
	//댓글
	private int replyCount;
	private int replyNo;
	
	//좋아요
	private int likeCount;
	
	//boardNo 추출
	private int currval;
	
	// 관련게시글
	private String relatedPostList;
	private String[] selectedArray;
}
