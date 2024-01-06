package com.kej.app.user.mapper;

import com.kej.app.user.serivce.vo.MemberDropVO;

public interface UserMapper {
	public int userDropOutReasonInsert(MemberDropVO vo);	// 유저 탈퇴사유 등록
}
