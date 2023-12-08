package com.kej.app.board.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kej.app.board.mapper.MusicBoardMapper;
import com.kej.app.board.service.MusicBoardService;
import com.kej.app.board.service.vo.BoardVO;

@Service
public class MusicBoardServiceImpl implements MusicBoardService {
	
	@Autowired MusicBoardMapper mapper;
	
	// Music 게시판 목록 조회	
	@Override
	public List<BoardVO> musicBoardAllList() {
		
		return mapper.musicBoardAllList();
	}

}
