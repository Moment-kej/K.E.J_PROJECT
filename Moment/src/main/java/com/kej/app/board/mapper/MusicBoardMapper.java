package com.kej.app.board.mapper;

import java.util.List;

import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.PageVO;

public interface MusicBoardMapper {
	
	public List<BoardVO> musicBoardAllList(Criteria cri);	// Music 게시판 목록 조회
	public int pageCount(Criteria cri);						// 페이징
	
	public BoardVO musicBoardDetail(int boardNo);			// Music 단건 조회

	public BoardVO musicBoardFirstNumber(BoardVO vo);		// 게시판 첫번째 글 번호
	public BoardVO musicBoardLastNumber(BoardVO vo);		// 게시판 마지막 글 번호
	public BoardVO findPrevNextBoardNumber(BoardVO vo);
}
