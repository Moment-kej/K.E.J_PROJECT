package com.kej.app.user.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kej.app.user.serivce.UserService;
import com.kej.app.user.serivce.vo.MemberDropVO;

@Controller
@RequestMapping(value = "/user")
public class UserController {
	@Autowired UserService service;
	
	@RequestMapping(value="/my", method = RequestMethod.GET)
	public String identification() {
		return "user/identification";
	}
	@RequestMapping(value="/my/id", method = RequestMethod.GET)
	public String myInfo() {
		return "user/myInfo";
	}
	@RequestMapping(value="/dropOut", method = RequestMethod.POST)
	@ResponseBody
	public int dropOut(@RequestBody MemberDropVO vo) {
		return service.userDropOutReasonInsert(vo);
	}
}
