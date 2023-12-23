package com.kej.app.board.mapper;

import java.util.List;

import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.PageVO;

public interface MusicBoardMapper {
	
	// Music 게시판 목록 조회
	public List<BoardVO> musicBoardAllList(Criteria cri);

	// 페이지
	public int pageCount(Criteria cri);

	// Music 단건 조회
	public BoardVO musicBoardDetail(int boardNo); 
}
