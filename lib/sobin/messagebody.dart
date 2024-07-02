import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class Message {
  final String content;
  final bool isSentByMe;
  final String time;

  Message(
      {required this.content, required this.isSentByMe, required this.time});
}

class ChatPage extends StatefulWidget {
  const ChatPage({Key? key}) : super(key: key);

  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final TextEditingController _controller = TextEditingController();
  final List<Message> _messages = [];
  late IO.Socket _socket;

  @override
  void initState() {
    super.initState();
    _connectSocket();
  }

  void _connectSocket() {
    _socket = IO.io(
        'http://192.168.1.89:8000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxOTkyMTkxOSwiZXhwIjoxNzIwMDA4MzE5fQ.4QZHVsQvxzjF7fuvSqCR-7ePtGWHOt6RP1pB9v3kkqU',
        <String, dynamic>{
          'transports': ['websocket'],
          'autoConnect': false,
        });

    _socket.connect();

    _socket.onConnect((_) {
      print('connected');
    });

    _socket.on('message', (data) {
      //yo part chai incoming msgko lagi hai kta ho
      setState(() {
        _messages.add(Message(content: data, isSentByMe: false, time: '4.30'));
      });
    });

    _socket.onDisconnect((_) {
      print('disconnected');
    });
  }

  void _sendMessage() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        _messages.add(
            Message(content: _controller.text, isSentByMe: true, time: '4.30'));
      });
      _socket.emit('message', _controller.text);
      _controller.clear();
    }
  }

  @override
  void dispose() {
    _socket.disconnect();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme:
            const IconThemeData(color: Color.fromARGB(255, 104, 192, 230)),
        backgroundColor: const Color.fromARGB(255, 24, 26, 48),
        centerTitle: true,
        title: const Text(
          'Chat Section',
          style: TextStyle(color: Color.fromARGB(255, 142, 133, 180)),
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(color: Color.fromARGB(255, 36, 39, 70)),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  final message = _messages[index];
                  return Align(
                    alignment: message.isSentByMe
                        ? Alignment.centerRight
                        : Alignment.centerLeft,
                    child: Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          margin: const EdgeInsets.symmetric(
                              vertical: 5, horizontal: 10),
                          decoration: BoxDecoration(
                            color: message.isSentByMe
                                ? const Color.fromARGB(255, 24, 109, 179)
                                : Colors.grey[300],
                            borderRadius: BorderRadius.circular(15),
                          ),
                          child: Text(
                            message.content,
                            style: TextStyle(
                              color: message.isSentByMe
                                  ? Colors.white
                                  : Colors.black,
                            ),
                          ),
                        ),
                        Text(message.time)
                      ],
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      style: const TextStyle(color: Colors.white),
                      controller: _controller,
                      decoration: const InputDecoration(
                        iconColor: Color.fromARGB(255, 237, 236, 234),
                        hintText: 'Enter message',
                        hintStyle: TextStyle(
                            color: Color.fromARGB(255, 145, 145, 145)),
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.send),
                    onPressed: _sendMessage,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
