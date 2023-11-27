package com.kej.app.common.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kej.app.common.mapper.CommonMapper;
import com.kej.app.common.service.CommonService;
import com.kej.app.common.service.vo.CodeVO;

@Service
public class CommonServiceImpl implements CommonService{
	@Autowired
	CommonMapper commonMapper;

	// 여러 그룹 코드들의 상세코드 조회
	@Override
	public Map<String, List<CodeVO>> getCodes(String... commList) {
		Map<String, List<CodeVO>> map = new HashMap<String, List<CodeVO>>();
		for(String coCd : commList) {
			map.put(coCd, commonMapper.selectCode(coCd));
		};
		return map;
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
