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

package org.kurento.tutorial.groupcall;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentMap;

import com.google.gson.*;
import org.kurento.client.IceCandidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

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

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    final JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

    final UserSession user = registry.getBySession(session); //

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
      case "controlOtherVideos":
        controlOtherVideos(jsonMessage);
        break;
      default:
        break;
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    UserSession user = registry.removeBySession(session);
    roomManager.getRoom(user.getRoomName()).leave(user);
  }

  private void noticeLeaving(UserSession user) throws Exception {
    // 해당 룸에 있는 참여자들에게 user님이 떠났다고 알리기
    final List<UserSession> participantsList = roomManager.getRoom(user.getRoomName()).getParticipantsList(user);

    final JsonObject chat = new JsonObject();
    chat.addProperty("id", "noticeLeaving");
    chat.addProperty("userName", user.getName());

    noticeMessage(participantsList, chat);
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

  private void controlOtherVideos(JsonObject params) throws Exception {
    final String roomName = params.get("roomName").getAsString();
    final String userName = params.get("userName").getAsString();

    final UserSession userSession = registry.getByName(userName);
    final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(userSession);

    final JsonObject message = new JsonObject();
    message.addProperty("id", "turnVideoOff");

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
    final UserSession user = room.join(name, session);
    registry.register(user);
  }

  private void leaveRoom(UserSession user) throws IOException {
    final Room room = roomManager.getRoom(user.getRoomName());
    room.leave(user);
    if (room.getParticipants().isEmpty()) {
      roomManager.removeRoom(room);
    }
  }
}
