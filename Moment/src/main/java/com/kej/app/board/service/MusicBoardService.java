package com.kej.app.board.service;

import java.util.List;

import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;

public interface MusicBoardService {
	
	// Music 게시판 목록 조회	
	public List<BoardVO> musicBoardAllList(Criteria cri);
	
}
