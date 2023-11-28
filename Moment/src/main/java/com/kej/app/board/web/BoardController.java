package com.kej.app.board.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kej.app.board.service.BoardService;
import com.kej.app.common.service.CommonService;

@Controller
@RequestMapping(value = "/board")
public class BoardController {
	@Autowired BoardService service;
	@Autowired CommonService cservice;
	
	//https://badstorage.tistory.com/13 , required = false
	@GetMapping("/1")
	public String TestBoardViewPage(Model model,
									@RequestParam(defaultValue = "1", required = false) String pagenum,
									@RequestParam(defaultValue = "10", required = false) String contentnum ) throws Exception {
		
		//service.execute(model, pagenum, contentnum);
		model.addAttribute("code", cservice.getCodes("CO", "CA")); 
		
		return "board/boardDressPage";
	}
	

}
