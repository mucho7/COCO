/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.function.session.kurento;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.kurento.client.IceCandidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.function.session.api.service.RoomService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

// import sun.tools.jconsole.JConsole;

/**
 *
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class CallHandler extends TextWebSocketHandler {

	private static final Logger log = LoggerFactory.getLogger(CallHandler.class);

	private static final Gson gson = new GsonBuilder().create();

	@Autowired
	private RoomManager roomManager;

	@Autowired
	private UserRegistry registry;

	@Autowired
	private RoomService roomService; //

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		final JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

		final UserSession user = registry.getBySession(session);

		if (user != null) {
			log.debug("Incoming message from user '{}': {}", user.getName(), jsonMessage);
		} else {
			log.debug("Incoming message from new user: {}", jsonMessage);
		}

		switch (jsonMessage.get("id").getAsString()) {
			case "joinRoom":
				joinRoom(jsonMessage, session);
				break;
			case "receiveVideoFrom":
				final String senderName = jsonMessage.get("sender").getAsString();
				final UserSession sender = registry.getByName(senderName);
				final String sdpOffer = jsonMessage.get("sdpOffer").getAsString();
				user.receiveVideoFrom(sender, sdpOffer);
				break;
			case "leaveRoom":
				// noticeLeaving(user); //
				leaveRoom(user);
				break;
			case "onIceCandidate":
				JsonObject candidate = jsonMessage.get("candidate").getAsJsonObject();

				if (user != null) {
					IceCandidate cand = new IceCandidate(candidate.get("candidate").getAsString(),
						candidate.get("sdpMid").getAsString(), candidate.get("sdpMLineIndex").getAsInt());
					user.addCandidate(cand, jsonMessage.get("name").getAsString());
				}
				break;
			case "sendChat":
				log.info("...receive Chat from client...");
				sendChat(jsonMessage);
				break;
			case "controlOtherVideos": // 없애기
				controlOtherVideos(jsonMessage);
				break;
			case "toggleAuthorization": //
				controlAuthorization(jsonMessage);
				break;
			case "hostLeft":
				hostLeft(jsonMessage.get("roomName").getAsString(), user);
				break;
			case "startRelay":
				startReading(user);
				break;
			case "endReading":
				// startCoding(jsonMessage);
				System.out.println("...endReading:");
				announceUserTurn(jsonMessage.get("roomName").getAsString(), 0);
				break;
			case "endMyTurn":
				System.out.println("...endMyTurn[relayCoding]:" + relayCodingOrder);
				System.out.println("...endMyTurn[index]:" + jsonMessage.get("index").getAsInt());
				System.out.println("...endMyTurn[relayCoding.size()]:" + relayCodingOrder.size());
				System.out.println("...");
				announceUserTurn(jsonMessage.get("roomName").getAsString(), jsonMessage.get("index").getAsInt());
				break;
			default:
				break;
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		UserSession user = registry.removeBySession(session);
		final String roomName = user.getRoomName();
		final String userName = user.getName();

		roomManager.getRoom(roomName).leave(user);

		if (roomName == userName) { // 호스트가 ConnectionClosed됐다. 나머지 참
			hostLeft(roomName, null);
			roomService.DeleteRoom(roomName); // 해당 방 DB에서 지우기
		}

		final Room room = roomManager.getRoom(user.getRoomName());
		room.leave(user);
		if (room.getParticipants().isEmpty()) {
			roomManager.removeRoom(room);
		}

		// UserSession user = registry.removeBySession(session);
		// roomManager.getRoom(user.getRoomName()).leave(user);
	}

	private void noticeLeaving(UserSession user) throws Exception {
		// 해당 룸에 있는 참여자들에게 user님이 떠났다고 알리기
		final List<UserSession> participantsList = roomManager.getRoom(user.getRoomName()).getParticipantsList(user);

		final JsonObject chat = new JsonObject();
		chat.addProperty("id", "noticeLeaving");
		chat.addProperty("userName", user.getName());

		noticeMessage(participantsList, chat);
	}

	// 1분 릴레이 코딩
	private Map<String, List<UserSession>> relayCodingOrder = new HashMap<>();

	private void startReading(UserSession user) throws Exception {
		String roomName = user.getRoomName();
		final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(null);

		Collections.shuffle(participantsList); // 랜덤으로 순서 재배치
		relayCodingOrder.put(roomName, participantsList);

		final JsonObject message = new JsonObject();
		message.addProperty("id", "startReading");
		noticeMessage(participantsList, message);
	}

	// private void startCoding(JsonObject params) throws Exception {
	// 	final String roomName = params.get("roomName").getAsString();
	// 	// final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(null);
	//
	// 	// Collections.shuffle(participantsList); // 랜덤으로 순서 재배치
	// 	//
	// 	// relayCodingOrder.put(roomName, participantsList);
	//
	// 	announceUserTurn(roomName, 0);
	// }

	private void announceUserTurn(String roomName, int index) throws Exception {
		final List<UserSession> order = relayCodingOrder.get(roomName);
		final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(null);
		int size = order.size();

		if (index == size) {
			final JsonObject message = new JsonObject();
			message.addProperty("id", "endRelay");
			noticeMessage(participantsList, message);

			relayCodingOrder.remove(roomName);
		} else {
			UserSession user = order.get(index);
			String nextName;

			if (index + 1 == size) {
				nextName = ": 마지막 순서";
			} else {
				nextName = order.get(index + 1).getName();
			}
			// 참여자들에게 지금 차례, 다음 차례 사람 정보 알리기
			final JsonObject message = new JsonObject();
			message.addProperty("id", "relayCoding");
			message.addProperty("index", index);
			message.addProperty("now", user.getName());
			message.addProperty("next", nextName);
			noticeMessage(participantsList, message);
			// // 지금 차례인 사용자에게 알리기
			// final JsonObject yourTurnMessage = new JsonObject();
			// yourTurnMessage.addProperty("id", "yourTurn");
			// yourTurnMessage.addProperty("index", index);
			// user.sendMessage(yourTurnMessage);
		}

	}

	private void sendChat(JsonObject params) throws Exception {
		// 해당 룸에 있는 참여자들에게 메시지 보내기
		final String roomName = params.get("roomName").getAsString();
		final String userName = params.get("userName").getAsString();

		final UserSession userSession = registry.getByName(userName);
		final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(userSession);

		final JsonObject chat = new JsonObject();
		chat.addProperty("id", "noticeChat");
		chat.addProperty("userName", userName);
		chat.addProperty("chat", params.get("chat").getAsString());

		noticeMessage(participantsList, chat);
	}

	private void hostLeft(String roomName, UserSession host) throws Exception {
		final List<UserSession> participantsList = roomManager.getRoom(roomName)
			.getParticipantsList(host); // 해당 룸에 있는 다른 모든 참여자들에게

		final JsonObject message = new JsonObject();
		message.addProperty("id", "leaveByHost");

		noticeMessage(participantsList, message);

		roomService.DeleteRoom(roomName); // 해당 방 DB에서 지우기
	}

	private void controlOtherVideos(JsonObject params) throws Exception {
		final String roomName = params.get("roomName").getAsString();
		final String userName = params.get("userName").getAsString();

		final UserSession userSession = registry.getByName(userName);
		final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(userSession);

		final JsonObject message = new JsonObject();
		message.addProperty("id", "turnVideoOff");

		noticeMessage(participantsList, message);
	}

	private void controlAuthorization(JsonObject params) throws Exception {
		final String userName = params.get("userName").getAsString();
		final List<UserSession> participantsList = roomManager.getRoom(registry.getByName(userName).getRoomName())
			.getParticipantsList(null);

		final JsonObject message = new JsonObject();
		message.addProperty("id", "toggleAuthorization");
		message.addProperty("userName", userName);
		message.addProperty("authorizationType", params.get("authorizationType").getAsString());

		noticeMessage(participantsList, message);
	}

	private void noticeMessage(List<UserSession> users, JsonObject message) throws IOException {
		for (final UserSession user : users) {
			user.sendMessage(message);
		}
	}

	private void joinRoom(JsonObject params, WebSocketSession session) throws IOException {
		final String roomName = params.get("room").getAsString();
		final String name = params.get("name").getAsString();

		log.info("PARTICIPANT {}: trying to join room {}", name, roomName);

		Room room = roomManager.getRoom(roomName);
		log.info("...joinRoom, WebSocket: ", session, session.getId()); //
		// System.out.println("...joinRoom, WebSocket: " + session + ", " + session.getId());
		final UserSession user = room.join(name, session);
		registry.register(user);

	}

	private void leaveRoom(UserSession user) throws IOException {
		final Room room = roomManager.getRoom(user.getRoomName());
		room.leave(user);
		if (room.getParticipants().isEmpty()) {
			roomManager.removeRoom(room);
		}
		// TODO: host이면 DB에서도 삭제
	}
}
