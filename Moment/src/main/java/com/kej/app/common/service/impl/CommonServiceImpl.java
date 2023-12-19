package com.kej.app.common.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.kej.app.common.mapper.CommonMapper;
import com.kej.app.common.service.CommonService;
import com.kej.app.common.service.vo.BookVO;
import com.kej.app.common.service.vo.CodeVO;
import com.kej.app.common.service.vo.NaverBookVO;
import com.kej.app.common.service.vo.NaverNewsVO;
import com.kej.app.common.service.vo.NewsVO;

@Service
public class CommonServiceImpl implements CommonService{
	@Autowired CommonMapper commonMapper;
	private static String NEWS_CLIENT_ID = "uzFgU5Xq_6esU6400qi2";
	private static String NEWS_CLIENT_SECRET = "2zYFlRC1sO";
	private static int DISPLAY_COUNT = 5;	// 한 페이지에 보여줄 뉴스 개수
	private static int DISPLAY_COUNT_BOOK = 4;	// 한 페이지에 보여줄 책 개수
	
	private static String BOOK_CLIENT_ID = "MhnHteJVoLFUSzJOxMAZ";
	private static String BOOK_CLIENT_SECRET = "e4R7Hlzgbs"; 
    
	// 여러 그룹 코드들의 상세코드 조회
	@Override
	public Map<String, List<CodeVO>> getCodes(String... commList) {
		Map<String, List<CodeVO>> map = new HashMap<String, List<CodeVO>>();
		for(String coCd : commList) {
			map.put(coCd, commonMapper.selectCode(coCd));
		};
		return map;
	}

	@Override
	public List<NewsVO> news(int page, String query) {
		int start = (page - 1) * DISPLAY_COUNT + 1;
		
		// 네이버 뉴스 API 호출
        String apiUrl = "https://openapi.naver.com/v1/search/news.json?query="
		        		+ query
		        		+ "&display="
        				+ DISPLAY_COUNT
        				+ "&start="
        				+ start
        				+ "&sort=date";
        RestTemplate restTemplate = new RestTemplate();

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", NEWS_CLIENT_ID);
        headers.set("X-Naver-Client-Secret", NEWS_CLIENT_SECRET);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // API 호출 및 결과 처리
        ResponseEntity<NaverNewsVO> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, NaverNewsVO.class);
        
        List<NewsVO> list = response.getBody().getItems();

		return list;
	}

	@Override
	public int getTotalPages(String query) {
		int totalNewsCount = 100;
		return totalNewsCount;
	}

	@Override
	public List<BookVO> books(int page, String query) {
		int start = (page - 1) * DISPLAY_COUNT_BOOK + 1;
		
		// 네이버 Book API 호출
		String apiUrl = "https://openapi.naver.com/v1/search/book.json?query="
		        		+ query
		        		+ "&display="
		        		+ DISPLAY_COUNT_BOOK
						+ "&start="
						+ start
						+ "&sort=date";
		
		RestTemplate restTemplate = new RestTemplate();

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", BOOK_CLIENT_ID);
        headers.set("X-Naver-Client-Secret", BOOK_CLIENT_SECRET);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        // API 호출 및 결과 처리
        ResponseEntity<NaverBookVO> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, NaverBookVO.class);
        List<BookVO> list = response.getBody().getItems();
        
		return list;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
