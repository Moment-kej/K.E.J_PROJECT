package com.kej.app.user.serivce;

import com.kej.app.user.serivce.vo.MemberDropVO;
import com.kej.app.user.serivce.vo.MemberVO;

public interface UserService {
	public int userDropOutReasonInsert(MemberDropVO vo);
	public MemberVO getUserById(String username);
}
