package com.kej.app.reply.mapper;

import java.util.List;
import java.util.Optional;

import com.kej.app.reply.service.vo.ReplyVO;

public interface ReplyMapper {
	public List<ReplyVO> replyList(ReplyVO vo);			// 부모 댓글 리스트
	public List<ReplyVO> childReplyList(ReplyVO vo);	// 자식 댓글 리스트
	public int parentReplyInsert(ReplyVO vo);			// 부모 댓글 등록
	public int childReplyInsert(ReplyVO vo);			// 자식 댓글 등록
	public int replyUpdate(ReplyVO vo);					// 댓글 수정
	public int replyDelete(int boardNo);				// 댓글 삭제
	// --- eunae End -----------------------------------------------------------
	
	
	// --- Minjin Start --------------------------------------------------------
	public List<ReplyVO> musicReplyAllList(ReplyVO vo); // 댓글 조회
	public int musicReplyInsert(ReplyVO vo);			// 댓글 등록
	public int musicReplyUpdate(ReplyVO vo);			// 댓글 수정
	public int musicReplyDelete(Integer replyNo);			// 댓글 삭제
}
