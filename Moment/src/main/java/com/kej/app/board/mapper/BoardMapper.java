package com.kej.app.board.mapper;

import java.util.List;

import com.kej.app.board.service.vo.BoardListVO;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.reply.service.vo.ReplyVO;

public interface BoardMapper {
	//boardAllList
	public int pagecount(Criteria cri);
	public List<BoardVO> dressBoradList(Criteria cri);
	//boardInsert
	public int boardInsert(BoardVO vo);
	//boardDetail
	public BoardVO boardDressDetail(int BoardNo);	// 게시글
	public int dressBoardViewCount(int boardNo);	// 게시글 조회수
	//Before,After 확인완료
	public List<BoardVO> selectBoardsAfter(BoardListVO vo);
	public BoardVO selectBoardAt(BoardListVO vo);
	public List<BoardVO> selectBoardsBefore(BoardListVO vo);
	//boardUpdate
	public int dressBoardUpdate(BoardVO vo);
	//boardDelete
	public int dressBoardDelete(BoardVO vo);
	
	public List<BoardVO> artBoardList(Criteria cri); // 전체조회(타입3개)
	public int artPagecount(Criteria cri);
	public BoardVO boardArtDetail(int BoardVO); // 상세조회
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
