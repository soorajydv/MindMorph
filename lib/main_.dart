import 'package:flutter/material.dart';
import 'package:web_socket_channel/status.dart' as status;
import 'package:web_socket_channel/web_socket_channel.dart';

class Message {
  final String content;
  final bool isSentByMe;

  Message({required this.content, required this.isSentByMe});
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Simple Messaging App',
      home: const ChatPage(),
    );
  }
}

class ChatPage extends StatefulWidget {
  const ChatPage({Key? key}) : super(key: key);

  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final TextEditingController _controller = TextEditingController();
  final List<Message> _messages = [];
  late WebSocketChannel _channel;

  @override
  void initState() {
    super.initState();
    _connectSocket();
  }

  void _connectSocket() {
    _channel = WebSocketChannel.connect(
      Uri.parse(
          'http://192.168.1.89:8000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcxOTg1NTY0OCwiZXhwIjoxNzE5OTQyMDQ4fQ.2qnbHFwf-Cz69kZtaehsrsT_NUg9CW-SjIGqmQ0amBU'),
    );

    _channel.stream.listen((message) {
      setState(() {
        _messages.add(Message(content: message, isSentByMe: false));
      });
    });
  }

  void _sendMessage() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        _messages.add(Message(content: _controller.text, isSentByMe: true));
      });
      _channel.sink.add(_controller.text);
      _controller.clear();
    }
  }

  @override
  void dispose() {
    _channel.sink.close(status.goingAway);
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromARGB(255, 24, 26, 48),
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
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          vertical: 10, horizontal: 15),
                      margin: const EdgeInsets.symmetric(
                          vertical: 5, horizontal: 10),
                      decoration: BoxDecoration(
                        color:
                            message.isSentByMe ? Colors.blue : Colors.grey[300],
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: Text(
                        message.content,
                        style: TextStyle(
                          color:
                              message.isSentByMe ? Colors.white : Colors.black,
                        ),
                      ),
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
