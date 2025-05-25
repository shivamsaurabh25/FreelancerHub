import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
  getUserData
} from '../services/firebase';
import { MessageCircle, Send, User, Clock, Search } from 'lucide-react';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [participantData, setParticipantData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations
  useEffect(() => {
    if (!user) return;

    const unsubscribe = getConversations(user.uid, async (conversationsList) => {
      setConversations(conversationsList);
      setLoading(false);

      // Load participant data for each conversation
      const participantIds = [...new Set(
        conversationsList.flatMap(conv =>
          conv.participants.filter(id => id !== user.uid)
        )
      )];

      const participantDataMap = {};
      for (const participantId of participantIds) {
        try {
          const userData = await getUserData(participantId);
          if (userData) {
            participantDataMap[participantId] = userData;
          }
        } catch (error) {
          console.error('Error loading participant data:', error);
        }
      }
      setParticipantData(participantDataMap);
    });

    return () => unsubscribe && unsubscribe();
  }, [user]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const unsubscribe = getMessages(selectedConversation.id, (messagesList) => {
      setMessages(messagesList);
      // Mark messages as read
      markMessagesAsRead(selectedConversation.id, user.uid);
    });

    return () => unsubscribe && unsubscribe();
  }, [selectedConversation, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;

    setSendingMessage(true);
    try {
      await sendMessage(selectedConversation.id, user.uid, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const getOtherParticipant = (conversation) => {
    const otherParticipantId = conversation.participants.find(id => id !== user.uid);
    return participantData[otherParticipantId];
  };

  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diff = now - messageDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return messageDate.toLocaleDateString([], { weekday: 'short' });
    } else {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredConversations = conversations.filter(conversation => {
    const otherParticipant = getOtherParticipant(conversation);
    return otherParticipant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           conversation.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="glass-strong rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80">Loading messages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-white/70">Communicate with clients and freelancers</p>
        </div>

        <div className="glass-strong rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-white/10 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-glass pl-12 w-full"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-6 text-center">
                    <MessageCircle className="w-12 h-12 text-white/30 mx-auto mb-3" />
                    <p className="text-white/60">No conversations yet</p>
                    <p className="text-white/40 text-sm">Start messaging by applying to jobs or contacting freelancers</p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => {
                    const otherParticipant = getOtherParticipant(conversation);
                    const unreadCount = conversation.unreadCount?.[user.uid] || 0;

                    return (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-300 hover:bg-white/5 ${
                          selectedConversation?.id === conversation.id ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            {otherParticipant?.name ? (
                              <span className="text-white font-medium">
                                {otherParticipant.name.charAt(0).toUpperCase()}
                              </span>
                            ) : (
                              <User className="w-6 h-6 text-white" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-white font-medium truncate">
                                {otherParticipant?.name || 'Unknown User'}
                              </h3>
                              <div className="flex items-center space-x-2">
                                {unreadCount > 0 && (
                                  <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                  </span>
                                )}
                                <span className="text-white/50 text-xs">
                                  {formatTime(conversation.lastMessageTime)}
                                </span>
                              </div>
                            </div>

                            <p className="text-white/60 text-sm truncate">
                              {conversation.lastMessage || 'No messages yet'}
                            </p>

                            {otherParticipant && (
                              <p className="text-purple-300 text-xs capitalize">
                                {otherParticipant.userType}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="hidden md:flex md:w-2/3 flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        {getOtherParticipant(selectedConversation)?.name ? (
                          <span className="text-white font-medium">
                            {getOtherParticipant(selectedConversation).name.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          {getOtherParticipant(selectedConversation)?.name || 'Unknown User'}
                        </h3>
                        <p className="text-white/60 text-sm capitalize">
                          {getOtherParticipant(selectedConversation)?.userType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                            message.senderId === user.uid
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'glass text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-end mt-1">
                            <Clock className="w-3 h-3 mr-1 opacity-70" />
                            <span className="text-xs opacity-70">
                              {formatTime(message.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="input-glass flex-1"
                        disabled={sendingMessage}
                      />
                      <button
                        type="submit"
                        disabled={sendingMessage || !newMessage.trim()}
                        className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendingMessage ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                    <p className="text-white/60">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Chat View */}
        {selectedConversation && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
            <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg rounded-t-2xl w-full h-3/4 flex flex-col">
              {/* Mobile Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    {getOtherParticipant(selectedConversation)?.name ? (
                      <span className="text-white font-medium">
                        {getOtherParticipant(selectedConversation).name.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {getOtherParticipant(selectedConversation)?.name || 'Unknown User'}
                    </h3>
                    <p className="text-white/60 text-sm capitalize">
                      {getOtherParticipant(selectedConversation)?.userType}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="text-white/70 hover:text-white"
                >
                  ×
                </button>
              </div>

              {/* Mobile Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-xl ${
                        message.senderId === user.uid
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'glass text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end mt-1">
                        <Clock className="w-3 h-3 mr-1 opacity-70" />
                        <span className="text-xs opacity-70">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Mobile Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input-glass flex-1"
                    disabled={sendingMessage}
                  />
                  <button
                    type="submit"
                    disabled={sendingMessage || !newMessage.trim()}
                    className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingMessage ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
