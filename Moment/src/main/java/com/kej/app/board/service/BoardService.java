package com.kej.app.board.service;

import java.util.List;
import java.util.Map;

import com.kej.app.board.service.vo.BoardListVO;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;


public interface BoardService {
	public List<BoardVO> dressBoradList(Criteria cri);
	public int pagecount(Criteria cri);
	public int boardInsert(BoardVO vo);
	public int maxBoardNo();
	public BoardVO boardDressDetail(int BoardNo);
	public int dressBoardViewCount(int boardNo);
	public BoardVO findHeart(BoardVO vo);
	public int boardLike(BoardVO vo);
	public List<BoardVO> getCombinedBoardList(BoardListVO vo);
	public int dressBoardUpdate(BoardVO vo);
	public int dressBoardDelete(BoardVO vo);
	public Map<String, Object> boardNewList(Criteria cri);
	public Map<String, Object> boardTopList(Criteria cri);
	public Map<String, Object> postsWithImages(Criteria cri);
	
	
	
	public List<BoardVO> artBoardList(Criteria cri); // 전체조회(모든타입)
	public int artPagecount(Criteria cri);
	public Map<String, Object> boardArtDetail(int BoardNo); // 상세 조회
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
