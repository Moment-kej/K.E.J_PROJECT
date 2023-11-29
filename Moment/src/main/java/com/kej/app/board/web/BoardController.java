package com.kej.app.board.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kej.app.board.service.BoardService;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.PageVO;
import com.kej.app.common.service.CommonService;

@Controller
@RequestMapping(value = "/board")
public class BoardController {
	@Autowired BoardService service;
	@Autowired CommonService cservice;
	
	//https://badstorage.tistory.com/13 == 페이징/실패
	//https://jadestone.tistory.com/101 == 페이징/진행중
	@GetMapping("/1")
	public String TestBoardViewPage(Model model
									,Criteria cri
									, String category) throws Exception {
		
		model.addAttribute("code", cservice.getCodes("CO", "CA"));
		
		//목록
		List<BoardVO> list = service.dressBoradList(cri);
		model.addAttribute("list", list);
		
		//페이지 네이션
		int total = service.pagecount();
		PageVO pageVO = new PageVO(cri, total);
		model.addAttribute("pageVO", pageVO);
		
		return "board/boardDressPage";
	}
	

	
	
	
	
	
	
	
	
	
  
  
  
  
  
  
  
  
  
  
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	//게시판 등록
	@GetMapping("/3/1")
	public String BoardInsert(Model model) {
		
		return "board/boardInsert";
	}

	//게시판 수정
	@GetMapping("/1/3")
	public String BoardUpdate(Model model) {
		
		return "board/boardUpdate";
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // 게시판 디테일 Page
	@GetMapping("/2_1")
	public String BoardDetail(Model model) {
		
		return "board/boardDetail";

	}
	

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
