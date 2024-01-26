package com.kej.app.user.serivce.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kej.app.user.mapper.UserMapper;
import com.kej.app.user.serivce.UserService;
import com.kej.app.user.serivce.vo.MemberDropVO;
import com.kej.app.user.serivce.vo.MemberVO;

@Service
public class UserServiceImpl implements UserService {
	@Autowired UserMapper uMapper;
	@Autowired private SqlSessionTemplate sqlSesstion;
	
	@Override
	public int userDropOutReasonInsert(MemberDropVO vo) {
		return uMapper.userDropOutReasonInsert(vo);
	}

	@Override
	public MemberVO getUserById(String username) {
		return uMapper.selectUserById(username);
	}

}
