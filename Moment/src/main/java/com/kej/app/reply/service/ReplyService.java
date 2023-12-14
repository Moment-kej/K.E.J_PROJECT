package com.kej.app.reply.service;

import java.util.List;

import com.kej.app.reply.service.vo.ReplyVO;

public interface ReplyService {
	public List<ReplyVO> replyList(int boardNo);
}
