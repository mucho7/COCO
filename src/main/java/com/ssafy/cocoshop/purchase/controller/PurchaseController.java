package com.ssafy.cocoshop.purchase.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.cocoshop.purchase.data.PurchaseInfo;
import com.ssafy.cocoshop.purchase.dto.PurchaseRequestDto;
import com.ssafy.cocoshop.purchase.service.PurchaseService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequestMapping("/shopApi/shop")
@RequiredArgsConstructor
@Api(tags = "상점 관련 API")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PurchaseController {

	private final PurchaseService purchaseService;

	@ApiOperation(value = "상품 구매", notes = "사용자로부터 받은 구매 요청 정보와 JWT 토큰으로 무결성을 검증하고, 구매 프로세스를 진행합니다.")
	@PostMapping
	public void purchaseItem(
		@RequestBody @ApiParam(value = "사용자로부터 받은 구매 요청 정보", required = true) PurchaseRequestDto requestDto,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization");
		PurchaseInfo purchaseInfo = purchaseService.purchaseItem(requestDto, accessToken)
			.orElseThrow(() -> new RuntimeException("구매에 실패하였습니다."));
		System.out.println(purchaseInfo);
	}

}
