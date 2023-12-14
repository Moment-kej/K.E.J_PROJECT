package com.kej.app.reply.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	
	// dress detail reply list (AJAX)
	@RequestMapping(value = "/dress/replyList", method = RequestMethod.GET)
	@ResponseBody
	public List<ReplyVO> replyList(@RequestParam int boardNo) {
		return service.replyList(boardNo);
	}
}
