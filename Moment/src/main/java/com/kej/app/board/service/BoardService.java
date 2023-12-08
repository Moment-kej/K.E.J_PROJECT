package com.kej.app.board.service;

import java.util.List;

import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;


public interface BoardService {
	public List<BoardVO> dressBoradList(Criteria cri);
	public int pagecount(Criteria cri);
	public int boardInsert(BoardVO vo);
	
	
	
	
	
	public List<BoardVO> artBoardList(Criteria cri);
	public int artPagecount(Criteria cri);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
