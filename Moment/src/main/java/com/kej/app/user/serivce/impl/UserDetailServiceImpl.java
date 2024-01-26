package com.kej.app.user.serivce.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kej.app.user.serivce.vo.MemberVO;

@Service
public class UserDetailServiceImpl implements UserDetailsService{
	@Autowired UserServiceImpl userAuthDAO;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberVO user = userAuthDAO.getUserById(username);
		
		if(user == null) {
			throw new UsernameNotFoundException(username);
		}
		return user;
	}
	
}
