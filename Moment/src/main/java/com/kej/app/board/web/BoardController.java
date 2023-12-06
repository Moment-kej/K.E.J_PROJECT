package com.kej.app.board.web;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
	//https://jadestone.tistory.com/101 == 페이징/진행중
	@GetMapping("/10")
	public String boardDressPage(Model model, Criteria cri) throws Exception {
		
		//cri vo에 code 값을 10으로 준 것
		cri.setCode(10);
		
		//공통코드
		model.addAttribute("code", cservice.getCodes("CO", "CA"));
		
		//목록
		List<BoardVO> list = service.dressBoradList(cri);
		model.addAttribute("list", list);

		
		//페이지네이션
		int total = service.pagecount(cri);
		PageVO pageVO = new PageVO(cri, total);
		model.addAttribute("pageVO", pageVO);
		return "dressBoard/boardDressPage";
	}
	
	// Ajax Get Method 
	@RequestMapping(value="/temp", method = {RequestMethod.GET})
	@ResponseBody
	public List<BoardVO> getPosts(Criteria cri){
		return service.dressBoradList(cri);
	}
	
	// dress detail page
	@GetMapping("/10_1")
	public String boardDressDetail() {
		
		
		return "dressBoard/boardDressDetail";
	}
	
	// dress insert page
	@GetMapping("/10/1")
	public String boardDressInsert() {
		
		
		return "dressBoard/boardDressInsert";
	}
	
	// dress update page
	@GetMapping("/10/3")
	public String boardDressUpdate() {
		
		
		return "dressBoard/boardDressUpdate";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//아트게시판 전체 조회
	@GetMapping("/30")
	public String boardArtPage(Model model, Criteria cri) throws Exception {
		
		//cri vo에 code 값을 10으로 준 것
		cri.setCode(10);
		
		//공통코드
		model.addAttribute("code", cservice.getCodes("CO", "CA"));
		
		//목록
		List<BoardVO> list = service.dressBoradList(cri);
		model.addAttribute("list", list);

		
		//페이지네이션
		int total = service.pagecount(cri);
		PageVO pageVO = new PageVO(cri, total);
		model.addAttribute("pageVO", pageVO);
		return "artBoard/boardArtsPage";
	}
	
	//아트게시판 상세 조회
	@GetMapping("/30_1")
	public String BoardArtDetail(Model model) {
		
		return "artBoard/boardArtDetail";
	}
	
	//아트게시판 등록_조회
	@GetMapping("/30/1")
	public String BoardArtInsert(Model model) {
		
		return "artBoard/boardArtInsert";
	}

	//아트게시판 수정_조회
	@GetMapping("/30/3")
	public String BoardArtUpdate(Model model) {
		
		return "artBoard/boardArtUpdate";
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // 게시판 디테일 Page
	@GetMapping("/20_1")
	public String BoardDetail(Model model) {
		
		return "musicBoard/boardDetail";

	}
	

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
