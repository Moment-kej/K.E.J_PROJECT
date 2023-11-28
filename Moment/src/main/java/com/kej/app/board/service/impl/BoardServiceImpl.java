package com.kej.app.board.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.kej.app.board.mapper.BoardMapper;
import com.kej.app.board.service.BoardService;
import com.kej.app.board.service.vo.BoardPager;
import com.kej.app.board.service.vo.BoardVO;

@Service
public class BoardServiceImpl implements BoardService {
	@Autowired BoardMapper bMapper;

	@Override
	public int execute(Model model, String pagenum, String contentnum) {
		BoardPager pagemaker = new BoardPager();
		
		int cpagenum = Integer.parseInt(pagenum);
        int ccontentnum = Integer.parseInt(contentnum);
        
        List<BoardVO> board_list = null;
        
        pagemaker.setTotalcount(bMapper.pagecount()); 		// mapper 전체 게시글 개수를 지정한다
        pagemaker.setPagenum(cpagenum-1);  			 		// 현재 페이지를 페이지 객체에 지정한다 -1 을 해야 쿼리에서 사용할수 있다
        pagemaker.setContentnum(ccontentnum); 				// 한 페이지에 몇개씩 게시글을 보여줄지 지정한다.
        pagemaker.setCurrentblock(cpagenum); 				// 현재 페이지 블록이 몇번인지 현재 페이지 번호를 통해서 지정한다.
        pagemaker.setLastblock(pagemaker.getTotalcount()); // 마지막 블록 번호를 전체 게시글 수를 통해서 정한다.
        //마지막 페이지를 마지막 페이지 블록과 현재 페이지 블록 번호로 정한다.
        
        if(ccontentnum == 10){//선택 게시글 수
        	board_list = bMapper.dressBoradList(pagemaker.getPagenum()*10, pagemaker.getContentnum());
        } else if(ccontentnum == 20){
        	board_list = bMapper.dressBoradList(pagemaker.getPagenum()*20, pagemaker.getContentnum());
        } else if(ccontentnum == 30){
        	board_list = bMapper.dressBoradList(pagemaker.getPagenum()*30, pagemaker.getContentnum());
        } else if(ccontentnum == 40){
        	board_list = bMapper.dressBoradList(pagemaker.getPagenum()*30, pagemaker.getContentnum());
        }
        System.out.println("board_list>>>>>>>>>>>>>> : " + board_list);
        System.out.println("pagemaker>>>>>>>>>>>>>>> : " + pagemaker);

        model.addAttribute("list", board_list);
        model.addAttribute("page", pagemaker);
        
		return 0;
	}

}
