package com.kej.app.board.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kej.app.board.mapper.BoardMapper;
import com.kej.app.board.service.BoardService;
import com.kej.app.board.service.vo.BoardListVO;
import com.kej.app.board.service.vo.BoardVO;
import com.kej.app.board.service.vo.Criteria;
import com.kej.app.board.service.vo.PageVO;

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
		return bMapper.boardInsert(vo);
	}
	
	@Override
	public BoardVO boardDressDetail(int BoardNo) {
		return bMapper.boardDressDetail(BoardNo);
	}
	
	@Override
	@Transactional
	public int dressBoardViewCount(int boardNo) {
		return bMapper.dressBoardViewCount(boardNo);
	}
	
	@Override
	public List<BoardVO> getCombinedBoardList(BoardListVO vo) {
		List<BoardVO> combinedList = new ArrayList<>();
		
		List<BoardVO> before = bMapper.selectBoardsBefore(vo);	// 전 (+1)
		BoardVO at = bMapper.selectBoardAt(vo);
		List<BoardVO> after = bMapper.selectBoardsAfter(vo);	// 후 (-1)
		
		int beforeSize = before.size();
	    int afterSize = after.size();
	    
	    System.out.println("전(befor) >> " + beforeSize + " , 후(after) >> " + afterSize);
	    
		if(before.size() == 0 && after.size() == 4) {
			System.out.println("0 and 4");
			combinedList.add(at);
			combinedList.addAll(after);
			
		} else if((before.size() == 1 || after.size() == 3) && (before.size() == 1 || after.size() == 4)) {
			System.out.println("13 or 14");
			appendToList(combinedList, before, 1);
			combinedList.add(at);
			appendToList(combinedList, after, 3);
			
		} else if(before.size() == 2 && after.size() == 2){
			System.out.println("22");
			appendToList(combinedList, before, 2);
			combinedList.add(at);
			appendToList(combinedList, after, 2);
			
		} else if((before.size() == 3 || after.size() == 1) && (before.size() == 4 || after.size() == 1)) {
			System.out.println("31 or 41");
			appendToList(combinedList, before, 3);
			combinedList.add(at);
			appendToList(combinedList, after, 1);
			
		} else if(before.size() == 4 && after.size() == 0) {
			System.out.println("4 and 0");
			combinedList.addAll(before);
			combinedList.add(at);
			
		}  else if((before.size() == 4 || after.size() == 4) || (before.size() == 3 || after.size() == 4)
					|| (before.size() == 2 || after.size() == 4) || (before.size() == 4 || after.size() == 2)
					|| (before.size() == 3 || after.size() == 2) || (before.size() == 2 || after.size() == 3)
					|| (before.size() == 4 || after.size() == 3)) {
			System.out.println("44 or 34 or 24 or 42 or 32 or 23 or 43");
			appendToList(combinedList, before, 2);
			combinedList.add(at);
			appendToList(combinedList, after, 2);
			
		} else if(before.size() == 2 || after.size() == 0) {
			System.out.println("20");
			combinedList.add(at);
			appendToList(combinedList, before, 2);
			
		} else if(before.size() == 0 || after.size() == 2) {
			System.out.println("02");
			appendToList(combinedList, after, 2);
			combinedList.add(at);
		}
		
		// boardNo로 역순으로 정렬 후 반환/   정렬 기준을 지정              boardNo 기준              역순정렬
		Collections.sort(combinedList, Comparator.comparing(BoardVO::getBoardNo, Comparator.reverseOrder()));
		
		return combinedList;
	}
	
	private void appendToList(List<BoardVO> destination, List<BoardVO> source, int count) {
		// source 리스트의 크기보다 count가 크다면, 최대 크기로 설정
	    int actualCount = Math.min(count, source.size());
	    
	    
	    destination.addAll(source.subList(0, actualCount));
	}

	@Override
	public int dressBoardUpdate(BoardVO vo) {
		return bMapper.dressBoardUpdate(vo);
	}
	
	@Override
	public int dressBoardDelete(BoardVO vo) {
		return bMapper.dressBoardDelete(vo);
	}
	
	@Override
	public Map<String, Object> boardNewList(Criteria cri) {
		int total = bMapper.newBoardCountWithin3Days(cri);
		PageVO pvo = new PageVO(cri, total);
		
		Map<String, Object> res = new HashMap<>();
		
		res.put("data", bMapper.newBoardListWithin3Days(cri));
		res.put("pagenation", pvo);
		
		return res;
	};
	
	@Override
	public Map<String, Object> boardTopList(Criteria cri) {
		int total = bMapper.likeTopCount(cri);
		PageVO pvo = new PageVO(cri, total);
		
		Map<String, Object> res = new HashMap<>();
		
		res.put("data", bMapper.likeTopList(cri));
		res.put("paging", pvo);
		
		return res;
	}
	@Override
	public Map<String, Object> postsWithImages(Criteria cri) {
		int total = bMapper.postsWithImagesCount();
		PageVO pvo = new PageVO(cri, total);
		
		Map<String, Object> res = new HashMap<>();
		
		res.put("data", bMapper.postsWithImages(cri));
		res.put("paging", pvo);
		
		return res;
	}
	@Override
	public int maxBoardNo() {	// 게시글 시퀀스 현재값 가져오는 메소드
		return bMapper.maxBoardNo();
	}
	@Override					// 게시글 좋아요 확인
	public BoardVO findHeart(BoardVO vo) {
		return bMapper.findHeart(vo);
	}
	@Override					// 게시글 좋아요 등록 및 삭제
	public int boardLike(BoardVO vo) {
		BoardVO find = bMapper.findHeart(vo);
		int res = 0;
		// find가 null이면 좋아요가 없는 상태이므로 정보 저장
		if(find == null) {
			res = bMapper.likeInsert(vo);
		} else {
			res = bMapper.likeDelete(vo);
		}
		return res;
	}
	// eunae -------------------------------------------------------

	
	// soomin ------------------------------------------------------
	// 전체조회
	@Override
	public List<BoardVO> artBoardList(Criteria cri) {
		return bMapper.artBoardList(cri);
	}

	@Override
	public int artPagecount(Criteria cri) {
		return bMapper.artPagecount(cri);
	}

	// 상세조회
	@Override
	public Map<String, Object> boardArtDetail(int BoardNo) {
		return bMapper.boardArtDetail(BoardNo);
	}





	


























}
