package com.kej.app.reply.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
}
