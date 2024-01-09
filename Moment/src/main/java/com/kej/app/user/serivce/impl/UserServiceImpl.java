package com.kej.app.user.serivce.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kej.app.user.mapper.UserMapper;
import com.kej.app.user.serivce.UserService;
import com.kej.app.user.serivce.vo.MemberDropVO;

@Service
public class UserServiceImpl implements UserService{
	@Autowired UserMapper uMapper;

	@Override
	public int userDropOutReasonInsert(MemberDropVO vo) {
		return uMapper.userDropOutReasonInsert(vo);
	}

}
