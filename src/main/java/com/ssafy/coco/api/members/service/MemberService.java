package com.ssafy.coco.api.members.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.coco.api.members.data.Member;
import com.ssafy.coco.api.members.data.MemberRepository;
import com.ssafy.coco.api.members.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.api.members.dto.response.MemberResponseDto;
import com.ssafy.coco.api.tokens.JwtTokenProvider;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;
import com.ssafy.coco.api.tokens.service.JwtTokenService;
import com.ssafy.coco.utility.SHA256Converter;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;

/**
 * 임시비밀번호 보내는 코드 reference
 * https://velog.io/@hellocdpa/220319-%EC%9E%84%EC%8B%9C%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%9D%B4%EB%A9%94%EC%9D%BC%EB%A1%9C-%EB%B3%B4%EB%82%B4%EB%8A%94-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84
 */

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    private final JwtTokenService jwtService;

    private final PasswordEncoder passwordEncoder;

    private final SHA256Converter sha256Converter;

    @Transactional
    public Long registerMember(MemberRegisterRequestDto requestDto) {
        requestDto.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        return memberRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public String updateInfo(String userId, MemberUpdateRequestDto requestDto, String accessToken) {
        String tokenOwner = jwtTokenProvider.getUserIdFromAccessToken(accessToken);
        System.out.println("[UpdateInfo@MemberService] userId: " + userId + ", requestDto: " + requestDto);
        if (tokenOwner.equals(userId)) {
            Member member = memberRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + userId));
            if (member.getDelFlag() != null) {
                throw new IllegalArgumentException("해당 사용자는 탈퇴한 사용자입니다. 사용자 ID: " + userId);
            } else {
                if (requestDto.getName() != null) {
                    member.setName(requestDto.getName());
                }
                if (requestDto.getEmail() != null) {
                    member.setEmail(requestDto.getEmail());
                }
            }
            return userId;
        }
        return null;
    }

    public MemberResponseDto findByUserId(String userId) {
        Member entity = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + userId));

        return new MemberResponseDto(entity);
    }

    public boolean existUserByIdAndEmail(String userId, String email) {
        return memberRepository.existsByUserIdAndEmail(userId, email);
    }

    @Transactional
    public String deleteMember(String id, String accessToken, String refreshToken) {
        String tokenOwnerId = jwtTokenProvider.getUserIdFromAccessToken(accessToken);

        if (tokenOwnerId.equals(id)) {
            Member member = memberRepository.findByUserId(id)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + id));
            if (member.getDelFlag() != null) // error code: 500
                throw new IllegalArgumentException("해당 사용자는 이미 탈퇴한 사용자입니다. 사용자 ID: " + id);
            else {
                jwtService.logout(refreshToken);
                member.deleteMember(LocalDateTime.now());
            }
            return id;
        } else {
            return null;
        }
    }

    @Transactional
    public String ratingUpdate(MemberRatingUpdateRequestDto requestDto) {
        Member member = memberRepository.findByUserId(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + requestDto.getUserId()));
        if (member.getDelFlag() != null) {// error code: 500
            throw new IllegalArgumentException("해당 사용자는 탈퇴한 사용자입니다. 사용자 ID: " + requestDto.getUserId());
        } else {
            member.updateRating(requestDto.getAmount());
        }
        return requestDto.getUserId();
    }

    @Transactional
    public boolean idCheck(String userId) {
        Long count = memberRepository.countByUserId(userId);
        return count == 0;
    }

    @Transactional
    public boolean emailCheck(String email) {
        Long count = memberRepository.countByEmail(email);
        return count == 0;
    }

    @Transactional
    public JwtTokenDto login(String id, String password) {
        // Step 1. 로그인 ID/비밀번호 기반으로 Authentication 객체 생성
        // 이 때, 인증 여부를 확인하는 authenticated 값을 false로 한다.

        String encodedPassword = passwordEncoder.encode(password);

        System.out.println("로그인 시도 ID: " + id + ", 입력한 비밀번호: " + password);
        System.out.println("인코딩된 password: " + encodedPassword);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);

        System.out.println(authenticationToken);

        // Step 2. 실제 검증 (사용자 비밀번호	 체크 등)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 MemberService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        System.out.println("principal: " + authentication.getPrincipal());

        // Step 3. 인증된 정보를 기반으로 JwtToken 생성
        UserDetails userDetails = (Member) authentication.getPrincipal();
        System.out.println("userDetails: " + userDetails.toString());
        if (((Member) userDetails).getDelFlag() == null) {
            String userId = userDetails.getUsername();
            List<String> roles = memberRepository.findByUserId(userId).get().getRoles();
            JwtTokenDto jwtToken = jwtTokenProvider.createToken(userId, roles);

            System.out.println("생성된 JwtTokenDto: " + jwtToken);
            jwtService.login(jwtToken);

            return jwtToken;
        } else {
            return null;
        }
    }

    @Transactional
    public boolean logout(String refreshToken) {
        System.out.println("[logout@MemberService] 로그아웃 요청한 refreshToken: " + refreshToken);
        return jwtService.logout(refreshToken);
    }

    public String getUserIdFromAccessToken(String accessToken, String refreshToken) {
        System.out.println(
                "[getUserIdFromAccessToken@MemberService] 받은 토큰 정보:\nAccessToken: " + accessToken + ", RefreshToken: "
                        + refreshToken);
        String userId;
        try {
            userId = jwtTokenProvider.getUserIdFromAccessToken(accessToken);
        } catch (ExpiredJwtException e) {
            userId = SecurityContextHolder.getContext().getAuthentication().getName();
        }
        return userId;
    }

    public String getTmpPassword(String userId) {
        String tempPassword = makeTempPassword();

        try {
            String sha256Password = sha256Converter.encrypt(tempPassword);
            updatePassword(userId, tempPassword);
            // updatePassword(userId, sha256Password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tempPassword;
    }

    public String updatePassword(String userId, String tempPassword) {
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID를 가진 사용자가 없습니다."));
        if (member.getDelFlag() == null) {
            String encodedPassword = passwordEncoder.encode(tempPassword);
            member.setPassword(encodedPassword);
            memberRepository.save(member);
            return member.getUserId();
        } else {
            return "[error] 해당 사용자는 탈퇴한 사용자입니다.";
        }
    }

    public String makeTempPassword() {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
                'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                'w', 'x', 'y', 'z'};
        StringBuilder tempPassword = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            int idx = (int) (charSet.length * Math.random());
            tempPassword.append(charSet[idx]);
        }
        return tempPassword.toString();
    }

    public String changePassword(String accessToken, String newPassword) {
        String userId = jwtTokenProvider.getUserIdFromAccessToken(accessToken);
        System.out.println("[changePassword@MemberService] UserID from Authentication: " + userId);
        return updatePassword(userId, newPassword);
    }
}
