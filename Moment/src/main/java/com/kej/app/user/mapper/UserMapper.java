package com.kej.app.user.mapper;

import com.kej.app.user.serivce.vo.MemberDropVO;
import com.kej.app.user.serivce.vo.MemberVO;

public interface UserMapper {
	public int userDropOutReasonInsert(MemberDropVO vo);	// 유저 탈퇴사유 등록
	public MemberVO selectUserById(String username);		// 유저 정보 확인하기
}
