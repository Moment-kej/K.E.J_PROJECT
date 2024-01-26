package com.kej.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

import com.kej.app.common.service.CommonService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	@Autowired CommonService service;
	
	public static void main(String[] args) {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String rawPassword = "1234";
        String encodedPassword = passwordEncoder.encode(rawPassword);

        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Encoded Password: " + encodedPassword);
	}
//	private static String CLIENT_ID = "uzFgU5Xq_6esU6400qi2";
//	private static String CLIENT_SECRET = "2zYFlRC1sO";
//	
////	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
//	
//	/**
//	 * Simply selects the home view to render by returning its name.
//	 */
//	@RequestMapping(value = "/", method = RequestMethod.GET)
//	public String home(Locale locale, Model model) {
////		logger.info("Welcome home! The client locale is {}.", locale);
////		
////		Date date = new Date();
////		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
////		
////		String formattedDate = dateFormat.format(date);
////		
////		model.addAttribute("serverTime", formattedDate );
//		model.addAttribute("code", service.getCodes("CO","EM"));
//		
//		// 네이버 뉴스 API 호출
//        String apiUrl = "https://openapi.naver.com/v1/search/news.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=date";
//        RestTemplate restTemplate = new RestTemplate();
//
//        // 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Naver-Client-Id", CLIENT_ID);
//        headers.set("X-Naver-Client-Secret", CLIENT_SECRET);
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//
//        // API 호출 및 결과 처리
//        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);
//        String responseBody = response.getBody();
//
//        // 결과를 모델에 추가
//        model.addAttribute("newsApiResponse", responseBody);
//        
//        System.out.println(responseBody);
//        
//        //<c:out value="${newsApiResponse}" escapeXml="false" />
//        // 뉴스를 표시할 JSP 페이지의 이름을 반환
//		return "comm/main";
//	}
	
}
