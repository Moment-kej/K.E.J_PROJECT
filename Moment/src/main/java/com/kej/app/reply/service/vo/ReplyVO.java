package com.kej.app.reply.service.vo;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class ReplyVO {
	private int       replyNo; 			// 댓글번호
	private int       boardNo;			// 게시글번호
	private String    id;				// 회원 아이디
	private String    content;			// 댓글내용
	private Timestamp writeDt;			// 작성일
	private Timestamp updateDt;			// 수정일
	private int       yn;				// 삭제여부
	private String	  reReplyContent;		// 대댓글 내용
	private Timestamp reReplyWriteDt;	// 대댓글 작성일
	private Timestamp reReplyUpdateDt;	// 대댓글 수정일
	private int 	  reReplyYn;		// 대댓글 삭제여부
	
	private int 	  groupNo;
	private int 	  groupLayer;
	
	private int childCount;				// 해당 댓글의 대댓글 총갯수
	
	private List<ReplyVO> childReplyList;
}
