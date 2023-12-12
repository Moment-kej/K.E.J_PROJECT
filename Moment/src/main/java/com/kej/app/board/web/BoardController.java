package com.kej.app.board.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.kej.app.board.service.MusicBoardService;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.PageVO;
import com.kej.app.board.service.vo.ReplyVO;
import com.kej.app.common.service.CommonService;

@Controller
@RequestMapping(value = "/board")
public class BoardController {
	@Autowired BoardService service;
	@Autowired CommonService cservice;
	@Autowired MusicBoardService musicService;
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
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
	@RequestMapping(value="/temp", method = RequestMethod.GET)
	@ResponseBody
	public List<BoardVO> getPosts(Criteria cri){
		return service.dressBoradList(cri);
	}
	
	// dress insert page
	@GetMapping("/10/1")
	public String boardDressInsert(Model model) {
		model.addAttribute("code", cservice.getCodes("CO", "CA"));
        
		return "dressBoard/boardDressInsert";
	}
	
	// dress insert ajax
	@RequestMapping(value = "/10/1", method = RequestMethod.POST)
	@ResponseBody
	public int boardInsertSave(@RequestBody BoardVO vo) {
//		logger.info("boardController insert >> " + vo);
		
		return service.boardInsert(vo); 
	}
	
	// dress detail page
	@GetMapping("/all/{boardNo}")
	public String boardDressDetail(Model model, @PathVariable("boardNo") int boardNo) {
		model.addAttribute("dress", service.boardDressDetail(boardNo));
		
		return "dressBoard/boardDressDetail";
	}
	
	@RequestMapping(value = "/replyList", method = RequestMethod.GET)
	@ResponseBody
	public List<ReplyVO> replyList(@RequestParam int boardNo) {
		return service.replyList(boardNo);
	}
	
	// dress update page
	@GetMapping("/10/3")
	public String boardDressUpdate() {
		
		
		return "dressBoard/boardDressUpdate";
	}
	
	@GetMapping("/test")
	public String test() {
		return "comm/test";
	}
	
	@GetMapping("/test2")
	@ResponseBody
	public Map<String, Object> test2() {
		Map<String, Object> testMap = new HashMap<String, Object>();
		testMap.put("test", "test");
		testMap.put("test1", "test1");
		testMap.put("test2", "test2");
		return testMap;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//아트게시판 전체 조회
	@GetMapping("/30")
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
	
	// Ajax Get Method
	@RequestMapping(value="/artTemp", method = {RequestMethod.GET})
	@ResponseBody
	public List<BoardVO> artGetPosts(Criteria cri){
		return service.artBoardList(cri);
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
	
	
	
	
	
	
	
	
	
    
    
    //Music 전체조회 Page
    @GetMapping("/20")
    public String musicAllListPage(Model model) {
    	
    	model.addAttribute("code", cservice.getCodes("CA"));
    	return "musicBoard/boardMusicAllListPage";
    }
    
    // Ajax Get Method 
 	@RequestMapping(value="/music", method = {RequestMethod.GET})
 	@ResponseBody
 	public List<BoardVO> musicAllList (Criteria cri) {
 		
 		return musicService.musicBoardAllList(cri);
 	}
        
    // Music Detail Page
	@GetMapping("/20_1")
	public String BoardDetail(Model model) {
		
		return "musicBoard/boardDetail";
	}
	
	// Music insert page
	@GetMapping("/20/1")
	public String boardMusicInsert() {
		
		return "musicBoard/boardInsert";
	}
	
	// Music update page
	@GetMapping("/20/3")
	public String boardMusicUpdate() {
		return "musicBoard/boardUpdate";
	}
    
    
    
    
    
    
    
	
	
	
	
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
