package com.kej.app.board.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kej.app.board.mapper.MusicBoardMapper;
import com.kej.app.board.service.MusicBoardService;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.PageVO;

@Service
public class MusicBoardServiceImpl implements MusicBoardService {
	
	@Autowired MusicBoardMapper mapper;
	
	// Music 게시판 목록 조회	
	@Override
	public List<BoardVO> musicBoardAllList(Criteria cri) {
		
		return mapper.musicBoardAllList(cri);
	}

	@Override
	public int pageCount(Criteria cri) {

		return mapper.pageCount(cri);
	}

	// Music 단건 조회
	@Override
	public BoardVO musicBoardDetail(int BoardNo) {

		return mapper.musicBoardDetail(BoardNo);
	}

}
