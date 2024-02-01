package com.kej.app.user.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kej.app.user.serivce.UserService;
import com.kej.app.user.serivce.impl.UserDetailServiceImpl;
import com.kej.app.user.serivce.vo.MemberDropVO;
import com.kej.app.user.serivce.vo.MemberVO;

@Controller
@RequestMapping(value = "/user")
public class UserController {
	@Autowired UserService service;
	@Autowired UserDetailServiceImpl udservice;
	
	@RequestMapping(value="/my", method = RequestMethod.GET)
	public String identification() {
		return "user/identification";
	}
	@RequestMapping(value="/my/{id}", method = RequestMethod.GET)
	public String myInfo(@PathVariable("id") String id) {
		return "user/myInfo";
	}
	@RequestMapping(value="/dropOut", method = RequestMethod.POST)
	@ResponseBody
	public int dropOut(@RequestBody MemberDropVO vo) {
		return service.userDropOutReasonInsert(vo);
	}
	
	@GetMapping("/info")
	@ResponseBody
	public UserDetails userInfo(String id) {
		return udservice.loadUserByUsername(id);
	}
	
	@GetMapping("/pwTest")
	@ResponseBody
	public boolean userPwTest(String pw, String id) {
		MemberVO nvo = service.getUserById(id);
		
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		// 암호화된 비밀번호를 비교할 때는 입력한 비밀번호도 먼저 암호화해야 함.
		return passwordEncoder.matches(pw, nvo.getPassword());
	}
}
