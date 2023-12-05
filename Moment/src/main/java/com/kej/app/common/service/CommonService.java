package com.kej.app.common.service;

import java.util.List;
import java.util.Map;

import com.kej.app.board.service.vo.Criteria;
import com.kej.app.common.service.vo.CodeVO;
import com.kej.app.common.service.vo.NewsVO;

public interface CommonService {
	// 여러 그롭 코드들의 상세코드 조회
	public Map<String, List<CodeVO>> getCodes(String ... commList);
	
	public List<NewsVO> news(int page, String query);
	int getTotalPages(String query);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
