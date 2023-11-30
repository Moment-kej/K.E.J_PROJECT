package com.kej.app.board.service.vo;

import java.util.ArrayList;

import lombok.Data;

//sql문에 페이지번호, 데이터개수 전달해줄 클래스
@Data
public class Criteria {
	
	private int page; 		//페이지번호
	private int amount; 	//데이터개수
	private int category;	// 카테고리

	public Criteria() {
		this.page = 1;
		this.amount = 10;
		this.category = 0;
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
