import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Chat App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Home(),
    );
  }
}

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    final String url5 =
        'http://192.168.1.89:8000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcxOTg1NTY0OCwiZXhwIjoxNzE5OTQyMDQ4fQ.2qnbHFwf-Cz69kZtaehsrsT_NUg9CW-SjIGqmQ0amBU';
    final String url3 =
        'http://192.168.1.89:8000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxOTg1Nzc4MCwiZXhwIjoxNzE5OTQ0MTgwfQ.QwE8HSnzKjFaMGHNAwdsGDKDbkekwmqKVhPr-9x_2E0';

    return Scaffold(
      body: Column(
        children: [
          ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => ChatScreen(url: url5, userId: 5)),
              );
            },
            child: Text('Connect as user 5'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => ChatScreen(url: url3, userId: 3)),
              );
            },
            child: Text('Connect as user 3'),
          )
        ],
      ),
    );
  }
}

class ChatScreen extends StatefulWidget {
  final String url;
  final int userId;

  const ChatScreen({super.key, required this.url, required this.userId});
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  late IO.Socket socket;
  final TextEditingController _controller = TextEditingController();
  final List<String> _messages = [];

  @override
  void initState() {
    super.initState();

    socket = IO.io(widget.url, <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.connect();

    socket.on('connect', (_) {
      print('connected: ${socket.id}');
    });

    socket.on('receive-message', (msg) {
      setState(() {
        _messages.add(msg);
      });
    });

    socket.on('disconnect', (_) {
      print('disconnected');
    });
  }

  @override
  void dispose() {
    socket.disconnect();
    _controller.dispose();
    super.dispose();
  }

  void _sendMessage() {
    if (_controller.text.isNotEmpty) {
      String message = _controller.text;
      setState(() {
        _messages.add(message); // Add the message to the list before sending
      });
      socket.emit('send-message', message);
      _controller.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Id: ${widget.userId}'),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: ListView.builder(
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(_messages[index]),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: <Widget>[
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      labelText: 'Enter message from userId: ${widget.userId}',
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.send),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
