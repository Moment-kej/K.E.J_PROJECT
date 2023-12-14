package com.kej.app.reply.service.vo;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class ReplyVO {
	private int       replyNo;
	private int       boardNo;
	private String    id;
	private String    content;
	private Timestamp writeDt;
	private Timestamp updateDt;
	private String    reReplyContent;
	private Timestamp reReplyWriteDt;
	private Timestamp reReplyUpdateDt;
	private int       yn;
	private int       reReplyYn ;
}
