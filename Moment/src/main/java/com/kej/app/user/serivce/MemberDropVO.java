package com.kej.app.user.serivce;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class MemberDropVO {
	private int dropNo;
	private int reason;
	private String reasonDetail;
	private Timestamp dropDt;
	private String id; 
}
