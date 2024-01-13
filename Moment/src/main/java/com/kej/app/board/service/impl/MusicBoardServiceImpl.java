package com.kej.app.board.service.impl;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kej.app.board.mapper.MusicBoardMapper;
import com.kej.app.board.service.MusicBoardService;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

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

	@Override
	public Map<String, Object> musicBoardFirstAndLastNumber(BoardVO vo) {
		Map<String, Object> response = new HashMap<>();
		
		response.put("first", mapper.musicBoardFirstNumber(vo));
		response.put("last", mapper.musicBoardLastNumber(vo));
		
		return response;
	}

	@Override
	public String getRelatedPost(BoardVO vo) {
		int currentBoardNo = vo.getBoardNo();
	    String relatedPostNumbers = mapper.findPrevNextBoardNumber(vo).getRelatedPostList();
	    String[] convertToArray = relatedPostNumbers.split(",");
	    String[] selectedArray = Arrays.copyOfRange(convertToArray, 0, 5);
	    System.out.println(Arrays.toString(selectedArray));
		return "eee";
	}

}
