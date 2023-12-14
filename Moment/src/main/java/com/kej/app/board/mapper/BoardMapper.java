package com.kej.app.board.mapper;

import java.util.List;

import com.kej.app.board.service.vo.BoardListVO;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.ReplyVO;

public interface BoardMapper {
	//boardAllList
	public int pagecount(Criteria cri);
	public List<BoardVO> dressBoradList(Criteria cri);
	//boardInsert
	public int boardInsert(BoardVO vo);
	//boardDetail
	public BoardVO boardDressDetail(int BoardNo);	// 게시글
	public List<ReplyVO> replyList(int boardNo);	// 댓글리스트(대댓글X)
	public int dressBoardViewCount(int boardNo);	// 게시글 조회수
	//Before,After 확인완료
	public List<BoardVO> selectBoardsAfter(BoardListVO vo);
	public BoardVO selectBoardAt(BoardListVO vo);
	public List<BoardVO> selectBoardsBefore(BoardListVO vo);
	//boardUpdate
	public int dressBoardUpdate(BoardVO vo);
	//boardDelete
	public int dressBoardDelete(BoardVO vo);
	
	public List<BoardVO> artBoardList(Criteria cri); // 리스트 타입
	public List<BoardVO> artBoardCard(Criteria cri); // 카드 타입
	public List<BoardVO> artBoardAlbum(Criteria cri); // 앨범 타입
	public int artPagecount(Criteria cri);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
