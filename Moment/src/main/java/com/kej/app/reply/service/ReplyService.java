package com.kej.app.reply.service;

import java.util.List;

import com.kej.app.reply.service.vo.ReplyVO;

public interface ReplyService {
	public List<ReplyVO> replyList(ReplyVO vo);
	public int replyInsert(ReplyVO vo);
	public int replyModify(ReplyVO vo);
	public int replyDelete(int replyNo);
	// --- eunae End -----------------------------------------------------------
	
	
	// --- Minjin Start --------------------------------------------------------
	public List<ReplyVO> musicReplyAllList(ReplyVO vo);	// 조회
	public int musicReplyInsert(ReplyVO vo);			// 등록
	public int musicReplyUpdate(ReplyVO vo);			// 수정
	public int musicReplyDelete(Integer replyNo);		// 삭제
}
