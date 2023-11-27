package com.kej.app.common.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.kej.app.common.service.CommonService;

@Controller
public class CommonController {
	@Autowired CommonService service;
	
	
}
