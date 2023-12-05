package com.kej.app.common.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.kej.app.common.service.CommonService;
import com.kej.app.common.service.vo.NewsVO;

@Controller
public class CommonController {
	@Autowired CommonService service;
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model, @RequestParam(defaultValue = "1") int page,
						@RequestParam(defaultValue = "음악,옷,미술") String query) {
		// 공통코드
		model.addAttribute("code", service.getCodes("CO"));

        List<NewsVO> list = service.news(page, query);
        int total = service.getTotalPages(query);
        
        // 네이버 뉴스
        model.addAttribute("newsApiResponse", list);
        model.addAttribute("currenPage", page);
        model.addAttribute("totalPages", total);
        model.addAttribute("querySearch", query);
        
		return "comm/main";
	}
}
