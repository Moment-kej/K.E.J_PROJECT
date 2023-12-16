package com.kej.app.board.service.vo;

import lombok.Data;

//sql문에 페이지번호, 데이터개수 전달해줄 클래스
@Data
public class Criteria {
	
	private int page; 			// 페이지번호
	private int amount; 		// 데이터개수(10, 20, 30, 40개 씩 게시글 보여주기)
	private int category;		// 카테고리
	private String listType;	// 게시글타입
	private int code;			// 10, 20, 30
	
	private String searchType;	// 검색타입
	private String searchName;	// 검색값

	public Criteria() {
		this.page = 1;
		this.amount = 10;
		this.category = 0;
		this.listType = "";
		this.code = 0;
		this.searchType = "";
		this.searchName = "";
	}

	public Criteria(int page, int amout, int catagory) {
		super();
		this.page = page;
		this.amount = amout;
		this.category = catagory;
	}

	//limit함수의 페이지시작 부분에 들어갈 getter
    //가져올 데이터의 시작 부분을 반환해주는 거임 limit 0 , 10 에서 0.
	public int getPageStart(){
		return (page - 1) * amount;
	}

}
