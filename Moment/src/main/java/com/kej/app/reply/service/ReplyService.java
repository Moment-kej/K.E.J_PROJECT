package com.kej.app.reply.service;

import java.util.List;

import com.kej.app.reply.service.vo.ReplyVO;

public interface ReplyService {
	public List<ReplyVO> replyList(ReplyVO vo);
	public int replyInsert(ReplyVO vo);
	public int replyModify(ReplyVO vo);
	public int replyDelete(int replyNo);
}
