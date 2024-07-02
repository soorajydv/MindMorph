import 'messagebody.dart';
import 'package:flutter/material.dart';

class Userlist {
  String name;
  String time;
  String count;
  String Profileimage;
  String title;
  String message;
  Userlist(this.name, this.count, this.Profileimage, this.time, this.title,
      this.message);
}

// ignore: must_be_immutable
class MessageUserList extends StatefulWidget {
  MessageUserList({super.key});

  List<Userlist> userlist = [
    Userlist(
        'sobin',
        '5',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/640px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg',
        '4:30',
        'Elun',
        'kxa sathi'),
    Userlist(
        'sobin',
        '5',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/640px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg',
        '4:30',
        'om',
        'ma thik xu'),
    Userlist(
        'sobin',
        '5',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/640px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg',
        '4:30',
        'om',
        'hasayo keta le')
  ];

  @override
  State<MessageUserList> createState() => _MessageUserListState();
}

class _MessageUserListState extends State<MessageUserList> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () {},
            icon: Icon(
              Icons.notifications_active,
              color: Color.fromARGB(255, 165, 195, 238),
            ),
          )
        ],
        backgroundColor: const Color.fromARGB(255, 3, 32, 55),
        title: const Text(
          "Chat",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
      ),
      body: ListView.builder(
        itemCount: widget.userlist.length,
        itemBuilder: (context, index) {
          final user = widget.userlist[index];
          return Card(
            color: Color.fromARGB(255, 7, 78, 133),
            child: ListTile(
              leading: ClipOval(
                child: Image.network(
                  user.Profileimage,
                  fit: BoxFit.cover,
                  height: 50,
                  width: 50,
                ),
              ),
              title: Text(
                user.name,
                style: TextStyle(
                    color: Color.fromARGB(255, 165, 195, 238), fontSize: 16),
              ),
              subtitle: Text(
                user.message,
                style: TextStyle(color: Colors.white, fontSize: 16),
              ),
              trailing: Column(
                children: [
                  Text(
                    user.time,
                    style: TextStyle(
                        color: Color.fromARGB(255, 237, 171, 4), fontSize: 12),
                  ),
                  Text(
                    user.count + '(new)',
                    style: TextStyle(
                        color: Color.fromARGB(255, 32, 232, 6), fontSize: 16),
                  ),
                ],
              ),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => ChatPage()));
              },
            ),
          );
        },
      ),
    );
  }
}
