package com.kej.app.board.mapper;

import java.util.List;

import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;

public interface BoardMapper {
	//boardAllList
	public int pagecount(Criteria cri);
	public List<BoardVO> dressBoradList(Criteria cri);
	//boardInsert
	public int boardInsert(BoardVO vo);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
