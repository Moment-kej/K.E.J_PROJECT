package com.kej.app.board.service;

import java.util.List;

import com.kej.app.board.service.vo.BoardListVO;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.ReplyVO;


public interface BoardService {
	public List<BoardVO> dressBoradList(Criteria cri);
	public int pagecount(Criteria cri);
	public int boardInsert(BoardVO vo);
	public BoardVO boardDressDetail(int BoardNo);
	public List<ReplyVO> replyList(int boardNo);
	public int dressBoardViewCount(int boardNo);
	public List<BoardVO> getCombinedBoardList(BoardListVO vo);
	public int dressBoardUpdate(BoardVO vo);
	public int dressBoardDelete(BoardVO vo);
	
	
	
	
	public List<BoardVO> artBoardList(Criteria cri); // 전체조회(모든타입)
	public int artPagecount(Criteria cri);
	public BoardVO boardArtDetail(int BoardNo); // 상세 조회
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
