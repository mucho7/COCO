package com.ssafy.upload.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.upload.data.BoardUpload;
import com.ssafy.upload.data.BoardUploadRepository;
import com.ssafy.upload.data.MemberUpload;
import com.ssafy.upload.data.MemberUploadRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UploadService {
	private final BoardUploadRepository boardUploadRepository;

	private final MemberUploadRepository memberUploadRepository;

	// 파일 업로드 관련 레퍼런스 코드
	// https://velog.io/@rladuswl/8-%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%ED%84%B0%EB%94%94-%EC%87%BC%ED%95%91%EB%AA%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%83%81%ED%92%88-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%EC%99%80-thymeleaf
	public long uploadBoardImage(Long boardId, MultipartFile boardFile) throws Exception {
		String originalType = boardFile.getContentType();
		String fileType = originalType.substring(originalType.lastIndexOf("/") + 1);

		String storePath = System.getProperty("user.dir") + "/src/main/resources/static/board";

		UUID uuid = UUID.randomUUID();
		String storedFileName = uuid + "." + fileType;

		File saveFile = new File(storePath, storedFileName);
		if(!saveFile.exists()){
			saveFile.mkdirs();
		}
		System.out.println(saveFile);
		boardFile.transferTo(saveFile);
		return boardUploadRepository.save(BoardUpload.builder()
			.id(boardId)
			.storedFilePath(storePath)
			.storedFileName(storedFileName)
			.build()).getId();
	}

	public long updateBoardImage(Long boardId, MultipartFile newFile) throws Exception {
		String originalType = newFile.getContentType();
		String newFileType = originalType.substring(originalType.lastIndexOf("/") + 1);

		String storePath = System.getProperty("user.dir") + "/src/main/resources/static/board";

		BoardUpload boardUpload = boardUploadRepository.findById(boardId).orElse(new BoardUpload());

		UUID uuid = UUID.randomUUID();
		String storedFileName = uuid + "." + newFileType;

		File saveFile = new File(storePath, storedFileName);
		if(!saveFile.exists()){
			saveFile.mkdirs();
		}
		newFile.transferTo(saveFile);

		if (boardUpload.getStoredFileName() != null) {
			Path previousPath = Paths.get(boardUpload.getStoredFilePath() + "/" + boardUpload.getStoredFileName());
			try {
				Files.delete(previousPath);
			} catch (NoSuchFileException e) {
				System.out.printf("No such file or directory: %s\n", previousPath);
			} catch (DirectoryNotEmptyException e) {
				System.out.printf("Directory %s is not empty\n", previousPath);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return boardUploadRepository.save(BoardUpload.builder()
			.id(boardId)
			.storedFileName(storedFileName)
			.storedFilePath(storePath)
			.build()).getId();
	}

	public UrlResource getBoardImage(long boardId) {
		BoardUpload uploadInfo = boardUploadRepository.findById(boardId)
			.orElseThrow(() -> new IllegalArgumentException("해당 이미지를 찾을 수 없습니다."));
		Path filePath = Paths.get(uploadInfo.getStoredFilePath()).toAbsolutePath().normalize();
		try {
			UrlResource resource = new UrlResource(filePath.toUri());
			return resource;
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public long uploadMemberImage(String userId, MultipartFile userFile) throws Exception {
		String originalType = userFile.getContentType();
		String fileType = originalType.substring(originalType.lastIndexOf("/") + 1);

		String storePath = System.getProperty("user.dir") + "/src/main/resources/static/member";

		UUID uuid = UUID.randomUUID();
		String storedFileName = uuid + "." + fileType;

		File saveFile = new File(storePath, storedFileName);
		if(!saveFile.exists()){
			saveFile.mkdirs();
		}
		userFile.transferTo(saveFile);
		return memberUploadRepository.save(MemberUpload.builder()
			.userId(userId)
			.storedFilePath(storePath)
			.storedFileName(storedFileName)
			.build()).getId();
	}

	public long updateMemberImage(String userId, MultipartFile newFile) throws Exception {
		String originalType = newFile.getContentType();
		String newFileType = originalType.substring(originalType.lastIndexOf("/") + 1);

		String storePath = System.getProperty("user.dir") + "/src/main/resources/static/member";

		MemberUpload memberUpload = memberUploadRepository.findByUserId(userId).orElse(new MemberUpload());

		UUID uuid = UUID.randomUUID();
		String storedFileName = uuid + "." + newFileType;

		File saveFile = new File(storePath, storedFileName);
		if(!saveFile.exists()){
			saveFile.mkdirs();
		}
		newFile.transferTo(saveFile);

		if (memberUpload.getStoredFileName() != null) {
			Path previousPath = Paths.get(memberUpload.getStoredFilePath() + "/" + memberUpload.getStoredFileName());
			try {
				Files.delete(previousPath);
				memberUploadRepository.deleteById(memberUpload.getId());
			} catch (NoSuchFileException e) {
				System.out.printf("No such file or directory: %s\n", previousPath);
			} catch (DirectoryNotEmptyException e) {
				System.out.printf("Directory %s is not empty\n", previousPath);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return memberUploadRepository.save(MemberUpload.builder()
			.userId(userId)
			.storedFileName(storedFileName)
			.storedFilePath(storePath)
			.build()).getId();
	}

	public UrlResource getMemberImage(String userId) {
		MemberUpload uploadInfo = memberUploadRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자의 이미지를 찾을 수 없습니다. [" + userId + "]"));
		Path filePath = Paths.get(uploadInfo.getStoredFilePath()).toAbsolutePath().normalize();
		try {
			UrlResource resource = new UrlResource(filePath.toUri());
			return resource;
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return null;
	}

}
