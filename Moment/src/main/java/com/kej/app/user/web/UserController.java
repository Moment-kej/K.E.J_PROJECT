package com.kej.app.user.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/user")
public class UserController {

	@RequestMapping(value="/my", method = RequestMethod.GET)
	public String identification() {
		return "user/identification";
	}
	@RequestMapping(value="/my/id", method = RequestMethod.GET)
	public String myInfo() {
		return "user/myInfo";
	}
}
