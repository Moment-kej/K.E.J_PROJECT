package com.kej.app.board.service;

import java.util.List;
import java.util.Map;

import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;

public interface MusicBoardService {
	
	// Music 게시판 목록 조회	
	public List<BoardVO> musicBoardAllList(Criteria cri);
	
	public int pageCount(Criteria cri);
	
	// Music 단건 조회
	public BoardVO musicBoardDetail(int BoardNo);
	public Map<String, Object> musicBoardFirstAndLastNumber(BoardVO vo);
	public String getRelatedPost(BoardVO vo);
}
