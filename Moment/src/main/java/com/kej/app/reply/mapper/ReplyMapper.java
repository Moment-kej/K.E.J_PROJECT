package com.kej.app.reply.mapper;

import java.util.List;

import com.kej.app.reply.service.vo.ReplyVO;

public interface ReplyMapper {
	public List<ReplyVO> replyList(int boardNo);	// 댓글리스트(대댓글X)
}
