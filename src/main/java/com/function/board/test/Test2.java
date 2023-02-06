package com.function.board.test;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import com.function.board.dto.board.BoardDetailTransferDto;
import com.function.board.dto.board.ContentComponentDto;

public class Test2 {
	public static void main(String[] args) {
		//0-1. content "\n" 단위로 분리
		String contentData = "qweqwe\n---3\nline1\nline2\nline3\n---5\n1\n2\n---7\ntest\n---8";
		// System.out.println(contentData);
		String[] content = contentData.split("\n");
		// System.out.println(String.join("", content));

		//0-2. code "\n" 단위로 분리
		String codeData = "public class Test2 {\nString a;\nString b;\nString c;\na;\nb;\nc;\nd;\ne;\n";
		// System.out.println(codeData);
		String[] code = codeData.split("\n");
		// System.out.println(String.join("", code));

		//0-3. 기타 필요한 객체들
		BoardDetailTransferDto detailDto = new BoardDetailTransferDto();

		List<ContentComponentDto> contents = new ArrayList<>();
		List<ContentComponentDto> codes = new ArrayList<>();

		ContentComponentDto contentComponent = new ContentComponentDto();
		ContentComponentDto codeComponent = new ContentComponentDto();

		//라인별로 저장하기 위해 필요한 StringBuilder
		StringBuilder sbContent = new StringBuilder();
		StringBuilder sbCode = new StringBuilder();

		int codeIndex = 0;
		boolean isFirst = true;
		boolean firstStart = false;
		boolean lastEnd = false;


		//0-4. 검색 패턴 설정(---[숫자])
		String pattern = "^\\---\\d{1,4}";

		for(int i = 0; i < content.length; i++) {
			//1. 블록 구문 검사
			if(Pattern.matches(pattern, content[i])) {
				//시작과 끝 인덱스 지정
				int startIndex = 0;
				int endIndex = 0;
				if(isFirst) {
					startIndex = Integer.parseInt(content[i].replace("---", ""));
					isFirst = false;
					continue;
				} else {
					endIndex = Integer.parseInt(content[i].replace("---", ""));
					isFirst = true;

					//2. 컴포넌트에 담고 리스트에 추가
					contentComponent.setContent(sbContent.toString());
					contentComponent.setIndex(codes.size());

					//3. 코드도 잘라서 인덱스 매핑
					while (codeIndex != startIndex)
						codeIndex++;

					while (codeIndex + 1 != endIndex) {
						sbCode.append(code[codeIndex]);
						codeIndex++;
					}

					codeComponent.setContent(sbCode.toString());
					codeComponent.setIndex(contents.size());

					//4. 리스트 추가
					contents.add(contentComponent);
					codes.add(codeComponent);
				}
			}
			else {
				//StringBuilder에 한 줄씩 넣는 과정
				sbContent.append(content[i]);
			}
		}

		for(ContentComponentDto c : contents) {
			System.out.println(c.getContent() + " " + c.getIndex());
		}

		// for(ContentComponentDto c : codes) {
		// 	System.out.println(c.getContent() + " " + c.getIndex());
		// }

	}
}
