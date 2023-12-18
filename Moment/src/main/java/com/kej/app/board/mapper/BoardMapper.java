package com.kej.app.board.mapper;

import java.util.List;
import java.util.Map;

import com.kej.app.board.service.vo.BoardListVO;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;

public interface BoardMapper {
	//board all list
	public int pagecount(Criteria cri);
	public List<BoardVO> dressBoradList(Criteria cri);
	//board insert
	public int boardInsert(BoardVO vo);
	//board detail
	public BoardVO boardDressDetail(int BoardNo);	// 게시글
	public int dressBoardViewCount(int boardNo);	// 게시글 조회수
	//Before,After 확인완료
	public List<BoardVO> selectBoardsAfter(BoardListVO vo);
	public BoardVO selectBoardAt(BoardListVO vo);
	public List<BoardVO> selectBoardsBefore(BoardListVO vo);
	//board update
	public int dressBoardUpdate(BoardVO vo);
	//board delete
	public int dressBoardDelete(BoardVO vo);
	//main page new board whithin 3 days
	public List<BoardVO> newBoardListWithin3Days(Criteria cri);
	public int newBoardCountWithin3Days(Criteria cri);
	
	
	
	
	
	public List<BoardVO> artBoardList(Criteria cri); // 전체조회(타입3개)
	public int artPagecount(Criteria cri);
	public Map<String,Object> boardArtDetail(int BoardVO); // 상세조회
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
