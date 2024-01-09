package com.kej.app.reply.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kej.app.reply.service.ReplyService;
import com.kej.app.reply.service.vo.ReplyVO;

@Controller
@RequestMapping(value = "/reply")
public class ReplyController {
	@Autowired ReplyService service;
	
	// dress detail -> reply list (AJAX)
	@RequestMapping(value = "/dress/replyList", method = RequestMethod.GET)
	@ResponseBody
	public List<ReplyVO> replyList(ReplyVO vo) {
		return service.replyList(vo);
	}
	
	// dress detail -> reply insert (AJAX)
	@RequestMapping(value = "/dress/in", method = RequestMethod.POST)
	@ResponseBody
	public int dressReplyInsert(@RequestBody ReplyVO vo) {
		return service.replyInsert(vo);
	}
	
	// dress detail -> reply update (AJAX)
	@RequestMapping(value = "/dress/mod", method = RequestMethod.POST)
	@ResponseBody
	public int dressReplyUpdate(@RequestBody ReplyVO vo) {
		
		return service.replyModify(vo);
	}
	
	// dress detail -> reply delete (AJAX) : update로 진행
	@RequestMapping(value = "/dress/del/{replyNo}", method = RequestMethod.POST)
	@ResponseBody
	public int dressReplyDelete(@PathVariable("replyNo") Integer replyNo) {
		return service.replyDelete(replyNo);
	}
	
	// --- eunae End --------------------------------------------------------
	
	
	// --- Minjin Start --------------------------------------------------------
	// 댓글 조회
	@RequestMapping(value = "/music/reply-data", method = RequestMethod.GET)
	@ResponseBody
	public List<ReplyVO> musicReplyAllList(ReplyVO vo) {
		
		return service.musicReplyAllList(vo);
	}
	
	// 댓글 등록
	@PostMapping("/music")
	@ResponseBody
	public int musicReplyInsert(@RequestBody ReplyVO vo) {
		
		return service.musicReplyInsert(vo);
	}

	// 댓글 수정
	@PutMapping("/music")
	@ResponseBody
	public int musicReplyUpdate(@RequestBody ReplyVO vo) {
		
		System.out.println("값 내놔" + vo);
		return service.musicReplyUpdate(vo);
	}

	// 댓글 삭제
	@DeleteMapping("/music/{replyNo}")
	@ResponseBody
	public int musicReplyDelete(@PathVariable(required = false) Integer replyNo) {
		
		return service.musicReplyDelete(replyNo);
	}
	
	// --- Minjin End --------------------------------------------------------
}
