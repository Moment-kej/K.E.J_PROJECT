package com.kej.app.board.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kej.app.board.service.BoardService;
import com.kej.app.board.service.MusicBoardService;
import com.kej.app.board.service.vo.BoardListVO;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.PageVO;
import com.kej.app.common.service.CommonService;

@Controller
@RequestMapping(value = "/board")
public class BoardController {
	@Autowired BoardService service;
	@Autowired CommonService cservice;
	@Autowired MusicBoardService musicService;
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	//https://jadestone.tistory.com/101 == 페이징/진행중
	@GetMapping("/dress")
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
	@RequestMapping(value="/dress/all", method = RequestMethod.GET)
	@ResponseBody
	public List<BoardVO> getPosts(Criteria cri){
		return service.dressBoradList(cri);
	}
	// dress insert page
	@GetMapping("/dress/write")
	public String boardDressInsert(Model model) {
		model.addAttribute("code", cservice.getCodes("CO", "CA"));
        
		return "dressBoard/boardDressInsert";
	}
	// dress insert (AJAX)
	@RequestMapping(value = "/dress/insert", method = RequestMethod.POST)
	@ResponseBody
	public int boardInsertSave(@RequestBody BoardVO vo) {
		return service.boardInsert(vo); 
	}
	// dress detail page
	@RequestMapping(value = "/dress/all/{boardNo}", method = RequestMethod.GET)
	public String boardDressDetail(Model model, @PathVariable("boardNo") Integer boardNo, HttpServletRequest req, HttpServletResponse res) {
		BoardVO view = service.boardDressDetail(boardNo);
		model.addAttribute("code", cservice.getCodes("CA"));
		
		// 조회수 로직
		// https://velog.io/@juwonlee920/Spring-조회수-기능-구현-조회수-중복-방지
		Cookie oldCookie = null;				// oldCookie 객체를 선언한 후 빈값으로 초기화
		Cookie[] cookies = req.getCookies();	// request 객체에서 쿠키들을 가져와 Cookie 타입을 요소로 가지는 리스트에 담는다.
		if(cookies != null) {					// cookies가 null이 아닌지 체크한다.
			for (Cookie cookie : cookies) {		// cookies가 null이 아니면 for문을 돌려서
				if (cookie.getName().equals("postView")) {	// cookie의 이름이 postView인지 확인
					oldCookie = cookie;						// 맞으면 oldCookie에 이 cookie를 대입
				}
			}
		}
		
		if (oldCookie != null) {				// oldCookie가 null이 아닐때
			if(!oldCookie.getValue().contains("[" + boardNo.toString() + "]")) {	// oldCookie의 value중 게시물의 id 값이 없을 때 (있다면 이미 조회한 게시물로 조회수가 올라가지 않음)
				int count = service.dressBoardViewCount(boardNo);					// 조회수 올리는 메소드 호출
				oldCookie.setValue(oldCookie.getValue() + "_[" + boardNo + "]");
				oldCookie.setPath("/");
				oldCookie.setMaxAge(60*60*24);	// 쿠키 시간
				res.addCookie(oldCookie);
				view.setViewCount(count);
			}
		} else {								// oldCookie가 null일 때
			service.dressBoardViewCount(boardNo);									// 조회수 올리는 메소드 호출
			Cookie newCookie = new Cookie("postView", "[" + boardNo + "]");			// postView라는 이름으로 쿠키를 만들고 거기에 게시물 id 값을 괄호로 감싸 추가
			newCookie.setPath("/");
			newCookie.setMaxAge(60*60*24);		// 쿠키 시간
			res.addCookie(newCookie);
		}
		model.addAttribute("dress", view);
		model.addAttribute("code", cservice.getCodes("CO","CA"));
		
		return "dressBoard/boardDressDetail";
	}
	// 게시글 단건조회 (AJAX)
	@RequestMapping(value="/dress/boardDetail", method= RequestMethod.GET)
	@ResponseBody
	public BoardVO boardDressDetail(@RequestParam("boardNo") int boardNo) {
		return service.boardDressDetail(boardNo);
	}
	// 게시글 관련글 보기 (AJAX)
	@RequestMapping(value = "/dress/boardRelatedPosts", method = RequestMethod.GET)
	@ResponseBody
	public List<BoardVO> boardRelatedPosts(BoardListVO vo) {
		return service.getCombinedBoardList(vo);
	}
	// dress update page
	@GetMapping("/dress/modify/{boardNo}")
	public String boardDressUpdate(Model model, @PathVariable("boardNo") int boardNo) {
		// 게시글 단건조회
		model.addAttribute("code", cservice.getCodes("CO","CA"));
		
		return "dressBoard/boardDressUpdate";
	}
	// 게시글 번호 기준 게시글 정보 가져오기 (AJAX)
	@RequestMapping(value = "/dress/modContent", method = RequestMethod.GET)
	@ResponseBody
	public BoardVO boardDressUpdate(int boardNo) {
		return service.boardDressDetail(boardNo);
	}
	// 게시글 수정 (AJAX)
	@RequestMapping(value = "/dress/mod", method = RequestMethod.POST)
	@ResponseBody
	public int boardDressModAjax(@RequestBody BoardVO vo) {
		return service.dressBoardUpdate(vo);
	}
	// 게시글 삭제 (AJAX)
	@RequestMapping(value = "/dress/del", method = RequestMethod.POST)
	@ResponseBody
	public int boardDressDelAjax(@RequestBody BoardVO vo) {
		return service.dressBoardDelete(vo);
	}
	// 메인페이지 최신글 (AJAX)
	@RequestMapping(value="/newList", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> boardNewList(Criteria cri) {
		return service.boardNewList(cri);
	}
	// 메인페이지 인기글 (AJAX)
	@ RequestMapping(value="/topList", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> boardTopList(Criteria cri) {
		return service.boardTopList(cri);
	}
	
	// --- eunae End --------------------------------------------------------
	
	//아트게시판 전체 조회
	@GetMapping("/art")
	public String boardArtPage(Model model, Criteria cri) throws Exception {
		
		//cri vo에 code 값을 10으로 준 것
		cri.setCode(30);
		
		//공통코드
		model.addAttribute("code", cservice.getCodes("CO", "CA"));
		
		//목록 Ajax로 대신 사용
		List<BoardVO> list = service.artBoardList(cri);
		model.addAttribute("list", list);

		
		//페이지네이션
		int total = service.pagecount(cri);
		PageVO pageVO = new PageVO(cri, total);
		model.addAttribute("pageVO", pageVO);
		
		return "artBoard/boardArtPage";
	}
	
	// Ajax Get Method ListType
	@RequestMapping(value="/artList", method = {RequestMethod.GET})
	@ResponseBody
	public List<BoardVO> artGetList(Criteria cri){
		return service.artBoardList(cri);
	}
	
	//아트게시판 상세 조회
	@GetMapping("/art/boardNo")
	public String BoardArtDetail(Model model, BoardVO boardVO) {
		Map<String, Object> boardDetail = service.boardArtDetail(boardVO.getBoardNo()); // vo를 답글과 게시판 두개를 써야함으로 map형태로 바꿔주기
		System.out.println("boardDetail" + boardDetail);
		
		model.addAttribute("boardDetail", boardDetail);
		return "artBoard/boardArtDetail";
	}
	
	//아트게시판 등록_조회
	@GetMapping("/art/write")
	public String BoardArtInsert(Model model, BoardVO board) {
		model.addAttribute("board", board);
		
		return "artBoard/boardArtInsert";
	}

	//아트게시판 수정_조회
	@GetMapping("/art/boardNo/modify")
	public String BoardArtUpdate(Model model) {
		
		return "artBoard/boardArtUpdate";
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
	
	
	
	
	
	
	
	
	
    
    
    //Music 전체조회 Page
    @GetMapping("/music")
    public String musicAllListPage(Model model, Criteria cri) {
    	
    	model.addAttribute("code", cservice.getCodes("CA"));
    	
		// model.addAttribute("pageVO", pageVO);
    	return "musicBoard/musicBoardAllListPage";
    }
    
    // Ajax Get Method 
 	@RequestMapping(value="/music-data", method = {RequestMethod.GET})
 	@ResponseBody
 	public Map<String, Object> musicAllList (Criteria cri) {
 		
 		//페이지네이션
		int total = service.pagecount(cri);
		PageVO pageVO = new PageVO(cri, total);
		
		Map<String, Object> response = new HashMap<>();
		response.put("data", musicService.musicBoardAllList(cri));
		response.put("paging", pageVO);
 		System.out.println(response);
 		return response;
 	}
        
    // Music Detail Page
	@GetMapping("/music/{boardNo}")
	public String BoardDetail(Model model, @PathVariable ("boardNo") int boardNo) {
		
		return "musicBoard/musicBoardDetail";
	}
	
	@GetMapping("/musice/write")
	public String musicInsertPage(Model model) {
    	
    	//model.addAttribute("code", cservice.getCodes("CA"));
		
    	return "musicBoard/musicBoardInsert";
    }
	
	// Music insert page
	@PostMapping("/music")
	@ResponseBody
	public String boardMusicInsert() {
		
		return "musicBoard/musicBoardInsert";
	}
	
	// Music update page
	@PutMapping("/music/{boardNo}")
	@ResponseBody
	public String boardMusicUpdate(@PathVariable ("boardNo") int boardNo) {
		
		return "musicBoard/musicBoardUpdate";
	}
    
	// Music delete page
	@DeleteMapping("/music/{boardNo}")
	@ResponseBody
	public String boardMusicDelete(@PathVariable ("boardNo") int boardNo) {
		
		return "musicBoard/musicBoardUpdate";
	}
    
    
    
    
    
    
	
	
	
	
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//	@GetMapping("/test")
//	public String test() {
//		return "comm/test";
//	}
//	
//	@GetMapping("/test2")
//	@ResponseBody
//	public Map<String, Object> test2() {
//		Map<String, Object> testMap = new HashMap<String, Object>();
//		testMap.put("test", "test");
//		testMap.put("test1", "test1");
//		testMap.put("test2", "test2");
//		return testMap;
//	}
    
}
