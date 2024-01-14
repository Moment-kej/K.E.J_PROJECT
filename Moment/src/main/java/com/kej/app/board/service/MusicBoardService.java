package com.kej.app.board.service;

import java.util.List;
import java.util.Map;

import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;

public interface MusicBoardService {
	
	
	public List<BoardVO> musicBoardAllList(Criteria cri);					// Music 게시판 목록 조회	
	public int pageCount(Criteria cri);										// 페이징
	public BoardVO musicBoardDetail(int BoardNo);							// Music 단건 조회
	public Map<String, Object> musicBoardFirstAndLastNumber(BoardVO vo);	// 이전글, 다음글
	public List<BoardVO> getRelatedPost(BoardVO vo);						// 관련 게시글
}
