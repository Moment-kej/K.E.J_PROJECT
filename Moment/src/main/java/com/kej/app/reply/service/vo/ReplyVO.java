package com.kej.app.reply.service.vo;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class ReplyVO {
	private int       replyNo;
	private int       boardNo;
	private int 	  groupNo;
	private int 	  groupLayer;
	private String    id;
	private String    content;
	private Timestamp writeDt;
	private Timestamp updateDt;
	private int       yn;
	
	private int childCount;				// 해당 댓글의 대댓글 총갯수
	
	private List<ReplyVO> childReplyList;
}
