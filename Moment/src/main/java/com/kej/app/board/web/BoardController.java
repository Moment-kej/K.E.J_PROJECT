package com.kej.app.board.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kej.app.board.service.BoardService;
import com.kej.app.common.service.CommonService;

@Controller
@RequestMapping(value = "/board")
public class BoardController {
	@Autowired BoardService service;
	@Autowired CommonService cservice;
	
	@GetMapping("/1")
	public String TestBoardViewPage(Model model) {
		model.addAttribute("list", service.dressBoradAllList());
		model.addAttribute("code", cservice.getCodes("CO", "CA"));
		return "board/TestBoardViewPage";
	}

}
