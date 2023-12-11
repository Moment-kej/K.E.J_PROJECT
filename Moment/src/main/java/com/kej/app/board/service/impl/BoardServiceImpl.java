package com.kej.app.board.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kej.app.board.mapper.BoardMapper;
import com.kej.app.board.service.BoardService;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;

@Service
public class BoardServiceImpl implements BoardService {
	private static final Logger logger = LoggerFactory.getLogger(BoardServiceImpl.class);
	@Autowired BoardMapper bMapper;

	// eunae ---------------------------------------------
	@Override
	public List<BoardVO> dressBoradList(Criteria cri) {
		return bMapper.dressBoradList(cri);
	}

	@Override
	public int pagecount(Criteria cri) {
		return bMapper.pagecount(cri);
	}

	@Override								// board insert
	@Transactional
	public int boardInsert(BoardVO vo) {
//		logger.info("serviceImpl insert >> " + vo);
		return bMapper.boardInsert(vo);
	}
	// eunae ---------------------------------------------

	
	// soomin ----------------------------------------------------	
	@Override
	public List<BoardVO> artBoardList(Criteria cri) {
		return bMapper.artBoardList(cri);
	}

	@Override
	public int artPagecount(Criteria cri) {
		return bMapper.artPagecount(cri);
	}
















}
