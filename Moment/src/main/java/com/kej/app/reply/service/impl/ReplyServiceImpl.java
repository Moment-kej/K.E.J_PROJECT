package com.kej.app.reply.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kej.app.reply.mapper.ReplyMapper;
import com.kej.app.reply.service.ReplyService;
import com.kej.app.reply.service.vo.ReplyVO;

@Service
public class ReplyServiceImpl implements ReplyService {
	@Autowired ReplyMapper rMapper;

	@Override
	public List<ReplyVO> replyList(int boardNo) {
		return rMapper.replyList(boardNo);
	}

}
