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
	public List<ReplyVO> replyList(ReplyVO vo) {
		vo.setGroupLayer(0);	// 계층 0 = 부모 댓글
		
		// 부모 댓글 리스트
		List<ReplyVO> parentsReplyList = rMapper.replyList(vo);
		
		// 부모 댓글 길이만큼 반복
		for (ReplyVO parent : parentsReplyList) {
			parent.setGroupLayer(1);				// 계층 1 = 자식 댓글
			parent.setGroupNo(parent.getReplyNo()); // 그룹   = 부모 댓글에 대한 자식 댓글
			
	        List<ReplyVO> childReplyList = rMapper.childReplyList(parent);

	        // 부모 댓글에 대한 자식 댓글들 설정
	        parent.setChildReplyList(childReplyList);
	        // 부모 댓글에 대한 자식 댓글 총 갯수 설정
	        parent.setChildCount(childReplyList.size());
	    }
		
		return parentsReplyList;
	}

	@Override
	public int replyInsert(ReplyVO vo) {
		return rMapper.replyInsert(vo);
	}

	@Override
	public int replyModify(ReplyVO vo) {
		return rMapper.replyUpdate(vo);
	}

	@Override
	public int replyDelete(int replyNo) {
		return rMapper.replyDelete(replyNo);
	}

}
