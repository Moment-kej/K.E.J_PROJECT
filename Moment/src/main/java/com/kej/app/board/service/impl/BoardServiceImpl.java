package com.kej.app.board.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kej.app.board.mapper.BoardMapper;
import com.kej.app.board.service.BoardService;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;

@Service
public class BoardServiceImpl implements BoardService {
	@Autowired BoardMapper bMapper;

	@Override
	public List<BoardVO> dressBoradList(Criteria cri) {
		return bMapper.dressBoradList(cri);
	}

	@Override
	public int pagecount(Criteria cri) {
		return bMapper.pagecount(cri);
	}


}
