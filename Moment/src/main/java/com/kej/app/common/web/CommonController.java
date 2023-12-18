package com.kej.app.common.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kej.app.common.service.CommonService;
import com.kej.app.common.service.vo.BookVO;
import com.kej.app.common.service.vo.NewsVO;

@Controller
public class CommonController {
	@Autowired CommonService service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "comm/main";
	}

	// 메인페이지 테스트
	@RequestMapping(value="/mainTest", method = RequestMethod.GET)
	public String boardAllListTemp(Model model, @RequestParam(defaultValue = "1") int page,
									@RequestParam(defaultValue = "all") String query) {
		// 공통코드
		model.addAttribute("code", service.getCodes("CO", "CA"));

        List<NewsVO> list = service.news(page, query);
        int total = service.getTotalPages(query);
        
        // 네이버 뉴스
        model.addAttribute("newsApiResponse", list);
        model.addAttribute("currenPage", page);
        model.addAttribute("totalPages", total);
        model.addAttribute("querySearch", query);
		return "comm/mainTest";
	};
	
	@GetMapping("/naverNews")
	@ResponseBody
	public List<NewsVO> getAllNews(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "all") String query) {
		return service.news(page, query);
	}
	
	@RequestMapping(value="/naverBook", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<BookVO> bookListRender(@RequestParam(defaultValue = "1") int page,
									@RequestParam(defaultValue = "all") String query) {
		
		
		return service.books(page, query);
	};

}
