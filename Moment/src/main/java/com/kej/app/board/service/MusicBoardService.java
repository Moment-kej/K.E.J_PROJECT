package com.kej.app.board.service;

import java.util.List;

import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.PageVO;

public interface MusicBoardService {
	
	// Music 게시판 목록 조회	
	public List<BoardVO> musicBoardAllList(Criteria cri);
	
	public int pageCount(Criteria cri);
	
	// Music 단건 조회
	public BoardVO musicBoardDetail(int BoardNo);
	
}
